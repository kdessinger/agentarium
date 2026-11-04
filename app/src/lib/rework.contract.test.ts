import { describe, expect, it } from 'vitest'
import {
  SCHEMA_VERSION,
  changeVisualStyle,
  createBuildPlan,
  createCommissioningDraft,
  validateCommissioningDraft,
} from './commissioning'
import {
  exportDraft,
  importDraft,
  loadWorkspace,
  restartWithBackup,
  type StorageLike,
} from './persistence'
import {
  advanceBuild,
  cancelBuild,
  createBuildJobs,
  pauseBuild,
  replaceRoomAsset,
  resolveAssetReview,
  resumeBuild,
  retryJob,
  validateBuildJobs,
} from './build'
import {
  appendEvent,
  createApprovalRequest,
  resolveApproval,
  replayAt,
} from './world'
import { appendApprovalRecord, appendAuditRecord, createDemoPartition, createStandardPartition, validatePartition } from './modes'

function memoryStorage(initial: Record<string, string> = {}): StorageLike {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value) },
    removeItem: (key) => { values.delete(key) },
  }
}

describe('validated persistence boundaries', () => {
  it('rejects malformed and unsupported commissioning records', () => {
    expect(validateCommissioningDraft({ schemaVersion: 999 })).toMatchObject({ ok: false })
    expect(validateCommissioningDraft({ nope: true })).toMatchObject({ ok: false })
    expect(validateCommissioningDraft({ ...createCommissioningDraft(), agents: [{ id: 'broken' }] })).toMatchObject({ ok: false })
  })

  it('rejects tampered Standard records containing Demo IDs or provenance', () => {
    const standard = createCommissioningDraft({ installationMode: 'standard' })
    standard.operational.events.push({
      id: 'demo:event:tampered',
      provenance: { dataClass: 'synthetic_demo', sourceType: 'demo_fixture', sourceId: 'demo:fixture' },
    })
    expect(validateCommissioningDraft(standard)).toMatchObject({ ok: false })
  })

  it('rejects remote or mismatched asset paths during hydration', () => {
    const draft = createCommissioningDraft({ installationMode: 'demo' })
    draft.status = 'complete'
    draft.buildPlan = createBuildPlan(draft)
    draft.buildPlan.assets[0].path = 'https://tracker.invalid/demo.png'
    expect(validateCommissioningDraft(draft)).toMatchObject({ ok: false })
    const roomTamper = createCommissioningDraft()
    roomTamper.rooms[0].assetPath = 'data:image/svg+xml,remote'
    expect(validateCommissioningDraft(roomTamper)).toMatchObject({ ok: false })
  })

  it('rejects tampered separately persisted Standard operational partitions', () => {
    const partition = createStandardPartition()
    partition.events.push({ id: 'demo:event:tampered', provenance: { dataClass: 'synthetic_demo', sourceType: 'demo_fixture', sourceId: 'demo:fixture' } })
    expect(() => validatePartition('standard', partition)).toThrow('rejects Demo namespace and provenance')
  })

  it('keeps Standard and Demo workspaces separate when hydrating and purging', () => {
    const standard = createCommissioningDraft({ installationMode: 'standard', worldName: 'Standard Ship' })
    const demo = createCommissioningDraft({ installationMode: 'demo', worldName: 'Demo Ship' })
    const storage = memoryStorage({
      'agentarium:standard:active:v2': JSON.stringify(standard),
      'agentarium:demo:active:v2': JSON.stringify(demo),
    })
    expect(loadWorkspace(storage, 'standard').record?.worldName).toBe('Standard Ship')
    expect(loadWorkspace(storage, 'demo').record?.worldName).toBe('Demo Ship')
    storage.removeItem('agentarium:demo:active:v2')
    expect(loadWorkspace(storage, 'standard').record?.worldName).toBe('Standard Ship')
  })

  it('backs up a restartable draft and round-trips export/import', () => {
    const storage = memoryStorage()
    const draft = createCommissioningDraft({ worldName: 'Recover Me' })
    const restarted = restartWithBackup(storage, draft)
    expect(restarted.backup.worldName).toBe('Recover Me')
    expect(restarted.draft.worldName).not.toBe('Recover Me')
    const imported = importDraft(exportDraft(draft))
    expect(imported.worldName).toBe('Recover Me')
  })

  it('rejects malformed JSON imports instead of silently trusting them', () => {
    expect(() => importDraft('{broken')).toThrow('Invalid commissioning JSON')
    expect(() => importDraft(JSON.stringify({ schemaVersion: SCHEMA_VERSION, installationMode: 'standard' }))).toThrow('Invalid commissioning record')
  })

  it('allows an incomplete custom draft to resume but requires confirmation before building', () => {
    const draft = createCommissioningDraft({ visualStyleId: 'custom', worldTemplateId: 'custom' })
    expect(importDraft(exportDraft(draft))).toMatchObject({ status: 'interviewing' })
    expect(validateCommissioningDraft({ ...draft, status: 'building', buildPlan: createBuildPlan(draft) })).toMatchObject({ ok: false })
  })
})

