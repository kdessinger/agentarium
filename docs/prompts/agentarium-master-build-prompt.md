# Agentarium — Master Build Prompt (Living Product Contract)

> Status: the Ultron-first browser commissioning lane is implemented and verified; the broader operational runtime and product lifecycle are not. This prompt remains the build contract, while `docs/DECISIONS.md`, `docs/PRODUCT_CLAIMS.md`, and `qa/STATUS.md` govern current authority and proof verdicts.
>
> **Remaining hard gate:** Local onboarding, bundled-art assembly, reversible configuration, and local application development are approved. Credentials, paid model/image calls, external integrations, publishing, spending, deployment, destructive actions, and expanded autonomy require the explicit commissioned setup/approval policy.
>
> **Normative boundary:** Sections 0-14 are the current build contract. Dated post-phase addenda preserve implementation history and lessons; they do not independently upgrade product claims or completion gates. If wording conflicts, `docs/DECISIONS.md`, `docs/PRODUCT_CLAIMS.md`, and `qa/STATUS.md` win.

## Copy from here into the selected builder after approval

```text
You are building Phase 1 of Agentarium. Treat this specification as a contract. Do not substitute a smaller generic dashboard, a chat UI, a social-simulation town, a static image, or an implementation with real autonomous side effects.

# 0. Authority, objective, and operating rules

## 0.1 Authority

Kenn is the owner and final authority. The Steward proposes and routes. Configured agents may perform real work only within their granted tools, credentials, budgets, approval policy, and audit boundaries. The user approves or denies every gated decision.

If a requirement is unclear, preserve safety and choose the smallest reversible action. Surface assumptions in the activity log or implementation notes. Never invent integrations, credentials, evidence, business results, revenue, marketplace data, messages, orders, or successful work.

## 0.2 Build objective

Build a serious, browser-runnable **Agentarium application**: a self-commissioning spatial AI operations system represented as a themed world of connected rooms/labs. The bundled starter world is a pixel-art-inspired spaceship, but visual style and world theme are independently commissioned.

After commissioning, Standard mode operates only on configured real data and real agent/tool results:

1. The owner enters a vision in the Articulation Console.
2. The Steward creates an inspectable blueprint, task plan, handoff chain, risk classification, and proposed room/agent use.
3. The owner approves the plan and launches the permitted workflow.
4. Agents use only configured providers, tools, data sources, and integrations.
5. Missing configuration produces an honest `Unconfigured`, `Unavailable`, or `No data yet` state—not invented fallback content.
6. Governance pauses at defined human approval gates.
7. Every action, result, failure, and handoff leaves an inspectable event with provenance.
8. The user can replay what actually happened.

Demo mode is optional and exists solely for evaluation, training, screenshots, and product tours. It may load synthetic fixtures only when the installer explicitly selects Demo mode during commissioning. Demo data must never appear in Standard mode.

## 0.2.1 Closed-loop Forge requirement

A revenue Forge is a **closed feedback loop**, never a one-way content conveyor belt. The production contract is:

```text
attributable market signal (Nova)
  → original visual/product hypothesis (Pixel + Forge)
  → supervised listing/product experiment (Forge)
  → bounded demand test (Jared / Marketing)
  → contribution-margin and spend guardrail (Treasury)
  → policy/quality/human approval gate (Governor + owner)
  → configured fulfillment and customer outcome
  → outcome, cost, and quality evidence in Archives + Feedback
  → improved next research question for Nova
