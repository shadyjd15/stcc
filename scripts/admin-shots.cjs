// Usage: NODE_PATH=$(npm root -g) node scripts/admin-shots.cjs /admin /admin/analytics ...
const { chromium } = require('playwright')
;(async () => {
  const base = process.env.BASE || 'http://localhost:3000'
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await ctx.newPage()
  page.setDefaultTimeout(240000)
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto(base + '/admin/login')
  await page.fill('input[name="email"]', 'admin@stcc.sa')
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'Stcc-Dev-2026!')
  await page.click('button[type="submit"]')
  await page.waitForURL((u) => !u.pathname.includes('login'), { timeout: 60000 })
  for (const p of process.argv.slice(2)) {
    const [path, tab] = p.split('#')
    await page.goto(base + path, { waitUntil: 'networkidle', timeout: 120000 })
    if (tab) { await page.getByRole('button', { name: tab, exact: true }).first().click().catch(() => page.getByText(tab, { exact: true }).first().click()); await page.waitForTimeout(1500) }
    await page.waitForTimeout(2500)
    const name = (path + (tab ? '-' + tab : '')).replace(/[^a-z0-9]+/gi, '_')
    await page.screenshot({ path: `/tmp/shots/admin${name}.png`, fullPage: true })
    console.log('shot', name)
  }
  console.log('ERRORS', JSON.stringify(errors.slice(0, 15), null, 1))
  await browser.close()
})()
