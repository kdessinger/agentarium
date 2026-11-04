import { chromium } from '@playwright/test'

const browser = await chromium.launch()

async function capture(viewport, output) {
  const page = await browser.newPage({ viewport })
  await page.goto('http://10.20.30.21:41173/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await page.getByLabel('What should this operation help you accomplish?').fill('Verify the commissioned world-template gallery.')
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Standard mode/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Continue to Forges' }).click()
  await page.getByRole('button', { name: 'Continue to Governance' }).click()
  await page.getByRole('button', { name: 'Continue to Visual Style' }).click()
  await page.getByRole('button', { name: 'Pixel Art' }).click()
  await page.getByRole('button', { name: 'Continue to World' }).click()
  await page.getByRole('button', { name: 'Spaceship' }).click()
  await page.screenshot({ path: output, fullPage: false })
  await page.close()
}

await capture({ width: 1440, height: 900 }, 'visual-evidence/world-template-gallery.png')
await capture({ width: 390, height: 844 }, 'visual-evidence/world-template-gallery-narrow.png')
await browser.close()
console.log('Captured world-template gallery at desktop and narrow widths.')
