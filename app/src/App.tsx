import { useState } from 'react'
import {
  SCHEMA_VERSION,
  VISUAL_STYLES,
  WORLD_TEMPLATES,
  changeVisualStyle,
  changeWorldTemplate,
  createBuildPlan,
  createCommissioningDraft,
  type AgentDefinition,
  type BusinessDefinition,
  type BuildPlan,
  type CommissioningDraft,
  type InstallationMode,
  type GovernanceAnswers,
  type RoomProfile,
  type VisualStyleId,
  type WorldTemplateId,
} from './lib/commissioning'
import { cancelBuild, createBuildJobs, pauseBuild, replaceRoomAsset, resolveAssetReview, resumeBuild, retryJob, runNextBuildJob, validateBuildJobs, type BuildJob } from './lib/build'
import { appendApprovalRecord, appendAuditRecord, createDemoPartition, createStandardPartition, purgeDemoPartition, validatePartition } from './lib/modes'
import { WorldScene } from './components/WorldScene'
import { RoomDiorama } from './components/RoomDiorama'
import { exportDraft, importDraft, loadWorkspace, restartWithBackup, saveWorkspace } from './lib/persistence'
import { getAgentPortraitPath, getAgentWorkItems, getRoomWorkItems, type RoomWorkItem } from './lib/presentation'
import { deriveFeedbackLoop } from './lib/feedbackLoop'
import { FeedbackLoopPanel } from './components/FeedbackLoopPanel'
import { AgentariumTitleScreen } from './components/AgentariumTitleScreen'
import { OrchestratorSetup } from './components/OnboardingSetup'

const DRAFT_MODE_KEY = 'agentarium:commissioning-current-mode'
const draftKeyFor = (mode: InstallationMode) => `agentarium:${mode}:commissioning:v2`
const stepKeyFor = (mode: InstallationMode) => `agentarium:${mode}:commissioning-step:v2`
const jobsKeyFor = (mode: InstallationMode) => `agentarium:${mode}:build-jobs:v2`
const currentDraftMode = (): InstallationMode => localStorage.getItem(DRAFT_MODE_KEY) === 'demo' ? 'demo' : 'standard'
const STANDARD_KEY = 'agentarium:standard:v1'
const DEMO_KEY = 'agentarium:demo:v1'

type ActiveRecord = CommissioningDraft

function readJson<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : null
  } catch {
    return null
  }
}

function normalizeActive(record: ActiveRecord): ActiveRecord {
  if (record.buildPlan) return record
  return { ...record, buildPlan: createBuildPlan(record) }
}

function App() {
  const [introEntered, setIntroEntered] = useState(false)
  const [active, setActive] = useState<ActiveRecord | null>(() => {
    const preferred = localStorage.getItem('agentarium:current-mode') === 'demo' ? 'demo' : 'standard'
    return loadWorkspace(localStorage, preferred).record ?? loadWorkspace(localStorage, preferred === 'demo' ? 'standard' : 'demo').record
  })
  const [commissioning, setCommissioning] = useState(() => {
    const mode = currentDraftMode()
    const savedDraft = localStorage.getItem(draftKeyFor(mode))
    if (!active) return true
    if (!savedDraft) return false
    try { return importDraft(savedDraft).status !== 'complete' } catch { return true }
  })
  const [recoveryPending, setRecoveryPending] = useState(() => Boolean(localStorage.getItem(draftKeyFor(currentDraftMode()))))

  const finishCommissioning = (record: ActiveRecord) => {
    saveWorkspace(localStorage, record)
    localStorage.setItem('agentarium:current-mode', record.installationMode)
    localStorage.removeItem(draftKeyFor(record.installationMode))
    localStorage.removeItem(stepKeyFor(record.installationMode))
    localStorage.removeItem(jobsKeyFor(record.installationMode))
    const key = record.installationMode === 'standard' ? STANDARD_KEY : DEMO_KEY
    let partition = record.installationMode === 'standard' ? createStandardPartition() : createDemoPartition()
    const existing = readJson<ReturnType<typeof createStandardPartition>>(key)
    if (existing) { try { partition = validatePartition(record.installationMode, existing) } catch { localStorage.setItem(`${key}:rejected`, JSON.stringify(existing)) } }
    partition = appendApprovalRecord(record.installationMode, partition, { status: 'approved', decisionReason: 'Owner selected Present commissioned world' })
    partition = appendAuditRecord(record.installationMode, partition, { type: 'approval.approved', summary: 'Final presentation approved', detail: 'Owner approved replacement after local QA.' })
    partition = appendAuditRecord(record.installationMode, partition, { type: 'world.presented', summary: 'Commissioned world presented', detail: `${record.worldName} became the active ${record.installationMode} workspace.` })
    localStorage.setItem(key, JSON.stringify(partition))
    setActive(record)
    setCommissioning(false)
  }

  const beginRecommission = () => {
    const basis = active ? {
      ...createCommissioningDraft({
        installationMode: active.installationMode,
        visualStyleId: active.visualStyleId,
        worldTemplateId: active.worldTemplateId,
        worldName: active.worldName,
      }),
      articulation: structuredClone(active.articulation),
    } : createCommissioningDraft()
    localStorage.setItem(DRAFT_MODE_KEY, basis.installationMode)
    localStorage.setItem(draftKeyFor(basis.installationMode), JSON.stringify(basis))
    localStorage.setItem(stepKeyFor(basis.installationMode), '0')
    setCommissioning(true)
  }

  if (commissioning) {
    if (recoveryPending) return <DraftRecovery onResume={() => { setIntroEntered(true); setRecoveryPending(false) }} onRestart={() => { setIntroEntered(true); setRecoveryPending(false) }} />
    if (!active && !introEntered) return <AgentariumTitleScreen onEnter={() => setIntroEntered(true)} />
    return <CommissioningFlow active={active} onCancel={() => setCommissioning(false)} onComplete={finishCommissioning} />
  }
  if (!active) return null
  return <CommissionedWorld active={normalizeActive(active)} onRecommission={beginRecommission} onLeaveDemo={(purge) => {
    if (purge) {
      for (const key of [DEMO_KEY, 'agentarium:demo:active:v2', draftKeyFor('demo'), stepKeyFor('demo'), jobsKeyFor('demo'), 'agentarium:demo:commissioning-backup:v2']) localStorage.removeItem(key)
    }
    const standard = loadWorkspace(localStorage, 'standard').record
    if (standard) { localStorage.setItem('agentarium:current-mode', 'standard'); setActive(standard) }
    else { const fresh = createCommissioningDraft({ installationMode: 'standard' }); localStorage.setItem(DRAFT_MODE_KEY, 'standard'); localStorage.setItem(draftKeyFor('standard'), JSON.stringify(fresh)); localStorage.setItem(stepKeyFor('standard'), '0'); setCommissioning(true); setRecoveryPending(false) }
  }} />
}