```

The World Overview must make this loop visibly legible without pretending that unconfigured systems are live. Render a compact **Closed-loop Forge** overlay or equivalent spatial route that always identifies: current stage, prior verified stage, next prerequisite, current blocker/approval, and the return path from outcome evidence to market intelligence. A user must be able to inspect the underlying records behind every state.

Treasury is the commercial governor: it tracks actual available budget, cost, contribution margin, customer-acquisition cost, fees, refunds, tax reserve intent, and verified profit only when configured telemetry provides them. It sets guardrails and can recommend stop/iterate/scale; it does not activate payment accounts, move money, spend, publish, or report profit by inference. Jared must receive Treasury's stated test budget and margin guardrail before a demand test is eligible for approval.

Standard mode starts without revenue, orders, spend, profit, customer outcomes, or learning evidence. It must visibly wait or block rather than fabricate those values. Demo may illustrate the mechanics only with clear synthetic labels and zero Standard influence.

# 0.3 Product identity and tone

Product name: **Agentarium**.

Use a warm, legible operations canvas that feels like a management game crossed with a mission-control console: alive, practical, inspectable, and calm under pressure. The bundled starter uses pixel-art sci-fi, while commissioned worlds use the installer-selected visual style and world template.

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

## 0.4 Operating modes and hard data boundary

Agentarium supports two mutually exclusive installation modes:

### Standard mode — default

- No mock, fake, sample, seeded, synthetic, or invented operational data is loaded.
- Empty rooms show honest empty states.
- Unconfigured agents/providers/models/integrations show `Unconfigured` and a setup action.
- Configured read/write tools return their actual results and errors with provenance.
- The system never fabricates a success so a workflow looks complete.
- External, destructive, publishing, spending, credential, and public actions follow the commissioned approval policy and remain human-gated where required.
- Standard mode must not import, query, merge, or display the Demo dataset.

### Demo mode — explicit opt-in during commissioning

- Uses a separate synthetic fixture namespace/storage partition.
- Shows a persistent `DEMO MODE — synthetic data; no external actions` banner.
- Every fixture/evidence/packet/event carries `dataClass: 'synthetic_demo'`.
- Demo connectors are non-networked and cannot receive production credentials.
- Leaving Demo mode requires a deliberate confirmation and offers to purge all Demo records. The confirmation must explain that Standard is untouched, use explicitly styled high-contrast controls, visually distinguish cancel from destructive confirmation, and stack cleanly on narrow screens; raw browser-default or white-on-white buttons are unacceptable.
- Demo records must never influence production memory, maturity, XP, reliability, budgets, analytics, training feedback, or agent decisions.

There is no silent fallback from Standard mode to Demo mode. If a connector, provider, model, credential, or evidence source is absent or fails, block the dependent task and show the actual missing prerequisite/error.

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

Use replaceable service/adapter boundaries. Standard mode adapters return configured real data or explicit empty/error states. Demo fixtures live behind a separate `DemoFixtureAdapter` that is impossible to instantiate unless commissioning mode is `demo`. Browser localStorage may preserve local commissioning/configuration state and a strictly partitioned Demo dataset; never store secrets there.

## 1.2 Required project hygiene

Before changing code:
1. Read `docs/START_HERE.md`, `AGENTS.md`, `CONTEXT.md`, `PRODUCT_BLUEPRINT.md`, `ARCHITECTURE.md`, and `CODE_MAP.md`.
2. Read `docs/DECISIONS.md`, `docs/NEXT.md`, `docs/PRODUCT_CLAIMS.md`, and `qa/STATUS.md` before changing scope or making completion claims.
3. Inspect existing source structure and package manifest before choosing paths or imports.
4. Follow the project’s existing naming and formatting conventions.
5. Do not overwrite unrelated project files.

When creating an app from an empty repository, include:
- local run instructions
- a clear project structure
- real adapter results and empty/error states isolated from rendering code
- Demo fixtures isolated in a dedicated demo-only module and storage namespace
- shared TypeScript contracts with provenance/data classification
- deterministic state transitions and auditable tool actions
- smoke tests proving Standard mode contains zero synthetic records
- an implementation note listing configured, unconfigured, read-only, gated-write, and Demo-only capabilities

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

# 2. Initial implementation scope and non-goals

## 2.1 In scope

Build a polished self-commissioning application with:
- full-viewport World Overview → Room View → Agent View navigation
- selectable visual style and world theme
- named room modules and connected routes
- first-class room and agent profiles
- provider/model/tool/integration configuration intent
- explicit Standard or Demo operating mode
- Standard-mode empty/unconfigured/error states with no synthetic fallback
- optional Demo dataset isolated behind explicit opt-in
- Articulation Console, inspectable blueprints, quests, tasks, packets, approvals, audit log, and replay
- real adapter boundaries, provenance, permissions, budgets, and human gates
- visible blocked/failure states
- responsive, accessible behavior and testable contracts

## 2.2 Explicit non-goals

Do not build:
- uncontrolled self-modifying source code
- unbounded agent loops
- silent credential activation
- silent external publishing, delivery, spending, commerce, fulfillment, or customer messaging
- fake revenue, orders, customers, evidence, security posture, budgets, skills, or success in Standard mode
- automatic fallback to Demo fixtures when real data is missing
- a chatbot as the primary interface
- a Sims-like social simulation where operational truth is secondary
- a generic enterprise dashboard with a decorative world

Leave unsupported integrations visibly unconfigured. Do not pretend they are connected.

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

`Level` is the room's maturity/capability level. It can be a simple integer or label, but it must be visible and consistent. Examples: `Level 1 — Draft`, `Level 2 — Supervised`, or, only in Demo mode, `Level 1 — Demo`.

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
   - Shows installation mode, current run state, active quest, pending approvals, connector health, and current sequence position.

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
   - Produces opportunity packets from configured, attributable evidence sources. In Standard mode it blocks when evidence is unavailable; only Demo mode may use synthetic evidence.
   - Nova studies high-performing patterns and turns them into original opportunity packets with risk flags.

5. **Forge Rooms**
   - Forges are business/factory rooms that interact with the outside world to build sellable products or produce income.
   - A Forge is distinct from Communications: it makes/sells/delivers value; Communications routes signals/messages.
   - Model Forge as a category. Include selected Forge room profiles; unconfigured Forges remain honest empty/standby rooms:
     - Etsy Forge
     - Fiverr Forge
     - Print-on-Demand Forge
     - Supplements Forge
     - Old-Time Photo Restoration Forge
     - High-Ticket Affiliate Forge
   - The commissioned setup may focus on Etsy Forge; other Forges appear only if selected/configured and show honest active, unconfigured, or standby states.

6. **Pixel Room / Graphic Artist Studio**
   - Visual and media production station.
   - Pixel is the graphic artist.
   - Turns attributable listing direction into thumbnail/product-media candidate packets.
   - It communicates or delivers only through explicitly configured integrations and commissioned approval gates.

7. **Vibes Room / Music Artist Studio**
   - Audio/music creative station.
   - Vibes is the music artist.
   - Phase 1 may keep this room in standby, but its profile must exist and explain future audio/music production responsibilities.

8. **Developer Room / App Builder Lab**
   - Software/app-building station.
   - Developer is responsible for app prototypes, internal tools, adapters, and future software builds.
   - Keep this room unconfigured/standby until its provider, model, tools, and permissions are configured.

9. **Security Room**
   - Ship security station.
   - The security agent keeps the entire ship secure.
   - Shows security posture derived from configured checks and real local telemetry; unavailable checks display `Not configured` rather than invented findings.
   - It must distinguish configured, read-only, gated-write, unavailable, and Demo-only security capabilities.

10. **Communications Room**
    - Outside-world signal room, but explicitly not a Forge.
    - Handles messages, emails, comments, alerts, customer signals, and routing only from configured channels. Demo mode uses isolated synthetic signals.
    - It does not manufacture products. Sending or replying requires a configured channel and commissioned approval/permission policy.

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
    - In Standard mode Archives stores only actual events, approved memories, configured knowledge sources, and explicit user entries. Demo memories remain isolated and are purgeable.

13. **Feedback / Training Console**
    - Records approve/reject/iterate feedback against output quality.
    - Shows how feedback affects lab maturity but does not train any model.

14. **Skill Armory**
    - Capability inventory and safety metaphor.
    - Displays actual discovered/configured skills with provenance, permission scope, quarantine/inspection status, and approval status. If none exist, show an empty state. Demo mode may show synthetic examples in its isolated inventory.

15. **Treasury**
    - Cost-control and budget metaphor.
    - Shows actual metered/configured costs and budgets when available; otherwise show `Cost tracking not configured` or `No recorded spend`. Never invent revenue, spend, or savings.

16. **Media Bay**
    - Scheduling/publishing metaphor.
    - Shows actual queued media packets from configured workflows. If publishing is unconfigured, show `Publishing not configured`; if configured, enforce its approval policy.

17. **Ten Forward**
    - Recreational non-production room.
    - It produces nothing operational and should not be measured as a Forge or productivity station.
    - Idle AI agents can go there when they have nothing assigned.
    - Agents can socialize, brainstorm ideas, talk nonsense, build relationships, and just live a life.
    - This adds life/personality to the world without confusing social ambience with production work.

## 3.3 Spatial relationships

Use visible routes so configured workflows read as real operational pipelines:

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

Do not imply every room is active. Inactive rooms explain whether they are unconfigured, unavailable, standby, blocked, or Demo-only.

# 4. Required roles and responsibilities

## 4.1 Human operator / Kenn avatar

The human operator is not an agent. Kenn is represented by a logged-in avatar that usually appears on The Bridge. The operator:
- writes or edits the articulation vision
- primarily interacts with Ultron on The Bridge
- inspects proposed work
- starts/stops/resets/replays runs
- approves or denies gated actions
- can stop a running workflow
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

Nova is a market-intelligence engine, not a generic research chatbot. In Standard mode, Nova produces a structured **Opportunity Packet** only from configured evidence sources, with source references, capture time, confidence, and risk fields. If no usable source exists, Nova blocks and requests configuration/evidence. Demo mode may use clearly classified synthetic evidence from the isolated Demo fixture adapter.

Nova’s logic is:

```text
attributable evidence
  → observed demand/pattern
  → adaptation idea
  → IP/trademark/policy review
  → original opportunity packet
  → Forge handoff
