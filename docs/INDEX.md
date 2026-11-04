# Documentation Index

## Authority rule

When documents conflict, use this order:

1. `../AGENTS.md` for worker behavior and safety.
2. `DECISIONS.md` for locked product/architecture decisions.
3. `PRODUCT_CLAIMS.md` and `../qa/STATUS.md` for claims and current proof verdicts.
4. `NEXT.md` for active sequence.
5. `START_HERE.md` and `../CODE_MAP.md` for current orientation and repository truth.
6. Supporting specifications for detail.
7. Plans, audits, references, and archives for context only.

A newer test result can update `qa/STATUS.md`; it does not silently change a product decision.

## Living authority

| Document | Job |
|---|---|
| `START_HERE.md` | Current truth, proof boundary, reading order |
| `DECISIONS.md` | Locked decisions that require an explicit superseding entry |
| `MISTAKES.md` | Costly recurring traps and prevention laws |
| `NEXT.md` | Active work, sequencing, and near-term acceptance boundaries |
| `PRODUCT_CLAIMS.md` | Claim ledger and required evidence |
| `../qa/STATUS.md` | Current completion-gate verdicts and execution evidence |
| `../qa/bugs.json` | Structured active bug register |
| `../CODE_MAP.md` | Actual repository/runtime map |

## Supporting product specifications

| Document | Job |
|---|---|
| `../README.md` | Product overview and local run instructions |
| `../CONTEXT.md` | Fresh-worker product context |
| `../PRODUCT_BLUEPRINT.md` | Product vision, mechanics, surfaces, long-term direction |
| `../ARCHITECTURE.md` | Target architecture and contracts |
| `COMMAND_SHELL_AND_CREW_SPEC.md` | Approved post-wake shell, Captain, Crew Roster, Agent Profile, recruitment, memory, growth, and import contract |
| `TITLE_SCREEN_SPEC.md` | Locked design language and honesty rules for the fresh-install title screen |
| `WORKSPACE_MAP.md` | Current high-level repository map |
| `prompts/agentarium-master-build-prompt.md` | Detailed living build contract |
| `../app/IMPLEMENTATION_NOTES.md` | Current browser-prototype behavior and storage details |

## Plans

Plans describe intended work and may be superseded by decisions or implementation:

- `../MVP_PLAN.md`
- `plans/2026-08-21-self-building-commissioning.md`
- `kanban-phase-one-board-seed.md`

The 2026-08-21 commissioning plan is preserved historically; its visual-first order is explicitly superseded.

## Audit and evidence

- `../app/visual-evidence/` - generated local visual captures; ignored and reproducible.
- `art/CONCEPT_ART_ASSET_INDEX.md` - art inventory/evidence.
- `art/image-prompt-manifest.json` - structured art prompt/asset intent.
- `PHASE2_FEEDBACK_PIXEL_GAME_DIRECTION.md` - dated user feedback.
- `REFERENCE_RESEARCH.md` - reference research, not product authority.

## Reference

- `art/IMAGE_PROMPTS.md`
- `art/concept-art-gallery.html`
- `forges/3d-print-forge.md` — candidate supervised physical-goods Forge; workflow design only, not live-runtime evidence.
- `../starnet/` (read-only completeness reference)

## Archive / historical context

- `LEGACY_PHASE2.md`
- `NEXT_DECISIONS.md` (pre-implementation decision snapshot)
- old handoffs under `.hermes/handoffs/`

Historical documents may retain obsolete language if they carry a visible supersession notice. Do not silently rewrite history to make old plans look prescient.

## Update discipline

- Architecture or product-order change: add/supersede a decision, then update affected living docs.
- New active work: update `NEXT.md`, not an old plan.
- New claim or changed scope: update `PRODUCT_CLAIMS.md` before reporting it.
- New verification: update `qa/STATUS.md` with command, result, scope, and date.
- New bug: add it to `qa/bugs.json`; close it only with reproduction/fix evidence.
- Stale supporting doc: correct it or mark it superseded in the same change.
