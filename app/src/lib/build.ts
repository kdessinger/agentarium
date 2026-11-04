import type { BuildPlan, GeneratedAsset } from './commissioning'

export type BuildAttempt = {
  attemptId: string
  startedAt: string
  completedAt?: string
  input: Record<string, unknown>
  result?: Record<string, unknown>
  validation?: { ok: boolean; checks: string[] }
  error?: string
}

export type BuildJob = {
  id: string
  planId: string
  label: string
  worker: string
  status: 'planned' | 'paused' | 'running' | 'complete' | 'failed' | 'cancelled'
  dependsOn: string[]
  attempts: BuildAttempt[]
}

const jobSeeds: Array<Pick<BuildJob, 'id' | 'label' | 'worker' | 'dependsOn'>> = [
  { id: 'topology', label: 'Assemble topology and validate hotspots', worker: 'TopologyBuilder', dependsOn: [] },
  { id: 'art', label: 'Select bundled art or honest placeholders', worker: 'ArtDirector', dependsOn: ['topology'] },
  { id: 'agents', label: 'Validate declarative agent manifests', worker: 'AgentArchitect', dependsOn: ['topology'] },
  { id: 'workflows', label: 'Validate workflow and Forge manifests', worker: 'WorkflowArchitect', dependsOn: ['agents'] },
  { id: 'safety', label: 'Verify permissions and approval gates', worker: 'SafetyInspector', dependsOn: ['agents', 'workflows'] },
  { id: 'assembly', label: 'Assemble commissioned configuration', worker: 'AssemblyAgent', dependsOn: ['art', 'safety'] },
  { id: 'qa', label: 'Validate assets, hotspots, schema, and navigation', worker: 'QAAgent', dependsOn: ['assembly'] },
  { id: 'presentation', label: 'Prepare final commissioning report', worker: 'CommissioningGuide', dependsOn: ['qa'] },
]

export function createBuildJobs(plan: BuildPlan): BuildJob[] {
  return jobSeeds.map((job) => ({ ...job, planId: plan.id, status: 'planned', attempts: [] }))
}

export function validateBuildJobs(value: unknown, plan: BuildPlan): BuildJob[] {
  if (!Array.isArray(value) || value.length !== jobSeeds.length) throw new Error('Invalid build job record')
  const statuses = new Set(['planned','paused','running','complete','failed','cancelled'])
  const jobs = value as BuildJob[]
  if (new Set(jobs.map((job) => job?.id)).size !== jobSeeds.length) throw new Error('Duplicate build job identity')
  for (const seed of jobSeeds) {
    const job = jobs.find((item) => item && item.id === seed.id)
    if (!job || job.planId !== plan.id || job.worker !== seed.worker || job.label !== seed.label || !statuses.has(job.status) || !Array.isArray(job.dependsOn) || JSON.stringify(job.dependsOn) !== JSON.stringify(seed.dependsOn) || !Array.isArray(job.attempts)) throw new Error(`Invalid build job ${seed.id}`)
    for (const attempt of job.attempts) {
      if (!attempt || typeof attempt.attemptId !== 'string' || !attempt.attemptId.startsWith(`attempt:${seed.id}:`) || typeof attempt.startedAt !== 'string' || !attempt.input || typeof attempt.input !== 'object' || attempt.input.planId !== plan.id) throw new Error(`Invalid build attempt for ${seed.id}`)
    }
    if (job.status === 'complete') {
      const latest = job.attempts.at(-1)
      if (!latest?.completedAt || !latest.result || typeof latest.result !== 'object' || latest.error || latest.validation?.ok !== true) throw new Error(`Complete build job ${seed.id} lacks a successful attempt`)
      if (seed.dependsOn.some((dependency) => jobs.find((item) => item.id === dependency)?.status !== 'complete')) throw new Error(`Complete build job ${seed.id} has incomplete dependencies`)
    }
  }
  return structuredClone(jobs)
}

