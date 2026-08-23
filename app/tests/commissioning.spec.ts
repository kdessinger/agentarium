import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

async function reachBuild(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: 'Pixel Art' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Standard mode/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Spaceship' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Continue to Forges' }).click()
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  await page.getByRole('button', { name: 'Review blueprint' }).click()
  await page.getByRole('button', { name: 'Approve commissioned build' }).click()
}

test('fresh startup opens the in-world Commissioning Guide', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Commissioning Guide' })).toBeVisible()
  await expect(page.getByText('How should your Agentarium look?')).toBeVisible()
  await expect(page.getByText('The Bridge', { exact: true })).toHaveCount(0)
})

test('structured interview exposes editable agent Forge and governance inputs', async ({ page }) => {
  await page.getByRole('button', { name: 'Pixel Art' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Standard mode/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Spaceship' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  for (const label of ['Ultron provider', 'Ultron model', 'Ultron fallback model', 'Ultron tools', 'Ultron permissions', 'Ultron prohibited actions', 'Ultron memory scope', 'Ultron autonomy', 'Ultron approval triggers', 'Ultron subagents', 'Ultron budget', 'Ultron success measures']) await expect(page.getByLabel(label)).toBeVisible()
  await page.getByLabel('Ultron provider').fill('local-provider-intent')
  await page.getByRole('button', { name: 'Continue to Forges' }).click()
  for (const label of ['Forge customer', 'Forge inputs', 'Forge outputs', 'Forge production agents', 'Forge QA agents', 'Forge approval points', 'Forge metrics', 'Forge risks']) await expect(page.getByLabel(label)).toBeVisible()
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  for (const label of ['Deployment intent', 'Data sensitivity', 'Data retention', 'Backup export preference', 'Spend limit', 'Failure retry behavior', 'Maintenance window', 'Telemetry privacy', 'Asset review policy']) await expect(page.getByLabel(label)).toBeVisible()
})

test('incomplete draft offers validated Resume Restart Inspect and export recovery', async ({ page }) => {
  await page.getByRole('button', { name: 'Illustrated 2D' }).click()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Incomplete commissioning draft found' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Resume' })).toBeEnabled()
  await page.getByRole('button', { name: 'Inspect Draft' }).click()
  await expect(page.locator('.draft-inspector')).toContainText('illustrated_2d')
  await expect(page.getByRole('button', { name: 'Export Draft' })).toBeVisible()
})

test('draft import resets stale step and build-job state', async ({ page }) => {
  await page.getByRole('button', { name: 'Illustrated 2D' }).click()
  const raw = await page.evaluate(() => localStorage.getItem('agentarium:standard:commissioning:v2')!)
  await page.reload()
  await page.evaluate(() => {
    localStorage.setItem('agentarium:standard:commissioning-step:v2', '7')
    localStorage.setItem('agentarium:standard:build-jobs:v2', JSON.stringify([{ id: 'forged', status: 'complete' }]))
  })
  const buffer = (globalThis as unknown as { Buffer: { from(value: string): never } }).Buffer.from(raw)
  await page.getByLabel('Import versioned draft').setInputFiles({ name: 'draft.json', mimeType: 'application/json', buffer })
  await expect(page.getByText('How should your Agentarium look?')).toBeVisible()
  const reset = await page.evaluate(() => ({ step: localStorage.getItem('agentarium:standard:commissioning-step:v2'), jobs: localStorage.getItem('agentarium:standard:build-jobs:v2') }))
  expect(reset).toEqual({ step: '0', jobs: null })
})

test('malformed draft is not trusted and preserves a recovery path', async ({ page }) => {
  await page.evaluate(() => { localStorage.setItem('agentarium:commissioning-current-mode', 'standard'); localStorage.setItem('agentarium:standard:commissioning:v2', '{broken') })
  await page.reload()
  await expect(page.getByText('This draft cannot be trusted.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Resume' })).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Restart with preserved backup' })).toBeVisible()
})

test('malformed draft is surfaced even when an active world exists', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('agentarium:active:v1', JSON.stringify({ schemaVersion: 1, status: 'complete', installationMode: 'standard', visualStyleId: 'pixel_art', worldTemplateId: 'spaceship', worldName: 'Active Vessel' }))
    localStorage.setItem('agentarium:commissioning-current-mode', 'standard')
    localStorage.setItem('agentarium:standard:commissioning:v2', '{broken')
  })
  await page.reload()
  await expect(page.getByText('This draft cannot be trusted.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Resume' })).toBeDisabled()
})

