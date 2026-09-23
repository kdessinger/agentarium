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

Build a small operational vertical slice first. Standard mode starts empty and blocks until required dependencies are configured; an isolated Demo mode may exercise the same UI with synthetic fixtures:

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
8. Clear adapter boundaries, provenance, and honest empty/unconfigured/error states. Demo fixtures exist only in explicitly selected Demo mode.

Real agent execution is commissioned incrementally through supervised adapter boundaries and approval gates. Standard mode never fabricates activity while integrations are being configured.

## Non-goals for the first prototype

- no unbounded or unapproved autonomous external actions
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
- adapter registry for real/user-entered/derived data plus a separately isolated Demo fixture adapter

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


## Post-Phase-2 visual correction

Kenn reviewed the first implemented prototype and said it is an interesting start, but the desired direction is much closer to the generated Agentarium concept image: an animated pixel-art / video-game-like interactive space-station experience.

The key interaction model is now:

```text
Ship Overview → Room View → Agent View
```

- Ship Overview shows the whole station and all rooms as pixel-art diorama rooms with ambient animations.
- Double-clicking a room opens Room View, showing the room's profile, agents/subagents, tools, packets, queues, and current work.
- Double-clicking an agent opens Agent View, showing a character/profile interface where the agent's function, tools, permissions, and future behavior can be inspected and eventually modified.

The current dashboard-like prototype should be treated as a legacy Demo/state-contract proof, not the final UI or Standard-data direction. Future refinement should preserve its event/approval contracts while moving the interface toward a living spatial management world and enforcing Standard/Demo isolation.


## Self-building commissioning direction

Kenn wants Agentarium to become a self-building application. On first startup, Ultron / the Steward should meet the installer in-world and begin with the founder-to-orchestrator loop: what are we building, which outcomes matter, what boundaries are non-negotiable, and how should the steward work with the owner? The interview then covers Standard/Demo mode, agent purpose/provider/model/tool/permission choices, business/Forge workflows, and governance/installation questions. Only after the operating model makes sense does it ask for visual presentation—Pixel Art, Illustrated 2D, Isometric 3D, Cinematic/Realistic, Clean Vector/Graphic, or Custom—and the world template: Space Station, Spaceship, Cruise Ship, Underground Bunker, Skyscraper, Resort, Sky Ship, Battleship, Modern Corporate Office, or Custom Theme. Pixel Art is optional for every template. Visual style and world topology are independent: changing style must not rebuild agents, rooms, workflows, memory, or approvals.

The system then shows a reviewable blueprint. After approval, bounded background builder agents visibly create/select the ship and room art, build declarative agent/workflow manifests, validate safety boundaries, and assemble the configured application. The completed ship is then presented to the owner.

Commissioning must explicitly choose **Standard** or **Demo** mode. Standard is the default and begins with no operational records; it uses only real, user-entered, or derived data with provenance and shows empty/unconfigured/blocked/error states when dependencies are absent. Demo mode is optional, synthetic, non-networked, visibly labelled, stored separately, purgeable, and unable to affect Standard memory, metrics, maturity, budgets, feedback, or decisions.

This is configuration-driven commissioning, not uncontrolled self-modifying code. Bundled concept art must support a fully local/offline setup; real paid generation, credentials, and external integrations remain separately approval-gated. Art backgrounds come first, then hotspots, sprites, and animation.

## Current implementation and authority

As of 2026-08-30, `app/` is a verified browser-local commissioning and spatial-world prototype. The Ultron-first nine-step lane, migration/recovery paths, Standard/Demo isolation, deterministic local build jobs, World → Room → Agent navigation, replay, and desktop/narrow layouts have automated coverage. The opening is a mission-first owner↔Ultron exchange; visual style and world template do not appear until the operating model is defined.

That evidence does **not** prove the planned backend/API authority, real provider/tool execution, the genuine supervised Nova→Forge/Developer→Governor flow, packaged installation, updater/rollback, backup/restore, disaster recovery, or broad product claims. Start with `docs/START_HERE.md`; current gate verdicts are in `qa/STATUS.md`, and active work is in `docs/NEXT.md`.
