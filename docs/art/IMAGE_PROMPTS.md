# Agentarium Image Prompt Manifest

Purpose: generate static pixel-art backgrounds first, then layer interaction/animation/sprites on top later.

## Shared style

Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

## Asset prompts

### Whole Ship Cross-Section Overview

- ID: `ship-overview-cross-section`
- Kind: `ship_overview`
- Target: `assets/concept-art/ship/ship-overview-cross-section.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create the overarching Agentarium spaceship overview as a geographically coherent side/cutaway cross-section, like a starship blueprint turned into a colorful pixel-art management game scene. The ship is flying through deep space. Show the entire vessel from the side in a wide 16:9 composition with rooms visibly placed inside the hull and connected by corridors/tubes. The Bridge is forward/top-front with panoramic windows and a large command console. The War Room is attached directly behind/under the Bridge. Archives is central/deep core with a glowing memory graph chamber. Forge rooms are grouped as industrial/factory modules in the lower/mid ship with conveyors. Communications has antenna/signal dishes near the outer hull. Ten Forward is a lounge with large windows near an observation section. Pixel/Vibes/Developer/Security/Nova rooms appear as distinct modules. Make it feel like a real interactive game map: each room has a recognizable silhouette, doorway, corridor connections, small animated-light opportunities, and enough empty interior space for future sprites. No readable text labels; labels will be added in UI overlays. Pixel art, crisp, charming, alive, operational, not photorealistic.
```

### The Bridge

- ID: `bridge`
- Kind: `room`
- Target: `assets/concept-art/rooms/bridge.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create The Bridge room for Agentarium as a detailed pixel-art spaceship command bridge interior. This is the master room where Ultron lives and primarily interacts with Kenn. Large forward panoramic window shows the ship flying through starry space. Center foreground: a massive curved command console with glowing cyan/amber controls, command chair/avatar position for Kenn, and a distinct Ultron steward station. Back wall or front bulkhead has a massive TV/holographic screen that can display whatever Kenn is examining: Fiverr store dashboard, Etsy Forge status, world map, agent activity, approval request, or Archives graph. The screen should show abstract panels/charts/thumbnails without readable text. Include communication links/light conduits branching from the Bridge toward all rooms. Mood: captain's bridge + AI operations command center, serious but game-like, pixel art, clear empty sprite positions, no franchise logos.
```

### The War Room

- ID: `war-room`
- Kind: `room`
- Target: `assets/concept-art/rooms/war-room.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create The War Room attached to the Bridge: a pixel-art officer conference and strategy room inside a spaceship. Central tactical table/holographic map shows the Agentarium ship and active work routes. Around it are seats/standing positions for AI officer characters: Ultron, Nova, Forge, Pixel, Vibes, Developer, Security, Cipher, Governor. Walls have strategy boards, mission cards, timeline panels, and status lights, but no readable text. Doorway visibly connects back toward The Bridge. The room should support group meetings, daily/weekly reviews, strategy planning, and cross-agent coordination. Cinematic but practical, warm sci-fi lighting, pixel-art diorama interior.
```

### Articulation Console

- ID: `articulation-console`
- Kind: `room`
- Target: `assets/concept-art/rooms/articulation-console.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create the Articulation Console room/alcove connected to The Bridge. This is where Kenn describes a founder vision and Ultron decomposes it into rooms, agents, workflows, dashboards, risks, and approval gates. Show a large interactive planning console with holographic blueprint panes, connected node diagrams, task-route lines, room proposal cards, risk meters, and approval-gate symbols. Include a single operator chair and a small Ultron presence/AI core nearby. It should feel like vision becomes architecture here. No readable text; use abstract UI blocks and icons. Pixel-art game background, calm sci-fi, clean overlay space.
```

### Nova Room / Research and Design Lab

- ID: `nova-room`
- Kind: `room`
- Target: `assets/concept-art/rooms/nova-room.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create Nova's Research and Design Lab as a pixel-art spaceship room for market intelligence. It has observatory-style windows, data telescopes, research terminals, trend graphs, product mood boards, evidence cards, and a central holographic opportunity-packet table. Nova's station should look like it studies successful market patterns and produces original opportunity packets for Forges. Include mock Etsy/product research vibes without real logos or readable store names. Show a handoff chute/light path leaving toward the Etsy Forge. Intelligent, curious, bright cyan/violet lighting, pixel-art diorama interior.
```

### Etsy Forge

- ID: `etsy-forge`
- Kind: `room`
- Target: `assets/concept-art/rooms/etsy-forge.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create the Etsy Forge room as an income-producing factory module inside Agentarium. This room turns Nova opportunity packets into mock product/listing packets. Show conveyor belts, product mockup stations, listing preview monitors, packaging/fulfillment machinery, Printify-like production machines without logos, and a guarded external-publishing portal that is visibly locked/approval-gated. Use amber industrial light, cyan status strips, tiny product silhouettes, and clear space for Forge agent sprites. No real Etsy logo, no readable text, no fake revenue. Pixel-art factory room, lively but supervised.
```

### Fiverr Forge

