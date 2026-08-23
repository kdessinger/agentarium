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

## Phase 1 prototype

The legacy browser prototype lives in `app/`. Its current deterministic fixture flow should be treated as **Demo mode only**. It is not the Standard-mode data model. The next implementation phase must add first-run Standard/Demo commissioning, empty Standard operational state, provenance, real adapter boundaries, and strict fixture isolation.

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
npm run build
npm run lint
```

### Manual smoke procedure

1. Load the app and confirm the station map fills the available viewport.
2. Select Nova Room and Nova; confirm room and agent details appear in the 2D inspector.
3. Treat the existing seeded vision and records as the legacy isolated Demo walkthrough.
4. Inspect the ordered tasks and start the Demo walkthrough.
5. Watch the Ultron → Nova → Etsy Forge → Pixel → Governance handoffs and confirm each fixture is visibly Demo-only.
6. At the approval gate, confirm the Demo walkthrough pauses and cannot perform an external action.
7. Approve and confirm the quest completes while Media Bay remains blocked from external delivery.
8. Reset, repeat, deny, and confirm the quest blocks instead of completing.
9. Use Replay to move backward and forward, then return to the unchanged live state.
10. Repeat at a narrow viewport and with reduced motion enabled.
