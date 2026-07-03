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

A full-viewport 2D/3D canvas showing connected AI labs, agents, task objects, pipeline routes, and current activity.

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

### 4. Orchestrator console

The orchestrator decides how work is split and routed.

The console should show:

- task decomposition
- agent selection rationale
- parallel vs sequential plan
- handoff chain
- risk classification
- pending approvals
- retry/escalation rules

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
- dry-run mode
- simulation mode
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
- **simulated** — mock inputs/outputs, no external actions
- **supervised** — real work can be generated, but human review is required
- **training** — approve/reject feedback is actively collected to shape output quality
- **trusted** — agent can perform bounded routine work with audit logging
- **autonomous-with-audit** — agent can publish/deliver inside strict permissions and monitoring
- **suspended** — lab is paused because quality, safety, cost, or platform risk is too high

## MVP vertical slice

The first build should prove one loop:

```text
Human creates quest
  → Orchestrator decomposes it
  → Researcher gathers simulated findings
  → Builder creates simulated output
  → Reviewer checks it
  → Approval gate appears if needed
  → Quest completes
  → World replay shows what happened
```

## Core station/agent set

### Human Operator / Command Chair

Role: oversees the whole system, approves risky actions, inspects revenue/performance, and steers priorities.

MVP behavior: command deck panel with global status, pending approvals, and lab metrics.

### Steward / Orchestrator

Reference name from AndrooAGI: Ultron.

Role: main coordinating agent that keeps the operation running, routes work, checks lab state, and escalates to the human.

MVP behavior: deterministic orchestrator that moves a simulated work order between labs.

### Research Agent / Research Lab

Reference name from AndrooAGI: Nova.

Role: researches businesses, competitors, trends, products, and opportunities; sends structured findings to production labs.

MVP behavior: produces a mock opportunity packet.

### Factory Agent / Factory Lab

Reference name from AndrooAGI: Forge.

Role: turns research into listings/products/assets and connects to fulfillment/storefront platforms such as Printify/Etsy.

MVP behavior: creates a mock product/listing packet from research.

### Design Agent / Design Studio

Reference name from AndrooAGI: Pixel.

Role: creates visual assets, designs station/room visuals, and handles customer-order creative work such as Fiverr thumbnails.

MVP behavior: creates a mock thumbnail/product visual candidate and sends it to review.

### Communications Agent / Communications Deck

Reference name from AndrooAGI: Cipher.

Role: monitors/responds to emails, comments, social messages, support channels, and notifies the human/steward about important inbound signals.

MVP behavior: simulates an inbound customer/comment signal and routes it into the appropriate lab.

### Reviewer / Governance Station

Role: checks quality, risk, policy, customer requirements, and acceptance criteria before delivery or publishing.

MVP behavior: simulated pass/fail review with notes and approval gate.

## Orchestration model

Use an event-driven contract even in the mock prototype.

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

The frontend can start with mock state, but should behave as if live events are coming from a backend.

## Design direction

Visual tone: warm sci-fi command village. Not corporate dashboard sludge.

Possible references:

- strategy-game town map
- miniature diorama
- mission control
- fantasy guild hall
- cozy cyberpunk workshop

Must-have UX qualities:

- readable from a distance
- inspectable up close
- full-screen immersive layout
- clear status colors
- visible handoffs
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