- ID: `fiverr-forge`
- Kind: `room`
- Target: `assets/concept-art/rooms/fiverr-forge.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create the Fiverr Forge as a pixel-art service-production room for customer creative jobs such as thumbnails. Show intake slots, request cards, thumbnail layout monitors, production desks, QA conveyor, delivery gate locked behind approval, and tiny placeholder workstations for production and review subagents. Use green/cyan marketplace-service energy without any real Fiverr logo or readable text. It should look like a factory for service deliverables, not a social lounge. Leave room for animated sprites and click overlays.
```

### Print-on-Demand Forge

- ID: `print-on-demand-forge`
- Kind: `room`
- Target: `assets/concept-art/rooms/print-on-demand-forge.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create a Print-on-Demand Forge spaceship factory room. Show shirt/poster/mug mockup machines, fabric printer, product preview screens, order bins, fulfillment conveyor, and an approval-locked external fulfillment hatch. Warm industrial sci-fi pixel art. Make the room clearly distinct from Etsy Forge: more physical printing machinery and sample racks, but no brand logos, no readable text, no fake live orders. Designed as a room background for later animation.
```

### Supplements Forge

- ID: `supplements-forge`
- Kind: `room`
- Target: `assets/concept-art/rooms/supplements-forge.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create a Supplements Forge as a cautious, compliance-heavy business factory room inside a spaceship. Show clean lab benches, capsule/bottle mockup stations, safety/compliance screens, ingredient holograms, warning/approval gates, and sealed external commerce hatch. The room should communicate regulated product caution, review, labels, and safety—not reckless selling. Pixel-art lab-factory hybrid, sterile but warm, no real supplement brands, no readable text.
```

### Old-Time Photo Restoration Forge

- ID: `photo-restoration-forge`
- Kind: `room`
- Target: `assets/concept-art/rooms/photo-restoration-forge.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create an Old-Time Photo Restoration Forge room. Pixel-art spaceship workshop with antique photo scanners, restoration monitors, before/after portrait panels, gentle archival lighting, careful retouching consoles, and an approval-gated customer delivery hatch. Mix vintage sepia photo aesthetics with sci-fi machinery. No real people, no readable text, no delivery claims. Warm, respectful, craftsmanship-focused room background.
```

### High-Ticket Affiliate Forge

- ID: `affiliate-forge`
- Kind: `room`
- Target: `assets/concept-art/rooms/affiliate-forge.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create a High-Ticket Affiliate Forge room as a strategic business lab, not a scammy sales room. Show offer comparison boards, compliance check console, funnel architecture holograms, content route maps, review gates, and ROI/risk meters, all abstract without readable text. It should look like a controlled business-analysis forge that can produce campaigns only after approval. Pixel-art sci-fi, polished, cautious, no logos, no fake revenue.
```

### Pixel Room / Graphic Artist Studio

- ID: `pixel-room`
- Kind: `room`
- Target: `assets/concept-art/rooms/pixel-room.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create Pixel's graphic artist studio. A colorful pixel-art creative room with drawing tablets, holographic canvases, thumbnail composition boards, color palettes, mock product-image frames, sprite sheets, and rendering stations. Pixel is the graphic artist; the room should feel energetic and artistic, with wall screens showing abstract design thumbnails but no readable text. Include a clear route from Forge into Pixel and from Pixel toward Governance. Leave central floor space for a working artist sprite and helper subagents.
```

### Vibes Room / Music Artist Studio

- ID: `vibes-room`
- Kind: `room`
- Target: `assets/concept-art/rooms/vibes-room.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create Vibes' music/audio studio inside the spaceship. Pixel-art room with synth consoles, waveform holograms, speakers, mixing desk, glowing sound panels, small stage/DJ booth, and media pipeline tubes toward Media Bay. Vibes is a music artist; the room should feel creative and alive but not a nightclub. Use deep purple, cyan, amber LEDs, animated equalizer opportunities, and empty spots for music-agent sprites. No readable text.
```

### Developer Room / App Builder Lab

- ID: `developer-room`
- Kind: `room`
- Target: `assets/concept-art/rooms/developer-room.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create the Developer Room as an app/software builder lab in Agentarium. Show code terminals as abstract blocks, app blueprint screens, server racks, test benches, bug tracker board icons, CI/build machinery, and prototype holograms. It must feel like internal tools and adapters are built here. Avoid readable code/text. Pixel-art spaceship workshop, focused, slightly messy, with space for Developer agent and subagent sprites.
```

### Security Room

- ID: `security-room`
- Kind: `room`
- Target: `assets/concept-art/rooms/security-room.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create the Security Room guarding the whole Agentarium ship. Pixel-art sci-fi security operations center with shield generators, permission maps, locked credential vault doors, threat radar, firewall holograms, camera feeds as abstract tiles, and approval gate indicators. Security agent station should look vigilant and calm. Use red/orange caution lights balanced with blue shield glow. No scary hacker clichés, no readable text, no real credentials. Clear status: simulation-only, no live adapters connected, shown through icons not text.
```

### Communications Room

