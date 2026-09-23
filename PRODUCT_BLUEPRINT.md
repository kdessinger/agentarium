# Agentarium Product Blueprint

## Vision

Agentarium is a gamified spatial operating environment for AI agent ecosystems. It lets a human define goals, watch specialized AI labs work, inspect connected rooms/departments, approve risky steps, inspect reasoning trails, and improve the agent ecosystem over time.

The product should feel like a cross between:

- a space-station / HQ management sim
- a strategy game
- a mission-control dashboard
- an agent orchestration console
- a living knowledge/workflow map

## Target user

Initial target: builders, operators, and technical leaders who want to run multiple AI agents without losing visibility or control.

Later targets:

- software teams running coding/review agents
- small businesses running support/research/content agents
- educators teaching AI workflows
- AI operations teams monitoring agent fleets
- solo builders who want a more intuitive command center

## Core surfaces

### 1. Spatial operations canvas

A full-viewport themed world overview showing connected AI labs, agents, task objects, pipeline routes, and current activity. The bundled starter is a pixel-art/isometric spaceship, but visual style is commissioned independently from world type.

The intended top-level experience is closer to a video-game management sim than a conventional dashboard. The generated concept image is the visual north star: a cutaway space station with distinct rooms, glowing connected corridors, tiny animated AI characters, consoles, machinery, screens, and room-specific activity.

The canvas must support a nested interaction hierarchy:

```text
Ship Overview
  → double-click room
Room View
  → double-click agent
Agent View
```

- **World Overview** shows the entire selected world and all rooms/areas at once. In Pixel Art mode, rooms read as pixel-art image/diorama modules; other styles use their own coherent rendering language. No style should collapse back into plain graph nodes.
- **Room View** zooms into one room, showing its profile, interior scene, agents/subagents, tools, queues, packets, and room-specific work state.
- **Agent View** opens a character/profile view for one agent, including role, status, skills, permissions, current task, recent events, subagents where applicable, and future functionality controls.

Room View also branches to **Instrument View** when the operator selects a declared physical console, monitor, terminal, or other workstation inside a room. Instrument View is contextual rather than a fourth linear agent zoom: it opens the real operational/recreational surface owned by that room, preserves provenance/availability/permissions/audit state, and returns the operator to the exact room context. See `docs/plans/2026-09-18-instrument-view-and-the-arcade.md` for the accepted design direction, including The Bridge’s Spatial Intelligence Console and The Arcade’s isolated external WINDOWS93 terminal.

Every animation must still map back to application state/events. The world is the interface, not decoration.

Minimum canvas elements:

- Mission Control / Command Deck for the human operator
- Steward / Orchestrator seat for the main coordinating agent
- Specialized labs/rooms
- Agent workers inside each lab
- Intake/work queues
- Conveyor belts or pipeline links between labs
- Research / market intelligence lab
- Factory / Etsy / fulfillment lab
- Design studio / Fiverr thumbnail lab
- Communications deck for email, comments, alerts, and human notification routing
- Music/media generation lab
- Skill armory / capability management lab
- Review/governance chamber
- Memory archive
- Tool/account access terminal
- Approval gate
- Feedback / training console
- Archives / durable memory room
- Treasury / cost-control room
- War Room / strategy review room
- Media Bay / publishing scheduler
- Metrics / performance panel
- Event timeline overlay

### 2. Quest board

The human creates or imports goals as quests.

Quest fields:

- title
- objective
- priority
- required skills
- risk level
- status: draft, queued, assigned, running, blocked, needs approval, complete, failed
- assigned agent(s)
- dependencies
- acceptance criteria
- audit trail

### 3. Agent cards

Each agent has an inspectable card:

- name
- role
- strengths
- tool permissions
- current task
- recent messages
- performance stats
- reliability score
- XP / level / badges
- blocked reasons
- allowed action scope

### 4. Orchestrator / Articulation console

The orchestrator decides how work is split and routed. The articulation console is where the human turns a vision into labs, agents, workflows, dashboards, and approval gates.

The console should show:

- founder/operator vision statement
- proposed lab/room blueprint
- task decomposition
- agent role proposals
- agent selection rationale
- tool/platform connection needs
- parallel vs sequential plan
- handoff chain
- risk classification
- pending approvals
- retry/escalation rules
- feedback/iteration history

### 4.5 Self-building commissioning experience

Agentarium should install as a generic core runtime and **commission itself into the owner's ship** on first startup.

The first-run experience is part of the world, not a normal setup wizard:

