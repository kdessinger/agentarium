# Reference Research

This document captures external references, competitor notes, and open-source leads for Agentarium.

## Seed product / inspiration

### Bryan Valdes — “Build Your First AI Operating System” / Hermes HQ DIY Operator System

URL: `https://bryanmanager.gumroad.com/l/fenaet`

The URL redirects to:

`https://bryanmanager.gumroad.com/l/DIYOPERATORSYSTEM`

Observed from the Gumroad page:

- Price shown: `$97`, marked down from `$197`.
- Product title: **Build Your First AI Operating System**.
- Seller: Bryan Valdes.
- Describes “Hermes HQ” as a modular AI operating system around:
  - specialized AI departments
  - workflow agents
  - client pipelines
  - content systems
  - operational dashboards
- Includes:
  - Hermes HQ installation guide
  - setup walkthrough
  - GitHub + OpenRouter setup instructions
  - Hermes AI room architecture system
  - Forge, Scout, Webby, Hunter, Spark framework setup
  - prompt systems and operational workflows
  - early-access HTML dashboard files
  - Discord/community access
- Product detail card explicitly says: **Pixel-world AI command center framework**.
- Size shown: **375 KB**.
- Rating observed: **3 stars**, 1 rating.

Visible verified-buyer review excerpt:

> “Decent ideas, but overcomplicated and a little oversold. Most of the real value — running and directing AI agents — you can get from Claude Code with one install and no Linux/terminal setup, instead of the heavy process this course puts you through. And the ‘pixel dashboard’ is sold as a working command center when it's actually just a static image: looks nice, does nothing.”

### Screenshot received from Kenn

File:

`/root/.hermes/webui-mvp/attachments/682d1dd580b1/screenshot-1783088823543.jpeg`

Local file evidence:

- JPEG
- 1005 × 566

OCR text from screenshot:

```text
HERMES HQ
DIY OPERATOR SYSTEM
BUILD YOUR OWN AI COMMAND CENTER
AI WORKFLOWS
PIPELINES
DASHBOARDS
OPERATIONAL SYSTEMS
ONLINE
[+ EARLY ACCESS +]
```

Interpretation: the provided screenshot appears to be a sales/cover graphic for the DIY operator system, not proof of a live interactive agent world.

## Open-source / related software leads

### 1. Agentshire — rejected as primary reference

URL: `https://github.com/Agentshire/Agentshire`

Verified through GitHub API:

- Description: **OpenClaw / QClaw plugin that visualizes AI agents as 3D NPCs in a game town — with social simulation, a map editor, and a character workshop.**
- Language: TypeScript
- License: MIT
- Stars observed: 1,246
- Forks observed: 191
- Last pushed observed: 2026-04-15

README claims:

- “Let your OpenClaw/QClaw agents live in a game town you built yourself, not a ChatBox.”
- Turns AI agents into living NPCs inside a 3D town.
- Works with OpenClaw CLI and QClaw desktop app.
- Town Mode and Chat Mode.
- Agent = NPC.
- Cinematic workflow: summon → rally → assign → enter office → code → celebrate → return to town.
- Real-time dialog bubbles.
- Multi-agent collaboration.
- Citizen workshop.
- Town editor.
- Soul/personality system.
- Interactive 3D with status cards, work logs, thinking stream, TODO.
- AI tool control over town events like broadcast, spawn NPCs, trigger effects, time/weather.

Kenn's assessment:

Agentshire is **not** the thing he remembered and is not the right primary direction. It feels more like **The Sims / video game social simulation** than an office/operations tool.

Relevance to Agentarium:

Useful as a distant reference for “agents represented as NPCs,” but too game/social-life oriented for the current target. Do not prioritize this as the base unless the project direction changes toward a full Sims-like AI society.

Cautions:

- It is tied to OpenClaw/QClaw versions.
- Compatibility table says OpenClaw CLI 2026.3.13 recommended; OpenClaw 2026.4.x+ not yet supported due to channel init regression.
- Too far from the office/operations command-center feel Kenn wants.

### 2. AI Town

URL: `https://github.com/a16z-infra/ai-town`