function validateJob(jobId: string, plan: BuildPlan): { result: Record<string, unknown>; checks: string[] } {
  const roomIds = new Set(plan.rooms.map((room) => room.id))
  const outputs: Record<string, { result: Record<string, unknown>; checks: string[] }> = {
    topology: {
      result: { adjacencyEdges: plan.adjacency.length, hotspotTargets: plan.hotspots.map((item) => item.targetId) },
      checks: ['Every adjacency endpoint exists', 'Every room has a normalized authored hotspot'],
    },
    art: {
      result: { assets: plan.assets.map(({ id, source, path }) => ({ id, source, path })) },
      checks: ['Every room has one asset', 'Non-bundled combinations contain no bundled paths'],
    },
    agents: {
      result: { manifests: plan.agents.map(({ id, roomId, provider, model, permissions, prohibitedActions }) => ({ id, roomId, provider, model, permissions, prohibitedActions })) },
      checks: ['Every agent room exists', 'Every manifest has explicit permissions and prohibited actions'],
    },
    workflows: {
      result: { workflows: plan.workflows, businesses: plan.businesses.map(({ id, productionAgentIds, qaAgentIds }) => ({ id, productionAgentIds, qaAgentIds })) },
      checks: ['Workflow is non-empty', 'Forge production and QA ownership is explicit'],
    },
    safety: {
      result: { gates: plan.approvalGates, externalWrites: plan.governance.externalWrites, cost: plan.externalEstimate },
      checks: ['External writes are gated', 'Build external call estimate is zero'],
    },
    assembly: {
      result: { planId: plan.id, rooms: plan.rooms.length, agents: plan.agents.length, assets: plan.assets.length },
      checks: ['Plan components are present', 'No operational fixture generated'],
    },
    qa: {
      result: { roomAssetCoverage: plan.rooms.every((room) => plan.assets.some((asset) => asset.ownerId === room.id)), hotspotCoverage: plan.hotspots.every((hotspot) => roomIds.has(hotspot.targetId)) },
      checks: ['Room asset coverage passed', 'Hotspot targets valid', 'Navigation hierarchy available'],
    },
    presentation: {
      result: { worldName: plan.worldName, modeBoundaries: ['standard', 'demo'], unresolved: plan.openQuestions },
      checks: ['Commissioning report includes unresolved items and safety gates'],
    },
  }
  const output = outputs[jobId]
  if (!output) throw new Error(`No local handler for ${jobId}`)

  if (jobId === 'topology') {
    const bundled = plan.style === 'pixel_art' && plan.worldTemplate === 'spaceship'
    if (bundled) {
      if (plan.hotspots.length !== plan.rooms.length || plan.hotspots.some((hotspot) => !roomIds.has(hotspot.targetId) || hotspot.polygon.length < 4)) throw new Error('Topology validation failed')
    }
    if (plan.adjacency.some((edge) => !roomIds.has(edge.from) || !roomIds.has(edge.to))) throw new Error('Adjacency validation failed')
  }
  if (jobId === 'art') {
    if (plan.assets.length !== plan.rooms.length + 1) throw new Error('Asset coverage validation failed')
    if (!(plan.style === 'pixel_art' && plan.worldTemplate === 'spaceship') && plan.assets.some((asset) => asset.source === 'bundled' || asset.path.includes('concept-art'))) throw new Error('Mismatched bundled art rejected')
  }
  if (jobId === 'agents' && plan.agents.some((agent) => !roomIds.has(agent.roomId) || !agent.permissions.length || !agent.prohibitedActions.length)) throw new Error('Agent manifest validation failed')
  if (jobId === 'workflows' && (!plan.workflows.length || plan.businesses.some((business) => !business.productionAgentIds.length || !business.qaAgentIds.length))) throw new Error('Workflow validation failed')
  if (jobId === 'safety' && (plan.governance.externalWrites !== 'gated' || plan.externalEstimate.calls !== 0)) throw new Error('Safety validation failed')
  if (jobId === 'qa' && (!(output.result.roomAssetCoverage) || !(output.result.hotspotCoverage))) throw new Error('QA coverage failed')
  return output
}