```text
Install
  → Ultron / the Steward appears in an unfinished construction bay
  → owner-to-steward articulation (mission, outcomes, boundaries, working style)
  → operating mode (Standard or isolated Demo)
  → editable agent manifests
  → editable Forge/business definitions
  → editable operations/governance
  → visual presentation
  → world template and world name
  → inspectable ship/agent/business blueprint
  → explicit build approval
  → bounded builder agents visibly assemble art, rooms, agents, and workflows (only after blueprint approval)
  → QA and final review
  → completed ship is presented to the owner
```

Interview areas, in canonical order:

1. **Owner-to-steward articulation** — owner/call sign, steward name, mission, desired outcomes, operating boundaries, and preferred working relationship. A meaningful mission is required before continuing.
2. **Operating mode** — explicitly choose Standard or the isolated Demo world.
3. **Agents** — name, purpose, room, provider, model/fallback, tools, permissions, memory, autonomy level, subagents, budget, and success measures.
4. **Businesses/Forges** — customer, sellable output, inputs/outputs, production and QA agents, external integration intent, approvals, metrics, and risks.
5. **Operations/governance** — storage, backup, privacy, audit/replay, deployment intent, notification channels, spend limits, credential handling, retries, and approval policy.
6. **Visual presentation** — after the operation is defined, ask whether the user wants Pixel Art, Illustrated 2D, Isometric 3D, Cinematic/Realistic, Clean Vector/Graphic, or a Custom Visual Style. Pixel Art is optional for every world template; it is not tied to Spaceship.
7. **Theme/world** — show the world-template chooser: Space Station, Spaceship, Cruise Ship, Underground Bunker, Skyscraper, Resort, Sky Ship, Battleship, Modern Corporate Office, or Custom Theme. The selection drives topology, movement, terminology, materials, exterior setting, and art prompts; then ask the world name, rooms, and bundled-vs-generated art.

Self-building means **configuration and asset generation**, not uncontrolled source-code self-modification. Builder agents create versioned manifests, room topology, hotspot maps, art backgrounds, agent definitions, workflows, and local project state. Real credentials, paid generation, external writes, deployment, and spending remain approval-gated.

The construction animation must be truthful: every visible builder corresponds to an inspectable build job. The system must resume after refresh/failure and avoid rerunning completed jobs.

Art is built before animation:

```text
whole-ship cross-section background
  + normalized room hotspots
  + per-room background plates
  + agent sprite anchors
  + state overlays
  + later animation/effects
```

The bundled concept art provides an offline commissioning path; users can later regenerate or replace individual rooms without rebuilding the entire ship.

### 5. Event log and replay

Every visible action should have an underlying event.

Event types:

- quest.created
- quest.decomposed
- agent.assigned
- agent.started
- agent.message.sent
- tool.requested
- tool.completed
- approval.requested
- approval.granted
- approval.denied
- agent.completed
- review.failed
- quest.completed
- quest.failed

Replay is important: the user should be able to see what happened while away.

### 6. Governance and safety

Game mechanics must not obscure responsibility.

Required safety concepts:

- permission tiers per agent
- human approval gates
- audit logs
- Standard mode with real/user-entered/derived data only
- optional isolated Demo mode
- dry-run/action-preview controls for configured real workflows
- rollback notes where possible
- explicit warnings for external/destructive actions

## Gamification mechanics

Useful mechanics only. Avoid shallow points that do not improve understanding.

### Labs as operational modules

Each lab should map to a real work loop. Labs are not just rooms on a map; they are persistent operational systems.

Seed lab examples from AndrooAGI/Kenn context:

- **Etsy business lab** — generates Etsy product ideas, researches competitors, creates/listing assets, connects Printify-style fulfillment, publishes to a live Etsy shop through approved/gated automation, and graduates from supervised design feedback to trusted autonomy.
- **Fiverr thumbnail lab** — receives customer thumbnail requests, generates AI thumbnail candidates, routes them through QA agents, finalizes approved work, and delivers output back to the customer for a fee.
- **Research / market intelligence lab** — continuously studies active businesses, competitors, trends, and opportunities, then routes findings to the relevant lab.
- **Media/marketing lab** — turns product assets into TikTok slideshows, UGC-style ads, YouTube uploads, or other distribution content.
- **Music generation lab** — has a dedicated music/DJ agent that creates audio assets, moves outputs down a conveyor-belt workflow, and routes finished work to YouTube or other publishing/distribution channels.
- **Game/asset production lab** — generates game assets or visual asset packs and publishes/sells them on marketplaces.
- **Blog / affiliate lab** — writes articles and tracks affiliate-product placement, compliance, and commission performance.
- **Skill armory** — discovers, quarantines, inspects, replicates, approves, and manages agent skills/capabilities.
- **Training / feedback lab** — captures approve/reject/iterate notes that improve agent output before allowing higher autonomy.
- **Archives / memory lab** — stores durable context, feedback, preferences, decisions, and business knowledge for agent retrieval.
- **Treasury / cost-control lab** — tracks monthly agent/model/tool/API cost, budget, revenue, ROI, and runaway-spend risk.
- **War Room / strategy lab** — daily/weekly agent review of what is working, what is not, and what changes to try next.
- **Blueprint / systems architecture lab** — turns intake forms into implementation blueprints and routes work to the right downstream lab.

