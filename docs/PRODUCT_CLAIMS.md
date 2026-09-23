# Product Claims

This ledger prevents aspiration, source presence, lane tests, and installed-product proof from being conflated.

## Status vocabulary

- **PROVEN (scoped):** current evidence proves the exact bounded claim.
- **PARTIAL:** some layers are proven; important enforcement or environments are not.
- **UNPROVEN:** planned, absent, or not exercised against the required artifact.
- **CONTRADICTED:** current evidence or an open bug disproves the claim.

Evidence expires when its code, schema, build artifact, environment, or acceptance criteria materially change.

## Browser prototype claims

| ID | Claim | Status | Current evidence / boundary |
|---|---|---|---|
| P-001 | Fresh browser state opens Ultron-first, purpose-first commissioning and withholds visual/world choices until later | PROVEN (scoped) | Desktop+narrow Playwright commissioning order and visual captures |
| P-002 | Commissioning persists owner/steward articulation through mode changes, import/recovery, blueprint, and recommissioning | PROVEN (scoped) | Unit contracts plus full Playwright recovery/import/recommissioning cases |
| P-003 | Standard and Demo browser stores/adapters are isolated; Demo is visible, purgeable, and non-networked | PROVEN (scoped) | Unit contracts and Playwright zero-network/purge cases; browser prototype only |
| P-004 | Local commissioning build jobs are explicit, resumable, inspectable, retryable, and not timer-fabricated | PROVEN (scoped) | Unit contracts, build-control E2E, implementation notes |
| P-005 | Bundled Spaceship + Pixel Art supports World -> Room -> Agent navigation at desktop and narrow widths | PROVEN (scoped) | Full Playwright and `visual:check`; bundled path only |
| P-006 | Unsupported world/style combinations do not silently reuse mismatched spaceship art | PROVEN (scoped) | Presentation contracts and non-bundled Agent View E2E |
| P-007 | The current opening reads as an owner-to-Ultron mission exchange rather than visual-first setup | PROVEN (scoped) | Semantic E2E contract and inspected desktop/narrow screenshots |

## Operational/runtime claims

| ID | Claim | Status | Required proof |
|---|---|---|---|
| O-001 | Operational truth is owned behind a durable validated API/event boundary | UNPROVEN | Running service, persistence/restart tests, invalid-event rejection, client integration |
| O-002 | A genuine supervised owner -> Ultron -> Nova -> Forge/Developer -> Governor -> approval -> delivery -> replay flow works | UNPROVEN | Real attributable evidence, real local artifact, runtime approval pause, recorded delivery/replay |
| O-003 | Every meaningful world animation is backed by durable runtime events | PARTIAL | Local prototype state drives visuals; backend event streaming and durable event authority remain absent |
| O-004 | Approval policy prevents unapproved external or destructive execution | PARTIAL | UI/domain contracts exist; runtime enforcement against real adapters is not implemented |
| O-005 | Providers, tools, agents, costs, budgets, checkpoints, and recovery are enforced by runtime authority | UNPROVEN | Implemented adapters, policy tests, restart/fault evidence |

## Lifecycle claims

| ID | Claim | Status | Required proof |
|---|---|---|---|
| L-001 | Agentarium has a supported clean installation path | UNPROVEN | Versioned packaged artifact and clean-host install evidence |
| L-002 | Upgrade and rollback preserve supported data/configuration | UNPROVEN | N-1 upgrade, failed-upgrade rollback, migration evidence |
| L-003 | Backup/export/restore and disaster recovery are proven | UNPROVEN | Documented procedure plus destructive fault/restore exercise |
| L-004 | Security, privacy, credential custody, and threat boundaries are release-reviewed | UNPROVEN | Policies, threat model, scans/review, candidate evidence |
| L-005 | Diagnostics and support lifecycle are operational | UNPROVEN | Support bundle, redaction tests, runbook exercise |
| L-006 | A release candidate is proven across supported targets | UNPROVEN | Candidate matrix, packaged smoke, open-blocker review |

## Gate consequence

The **Product claims proven** gate is NOT MET while any active operational or lifecycle claim is PARTIAL, UNPROVEN, or CONTRADICTED. Browser-prototype claims may be accurately reported with their scope, but they do not imply the product gate.

## Adding or changing a claim

Every claim needs:

1. a stable ID and exact scope
2. acceptance criteria
3. artifact/environment under test
4. reproducible command or manual protocol
5. dated evidence in `../qa/STATUS.md`
6. no contradictory open bug in `../qa/bugs.json`