function DraftRecovery({ onResume, onRestart }: { onResume: () => void; onRestart: () => void }) {
  const mode = currentDraftMode()
  const raw = localStorage.getItem(draftKeyFor(mode)) ?? ''
  const [inspecting, setInspecting] = useState(false)
  const [importError, setImportError] = useState('')
  let draft: CommissioningDraft | null = null
  let error = ''
  try { draft = importDraft(raw) } catch (caught) { error = caught instanceof Error ? caught.message : 'Invalid commissioning draft' }
  const restart = () => {
    if (draft) {
      restartWithBackup(localStorage, draft)
      localStorage.setItem(draftKeyFor(draft.installationMode), JSON.stringify(createCommissioningDraft({ installationMode: draft.installationMode })))
    }
    else {
      localStorage.setItem('agentarium:commissioning-backup:malformed:v2', raw)
      localStorage.setItem(draftKeyFor(mode), JSON.stringify(createCommissioningDraft({ installationMode: mode })))
    }
    localStorage.setItem(stepKeyFor(mode), '0')
    localStorage.removeItem(jobsKeyFor(mode))
    onRestart()
  }
  return <main className="commissioning-shell recovery-shell"><header className="commissioning-header"><div className="brand-mark">A</div><div><span className="eyebrow">Versioned local recovery</span><h1>Incomplete commissioning draft found</h1></div></header><section className="guide-stage"><div className="guide-bubble"><h2>{error ? 'This draft cannot be trusted.' : `Resume ${draft?.worldName}?`}</h2><p>{error || 'Your saved answers and completed build attempts are intact. Choose how to continue.'}</p></div></section><section className="decision-deck"><div className="blueprint-panel"><div className="footer-actions"><button className="primary-button" disabled={Boolean(error)} onClick={onResume}>Resume</button><button className="ghost-button" onClick={restart}>Restart with preserved backup</button><button className="ghost-button" onClick={() => setInspecting((value) => !value)}>Inspect Draft</button>{draft && <button className="ghost-button" onClick={() => downloadJson(exportDraft(draft), `${draft.worldName}-commissioning.json`)}>Export Draft</button>}</div>{inspecting && <pre className="draft-inspector">{raw}</pre>}<label className="import-control">Import versioned draft<input type="file" accept="application/json" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; try { const imported = importDraft(await file.text()); localStorage.setItem(DRAFT_MODE_KEY, imported.installationMode); localStorage.setItem(draftKeyFor(imported.installationMode), exportDraft(imported)); localStorage.setItem(stepKeyFor(imported.installationMode), '0'); localStorage.removeItem(jobsKeyFor(imported.installationMode)); setImportError(''); onResume() } catch (caught) { setImportError(caught instanceof Error ? caught.message : 'Invalid commissioning import') } }} /></label>{importError && <p className="blocked-message" role="alert">{importError}</p>}</div></section></main>
}

function downloadJson(content: string, filename: string) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([content], { type: 'application/json' }))
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

