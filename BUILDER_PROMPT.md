# Agentarium Builder Prompt — Superseded

Do not use the older prototype prompt that previously lived in this file. It assumed synthetic frontend data as the normal application state and no longer matches the approved product direction.

The authoritative build instruction is:

```text
docs/prompts/agentarium-master-build-prompt.md
```

It now requires every revenue Forge to be rendered as an inspectable closed feedback loop: attributable market signal → product hypothesis → demand test → Treasury guardrails → approval → fulfillment/customer outcome → Archives/Feedback → improved next research question. Standard mode must show honest blockers until real evidence exists.

The implementation plan is:

```text
docs/plans/2026-08-21-self-building-commissioning.md
```

## Non-negotiable data rule

Agentarium commissioning must explicitly select one of two modes:

- **Standard mode — default:** starts with no operational data and accepts only real, user-entered, or derived records with provenance. Missing providers, models, tools, evidence sources, credentials, or integrations produce honest empty, unconfigured, blocked, unavailable, or error states. Standard mode never loads synthetic fixtures.
- **Demo mode — explicit opt-in:** uses a visibly labelled, non-networked, namespaced, purgeable synthetic dataset. Demo records cannot influence Standard memory, metrics, maturity, XP, reliability, budgets, feedback, analytics, or decisions.

There is no silent fallback from Standard to Demo.
