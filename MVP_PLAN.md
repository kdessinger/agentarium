# Agentarium MVP Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task once Kenn chooses a stack or approves the default.

**Goal:** Build a local browser prototype of a gamified AI-operations canvas where the primary experience is a pixel-art/isometric space-station game interface: Ship Overview → Room View → Agent View. The simulation should route one work order through visible handoffs and an approval gate, but the UI should feel like an animated living ship, not a flat dashboard.

**Architecture:** Start frontend-only with mock data and an event-driven state model. Keep contracts shaped for a future backend. Add real agent execution only after the world model and task visibility work.

**Default Tech Stack:** Vite React + TypeScript + React Three Fiber + Zustand + CSS/Tailwind-style utility classes.

---

## Phase 0 — Project decision

### Task 0.1: Confirm working name and stack

**Objective:** Decide whether to keep `Agentarium` and use the default stack.

**Files:**
- Read: `README.md`
- Read: `PRODUCT_BLUEPRINT.md`
- Read: `ARCHITECTURE.md`

**Decision needed:**

- Name: `Agentarium` or another name.
- Stack: Vite React/R3F or Next.js/R3F.
- Builder: hand-coded locally, v0 first, Bolt/Lovable first, or direct OpenCode/Codex.

## Phase 1 — Frontend scaffold

### Task 1.1: Create app scaffold

**Objective:** Create a local React/TypeScript frontend app.

**Files:**
- Create app under project root or `app/`.

**Command if using Vite:**

```bash
npm create vite@latest app -- --template react-ts
cd app
npm install
npm install three @react-three/fiber @react-three/drei zustand
npm run dev
```

**Verification:**

- App runs locally.
- Browser shows default page.

### Task 1.2: Add core types

**Objective:** Define `Agent`, `Quest`, `Task`, `WorldEvent`, and `ApprovalRequest`.

**Files:**
- Create: `app/src/lib/types.ts`

**Verification:**

- TypeScript compiles.

### Task 1.3: Add mock world data

**Objective:** Seed the first world with three agents, one quest template, and empty event log.

**Files:**
- Create: `app/src/lib/mockWorld.ts`

**Verification:**

- Mock data imports cleanly.

## Phase 2 — World state and event engine

### Task 2.1: Create world store

**Objective:** Add state management for agents, quests, approvals, and events.

**Files:**
- Create: `app/src/store/worldStore.ts`

**Required actions:**

- `createQuest`
- `startQuest`
- `advanceSimulation`
- `requestApproval`
- `approveRequest`
- `denyRequest`
- `resetWorld`

**Verification:**

- Store unit/smoke test or dev page can call actions without errors.

### Task 2.2: Implement deterministic quest simulation

**Objective:** Make one quest move through orchestrator → researcher → builder → reviewer → approval → complete.

**Files:**
- Modify: `app/src/store/worldStore.ts`

**Verification:**

- Event log shows ordered events.
- Agent statuses change correctly.

## Phase 3 — Pixel-art world and nested navigation

Phase 2 proved the basic state and workflow model. Kenn's feedback after the first pass: the next iteration should move much closer to the generated concept image — a video-game-like animated pixel-art space station.

The Phase 3 target interaction model is:

```text
Ship Overview → Room View → Agent View
```

The existing app may be refactored rather than thrown away, but the visual priority changes: the world should become the main interface and dashboards should become secondary overlays.

### Task 3.1: Create full-viewport ship overview

**Objective:** Replace/reshape the current canvas into an immersive pixel-art or isometric ship overview.

**Files:**
- Modify: `app/src/App.tsx`
- Modify: `app/src/App.css` or equivalent styles

**Verification:**

- Canvas fills viewport.
- Inspector panels overlay without shrinking the world.

### Task 3.2: Render room dioramas and animated agents

**Objective:** Replace plain station boxes/nodes with room diorama components that look like pixel-art rooms inside a space-station cutaway.

