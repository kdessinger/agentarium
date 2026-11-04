import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

async function enterSetup(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: /Begin Agentarium commissioning/i }).click()
  await expect(page.getByRole('heading', { name: 'Create Your Orchestrator' })).toBeVisible()
}

async function continuePastOrchestrator(page: import('@playwright/test').Page) {
  await enterSetup(page)
  await page.getByRole('tab', { name: '02 Connect Intelligence' }).click()
  await page.getByRole('button', { name: 'Continue without connection' }).click()
}

async function reachBuild(page: import('@playwright/test').Page) {
  await continuePastOrchestrator(page)
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  await page.getByRole('button', { name: 'Continue to Visual Style' }).click()
  await page.getByRole('button', { name: 'Pixel Art' }).click()
  await page.getByRole('button', { name: 'Continue to World' }).click()
  await page.getByRole('button', { name: 'Spaceship' }).click()
  await page.getByRole('button', { name: 'Review blueprint' }).click()
  await page.getByRole('button', { name: 'Approve commissioned build' }).click()
}

test('world-template commissioning shows representative thumbnails and a custom-unique note', async ({ page }) => {
  await continuePastOrchestrator(page)
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  await page.getByRole('button', { name: 'Continue to Visual Style' }).click()
  await page.getByRole('button', { name: 'Pixel Art' }).click()
  await page.getByRole('button', { name: 'Continue to World' }).click()
  await expect(page.getByText('Each commissioned world is custom and unique')).toBeVisible()
  await expect(page.getByRole('img', { name: /Modern Corporate Office concept preview/ })).toBeVisible()
  await page.getByRole('button', { name: 'Spaceship' }).click()
  await expect(page.getByRole('img', { name: /Spaceship concept preview/ })).toBeVisible()
  await expect(page.locator('.selected-world-preview')).toContainText('Spaceship')
})

test('first setup surface creates one Orchestrator without exposing the full crew', async ({ page }) => {
  await enterSetup(page)
  await expect(page.getByText('Orchestrator · The Bridge')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Professional' })).toBeVisible()
  await expect(page.getByText('Nova', { exact: true })).toHaveCount(0)
  await expect(page.getByText('unconfigured / unconfigured')).toHaveCount(0)
})

test('Orchestrator identity choices persist into the commissioning draft', async ({ page }) => {
  await enterSetup(page)
  await page.getByLabel('Name Optional').fill('Ultron Prime')
  await page.getByRole('button', { name: 'Technical / Scientific' }).click()
  await page.getByRole('button', { name: /^Trusted/ }).click()
  await page.getByRole('button', { name: 'Sentinel appearance' }).click()

  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('agentarium:standard:commissioning:v2')!))
  expect(stored.agents.find((agent: { id: string }) => agent.id === 'ultron')).toMatchObject({
    name: 'Ultron Prime',
    personality: 'Technical / Scientific',
    workingStyle: 'Trusted',
    avatarId: 'security',
    autonomy: 'trusted',
  })
  await expect(page.getByRole('button', { name: 'Pixel Art' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Spaceship' })).toHaveCount(0)
})

test('provider catalog and later Forge governance inputs remain available', async ({ page }) => {
  await enterSetup(page)
  await page.getByRole('tab', { name: '02 Connect Intelligence' }).click()
  for (const provider of ['OpenAI', 'Anthropic', 'OpenRouter', 'Ollama']) await expect(page.getByRole('button', { name: new RegExp(`^${provider} —`) })).toBeVisible()
  await page.getByRole('button', { name: 'Continue without connection' }).click()
  for (const label of ['Forge customer', 'Forge inputs', 'Forge outputs', 'Forge production agents', 'Forge QA agents', 'Forge approval points', 'Forge metrics', 'Forge risks']) await expect(page.getByLabel(label)).toBeVisible()
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  for (const label of ['Deployment intent', 'Data sensitivity', 'Data retention', 'Backup export preference', 'Spend limit', 'Failure retry behavior', 'Maintenance window', 'Telemetry privacy', 'Asset review policy']) await expect(page.getByLabel(label)).toBeVisible()
})

test('incomplete draft offers validated Resume Restart Inspect and export recovery', async ({ page }) => {
  await enterSetup(page)
  await page.getByLabel('Name Optional').fill('Recovery Orchestrator')
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Incomplete commissioning draft found' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Resume' })).toBeEnabled()
  await page.getByRole('button', { name: 'Inspect Draft' }).click()
  await expect(page.locator('.draft-inspector')).toContainText('Recovery Orchestrator')
  await expect(page.locator('.draft-inspector')).toContainText('Professional')
  await expect(page.getByRole('button', { name: 'Export Draft' })).toBeVisible()
})

