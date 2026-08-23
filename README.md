# Agentarium

A gamified 3D world for building, watching, and coordinating an ecosystem of specialized AI agents.

## One-sentence thesis

Agentarium turns multi-agent AI orchestration into a visible, interactive world: agents become characters, tasks become quests, tools become buildings, workflows become roads, and progress becomes something you can watch, steer, and improve.

## What this is

This project is not just a chatbot with cute graphics. It is a control surface for an AI agent ecosystem:

- specialized agents with distinct roles
- an orchestrator that assigns work
- visible task state and handoffs
- world/game mechanics that make agent behavior legible
- safety/governance gates before real-world actions
- a path from simulated prototype to real agent execution

## Core docs

- `PRODUCT_BLUEPRINT.md` — product vision, mechanics, architecture, MVP scope.
- `ARCHITECTURE.md` — technical system design and boundaries.
- `MVP_PLAN.md` — bite-sized implementation plan.
- `BUILDER_PROMPT.md` — prompt for v0/Bolt/Lovable-style frontend prototyping.
- `AGENTS.md` — instructions for AI coding agents working in this project.
- `CONTEXT.md` — handoff context for fresh agents.

## Working principle

Start with a clean Standard installation, explicit adapter boundaries, and supervised actions. Standard mode must not fabricate activity while providers, tools, or integrations are being configured. Optional Demo mode is a separate synthetic walkthrough for evaluation and training.

Do not begin by building a giant autonomous swarm. Begin with a few configured agents, one orchestrator, visible messages, quest state, approval gates, provenance, and a replayable activity log.

## Phase 2 self-commissioning application

The active browser application lives in `app/`. A fresh browser starts inside an animated construction bay with the Commissioning Guide. The installer chooses visual presentation, Standard or Demo mode, world template, agents, Forges, and governance; inspects a blueprint; then runs truthful resumable local build jobs before the world is presented.

The bundled offline path is **Spaceship + Pixel Art** and uses `assets/concept-art/`. Other world/style combinations retain complete art prompts and show honest placeholders until matching generation is separately configured and approved.

After commissioning, the primary navigation is:

```text
World Overview → Room View → Agent View
```

Standard mode is the default and starts with no operational records. Demo mode is explicit, visibly bannered, non-networked, stored separately, uses `demo:*` IDs plus `synthetic_demo` provenance, and can be purged without changing Standard.

### Run locally

```bash
cd app
npm install
npm run dev -- --host 0.0.0.0
```

Vite prints the local URL (normally `http://localhost:5173`).

### Verify

```bash
cd app
npm test
npm run lint
npm run build
npm run test:e2e
```

### Manual smoke procedure

1. Clear site storage and reload; confirm the in-world Commissioning Guide appears before any finished world.
2. Confirm all six visual presentations, Standard/Demo, and all ten world templates are available independently.
3. Complete Standard commissioning with Spaceship + Pixel Art and inspect the blueprint.
4. Approve the build and run each local build job; confirm progress changes only when a job completes.
5. Present the world, double-click The Bridge, then double-click Ultron. Use the narrow room chooser on a touch-width viewport.
6. Open Audit and confirm Standard operational collections are empty and missing providers block honestly.
7. Recommission and confirm the active world remains available until the draft is approved and presented.
8. Commission Demo separately; confirm the persistent banner, namespaced synthetic records, purge control, and no Standard influence.

Implementation boundaries and verified behavior are documented in `app/IMPLEMENTATION_NOTES.md`.