**Files:**
- Modify/Create: `app/src/components/WorldScene.tsx`
- Create/Modify: `app/src/components/RoomDiorama.tsx`
- Create/Modify: `app/src/components/AgentSprite.tsx`
- Create/Modify: `app/src/components/RouteOverlay.tsx`

**Verification:**

- The ship overview shows all major rooms as distinct visual interiors.
- Rooms have ambient animated state: blinking screens, pulsing route lights, small agent movement, conveyor/machinery effects, sleeping/idle states where appropriate.
- Animation remains tied to app state and has a reduced-motion fallback.

### Task 3.3: Add nested navigation — Ship Overview → Room View → Agent View

**Objective:** Add the core game-like interaction model.

**Required behavior:**

- Ship Overview: shows the whole station and all rooms.
- Double-click a room: navigate to Room View.
- Room View: shows that room's profile, interior, agents/subagents, queues, tools, packets, and current work.
- Double-click an agent: navigate to Agent View.
- Agent View: shows character/profile data and future controls for modifying function, tools, permissions, and behavior.
- Provide obvious Back / Return to Ship controls.

**Files:**
- Modify: `WorldScene.tsx`
- Create: `RoomView.tsx`
- Create: `AgentView.tsx`
- Modify: store/router selection state as needed

**Verification:**

- Double-click navigation works with mouse.
- Equivalent keyboard-accessible controls exist.
- Returning from Agent View → Room View → Ship Overview preserves simulation state.

### Task 3.4: Preserve operational truth under the game layer

**Objective:** Keep the state/event/approval model from Phase 2 while changing the presentation to a game-like world.

**Verification:**

- Every visible animation maps to a station, agent, task, packet, approval, or event state.
- Inspectors and audit timeline remain available as overlays.
- Simulation-only boundaries remain visible.
- No visual implies live external publishing, spending, messaging, or agent autonomy.

## Phase 4 — Operational UI overlays

### Task 4.1: Add quest board

**Objective:** Let the user start/reset the MVP quest.

**Files:**
- Create: `app/src/components/QuestBoard.tsx`

**Verification:**

- Start button begins simulation.
- Quest status is visible.

### Task 4.2: Add agent inspector

**Objective:** Clicking/selecting an agent shows role, status, task, XP, and recent messages.

**Files:**
- Create: `app/src/components/AgentInspector.tsx`

**Verification:**

- Inspector updates when selected agent changes.

### Task 4.3: Add event log

**Objective:** Show the audit trail behind the animation.

**Files:**
- Create: `app/src/components/EventLog.tsx`

**Verification:**

- Every simulation step creates a readable event.

### Task 4.4: Add approval gate UI

**Objective:** Pause the quest for human approval before completion.

**Files:**
- Create: `app/src/components/ApprovalGate.tsx`

**Verification:**

- Quest pauses at approval.
- Approve continues.
- Deny marks blocked/failed.

## Phase 5 — Polish and handoff

### Task 5.1: Add world styling

**Objective:** Give the scene a warm sci-fi command-village feel.

**Verification:**

- World reads clearly at full viewport.
- Status colors are obvious.

### Task 5.2: Add README run instructions

**Objective:** Document how to run the prototype locally.

**Files:**
- Modify: `README.md`

**Verification:**

- Fresh agent/user can run the app from the docs.

### Task 5.3: Add smoke verification

**Objective:** Add a minimal test or script proving the simulation reaches expected states.

**Verification:**

- `npm test` or `npm run build` passes.

## Definition of done for MVP prototype

- Full-screen pixel-art/isometric ship overview loads locally.
- Ship Overview → Room View → Agent View works.
- Three agents are visible.
- One quest can be started.
- Agents visibly work in sequence.
- Message/handoff events are visible.
- Human approval gate pauses the flow.
- Approving completes the quest.
- Event log proves what happened.
- Mock data/contracts are easy to replace with real backend later.
