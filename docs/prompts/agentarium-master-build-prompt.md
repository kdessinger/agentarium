# Agentarium — Master Build Prompt (Approved Prototype + Commissioning Direction)

> Status: approved by Kenn for local implementation. The image-first art pipeline and self-building first-run commissioning direction were added by Kenn after the first prototype review.
>
> **Remaining hard gate:** Local simulation, onboarding, bundled-art assembly, and reversible configuration work are approved. Real credentials, paid model/image calls, external integrations, publishing, spending, deployment, and irreversible actions still require explicit scoped approval.

## Copy from here into the selected builder after approval

```text
You are building Phase 1 of Agentarium. Treat this specification as a contract. Do not substitute a smaller generic dashboard, a chat UI, a social-simulation town, a static image, or an implementation with real autonomous side effects.

# 0. Authority, objective, and operating rules

## 0.1 Authority

Kenn is the owner and final authority. The Steward proposes and routes. Agents execute only inside the simulation. The user approves or denies every gated decision.

If a requirement is unclear, preserve safety and make the smallest reversible simulation choice. Surface the assumption in the app’s activity log or implementation notes; do not invent integrations, credentials, business results, revenue, marketplace data, or successful work.

## 0.2 Build objective

Build a serious, local, browser-runnable **Phase 1 prototype/simulation** for **Agentarium**: a spatial AI operations canvas represented as a pixel-art-inspired space station of connected labs.

The prototype must make a simulated multi-agent workflow legible from start to finish. Rooms are first-class ship entities with profiles, levels, and inspectable responsibilities:

1. Kenn enters a human vision in the Articulation Console.
2. The Steward turns that vision into an inspectable blueprint, task plan, handoff chain, risk classification, and proposed station/agent use.
3. Kenn launches one deterministic simulation from that approved blueprint.
4. Nova produces a realistic structured opportunity packet from mock market evidence.
5. Forge turns that packet into a mock product/listing packet.
6. Pixel produces a mock visual/media candidate packet.
7. Review/Governance evaluates the candidate and pauses at a human approval gate.
8. Kenn approves or denies the gate.
9. The app records an immutable-looking audit trail and lets Kenn replay the sequence.

This is a simulation and control-surface prototype. It is not a live agent platform yet.

## 0.3 Product identity and tone

Product name: **Agentarium**.

Use a warm, legible, pixel-art-inspired sci-fi space station / operations canvas. It should feel like a management game crossed with a mission-control console: alive, practical, inspectable, and calm under pressure.

Use the useful architectural lessons from public AI-agent-space-station references:
- visible connected labs
- concrete workflow handoffs
- research feeding production
- feedback improving lab maturity
- clear approval checkpoints
- an operations view rather than a hidden autonomous black box

Do **not** copy any creator’s persona, visual identity, naming, prose, hostile tone, or rhetoric. In particular, never use or imply:
- “dungeon” framing
- slave/servant/master language for agents
- job-replacement triumphalism
- cruelty, humiliation, domination, or edgy “AI army” language
- fake revenue claims, fake orders, fake customers, or fantasy autonomy claims

Agents are specialized collaborators in a supervised operating system. The human is responsible for vision, standards, permissions, and final decisions.

## 0.4 Hard safety boundary

Phase 1 is simulation-only. The current mode must be visible at all times as `SIMULATION — no external actions`.

Do not implement or call:
- live LLMs or agent runtimes
- marketplace, Etsy, Printify, Fiverr, email, social-media, payment, analytics, or publishing APIs
- credentials, secret storage, OAuth, authentication, billing, subscriptions, or marketplace accounts
- file-system actions beyond ordinary local development/build behavior
- network actions that publish or deliver content
- autonomous loops, background agents, cron jobs, workers, or retries that run without the user pressing a visible simulation control
- actual spending, ordering, listing, messaging, fulfillment, or customer delivery

Every result in the UI must be visibly labelled `Mock`, `Simulated`, `Dry-run`, or `Example` where a user could otherwise mistake it for live work.

# 1. Implementation target and technical constraints

## 1.1 Preferred stack

Use the repository’s existing application stack if one is already present and healthy. Otherwise use:
- Vite
- React
- TypeScript
- React Three Fiber / Three.js if practical
- Zustand or an equally lightweight explicit client-side store
- plain CSS, CSS modules, or Tailwind only if it is already available/appropriate

A pseudo-3D or 2.5D isometric world is acceptable if it produces a stronger, more reliable full-viewport operational prototype than rushed 3D. Do not fake “3D” with a single static background image. Every room, agent, quest state, event, and handoff must be driven by application state and inspectable.

Do not add a backend for Phase 1. Use a replaceable mock API/service boundary and deterministic client-side state. Browser localStorage may preserve demo preferences or an explicitly labelled local simulation snapshot, but the app must work cleanly without persisted data.

## 1.2 Required project hygiene

Before changing code:
1. Read the project’s README, CONTEXT.md, PRODUCT_BLUEPRINT.md, ARCHITECTURE.md, MVP_PLAN.md, and AGENTS.md.
2. Inspect existing source structure and package manifest before choosing paths or imports.
3. Follow the project’s existing naming and formatting conventions.
4. Do not overwrite unrelated project files.

When creating an app from an empty repository, include:
- local run instructions
- a clear project structure
- mock data isolated from rendering code
- shared TypeScript contracts
- deterministic simulation actions
- smoke tests or a verification script
- an implementation note stating that Phase 1 has no live side effects

Use functional names for components. Good: `QuestBoard`, `EventTimeline`, `ApprovalGate`, `StationInspector`. Bad: `AgentariumPanel`, `AgentariumCard`, `CoolWidget`.

Rooms are first-class world entities, not just labels on a map. Every room must have a visible profile with:
- `Room Name`
- `Type`
- `Description`
- `Level`

Use room/profile language in the UI where it clarifies the world model. Example component names stay functional: `RoomProfileCard`, `StationInspector`, `ForgeRoomPanel`, `ArchivesGraphView`, `TenForwardPanel`.

## 1.3 Required app shell

- The world uses the full available viewport on desktop. It must not sit inside a centered half-width marketing card.
- The main view is a connected station map with overlays/panels that can be collapsed or resized without making the world disappear.
- A 2D inspector/detail mode is always available for precise reading and accessibility. The 3D/pixel scene supplements the operational data; it never hides it.
- On narrower screens, preserve the same information hierarchy through a responsive drawer/tab layout. Do not leave controls inaccessible behind horizontal overflow.
- Do not require sound, animation, hover, or color alone to understand status.

# 2. Phase 1 scope and non-goals

## 2.1 In scope

Build a polished simulated prototype with:
- a full-viewport space-station operations canvas
- named room modules and visibly connected routes
- Ultron / the Steward on The Bridge and the required specialized agents
- an Articulation Console with a preset, editable founder/operator vision
- deterministic blueprint generation from that vision
- an inspectable quest board and task decomposition
- a complete mock opportunity → product/listing → visual candidate → governance workflow
- human approval/denial handling
- detailed append-only-style event log
- replay controls that reset and replay deterministic events without generating new invented history
- dry-run/simulation status, audit details, and lab maturity indicators
- station/agent/task/packet inspectors
- visible failure and blocked states
- responsive behavior and testable state contracts

## 2.2 Explicit non-goals

Do not build:
- real agent execution or model calls
- real market research or web scraping
- real Etsy/Printify/Fiverr/YouTube/TikTok/social integrations
- publishing, delivery, spending, commerce, fulfillment, or revenue processing
- login, multi-tenant workspaces, billing, subscriptions, payments, or production auth
- a plugin marketplace or skill installer
- unbounded multi-agent loops or autonomous background processes
- production database, queue, WebSocket/SSE service, or deployment infrastructure
- a chatbot as the primary interface
- a Sims-like character-life game, break-room simulation, or decorative NPC wandering
- a generic enterprise Kanban dashboard with a tiny decorative canvas

Do not silently build ahead into Phase 2. Leave extension seams; do not pretend they are connected.

# 3. Information architecture and station map

Build the station as a connected, readable world. Rooms must use an observable state model. A room's glow, badge, traffic, animation, or alert must correspond to an actual state field and have an inspectable explanation.

## 3.1 Required room profile model

Every room is a first-class entity with a room profile. The inspector for every room must show, at minimum:

```text
Room Name: xxx
Type: xxx
Description: xxx
Level: xxx
```

The `Type` must clearly distinguish operational purpose. Use these room types in Phase 1:

- `bridge` — master command room / primary human + Ultron interface
- `war_room` — officer conference, group planning, strategy, reviews
- `forge` — income-producing outside-world business factory
- `communications` — outside-world signal room, not a forge
- `archives` — system memory-bank command room
- `specialist_lab` — expert creative/research/build/security room
- `governance` — review, risk, approval, safety
- `recreation` — non-production social/life room
- `support` — treasury, media, skill armory, feedback/training, etc.

`Level` is the room's maturity/capability level for the prototype. It can be a simple integer or label, but it must be visible and consistent. Example: `Level 1 — Simulated`.

## 3.2 Required rooms

Render all of these named rooms. They may be grouped into sectors to keep the first scene readable, but each must be selectable and have an inspector/profile entry.

1. **The Bridge**
   - The master room of the station.
   - This replaces generic `Mission Control / Command Deck` language.
   - Ultron lives here.
   - Ultron is the top-level AI/steward who keeps all other AIs working.
   - Ultron is the AI that primarily interacts with Kenn.
   - When Kenn is logged into Agentarium, Kenn's avatar appears in the world, usually on The Bridge.
   - Like a spaceship bridge, The Bridge can communicate with every other room on the ship.
   - Shows current simulation mode, active quest, pending approvals, world health, and current sequence position.

2. **The War Room**
   - A conference room attached to The Bridge.
   - This is where all officers/AIs on the ship can gather for group meetings.
   - Supports group planning, review, strategy, cross-agent coordination, and weekly/daily operational review.

3. **Articulation Console**
   - Human input converts a stated vision into a proposed blueprint.
   - Shows vision, assumptions, proposed rooms, proposed agents, workflow, risks, approval needs, metrics, and open questions.
   - It may live on The Bridge or as a directly attached console room.

4. **Nova Room / Research and Design Lab**
   - Market-intelligence and research/design station.
   - Produces opportunity packets from explicitly mock evidence, not vague research prose.
   - Nova studies high-performing patterns and turns them into original opportunity packets with risk flags.

5. **Forge Rooms**
   - Forges are business/factory rooms that interact with the outside world to build sellable products or produce income.
   - A Forge is distinct from Communications: it makes/sells/delivers value; Communications routes signals/messages.
   - Phase 1 must model Forge as a category and include at least these room profiles, even if most are standby/simulated:
     - Etsy Forge
     - Fiverr Forge
     - Print-on-Demand Forge
     - Supplements Forge
     - Old-Time Photo Restoration Forge
     - High-Ticket Affiliate Forge
   - The default simulation may focus on Etsy Forge, but the other Forges should appear as inactive/standby rooms with honest Phase 1 labels.

6. **Pixel Room / Graphic Artist Studio**
   - Visual and media production station.
   - Pixel is the graphic artist.
   - Turns mock listing direction into thumbnail/product-media candidate packets.
   - It does not communicate with Fiverr or deliver a customer asset in Phase 1.

7. **Vibes Room / Music Artist Studio**
   - Audio/music creative station.
   - Vibes is the music artist.
   - Phase 1 may keep this room in standby, but its profile must exist and explain future audio/music production responsibilities.

8. **Developer Room / App Builder Lab**
   - Software/app-building station.
   - Developer is responsible for app prototypes, internal tools, adapters, and future software builds.
   - Phase 1 may keep this room in standby unless the prototype uses it as a mock future capability.

9. **Security Room**
   - Ship security station.
   - The security agent keeps the entire ship secure.
   - Shows mock security posture, permission boundaries, external-action risk, and alerts.
   - It must reinforce that Phase 1 is simulation-only and no credentials/live adapters are connected.

10. **Communications Room**
    - Outside-world signal room, but explicitly not a Forge.
    - Handles simulated messages, emails, comments, alerts, customer signals, and routing.
    - It does not manufacture products, sell products, publish, send, or deliver in Phase 1.

11. **Review / Governance Station**
    - Quality, policy, IP/trademark, acceptance criteria, and risk review.
    - Owns the phase-one approval request and decision explanation.

12. **Archives**
    - Command center for the system memory banks.
    - This is where the memories of all agents are stored and navigated.
    - It is commander-facing, not passive storage.
    - Must include visual memory tools inspired by mind maps and Obsidian-style graph views:
      - clustered memory/topic nodes
      - relationship edges
      - agent-memory filters
      - memory-bank search/retrieval controls
      - provenance/timeline views showing where a memory came from and which agent used it
    - The visual reference is a pale graph canvas with dense central clusters, smaller satellite clusters, and gray/pink/red nodes and edges. Treat this as a living neural/star-map memory graph, not a flat file browser.
    - In Phase 1 the data is mock/local/simulated, but the model should make memory feel like inspectable world infrastructure.

13. **Feedback / Training Console**
    - Records approve/reject/iterate feedback against output quality.
    - Shows how feedback affects lab maturity but does not train any model.

14. **Skill Armory**
    - Capability inventory and safety metaphor.
    - Displays mock skills with provenance, permission scope, quarantine/inspection status, and approval status. Never implements downloading or installation.

15. **Treasury**
    - Cost-control and budget metaphor.
    - Shows a mock budget, estimated simulation cost as `$0.00`, and an explicit `No live spend connected` notice. Do not invent live revenue.

16. **Media Bay**
    - Scheduling/publishing metaphor.
    - Shows mock queued media packets and a blocked `External delivery requires approval + future live adapter` state.

17. **Ten Forward**
    - Recreational non-production room.
    - It produces nothing operational and should not be measured as a Forge or productivity station.
    - Idle AI agents can go there when they have nothing assigned.
    - Agents can socialize, brainstorm ideas, talk nonsense, build relationships, and just live a life.
    - This adds life/personality to the world without confusing social ambience with production work.

## 3.3 Spatial relationships

Use visible routes so the default simulation reads as a real operational pipeline:

```text
The Bridge / Articulation Console
  → Ultron / Steward routing on The Bridge
  → Nova Room
  → Etsy Forge
  → Pixel Room
  → Review / Governance
  → Approval Gate
  → Archives + Feedback Console