```

Nova must not copy a seller’s design and must not invent research.

## 4.4 Forge

Forge is a supervised factory/production agent. It consumes a valid Opportunity Packet and outputs a **Product Listing Packet**. It surfaces missing inputs, unconfigured fulfillment/publishing, or risk flags instead of pretending a listing or product is complete.

## 4.5 Pixel

Pixel is a visual/media agent. It consumes Forge’s packet and produces a **Visual Candidate Packet** through its configured rendering/image tools. If no renderer is configured, Pixel blocks or creates only a user-requested local draft from available assets; it never labels an unrendered concept as a finished asset. Demo mode may use the isolated bundled/synthetic example.

## 4.6 Cipher

Cipher is an inbound-signal and communications-routing agent. It belongs in Communications, which is not a Forge. In Standard mode it processes only configured real channels and records source/message identifiers. With no channel configured, it shows an empty/unconfigured state. Demo mode may route isolated synthetic signals and cannot send externally.

## 4.7 Vibes
## 4.7 Vibes

Vibes is the music/audio artist. In Phase 1, Vibes can remain standby, but the room profile must explain that this room is for future audio/music generation and media support. It must not call live music-generation services.

## 4.8 Developer

Developer is the app/software builder. In Phase 1, Developer can remain standby, but the room profile must explain future app, internal tool, adapter, and prototype-building responsibilities. It must not create new autonomous code-generation workflows beyond the current local prototype.

## 4.9 Security

Security protects the whole world. It surfaces actual configured checks/local telemetry, permission boundaries, connector health, external-action risk, and unapproved adapter warnings. Missing checks show `Not configured`; Security must never invent posture or bypass gates.

## 4.10 Ten Forward

Ten Forward is not a productivity engine. It is the recreational/life room where idle agents can socialize, brainstorm, talk nonsense, build relationships, and feel like inhabitants of the world. Phase 1 may simulate this as lightweight ambient state only; do not let it distract from operational visibility.

## 4.11 Archives

Archives commands the system memory banks for all agents. It makes actual approved memories, events, knowledge sources, provenance, timelines, and relationship edges inspectable through graph/mind-map concepts, search, and filters. Standard and Demo memory stores are strictly partitioned; Demo content is never used for Standard retrieval or decisions.

## 4.12 Review / Governance

Governance checks acceptance criteria and risk. It should reject or request revision when required evidence is missing, IP/trademark risk is unresolved, or a proposed action would be external. It creates an ApprovalRequest for the human rather than letting output silently advance.

# 5. Visual and interaction requirements

## 5.1 Style

For the bundled starter, use a pixel-art-informed sci-fi visual system without requiring literal low-resolution raster art everywhere:
- deep space/navy background with warm amber, cyan, violet, and green operational lights
- clear room silhouettes/modules, short readable labels, controlled glow
- sprites, tile details, or stylized isometric geometry if practical

For commissioned worlds, use the chosen `VisualStyleAnswers`. Pixel Art is one supported option, not the permanent renderer. Components, navigation, inspectors, hotspots, event bindings, and room/agent contracts must remain usable across Pixel Art, Illustrated 2D, Isometric 3D, Cinematic/Realistic, Clean Vector/Graphic, and Custom styles.
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
- Start Run
- Advance One Step (Demo or supervised manual-step workflows only)
- Pause / Stop Run
- Reset World
- Approve
- Deny
- Replay from Start
- Replay Previous Event
- Replay Next Event
- Exit Replay / Return to Current Operational State
- Inspect selected station/agent/quest/event

`Start Run` is disabled until a valid approved blueprint and every required provider/tool/integration are configured. Approval controls are disabled unless an approval is pending. Never make unsupported controls appear active.

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
- timestamp and event sequence number
- link/click target to the related event/packet when applicable

Keyboard navigation must reach all primary controls. Add `prefers-reduced-motion` handling so handoff motion becomes a clear static route/state change rather than continuous animation.

## 5.5 Agent identity and room-work surfaces

Agent concept art must appear in the application, not merely exist in the asset folder or manifest:

- Agent View uses the matching approved portrait for the selected visual style/world theme.
- The roster/agent inspector may use a portrait crop, while in-room motion uses a readable sprite or animated character asset derived from the same character identity.
- If matching art is unavailable, show an honest named placeholder; never substitute an unrelated agent or reduce every agent to the same generic body with a different color.
- In Room View, a primary agent must remain recognizable at normal desktop viewing distance. For the bundled pixel-art implementation, the visible character target is approximately 64–96 CSS pixels tall; 32px micro-sprites are insufficient for Room View even if they remain acceptable in the whole-world overview.
- Agent activation opens Agent View with profile, current status, current assignment/work items, related packet/quest IDs, and provenance—not profile configuration alone.

Every Room View requires a visible, collapsible **Room Work** operational surface. It must answer “What is happening here?” without requiring the Audit drawer. Show:

- active/queued/blocked work
- quests/tasks assigned to the room or its agents
- input/output packets and handoffs
- pending approvals or revision requests
- relevant evidence/events
- record IDs, status, and provenance/source label

Standard mode with no assigned/configured work shows an explicit honest empty state. Demo mode shows its isolated synthetic records. The work surface must not cover the entire room, and closing it must restore an unobstructed room view.

# 6. Data contracts — create exact, replaceable TypeScript types

Keep types in a shared module, not UI components. The key rule is provenance and data classification: every operational record says whether it is real/configured, user-entered, generated from real inputs, or synthetic Demo data.

```ts
type InstallationMode = 'standard' | 'demo';
type ActionMode = 'read_only' | 'supervised' | 'gated_write' | 'bounded_autonomous' | 'disabled';
type DataClass = 'real' | 'user_entered' | 'derived' | 'synthetic_demo';
type ConnectionState = 'configured' | 'unconfigured' | 'unavailable' | 'error';
type AgentStatus = 'idle' | 'queued' | 'working' | 'blocked' | 'needs_approval' | 'completed' | 'failed' | 'offline';
type QuestStatus = 'draft' | 'queued' | 'assigned' | 'running' | 'blocked' | 'needs_approval' | 'complete' | 'failed' | 'cancelled';
type TaskStatus = 'queued' | 'assigned' | 'running' | 'blocked' | 'needs_approval' | 'complete' | 'failed' | 'cancelled';
type RiskLevel = 'safe' | 'review' | 'external' | 'destructive';
type LabMaturity = 'draft' | 'demo' | 'supervised' | 'training' | 'trusted' | 'autonomous_with_audit' | 'suspended';
type ApprovalStatus = 'pending' | 'approved' | 'denied' | 'expired';

type Provenance = {
  dataClass: DataClass;
  sourceType: 'user' | 'file' | 'api' | 'tool' | 'agent' | 'event' | 'demo_fixture';
  sourceId: string;
  sourceLabel: string;
  capturedAt: string;
  adapterId?: string;
  externalUrl?: string;
  contentHash?: string;
};

type Position3D = { x: number; y: number; z: number };
type RoomType = 'bridge' | 'war_room' | 'forge' | 'communications' | 'archives' | 'specialist_lab' | 'governance' | 'recreation' | 'support';

type Station = {
  id: string;
  roomName: string;
  type: RoomType;
  kind: string;
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
  name: string;
  role: string;
  stationId: string;
  status: AgentStatus;
  position: Position3D;
  providerId?: string;
  modelId?: string;
  connectionState: ConnectionState;
  actionMode: ActionMode;
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
  actionMode: ActionMode;
  acceptanceCriteria: string[];
  taskIds: string[];
  createdAt: string;
  updatedAt: string;
  source: 'articulation_console' | 'demo_fixture';
};

type Task = {
  id: string;
  questId: string;
  title: string;
  objective: string;
  status: TaskStatus;
  assignedAgentId?: string;
  stationId?: string;
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
  kind: 'listing' | 'store' | 'trend' | 'feedback' | 'policy_note' | 'other';
  observedSignal: string;
  provenance: Provenance;
};

type OpportunityPacket = {
  id: string;
  kind: 'opportunity_packet';
  questId: string;
  producedByAgentId: string;
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
  provenance: Provenance[];
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
  priceRangeDraft?: string;
  fulfillmentStatus: 'unconfigured' | 'draft' | 'ready_for_approval' | 'submitted' | 'error';
  publishStatus: 'unconfigured' | 'draft' | 'ready_for_approval' | 'published' | 'error';
  openQuestions: string[];
  riskFlags: OpportunityPacket['riskFlags'];
  provenance: Provenance[];
};

type VisualCandidatePacket = {
  id: string;
  kind: 'visual_candidate_packet';
  questId: string;
  producedByAgentId: string;
  productListingPacketId: string;
  assetType: 'product_render' | 'thumbnail' | 'media_slide';
  conceptTitle: string;
  compositionNotes: string;
  altText: string;
  reviewChecklist: string[];
  renderStatus: 'unconfigured' | 'draft' | 'rendered' | 'error';
  assetIds: string[];
  provenance: Provenance[];
};

