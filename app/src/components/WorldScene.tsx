import { useCallback, useEffect, useRef, useState } from 'react'
import './WorldScene.css'
import type { BuildPlan, AgentDefinition, RoomProfile } from '../lib/commissioning'
import { getHotspotBounds } from '../lib/presentation'
import {
  AGENT_SPRITE,
  SPRITE_SIZE,
  SPRITE_SCALE,
  advanceFlowParticlesForFrame,
  createFlowParticle,
  getGlowIntensity,
  getRolePalette,
  getStatusColor,
  lerp,
  wanderPosition,
  type AnimationState,
  type FlowParticle,
} from '../lib/animation'

type AgentRenderState = {
  agent: AgentDefinition
  room: RoomProfile
  x: number
  y: number
  targetX: number
  targetY: number
  animState: AnimationState
  frameIndex: number
  facingRight: boolean
  wanderSeed: number
  lastMoveTime: number
}

type Props = {
  plan: BuildPlan
  onRoom: (roomId: string) => void
  timeMs?: number
}

export function WorldScene({ plan, onRoom, timeMs: externalTime }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 })
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)
  const [particles, setParticles] = useState<FlowParticle[]>([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const lastParticleSpawn = useRef<number | null>(null)
  const lastParticleFrameTime = useRef<number | null>(null)

  // Internal time if external not provided
  const [internalTime, setInternalTime] = useState(() => Date.now())
  const timeMs = externalTime ?? internalTime

  // Advance ambient route particles with this loop's real (clamped) frame delta.
  const advanceRouteParticles = useCallback((frameTimeMs: number) => {
    const previousFrameTime = lastParticleFrameTime.current
    lastParticleFrameTime.current = frameTimeMs

    if (prefersReducedMotion) {
      setParticles((current) => current.length === 0 ? current : [])
      return
    }
    if (previousFrameTime === null) return

    setParticles((current) => advanceFlowParticlesForFrame(current, previousFrameTime, frameTimeMs))
  }, [prefersReducedMotion])

  // Spawn separately at an ambient cadence. This visualizes static adjacency only;
  // it does not create a handoff, mutate operational data, or append an audit event.
  const spawnRouteParticle = useCallback((frameTimeMs: number) => {
    const previousSpawnTime = lastParticleSpawn.current
    if (prefersReducedMotion) {
      lastParticleSpawn.current = frameTimeMs
      return
    }
    if (previousSpawnTime === null) {
      lastParticleSpawn.current = frameTimeMs
      return
    }
    if (frameTimeMs - previousSpawnTime < 2000) return

    lastParticleSpawn.current = frameTimeMs
    if (plan.adjacency.length === 0) return
    const edge = plan.adjacency[Math.floor(Math.random() * plan.adjacency.length)]
    const color = getStatusColor('working')
    setParticles((current) => [...current, createFlowParticle(edge.from, edge.to, color)])
  }, [plan.adjacency, prefersReducedMotion])

  useEffect(() => {
    if (externalTime !== undefined) {
      const raf = requestAnimationFrame(() => {
        advanceRouteParticles(externalTime)
        spawnRouteParticle(externalTime)
      })
      return () => cancelAnimationFrame(raf)
    }

    let raf: number
    const tick = () => {
      const frameTimeMs = Date.now()
      advanceRouteParticles(frameTimeMs)
      spawnRouteParticle(frameTimeMs)
      setInternalTime(frameTimeMs)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [advanceRouteParticles, externalTime, spawnRouteParticle])

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setPrefersReducedMotion(query.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  // Measure container
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

  // Build and animate agent render states.
  const [agentStates, setAgentStates] = useState<AgentRenderState[]>(() => {
    const states: AgentRenderState[] = []
    for (const agent of plan.agents) {
      const room = plan.rooms.find((r) => r.id === agent.roomId)
      if (!room) continue
      const hotspot = plan.hotspots.find((h) => h.targetId === room.id)
      if (!hotspot && plan.hotspots.length > 0) continue

      let x = 0.5, y = 0.5
      if (hotspot) {
        const xs = hotspot.polygon.map((p) => p.x)
        const ys = hotspot.polygon.map((p) => p.y)
        x = (Math.min(...xs) + Math.max(...xs)) / 2
        y = (Math.min(...ys) + Math.max(...ys)) / 2
      } else if (plan.hotspots.length === 0) {
        const idx = states.length
        const cols = Math.ceil(Math.sqrt(plan.rooms.length))
        const col = idx % cols
        const row = Math.floor(idx / cols)
        x = 0.15 + (col / (cols - 1 || 1)) * 0.7
        y = 0.25 + (row / (Math.ceil(plan.rooms.length / cols) - 1 || 1)) * 0.5
      }

      states.push({
        agent,
        room,
        x,
        y,
        targetX: x,
        targetY: y,
        animState: 'idle',
        frameIndex: 0,
        facingRight: true,
        wanderSeed: agent.id.split('').reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0),
        lastMoveTime: Date.now(),
      })
    }
    return states
  })

  // Update agent positions with wandering
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setAgentStates((current) => current.map((state) => {
        const hotspot = plan.hotspots.find((h) => h.targetId === state.room.id)
        let bounds: { x: number; y: number; w: number; h: number }
        if (hotspot) {
          const xs = hotspot.polygon.map((p) => p.x)
          const ys = hotspot.polygon.map((p) => p.y)
          bounds = {
            x: Math.min(...xs) + 0.05,
            y: Math.min(...ys) + 0.05,
            w: Math.max(...xs) - Math.min(...xs) - 0.1,
            h: Math.max(...ys) - Math.min(...ys) - 0.1,
          }
        } else {
          // Non-hotspot world: default viewport bounds
          bounds = { x: 0.1, y: 0.2, w: 0.7, h: 0.5 }
        }

        const wander = wanderPosition(state.wanderSeed, now, bounds)
        const dx = wander.x - state.x
        const dy = wander.y - state.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        const animState: AnimationState = state.agent.autonomy === 'demo_only'
          ? 'working'
          : state.room.status === 'unconfigured'
            ? 'blocked'
            : dist > 0.01 ? 'walking' : 'idle'

        const speed = 0.02
        const newX = dist > 0.001 ? lerp(state.x, wander.x, speed) : state.x
        const newY = dist > 0.001 ? lerp(state.y, wander.y, speed) : state.y

        return {
          ...state,
          x: newX,
          y: newY,
          targetX: wander.x,
          targetY: wander.y,
          animState,
          facingRight: dx > 0.001 ? true : dx < -0.001 ? false : state.facingRight,
          frameIndex: animState === 'walking' ? Math.floor(now / 200) % 2 + 1 : animState === 'working' ? 3 : animState === 'blocked' ? 4 : 0,
        }
      }))
    }, 50)
    return () => clearInterval(interval)
  }, [plan])

  const handleRoomClick = useCallback((roomId: string) => {
    onRoom(roomId)
  }, [onRoom])

  const ship = plan.assets.find((a) => a.kind === 'ship_background')
  const isPlaceholder = !ship?.path || ship.source === 'placeholder'
  const w = containerSize.w
  const h = containerSize.h

  function routeRoomCenter(room: RoomProfile, plan: BuildPlan, w: number, h: number): { x: number; y: number } | null {
    if (w <= 0 || h <= 0) return null
    const hotspot = plan.hotspots.find((item) => item.targetId === room.id)
    if (hotspot) {
      const xs = hotspot.polygon.map((point) => point.x)
      const ys = hotspot.polygon.map((point) => point.y)
      return {
        x: ((Math.min(...xs) + Math.max(...xs)) / 2) * w,
        y: ((Math.min(...ys) + Math.max(...ys)) / 2) * h,
      }
    }
    const idx = plan.rooms.findIndex((item) => item.id === room.id)
    if (idx < 0) return null
    const cols = Math.ceil(Math.sqrt(plan.rooms.length))
    const col = idx % cols
    const row = Math.floor(idx / cols)
    const padX = Math.min(120, w * 0.1)
    const padY = Math.min(80, h * 0.1)
    const usableW = Math.max(60, w - padX * 2)
    const usableH = Math.max(60, h - padY * 2)
    const cellW = usableW / Math.max(1, cols)
    const rows = Math.ceil(plan.rooms.length / cols)
    const cellH = usableH / Math.max(1, rows)
    return {
      x: padX + cellW * (col + 0.5),
      y: padY + cellH * (row + 0.5),
    }
  }

  return (
    <div ref={containerRef} className="world-scene-container">
      <h1 className="sr-only">World Overview</h1>
      <label className={`mobile-room-chooser ${plan.hotspots.length ? '' : 'placeholder-room-chooser'}`}>
        <span>Enter room</span>
        <select aria-label="Choose a room" defaultValue="" onChange={(event) => { if (event.target.value) handleRoomClick(event.target.value) }}>
          <option value="" disabled>Choose a commissioned room…</option>
          {plan.rooms.map((room) => <option key={room.id} value={room.id}>{room.name} — {room.status}</option>)}
        </select>
      </label>
      {w > 0 && h > 0 && (
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="world-scene-svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Background ship image */}
          {ship?.path && (
            <image
              href={ship.path}
              x={0}
              y={0}
              width={w}
              height={h}
              preserveAspectRatio="none"
              className="ship-background"
            />
          )}

          {/* Placeholder grid for non-bundled worlds */}
          {isPlaceholder && (
            <g opacity={0.06}>
              {Array.from({ length: 20 }, (_, i) => (
                <line key={`ph-h-${i}`} x1={0} y1={i * (h / 20)} x2={w} y2={i * (h / 20)} stroke="#22d3ee" strokeWidth={0.5} />
              ))}
              {Array.from({ length: 30 }, (_, i) => (
                <line key={`ph-v-${i}`} x1={i * (w / 30)} y1={0} x2={i * (w / 30)} y2={h} stroke="#22d3ee" strokeWidth={0.5} />
              ))}
            </g>
          )}

          {/* Room glow overlays — only for hotspot worlds */}
          {plan.hotspots.length > 0 && plan.rooms.map((room) => {
            const hotspot = plan.hotspots.find((h) => h.targetId === room.id)
            if (!hotspot) return null
            const xs = hotspot.polygon.map((p) => p.x * w)
            const ys = hotspot.polygon.map((p) => p.y * h)
            const cx = xs.reduce((a, b) => a + b, 0) / xs.length
            const cy = ys.reduce((a, b) => a + b, 0) / ys.length
            const rx = (Math.max(...xs) - Math.min(...xs)) / 2
            const ry = (Math.max(...ys) - Math.min(...ys)) / 2
            const intensity = getGlowIntensity(room.status, timeMs)
            const color = getStatusColor(room.status)

            return (
              <ellipse
                key={`glow-${room.id}`}
                cx={cx}
                cy={cy}
                rx={rx * 1.2}
                ry={ry * 1.2}
                fill={color}
                opacity={intensity * 0.15}
                className="room-glow"
              />
            )
          })}

          {/* Room cards for non-hotspot worlds */}
          {plan.hotspots.length === 0 && plan.rooms.map((room, index) => {
            const cols = Math.ceil(Math.sqrt(plan.rooms.length))
            const col = index % cols
            const row = Math.floor(index / cols)
            const cardW = Math.min(220, (w - 64) / cols)
            const cardH = 80
            const gapX = (w - cardW * cols) / (cols + 1)
            const gapY = 24
            const cx = gapX + col * (cardW + gapX)
            const cy = 80 + row * (cardH + gapY)
            const color = getStatusColor(room.status)

            return (
              <g
                key={`card-${room.id}`}
                className="room-card"
                role="button"
                tabIndex={0}
                aria-label={`Open ${room.name}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRoomClick(room.id)}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') handleRoomClick(room.id) }}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                <rect
                  x={cx}
                  y={cy}
                  width={cardW}
                  height={cardH}
                  rx={4}
                  fill="rgba(3,10,17,0.9)"
                  stroke={hoveredRoom === room.id ? color : '#1a3a5c'}
                  strokeWidth={hoveredRoom === room.id ? 2 : 1}
                />
                <text x={cx + 12} y={cy + 22} fill="#f8fafc" fontSize={13} fontWeight="bold" fontFamily="monospace">{room.name}</text>
                <text x={cx + 12} y={cy + 40} fill="#94a3b8" fontSize={10} fontFamily="monospace">{room.type}</text>
                <text x={cx + 12} y={cy + 56} fill="#64748b" fontSize={9} fontFamily="monospace">{room.level}</text>
                <circle cx={cx + cardW - 16} cy={cy + 16} r={5} fill={color} opacity={0.8 + Math.sin(timeMs / 300) * 0.2} />
              </g>
            )
          })}

          {/* Route flow particles */}
          {particles.map((p) => {
            const fromRoom = plan.rooms.find((room) => room.id === p.fromRoomId)
            const toRoom = plan.rooms.find((room) => room.id === p.toRoomId)
            if (!fromRoom || !toRoom) return null
            const start = routeRoomCenter(fromRoom, plan, w, h)
            const end = routeRoomCenter(toRoom, plan, w, h)
            if (!start || !end) return null
            const x = lerp(start.x, end.x, p.progress)
            const y = lerp(start.y, end.y, p.progress)

            const visibility = 1 - p.progress
            return (
              <g key={p.id} className="flow-particle" style={{ color: p.color }}>
                <circle
                  cx={x}
                  cy={y}
                  r={p.size + 5}
                  fill={p.color}
                  opacity={visibility * 0.22}
                  className="flow-particle-halo"
                />
                <circle
                  cx={x}
                  cy={y}
                  r={Math.max(4, p.size)}
                  fill={p.color}
                  stroke="#ecfeff"
                  strokeWidth={1}
                  opacity={0.55 + visibility * 0.4}
                  className="flow-particle-core"
                />
              </g>
            )
          })}

          {/* Agent sprites */}
          {agentStates.map((state) => {
            const sprite = state.facingRight ? AGENT_SPRITE : AGENT_SPRITE.flip()
            const frame = sprite.frames[state.frameIndex] ?? sprite.frames[0]
            if (!frame) return null

            const palette = getRolePalette(state.agent.role)
            const px = state.x * w
            const py = state.y * h
            const sw = SPRITE_SIZE * SPRITE_SCALE
            const sh = SPRITE_SIZE * SPRITE_SCALE

            return (
              <g
                key={state.agent.id}
                className="agent-sprite-group"
                role="button"
                tabIndex={0}
                aria-label={`Enter ${state.agent.name}'s room`}
                style={{ cursor: 'pointer' }}
                onPointerDown={() => handleRoomClick(state.room.id)}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') handleRoomClick(state.room.id) }}
              >
                {/* Shadow */}
                <ellipse
                  cx={px + sw / 2}
                  cy={py + sh + 2}
                  rx={sw * 0.4}
                  ry={sw * 0.15}
                  fill="#000"
                  opacity={0.3}
                />
                {/* Pixel grid */}
                {frame.pixels.map((row, ry) =>
                  row.map((cell, cx) => {
                    const color = palette[cell]
                    if (!color || color === 'transparent') return null
                    return (
                      <rect
                        key={`${state.agent.id}-${ry}-${cx}`}
                        x={px + cx * SPRITE_SCALE}
                        y={py + ry * SPRITE_SCALE}
                        width={SPRITE_SCALE}
                        height={SPRITE_SCALE}
                        fill={color}
                        shapeRendering="crispEdges"
                      />
                    )
                  })
                )}
                {/* Agent name label */}
                <text
                  x={px + sw / 2}
                  y={py - 6}
                  textAnchor="middle"
                  className="agent-label"
                  fill="#f8fafc"
                  fontSize={10}
                  fontFamily="monospace"
                >
                  {state.agent.name}
                </text>
              </g>
            )
          })}

          {/* Room hotspot polygons (invisible click targets) */}
          {plan.hotspots.map((hotspot) => {
            const points = hotspot.polygon.map((p) => `${p.x * w},${p.y * h}`).join(' ')
            return (
              <polygon
                key={hotspot.id}
                points={points}
                fill="transparent"
                className="room-hotspot-area"
                pointerEvents="none"
              />
            )
          })}

          {/* Hovered room highlight */}
          {hoveredRoom && (() => {
            const hotspot = plan.hotspots.find((h) => h.targetId === hoveredRoom)
            if (!hotspot) return null
            const points = hotspot.polygon.map((p) => `${p.x * w},${p.y * h}`).join(' ')
            const room = plan.rooms.find((r) => r.id === hoveredRoom)
            if (!room) return null
            return (
              <g>
                <polygon
                  points={points}
                  fill="none"
                  stroke={getStatusColor(room.status)}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  opacity={0.7}
                />
                {/* Room name tooltip */}
                <text
                  x={hotspot.polygon.reduce((sum, p) => sum + p.x, 0) / hotspot.polygon.length * w}
                  y={Math.min(...hotspot.polygon.map((p) => p.y * h)) - 8}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize={12}
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="room-tooltip"
                >
                  {room.name}
                </text>
              </g>
            )
          })()}

          {/* Placeholder message when no ship art */}
          {isPlaceholder && (
            <g>
              <rect x={w * 0.15} y={h * 0.35} width={w * 0.7} height={h * 0.3} rx={8} fill="rgba(3,10,17,0.92)" stroke="#f59e0b" strokeWidth={1} strokeDasharray="6 3" />
              <text x={w / 2} y={h * 0.45} textAnchor="middle" fill="#f59e0b" fontSize={18} fontWeight="bold" fontFamily="monospace">Matching art not rendered</text>
              <text x={w / 2} y={h * 0.52} textAnchor="middle" fill="#94a3b8" fontSize={11} fontFamily="monospace">{ship?.prompt || 'World background pending'}</text>
              <text x={w / 2} y={h * 0.58} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">Prompt retained · no external generation called · select Spaceship + Pixel Art for bundled art</text>
            </g>
          )}
        </svg>
      )}
      {w > 0 && h > 0 && plan.hotspots.map((hotspot) => {
        const bounds = getHotspotBounds(hotspot)
        const room = plan.rooms.find((item) => item.id === hotspot.targetId)
        if (!room) return null
        return <button
          key={`control:${hotspot.id}`}
          className="room-hotspot-control"
          aria-label={`Open ${room.name}`}
          style={{ left: `${bounds.x1 * 100}%`, top: `${bounds.y1 * 100}%`, width: `${(bounds.x2 - bounds.x1) * 100}%`, height: `${(bounds.y2 - bounds.y1) * 100}%` }}
          onClick={() => handleRoomClick(room.id)}
          onMouseEnter={() => setHoveredRoom(room.id)}
          onMouseLeave={() => setHoveredRoom(null)}
        />
      })}
    </div>
  )
}
