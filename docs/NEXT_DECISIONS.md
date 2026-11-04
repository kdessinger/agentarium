# Next Decisions

> **Archived decision snapshot.** Implementation has started and the choices below are historical context, not the active queue. Current work and unresolved decisions live in `NEXT.md`; locked decisions live in `DECISIONS.md`.

These were the choices recorded before implementation started.

## 1. Name

Working name: **Agentarium**

Alternatives:

- Agentarium
- AgentWorld
- GuildMind
- Orchestria
- AgentQuest
- MindForge
- ColonyOS

Recommendation: keep Agentarium for now. It is distinct enough and captures the living ecosystem feel.

## 2. First build path

Recommended path:

1. Use v0/Bolt to generate the visual prototype if speed matters.
2. Pull/export the code into this repo.
3. Clean up state/contracts locally.
4. Add real backend/orchestration later.

Alternative path:

- Build locally from scratch with Vite + React Three Fiber.

Recommendation: if the goal is to see the idea quickly, use the builder prompt first. If the goal is clean code from day one, build locally.

## 3. Visual metaphor

Pick one before UI work:

- sci-fi command village
- fantasy adventurer guild
- cyberpunk workshop city
- space station mission control
- cozy miniature diorama

Recommendation: warm sci-fi command village.

## 4. Real agent integration order

Do not integrate everything at once.

Suggested order:

1. Simulated agents.
2. Local deterministic orchestrator.
3. One real read-only research agent.
4. One real coding/building agent in a sandbox.
5. Reviewer/governor agent.
6. Approval-gated external tools.

## 5. Product angle

Possible directions:

- developer tool for managing coding agents
- business tool for managing AI workflows
- educational simulation for learning agent ecosystems
- personal AI command center
- game-like agent operating system

Recommendation: start as a developer/operator tool. That keeps the problem real while the 3D presentation makes it novel.