test('draft import resets stale step and build-job state', async ({ page }) => {
  await enterSetup(page)
  await page.getByLabel('Name Optional').fill('Imported Orchestrator')
  const raw = await page.evaluate(() => localStorage.getItem('agentarium:standard:commissioning:v2')!)
  await page.reload()
  await page.evaluate(() => {
    localStorage.setItem('agentarium:standard:commissioning-step:v2', '7')
    localStorage.setItem('agentarium:standard:build-jobs:v2', JSON.stringify([{ id: 'forged', status: 'complete' }]))
  })
  const buffer = (globalThis as unknown as { Buffer: { from(value: string): never } }).Buffer.from(raw)
  await page.getByLabel('Import versioned draft').setInputFiles({ name: 'draft.json', mimeType: 'application/json', buffer })
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Create Your Orchestrator' })).toBeVisible()
  await expect(page.getByLabel('Name Optional')).toHaveValue('Imported Orchestrator')
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
  await continuePastOrchestrator(page)
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  await page.getByRole('button', { name: 'Continue to Visual Style' }).click()
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
  await enterSetup(page)
  await page.getByLabel('Name Optional').fill('Persistent Orchestrator')
  await page.getByRole('button', { name: 'Explore Demo World' }).click()
  const keys = await page.evaluate(() => ({ standard: localStorage.getItem('agentarium:standard:commissioning:v2'), demo: localStorage.getItem('agentarium:demo:commissioning:v2'), current: localStorage.getItem('agentarium:commissioning-current-mode') }))
  expect(keys.standard).toContain('Persistent Orchestrator')
  expect(keys.demo).toContain('"installationMode":"demo"')
  expect(keys.demo).toContain('Persistent Orchestrator')
  expect(keys.current).toBe('demo')
})

test('commissioning builds the offline ship and opens room then agent views', async ({ page }) => {
  await reachBuild(page)
  while (await page.getByRole('button', { name: 'Run next build job' }).isVisible()) {
    await page.getByRole('button', { name: 'Run next build job' }).click()
  }
  await page.getByRole('button', { name: 'Present commissioned world' }).click()
  await expect(page.getByRole('heading', { name: 'World Overview' })).toBeVisible()
  await page.getByRole('button', { name: 'Open The Bridge' }).click()
  await expect(page.getByRole('heading', { name: 'The Bridge' })).toBeVisible()
  await page.getByRole('button', { name: 'Open Ultron profile' }).click()
  await expect(page.getByRole('heading', { name: 'Ultron', exact: true })).toBeVisible()
})

test('Demo room work and agent portrait are visible from the room', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('agentarium:active:v1', JSON.stringify({ schemaVersion: 1, status: 'complete', installationMode: 'demo', visualStyleId: 'pixel_art', worldTemplateId: 'spaceship', worldName: 'Working Demo' })))
  await page.reload()
  await page.getByRole('button', { name: 'Open Pixel Room' }).click()
  await expect(page.getByRole('heading', { name: 'Pixel Room' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'What’s happening here' })).toBeVisible()
  await expect(page.getByText('Celestial keepsake visual candidate')).toBeVisible()
  await expect(page.locator('.room-agent-sprite rect').first()).toHaveAttribute('width', '5')
  await page.getByRole('button', { name: 'Open Pixel profile' }).click()
  await expect(page.getByRole('heading', { name: 'Pixel', exact: true })).toBeVisible()
  await expect(page.locator('.character-portrait img')).toHaveAttribute('src', '/concept-art/agents/portraits/pixel.png')
  await expect(page.getByRole('heading', { name: 'Current work' })).toBeVisible()
  await expect(page.getByText('Celestial keepsake visual candidate')).toBeVisible()
})

