import type { BuildPlan } from './commissioning'

export type BuildJob = {
  id: string
  label: string
  worker: string
  status: 'planned' | 'running' | 'complete' | 'failed' | 'cancelled'
  dependsOn: string[]
  attempts: number
  result?: string
  error?: string
}

const jobSeeds: Array<Pick<BuildJob, 'id' | 'label' | 'worker' | 'dependsOn'>> = [
  { id: 'topology', label: 'Assemble topology and hotspots', worker: 'TopologyBuilder', dependsOn: [] },
  { id: 'art', label: 'Select bundled art or honest placeholders', worker: 'ArtDirector', dependsOn: ['topology'] },
  { id: 'agents', label: 'Write declarative agent manifests', worker: 'AgentArchitect', dependsOn: ['topology'] },
  { id: 'workflows', label: 'Write workflow and Forge manifests', worker: 'WorkflowArchitect', dependsOn: ['agents'] },
  { id: 'safety', label: 'Verify permissions and approval gates', worker: 'SafetyInspector', dependsOn: ['agents', 'workflows'] },
  { id: 'assembly', label: 'Assemble commissioned configuration', worker: 'AssemblyAgent', dependsOn: ['art', 'safety'] },
  { id: 'qa', label: 'Validate assets, hotspots, schema, and navigation', worker: 'QAAgent', dependsOn: ['assembly'] },
  { id: 'presentation', label: 'Prepare final commissioning report', worker: 'CommissioningGuide', dependsOn: ['qa'] },
]

export function createBuildJobs(plan: BuildPlan): BuildJob[] {
  void plan
  return jobSeeds.map((job) => ({ ...job, status: 'planned', attempts: 0 }))
}

export function runNextBuildJob(jobs: BuildJob[]): BuildJob[] {
  const completed = new Set(jobs.filter((job) => job.status === 'complete').map((job) => job.id))
  const next = jobs.find((job) => job.status === 'planned' && job.dependsOn.every((dependency) => completed.has(dependency)))
  if (!next) return jobs
  return jobs.map((job) => job.id === next.id ? {
    ...job,
    status: 'complete',
    attempts: job.attempts + 1,
    result: `${job.worker} completed ${job.label.toLowerCase()} using approved local configuration.`,
  } : job)
}

export function pauseBuild(jobs: BuildJob[]): BuildJob[] {
  return jobs.map((job) => job.status === 'running' ? { ...job, status: 'planned' } : job)
}

export function cancelBuild(jobs: BuildJob[]): BuildJob[] {
  return jobs.map((job) => job.status === 'planned' ? { ...job, status: 'cancelled' } : job)
}
