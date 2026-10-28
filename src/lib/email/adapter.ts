import type { EmailAdapter, SendEmailOptions } from 'payload'

import { deliverEmail } from './send'

/**
 * Payload email adapter that routes every system email (password resets, vendor email
 * verification, form-builder notifications) through our CMS-configurable SMTP settings
 * and email log.
 */
export const cmsEmailAdapter = (): EmailAdapter => {
  return ({ payload }) => ({
    name: 'stcc-cms-smtp',
    defaultFromAddress: process.env.SMTP_FROM || 'no-reply@stcc.sa',
    defaultFromName: process.env.SMTP_FROM_NAME || 'STCC',
    sendEmail: async (message: SendEmailOptions) => {
      const addr = (t: unknown): string[] => {
        if (!t) return []
        if (typeof t === 'string') return t.split(',')
        if (Array.isArray(t)) return t.flatMap(addr)
        return [(t as { address: string }).address]
      }
      const to = addr(message.to)
      const html = typeof message.html === 'string' ? message.html : String(message.text || '')
      const from =
        typeof message.from === 'string'
          ? message.from
          : message.from
            ? `"${message.from.name || ''}" <${message.from.address}>`
            : undefined
      return deliverEmail(
        payload,
        {
          to,
          cc: typeof message.cc === 'string' ? message.cc : undefined,
          bcc: typeof message.bcc === 'string' ? message.bcc : undefined,
          replyTo: typeof message.replyTo === 'string' ? message.replyTo : undefined,
          subject: String(message.subject || ''),
          html,
          text: typeof message.text === 'string' ? message.text : undefined,
          category: 'system',
        },
        { from },
      )
    },
  })
}
