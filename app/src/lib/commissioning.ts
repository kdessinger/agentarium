export const SCHEMA_VERSION = 2 as const

export type InstallationMode = 'standard' | 'demo'
export type DataClass = 'real' | 'user_entered' | 'derived' | 'synthetic_demo'
export type VisualStyleId = 'pixel_art' | 'illustrated_2d' | 'isometric_3d' | 'cinematic_realistic' | 'clean_vector' | 'custom'
export type WorldTemplateId = 'space_station' | 'spaceship' | 'cruise_ship' | 'underground_bunker' | 'skyscraper' | 'resort' | 'sky_ship' | 'battleship' | 'modern_corporate_office' | 'custom'

export type Provenance = {
  dataClass: DataClass
  sourceType: 'user' | 'file' | 'api' | 'tool' | 'agent' | 'event' | 'demo_fixture'
  sourceId: string
  sourceLabel?: string
  capturedAt?: string
  adapterId?: string
}

export type OperationalRecord = { id: string; type?: string; title?: string; provenance: Provenance; [key: string]: unknown }
export type OperationalPartition = Record<'quests' | 'events' | 'packets' | 'evidence' | 'memories' | 'metrics' | 'feedback' | 'approvals', OperationalRecord[]>

export type RoomProfile = {
  id: string
  name: string
  type: 'bridge' | 'war_room' | 'forge' | 'communications' | 'archives' | 'specialist_lab' | 'governance' | 'recreation' | 'support'
  description: string
  level: string
  status: 'idle' | 'unconfigured' | 'standby' | 'demo'
  agentIds: string[]
  assetPath: string
  zone: string
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
  prohibitedActions: string[]
  memoryScope: string
  autonomy: 'demo_only' | 'supervised' | 'trusted' | 'bounded_autonomous'
  approvalTriggers: string[]
  expectedInputs: string[]
  expectedOutputs: string[]
  subagents: string[]
  idleBehavior: string
  budget: string
  successMeasures: string[]
}

export type BusinessDefinition = {
  id: string
  name: string
  kind: 'forge'
  purpose: string
  customer: string
  inputs: string[]
  outputs: string[]
  deliveryDestination: string
  productionAgentIds: string[]
  qaAgentIds: string[]
  evidenceIntent: string
  approvalPoints: string[]
  integrationIntents: string[]
  metrics: string[]
  risks: string[]
  maturity: 'idea' | 'demo_only' | 'supervised' | 'trusted' | 'live'
}

export type GovernanceAnswers = {
  approvalRequired: true
  externalWrites: 'gated'
  credentialStorage: 'not_configured'
  auditReplay: true
  deploymentIntent: 'local_only' | 'lan' | 'future_hosted'
  userIntent: 'single_owner' | 'future_multi_user'
  dataSensitivity: string
  retention: string
  backupExport: string
  spendLimit: string
  notificationChannels: string[]
  failureRetry: string
  maintenanceWindow: string
  telemetryPrivacy: string
  assetReview: 'individual' | 'batch'
}

export type ArticulationAnswers = {
  ownerName: string
  stewardName: string
  vision: string
  desiredOutcomes: string[]
  operatingBoundaries: string[]
  workingStyle: string
}

export type Hotspot = { id: string; targetId: string; label: string; polygon: Array<{ x: number; y: number }> }
export type GeneratedAsset = {
  id: string
  kind: 'ship_background' | 'room_background'
  ownerId?: string
  source: 'bundled' | 'placeholder'
  path: string
  prompt: string
  status: 'approved' | 'needs_review' | 'rejected'
  previous?: { id: string; kind: 'ship_background' | 'room_background'; ownerId?: string; source: GeneratedAsset['source']; path: string; prompt: string; status: GeneratedAsset['status'] }
}
export type Adjacency = { from: string; to: string; route: string }

export type CommissioningDraft = {
  schemaVersion: typeof SCHEMA_VERSION
  id: string
  namespace: InstallationMode
  status: 'interviewing' | 'awaiting_blueprint_approval' | 'building' | 'awaiting_final_review' | 'complete' | 'failed'
  articulation: ArticulationAnswers
  installationMode: InstallationMode
  visualStyleId: VisualStyleId
  worldTemplateId: WorldTemplateId
  worldName: string
  presentation: { customStyleDescription?: string; interpretationConfirmed: boolean; palette: string[]; mood: string[]; animationLevel: 'none' | 'subtle' | 'active'; pixelArtEnabled: boolean }
  theme: { customThemeDescription?: string; interpretationConfirmed: boolean; movementMetaphor: string; materials: string; layoutLogic: string }
  rooms: RoomProfile[]
  adjacency: Adjacency[]
  agents: AgentDefinition[]
  workflows: string[]
  businesses: BusinessDefinition[]
  governance: GovernanceAnswers
  operational: OperationalPartition
  assumptions: string[]
  openQuestions: string[]
  pendingChangeScope?: 'visual_assets_only'
  buildPlan?: BuildPlan
}

