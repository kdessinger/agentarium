import { useState } from 'react'
import {
  VISUAL_STYLES,
  WORLD_TEMPLATES,
  changeVisualStyle,
  createBuildPlan,
  createCommissioningDraft,
  type AgentDefinition,
  type BuildPlan,
  type CommissioningDraft,
  type InstallationMode,
  type RoomProfile,
  type VisualStyleId,
  type WorldTemplateId,
} from './lib/commissioning'
import { createBuildJobs, runNextBuildJob, type BuildJob } from './lib/build'
import { createDemoPartition, createStandardPartition, purgeDemoPartition } from './lib/modes'
import { startStandardWorkflow } from './lib/world'

const ACTIVE_KEY = 'agentarium:active:v1'
const DRAFT_KEY = 'agentarium:commissioning:v1'
const STEP_KEY = 'agentarium:commissioning-step:v1'
const JOBS_KEY = 'agentarium:build-jobs:v1'
const STANDARD_KEY = 'agentarium:standard:v1'
const DEMO_KEY = 'agentarium:demo:v1'

type ActiveRecord = Pick<CommissioningDraft, 'schemaVersion' | 'status' | 'installationMode' | 'visualStyleId' | 'worldTemplateId' | 'worldName'> & { buildPlan?: BuildPlan }

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
  const draft = createCommissioningDraft({
    installationMode: record.installationMode,
    visualStyleId: record.visualStyleId,
    worldTemplateId: record.worldTemplateId,
    worldName: record.worldName,
  })
  return { ...record, buildPlan: createBuildPlan(draft) }
}

function App() {
  const [active, setActive] = useState<ActiveRecord | null>(() => {
    const stored = readJson<ActiveRecord>(ACTIVE_KEY)
    return stored ? normalizeActive(stored) : null
  })
  const [commissioning, setCommissioning] = useState(() => {
    const savedDraft = readJson<CommissioningDraft>(DRAFT_KEY)
    return !active || Boolean(savedDraft && savedDraft.status !== 'complete')
  })

  const finishCommissioning = (record: ActiveRecord) => {
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(record))
    localStorage.removeItem(DRAFT_KEY)
    localStorage.removeItem(STEP_KEY)
    localStorage.removeItem(JOBS_KEY)
    if (record.installationMode === 'standard' && !localStorage.getItem(STANDARD_KEY)) {
      localStorage.setItem(STANDARD_KEY, JSON.stringify(createStandardPartition()))
    }
    if (record.installationMode === 'demo' && !localStorage.getItem(DEMO_KEY)) {
      localStorage.setItem(DEMO_KEY, JSON.stringify(createDemoPartition()))
    }
    setActive(record)
    setCommissioning(false)
  }

  const beginRecommission = () => {
    const basis = active ? createCommissioningDraft({
      installationMode: active.installationMode,
      visualStyleId: active.visualStyleId,
      worldTemplateId: active.worldTemplateId,
      worldName: active.worldName,
    }) : createCommissioningDraft()
    localStorage.setItem(DRAFT_KEY, JSON.stringify(basis))
    localStorage.setItem(STEP_KEY, '0')
    setCommissioning(true)
  }

  if (commissioning) {
    return <CommissioningFlow activeExists={Boolean(active)} onCancel={() => setCommissioning(false)} onComplete={finishCommissioning} />
  }
  if (!active) return null
  return <CommissionedWorld active={normalizeActive(active)} onRecommission={beginRecommission} />
}

