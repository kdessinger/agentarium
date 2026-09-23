# Agentarium Phase 2 implementation notes

## Active source

`app/` is the only active Agentarium application. `legacy/phase2-first-pass` is ignored, inactive reference material and is not imported, served, or built. The bundled `starnet/` tree is also read-only product-completeness reference material, not an Agentarium runtime or build input.

## Runtime shape

- Vite + React + TypeScript.
- Browser-local versioned configuration for the local prototype.
- Repository concept art is served read-only through Vite's `publicDir: '../assets'`.
- No credential, provider, paid generation, external write, publishing, spending, destructive action, or expanded autonomy is activated.

## Commissioning

Fresh startup renders `CommissioningGuide` as Ultron / the Steward in a construction bay. The nine-step order is owner-to-steward articulation, operating mode, editable agent manifests, editable Forge/business definitions, editable operations/governance, visual presentation, world template, complete blueprint review, then truthful local build and final presentation. Step 1 is presented as an owner↔Ultron mission exchange: mission is primary, the working contract is secondary, and the mission field receives initial focus. A meaningful mission is required before continuing. Standard is the default. Custom Visual Style and Custom Theme require a description plus explicit interpretation confirmation.

The world-template step uses ten distinct representative 640×360 concept thumbnails plus a larger selected-theme preview showing topology, movement, command-area terminology, and materials. It explicitly states that each commissioned world is custom and unique: previews communicate direction and do not lock or clone the final generated world. Modern Corporate Office remains first/default; Spaceship + Pixel Art remains the bundled-art path.

Commissioning progress and build jobs use separate localStorage keys:

- `agentarium:standard:commissioning:v2` / `agentarium:demo:commissioning:v2`
- `agentarium:standard:commissioning-step:v2` / `agentarium:demo:commissioning-step:v2`
- `agentarium:standard:build-jobs:v2` / `agentarium:demo:build-jobs:v2`
- `agentarium:standard:active:v2`
- `agentarium:demo:active:v2`

A recommission is a separately visible draft. The current active record remains selectable and unchanged until all local jobs pass and the user approves the final presentation. Deny and revise paths do not replace it. Incomplete drafts expose validated Resume, Restart with preserved backup, Inspect, Export, and Import controls. Malformed JSON and unsupported schemas are not trusted.

## Truthful builder

The eight local jobs are dependency-ordered and advance only through an explicit user action. Every handler performs and validates a scoped local output. Each attempt stores an attempt ID, start/completion timestamps, plan-bound inputs, structured result or error, and validation checks. Hydration rejects stale or forged completion records. Completed jobs are idempotent on resume. Pause/resume, cancellation, failure injection/retry, and resumable one-room asset replacement/review are available; rejecting a proposal restores the prior asset. There is no progress timer or direct planned→complete fabrication.

Spaceship + Pixel Art maps to bundled whole-ship and room backgrounds through authored compartment polygons. Every hotspot target is validated. Every other world/style combination receives explicit placeholder assets with retained prompts in World, Room, and Agent views; no mismatched spaceship art or remote generation is substituted. Templates alter room terminology, topology/adjacency order, movement metaphor, materials, zones, and art direction. Visual-style changes preserve operational topology/data and mark only visual assets for replacement.

## Data boundaries

Standard operational storage: `agentarium:standard:v1`; active commissioning storage: `agentarium:standard:active:v2`.

- Starts with empty quests, events, packets, evidence, memories, metrics, feedback, and approvals; user commissioning approval/presentation then appends real user-entered audit records.
- Rejects `synthetic_demo` provenance.
- Cannot resolve `DemoFixtureAdapter`.
- Missing evidence/provider setup returns a typed blocked result and no packet.

Demo operational storage: `agentarium:demo:v1`; active commissioning storage: `agentarium:demo:active:v2`.

- Created only after explicit Demo commissioning (or direct E2E setup).
- Uses only `demo:*` IDs and `synthetic_demo` provenance.
- Resolves only the non-networked fixture adapter.
- Cannot resolve production adapters or production write adapters.
- Is visibly bannered and purgeable without touching Standard storage.
- Leaving Demo requires a high-contrast confirmation with clearly distinct `Stay in Demo` and destructive confirmation actions, an explicit Standard-data safety explanation, and an optional purge. The actions stack on narrow screens; the cancel path never inherits raw browser-default styling.

## World interaction

The image-first path is World Overview → Room View → Agent View. Bundled Spaceship + Pixel Art uses authored compartment polygons traced against the actual cross-section art plus transparent HTML activation controls sharing the image's uncropped normalized coordinate transform. Keyboard Enter/Space and single click/tap activate rooms. A visible QA capture at `app/visual-evidence/hotspot-alignment.png` shows every control boundary against the ship.

Room View renders the primary agent at 80px instead of a micro-sprite and includes a collapsible `Room Work` surface. It associates quests, packets, evidence, approvals, feedback, and events to the room/agents and shows IDs, status, summary, and provenance. Standard mode with no work displays an honest empty state. Demo mode exposes its isolated Nova → Forge → Pixel → Governance walkthrough directly in the room rather than only in Audit.

Bundled Agent View loads approved-source portrait files from `assets/concept-art/agents/portraits/` and displays current work beneath the agent profile. Unknown/custom agents retain an honest initial/placeholder. Non-bundled placeholder worlds disable spaceship geometry and expose the named room chooser/cards on every viewport; narrow/touch layouts also use the chooser.

Audit, blocked dependency state, Demo purge, approval records, event details, and working previous/next/exit replay controls remain secondary overlays. Replay reads recorded snapshots only and does not invoke adapters or mutate current state.

## Verification

From `app/`:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
npm run visual:check
```

`visual:check` captures first-run and completed-world screenshots at 1440×900 and 390×844, reports viewport/document dimensions, and writes ignored evidence under `app/visual-evidence/`.

Verified on 2026-08-30 after the Ultron-first visual refinement:

- unit: 54/54 passed across four files
- lint: clean
- production build: clean
- Playwright: 41 passed, one intentional desktop skip for the narrow-only chooser
- visual capture: desktop and narrow documents matched their viewports
- Impeccable detector: `[]`

This is commissioning/browser-prototype evidence. It does not prove a real backend runtime, real providers/tools, packaged installation, update/rollback, disaster recovery, or product-wide completion. See `../qa/STATUS.md`.
