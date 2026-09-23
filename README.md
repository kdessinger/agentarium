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

## Project authority

Start with `docs/START_HERE.md`. The curated living authority is deliberately small:

- `docs/START_HERE.md` — current truth, reading order, and proof boundary.
- `CODE_MAP.md` — actual repository/runtime map.
- `docs/INDEX.md` — documentation classes and authority rules.
- `docs/DECISIONS.md` — locked product and architecture decisions.
- `docs/MISTAKES.md` — costly traps and the laws that prevent repeats.
- `docs/NEXT.md` — active work and sequencing.
- `docs/PRODUCT_CLAIMS.md` — claims, proof requirements, and current verdicts.
- `qa/STATUS.md` — verification evidence and completion-gate verdicts.

Supporting product docs remain important but do not override that set:

- `PRODUCT_BLUEPRINT.md` — product vision and mechanics.
- `ARCHITECTURE.md` — target technical boundaries.
- `MVP_PLAN.md` — historical implementation plan.
- `BUILDER_PROMPT.md` — early frontend-builder prompt.
- `AGENTS.md` / `CONTEXT.md` — worker instructions and handoff context.

## Working principle

Start with a clean Standard installation, explicit adapter boundaries, and supervised actions. Standard mode must not fabricate activity while providers, tools, or integrations are being configured. Optional Demo mode is a separate synthetic walkthrough for evaluation and training.

Do not begin by building a giant autonomous swarm. Begin with a few configured agents, one orchestrator, visible messages, quest state, approval gates, provenance, and a replayable activity log.

## Phase 2 self-commissioning application

The active browser application lives in `app/`. A fresh browser starts inside an animated construction bay with Ultron acting as the commissioning steward. The owner first articulates the mission, desired outcomes, boundaries, and working relationship; then reviews mode, agents, Forges, governance, visual style, and world inputs. The installer inspects the complete articulation/topology/permission/asset/cost blueprint, then explicitly approves bounded local build jobs and the final presentation.

The bundled offline path is **Spaceship + Pixel Art** and uses `assets/concept-art/` plus its authored compartment hotspots. Other world/style combinations retain complete art prompts, disable mismatched spaceship hotspot geometry, and show honest placeholders with an explicit room chooser until matching generation is separately configured and approved.

After commissioning, the primary navigation is:

```text
World Overview → Room View → Agent View
```

Standard mode is the default and starts with no operational records. Demo mode is explicit, visibly bannered, non-networked, stored separately, uses `demo:*` IDs plus `synthetic_demo` provenance, and can be purged without changing Standard.

Browser persistence is schema-versioned and validated before hydration. Standard and Demo active workspaces use separate v2 keys; malformed, cross-mode, Demo-namespaced, and invalid-provenance records are rejected into a recoverable path. An incomplete draft opens Resume, Restart with backup, Inspect, Export, and Import controls instead of being silently trusted.

Each local build attempt records its ID, timestamps, plan-bound inputs, validated result or error, and checks. Hydration rejects forged or stale completion state. Build controls support pause/resume, cancellation, deliberate failure/retry testing, idempotent completed jobs, and resumable one-room asset replacement/review with safe restoration on rejection. Replay advances through recorded events without invoking adapters or mutating the current world.

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
npm run visual:check
npx --yes impeccable@latest detect --json src
```

These commands prove the current browser prototype and commissioning lane only. Product-wide verdicts live in `qa/STATUS.md`; a green lane is not evidence of backend authority, packaging, installation, update, recovery, or complete product claims.

### Manual smoke procedure

1. Clear site storage and reload; confirm the in-world Commissioning Guide appears before any finished world.
2. Confirm all six visual presentations, Standard/Demo, and all ten world templates are available independently.
3. Give Ultron a mission, complete Standard commissioning with Spaceship + Pixel Art, and confirm the blueprint preserves the articulation answers before visual/topology details.
4. Approve the build and run each local build job; confirm progress changes only when a job completes.
5. Present the world, double-click The Bridge, then double-click Ultron. Use the narrow room chooser on a touch-width viewport.
6. Open Audit and confirm Standard operational collections are empty and missing providers block honestly.
7. Recommission and confirm the active world remains available until the draft is approved and presented.
8. Commission Demo separately; confirm the persistent banner, namespaced synthetic records, purge control, and no Standard influence.
9. Refresh mid-draft; verify the recovery screen can resume, inspect, export/import, or restart while preserving a backup.
10. In the build console, inspect a completed attempt, pause/resume, inject and retry a failure, and replace one room asset.
11. In Demo, choose Leave Demo and verify confirmation offers to purge Demo while preserving Standard.

Implementation boundaries and verified behavior are documented in `app/IMPLEMENTATION_NOTES.md`.
