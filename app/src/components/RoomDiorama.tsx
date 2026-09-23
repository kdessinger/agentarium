import { useEffect, useRef, useState } from 'react'
import './WorldScene.css'
import type { AgentDefinition, RoomProfile } from '../lib/commissioning'
import type { RoomWorkItem } from '../lib/presentation'
import {
  AGENT_SPRITE,
  SPRITE_SIZE,
  getGlowIntensity,
  getRolePalette,
  getStatusColor,
  lerp,
  wanderPosition,
  type AnimationState,
} from '../lib/animation'

type Props = {
  room: RoomProfile
  agents: AgentDefinition[]
  workItems: RoomWorkItem[]
  assetPath?: string
  bundled: boolean
  onBack: () => void
  onAgent: (agentId: string) => void
}

const ROOM_SPRITE_SCALE = 5

export function RoomDiorama({ room, agents, workItems, assetPath, bundled, onBack, onAgent }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [timeMs, setTimeMs] = useState(0)
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 })
  const [workOpen, setWorkOpen] = useState(true)

  useEffect(() => {
    let raf: number
    const tick = () => {
      setTimeMs(Date.now())
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ w: entry.contentRect.width, h: entry.contentRect.height })
      }
    })
    ro.observe(el)
    setContainerSize({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  const [agentStates, setAgentStates] = useState<Array<{
    agent: AgentDefinition
    x: number
    y: number
    animState: AnimationState
    frameIndex: number
    facingRight: boolean
    wanderSeed: number
  }>>(() => agents.map((agent, i) => ({
    agent,
    x: 0.2 + (i % 3) * 0.25,
    y: 0.3 + Math.floor(i / 3) * 0.25,
    animState: 'idle',
    frameIndex: 0,
    facingRight: true,
    wanderSeed: agent.id.split('').reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0),
  })))

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setAgentStates((current) => current.map((state) => {
        const bounds = { x: 0.1, y: 0.2, w: 0.7, h: 0.5 }
        const wander = wanderPosition(state.wanderSeed, now, bounds)
        const dx = wander.x - state.x
        const dy = wander.y - state.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        const animState: AnimationState = room.status === 'demo'
          ? 'working'
          : room.status === 'unconfigured'
            ? 'blocked'
            : dist > 0.02 ? 'walking' : 'idle'

        const speed = 0.015
        return {
          ...state,
          x: dist > 0.001 ? lerp(state.x, wander.x, speed) : state.x,
          y: dist > 0.001 ? lerp(state.y, wander.y, speed) : state.y,
          animState,
          facingRight: dx > 0.001 ? true : dx < -0.001 ? false : state.facingRight,
          frameIndex: animState === 'walking' ? Math.floor(now / 200) % 2 + 1 : animState === 'working' ? 3 : animState === 'blocked' ? 4 : 0,
        }
      }))
    }, 50)
    return () => clearInterval(interval)
  }, [room.status])

  const { w, h } = containerSize
  const intensity = getGlowIntensity(room.status, timeMs)
  const statusColor = getStatusColor(room.status)

  return (
    <div ref={containerRef} className="room-diorama">
      <h1 className="sr-only">{room.name}</h1>
      {w > 0 && h > 0 && (
        <svg viewBox={`0 0 ${w} ${h}`} className="room-diorama-svg" preserveAspectRatio="xMidYMid slice">
          {bundled && assetPath && (
            <image
              href={assetPath}
              x={0}
              y={0}
              width={w}
              height={h}
              preserveAspectRatio="xMidYMid slice"
              className="room-background-img"
            />
          )}

          {!bundled && (
            <rect x={0} y={0} width={w} height={h} fill="#0a1628" />
          )}

          <rect
            x={0}
            y={0}
            width={w}
            height={h}
            fill={statusColor}
            opacity={intensity * 0.08}
            className="room-ambient-glow"
            style={{ mixBlendMode: 'screen' }}
          />

          <g opacity={0.1}>
            {Array.from({ length: 8 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1={w * 0.05}
                y1={h * (0.3 + i * 0.08)}
                x2={w * 0.95}
                y2={h * (0.3 + i * 0.08)}
                stroke="#22d3ee"
                strokeWidth={0.5}
              />
            ))}
            {Array.from({ length: 12 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={w * (0.05 + i * 0.08)}
                y1={h * 0.3}
                x2={w * (0.05 + i * 0.08)}
                y2={h * 0.9}
                stroke="#22d3ee"
                strokeWidth={0.5}
              />
            ))}
          </g>

          {agentStates.map((state) => {
            const sprite = state.facingRight ? AGENT_SPRITE : AGENT_SPRITE.flip()
            const frame = sprite.frames[state.frameIndex] ?? sprite.frames[0]
            if (!frame) return null

            const palette = getRolePalette(state.agent.role)
            const px = state.x * w
            const py = state.y * h
            const sw = SPRITE_SIZE * ROOM_SPRITE_SCALE
            const sh = SPRITE_SIZE * ROOM_SPRITE_SCALE

            return (
              <g
                key={state.agent.id}
                className="room-agent-sprite"
                role="button"
                tabIndex={0}
                aria-label={`Open ${state.agent.name} profile`}
                style={{ cursor: 'pointer' }}
                onPointerDown={() => onAgent(state.agent.id)}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onAgent(state.agent.id) }}
              >
                <ellipse
                  cx={px + sw / 2}
                  cy={py + sh + 2}
                  rx={sw * 0.4}
                  ry={sw * 0.15}
                  fill="#000"
                  opacity={0.3}
                />
                {frame.pixels.map((row, ry) =>
                  row.map((cell, cx) => {
                    const color = palette[cell]
                    if (!color || color === 'transparent') return null
                    return (
                      <rect
                        key={`${state.agent.id}-${ry}-${cx}`}
                        x={px + cx * ROOM_SPRITE_SCALE}
                        y={py + ry * ROOM_SPRITE_SCALE}
                        width={ROOM_SPRITE_SCALE}
                        height={ROOM_SPRITE_SCALE}
                        fill={color}
                        shapeRendering="crispEdges"
                      />
                    )
                  })
                )}
                <text
                  x={px + sw / 2}
                  y={py - 6}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize={10}
                  fontFamily="monospace"
                >
                  {state.agent.name}
                </text>
                <circle
                  cx={px + sw - 4}
                  cy={py + 4}
                  r={3}
                  fill={statusColor}
                  opacity={0.8 + Math.sin(timeMs / 300) * 0.2}
                />
              </g>
            )
          })}

          <g className="room-info-overlay">
            <rect x={16} y={16} width={280} height={120} rx={4} fill="rgba(3,10,17,0.85)" stroke="#1a3a5c" strokeWidth={1} />
            <text x={28} y={38} fill="#f8fafc" fontSize={14} fontWeight="bold" fontFamily="monospace">{room.name}</text>
            <text x={28} y={56} fill="#94a3b8" fontSize={10} fontFamily="monospace">{room.type} · {room.level}</text>
            <text x={28} y={74} fill="#64748b" fontSize={10} fontFamily="monospace">{room.description}</text>
            <circle cx={28} cy={96} r={4} fill={statusColor} />
            <text x={38} y={100} fill={statusColor} fontSize={10} fontFamily="monospace">{room.status.toUpperCase()}</text>
            <text x={28} y={118} fill="#475569" fontSize={9} fontFamily="monospace">{agents.length} agent{agents.length !== 1 ? 's' : ''} assigned</text>
          </g>
        </svg>
      )}

      <button className="back-control diorama-back" onClick={onBack}>
        ← Return to World
      </button>

      <section className={`room-work-surface ${workOpen ? 'open' : ''}`} aria-label={`${room.name} work`}>
        <button className="room-work-toggle" onClick={() => setWorkOpen((value) => !value)} aria-expanded={workOpen}>
          <span>Room Work</span>
          <b>{workItems.length}</b>
        </button>
        {workOpen && <div className="room-work-panel">
          <header>
            <div><span className="eyebrow">Operational surface</span><h2>What’s happening here</h2></div>
            <span className={`work-state ${workItems.length ? 'active' : 'empty'}`}>{workItems.length ? 'Inspectable work' : 'No active work'}</span>
          </header>
          {workItems.length === 0
            ? <div className="room-work-empty"><strong>No work is assigned to this room.</strong><p>Configure a real provider or start an isolated Demo walkthrough. Nothing is fabricated to make the room look busy.</p></div>
            : <div className="room-work-list">{workItems.map((item) => <article key={item.id} className={`work-item kind-${item.kind}`}>
              <div className="work-item-heading"><span>{item.kind}</span><b>{item.status.replaceAll('_', ' ')}</b></div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <footer><code>{item.id}</code><span>{item.provenanceLabel}</span></footer>
            </article>)}</div>}
        </div>}
      </section>
    </div>
  )
}
