export type WorkflowResult = {
  status: 'blocked' | 'needs_approval'
  reason: string
  packets: Array<{ id: string; provenance: { dataClass: 'derived' } }>
}

export function startStandardWorkflow(dependencies: { evidenceConfigured: boolean; providerConfigured: boolean }): WorkflowResult {
  if (!dependencies.evidenceConfigured || !dependencies.providerConfigured) {
    return {
      status: 'blocked',
      reason: 'Nova requires a configured evidence source and provider. No Demo fallback was used.',
      packets: [],
    }
  }
  return {
    status: 'needs_approval',
    reason: 'Governance approval is required before any external action.',
    packets: [{ id: 'packet:derived:pending-review', provenance: { dataClass: 'derived' } }],
  }
}

export function createReplayFrame<T>(events: T[], cursor: number, adapter: () => void): { cursor: number; events: T[]; event?: T } {
  void adapter
  const snapshot = structuredClone(events)
  return { cursor, events: snapshot, event: snapshot[cursor] }
}
