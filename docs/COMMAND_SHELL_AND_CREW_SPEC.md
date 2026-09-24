# Command Shell and Crew System Specification

**Status:** Approved product direction; implementation pending  
**Scope:** Post-wake workspace, world selection, Crew system, Captain profile, agent growth/memory, recruitment, and import  
**Authority:** Read with `DECISIONS.md`; this specification does not claim implemented behavior.

## 1. Product objective

After the Orchestrator is commissioned and intelligence is connected, Agentarium should transition from setup into a persistent, game-like operations environment. The interface must make agents feel present without hiding operational truth, approvals, provenance, context use, or failure states.

Agentarium's distinguishing promise is broader than a fixed station: the Captain chooses and evolves the world inhabited by the crew.

## 2. Canonical terminology

| Concept | User-facing term |
|---|---|
| Human owner/operator | **Captain** |
| Central coordinating agent | **Orchestrator**; default character name **Ultron** |
| Full agent list and management entry | **Crew Roster** |
| One agent's identity and controls | **Agent Profile** |
| New-agent template/install area | **Recruitment Bay** |
| Full-screen world presentation | **Cinematic Mode** |
| Optional dashboard module | **Instrument**; plain-language help may say “dashboard widget” |

“Captain” expresses the human's command role across every world template; it must not imply that the selected world is always a ship.

## 3. Activation and first direction

The transition into the operating shell should feel like an activation sequence rather than a route change:

1. Intelligence connection stabilizes.
2. A brief original signal/data sequence plays.
3. The chosen Orchestrator appears in the selected visual treatment.
4. Optional ambient machinery/interface audio fades in at a safe level.
5. The Orchestrator asks what kind of world the Captain wants to build.

Requirements:

- Skip, mute, volume, reduced-motion, and reduced-effects controls.
- No automatic full-volume audio.
- Scripted animation must be identifiable as presentation, not fabricated runtime activity.
- A precise system state and inspectable event trail must remain available beneath narrative presentation.

## 4. World foundation choice

Before the permanent world is built, offer a visual world chooser with at least:

- Spaceship
- Space station
- Underground bunker
- Skyscraper
- Cruise ship
- Research complex
- Fantasy citadel
- Custom world

Each option shows a strong preview, concise description, natural room arrangement, movement metaphor, and “change later” reassurance. World terminology and visuals may vary, but stable operational concepts and IDs must not. For example, Archives can appear as a memory core, secure vault, or library while retaining the same memory function.

## 5. Persistent command shell

The normal desktop shell has five stable regions:

### Top status and instruments

Show current world, connection health, automation state, pending approvals, budget/cost state, emergency pause, and an **Add Instrument** control. Instruments are optional; safety, approvals, connection, and emergency controls are not removable.

### Left operational rail

Provide clearly differentiated navigation for:

- Crew Roster
- Projects
- Sessions
- Search and filters

Agents, projects, sessions, and execution runs must use distinct labels, icons, and selection treatments.

### Center living world

The world remains the primary interface. It must represent validated operational events:

- agent location and state
- room activity
- handoffs and communications
- tool/resource use
- waiting approvals and blockers
- generated artifacts
- success and failure

Clicking a room zooms into that room; clicking an agent opens its Agent Profile. Missing evidence produces honest idle, unavailable, blocked, or unconfigured states—not invented animation.

### Right communications rail

Show the selected agent or crew conversation, suggested responses, attachments, voice controls, model in use, approvals, and a link to the underlying event log. Suggested responses are clearly labeled suggestions. The rail can expand without losing world state.

### Bottom primary navigation

Use stable sections:

- Crew
- Work
- Build
- System

The context meter remains visible at the bottom edge.

## 6. Context meter

The compact meter identifies its scope, for example **Current session: 38%**. Expansion explains:

- retained tokens/context
- summaries or compactions
- included files and evidence
- injected memories
- estimated capacity remaining
- model limit
- what happens near the limit
- inspection/removal controls

Conversation context, project context, durable memory, and provider/model limits must not be collapsed into one misleading number.

## 7. Cinematic Mode

Cinematic Mode expands the living world and hides management rails while preserving:

- agent and mission state
- emergency pause when real work is active
- visible **Exit Cinematic** control
- `Escape` exit
- camera position and selection
- reduced-motion behavior
- critical approval, safety, cost, and failure notices

## 8. Crew information architecture

The Crew area contains:

1. **Crew Roster** — browse and select current agents.
2. **Recruitment Bay** — recruit templates, build a custom agent, or import an existing agent.
3. **Captain** — manage the human profile and the information agents receive.

### 8.1 Agent Profile

Tabs:

- Overview
- Growth
- Work Record
- Memory
- Settings

