import type { AgentDefinition, Hotspot, OperationalPartition, OperationalRecord } from './commissioning'

const CORE_AGENT_IDS = new Set([
  'ultron', 'nova', 'forge', 'pixel', 'vibes', 'developer', 'security', 'cipher', 'governor',
])

export type RoomWorkItem = {
  id: string
  kind: 'quest' | 'event' | 'packet' | 'evidence' | 'memory' | 'metric' | 'feedback' | 'approval'
  title: string
  summary: string
  status: string
  agentId?: string
  provenanceLabel: string
}

export function getAgentConceptPath(agentId: string): string | null {
  return CORE_AGENT_IDS.has(agentId) ? `/concept-art/agents/${agentId}.png` : null
}

export function getAgentPortraitPath(agentId: string): string | null {
  return CORE_AGENT_IDS.has(agentId) ? `/concept-art/agents/portraits/${agentId}.png` : null
}

export function getHotspotBounds(hotspot: Hotspot): { x1: number; y1: number; x2: number; y2: number } {
  const xs = hotspot.polygon.map((point) => point.x)
  const ys = hotspot.polygon.map((point) => point.y)
  return { x1: Math.min(...xs), y1: Math.min(...ys), x2: Math.max(...xs), y2: Math.max(...ys) }
}

function stringField(record: OperationalRecord, key: string): string | undefined {
  return typeof record[key] === 'string' ? record[key] as string : undefined
}

function recordMatchesRoom(record: OperationalRecord, roomId: string, agentIds: string[]): boolean {
  const directRoomFields = ['roomId', 'stationId', 'suggestedRouteStationId']
  if (directRoomFields.some((field) => stringField(record, field) === roomId)) return true

  const directAgentFields = ['agentId', 'actorId', 'assignedAgentId', 'producedByAgentId', 'requestedByAgentId']
  if (directAgentFields.some((field) => {
    const value = stringField(record, field)
    return value ? agentIds.includes(value) : false
  })) return true

  const roomIds = Array.isArray(record.roomIds) ? record.roomIds : []
  const relatedAgentIds = Array.isArray(record.agentIds) ? record.agentIds : []
  return roomIds.includes(roomId) || relatedAgentIds.some((id) => typeof id === 'string' && agentIds.includes(id))
}

function displayKind(collection: keyof OperationalPartition): RoomWorkItem['kind'] {
  const map: Record<keyof OperationalPartition, RoomWorkItem['kind']> = {
    quests: 'quest', events: 'event', packets: 'packet', evidence: 'evidence', memories: 'memory',
    metrics: 'metric', feedback: 'feedback', approvals: 'approval',
  }
  return map[collection]
}

function toWorkItem(collection: keyof OperationalPartition, record: OperationalRecord): RoomWorkItem {
  const type = stringField(record, 'type') ?? displayKind(collection)
  const title = stringField(record, 'title') ?? stringField(record, 'label') ?? type.replaceAll('_', ' ')
  const summary = stringField(record, 'summary') ?? stringField(record, 'detail') ?? 'Inspect the linked operational record.'
  const status = stringField(record, 'status') ?? (collection === 'events' ? 'recorded' : 'available')
  const agentId = stringField(record, 'agentId') ?? stringField(record, 'assignedAgentId') ?? stringField(record, 'producedByAgentId')
  return {
    id: record.id,
    kind: displayKind(collection),
    title,
    summary,
    status,
    agentId,
    provenanceLabel: record.provenance.sourceLabel ?? record.provenance.sourceId,
  }
}

export function getRoomWorkItems(roomId: string, agentIds: string[], partition: OperationalPartition): RoomWorkItem[] {
  const items: RoomWorkItem[] = []
  for (const [collection, records] of Object.entries(partition) as Array<[keyof OperationalPartition, OperationalRecord[]]>) {
    for (const record of records) {
      if (recordMatchesRoom(record, roomId, agentIds)) items.push(toWorkItem(collection, record))
    }
  }
  return items.sort((a, b) => {
    const priority: Record<RoomWorkItem['kind'], number> = { approval: 0, quest: 1, packet: 2, evidence: 3, feedback: 4, event: 5, memory: 6, metric: 7 }
    return priority[a.kind] - priority[b.kind] || a.id.localeCompare(b.id)
  })
}

export function getAgentWorkItems(agent: AgentDefinition, roomItems: RoomWorkItem[]): RoomWorkItem[] {
  const assigned = roomItems.filter((item) => item.agentId === agent.id)
  return assigned.length ? assigned : roomItems
}
