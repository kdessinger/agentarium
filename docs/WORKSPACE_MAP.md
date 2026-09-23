# Workspace Map

This map reflects the implemented repository. For code-level detail, see `../CODE_MAP.md`.

```text
agentarium/
  AGENTS.md                     worker rules
  README.md                     overview and local run instructions
  CONTEXT.md                    fresh-worker context
  PRODUCT_BLUEPRINT.md          product vision and proof discipline
  ARCHITECTURE.md               target technical boundaries
  CODE_MAP.md                   actual code/runtime map
  MVP_PLAN.md                   historical implementation plan
  app/                          active Vite/React/TypeScript browser prototype
    src/                        application source and unit contracts
    tests/                      Playwright desktop+narrow E2E
    scripts/                    visual checks and asset helpers
    IMPLEMENTATION_NOTES.md     browser-prototype behavior
  assets/concept-art/           bundled world, room, and agent art
  docs/
    START_HERE.md               current truth and reading order
    INDEX.md                    documentation classification
    DECISIONS.md                locked decisions
    MISTAKES.md                 recurring traps and prevention laws
    NEXT.md                     active sequence
    PRODUCT_CLAIMS.md           claim ledger
    prompts/                    living master build prompt
    plans/                      historical/detailed plans
    art/                        prompt manifests, asset index, gallery
    NEXT_DECISIONS.md           archived pre-implementation snapshot
    WORKSPACE_MAP.md            this current map
  qa/
    STATUS.md                   completion gates and execution evidence
    bugs.json                   structured bug register
  starnet/                      read-only product-completeness reference
  .hermes/handoffs/             session handoffs, not product authority
```

## Not present yet

There is no active `server/` or packaged desktop/runtime application in Agentarium. Those remain target architecture, not current repository truth.