- ID: `communications-room`
- Kind: `room`
- Target: `assets/concept-art/rooms/communications-room.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create the Communications Room. This room interacts with the outside world through signals/messages but is explicitly not a Forge because it does not manufacture or sell products. Show antenna controls, signal routing maps, inbox/message screens as abstract tiles, notification beacons, comms chairs, and routes back to The Bridge and relevant rooms. Use cyan/green signal waves and starfield windows. No readable text, no real email/social logos, no sent-message claims. Pixel-art spaceship communications deck.
```

### Review / Governance Station

- ID: `governance-room`
- Kind: `room`
- Target: `assets/concept-art/rooms/governance-room.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create Review / Governance Station as a pixel-art approval and quality chamber. Show a review desk, evidence packet panels, risk meters, acceptance checklist icons, a large glowing approval gate with approve/deny paths, and archive/feedback handoff tubes. It should feel like this room protects quality, policy, IP/trademark risk, and external-action boundaries. Use violet/cyan/amber caution lighting. No readable text. Clear space for Governor sprite and approval UI overlay.
```

### Archives / System Memory Banks

- ID: `archives`
- Kind: `room`
- Target: `assets/concept-art/rooms/archives.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create Archives, the command center of the system memory banks for all agents. Pixel-art room with a massive living neural/star-map memory graph: clustered nodes, relationship edges, pale graph canvas, red/pink/gray/cyan glowing memory constellations, central memory core, timeline/provenance consoles, search/retrieval terminals, and filters for agent memories. It should feel like Obsidian graph view meets spaceship library/core. Commander-facing, powerful, calm, mysterious. No readable text. Leave space for small librarian/archivist agent sprites.
```

### Feedback / Training Console

- ID: `feedback-console`
- Kind: `room`
- Target: `assets/concept-art/rooms/feedback-console.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create the Feedback / Training Console room. Pixel-art room where approve/reject/iterate feedback becomes training signals. Show feedback cards, quality meters, before/after panels, supervised-to-trusted maturity ladder as abstract icons, review clips, and tuning consoles. It must not imply real model training; it is a simulated feedback command room. Warm amber/violet/cyan lighting, clear empty spaces for agents reviewing output, no readable text.
```

### Skill Armory

- ID: `skill-armory`
- Kind: `room`
- Target: `assets/concept-art/rooms/skill-armory.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create the Skill Armory room. Pixel-art sci-fi armory/library hybrid where agent skills are stored, inspected, quarantined, approved, and equipped. Show glowing skill cartridges/cards in racks, quarantine containment cases, inspection bench, permission scopes as abstract lock icons, and approved vs pending zones. It should feel like capability management, not weapons for domination. No readable text, no real tool logos. Strong blue/violet/amber palette, crisp room background.
```

### Treasury

- ID: `treasury`
- Kind: `room`
- Target: `assets/concept-art/rooms/treasury.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create Treasury, the ship's cost-control and budget room. Pixel-art finance operations room with energy meters, model/API cost gauges, budget vault, revenue/cost holograms as abstract charts, warning lights for runaway spend, and a locked external-spend gate. It should feel responsible and controlled, not casino-like. No readable numbers/text, no fake money claims. Deep navy, gold/amber highlights, cyan status lighting.
```

### Media Bay

- ID: `media-bay`
- Kind: `room`
- Target: `assets/concept-art/rooms/media-bay.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create Media Bay, the ship's publishing scheduler and media-routing room. Pixel-art room with video timeline screens, upload queue tubes, content capsule racks, social/video platform portals represented generically with abstract icons, and a visible locked external-publishing gate. It should show future publishing potential but no live posting. Connects visually to Pixel and Vibes. No real platform logos, no readable text. Energetic but supervised.
```

### Ten Forward

- ID: `ten-forward`
- Kind: `room`
- Target: `assets/concept-art/rooms/ten-forward.png`
- Aspect: `landscape`

Prompt:

```text
Shared visual style for all Agentarium concept backgrounds:
- animated-pixel-art-ready static background, 16-bit / SNES-inspired pixel art, high-detail isometric or 2.5D game background
- spaceship flying through deep space theme, visible stars/nebula glow through windows where appropriate
- warm sci-fi command atmosphere: deep navy hull, cyan holograms, amber console lights, violet status glows, small green operational LEDs
- room backgrounds should be clean enough to become clickable game scenes; avoid tiny unreadable text, avoid photorealism, avoid corporate dashboard look
- leave natural empty/quiet space where UI overlays and sprites can be layered later
- no real brand logos, no copyrighted franchise marks, no Star Trek insignia, no readable fake company names
- show tiny generic AI agent sprite silhouettes or placeholder character positions only when useful; final animated sprites will be layered later

Create Ten Forward, a recreational non-production room on the Agentarium spaceship. Pixel-art lounge with large starfield windows, cozy seating, tiny tables, ambient plants/holograms, conversation nooks, game board, snack/replicator alcove, and idle AI agents socializing, brainstorming, talking nonsense, resting, or sleeping. It should feel like agents can live a life here when they have nothing to do. Warm, charming, restful. Clearly not a Forge or productivity room. No readable text.
```
