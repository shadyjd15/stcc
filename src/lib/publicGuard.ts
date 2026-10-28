import type { PayloadRequest } from 'payload'

import { getClientIp, verifyTurnstile } from './cloudflare'
import { rateLimit } from './rateLimit'

export const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } })

/**
 * Shared protection for every public write endpoint:
 *  1. per-IP rate limit
 *  2. honeypot field (bots fill hidden "website" inputs)
 *  3. Cloudflare Turnstile token (when configured)
 */
export async function guardPublicRequest(
  req: PayloadRequest,
  opts: {
    key: string
    limit: number
    windowMs: number
    turnstileToken?: string | null
    honeypot?: string | null
  },
): Promise<Response | null> {
  const headers = req.headers
  const ip = getClientIp(headers)
  const rl = rateLimit(`${opts.key}:${ip}`, { limit: opts.limit, windowMs: opts.windowMs })
  if (!rl.ok) {
    return json({ ok: false, error: 'Too many requests. Please try again shortly.' }, 429, {
      'Retry-After': String(rl.retryAfter),
    })
  }
  if (opts.honeypot) return json({ ok: true }, 200) // silently accept and drop
  const ts = await verifyTurnstile(req.payload, opts.turnstileToken, ip)
  if (!ts.ok) return json({ ok: false, error: 'Security check failed. Please refresh and try again.' }, 400)
  return null
}

/** Magic-byte checks so a renamed executable can never be stored as a "PDF". */
export const sniffFileType = (buf: Buffer): 'pdf' | 'docx' | 'doc' | 'png' | 'jpg' | 'webp' | null => {
  if (buf.subarray(0, 4).toString('latin1') === '%PDF') return 'pdf'
  if (buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04) return 'docx'
  if (buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0) return 'doc'
  if (buf[0] === 0x89 && buf.subarray(1, 4).toString('latin1') === 'PNG') return 'png'
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg'
  if (buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') return 'webp'
  return null
}

export const MIME_FOR: Record<string, string> = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword',
  png: 'image/png',
  jpg: 'image/jpeg',
  webp: 'image/webp',
}

export const safeFilename = (name: string, ext: string) =>
  `${
    name
      .replace(/\.[^.]+$/, '')
      .normalize('NFKD')
      .replace(/[^\w-]+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 60) || 'file'
  }-${Date.now().toString(36)}.${ext}`