```

The Bridge must have visible communications links to every room. The War Room should appear attached to The Bridge. Communications Room must visibly connect inbound signals to The Bridge or the relevant operational room. Skill Armory, Treasury, Media Bay, Security, Archives, Feedback, Developer, Vibes, and Ten Forward should be connected as supporting/living modules rather than buried in a settings menu.

Do not imply that every room is active in the first simulation. Inactive rooms should explain their state, for example: `Standby — no approved live adapter in Phase 1`.

# 4. Required roles and responsibilities

## 4.1 Human operator / Kenn avatar

The human operator is not an agent. Kenn is represented by a logged-in avatar that usually appears on The Bridge. The operator:
- writes or edits the articulation vision
- primarily interacts with Ultron on The Bridge
- inspects proposed work
- starts/resets/replays the simulation
- approves or denies gated actions
- can stop a running simulation
- can inspect every underlying record

## 4.2 Ultron / Steward

Ultron is the deterministic top-level orchestrator/steward living on The Bridge. It must:
- decompose a quest into ordered tasks
- select a room/agent using a visible deterministic rationale
- identify dependencies and risk level
- emit events for assignments, starts, handoffs, pauses, decisions, completion, and failures
- request human approval instead of bypassing it
- explain blocked state rather than silently retrying

Ultron / the Steward must not claim sent messages, live tool use, executed model calls, or real-world success.

## 4.3 Nova

Nova is a market-intelligence engine, not a generic research chatbot. Nova’s mock output must be a structured **Opportunity Packet** with evidence and risk fields specified in Section 6.

Nova’s logic is represented as:

```text
mock market evidence
  → observed demand/pattern
  → adaptation idea
  → IP/trademark/policy/oversaturation checks
  → confidence and next action
  → handoff to Forge