### Agent XP

Agents gain XP for completed tasks, clean handoffs, passing review, and low retry rates.

### Skill progression

Agents can level skills such as:

- research
- coding
- writing
- review
- planning
- data analysis
- customer support
- memory retrieval
- tool use

### Buildings as capabilities

Buildings unlock capabilities:

- Library: knowledge retrieval
- Workshop: code/content creation
- Review chamber: QA/governance
- Portal hub: external APIs/tools
- Memory archive: long-term context
- Observatory: monitoring/analytics
- Training dojo: evals and practice tasks

### Quests and campaigns

A goal can become a campaign with multiple quests.

Example campaign:

```text
Launch a product landing page
  Quest 1: Research competitors
  Quest 2: Draft positioning
  Quest 3: Build page prototype
  Quest 4: Review copy and UX
  Quest 5: Prepare launch checklist
```

### World health

The ecosystem has health indicators:

- blocked task count
- failed handoffs
- unreviewed outputs
- stale memory / archive drift
- tool errors
- agent overload
- approval backlog
- labs stuck in supervised/training mode
- external-action risk backlog
- monthly agent/tool spend
- lab ROI / revenue vs cost
- strategy-review items not acted on

### Lab maturity

Labs should not jump from prototype to full autonomy.

Suggested maturity states:

- **draft** — lab exists as a design/spec only
- **demo** — isolated synthetic walkthrough; never contributes to Standard operation
- **supervised** — real work can be generated, but human review is required
- **training** — approve/reject feedback is actively collected to shape output quality
- **trusted** — agent can perform bounded routine work with audit logging
- **autonomous-with-audit** — agent can publish/deliver inside strict permissions and monitoring
- **suspended** — lab is paused because quality, safety, cost, or platform risk is too high

## MVP vertical slice

The first operational vertical slice must prove a closed, supervised feedback loop—not just a forward pipeline:

```text
Owner defines a measurable product hypothesis
  → Ultron decomposes and routes it
  → Nova gathers attributable market evidence
  → Pixel prepares an original, product-format-aware visual candidate
  → Forge prepares a supervised product/listing experiment
  → Jared defines a bounded demand test
  → Treasury checks contribution margin, spend guardrails, and cash exposure
  → Governor checks quality, policy, IP/trademark, and approval requirements
  → human approval gate pauses consequential action
  → configured fulfillment/customer outcome records actual result
  → Archives + Feedback preserve outcome evidence
  → Nova receives the learning return for the next opportunity packet
```

The UI must make the loop explicit: current stage, completed evidence, the next blocked prerequisite, Treasury guardrails, and the return path from results to the next research decision. Standard mode must never invent a sale, cost, order, return, or profit merely to animate the loop.

## Core station/agent set

### Human Operator / Command Chair

Role: oversees the whole system, approves risky actions, inspects revenue/performance, and steers priorities.

MVP behavior: command deck panel with global status, pending approvals, and lab metrics.

### Steward / Orchestrator

Reference name from AndrooAGI: Ultron.

Role: main coordinating agent that keeps the operation running, routes work, checks lab state, and escalates to the human.

Initial behavior: deterministic orchestrator that moves a configured work order between labs, plus an articulation flow that turns a human-described lab idea into a proposed room/agent/workflow blueprint. Demo mode may run the isolated walkthrough.

### Research Agent / Research Lab

Reference name from AndrooAGI: Nova.

Role: researches businesses, competitors, trends, products, and opportunities; converts market evidence into structured opportunity packets; sends those packets to production labs such as Forge.

Initial behavior: produces an Etsy opportunity packet only from configured, attributable evidence. If evidence is unavailable, Nova blocks with a setup requirement. Demo mode may use isolated synthetic evidence.

### Factory Agent / Factory Lab

Reference name from AndrooAGI: Forge.

Role: turns research into listings/products/assets and connects to fulfillment/storefront platforms such as Printify/Etsy.

Initial behavior: creates a product/listing packet from a valid opportunity packet, preserving provenance and honest publish/fulfillment state.

