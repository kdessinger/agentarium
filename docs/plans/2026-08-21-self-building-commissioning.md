# Self-Building Commissioning Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Turn the current Agentarium prototype into a resumable first-run commissioning experience that interviews the installer, independently selects visual style and world template, builds an approved configuration from matching art/placeholders and declarative manifests, and presents the completed world.

**Architecture:** Add a versioned commissioning domain beside the existing simulation domain. The builder is a deterministic state machine backed by Zustand persistence: interview → blueprint review → bounded build jobs → QA → final presentation. Phase 1 uses bundled concept art and local manifests; provider/model/image adapters remain declared but disconnected until separately approved.

**Tech Stack:** Existing Vite + React 19 + TypeScript + Zustand + Vitest + Playwright; CSS sprite/background layers; browser localStorage for the local prototype.

---

### Task 1: Define commissioning contracts

**Objective:** Add typed, versioned contracts for answers, plans, build jobs, generated assets, hotspots, and status.

**Files:**
- Modify: `app/src/lib/types.ts`
- Create: `app/src/lib/commissioningTypes.ts`
- Test: `app/src/lib/commissioningEngine.test.ts`

**Steps:**
1. Write failing schema/default-state tests.
2. Add `CommissioningSpec`, `BuildPlan`, `BuildJob`, `GeneratedAsset`, and `Hotspot` types.
3. Add schema version `1` and deterministic IDs.
4. Run `npm test -- commissioningEngine.test.ts` and verify pass.
5. Commit: `feat: define commissioning contracts`.

### Task 2: Create resumable commissioning store

**Objective:** Persist answers and status after each section and support resume/restart/export/import.

**Files:**
- Create: `app/src/store/commissioningStore.ts`
- Create: `app/src/lib/commissioningPersistence.ts`
- Test: `app/src/lib/commissioningPersistence.test.ts`

**Steps:**
1. Write failing tests for resume, version validation, restart backup, and import rejection.
2. Implement a namespaced localStorage adapter.
3. Persist only non-secret configuration.
4. Add `resume`, `restart`, `exportSpec`, and `importSpec` actions.
5. Verify tests, then commit: `feat: persist commissioning progress`.

### Task 3: Build the animated Commissioning Guide shell

**Objective:** Show an in-world Builder Agent and chat bubble instead of the operational ship when no completed commissioning record exists.

**Files:**
- Create: `app/src/components/commissioning/CommissioningScene.tsx`
- Create: `app/src/components/commissioning/CommissioningGuide.tsx`
- Create: `app/src/components/commissioning/GuideBubble.tsx`
- Create: `app/src/components/commissioning/CommissioningScene.css`
- Modify: `app/src/App.tsx`
- Test: `app/tests/commissioning.smoke.spec.ts`

**Steps:**
1. Write an E2E test that clears state and expects the guide.
2. Render construction-bay background and guide sprite/placeholder.
3. Add keyboard-accessible chat bubble controls and transcript drawer.
4. Implement reduced-motion behavior.
5. Run unit/E2E/build checks and commit: `feat: add commissioning guide`.

### Task 4: Implement the adaptive interview

**Objective:** Collect theme, agents, businesses/Forges, and governance answers into structured state.

**Files:**
- Create: `app/src/lib/commissioningQuestions.ts`
- Create: `app/src/lib/worldTemplates.ts`
- Create: `app/src/lib/visualStyles.ts`
- Create: `app/src/components/commissioning/VisualStyleChooser.tsx`
- Create: `app/src/components/commissioning/WorldTemplateChooser.tsx`
- Create: `app/src/components/commissioning/InterviewFlow.tsx`
- Create: `app/src/components/commissioning/AnswerEditor.tsx`
- Test: `app/src/lib/commissioningQuestions.test.ts`

**Steps:**
1. Write tests for six visual styles, Pixel Art enable/disable behavior, nine world templates, Custom Theme handling, required interview sections, and Forge classification.
2. Encode `Pixel Art`, `Illustrated 2D`, `Isometric 3D`, `Cinematic/Realistic`, `Clean Vector/Graphic`, and `Custom Visual Style` independently from world templates.
3. Make visual presentation the first interview decision. Pixel Art must be selectable for every template; when selected, ask 8-bit, 16-bit, modern high-detail, or custom fidelity.
4. Verify switching visual style preserves topology, rooms, agents, businesses, workflows, memory, and approvals while scheduling only the affected visual assets for replacement.
5. Encode `Space Station`, `Spaceship`, `Cruise Ship`, `Underground Bunker`, `Skyscraper`, `Resort`, `Sky Ship`, `Battleship`, and `Custom Theme` as typed templates with topology, movement, terminology, material, exterior, and world defaults.
6. Build accessible illustrated style cards followed by the template-card chooser; selecting a template shows a topology/terminology preview before confirmation.
7. Ensure `Custom Theme` collects setting, world context, layout logic, command area, movement system, materials, mood, and landmarks, then asks the user to confirm the interpretation.
8. Ask palette, rooms, and accessibility after style and world template are confirmed.
9. Add dedicated masked credential-intent controls that never store raw secrets.
10. Add back/edit and assumptions/open-questions review.
11. Verify and commit: `feat: add commissioning interview`.

