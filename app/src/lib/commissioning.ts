export type InstallationMode = 'standard' | 'demo'
export type DataClass = 'real' | 'user_entered' | 'derived' | 'synthetic_demo'
export type VisualStyleId = 'pixel_art' | 'illustrated_2d' | 'isometric_3d' | 'cinematic_realistic' | 'clean_vector' | 'custom'
export type WorldTemplateId = 'space_station' | 'spaceship' | 'cruise_ship' | 'underground_bunker' | 'skyscraper' | 'resort' | 'sky_ship' | 'battleship' | 'modern_corporate_office' | 'custom'

export type OperationalPartition = {
  quests: OperationalRecord[]
  events: OperationalRecord[]
  packets: OperationalRecord[]
  evidence: OperationalRecord[]
  memories: OperationalRecord[]
  metrics: OperationalRecord[]
  feedback: OperationalRecord[]
  approvals: OperationalRecord[]
}

export type Provenance = {
  dataClass: DataClass
  sourceType: 'user' | 'file' | 'api' | 'tool' | 'agent' | 'event' | 'demo_fixture'
  sourceId: string
  sourceLabel?: string
  capturedAt?: string
  adapterId?: string
}

export type OperationalRecord = {
  id: string
  type?: string
  title?: string
  provenance: Provenance
  [key: string]: unknown
}

export type RoomProfile = {
  id: string
  name: string
  type: 'bridge' | 'war_room' | 'forge' | 'communications' | 'archives' | 'specialist_lab' | 'governance' | 'recreation' | 'support'
  description: string
  level: string
  status: 'idle' | 'unconfigured' | 'standby' | 'demo'
  agentIds: string[]
  assetPath: string
}

export type AgentDefinition = {
  id: string
  name: string
  role: string
  roomId: string
  purpose: string
  provider: string
  model: string
  fallbackModel: string
  tools: string[]
  permissions: string[]
  memoryScope: string
  autonomy: 'demo_only' | 'supervised' | 'trusted' | 'bounded_autonomous'
}

export type Hotspot = {
  id: string
  targetId: string
  label: string
  polygon: Array<{ x: number; y: number }>
}

export type GeneratedAsset = {
  id: string
  kind: 'ship_background' | 'room_background'
  ownerId?: string
  source: 'bundled' | 'placeholder'
  path: string
  prompt: string
  status: 'approved' | 'needs_review'
}

export type CommissioningDraft = {
  schemaVersion: 1
  status: 'interviewing' | 'awaiting_blueprint_approval' | 'building' | 'awaiting_final_review' | 'complete'
  installationMode: InstallationMode
  visualStyleId: VisualStyleId
  worldTemplateId: WorldTemplateId
  worldName: string
  rooms: RoomProfile[]
  agents: AgentDefinition[]
  workflows: string[]
  businesses: Array<{ id: string; name: string; kind: 'forge'; maturity: 'draft' }>
  governance: { approvalRequired: true; externalWrites: 'gated'; credentialStorage: 'not_configured'; auditReplay: true }
  operational: OperationalPartition
  buildPlan?: BuildPlan
}

export type BuildPlan = {
  id: string
  style: VisualStyleId
  worldTemplate: WorldTemplateId
  worldName: string
  rooms: RoomProfile[]
  agents: AgentDefinition[]
  businesses: CommissioningDraft['businesses']
  governance: CommissioningDraft['governance']
  workflows: string[]
  assets: GeneratedAsset[]
  hotspots: Hotspot[]
  setupRequirements: string[]
  warnings: string[]
}

export const VISUAL_STYLES: Array<{ id: VisualStyleId; label: string; description: string }> = [
  { id: 'pixel_art', label: 'Pixel Art', description: 'Retro game presentation, available for every world.' },
  { id: 'illustrated_2d', label: 'Illustrated 2D', description: 'Layered hand-drawn environments.' },
  { id: 'isometric_3d', label: 'Isometric 3D', description: 'Miniature diorama spaces.' },
  { id: 'cinematic_realistic', label: 'Cinematic / Realistic', description: 'Detailed environments with restrained overlays.' },
  { id: 'clean_vector', label: 'Clean Vector / Graphic', description: 'Crisp silhouettes and lightweight motion.' },
  { id: 'custom', label: 'Custom Visual Style', description: 'Describe an original art direction.' },
]

export const WORLD_TEMPLATES: Array<{ id: WorldTemplateId; label: string; movement: string; topology: string }> = [
  { id: 'space_station', label: 'Space Station', movement: 'docking corridors', topology: 'orbital rings and spokes' },
  { id: 'spaceship', label: 'Spaceship', movement: 'decks and corridors', topology: 'longitudinal vessel decks' },
  { id: 'cruise_ship', label: 'Cruise Ship', movement: 'decks and lifts', topology: 'ocean-going stacked decks' },
  { id: 'underground_bunker', label: 'Underground Bunker', movement: 'tunnels', topology: 'hardened subterranean levels' },
  { id: 'skyscraper', label: 'Skyscraper', movement: 'elevators', topology: 'vertical department floors' },
  { id: 'resort', label: 'Resort', movement: 'paths', topology: 'connected campus buildings' },
  { id: 'sky_ship', label: 'Sky Ship', movement: 'decks and aerial docks', topology: 'flying vessel above the clouds' },
  { id: 'battleship', label: 'Battleship', movement: 'armored passages', topology: 'compartmentalized ocean vessel' },
  { id: 'modern_corporate_office', label: 'Modern Corporate Office', movement: 'elevators and halls', topology: 'contemporary headquarters floors' },
  { id: 'custom', label: 'Custom Theme', movement: 'custom', topology: 'installer-defined geography' },
]

