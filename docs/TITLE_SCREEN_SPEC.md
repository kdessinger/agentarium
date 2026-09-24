# Agentarium Title Screen Specification

**Status:** locked product direction; implementation pending  
**Scope:** Fresh-install introduction screen only  
**Authority:** Read with `DECISIONS.md`. This specification locks the design language for the title screen and is referenced from the broader `COMMAND_SHELL_AND_CREW_SPEC.md`.

## 1. Product objective

The title screen is the Captain's first encounter with Agentarium. It must communicate three things in seconds:

1. Agentarium is a game-like command environment.
2. Agentarium is an AI operations system.
3. Something larger waits beyond the screen.

The screen should feel like entering a world, not opening an app.

## 2. Approved design language

The locked design comes from a vibe-coded reference implementation that:

- Renders a monumental, metallic, glitched `AGENTARIUM` wordmark.
- Places a striped synthwave sun centered behind the start panel.
- Uses a perspective cyan/violet wireframe floor that converges at a horizon line.
- Includes a sparse three-color star field (cyan, white, magenta).
- Adds a soft CRT scanline overlay.
- Provides a top system rail with build id, system code, and an "online" status light.
- Provides side telemetry terminals labeled `AGENT SCAN` and `UPLINK`.
- Centers a dark command panel with corner brackets and a blinking cursor.
- Anchors the bottom with arcade-flavored copyright and `INSERT CREDITS · 00` flavor.
- Defines the primary palette around cyan, violet, magenta, yellow, and lime green accents.

The reference pixel portraits and synthetic telemetry values stay as visual flavor.

The Captain's first action is a single `Begin` control that opens the Orchestrator setup shell already in `D-012`.

## 3. Side telemetry honesty rules

The `AGENT SCAN` and `UPLINK` panels on the title screen are **pure fiction**. They exist to communicate genre and tone, not system state.

Hard rules:

- Treat these panels as decorative atmosphere in code, accessibility trees, and tests.
- Never expose them as real `textbox`, `meter`, `progressbar`, or `status` widgets.
- Never animate numbers or labels as if they reflected real metrics.
- Never seed them from real workspace counts or quota state.
- Do not let any future code path read from them as if they were authoritative.

This is the only approved place in Agentarium where purely fictional numbers appear. Operational surfaces must remain honest.

## 4. Required visible content

The title screen must visibly include exactly:

- `AGENTARIUM` wordmark.
- A short, single-line product descriptor.
- A short slogan positioned beneath the sun.
- A single `Begin` control with a clearly stated action.
- The optional decorative telemetry panels and footer text described above.
- A safe-area-aware bottom credit line that never collides with browser chrome.

It must not include:

- Questions.
- Form fields.
- Mode selection.
- Real or implied operational metrics.
- Any claim about intelligence, providers, crew, training data, accounts, or connections.

## 5. Begin control contract

The `Begin` control is the single primary action. It must:

- Be a real semantic button with an accessible name that includes the action verb.
- Respond to mouse, keyboard (`Enter`/`Space`), and touch.
- Respond to a one-time `keydown` listener that ignores modifier-only presses, `Tab`, and key repeats.
- Provide a visible focus state that uses the screen's cyan/lime language.
- Hide any custom keypress behavior once activated to prevent double transitions.
- Respect `prefers-reduced-motion` for the blinking cursor, scanline drift, and any future title animation.

## 6. Device and accessibility behavior

The title screen must work at:

- 1440×900 desktop reference.
- 1920×1080, 1366×768, 1280×720.
- 390×844 mobile portrait.
- Common browser zoom levels from 100% to 200%.

Requirements:

- Side telemetry is hidden below 900px width.
- The wordmark scales by `clamp()` and never causes horizontal scroll.
- The composition respects `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
- Vertical spacing uses `100dvh` rather than `100vh`.
- Status rail and footer text remain legible at small widths.

## 7. Implementation notes

Implementation:

- Lives in `app/src/components/TitleScreen.tsx`.
- Styles live in `app/src/title-screen.css` and are imported from `app/src/main.tsx`.
- Component renders only decorative content in the left/right terminals (no measurable state).
- Accessibility tree uses `aria-hidden="true"` on all decorative layers.
- The component receives only an `onEnter` callback and has no other props.
- The React app's existing `AgentariumTitleScreen` export is replaced by `TitleScreen` so the `OnboardingSetup` import surface stays consistent.

Tests:

- Title screen tests must assert the new copy, layout landmarks, and the `Begin` button contract.
- Tests must not assert against fictional telemetry values.

## 8. Future hooks

Future additions may introduce:

- A subtle world-construction animation under the sun.
- A second visual preset selectable on this screen for the Captain who wants a calmer first frame.
- A persistent "skip" path for evaluators.

These hooks do not change the locked design language above.
