import { describe, expect, it } from 'vitest'
import {
  VISUAL_STYLES,
  WORLD_TEMPLATES,
  createCommissioningDraft,
  createBuildPlan,
  changeVisualStyle,
} from './commissioning'
import {
  createDemoPartition,
  createStandardPartition,
  purgeDemoPartition,
  resolveAdapter,
  writeRecord,
} from './modes'
import { createBuildJobs, runNextBuildJob } from './build'
import { createReplayFrame, startStandardWorkflow } from './world'

describe('commissioning contracts', () => {
  it('starts in Standard mode', () => {
    expect(createCommissioningDraft().installationMode).toBe('standard')
  })

  it('offers the six required visual presentations', () => {
    expect(VISUAL_STYLES.map((style) => style.label)).toEqual([
      'Pixel Art',
      'Illustrated 2D',
      'Isometric 3D',
      'Cinematic / Realistic',
      'Clean Vector / Graphic',
      'Custom Visual Style',
    ])
  })

  it('offers all ten required world templates', () => {
    expect(WORLD_TEMPLATES.map((template) => template.label)).toEqual([
      'Space Station',
      'Spaceship',
      'Cruise Ship',
      'Underground Bunker',
      'Skyscraper',
      'Resort',
      'Sky Ship',
      'Battleship',
      'Modern Corporate Office',
      'Custom Theme',
    ])
  })

  it('keeps visual style independent from every world template', () => {
    for (const template of WORLD_TEMPLATES) {
      const draft = createCommissioningDraft({ worldTemplateId: template.id })
      expect(changeVisualStyle(draft, 'pixel_art').worldTemplateId).toBe(template.id)
    }
  })

  it('preserves topology and operational records when visual style changes', () => {
    const draft = createCommissioningDraft()
    const changed = changeVisualStyle(draft, 'illustrated_2d')
    expect(changed.rooms).toEqual(draft.rooms)
    expect(changed.agents).toEqual(draft.agents)
    expect(changed.workflows).toEqual(draft.workflows)
    expect(changed.operational).toBe(draft.operational)
  })

  it('produces an inspectable plan with agents Forges and governance', () => {
    const plan = createBuildPlan(createCommissioningDraft())
    expect(plan.rooms.some((room) => room.type === 'forge')).toBe(true)
    expect(plan.agents[0]).toMatchObject({ provider: 'unconfigured', model: 'unconfigured' })
    expect(plan.governance.approvalRequired).toBe(true)
  })
})

describe('mode and provenance boundaries', () => {
  it('initializes Standard operational collections empty', () => {
    expect(createStandardPartition()).toEqual({
      quests: [], events: [], packets: [], evidence: [], memories: [], metrics: [], feedback: [], approvals: [],
    })
  })

  it('rejects synthetic Demo provenance in Standard', () => {
    const partition = createStandardPartition()
    expect(() => writeRecord('standard', partition, 'events', {
      id: 'demo:event:1',
      provenance: { dataClass: 'synthetic_demo', sourceType: 'demo_fixture', sourceId: 'demo:fixture' },
    })).toThrow('Standard mode rejects synthetic_demo provenance')
  })

  it('prevents Standard from resolving DemoFixtureAdapter', () => {
    expect(() => resolveAdapter('standard', 'DemoFixtureAdapter')).toThrow('unavailable in standard mode')
  })

  it('prevents Demo from resolving production write adapters', () => {
    expect(() => resolveAdapter('demo', 'PublishingAdapter')).toThrow('unavailable in demo mode')
  })

  it('creates only namespaced synthetic Demo records', () => {
    const demo = createDemoPartition()
    for (const collection of Object.values(demo)) {
      for (const record of collection) {
        expect(record.id.startsWith('demo:')).toBe(true)
        expect(record.provenance.dataClass).toBe('synthetic_demo')
      }
    }
  })

  it('purges Demo without changing Standard', () => {
    const standard = createStandardPartition()
    standard.events.push({ id: 'event:user:1', provenance: { dataClass: 'user_entered', sourceType: 'user', sourceId: 'user' } })
    const snapshot = structuredClone(standard)
    expect(purgeDemoPartition(createDemoPartition())).toEqual(createStandardPartition())
    expect(standard).toEqual(snapshot)
  })
})

describe('truthful jobs and operation', () => {
  it('resumes build jobs without rerunning completed work', () => {
    const initial = createBuildJobs(createBuildPlan(createCommissioningDraft()))
    const once = runNextBuildJob(initial)
    const resumed = runNextBuildJob(once)
    expect(resumed.filter((job) => job.status === 'complete')).toHaveLength(2)
    expect(resumed[0].attempts).toBe(1)
  })

  it('covers every room with an approved asset or honest placeholder and hotspot', () => {
    const plan = createBuildPlan(createCommissioningDraft())
    expect(plan.assets).toHaveLength(plan.rooms.length + 1)
    expect(plan.hotspots).toHaveLength(plan.rooms.length)
    expect(plan.hotspots.every((hotspot) => hotspot.polygon.length >= 4)).toBe(true)
  })

  it('blocks Standard workflow when dependencies are missing', () => {
    expect(startStandardWorkflow({ evidenceConfigured: false, providerConfigured: false })).toEqual({
      status: 'blocked',
      reason: 'Nova requires a configured evidence source and provider. No Demo fallback was used.',
      packets: [],
    })
  })

  it('does not bypass approval gates', () => {
    expect(startStandardWorkflow({ evidenceConfigured: true, providerConfigured: true }).status).toBe('needs_approval')
  })

  it('replay does not mutate events or execute adapters', () => {
    let adapterCalls = 0
    const events = [{ id: 'event:user:1', type: 'quest.created' }]
    const frame = createReplayFrame(events, 0, () => { adapterCalls += 1 })
    expect(frame.events).toEqual(events)
    expect(frame.events).not.toBe(events)
    expect(adapterCalls).toBe(0)
  })
})