function CommissioningFlow({ active, onCancel, onComplete }: { active: ActiveRecord | null; onCancel: () => void; onComplete: (record: ActiveRecord) => void }) {
  const [draft, setDraftState] = useState<CommissioningDraft>(() => {
    const mode = currentDraftMode()
    const raw = localStorage.getItem(draftKeyFor(mode))
    if (!raw) return createCommissioningDraft({ installationMode: mode })
    try { return importDraft(raw) } catch { return createCommissioningDraft({ installationMode: mode }) }
  })
  const [step, setStepState] = useState(() => Number(localStorage.getItem(stepKeyFor(currentDraftMode())) ?? 0))
  const [jobs, setJobsState] = useState<BuildJob[]>(() => { const mode = currentDraftMode(); const stored = readJson<unknown>(jobsKeyFor(mode)); if (!stored) return []; try { return validateBuildJobs(stored, draft.buildPlan ?? createBuildPlan(draft)) } catch { localStorage.setItem(`${jobsKeyFor(mode)}:rejected`, JSON.stringify(stored)); return [] } })
  const [replacementRoomId, setReplacementRoomId] = useState('bridge')
  const [pendingAssetId, setPendingAssetId] = useState(() => draft.buildPlan?.assets.find((asset) => asset.status === 'needs_review' && asset.previous)?.id ?? '')
  const [finalDecision, setFinalDecision] = useState('')

  const saveDraft = (next: CommissioningDraft) => {
    setDraftState(next)
    localStorage.setItem(DRAFT_MODE_KEY, next.installationMode)
    localStorage.setItem(draftKeyFor(next.installationMode), JSON.stringify(next))
  }
  const setStep = (next: number) => {
    setStepState(next)
    localStorage.setItem(stepKeyFor(draft.installationMode), String(next))
  }
  const saveJobs = (next: BuildJob[]) => {
    setJobsState(next)
    localStorage.setItem(jobsKeyFor(draft.installationMode), JSON.stringify(next))
  }

  const chooseStyle = (id: VisualStyleId) => saveDraft(changeVisualStyle(draft, id))
  const chooseMode = (installationMode: InstallationMode) => {
    const next = createCommissioningDraft({
      installationMode,
      visualStyleId: draft.visualStyleId,
      worldTemplateId: draft.worldTemplateId,
      worldName: draft.worldName,
    })
    next.articulation = structuredClone(draft.articulation)
    next.agents = draft.agents.map((agent) => ({ ...agent, autonomy: installationMode === 'demo' ? 'demo_only' : agent.autonomy === 'demo_only' ? 'supervised' : agent.autonomy }))
    saveDraft(next)
    setJobsState([])
    localStorage.removeItem(jobsKeyFor(installationMode))
  }
  const chooseWorld = (worldTemplateId: WorldTemplateId) => saveDraft(changeWorldTemplate(draft, worldTemplateId))

  if (step === 0) return <OrchestratorSetup
    draft={draft}
    activeWorldName={active?.worldName}
    onCancel={active ? onCancel : undefined}
    onAgents={(agents) => saveDraft({ ...draft, agents })}
    onMode={chooseMode}
    onContinue={() => setStep(3)}
    onRestore={async (file) => {
      const imported = importDraft(await file.text())
      localStorage.setItem(DRAFT_MODE_KEY, imported.installationMode)
      localStorage.setItem(draftKeyFor(imported.installationMode), exportDraft(imported))
      localStorage.removeItem(jobsKeyFor(imported.installationMode))
      setDraftState(imported)
      setStepState(0)
    }}
  />

  const approve = () => {
    const buildPlan = createBuildPlan(draft)
    const next = { ...draft, status: 'building' as const, buildPlan }
    saveDraft(next)
    saveJobs(createBuildJobs(buildPlan))
    setStep(8)
  }
  const runNext = () => saveJobs(runNextBuildJob(draft.buildPlan ?? createBuildPlan(draft), jobs))
  const recordFinalDecision = (status: 'denied' | 'revision_requested', reason: string) => {
    let operational = appendApprovalRecord(draft.installationMode, draft.operational, { status, decisionReason: reason })
    operational = appendAuditRecord(draft.installationMode, operational, { type: `approval.${status}`, summary: `Final presentation ${status.replace('_', ' ')}`, detail: reason })
    saveDraft({ ...draft, operational })
  }
  const failedJob = jobs.find((job) => job.status === 'failed')
  const paused = jobs.some((job) => job.status === 'paused' || job.status === 'cancelled')
  const allComplete = jobs.length > 0 && jobs.every((job) => job.status === 'complete')
  const present = () => {
    const complete = { ...draft, schemaVersion: SCHEMA_VERSION, status: 'complete' as const, buildPlan: draft.buildPlan ?? createBuildPlan(draft) }
    saveDraft(complete)
    onComplete(complete)
  }

  return (
    <main className="commissioning-shell">
      <div className="construction-grid" aria-hidden="true" />
      <header className="commissioning-header">
        <div className="brand-mark">A</div>
        <div><span className="eyebrow">Agentarium OS / Construction Bay 01</span><h1>Commissioning Guide</h1></div>
        <div className="resume-state"><span className="live-dot" />Draft saved locally</div>
      </header>

      <section className="guide-stage">
        <div className="guide-character steward-character" aria-label="Animated Ultron steward">
          <div className="guide-antenna" /><div className="guide-head"><i /><i /></div><div className="guide-body"><span>U</span></div>
        </div>
        <div className="guide-shadow" />
        <div className="guide-bubble">
          <span className="eyebrow">{step === 8 ? 'Builder coordination / Local-only' : 'Steward / Orchestrator'}</span>
          {step === 0 && <><h2>I’m Ultron. Tell me what we’re building together.</h2><p>I’ll turn your intent into agents, rooms, workflows, tools, and approval gates. We’ll choose how the world looks only after the operation makes sense.</p></>}
          {step === 1 && <><h2>Choose the operating boundary.</h2><p>Standard is recommended and starts empty. Demo is an isolated, non-networked synthetic world.</p></>}
          {step === 2 && <><h2>Let’s shape the crew around the mission.</h2><p>I’ll steward the system. Review the specialists I should coordinate, their responsibilities, and their limits.</p></>}
          {step === 3 && <><h2>Which operations should become Forges?</h2><p>Forges manufacture valuable output. Communications routes signals and remains a separate room.</p></>}
          {step === 4 && <><h2>Set the governance boundary.</h2><p>External writes, credentials, publishing, spending, destructive actions, and expanded autonomy stay approval-gated.</p></>}
          {step === 5 && <><h2>Now, how should this operation feel?</h2><p>The mission and operating model are settled first. Presentation changes the experience—not the underlying rooms, agents, workflows, memory, or approvals.</p></>}
          {step === 6 && <><h2>What kind of world should contain it?</h2><p>Each template translates the approved operation into geography, movement, terminology, and art direction.</p></>}
          {step === 7 && <><h2>Inspect the operating blueprint before I build.</h2><p>Nothing has been activated. Review your mission, my orchestration role, the crew, workflows, boundaries, and finally the world that expresses them.</p></>}
          {step === 8 && <><h2>{allComplete ? 'Construction passed local QA.' : 'Builders are standing by.'}</h2><p>Each visible worker below is one inspectable job. Progress changes only when a job really completes.</p></>}
        </div>
      </section>

      <section className="decision-deck" aria-live="polite">
        {active && <div className="draft-warning"><strong>Recommissioning draft</strong><span>Active: {active.worldName} · Draft: {draft.worldName}. The active world remains untouched until final approval.</span><button onClick={onCancel}>Return to active world</button></div>}
        {step === 0 && <ArticulationReview articulation={draft.articulation} onChange={(articulation) => saveDraft({ ...draft, articulation })} />}
        {step === 1 && <ModeChooser selected={draft.installationMode} onSelect={chooseMode} />}
        {step === 2 && <AgentReview agents={draft.agents} onChange={(agents) => saveDraft({ ...draft, agents })} />}
        {step === 3 && <ForgeReview draft={draft} onChange={(businesses) => saveDraft({ ...draft, businesses })} />}
        {step === 4 && <GovernanceReview draft={draft} onChange={(governance) => saveDraft({ ...draft, governance })} />}
        {step === 5 && <><ChoiceGrid items={VISUAL_STYLES} selected={draft.visualStyleId} onSelect={(id) => chooseStyle(id as VisualStyleId)} />{draft.visualStyleId === 'custom' && <label className="world-name">Custom visual direction<textarea aria-label="Custom visual direction" value={draft.presentation.customStyleDescription ?? ''} onChange={(event) => saveDraft({ ...draft, presentation: { ...draft.presentation, customStyleDescription: event.target.value, interpretationConfirmed: false } })} /><span><input type="checkbox" checked={draft.presentation.interpretationConfirmed} onChange={(event) => saveDraft({ ...draft, presentation: { ...draft.presentation, interpretationConfirmed: event.target.checked } })} /> I confirm this interpretation</span></label>}</>}
        {step === 6 && <><WorldChooser selected={draft.worldTemplateId} onSelect={chooseWorld} worldName={draft.worldName} onName={(worldName) => saveDraft({ ...draft, worldName })} />{draft.worldTemplateId === 'custom' && <label className="world-name">Custom theme interpretation<textarea aria-label="Custom theme interpretation" value={draft.theme.customThemeDescription ?? ''} onChange={(event) => saveDraft({ ...draft, theme: { ...draft.theme, customThemeDescription: event.target.value, interpretationConfirmed: false } })} /><span><input type="checkbox" checked={draft.theme.interpretationConfirmed} onChange={(event) => saveDraft({ ...draft, theme: { ...draft.theme, interpretationConfirmed: event.target.checked } })} /> I confirm this interpretation</span></label>}</>}
        {step === 7 && <BlueprintReview plan={createBuildPlan(draft)} onRevise={() => setStep(0)} onExport={() => downloadJson(exportDraft(draft), `${draft.worldName}-commissioning.json`)} onCancel={active ? onCancel : () => { localStorage.removeItem(draftKeyFor(draft.installationMode)); setStep(0) }} />}
        {step === 8 && <><ConstructionBay jobs={jobs} plan={draft.buildPlan ?? createBuildPlan(draft)} /><div className="build-actions"><button onClick={() => saveJobs(paused ? resumeBuild(jobs) : pauseBuild(jobs))}>{paused ? 'Resume build' : 'Pause build'}</button><button onClick={() => saveJobs(cancelBuild(jobs))}>Cancel build</button>{failedJob && <button onClick={() => saveJobs(retryJob(jobs, failedJob.id))}>Retry {failedJob.worker}</button>}<button onClick={() => { const next = jobs.find((job) => job.status === 'planned'); if (next) saveJobs(runNextBuildJob(draft.buildPlan ?? createBuildPlan(draft), jobs, { failJobId: next.id })) }}>Inject next-job failure</button><select aria-label="Room asset to replace" value={replacementRoomId} onChange={(event) => setReplacementRoomId(event.target.value)}>{draft.rooms.map((room) => <option value={room.id} key={room.id}>{room.name}</option>)}</select><button onClick={() => { const currentPlan = draft.buildPlan ?? createBuildPlan(draft); const changed = replaceRoomAsset(currentPlan, jobs, replacementRoomId, { source: 'placeholder', path: '', prompt: `Replacement review for ${replacementRoomId}` }); saveDraft({ ...draft, buildPlan: changed.plan }); saveJobs(changed.jobs); setPendingAssetId(changed.review.id); setFinalDecision(`${replacementRoomId} replacement is awaiting review`) }}>Replace one room asset</button>{pendingAssetId && <><button onClick={() => { const changed = resolveAssetReview(draft.buildPlan ?? createBuildPlan(draft), jobs, pendingAssetId, 'approved'); saveDraft({ ...draft, buildPlan: changed.plan }); saveJobs(changed.jobs); setPendingAssetId(''); setFinalDecision('Replacement approved; visual assembly and QA must rerun') }}>Approve replacement</button><button onClick={() => { const changed = resolveAssetReview(draft.buildPlan ?? createBuildPlan(draft), jobs, pendingAssetId, 'rejected'); saveDraft({ ...draft, buildPlan: changed.plan }); saveJobs(changed.jobs); setPendingAssetId(''); setFinalDecision('Replacement rejected; active asset remains unresolved') }}>Reject replacement</button></>}</div>{finalDecision && <p className="blocked-message">{finalDecision}</p>}{allComplete && <div className="blueprint-panel"><h3>Final presentation approval</h3><p>Local QA passed. Review the report and choose an explicit approval path before the active world can be replaced.</p><div className="footer-actions"><button onClick={() => { recordFinalDecision('denied', 'Owner denied final presentation after local QA'); setFinalDecision('Final presentation denied; active world preserved'); if (active) onCancel() }}>Deny final presentation</button><button onClick={() => { recordFinalDecision('revision_requested', 'Owner requested revision after local QA'); setFinalDecision('Revision requested; returning to blueprint'); setStep(7) }}>Request final revision</button></div></div>}</>}

        <footer className="decision-footer">
          <div className="step-meter"><span>Commissioning</span><div>{[0,1,2,3,4,5,6,7,8].map((number) => <i key={number} className={number <= step ? 'done' : ''} />)}</div><b>{Math.min(step + 1, 9)} / 9</b></div>
          <div className="footer-actions">
            {step > 0 && step < 8 && <button className="ghost-button" onClick={() => setStep(step - 1)}>Back</button>}
            {step === 0 && <button className="primary-button" disabled={!draft.articulation.vision.trim()} onClick={() => setStep(1)}>Continue</button>}
            {step === 1 && <button className="primary-button" onClick={() => setStep(2)}>Continue</button>}
            {step === 2 && <button className="primary-button" onClick={() => setStep(3)}>Continue to Forges</button>}
            {step === 3 && <button className="primary-button" onClick={() => setStep(4)}>Continue to Governance</button>}
            {step === 4 && <button className="primary-button" onClick={() => setStep(5)}>Continue to Visual Style</button>}
            {step === 5 && <button className="primary-button" disabled={draft.visualStyleId === 'custom' && !draft.presentation.interpretationConfirmed} onClick={() => setStep(6)}>Continue to World</button>}
            {step === 6 && <button className="primary-button" disabled={draft.worldTemplateId === 'custom' && !draft.theme.interpretationConfirmed} onClick={() => setStep(7)}>Review blueprint</button>}
            {step === 7 && <button className="primary-button" onClick={approve}>Approve commissioned build</button>}
            {step === 8 && !allComplete && <button className="primary-button" onClick={runNext}>Run next build job</button>}
            {step === 8 && allComplete && <button className="primary-button" onClick={present}>Present commissioned world</button>}
          </div>
        </footer>
      </section>
    </main>
  )
}