export type BuildPlan = {
  id: string
  articulation: ArticulationAnswers
  style: VisualStyleId
  worldTemplate: WorldTemplateId
  worldName: string
  movementMetaphor: string
  artDirection: string
  rooms: RoomProfile[]
  adjacency: Adjacency[]
  agents: AgentDefinition[]
  businesses: BusinessDefinition[]
  governance: GovernanceAnswers
  workflows: string[]
  approvalGates: string[]
  assets: GeneratedAsset[]
  hotspots: Hotspot[]
  externalEstimate: { calls: number; cost: number; currency: 'USD'; reason: string }
  assumptions: string[]
  openQuestions: string[]
  setupRequirements: string[]
  warnings: string[]
  nonGoals: string[]
}

export function validateAssetPath(path: string, source: GeneratedAsset['source']): boolean {
  if (source === 'placeholder') return path === ''
  if (source === 'bundled') {
    if (!path.startsWith('/concept-art/')) return false
    if (/[?#]|\.\.|^[a-z][a-z0-9+.-]*:/i.test(path)) return false
    return /^\/concept-art\/[a-z0-9_/-]+\.[a-z0-9]+$/i.test(path)
  }
  return false
}

export const VISUAL_STYLES: Array<{ id: VisualStyleId; label: string; description: string }> = [
  { id: 'pixel_art', label: 'Pixel Art', description: 'Retro game presentation, available for every world.' },
  { id: 'illustrated_2d', label: 'Illustrated 2D', description: 'Layered hand-drawn environments.' },
  { id: 'isometric_3d', label: 'Isometric 3D', description: 'Miniature diorama spaces.' },
  { id: 'cinematic_realistic', label: 'Cinematic / Realistic', description: 'Detailed environments with restrained overlays.' },
  { id: 'clean_vector', label: 'Clean Vector / Graphic', description: 'Crisp silhouettes and lightweight motion.' },
  { id: 'custom', label: 'Custom Visual Style', description: 'Describe an original art direction and confirm the interpretation.' },
]

export type Template = { id: WorldTemplateId; label: string; movement: string; topology: string; materials: string; commandName: string; routeOrder: string[]; previewPath: string; previewAlt: string; previewNote: string }
const templatePreview = (file: string, alt: string) => ({
  previewPath: `/concept-art/world-templates/${file}.png`,
  previewAlt: alt,
  previewNote: 'Representative concept only — each commissioned rendering is custom and unique.',
})
export const WORLD_TEMPLATES: Template[] = [
  { id: 'modern_corporate_office', label: 'Modern Corporate Office', movement: 'elevators and halls', topology: 'contemporary headquarters floors', materials: 'glass partitions, acoustic wood, polished concrete', commandName: 'Executive Command Suite', routeOrder: ['bridge','war-room','articulation-console','nova-room','developer-room','pixel-room','communications-room','ten-forward'], ...templatePreview('modern-corporate-office', 'Modern Corporate Office concept preview with glass departments, command suite, studios, and technical spaces') },
  { id: 'space_station', label: 'Space Station', movement: 'docking corridors', topology: 'orbital rings and spokes', materials: 'alloy rings, observation glass, docking trusses', commandName: 'Command Hub', routeOrder: ['bridge','war-room','archives','nova-room','communications-room','etsy-forge','pixel-room','governance-room'], ...templatePreview('space-station', 'Space Station concept preview with orbital rings, radial laboratories, and docking structures') },
  { id: 'spaceship', label: 'Spaceship', movement: 'decks and corridors', topology: 'longitudinal vessel decks', materials: 'navy hull plating, amber consoles, cyan conduits', commandName: 'The Bridge', routeOrder: ['bridge','war-room','articulation-console','nova-room','etsy-forge','pixel-room','governance-room','archives'], ...templatePreview('spaceship', 'Spaceship concept preview with a Bridge, connected decks, specialist rooms, and engineering') },
  { id: 'cruise_ship', label: 'Cruise Ship', movement: 'decks and lifts', topology: 'ocean-going stacked decks', materials: 'teak, glass atriums, marine steel', commandName: 'Navigation Bridge', routeOrder: ['bridge','war-room','communications-room','ten-forward','pixel-room','etsy-forge','treasury','archives'], ...templatePreview('cruise-ship', 'Cruise Ship concept preview with navigation bridge, atrium, cabins, service decks, and engines') },
  { id: 'underground_bunker', label: 'Underground Bunker', movement: 'hardened tunnels', topology: 'secure subterranean levels', materials: 'reinforced concrete, blast doors, utility conduits', commandName: 'Command Center', routeOrder: ['bridge','security-room','war-room','archives','developer-room','nova-room','governance-room','communications-room'], ...templatePreview('underground-bunker', 'Underground Bunker concept preview with hardened levels, secure tunnels, command center, and laboratories') },
  { id: 'skyscraper', label: 'Skyscraper', movement: 'elevators', topology: 'vertical department floors', materials: 'glass, steel, stone, city light', commandName: 'Executive Command Floor', routeOrder: ['ten-forward','etsy-forge','pixel-room','nova-room','developer-room','governance-room','war-room','bridge'], ...templatePreview('skyscraper', 'Skyscraper concept preview with vertical department floors, elevators, executive command, and city views') },
  { id: 'resort', label: 'Resort', movement: 'landscaped paths', topology: 'connected campus buildings', materials: 'timber, stone, water, planting', commandName: 'Operations Lodge', routeOrder: ['bridge','war-room','ten-forward','vibes-room','pixel-room','nova-room','etsy-forge','archives'], ...templatePreview('resort', 'Resort concept preview with landscaped paths, connected lodges, villas, studios, and shared spaces') },
  { id: 'sky_ship', label: 'Sky Ship', movement: 'decks and aerial docks', topology: 'flying vessel above the clouds', materials: 'brass, canvas, cloud glass, lift machinery', commandName: 'Helm', routeOrder: ['bridge','communications-room','war-room','nova-room','pixel-room','etsy-forge','developer-room','archives'], ...templatePreview('sky-ship', 'Sky Ship concept preview with cloud decks, aerial docks, a Helm, and lift-engine machinery') },
  { id: 'battleship', label: 'Battleship', movement: 'armored passages', topology: 'compartmentalized ocean vessel', materials: 'armored steel, deck machinery, signal lamps', commandName: 'Combat Bridge', routeOrder: ['bridge','security-room','communications-room','war-room','developer-room','etsy-forge','governance-room','archives'], ...templatePreview('battleship', 'Battleship concept preview with armored compartments, bridge, operations center, and engineering decks') },
  { id: 'custom', label: 'Custom Theme', movement: 'installer-defined movement', topology: 'installer-defined geography', materials: 'installer-defined materials', commandName: 'Central Command', routeOrder: ['bridge','articulation-console','war-room','nova-room','etsy-forge','pixel-room','governance-room','archives'], ...templatePreview('custom-theme', 'Custom Theme concept preview showing one imaginative example of a completely original connected world') },
]

const roomSeeds: Array<Omit<RoomProfile, 'status' | 'agentIds' | 'assetPath' | 'zone'>> = [
  ['bridge','The Bridge','bridge','Command room for the owner and steward.','Level 1 — Draft'],
  ['war-room','The War Room','war_room','Strategy, planning, and operational review.','Level 1 — Draft'],
  ['articulation-console','Articulation Console','support','Turns owner intent into inspectable blueprints.','Level 1 — Draft'],
  ['nova-room','Nova Room','specialist_lab','Attributable market intelligence and research.','Level 1 — Draft'],
  ['etsy-forge','Etsy Forge','forge','Supervised product and listing production.','Level 1 — Draft'],
  ['fiverr-forge','Fiverr Forge','forge','Service deliverable production.','Level 1 — Draft'],
  ['print-on-demand-forge','Print-on-Demand Forge','forge','Physical product and fulfillment intent.','Level 1 — Draft'],
  ['supplements-forge','Supplements Forge','forge','Compliance-heavy product planning.','Level 1 — Draft'],
  ['photo-restoration-forge','Photo Restoration Forge','forge','Careful restoration service production.','Level 1 — Draft'],
  ['affiliate-forge','Affiliate Forge','forge','Controlled offer and campaign analysis.','Level 1 — Draft'],
  ['pixel-room','Pixel Room','specialist_lab','Visual and media production.','Level 1 — Draft'],
  ['vibes-room','Vibes Room','specialist_lab','Music and audio creation intent.','Level 1 — Draft'],
  ['developer-room','Developer Room','specialist_lab','Software, tools, and adapter builds.','Level 1 — Draft'],
  ['security-room','Security Room','governance','Permission and connector posture from real checks.','Level 1 — Draft'],
  ['communications-room','Communications Room','communications','Routes configured signals; not a Forge.','Level 1 — Draft'],
  ['governance-room','Review / Governance','governance','Quality, policy, risk, and approval boundary.','Level 1 — Draft'],
  ['archives','Archives','archives','Provenanced memory banks and replay.','Level 1 — Draft'],
  ['feedback-console','Feedback Console','support','Approve, reject, and iterate feedback.','Level 1 — Draft'],
  ['skill-armory','Skill Armory','support','Inspected and permissioned capabilities.','Level 1 — Draft'],
  ['treasury','Treasury','support','Actual metered cost and budget controls.','Level 1 — Draft'],
  ['media-bay','Media Bay','support','Approval-gated publishing queues.','Level 1 — Draft'],
  ['ten-forward','Ten Forward','recreation','Non-production rest and social space.','Level 1 — Draft'],
].map(([id,name,type,description,level]) => ({ id, name, type: type as RoomProfile['type'], description, level }))

const agentSeeds: Array<[string,string,string,string,string]> = [
  ['ultron','Ultron','Steward','bridge','Routes work and escalates decisions.'], ['nova','Nova','Market Intelligence','nova-room','Produces opportunity packets from attributable evidence.'],
  ['forge','Forge','Production','etsy-forge','Builds supervised product and listing packets.'], ['pixel','Pixel','Graphic Artist','pixel-room','Creates visual candidates through configured renderers.'],
  ['vibes','Vibes','Music Artist','vibes-room','Creates audio only through approved tools.'], ['developer','Developer','App Builder','developer-room','Builds software and adapters within scope.'],
  ['security','Security','Security Officer','security-room','Surfaces actual configured checks and risks.'], ['cipher','Cipher','Communications','communications-room','Routes configured signals and messages.'],
  ['governor','Governor','Reviewer','governance-room','Enforces evidence, quality, and approval gates.'], ['caspian','Caspian','Treasury & Unit Economics','treasury','Protects cash and sets evidence-based profit guardrails.'],
]

const hotspotCoordinates: Record<string, Array<{ x: number; y: number }>> = {
  // Authored against ship-overview-cross-section.png (1672×941). Polygons follow visible compartment walls.
  bridge: [{x:.565,y:.095},{x:.855,y:.105},{x:.885,y:.245},{x:.845,y:.315},{x:.555,y:.305},{x:.535,y:.185}],
  'war-room': [{x:.385,y:.165},{x:.565,y:.165},{x:.595,y:.245},{x:.555,y:.315},{x:.385,y:.305},{x:.365,y:.225}],
  'articulation-console': [{x:.275,y:.125},{x:.385,y:.125},{x:.385,y:.305},{x:.275,y:.305}],
  'nova-room': [{x:.145,y:.255},{x:.255,y:.255},{x:.255,y:.425},{x:.145,y:.425}],
  'etsy-forge': [{x:.145,y:.735},{x:.275,y:.735},{x:.275,y:.895},{x:.145,y:.895}],
  'fiverr-forge': [{x:.275,y:.735},{x:.415,y:.735},{x:.415,y:.895},{x:.275,y:.895}],
  'print-on-demand-forge': [{x:.420,y:.725},{x:.555,y:.725},{x:.555,y:.900},{x:.420,y:.900}],
  'supplements-forge': [{x:.690,y:.710},{x:.855,y:.710},{x:.855,y:.895},{x:.690,y:.895}],
  'photo-restoration-forge': [{x:.135,y:.430},{x:.250,y:.430},{x:.250,y:.585},{x:.135,y:.585}],
  'affiliate-forge': [{x:.250,y:.430},{x:.355,y:.430},{x:.355,y:.585},{x:.250,y:.585}],
  'pixel-room': [{x:.255,y:.255},{x:.365,y:.255},{x:.365,y:.425},{x:.255,y:.425}],
  'vibes-room': [{x:.855,y:.355},{x:.970,y:.370},{x:.970,y:.515},{x:.855,y:.525}],
  'developer-room': [{x:.575,y:.335},{x:.755,y:.335},{x:.755,y:.500},{x:.575,y:.500}],
  'security-room': [{x:.665,y:.515},{x:.785,y:.515},{x:.785,y:.690},{x:.665,y:.690}],
  'communications-room': [{x:.020,y:.340},{x:.140,y:.320},{x:.140,y:.505},{x:.020,y:.485}],
  'governance-room': [{x:.555,y:.515},{x:.665,y:.515},{x:.665,y:.690},{x:.555,y:.690}],
  archives: [{x:.355,y:.315},{x:.555,y:.315},{x:.555,y:.620},{x:.355,y:.620}],
  'feedback-console': [{x:.145,y:.255},{x:.205,y:.255},{x:.205,y:.425},{x:.145,y:.425}],
  'skill-armory': [{x:.170,y:.135},{x:.270,y:.135},{x:.270,y:.255},{x:.170,y:.255}],
  treasury: [{x:.145,y:.600},{x:.255,y:.600},{x:.255,y:.730},{x:.145,y:.730}],
  'media-bay': [{x:.255,y:.600},{x:.375,y:.600},{x:.375,y:.730},{x:.255,y:.730}],
  'ten-forward': [{x:.755,y:.355},{x:.855,y:.355},{x:.855,y:.525},{x:.755,y:.525}],
}

export function emptyOperational(): OperationalPartition {
  return { quests: [], events: [], packets: [], evidence: [], memories: [], metrics: [], feedback: [], approvals: [] }
}

function makeAgents(mode: InstallationMode): AgentDefinition[] {
  return agentSeeds.map(([id,name,role,roomId,purpose]) => ({
    id, name, role, roomId, purpose, provider: 'unconfigured', model: 'unconfigured', fallbackModel: 'unconfigured', tools: [],
    permissions: ['read commissioned configuration'], prohibitedActions: ['external action without approval','credential access without dedicated setup','destructive action'],
    memoryScope: 'room-scoped approved memory', autonomy: mode === 'demo' ? 'demo_only' : 'supervised',
    approvalTriggers: ['external write','spend','publish','destructive action'], expectedInputs: ['approved task input'], expectedOutputs: ['provenanced result or explicit error'],
    subagents: [], idleBehavior: 'May visit Ten Forward when unassigned', budget: 'No spend configured', successMeasures: ['accepted output','complete provenance','no gate bypass'],
  }))
}

function topology(template: Template, roomIds: string[]): Adjacency[] {
  const ordered = [...template.routeOrder, ...roomIds.filter((id) => !template.routeOrder.includes(id))]
  const routes: Adjacency[] = ordered.slice(0, -1).map((from, index) => ({ from, to: ordered[index + 1], route: template.movement }))
  for (const id of roomIds.filter((id) => id !== 'bridge' && !routes.some((route) => route.from === 'bridge' && route.to === id))) {
    routes.push({ from: 'bridge', to: id, route: template.id === 'skyscraper' ? 'command elevator link' : `command ${template.movement}` })
  }
  return routes
}

function themedRooms(template: Template, mode: InstallationMode, agents: AgentDefinition[]): RoomProfile[] {
  return roomSeeds.map((room, index) => ({
    ...room,
    name: room.id === 'bridge' ? template.commandName : room.name,
    status: mode === 'demo' ? 'demo' : room.type === 'recreation' ? 'idle' : 'unconfigured',
    agentIds: agents.filter((agent) => agent.roomId === room.id).map((agent) => agent.id),
    assetPath: `/concept-art/rooms/${room.id}.png`,
    zone: template.id === 'skyscraper' ? `Floor ${roomSeeds.length - index}` : `${template.topology} · zone ${index + 1}`,
  }))
}

export function createCommissioningDraft(overrides: Partial<Pick<CommissioningDraft, 'installationMode' | 'visualStyleId' | 'worldTemplateId' | 'worldName'>> = {}): CommissioningDraft {
  const installationMode = overrides.installationMode ?? 'standard'
  const visualStyleId = overrides.visualStyleId ?? 'pixel_art'
  const worldTemplateId = overrides.worldTemplateId ?? 'modern_corporate_office'
  const template = WORLD_TEMPLATES.find((item) => item.id === worldTemplateId)!
  const agents = makeAgents(installationMode)
  const rooms = themedRooms(template, installationMode, agents)
  return {
    schemaVersion: SCHEMA_VERSION, id: `${installationMode}:commissioning:local`, namespace: installationMode, status: 'interviewing', installationMode,
    articulation: {
      ownerName: '',
      stewardName: 'Ultron',
      vision: '',
      desiredOutcomes: [],
      operatingBoundaries: [],
      workingStyle: 'Propose a blueprint, explain the routing, and ask before consequential actions.',
    },
    visualStyleId, worldTemplateId, worldName: overrides.worldName ?? 'Agentarium One',
    presentation: { customStyleDescription: visualStyleId === 'custom' ? 'Describe the desired visual language.' : undefined, interpretationConfirmed: visualStyleId !== 'custom', palette: ['navy','amber','cyan'], mood: ['warm','legible','operational'], animationLevel: 'subtle', pixelArtEnabled: visualStyleId === 'pixel_art' },
    theme: { customThemeDescription: worldTemplateId === 'custom' ? 'Describe geography, command area, movement, materials, mood, and landmarks.' : undefined, interpretationConfirmed: worldTemplateId !== 'custom', movementMetaphor: template.movement, materials: template.materials, layoutLogic: template.topology },
    rooms, adjacency: topology(template, rooms.map((room) => room.id)), agents,
    workflows: ['Nova evidence → Pixel visual concept → Forge product test → Jared demand test → Treasury unit economics → Governance gate → fulfillment result → Archives/Feedback → Nova learning return'],
    businesses: [{ id: 'business:etsy-forge', name: 'Etsy Forge', kind: 'forge', purpose: 'Supervised evidence-to-profit product experiments with a measured learning return.', customer: 'To be defined by owner', inputs: ['approved opportunity packet','approved visual candidate','Treasury guardrails'], outputs: ['draft product/listing packet','measured experiment result'], deliveryDestination: 'Unconfigured', productionAgentIds: ['forge'], qaAgentIds: ['governor'], evidenceIntent: 'Configured attributable sources only', approvalPoints: ['before external publishing','before spend','before fulfillment changes'], integrationIntents: ['Etsy, fulfillment, marketing, and financial systems remain unconfigured'], metrics: ['contribution margin','customer acquisition cost','conversion rate','refund rate','verified profit','learning return'], risks: ['IP','trademark','privacy','platform policy','unprofitable unit economics'], maturity: installationMode === 'demo' ? 'demo_only' : 'supervised' }],
    governance: { approvalRequired: true, externalWrites: 'gated', credentialStorage: 'not_configured', auditReplay: true, deploymentIntent: 'local_only', userIntent: 'single_owner', dataSensitivity: 'No secrets in browser storage', retention: 'Owner-controlled local retention', backupExport: 'Versioned JSON export/import', spendLimit: 'No spend enabled', notificationChannels: [], failureRetry: 'Pause and require explicit retry', maintenanceWindow: 'Owner scheduled', telemetryPrivacy: 'Local only; no telemetry', assetReview: 'individual' },
    operational: emptyOperational(), assumptions: ['Providers and integrations begin unconfigured','No external generation is approved'], openQuestions: ['Which evidence sources should Nova use?','Which integrations should be configured later?'],
  }
}

export function changeVisualStyle(draft: CommissioningDraft, visualStyleId: VisualStyleId): CommissioningDraft {
  return { ...draft, visualStyleId, presentation: { ...draft.presentation, pixelArtEnabled: visualStyleId === 'pixel_art', customStyleDescription: visualStyleId === 'custom' ? (draft.presentation.customStyleDescription ?? 'Describe the desired visual language.') : undefined, interpretationConfirmed: visualStyleId !== 'custom' }, pendingChangeScope: 'visual_assets_only' }
}

export function changeWorldTemplate(draft: CommissioningDraft, worldTemplateId: WorldTemplateId): CommissioningDraft {
  const template = WORLD_TEMPLATES.find((item) => item.id === worldTemplateId)!
  const rooms = themedRooms(template, draft.installationMode, draft.agents)
  return { ...draft, worldTemplateId, rooms, adjacency: topology(template, rooms.map((room) => room.id)), theme: { customThemeDescription: worldTemplateId === 'custom' ? 'Describe geography, command area, movement, materials, mood, and landmarks.' : undefined, interpretationConfirmed: worldTemplateId !== 'custom', movementMetaphor: template.movement, materials: template.materials, layoutLogic: template.topology } }
}

export function createBuildPlan(draft: CommissioningDraft): BuildPlan {
  const bundled = draft.visualStyleId === 'pixel_art' && draft.worldTemplateId === 'spaceship'
  const style = VISUAL_STYLES.find((item) => item.id === draft.visualStyleId)!
  const template = WORLD_TEMPLATES.find((item) => item.id === draft.worldTemplateId)!
  const assets: GeneratedAsset[] = [{ id: 'asset:ship', kind: 'ship_background', source: bundled ? 'bundled' : 'placeholder', path: bundled ? '/concept-art/ship/ship-overview-cross-section.png' : '', prompt: `${style.label}; ${template.label}; ${template.topology}; ${template.materials}; whole-world overview`, status: bundled ? 'approved' : 'needs_review' }, ...draft.rooms.map((room) => ({ id: `asset:${room.id}`, kind: 'room_background' as const, ownerId: room.id, source: bundled ? 'bundled' as const : 'placeholder' as const, path: bundled ? room.assetPath : '', prompt: `${style.label}; ${template.label}; ${template.materials}; ${room.zone}; ${room.name}: ${room.description}`, status: bundled ? 'approved' as const : 'needs_review' as const }))]
  const hotspots = bundled ? draft.rooms.map((room) => ({ id: `hotspot:${room.id}`, targetId: room.id, label: room.name, polygon: hotspotCoordinates[room.id] })) : []
  return {
    id: `plan:${draft.worldTemplateId}:${draft.visualStyleId}`, articulation: structuredClone(draft.articulation), style: draft.visualStyleId, worldTemplate: draft.worldTemplateId, worldName: draft.worldName,
    movementMetaphor: draft.theme.movementMetaphor, artDirection: `${style.label}; ${template.materials}; ${draft.presentation.mood.join(', ')}`,
    rooms: draft.rooms, adjacency: draft.adjacency, agents: draft.agents, businesses: draft.businesses, governance: draft.governance, workflows: draft.workflows,
    approvalGates: ['Blueprint approval before local build','Final presentation approval before replacing active world','Explicit approval before any future external action'],
    assets, hotspots, externalEstimate: { calls: 0, cost: 0, currency: 'USD', reason: 'Local bundled art or placeholders only' }, assumptions: draft.assumptions, openQuestions: draft.openQuestions,
    setupRequirements: ['Configure evidence provider for Nova','Configure model providers','Approve credentials in dedicated secure setup','Configure external integrations separately'],
    warnings: bundled ? ['Bundled art is local and offline; operational providers remain unconfigured.'] : ['Matching art is unavailable locally; placeholders and retained prompts will be used.'],
    nonGoals: ['No credentials activated','No paid generation','No publishing, spending, or destructive action','No uncontrolled source modification'],
  }
}

function isRecord(value: unknown): value is Record<string, unknown> { return Boolean(value) && typeof value === 'object' && !Array.isArray(value) }
export function validateCommissioningDraft(value: unknown): { ok: true; value: CommissioningDraft } | { ok: false; errors: string[] } {
  const errors: string[] = []
  if (!isRecord(value)) return { ok: false, errors: ['Record must be an object'] }
  if (value.schemaVersion !== SCHEMA_VERSION) errors.push(`Unsupported schema version ${String(value.schemaVersion)}`)
  if (value.installationMode !== 'standard' && value.installationMode !== 'demo') errors.push('Invalid installation mode')
  if (!['interviewing','awaiting_blueprint_approval','building','awaiting_final_review','complete','failed'].includes(String(value.status))) errors.push('Invalid commissioning status')
  if (!VISUAL_STYLES.some((style) => style.id === value.visualStyleId)) errors.push('Invalid visual style')
  if (!WORLD_TEMPLATES.some((template) => template.id === value.worldTemplateId)) errors.push('Invalid world template')
  if (typeof value.worldName !== 'string' || !value.worldName.trim()) errors.push('World name is required')
  const mode = value.installationMode
  if (value.namespace !== mode) errors.push('Namespace does not match installation mode')
  if (typeof value.id !== 'string' || !value.id.startsWith(`${String(mode)}:`)) errors.push('Commissioning ID does not match mode namespace')
  if (!isRecord(value.articulation) || typeof value.articulation.ownerName !== 'string' || typeof value.articulation.stewardName !== 'string' || !value.articulation.stewardName.trim() || typeof value.articulation.vision !== 'string' || !Array.isArray(value.articulation.desiredOutcomes) || !Array.isArray(value.articulation.operatingBoundaries) || typeof value.articulation.workingStyle !== 'string') errors.push('Invalid articulation answers')
  if (!isRecord(value.presentation) || typeof value.presentation.interpretationConfirmed !== 'boolean' || !Array.isArray(value.presentation.palette) || !Array.isArray(value.presentation.mood)) errors.push('Invalid presentation answers')
  if (value.visualStyleId === 'custom' && (!isRecord(value.presentation) || typeof value.presentation.customStyleDescription !== 'string' || !value.presentation.customStyleDescription.trim() || (value.status !== 'interviewing' && value.presentation.interpretationConfirmed !== true))) errors.push('Custom visual style requires a confirmed description before building')
  if (!isRecord(value.theme) || typeof value.theme.movementMetaphor !== 'string' || typeof value.theme.materials !== 'string' || typeof value.theme.layoutLogic !== 'string') errors.push('Invalid theme answers')
  if (value.worldTemplateId === 'custom' && (!isRecord(value.theme) || typeof value.theme.customThemeDescription !== 'string' || !value.theme.customThemeDescription.trim() || (value.status !== 'interviewing' && value.theme.interpretationConfirmed !== true))) errors.push('Custom theme requires a confirmed description before building')
  if (!Array.isArray(value.rooms) || !value.rooms.length || !value.rooms.every((room) => isRecord(room) && typeof room.id === 'string' && typeof room.name === 'string' && typeof room.description === 'string' && typeof room.level === 'string' && Array.isArray(room.agentIds) && typeof room.assetPath === 'string' && (room.assetPath === '' || validateAssetPath(room.assetPath, 'bundled')))) errors.push('Invalid room profiles')
  if (!Array.isArray(value.adjacency) || !value.adjacency.length || !value.adjacency.every((edge) => isRecord(edge) && typeof edge.from === 'string' && typeof edge.to === 'string' && typeof edge.route === 'string')) errors.push('Invalid topology adjacency')
  if (!Array.isArray(value.agents) || !value.agents.length || !value.agents.every((agent) => isRecord(agent) && typeof agent.id === 'string' && typeof agent.roomId === 'string' && typeof agent.provider === 'string' && typeof agent.model === 'string' && typeof agent.fallbackModel === 'string' && Array.isArray(agent.tools) && Array.isArray(agent.permissions) && Array.isArray(agent.prohibitedActions) && Array.isArray(agent.approvalTriggers) && Array.isArray(agent.subagents) && Array.isArray(agent.successMeasures))) errors.push('Invalid agent definitions')
  if (!Array.isArray(value.businesses) || !value.businesses.length || !value.businesses.every((business) => isRecord(business) && business.kind === 'forge' && Array.isArray(business.inputs) && Array.isArray(business.outputs) && Array.isArray(business.productionAgentIds) && Array.isArray(business.qaAgentIds) && Array.isArray(business.approvalPoints) && Array.isArray(business.metrics) && Array.isArray(business.risks))) errors.push('Invalid Forge definitions')
  if (!isRecord(value.governance) || value.governance.approvalRequired !== true || value.governance.externalWrites !== 'gated' || value.governance.credentialStorage !== 'not_configured' || typeof value.governance.retention !== 'string' || typeof value.governance.backupExport !== 'string' || typeof value.governance.failureRetry !== 'string') errors.push('Invalid governance answers')
  if (!Array.isArray(value.workflows) || !value.workflows.length || !Array.isArray(value.assumptions) || !Array.isArray(value.openQuestions)) errors.push('Missing workflow, assumptions, or open questions')
  if (isRecord(value.operational) && (mode === 'standard' || mode === 'demo')) {
    const operational = value.operational
    const operationalKeys = ['quests','events','packets','evidence','memories','metrics','feedback','approvals']
    if (operationalKeys.some((key) => !Array.isArray(operational[key]))) errors.push('Operational partition is missing required collections')
    for (const collection of operationalKeys.map((key) => operational[key])) {
      if (!Array.isArray(collection)) { errors.push('Operational collection is not an array'); continue }
      for (const item of collection) {
        if (!isRecord(item) || !isRecord(item.provenance)) { errors.push('Operational record lacks provenance'); continue }
        const id = item.id
        const dataClass = item.provenance.dataClass
        const sourceType = item.provenance.sourceType
        if (typeof id !== 'string' || !['real','user_entered','derived','synthetic_demo'].includes(String(dataClass)) || !['user','file','api','tool','agent','event','demo_fixture'].includes(String(sourceType)) || typeof item.provenance.sourceId !== 'string') errors.push('Operational record has invalid identity or provenance')
        if (mode === 'standard' && (typeof id === 'string' && id.startsWith('demo:') || dataClass === 'synthetic_demo' || sourceType === 'demo_fixture')) errors.push('Standard record contains Demo namespace or provenance')
        if (mode === 'demo' && (typeof id !== 'string' || !id.startsWith('demo:') || dataClass !== 'synthetic_demo' || sourceType !== 'demo_fixture')) errors.push('Demo record violates Demo namespace or provenance')
      }
    }
  } else errors.push('Missing operational partition')
  if (isRecord(value.buildPlan)) {
    const plan = value.buildPlan
    if (!isRecord(plan.articulation) || JSON.stringify(plan.articulation) !== JSON.stringify(value.articulation) || !Array.isArray(plan.rooms) || !Array.isArray(plan.adjacency) || !Array.isArray(plan.agents) || !Array.isArray(plan.businesses) || !Array.isArray(plan.assets) || !Array.isArray(plan.hotspots) || !Array.isArray(plan.approvalGates) || !isRecord(plan.externalEstimate)) errors.push('Invalid build plan structure')
    else {
      const roomIds = new Set(plan.rooms.filter(isRecord).map((room) => room.id))
      const bundled = plan.style === 'pixel_art' && plan.worldTemplate === 'spaceship'
      if (plan.id !== `plan:${String(value.worldTemplateId)}:${String(value.visualStyleId)}` || plan.style !== value.visualStyleId || plan.worldTemplate !== value.worldTemplateId || plan.worldName !== value.worldName) errors.push('Build plan identity does not match commissioning record')
      if (JSON.stringify(plan.rooms) !== JSON.stringify(value.rooms) || JSON.stringify(plan.adjacency) !== JSON.stringify(value.adjacency) || JSON.stringify(plan.agents) !== JSON.stringify(value.agents) || JSON.stringify(plan.businesses) !== JSON.stringify(value.businesses)) errors.push('Build plan contents do not match commissioning record')
      if (plan.hotspots.some((hotspot) => !isRecord(hotspot) || !roomIds.has(hotspot.targetId) || !Array.isArray(hotspot.polygon) || hotspot.polygon.length < 4)) errors.push('Invalid build plan hotspots')
      if (bundled && plan.hotspots.length !== plan.rooms.length) errors.push('Bundled plan missing hotspots')
      if (!bundled && plan.hotspots.length !== 0) errors.push('Non-bundled plan must not contain hotspots')
      if (plan.assets.length !== plan.rooms.length + 1) errors.push('Invalid build plan asset coverage')
      for (const asset of plan.assets) {
        if (!isRecord(asset) || typeof asset.id !== 'string' || !['ship_background','room_background'].includes(String(asset.kind)) || !['approved','needs_review','rejected'].includes(String(asset.status)) || typeof asset.prompt !== 'string' || typeof asset.path !== 'string' || !validateAssetPath(asset.path, asset.source as GeneratedAsset['source'])) {
          errors.push('Invalid build plan asset path')
          break
        }
        const pendingReplacement = asset.status === 'needs_review' && isRecord(asset.previous)
        if (asset.kind === 'ship_background' && asset.id !== 'asset:ship') { errors.push('Invalid ship asset identity'); break }
        if (asset.kind === 'room_background' && (!roomIds.has(asset.ownerId) || (bundled && asset.path !== plan.rooms.find((room) => isRecord(room) && room.id === asset.ownerId)?.assetPath && !pendingReplacement))) { errors.push('Invalid room asset identity'); break }
        if (isRecord(asset.previous) && (typeof asset.previous.path !== 'string' || !validateAssetPath(asset.previous.path, asset.previous.source as GeneratedAsset['source']) || (bundled && asset.previous.source !== 'bundled'))) { errors.push('Invalid prior asset path'); break }
        if (bundled && asset.source !== 'bundled' && !pendingReplacement) { errors.push('Bundled plan contains non-bundled asset'); break }
        if (!bundled && asset.source !== 'placeholder') { errors.push('Non-bundled plan contains bundled asset'); break }
      }
    }
  } else if (value.status === 'building' || value.status === 'awaiting_final_review' || value.status === 'complete') errors.push('Build plan is required for current status')
  return errors.length ? { ok: false, errors } : { ok: true, value: value as CommissioningDraft }
}