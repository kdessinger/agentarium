import type { InstallationMode, OperationalPartition } from './commissioning'

export type FeedbackLoopStageId = 'research' | 'design' | 'forge' | 'marketing' | 'treasury' | 'governance' | 'fulfillment'
export type FeedbackLoopStageStatus = 'blocked' | 'waiting' | 'active' | 'complete' | 'needs_approval'

export type FeedbackLoopStage = {
  id: FeedbackLoopStageId
  label: string
  roomLabel: string
  status: FeedbackLoopStageStatus
  detail: string
}

export type FeedbackLoopState = {
  currentStageId: FeedbackLoopStageId
  stages: FeedbackLoopStage[]
  learning: {
    status: 'waiting' | 'ready' | 'isolated_demo'
    detail: string
  }
}

const baseStages: Array<Omit<FeedbackLoopStage, 'status' | 'detail'>> = [
  { id: 'research', label: 'Market signal', roomLabel: 'Nova' },
  { id: 'design', label: 'Visual concept', roomLabel: 'Pixel' },
  { id: 'forge', label: 'Product test', roomLabel: 'Forge' },
  { id: 'marketing', label: 'Demand test', roomLabel: 'Jared' },
  { id: 'treasury', label: 'Unit economics', roomLabel: 'Treasury' },
  { id: 'governance', label: 'Human gate', roomLabel: 'Governance' },
  { id: 'fulfillment', label: 'Delivery result', roomLabel: 'Fulfillment' },
]

function stage(id: FeedbackLoopStageId, status: FeedbackLoopStageStatus, detail: string): FeedbackLoopStage {
  const definition = baseStages.find((item) => item.id === id)!
  return { ...definition, status, detail }
}

export function deriveFeedbackLoop(partition: OperationalPartition, mode: InstallationMode): FeedbackLoopState {
  if (mode === 'standard') {
    return {
      currentStageId: 'research',
      stages: [
        stage('research', 'blocked', 'Awaiting attributable market evidence'),
        stage('design', 'waiting', 'Requires an approved opportunity packet'),
        stage('forge', 'waiting', 'Requires a reviewed visual and product brief'),
        stage('marketing', 'waiting', 'Requires an approved listing and configured channel'),
        stage('treasury', 'waiting', 'Cost tracking not configured'),
        stage('governance', 'waiting', 'No proposed consequential action'),
        stage('fulfillment', 'waiting', 'No approved order or fulfillment adapter'),
      ],
      learning: { status: 'waiting', detail: 'No verified outcome exists to feed back into the next research cycle' },
    }
  }

  const hasEvidence = partition.evidence.length > 0
  const hasVisual = partition.packets.some((record) => record.type === 'visual_candidate_packet')
  const hasProduct = partition.packets.some((record) => record.type === 'product_listing_packet')
  const pendingApproval = partition.approvals.some((record) => record.status === 'pending')

  return {
    currentStageId: pendingApproval ? 'governance' : hasVisual ? 'marketing' : hasProduct ? 'design' : 'research',
    stages: [
      stage('research', hasEvidence ? 'complete' : 'active', hasEvidence ? 'Synthetic evidence reviewed for orientation only' : 'Reading the isolated Demo fixture'),
      stage('design', hasVisual ? 'complete' : 'waiting', hasVisual ? 'Synthetic visual candidate prepared' : 'Requires a product direction'),
      stage('forge', hasProduct ? 'complete' : 'waiting', hasProduct ? 'Synthetic listing packet prepared' : 'Requires an opportunity packet'),
      stage('marketing', 'waiting', 'No configured marketing channel in Demo'),
      stage('treasury', 'waiting', 'No financial system is connected in Demo'),
      stage('governance', pendingApproval ? 'needs_approval' : 'waiting', pendingApproval ? 'Awaiting a human decision' : 'No decision pending'),
      stage('fulfillment', 'waiting', 'No external fulfillment occurs in Demo'),
    ],
    learning: { status: 'isolated_demo', detail: 'Demo evidence is isolated and cannot train Standard decisions' },
  }
}
