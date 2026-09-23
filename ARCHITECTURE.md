# Agentarium Architecture

## Architecture stance

Build the frontend as a 3D event viewer/controller first, not as the owner of agent logic.

The durable boundary is:

```text
3D Client
  ↕ events / commands
Agentarium API
  ↕ tasks / messages / approvals
Orchestrator
  ↕ adapter calls
Agent Runtimes / Tools / Models
```

Use replaceable adapter boundaries from the start. Standard mode returns configured real data or explicit empty/unconfigured/error states. Synthetic fixtures are restricted to a separately commissioned Demo mode and cannot be resolved by the Standard adapter registry.

## Layers

### 1. 3D client

Responsibilities:

- render world state
- show agents and tasks
- animate state changes
- expose inspector panels
- let the human create/approve/stop quests
- show event log and replay

Suggested stack:

- React
- Three.js / React Three Fiber
- Zustand or similar local state
- CSS/Tailwind for inspector UI
- adapter registry plus isolated Demo fixture adapter

### 2. Agentarium API

Responsibilities later:

- persist workspaces, agents, quests, events
- stream events to client
- receive human commands
- enforce auth/permissions
- expose audit log

Possible stack:

- FastAPI + Postgres/SQLite
- or Node/NestJS if staying TypeScript end-to-end

### 3. Orchestrator

Responsibilities:

- decompose quests into tasks
- select agents
- route messages
- request tool use
- pause for approvals
- retry/fail/escalate
- write events

Initial implementation can be deterministic rules. Do not need LLM orchestration on day one.

### 4. Agent adapters

Adapters connect to real agent runtimes later:

- Hermes subagents
- Codex CLI
- Claude Code
- OpenCode
- AutoGen
- LangGraph
- Flowise/Langflow
- custom Python agents

Adapter contract should separate:

- task input
- allowed tools
- installation mode: Standard or Demo
- action mode: read-only, supervised, gated-write, bounded-autonomous, or disabled
- stream events
- final result
- artifacts
- error state

### 5. Persistence

MVP frontend-only prototype:

- real/user-entered/derived records with provenance
- Demo fixtures in a separate namespace/storage partition
- optional browser localStorage for non-secret commissioning state and isolated Demo state

First backend prototype:

- SQLite
- append-only event log
- simple tables for agents, quests, tasks, messages, approvals

Production direction:

- Postgres
- event table
- object storage for artifacts
- queue/worker system
- WebSockets/SSE for live updates

## Core data model draft

### Agent

```ts
type Agent = {
  id: string;
  name: string;
  role: 'researcher' | 'builder' | 'reviewer' | 'orchestrator' | string;
  status: 'idle' | 'working' | 'blocked' | 'waiting_approval' | 'offline';
  position: { x: number; y: number; z: number };
  skills: Record<string, number>;
  permissions: string[];
  currentTaskId?: string;
  xp: number;
  level: number;
};
```

### Quest

```ts
type Quest = {
  id: string;
  title: string;
  objective: string;
  status: 'draft' | 'queued' | 'running' | 'blocked' | 'needs_approval' | 'complete' | 'failed';
  priority: 'low' | 'normal' | 'high';
  riskLevel: 'safe' | 'review' | 'external' | 'destructive';
  acceptanceCriteria: string[];
  taskIds: string[];
  createdAt: string;
  updatedAt: string;
};
```

### Event

```ts
type WorldEvent = {
  id: string;
  timestamp: string;
  type: string;
  actorId?: string;
  questId?: string;
  taskId?: string;
  summary: string;
  payload?: unknown;
};
```

### Approval request

```ts
type ApprovalRequest = {
  id: string;
  questId: string;
  taskId?: string;
  requestedByAgentId: string;
  riskLevel: 'review' | 'external' | 'destructive';
  summary: string;
  proposedAction: string;
  status: 'pending' | 'approved' | 'denied' | 'expired';
};
```

## MVP event flow

```text
quest.created
quest.decomposed
agent.assigned: Researcher
agent.started
agent.message.sent: findings to Orchestrator
agent.completed
agent.assigned: Builder
agent.started
agent.message.sent: output to Reviewer
agent.completed
agent.assigned: Reviewer
agent.started
approval.requested OR review.passed
approval.granted if needed
quest.completed
```

## Safety model

Modes:

1. **Demo** — explicit isolated synthetic walkthrough; no production tools or external actions.
2. **Dry-run** — real planning, no external writes/actions.
3. **Local read-only** — can inspect local files/tools with scoped permission.
4. **Live gated** — can perform approved external actions.
5. **Destructive gated** — requires explicit scoped confirmation.

The UI should display the current mode prominently.

## First technical milestone

A local frontend app that can:

- render the 3D world
- show three agents
- create/start one quest
- animate the quest through researcher → builder → reviewer
- show message paths/handoffs
- trigger one approval gate
- complete the quest
- show event log/replay

No real LLM calls required for milestone one.
