import type { Payload } from 'payload'

import { renderEmailLayout, type EmailLayoutInput } from './layout'
import { getEmailSettings } from './settings'
import { interpolate, renderTemplateHtml } from './template'

export type CmsTemplate = {
  subject?: string | null
  heading?: string | null
  body?: string | null
}

/**
 * Turns a CMS-editable template (subject / heading / body with {{placeholders}})
 * into a branded HTML email.
 */
export async function composeEmail(
  payload: Payload,
  template: CmsTemplate,
  vars: Record<string, unknown>,
  extras: Omit<EmailLayoutInput, 'heading' | 'bodyHtml'> & { fallbackHeading?: string } = {},
): Promise<{ subject: string; html: string }> {
  const settings = await getEmailSettings(payload)
  const allVars = {
    company: settings.brand.companyName,
    siteUrl: settings.brand.siteUrl,
    ...vars,
  }
  const subject = interpolate(template.subject || extras.fallbackHeading || '', allVars)
  const heading = interpolate(template.heading || subject, allVars)
  const html = renderEmailLayout(
    {
      ...extras,
      preheader: extras.preheader || subject,
      heading,
      bodyHtml: renderTemplateHtml(template.body || '', allVars),
    },
    settings.brand,
  )
  return { subject, html }
}
