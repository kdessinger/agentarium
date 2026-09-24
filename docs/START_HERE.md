# Start Here

This is the shortest authoritative orientation to Agentarium.

## Product

Agentarium is a spatial AI operations system. Agents are visible workers, rooms are operational modules, tasks are quests/work orders, routes are handoffs, and animations must explain real state. The world is an interface, not decoration.

Ultron is the Steward/Orchestrator. Commissioning begins with the owner's purpose and the owner-to-steward working contract. Visual presentation and world template come only after mode, agents, Forges, and governance.

## Current truth

`app/` is the only active application. It is a Vite/React/TypeScript browser-local prototype with:

- nine-step Ultron-first commissioning
- Standard/Demo storage and provenance isolation
- validated draft recovery, import, migration, and recommissioning
- deterministic, inspectable local build jobs
- bundled Spaceship + Pixel Art path and honest placeholders elsewhere
- World Overview -> Room View -> Agent View
- room work, audit, approval, and replay surfaces
- desktop and narrow E2E/visual coverage

The browser prototype is not the planned product runtime. It does not yet provide backend authority, durable server-side operational records, real provider/tool adapters, the genuine supervised operational vertical slice, packaging, updater/rollback, or disaster recovery.

## Current verdict

- Prototype phase complete: PASS for the current browser prototype.
- Operational vertical slice complete: NOT MET.
- Feature complete: NOT MET.
- Release candidate: NOT MET.
- Installed product proven: NOT MET.
- Product claims proven: NOT MET.

See `../qa/STATUS.md` for evidence and exact scope. Never convert a lane-level PASS into a broader verdict.

## Read in this order

1. `../AGENTS.md` - worker rules and safety boundaries.
2. This file - current truth and proof boundary.
3. `DECISIONS.md` - locked product/architecture decisions.
4. `MISTAKES.md` - recurring traps that should not be rediscovered.
5. `NEXT.md` - active sequence and acceptance boundaries.
6. `../CODE_MAP.md` - actual repository and runtime map.
7. `PRODUCT_CLAIMS.md` - claims and required evidence.
8. `../qa/STATUS.md` - current gate verdicts and real command output.
9. `../CONTEXT.md`, `../PRODUCT_BLUEPRINT.md`, and `../ARCHITECTURE.md` - deeper product context and target architecture.
10. `prompts/agentarium-master-build-prompt.md` - detailed build contract.
11. `COMMAND_SHELL_AND_CREW_SPEC.md` - approved post-wake command shell and Crew system.
12. `TITLE_SCREEN_SPEC.md` - approved title-screen design language.

`INDEX.md` classifies every other document as living authority, supporting specification, plan, evidence, runbook, reference, or archive.

## Non-negotiable boundaries

- Standard starts without synthetic operational data.
- Demo is explicit, synthetic, non-networked, separately stored, visibly labelled, and purgeable.
- Missing providers, tools, evidence, or integrations block honestly.
- Every real action must leave an audit event.
- External side effects require explicit approval.
- Destructive actions require scoped confirmation.
- Visual activity must map to validated state/events.
- The browser must not remain the long-term owner of operational truth.
- The dirty working tree contains valuable uncommitted work. Do not reset, clean, or broadly overwrite it.
- `starnet/` is a read-only product-completeness reference, not source to copy.

## Verify the current browser prototype

From `app/`:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
npm run visual:check
npx --yes impeccable@latest detect --json src
```

A successful run proves only the scope named in `../qa/STATUS.md`.