const roomSeeds: Array<Omit<RoomProfile, 'status' | 'agentIds' | 'assetPath'>> = [
  { id: 'bridge', name: 'The Bridge', type: 'bridge', description: 'Command room for the owner and steward.', level: 'Level 1 — Draft' },
  { id: 'war-room', name: 'The War Room', type: 'war_room', description: 'Strategy, planning, and operational review.', level: 'Level 1 — Draft' },
  { id: 'articulation-console', name: 'Articulation Console', type: 'support', description: 'Turns owner intent into inspectable blueprints.', level: 'Level 1 — Draft' },
  { id: 'nova-room', name: 'Nova Room', type: 'specialist_lab', description: 'Attributable market intelligence and research.', level: 'Level 1 — Draft' },
  { id: 'etsy-forge', name: 'Etsy Forge', type: 'forge', description: 'Supervised product and listing production.', level: 'Level 1 — Draft' },
  { id: 'fiverr-forge', name: 'Fiverr Forge', type: 'forge', description: 'Service deliverable production.', level: 'Level 1 — Draft' },
  { id: 'print-on-demand-forge', name: 'Print-on-Demand Forge', type: 'forge', description: 'Physical product mockup and fulfillment intent.', level: 'Level 1 — Draft' },
  { id: 'supplements-forge', name: 'Supplements Forge', type: 'forge', description: 'Compliance-heavy product planning.', level: 'Level 1 — Draft' },
  { id: 'photo-restoration-forge', name: 'Photo Restoration Forge', type: 'forge', description: 'Careful restoration service production.', level: 'Level 1 — Draft' },
  { id: 'affiliate-forge', name: 'Affiliate Forge', type: 'forge', description: 'Controlled offer and campaign analysis.', level: 'Level 1 — Draft' },
  { id: 'pixel-room', name: 'Pixel Room', type: 'specialist_lab', description: 'Visual and media production.', level: 'Level 1 — Draft' },
  { id: 'vibes-room', name: 'Vibes Room', type: 'specialist_lab', description: 'Music and audio creation intent.', level: 'Level 1 — Draft' },
  { id: 'developer-room', name: 'Developer Room', type: 'specialist_lab', description: 'Software, tools, and adapter builds.', level: 'Level 1 — Draft' },
  { id: 'security-room', name: 'Security Room', type: 'governance', description: 'Permission and connector posture from real checks.', level: 'Level 1 — Draft' },
  { id: 'communications-room', name: 'Communications Room', type: 'communications', description: 'Routes configured outside-world signals; not a Forge.', level: 'Level 1 — Draft' },
  { id: 'governance-room', name: 'Review / Governance', type: 'governance', description: 'Quality, policy, risk, and approval boundary.', level: 'Level 1 — Draft' },
  { id: 'archives', name: 'Archives', type: 'archives', description: 'Provenanced memory banks and replay.', level: 'Level 1 — Draft' },
  { id: 'feedback-console', name: 'Feedback Console', type: 'support', description: 'Approve, reject, and iterate feedback.', level: 'Level 1 — Draft' },
  { id: 'skill-armory', name: 'Skill Armory', type: 'support', description: 'Inspected and permissioned capabilities.', level: 'Level 1 — Draft' },
  { id: 'treasury', name: 'Treasury', type: 'support', description: 'Actual metered cost and budget controls.', level: 'Level 1 — Draft' },
  { id: 'media-bay', name: 'Media Bay', type: 'support', description: 'Approval-gated publishing queues.', level: 'Level 1 — Draft' },
  { id: 'ten-forward', name: 'Ten Forward', type: 'recreation', description: 'Non-production rest and social space.', level: 'Level 1 — Draft' },
]

const agentSeeds: AgentDefinition[] = [
  ['ultron', 'Ultron', 'Steward', 'bridge', 'Routes work and escalates decisions.'],
  ['nova', 'Nova', 'Market Intelligence', 'nova-room', 'Produces opportunity packets from attributable evidence.'],
  ['forge', 'Forge', 'Production', 'etsy-forge', 'Builds supervised product and listing packets.'],
  ['pixel', 'Pixel', 'Graphic Artist', 'pixel-room', 'Creates visual candidates through configured renderers.'],
  ['vibes', 'Vibes', 'Music Artist', 'vibes-room', 'Creates audio only through approved tools.'],
  ['developer', 'Developer', 'App Builder', 'developer-room', 'Builds software and adapters within scope.'],
  ['security', 'Security', 'Security Officer', 'security-room', 'Surfaces actual configured checks and risks.'],
  ['cipher', 'Cipher', 'Communications', 'communications-room', 'Routes configured signals and messages.'],
  ['governor', 'Governor', 'Reviewer', 'governance-room', 'Enforces evidence, quality, and approval gates.'],
].map(([id, name, role, roomId, purpose]) => ({
  id, name, role, roomId, purpose, provider: 'unconfigured', model: 'unconfigured', fallbackModel: 'unconfigured',
  tools: [], permissions: ['read commissioned configuration'], memoryScope: 'room-scoped approved memory', autonomy: 'supervised',
}))