Overview includes portrait, name, role, purpose, status, model, personality, authority, room, project, availability, and while-away status. Normal UI uses plain language; raw files and technical identifiers belong in an advanced inspector.

### 8.2 Growth and achievements

Growth records verified experience, never authority. Leveling must not silently grant tools, credentials, spending, publishing, destructive access, or unattended autonomy.

XP and achievements may derive only from attributable events such as completed work, approved artifacts, accepted feedback, successful approved-memory reuse, QA recovery, and multi-agent handoffs. Every achievement links to the evidence that earned it.

Candidate achievements include First Deployment, Five Alive, Bullseye, Good Recall, Second Draft, Team Player, Night Watch, Clean Run, and Receipts Included.

### 8.3 Feedback and performance

Provide **Nailed It** and **Missed the Mark** feedback with optional structured reasons. Feedback becomes learning evidence; it does not immediately rewrite permanent memory or personality.

Useful measures include completion, approval, revision, reliability, response time, budget adherence, feedback, memory reuse, escalations, and tool failures. Avoid an unexplained universal score.

### 8.4 Memory and reflection

Memory proposals support:

- reflection on/off
- task-completion and correction-driven reflection
- Keep, Edit, Discard, and Never Suggest Again
- provenance and supporting evidence
- task/run origin
- approver and timestamp
- receipt/undo
- sensitivity classification
- agent, project, room, or system scope

Periodic reflection is optional, not the default. Direct notebook saves and automatic reflection remain distinct and inspectable.

### 8.5 While I'm Away

The compact state may show On/Off, but enabling it requires explicit scope:

- projects and tasks allowed
- tools allowed
- external communication
- time window
- budget/spending limit
- maximum work
- stop conditions
- approval requirements
- report destination

All unattended work remains auditable and bounded by runtime authority.

## 9. Recruitment Bay

Organize templates instead of flooding the user with an undifferentiated list. Starting categories:

- Leadership
- Research and Intelligence
- Marketing and Creative
- Engineering
- Operations
- Personal

Support search, category filters, recommended templates, required connections, expected tools, permission needs, preview, **Install inactive**, **Recruit and activate**, and **Build custom agent**.

Templates begin as **Available**, not “Unconfigured.” Agentarium's featured starter collection may include Nova, Forge, Pixel, Vibes, and Security.

## 10. Hermes and OpenClaw import

Support discovery and manual-folder import for Hermes and OpenClaw installations. The import flow must:

- enumerate detected profiles/bots
- preview mappings before import
- state what will and will not be imported
- preserve the source installation
- avoid importing credentials silently
- avoid starting agents automatically
- issue an import receipt
- support rollback

Potential mappings include name, role, instructions, personality, model reference, skills, memory references, workspace, tools, schedules, and appearance. Credentials, private history/memory, external permissions, background jobs, financial authority, and publishing authority require explicit review.

## 11. Captain profile

Captain replaces Commander as the human role. The profile contains:

- About You
- Goals
- Ambitions
- Preferences
- Standing Orders
- Schedule and Cadence
- Agent Briefing
- Sources
- Station/World Record

Offer Quick Profile, Short Interview, Talk It Through, and Fill In Manually. Every interview-derived fact remains visible, editable, attributable, and removable.

The Agent Briefing answers **“What does this agent currently know about me?”** and identifies material derived from the Captain profile, project briefing, standing orders, approved memory, approved work folders, and current session. The Captain can exclude facts from specific agents.

Approved folders show path, access level, permitted agents, scan state, include/exclude rules, and whether content may leave the machine for an external model. “Local scanning” must never imply that later model processing is also local.

## 12. Responsive and accessibility requirements

Desktop may use simultaneous rails. Narrow layouts must use reversible drawers or modes that preserve access to the world. Required throughout:

- keyboard and touch operation
- explicit focus states
- screen-reader labels
- scalable readable body text
- non-color status cues
- high-contrast mode
- reduced motion/effects
- bounded overlays that do not trap the world

## 13. Implementation order

Do not implement this as one giant dashboard rewrite. Use TDD and deliver vertical slices:

1. Shell contract and responsive region behavior.
2. Context meter and safety/status contracts.
3. Cinematic Mode.
4. Crew Roster and Agent Profile Overview.
5. Captain profile and inspectable Agent Briefing.
6. Recruitment Bay and inactive template installation.
7. Hermes/OpenClaw read-only discovery and import preview.
8. Growth, feedback, Work Record, and evidence-backed achievements.
9. Memory proposal workflow.
10. Scoped while-away automation backed by runtime enforcement.

Work, Build, and System details remain open until their dedicated review is complete. This specification reserves their primary navigation positions without inventing their final contents.