function ChoiceGrid({ items, selected, onSelect }: { items: typeof VISUAL_STYLES; selected: string; onSelect: (id: string) => void }) {
  return <div className="choice-grid">{items.map((item, index) => <button key={item.id} className={`choice-card ${selected === item.id ? 'selected' : ''}`} onClick={() => onSelect(item.id)}>
    <span className={`style-preview preview-${index}`}><i /><i /><i /></span><span className="choice-copy"><strong>{item.label}</strong><small>{item.description}</small></span><span className="selection-mark">{selected === item.id ? 'Selected' : 'Choose'}</span>
  </button>)}</div>
}

function ModeChooser({ selected, onSelect }: { selected: InstallationMode; onSelect: (mode: InstallationMode) => void }) {
  return <div className="mode-grid">
    <button className={`mode-card ${selected === 'standard' ? 'selected' : ''}`} onClick={() => onSelect('standard')}><span className="mode-icon">◇</span><strong>Standard mode — recommended/default</strong><p>Zero seeded operational records. Real, user-entered, or derived data only, always with provenance.</p><ul><li>Honest empty and blocked states</li><li>No fixture fallback</li><li>Approval-gated adapters</li></ul></button>
    <button className={`mode-card demo-choice ${selected === 'demo' ? 'selected' : ''}`} onClick={() => onSelect('demo')}><span className="mode-icon">△</span><strong>Demo mode — isolated synthetic world</strong><p>Non-networked orientation records with demo:* IDs and synthetic_demo provenance.</p><ul><li>Separate storage and purge</li><li>Persistent Demo banner</li><li>Zero Standard influence</li></ul></button>
  </div>
}

function WorldChooser({ selected, onSelect, worldName, onName }: { selected: WorldTemplateId; onSelect: (id: WorldTemplateId) => void; worldName: string; onName: (value: string) => void }) {
  const selectedTemplate = WORLD_TEMPLATES.find((item) => item.id === selected) ?? WORLD_TEMPLATES[0]
  return <div className="world-gallery-layout">
    <div className="world-gallery-column">
      <div className="world-uniqueness-note"><span aria-hidden="true">✦</span><p><strong>Each commissioned world is custom and unique.</strong> These thumbnails show a possible direction—not the exact world that will be created for you.</p></div>
      <div className="world-grid">{WORLD_TEMPLATES.map((item) => <button key={item.id} className={`world-card ${selected === item.id ? 'selected' : ''}`} onClick={() => onSelect(item.id)}>
        <span className="world-thumbnail"><img src={item.previewPath} alt={item.previewAlt} /></span>
        <span className="world-card-copy"><strong>{item.label}</strong><small>{item.topology}</small><em>{item.movement}</em></span>
      </button>)}</div>
    </div>
    <aside className="selected-world-preview" aria-live="polite">
      <img src={selectedTemplate.previewPath} alt={`${selectedTemplate.label} selected concept preview`} />
      <div><span className="eyebrow">Selected world direction</span><h3>{selectedTemplate.label}</h3><p>{selectedTemplate.topology}</p><dl><dt>Movement</dt><dd>{selectedTemplate.movement}</dd><dt>Command area</dt><dd>{selectedTemplate.commandName}</dd><dt>Materials</dt><dd>{selectedTemplate.materials}</dd></dl><small>{selectedTemplate.previewNote}</small></div>
      <label className="world-name">World name<input value={worldName} onChange={(event) => onName(event.target.value)} /></label>
    </aside>
  </div>
}