```

Nova must never be described as copying other sellers. The product behavior is to observe market patterns, identify demand signals, and propose original/adapted concepts with explicit risk flags.

## 4.4 Forge

Forge is a supervised factory/production agent. It consumes an Opportunity Packet and outputs a **Mock Product Listing Packet**. It must surface missing inputs or risk flags instead of pretending the listing is ready for publication.

## 4.5 Pixel

Pixel is a visual/media agent. It consumes Forge’s packet and outputs a **Mock Visual Candidate Packet**. It may render a styled placeholder/thumbnail composition or data-driven visual concept inside the prototype, but it must be labelled mock and must not call an image-generation service.

## 4.6 Cipher

Cipher is an inbound-signal and communications-routing agent. It belongs in the Communications Room, which interacts with the outside world but is not a Forge. Cipher handles simulated inbound signals, classifies urgency/risk, and forwards a mock handoff. It must not send messages.

## 4.7 Vibes

Vibes is the music/audio artist. In Phase 1, Vibes can remain standby, but the room profile must explain that this room is for future audio/music generation and media support. It must not call live music-generation services.

## 4.8 Developer

Developer is the app/software builder. In Phase 1, Developer can remain standby, but the room profile must explain future app, internal tool, adapter, and prototype-building responsibilities. It must not create new autonomous code-generation workflows beyond the current local prototype.

## 4.9 Security

Security protects the whole ship. It should surface simulated security posture, permission boundaries, external-action risk, unapproved adapter warnings, and no-credentials-connected status. Security must reinforce approval gates rather than bypass them.

## 4.10 Ten Forward

Ten Forward is not a productivity engine. It is the recreational/life room where idle agents can socialize, brainstorm, talk nonsense, build relationships, and feel like inhabitants of the world. Phase 1 may simulate this as lightweight ambient state only; do not let it distract from operational visibility.

## 4.11 Archives

Archives commands the system memory banks for all agents. It should make memory inspectable through graph/mind-map concepts, search, filters, provenance, timelines, and relationship edges. In Phase 1, memory data is mock/local/simulated, but the product metaphor should be strong enough to guide later real memory-bank integration.

## 4.12 Review / Governance

Governance checks acceptance criteria and risk. It should reject or request revision when required evidence is missing, IP/trademark risk is unresolved, or a proposed action would be external. It creates an ApprovalRequest for the human rather than letting output silently advance.

# 5. Visual and interaction requirements

## 5.1 Style

Use a pixel-art-informed visual system without requiring literal low-resolution raster art everywhere:
- deep space/navy background with warm amber, cyan, violet, and green operational lights
- clear room silhouettes/modules, short readable labels, controlled glow
- sprites, tile details, or stylized isometric geometry if practical
- motion that communicates routing, queueing, waiting, success, failure, or blocked state
- high-contrast accessible text and status indicators
- a calm command-center feel, not a casino and not a sterile SaaS admin screen

Avoid visual clutter. Decorative particles, moving stars, and ambient animation must not obscure task state or consume the visual hierarchy.

## 5.2 Status language and colors

Use the same semantic states across stations, agents, tasks, and events:
- `idle` — neutral/slate
- `queued` — blue
- `working` — cyan/amber motion
- `blocked` — orange
- `needs_approval` — violet or clear caution color
- `completed` — green
- `failed` — red
- `offline` — muted gray

Pair every color with a label/icon/text. Do not rely only on color, pulse, or animation.

## 5.3 Essential controls

Provide these visible controls with clear disabled states and explanations:
- Edit Vision
- Generate Blueprint
- Start Simulation
- Advance One Step
- Pause / Stop Simulation
- Reset World
- Approve
- Deny
- Replay from Start
- Replay Previous Event
- Replay Next Event
- Exit Replay / Return to Live Simulation State
- Inspect selected station/agent/quest/event

`Start Simulation` is disabled until a valid blueprint exists. Approval controls are disabled unless an approval is pending. Do not make controls appear active when their underlying action is unsupported.

## 5.4 Inspector and accessibility requirements

Selection of a room, agent, event, packet, or approval must open an inspector that shows the underlying object fields in plain language.

The inspector must include:
- title and current state
- role/owner
- related quest/task IDs
- summary
- relevant inputs and outputs
- dependencies
- risk/mode
- timestamp or deterministic simulation sequence number
- link/click target to the related event/packet when applicable

Keyboard navigation must reach all primary controls. Add `prefers-reduced-motion` handling so handoff motion becomes a clear static route/state change rather than continuous animation.

# 6. Data contracts — create exact, replaceable TypeScript types

Keep types in a deliberate shared module, such as `src/lib/types.ts`. Do not put them inline in UI components. Use exact names or a strongly equivalent structure with the same semantics.

```ts
type SimulationMode = 'simulation' | 'dry_run' | 'local_read_only' | 'live_gated' | 'destructive_gated';
type AgentStatus = 'idle' | 'queued' | 'working' | 'blocked' | 'needs_approval' | 'completed' | 'failed' | 'offline';
type QuestStatus = 'draft' | 'queued' | 'assigned' | 'running' | 'blocked' | 'needs_approval' | 'complete' | 'failed' | 'cancelled';
type TaskStatus = 'queued' | 'assigned' | 'running' | 'blocked' | 'needs_approval' | 'complete' | 'failed' | 'cancelled';
type RiskLevel = 'safe' | 'review' | 'external' | 'destructive';
type LabMaturity = 'draft' | 'simulated' | 'supervised' | 'training' | 'trusted' | 'autonomous_with_audit' | 'suspended';
type ApprovalStatus = 'pending' | 'approved' | 'denied' | 'expired';

type Position3D = { x: number; y: number; z: number };

type RoomType =
  | 'bridge'
  | 'war_room'
  | 'forge'
  | 'communications'
  | 'archives'
  | 'specialist_lab'
  | 'governance'
  | 'recreation'
  | 'support';

type Station = {
  id: string;
  name: string;
  roomName: string;
  type: RoomType;
  kind:
    | 'bridge'
    | 'articulation_console'
    | 'nova_room'
    | 'etsy_forge'
    | 'fiverr_forge'
    | 'print_on_demand_forge'
    | 'supplements_forge'
    | 'photo_restoration_forge'
    | 'affiliate_forge'
    | 'pixel_room'
    | 'vibes_room'
    | 'developer_room'
    | 'security_room'
    | 'communications_room'
    | 'governance_station'
    | 'archives'
    | 'feedback_console'
    | 'skill_armory'
    | 'treasury'
    | 'media_bay'
    | 'war_room'
    | 'ten_forward';
  description: string;
  level: number;
  levelLabel: string;
  position: Position3D;
  status: AgentStatus;
  maturity: LabMaturity;
  capabilitySummary: string;
  connectedRoomIds: string[];
  activeTaskIds: string[];
  blockedReason?: string;
};

type Agent = {
  id: string;
  name: 'Ultron' | 'Nova' | 'Forge' | 'Pixel' | 'Vibes' | 'Cipher' | 'Developer' | 'Security' | 'Governor';
  role: string;
  stationId: string; // room/station id where this agent currently belongs
  status: AgentStatus;
  position: Position3D;
  skills: Record<string, number>;
  permissions: string[];
  currentTaskId?: string;
  xp: number;
  level: number;
  reliability: number;
  maturity: LabMaturity;
  summary: string;
};

type Quest = {
  id: string;
  title: string;
  objective: string;
  status: QuestStatus;
  priority: 'low' | 'normal' | 'high';
  riskLevel: RiskLevel;
  mode: SimulationMode;
  acceptanceCriteria: string[];
  taskIds: string[];
  createdAt: string;
  updatedAt: string;
  source: 'articulation_console' | 'seeded_demo';
};

type Task = {
  id: string;
  questId: string;
  title: string;
  objective: string;
  status: TaskStatus;
  assignedAgentId?: string;
  stationId?: string; // room/station id where this task is currently located
  dependsOnTaskIds: string[];
  inputPacketIds: string[];
  outputPacketIds: string[];
  riskLevel: RiskLevel;
  acceptanceCriteria: string[];
  blockedReason?: string;
  sequence: number;
};

type EvidenceItem = {
  id: string;
  label: string;
  kind: 'mock_listing' | 'mock_store' | 'mock_trend' | 'mock_feedback' | 'policy_note';
  sourceLabel: string;
  observedSignal: string;
  capturedAt: string;
  isMock: true;
};

type OpportunityPacket = {
  id: string;
  kind: 'opportunity_packet';
  questId: string;
  producedByAgentId: string;
  sourcePlatform: 'Etsy';
  sourceStoreOrListing: string;
  evidenceIds: string[];
  observedSignals: string[];
  customerBuyerPattern: string;
  productConcept: string;
  visualStyleNotes: string;
  keywords: string[];
  pricingObservation: string;
  competitionNotes: string;
  adaptationAngle: string;
  riskFlags: Array<'ip_risk' | 'trademark_risk' | 'oversaturated_niche' | 'policy_risk' | 'insufficient_evidence'>;
  handoffTargetAgentId: string;
  recommendedNextAction: string;
  confidence: 'low' | 'medium' | 'high';
  isMock: true;
};

