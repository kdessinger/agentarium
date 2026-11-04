export type AnimationState = 'idle' | 'walking' | 'working' | 'blocked' | 'celebrating'

export type SpriteFrame = {
  duration: number
  pixels: string[][] // grid of color codes
}

export const SPRITE_SIZE = 16 as const
export const SPRITE_SCALE = 2 as const

// 16x16 pixel characters — each string is a color key
const PALETTE: Record<string, string> = {
  '.': 'transparent',
  'b': '#0a1628', // body dark
  'B': '#1a3a5c', // body light
  's': '#c49a6c', // skin
  'S': '#e8c4a0', // skin light
  'h': '#8b4513', // hair
  'H': '#a0522d', // hair light
  'e': '#3b82f6', // eye/blue
  'E': '#60a5fa', // eye light
  'a': '#f59e0b', // amber accent
  'A': '#fbbf24', // amber light
  'c': '#06b6d4', // cyan accent
  'C': '#22d3ee', // cyan light
  'v': '#8b5cf6', // violet accent
  'V': '#a78bfa', // violet light
  'g': '#22c55e', // green
  'G': '#4ade80', // green light
  'r': '#ef4444', // red
  'R': '#f87171', // red light
  'w': '#f8fafc', // white
  'W': '#ffffff', // pure white
  'k': '#334155', // slate
  'K': '#475569', // slate light
  'o': '#f97316', // orange
  'O': '#fb923c', // orange light
}

// Helper to flip a frame horizontally
function flipFrame(frame: SpriteFrame): SpriteFrame {
  return {
    duration: frame.duration,
    pixels: frame.pixels.map((row) => [...row].reverse()),
  }
}

// Helper to create a sprite definition from frames
export function createSprite(frames: SpriteFrame[]): { frames: SpriteFrame[]; flip: () => { frames: SpriteFrame[] } } {
  return {
    frames,
    flip: () => ({ frames: frames.map(flipFrame) }),
  }
}

// Generic agent base — faces right by default
const AGENT_BASE_IDLE: SpriteFrame = {
  duration: 800,
  pixels: [
    ['.','.','.','.','.','.','h','h','h','h','.','.','.','.','.','.'],
    ['.','.','.','.','.','h','h','h','h','h','h','.','.','.','.','.'],
    ['.','.','.','.','.','h','h','h','h','h','h','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','e','s','e','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','s','s','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','B','B','B','B','B','B','.','.','.','.','.'],
    ['.','.','.','.','B','B','B','B','B','B','B','B','.','.','.','.'],
    ['.','.','.','.','B','B','B','B','B','B','B','B','.','.','.','.'],
    ['.','.','.','.','B','B','B','B','B','B','B','B','.','.','.','.'],
    ['.','.','.','.','.','B','B','B','B','B','B','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','.','.','k','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','.','.','k','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','k','.','k','k','.','.','.','.','.'],
  ]
}

const AGENT_BASE_WALK1: SpriteFrame = {
  duration: 200,
  pixels: [
    ['.','.','.','.','.','.','h','h','h','h','.','.','.','.','.','.'],
    ['.','.','.','.','.','h','h','h','h','h','h','.','.','.','.','.'],
    ['.','.','.','.','.','h','h','h','h','h','h','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','e','s','e','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','s','s','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','B','B','B','B','B','B','.','.','.','.','.'],
    ['.','.','.','.','B','B','B','B','B','B','B','B','.','.','.','.'],
    ['.','.','.','.','B','B','B','B','B','B','B','B','.','.','.','.'],
    ['.','.','.','.','.','B','B','B','B','B','B','.','.','.','.','.'],
    ['.','.','.','.','.','.','B','B','B','B','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','.','.','k','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','k','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','k','k','.','.','.','.','.','.','.'],
  ]
}

const AGENT_BASE_WALK2: SpriteFrame = {
  duration: 200,
  pixels: [
    ['.','.','.','.','.','.','h','h','h','h','.','.','.','.','.','.'],
    ['.','.','.','.','.','h','h','h','h','h','h','.','.','.','.','.'],
    ['.','.','.','.','.','h','h','h','h','h','h','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','e','s','e','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','s','s','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','B','B','B','B','B','B','.','.','.','.','.'],
    ['.','.','.','.','B','B','B','B','B','B','B','B','.','.','.','.'],
    ['.','.','.','.','B','B','B','B','B','B','B','B','.','.','.','.'],
    ['.','.','.','.','B','B','B','B','B','B','B','B','.','.','.','.'],
    ['.','.','.','.','.','B','B','B','B','B','B','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','.','.','k','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','k','k','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','k','k','.','.','.','.','.','.','.'],
  ]
}

const AGENT_BASE_WORKING: SpriteFrame = {
  duration: 400,
  pixels: [
    ['.','.','.','.','.','.','h','h','h','h','.','.','.','.','.','.'],
    ['.','.','.','.','.','h','h','h','h','h','h','.','.','.','.','.'],
    ['.','.','.','.','.','h','h','h','h','h','h','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','e','s','e','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','s','s','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','c','c','c','c','c','c','.','.','.','.','.'],
    ['.','.','.','.','c','c','c','c','c','c','c','c','.','.','.','.'],
    ['.','.','.','.','c','c','c','c','c','c','c','c','.','.','.','.'],
    ['.','.','.','.','c','c','c','c','c','c','c','c','.','.','.','.'],
    ['.','.','.','.','.','c','c','c','c','c','c','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','.','.','k','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','.','.','k','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','k','.','k','k','.','.','.','.','.'],
  ]
}

