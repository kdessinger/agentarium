# Agentarium Kanban Board Seed

This note records the intended initial Hermes Kanban structure for Agentarium.

## Board

- Slug: `agentarium`
- Name: `Agentarium`
- Default workdir: `/root/Kenn/projects/agentarium`
- Purpose: coordinate Agentarium planning and build work without starting implementation before Kenn reviews the master prompt.

## Current operating rule

Do not assign workers to Agentarium implementation yet.

Phase one deliverable is an extremely detailed master build prompt for Kenn review. The prompt should be modeled after the attached JARVIS Mission Control prompt set: specific, contract-heavy, verification-driven, and full of failure-mode warnings.

## Initial phase cards

### Card 1 — Phase 1: Draft Agentarium master build prompt

Status: blocked / unassigned until Kenn explicitly starts it.

Deliverable:

- `docs/prompts/agentarium-master-build-prompt.md`

The prompt must be detailed enough for a capable AI builder to one-shot a serious first prototype.

It must include:

- exact project identity and product thesis
- explicit anti-persona rule: do not copy AndrooAGI's attitude, tone, dungeon/slave/job-replacement language, or cringe persona
- spatial pixel-art space-station theme
- MVP scope and non-goals
- station/room inventory
- core agents and responsibilities
- event/state contracts
- Standard/Demo data-boundary and provenance requirements
- UI/UX requirements
- full-viewport requirement
- orchestration/articulation console behavior
- Nova research loop and opportunity packet schema
- Forge/Etsy/Printify simulation loop
- Pixel/design/Fiverr loop
- Cipher/communications simulation
- feedback/training lab and maturity states
- governance and approval gates
- replay/audit log requirements
- data model/API contract
- implementation stack recommendation
- verification steps
- failure-mode warnings
- exact definition of done

### Card 2 — Phase 1 Review Gate: Kenn reviews master prompt

Status: blocked / unassigned.

Kenn reviews the master prompt and chooses:

- approve as-is
- request refactor/rewrite
- split into multiple builder prompts
- move to implementation

### Card 3 — Phase 2: Build approved Agentarium prototype

Status: blocked / unassigned.

This only begins after the master prompt is approved.

### Card 4 — Phase 3: Verify and refine prototype

Status: blocked / unassigned.

This only begins after phase 2 produces a running artifact.
