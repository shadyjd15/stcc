(async () => {
const { chromium } = require('playwright')
const base = process.env.BASE || 'http://localhost:3000'
const paths = process.argv.slice(2)
const browser = await chromium.launch()
for (const w of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } })
  page.on('pageerror', (e) => console.log('PAGEERROR', e.message))
  page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE', m.text().slice(0, 200)) })
  for (const p of paths) {
    const res = await page.goto(base + p, { waitUntil: 'networkidle', timeout: 120000 })
    // reveal everything for full-page capture
    await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in')))
    await page.waitForTimeout(1500)
    const name = `/tmp/shots/${(p.replace(/\//g, '_') || '_home')}-${w}.png`
    await page.screenshot({ path: name, fullPage: true })
    console.log(res.status(), p, w, name)
  }
  await page.close()
}
await browser.close()
})()