describe('complete structured interview and blueprint', () => {
  it('carries the owner mission into the build plan before presentation choices', () => {
    const draft = createCommissioningDraft()
    draft.articulation = {
      ...draft.articulation,
      ownerName: 'Kenn',
      vision: 'Create an AI operations world that can turn goals into visible, governed work.',
      desiredOutcomes: ['Route work through specialized labs', 'Keep approvals inspectable'],
      operatingBoundaries: ['No external action without approval'],
    }
    const plan = createBuildPlan(draft)
    expect(plan.articulation).toEqual(draft.articulation)
    expect(plan.articulation.vision).toContain('visible, governed work')
  })

  it('captures agent, Forge, governance, and custom interpretation fields', () => {
    const draft = createCommissioningDraft()
    const agent = draft.agents[0]
    expect(agent).toMatchObject({
      provider: expect.any(String), model: expect.any(String), fallbackModel: expect.any(String),
      tools: expect.any(Array), permissions: expect.any(Array), prohibitedActions: expect.any(Array),
      memoryScope: expect.any(String), approvalTriggers: expect.any(Array), subagents: expect.any(Array),
      budget: expect.any(String), successMeasures: expect.any(Array),
    })
    expect(draft.businesses[0]).toMatchObject({
      customer: expect.any(String), inputs: expect.any(Array), outputs: expect.any(Array),
      productionAgentIds: expect.any(Array), qaAgentIds: expect.any(Array), approvalPoints: expect.any(Array),
      metrics: expect.any(Array), risks: expect.any(Array),
    })
    expect(draft.governance).toMatchObject({ deploymentIntent: expect.any(String), retention: expect.any(String), backupExport: expect.any(String), failureRetry: expect.any(String) })
    const custom = createCommissioningDraft({ visualStyleId: 'custom', worldTemplateId: 'custom' })
    expect(custom.presentation.customStyleDescription).toBeDefined()
    expect(custom.theme.customThemeDescription).toBeDefined()
    expect(custom.presentation.interpretationConfirmed).toBe(false)
    expect(custom.theme.interpretationConfirmed).toBe(false)
  })

  it('assigns Caspian to the Treasury room as the unit-economics specialist', () => {
    const draft = createCommissioningDraft()
    expect(draft.agents.find((agent) => agent.id === 'caspian')).toMatchObject({
      name: 'Caspian',
      role: 'Treasury & Unit Economics',
      roomId: 'treasury',
    })
    expect(draft.rooms.find((room) => room.id === 'treasury')?.agentIds).toContain('caspian')
  })

  it('build plan exposes topology, permissions, businesses, gates, costs, assumptions and non-goals', () => {
    const plan = createBuildPlan(createCommissioningDraft())
    expect(plan.adjacency.length).toBeGreaterThan(10)
    expect(plan.rooms[0]).toMatchObject({ name: expect.any(String), type: expect.any(String), description: expect.any(String), level: expect.any(String) })
    expect(plan.agents[0].prohibitedActions).toContain('external action without approval')
    expect(plan.businesses.length).toBeGreaterThan(0)
    expect(plan.approvalGates.length).toBeGreaterThan(0)
    expect(plan.externalEstimate).toMatchObject({ calls: 0, cost: 0 })
    expect(plan.assumptions.length).toBeGreaterThan(0)
    expect(plan.openQuestions.length).toBeGreaterThan(0)
    expect(plan.nonGoals.length).toBeGreaterThan(0)
  })

  it('world templates produce materially different topology and terminology', () => {
    const ship = createBuildPlan(createCommissioningDraft({ worldTemplateId: 'spaceship' }))
    const tower = createBuildPlan(createCommissioningDraft({ worldTemplateId: 'skyscraper' }))
    expect(tower.adjacency).not.toEqual(ship.adjacency)
    expect(tower.movementMetaphor).not.toBe(ship.movementMetaphor)
    expect(tower.rooms.map((room) => room.name)).not.toEqual(ship.rooms.map((room) => room.name))
    expect(tower.artDirection).not.toBe(ship.artDirection)
  })

  it('visual style changes preserve operational topology and schedule only visual replacements', () => {
    const draft = createCommissioningDraft()
    const changed = changeVisualStyle(draft, 'illustrated_2d')
    expect(changed.rooms).toEqual(draft.rooms)
    expect(changed.adjacency).toEqual(draft.adjacency)
    expect(changed.operational).toBe(draft.operational)
    expect(changed.pendingChangeScope).toBe('visual_assets_only')
  })

  it('uses authored valid polygons for bundled ship compartments', () => {
    const plan = createBuildPlan(createCommissioningDraft({ worldTemplateId: 'spaceship' }))
    const ids = new Set(plan.rooms.map((room) => room.id))
    expect(plan.hotspots).toHaveLength(plan.rooms.length)
    for (const hotspot of plan.hotspots) {
      expect(ids.has(hotspot.targetId)).toBe(true)
      expect(hotspot.polygon.length).toBeGreaterThanOrEqual(4)
      for (const point of hotspot.polygon) {
        expect(point.x).toBeGreaterThanOrEqual(0)
        expect(point.x).toBeLessThanOrEqual(1)
        expect(point.y).toBeGreaterThanOrEqual(0)
        expect(point.y).toBeLessThanOrEqual(1)
      }
    }
  })

  it('never assigns bundled spaceship art to non-bundled combinations', () => {
    const plan = createBuildPlan(createCommissioningDraft({ visualStyleId: 'clean_vector', worldTemplateId: 'resort' }))
    expect(plan.assets.every((asset) => asset.source === 'placeholder')).toBe(true)
    expect(plan.assets.every((asset) => !asset.path.includes('concept-art'))).toBe(true)
    expect(plan.hotspots).toEqual([])
  })
})

