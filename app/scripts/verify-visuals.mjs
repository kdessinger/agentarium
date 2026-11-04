import { chromium } from '@playwright/test'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://10.20.30.21:41173/')
await page.evaluate(() => {
  localStorage.clear()
  localStorage.setItem('agentarium:active:v1', JSON.stringify({
    schemaVersion: 1,
    status: 'complete',
    installationMode: 'demo',
    visualStyleId: 'pixel_art',
    worldTemplateId: 'spaceship',
    worldName: 'Agentarium Visual QA',
  }))
})
await page.reload()
await page.waitForTimeout(700)
await page.addStyleTag({ content: `.room-hotspot-control{border-color:rgba(34,211,238,.72)!important;background:rgba(6,182,212,.10)!important}` })
await page.screenshot({ path: 'visual-evidence/hotspot-alignment.png' })
await page.getByRole('button', { name: 'Open Pixel Room', exact: true }).click()
await page.waitForTimeout(500)
await page.screenshot({ path: 'visual-evidence/pixel-room-work.png' })
await page.getByRole('button', { name: 'Open Pixel profile', exact: true }).click()
await page.waitForTimeout(500)
await page.screenshot({ path: 'visual-evidence/pixel-agent-profile.png' })
console.log(JSON.stringify({
  hotspot: 'visual-evidence/hotspot-alignment.png',
  room: 'visual-evidence/pixel-room-work.png',
  profile: 'visual-evidence/pixel-agent-profile.png',
}))
await browser.close()