type ProductListingPacket = {
  id: string;
  kind: 'product_listing_packet';
  questId: string;
  producedByAgentId: string;
  opportunityPacketId: string;
  productTitleDraft: string;
  productDescriptionDraft: string;
  materialsOrFormat: string[];
  keywordDrafts: string[];
  priceRangeDraft: string;
  fulfillmentStatus: 'not_connected_simulation_only';
  publishStatus: 'not_published_simulation_only';
  openQuestions: string[];
  riskFlags: OpportunityPacket['riskFlags'];
  isMock: true;
};

type VisualCandidatePacket = {
  id: string;
  kind: 'visual_candidate_packet';
  questId: string;
  producedByAgentId: string;
  productListingPacketId: string;
  assetType: 'product_mockup' | 'thumbnail' | 'media_slide';
  conceptTitle: string;
  compositionNotes: string;
  altText: string;
  reviewChecklist: string[];
  renderStatus: 'mock_preview_only';
  isMock: true;
};

type InboundSignal = {
  id: string;
  source: 'mock_comment' | 'mock_customer_request' | 'mock_alert';
  summary: string;
  urgency: 'low' | 'normal' | 'high';
  suggestedRouteStationId: string;
  isMock: true;
};

type ApprovalRequest = {
  id: string;
  questId: string;
  taskId?: string;
  requestedByAgentId: string;
  riskLevel: Exclude<RiskLevel, 'safe'>;
  summary: string;
  proposedAction: string;
  alternatives: string[];
  evidencePacketIds: string[];
  status: ApprovalStatus;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy: 'human_operator' | null;
  decisionReason?: string;
};

type WorldEventType =
  | 'vision.submitted'
  | 'blueprint.proposed'
  | 'quest.created'
  | 'quest.decomposed'
  | 'agent.assigned'
  | 'agent.started'
  | 'agent.message.sent'
  | 'packet.created'
  | 'task.completed'
  | 'review.failed'
  | 'review.passed'
  | 'approval.requested'
  | 'approval.granted'
  | 'approval.denied'
  | 'quest.completed'
  | 'quest.failed'
  | 'simulation.paused'
  | 'simulation.reset';

type WorldEvent = {
  id: string;
  sequence: number;
  timestamp: string;
  type: WorldEventType;
  actorId?: string;
  targetAgentId?: string;
  stationId?: string; // room/station id where this task is currently located
  questId?: string;
  taskId?: string;
  packetId?: string;
  approvalRequestId?: string;
  summary: string;
  detail: string;
  payload: Record<string, unknown>;
  isMock: true;
};

type BlueprintProposal = {
  id: string;
  vision: string;
  assumptions: string[];
  proposedStations: string[];
  proposedAgents: string[];
  workflowSteps: Array<{ order: number; title: string; owner: string; rationale: string }>;
  risks: Array<{ level: RiskLevel; description: string; mitigation: string }>;
  approvalTriggers: string[];
  successMetrics: string[];
  openQuestions: string[];
  status: 'draft' | 'ready_for_simulation';
};

type WorldState = {
  mode: SimulationMode;
  stations: Station[];
  agents: Agent[];
  quests: Quest[];
  tasks: Task[];
  evidence: EvidenceItem[];
  packets: Array<OpportunityPacket | ProductListingPacket | VisualCandidatePacket>;
  inboundSignals: InboundSignal[];
  approvals: ApprovalRequest[];
  events: WorldEvent[];
  activeBlueprint?: BlueprintProposal;
  selectedEntity?: { type: 'station' | 'agent' | 'quest' | 'task' | 'packet' | 'event' | 'approval'; id: string };
  simulation: {
    status: 'ready' | 'running' | 'paused' | 'awaiting_approval' | 'completed' | 'failed' | 'stopped';
    activeQuestId?: string;
    nextSequence: number;
    replayCursor: number | null;
  };
};
```

## 6.1 Contract rules

- IDs must be stable, readable, and deterministic for the seeded demo. Example: `quest-nova-forge-001`, `task-research-001`, `packet-opportunity-001`.
- Use ISO-8601 timestamps or deterministic simulation timestamps consistently; do not mix formats.
- Events are append-only during a run. Do not mutate old event summaries to make the history look better.
- Do not make status changes without emitting an associated event.
- Every packet must reference its producing agent and source input.
- Every approval must name the proposed action, risk, alternatives, evidence, and final human decision.
- Every mock source/evidence object must declare `isMock: true`.
- Do not use `any` as a shortcut in TypeScript contracts.

# 7. Deterministic simulation behavior

## 7.1 Seeded articulation vision

Pre-fill the Articulation Console with this editable vision:

> Create a supervised Etsy-inspired product exploration lab that uses market evidence to propose an original product concept, produces a mock listing and visual candidate, routes it through governance, and never publishes or spends money without explicit human approval.

The console must make it obvious this is a starting example. Kenn can edit it before generating a blueprint.

## 7.2 Blueprint generation

`Generate Blueprint` must be deterministic. It must not call an AI service. The generated blueprint must include:
- clear goal
- stated assumptions
- selected rooms: The Bridge, War Room, Articulation Console, Nova Room, Etsy Forge, Pixel Room, Communications Room, Governance, Archives, Feedback, Treasury, Media Bay, Skill Armory, Ten Forward, Developer Room, Security Room, and Vibes Room
- selected agents: Ultron, Nova, Forge, Pixel, Governor; Cipher, Vibes, Developer, and Security as observed/standby agents where relevant
- sequential task decomposition
- dependencies
- explicit simulation-only constraint
- explicit external publishing/spending trigger requiring approval
- risk register
- success metrics based on completeness and review, not imagined sales
- open questions

Provide a visible rationale for each agent assignment. Example: `Nova selected because this task begins with structured mock demand evidence, not production.`

## 7.3 Default task plan

Generating the seeded blueprint must create, at minimum, this task sequence:

1. `Task 1 — Classify articulation vision` — Ultron / Steward
2. `Task 2 — Produce mock market opportunity packet` — Nova
3. `Task 3 — Draft mock product/listing packet` — Forge
4. `Task 4 — Draft mock visual/media candidate` — Pixel
5. `Task 5 — Governance quality and risk review` — Governor
6. `Task 6 — Human decision on simulated external-publish boundary` — Human operator
7. `Task 7 — Record outcome and feedback` — Ultron / Feedback Console

The app must keep dependency order. Advancing or auto-playing a deterministic simulation must not jump from Task 2 to Task 5 or complete a task whose dependency is incomplete.

## 7.4 Opportunity packet seed content

Nova’s mock packet must be concrete enough for inspection. Use invented-but-clearly-marked mock evidence; do not identify actual Etsy stores/listings or make factual market claims.

Seed packet qualities:
- source platform is `Etsy` but visibly labelled mock research
- evidence includes at least three mock signals, for example repeat interest in personalized seasonal garden markers, a gift-buying pattern, and a style motif
- product concept proposes an original adaptation, not copying a seller
- keywords, pricing observation, competition notes, adaptation angle, confidence, and risk flags are filled
- include at least one reviewable risk flag, such as `trademark_risk` or `oversaturated_niche`
- handoff target is Forge

## 7.5 Forge packet seed content

Forge’s output must include:
- a mock product title draft
- concise mock description draft
- materials/format notes
- keyword drafts
- mock price-range draft
- `not_connected_simulation_only` fulfillment state
- `not_published_simulation_only` publish state
- open questions
- inherited risk flags

Forge must not report a completed external listing. The visual station should show this packet has moved only into a simulated design-review path.

## 7.6 Pixel packet seed content

Pixel’s output must include:
- a mock product mockup, thumbnail, or media-slide concept
- composition notes
- alt text
- a review checklist
- `mock_preview_only` render status

If you include a visual thumbnail, generate it from simple local CSS/SVG/HTML composition or a local placeholder design; do not call a real image model/service. The image/preview must carry a `Mock visual candidate` label.

## 7.7 Governance and approval behavior

Governance must review the Forge and Pixel packets against visible acceptance criteria. It should pass craft/readability checks but pause the simulation for a human decision because publication/fulfillment would be an external action.

The approval request must say something like:
- Proposed action: `Advance mock candidate to a future live-publishing adapter (not available in Phase 1).`
- Current result: `No external action will occur in this prototype.`
- Risk: `external`
- Alternatives: `Keep in supervised review`, `Return to Forge for revision`, `Deny and archive`

The approval modal/panel must explain that Approve means only “approve the simulated workflow outcome/next design state”; it must not publish anything.

### Approve path

On approval:
1. Append `approval.granted`.
2. Mark the approval resolved by `human_operator`.
3. Complete Task 6 and Task 7.
4. Mark quest `complete`.
5. Add feedback that the prototype’s simulated artifact is accepted for archive/training feedback.
6. Keep Media Bay explicitly blocked from real delivery: `No live publishing adapter connected.`

### Deny path

On denial:
1. Append `approval.denied`.
2. Mark the approval resolved by `human_operator`.
3. Mark Task 6 and quest as `blocked` or `failed` according to the explicit UI decision; prefer `blocked` if a revision path exists.
4. Create an event and feedback item naming the reason.
5. Offer clear controls to reset, replay, or return the packet to Forge in simulation.
6. Never silently advance to completion.

## 7.8 Advance, pause, stop, and reset semantics

- `Advance One Step` performs only the next legal transition and adds the corresponding event(s).
- `Start Simulation` may auto-progress on a controlled timer, but must pause at human approval and must be stoppable.
- `Pause / Stop Simulation` must leave a visible `paused` or `stopped` state with an event. It must not discard history.
- `Reset World` restores the deterministic seed state after confirmation, clears the active run’s derived records, and adds/retains a visible reset event in the new run context.
- No simulation action may mutate state after it is stopped or while it waits for approval.

# 8. Event, audit, and replay contract

## 8.1 Event timeline

Build an event timeline that shows, at minimum:
- sequence number
- timestamp
- type
- actor
- related station
- quest/task/packet/approval reference
- concise human-readable summary
- expandable detail/payload view

Examples:
- `#03 Nova started mock market-evidence review in Nova Room.`
- `#05 Nova created opportunity packet packet-opportunity-001 and handed it to Forge.`
- `#10 Governor requested human approval because the next conceptual boundary is external publishing.`
- `#11 Human operator approved the simulated workflow outcome. No external action occurred.`

