# Agentarium Code Map

This map describes the repository as it exists now. It is not a future directory sketch.

## Active application

`app/` is the only active executable application.

```text
app/
  package.json                 Vite/React scripts and dependencies
  playwright.config.ts        desktop + narrow E2E configuration
  vite.config.ts              app build and concept-art public directory
  src/
    main.tsx                   React entry point
    App.tsx                    commissioning shell and top-level world views
    styles.css                 core commissioning/world presentation
    rework.css                 recovery, structured editors, room-work, gallery, articulation styles
    components/
      WorldScene.tsx           world overview, hotspots, routes, agents
      FeedbackLoopPanel.tsx    current-stage and learning-return overlay for revenue Forges
      WorldScene.css           world animation and scene presentation
      RoomDiorama.tsx          room interior and room-work view
    lib/
      commissioning.ts         commissioning contracts, defaults, validation, plan creation
      persistence.ts           schema-v2 storage, compatibility hydration, import/recovery
      build.ts                 deterministic local build jobs and asset review
      modes.ts                 Standard/Demo operational state and adapters
      world.ts                 room/agent/world contracts and seeded configuration
      presentation.ts          world templates, styles, art selection, topology projection
      feedbackLoop.ts          closed-Forge loop state derived from actual operational records
      animation.ts             deterministic sprites and route animation math
      domain.test.ts           commissioning, modes, build, persistence contracts
      rework.contract.test.ts  recovery/rework and safety contracts
      presentation.test.ts     presentation/topology contracts
      animation.test.ts        animation timing/state contracts
  tests/
    commissioning.spec.ts      full desktop+narrow browser behavior
  scripts/
    visual-check.mjs           canonical desktop+narrow visual capture
    verify-*.mjs               focused/manual visual probes
    install-*.py               local concept-art installation helpers
  visual-evidence/             generated ignored screenshots, not source authority
  dist/                        generated production build, not source authority
```

## Product and worker authority

```text
AGENTS.md                      worker rules
CONTEXT.md                     fresh-worker context
README.md                      product/run overview
PRODUCT_BLUEPRINT.md           product vision and mechanics
ARCHITECTURE.md                target architecture
CODE_MAP.md                    this actual code/repository map
docs/START_HERE.md             current truth and reading order
docs/DECISIONS.md              locked decisions
docs/NEXT.md                   active sequence
docs/PRODUCT_CLAIMS.md         claim ledger
docs/INDEX.md                  documentation classification
qa/STATUS.md                   completion gates and evidence
qa/bugs.json                   structured bug register
```

## Art and presentation sources

```text
assets/concept-art/            bundled ship, room, agent, and template art
docs/art/IMAGE_PROMPTS.md      human-readable art prompts
docs/art/image-prompt-manifest.json
                               machine-readable prompt/asset intent
docs/art/CONCEPT_ART_ASSET_INDEX.md
                               asset index and provenance notes
```

## Plans and history

`MVP_PLAN.md`, `docs/plans/`, `docs/LEGACY_PHASE2.md`, feedback records, and old decision snapshots explain how the project arrived here. They do not override living authority. `docs/INDEX.md` records their class.

## Reference repository

`starnet/` is bundled read-only reference material used to study product completeness, operational proof, release engineering, support, and recovery. Agentarium must not copy its branding, persona, architecture, or visual identity.

## Current runtime boundary

Implemented now:

```text
Browser UI
  -> browser-local commissioning/state contracts
  -> deterministic local build/presentation functions
  -> isolated Demo fixture adapter or honest Standard blocked state
```

Target boundary, not yet implemented:

```text
Spatial client
  <-> validated command/event API
  <-> durable runtime authority
  <-> orchestrator and approval enforcement
  <-> provider/tool/agent adapters
```

Do not describe the target boundary as current code.
