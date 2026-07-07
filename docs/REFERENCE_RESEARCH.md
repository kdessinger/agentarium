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

### Video: How my AI agents safely build and manage skills

Source: `https://www.tiktok.com/t/ZP8GDF97w/`

Resolved page: `https://www.tiktok.com/@androoagi/video/7624600530156784927`

Creator: `@androoagi` / androoAGI

Local transcript files:

- `research/tiktok/7624600530156784927.vtt`
- `research/tiktok/7624600530156784927.md`

Key transcript facts:

- The creator calls it an “interactive AI agent ecosystem dungeon in space.”
- AI agents “live inside” the spatial environment.
- Agents are organized into different rooms.
- Factory rooms represent autonomous businesses.
- A conveyor belt represents an Etsy store/business pipeline.
- A research agent constantly researches the autonomous businesses and competitors.
- The “armory room” is where the agent builds and manages its own skills on OpenClaw.
- A terminal/panel shows connected accounts/API keys, such as YouTube and Etsy, and what the agents have access to.
- Skills can be crafted by choosing type, name, and description.
- ClawHub is described as a site for downloading OpenClaw skills made by other people.
- The creator warns that third-party skills cannot be trusted and may contain malware.
- Recommended safety workflow: download untrusted skill → inspect internals → replicate/rebuild the skill rather than directly installing it.

Visual read:

- Looks like a colorful sci-fi management/strategy screen.
- Space-station/base layout with multiple rooms/modules in a grid/cutaway view.
- Rooms contain terminals, glowing panels, radar-like displays, tiny icons, labels, and status indicators.
- Top/status bars appear to show operational metrics such as revenue/orders/products/agent counts.
- More operational dashboard / management sim than free-roaming character sim.

Implication for Agentarium:

This adds a strong **space-station / connected-labs / compartmentalized HQ** metaphor. Keep the source phrase “dungeon” only as research context; do not use it as Agentarium’s product language. Rooms should map to capabilities. Agentarium should include an **Armory / Skill Center** where skills have provenance, permissions, quarantine status, inspection status, and replication/approval flow. This is more important than pure character wandering.

### Video: Fiverr thumbnail / autonomous business labs

Source: `https://www.tiktok.com/t/ZP8GDLEJC/`

Resolved page: `https://www.tiktok.com/@androoagi/video/7629513841348578573`

Creator: `@androoagi` / androoAGI

Local transcript files:

- `research/tiktok/7629513841348578573.vtt`
- `research/tiktok/7629513841348578573.raw.txt`
- `research/tiktok/7629513841348578573.md`

Key transcript/Kenn facts:

- AndrooAGI compares existing Fiverr sellers charging for AI-generated YouTube thumbnails.
- One example price mentioned: `$55`.
- The seller shown had `19` customers/orders waiting.
- AndrooAGI assigned/dedicated an AI agent to produce AI-generated YouTube thumbnails.
- He says the Fiverr service made about `$700` in about two weeks.
- Kenn clarifies the lab pattern: customer provides information → production agents create thumbnails → QA agents review/finalize → output is sent back to customer for a fee.
- The same video also references Etsy/Printify, TikTok marketing, supplement/UGC ad generation, 11Labs, and fulfillment/platform credentials.

Implication for Agentarium:

This is the clearest **customer-order lab** pattern so far:

```text
Customer request/order
  → intake parser
  → production agents
  → QA/review agents
  → approval/finalization
  → customer/platform delivery
  → revenue/order metrics
  → audit/replay
```

Agentarium should model labs as repeatable business-process machines, not just rooms. The QA-agent layer is first-class.

## Whop / course evidence

Source: `https://whop.com/biz_G14Fv5QNEzdoMI`

Resolved URL observed: `https://whop.com/joined/biz_G14Fv5QNEzdoMI/`

Local research file:

- `research/whop-ai-agent-academy.md`

Visible page facts:

- Product/community: **AI Agent Academy**
- Creator shown: Androo
- Rating shown: 5.0 with 25 reviews
- Joined count shown: 1,611 joined
- Description snippet says it teaches building, deploying, and scaling AI agents that automate real business workflows, but also shows `CURRENTLY A WAIT L...`
- Visible sections include Getting Started, Courses, AI Etsy Factory Guide, Livestreaming, General Chat, Help & Troubleshooting, Agent Ecosystems, Announcements.

Implication for Agentarium:

AndrooAGI is monetizing the know-how through a course/community, apparently still waitlist/unfinished from the visible snippet. The market is early and demand exists, but Agentarium should focus on building the actual operational substrate rather than selling static demos or vague courseware.