Do not expose private chain-of-thought. This is an operational audit log, not a hidden-reasoning dump. Show concise routing rationale, structured inputs/outputs, and explicit state transitions.

## 8.2 Replay

Replay must use the event log and deterministic state snapshots/reduction logic. It must not re-run random generation or append duplicate records while replaying.

Required replay behavior:
- enter replay at event 0 / initial world state
- move one event backward/forward
- play through events at an observable pace
- show current replay cursor `Event X of Y`
- visually highlight the affected station/route/agent for the selected replay event
- show the corresponding inspector/event details
- exit replay back to the current simulation state without data loss

A replay is successful only if it explains what happened while the operator was away. It cannot be a decorative animation detached from event data.

# 9. State store and mock API boundary

Create an explicit store, for example `src/store/worldStore.ts`, with actions whose names make future backend replacement straightforward.

Minimum actions:

```ts
initializeWorld(): void;
setSelectedEntity(entity?: WorldState['selectedEntity']): void;
updateArticulationVision(vision: string): void;
generateBlueprint(): void;
createQuestFromBlueprint(): void;
startSimulation(): void;
advanceSimulation(): void;
pauseSimulation(): void;
stopSimulation(): void;
requestApproval(request: ApprovalRequest): void;
approveRequest(requestId: string, reason?: string): void;
denyRequest(requestId: string, reason: string): void;
returnTaskForRevision(taskId: string, reason: string): void;
resetWorld(): void;
enterReplay(): void;
setReplayCursor(sequence: number): void;
exitReplay(): void;
```

Create a small mock API/service module that the store calls, even if it simply returns seeded data and deterministic transitions. Future implementations should be able to replace it with HTTP/SSE/WebSocket adapters without rewriting scene components.

Do not let visual components directly manufacture tasks, packets, approvals, or events. Rendering components read state and invoke store actions only.

# 10. Lab maturity, feedback, skills, and health

## 10.1 Lab maturity

Display and explain these maturity states:
- `draft` — design/spec only
- `simulated` — mock inputs/outputs; no real actions
- `supervised` — future real work would require review
- `training` — feedback is being collected
- `trusted` — future bounded work could be eligible with audit
- `autonomous_with_audit` — future-only; never enabled in Phase 1
- `suspended` — paused for quality, safety, cost, or platform risk

In the Phase 1 seeded scenario, operational labs should be `simulated` or `supervised`; no lab may be `autonomous_with_audit` in a way that suggests it can act.

## 10.2 Feedback Console

Show a concise feedback record after approve/deny:
- target packet or task
- verdict: approve/reject/revise
- human reason
- lesson/quality signal
- resulting maturity implication
- linked event ID

Feedback changes only mock state. It does not claim to train a model.

## 10.3 Skill Armory

Render a small mock skill inventory with at least three skill records. Each record needs:
- name
- capability summary
- provenance: `local mock`, `reviewed mock`, or `quarantined mock`
- permission scope
- inspection status
- approval status

The UI must explicitly say that no skills can be downloaded or installed in Phase 1.

## 10.4 Treasury and War Room

Treasury must show only values derived from mock state. Include:
- `Simulation cost: $0.00`
- `Live spend: not connected`
- visible future integration placeholder, disabled

War Room must calculate its health from the actual current state, including:
- active/blocked/complete quest counts
- pending approvals
- failed/revised task count
- station maturity distribution
- unreviewed packet count
- a concise recommendation based on those state values

# 11. Failure modes to design and test explicitly

Design for these failures. Do not hide them behind optimistic animation.

1. **No blueprint exists**
   - Start Simulation is disabled and explains that a blueprint must be generated first.

2. **Empty or too-short vision**
   - The articulation console validates it with a humane message and offers the seeded example.

3. **Dependency violation**
   - A task cannot advance before prerequisites complete. The inspector names the dependency.

4. **Missing packet input**
   - Forge/Pixel/Governance shows a blocked state and records an event explaining which packet is missing.

5. **Pending approval**
   - Simulation must pause. No timer, replay, or UI shortcut can silently complete the quest past the gate.

6. **Approval denial**
   - The quest visibly blocks/fails according to the selected path, records reason, and offers reset/revise controls.

7. **Stopped simulation**
   - No scheduled timeout may continue processing after stop.

8. **Replay isolation**
   - Replay must not append duplicate events, mutate current state, or generate a new mock packet.

9. **Visual-state drift**
   - A station/agent’s room color, glow, activity route, and inspector status must derive from one source of truth.

10. **Mobile/narrow-screen overflow**
    - No primary command, approval action, or inspector content may be hidden by horizontal overflow.

11. **Reduced motion**
    - Handoffs remain understandable with animation reduced or disabled.

12. **External-action confusion**
    - At every approval and output surface, make it clear that Phase 1 does not publish, spend, communicate, or deliver externally.

13. **Fake success**
    - Never report a mock packet as a sold product, published listing, delivered customer asset, or live agent result.

# 12. Suggested component/module boundaries

Adapt paths to the repository’s actual structure, but preserve separation of responsibility. A healthy implementation should look roughly like:

```text
src/
  app/
    AppShell.tsx
  components/
    WorldScene.tsx
    StationModule.tsx
    AgentAvatar.tsx
    RouteOverlay.tsx
    QuestBoard.tsx
    ArticulationConsole.tsx
    BlueprintInspector.tsx
    StationInspector.tsx
    RoomProfileCard.tsx
    ArchivesGraphView.tsx
    AgentInspector.tsx
    PacketInspector.tsx
    ApprovalGate.tsx
    EventTimeline.tsx
    ReplayControls.tsx
    WorldHealthPanel.tsx
    SkillArmoryPanel.tsx
    TreasuryPanel.tsx
    WarRoomPanel.tsx
    TenForwardPanel.tsx
    CommunicationsRoomPanel.tsx
  lib/
    types.ts
    mockWorld.ts
    simulationEngine.ts
    mockApi.ts
    selectors.ts
  store/
    worldStore.ts
  styles/
    ...
  tests/
    simulationEngine.test.ts
    worldStore.test.ts
```

Do not create all components merely to satisfy the directory sketch. Keep units focused and avoid duplicated business rules.

# 12.5 Self-building first-run commissioning system

Agentarium should become a **self-building application** in a controlled, configuration-driven sense. On first startup it interviews the installer, produces a reviewable ship blueprint, spawns bounded builder jobs, assembles art and agent manifests, and then presents the commissioned application.

