# Phase 2 Feedback — Pixel-Art Game Experience Direction

Date: 2026-08-21

## Summary

Kenn reviewed the first Phase 2 prototype and said it is an interesting first pass, but not exactly the intended direction. The next plan/refinement pass should move Agentarium much closer to the generated concept image: a pixel-art, animated, video-game-like interactive space-station experience.

The current prototype proves useful state/workflow structure, but the intended product should feel less like a flat operational dashboard and more like an explorable management game / living ship UI.

## Desired interaction hierarchy

Agentarium should support three primary nested views:

### 1. Ship Overview

This is the view represented by the generated concept image and attached screenshot.

Purpose:

- show the entire space station / ship at once
- show an overview of all rooms
- make rooms visually distinct as pixel-art spaces
- show animated ambient activity so the station feels alive
- let the commander understand where work is happening without reading panels first

Visual direction:

- isometric / cutaway pixel-art space station
- individual rooms drawn as pixel-art diorama scenes, not plain boxes or graph nodes
- animated room activity: blinking consoles, moving agents, conveyor belts, pulsing routes, holograms, workbenches, tiny robots, screens, sparks, soft light changes
- visible connecting corridors/pathways between rooms
- status should be shown through in-world animation and overlays, not only side panels

UX behavior:

- single-click or hover can show quick room status
- double-clicking a room opens the Room View
- the ship overview should preserve high-level status and room relationships
- the overview should feel like a real video-game scene, not a dashboard diagram

### 2. Room View

Double-clicking a room transitions to a focused view of that room.

Purpose:

- show what is happening inside one room in detail
- show the room profile and operational state
- show active agents/subagents, queues, tools, packets, and current work
- support different room layouts based on room type

Room View requirements:

- preserve room profile fields: Room Name, Type, Description, Level
- room should be rendered as a larger pixel-art environment/interior
- agents inside the room should be visible as characters/sprites
- agent state should be visible: working, idle, blocked, sleeping, waiting for approval, moving to a tool, etc.
- some rooms may contain one main agent; others may contain several subagents
- show room-specific machinery/tools, for example:
  - Forge: production line, product mockups, fulfillment queue
  - Archives: memory graph / star-map / mind-map console
  - Communications: message screens and signal routing
  - War Room: table, officer group meeting, strategy boards
  - Ten Forward: idle agents socializing, brainstorming, relaxing

UX behavior:

- double-clicking an agent opens Agent View
- navigation should allow returning to Ship Overview
- room state should still map to real data/events, not pure decoration

### 3. Agent View

Double-clicking an agent opens a profile/character view for that agent.

Purpose:

- show the agent as a character with a profile
- expose and eventually modify that agent's function, tools, permissions, subagents, and behavior
- make agents feel like inspectable operators, not generic data rows

Agent View requirements:

- character/profile presentation for the selected agent
- visible fields such as name, role, room, level, status, skills, permissions, active task, subagents, current mode, reliability, recent events
- future controls for modifying agent functionality, bounded by approvals and safety
- clarify whether the agent is awake, working, idle, blocked, sleeping, or waiting
- for Ultron specifically, this view should reinforce that Ultron is the Bridge steward and primary interface to Kenn

## Key correction to current prototype direction

The first prototype can remain a useful state-contract proof, but Phase 3 should not merely polish the existing flat canvas. It should reorient the UI around:

```text
Ship Overview → Room View → Agent View
```

The product should feel like an animated pixel-art game interface where operational truth is represented through a living space-station world.

## Planning implications

Phase 3 should prioritize:

1. Creating a true pixel-art / isometric ship overview layout.
2. Replacing plain station boxes with room diorama components or art-backed tiles.
3. Adding double-click navigation from ship overview to room view.
4. Adding double-click navigation from room view to agent view.
5. Adding room-specific interior scenes.
6. Adding agent sprite states and ambient animations.
7. Keeping inspectors/audit trails available, but making them secondary overlays rather than the dominant experience.
8. Preserving Standard/Demo separation, configured-capability boundaries, provenance, and approval gates.
9. Preserving the event/state model from Phase 2 so animation remains truthful.

## Important design principle

The generated image is now the primary visual north star: a full-ship pixel-art cutaway with connected rooms, animated tiny agents, glowing corridors, and room-specific machinery.

Do not let Agentarium drift into a normal SaaS dashboard with a decorative map. The world is the interface.


## Image-first background-plate pipeline

Kenn's recommended implementation approach is now the preferred Phase 3 strategy:

1. Generate the static backgrounds first.
2. Generate one geographically coherent whole-ship cross-section image for Ship Overview.
3. Generate a dedicated room background image for every room.
4. Use those static images as background plates.
5. Add interactivity/hotspots on top of the ship image so clicking or double-clicking a room swaps the screen to that room's image.
6. Add agent sprites and animation only after the background image layer is working.
7. Keep the state/event/audit model underneath the image layer so the game visuals remain truthful.

This is intentionally closer to classic game map/interior navigation than to a procedural 3D app. The initial implementation can use static PNG backgrounds plus transparent clickable regions, then add animation layers:

```text
whole-ship background PNG
  + room hotspot map
  + route/status overlays
  + agent sprite layer
  + UI inspector/audit overlay
```

For Room View:

```text
room background PNG
  + agent/subagent sprite layer
  + room-specific hotspot map
  + packet/tool/status overlays
  + room profile / inspector overlay
```

For Agent View:

```text
agent profile/character panel
  + avatar/sprite portrait
  + function/tool/permission controls
  + task/event history
```

Created art prompt and asset files:

- `docs/art/IMAGE_PROMPTS.md`
- `docs/art/image-prompt-manifest.json`
- `docs/art/CONCEPT_ART_ASSET_INDEX.md`
- `docs/art/concept-art-gallery.html`
- `assets/concept-art/ship/ship-overview-cross-section.png`
- `assets/concept-art/rooms/*.png`