describe('truthful inspectable build jobs', () => {
  it('records attempt identifiers, timestamps, inputs, validated results, and dependencies', () => {
    const plan = createBuildPlan(createCommissioningDraft())
    const advanced = advanceBuild(plan, createBuildJobs(plan), { now: () => '2026-08-23T12:00:00.000Z' })
    expect(advanced[0].status).toBe('complete')
    expect(advanced[0].attempts[0]).toMatchObject({
      attemptId: expect.stringMatching(/^attempt:/), startedAt: expect.any(String), completedAt: expect.any(String),
      input: expect.any(Object), result: expect.any(Object), validation: { ok: true },
    })
    expect(advanced[1].status).toBe('planned')
  })

  it('supports pause, resume, cancel, failure injection, retry, and idempotency', () => {
    const plan = createBuildPlan(createCommissioningDraft())
    const jobs = createBuildJobs(plan)
    expect(resumeBuild(pauseBuild(jobs))[0].status).toBe('planned')
    const cancelled = cancelBuild(jobs)
    expect(cancelled.every((job) => job.status === 'cancelled')).toBe(true)
    expect(resumeBuild(cancelled).every((job) => job.status === 'planned')).toBe(true)
    const failed = advanceBuild(plan, jobs, { failJobId: 'topology' })
    expect(failed[0].status).toBe('failed')
    const retried = retryJob(failed, 'topology')
    expect(retried[0].status).toBe('planned')
    const complete = advanceBuild(plan, retried)
    const again = advanceBuild(plan, complete)
    expect(again[0]).toEqual(complete[0])
  })

  it('rejects forged complete jobs and jobs from a different plan', () => {
    const plan = createBuildPlan(createCommissioningDraft())
    const forged = createBuildJobs(plan)
    forged[0].status = 'complete'
    expect(() => validateBuildJobs(forged, plan)).toThrow('lacks a successful attempt')
    const completed = advanceBuild(plan, createBuildJobs(plan))
    expect(validateBuildJobs(completed, plan)[0].status).toBe('complete')
    const other = { ...plan, id: 'plan:other' }
    expect(() => validateBuildJobs(completed, other)).toThrow('Invalid build job')
  })

  it('replaces one room asset without rebuilding completed jobs', () => {
    const plan = createBuildPlan(createCommissioningDraft())
    const jobs = advanceBuild(plan, createBuildJobs(plan))
    const changed = replaceRoomAsset(plan, jobs, 'bridge', { source: 'placeholder', path: '', prompt: 'replacement bridge' })
    expect(changed.plan.assets.find((asset) => asset.ownerId === 'bridge')?.prompt).toBe('replacement bridge')
    expect(changed.jobs.find((job) => job.id === 'topology')).toEqual(jobs.find((job) => job.id === 'topology'))
    expect(changed.review.status).toBe('needs_review')
    expect(changed.jobs.find((job) => job.id === 'qa')?.status).toBe('paused')
    const approved = resolveAssetReview(changed.plan, changed.jobs, changed.review.id, 'approved')
    expect(approved.plan.assets.find((asset) => asset.id === changed.review.id)?.status).toBe('approved')
    expect(approved.plan.assets.find((asset) => asset.id === changed.review.id)?.previous).toBeUndefined()
    expect(approved.jobs.find((job) => job.id === 'qa')?.status).toBe('planned')
  })

  it('persists pending replacement context and restores the prior asset on rejection', () => {
    const plan = createBuildPlan(createCommissioningDraft())
    const original = plan.assets.find((asset) => asset.ownerId === 'bridge')!
    const changed = replaceRoomAsset(plan, createBuildJobs(plan), 'bridge', { source: 'placeholder', path: '', prompt: 'review candidate' })
    const hydrated = structuredClone(changed.plan)
    const pending = hydrated.assets.find((asset) => asset.status === 'needs_review' && asset.previous)
    expect(pending?.id).toBe(changed.review.id)
    const rejected = resolveAssetReview(hydrated, changed.jobs, changed.review.id, 'rejected')
    expect(rejected.plan.assets.find((asset) => asset.ownerId === 'bridge')).toEqual(original)
    expect(rejected.plan.assets.some((asset) => asset.status === 'rejected')).toBe(false)
  })
})

