import { describe, expect, it } from 'vitest'
import { createDemoPartition, createStandardPartition } from './modes'
import { deriveFeedbackLoop } from './feedbackLoop'

describe('deriveFeedbackLoop', () => {
  it('keeps a clean Standard workspace honest and blocked at evidence', () => {
    const loop = deriveFeedbackLoop(createStandardPartition(), 'standard')

    expect(loop.currentStageId).toBe('research')
    expect(loop.stages.find((stage) => stage.id === 'research')).toMatchObject({
      status: 'blocked',
      detail: 'Awaiting attributable market evidence',
    })
    expect(loop.learning.status).toBe('waiting')
  })

  it('makes the Demo walkthrough legible without treating it as business proof', () => {
    const loop = deriveFeedbackLoop(createDemoPartition(), 'demo')

    expect(loop.currentStageId).toBe('governance')
    expect(loop.stages.find((stage) => stage.id === 'research')?.status).toBe('complete')
    expect(loop.stages.find((stage) => stage.id === 'design')?.status).toBe('complete')
    expect(loop.stages.find((stage) => stage.id === 'governance')).toMatchObject({
      status: 'needs_approval',
      detail: 'Awaiting a human decision',
    })
    expect(loop.learning).toMatchObject({
      status: 'isolated_demo',
      detail: 'Demo evidence is isolated and cannot train Standard decisions',
    })
  })
})