Verified through GitHub API:

- Description: **A MIT-licensed, deployable starter kit for building and customizing your own version of AI town - a virtual town where AI characters live, chat and socialize.**
- Language: TypeScript
- License: MIT
- Stars observed: 10,091
- Forks observed: 1,123
- Last pushed observed: 2026-06-12

README claims:

- Virtual town where AI characters live, chat, and socialize.
- Inspired by the Stanford Generative Agents paper.
- Backend supports shared global state, transactions, simulation engine.
- Uses Convex for game engine/database/vector search.
- PixiJS powers game rendering.
- Configurable LLM support: Ollama, OpenAI-compatible APIs, Together.ai.
- Local/Docker/cloud install options.

Relevance to Agentarium:

High for simulated AI towns and social agents. Less directly oriented around operational/coding agents and human approval workflows, but the world/simulation layer is highly relevant.

### 3. Generative Agents / Smallville

URL: `https://github.com/joonspk-research/generative_agents`

Verified through GitHub API:

- Description: **Generative Agents: Interactive Simulacra of Human Behavior**
- License: Apache-2.0
- Stars observed: 21,699
- Forks observed: 3,045
- Last pushed observed: 2024-08-05

README claims:

- Research code accompanying the Stanford paper.
- Smallville-style simulation.
- Python/Django environment server plus simulation server.
- Agents move around a map and can be replayed.

Relevance to Agentarium:

Foundational research/reference. Less likely to be the easiest implementation base because it is older and research-shaped, but conceptually important.

## TikTok evidence

### Video: AI ecosystem upgrades

Source: `https://www.tiktok.com/t/ZP8GATsb4/`

Resolved page: `https://www.tiktok.com/@theaveragenoobfb/video/7639108154579569951`

Local transcript files:

- `research/tiktok/7639108154579569951.vtt`
- `research/tiktok/7639108154579569951.md`

Key transcript facts:

- The product is called “Hermy's HQ” / “Hermes HQ.”
- The speaker says they “just added Forge Labs.”
- Forge has “three new intake forms,” and the UI is glowing because work is pending.
- Clicking Forge Labs enters the “systems architect department.”
- Named sub-agents in that department: `Blueprint`, `Relay`, `Pulse`, `Echo`, `Ember`.
- New intake blueprint forms are waiting at the “Blueprint Center.”
- The speaker avoids opening the Blueprint Center because it would show business information.

Visual read:

- Looks like a colorful 2D/3D HQ/city-map dashboard.
- More like an operational command-center map than a Sims-like free-roaming social simulation.
- Buildings/departments seem clickable.
- Glowing rooms/buildings indicate pending work.
- Floating cards/panels suggest task/agent/department state.

Implication for Agentarium:

This strengthens the direction toward **spatial operational dashboard** rather than pure AI-town social simulation. The core metaphor should be HQ → departments/labs → intake queues/centers → sub-agent teams.

## Immediate takeaways

1. The Gumroad product appears to sell a process/framework and HTML dashboard files, not necessarily a true interactive agent operating environment.
2. The static-image complaint is consistent with the tiny 375 KB package size and the review.
3. **Agentshire is rejected as the primary direction** because it feels too much like a Sims-style video game/social simulation rather than an office/operations tool.
4. **AI Town is still the strongest open-source base candidate**, but the target product is less “AI characters living in town” and more “HQ/department map for operational AI work.”
5. Agentarium’s differentiator should be operational usefulness: task/quest state, intake queues, real agent adapter boundaries, audit log, approval gates, replay, and eventually Hermes/OpenClaw/Codex/Claude integrations.

## Recommended next investigation

1. Clone and run Agentshire in a sandbox.
2. Clone and run AI Town in a sandbox.
3. Compare:
   - install friction
   - visual quality
   - real agent integration points
   - event/log model
   - extensibility
   - licensing
   - how hard it would be to adapt for Agentarium
4. Decide whether Agentarium should:
   - fork/adapt Agentshire
   - use AI Town as inspiration only
   - build a clean independent prototype
   - create a Hermes/OpenClaw bridge into one of these worlds