describe('append-only audit, approvals and isolated replay', () => {
  it('appends sequenced typed events without changing prior events', () => {
    const first = appendEvent([], { type: 'commissioning.started', summary: 'Started', detail: 'Local', provenance: { dataClass: 'user_entered', sourceType: 'user', sourceId: 'owner' } }, '2026-08-23T12:00:00.000Z')
    const second = appendEvent(first, { type: 'blueprint.approved', summary: 'Approved', detail: 'Owner approved', provenance: { dataClass: 'user_entered', sourceType: 'user', sourceId: 'owner' } }, '2026-08-23T12:01:00.000Z')
    expect(first).toHaveLength(1)
    expect(second.map((event) => event.sequence)).toEqual([1, 2])
  })

  it('supports approval approve, deny and revise paths with reasons', () => {
    const request = createApprovalRequest('approval:1', 'Review build')
    expect(resolveApproval(request, 'approved', 'Looks right').status).toBe('approved')
    expect(resolveApproval(request, 'denied', 'Unsafe').decisionReason).toBe('Unsafe')
    expect(resolveApproval(request, 'revision_requested', 'Change Forge').status).toBe('revision_requested')
  })

  it('reduces replay from events without adapters or current-state mutation', () => {
    let adapterCalls = 0
    const events = appendEvent([], { type: 'room.activated', summary: 'Bridge active', detail: 'Changed', stationId: 'bridge', provenance: { dataClass: 'user_entered', sourceType: 'user', sourceId: 'owner' } })
    const current = { selectedRoomId: 'archives', statusByRoom: { bridge: 'idle' } }
    const frame = replayAt(events, 1, current, () => { adapterCalls += 1 })
    expect(frame.state.selectedRoomId).toBe('bridge')
    expect(current.selectedRoomId).toBe('archives')
    expect(adapterCalls).toBe(0)
  })

  it('Demo fixtures remain non-networked', () => {
    const demo = createDemoPartition()
    expect(demo.events.every((record) => record.provenance.dataClass === 'synthetic_demo')).toBe(true)
    expect(createStandardPartition().events).toEqual([])
  })

  it('appends approval and audit records with stable mode provenance and sequence', () => {
    let partition = appendApprovalRecord('standard', createStandardPartition(), { status: 'revision_requested', decisionReason: 'Revise Forge' })
    partition = appendAuditRecord('standard', partition, { type: 'approval.revision_requested', summary: 'Revision requested', detail: 'Revise Forge' })
    const second = appendAuditRecord('standard', partition, { type: 'world.presented', summary: 'Presented', detail: 'Approved world' })
    expect(second.events.map((event) => event.sequence)).toEqual([1, 2])
    expect(second.approvals[0].provenance.dataClass).toBe('user_entered')
  })
})
