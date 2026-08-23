# Agent instructions for Agentarium

This project is a gamified 3D control surface for AI agent ecosystems.

## Read first

Before changing code or architecture, read:

1. `README.md`
2. `CONTEXT.md`
3. `PRODUCT_BLUEPRINT.md`
4. `ARCHITECTURE.md`
5. `MVP_PLAN.md`

## Product intent

Agentarium should make multi-agent AI work visible and steerable. The 3D world is not decorative; it is the interface for understanding:

- what each agent is doing
- which tasks are queued, active, blocked, or complete
- when agents communicate
- which tools/resources are being used
- where human approval is required
- how the ecosystem improves over time

## Development posture

- Start with a small, working vertical slice.
- Standard mode must start with no synthetic/mock operational data. Missing providers, tools, evidence, or integrations produce honest empty/unconfigured/blocked states.
- Demo fixtures are allowed only when commissioning explicitly selects Demo mode; keep them in a separate namespace/storage partition and never let them influence Standard memory, metrics, maturity, budgets, or decisions.
- Prefer supervised, gated real actions before bounded autonomy.
- Keep backend/orchestration boundaries replaceable.
- Do not hardwire one model provider, agent framework, or marketplace.
- Do not add credentials or secrets to the repo.
- Do not let the 3D layer become a toy disconnected from real workflow state.

## UI/UX rules

- Use the full viewport. This should feel like entering a world, not opening a boxed dashboard.
- Make status obvious visually: idle, working, blocked, waiting for approval, done, failed.
- The user must always be able to inspect the underlying log behind any animation.
- Animations should explain state transitions, not hide them.
- Provide a 2D fallback/inspector panel for precise details.

## Agent safety rules

- Simulated actions are fine by default.
- Read-only local actions are fine in development.
- External side effects require explicit human approval.
- Destructive actions require explicit scoped confirmation.
- Every real action must leave an audit event.

## Repo expectations

When code exists:

- include local run instructions
- include smoke tests or verification scripts
- keep Demo fixtures in obvious demo-only files/modules, unreachable from Standard mode
- preserve provenance/data classification on evidence, packets, signals, and events
- keep orchestration contracts documented
- update docs when architecture changes
