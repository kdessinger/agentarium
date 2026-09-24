import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { spawn } from 'node:child_process'

const baseURL = process.env.AGENTARIUM_URL ?? 'http://127.0.0.1:4174/'
await mkdir('visual-evidence', { recursive: true })
let localServer
try {
  const response = await fetch(baseURL)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
} catch {
  localServer = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4174', '--strictPort'], { stdio: 'ignore' })
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { if ((await fetch(baseURL)).ok) break } catch { /* server is still starting */ }
    await new Promise((resolve) => setTimeout(resolve, 250))
    if (attempt === 39) throw new Error('Visual-check server did not become ready')
  }
}
const browser = await chromium.launch({ headless: true })

async function commission(page) {
  await page.getByRole('button', { name: /Begin Agentarium commissioning/i }).click()
  await page.getByRole('tab', { name: '02 Connect Intelligence' }).click()
  await page.getByRole('button', { name: 'Continue without connection' }).click()
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  await page.getByRole('button', { name: 'Continue to Visual Style' }).click()
  await page.getByRole('button', { name: 'Pixel Art' }).click()
  await page.getByRole('button', { name: 'Continue to World' }).click()
  await page.getByRole('button', { name: 'Spaceship' }).click()
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
if (localServer) localServer.kill('SIGTERM')