Do **not** implement uncontrolled self-modifying source code. The builder may generate configuration, manifests, art assets, room topology, hotspot maps, agent definitions, workflow definitions, and local project data. It must not silently rewrite the core runtime, install arbitrary packages, fetch skills, expose secrets, spend money, or call external services without a visible approval step.

## 12.5.1 First-run detection and resumability

Persist a versioned local commissioning record. On launch:

```text
no commissioning record -> show First-Run Commissioning
incomplete record        -> offer Resume, Restart, or Inspect Draft
complete record          -> load the commissioned ship
schema version mismatch  -> run a reversible migration or show a clear recovery path
```

The flow must be resumable after refresh/crash. Answers should save after each completed section. Restart must require confirmation and must preserve an exportable backup of the previous draft.

Suggested contract:

```ts
type CommissioningStatus =
  | 'not_started'
  | 'interviewing'
  | 'awaiting_blueprint_approval'
  | 'building'
  | 'awaiting_final_review'
  | 'complete'
  | 'failed'

interface CommissioningSpec {
  schemaVersion: number
  status: CommissioningStatus
  owner: OwnerAnswers
  theme: ThemeAnswers
  agents: AgentDefinition[]
  businesses: BusinessDefinition[]
  rooms: RoomProfile[]
  governance: GovernanceAnswers
  integrations: IntegrationIntent[]
  buildPlan: BuildPlan | null
  buildJobs: BuildJob[]
  generatedAssets: GeneratedAsset[]
  createdAt: string
  updatedAt: string
}
```

## 12.5.2 Animated installer guide

The first screen should not be a conventional setup wizard card. A small animated pixel-art **Builder Agent** appears inside an unfinished/dim ship construction bay. Use a functional internal name such as `CommissioningGuide`; the displayed character name may be selected later.

Behavior:

- The agent enters the scene, notices the installer, and opens a chat bubble over its head.
- Questions appear conversationally, one decision-sized prompt at a time.
- A compact transcript/history remains available so the installer can revise earlier answers.
- Keyboard, mouse, and touch controls all work.
- `prefers-reduced-motion` replaces entrance/build animations with immediate state changes.
- The guide explains why sensitive questions are needed and never asks the installer to paste raw secrets into an ordinary chat bubble.
- Provider credentials, if enabled in a future live mode, use dedicated masked credential fields and secure storage adapters; they are never written into generated prompts, logs, screenshots, or repo files.

The guide is warm, competent, and lightly personable. It must not be childish, obsequious, or verbose.

## 12.5.3 Interview sequence

The interview is adaptive, but it must cover these sections and produce structured answers.

### Q1 — Theme and world questions

Begin with a **visual world-template chooser**, not an open-ended design questionnaire. The Builder Agent should say something close to: “First, what kind of world should your Agentarium live in?” Present large illustrated choice cards with a short description and a small topology preview.

Required starting choices:

1. **Space Station** — orbital hub, rings/spokes, docking structures, connected laboratory modules.
2. **Spaceship** — a vessel traveling through space, longitudinal decks, corridors, engineering sections, and The Bridge. This is the recommended/default Agentarium template and matches the bundled concept art.
3. **Cruise Ship** — ocean-going decks, bridge, atrium, cabins, entertainment areas, service corridors, and engine spaces.
4. **Underground Bunker** — subterranean levels, tunnels, hardened doors, command center, utilities, and secure specialist chambers.
5. **Skyscraper** — stacked floors, elevators, executive command level, departments, mechanical floors, and a city view.
6. **Resort** — a campus of connected buildings, paths, villas, studios, operations lodge, recreation, and landscaped shared areas.
7. **Sky Ship** — a large flying vessel above the clouds, decks, engine/balloon or anti-gravity systems, helm, observation spaces, and aerial docks.
8. **Battleship** — armored ocean vessel, bridge, combat information center, deck machinery, engineering, communications, and compartmentalized operations.
9. **Custom Theme** — the installer describes any original setting, structure, geography, and naming language.

Do not treat these as color skins over the same spaceship. A selected template must drive:

- world silhouette and map geometry
- vertical vs horizontal organization
- room adjacency and travel routes
- corridor, elevator, tunnel, path, deck, or docking metaphors
- command-room terminology and other world-facing labels
- exterior environment, windows/views, materials, machinery, lighting, and ambient effects
- the whole-world image prompt and every room-image prompt

Preserve stable functional IDs and operational contracts underneath the theme. For example, the top-level command role can remain `command_room` internally while the displayed room may be **The Bridge**, **Command Center**, **Executive Command Floor**, **Operations Lodge**, or a custom name. Forges remain revenue-producing operational units even if the selected theme presents them as factories, workshops, studios, kitchens, dry docks, or other setting-appropriate spaces.

After the installer chooses a template:

1. Show a concise preview of its proposed geography and terminology.
2. Let the installer accept it, adjust it, or return to the template gallery.
3. If `Custom Theme` is selected, ask for the setting, exterior/world context, layout logic, central command area, movement system, materials, mood, and any must-have landmarks. Summarize the interpretation for confirmation before proceeding.
4. Ask for the world/vessel/property name.
5. Then ask the remaining visual questions:
   - pixel-art era/default fidelity (`SNES-inspired 16-bit` is the recommended default)
   - palette and mood
   - desired rooms and any custom rooms
   - whether the installer prefers cozy, industrial, military-clean, scientific, whimsical, luxurious, natural, or mixed interiors
   - avatar style and the owner's usual command-room location
   - motion level, sound preference, accessibility needs, contrast, color-blind support, and reduced-motion preference
   - whether to use bundled art, generate new art, or start with placeholders and regenerate room-by-room later

The bundled art is the **Spaceship** starter set. Other templates must not silently reuse spaceship art as if it matched. If remote image generation is not configured/approved, use clearly labelled local placeholder scenes and retain the complete generated prompts for later rendering.

Suggested contract:

```ts
type WorldTemplateId =
  | 'space_station'
  | 'spaceship'
  | 'cruise_ship'
  | 'underground_bunker'
  | 'skyscraper'
  | 'resort'
  | 'sky_ship'
  | 'battleship'
  | 'custom'

interface WorldThemeAnswers {
  templateId: WorldTemplateId
  customThemeDescription?: string
  worldName: string
  commandRoomDisplayName: string
  movementMetaphor: 'corridors' | 'decks' | 'elevators' | 'tunnels' | 'paths' | 'custom'
  layoutPreference: string
  pixelEra: string
  palette: string[]
  mood: string[]
  roomIds: string[]
  artSource: 'bundled' | 'generate' | 'placeholders_then_generate'
  accessibility: {
    reducedMotion: boolean
    highContrast: boolean
    colorBlindMode?: string
  }
}
```

Ask enough to define a coherent visual system, but do not make the user design architecture from a blank page. The template gallery supplies strong defaults; the interview asks only the decisions that materially personalize them.

- world/vessel/property name
- selected world template and confirmed topology
- pixel-art era/default fidelity (`SNES-inspired 16-bit` is the recommended default)
- palette and mood
- silhouette/geography preference appropriate to the selected template
- desired rooms and any custom rooms
- whether the installer prefers cozy, industrial, military-clean, scientific, whimsical, luxurious, natural, or mixed interiors
- avatar style and where the owner usually appears in the selected template's command area
- motion level, sound preference, accessibility needs, contrast, color-blind support, and reduced-motion preference
- whether to use matching bundled art when available, generate new art, or use labelled placeholders and regenerate room-by-room later

Do not ask for dozens of low-value cosmetic choices up front. Offer strong defaults and allow later editing.

### Q2 — Agent questions

For each agent ask or infer, then confirm:

- name and visual identity
- purpose and responsibilities
- primary room
- provider
- preferred model and optional fallback model
- tools/capabilities
- permissions and prohibited actions
- memory scope
- autonomy level: simulated, supervised, trusted, or bounded autonomous
- approval triggers
- expected inputs and outputs
- subagents, if any
- idle behavior and whether the agent may visit Ten Forward
- cost/budget constraints
- success measures

Always include an owner/steward relationship. Ultron is the default Bridge steward, but the installer may rename the character without changing the steward role contract.

### Q3 — Business and Forge questions

For every proposed business ask:

- business purpose and customer
- whether it produces a sellable product/service (therefore a Forge) or only communicates/supports
- inputs, outputs, and delivery destination
- production agents and QA/review agents
- research/evidence source intent
- approval points
- external integrations desired later
- revenue/cost metrics the user wants to see
- compliance, IP, privacy, safety, and brand risks
- current maturity: idea, simulated, supervised, trusted, or live

