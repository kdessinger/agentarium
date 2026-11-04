import { describe, expect, it } from 'vitest'
import { advanceFlowParticlesForFrame, type FlowParticle } from './animation'

function particle(progress: number, speed = 0.5): FlowParticle {
  return {
    id: 'flow:test',
    fromRoomId: 'bridge',
    toRoomId: 'forge',
    progress,
    speed,
    color: '#22d3ee',
    size: 5,
  }
}

describe('route particle frame advancement', () => {
  it('advances progress by the actual elapsed frame time', () => {
    const advanced = advanceFlowParticlesForFrame([particle(0.1)], 1_000, 1_080)

    expect(advanced).toHaveLength(1)
    expect(advanced[0]?.progress).toBeCloseTo(0.14)
  })

  it('removes particles once elapsed time advances progress to one', () => {
    const advanced = advanceFlowParticlesForFrame([particle(0.98, 1)], 1_000, 1_030)

    expect(advanced).toEqual([])
  })
})
