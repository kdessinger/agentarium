import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('fresh install opens with the locked synthwave title screen', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'AGENTARIUM' })).toBeVisible()
  await expect(page.getByText('GAMIFIED AI AGENT COMMAND SYSTEM')).toBeVisible()
  await expect(page.getByText('COMMAND THE UNKNOWN')).toBeVisible()
  await expect(page.getByRole('button', { name: /Begin Agentarium commissioning/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /Begin Agentarium commissioning/i })).toHaveText('PRESS ANY KEY TO BEGIN')
  await expect(page.getByText('Ultron', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('textbox')).toHaveCount(0)
})

test('title screen side telemetry is decorative fiction and not exposed as live metrics', async ({ page }) => {
  await expect(page.getByRole('progressbar')).toHaveCount(0)
  await expect(page.getByRole('meter')).toHaveCount(0)
  await expect(page.getByRole('status')).toHaveCount(0)
  const renderedSideText = await page.locator('.title-screen__terminal').allTextContents()
  const combined = renderedSideText.join(' ')
  expect(combined).toContain('88% USED')
  expect(combined).toContain('17% USED')
  expect(combined).toContain('CREW MEMBERS')
  await expect(page.locator('.title-screen__terminal').first()).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('.title-screen__terminal').last()).toHaveAttribute('aria-hidden', 'true')
})

test('begin control opens the Orchestrator setup shell', async ({ page }) => {
  await page.getByRole('button', { name: /Begin Agentarium commissioning/i }).click()
  await expect(page.getByRole('heading', { name: 'Create Your Orchestrator' })).toBeVisible()
  await expect(page.getByRole('tab', { name: '01 Your Orchestrator' })).toHaveAttribute('aria-selected', 'true')
})

test('begin control is also reachable via any non-modifier key', async ({ page }) => {
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Create Your Orchestrator' })).toBeVisible()
})

test('begin control ignores modifier-only presses so shortcuts still work', async ({ page }) => {
  await page.keyboard.down('Shift')
  await page.keyboard.press('K')
  await page.keyboard.up('Shift')
  await expect(page.getByRole('heading', { name: 'Create Your Orchestrator' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: /Begin Agentarium commissioning/i })).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Create Your Orchestrator' })).toBeVisible()
})