function rooms(mode: InstallationMode): RoomProfile[] {
  return roomSeeds.map((room) => ({
    ...room,
    status: mode === 'demo' ? 'demo' : room.type === 'recreation' ? 'idle' : 'unconfigured',
    agentIds: agentSeeds.filter((agent) => agent.roomId === room.id).map((agent) => agent.id),
    assetPath: `/concept-art/rooms/${room.id}.png`,
  }))
}

export function emptyOperational(): OperationalPartition {
  return { quests: [], events: [], packets: [], evidence: [], memories: [], metrics: [], feedback: [], approvals: [] }
}

export function createCommissioningDraft(overrides: Partial<Pick<CommissioningDraft, 'installationMode' | 'visualStyleId' | 'worldTemplateId' | 'worldName'>> = {}): CommissioningDraft {
  const installationMode = overrides.installationMode ?? 'standard'
  return {
    schemaVersion: 1,
    status: 'interviewing',
    installationMode,
    visualStyleId: overrides.visualStyleId ?? 'pixel_art',
    worldTemplateId: overrides.worldTemplateId ?? 'spaceship',
    worldName: overrides.worldName ?? 'Agentarium One',
    rooms: rooms(installationMode),
    agents: agentSeeds.map((agent) => ({ ...agent, autonomy: installationMode === 'demo' ? 'demo_only' : 'supervised' })),
    workflows: ['Bridge → Nova → Forge → Pixel → Governance → Archives'],
    businesses: [{ id: 'business:etsy-forge', name: 'Etsy Forge', kind: 'forge', maturity: 'draft' }],
    governance: { approvalRequired: true, externalWrites: 'gated', credentialStorage: 'not_configured', auditReplay: true },
    operational: emptyOperational(),
  }
}

export function changeVisualStyle(draft: CommissioningDraft, visualStyleId: VisualStyleId): CommissioningDraft {
  return { ...draft, visualStyleId }
}

function hotspotFor(room: RoomProfile, index: number): Hotspot {
  const columns = 6
  const x = 0.05 + (index % columns) * 0.15
  const y = 0.12 + Math.floor(index / columns) * 0.2
  return {
    id: `hotspot:${room.id}`,
    targetId: room.id,
    label: room.name,
    polygon: [{ x, y }, { x: x + 0.12, y }, { x: x + 0.12, y: y + 0.15 }, { x, y: y + 0.15 }],
  }
}

export function createBuildPlan(draft: CommissioningDraft): BuildPlan {
  const bundled = draft.visualStyleId === 'pixel_art' && draft.worldTemplateId === 'spaceship'
  const assets: GeneratedAsset[] = [
    {
      id: 'asset:ship', kind: 'ship_background', source: bundled ? 'bundled' : 'placeholder',
      path: bundled ? '/concept-art/ship/ship-overview-cross-section.png' : '',
      prompt: `${VISUAL_STYLES.find((style) => style.id === draft.visualStyleId)?.label} ${WORLD_TEMPLATES.find((world) => world.id === draft.worldTemplateId)?.label} whole-world overview`,
      status: bundled ? 'approved' : 'needs_review',
    },
    ...draft.rooms.map((room) => ({
      id: `asset:${room.id}`, kind: 'room_background' as const, ownerId: room.id,
      source: bundled ? 'bundled' as const : 'placeholder' as const,
      path: bundled ? room.assetPath : '',
      prompt: `${VISUAL_STYLES.find((style) => style.id === draft.visualStyleId)?.label} ${WORLD_TEMPLATES.find((world) => world.id === draft.worldTemplateId)?.label} scene for ${room.name}: ${room.description}`,
      status: bundled ? 'approved' as const : 'needs_review' as const,
    })),
  ]
  return {
    id: `plan:${draft.worldTemplateId}:${draft.visualStyleId}`,
    style: draft.visualStyleId,
    worldTemplate: draft.worldTemplateId,
    worldName: draft.worldName,
    rooms: draft.rooms,
    agents: draft.agents,
    businesses: draft.businesses,
    governance: draft.governance,
    workflows: draft.workflows,
    assets,
    hotspots: draft.rooms.map(hotspotFor),
    setupRequirements: ['Configure evidence provider for Nova', 'Configure model providers', 'Approve credentials in dedicated secure setup', 'Configure external integrations separately'],
    warnings: bundled ? ['Bundled art is local and offline. Operational providers remain unconfigured.'] : ['Matching art is unavailable locally. Honest placeholders and retained prompts will be used.'],
  }
}
