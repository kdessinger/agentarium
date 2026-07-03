# CONTEXT.md — Agentarium

This file gives a fresh AI/IDE agent enough context to work on Agentarium without re-discovering the idea from scratch.

## Origin

Kenn wants to start a new project around an AI agent ecosystem with gamification on a spatial canvas.

The original inspiration came from **AndrooAGI**, whose videos show an AI-agent “dungeon in space” made of connected labs/rooms. Kenn does **not** like the term “dungeon”; the desired direction is a **master spatial system** or **AI operations canvas** where individual AI labs are connected and visible.

Bryan/Hermes HQ appears to be downstream/commercialized inspiration from the same internet subculture, but comments suggest much of that product is static or amateur-level. AndrooAGI appears to be the higher-skill reference.

The seed idea: multiple specialized AI agents work together on complex goals. Each agent has a role, the system has an orchestration layer, agents communicate through defined workflows, and the whole ecosystem is monitored, tested, and refined over time.

Agentarium adds the missing product twist: make the ecosystem visible and steerable as connected AI labs on a gamified operational canvas.

## Core concept

Represent the agent ecosystem as a connected operational canvas:

- **Labs/rooms** are specialized AI departments, each responsible for a class of work.
- **Agents** are workers inside labs, with names, roles, tools, permissions, skill levels, reliability, and current assignments.
- **Tasks** are intake forms, jobs, contracts, missions, or work orders.
- **The orchestrator** is mission control: it routes work to the right lab and agent team.
- **Tools and integrations** are machines, terminals, workshops, portals, or connected accounts inside labs.
- **Workflows** are conveyor belts, queues, paths, message routes, or pipeline links between labs.
- **Memory/knowledge** is a library, archive, map room, or shared knowledge store.
- **Human approval** is a gate, checkpoint, council chamber, or command console.
- **Logs and telemetry** are world history, replay, event scrolls, and inspectable timelines.

## Product thesis

People struggle to trust and manage multi-agent systems because the work is invisible. Agentarium makes AI collaboration observable, steerable, and emotionally intuitive.

The world should answer:

- Who is working on what?
- Why did the orchestrator choose that agent?
- What did one agent hand to another?
- What is blocked?
- What needs my approval?
- What improved over time?
- What happened while I was away?

## MVP scope

Build a simulated vertical slice first:

1. One 3D world scene.
2. Three specialized agents:
   - Researcher
   - Builder/Coder
   - Reviewer/Governor
3. One orchestrator.
4. Quest/task board.
5. Agent message/handoff visualization.
6. Event log and replay.
7. Human approval gate for risky actions.
8. Mock backend data with clear API boundaries.

Real agent execution comes after the simulation proves the interface.

## Non-goals for the first prototype

- no real autonomous external actions
- no billing
- no marketplace
- no plugin store
- no giant agent swarm
- no production auth
- no invisible vendor-owned backend
- no unbounded agent loops

## Likely stack

Frontend prototype:

- Next.js or Vite React
- React Three Fiber / Three.js
- Zustand or lightweight state store
- Tailwind or CSS modules
- mock API module for world/task/agent data

Backend later:

- FastAPI or Node service
- Postgres or SQLite initially
- Redis/event queue later
- WebSocket/SSE for live events
- adapter layer for Hermes, Claude Code, Codex, OpenCode, AutoGen, LangGraph, Flowise, etc.

## Important design stance

The 3D layer is not merely a skin. It is a model of operational state.

If an agent walks to the library, the underlying event should mean it is retrieving knowledge. If it enters the workshop, it is building. If it waits at a gate, approval is required. If it sends a message, the event log should show the payload summary.

Every visual metaphor should map to a real system state.