const splitList = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean)

function ArticulationReview({ articulation, onChange }: { articulation: CommissioningDraft['articulation']; onChange: (articulation: CommissioningDraft['articulation']) => void }) {
  const update = (patch: Partial<CommissioningDraft['articulation']>) => onChange({ ...articulation, ...patch })
  return <form className="articulation-review" aria-label="Owner and Ultron mission exchange" onSubmit={(event) => event.preventDefault()}>
    <header className="articulation-intro">
      <span className="eyebrow">Owner ↔ steward mission exchange</span>
      <h3>Start with the mission. We’ll write the operating contract together.</h3>
      <p>Speak plainly. Ultron will carry this intent into the crew, Forges, governance, and final build blueprint.</p>
    </header>
    <div className="articulation-participants">
      <label><span>Your name or call sign</span><input aria-label="Your name or call sign" value={articulation.ownerName} onChange={(event) => update({ ownerName: event.target.value })} /></label>
      <span className="articulation-link" aria-hidden="true">↔</span>
      <label><span>Steward name</span><input aria-label="Steward name" value={articulation.stewardName} onChange={(event) => update({ stewardName: event.target.value })} /></label>
    </div>
    <div className="articulation-exchange">
      <section className="articulation-block mission-block" aria-labelledby="mission-question">
        <header><span className="eyebrow">Ultron asks</span><h4 id="mission-question">What are we building together?</h4><p>Give me the purpose first. I’ll organize everything else around it.</p></header>
        <label className="mission-answer"><span>Your mission</span><textarea autoFocus required aria-required="true" aria-label="What should this operation help you accomplish?" value={articulation.vision} onChange={(event) => update({ vision: event.target.value })} placeholder="Describe the operation, problem, or outcome in your own words…" /></label>
        <label><span>Success should look like</span><textarea aria-label="What outcomes should we optimize for?" value={articulation.desiredOutcomes.join(', ')} onChange={(event) => update({ desiredOutcomes: splitList(event.target.value) })} placeholder="Useful output, clear handoffs, measurable outcomes…" /></label>
      </section>
      <section className="articulation-block contract-block" aria-labelledby="working-contract-title">
        <header><span className="eyebrow">Working contract</span><h4 id="working-contract-title">How should I steward the operation?</h4><p>Set the relationship and the lines I must never cross.</p></header>
        <label><span>Approval boundaries</span><textarea aria-label="What must this system never do without approval?" value={articulation.operatingBoundaries.join(', ')} onChange={(event) => update({ operatingBoundaries: splitList(event.target.value) })} placeholder="Publish, spend, delete, contact someone…" /></label>
        <label><span>How we work together</span><textarea aria-label="How should the steward work with you?" value={articulation.workingStyle} onChange={(event) => update({ workingStyle: event.target.value })} placeholder="How proactive, concise, explanatory, or approval-driven should Ultron be?" /></label>
      </section>
    </div>
  </form>
}

function AgentReview({ agents, onChange }: { agents: AgentDefinition[]; onChange: (agents: AgentDefinition[]) => void }) {
  const update = (id: string, patch: Partial<AgentDefinition>) => onChange(agents.map((agent) => agent.id === id ? { ...agent, ...patch } : agent))
  return <div className="structured-editor">{agents.map((agent) => <details key={agent.id} open={agent.id === 'ultron'}><summary><strong>{agent.name}</strong><span>{agent.role} · {agent.roomId}</span><b>{agent.provider} / {agent.model}</b></summary><div className="input-grid"><label>Purpose<input aria-label={`${agent.name} purpose`} value={agent.purpose} onChange={(event) => update(agent.id, { purpose: event.target.value })} /></label><label>Provider<input aria-label={`${agent.name} provider`} value={agent.provider} onChange={(event) => update(agent.id, { provider: event.target.value })} /></label><label>Preferred model<input aria-label={`${agent.name} model`} value={agent.model} onChange={(event) => update(agent.id, { model: event.target.value })} /></label><label>Fallback model<input aria-label={`${agent.name} fallback model`} value={agent.fallbackModel} onChange={(event) => update(agent.id, { fallbackModel: event.target.value })} /></label><label>Tools / capabilities<input aria-label={`${agent.name} tools`} value={agent.tools.join(', ')} onChange={(event) => update(agent.id, { tools: splitList(event.target.value) })} /></label><label>Allowed permissions<input aria-label={`${agent.name} permissions`} value={agent.permissions.join(', ')} onChange={(event) => update(agent.id, { permissions: splitList(event.target.value) })} /></label><label>Prohibited actions<input aria-label={`${agent.name} prohibited actions`} value={agent.prohibitedActions.join(', ')} onChange={(event) => update(agent.id, { prohibitedActions: splitList(event.target.value) })} /></label><label>Memory scope<input aria-label={`${agent.name} memory scope`} value={agent.memoryScope} onChange={(event) => update(agent.id, { memoryScope: event.target.value })} /></label><label>Autonomy<select aria-label={`${agent.name} autonomy`} value={agent.autonomy} onChange={(event) => update(agent.id, { autonomy: event.target.value as AgentDefinition['autonomy'] })}><option value="demo_only">Demo only</option><option value="supervised">Supervised</option><option value="trusted">Trusted</option><option value="bounded_autonomous">Bounded autonomous</option></select></label><label>Approval triggers<input aria-label={`${agent.name} approval triggers`} value={agent.approvalTriggers.join(', ')} onChange={(event) => update(agent.id, { approvalTriggers: splitList(event.target.value) })} /></label><label>Expected inputs<input aria-label={`${agent.name} expected inputs`} value={agent.expectedInputs.join(', ')} onChange={(event) => update(agent.id, { expectedInputs: splitList(event.target.value) })} /></label><label>Expected outputs<input aria-label={`${agent.name} expected outputs`} value={agent.expectedOutputs.join(', ')} onChange={(event) => update(agent.id, { expectedOutputs: splitList(event.target.value) })} /></label><label>Subagents<input aria-label={`${agent.name} subagents`} value={agent.subagents.join(', ')} onChange={(event) => update(agent.id, { subagents: splitList(event.target.value) })} /></label><label>Idle behavior<input aria-label={`${agent.name} idle behavior`} value={agent.idleBehavior} onChange={(event) => update(agent.id, { idleBehavior: event.target.value })} /></label><label>Budget / cost constraints<input aria-label={`${agent.name} budget`} value={agent.budget} onChange={(event) => update(agent.id, { budget: event.target.value })} /></label><label>Success measures<input aria-label={`${agent.name} success measures`} value={agent.successMeasures.join(', ')} onChange={(event) => update(agent.id, { successMeasures: splitList(event.target.value) })} /></label></div></details>)}</div>
}

