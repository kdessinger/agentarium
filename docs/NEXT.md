# Next

## Current objective

Build the first genuine supervised operational vertical slice behind runtime authority without weakening the verified browser prototype or Standard/Demo boundary.

```text
Owner defines a measurable hypothesis
-> Ultron decomposes and routes
-> Nova gathers attributable evidence
-> Pixel + Forge produce a real local candidate/artifact
-> Jared prepares a bounded demand-test package
-> Treasury validates cost, margin, and spend guardrails
-> Governor checks acceptance criteria
-> approval gate pauses consequential action
-> artifact/outcome and audit trail are delivered
-> Archives + Feedback return the learning to Nova
-> replay explains the complete loop
```

This must use controlled local/read-only or explicitly approved adapters. It must not rely on Demo fixtures or claim external success that did not occur.

## Ordered work

### N-001 - Freeze the runtime command/event contract

- Define validated commands, events, IDs, provenance, data class, actor, run, task, approval, artifact, and error envelopes.
- Include schema/version compatibility behavior.
- Add contract tests before implementation.
- Keep browser presentation types separate from runtime authority.

**Exit:** invalid events are rejected; accepted events can drive the existing world without synthetic translation.

### N-002 - Add minimal durable runtime authority

- Choose a small Node/TypeScript or equivalent service boundary compatible with the current app.
- Persist workspaces, agents, quests, tasks, events, approvals, evidence, packets, and artifacts in SQLite initially.
- Use an append-only event log plus explicit current-state projections.
- Add export/restore tests before claiming durability.

**Exit:** refresh/restart does not depend on browser localStorage for operational truth.

### N-003 - Implement one supervised real flow

- Use one attributable local/read-only Nova evidence source.
- Produce one real local artifact through Forge or Developer.
- Run deterministic Governor acceptance checks.
- Pause at an approval record before any consequential action.
- Deliver locally and replay from recorded events.

**Exit:** the operational vertical slice gate in `../qa/STATUS.md` can be evaluated from real execution evidence.

### N-004 - Stream proven state into the spatial client

- Add SSE or WebSocket event delivery.
- Render only validated runtime events.
- Preserve honest empty/unconfigured/error states.
- Keep Demo in a separate runtime namespace with zero production adapter access.

**Exit:** visible work and route animation derive from durable runtime events, not browser-authored operational fiction.

### N-005 - Add lifecycle authority before release claims

Create and prove, in order:

- security policy and threat boundaries
- privacy/local-data map and credential custody
- backup/export/restore and disaster recovery
- version migrations
- diagnostics/support bundle
- release notes and runbook
- packaged clean install, upgrade, rollback, and recovery

**Exit:** only the corresponding later completion gates may move.

## Current non-goals

- no broad provider marketplace
- no unbounded autonomous loops
- no silent external publishing, spending, messaging, or deployment
- no product-wide completion claim
- no copy of Starnet architecture or identity
- no replacement of the current world UI with a generic dashboard

## Maintenance rule

When an item exits, update this file, `PRODUCT_CLAIMS.md`, `../qa/STATUS.md`, and any affected decision/code map in the same change. Move detailed implementation plans under `plans/`; keep this file short and current.
