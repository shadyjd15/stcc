// Full vendor journey: sign up via the website, verify via the emailed link, fill the profile,
// upload every required document, submit, then staff move it through review to approval.
const { chromium, request } = require('playwright')
const fs = require('fs')
const path = require('path')
const base = process.env.BASE || 'http://localhost:3000'
const mailDir = path.join(__dirname, '..', '.mail')
const email = process.env.VENDOR_EMAIL || `procurement+${Date.now()}@gulf-valves.example`
const password = 'Vendor-Test-2026!'
const log = (...a) => console.log('»', ...a)

const findMail = async (match, timeout = 90000) => {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    for (const f of fs.readdirSync(mailDir).filter((f) => f.endsWith('.eml'))) {
      const raw = fs.readFileSync(path.join(mailDir, f), 'utf8')
      if (raw.includes(email.split('@')[0].replace(/\+.*/, '')) && match(raw, f)) return { raw, f }
    }
    await new Promise((r) => setTimeout(r, 1500))
  }
  throw new Error('mail not found')
}
const decodeQP = (s) => s.replace(/=\r?\n/g, '').replace(/=([0-9A-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))

;(async () => {
  const before = new Set(fs.readdirSync(mailDir))
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  page.setDefaultTimeout(180000)

  // 1. sign up on the public page
  await page.goto(`${base}/vendor-registration`, { waitUntil: 'networkidle' })
  const f = (n, v) => page.fill(`form [name="${n}"]`, v)
  await f('companyName', 'Gulf Valves Trading Co.')
  await page.selectOption('form [name="vendorType"]', 'distributor')
  await f('crNumber', String(2050000000 + Math.floor(Math.random() * 99999)))
  await f('contactName', 'Faisal Al-Qahtani')
  await f('phone', '+966 13 812 0000')
  await f('email', email)
  await f('password', password)
  await f('confirm', password)
  const consent = page.locator('form input[type="checkbox"][required]')
  for (let i = 0; i < (await consent.count()); i++) await consent.nth(i).check({ force: true })
  await page.locator('form button[type="submit"]').first().click()
  await page.waitForSelector('.success-panel, .field__error, .form-error', { timeout: 120000 })
  log('signup:', (await page.locator('.success-panel, .field__error, .form-error').first().innerText()).replace(/\s+/g, ' ').slice(0, 140))
  await page.screenshot({ path: '/tmp/shots/vendor-1-signup.png', fullPage: false })

  // 2. verify from the email
  const { raw } = await findMail((r, f) => !before.has(f) && /verify/i.test(r))
  const link = decodeQP(raw).match(/https?:\/\/[^\s"<>()]*verify[^\s"<>()]*/i)[0]
  log('verify link:', link.replace(/token=.{6}.*/, 'token=…'))
  await page.goto(link.replace(/^https?:\/\/[^/]+/, base), { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500)
  log('verify page:', (await page.locator('main').innerText()).replace(/\s+/g, ' ').slice(0, 120))

  // 3. log in via the API with the browser's cookie jar
  const api = page.context().request
  const H = { Origin: base }
  let r = await api.post(`${base}/api/vendors/login`, { data: { email, password }, headers: H })
  const me = (await r.json()).user
  log('login', r.status(), 'vendor id', me && me.id)

  // 4. fill the profile
  r = await api.patch(`${base}/api/vendors/${me.id}`, {
    headers: H,
    data: {
      companyNameAr: 'شركة الخليج للصمامات التجارية',
      city: 'Dammam', country: 'Saudi Arabia', address: 'Second Industrial City, Street 52',
      yearEstablished: 2009, employees: '51–200',
      primaryContact: { name: 'Faisal Al-Qahtani', title: 'Sales Manager', email, phone: '+966 13 812 0000' },
      crExpiry: '2028-03-01', vatNumber: '310123456700003',
      categories: ['valves-actuators'], regions: ['eastern', 'central'],
      bankName: 'Saudi National Bank', accountHolder: 'Gulf Valves Trading Co.', iban: 'SA0380000000608010167519',
      acceptCodeOfConduct: true, acceptHse: true, signatoryName: 'Faisal Al-Qahtani', signatoryPosition: 'Sales Manager', signature: 'Faisal Al-Qahtani',
    },
  })
  log('profile patch', r.status(), r.ok() ? '' : (await r.text()).slice(0, 300))

  // 5. upload documents (a tiny valid PDF)
  const pdf = fs.readFileSync(process.env.DOC_PDF || '/tmp/cv-weak.pdf')
  const portal = await (await api.get(`${base}/api/vendors/portal`, { headers: H })).json()
  const needed = (portal.checks || []).filter((c) => !c.ok && c.key.startsWith('doc:')).map((c) => c.key.slice(4))
  log('documents needed:', needed.join(', '))
  for (const docType of needed) {
    r = await api.post(`${base}/api/vendors/upload-document`, {
      headers: H,
      multipart: { docType, expiryDate: '2027-12-31', number: 'TEST-' + docType.toUpperCase(), file: { name: `${docType}.pdf`, mimeType: 'application/pdf', buffer: pdf } },
    })
    if (!r.ok()) log('upload failed', docType, r.status(), (await r.text()).slice(0, 200))
  }
  const after = await (await api.get(`${base}/api/vendors/portal`, { headers: H })).json()
  log('completeness', after.completeness, 'missing:', (after.checks || []).filter((c) => !c.ok).map((c) => c.label).join(', ') || 'none')

  // 6. portal screenshot, then submit
  await page.goto(`${base}/vendor-portal`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  await page.screenshot({ path: '/tmp/shots/vendor-2-portal.png', fullPage: true })
  r = await api.post(`${base}/api/vendors/submit`, { headers: H, data: {} })
  log('submit', r.status(), await r.text())

  // 7. staff moves it through the workflow
  const staff = await request.newContext({ baseURL: base, extraHTTPHeaders: H })
  await staff.post('/api/users/login', { data: { email: 'admin@stcc.sa', password: 'Stcc-Dev-2026!' } })
  const steps = [
    ['document_review'],
    ['clarification', 'Please re-upload your Zakat certificate – the copy provided has expired.'],
  ]
  for (const [to, note] of steps) {
    r = await staff.post(`/api/vendors/${me.id}/transition`, { data: { to, note } })
    log('→', to, r.status(), await r.text())
  }
  // vendor responds to clarification and resubmits
  r = await api.post(`${base}/api/vendors/submit`, { headers: H, data: {} })
  log('vendor resubmits', r.status(), await r.text())
  for (const to of ['document_review', 'technical_review', 'compliance_review', 'approved']) {
    r = await staff.post(`/api/vendors/${me.id}/transition`, { data: { to } })
    log('→', to, r.status(), await r.text())
  }
  await page.goto(`${base}/vendor-portal`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  await page.screenshot({ path: '/tmp/shots/vendor-3-approved.png', fullPage: true })
  fs.writeFileSync('/tmp/vendor-id', String(me.id))
  await browser.close()
  await staff.dispose()

  await new Promise((r) => setTimeout(r, 25000))
  const mails = fs.readdirSync(mailDir).filter((f) => !before.has(f) && f.endsWith('.eml'))
  for (const m of mails) {
    const raw = fs.readFileSync(path.join(mailDir, m), 'utf8')
    const to = (raw.match(/^To: (.*)$/m) || [])[1]
    log('mail →', to, '|', m.replace(/^\d+-/, '').replace(/\.eml$/, ''))
  }
})().catch((e) => {
  console.error('FAILED', e)
  process.exit(1)
})
