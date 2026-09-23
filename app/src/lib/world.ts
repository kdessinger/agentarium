import type { Provenance } from './commissioning'

export type WorkflowResult = {
  status: 'blocked' | 'needs_approval'
  reason: string
  packets: Array<{ id: string; provenance: { dataClass: 'derived' } }>
}

export type WorldEvent = {
  id: string
  sequence: number
  timestamp: string
  type: 'commissioning.started' | 'blueprint.approved' | 'build.job.completed' | 'build.job.failed' | 'approval.requested' | 'approval.approved' | 'approval.denied' | 'approval.revision_requested' | 'room.activated' | 'world.presented'
  actorId?: string
  stationId?: string
  questId?: string
  taskId?: string
  packetId?: string
  approvalRequestId?: string
  summary: string
  detail: string
  payload: Record<string, unknown>
  provenance: Provenance
}

export type ApprovalStatus = 'pending' | 'approved' | 'denied' | 'revision_requested'
export type ApprovalRequest = {
  id: string
  summary: string
  proposedAction: string
  alternatives: string[]
  evidencePacketIds: string[]
  riskLevel: 'review' | 'external' | 'destructive'
  status: ApprovalStatus
  createdAt: string
  resolvedAt?: string
  resolvedBy: 'human_operator' | null
  decisionReason?: string
}

type EventInput = Omit<WorldEvent, 'id' | 'sequence' | 'timestamp' | 'payload'> & { payload?: Record<string, unknown> }

export function appendEvent(events: readonly WorldEvent[], input: EventInput, timestamp = new Date().toISOString()): WorldEvent[] {
  const sequence = events.length ? Math.max(...events.map((event) => event.sequence)) + 1 : 1
  const event: WorldEvent = { ...input, id: `event:${sequence}`, sequence, timestamp, payload: structuredClone(input.payload ?? {}) }
  return [...events.map((existing) => structuredClone(existing)), event]
}

export function createApprovalRequest(id: string, summary: string): ApprovalRequest {
  return { id, summary, proposedAction: summary, alternatives: ['Revise locally', 'Cancel safely'], evidencePacketIds: [], riskLevel: 'review', status: 'pending', createdAt: new Date().toISOString(), resolvedBy: null }
}

export function resolveApproval(request: ApprovalRequest, status: Exclude<ApprovalStatus, 'pending'>, reason: string): ApprovalRequest {
  if (request.status !== 'pending') throw new Error('Approval request is already resolved')
  if (!reason.trim()) throw new Error('Decision reason is required')
  return { ...request, status, decisionReason: reason, resolvedAt: new Date().toISOString(), resolvedBy: 'human_operator' }
}

export function startStandardWorkflow(dependencies: { evidenceConfigured: boolean; providerConfigured: boolean }): WorkflowResult {
  if (!dependencies.evidenceConfigured || !dependencies.providerConfigured) return { status: 'blocked', reason: 'Nova requires a configured evidence source and provider. No Demo fallback was used.', packets: [] }
  return { status: 'needs_approval', reason: 'Governance approval is required before any external action.', packets: [{ id: 'packet:derived:pending-review', provenance: { dataClass: 'derived' } }] }
}

export function createReplayFrame<T>(events: T[], cursor: number, _adapter: () => void): { cursor: number; events: T[]; event?: T } {
  void _adapter
  const snapshot = structuredClone(events)
  return { cursor, events: snapshot, event: snapshot[cursor] }
}

export function replayAt<T extends { selectedRoomId?: string; statusByRoom: Record<string, string> }>(events: readonly WorldEvent[], cursor: number, current: T, _adapter: () => void): { cursor: number; total: number; event?: WorldEvent; state: T } {
  void _adapter
  const state = structuredClone(current)
  const limited = events.filter((event) => event.sequence <= cursor)
  for (const event of limited) {
    if (event.stationId) state.selectedRoomId = event.stationId
    if (event.type === 'room.activated' && event.stationId) state.statusByRoom[event.stationId] = 'active'
  }
  return { cursor, total: events.length, event: limited.at(-1), state }
}