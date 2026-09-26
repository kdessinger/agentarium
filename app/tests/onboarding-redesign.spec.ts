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
  await expect(page.getByRole('textbox')).toHaveCount(0)
  await expect(page.getByText('Ultron', { exact: true })).toHaveCount(0)
})

test('entering setup keeps Orchestrator and Intelligence in one persistent shell', async ({ page }) => {
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Create Your Orchestrator' })).toBeVisible()
  await expect(page.getByRole('tab', { name: '01 Your Orchestrator' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tab', { name: '02 Connect Intelligence' })).toHaveAttribute('aria-selected', 'false')
  await expect(page.getByRole('button', { name: 'Restore Agentarium' })).toBeVisible()

  await page.getByRole('tab', { name: '02 Connect Intelligence' }).click()
  await expect(page.getByRole('tab', { name: '01 Your Orchestrator' })).toHaveAttribute('aria-selected', 'false')
  await expect(page.getByRole('tab', { name: '02 Connect Intelligence' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByText('Ultron', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Choose an intelligence provider' })).toBeVisible()
})

test('Orchestrator appearance portraits render instead of blank cards', async ({ page }) => {
  await page.keyboard.press('Enter')
  const preview = page.getByAltText('Navigator Orchestrator appearance')
  await expect(preview).toBeVisible()
  await expect.poll(() => preview.evaluate((image) => {
    const portrait = image as HTMLImageElement
    return portrait.complete && portrait.naturalWidth > 0 && portrait.naturalHeight > 0
  })).toBe(true)
  await expect(page.locator('.appearance-grid img')).toHaveCount(8)
  await expect.poll(() => page.locator('.appearance-grid img').evaluateAll((images) => images.every((image) => {
    const portrait = image as HTMLImageElement
    return portrait.complete && portrait.naturalWidth > 0 && portrait.naturalHeight > 0
  }))).toBe(true)
})

test('Orchestrator setup offers approved personality working-style and atmosphere choices', async ({ page }) => {
  await page.keyboard.press('Enter')
  for (const personality of ['Professional', 'Empathetic / Friendly', 'Direct / Blunt', 'Witty / Funny', 'Technical / Scientific', 'Bold']) {
    await expect(page.getByRole('button', { name: personality })).toBeVisible()
  }
  for (const style of ['Supervised', 'Trusted', 'Custom']) {
    await expect(page.getByRole('button', { name: new RegExp(style) })).toBeVisible()
  }
  await expect(page.getByRole('group', { name: 'Interface atmosphere' })).toBeVisible()
  await expect(page.getByLabel('CRT scanlines')).toBeVisible()
  await expect(page.getByLabel('Ambient effects')).toBeVisible()
})

test('provider catalog opens an honest embedded provider detail without claiming a connection', async ({ page }) => {
  await page.keyboard.press('Enter')
  await page.getByRole('tab', { name: '02 Connect Intelligence' }).click()
  await expect(page.getByRole('button', { name: /^OpenAI —/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /^Anthropic —/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /^OpenRouter —/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /^Ollama —/ })).toBeVisible()

  await page.getByRole('button', { name: /^OpenRouter —/ }).click()
  await expect(page.getByRole('heading', { name: 'OpenRouter' })).toBeVisible()
  await expect(page.getByText('API key connector', { exact: true })).toBeVisible()
  await expect(page.getByText('Not connected')).toBeVisible()
  await expect(page.getByText(/browser prototype does not store provider secrets/i)).toBeVisible()
  await expect(page.getByText('Connected', { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'All providers' }).click()
  await expect(page.getByRole('heading', { name: 'Choose an intelligence provider' })).toBeVisible()
})

test('demo remains an optional secondary path rather than a standalone setup page', async ({ page }) => {
  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: 'Explore Demo World' })).toBeVisible()
  await expect(page.getByRole('heading', { name: /operating boundary/i })).toHaveCount(0)
})
