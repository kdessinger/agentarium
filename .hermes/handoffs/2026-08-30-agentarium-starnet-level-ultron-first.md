# Agentarium Starnet-Level Build Handoff

**Captured:** 2026-08-30 05:27 UTC
**Workspace:** `/root/Kenn/projects/agentarium`
**Status:** Active implementation, focused tests green, full verification not yet run

## Mission

Bring Agentarium to the level of product completeness demonstrated by the bundled read-only reference repository at `starnet/`, while preserving Agentarium's distinct product direction.

The target is not to clone Starnet's architecture or visual identity. Use it as the standard for:

- a real operational product rather than a polished simulation
- an inhabited spatial world whose animations map to proven runtime state
- comprehensive but curated living documentation
- installation, configuration, security, privacy, backup, recovery, release, and support lifecycle
- machine-gated product claims and honest proof boundaries

## Kenn's latest product correction

Agentarium's onboarding should **not begin by asking about visual style or world theme**.

The better opening is orchestration-first:

1. Ultron, the Steward/Orchestrator, introduces itself.
2. Ultron asks what the owner is trying to build or accomplish.
3. Owner and steward establish desired outcomes, operating boundaries, and working relationship.
4. Select Standard/Demo boundary.
5. Shape agents and roles around the mission.
6. Define Forges and operational workflows.
7. Set governance and approval policy.
8. Only then choose visual presentation and world template.
9. Review a blueprint that begins with owner intent and orchestration, not aesthetics.
10. Approve bounded build jobs and present the commissioned world.

Visual style remains independent from topology and operational state; it is simply no longer the product's opening question.

## Important working-tree warning

The repository was already substantially dirty before this onboarding lane. It contains a large body of valuable, uncommitted Agentarium work from prior sessions.

**Do not run `git reset --hard`, `git clean`, broad checkout/revert commands, or overwrite files wholesale. Do not delete `starnet/`.**

At handoff time `git status --short` included modified tracked files and untracked source/assets, including:

- root product docs
- `app/src/App.tsx`
- commissioning/build/mode/persistence modules
- tests and CSS
- new components, animation, presentation, scripts, visual assets
- `starnet/` as the read-only reference tree

Inspect diffs by path and preserve all unrelated work.

## Current onboarding implementation

The Ultron-first direction is partially implemented in the working tree.

### Domain changes

`app/src/lib/commissioning.ts`

- Added `ArticulationAnswers`:
  - `ownerName`
  - `stewardName`
  - `vision`
  - `desiredOutcomes`
  - `operatingBoundaries`
  - `workingStyle`
- Added `articulation` to `CommissioningDraft`.
- Added `articulation` to `BuildPlan`.
- `createCommissioningDraft()` defaults steward to `Ultron` and initializes the owner/steward working contract.
- `createBuildPlan()` propagates a cloned articulation record.
- commissioning/build-plan validation now checks articulation.

`app/src/lib/persistence.ts`

- Added compatibility hydration for schema-v2 records created before `articulation` existed.
- Completed active records without articulation rebuild their declarative plan after receiving default articulation.
- Draft/workspace/import paths now use the compatibility hydration.

### UI changes

`app/src/App.tsx`

- Commissioning expanded from 8 to 9 steps.
- Step order is now:
  1. owner/steward articulation
  2. operating mode
  3. agents
  4. Forges
  5. governance
  6. visual style
  7. world template
  8. blueprint
  9. build jobs
- Opening character is Ultron (`Steward / Orchestrator`), not a generic Builder Agent.
- Opening message: `I’m Ultron. Tell me what we’re building together.`
- Added `ArticulationReview` inputs.
- Continue is disabled until the mission/vision has content.
- Mode changes and recommissioning preserve articulation.
- Blueprint review includes owner/steward articulation before rooms and art.
- Existing saved drafts are loaded through validated `importDraft()` rather than raw JSON.

### Tests changed

- `app/src/lib/domain.test.ts`
- `app/src/lib/rework.contract.test.ts`
- `app/tests/commissioning.spec.ts`

They now assert:

- a persisted owner-to-steward contract
- articulation propagation into the build plan
- fresh startup begins with Ultron and owner purpose
- style/world choices are absent from the opening step
- the complete 9-step order
- articulation survives mode switching, recovery, import, blueprint review, and recommissioning

## Verified at handoff

Focused unit contracts:

```bash
cd /root/Kenn/projects/agentarium/app
npm test -- --run src/lib/domain.test.ts src/lib/rework.contract.test.ts
```

Actual result:

```text
Test Files  2 passed (2)
Tests       44 passed (44)
```

Focused desktop+narrow E2E:

```bash
npx playwright test tests/commissioning.spec.ts --grep "fresh startup|Ultron begins"
```

Actual result:

```text
4 passed
```

## Not yet verified

Do not report the lane complete until all of these pass:

```bash
cd /root/Kenn/projects/agentarium/app
npm test
npm run lint
npm run build
npm run test:e2e
npm run visual:check
npx --yes impeccable@latest detect --json src
```

Then inspect new desktop and narrow screenshots. Specifically verify:

- Ultron reads as the opening steward, not a renamed setup mascot.
- The opening form does not feel like a corporate questionnaire.
- Mission and relationship are visually primary.
- World/style cards cannot appear before the operating model.
- Recovery/import resumes at a valid step with articulation intact.
- Old active/draft records migrate safely.
- The 9-step meter and all Back/Continue paths remain correct.
- The existing full World → Room → Agent application still works.

## Immediate next actions

1. Run the full verification commands above.
2. Fix failures with tests first; do not weaken existing Standard/Demo, provenance, or approval contracts.
3. Capture and inspect the new commissioning opening at desktop and narrow widths.
4. Refine `ArticulationReview` and Ultron's visual treatment if it reads as a form instead of an in-world conversation.
5. Update all living docs that still say visual style comes first:
   - `README.md`
   - `CONTEXT.md`
   - `PRODUCT_BLUEPRINT.md`
   - `app/IMPLEMENTATION_NOTES.md`
   - `docs/plans/2026-08-21-self-building-commissioning.md` (mark prior order superseded; do not rewrite history silently)
   - `docs/prompts/agentarium-master-build-prompt.md`
6. Add a new locked decision to an authoritative decision log: **commissioning is orchestration-first and purpose-first; visuals follow the operating blueprint.**

## Starnet-level completion work after this lane

Do not try to build everything in one unbounded pass. Establish the control system first.

### A. Curated project authority

Add a small authoritative set rather than copying Starnet's documentation sprawl:

- `docs/START_HERE.md` or `docs/BRAIN.md`
- `CODE_MAP.md`
- `docs/INDEX.md`
- `docs/DECISIONS.md`
- `docs/MISTAKES.md`
- `docs/NEXT.md`
- `docs/PRODUCT_CLAIMS.md`
- `qa/STATUS.md`
- generated/structured bug register under `qa/`

Classify docs as living, plan, audit/evidence, runbook, or archive. Update stale `docs/NEXT_DECISIONS.md` and `docs/WORKSPACE_MAP.md` rather than allowing them to claim implementation has not started.

### B. Product-completion gates

Separate these verdicts explicitly:

1. Prototype phase complete
2. Operational vertical slice complete
3. Feature complete
4. Release candidate
5. Installed product proven
6. Product claims proven

No lane-level green result should be presented as product-wide completion.

### C. Real operational vertical slice

Build one genuine supervised flow through backend authority:

```text
Owner goal
→ Ultron decomposes and routes
→ Nova gathers attributable evidence
→ Forge/Developer produces a real artifact
→ Governor reviews acceptance criteria
→ approval gate pauses consequential action
→ artifact and audit trail are delivered
→ replay explains the entire run
```

Standard mode must remain empty/unconfigured until real adapters exist. Demo remains isolated and visibly synthetic.

### D. Runtime authority

Move operational truth out of browser-local ownership behind a replaceable API/event boundary:

- durable agents/tasks/quests/events/approvals/artifacts
- validated event contract
- SSE/WebSocket streaming
- provider/tool/agent adapters
- permission and approval enforcement
- costs/budgets
- checkpoints and recovery

The world renders proven runtime state; it never invents activity to appear alive.

### E. Product lifecycle

Eventually add and prove:

- install/run-from-source guidance
- privacy and local-data map
- security policy and threat boundaries
- credential custody
- backup/export/restore and disaster recovery
- version migrations
- release notes and release runbook
- packaged artifact, update, rollback, and clean-install proof
- support and diagnostics

## Product guardrails

- Do not copy Starnet branding, persona, code architecture, or visual identity.
- Keep Agentarium's differentiators: self-commissioning worlds, Articulation Console, specialized Forges, Archives, War Room, Treasury, Feedback Console, Skill Armory, and lab maturity/trust graduation.
- The 3D/spatial world is an operational model, not decoration.
- Standard contains no synthetic operational data.
- Demo is opt-in, isolated, purgeable, non-networked, and unable to influence Standard.
- Every real action leaves an audit event.
- External side effects require explicit approval; destructive actions require scoped confirmation.
- Keep full-viewport immersion and precise 2D inspectors.

## Suggested fresh-session prompt

```text
Continue the Agentarium Starnet-level build from:
/root/Kenn/projects/agentarium/.hermes/handoffs/2026-08-30-agentarium-starnet-level-ultron-first.md

Read the project AGENTS.md and the handoff first. Preserve the dirty working tree; do not reset, clean, or overwrite unrelated work. The Ultron-first commissioning lane has focused unit and E2E tests green but has not passed the full suite. Finish and visually verify that lane first, update the living docs/master prompt, then establish the curated Starnet-level project authority and completion-gate documents. Use TDD and real execution evidence. Do not claim product-wide completion from lane-level tests.
```