test('unconfirmed custom interview draft remains resumable', async ({ page }) => {
  await page.getByRole('button', { name: 'Custom Visual Style' }).click()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Incomplete commissioning draft found' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Resume' })).toBeEnabled()
})

test('build controls pause resume inject retry and replace one asset', async ({ page }) => {
  await reachBuild(page)
  await page.getByRole('button', { name: 'Pause build' }).click()
  await expect(page.getByRole('button', { name: 'Resume build' })).toBeVisible()
  await page.getByRole('button', { name: 'Resume build' }).click()
  await page.getByRole('button', { name: 'Inject next-job failure' }).click()
  await expect(page.getByRole('button', { name: /Retry TopologyBuilder/ })).toBeVisible()
  await page.getByRole('button', { name: /Retry TopologyBuilder/ }).click()
  await page.getByLabel('Room asset to replace').selectOption('bridge')
  await page.getByRole('button', { name: 'Replace one room asset' }).click()
  await expect(page.getByText('bridge replacement is awaiting review')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Approve replacement' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Reject replacement' })).toBeVisible()
  await page.getByRole('button', { name: 'Approve replacement' }).click()
  await expect(page.getByText('Replacement approved; visual assembly and QA must rerun')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Run next build job' })).toBeVisible()
})

test('pending room asset review survives reload', async ({ page }) => {
  await reachBuild(page)
  await page.getByLabel('Room asset to replace').selectOption('bridge')
  await page.getByRole('button', { name: 'Replace one room asset' }).click()
  await page.reload()
  await page.getByRole('button', { name: 'Resume' }).click()
  await expect(page.getByRole('button', { name: 'Approve replacement' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Reject replacement' })).toBeVisible()
})

test('Standard and Demo commissioning drafts use separate resumable keys', async ({ page }) => {
  await page.getByRole('button', { name: 'Illustrated 2D' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Demo mode/ }).click()
  const keys = await page.evaluate(() => ({ standard: localStorage.getItem('agentarium:standard:commissioning:v2'), demo: localStorage.getItem('agentarium:demo:commissioning:v2'), current: localStorage.getItem('agentarium:commissioning-current-mode') }))
  expect(keys.standard).toContain('illustrated_2d')
  expect(keys.demo).toContain('"installationMode":"demo"')
  expect(keys.current).toBe('demo')
})

test('commissioning builds the offline ship and opens room then agent views', async ({ page }) => {
  await page.getByRole('button', { name: 'Pixel Art' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Standard mode/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Spaceship' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Continue to Forges' }).click()
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  await page.getByRole('button', { name: 'Review blueprint' }).click()
  await page.getByRole('button', { name: 'Approve commissioned build' }).click()
  while (await page.getByRole('button', { name: 'Run next build job' }).isVisible()) {
    await page.getByRole('button', { name: 'Run next build job' }).click()
  }
  await page.getByRole('button', { name: 'Present commissioned world' }).click()
  await expect(page.getByRole('heading', { name: 'World Overview' })).toBeVisible()
  await page.getByRole('button', { name: 'Open The Bridge' }).dblclick()
  await expect(page.getByRole('heading', { name: 'The Bridge' })).toBeVisible()
  await page.getByRole('button', { name: 'Open Ultron profile' }).dblclick()
  await expect(page.getByRole('heading', { name: 'Ultron' })).toBeVisible()
})

test('Demo is visibly isolated and purgeable', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('agentarium:active:v1', JSON.stringify({
    schemaVersion: 1,
    status: 'complete',
    installationMode: 'demo',
    visualStyleId: 'pixel_art',
    worldTemplateId: 'spaceship',
    worldName: 'Demo Vessel',
  })))
  await page.reload()
  await expect(page.getByText('DEMO MODE — synthetic data; no external actions')).toBeVisible()
  await page.getByRole('button', { name: 'Open audit inspector' }).click()
  await expect(page.getByText('demo:quest:orientation')).toBeVisible()
  await page.getByRole('button', { name: 'Purge Demo data' }).click()
  await expect(page.getByText('Demo records purged')).toBeVisible()
})

test('Demo performs zero external network requests and requires purge confirmation on exit', async ({ page }) => {
  const external: string[] = []
  page.on('request', (request) => { if (!request.url().startsWith('http://127.0.0.1:4173')) external.push(request.url()) })
  await page.evaluate(() => localStorage.setItem('agentarium:active:v1', JSON.stringify({ schemaVersion: 1, status: 'complete', installationMode: 'demo', visualStyleId: 'pixel_art', worldTemplateId: 'spaceship', worldName: 'Offline Demo' })))
  await page.reload()
  await expect(page.getByText('DEMO MODE — synthetic data; no external actions')).toBeVisible()
  expect(external).toEqual([])
  await page.getByRole('button', { name: 'Leave Demo' }).click()
  await expect(page.getByRole('dialog', { name: 'Leave Demo confirmation' })).toBeVisible()
  await expect(page.getByText('Purge all Demo records when leaving')).toBeVisible()
  await page.getByRole('button', { name: 'Confirm leave Demo' }).click()
  const demoKeys = await page.evaluate(() => ({ active: localStorage.getItem('agentarium:demo:active:v2'), operational: localStorage.getItem('agentarium:demo:v1'), draft: localStorage.getItem('agentarium:demo:commissioning:v2') }))
  expect(demoKeys).toEqual({ active: null, operational: null, draft: null })
})

test('audit replay previous next and exit controls inspect events without changing the world', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('agentarium:active:v1', JSON.stringify({ schemaVersion: 1, status: 'complete', installationMode: 'demo', visualStyleId: 'pixel_art', worldTemplateId: 'spaceship', worldName: 'Replay Demo' })))
  await page.reload()
  await page.getByRole('button', { name: 'Open audit inspector' }).click()
  await page.getByRole('button', { name: 'Next event' }).click()
  await expect(page.getByText(/Event 1 of/)).toBeVisible()
  await expect(page.locator('.event-detail')).toContainText('demo.commissioned')
  await page.getByRole('button', { name: 'Return to current state' }).click()
  await expect(page.getByText(/Current operational state/)).toBeVisible()
})