test('the closed-loop Forge overlay shows stage, gate, and learning return', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('agentarium:active:v1', JSON.stringify({ schemaVersion: 1, status: 'complete', installationMode: 'demo', visualStyleId: 'pixel_art', worldTemplateId: 'spaceship', worldName: 'Loop Demo' })))
  await page.reload()
  await expect(page.getByRole('complementary', { name: 'Closed-loop business feedback system' })).toBeVisible()
  await page.getByRole('button', { name: 'Open closed-loop Forge details' }).click()
  await expect(page.getByRole('heading', { name: 'Evidence must return upstream' })).toBeVisible()
  await expect(page.getByText('Human gate', { exact: true })).toBeVisible()
  await expect(page.getByText('Awaiting a human decision')).toBeVisible()
  await expect(page.getByText('Demo evidence is isolated and cannot train Standard decisions')).toBeVisible()
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
  page.on('request', (request) => { if (!request.url().startsWith('http://127.0.0.1:4174')) external.push(request.url()) })
  await page.evaluate(() => localStorage.setItem('agentarium:active:v1', JSON.stringify({ schemaVersion: 1, status: 'complete', installationMode: 'demo', visualStyleId: 'pixel_art', worldTemplateId: 'spaceship', worldName: 'Offline Demo' })))
  await page.reload()
  await expect(page.getByText('DEMO MODE — synthetic data; no external actions')).toBeVisible()
  expect(external).toEqual([])
  await page.getByRole('button', { name: 'Leave Demo' }).click()
  await expect(page.getByRole('dialog', { name: 'Leave Demo confirmation' })).toBeVisible()
  await expect(page.getByText('Purge all Demo records when leaving')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Stay in Demo' })).toHaveClass(/demo-cancel-button/)
  await expect(page.getByRole('button', { name: 'Confirm leave Demo' })).toHaveClass(/demo-confirm-button/)
  await expect(page.getByLabel('Purge all Demo records when leaving')).toHaveClass(/demo-purge-checkbox/)
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

test('narrow Forge loop opens only on request and releases the world when closed', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'narrow', 'narrow-layout contract')
  await page.evaluate(() => localStorage.setItem('agentarium:active:v1', JSON.stringify({
    schemaVersion: 1,
    status: 'complete',
    installationMode: 'demo',
    visualStyleId: 'pixel_art',
    worldTemplateId: 'spaceship',
    worldName: 'Loop Control Vessel',
  })))
  await page.reload()

  const openLoop = page.getByRole('button', { name: 'Open closed-loop Forge details' })
  await expect(openLoop).toBeVisible()
  await expect(openLoop).toHaveAttribute('aria-expanded', 'false')
  await expect(page.getByRole('heading', { name: 'Evidence must return upstream' })).toHaveCount(0)

  await openLoop.click()
  const closeLoop = page.getByRole('button', { name: 'Close closed-loop Forge details' })
  await expect(closeLoop).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByRole('heading', { name: 'Evidence must return upstream' })).toBeVisible()

  await closeLoop.click()
  await expect(page.getByRole('button', { name: 'Open closed-loop Forge details' })).toHaveAttribute('aria-expanded', 'false')
  await expect(page.getByLabel('Choose a room')).toBeVisible()
  await page.getByLabel('Choose a room').selectOption('bridge')
  await expect(page.getByRole('heading', { name: 'The Bridge' })).toBeVisible()
})
