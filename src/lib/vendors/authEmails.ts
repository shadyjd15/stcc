import type { PayloadRequest } from 'payload'

import { renderEmailLayout } from '@/lib/email/layout'
import { getEmailSettings } from '@/lib/email/settings'
import { escapeHtml } from '@/lib/email/template'

type Args = { req?: PayloadRequest; token?: string; user?: { companyName?: string; primaryContact?: { name?: string } } }

export async function vendorAuthEmail(kind: 'verify' | 'reset', args: Args): Promise<string> {
  const { req, token, user } = args
  const settings = req ? await getEmailSettings(req.payload) : null
  const site = settings?.brand.siteUrl || process.env.NEXT_PUBLIC_SERVER_URL || ''
  const brand = settings?.brand || {
    companyName: 'STCC',
    accent: '#F07A2B',
    navy: '#0B2545',
    footer: 'Sahara Technical Contracting Co.',
    siteUrl: site,
  }
  const name = escapeHtml(user?.primaryContact?.name || user?.companyName || 'there')

  if (kind === 'verify') {
    return renderEmailLayout(
      {
        eyebrow: 'Vendor registration',
        heading: 'Confirm your email address',
        preheader: 'One click to continue your STCC vendor registration',
        bodyHtml: `<p style="margin:0 0 16px">Hello ${name},</p><p style="margin:0 0 16px">Thanks for starting your vendor registration with ${escapeHtml(brand.companyName)}. Please confirm your email address to continue. You can save your progress and come back at any time.</p>`,
        cta: { label: 'Verify email & continue', url: `${site}/vendor-portal/verify?token=${token}` },
        footnote: 'If you did not start a vendor registration, you can ignore this email.',
      },
      brand,
    )
  }
  return renderEmailLayout(
    {
      eyebrow: 'Vendor portal',
      heading: 'Reset your password',
      bodyHtml: `<p style="margin:0 0 16px">Hello ${name},</p><p style="margin:0 0 16px">We received a request to reset your vendor portal password. This link is valid for one hour.</p>`,
      cta: { label: 'Choose a new password', url: `${site}/vendor-portal/reset-password?token=${token}` },
      footnote: 'If you did not request this, you can safely ignore this email – your password will not change.',
    },
    brand,
  )
}
