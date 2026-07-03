# Agentarium MVP Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task once Kenn chooses a stack or approves the default.

**Goal:** Build a local browser prototype of a gamified 3D AI-agent ecosystem where three simulated agents complete one quest through visible handoffs and an approval gate.

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

## Phase 3 — 3D world

### Task 3.1: Create full-viewport canvas layout

**Objective:** Replace default app with immersive full-page shell.

**Files:**
- Modify: `app/src/App.tsx`
- Modify: `app/src/App.css` or equivalent styles

**Verification:**

- Canvas fills viewport.
- Inspector panels overlay without shrinking the world.

### Task 3.2: Render buildings and agents

**Objective:** Show simple buildings and three visible agents.

**Files:**
- Create: `app/src/components/WorldScene.tsx`
- Create: `app/src/components/AgentAvatar.tsx`
- Create: `app/src/components/Building.tsx`

**Verification:**

- Agents render at distinct positions.
- Buildings render as labeled areas.

### Task 3.3: Animate agent state

**Objective:** Make agents move or visually change when assigned/working/blocked.

**Files:**
- Modify: `AgentAvatar.tsx`
- Modify: `WorldScene.tsx`

**Verification:**

- Starting quest changes visible agent activity.

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

- Full-screen 3D world loads locally.
- Three agents are visible.
- One quest can be started.
- Agents visibly work in sequence.
- Message/handoff events are visible.
- Human approval gate pauses the flow.
- Approving completes the quest.
- Event log proves what happened.
- Mock data/contracts are easy to replace with real backend later.
