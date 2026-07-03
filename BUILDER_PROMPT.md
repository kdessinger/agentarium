# Agentarium AI Builder Prompt

Use this with v0, Bolt, Lovable, or another app builder when you want a fast frontend prototype. Best fit: v0 or Bolt. The builder's job is frontend prototype only, not production backend or real autonomous execution.

---

## Prompt

Build a polished frontend prototype for **Agentarium**, a gamified 3D world for coordinating AI agent ecosystems.

### Product thesis

Agentarium turns AI agent orchestration into a visible interactive world. Specialized AI agents are represented as characters/NPCs. Tasks are quests. The orchestrator is a command center / quest board. Tools are buildings. Handoffs are visible paths/messages. Human approval is a gate. The event log is the world history.

### Stack

Use React with TypeScript. If possible, use Three.js / React Three Fiber for the 3D world. If the environment cannot support true 3D, create a convincing pseudo-3D/isometric prototype with clean component boundaries so React Three Fiber can replace it later.

### Required screens/components

Create a full-viewport app with these surfaces:

1. **3D World View**
   - fills the available viewport
   - warm sci-fi command-village style
   - shows three agent avatars:
     - Researcher
     - Builder
     - Reviewer
   - shows buildings:
     - Quest Board / Command Center
     - Library
     - Workshop
     - Review Chamber
     - Approval Gate
     - Memory Archive
   - visual status for idle, working, waiting approval, complete, failed

2. **Quest Board Panel**
   - create/start one demo quest
   - show objective, status, risk level, acceptance criteria
   - button: Start Quest
   - button: Reset World

3. **Agent Inspector Panel**
   - selected agent name, role, status, current task
   - skills/level/XP
   - recent messages
   - permissions

4. **Orchestrator Console**
   - shows decomposition plan
   - shows why each agent was selected
   - shows handoff chain
   - shows current mode: Simulation

5. **Approval Gate Modal/Panel**
   - appears when the Reviewer requests human approval
   - explains proposed action and risk level
   - buttons: Approve, Deny

6. **Event Log / Replay Panel**
   - chronological events with timestamps
   - event types like quest.created, agent.assigned, agent.message.sent, approval.requested, quest.completed
   - readable summaries

### Demo behavior

The app should include mock state and a deterministic demo flow:

Human starts quest:

```text
Research competitor options for an AI landing page and draft a first prototype plan.
```

Then simulate:

1. Orchestrator decomposes quest.
2. Researcher goes to Library and produces findings.
3. Builder goes to Workshop and creates draft output.
4. Reviewer goes to Review Chamber and checks quality.
5. Approval Gate appears because external publishing would require approval.
6. User approves.
7. Quest completes.
8. Event log shows the full audit trail.

### Technical requirements

- Keep all mock data in an obvious module like `src/lib/mockWorld.ts`.
- Put shared types in `src/lib/types.ts`.
- Put state/actions in a replaceable store like `src/store/worldStore.ts`.
- Do not use real APIs, real LLM calls, real credentials, auth, billing, or database writes.
- Make the API boundary obvious so a real backend can replace mock data later.
- Components should be named by function, not marketing filler.
- The app must be exportable and runnable locally.

### Visual style

Warm sci-fi guild hall / command village. Think miniature diorama meets mission control. Avoid sterile enterprise dashboards. Use readable labels, glowing paths, status colors, and clear visual hierarchy.

The 3D world must use the full viewport. Do not put a tiny canvas inside a boxed dashboard.

### Acceptance criteria

- App runs locally.
- Main world fills the viewport.
- Three agents and five buildings are visible.
- Start Quest triggers visible state changes.
- Event log updates as the simulation runs.
- Approval gate pauses the flow.
- Approve completes the quest.
- Reset returns to initial state.
- No real external actions occur.

### Non-goals

Do not build:

- production auth
- billing
- real autonomous external actions
- agent marketplace
- real database
- real LLM integrations
- deployment setup

Build the prototype UI and mock event model only.
