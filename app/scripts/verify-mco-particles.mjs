import { chromium } from '@playwright/test'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://127.0.0.1:41173/')
await page.evaluate(() => {
  localStorage.clear()
  localStorage.setItem('agentarium:active:v1', JSON.stringify({
    schemaVersion: 1,
    status: 'complete',
    installationMode: 'demo',
    visualStyleId: 'clean_vector',
    worldTemplateId: 'modern_corporate_office',
    worldName: 'MCO Particle Visibility',
  }))
})
await page.reload()
await page.waitForTimeout(500)
await page.waitForFunction(() => document.querySelectorAll('circle.flow-particle-core').length > 0, null, { timeout: 5000 })
const counts = await page.evaluate(() => ({
  cores: document.querySelectorAll('circle.flow-particle-core').length,
  halos: document.querySelectorAll('circle.flow-particle-halo').length,
  cards: document.querySelectorAll('.room-card').length,
}))
const frame2 = await page.waitForFunction(() => {
  const cores = document.querySelectorAll('circle.flow-particle-core')
  return cores.length ? cores[0].getAttribute('cx') : null
}, null, { timeout: 10000 }).then(() => true).catch(() => false)
await page.screenshot({ path: 'visual-evidence/mco-route-particles.png', fullPage: false })
await page.waitForTimeout(1500)
await page.screenshot({ path: 'visual-evidence/mco-route-particles-later.png', fullPage: false })
const later = await page.evaluate(() => {
  const cores = Array.from(document.querySelectorAll('circle.flow-particle-core'))
  return cores.slice(0, 3).map((el) => ({
    cx: el.getAttribute('cx'),
    cy: el.getAttribute('cy'),
  }))
})
console.log(JSON.stringify({ counts, frame2, later }, null, 2))
await browser.close()
