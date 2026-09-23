# Agentarium Concept Art Asset Index

Generated static pixel-art backgrounds for the image-first interaction model. These are intended as background plates first; animation/sprites/hotspots should be layered on top later.

## Interaction model

```text
Ship Overview
  -> double-click room
Room View
  -> double-click agent
Agent View
```

## Whole ship

### Ship Overview Cross Section

- File: `assets/concept-art/ship/ship-overview-cross-section.png`
- Purpose: whole-ship clickable/cross-section overview background

## Room backgrounds

### Affiliate Forge

- File: `assets/concept-art/rooms/affiliate-forge.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Archives

- File: `assets/concept-art/rooms/archives.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Articulation Console

- File: `assets/concept-art/rooms/articulation-console.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Bridge

- File: `assets/concept-art/rooms/bridge.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Communications Room

- File: `assets/concept-art/rooms/communications-room.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Developer Room

- File: `assets/concept-art/rooms/developer-room.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Etsy Forge

- File: `assets/concept-art/rooms/etsy-forge.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Feedback Console

- File: `assets/concept-art/rooms/feedback-console.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Fiverr Forge

- File: `assets/concept-art/rooms/fiverr-forge.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Governance Room

- File: `assets/concept-art/rooms/governance-room.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Media Bay

- File: `assets/concept-art/rooms/media-bay.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Nova Room

- File: `assets/concept-art/rooms/nova-room.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Photo Restoration Forge

- File: `assets/concept-art/rooms/photo-restoration-forge.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Pixel Room

- File: `assets/concept-art/rooms/pixel-room.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Print On Demand Forge

- File: `assets/concept-art/rooms/print-on-demand-forge.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Security Room

- File: `assets/concept-art/rooms/security-room.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Skill Armory

- File: `assets/concept-art/rooms/skill-armory.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Supplements Forge

- File: `assets/concept-art/rooms/supplements-forge.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Ten Forward

- File: `assets/concept-art/rooms/ten-forward.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Treasury

- File: `assets/concept-art/rooms/treasury.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### Vibes Room

- File: `assets/concept-art/rooms/vibes-room.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

### War Room

- File: `assets/concept-art/rooms/war-room.png`
- Purpose: room-view background plate; later layer agents, hotspots, UI overlays, and ambient animation on top

## Core agent concept art

Generated high-detail 16-bit/SNES-inspired character concepts for the bundled Spaceship + Pixel Art theme. These are source concepts for Agent View portraits and later sprite-sheet extraction. Current review state: `needs_review` by Kenn.

| Agent | Role | Home room | Full-body concept | Portrait crop |
|---|---|---|---|---|
| Ultron | Steward | Bridge | `assets/concept-art/agents/ultron.png` | `assets/concept-art/agents/portraits/ultron.png` |
| Nova | Market Intelligence | Nova Room | `assets/concept-art/agents/nova.png` | `assets/concept-art/agents/portraits/nova.png` |
| Forge | Production | Etsy Forge | `assets/concept-art/agents/forge.png` | `assets/concept-art/agents/portraits/forge.png` |
| Pixel | Graphic Artist | Pixel Room | `assets/concept-art/agents/pixel.png` | `assets/concept-art/agents/portraits/pixel.png` |
| Vibes | Music Artist | Vibes Room | `assets/concept-art/agents/vibes.png` | `assets/concept-art/agents/portraits/vibes.png` |
| Developer | App Builder | Developer Room | `assets/concept-art/agents/developer.png` | `assets/concept-art/agents/portraits/developer.png` |
| Security | Security Officer | Security Room | `assets/concept-art/agents/security.png` | `assets/concept-art/agents/portraits/security.png` |
| Cipher | Communications | Communications Room | `assets/concept-art/agents/cipher.png` | `assets/concept-art/agents/portraits/cipher.png` |
| Governor | Reviewer | Governance Room | `assets/concept-art/agents/governor.png` | `assets/concept-art/agents/portraits/governor.png` |

### Roster review sheet

- File: `assets/concept-art/agents/agent-roster-contact-sheet.png`
- Purpose: side-by-side consistency and approval review for all nine core agents

### Generation provenance

- Provider: `openai-codex`
- Model: `gpt-image-2-medium`
- Reference assets: each agent's home-room background plus `assets/concept-art/ship/ship-overview-cross-section.png`
- Normalized full-body output: 1024×1024 PNG
- Derived portrait crop: 512×512 PNG
- Full prompts and character bible: `docs/art/IMAGE_PROMPTS.md`
- Machine-readable records: `docs/art/image-prompt-manifest.json`

## World-template commissioning previews

Representative visual thumbnails for Step 3 of the Commissioning Guide. These are inspiration aids only; **each commissioned world is custom and unique** and is created from the selected template, visual style, room roster, topology, naming, and installer answers.

| Template | Preview |
|---|---|
| Modern Corporate Office | `assets/concept-art/world-templates/modern-corporate-office.png` |
| Space Station | `assets/concept-art/world-templates/space-station.png` |
| Spaceship | `assets/concept-art/world-templates/spaceship.png` |
| Cruise Ship | `assets/concept-art/world-templates/cruise-ship.png` |
| Underground Bunker | `assets/concept-art/world-templates/underground-bunker.png` |
| Skyscraper | `assets/concept-art/world-templates/skyscraper.png` |
| Resort | `assets/concept-art/world-templates/resort.png` |
| Sky Ship | `assets/concept-art/world-templates/sky-ship.png` |
| Battleship | `assets/concept-art/world-templates/battleship.png` |
| Custom Theme | `assets/concept-art/world-templates/custom-theme.png` |

- Contact sheet: `assets/concept-art/world-templates/world-template-contact-sheet.png`
- Normalized preview size: 640×360 PNG
- Provider/model: `openai-codex` / `gpt-image-2-medium`
- Status: approved representative preview, not a locked final rendering
