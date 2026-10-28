import type { Payload } from 'payload'

export type ResolvedEmailSettings = {
  enabled: boolean
  host: string
  port: number
  secure: 'none' | 'starttls' | 'ssl'
  user: string
  password: string
  fromName: string
  fromAddress: string
  replyTo: string
  recipients: {
    contact: string[]
    quote: string[]
    careers: string[]
    vendors: string[]
    fallback: string[]
  }
  brand: {
    companyName: string
    accent: string
    navy: string
    footer: string
    siteUrl: string
  }
}

const splitList = (v: unknown): string[] => {
  if (Array.isArray(v)) {
    return v
      .map((r) => (typeof r === 'string' ? r : (r as { email?: string })?.email))
      .filter((x): x is string => Boolean(x && x.includes('@')))
  }
  if (typeof v === 'string') {
    return v
      .split(/[,;\s]+/)
      .map((s) => s.trim())
      .filter((s) => s.includes('@'))
  }
  return []
}

let cache: { at: number; value: ResolvedEmailSettings } | null = null
const TTL = 30_000

export const invalidateEmailSettings = () => {
  cache = null
}

/**
 * Settings saved in the CMS ("Email & notifications") win; environment variables are a fallback
 * so the site can send mail on first boot before anyone has opened the settings screen.
 */
export async function getEmailSettings(payload: Payload): Promise<ResolvedEmailSettings> {
  if (cache && Date.now() - cache.at < TTL) return cache.value

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let s: any = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let site: any = {}
  try {
    s = await payload.findGlobal({
      slug: 'email-settings',
      context: { decryptSecrets: true },
      overrideAccess: true,
      depth: 0,
    })
    site = await payload.findGlobal({ slug: 'site-settings', overrideAccess: true, depth: 0 })
  } catch {
    // globals may not exist yet during first migration
  }

  const env = process.env
  const smtp = s?.smtp || {}
  const host = smtp.host || env.SMTP_HOST || ''
  const port = Number(smtp.port || env.SMTP_PORT || 587)
  const secure = (smtp.security || env.SMTP_SECURITY || (port === 465 ? 'ssl' : 'starttls')) as
    | 'none'
    | 'starttls'
    | 'ssl'

  const companyName = site?.general?.siteName || 'Sahara Technical Contracting Co.'
  const fallback = splitList(s?.routing?.fallbackRecipients || env.NOTIFY_FALLBACK || 'sales@stcc.sa')

  const value: ResolvedEmailSettings = {
    enabled: s?.smtp?.enabled !== false && Boolean(host),
    host,
    port,
    secure,
    user: smtp.username || env.SMTP_USER || '',
    password: smtp.password || env.SMTP_PASS || '',
    fromName: smtp.fromName || env.SMTP_FROM_NAME || companyName,
    fromAddress: smtp.fromAddress || env.SMTP_FROM || 'no-reply@stcc.sa',
    replyTo: smtp.replyTo || '',
    recipients: {
      contact: splitList(s?.routing?.contactRecipients).length
        ? splitList(s?.routing?.contactRecipients)
        : fallback,
      quote: splitList(s?.routing?.quoteRecipients).length
        ? splitList(s?.routing?.quoteRecipients)
        : fallback,
      careers: splitList(s?.routing?.careersRecipients).length
        ? splitList(s?.routing?.careersRecipients)
        : fallback,
      vendors: splitList(s?.routing?.vendorRecipients).length
        ? splitList(s?.routing?.vendorRecipients)
        : fallback,
      fallback,
    },
    brand: {
      companyName,
      accent: site?.theme?.accent || '#F07A2B',
      navy: site?.theme?.navy || '#0B2545',
      footer:
        s?.branding?.footerText ||
        `${companyName} · Dammam 32236, Kingdom of Saudi Arabia · sales@stcc.sa`,
      siteUrl: env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    },
  }

  cache = { at: Date.now(), value }
  return value
}

export { splitList }
