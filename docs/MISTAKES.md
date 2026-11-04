# Mistakes and Traps

These are recurring, expensive errors. Each entry records the rule that prevents a repeat.

## M-001 - Leading commissioning with aesthetics

**Failure:** Asking for visual style/world theme before understanding the owner's operation made Agentarium feel like a theme generator instead of an orchestration product.

**Law:** Purpose, relationship, mode, agents, Forges, and governance come before presentation. See D-003.

## M-002 - Calling a green lane a complete product

**Failure:** Unit/E2E success can make a polished browser lane look more complete than the runtime, packaging, recovery, and product claims actually are.

**Law:** Every completion statement names one of the six gates and cites `qa/STATUS.md`. Never infer a higher gate.

## M-003 - Letting plans become stale authority

**Failure:** `NEXT_DECISIONS.md` still said implementation had not started, and `WORKSPACE_MAP.md` described `app/` as future after the application existed.

**Law:** Plans preserve history; living docs describe now. Correct or visibly supersede stale claims in the same change that invalidates them.

## M-004 - Treating concept art as the interface

**Failure:** A beautiful ship image with tiny labels/hotspots can remain concept art with an interaction layer rather than an inhabited operational world.

**Law:** Use art as a base layer. Rooms, agents, routes, work, approvals, and events remain state-driven, inspectable, legible, and active at useful scale.

## M-005 - Fabricating Standard activity to keep the world alive

**Failure:** Seeded/demo records in Standard would make the product look functional while hiding missing adapters and evidence.

**Law:** Standard is honestly empty or blocked until configured. Synthetic activity belongs only to isolated Demo.

## M-006 - Animating without a validated event

**Failure:** Motion that is not backed by runtime state becomes theater and undermines trust.

**Law:** Every meaningful animation maps to a validated event/state and an inspectable log. Ambient motion must not imply work, delivery, spend, or communication occurred.

## M-007 - Confusing UI gates with runtime enforcement

**Failure:** A modal can look safe while a backend or adapter remains able to execute directly.

**Law:** Permission and approval policy is enforced at runtime authority. The client renders and requests; it does not grant itself authority.

## M-008 - Destroying a valuable dirty tree

**Failure:** Broad reset, clean, checkout, or overwrite commands can erase uncommitted product work from parallel sessions.

**Law:** Inspect diffs by path. Patch narrowly. Never reset/clean this repository unless Kenn explicitly scopes that destructive action.

## M-009 - Copying the reference instead of learning from it

**Failure:** Starnet demonstrates completeness but carries its own identity, architecture, debt, and history.

**Law:** Extract standards and proof practices. Keep Agentarium's identity, room model, commissioning loop, Forges, and governance system distinct.
