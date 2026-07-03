# Agentarium

A gamified 3D world for building, watching, and coordinating an ecosystem of specialized AI agents.

## One-sentence thesis

Agentarium turns multi-agent AI orchestration into a visible, interactive world: agents become characters, tasks become quests, tools become buildings, workflows become roads, and progress becomes something you can watch, steer, and improve.

## What this is

This project is not just a chatbot with cute graphics. It is a control surface for an AI agent ecosystem:

- specialized agents with distinct roles
- an orchestrator that assigns work
- visible task state and handoffs
- world/game mechanics that make agent behavior legible
- safety/governance gates before real-world actions
- a path from simulated prototype to real agent execution

## Core docs

- `PRODUCT_BLUEPRINT.md` — product vision, mechanics, architecture, MVP scope.
- `ARCHITECTURE.md` — technical system design and boundaries.
- `MVP_PLAN.md` — bite-sized implementation plan.
- `BUILDER_PROMPT.md` — prompt for v0/Bolt/Lovable-style frontend prototyping.
- `AGENTS.md` — instructions for AI coding agents working in this project.
- `CONTEXT.md` — handoff context for fresh agents.

## Working principle

Start with a beautiful fake-but-honest simulation, then replace simulated agents with real agents one boundary at a time.

Do not begin by building a giant autonomous swarm. Begin with three agents, one orchestrator, visible messages, quest state, and a replayable activity log.