### Video: Orchestration layer station walkthrough

Source: `https://www.tiktok.com/t/ZP8GD1dKF/`

Resolved page: `https://www.tiktok.com/@androoagi/video/7623915514556960031`

Creator: `@androoagi` / androoAGI

Local transcript files:

- `research/tiktok/7623915514556960031.vtt`
- `research/tiktok/7623915514556960031.md`

Engagement observed:

- Plays: 849,100
- Likes: 43,100
- Comments: 639
- Saves: 22,513
- Shares: 8,457

Key station/agent facts:

- The system exists so AndrooAGI can see where agents are and what they are doing at any moment.
- Human operator sits in a command chair / dashboard and can see revenue, per-agent detail, and weekly performance.
- `Ultron` sits in the same command room and is the main commander/orchestrator, running on Opus 4.6.
- `Nova` is not just generic research; Nova is the market-intelligence success engine for Etsy.
- The transcript says the secret is not that agents produce products, but that Nova researches stores/products doing extremely well and sends proven concepts to Forge.
- Nova looks at what people are already buying, extracts concepts, and hands them to Forge to generate designs based on that research.
- Nova also monitors other active businesses and AI/model news.
- Focused note: `research/nova-etsy-success-loop.md`.
- `Forge` is the factory/Etsy agent, focused on the Etsy store, connected to Nano Banana Pro and Printify, and creates Etsy listings.
- Printify is connected to Etsy for manufacturing and shipping.
- `Pixel` is the main designer of the station/rooms, is connected to Nano Banana Pro, and runs the Fiverr YouTube-thumbnail service.
- `Cipher` is in the communications deck, manages/responds to emails, monitors comments, and alerts the human.

Implication for Agentarium:

This video defines the first concrete station set:

- Mission Control / Command Deck
- Steward / Orchestrator Seat
- Research Lab
- Factory / Etsy / Fulfillment Lab
- Design Studio / Fiverr Thumbnail Lab
- Communications Deck
- Review / Governance Station
- Tool Access / Connected Platform Panel
- Metrics / Performance Panel

This should drive the MVP more than the earlier generic three-agent plan.

### Video: Autonomous Etsy store / Forge integration

Source: `https://www.tiktok.com/t/ZP8GD2u4P/`

Resolved page: `https://www.tiktok.com/@androoagi/video/7624221990563351839`

Creator: `@androoagi` / androoAGI

Local transcript files:

- `research/tiktok/7624221990563351839.vtt`
- `research/tiktok/7624221990563351839.md`

Engagement observed:

- Plays: 151,300
- Likes: 9,556
- Comments: 213
- Saves: 5,321
- Shares: 2,619

Key facts:

- The Etsy store is represented on the spatial canvas as a conveyor belt.
- The Etsy store can be accessed/managed from a dashboard.
- Reported store metrics in video: about 40 orders and nearly $2,000 revenue.
- AndrooAGI recommends roughly three agents for an autonomous Etsy setup.
- `Nova` researches Etsy products/stores that are performing well and sends findings to `Forge`.
- `Forge` has access to Printify and Nano Banana Pro / Gemini.
- Nano Banana Pro/Gemini is used to design products.
- Etsy seller account and Printify account are required.
- Printify receives designs on product templates and handles printing/shipping when Etsy orders arrive.
- Printify API key and Etsy API key connect to the main factory agent.
- `Forge` creates product photos and sends them to `Pixel`.
- `Pixel` curates TikTok slideshows and supports media/YouTube work.

Most important new mechanism:

- Early Forge output quality was poor.
- AndrooAGI built an approve/reject feedback system.
- Forge showed candidate designs; the human approved or rejected them.
- This was repeated hundreds of times over 2–3 days.
- Forge then became trusted enough to create products more autonomously.

Implication for Agentarium:

Add **lab maturity states** and **training feedback loops**. New labs should begin supervised/simulated, collect approve/reject feedback, and only later graduate to trusted/autonomous-with-audit modes. This is not just safety; it is how lab quality improves.

### Video: AI Agent Environment Tour

Source: `https://www.tiktok.com/t/ZP8GDh5Y7/`

Resolved page: `https://www.tiktok.com/@androoagi/video/7636984528522824991`

Creator: `@androoagi` / androoAGI

Local research files:

- `research/tiktok/7636984528522824991.vtt`
- `research/tiktok/7636984528522824991.raw.txt`
- `research/tiktok/7636984528522824991.md`

Engagement observed:

