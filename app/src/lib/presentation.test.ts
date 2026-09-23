import { describe, expect, it } from 'vitest'
import { createBuildPlan, createCommissioningDraft } from './commissioning'
import { getAgentConceptPath, getAgentPortraitPath, getHotspotBounds, getRoomWorkItems } from './presentation'
import { createDemoPartition, createStandardPartition } from './modes'

describe('agent artwork presentation', () => {
  it('resolves bundled core-agent concept and portrait paths', () => {
    expect(getAgentConceptPath('pixel')).toBe('/concept-art/agents/pixel.png')
    expect(getAgentPortraitPath('pixel')).toBe('/concept-art/agents/portraits/pixel.png')
  })

  it('does not invent artwork paths for unknown agents', () => {
    expect(getAgentConceptPath('custom-agent')).toBeNull()
    expect(getAgentPortraitPath('custom-agent')).toBeNull()
  })
})

describe('authored spaceship hotspots', () => {
  const plan = createBuildPlan(createCommissioningDraft({ worldTemplateId: 'spaceship', visualStyleId: 'pixel_art' }))

  it('places the Bridge over the large forward upper-right command compartment', () => {
    const bounds = getHotspotBounds(plan.hotspots.find((hotspot) => hotspot.targetId === 'bridge')!)
    expect(bounds.x1).toBeGreaterThanOrEqual(0.53)
    expect(bounds.x2).toBeGreaterThanOrEqual(0.82)
    expect(bounds.y1).toBeLessThan(0.18)
    expect(bounds.y2).toBeLessThanOrEqual(0.34)
  })

  it('places the War Room immediately left of and below the Bridge rather than on the far left', () => {
    const bridge = getHotspotBounds(plan.hotspots.find((hotspot) => hotspot.targetId === 'bridge')!)
    const warRoom = getHotspotBounds(plan.hotspots.find((hotspot) => hotspot.targetId === 'war-room')!)
    expect(warRoom.x1).toBeGreaterThanOrEqual(0.36)
    expect(warRoom.x2).toBeLessThanOrEqual(bridge.x1 + 0.08)
    expect(warRoom.y1).toBeGreaterThanOrEqual(0.16)
    expect(warRoom.y2).toBeLessThanOrEqual(0.36)
  })

  it('keeps every polygon normalized and non-empty', () => {
    for (const hotspot of plan.hotspots) {
      const bounds = getHotspotBounds(hotspot)
      expect(bounds.x1).toBeGreaterThanOrEqual(0)
      expect(bounds.y1).toBeGreaterThanOrEqual(0)
      expect(bounds.x2).toBeLessThanOrEqual(1)
      expect(bounds.y2).toBeLessThanOrEqual(1)
      expect(bounds.x2 - bounds.x1).toBeGreaterThan(0.035)
      expect(bounds.y2 - bounds.y1).toBeGreaterThan(0.035)
    }
  })
})

describe('room work surfaces', () => {
  const demo = createDemoPartition()

  it('shows Pixel its visual candidate work in Demo mode', () => {
    const items = getRoomWorkItems('pixel-room', ['pixel'], demo)
    expect(items.some((item) => item.id === 'demo:packet:visual-candidate')).toBe(true)
    expect(items.some((item) => item.status === 'ready_for_review')).toBe(true)
  })

  it('shows Governance its pending approval in Demo mode', () => {
    const items = getRoomWorkItems('governance-room', ['governor'], demo)
    expect(items.some((item) => item.kind === 'approval')).toBe(true)
    expect(items.some((item) => item.status === 'pending')).toBe(true)
  })

  it('shows an honest empty state in Standard mode', () => {
    expect(getRoomWorkItems('pixel-room', ['pixel'], createStandardPartition())).toEqual([])
  })
})