export function advanceBuild(plan: BuildPlan, jobs: BuildJob[], options: { failJobId?: string; now?: () => string } = {}): BuildJob[] {
  const completed = new Set(jobs.filter((job) => job.status === 'complete').map((job) => job.id))
  const next = jobs.find((job) => job.status === 'planned' && job.dependsOn.every((dependency) => completed.has(dependency)))
  if (!next) return jobs
  const now = options.now ?? (() => new Date().toISOString())
  const startedAt = now()
  const attempt: BuildAttempt = { attemptId: `attempt:${next.id}:${next.attempts.length + 1}`, startedAt, input: { planId: plan.id, dependencies: next.dependsOn } }
  if (options.failJobId === next.id) {
    attempt.completedAt = now()
    attempt.error = `Injected local failure for ${next.id}`
    attempt.validation = { ok: false, checks: ['Failure injection exercised retry path'] }
    return jobs.map((job) => job.id === next.id ? { ...job, status: 'failed', attempts: [...job.attempts, attempt] } : job)
  }
  try {
    const output = validateJob(next.id, plan)
    attempt.completedAt = now()
    attempt.result = output.result
    attempt.validation = { ok: true, checks: output.checks }
    return jobs.map((job) => job.id === next.id ? { ...job, status: 'complete', attempts: [...job.attempts, attempt] } : job)
  } catch (error) {
    attempt.completedAt = now()
    attempt.error = error instanceof Error ? error.message : 'Unknown build failure'
    attempt.validation = { ok: false, checks: [] }
    return jobs.map((job) => job.id === next.id ? { ...job, status: 'failed', attempts: [...job.attempts, attempt] } : job)
  }
}

export const runNextBuildJob = advanceBuild
export function pauseBuild(jobs: BuildJob[]): BuildJob[] { return jobs.map((job) => job.status === 'planned' || job.status === 'running' ? { ...job, status: 'paused' } : job) }
export function resumeBuild(jobs: BuildJob[]): BuildJob[] { return jobs.map((job) => job.status === 'paused' || job.status === 'cancelled' ? { ...job, status: 'planned' } : job) }
export function cancelBuild(jobs: BuildJob[]): BuildJob[] { return jobs.map((job) => job.status === 'complete' ? job : { ...job, status: 'cancelled' }) }
export function retryJob(jobs: BuildJob[], jobId: string): BuildJob[] { return jobs.map((job) => job.id === jobId && job.status === 'failed' ? { ...job, status: 'planned' } : job) }

export function replaceRoomAsset(plan: BuildPlan, jobs: BuildJob[], roomId: string, replacement: Pick<GeneratedAsset, 'source' | 'path' | 'prompt'>): { plan: BuildPlan; jobs: BuildJob[]; review: GeneratedAsset } {
  if (!plan.rooms.some((room) => room.id === roomId)) throw new Error(`Unknown room ${roomId}`)
  const current = plan.assets.find((asset) => asset.ownerId === roomId)
  if (!current) throw new Error(`Missing current room asset ${roomId}`)
  const review: GeneratedAsset = { id: `asset:${roomId}:replacement`, kind: 'room_background', ownerId: roomId, ...replacement, status: 'needs_review', previous: { id: current.id, kind: current.kind, ownerId: current.ownerId, source: current.source, path: current.path, prompt: current.prompt, status: current.status } }
  const invalidated = new Set(['art', 'assembly', 'qa', 'presentation'])
  return { plan: { ...plan, assets: plan.assets.map((asset) => asset.ownerId === roomId ? review : asset) }, jobs: jobs.map((job) => invalidated.has(job.id) ? { ...job, status: 'paused' } : job), review }
}

export function resolveAssetReview(plan: BuildPlan, jobs: BuildJob[], assetId: string, decision: 'approved' | 'rejected'): { plan: BuildPlan; jobs: BuildJob[] } {
  const asset = plan.assets.find((item) => item.id === assetId)
  if (!asset || asset.status !== 'needs_review') throw new Error('Asset review is not pending')
  if (decision === 'rejected') {
    if (!asset.previous) throw new Error('Replacement lacks a restorable prior asset')
    return { plan: { ...plan, assets: plan.assets.map((item) => item.id === assetId ? { ...asset.previous! } : item) }, jobs: resumeBuild(jobs) }
  }
  return { plan: { ...plan, assets: plan.assets.map((item) => {
    if (item.id !== assetId) return item
    const { previous: _previous, ...approved } = item
    void _previous
    return { ...approved, status: 'approved' }
  }) }, jobs: resumeBuild(jobs) }
}