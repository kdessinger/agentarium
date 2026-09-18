# Instrument View and The Arcade

**Status:** accepted product direction; not implemented

## Decision

Agentarium keeps its primary navigation model:

```text
World Overview → Room View → Agent View
```

It also gains a second, contextual branch from Room View:

```text
Room View → Instrument View
```

Instrument View is not a fourth linear zoom level and is not an agent profile. It is the focused operational or recreational surface reached by interacting with a physical object in a room: a bridge monitor, console, holographic table, archive reader, workshop PC, or arcade terminal.

The interaction grammar is deliberate:

| Surface | User question it answers |
| --- | --- |
| World Overview | Where is the system and how are its functions connected? |
| Room View | What operational function owns this space and what is happening here? |
| Agent View | Who is doing the work, with which tools, permissions, and current assignment? |
| Instrument View | What can this station show or allow me to do? |

A room remains the owner of an instrument. An instrument never becomes an unowned generic dashboard.

## Transition and return behavior

Entering an instrument should feel like using a real object in the spatial world:

1. In Room View, the selected physical instrument has an obvious interaction affordance and a truthful status: available, unconfigured, disconnected, blocked, demo-only, or external.
2. Selecting it locks the camera on the object, pushes toward the display, and lets the display glow expand into the viewport.
3. The focused surface opens with minimal Agentarium chrome: room name, instrument name, availability/data-source state, and `Return to <Room>`.
4. Returning reverses to the originating room and preserves the room camera, selected agent, panel state, and scroll/focus context.

The animation is explanatory rather than ornamental: entering and returning must remain possible without motion, by keyboard, and through an accessible 2D inspector/control.

## Instrument contract

Every instrument is a first-class registered surface rather than an arbitrary iframe or dashboard link. Its manifest must declare:

```ts
type InstrumentManifest = {
  id: string;
  roomId: string;
  name: string;
  category: 'operational' | 'recreational' | 'external';
  capability: 'read_only' | 'supervised_control' | 'approval_gated_action';
  sourceKind: 'native' | 'adapter' | 'external_experience';
  provenance: 'real' | 'user_entered' | 'derived' | 'synthetic_demo' | 'external';
  availability: 'available' | 'unconfigured' | 'disconnected' | 'blocked' | 'demo_only';
  permissions: string[];
  auditPolicy: 'none' | 'view_events' | 'action_events';
  launch: {
    mode: 'native' | 'embedded' | 'new_tab';
    url?: string;
    fallback: 'native_notice' | 'new_tab';
  };
};
```

Requirements:

- Standard mode must show only real, user-entered, derived, or honestly unconfigured instrument state. It must not decorate a console with synthetic operational metrics.
- Demo-only instruments and synthetic data use the existing Demo namespace/provenance rules and cannot affect Standard records, budgets, maturity, memory, feedback, or decisions.
- Any instrument capable of a consequential action must use the same runtime-enforced permission, approval, and audit policy as the rest of Agentarium. A pretty control surface is never an authorization boundary.
- Operational instruments must show provenance and the underlying event/log/evidence path behind any live state or visualization.
- External experiences receive no Agentarium credentials, session authority, agent controls, or operational data by default.
- An embed failure, provider policy change, or connectivity failure must resolve to an honest notice plus the declared safe fallback, never an invisible blank frame.

## Initial instrument vocabulary

These are product concepts, not claims of existing integrations.

| Owning room | Instrument | Purpose | Initial capability |
| --- | --- | --- | --- |
| The Bridge | Spatial Intelligence Console | A God’s Eye View-style globe for spatial/world context and configured public signals | read-only, external/native adapter as appropriate |
| The War Room | Fleet Operations Console | Agent status, queues, handoffs, costs, model use, risks, and recent operational evidence; inspired by the information density of C-Suite without copying its UI or data model | read-only, then supervised controls |
| Archives | Memory Observatory | Knowledge graph, retrieval provenance, timelines, and memory controls | read-only, then supervised controls |
| Forge / Developer | Production Board / Build Console | Artifact progress, build/test/deploy evidence, and approval-bound release controls | supervised control |
| Security | Security Operations Desk | Authorized asset posture, security evidence, alerts, and remediation gates | read-only, then approval-gated action |
| Communications | Signal Console | Messages, voice notes, delivery queues, and approval-before-send surfaces | supervised control |

The Bridge’s Spatial Intelligence Console should make the world feel like a command surface, not a random linked site. Its initial proof can use a read-only configured globe. It must label public-data inference as context, not authoritative intelligence.

## The Arcade

**The Arcade** is a proposed non-production room for curiosity, culture, experimentation, and contained digital experiences. It is distinct from **Ten Forward**:

- **Ten Forward** is the social/recreational living room for agents and the operator.
- **The Arcade** is a retro-computing and experimental-media room built around interactive machines.

It does not produce operational work, compete with a Forge, or generate productivity metrics. It makes the ship feel inhabited without pretending play is production.

### Retro Terminal 01 — WINDOWS93

The centerpiece prototype is a beige CRT/retro computer. Selecting its screen opens an Instrument View for [WINDOWS93](https://www.windows93.net/):

```text
The Arcade
  → Retro Terminal 01
  → phosphor-screen zoom / optional boot transition
  → WINDOWS93 external experience
  → Return to The Arcade
```

The focused frame must visibly identify this as an external recreational experience and provide `Return to The Arcade` plus `Open externally`.

Guardrails:

- Use an embedded surface only when the remote site’s current browser policy permits it; otherwise open a new tab from an explicit user action.
- Do not proxy, scrape, copy, redistribute, or present WINDOWS93 as an Agentarium-owned product.
- Do not send credentials, cookies, operator identity, internal state, or agent telemetry to the external experience.
- Do not allow it to control agents, tasks, integrations, or ship state.
- Treat its availability as external and transient. A changed framing policy must render the instrument’s fallback state, not break Room View.

Future Arcade instrument classes may include a Signal Cabinet for explicitly selected public radio, a Simulation Cabinet for safe browser visualizations/educational sandboxes, an Artifact Reader for saved public-web curiosities, and a Workshop PC for local experimental tools that are not yet production instruments.

## Delivery sequence

1. Add the Instrument manifest/type and an accessible, no-network `unconfigured` Instrument View shell.
2. Add one Bridge monitor hotspot and one Arcade CRT hotspot that demonstrate the room-to-instrument transition and exact return-state restoration.
3. Add a Standard/Demo contract test suite for source/provenance isolation, unavailable states, and permission/audit behavior.
4. Add the God’s Eye View-style console only behind an explicit configured read-only adapter or external link policy.
5. Add Retro Terminal 01 with embed-policy detection/fallback and no data handoff.
6. Introduce real operational instruments only after the runtime command/event authority in `docs/NEXT.md` exists; do not treat browser-only controls as authority.

## Acceptance criteria

- A user can enter an instrument from a declared room object and return to the exact room context without losing state.
- Every instrument has a declared owner room, source/provenance, capability, availability state, fallback, and audit policy.
- Standard mode never displays synthetic operational activity through an instrument.
- Demo instrument state cannot cross into Standard storage or operational decisions.
- An unavailable or embedding-blocked external surface is explicitly explained and never leaves the user on a blank/full-screen dead end.
- The Arcade and its WINDOWS93 terminal remain non-production and isolated from Agentarium authority.
- Every operational action exposed through an instrument has a corresponding validated runtime command, permission check, approval behavior where applicable, and audit event before it can be called a real feature.