Never infer that a Communications Room is a Forge. A Forge manufactures a sellable output or revenue-producing service; Communications routes messages/signals.

### Q4 — Operations, governance, and installation questions

Ask the remaining questions needed to build safely:

- local-only, LAN, or future hosted deployment intent
- single owner or future multi-user intent
- data sensitivity and retention
- local storage/backup/export preferences
- audit/replay requirements
- approval policy for external actions
- budget/spend limits
- credential-storage preference (without requesting credentials in chat)
- desired integrations and whether each is mock, read-only, or future write-capable
- notification channels
- failure/retry behavior
- maintenance window and update policy
- telemetry/privacy choice
- whether generated art and agent configurations require review individually or as a batch

At the end, show an **Assumptions and Open Questions** page. Do not hide inferred defaults.

## 12.5.4 Blueprint approval before building

The interview output must become an inspectable `BuildPlan` before any background builder starts. Show:

- ship name, theme, palette, and cross-section topology
- room list with `Room Name`, `Type`, `Description`, and `Level`
- spatial adjacency map
- agent roster with provider/model intent and permission boundaries
- Forge/business definitions
- workflow routes and approval gates
- art asset list
- estimated external calls/cost if live generation is enabled
- assumptions, unresolved questions, warnings, and non-goals

Controls:

```text
Revise answers
Approve local/simulated build
Approve selected paid generation jobs (future live mode only)
Export commissioning spec
Cancel safely
```

No builder job may move from `planned` to `running` until the relevant scope is approved.

## 12.5.5 Builder animation and truthful progress

After approval, transition to a ship-construction presentation. Show the guide agent at a console while small background builder agents spawn for bounded jobs.

Example builder roles:

- `TopologyBuilder` — creates ship geography and hotspot map
- `ArtDirector` — enforces the shared visual style
- `ShipArtist` — generates/selects the whole-ship cross-section background
- `RoomArtist` — generates/selects each room background
- `AgentArchitect` — writes agent manifests
- `WorkflowArchitect` — writes routes, approvals, and Forge workflows
- `SafetyInspector` — verifies permissions and external-action gates
- `AssemblyAgent` — assembles the commissioned configuration
- `QAAgent` — verifies asset coverage, navigation, and schema validity

The builder animation can combine pixel-art construction activity with an optional ASCII build console. It must be truthful: every visible worker maps to a real `BuildJob`; progress reflects completed steps, not a fake timer.

Example ASCII mode:

```text
        .-=================-.
       /   AGENTARIUM OS     \
      |  COMMISSIONING SHIP  |
       \_____.--------._____/
             | BUILD |

[01/08] TopologyBuilder   COMPLETE
[02/08] ArtDirector      COMPLETE
[03/08] ShipArtist       RUNNING
[04/08] RoomArtists      7/22
[05/08] AgentArchitect   QUEUED
[06/08] WorkflowBuilder  QUEUED
[07/08] SafetyInspector  QUEUED
[08/08] Assembly + QA    QUEUED
```

The user may pause, inspect, retry a failed job, replace one generated asset, or cancel. Completed successful jobs must not rerun unnecessarily.

## 12.5.6 Art-generation pipeline

Art generation is a first-class commissioning phase, not an afterthought.

Repository sources of truth:

- `docs/art/IMAGE_PROMPTS.md` — human-readable detailed prompts
- `docs/art/image-prompt-manifest.json` — machine-readable prompt/asset manifest
- `docs/art/CONCEPT_ART_ASSET_INDEX.md` — generated asset index
- `assets/concept-art/ship/ship-overview-cross-section.png` — bundled whole-ship background
- `assets/concept-art/rooms/*.png` — bundled room background plates

Generation order:

1. Build the room roster and adjacency/topology graph.
2. Create a shared art-direction/style bible from the theme answers.
3. Generate or select the geographically coherent whole-ship cross-section first.
4. Generate/select room backgrounds using the same palette, pixel scale, lighting language, hull materials, camera language, and room geography.
5. Validate that every room ID has exactly one background plate or an explicit placeholder.
6. Create normalized transparent hotspot polygons over the whole-ship image.
7. Create room-local sprite anchor points and interaction zones.
8. Present a contact sheet/gallery for review.
9. Allow per-room regenerate, replace, approve, or defer.
10. Save provenance for every generated/imported asset.

The whole-ship image is the navigational map. The room images are the Room View backgrounds. Generated labels inside images are never authoritative; real room names and controls must be accessible DOM/UI overlays.

Suggested asset contract:

```ts
interface GeneratedAsset {
  id: string
  kind: 'ship_background' | 'room_background' | 'agent_sprite' | 'effect_layer'
  ownerId?: string
  source: 'bundled' | 'generated' | 'uploaded' | 'placeholder'
  promptId?: string
  provider?: string
  model?: string
  seed?: string
  path: string
  width: number
  height: number
  status: 'planned' | 'running' | 'needs_review' | 'approved' | 'rejected' | 'failed'
  createdAt: string
  approvalEventId?: string
}

interface Hotspot {
  id: string
  targetType: 'room' | 'agent' | 'tool'
  targetId: string
  polygon: Array<{ x: number; y: number }> // normalized 0..1
  label: string
  enabled: boolean
}
```

For the approved local prototype, the builder must work without external image generation by using the bundled concept-art assets. A future live image provider is optional and adapter-based. Before any paid/remote generation, show provider/model, image count, estimated cost if available, output destination, and an explicit approval action.

Art consistency checks:

- same ship/hull language across rooms
- coherent pixel-art era and palette
- no franchise logos or copied visual identity
- no unreadable generated text used as UI
- room purpose visually legible
- critical controls not baked only into raster art
- sufficient quiet space for sprites and overlays
- usable crop at desktop and narrow viewport
- room geography matches the ship overview well enough for navigation continuity

## 12.5.7 Agent and workflow generation

`AgentArchitect` produces declarative manifests, not executable arbitrary code. Each generated agent must have:

- stable ID, name, role, room, level, and visual asset reference
- provider/model intent (or `unconfigured`)
- allowed tools and denied actions
- memory scope
- autonomy/maturity level
- inputs, outputs, and handoff targets
- approval triggers
- budget/cost policy
- fallback/error behavior

The builder may generate simulation adapters and mock packets. It may not activate real providers, tools, skills, credentials, or external writes merely because the interview named them.

## 12.5.8 Final assembly and presentation

When all required jobs pass QA:

1. Fade from the construction bay to the completed whole-ship cross-section.
2. Bring the guide agent onto The Bridge.
3. Present a concise commissioning report: rooms built, agents configured, bundled/generated assets, simulated vs connected capabilities, unresolved items, and safety gates.
4. Offer a guided first tour: Bridge → one room → one agent → Archives → approval gate.
5. Mark commissioning `complete` only after the final application loads and navigation smoke checks pass.
6. Preserve a `Recommission` control in Settings for later theme/room/agent changes without erasing history.

## 12.5.9 Failure and recovery behavior

- One failed room image must not destroy the whole build; use a clear placeholder and allow retry.
- A failed provider call must preserve answers and completed assets.
- The same build job must be idempotent or use a unique attempt ID.
- Cancellation stops queued work and lets an in-flight safe job finish or abort cleanly.
- A build log records job input summary, result, error, attempt count, and timestamps without secrets.
- The user can export/import the versioned `CommissioningSpec`.
- Recommissioning creates a draft revision and does not replace the current working ship until approved.

## 12.5.10 Commissioning acceptance criteria

The self-building flow is complete only if all are true:

1. A fresh install launches the animated commissioning guide instead of an empty dashboard.
2. Theme, world-template, agent, business/Forge, and governance questions produce a valid versioned `CommissioningSpec`.
3. The world-template chooser includes Space Station, Spaceship, Cruise Ship, Underground Bunker, Skyscraper, Resort, Sky Ship, Battleship, and Custom Theme; the selected template changes topology, terminology, movement, and art prompts rather than acting as a color skin.
4. The installer can revise answers before build approval.
5. Background builder characters correspond one-to-one with inspectable `BuildJob` records.
6. The local/offline Spaceship path assembles a ship using bundled art without any external call; other unrendered templates use honest placeholders rather than mismatched spaceship art.
7. The art pipeline covers one whole-world background and every selected room background.
8. Whole-world hotspots open the correct room views.
9. Generated agent manifests preserve provider/model intent without claiming credentials are configured.
10. Refresh/crash resumes the commissioning flow without losing completed answers/jobs.
11. The build can pause, cancel, retry failed jobs, and replace one room asset without rebuilding everything.
12. Final QA runs before status changes to `complete`.
13. The completed world is presented with a clear report of simulated, configured, and still-unconfigured capabilities.
14. No secret appears in chat history, prompts, logs, generated files, or screenshots.
15. Paid/remote generation and external integrations remain explicitly approval-gated.

