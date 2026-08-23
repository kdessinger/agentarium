# Agentarium Phase 2 implementation notes

## Active source

`app/` is the only active application. `legacy/phase2-first-pass` is ignored, inactive reference material and is not imported, served, or built.

## Runtime shape

- Vite + React + TypeScript.
- Browser-local versioned configuration for the local prototype.
- Repository concept art is served read-only through Vite's `publicDir: '../assets'`.
- No credential, provider, paid generation, external write, publishing, spending, destructive action, or expanded autonomy is activated.

## Commissioning

Fresh startup renders `CommissioningGuide` in a construction bay. The interview order is visual presentation, operating mode, world template, agent manifests, Forges/businesses, governance, then blueprint review. Standard is the default.

Commissioning progress and build jobs use separate localStorage keys:

- `agentarium:commissioning:v1`
- `agentarium:commissioning-step:v1`
- `agentarium:build-jobs:v1`
- `agentarium:active:v1`

A recommission is a draft. The active record is replaced only after all local build jobs complete and the user selects **Present commissioned world**.

## Truthful builder

The eight local jobs are dependency-ordered and advance only through an explicit user action. Completed jobs have one recorded attempt and are skipped on resume. There is no progress timer. Jobs cover topology/hotspots, art selection/placeholders, declarative agents, workflow/Forges, safety gates, assembly, QA, and presentation.

Spaceship + Pixel Art maps to bundled whole-ship and room backgrounds. Every other world/style combination receives explicit placeholder assets with retained prompts; no mismatched spaceship art or remote generation is substituted.

## Data boundaries

Standard storage: `agentarium:standard:v1`.

- Starts with empty quests, events, packets, evidence, memories, metrics, feedback, and approvals.
- Rejects `synthetic_demo` provenance.
- Cannot resolve `DemoFixtureAdapter`.
- Missing evidence/provider setup returns a typed blocked result and no packet.

Demo storage: `agentarium:demo:v1`.

- Created only after explicit Demo commissioning (or direct E2E setup).
- Uses only `demo:*` IDs and `synthetic_demo` provenance.
- Resolves only the non-networked fixture adapter.
- Cannot resolve production adapters or production write adapters.
- Is visibly bannered and purgeable without touching Standard storage.

## World interaction

The image-first path is World Overview → Room View → Agent View. Desktop uses transparent normalized hotspots and DOM labels over the whole-ship background. Keyboard Enter activates each room. Narrow/touch layouts add a named room chooser. Room agents respond to click, double-click, and keyboard activation.

Audit, blocked dependency state, Demo purge, and replay explanations are secondary overlays; they do not resize or dominate the world.

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
