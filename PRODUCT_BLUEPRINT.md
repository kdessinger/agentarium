# Agentarium Product Blueprint

## Vision

Agentarium is a gamified 3D operating environment for AI agent ecosystems. It lets a human define goals, watch specialized agents collaborate, approve risky steps, inspect reasoning trails, and improve the agent colony over time.

The product should feel like a cross between:

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

### 1. World view

A full-viewport 3D scene showing agents, buildings, task objects, message routes, and current activity.

Minimum world elements:

- Agent avatars
- Quest board / command center
- Research library
- Builder workshop
- Review/governance chamber
- Memory archive
- Tool portals
- Approval gate
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
- stale memory
- tool errors
- agent overload
- approval backlog

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

## First three agents

### Researcher

Role: gather information, summarize options, cite sources later.

MVP behavior: simulated research result from mock data.

### Builder

Role: produce the artifact requested by the quest.

MVP behavior: simulated build output, such as generated document/code snippet/card.

### Reviewer

Role: check quality, risk, policy, and acceptance criteria.

MVP behavior: simulated pass/fail review with notes.

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