function ForgeReview({ draft, onChange }: { draft: CommissioningDraft; onChange: (businesses: BusinessDefinition[]) => void }) {
  const business = draft.businesses[0]
  const update = (patch: Partial<BusinessDefinition>) => onChange([{ ...business, ...patch }, ...draft.businesses.slice(1)])
  return <div className="blueprint-columns"><article className="blueprint-panel input-grid"><span className="eyebrow">Business / Forge definition</span><label>Purpose<input aria-label="Forge purpose" value={business.purpose} onChange={(event) => update({ purpose: event.target.value })} /></label><label>Customer<input aria-label="Forge customer" value={business.customer} onChange={(event) => update({ customer: event.target.value })} /></label><label>Inputs<input aria-label="Forge inputs" value={business.inputs.join(', ')} onChange={(event) => update({ inputs: splitList(event.target.value) })} /></label><label>Sellable outputs<input aria-label="Forge outputs" value={business.outputs.join(', ')} onChange={(event) => update({ outputs: splitList(event.target.value) })} /></label><label>Delivery destination<input aria-label="Forge delivery destination" value={business.deliveryDestination} onChange={(event) => update({ deliveryDestination: event.target.value })} /></label><label>Production agents<input aria-label="Forge production agents" value={business.productionAgentIds.join(', ')} onChange={(event) => update({ productionAgentIds: splitList(event.target.value) })} /></label><label>QA agents<input aria-label="Forge QA agents" value={business.qaAgentIds.join(', ')} onChange={(event) => update({ qaAgentIds: splitList(event.target.value) })} /></label><label>Evidence intent<input aria-label="Forge evidence intent" value={business.evidenceIntent} onChange={(event) => update({ evidenceIntent: event.target.value })} /></label><label>Approval points<input aria-label="Forge approval points" value={business.approvalPoints.join(', ')} onChange={(event) => update({ approvalPoints: splitList(event.target.value) })} /></label><label>Integration intent<input aria-label="Forge integration intent" value={business.integrationIntents.join(', ')} onChange={(event) => update({ integrationIntents: splitList(event.target.value) })} /></label><label>Revenue / cost metrics<input aria-label="Forge metrics" value={business.metrics.join(', ')} onChange={(event) => update({ metrics: splitList(event.target.value) })} /></label><label>Compliance / IP / privacy / safety / brand risks<input aria-label="Forge risks" value={business.risks.join(', ')} onChange={(event) => update({ risks: splitList(event.target.value) })} /></label></article><article className="blueprint-panel"><span className="eyebrow">Signal routing</span><h3>Communications is not a Forge</h3><p>It routes configured signals. It does not manufacture products.</p><div className="fact-line"><span>Channels</span><strong>Unconfigured</strong></div><div className="fact-line"><span>External send</span><strong>Gated</strong></div><div className="fact-line"><span>Mode</span><strong>{draft.installationMode}</strong></div></article></div>
}

function GovernanceReview({ draft, onChange }: { draft: CommissioningDraft; onChange: (governance: GovernanceAnswers) => void }) {
  const update = (patch: Partial<GovernanceAnswers>) => onChange({ ...draft.governance, ...patch })
  return <div className="structured-editor input-grid"><label>Deployment intent<select aria-label="Deployment intent" value={draft.governance.deploymentIntent} onChange={(event) => update({ deploymentIntent: event.target.value as GovernanceAnswers['deploymentIntent'] })}><option value="local_only">Local only</option><option value="lan">LAN</option><option value="future_hosted">Future hosted</option></select></label><label>User intent<select aria-label="User intent" value={draft.governance.userIntent} onChange={(event) => update({ userIntent: event.target.value as GovernanceAnswers['userIntent'] })}><option value="single_owner">Single owner</option><option value="future_multi_user">Future multi-user</option></select></label><label>Data sensitivity<input aria-label="Data sensitivity" value={draft.governance.dataSensitivity} onChange={(event) => update({ dataSensitivity: event.target.value })} /></label><label>Retention<input aria-label="Data retention" value={draft.governance.retention} onChange={(event) => update({ retention: event.target.value })} /></label><label>Backup / export<input aria-label="Backup export preference" value={draft.governance.backupExport} onChange={(event) => update({ backupExport: event.target.value })} /></label><label>External approval policy<input aria-label="External approval policy" value="All external writes gated" readOnly /></label><label>Budget / spend limit<input aria-label="Spend limit" value={draft.governance.spendLimit} onChange={(event) => update({ spendLimit: event.target.value })} /></label><label>Credential storage<input aria-label="Credential storage" value="Dedicated secure setup; not configured" readOnly /></label><label>Notification channels<input aria-label="Notification channels" value={draft.governance.notificationChannels.join(', ')} onChange={(event) => update({ notificationChannels: splitList(event.target.value) })} /></label><label>Failure / retry behavior<input aria-label="Failure retry behavior" value={draft.governance.failureRetry} onChange={(event) => update({ failureRetry: event.target.value })} /></label><label>Maintenance window<input aria-label="Maintenance window" value={draft.governance.maintenanceWindow} onChange={(event) => update({ maintenanceWindow: event.target.value })} /></label><label>Telemetry / privacy<input aria-label="Telemetry privacy" value={draft.governance.telemetryPrivacy} onChange={(event) => update({ telemetryPrivacy: event.target.value })} /></label><label>Asset review<select aria-label="Asset review policy" value={draft.governance.assetReview} onChange={(event) => update({ assetReview: event.target.value as GovernanceAnswers['assetReview'] })}><option value="individual">Individual</option><option value="batch">Batch</option></select></label><p>{draft.installationMode === 'standard' ? 'Standard rejects Demo namespaces and synthetic provenance.' : 'Demo resolves no production or write adapters.'}</p></div>
}

