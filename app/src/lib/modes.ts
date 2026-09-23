import type { InstallationMode, OperationalPartition, OperationalRecord } from './commissioning'
import { emptyOperational } from './commissioning'

export type AdapterId = 'DemoFixtureAdapter' | 'AgentProviderAdapter' | 'EvidenceSourceAdapter' | 'CommunicationsAdapter' | 'PublishingAdapter' | 'CostTelemetryAdapter' | 'SkillInventoryAdapter' | 'MemoryAdapter'

const productionWriteAdapters: AdapterId[] = ['PublishingAdapter', 'CommunicationsAdapter']

export function createStandardPartition(): OperationalPartition {
  return emptyOperational()
}

const demoProvenance = {
  dataClass: 'synthetic_demo' as const,
  sourceType: 'demo_fixture' as const,
  sourceId: 'demo:fixture:orientation',
  sourceLabel: 'Isolated orientation fixture',
}

export function createDemoPartition(): OperationalPartition {
  const partition = emptyOperational()
  partition.quests.push({
    id: 'demo:quest:orientation', type: 'demo_workflow', title: 'Launch an original celestial keepsake concept',
    summary: 'Nova → Forge → Pixel → Governance supervised product walkthrough.', status: 'needs_approval',
    roomIds: ['bridge', 'nova-room', 'etsy-forge', 'pixel-room', 'governance-room', 'archives'], agentIds: ['ultron', 'nova', 'forge', 'pixel', 'governor'], provenance: demoProvenance,
  })
  partition.evidence.push({
    id: 'demo:evidence:market', type: 'synthetic_market_example', title: 'Celestial keepsake demand signal',
    summary: 'Synthetic orientation evidence suggests interest in personalized constellation keepsakes.', status: 'reviewed',
    roomId: 'nova-room', agentId: 'nova', provenance: demoProvenance,
  })
  partition.packets.push(
    {
      id: 'demo:packet:opportunity', type: 'opportunity_packet', title: 'Constellation keepsake opportunity',
      summary: 'Original celestial keepsake concept derived from synthetic orientation evidence.', status: 'handed_off',
      roomId: 'nova-room', producedByAgentId: 'nova', handoffTargetAgentId: 'forge', provenance: demoProvenance,
    },
    {
      id: 'demo:packet:listing-draft', type: 'product_listing_packet', title: 'Personalized star-map keepsake draft',
      summary: 'Synthetic title, materials, keywords, and fulfillment questions prepared for review.', status: 'ready_for_visuals',
      roomId: 'etsy-forge', producedByAgentId: 'forge', provenance: demoProvenance,
    },
    {
      id: 'demo:packet:visual-candidate', type: 'visual_candidate_packet', title: 'Celestial keepsake visual candidate',
      summary: 'Pixel prepared a synthetic product-media composition for human review.', status: 'ready_for_review',
      roomId: 'pixel-room', producedByAgentId: 'pixel', provenance: demoProvenance,
    },
  )
  partition.approvals.push({
    id: 'demo:approval:publish', type: 'approval_request', title: 'Review synthetic listing package',
    summary: 'Approve, deny, or revise the Demo packet. No external action will occur.', status: 'pending',
    roomId: 'governance-room', requestedByAgentId: 'governor', riskLevel: 'review', provenance: demoProvenance,
  })
  partition.events.push(
    { id: 'demo:event:commissioned', type: 'demo.commissioned', title: 'Demo world commissioned', summary: 'The isolated synthetic walkthrough was loaded.', status: 'recorded', roomId: 'bridge', actorId: 'ultron', sequence: 1, provenance: demoProvenance },
    { id: 'demo:event:nova-handoff', type: 'packet.handed_off', title: 'Nova handed research to Forge', summary: 'Opportunity Packet routed through the supervised workflow.', status: 'recorded', roomIds: ['nova-room', 'etsy-forge'], actorId: 'nova', sequence: 2, provenance: demoProvenance },
    { id: 'demo:event:pixel-review', type: 'approval.requested', title: 'Pixel candidate entered Governance', summary: 'The run paused at the human approval gate.', status: 'recorded', roomIds: ['pixel-room', 'governance-room'], actorId: 'governor', sequence: 3, provenance: demoProvenance },
  )
  partition.memories.push({ id: 'demo:memory:tour', type: 'tour_note', title: 'Demo workflow memory', summary: 'Synthetic provenance and handoffs are isolated from Standard.', status: 'available', roomId: 'archives', provenance: demoProvenance })
  partition.metrics.push({ id: 'demo:metric:tour', type: 'orientation_only', title: 'Demo progress', summary: 'Three synthetic handoffs recorded; excluded from Standard analytics.', status: 'demo_only', roomId: 'bridge', provenance: demoProvenance })
  partition.feedback.push({ id: 'demo:feedback:example', type: 'synthetic_feedback', title: 'Awaiting human verdict', summary: 'Approve, deny, or request revision on the visual candidate.', status: 'pending', roomId: 'feedback-console', agentIds: ['pixel', 'governor'], provenance: demoProvenance })
  return partition
}

