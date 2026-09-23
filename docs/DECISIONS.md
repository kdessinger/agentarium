# Locked Decisions

A decision remains active until a later entry explicitly supersedes it. Do not reopen one casually through implementation drift.

## D-001 - The spatial world is the operational interface

**Status:** locked

Rooms, agents, routes, movement, and animation must represent inspectable operational state. A decorative world wrapped around a hidden dashboard does not satisfy the product.

## D-002 - Standard and Demo are hard-separated

**Status:** locked

Standard is default and starts without synthetic operational records. Demo is explicit, synthetic, non-networked, visibly labelled, separately stored, purgeable, and unable to influence Standard memory, metrics, maturity, budgets, feedback, or decisions. There is no silent fallback from Standard to Demo.

## D-003 - Commissioning is purpose-first and orchestration-first

**Status:** locked, supersedes visual-first commissioning language

Ultron introduces itself as Steward/Orchestrator and begins with what the owner wants to build, desired outcomes, operating boundaries, and working relationship. Canonical order:

```text
owner <-> Ultron articulation
-> Standard/Demo boundary
-> agents
-> Forges
-> governance
-> visual presentation
-> world template
-> blueprint
-> bounded build and final presentation
```

Visuals never lead onboarding. The historical visual-first plan remains archived with a supersession notice.

## D-004 - Presentation is independent from operational topology

**Status:** locked

Visual style and world template are separate choices. Changing presentation must not rewrite agent responsibilities, rooms, Forges, workflows, memory, approvals, or operational truth. Pixel Art is optional for every template.

## D-005 - Forges and Communications are different systems

**Status:** locked

A Forge produces outside-world value or deliverables through a governed production loop. Communications routes messages, alerts, comments, and signals. Communications is not a revenue Forge.

## D-006 - Browser-local state is prototype authority, not product runtime authority

**Status:** locked

Browser storage may own non-secret commissioning state and isolated Demo prototype state. The real product must move durable operational truth behind a replaceable validated API/event boundary with server-side persistence, permissions, approvals, costs, checkpoints, and recovery.

## D-007 - Consequential actions are approval-gated and audited

**Status:** locked

External side effects require explicit approval. Destructive actions require scoped confirmation. Every real action must leave an audit event. A visual or UI confirmation alone is not enforcement; the runtime authority must enforce the same policy.

## D-008 - Completion has six distinct gates

**Status:** locked

The verdicts are: Prototype phase complete, Operational vertical slice complete, Feature complete, Release candidate, Installed product proven, and Product claims proven. A lower gate never implies a higher gate. `qa/STATUS.md` owns current verdicts.

## D-009 - Starnet is a standard, not a template

**Status:** locked

Use the bundled `starnet/` repository to study product completeness, runtime/event truth, documentation authority, release engineering, installed-product proof, and operational maintenance. Do not copy its branding, persona, architecture, prose, or visual identity.

## D-010 - Nova is market intelligence, not generic research

**Status:** locked

Nova observes attributable market evidence, creates structured opportunity packets, hands them to production, and learns from downstream outcomes. Without configured attributable evidence, Standard must block instead of inventing research.

## D-011 - Revenue Forges are closed feedback loops

**Status:** locked

**Identity:** Caspian is the named finance and unit-economics agent assigned to the Treasury room. “Treasury” remains the legible room/function label; `treasury` remains the stable Hermes profile handle.

A revenue Forge is not a one-way content conveyor belt. Its legible operating loop is: attributable market signal → original visual/product hypothesis → supervised listing/product experiment → marketing demand test → Treasury unit-economics guardrail → governance approval → fulfillment/customer outcome → archived evidence and feedback → improved next research question. The system must show the current stage, blocked prerequisite, and the learning return upstream. Revenue, orders, costs, ROI, and profit remain absent/unconfigured until actual evidence is recorded; Demo examples are visibly synthetic and never influence Standard decisions.
