import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

async function reachBuild(page: import('@playwright/test').Page) {
  await page.getByLabel('What should this operation help you accomplish?').fill('Turn my goals into visible, governed work across specialized AI labs.')
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Standard mode/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Continue to Forges' }).click()
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  await page.getByRole('button', { name: 'Continue to Visual Style' }).click()
  await page.getByRole('button', { name: 'Pixel Art' }).click()
  await page.getByRole('button', { name: 'Continue to World' }).click()
  await page.getByRole('button', { name: 'Spaceship' }).click()
  await page.getByRole('button', { name: 'Review blueprint' }).click()
  await page.getByRole('button', { name: 'Approve commissioned build' }).click()
}

test('world-template commissioning shows representative thumbnails and a custom-unique note', async ({ page }) => {
  await page.getByLabel('What should this operation help you accomplish?').fill('Coordinate specialized AI work.')
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Standard mode/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Continue to Forges' }).click()
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

test('fresh startup opens the in-world Commissioning Guide', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Commissioning Guide' })).toBeVisible()
  await expect(page.getByRole('heading', { name: /I’m Ultron/ })).toBeVisible()
  await expect(page.getByLabel('What should this operation help you accomplish?')).toBeVisible()
  await expect(page.getByText('How should your Agentarium look?')).toHaveCount(0)
  await expect(page.getByText('The Bridge', { exact: true })).toHaveCount(0)
})

test('opening articulation is an owner and Ultron mission exchange', async ({ page }) => {
  const exchange = page.getByRole('form', { name: 'Owner and Ultron mission exchange' })
  await expect(exchange).toBeVisible()
  await expect(exchange.getByRole('heading', { name: 'Start with the mission. We’ll write the operating contract together.' })).toBeVisible()
  await expect(exchange.getByText('Ultron asks', { exact: true })).toBeVisible()
  await expect(exchange.getByText('Working contract', { exact: true })).toBeVisible()
  await expect(exchange.getByLabel('What should this operation help you accomplish?')).toBeFocused()
})

test('Ultron begins with owner purpose before asking about presentation or world', async ({ page }) => {
  await expect(page.getByText('Steward / Orchestrator')).toBeVisible()
  await expect(page.locator('.step-meter')).toContainText('1 / 9')
  await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled()
  await page.getByLabel('Your name or call sign').fill('Kenn')
  await page.getByLabel('Steward name').fill('Ultron Prime')
  await page.getByLabel('What should this operation help you accomplish?').fill('Build an AI operations world that makes delegated work visible and governable.')
  await page.getByLabel('What outcomes should we optimize for?').fill('Useful output, clear handoffs, approval before external action')
  await page.getByLabel('What must this system never do without approval?').fill('Publish externally, spend money')
  await page.getByLabel('How should the steward work with you?').fill('Explain routing and escalate consequential decisions.')
  await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled()
  await expect(page.getByRole('button', { name: 'Pixel Art' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Spaceship' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page.getByText('Choose the operating boundary.')).toBeVisible()
  await expect(page.locator('.step-meter')).toContainText('2 / 9')

  await page.getByRole('button', { name: /Standard mode/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page.getByText('Let’s shape the crew around the mission.')).toBeVisible()
  await expect(page.locator('.step-meter')).toContainText('3 / 9')
  await page.getByRole('button', { name: 'Continue to Forges' }).click()
  await expect(page.getByText('Which operations should become Forges?')).toBeVisible()
  await expect(page.locator('.step-meter')).toContainText('4 / 9')
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  await expect(page.getByText('Set the governance boundary.')).toBeVisible()
  await expect(page.locator('.step-meter')).toContainText('5 / 9')
  await page.getByRole('button', { name: 'Continue to Visual Style' }).click()
  await expect(page.getByText('Now, how should this operation feel?')).toBeVisible()
  await expect(page.locator('.step-meter')).toContainText('6 / 9')
  await page.getByRole('button', { name: 'Pixel Art' }).click()
  await page.getByRole('button', { name: 'Continue to World' }).click()
  await expect(page.getByText('What kind of world should contain it?')).toBeVisible()
  await expect(page.locator('.step-meter')).toContainText('7 / 9')
  await page.getByRole('button', { name: 'Spaceship' }).click()
  await page.getByRole('button', { name: 'Review blueprint' }).click()
  await expect(page.getByRole('heading', { name: 'Owner and steward articulation' })).toBeVisible()
  await expect(page.getByText('Kenn', { exact: true })).toBeVisible()
  await expect(page.getByText('Ultron Prime', { exact: true })).toBeVisible()
  await expect(page.getByText('Build an AI operations world that makes delegated work visible and governable.')).toBeVisible()
  await expect(page.getByText('Useful output')).toBeVisible()
  await expect(page.getByText('Publish externally')).toBeVisible()
  await expect(page.getByText('Explain routing and escalate consequential decisions.')).toBeVisible()
  await expect(page.locator('.step-meter')).toContainText('8 / 9')
  await page.getByRole('button', { name: 'Approve commissioned build' }).click()
  await expect(page.getByRole('button', { name: 'Run next build job' })).toBeVisible()
  await expect(page.locator('.step-meter')).toContainText('9 / 9')
})

test('structured interview exposes editable agent Forge and governance inputs', async ({ page }) => {
  await page.getByLabel('What should this operation help you accomplish?').fill('Coordinate a governed crew around my goals.')
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Standard mode/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  for (const label of ['Ultron provider', 'Ultron model', 'Ultron fallback model', 'Ultron tools', 'Ultron permissions', 'Ultron prohibited actions', 'Ultron memory scope', 'Ultron autonomy', 'Ultron approval triggers', 'Ultron subagents', 'Ultron budget', 'Ultron success measures']) await expect(page.getByLabel(label)).toBeVisible()
  await page.getByLabel('Ultron provider').fill('local-provider-intent')
  await page.getByRole('button', { name: 'Continue to Forges' }).click()
  for (const label of ['Forge customer', 'Forge inputs', 'Forge outputs', 'Forge production agents', 'Forge QA agents', 'Forge approval points', 'Forge metrics', 'Forge risks']) await expect(page.getByLabel(label)).toBeVisible()
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  for (const label of ['Deployment intent', 'Data sensitivity', 'Data retention', 'Backup export preference', 'Spend limit', 'Failure retry behavior', 'Maintenance window', 'Telemetry privacy', 'Asset review policy']) await expect(page.getByLabel(label)).toBeVisible()
})

test('incomplete draft offers validated Resume Restart Inspect and export recovery', async ({ page }) => {
  await page.getByLabel('Your name or call sign').fill('Recovery Owner')
  await page.getByLabel('What should this operation help you accomplish?').fill('Recover this Ultron-first mission safely.')
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Incomplete commissioning draft found' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Resume' })).toBeEnabled()
  await page.getByRole('button', { name: 'Inspect Draft' }).click()
  await expect(page.locator('.draft-inspector')).toContainText('Recover this Ultron-first mission safely.')
  await expect(page.locator('.draft-inspector')).toContainText('Recovery Owner')
  await expect(page.getByRole('button', { name: 'Export Draft' })).toBeVisible()
})

test('draft import resets stale step and build-job state', async ({ page }) => {
  await page.getByLabel('Your name or call sign').fill('Import Owner')
  await page.getByLabel('What should this operation help you accomplish?').fill('Restore an imported Ultron-first mission.')
  const raw = await page.evaluate(() => localStorage.getItem('agentarium:standard:commissioning:v2')!)
  await page.reload()
  await page.evaluate(() => {
    localStorage.setItem('agentarium:standard:commissioning-step:v2', '7')
    localStorage.setItem('agentarium:standard:build-jobs:v2', JSON.stringify([{ id: 'forged', status: 'complete' }]))
  })
  const buffer = (globalThis as unknown as { Buffer: { from(value: string): never } }).Buffer.from(raw)
  await page.getByLabel('Import versioned draft').setInputFiles({ name: 'draft.json', mimeType: 'application/json', buffer })
  await expect(page.getByRole('heading', { name: /I’m Ultron/ })).toBeVisible()
  await expect(page.getByLabel('What should this operation help you accomplish?')).toHaveValue('Restore an imported Ultron-first mission.')
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
  await page.getByLabel('What should this operation help you accomplish?').fill('Commission a custom-looking governed operation.')
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Standard mode/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Continue to Forges' }).click()
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
  await page.getByLabel('What should this operation help you accomplish?').fill('Keep this mission persistent across installation modes.')
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Demo mode/ }).click()
  const keys = await page.evaluate(() => ({ standard: localStorage.getItem('agentarium:standard:commissioning:v2'), demo: localStorage.getItem('agentarium:demo:commissioning:v2'), current: localStorage.getItem('agentarium:commissioning-current-mode') }))
  expect(keys.standard).toContain('Keep this mission persistent across installation modes.')
  expect(keys.demo).toContain('"installationMode":"demo"')
  expect(keys.demo).toContain('Keep this mission persistent across installation modes.')
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
  page.on('request', (request) => { if (!request.url().startsWith('http://127.0.0.1:4173')) external.push(request.url()) })
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
