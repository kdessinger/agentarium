import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const baseURL = process.env.AGENTARIUM_URL ?? 'http://127.0.0.1:4173/'
await mkdir('visual-evidence', { recursive: true })
const browser = await chromium.launch({ headless: true })

async function commission(page) {
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
}

for (const [name, viewport] of Object.entries({ desktop: { width: 1440, height: 900 }, narrow: { width: 390, height: 844 } })) {
  const context = await browser.newContext({ viewport })
  const page = await context.newPage()
  await page.goto(baseURL)
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await page.screenshot({ path: `visual-evidence/${name}-commissioning.png`, fullPage: true })
  await commission(page)
  await page.screenshot({ path: `visual-evidence/${name}-world.png`, fullPage: true })
  const metrics = await page.evaluate(() => ({
    viewport: [innerWidth, innerHeight],
    document: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
    heading: document.querySelector('h1')?.textContent,
  }))
  console.log(name, JSON.stringify(metrics))
  await context.close()
}

await browser.close()