export function purgeDemoPartition(partition: OperationalPartition): OperationalPartition {
  void partition
  return emptyOperational()
}

export function validatePartition(mode: InstallationMode, value: unknown): OperationalPartition {
  if (!value || typeof value !== 'object') throw new Error('Operational partition must be an object')
  const candidate = value as Record<string, unknown>
  const expected: Array<keyof OperationalPartition> = ['quests', 'events', 'packets', 'evidence', 'memories', 'metrics', 'feedback', 'approvals']
  const partition = emptyOperational()
  for (const key of expected) {
    const records = candidate[key]
    if (!Array.isArray(records)) throw new Error(`Invalid ${key} collection`)
    for (const record of records) {
      if (!record || typeof record !== 'object') throw new Error(`Invalid ${key} record`)
      const typed = record as OperationalRecord
      if (typeof typed.id !== 'string' || !typed.provenance || typeof typed.provenance !== 'object') throw new Error(`Invalid ${key} record identity or provenance`)
      if (mode === 'standard' && (typed.id.startsWith('demo:') || typed.provenance.dataClass === 'synthetic_demo' || typed.provenance.sourceType === 'demo_fixture')) throw new Error('Standard partition rejects Demo namespace and provenance')
      if (mode === 'demo' && (!typed.id.startsWith('demo:') || typed.provenance.dataClass !== 'synthetic_demo' || typed.provenance.sourceType !== 'demo_fixture')) throw new Error('Demo partition accepts only Demo namespace and provenance')
      partition[key].push(structuredClone(typed))
    }
  }
  return partition
}

export function appendAuditRecord(mode: InstallationMode, partition: OperationalPartition, event: { type: string; summary: string; detail: string; approvalRequestId?: string }): OperationalPartition {
  const next = validatePartition(mode, partition)
  const sequence = next.events.reduce((highest, record) => typeof record.sequence === 'number' ? Math.max(highest, record.sequence) : highest, 0) + 1
  const demo = mode === 'demo'
  const timestamp = new Date().toISOString()
  next.events.push({ id: `${demo ? 'demo:' : ''}event:${sequence}`, sequence, timestamp, ...event, payload: {}, provenance: { dataClass: demo ? 'synthetic_demo' : 'user_entered', sourceType: demo ? 'demo_fixture' : 'user', sourceId: demo ? 'demo:commissioning' : 'human_operator', capturedAt: timestamp } })
  return next
}

export function appendApprovalRecord(mode: InstallationMode, partition: OperationalPartition, approval: { status: 'approved' | 'denied' | 'revision_requested'; decisionReason: string }): OperationalPartition {
  const next = validatePartition(mode, partition)
  const demo = mode === 'demo'
  const sequence = next.approvals.length + 1
  const timestamp = new Date().toISOString()
  next.approvals.push({ id: `${demo ? 'demo:' : ''}approval:final-presentation:${sequence}`, type: `approval.${approval.status}`, proposedAction: 'Replace the active world with the commissioned draft', alternatives: ['Revise locally', 'Cancel safely'], evidencePacketIds: [], riskLevel: 'review', resolvedBy: 'human_operator', resolvedAt: timestamp, ...approval, provenance: { dataClass: demo ? 'synthetic_demo' : 'user_entered', sourceType: demo ? 'demo_fixture' : 'user', sourceId: demo ? 'demo:commissioning' : 'human_operator', capturedAt: timestamp } })
  return next
}

export function resolveAdapter(mode: InstallationMode, adapterId: AdapterId): { id: AdapterId; networked: boolean; writeEnabled: boolean } {
  if (mode === 'standard' && adapterId === 'DemoFixtureAdapter') {
    throw new Error(`${adapterId} unavailable in standard mode`)
  }
  if (mode === 'demo' && adapterId !== 'DemoFixtureAdapter') {
    if (productionWriteAdapters.includes(adapterId)) throw new Error(`${adapterId} unavailable in demo mode`)
    throw new Error(`${adapterId} unavailable in demo mode`)
  }
  return { id: adapterId, networked: mode === 'standard', writeEnabled: false }
}

export function writeRecord(
  mode: InstallationMode,
  partition: OperationalPartition,
  collection: keyof OperationalPartition,
  record: OperationalRecord,
): OperationalPartition {
  if (mode === 'standard' && record.provenance.dataClass === 'synthetic_demo') {
    throw new Error('Standard mode rejects synthetic_demo provenance')
  }
  if (mode === 'demo' && (!record.id.startsWith('demo:') || record.provenance.dataClass !== 'synthetic_demo')) {
    throw new Error('Demo mode accepts only demo:* synthetic_demo records')
  }
  partition[collection].push(record)
  return partition
}