function BlueprintReview({ plan, onRevise, onExport, onCancel }: { plan: BuildPlan; onRevise: () => void; onExport: () => void; onCancel: () => void }) {
  return <div className="blueprint-review detailed-plan"><section className="articulation-blueprint" aria-labelledby="articulation-blueprint-title"><span className="eyebrow">Commissioning intent</span><h3 id="articulation-blueprint-title">Owner and steward articulation</h3><dl><div><dt>Owner</dt><dd>{plan.articulation.ownerName || 'Not provided'}</dd></div><div><dt>Steward</dt><dd>{plan.articulation.stewardName}</dd></div><div><dt>Mission</dt><dd>{plan.articulation.vision}</dd></div><div><dt>Desired outcomes</dt><dd>{plan.articulation.desiredOutcomes.length ? plan.articulation.desiredOutcomes.join(' · ') : 'Not provided'}</dd></div><div><dt>Approval boundaries</dt><dd>{plan.articulation.operatingBoundaries.length ? plan.articulation.operatingBoundaries.join(' · ') : 'Governance defaults apply'}</dd></div><div><dt>Working style</dt><dd>{plan.articulation.workingStyle}</dd></div></dl></section><div className="blueprint-summary"><span className="eyebrow">Inspectable build plan</span><h3>{plan.worldName}</h3><p>{VISUAL_STYLES.find((item) => item.id === plan.style)?.label} · {WORLD_TEMPLATES.find((item) => item.id === plan.worldTemplate)?.label} · {plan.movementMetaphor}</p><div className="stat-strip"><span><b>{plan.rooms.length}</b>rooms</span><span><b>{plan.agents.length}</b>agents</span><span><b>{plan.assets.length}</b>assets</span><span><b>{plan.adjacency.length}</b>routes</span></div><div className="footer-actions"><button onClick={onRevise}>Revise answers</button><button onClick={onExport}>Export commissioning spec</button><button onClick={onCancel}>Cancel safely</button></div></div><div className="blueprint-list"><h4>External calls / cost estimate</h4><p>{plan.externalEstimate.calls} calls · ${plan.externalEstimate.cost} {plan.externalEstimate.currency} · {plan.externalEstimate.reason}</p><h4>Approval gates</h4>{plan.approvalGates.map((item) => <p key={item}>◇ {item}</p>)}<h4>Warnings</h4>{plan.warnings.map((item) => <p key={item}>△ {item}</p>)}</div><details open><summary>Room profiles and actual adjacency</summary>{plan.rooms.map((room) => <p key={room.id}><b>{room.name}</b> · {room.type} · {room.level} · {room.description}</p>)}{plan.adjacency.map((edge) => <code key={`${edge.from}:${edge.to}`}>{edge.from} → {edge.to} via {edge.route}</code>)}</details><details><summary>Agent roster and permission boundaries</summary>{plan.agents.map((agent) => <p key={agent.id}><b>{agent.name}</b> · {agent.provider}/{agent.model} · allowed: {agent.permissions.join(', ')} · prohibited: {agent.prohibitedActions.join(', ')}</p>)}</details><details><summary>Forge definitions, workflow and assets</summary>{plan.businesses.map((business) => <p key={business.id}><b>{business.name}</b> · {business.customer} · outputs {business.outputs.join(', ')}</p>)}{plan.workflows.map((workflow) => <p key={workflow}>{workflow}</p>)}{plan.assets.map((asset) => <p key={asset.id}>{asset.id} · {asset.source} · {asset.status}</p>)}</details><details><summary>Assumptions, open questions and non-goals</summary>{plan.assumptions.map((item) => <p key={item}>Assumption: {item}</p>)}{plan.openQuestions.map((item) => <p key={item}>Open: {item}</p>)}{plan.nonGoals.map((item) => <p key={item}>Non-goal: {item}</p>)}</details></div>
}

function ConstructionBay({ jobs, plan }: { jobs: BuildJob[]; plan: BuildPlan }) {
  return <div className="build-console"><div className="build-visual"><div className="ship-wireframe">{plan.rooms.slice(0, 12).map((room) => <i key={room.id} title={room.name} />)}</div><span>{jobs.filter((job) => job.status === 'complete').length} / {jobs.length} verified jobs</span></div><div className="job-list">{jobs.map((job, index) => <details key={job.id} className={job.status}><summary><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{job.worker}</strong><small>{job.label}</small></div><b>{job.status}</b><em>{job.attempts.length ? `${job.attempts.length} attempt(s)` : 'not started'}</em></summary>{job.attempts.map((attempt) => <pre key={attempt.attemptId}>{JSON.stringify(attempt, null, 2)}</pre>)}</details>)}</div></div>
}