type InboundSignal = {
  id: string;
  channelId: string;
  externalMessageId?: string;
  summary: string;
  urgency: 'low' | 'normal' | 'high';
  suggestedRouteStationId: string;
  provenance: Provenance;
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

type WorldEvent = {
  id: string;
  sequence: number;
  timestamp: string;
  type: string;
  actorId?: string;
  stationId?: string;
  questId?: string;
  taskId?: string;
  packetId?: string;
  approvalRequestId?: string;
  summary: string;
  detail: string;
  payload: Record<string, unknown>;
  provenance: Provenance;
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
  status: 'draft' | 'ready_for_approval' | 'approved';
};

type WorldState = {
  installationMode: InstallationMode;
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
  run: {
    status: 'ready' | 'running' | 'paused' | 'awaiting_approval' | 'completed' | 'failed' | 'stopped';
    activeQuestId?: string;
    nextSequence: number;
    replayCursor: number | null;
  };
};
```

## 6.1 Contract rules

- Standard mode accepts only `real`, `user_entered`, or `derived` records.
- `synthetic_demo` records are rejected outside the Demo partition.
- Every evidence item, packet, signal, and event must contain provenance.
- Derived output must reference its real/user-entered input provenance.
- IDs are stable and collision-safe. Demo IDs use a separate namespace such as `demo:*`.
- Events are append-only; no status changes without an event.
- Every approval names the action, risk, alternatives, evidence, and human decision.
- Do not use `any` as a shortcut.

# 7. Runtime behavior by installation mode

## 7.1 Standard mode

Standard mode starts clean after commissioning:

- no seeded quests, evidence, packets, signals, skills, budgets, memories, revenue, orders, customers, or completed work
- commissioned rooms and agent profiles may exist as configuration, but operational collections are empty until real/user actions create them
- unconfigured providers/models/tools/integrations block dependent work with a precise setup requirement
- configured adapters return real results/errors with provenance
- local user-authored drafts are `user_entered`, not mock
- agent-generated outputs based on real/user-entered inputs are `derived`
- approvals govern real proposed actions according to commissioned policy
- audit/replay reflects actual state transitions and tool results

Example empty states:

```text
Nova: No evidence sources configured.
Communications: No channels connected.
Treasury: Cost tracking not configured.
Skill Armory: No skills discovered or imported.
Media Bay: Publishing integration not configured.
```

Do not populate those surfaces to make the application look busy.

## 7.2 Demo mode

Demo mode may load the Etsy-inspired Nova → Forge → Pixel → Governance walkthrough for training/product evaluation. It must:

- be explicitly selected during commissioning
- use only `demo:*` IDs and `synthetic_demo` provenance
- display the persistent Demo banner
- disable all production adapters and credential entry
- use deterministic synthetic fixture data
- pause at the demonstration approval gate without external action
- support reset/replay of the isolated Demo dataset
- support a one-action Demo purge

Demo fixtures must include a coherent, visibly populated Nova → Forge → Pixel → Governance walkthrough—not merely empty collections, record counters, IDs, or rows visible only inside the Audit drawer. All records remain clearly identified as Demo data.

The commissioned Demo world must immediately make the synthetic story visible through the primary operational surfaces:

- The Bridge shows one active Demo quest, its current stage, and the next expected handoff.
- Nova Room shows attributed synthetic market evidence and a complete synthetic Opportunity Packet.
- Etsy Forge shows the received Opportunity Packet and a synthetic Product Listing Packet in progress or ready for review.
- Pixel Room shows a synthetic Visual Candidate Packet with an inspectable bundled/placeholder preview.
- Governance shows a pending synthetic ApprovalRequest that the human can approve, deny, or return for revision.
- Communications shows at least one isolated synthetic inbound signal.
- Archives shows the corresponding synthetic events, packet relationships, provenance, and timeline.
- Feedback, Skill Armory, Treasury, and Media Bay show clearly labeled Demo examples where useful.
- The World Overview derives visible room/agent states from that fixture: active/working rooms, a visible handoff route or packet movement, and a pending-approval indication.
- Quest, packet, approval, and event details are reachable from the world without opening a developer-only or audit-only panel.

Minimum Demo story:

```text
Synthetic market signal
  → Nova evidence review
  → Demo Opportunity Packet
  → Etsy Forge listing draft
  → Pixel visual candidate
  → Governance pending approval
  → human approve / deny / revise
  → Demo Archives + Feedback event trail
```

The initial Demo snapshot may pause at Governance so the reviewer can exercise the approval paths. `Advance One Step`, approval decisions, reset, and replay must update the visible world deterministically without calling production adapters.

A Demo implementation is incomplete if the reviewer enters the commissioned world and sees no active quest, no packets, no pending approval, no meaningful room state, or no visible operational data despite fixture records existing in storage.

## 7.3 Workflow execution

For both modes:

1. Generate an inspectable blueprint.
2. Require blueprint approval before execution.
3. Enforce task dependencies.
4. Block when required evidence, provider, model, tool, integration, permission, or credential is absent.
5. Emit an event for every transition and tool result.
6. Pause at human gates.
7. Stop cleanly without later timer/background mutation.
8. Replay from recorded events without rerunning tools or adding events.

Standard mode never calls the Demo adapter. Demo mode never calls production adapters.

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
- `#03 Nova started evidence review in Nova Room using source adapter research-web-01.`
- `#05 Nova created opportunity packet packet-opportunity-001 and handed it to Forge.`
- `#10 Governor requested human approval before external publishing.`
- `#11 Human operator approved the proposed action; the publishing adapter returned result ID ...`

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
- exit replay back to the current operational state without data loss

A replay is successful only if it explains what happened while the operator was away. It cannot be a decorative animation detached from event data.

# 9. State store and adapter boundary

Create an explicit store such as `src/store/worldStore.ts`. Rendering components read state and invoke actions; they never manufacture evidence, packets, events, budgets, skills, or success.

Minimum actions:

```ts
initializeWorld(): void;
setSelectedEntity(entity?: WorldState['selectedEntity']): void;
updateArticulationVision(vision: string): void;
generateBlueprint(): void;
approveBlueprint(): void;
createQuestFromBlueprint(): void;
startRun(): void;
pauseRun(): void;
stopRun(): void;
requestApproval(request: ApprovalRequest): void;
approveRequest(requestId: string, reason?: string): void;
denyRequest(requestId: string, reason: string): void;
returnTaskForRevision(taskId: string, reason: string): void;
resetCurrentRun(): void;
enterReplay(): void;
setReplayCursor(sequence: number): void;
exitReplay(): void;
purgeDemoData(): void;
```

Required adapters:

```text
AgentProviderAdapter
EvidenceSourceAdapter
CommunicationsAdapter
PublishingAdapter
CostTelemetryAdapter
SkillInventoryAdapter
MemoryAdapter
DemoFixtureAdapter // demo installation only
```

Every adapter reports connection state and capabilities. Missing/failed adapters return typed unconfigured/error results, never fixtures. Dependency injection or an adapter registry must enforce that Standard mode cannot resolve `DemoFixtureAdapter` and Demo mode cannot resolve production write adapters.

# 10. Lab maturity, feedback, skills, and health

## 10.1 Lab maturity

Display and explain:
- `draft` — design/spec only
- `demo` — isolated synthetic walkthrough; never production
- `supervised` — real work allowed with human review
- `training` — real approve/reject feedback is collected under the configured policy
- `trusted` — bounded routine work is eligible with audit logging
- `autonomous_with_audit` — bounded autonomy explicitly commissioned and governed
- `suspended` — paused for quality, safety, cost, credentials, or platform risk

A lab does not become trusted because of Demo performance. Demo events, feedback, XP, and reliability cannot affect Standard maturity.

## 10.2 Feedback Console

Feedback records include target, verdict, human reason, quality signal, resulting maturity implication, event ID, and provenance. Standard feedback reflects actual reviewed work. Demo feedback stays in the Demo partition and does not train/configure production agents.

## 10.3 Skill Armory

Standard mode lists only actual discovered/imported/configured skills with provenance, permissions, inspection, and approval status. If none exist, show an honest empty state. Demo mode may show isolated synthetic examples.

## 10.4 Treasury and War Room

Treasury shows actual recorded/metered values when configured. Otherwise it shows `Cost tracking not configured` or `No recorded spend`. Never invent revenue, savings, spend, or ROI.

War Room health derives from current actual state: active/blocked/complete quests, pending approvals, failed/revised tasks, lab maturity, unreviewed packets, and connector health. In Demo mode, health is labelled Demo and excluded from Standard analytics.

# 11. Failure modes to design and test explicitly

Design for these failures. Do not hide them behind optimistic animation.

1. **No blueprint exists**
   - Start Run is disabled and explains that a blueprint must be generated and approved first.

2. **Empty or too-short vision**
   - The articulation console validates it with a humane message. Standard mode does not inject a sample vision; Demo mode may offer its labelled fixture.

3. **Dependency violation**
   - A task cannot advance before prerequisites complete. The inspector names the dependency.

4. **Missing packet input**
   - Forge/Pixel/Governance shows a blocked state and records an event explaining which packet is missing.

5. **Pending approval**
   - The run must pause. No timer, replay, or UI shortcut can silently complete the quest past the gate.

6. **Approval denial**
   - The quest visibly blocks/fails according to the selected path, records reason, and offers reset/revise controls.

7. **Stopped run**
   - No scheduled timeout may continue processing after stop.

8. **Replay isolation**
   - Replay must not append duplicate events, mutate current state, rerun tools, or generate a new packet.

9. **Visual-state drift**
   - A station/agent’s room color, glow, activity route, and inspector status must derive from one source of truth.

10. **Mobile/narrow-screen overflow**
    - No primary command, approval action, or inspector content may be hidden by horizontal overflow.

11. **Reduced motion**
    - Handoffs remain understandable with animation reduced or disabled.

12. **External-action confusion**
    - At every approval/output surface, show whether the relevant adapter is unconfigured, read-only, gated-write, or active, and what action will occur.

13. **Fake success**
    - Never report a draft, blocked result, failed adapter call, or Demo record as a sold product, published listing, delivered asset, or completed real action.

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
    worldState.ts
    workflowEngine.ts
    adapterRegistry.ts
    demoFixtures.ts
    selectors.ts
  store/
    worldStore.ts
  styles/
    ...
  tests/
    workflowEngine.test.ts
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
  installationMode: InstallationMode
  articulation: ArticulationAnswers
  presentation: VisualStyleAnswers
  theme: WorldThemeAnswers
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

interface ArticulationAnswers {
  ownerName: string
  stewardName: string
  vision: string
  desiredOutcomes: string[]
  operatingBoundaries: string[]
  workingStyle: string
}
```

## 12.5.2 Animated installer guide

The first screen should not be a conventional setup wizard card. **Ultron / the Steward** appears inside a neutral unfinished construction environment and begins with the owner's purpose, desired outcomes, operating boundaries, and preferred working relationship. Ultron is the conversational commissioning guide because the product begins with the founder-to-orchestrator relationship; Builder workers appear only after the owner approves the blueprint. Before a visual style is selected, use a clean style-neutral steward presentation. After the operating model is understood and a style is selected, the environment may preview/adopt that style. `CommissioningGuide` may remain the internal component name, but the displayed role is the commissioned steward (default `Ultron`).

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

The canonical first-run order is:

```text
1. Owner → steward articulation
2. Standard or Demo operating boundary
3. Agent roster and responsibilities
4. Forges / revenue-producing operations
5. Governance and installation boundaries
6. Visual presentation style
7. World template and world name
8. Inspect and approve the complete blueprint
9. Run inspectable local build jobs and approve final presentation
```

Do not lead with cosmetic choices. The operation must make sense before the product asks how it should look or what kind of world should contain it. Reordering this flow is a cross-cutting change: update the visible prompt, rendered panel, back/continue controls, progress meter, persisted step recovery, import/reset behavior, E2E helpers, and visual-capture scripts together. Copy changes without matching state/render changes are a failed implementation.

### Owner-to-steward articulation (step 1)

Ultron begins with language close to:

> **“Tell me what we’re building together.”**

Capture and persist the owner's name or call sign, steward name, mission/vision, desired outcomes, non-negotiable operating boundaries, and preferred working style. Treat this saved answer set as the owner-to-Ultron orchestration charter. Require a meaningful mission before continuing. The blueprint must show these answers before topology or art direction so the user can verify that the world expresses the intended operation.

### Visual presentation style (step 6)

Ask this only after articulation, operating mode, agents, Forges, and governance are understood, and before the world-template question:

> **“How should your Agentarium look?”**

**Pixel art must be optional and available for every world template.** It is a presentation choice, not a property of the Spaceship theme and not a requirement of Agentarium.

Offer these starting choices as preview cards:

1. **Pixel Art** — retro game presentation. If selected, ask for an era/fidelity such as 8-bit, 16-bit/SNES-inspired, high-detail modern pixel art, or custom. The bundled Agentarium spaceship art uses high-detail 16-bit/SNES-inspired pixel art.
2. **Illustrated 2D** — polished hand-drawn/digital illustration with layered backgrounds and animated overlays.
3. **Isometric 3D** — rendered miniature/diorama spaces with 3D characters and camera movement.
4. **Cinematic / Realistic** — detailed concept-art or realistic environments with restrained interface overlays.
5. **Clean Vector / Graphic** — crisp shapes, diagrams, strong silhouettes, and lightweight animation.
6. **Custom Visual Style** — installer describes an original art direction or supplies reference images.

For every choice, show the same small sample scene or topology in each visual style so the installer is choosing an art treatment rather than accidentally changing the world architecture.

The installer can also toggle **Pixel Treatment** on or off later in the style editor. Turning it on applies pixel-grid, palette, sprite, and animation conventions to the currently selected world template. Turning it off preserves the world topology and operational configuration and asks the installer to select the replacement presentation style. Changing presentation style must not recreate agents, businesses, rooms, memory, workflows, or approvals.

Suggested contract:

```ts
type VisualStyleId =
  | 'pixel_art'
  | 'illustrated_2d'
  | 'isometric_3d'
  | 'cinematic_realistic'
  | 'clean_vector'
  | 'custom'

interface VisualStyleAnswers {
  styleId: VisualStyleId
  pixelArtEnabled: boolean
  pixelEra?: '8_bit' | '16_bit' | 'modern_high_detail' | 'custom'
  customStyleDescription?: string
  referenceAssetIds: string[]
  palette: string[]
  mood: string[]
  animationLevel: 'none' | 'subtle' | 'active'
  soundEnabled: boolean
  reducedMotion: boolean
  highContrast: boolean
  colorBlindMode?: string
}
```

The selected visual style drives the shared style bible, whole-world image prompt, room-image prompts, agent rendering method, animation language, camera treatment, and asset QA. It does **not** alter room IDs, topology, Forge classification, agent responsibilities, or operational contracts.

### Operating mode and data policy (step 2)

Ask immediately after owner-to-steward articulation:

> **“Will this installation use real operational data, or should I create an isolated demonstration world?”**

Choices:

1. **Standard mode — recommended/default**
   - starts with no operational data
   - uses only user-entered data and configured real providers/tools/integrations
   - shows honest empty/unconfigured/error states
   - never loads Demo fixtures

2. **Demo mode**
   - loads an isolated synthetic walkthrough for training, screenshots, and evaluation
   - performs no external actions
   - shows a persistent Demo banner
   - can be purged completely
   - never contributes to Standard memory, analytics, maturity, XP, budgets, or decisions

Do not preselect Demo mode. Record an explicit answer. Before confirming Demo mode, explain that all visible operational records will be synthetic. Before switching an existing Standard installation to Demo, create a separate Demo workspace/partition; never replace or mix the Standard dataset.

### Theme and world questions (step 7)

Begin this section with a **visual world-template chooser**, not an open-ended design questionnaire. Ultron should say something close to: “What kind of world should contain this operation?” Present large illustrated choice cards with a short description and a small topology preview.

Every world-template card must include a representative thumbnail, and selecting/clicking a template must update a larger adjacent preview with its topology, movement metaphor, command-area terminology, materials, and selected visual style. The preview should make the choice understandable before the installer commits; two-letter glyphs, text-only cards, or the same image reused across themes are insufficient.

Display this note prominently above or beside the chooser:

> **Each commissioned world is custom and unique.** These thumbnails show a possible direction—not the exact world that will be created for you.

Preview images are inspiration/communication aids, not locked blueprints. The commissioned renderer must create a new world from the installer's selected template, visual style, answers, room roster, topology, name, and art direction. It must not silently clone the thumbnail, reuse another customer's rendered world, or imply that every installation of a template will look identical. Bundled art remains an explicitly identified exception where the user chooses the bundled starter asset set.

Required starting choices:

1. **Modern Corporate Office** — contemporary headquarters with reception, executive command suite, open-plan departments, conference rooms, creative studios, operations center, secure IT/server areas, employee lounge, elevators, and city/campus views. This is the recommended/default Agentarium template.
2. **Space Station** — orbital hub, rings/spokes, docking structures, connected laboratory modules.
3. **Spaceship** — a vessel traveling through space, longitudinal decks, corridors, engineering sections, and The Bridge. This matches the bundled concept art.
4. **Cruise Ship** — ocean-going decks, bridge, atrium, cabins, entertainment areas, service corridors, and engine spaces.
5. **Underground Bunker** — subterranean levels, tunnels, hardened doors, command center, utilities, and secure specialist chambers.
6. **Skyscraper** — stacked floors, elevators, executive command level, departments, mechanical floors, and a city view.
7. **Resort** — a campus of connected buildings, paths, villas, studios, operations lodge, recreation, and landscaped shared areas.
8. **Sky Ship** — a large flying vessel above the clouds, decks, engine/balloon or anti-gravity systems, helm, observation spaces, and aerial docks.
9. **Battleship** — armored ocean vessel, bridge, combat information center, deck machinery, engineering, communications, and compartmentalized operations.
10. **Custom Theme** — the installer describes any original setting, structure, geography, and naming language.

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
5. Then ask the remaining world-specific questions. Do not ask for pixel-art fidelity here; that belongs to the visual-presentation section (step 6) and applies equally to every template:
   - desired rooms and any custom rooms
   - whether the installer prefers cozy, industrial, military-clean, scientific, whimsical, luxurious, natural, or mixed interiors
   - avatar style and the owner's usual command-room location
   - whether to use bundled art, generate new art, or start with placeholders and regenerate room-by-room later

The bundled art is the **Spaceship + Pixel Art** starter set. Other world/style combinations must not silently reuse that art as if it matched. If remote image generation is not configured/approved, use clearly labelled local placeholder scenes and retain the complete generated prompts for later rendering.

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
  | 'modern_corporate_office'
  | 'custom'

interface WorldThemeAnswers {
  templateId: WorldTemplateId
  customThemeDescription?: string
  worldName: string
  commandRoomDisplayName: string
  movementMetaphor: 'corridors' | 'decks' | 'elevators' | 'tunnels' | 'paths' | 'custom'
  layoutPreference: string
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
- silhouette/geography preference appropriate to the selected template
- desired rooms and any custom rooms
- whether the installer prefers cozy, industrial, military-clean, scientific, whimsical, luxurious, natural, or mixed interiors
- avatar style and where the owner usually appears in the selected template's command area
- whether to use matching bundled art when available, generate new art, or use labelled placeholders and regenerate room-by-room later

Do not ask for dozens of low-value cosmetic choices up front. Offer strong defaults and allow later editing.

### Agent questions (step 3)

For each agent ask or infer, then confirm:

- name and visual identity
- purpose and responsibilities
- primary room
- provider
- preferred model and optional fallback model
- tools/capabilities
- permissions and prohibited actions
- memory scope
- autonomy level: demo-only, supervised, trusted, or bounded autonomous
- approval triggers
- expected inputs and outputs
- subagents, if any
- idle behavior and whether the agent may visit Ten Forward
- cost/budget constraints
- success measures

Always include an owner/steward relationship. Ultron is the default Bridge steward, but the installer may rename the character without changing the steward role contract.

### Business and Forge questions (step 4)

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
- current maturity: idea, demo-only, supervised, trusted, or live

Never infer that a Communications Room is a Forge. A Forge manufactures a sellable output or revenue-producing service; Communications routes messages/signals.

### Operations, governance, and installation questions (step 5)

Ask the remaining questions needed to build safely:

- local-only, LAN, or future hosted deployment intent
- single owner or future multi-user intent
- data sensitivity and retention
- local storage/backup/export preferences
- audit/replay requirements
- approval policy for external actions
- budget/spend limits
- credential-storage preference (without requesting credentials in chat)
- desired integrations and whether each is unconfigured, read-only, supervised/gated-write, or disabled; Demo uses separate non-networked fixture adapters
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
Approve commissioned build
Approve selected paid/remote generation jobs
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

- `docs/art/IMAGE_PROMPTS.md` — human-readable detailed prompts for worlds, rooms, and agents
- `docs/art/image-prompt-manifest.json` — machine-readable prompt/asset manifest
- `docs/art/CONCEPT_ART_ASSET_INDEX.md` — generated asset index
- `assets/concept-art/ship/ship-overview-cross-section.png` — bundled whole-ship background
- `assets/concept-art/rooms/*.png` — bundled room background plates
- `assets/concept-art/agents/*.png` — bundled core-agent concept art / character portraits

Agent art is a required first-class asset category, not a generic colored placeholder or initial letter. Build a shared **character bible** after the world style bible and before generating individual agents. The character bible must define common anatomy/proportions, pixel scale, outline weight, material language, lighting direction, portrait framing, sprite silhouette rules, and how role-specific colors remain distinguishable without breaking world consistency.

For the bundled Spaceship + Pixel Art starter, generate and ship concept art for these nine core agents:

1. `ultron` — Steward / Bridge orchestrator; authoritative but collaborative; navy, cyan, and restrained amber command accents.
2. `nova` — Market Intelligence; observant, curious, analytical; cyan/violet research accents.
3. `forge` — Production agent; sturdy, practical, supervised factory-builder; amber/orange industrial accents.
4. `pixel` — Graphic Artist; expressive visual creator; violet/magenta/cyan creative accents.
5. `vibes` — Music Artist; warm audio specialist; purple/teal equalizer-light accents.
6. `developer` — App Builder; focused software engineer; blue/cyan technical accents.
7. `security` — Security Officer; vigilant and calm, not hostile; red/orange caution plus blue shield accents.
8. `cipher` — Communications router; agile signal operator; green/cyan signal accents.
9. `governor` — Governance reviewer; measured, neutral, quality-focused; violet/amber approval accents.

Each agent needs, at minimum:

- one approved full-body or three-quarter character concept image with a clean, simple background or transparency suitable for extraction
- one readable portrait crop for Agent View / roster UI
- a stable silhouette and role palette that remains recognizable at small scale
- explicit `agentId`, role, home room, source, prompt/provenance, dimensions, and approval status in the asset manifest
- no copyrighted franchise resemblance, real company logo, readable fake brand, or visual language that implies domination, hostility, or servitude

For implementation-ready sprite animation, either provide a sprite sheet or retain enough approved concept art to derive one later. A sprite-sheet specification should include consistent frame boxes for `idle`, `walk`, `working`, `blocked`, and `celebrating`, with facing-direction rules and an anchor point. Do not call an initial-letter circle or a recolored generic body “finished agent art.” If matching agent art is unavailable, show an honest named silhouette/placeholder and preserve the complete prompt; never silently reuse an unrelated agent.

Generation order:

1. Build the room roster and adjacency/topology graph.
2. Create a shared art-direction/style bible from the independent visual-presentation answers plus the selected world template.
3. Create the shared character bible and approved core-agent roster.
4. Generate or select the geographically coherent whole-ship cross-section first.
5. Generate/select room backgrounds using the same palette, lighting language, materials, camera language, room geography, and style-specific rules. Enforce pixel scale and sprite conventions only when Pixel Art is enabled.
6. Generate/select one concept portrait/full-body asset for every selected agent, using the character bible and that agent's role/home-room palette.
7. Validate that every room ID has exactly one background plate or an explicit placeholder, and every selected agent ID has exactly one approved concept asset or an explicit placeholder.
8. Create normalized transparent hotspot polygons over the whole-ship image by tracing the actual rendered compartment walls/footprints. Do not distribute generic rectangles by room-list order. The image and controls must use one shared coordinate transform; `cover`/`slice` cropping, letterboxing, or responsive scaling must not shift controls away from their rooms.
9. Create room-local sprite anchor points and interaction zones.
10. Present world, room, and agent contact sheets/galleries for review. For the whole-world asset, include a QA capture with every hotspot boundary visible so alignment can be inspected directly against the art.
11. Allow per-room and per-agent regenerate, replace, approve, or defer.
12. Save provenance for every generated/imported asset.

The whole-ship image is the navigational map. The room images are the Room View backgrounds. Generated labels inside images are never authoritative; real room names and controls must be accessible DOM/UI overlays.

Suggested asset contract:

```ts
interface GeneratedAsset {
  id: string
  kind: 'ship_background' | 'room_background' | 'agent_concept' | 'agent_portrait' | 'agent_sprite_sheet' | 'effect_layer'
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
- coherent selected visual style and palette across the whole world and rooms
- when Pixel Art is enabled: coherent pixel era, grid/block scale, palette limits, sprite treatment, and nearest-neighbor rendering
- when Pixel Art is disabled: no accidental pixelation, pixel-font requirement, or pixel-only animation assumption
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

The builder may generate declarative adapter configuration and, only in Demo mode, isolated synthetic packets. Standard mode starts with empty operational collections and no fixture adapter. The builder must not activate providers, tools, skills, credentials, or external writes merely because the interview named them; activation follows dedicated setup and approval.

## 12.5.8 Final assembly and presentation

When all required jobs pass QA:

1. Fade from the construction bay to the completed whole-ship cross-section.
2. Bring the guide agent onto The Bridge.
3. Present a concise commissioning report: installation mode, rooms built, agents configured, bundled/generated assets, configured/unconfigured/Demo-only capabilities, unresolved items, and safety gates.
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
2. The first interview decision records owner-to-steward articulation, requires a meaningful mission, and preserves the mission, desired outcomes, operating boundaries, and working style in the versioned `CommissioningSpec` and blueprint.
3. The flow then records explicit Standard/Demo mode, agents, Forges, and governance before asking for visual presentation and world template. Pixel Art remains optional and works with every world template.
4. The world-template chooser includes Modern Corporate Office first/default, then Space Station, Spaceship, Cruise Ship, Underground Bunker, Skyscraper, Resort, Sky Ship, Battleship, and Custom Theme. Every option has a distinct representative thumbnail; selection updates a larger detail preview; the UI states that every commissioned rendering is custom and unique. The selected template changes topology, terminology, movement, and art prompts rather than acting as a color skin.
5. Changing visual style preserves world topology, rooms, agents, businesses, workflows, memory, and approvals.
6. The installer can revise answers before build approval.
7. Background builder characters correspond one-to-one with inspectable `BuildJob` records.
8. The local/offline Spaceship + Pixel Art path assembles a ship using bundled art without any external call; other unrendered world/style combinations use honest placeholders rather than mismatched art.
9. The art pipeline covers one whole-world background and every selected room background.
10. Whole-world hotspots open the correct room views.
11. Generated agent manifests preserve provider/model intent without claiming credentials are configured.
12. Refresh/crash resumes the commissioning flow without losing completed answers/jobs.
13. The build can pause, cancel, retry failed jobs, and replace one room asset without rebuilding everything.
14. Final QA runs before status changes to `complete`.
15. The completed world is presented with a clear report of Standard/Demo mode, configured, unconfigured, gated-write, and disabled capabilities.
16. No secret appears in chat history, prompts, logs, generated files, or screenshots.
17. Paid/remote generation and external integrations remain explicitly approval-gated.

# 13. Acceptance criteria and verification

Do not claim completion until verification runs against the built artifact.

## 13.1 Functional acceptance criteria

1. Fresh install launches commissioning and records an explicit `standard` or `demo` mode.
2. Standard is the default; Demo cannot be entered accidentally.
3. Standard starts with zero operational evidence, packets, signals, events, skills, budgets, customers, orders, revenue, or completed work unless created by the user or a configured real source.
4. Standard rejects `synthetic_demo` records at its store/adapter boundary.
5. Missing providers/models/tools/integrations produce honest empty, unconfigured, blocked, unavailable, or error states—never fixtures.
6. Demo uses a separate namespace/storage partition, persistent banner, non-networked fixtures, and purge control.
7. Demo data cannot affect Standard memory, XP, reliability, maturity, budgets, analytics, feedback, or decisions.
8. The app runs locally with documented commands and a full-viewport World Overview.
9. Visual style and world theme are independently commissioned; Pixel Art remains optional for every template.
10. Required selected rooms have distinct profiles and correctly mapped backgrounds/hotspots.
11. The user can articulate a vision and inspect/approve a blueprint with tasks, rationale, risks, permissions, connectors, assumptions, metrics, and open questions.
12. A Standard run cannot start until its required dependencies are configured.
13. Nova evidence and all downstream packets contain provenance; absent evidence blocks Nova.
14. Forge and Pixel distinguish drafts, rendered/generated assets, submitted/published results, and errors using actual adapter responses.
15. Governance creates an approval request for gated actions and prevents bypass.
16. Approve invokes only the described commissioned action; deny/revise creates an inspectable blocked/revision path.
17. Every transition/tool result creates an event; visible animations derive from state/events.
18. Replay never reruns tools, duplicates events, or mutates current state.
19. No UI surface presents fake revenue, orders, customers, security posture, skills, spend, messages, research, assets, or success in Standard mode.
20. Commissioning/build jobs are resumable, inspectable, idempotent, and safely cancellable.
21. Keyboard, reduced-motion, narrow-width, contrast, and overflow behavior are verified.
22. Changing visual style regenerates only visual assets and preserves operational state.

## 13.2 Minimum automated tests

At minimum prove:

1. Commissioning validates explicit Standard/Demo mode.
2. Standard initializes all operational collections empty.
3. Standard adapter registry cannot resolve `DemoFixtureAdapter`.
4. Standard state rejects `synthetic_demo` provenance.
5. Missing Nova evidence blocks the task without creating a packet.
6. Missing provider/model/tool/integration yields typed unconfigured/error state without fallback content.
7. Demo initializes only `demo:*` records, performs zero production-network/write adapter calls, and visibly populates the primary world/room/quest/packet/approval surfaces with the deterministic Nova → Forge → Pixel → Governance walkthrough.
8. Demo purge deletes Demo data and leaves Standard data unchanged.
9. Blueprint dependencies and approval gates cannot be bypassed.
10. Replay does not append events, rerun tools, or alter current state.
11. Commissioning resumes without duplicating completed jobs/assets.
12. Every selected room has a background or explicit placeholder and a valid hotspot when the selected rendering mode uses hotspot navigation; QA verifies each hotspot against the actual rendered compartment using the same responsive image transform.
13. Every selected agent has an approved concept-art asset or explicit named placeholder; the bundled Spaceship + Pixel Art starter includes Ultron, Nova, Forge, Pixel, Vibes, Developer, Security, Cipher, and Governor concept art.
14. Bundled Agent View renders the matching portrait, and Room View renders a recognizable 64–96px-tall sprite/character with an inspectable Room Work surface.
15. Room Work associates actual room/agent records correctly; Standard can be honestly empty, while Demo exposes its isolated quest, packets, approval, and events without requiring the Audit drawer.
16. Switching visual style preserves operational topology/data and schedules only visual replacement jobs.
17. The canonical nine-step commissioning order is verified end to end: each guide prompt matches its rendered form, Back/Continue controls and progress meter match the same step, draft import/reset returns to articulation, blueprint approval opens build step 9, and completed build jobs expose final presentation.

Also run the standard build, type-check, lint, unit, and end-to-end commands for the selected stack.

## 13.3 Manual smoke script

```text
1. Clear commissioning state and start a fresh install.
2. Enter an owner mission and working contract with Ultron; verify visual-style and world choices are absent.
3. Choose Standard or Demo, then review agents, Forges, and governance.
4. Only after the operating model is defined, choose visual style and world template.
5. On the world-template step, verify all ten distinct thumbnails load, clicking each card updates the larger selected preview, and the custom-and-unique rendering note remains visible.
6. Complete commissioning without configuring operational connectors.
7. Verify rooms are empty/unconfigured and no operational fixture records appear.
8. Try to start a Nova workflow; verify it blocks on missing evidence/configuration.
9. Configure or inject a controlled local real/user-entered test source; verify provenance flows into the packet.
10. Verify a gated action pauses for approval and denial does not execute it.
11. Enter replay and confirm no tool is rerun and no event is added.
12. Recommission visual style and confirm rooms/agents/workflows/memory remain unchanged.
13. Start a separate Demo commissioning/workspace.
14. Verify the Demo banner, `demo:*` records, synthetic provenance, zero production adapter calls, and a visibly populated Nova → Forge → Pixel → Governance story in the primary UI.
15. From the World Overview, open Nova, Forge, Pixel, Governance, and Archives; verify their evidence/packets/approval/timeline are inspectable without relying on the Audit drawer.
16. Exercise approve, deny, or revise on the pending Demo approval; verify room states, events, and replay update deterministically without external action.
17. Purge Demo data and verify Standard remains unchanged.
18. Refresh mid-build and verify answers/completed jobs resume without duplication.
19. Repeat at narrow width, keyboard-only, high contrast, and reduced motion.
```

## 13.4 Completion report

Report:
- local run command and URL
- files created/changed
- verification commands and actual results
- selected installation mode(s) tested
- configured, unconfigured, read-only, gated-write, disabled, and Demo-only capabilities
- data-partition/provenance tests
- assumptions and unmet criteria

Never report a feature as working based only on source inspection.

# 14. Completion gates and definition of done

“Done” must name a gate. Never collapse these verdicts:

1. **Prototype phase complete** — the browser commissioning/world prototype and local contracts pass their defined automated and visual checks.
2. **Operational vertical slice complete** — a genuine supervised owner→Ultron→Nova evidence→Forge/Developer artifact→Governor review→approval→delivery→replay flow runs through backend authority.
3. **Feature complete** — every item in the committed release scope is implemented and release-blocking gaps are closed.
4. **Release candidate** — candidate security, privacy, migration, diagnostics, performance, and release evidence pass.
5. **Installed product proven** — clean install, first launch, upgrade, rollback, export/restore, and recovery are exercised against packaged artifacts.
6. **Product claims proven** — every active claim in `docs/PRODUCT_CLAIMS.md` has current evidence and no contradictory open bug.

The current commissioning lane may satisfy the first gate without satisfying any later gate. Unit, E2E, visual, or lint success for one lane must never be presented as proof of backend authority, packaging, installation, update, recovery, or all product claims.

For the commissioning prototype specifically, its definition of done remains: Standard starts clean, uses only real/user-entered/derived records with provenance, and blocks honestly on missing configuration; Demo is optional, visibly synthetic, non-networked, isolated, purgeable, and incapable of influencing Standard operation. The visual world, state, local contracts, audit log, approvals, and inspectors must agree, and no surface may invent activity to make the world look busy.

Current verdicts and evidence are authoritative only in `qa/STATUS.md`.
```

## Review checklist for Kenn

- [ ] Standard mode is the default and contains no synthetic operational data.
- [ ] Demo mode exists only through explicit commissioning choice and is visibly isolated.
- [ ] Missing real configuration produces empty/unconfigured/blocked/error states, never fake fallback data.
- [ ] All evidence/results/events include provenance and data classification.
- [ ] Demo cannot affect Standard memory, metrics, maturity, budgets, feedback, or decisions.
- [ ] Visual style and world theme remain independent commissioning choices.
- [ ] Named rooms/agents and Forges/Communications distinctions remain intact.
- [ ] Approval, adapter, event, replay, and safety contracts are implementable and tested.
- [ ] Art generation and self-building commissioning remain resumable and inspectable.

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

## Post-Phase-3 builder dry-run addendum

Hermes (the builder agent) executed the prompt against the existing Phase 2 codebase and produced the following verified implementation. These findings should inform the next builder's approach:

### Verified implementation delivered

**Game-like visual layer (self-built, not generated by an external builder):**
- `src/lib/animation.ts` — Pixel-art sprite system with 16×16 character grids, role-specific color palettes, frame-based animation states (idle, walking, working, blocked), and deterministic wander math.
- `src/components/WorldScene.tsx` — SVG-based game world rendering the full spaceship cross-section. Features: animated agent sprites wandering within room hotspot bounds, pulsing status-colored glow overlays per room, flow particles traveling along adjacency edges, mouse/keyboard room selection, hover tooltips.
- `src/components/RoomDiorama.tsx` — Room interior diorama with background image, floor grid, wandering agent sprites, status overlay panel, and back navigation.
- `src/components/WorldScene.css` — Scanline overlay, vignette, pixelated image rendering, reduced-motion support.

**Build validation fix:**
- The original topology validator required `hotspots.length === rooms.length` unconditionally. This failed for non-bundled world/style combinations because they intentionally generate 0 hotspots (they use a room chooser dropdown instead). The fix gates the hotspot count check to only the bundled Spaceship + Pixel Art combination. QA validation checks that existing hotspots point to valid rooms rather than demanding every room have a hotspot.

**World template default change:**
- Modern Corporate Office is now the first-listed and default world template (previously Spaceship). Spaceship remains available and is still the only bundled-art path.

**What worked well:**
- The prompt's separation of Standard vs Demo mode, provenance contracts, and adapter boundaries translated cleanly into TypeScript.
- The commissioning interview is usable end-to-end when it follows the founder-to-steward order: articulation → operating mode → agents → Forges → governance → visual style → world template → blueprint → build.
- Pixel-art sprites rendered via SVG `<rect>` elements with `shape-rendering="crispEdges"` produce authentic pixel scaling without WebGL.

**What the prompt under-specified:**
- The exact rendering strategy for pixel-art sprites (SVG rects vs canvas vs WebGL vs CSS). The builder chose SVG for accessibility and crisp scaling.
- How agent movement boundaries map to room shapes when rooms are irregular polygons. The builder used normalized hotspot polygons as wander bounds for bundled worlds and a default rectangle for room dioramas.
- The visual hierarchy when both a detailed pixel-art background and animated sprites occupy the same space. The builder added scanlines and vignette to unify the look, plus subtle glow overlays for status without obscuring the art.
- Font rendering in pixel-art contexts. The builder used monospace fonts at small sizes with text shadows for legibility.

**Resolved during Kenn's Phase-3 hands-on review:**
- Demo records are now structured and visible through Room Work and Agent Current Work surfaces, including the Nova → Forge → Pixel → Governance walkthrough; legacy shallow Demo partitions upgrade locally.
- The bundled core-agent portraits are wired into Agent View.
- Room View pixel sprites render at 80px (within the required 64–96px target) instead of 32px.
- Spaceship hotspot controls were retraced against the actual cross-section compartments; Bridge and War Room now map to their visible rooms, and the image/control layers use the same uncropped coordinate transform.
- Room View includes a collapsible operational surface with work, packets, approvals, events, IDs, status, and provenance.

**Remaining known gaps:**
- The room chooser for non-bundled worlds is a functional dropdown/card map, not a fully illustrated game-like map.
- No actual game loop or collision detection; agent wander uses simple LERP toward a deterministic target.
- Archives graph view, Feedback Console, Skill Armory, Treasury, and Media Bay are present as room profiles but lack dedicated visual implementations beyond the generic room view.

### Updated review checklist for Kenn

- [x] Standard mode is the default and contains no synthetic operational data.
- [x] Demo mode exists only through explicit commissioning choice and is visibly isolated.
- [x] Missing real configuration produces empty/unconfigured/blocked/error states, never fake fallback data.
- [x] All evidence/results/events include provenance and data classification.
- [x] Demo cannot affect Standard memory, metrics, maturity, budgets, feedback, or decisions.
- [x] Visual style and world theme remain independent commissioning choices.
- [x] Named rooms/agents and Forges/Communications distinctions remain intact.
- [x] Approval, adapter, event, replay, and safety contracts are implementable and tested.
- [x] Art generation and self-building commissioning remain resumable and inspectable.
- [x] Build validation handles both bundled (hotspot-based) and non-bundled (chooser-based) worlds.
- [x] Modern Corporate Office is the default world template.
- [x] Game-like pixel-art sprites, glows, and flow particles render in the world view.
- [x] Room diorama view shows recognizable agents inside room interiors.
- [x] Bundled agent portraits appear in Agent View with current-work records.
- [x] Spaceship hotspots align to visible compartments and share the image's responsive transform.
- [x] Every Room View has an inspectable Room Work surface with an honest empty state.

For the next worker: treat this addendum as higher priority than any earlier wording that could be interpreted as accepting a normal dashboard-style implementation.