function CommissioningFlow({ activeExists, onCancel, onComplete }: { activeExists: boolean; onCancel: () => void; onComplete: (record: ActiveRecord) => void }) {
  const [draft, setDraftState] = useState<CommissioningDraft>(() => readJson<CommissioningDraft>(DRAFT_KEY) ?? createCommissioningDraft())
  const [step, setStepState] = useState(() => Number(localStorage.getItem(STEP_KEY) ?? 0))
  const [jobs, setJobsState] = useState<BuildJob[]>(() => readJson<BuildJob[]>(JOBS_KEY) ?? [])

  const saveDraft = (next: CommissioningDraft) => {
    setDraftState(next)
    localStorage.setItem(DRAFT_KEY, JSON.stringify(next))
  }
  const setStep = (next: number) => {
    setStepState(next)
    localStorage.setItem(STEP_KEY, String(next))
  }
  const saveJobs = (next: BuildJob[]) => {
    setJobsState(next)
    localStorage.setItem(JOBS_KEY, JSON.stringify(next))
  }

  const chooseStyle = (id: VisualStyleId) => saveDraft(changeVisualStyle(draft, id))
  const chooseMode = (installationMode: InstallationMode) => {
    const next = createCommissioningDraft({
      installationMode,
      visualStyleId: draft.visualStyleId,
      worldTemplateId: draft.worldTemplateId,
      worldName: draft.worldName,
    })
    saveDraft(next)
  }
  const chooseWorld = (worldTemplateId: WorldTemplateId) => saveDraft({ ...draft, worldTemplateId })

  const approve = () => {
    const buildPlan = createBuildPlan(draft)
    const next = { ...draft, status: 'building' as const, buildPlan }
    saveDraft(next)
    saveJobs(createBuildJobs(buildPlan))
    setStep(7)
  }
  const runNext = () => saveJobs(runNextBuildJob(jobs))
  const allComplete = jobs.length > 0 && jobs.every((job) => job.status === 'complete')
  const present = () => {
    const complete = { ...draft, status: 'complete' as const }
    saveDraft(complete)
    onComplete({
      schemaVersion: 1,
      status: 'complete',
      installationMode: complete.installationMode,
      visualStyleId: complete.visualStyleId,
      worldTemplateId: complete.worldTemplateId,
      worldName: complete.worldName,
      buildPlan: complete.buildPlan ?? createBuildPlan(complete),
    })
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
        <div className="guide-character" aria-label="Animated Builder Agent">
          <div className="guide-antenna" /><div className="guide-head"><i /><i /></div><div className="guide-body"><span>CG</span></div>
        </div>
        <div className="guide-shadow" />
        <div className="guide-bubble">
          <span className="eyebrow">Builder Agent / Local-only</span>
          {step === 0 && <><h2>How should your Agentarium look?</h2><p>Choose the presentation first. It won’t change your rooms, agents, workflows, memory, or approval rules.</p></>}
          {step === 1 && <><h2>Choose the operating boundary.</h2><p>Standard is recommended and starts empty. Demo is an isolated, non-networked synthetic world.</p></>}
          {step === 2 && <><h2>What kind of world should it live in?</h2><p>Each template changes geography, movement, terminology, and retained art prompts—not just color.</p></>}
          {step === 3 && <><h2>Commission the crew.</h2><p>Provider and model intent stay unconfigured until dedicated setup. No credentials are requested here.</p></>}
          {step === 4 && <><h2>Define the Forges.</h2><p>Forges manufacture sellable output. Communications routes signals and remains a separate room.</p></>}
          {step === 5 && <><h2>Set the governance boundary.</h2><p>External writes, credentials, publishing, spending, destructive actions, and expanded autonomy stay approval-gated.</p></>}
          {step === 6 && <><h2>Inspect the blueprint before I build.</h2><p>Nothing has been activated. The plan is declarative, local, reversible, and ready for your approval.</p></>}
          {step === 7 && <><h2>{allComplete ? 'Construction passed local QA.' : 'Builders are standing by.'}</h2><p>Each visible worker below is one inspectable job. Progress changes only when a job really completes.</p></>}
        </div>
      </section>

      <section className="decision-deck" aria-live="polite">
        {activeExists && <div className="draft-warning"><strong>Recommissioning draft</strong><span>Your active world remains untouched until this build is approved and presented.</span><button onClick={onCancel}>Return to active world</button></div>}
        {step === 0 && <ChoiceGrid items={VISUAL_STYLES} selected={draft.visualStyleId} onSelect={(id) => chooseStyle(id as VisualStyleId)} />}
        {step === 1 && <ModeChooser selected={draft.installationMode} onSelect={chooseMode} />}
        {step === 2 && <WorldChooser selected={draft.worldTemplateId} onSelect={chooseWorld} worldName={draft.worldName} onName={(worldName) => saveDraft({ ...draft, worldName })} />}
        {step === 3 && <AgentReview agents={draft.agents} />}
        {step === 4 && <ForgeReview draft={draft} />}
        {step === 5 && <GovernanceReview draft={draft} />}
        {step === 6 && <BlueprintReview plan={createBuildPlan(draft)} />}
        {step === 7 && <ConstructionBay jobs={jobs} plan={draft.buildPlan ?? createBuildPlan(draft)} />}

        <footer className="decision-footer">
          <div className="step-meter"><span>Commissioning</span><div>{[0,1,2,3,4,5,6,7].map((number) => <i key={number} className={number <= step ? 'done' : ''} />)}</div><b>{Math.min(step + 1, 8)} / 8</b></div>
          <div className="footer-actions">
            {step > 0 && step < 7 && <button className="ghost-button" onClick={() => setStep(step - 1)}>Back</button>}
            {step === 0 && <button className="primary-button" onClick={() => setStep(1)}>Continue</button>}
            {step === 1 && <button className="primary-button" onClick={() => setStep(2)}>Continue</button>}
            {step === 2 && <button className="primary-button" onClick={() => setStep(3)}>Continue</button>}
            {step === 3 && <button className="primary-button" onClick={() => setStep(4)}>Continue to Forges</button>}
            {step === 4 && <button className="primary-button" onClick={() => setStep(5)}>Continue to Governance</button>}
            {step === 5 && <button className="primary-button" onClick={() => setStep(6)}>Review blueprint</button>}
            {step === 6 && <button className="primary-button" onClick={approve}>Approve commissioned build</button>}
            {step === 7 && !allComplete && <button className="primary-button" onClick={runNext}>Run next build job</button>}
            {step === 7 && allComplete && <button className="primary-button" onClick={present}>Present commissioned world</button>}
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
  return <><div className="world-grid">{WORLD_TEMPLATES.map((item) => <button key={item.id} className={`world-card ${selected === item.id ? 'selected' : ''}`} onClick={() => onSelect(item.id)}><span className="world-glyph">{item.label.slice(0, 2).toUpperCase()}</span><strong>{item.label}</strong><small>{item.topology}</small><em>{item.movement}</em></button>)}</div><label className="world-name">World name<input value={worldName} onChange={(event) => onName(event.target.value)} /></label></>
}

function AgentReview({ agents }: { agents: AgentDefinition[] }) {
  return <div className="review-table"><div className="table-heading"><span>Agent</span><span>Purpose</span><span>Provider / model</span><span>Autonomy</span></div>{agents.map((agent) => <div className="table-row" key={agent.id}><strong>{agent.name}<small>{agent.role} · {agent.roomId}</small></strong><span>{agent.purpose}</span><span><b className="state-tag blocked">Unconfigured</b>{agent.provider} / {agent.model}</span><span>{agent.autonomy}<small>{agent.permissions.join(', ')}</small></span></div>)}</div>
}

function ForgeReview({ draft }: { draft: CommissioningDraft }) {
  return <div className="blueprint-columns"><article className="blueprint-panel"><span className="eyebrow">Business / Forge</span><h3>Etsy Forge</h3><p>Supervised product and listing production. It remains unconfigured until evidence, production tools, and external integrations are separately approved.</p><dl><dt>Customer</dt><dd>Not configured</dd><dt>Sellable output</dt><dd>Draft product/listing packet</dd><dt>Maturity</dt><dd>Draft</dd><dt>Approval</dt><dd>Required before external action</dd></dl></article><article className="blueprint-panel"><span className="eyebrow">Signal routing</span><h3>Communications is not a Forge</h3><p>It routes messages, email, comments, alerts, and customer signals from configured channels. It does not manufacture products.</p><div className="fact-line"><span>Channels</span><strong>Unconfigured</strong></div><div className="fact-line"><span>External send</span><strong>Gated</strong></div><div className="fact-line"><span>Mode</span><strong>{draft.installationMode}</strong></div></article></div>
}

function GovernanceReview({ draft }: { draft: CommissioningDraft }) {
  return <div className="governance-grid"><article><span>01</span><strong>Credentials</strong><p>Never collected in chat. Dedicated secure setup remains unconfigured.</p></article><article><span>02</span><strong>External writes</strong><p>Publishing, sending, spending, and destructive actions require explicit approval.</p></article><article><span>03</span><strong>Audit + replay</strong><p>Every transition and result is inspectable. Replay never reruns tools.</p></article><article><span>04</span><strong>Mode partition</strong><p>{draft.installationMode === 'standard' ? 'Standard rejects synthetic_demo provenance.' : 'Demo is non-networked and cannot influence Standard.'}</p></article></div>
}

function BlueprintReview({ plan }: { plan: BuildPlan }) {
  return <div className="blueprint-review"><div className="blueprint-summary"><span className="eyebrow">Inspectable build plan</span><h3>{plan.worldName}</h3><p>{VISUAL_STYLES.find((item) => item.id === plan.style)?.label} · {WORLD_TEMPLATES.find((item) => item.id === plan.worldTemplate)?.label}</p><div className="stat-strip"><span><b>{plan.rooms.length}</b>rooms</span><span><b>{plan.agents.length}</b>agents</span><span><b>{plan.assets.length}</b>assets</span><span><b>{plan.hotspots.length}</b>hotspots</span></div></div><div className="blueprint-list"><h4>Setup requirements</h4>{plan.setupRequirements.map((item) => <p key={item}>○ {item}</p>)}<h4>Warnings</h4>{plan.warnings.map((item) => <p key={item}>△ {item}</p>)}</div><div className="topology-mini"><span>The Bridge</span><i /><span>Nova</span><i /><span>Forge</span><i /><span>Pixel</span><i /><span>Governance</span></div></div>
}

function ConstructionBay({ jobs, plan }: { jobs: BuildJob[]; plan: BuildPlan }) {
  return <div className="build-console"><div className="build-visual"><div className="ship-wireframe">{plan.rooms.slice(0, 12).map((room) => <i key={room.id} title={room.name} />)}</div><span>{jobs.filter((job) => job.status === 'complete').length} / {jobs.length} verified jobs</span></div><div className="job-list">{jobs.map((job, index) => <article key={job.id} className={job.status}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{job.worker}</strong><small>{job.label}</small></div><b>{job.status}</b><em>{job.attempts ? `attempt ${job.attempts}` : 'not started'}</em></article>)}</div></div>
}

function CommissionedWorld({ active, onRecommission }: { active: ActiveRecord; onRecommission: () => void }) {
  const plan = active.buildPlan!
  const [view, setView] = useState<{ kind: 'overview' | 'room' | 'agent'; roomId?: string; agentId?: string }>({ kind: 'overview' })
  const [inspectorOpen, setInspectorOpen] = useState(false)
  const [purgeMessage, setPurgeMessage] = useState('')
  const [workflowMessage, setWorkflowMessage] = useState('')
  const partition = (() => {
    const key = active.installationMode === 'demo' ? DEMO_KEY : STANDARD_KEY
    const stored = readJson<ReturnType<typeof createStandardPartition>>(key)
    if (stored) return stored
    const created = active.installationMode === 'demo' ? createDemoPartition() : createStandardPartition()
    localStorage.setItem(key, JSON.stringify(created))
    return created
  })()

  const purgeDemo = () => {
    localStorage.setItem(DEMO_KEY, JSON.stringify(purgeDemoPartition(partition)))
    setPurgeMessage('Demo records purged')
  }
  const room = plan.rooms.find((item) => item.id === view.roomId)
  const agent = plan.agents.find((item) => item.id === view.agentId)

  return <main className={`world-shell style-${active.visualStyleId}`}>
    {active.installationMode === 'demo' && <div className="demo-banner">DEMO MODE — synthetic data; no external actions</div>}
    <header className="world-header"><div className="brand-mark">A</div><div><span className="eyebrow">{active.worldName}</span><strong>{WORLD_TEMPLATES.find((item) => item.id === active.worldTemplateId)?.label} / {VISUAL_STYLES.find((item) => item.id === active.visualStyleId)?.label}</strong></div><nav><button onClick={() => setView({ kind: 'overview' })}>World</button><button aria-label="Open audit inspector" onClick={() => setInspectorOpen((value) => !value)}>Audit</button><button onClick={onRecommission}>Recommission</button></nav></header>

    {view.kind === 'overview' && <WorldOverview plan={plan} onRoom={(roomId) => setView({ kind: 'room', roomId })} />}
    {view.kind === 'room' && room && <RoomView room={room} agents={plan.agents.filter((item) => item.roomId === room.id)} onBack={() => setView({ kind: 'overview' })} onAgent={(agentId) => setView({ kind: 'agent', roomId: room.id, agentId })} bundled={plan.assets.find((asset) => asset.ownerId === room.id)?.source === 'bundled'} />}
    {view.kind === 'agent' && room && agent && <AgentView agent={agent} room={room} onBack={() => setView({ kind: 'room', roomId: room.id })} />}

    <div className="world-status"><span className={`mode-pill ${active.installationMode}`}>{active.installationMode}</span><span><i className="status-orb blocked" /> Providers unconfigured</span><span><i className="status-orb" /> Audit ready</span></div>

    {inspectorOpen && <aside className="audit-drawer"><header><div><span className="eyebrow">Secondary overlay</span><h2>Audit Inspector</h2></div><button onClick={() => setInspectorOpen(false)}>Close</button></header><section><h3>Operational records</h3>{Object.entries(partition).map(([key, records]) => <div className="audit-row" key={key}><span>{key}</span><b>{records.length}</b>{records.slice(0, 1).map((record) => <code key={record.id}>{record.id}</code>)}</div>)}{active.installationMode === 'standard' && <p className="honest-state">No seeded work. Add real/user-entered records or configure adapters to begin.</p>}{active.installationMode === 'demo' && <><button className="danger-button" onClick={purgeDemo}>Purge Demo data</button>{purgeMessage && <p className="success-message">{purgeMessage}</p>}</>}</section><section><h3>Adapter boundary</h3><p>Evidence provider: <b>Unconfigured</b></p><p>Model provider: <b>Unconfigured</b></p><p>External writes: <b>Approval-gated</b></p><button className="ghost-button" onClick={() => setWorkflowMessage(startStandardWorkflow({ evidenceConfigured: false, providerConfigured: false }).reason)}>Check workflow readiness</button>{workflowMessage && <p className="blocked-message">{workflowMessage}</p>}</section><section><h3>Replay</h3><p>Event 0 of {partition.events.length}. Replay reads snapshots only; adapters are never invoked.</p><div className="replay-buttons"><button disabled>Previous</button><button disabled={partition.events.length === 0}>Next event</button><button>Return to current state</button></div></section></aside>}
  </main>
}

function WorldOverview({ plan, onRoom }: { plan: BuildPlan; onRoom: (roomId: string) => void }) {
  const ship = plan.assets.find((asset) => asset.kind === 'ship_background')
  return <section className="world-overview"><div className="scene-title"><span className="eyebrow">Image-first operational world</span><h1>World Overview</h1><p>Double-click a room to enter. Every glow and status is tied to commissioned state.</p></div><label className="mobile-room-chooser"><span>Enter room</span><select aria-label="Choose a room" defaultValue="" onChange={(event) => { if (event.target.value) onRoom(event.target.value) }}><option value="" disabled>Choose a commissioned room…</option>{plan.rooms.map((room) => <option key={room.id} value={room.id}>{room.name} — {room.status}</option>)}</select></label><div className={`ship-scene ${ship?.source === 'placeholder' ? 'placeholder-scene' : ''}`} style={ship?.path ? { backgroundImage: `linear-gradient(180deg, rgba(3,10,17,.12), rgba(3,10,17,.4)), url(${ship.path})` } : undefined}>{ship?.source === 'placeholder' && <div className="placeholder-copy"><strong>Matching art not rendered</strong><p>{ship.prompt}</p><span>Prompt retained · no external generation called</span></div>}{plan.hotspots.map((hotspot) => {
    const xs = hotspot.polygon.map((point) => point.x); const ys = hotspot.polygon.map((point) => point.y)
    const room = plan.rooms.find((item) => item.id === hotspot.targetId)!
    return <button key={hotspot.id} aria-label={`Open ${room.name}`} className={`room-hotspot ${room.status}`} style={{ left: `${Math.min(...xs) * 100}%`, top: `${Math.min(...ys) * 100}%`, width: `${(Math.max(...xs) - Math.min(...xs)) * 100}%`, height: `${(Math.max(...ys) - Math.min(...ys)) * 100}%` }} onDoubleClick={() => onRoom(room.id)} onKeyDown={(event) => { if (event.key === 'Enter') onRoom(room.id) }}><span>{room.name}</span><i /></button>})}</div><div className="overview-legend"><span><i className="status-orb blocked" />Unconfigured</span><span><i className="status-orb idle" />Idle / non-production</span><span>Double-click or press Enter</span></div></section>
}

function RoomView({ room, agents, onBack, onAgent, bundled }: { room: RoomProfile; agents: AgentDefinition[]; onBack: () => void; onAgent: (id: string) => void; bundled: boolean }) {
  return <section className="room-view"><div className="room-background" style={bundled ? { backgroundImage: `linear-gradient(90deg, rgba(3,9,16,.08), rgba(3,9,16,.6)), url(${room.assetPath})` } : undefined}>{!bundled && <div className="placeholder-copy"><strong>{room.name} art pending</strong><p>Matching generated prompt retained for future approved rendering.</p></div>}<button className="back-control" onClick={onBack}>← Return to World</button><div className="room-profile"><span className="eyebrow">Room profile / {room.type}</span><h1>{room.name}</h1><p>{room.description}</p><dl><dt>Level</dt><dd>{room.level}</dd><dt>Status</dt><dd><span className="state-tag blocked">{room.status}</span></dd><dt>Tools</dt><dd>None configured</dd><dt>Queues</dt><dd>No operational records</dd></dl></div><div className="agent-stage">{agents.map((agent) => <button key={agent.id} aria-label={`Open ${agent.name} profile`} className="agent-sprite" onClick={() => onAgent(agent.id)} onDoubleClick={() => onAgent(agent.id)}><i>{agent.name.slice(0, 1)}</i><span>{agent.name}<small>{agent.role}</small></span></button>)}{agents.length === 0 && <div className="empty-agent-state"><strong>No agent assigned</strong><span>This commissioned room is honest standby space.</span></div>}</div></div></section>
}

function AgentView({ agent, room, onBack }: { agent: AgentDefinition; room: RoomProfile; onBack: () => void }) {
  return <section className="agent-view" style={{ backgroundImage: `linear-gradient(90deg, rgba(3,9,16,.22), rgba(3,9,16,.92)), url(${room.assetPath})` }}><button className="back-control" onClick={onBack}>← Return to {room.name}</button><div className="character-card"><div className="character-portrait"><span>{agent.name.slice(0, 1)}</span><i className="status-orb blocked" /></div><div className="character-copy"><span className="eyebrow">Agent profile / commissioned manifest</span><h1>{agent.name}</h1><h2>{agent.role}</h2><p>{agent.purpose}</p><div className="agent-facts"><div><span>Provider</span><b>{agent.provider}</b></div><div><span>Model</span><b>{agent.model}</b></div><div><span>Fallback</span><b>{agent.fallbackModel}</b></div><div><span>Autonomy</span><b>{agent.autonomy}</b></div><div><span>Memory</span><b>{agent.memoryScope}</b></div><div><span>Status</span><b>Unconfigured</b></div></div><section><h3>Permissions</h3>{agent.permissions.map((permission) => <span className="permission-chip" key={permission}>{permission}</span>)}<h3>Tools</h3><p className="honest-state">No tools configured. Dedicated setup and approval are required.</p></section></div></div></section>
}

export default App