function CommissionedWorld({ active, onRecommission, onLeaveDemo }: { active: ActiveRecord; onRecommission: () => void; onLeaveDemo: (purge: boolean) => void }) {
  const plan = active.buildPlan!
  const [view, setView] = useState<{ kind: 'overview' | 'room' | 'agent'; roomId?: string; agentId?: string }>({ kind: 'overview' })
  const [inspectorOpen, setInspectorOpen] = useState(false)
  const [purgeMessage, setPurgeMessage] = useState('')
  const [workflowMessage, setWorkflowMessage] = useState('')
  const [replayCursor, setReplayCursor] = useState<number | null>(null)
  const [leavingDemo, setLeavingDemo] = useState(false)
  const [purgeOnLeave, setPurgeOnLeave] = useState(true)
  const partition = (() => {
    const key = active.installationMode === 'demo' ? DEMO_KEY : STANDARD_KEY
    const stored = readJson<ReturnType<typeof createStandardPartition>>(key)
    if (stored) {
      try {
        const validated = validatePartition(active.installationMode, stored)
        if (active.installationMode === 'demo' && !validated.packets.some((record) => record.id === 'demo:packet:visual-candidate')) {
          const upgraded = createDemoPartition()
          localStorage.setItem(key, JSON.stringify(upgraded))
          return upgraded
        }
        return validated
      } catch { localStorage.setItem(`${key}:rejected`, JSON.stringify(stored)) }
    }
    const created = active.installationMode === 'demo' ? createDemoPartition() : createStandardPartition()
    localStorage.setItem(key, JSON.stringify(created))
    return created
  })()

  const loop = deriveFeedbackLoop(partition, active.installationMode)
  const purgeDemo = () => {
    localStorage.setItem(DEMO_KEY, JSON.stringify(purgeDemoPartition(partition)))
    setPurgeMessage('Demo records purged')
  }
  const room = plan.rooms.find((item) => item.id === view.roomId)
  const agent = plan.agents.find((item) => item.id === view.agentId)
  const roomAgents = room ? plan.agents.filter((item) => item.roomId === room.id) : []
  const roomWorkItems = room ? getRoomWorkItems(room.id, roomAgents.map((item) => item.id), partition) : []
  const agentWorkItems = agent ? getAgentWorkItems(agent, roomWorkItems) : []

  return <main className={`world-shell style-${active.visualStyleId}`}>
    {active.installationMode === 'demo' && <div className="demo-banner">DEMO MODE — synthetic data; no external actions</div>}
    <header className="world-header"><div className="brand-mark">A</div><div><span className="eyebrow">{active.worldName}</span><strong>{WORLD_TEMPLATES.find((item) => item.id === active.worldTemplateId)?.label} / {VISUAL_STYLES.find((item) => item.id === active.visualStyleId)?.label}</strong></div><nav><button onClick={() => setView({ kind: 'overview' })}>World</button><button aria-label="Open audit inspector" onClick={() => setInspectorOpen((value) => !value)}>Audit</button><button onClick={onRecommission}>Recommission</button>{active.installationMode === 'demo' && <button onClick={() => setLeavingDemo(true)}>Leave Demo</button>}</nav></header>

    <FeedbackLoopPanel loop={loop} />
    {view.kind === 'overview' && <WorldScene plan={plan} onRoom={(roomId) => setView({ kind: 'room', roomId })} />}
    {view.kind === 'room' && room && (
      <RoomDiorama
        room={room}
        agents={roomAgents}
        workItems={roomWorkItems}
        assetPath={room.assetPath}
        bundled={plan.assets.find((asset) => asset.ownerId === room.id)?.source === 'bundled'}
        onBack={() => setView({ kind: 'overview' })}
        onAgent={(agentId) => setView({ kind: 'agent', roomId: room.id, agentId })}
      />
    )}
    {view.kind === 'agent' && room && agent && <AgentView agent={agent} room={room} workItems={agentWorkItems} bundled={plan.assets.find((asset) => asset.ownerId === room.id)?.source === 'bundled'} onBack={() => setView({ kind: 'room', roomId: room.id })} />}

    <div className="world-status"><span className={`mode-pill ${active.installationMode}`}>{active.installationMode}</span><span><i className="status-orb blocked" /> Providers unconfigured</span><span><i className="status-orb" /> Audit ready</span></div>

    {inspectorOpen && <aside className="audit-drawer"><header><div><span className="eyebrow">Secondary overlay</span><h2>Audit Inspector</h2></div><button onClick={() => setInspectorOpen(false)}>Close</button></header><section><h3>Operational records</h3>{Object.entries(partition).map(([key, records]) => <div className="audit-row" key={key}><span>{key}</span><b>{records.length}</b>{records.slice(0, 1).map((record) => <code key={record.id}>{record.id}</code>)}</div>)}{active.installationMode === 'standard' && <p className="honest-state">No seeded work. Add real/user-entered records or configure adapters to begin.</p>}{active.installationMode === 'demo' && <><button className="danger-button" onClick={purgeDemo}>Purge Demo data</button>{purgeMessage && <p className="success-message">{purgeMessage}</p>}</>}</section><section><h3>Adapter boundary</h3><p>Evidence provider: <b>Unconfigured</b></p><p>Model provider: <b>Unconfigured</b></p><p>External writes: <b>Approval-gated</b></p><button className="ghost-button" onClick={() => setWorkflowMessage('Nova requires a configured evidence source and provider. No Demo fallback was used.')}>Check workflow readiness</button>{workflowMessage && <p className="blocked-message">{workflowMessage}</p>}</section><section><h3>Replay</h3><p>{replayCursor === null ? 'Current operational state' : `Event ${replayCursor + 1} of ${partition.events.length}`}. Replay reads recorded data only; adapters are never invoked.</p>{replayCursor !== null && partition.events[replayCursor] && <pre className="event-detail">{JSON.stringify(partition.events[replayCursor], null, 2)}</pre>}<div className="replay-buttons"><button disabled={replayCursor === null || replayCursor <= 0} onClick={() => setReplayCursor((cursor) => cursor === null ? 0 : Math.max(0, cursor - 1))}>Previous</button><button disabled={partition.events.length === 0 || replayCursor === partition.events.length - 1} onClick={() => setReplayCursor((cursor) => cursor === null ? 0 : Math.min(partition.events.length - 1, cursor + 1))}>Next event</button><button disabled={replayCursor === null} onClick={() => setReplayCursor(null)}>Return to current state</button></div></section></aside>}
    {leavingDemo && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Leave Demo confirmation">
      <section className="demo-exit-modal">
        <header><span className="demo-exit-icon" aria-hidden="true">△</span><div><span className="eyebrow">Demo workspace</span><h2 id="leave-demo-title">Leave Demo mode?</h2></div></header>
        <p>Your Standard workspace stays separate and unchanged.</p>
        <label className="demo-purge-option">
          <input className="demo-purge-checkbox" type="checkbox" checked={purgeOnLeave} onChange={(event) => setPurgeOnLeave(event.target.checked)} />
          <span><strong>Purge all Demo records when leaving</strong><small>Deletes only isolated synthetic Demo records. Standard data is never touched.</small></span>
        </label>
        <div className="demo-exit-actions">
          <button type="button" className="demo-cancel-button" onClick={() => setLeavingDemo(false)}>Stay in Demo</button>
          <button type="button" className="demo-confirm-button" onClick={() => onLeaveDemo(purgeOnLeave)}>Confirm leave Demo</button>
        </div>
      </section>
    </div>}
  </main>
}

function AgentView({ agent, room, workItems, bundled, onBack }: { agent: AgentDefinition; room: RoomProfile; workItems: RoomWorkItem[]; bundled: boolean; onBack: () => void }) {
  const portraitPath = bundled ? getAgentPortraitPath(agent.id) : null
  return <section className={`agent-view ${bundled ? '' : 'placeholder-scene'}`} style={bundled ? { backgroundImage: `linear-gradient(90deg, rgba(3,9,16,.22), rgba(3,9,16,.92)), url(${room.assetPath})` } : undefined}>
    {!bundled && <div className="placeholder-copy"><strong>Matching agent scene not rendered</strong><p>No bundled spaceship art is reused for this commissioned style/world.</p></div>}
    <button className="back-control" onClick={onBack}>← Return to {room.name}</button>
    <div className="character-card">
      <div className={`character-portrait ${portraitPath ? 'has-art' : ''}`}>
        {portraitPath ? <img src={portraitPath} alt={`${agent.name}, ${agent.role}`} /> : <span>{agent.name.slice(0, 1)}</span>}
        <i className="status-orb blocked" />
      </div>
      <div className="character-copy">
        <span className="eyebrow">Agent profile / commissioned manifest</span>
        <h1>{agent.name}</h1><h2>{agent.role}</h2><p>{agent.purpose}</p>
        <div className="agent-facts"><div><span>Provider</span><b>{agent.provider}</b></div><div><span>Model</span><b>{agent.model}</b></div><div><span>Fallback</span><b>{agent.fallbackModel}</b></div><div><span>Autonomy</span><b>{agent.autonomy}</b></div><div><span>Memory</span><b>{agent.memoryScope}</b></div><div><span>Status</span><b>Unconfigured</b></div></div>
        <section className="agent-current-work">
          <div className="agent-section-heading"><div><span className="eyebrow">Current assignment</span><h3>Current work</h3></div><b>{workItems.length}</b></div>
          {workItems.length === 0
            ? <p className="honest-state">No work is currently assigned. The agent will not invent activity.</p>
            : <div className="agent-work-list">{workItems.map((item) => <article key={item.id}><div><span>{item.kind}</span><b>{item.status.replaceAll('_', ' ')}</b></div><h4>{item.title}</h4><p>{item.summary}</p><code>{item.id}</code></article>)}</div>}
        </section>
        <section><h3>Permissions</h3>{agent.permissions.map((permission) => <span className="permission-chip" key={permission}>{permission}</span>)}<h3>Prohibited actions</h3>{agent.prohibitedActions.map((action) => <span className="permission-chip" key={action}>{action}</span>)}<h3>Tools</h3><p className="honest-state">{agent.tools.length ? agent.tools.join(', ') : 'No tools configured. Dedicated setup and approval are required.'}</p></section>
      </div>
    </div>
  </section>
}

export default App
