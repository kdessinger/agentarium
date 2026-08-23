# Agentarium Phase 2 implementation notes

## Active source

`app/` is the only active application. `legacy/phase2-first-pass` is ignored, inactive reference material and is not imported, served, or built.

## Runtime shape

- Vite + React + TypeScript.
- Browser-local versioned configuration for the local prototype.
- Repository concept art is served read-only through Vite's `publicDir: '../assets'`.
- No credential, provider, paid generation, external write, publishing, spending, destructive action, or expanded autonomy is activated.

## Commissioning

Fresh startup renders `CommissioningGuide` in a construction bay. The interview order is visual presentation, operating mode, world template, editable agent manifests, editable Forge/business definitions, editable operations/governance, then complete blueprint review. Standard is the default. Custom Visual Style and Custom Theme require a description plus explicit interpretation confirmation.

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
- Leaving Demo requires confirmation and offers to purge Demo before returning to the separately preserved Standard workspace.

## World interaction

The image-first path is World Overview → Room View → Agent View. Bundled Spaceship + Pixel Art uses transparent normalized hotspots and DOM labels over the whole-ship background; keyboard Enter activates each room. Non-bundled placeholder worlds disable spaceship geometry and expose the named room chooser on every viewport. Narrow/touch layouts also use that chooser. Room agents respond to click, double-click, and keyboard activation.

Audit, blocked dependency state, Demo purge, approval records, event details, and working previous/next/exit replay controls are secondary overlays. Replay reads recorded snapshots only and does not invoke adapters or mutate current state.

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

The Impeccable detector reports one advisory for the construction-bay blueprint grid. The grid is intentionally restricted to the in-world construction surface; no warning-level findings remain.
