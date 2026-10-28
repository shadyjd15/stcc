// Simulates a handful of visitors (different devices, sources, languages) to exercise analytics.
const { chromium, devices } = require('playwright')
const base = process.env.BASE || 'http://localhost:3000'
const visits = [
  { ua: 'Desktop Chrome', ref: 'https://www.google.com/', paths: ['/', '/divisions', '/divisions/information-technology', '/contact'] },
  { ua: 'iPhone 13', ref: 'https://www.linkedin.com/', paths: ['/careers?utm_source=linkedin&utm_medium=social&utm_campaign=qa-hiring', '/careers/qa-qc-inspector-piping'] },
  { ua: 'Desktop Firefox', ref: null, paths: ['/vendor-registration', '/why-stcc', '/about'] },
  { ua: 'Pixel 7', ref: 'https://www.bing.com/', paths: ['/ar', '/ar/divisions', '/projects'] },
  { ua: 'Desktop Safari', ref: 'https://www.google.com.sa/', paths: ['/request-a-quote', '/this-page-does-not-exist'] },
]
;(async () => {
  const browser = await chromium.launch()
  for (const v of visits) {
    const ctx = await browser.newContext({ ...devices[v.ua], extraHTTPHeaders: { 'CF-IPCountry': v.ua.includes('Firefox') ? 'AE' : 'SA', 'Accept-Language': v.paths[0].startsWith('/ar') ? 'ar-SA' : 'en-US' } })
    const page = await ctx.newPage()
    page.setDefaultTimeout(180000)
    for (const [i, p] of v.paths.entries()) {
      await page.goto(base + p, { waitUntil: 'networkidle', referer: i === 0 && v.ref ? v.ref : undefined })
      await page.mouse.wheel(0, 2500)
      await page.waitForTimeout(2500)
    }
    if (v.paths.includes('/contact')) {
      // a site search event
      await page.goto(base + '/search?q=hvac+chillers', { waitUntil: 'networkidle' })
      await page.waitForTimeout(1500)
    }
    await page.goto('about:blank') // fires the final engagement beacon
    await ctx.close()
    console.log('visited', v.ua, v.paths.length, 'pages')
  }
  await browser.close()
})()