test('non-bundled Agent View uses an honest placeholder instead of spaceship art', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('agentarium:active:v1', JSON.stringify({ schemaVersion: 1, status: 'complete', installationMode: 'standard', visualStyleId: 'clean_vector', worldTemplateId: 'resort', worldName: 'Vector Resort' })))
  await page.reload()
  if (await page.getByLabel('Choose a room').isVisible()) await page.getByLabel('Choose a room').selectOption('bridge')
  else await page.getByRole('button', { name: 'Open Operations Lodge' }).dblclick()
  await page.getByRole('button', { name: 'Open Ultron profile' }).click()
  await expect(page.getByText('Matching agent scene not rendered')).toBeVisible()
  await expect(page.getByText('No bundled spaceship art is reused')).toBeVisible()
})

test('recommission preserves and compares the active world until final approval', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('agentarium:active:v1', JSON.stringify({ schemaVersion: 1, status: 'complete', installationMode: 'standard', visualStyleId: 'pixel_art', worldTemplateId: 'spaceship', worldName: 'Active Vessel' })))
  await page.reload()
  await page.getByRole('button', { name: 'Recommission' }).click()
  await expect(page.getByText(/Active: Active Vessel · Draft: Active Vessel/)).toBeVisible()
  await page.getByRole('button', { name: 'Return to active world' }).click()
  await expect(page.getByRole('heading', { name: 'World Overview' })).toBeVisible()
  await expect(page.getByText('Active Vessel')).toBeVisible()
})

test('narrow World Overview exposes a touch-friendly room chooser', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'narrow', 'narrow-layout contract')
  await page.evaluate(() => localStorage.setItem('agentarium:active:v1', JSON.stringify({
    schemaVersion: 1,
    status: 'complete',
    installationMode: 'standard',
    visualStyleId: 'pixel_art',
    worldTemplateId: 'spaceship',
    worldName: 'Narrow Vessel',
  })))
  await page.reload()
  await expect(page.getByLabel('Choose a room')).toBeVisible()
  await page.getByLabel('Choose a room').selectOption('bridge')
  await expect(page.getByRole('heading', { name: 'The Bridge' })).toBeVisible()
})
