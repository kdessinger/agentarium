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
  partition.quests.push({ id: 'demo:quest:orientation', title: 'Orientation walkthrough', provenance: demoProvenance })
  partition.events.push({ id: 'demo:event:commissioned', type: 'demo.commissioned', provenance: demoProvenance })
  partition.packets.push({ id: 'demo:packet:opportunity', type: 'opportunity_packet', provenance: demoProvenance })
  partition.evidence.push({ id: 'demo:evidence:market', type: 'synthetic_market_example', provenance: demoProvenance })
  partition.memories.push({ id: 'demo:memory:tour', type: 'tour_note', provenance: demoProvenance })
  partition.metrics.push({ id: 'demo:metric:tour', type: 'orientation_only', provenance: demoProvenance })
  partition.feedback.push({ id: 'demo:feedback:example', type: 'synthetic_feedback', provenance: demoProvenance })
  partition.approvals.push({ id: 'demo:approval:publish', type: 'external_action_blocked', provenance: demoProvenance })
  return partition
}

export function purgeDemoPartition(partition: OperationalPartition): OperationalPartition {
  void partition
  return emptyOperational()
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