- Plays: 1,100,000
- Likes: 72,900
- Comments: 1,515
- Saves: 29,137
- Shares: 21,700

Tour inventory:

- `Ultron` / head orchestrator
- Factory Room / `Forge`
- Etsy stores using Printify/Printful fulfillment
- Supplement business using Suppleful
- Research Lab / `Nova`
- Communications Base
- Archives / Obsidian-like durable context
- Feedback section for approve/reject/iterate notes
- Armory for OpenClaw skills
- Treasury Room for monthly agent cost management
- Media Bay for drag/drop TikTok scheduling and content management
- War Room for daily/weekly agent performance review
- Second Factory Room / `Vibes` DJ music agent
- Pixel Lab for game assets
- Fiverr thumbnail service
- Blog / affiliate room
- Agent break room / flavor space

Implication for Agentarium:

This video expands Agentarium from a task visualization canvas into a full **AI business operating system**. The MVP should stay small, but the architecture should reserve explicit surfaces for treasury/cost control, archives/memory, feedback/training, war-room strategy reviews, media publishing, unified communications, fulfillment-backed factory labs, and marketplace/content labs.

### Video: Ultron, articulation, and founder-to-orchestrator loop

Source: `https://www.tiktok.com/t/ZP8GmTjxH/`

Resolved page: `https://www.tiktok.com/@androoagi/video/7649210408812760350`

Creator: `@androoagi` / androoAGI

Local research files:

- `research/tiktok/7649210408812760350.vtt`
- `research/tiktok/7649210408812760350.raw.txt`
- `research/tiktok/7649210408812760350.md`

Engagement observed:

- Plays: 169,300
- Likes: 9,067
- Comments: 206
- Saves: 3,963
- Shares: 1,342

Useful architecture, stripped of persona:

- `Ultron` is the top-level steward/orchestrator inside “Ultron OS.”
- The visible dashboard, roles, agents, workflows, and Etsy store began as a human-articulated vision.
- Human describes the desired system to Ultron.
- Ultron decomposes the vision and instructs/delegates work to other agents.
- Agents build pieces and return outputs.
- Human reviews/corrects outputs.
- The loop repeats: instruction → output → feedback → rebuild.
- Key claim: articulation is the crucial skill; vague instructions produce vague outputs.
- Agents are builders/operators; the human/founder remains responsible for vision, standards, and feedback.

Implication for Agentarium:

Add an **Articulation Console** attached to Mission Control / Steward Seat. It should turn a human-described lab/system idea into a structured blueprint of rooms, agents, tools, workflows, dashboards, metrics, approval gates, risks, and simulation-first setup.

Tone rule:

Do **not** copy AndrooAGI’s hostile persona, cruelty language, or job-replacement framing. Keep the architecture; discard the attitude.

## Immediate takeaways

1. The Gumroad/Bryan product appears downstream from the broader AndrooAGI/OpenClaw-style ecosystem trend and may sell process/framework/static dashboard files rather than a true interactive agent operating environment.
2. AndrooAGI is the original high-skill reference Kenn found; Bryan came later through links/comments and appears more commercialized/amateur by comparison.
3. The desired product should not be called a “dungeon.” Kenn prefers a master system / AI operations canvas / connected labs metaphor.
4. The target is **not** an AI social simulation. It is a gamified master canvas where individual AI labs do specific work and connect into one visible operating system.
5. **Agentshire is rejected as the primary direction** because it feels too much like a Sims-style video game/social simulation rather than an office/operations tool.
6. **AI Town remains a possible technical/reference base**, but the target product is less “AI characters living in town” and more “connected operational AI labs on a spatial canvas.”
7. Agentarium’s differentiator should be operational usefulness: task/intake state, lab pipelines, real agent adapter boundaries, audit log, approval gates, replay, permissions, and skill quarantine/replication.

## Recommended next investigation

1. Continue collecting/transcribing AndrooAGI videos to reconstruct the product model.
2. Identify whether AndrooAGI names or links any underlying open-source repo/framework.
3. Inspect AI Town as a possible rendering/simulation/event-state base, but do not let it pull the product toward social simulation.
4. Search specifically for open-source projects matching: spatial AI operations canvas, OpenClaw labs, agent rooms, AI dungeon in space, ClawHub skill manager, conveyor-belt agent pipelines.
5. Decide whether Agentarium should:
   - fork/adapt AI Town for rendering/state only
   - build a clean independent prototype inspired by these videos
   - create a Hermes/OpenClaw bridge into a spatial canvas
   - use a builder first to mock the UI while keeping repo-owned architecture