### Design Agent / Design Studio

Reference name from AndrooAGI: Pixel.

Role: creates visual assets, designs station/room visuals, and handles customer-order creative work such as Fiverr thumbnails.

Initial behavior: uses configured rendering/image tools to create a visual candidate and sends it to review; without a renderer it blocks or creates only a clearly identified user-requested local draft.

### Communications Agent / Communications Deck

Reference name from AndrooAGI: Cipher.

Role: monitors/responds to emails, comments, social messages, support channels, and notifies the human/steward about important inbound signals.

MVP behavior: simulates an inbound customer/comment signal and routes it into the appropriate lab.

### Treasury Agent / Treasury Room

Reference name: Caspian.

Role: protects cash and decision quality for Revenue Forges by reconciling approved financial evidence, calculating unit economics, and setting clear budget, contribution-margin, CAC, stop, iterate, and scale guardrails. Caspian does not move money, connect accounts, spend, or give professional financial/tax/legal advice.

Initial behavior: returns an evidence-labeled Finance Guardrail Packet to the human/steward. Without approved and reconciled source data, Caspian shows `unconfigured`, `estimate`, or `hold` rather than inventing a balance, cost, revenue, or profit.

### Reviewer / Governance Station

Role: checks quality, risk, policy, customer requirements, and acceptance criteria before delivery or publishing.

Initial behavior: pass/fail review of actual workflow outputs with notes, provenance, and an approval gate; Demo review remains isolated.

## Orchestration model

Use an event-driven contract in both Standard and Demo modes.

Core objects:

```text
WorldState
Agent
Quest
Task
Message
ToolRequest
ApprovalRequest
Event
```

Standard mode starts with empty operational collections. Events come from real/user actions and configured adapters. Demo fixtures are available only through the isolated Demo adapter.

## Design direction

Bundled visual tone: animated pixel-art sci-fi spaceship cutaway. Commissioned visual tone: the selected visual presentation applied coherently to the selected world template. Pixel Art is optional for every theme. Never fall back to corporate dashboard sludge.

Primary visual reference:

- the generated Agentarium concept image / current attached screenshot: a full-ship pixel-art cutaway with connected rooms, animated tiny agents, glowing corridors, room labels, consoles, factories, memory graphs, approval chambers, and status panels.

Possible supporting references:

- strategy-game base management screens
- isometric RPG interiors
- miniature diorama rooms
- pixel-art management sims
- mission-control interfaces used as overlays, not as the whole product
- cozy cyberpunk workshops

Must-have UX qualities:

- readable from ship-overview distance
- inspectable through room and agent zoom levels
- full-screen immersive layout
- rooms look like room interiors, not labeled boxes
- agents look like characters/sprites with visible state
- clear double-click navigation: ship → room → agent
- clear status colors, labels, and animation
- visible handoffs through corridors/pipelines
- inspectors/audit trails available as overlays
- no hidden magic

## Risks

### Risk: building a toy instead of an operational tool

Mitigation: every animation maps to event data and every event is inspectable.

### Risk: overbuilding too early

Mitigation: start with three agents and one workflow.

### Risk: unsafe autonomy hidden behind gamification

Mitigation: approvals, permissions, audit logs, dry-run mode.

### Risk: 3D complexity delays product learning

Mitigation: build a simple scene first; keep a 2D inspector for details.

## Long-term possibilities

- real Hermes/Codex/Claude/OpenCode agent adapters
- agent marketplace/import templates
- multi-user worlds
- team workspaces
- shared quests/campaigns
- replayable incident reviews
- training/eval arenas
- agent personality/role evolution
- world mods/themes
- VR/AR command room later

## Product completion and proof discipline

Agentarium uses separate verdicts so prototype polish cannot masquerade as product completion:

1. **Prototype phase complete** — the browser experience and its local contracts are coherent and verified.
2. **Operational vertical slice complete** — one real supervised owner→Ultron→evidence→artifact→review→approval→delivery→replay flow runs through backend authority.
3. **Feature complete** — the committed release scope is implemented with no open release-blocking gaps.
4. **Release candidate** — security, privacy, migrations, diagnostics, release checks, and candidate evidence pass.
5. **Installed product proven** — clean installation, launch, upgrade, rollback, export/restore, and recovery are exercised against packaged artifacts.
6. **Product claims proven** — every active claim in `docs/PRODUCT_CLAIMS.md` has current evidence and no contradictory open bug.

The current app can satisfy browser-prototype claims without satisfying later gates. Authoritative verdicts live in `qa/STATUS.md`; lane-level tests must never be reported as product-wide completion.
