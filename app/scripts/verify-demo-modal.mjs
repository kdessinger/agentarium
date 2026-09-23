import { chromium } from '@playwright/test'

const browser = await chromium.launch()

async function capture(viewport, output) {
  const page = await browser.newPage({ viewport })
  await page.goto('http://10.20.30.21:41173/')
  await page.evaluate(() => {
    localStorage.clear()
    localStorage.setItem('agentarium:active:v1', JSON.stringify({
      schemaVersion: 1,
      status: 'complete',
      installationMode: 'demo',
      visualStyleId: 'pixel_art',
      worldTemplateId: 'spaceship',
      worldName: 'Modal QA',
    }))
  })
  await page.reload()
  await page.getByRole('button', { name: 'Leave Demo' }).click()
  await page.getByRole('dialog', { name: 'Leave Demo confirmation' }).screenshot({ path: output })
  await page.close()
}

await capture({ width: 612, height: 320 }, 'visual-evidence/demo-exit-modal-612.png')
await capture({ width: 390, height: 844 }, 'visual-evidence/demo-exit-modal-narrow.png')
await browser.close()
console.log('Captured Demo exit modal at desktop and narrow widths.')
