// Seed content is plain object literals; Payload validates every document at runtime.
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Payload } from 'payload'

import { divisionsSeed } from './divisions'
import { rich } from './lexical'

const ctx = { disableRevalidate: true, skipAudit: true, skipRescore: true }

const linkTo = (url: string, label: string, appearance = 'primary') => ({ type: 'custom', url, label, appearance })

async function upsertBySlug(payload: Payload, collection: any, slug: string, data: any) {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true })
  if (existing.docs[0]) {
    return payload.update({ collection, id: existing.docs[0].id, data, context: ctx, draft: false })
  }
  return payload.create({ collection, data, context: ctx, draft: false })
}

export async function seed(payload: Payload, opts: { adminEmail?: string; adminPassword?: string } = {}) {
  const log = (m: string) => payload.logger.info(`[seed] ${m}`)

  /* ------------------------------------------------------------ users */
  if (opts.adminEmail && opts.adminPassword) {
    const { totalDocs } = await payload.count({ collection: 'users' })
    if (!totalDocs) {
      await payload.create({
        collection: 'users',
        data: { email: opts.adminEmail, password: opts.adminPassword, name: 'Website administrator', roles: ['admin'] },
        context: ctx,
      })
      log(`created admin ${opts.adminEmail}`)
    }
  }

  /* ------------------------------------------------------------ globals */
  await payload.updateGlobal({
    slug: 'site-settings',
    context: ctx,
    data: {
      general: {
        siteName: 'Sahara Technical Contracting Co.',
        shortName: 'STCC',
        tagline: 'Seamless Integration, Unmatched Security',
        titleTemplate: '%s | STCC',
        defaultDescription:
          'STCC delivers turnkey civil, mechanical and electrical works, water treatment, HVAC, IT infrastructure, industrial materials and skilled manpower across Saudi Arabia.',
      },
      company: {
        legalName: 'Sahara Technical Contracting Co.',
        city: 'Dammam',
        postalCode: '32236',
        country: 'Kingdom of Saudi Arabia',
        phones: [
          { label: 'Call us', number: '+966 51 088 0876' },
          { label: 'Call us', number: '+966 51 048 8087' },
        ],
        emails: [{ label: 'Sales & queries', email: 'sales@stcc.sa' }],
        whatsapp: '966510880876',
        officeHours: 'Sunday – Thursday, 8:00 – 17:00',
      },
      social: { profiles: [] },
      theme: { accent: '#F07A2B', navy: '#0B2545', navyDeep: '#071A33' },
      languages: { enableArabic: false },
      announcement: { enabled: false },
    },
  })

  await payload.updateGlobal({
    slug: 'email-settings',
    context: ctx,
    data: {
      smtp: { enabled: true, port: 587, security: 'starttls', fromName: 'STCC', fromAddress: 'no-reply@stcc.sa', replyTo: 'sales@stcc.sa' },
      routing: {
        contactRecipients: [{ email: 'sales@stcc.sa' }],
        quoteRecipients: [{ email: 'sales@stcc.sa' }],
        careersRecipients: [{ email: 'sales@stcc.sa' }],
        vendorRecipients: [{ email: 'sales@stcc.sa' }],
        fallbackRecipients: [{ email: 'sales@stcc.sa' }],
      },
      branding: { footerText: 'Sahara Technical Contracting Co. · Dammam 32236, Kingdom of Saudi Arabia · sales@stcc.sa' },
    },
  })

  await payload.updateGlobal({
    slug: 'careers-settings',
    context: ctx,
    data: {
      stageEmails: [
        {
          stage: 'shortlisted',
          enabled: true,
          subject: 'Good news about your application for {{jobTitle}}',
          heading: 'You have been shortlisted, {{firstName}}',
          body: 'Thank you for your interest in the **{{jobTitle}}** role. We were impressed by your profile and have shortlisted your application.\n\nA member of our recruitment team will contact you shortly to arrange the next step.\n\nReference: {{reference}}',
        },
        {
          stage: 'interview',
          enabled: true,
          subject: 'Interview invitation – {{jobTitle}}',
          heading: "Let's talk, {{firstName}}",
          body: 'We would like to invite you to an interview for the **{{jobTitle}}** position. Our team will contact you by phone or email with the date, time and format.\n\nReference: {{reference}}',
        },
        {
          stage: 'offer',
          enabled: false,
          subject: 'Your offer from {{company}}',
          body: 'Congratulations {{firstName}}. Our HR team will share your offer letter separately.',
        },
        {
          stage: 'rejected',
          enabled: true,
          subject: 'Your application for {{jobTitle}}',
          heading: 'Thank you, {{firstName}}',
          body: 'Thank you for applying for the **{{jobTitle}}** position and for the time you invested.\n\nAfter careful review we have decided to continue with other candidates whose experience more closely matches the current requirements. We will keep your details on file and may contact you about future opportunities.\n\nWe wish you every success.',
        },
      ],
      weights: { skills: 40, experience: 20, relevance: 12, certifications: 10, education: 8, screening: 10, missingMustHavePenalty: 12, autoRejectKnockouts: false },
      retentionMonths: 24,
    },
  })

  await payload.updateGlobal({
    slug: 'vendor-settings',
    context: ctx,
    data: {
      documentTypes: [
        { key: 'cr', label: 'Commercial Registration (CR)', description: 'Ministry of Commerce certificate', required: true, requiresExpiry: true, requiresNumber: true },
        { key: 'vat', label: 'VAT registration certificate', description: 'Issued by ZATCA', required: true, requiresNumber: true },
        { key: 'zakat', label: 'Zakat / income tax certificate', description: 'Valid ZATCA certificate', required: true, requiresExpiry: true },
        { key: 'gosi', label: 'GOSI certificate', description: 'Social insurance compliance', required: true, requiresExpiry: true },
        { key: 'nitaqat', label: 'Saudization (Nitaqat) certificate', description: 'Ministry of Human Resources', required: true, requiresExpiry: true },
        { key: 'chamber', label: 'Chamber of Commerce membership', description: 'Current year', required: true, requiresExpiry: true },
        { key: 'address', label: 'National address certificate', description: 'Saudi Post / SPL', required: true },
        { key: 'iban', label: 'Bank IBAN letter', description: 'On bank letterhead, stamped', required: true },
        { key: 'financials', label: 'Audited financial statements', description: 'Last 2 years', required: false },
        { key: 'iso', label: 'ISO / quality certificates', description: 'ISO 9001, 14001, 45001 if held', required: false, requiresExpiry: true },
        { key: 'hse', label: 'HSE policy / manual', description: 'Required for subcontractors', required: true, requiredFor: ['subcontractor'] },
        { key: 'profile', label: 'Company profile & catalogue', description: 'PDF', required: false },
      ],
      categories: [
        'Civil & construction works',
        'Mechanical & piping',
        'Electrical & instrumentation',
        'IT & telecom equipment',
        'HVAC equipment',
        'Water treatment equipment & chemicals',
        'Valves, pipes & fittings',
        'Steel & building materials',
        'Safety & PPE',
        'Tools & equipment rental',
        'Spare parts',
        'Logistics & transport',
        'Manpower & services',
        'Consultancy & engineering',
      ].map((label) => ({ label })),
      statusEmails: [
        {
          status: 'submitted',
          enabled: true,
          subject: 'We received your vendor registration – {{reference}}',
          heading: 'Registration received',
          body: 'Dear {{contactName}},\n\nThank you for registering **{{companyName}}** as a vendor with {{company}}. Your reference number is **{{reference}}**.\n\nOur procurement team will now check your documents. We will email you as your registration moves through each step, and you can follow progress at any time in the vendor portal.',
        },
        {
          status: 'document_review',
          enabled: true,
          subject: 'Your documents are being checked – {{reference}}',
          heading: 'Document check in progress',
          body: 'Dear {{contactName}},\n\nOur procurement team has started verifying the documents submitted for **{{companyName}}**.\n\n{{note}}',
        },
        {
          status: 'clarification',
          enabled: true,
          subject: 'Action needed on your vendor registration – {{reference}}',
          heading: 'We need a little more information',
          body: 'Dear {{contactName}},\n\nTo continue reviewing the registration for **{{companyName}}**, we need you to update some information:\n\n**{{note}}**\n\nPlease sign in to the vendor portal, make the changes and submit again.',
        },
        {
          status: 'technical_review',
          enabled: true,
          subject: 'Technical review started – {{reference}}',
          heading: 'Technical review',
          body: 'Dear {{contactName}},\n\nYour documents have been verified. Our division experts are now reviewing the capabilities and references of **{{companyName}}**.\n\n{{note}}',
        },
        {
          status: 'compliance_review',
          enabled: true,
          subject: 'Final compliance review – {{reference}}',
          heading: 'Compliance & HSE review',
          body: 'Dear {{contactName}},\n\nYour registration is in the final stage: compliance, finance and HSE sign-off.\n\n{{note}}',
        },
        {
          status: 'approved',
          enabled: true,
          subject: 'Welcome aboard – {{companyName}} is an approved STCC vendor',
          heading: 'Congratulations, you are approved',
          body: 'Dear {{contactName}},\n\nWe are pleased to confirm that **{{companyName}}** is now an approved vendor of {{company}}.\n\nYour vendor code is **{{vendorCode}}**. Please quote it on all quotations and invoices.\n\nKeep your documents up to date in the vendor portal; we will remind you before anything expires.\n\n{{note}}',
        },
        {
          status: 'rejected',
          enabled: true,
          subject: 'Your vendor registration – {{reference}}',
          heading: 'Registration outcome',
          body: 'Dear {{contactName}},\n\nThank you for your interest in working with {{company}}. After review, we are unable to approve the registration for **{{companyName}}** at this time.\n\n{{note}}\n\nYou are welcome to contact procurement if your circumstances change.',
        },
        {
          status: 'suspended',
          enabled: true,
          subject: 'Your vendor status has been suspended – {{companyName}}',
          body: 'Dear {{contactName}},\n\nThe approved vendor status of **{{companyName}}** has been suspended.\n\n{{note}}\n\nPlease contact procurement to resolve this.',
        },
      ],
      expiryReminder: { enabled: true, daysBefore: 30 },
      newSubmission: {
        subject: 'New vendor registration · {{companyName}} ({{reference}})',
        body: '**{{companyName}}** has submitted a vendor registration for review.',
      },
      referencePrefix: 'VR',
      vendorCodePrefix: 'STCC-V',
      approvalValidityMonths: 24,
      introText: 'Create an account to start. You can save your progress and finish later; most companies complete it in about 20 minutes.',
    },
  })
  log('globals')

  /* ------------------------------------------------------------ divisions */
  const divisionIds: Record<string, number | string> = {}
  for (const d of divisionsSeed()) {
    const doc = await upsertBySlug(payload, 'divisions', d.slug, { ...d, _status: 'published' })
    divisionIds[d.slug] = doc.id
  }
  log('divisions')

  /* ------------------------------------------------------------ forms */
  const upsertForm = async (title: string, data: any) => {
    const ex = await payload.find({ collection: 'forms', where: { title: { equals: title } }, limit: 1 })
    return ex.docs[0]
      ? payload.update({ collection: 'forms', id: ex.docs[0].id, data, context: ctx })
      : payload.create({ collection: 'forms', data: { title, ...data }, context: ctx })
  }

  const contactForm = await upsertForm('Contact', {
    submitButtonLabel: 'Send message',
    confirmationType: 'message',
    confirmationMessage: rich('Thank you. Your message is with our team and we will reply within 24 hours.'),
    notifyInbox: 'contact',
    analyticsEvent: 'form_submit',
    autoReply: {
      enabled: true,
      subject: 'We received your message',
      body: 'Dear {{name}},\n\nThank you for contacting {{company}}. An engineer from our team will reply within 24 hours.\n\nFor urgent matters call +966 51 088 0876.',
    },
    fields: [
      { blockType: 'text', name: 'name', label: 'Your name', required: true, width: 50 },
      { blockType: 'text', name: 'company', label: 'Company', width: 50 },
      { blockType: 'email', name: 'email', label: 'Email', required: true, width: 50 },
      { blockType: 'text', name: 'phone', label: 'Phone', width: 50 },
      {
        blockType: 'select',
        name: 'topic',
        label: 'What is it about?',
        width: 100,
        options: [
          ...divisionsSeed().map((d) => ({ label: d.shortTitle, value: d.shortTitle })),
          { label: 'Vendor / supplier enquiry', value: 'Vendor enquiry' },
          { label: 'Careers', value: 'Careers' },
          { label: 'Other', value: 'Other' },
        ],
      },
      { blockType: 'textarea', name: 'message', label: 'Your message', required: true, width: 100 },
    ],
  })

  const quoteForm = await upsertForm('Request a quote', {
    submitButtonLabel: 'Send brief',
    multiStep: true,
    confirmationType: 'message',
    confirmationMessage: rich('Thank you. The right division heads are reviewing your brief and will reply within 24 hours.'),
    notifyInbox: 'quote',
    analyticsEvent: 'quote_request',
    autoReply: {
      enabled: true,
      subject: 'We received your project brief',
      body: 'Dear {{name}},\n\nThank you for sending your project brief to {{company}}. The relevant division heads are reviewing it and will contact you within 24 hours.',
    },
    fields: [
      { blockType: 'message', message: rich('Scope') },
      { blockType: 'choices', name: 'divisions', label: 'Which divisions does your project need?', required: true, multiple: true, source: 'divisions' },
      { blockType: 'message', message: rich('Project') },
      { blockType: 'text', name: 'location', label: 'Project location', width: 50 },
      {
        blockType: 'select',
        name: 'start',
        label: 'Target start',
        width: 50,
        options: [
          { label: 'Within 1 month', value: 'Within 1 month' },
          { label: '1–3 months', value: '1–3 months' },
          { label: '3–6 months', value: '3–6 months' },
          { label: 'Planning stage', value: 'Planning stage' },
        ],
      },
      { blockType: 'textarea', name: 'scope', label: 'Scope description', required: true, width: 100 },
      { blockType: 'fileUpload', name: 'attachments', label: 'Attach drawings, BOQ, BOM or specs (optional)', maxFiles: 5 },
      { blockType: 'message', message: rich('Contact') },
      { blockType: 'text', name: 'name', label: 'Full name', required: true, width: 50 },
      { blockType: 'text', name: 'company', label: 'Company', width: 50 },
      { blockType: 'email', name: 'email', label: 'Work email', required: true, width: 50 },
      { blockType: 'text', name: 'phone', label: 'Mobile', required: true, width: 50 },
    ],
  })
  log('forms')

  /* ------------------------------------------------------------ reusable CTA */
  const reusable = await (async () => {
    const ex = await payload.find({ collection: 'reusable-blocks', where: { title: { equals: 'Closing call to action' } }, limit: 1 })
    const data = {
      title: 'Closing call to action',
      blocks: [
        {
          blockType: 'cta',
          tone: 'deep',
          eyebrow: 'Complex project delivery?',
          heading: 'Talk to our engineers. We reply within 24 hours.',
          links: [{ link: linkTo('/request-a-quote', 'Request a quote') }],
          showPhone: true,
        },
      ],
    }
    return ex.docs[0] ? payload.update({ collection: 'reusable-blocks', id: ex.docs[0].id, data, context: ctx }) : payload.create({ collection: 'reusable-blocks', data, context: ctx })
  })()

  /* ------------------------------------------------------------ pages */
  const pages: any[] = [
    {
      title: 'Home',
      slug: 'home',
      hero: {
        type: 'home',
        visual: 'illustration',
        illustration: 'network',
        eyebrow: 'Integrated engineering · KSA',
        heading: 'Seamless integration.\n*Unmatched* security.',
        text: 'One contractor for the full lifecycle of industrial and commercial projects: civil, mechanical and electrical works, water treatment, HVAC, IT infrastructure, materials and skilled manpower, delivered turnkey from design to handover.',
        links: [
          { link: linkTo('/divisions', 'Explore our divisions') },
          { link: linkTo('/request-a-quote', 'Discuss a project', 'outline') },
        ],
        stats: [
          { value: '12', suffix: '+', label: 'Years of extensive experience' },
          { value: '70', suffix: '+', label: 'Successful projects delivered' },
          { value: '250', suffix: '+', label: 'Satisfied clients' },
          { value: '90', suffix: '+', label: 'Professionals deployed on projects' },
        ],
      },
      layout: [
        { blockType: 'logos', source: 'client', variant: 'marquee', header: { eyebrow: 'Trusted by' } },
        {
          blockType: 'divisionsGrid',
          variant: 'cards',
          source: 'all',
          background: 'paper',
          header: {
            eyebrow: '01 / Our divisions',
            heading: 'Seven specialised divisions. One accountable partner.',
            intro: 'Our profile spans a wide spectrum of industrial and commercial services, so complex scopes stay under one contract and one schedule.',
          },
          ctaCard: { enabled: true, eyebrow: 'MULTI-DISCIPLINE SCOPE?', heading: 'Bundle divisions into one turnkey contract.', link: linkTo('/request-a-quote', 'Start a project brief') },
        },
        {
          blockType: 'processSteps',
          variant: 'timeline',
          background: 'navy',
          header: { eyebrow: '02 / How we deliver', heading: 'Turnkey, from first drawing to final handover.' },
          steps: [
            ['Design', 'Concept, engineering design, estimation and surveying.'],
            ['Procure', 'Sourcing of equipment and materials through our partner network.'],
            ['Build', 'Construction, fabrication and installation by certified crews.'],
            ['Inspect', 'QA/QC, testing and HSE audits at every milestone.'],
            ['Commission', 'Pre-commissioning and commissioning of every system.'],
            ['Handover', 'Documentation, training, then maintenance and shutdown support.'],
          ].map(([title, description]) => ({ title, description })),
        },
        {
          blockType: 'featureCards',
          variant: 'icon',
          columns: '3',
          background: 'paper',
          header: { eyebrow: '03 / What drives us', heading: 'Quality, on time, done safely.' },
          cards: [
            { icon: 'target', tone: 'light', title: 'Mission', text: 'Deliver world-class services with unmatched expertise and efficiency, balancing exceptional quality with timely execution so every project meets the highest standards, from start to finish.' },
            { icon: 'eye', tone: 'navy', title: 'Vision', text: 'To honour and be honoured in our field by contributing to the development of our nation, setting industry standards through excellence and integrity.' },
            { icon: 'shield', tone: 'light', title: 'HSE commitment', text: 'Health, Safety and Environment excellence is built into how we work: a safe, healthy workplace for our team and stakeholders, and a minimal environmental footprint on every site.' },
          ],
        },
        {
          blockType: 'chips',
          variant: 'rows',
          background: 'white',
          header: { eyebrow: '04 / Sectors', heading: "Built for the Kingdom's core industries.", intro: 'Certified QA/QC managers, supervisors and inspectors with experience on major client sites across Saudi Arabia.' },
          items: ['Oil & Gas', 'Petrochemical', 'Power', 'Desalination', 'Infrastructure', 'Production & allied'].map((label) => ({ label })),
        },
        { blockType: 'logos', source: 'partner', variant: 'grid', background: 'paper', header: { heading: 'Technical partners' }, sideLabel: 'OEM & TECHNOLOGY PARTNERS' },
        { blockType: 'reusable', section: reusable.id },
      ],
      meta: {
        title: 'STCC | Turnkey Engineering, Water, HVAC & IT Contractor in Saudi Arabia',
        description: 'Sahara Technical Contracting Co. (STCC): turnkey civil, mechanical & electrical works, RO/SWRO, MBBR, HVAC, IT infrastructure, material supply and manpower across KSA.',
      },
    },
    {
      title: 'Divisions',
      slug: 'divisions',
      hero: {
        type: 'page',
        visual: 'sideText',
        heading: 'Every discipline your project needs, *under one roof.*',
        text: 'Seven divisions that work as one integrated team across construction, water, climate, technology, procurement and people.',
        showDivisionLinks: true,
      },
      layout: [
        { blockType: 'divisionsGrid', variant: 'detailed', source: 'all', background: 'paper' },
        {
          blockType: 'cta',
          tone: 'accent',
          heading: "Not sure which division fits your scope? Send us the brief and we'll assemble the team.",
          links: [{ link: linkTo('/request-a-quote', 'Start a project brief') }],
        },
      ],
      meta: { title: 'Our Divisions', description: 'Seven integrated divisions: CME works, RO/SWRO, MBBR, Information Technology, HVAC, industrial material supply and manpower supply.' },
    },
    {
      title: 'About',
      slug: 'about',
      hero: {
        type: 'page',
        visual: 'wideImage',
        heading: 'Specialised engineering talent and technical services for the industries that *build the nation.*',
      },
      layout: [
        {
          blockType: 'content',
          layout: 'split',
          background: 'paper',
          header: { eyebrow: 'Overview', heading: 'World-class service, delivered on time, every time.' },
          content: rich(
            'STCC provides comprehensive technical specialised services, inspection and project management personnel for oil & gas, petrochemical, power, desalination, infrastructure, production and allied industries.\n\nOur experienced and qualified engineers, designers, draftsmen and project coordinators meet each client\'s specific, time-bound requirements on both long and short-term engagements, backed by a highly competent HR department.\n\nOur management philosophy starts with understanding each client\'s needs, then providing new and innovative solutions to their outsourcing requirements. We serve the whole Kingdom from our head office and branch offices close to site.',
          ),
        },
        {
          blockType: 'stats',
          variant: 'bar',
          background: 'white',
          items: [
            { value: '12', suffix: '+', label: 'Years in Saudi industry' },
            { value: '90', suffix: '+', label: 'Employees deployed on projects' },
            { value: '24/7', label: 'Team availability' },
            { value: 'ISO', label: '9001 quality management system' },
          ],
        },
        {
          blockType: 'featureCards',
          variant: 'statement',
          columns: '3',
          background: 'paper',
          cards: [
            { tone: 'navy', eyebrow: 'Mission', text: 'We build our business with integrity and honesty, and serve society with high standards of business ethics.' },
            { tone: 'light', eyebrow: 'Values', text: 'Honour and be honoured in our area of work, and so be part of the development of the nation.' },
            { tone: 'accent', eyebrow: 'Vision', text: 'An intense commitment to quality, operating a total Quality Management System in accordance with ISO 9001.' },
          ],
        },
        {
          blockType: 'chips',
          variant: 'pills',
          background: 'navy',
          header: {
            eyebrow: 'Our strength',
            heading: 'Team management is our way to success.',
            intro: 'Certified QA/QC managers, supervisors and inspectors with experience at major clients such as Aramco, SABIC and SEC, ready to meet your requirements at any time.',
          },
          listLabel: 'Certified professionals experienced in',
          items: ['Design', 'Estimation', 'Surveying', 'Construction', 'Inspection (QA/QC)', 'Testing', 'Pre-commissioning', 'Turnaround', 'Shutdown', 'Maintenance', 'Refurbishment', 'Transmission', 'Fabrication', 'Quality, quantity & HSE audits'].map((label) => ({ label })),
        },
        { blockType: 'reusable', section: reusable.id },
      ],
      meta: { title: 'About STCC', description: 'Sahara Technical Contracting Co. provides technical services, inspection and project management personnel for oil & gas, petrochemical, power, desalination and infrastructure in KSA.' },
    },
    {
      title: 'Why STCC',
      slug: 'why-stcc',
      hero: {
        type: 'page',
        visual: 'panel',
        heading: 'One partner. *Total accountability.*',
        text: "One contract, one dedicated team, one point of accountability, backed by in-house engineering and certified professionals proven on the Kingdom's most demanding sites.",
        panel: {
          title: 'The STCC Standard',
          badge: 'On every project',
          items: [
            { key: '1', title: 'Point of accountability', text: 'One contract and one team, from design to handover' },
            { key: '24h', title: 'Response commitment', text: 'Every enquiry answered by an engineer within a day' },
            { key: '24/7', title: 'Team availability', text: 'Site support when your operation needs it' },
            { key: 'ISO', title: '9001 quality system', text: 'Audited QA/QC and HSE at every milestone' },
          ],
        },
      },
      layout: [
        {
          blockType: 'featureCards',
          variant: 'numbered',
          columns: '4',
          background: 'paper',
          cards: [
            { tone: 'light', title: 'Dedicated management team', text: 'A fully dedicated management team owns every engagement, so you always know who is accountable.' },
            { tone: 'light', title: 'Design engineering depth', text: 'In-house experience in design engineering means fewer handoffs and faster, cleaner execution.' },
            { tone: 'light', title: 'Built for Saudi sites', text: 'Plant maintenance and construction experience in the Kingdom, familiar with major client requirements and standards.' },
            { tone: 'light', title: 'Certified, proven people', text: 'Certified QA/QC managers, supervisors and inspectors with experience at major clients such as Aramco, SABIC and SEC.' },
          ],
        },
        {
          blockType: 'featureCards',
          variant: 'icon',
          columns: '4',
          background: 'white',
          header: { eyebrow: 'HSE & quality', heading: 'Safety first. Quality always. Documented.', intro: 'Our policies are current and signed off by management. Ask us for copies for your prequalification files.' },
          cards: [
            { icon: 'shield', tone: 'navy', title: 'Think safety first', text: 'Every task begins with a hazard assessment.' },
            { icon: 'check', tone: 'navy', title: 'Proactive HSE', text: 'The highest standards and practices on every site.' },
            { icon: 'clipboard', tone: 'navy', title: 'Audited, not assumed', text: 'Quality, quantity and HSE audits at each milestone.' },
            { icon: 'leaf', tone: 'navy', title: 'Minimal footprint', text: 'Environmental impact reduced on every project.' },
          ],
        },
        {
          blockType: 'cta',
          tone: 'deep',
          heading: 'Need a vendor you can prequalify with confidence?',
          links: [{ link: linkTo('/contact', 'Request our company profile') }],
        },
      ],
      meta: { title: 'Why STCC', description: 'One partner, total accountability: a dedicated management team, in-house engineering and certified QA/QC professionals proven on Saudi industrial sites.' },
    },
    {
      title: 'Contact',
      slug: 'contact',
      hero: { type: 'centered', visual: 'none', heading: "Let's talk about *your project.*", text: 'Questions or queries? Send us a message and we usually reply within 24 hours.' },
      layout: [{ blockType: 'formBlock', form: contactForm.id, heading: 'Write a message', layout: 'withContact', overlapHero: true }],
      meta: { title: 'Contact STCC', description: 'Contact Sahara Technical Contracting Co. in Dammam: +966 51 088 0876 · sales@stcc.sa. We reply within 24 hours.' },
    },
    {
      title: 'Request a quote',
      slug: 'request-a-quote',
      hero: { type: 'centered', visual: 'none', eyebrow: 'Project brief · 3 steps · about 2 minutes', heading: "Tell us what you're building.", text: 'The right division heads review your brief and reply within 24 hours.' },
      layout: [{ blockType: 'formBlock', form: quoteForm.id, layout: 'centered', overlapHero: true }],
      meta: { title: 'Request a Quote', description: 'Send STCC your project brief, drawings or bill of materials. Multi-division scopes can be delivered as one turnkey contract.' },
    },
    {
      title: 'Projects',
      slug: 'projects',
      hero: { type: 'page', visual: 'sideText', heading: '70+ projects. *Delivered.*', text: 'Proof beats promises. A selection of the work our divisions have delivered across the Kingdom.' },
      layout: [{ blockType: 'projects', source: 'all', limit: 30, showFeatured: true, background: 'paper' }, { blockType: 'reusable', section: reusable.id }],
      meta: { title: 'Projects', description: 'Case studies of STCC projects across civil, mechanical, electrical, water treatment, HVAC and IT works in Saudi Arabia.' },
    },
    {
      title: 'Careers',
      slug: 'careers',
      hero: { type: 'page', visual: 'none', heading: "Build the Kingdom's infrastructure *with us.*", text: 'Engineers, inspectors, technicians and IT specialists working on major industrial projects across Saudi Arabia.' },
      layout: [
        {
          blockType: 'featureCards',
          variant: 'numbered',
          columns: '4',
          background: 'paper',
          cards: [
            { tone: 'light', eyebrow: ' ', title: 'Major projects', text: "Work on sites for the Kingdom's leading industrial clients." },
            { tone: 'light', eyebrow: ' ', title: 'Certified growth', text: 'Build experience in QA/QC, HSE and specialist disciplines.' },
            { tone: 'light', eyebrow: ' ', title: 'Supportive HR', text: 'A dedicated HR team that handles mobilisation and welfare.' },
            { tone: 'light', eyebrow: ' ', title: 'Safety first', text: 'An HSE culture that brings everyone home every day.' },
          ],
        },
        { blockType: 'jobs', header: { heading: 'Open positions' }, limit: 50, showFilters: true, background: 'paper' },
      ],
      meta: { title: 'Careers at STCC', description: 'Join STCC: engineering, QA/QC, HSE, technician and IT roles on major industrial projects across Saudi Arabia. Apply online in minutes.' },
    },
    {
      title: 'Vendor Registration',
      slug: 'vendor-registration',
      hero: {
        type: 'page',
        visual: 'tiles',
        eyebrow: 'Supplier & subcontractor portal',
        heading: 'Become an approved *STCC vendor.*',
        text: 'Register once to be considered for supply and subcontracting opportunities across all seven divisions. Track every review step from your vendor dashboard and by email.',
        tiles: [
          { value: '~20 min', label: 'To complete, save and resume anytime' },
          { value: '7 steps', label: 'Guided, with validation as you go' },
          { value: 'Live', label: 'Status tracking and email alerts' },
          { value: 'Secure', label: 'Encrypted, private document storage', highlight: true },
        ],
      },
      layout: [
        {
          blockType: 'processSteps',
          variant: 'columns',
          background: 'navy',
          header: { eyebrow: 'After you submit', heading: 'A transparent review. An email at every step.' },
          steps: [
            ['Submitted', 'Reference number issued instantly.'],
            ['Document check', 'Procurement verifies certificates and expiry dates.'],
            ['Clarification', 'If anything is missing, you are asked to update it.'],
            ['Technical review', 'Division experts assess capabilities and references.'],
            ['Compliance & HSE', 'Final compliance, finance and HSE sign-off.'],
            ['Approved', 'Vendor code issued; you join the approved vendor list.'],
          ].map(([title, description]) => ({ title, description, note: 'Email sent' })),
        },
      ],
      meta: { title: 'Vendor Registration', description: 'Register as an approved STCC supplier or subcontractor. Upload CR, VAT, GOSI and other documents and track your review online.' },
    },
    {
      title: 'Privacy policy',
      slug: 'privacy-policy',
      hero: { type: 'page', visual: 'none' },
      layout: [
        {
          blockType: 'content',
          layout: 'narrow',
          background: 'paper',
          content: rich(
            '[Replace with your approved privacy policy, aligned with the Saudi Personal Data Protection Law (PDPL).]\n\n## Information we collect\n\nWhen you contact us, apply for a job or register as a vendor we collect the details you provide in the form, including any files you upload.\n\n## Website analytics\n\nWe measure visits with privacy-friendly analytics that do not use cookies and do not store IP addresses.\n\n## How long we keep data\n\nJob applications are kept for up to 24 months unless you are hired. Vendor records are kept for as long as the business relationship lasts.\n\n## Your rights\n\nContact sales@stcc.sa to access, correct or delete your personal data.',
          ),
        },
      ],
      meta: { title: 'Privacy policy' },
    },
  ]

  for (const p of pages) await upsertBySlug(payload, 'pages', p.slug, { ...p, _status: 'published' })
  log('pages')

  /* ------------------------------------------------------------ header & footer */
  const pageId = async (slug: string) => (await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, depth: 0 })).docs[0]?.id
  const ref = async (slug: string, label: string) => ({ type: 'reference', reference: { relationTo: 'pages', value: await pageId(slug) }, label })

  await payload.updateGlobal({
    slug: 'header',
    context: ctx,
    data: {
      topBar: {
        enabled: true,
        showContacts: true,
        vendorButton: { enabled: true, link: await ref('vendor-registration', 'Vendor Registration') },
      },
      navItems: [
        { link: await ref('home', 'Home'), dropdown: 'none' },
        { link: await ref('divisions', 'Divisions'), dropdown: 'divisions', activeOn: '/divisions' },
        { link: await ref('projects', 'Projects'), dropdown: 'none' },
        { link: await ref('why-stcc', 'Why STCC'), dropdown: 'none' },
        { link: await ref('about', 'About'), dropdown: 'none' },
        { link: await ref('careers', 'Careers'), dropdown: 'none', activeOn: '/careers' },
        { link: await ref('contact', 'Contact'), dropdown: 'none' },
      ],
      cta: { enabled: true, link: await ref('request-a-quote', 'Request a quote') },
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: ctx,
    data: {
      about:
        'World-class services and products across industrial and commercial sectors, delivered to the highest quality standards with total client satisfaction.',
      columns: [
        { title: 'Divisions', source: 'divisions', links: [] },
        {
          title: 'Company',
          source: 'custom',
          links: [
            { link: await ref('about', 'About STCC') },
            { link: await ref('why-stcc', 'Why STCC') },
            { link: await ref('projects', 'Projects') },
            { link: await ref('careers', 'Careers') },
            { link: await ref('vendor-registration', 'Vendor registration') },
            { link: await ref('contact', 'Contact') },
          ],
        },
      ],
      showContactColumn: true,
      wordmark: 'SAHARA TECHNICAL',
      copyright: '© {{year}} Sahara Technical Contracting Co. All rights reserved.',
      bottomLinks: [{ link: await ref('privacy-policy', 'Privacy policy') }, { link: { type: 'custom', url: '/sitemap.xml', label: 'Sitemap' } }],
    },
  })
  log('header & footer')

  /* ------------------------------------------------------------ careers samples */
  const general = await payload.find({ collection: 'job-openings', where: { slug: { equals: 'general-application' } }, limit: 1 })
  if (!general.docs.length) {
    await payload.create({
      collection: 'job-openings',
      context: ctx,
      data: {
        title: 'General application',
        slug: 'general-application',
        status: 'open',
        listed: false,
        location: 'Saudi Arabia',
        summary: "Don't see your role? Send your CV and we'll match you to upcoming projects.",
        description: rich('We regularly need engineers, QA/QC inspectors, supervisors, technicians and IT specialists. Send your CV and we will contact you when a matching role opens.'),
      },
    })
  }

  const samples = [
    {
      title: 'QA/QC Inspector (Piping)',
      slug: 'qa-qc-inspector-piping',
      division: divisionIds['cme-works'],
      department: 'Quality',
      location: 'Eastern Province, Saudi Arabia',
      employmentType: 'contract',
      workplace: 'site',
      experienceMin: 5,
      experienceMax: 15,
      educationLevel: 'diploma',
      summary: 'Inspect piping fabrication and erection on petrochemical sites, from material receiving to hydrotest.',
      responsibilities: ['Inspect piping fabrication, erection and supports against approved drawings', 'Witness hydrotests and review test packages', 'Review NDT reports and welding records', 'Raise and close NCRs with the construction team'].map((text) => ({ text })),
      requirements: ['Diploma or degree in mechanical engineering', '5+ years of piping QA/QC on oil & gas or petrochemical projects', 'Knowledge of ASME B31.3 and client standards', 'API 570 or CSWIP 3.1 preferred'].map((text) => ({ text })),
      skills: [
        { skill: 'Piping inspection', weight: '5', mustHave: true },
        { skill: 'QA/QC', weight: '4', mustHave: true, synonyms: 'quality control, quality assurance' },
        { skill: 'ASME B31.3', weight: '3' },
        { skill: 'Hydrotest', weight: '3', synonyms: 'pressure test' },
        { skill: 'NDT', weight: '2', synonyms: 'RT, UT, radiography' },
        { skill: 'Aramco', weight: '2', synonyms: 'SAES, SATIP' },
      ],
      certifications: [{ name: 'API 570' }, { name: 'CSWIP 3.1' }],
      keywords: 'petrochemical, shutdown, turnaround, welding, ITP',
      screeningQuestions: [
        { question: 'Do you hold a valid Saudi Aramco inspector approval?', type: 'yesno', idealAnswer: 'yes', weight: '4', knockout: false, required: true },
        { question: 'Are you currently in Saudi Arabia?', type: 'yesno', idealAnswer: 'yes', weight: '3', knockout: false, required: true },
      ],
    },
    {
      title: 'Network Engineer',
      slug: 'network-engineer',
      division: divisionIds['information-technology'],
      department: 'Information Technology',
      location: 'Dammam, Saudi Arabia',
      employmentType: 'full-time',
      workplace: 'onsite',
      experienceMin: 4,
      educationLevel: 'bachelor',
      summary: 'Design, deploy and support industrial and enterprise networks for client sites.',
      responsibilities: ['Design LAN/WAN and industrial Wi-Fi', 'Configure switches, routers and firewalls', 'Plan cut-overs with minimal downtime', 'Document as-built configurations'].map((text) => ({ text })),
      requirements: ["Bachelor's in computer engineering or related field", '4+ years in network engineering', 'Cisco or Fortinet experience', 'CCNA required, CCNP preferred'].map((text) => ({ text })),
      skills: [
        { skill: 'Cisco', weight: '5', mustHave: true },
        { skill: 'Firewall', weight: '4', synonyms: 'Fortigate, Palo Alto' },
        { skill: 'VLAN', weight: '3' },
        { skill: 'Routing', weight: '3', synonyms: 'OSPF, BGP' },
        { skill: 'Wireless', weight: '2', synonyms: 'Wi-Fi, WLAN' },
        { skill: 'OT network', weight: '2', synonyms: 'SCADA, industrial network' },
      ],
      certifications: [{ name: 'CCNA', mustHave: true }, { name: 'CCNP' }, { name: 'NSE 4' }],
      keywords: 'structured cabling, data centre, network security, industrial',
      screeningQuestions: [{ question: 'How many years have you configured Cisco switches and routers?', type: 'number', idealAnswer: '3', weight: '4', knockout: false, required: true }],
    },
    {
      title: 'HVAC Technician',
      slug: 'hvac-technician',
      division: divisionIds['hvac'],
      department: 'HVAC',
      location: 'Al Khobar, Saudi Arabia',
      employmentType: 'full-time',
      workplace: 'site',
      experienceMin: 3,
      educationLevel: 'diploma',
      summary: 'Install, commission and maintain chillers, cooling towers and AHUs.',
      skills: [
        { skill: 'Chiller', weight: '5', mustHave: true },
        { skill: 'AHU', weight: '3', synonyms: 'air handling unit' },
        { skill: 'Cooling tower', weight: '3' },
        { skill: 'Refrigeration', weight: '3' },
        { skill: 'Preventive maintenance', weight: '2', synonyms: 'PPM' },
      ],
    },
  ]
  for (const s of samples) {
    const ex = await payload.find({ collection: 'job-openings', where: { slug: { equals: s.slug } }, limit: 1 })
    if (!ex.docs.length) {
      await payload.create({
        collection: 'job-openings',
        context: ctx,
        data: { ...s, status: 'draft', description: rich(s.summary) } as any,
      })
    }
  }
  log('careers')

  log('done')
}
