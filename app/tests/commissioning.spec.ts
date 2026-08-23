import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('fresh startup opens the in-world Commissioning Guide', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Commissioning Guide' })).toBeVisible()
  await expect(page.getByText('How should your Agentarium look?')).toBeVisible()
  await expect(page.getByText('The Bridge', { exact: true })).toHaveCount(0)
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