### Task 5: Generate and approve a build blueprint

**Objective:** Convert answers into an inspectable topology, room roster, agent roster, workflow routes, asset plan, warnings, and unresolved questions.

**Files:**
- Create: `app/src/lib/commissioningEngine.ts`
- Create: `app/src/components/commissioning/BuildPlanReview.tsx`
- Test: `app/src/lib/commissioningEngine.test.ts`

**Steps:**
1. Write deterministic build-plan tests.
2. Generate room profiles and adjacency from answers.
3. Generate provider/model intent without claiming connections exist.
4. Show revise/approve/export/cancel actions.
5. Prevent jobs from running before approval.
6. Verify and commit: `feat: add commissioning blueprint approval`.

### Task 6: Register bundled art and hotspot topology

**Objective:** Make the current 23 concept images available to the builder and map selected rooms to background plates.

**Files:**
- Read: `docs/art/image-prompt-manifest.json`
- Use: `assets/concept-art/ship/ship-overview-cross-section.png`
- Use: `assets/concept-art/rooms/*.png`
- Create: `app/src/lib/bundledArtManifest.ts`
- Create: `app/src/lib/defaultHotspots.ts`
- Test: `app/src/lib/bundledArtManifest.test.ts`

**Steps:**
1. Write coverage tests for one ship and every seeded room.
2. Add stable room-to-asset mapping.
3. Add normalized hotspot polygons and room sprite anchors.
4. Fail clearly on missing assets; allow explicit placeholders.
5. Verify and commit: `feat: register bundled commissioning art`.

### Task 7: Implement bounded builder jobs and construction animation

**Objective:** Spawn truthful visual builders whose animation maps one-to-one to resumable jobs.

**Files:**
- Create: `app/src/lib/buildJobRunner.ts`
- Create: `app/src/components/commissioning/ConstructionBay.tsx`
- Create: `app/src/components/commissioning/BuildJobInspector.tsx`
- Create: `app/src/components/commissioning/AsciiBuildConsole.tsx`
- Test: `app/src/lib/buildJobRunner.test.ts`

**Steps:**
1. Write tests for dependencies, pause, resume, retry, cancellation, and idempotency.
2. Implement local job handlers for topology, art selection, agent manifests, workflows, safety, assembly, and QA.
3. Animate only from real job state—never a fake timer.
4. Add inspect/pause/retry/cancel controls.
5. Verify and commit: `feat: add resumable builder jobs`.

### Task 8: Assemble and present the commissioned ship

**Objective:** Load the approved build output into Ship Overview and provide a guided first tour.

**Files:**
- Modify: `app/src/components/WorldScene.tsx`
- Create: `app/src/components/ShipOverview.tsx`
- Create: `app/src/components/RoomView.tsx`
- Create: `app/src/components/CommissioningReport.tsx`
- Modify: `app/src/store/worldStore.ts`
- Test: `app/tests/commissioning.smoke.spec.ts`

**Steps:**
1. Write E2E test: finish offline build → ship appears → hotspot opens matching room.
2. Hydrate world state from commissioned manifests.
3. Transition from construction bay to whole-ship art.
4. Show commissioning report and guided tour.
5. Add Settings → Recommission without replacing the active ship until approved.
6. Verify and commit: `feat: present commissioned ship`.

### Task 9: Harden and verify

**Objective:** Prove local/offline commissioning, recovery, accessibility, and safety boundaries.

**Files:**
- Modify: `app/tests/commissioning.smoke.spec.ts`
- Modify: `README.md`
- Modify: `CONTEXT.md`

**Commands:**

```bash
cd app
npm test
npm run lint
npm run build
npm run test:e2e
```

**Manual verification:**

1. Clear commissioning state and reload.
2. Complete all four interview sections.
3. Revise one answer and approve the plan.
4. Pause/reload/resume the build.
5. Fail and retry one local room-art job.
6. Finish and open one ship hotspot/room.
7. Recommission one room without replacing the active ship before approval.
8. Confirm browser network log shows no external provider call.
9. Repeat with keyboard-only and reduced motion.

**Commit:** `test: verify self-building commissioning flow`.