# 13. Acceptance criteria and verification

Do not claim completion until all verification steps below have actually been run against the built artifact.

## 13.1 Functional acceptance criteria

The prototype is complete only if all are true:

1. The app runs locally with documented commands.
2. The initial view uses the full viewport and clearly reads as an operational space station, not a boxed dashboard.
3. All required rooms are visible either on the world map or as immediately reachable sector/inspector items; all are selectable and explain their phase-one state.
4. The Bridge, War Room, Articulation Console, Nova Room, Forge rooms, Pixel Room, Vibes Room, Developer Room, Security Room, Communications Room, Governance, Archives, Feedback, Skill Armory, Treasury, Media Bay, and Ten Forward have distinct roles and inspector/profile details.
5. The user can edit the seeded vision and deterministically generate a blueprint.
6. The blueprint contains task decomposition, agent rationale, risks, approvals, metrics, assumptions, and open questions.
7. The user can start the seeded simulation and see the workflow move through Ultron on The Bridge → Nova → Etsy Forge → Pixel → Governance.
8. Nova creates a structured mock Opportunity Packet with mock evidence, adaptation angle, keywords, confidence, and risk flags.
9. Forge creates a structured mock Product Listing Packet with explicit not-published/not-connected states.
10. Pixel creates a structured Mock Visual Candidate Packet without contacting an image-generation service.
11. Governance creates a real in-app simulated approval request with evidence, alternatives, and external-risk explanation.
12. The simulation pauses at the approval gate and cannot advance beyond it without an explicit user action.
13. Approve completes the simulated quest and records feedback without performing external work.
14. Deny produces an inspectable blocked/revision outcome and does not silently complete the quest.
15. Every transition creates an inspectable event, and every visible animation/state maps back to an event/state record.
16. Replay steps through recorded deterministic events without adding duplicates or altering the current run.
17. Reset restores the known seed state.
18. The application labels mock/simulated content honestly and does not contain fake live revenue/orders/publishing claims.
19. Primary controls work with keyboard navigation; `prefers-reduced-motion` remains legible.
20. Layout is verified at desktop and narrow viewport widths with no inaccessible primary control or horizontal overflow.
21. A fresh-install state opens the commissioning guide and can complete the offline/bundled-art commissioning path.
22. The resulting ship uses the whole-ship background plus clickable room hotspots and room-specific image backgrounds.
23. Commissioning answers, build jobs, and final asset/agent manifests are inspectable and resumable.

## 13.2 Minimum automated tests

Add focused tests around state/simulation logic. At minimum prove:

1. Blueprint generation creates the expected ordered task chain.
2. The simulation cannot advance Forge before Nova’s opportunity packet exists.
3. The simulation reaches `awaiting_approval` after Governance review.
4. Approving resolves the request and completes the simulated quest without any external adapter invocation.
5. Denying does not complete the quest and creates a blocked/revision event.
6. Replay does not change event count or append duplicate events.
7. Reset returns to the deterministic baseline.
8. Every seeded station and agent uses valid enum/status values.
9. Commissioning interview answers validate into a versioned `CommissioningSpec`.
10. Builder jobs resume idempotently and do not duplicate approved assets.
11. Every selected room has a background asset or explicit placeholder and a valid hotspot target.
12. Offline commissioning performs zero external provider calls.

If the selected stack has a standard test runner, use it. Also run the project build/type-check/lint command appropriate to the chosen stack.

## 13.3 Manual smoke script

Include a short documented manual smoke procedure:

```text
1. Start the app and confirm the full viewport world loads.
2. Select Nova and confirm the inspector shows simulated market-intelligence responsibility.
3. Edit the seeded vision slightly and generate a blueprint.
4. Inspect the plan, risks, selected agents, and approval trigger.
5. Start simulation; observe Steward → Nova → Forge → Pixel → Governance handoffs.
6. Open Nova’s packet and confirm every evidence item is marked mock.
7. Open Forge’s packet and confirm publish/fulfillment are simulation-only.
8. Wait for the approval gate; verify the simulation is paused.
9. Approve; confirm the quest completes and Media Bay remains externally blocked.
10. Reset, run again, deny approval, and verify the quest does not complete.
11. Enter replay; step through all events; exit replay and confirm current state remains intact.
12. Repeat at narrow width and with reduced motion enabled.
13. Clear commissioning state; reload and verify the animated guide appears.
14. Complete the interview using bundled art, approve the build plan, and verify each visible builder maps to a real build job.
15. Refresh mid-build; resume without losing answers or rerunning completed jobs.
16. Finish assembly; verify the ship opens, a room hotspot opens its matching room image, and the commissioning report is accurate.
```

## 13.4 Completion report

When finished, report:
- local run command and URL
- files created/changed
- verification commands actually run and their results
- concise list of assumptions
- exact list of intentionally simulated/not-connected boundaries
- any acceptance criterion not met, with a direct reason

Never report a feature as working based solely on reading the code. Verify the running prototype.

# 14. Definition of done

Phase 1 is done when Agentarium is a polished, honest, local, full-viewport operational simulation that can commission itself from a first-run interview: collect a versioned configuration, show an approved build plan, assemble bundled ship/room art and declarative agent/workflow manifests through inspectable builder jobs, present the completed ship, and then let Kenn articulate a vision, inspect a deterministic plan, watch the Ultron → Nova → Etsy Forge → Pixel → Governance workflow, make the human approval decision, inspect the audit trail, and replay what happened.

The visual world, state model, event log, and inspectors must agree. The prototype should make the future direction feel real without pretending that live agents, marketplace accounts, publishing, money, credentials, or autonomous external actions already exist.

Do not begin Phase 2 integrations unless Kenn explicitly asks for them after reviewing this prototype. The completed Phase 1 prompt/prototype must preserve The Bridge, room profiles, Forges, Communications Room, Archives, Ten Forward, and specialist-room model.
```

## Review checklist for Kenn

- [ ] The product reads as a spatial AI operations canvas, not a social simulation or static dashboard.
- [ ] The prompt contains a hard approval gate before implementation.
- [ ] Phase 1 is strict about simulation-only behavior and no external side effects.
- [ ] The named rooms and agents match the intended Agentarium system, including The Bridge, War Room, Forges, Communications Room, Archives, Ten Forward, Pixel, Vibes, Nova, Developer, and Security.
- [ ] Nova is defined as a structured market-intelligence engine, not vague generic research.
- [ ] Forge/Pixel/Cipher/Governance behavior is concrete and inspectable.
- [ ] Data, event, state, approval, replay, and lab-maturity contracts are clear enough to implement.
- [ ] Verification covers simulation flow, approval/denial, replay, responsiveness, and failure modes.
- [ ] First-run commissioning covers theme, agents/providers/models, businesses/Forges, governance, art generation/selection, background builder jobs, resumability, and final presentation.
- [ ] Art generation follows the prompt manifest and produces a whole-ship map plus one background plate per selected room before animation is layered on.
- [ ] The builder can hand this to v0, OpenCode, Codex, or Claude after approval without needing unstated context.


## Post-Phase-2 feedback addendum

Kenn approved the prompt and Phase 2 produced a working first pass. After seeing it, Kenn clarified the intended visual/product direction:

- The prototype is a useful start, but the target should be much closer to the generated Agentarium concept image.
- Agentarium should feel like an animated pixel-art / video-game interactive experience, not a flat dashboard with a map.
- The default view should be a **Ship Overview**: a view of the entire spaceship where all rooms are visible.
- Rooms should look like pixel-art image/diorama interiors with ambient animation that makes it look like AIs are moving around and doing things.
- Double-clicking a room should open a **Room View** with the details of what is happening in that room.
- A room may contain several subagents, one hard-working agent, or an idle/sleeping agent.
- Double-clicking an agent should open an **Agent View** with that agent's profile/character sheet and controls for modifying that agent's future functionality.
- The state/event/approval/audit model remains valuable and should be preserved under the richer game-like UI.

For the next worker: treat this addendum as higher priority than any earlier wording that could be interpreted as accepting a normal dashboard-style implementation.