const AGENT_BASE_BLOCKED: SpriteFrame = {
  duration: 600,
  pixels: [
    ['.','.','.','.','.','.','h','h','h','h','.','.','.','.','.','.'],
    ['.','.','.','.','.','h','h','h','h','h','h','.','.','.','.','.'],
    ['.','.','.','.','.','h','h','h','h','h','h','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','r','s','r','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','s','s','s','s','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','s','s','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','o','o','o','o','o','o','.','.','.','.','.'],
    ['.','.','.','.','o','o','o','o','o','o','o','o','.','.','.','.'],
    ['.','.','.','.','o','o','o','o','o','o','o','o','.','.','.','.'],
    ['.','.','.','.','o','o','o','o','o','o','o','o','.','.','.','.'],
    ['.','.','.','.','.','o','o','o','o','o','o','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','.','.','k','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','.','.','k','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','k','k','.','k','k','.','.','.','.','.'],
  ]
}

export const AGENT_SPRITE = createSprite([
  AGENT_BASE_IDLE,
  AGENT_BASE_WALK1,
  AGENT_BASE_WALK2,
  AGENT_BASE_WORKING,
  AGENT_BASE_BLOCKED,
])

// Role-specific color overrides applied to the base sprite
export const ROLE_PALETTES: Record<string, Partial<typeof PALETTE>> = {
  steward: { B: '#1e3a5f', c: '#f59e0b' },
  'market intelligence': { B: '#0f172a', c: '#06b6d4' },
  production: { B: '#3f2e18', c: '#f59e0b' },
  'graphic artist': { B: '#1a0f2e', c: '#a855f7' },
  'music artist': { B: '#0f2e1a', c: '#22c55e' },
  'app builder': { B: '#1e293b', c: '#3b82f6' },
  'security officer': { B: '#2e1818', c: '#ef4444' },
  communications: { B: '#1e2e3f', c: '#06b6d4' },
  reviewer: { B: '#2e1e3f', c: '#f59e0b' },
}

export function getRolePalette(role: string): Record<string, string> {
  const normalized = role.toLowerCase()
  const overrides = ROLE_PALETTES[normalized] || {}
  return { ...PALETTE, ...overrides } as Record<string, string>
}

// Animation timing helpers
export function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

// Generate a deterministic "wander" path for an agent
export function generateWanderSeed(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export function wanderPosition(seed: number, timeMs: number, bounds: { x: number; y: number; w: number; h: number }): { x: number; y: number } {
  const t = timeMs / 3000
  const nx = Math.sin(t * 0.7 + seed) * 0.5 + 0.5
  const ny = Math.cos(t * 0.5 + seed * 0.3) * 0.5 + 0.5
  return {
    x: bounds.x + nx * bounds.w,
    y: bounds.y + ny * bounds.h,
  }
}

// Packet flow animation along a path
export type FlowParticle = {
  id: string
  fromRoomId: string
  toRoomId: string
  progress: number // 0..1
  speed: number
  color: string
  size: number
}

export function createFlowParticle(fromRoomId: string, toRoomId: string, color: string): FlowParticle {
  return {
    id: `flow:${fromRoomId}:${toRoomId}:${Date.now()}:${Math.random().toString(36).slice(2, 6)}`,
    fromRoomId,
    toRoomId,
    progress: 0,
    speed: 0.3 + Math.random() * 0.4,
    color,
    size: 3 + Math.random() * 3,
  }
}

export function updateFlowParticles(particles: FlowParticle[], dtMs: number): FlowParticle[] {
  if (particles.length === 0 || dtMs <= 0) return particles
  return particles
    .map((p) => ({ ...p, progress: p.progress + (p.speed * dtMs) / 1000 }))
    .filter((p) => p.progress < 1)
}

export const MAX_FLOW_FRAME_DELTA_MS = 100

export function advanceFlowParticlesForFrame(
  particles: FlowParticle[],
  previousFrameTimeMs: number,
  frameTimeMs: number,
): FlowParticle[] {
  const elapsedMs = Math.max(0, Math.min(frameTimeMs - previousFrameTimeMs, MAX_FLOW_FRAME_DELTA_MS))
  return updateFlowParticles(particles, elapsedMs)
}

// Room status glow intensity
export function getGlowIntensity(status: string, timeMs: number): number {
  switch (status) {
    case 'working':
      return 0.6 + Math.sin(timeMs / 400) * 0.4
    case 'blocked':
      return 0.4 + Math.sin(timeMs / 600) * 0.3
    case 'needs_approval':
      return 0.5 + Math.sin(timeMs / 500) * 0.5
    case 'idle':
      return 0.2 + Math.sin(timeMs / 2000) * 0.1
    default:
      return 0.1
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'working': return '#06b6d4'
    case 'blocked': return '#f97316'
    case 'needs_approval': return '#8b5cf6'
    case 'completed': return '#22c55e'
    case 'failed': return '#ef4444'
    case 'idle': return '#94a3b8'
    default: return '#64748b'
  }
}
