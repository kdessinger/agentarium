import {
  SCHEMA_VERSION,
  createBuildPlan,
  createCommissioningDraft,
  validateCommissioningDraft,
  type CommissioningDraft,
  type InstallationMode,
} from './commissioning'

export type StorageLike = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export const workspaceKey = (mode: InstallationMode) => `agentarium:${mode}:active:v${SCHEMA_VERSION}`
export const draftKey = (mode: InstallationMode) => `agentarium:${mode}:commissioning:v${SCHEMA_VERSION}`
export const backupKey = (mode: InstallationMode) => `agentarium:${mode}:commissioning-backup:v${SCHEMA_VERSION}`

type LoadResult = { record: CommissioningDraft | null; error?: string; recoveryJson?: string; migrated?: boolean }

function hydrateCurrentDefaults(value: unknown): unknown {
  if (!value || typeof value !== 'object' || (value as { schemaVersion?: unknown }).schemaVersion !== SCHEMA_VERSION) return value
  const record = value as Partial<CommissioningDraft>
  if (record.articulation) return value
  const defaults = createCommissioningDraft({
    installationMode: record.installationMode,
    visualStyleId: record.visualStyleId,
    worldTemplateId: record.worldTemplateId,
    worldName: record.worldName,
  })
  const hydrated = { ...record, articulation: defaults.articulation, buildPlan: undefined } as CommissioningDraft
  if (hydrated.status === 'complete') hydrated.buildPlan = createBuildPlan(hydrated)
  return hydrated
}

function parseJson(raw: string): unknown {
  try { return JSON.parse(raw) as unknown } catch { throw new Error('Invalid commissioning JSON') }
}

function migrateV1(value: unknown): CommissioningDraft | null {
  if (!value || typeof value !== 'object' || (value as { schemaVersion?: unknown }).schemaVersion !== 1) return null
  const legacy = value as Partial<CommissioningDraft>
  if (legacy.installationMode !== 'standard' && legacy.installationMode !== 'demo') return null
  const migrated = createCommissioningDraft({
    installationMode: legacy.installationMode,
    visualStyleId: legacy.visualStyleId,
    worldTemplateId: legacy.worldTemplateId,
    worldName: legacy.worldName,
  })
  if (legacy.status === 'complete') {
    migrated.status = 'complete'
    migrated.buildPlan = createBuildPlan(migrated)
  }
  return migrated
}

export function loadWorkspace(storage: StorageLike, mode: InstallationMode): LoadResult {
  const current = storage.getItem(workspaceKey(mode))
  const legacy = storage.getItem('agentarium:active:v1')
  const raw = current ?? legacy
  if (!raw) return { record: null }
  let parsed: unknown
  try { parsed = parseJson(raw) } catch (error) { return { record: null, error: (error as Error).message, recoveryJson: raw } }
  const migrated = migrateV1(parsed)
  const hydrated = hydrateCurrentDefaults(migrated ?? parsed)
  const checked = validateCommissioningDraft(hydrated)
  if (!checked.ok) return { record: null, error: checked.errors.join('; '), recoveryJson: raw }
  if (checked.value.installationMode !== mode || checked.value.namespace !== mode) return { record: null, error: `Stored record does not belong to ${mode}`, recoveryJson: raw }
  if (migrated || hydrated !== parsed) storage.setItem(workspaceKey(mode), JSON.stringify(checked.value))
  return { record: checked.value, migrated: Boolean(migrated || hydrated !== parsed) }
}

export function loadDraft(storage: StorageLike, mode: InstallationMode): LoadResult {
  const raw = storage.getItem(draftKey(mode))
  if (!raw) return { record: null }
  try {
    const parsed = parseJson(raw)
    const checked = validateCommissioningDraft(hydrateCurrentDefaults(parsed))
    if (!checked.ok) return { record: null, error: checked.errors.join('; '), recoveryJson: raw }
    if (checked.value.installationMode !== mode) return { record: null, error: 'Draft mode mismatch', recoveryJson: raw }
    return { record: checked.value }
  } catch (error) {
    return { record: null, error: (error as Error).message, recoveryJson: raw }
  }
}

export function saveWorkspace(storage: StorageLike, record: CommissioningDraft): void {
  const checked = validateCommissioningDraft(record)
  if (!checked.ok) throw new Error(`Invalid commissioning record: ${checked.errors.join('; ')}`)
  storage.setItem(workspaceKey(record.installationMode), JSON.stringify(record))
}

export function saveDraft(storage: StorageLike, record: CommissioningDraft): void {
  const checked = validateCommissioningDraft(record)
  if (!checked.ok) throw new Error(`Invalid commissioning record: ${checked.errors.join('; ')}`)
  storage.setItem(draftKey(record.installationMode), JSON.stringify(record))
}

export function restartWithBackup(storage: StorageLike, current: CommissioningDraft): { backup: CommissioningDraft; draft: CommissioningDraft } {
  const checked = validateCommissioningDraft(current)
  if (!checked.ok) throw new Error(`Invalid commissioning record: ${checked.errors.join('; ')}`)
  storage.setItem(backupKey(current.installationMode), JSON.stringify(current))
  const draft = createCommissioningDraft({ installationMode: current.installationMode })
  saveDraft(storage, draft)
  return { backup: structuredClone(current), draft }
}

export function exportDraft(draft: CommissioningDraft): string {
  const checked = validateCommissioningDraft(draft)
  if (!checked.ok) throw new Error(`Invalid commissioning record: ${checked.errors.join('; ')}`)
  return JSON.stringify(draft, null, 2)
}

export function importDraft(raw: string): CommissioningDraft {
  const parsed = parseJson(raw)
  const migrated = migrateV1(parsed)
  const checked = validateCommissioningDraft(hydrateCurrentDefaults(migrated ?? parsed))
  if (!checked.ok) throw new Error(`Invalid commissioning record: ${checked.errors.join('; ')}`)
  return checked.value
}
