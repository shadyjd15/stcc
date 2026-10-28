import type { CollectionConfig, Endpoint } from 'payload'

import { roles } from '@/access'
import { getClientIp } from '@/lib/cloudflare'
import { json, MIME_FOR, safeFilename, sniffFileType } from '@/lib/publicGuard'
import { rateLimit } from '@/lib/rateLimit'
import { uploadsDir } from '@/utilities/uploadsDir'

const ALLOWED = ['pdf', 'docx', 'doc', 'png', 'jpg', 'webp']

/** POST /api/form-files/upload – attachments for website forms (drawings, BOQs, specs) */
const upload: Endpoint = {
  path: '/upload',
  method: 'post',
  handler: async (req) => {
    const ip = getClientIp(req.headers)
    if (!rateLimit(`form-file:${ip}`, { limit: 10, windowMs: 10 * 60_000 }).ok) {
      return json({ ok: false, error: 'Too many uploads. Please wait a few minutes.' }, 429)
    }
    const form = await req.formData!()
    const file = form.get('file')
    if (!(file instanceof File) || !file.size) return json({ ok: false, error: 'No file' }, 400)
    if (file.size > 15 * 1024 * 1024) return json({ ok: false, error: 'Files must be 15 MB or smaller' }, 400)
    const buffer = Buffer.from(await file.arrayBuffer())
    let kind: string | null = sniffFileType(buffer)
    // Spreadsheets / CSV: allow by extension when content is a zip (xlsx) or plain text (csv)
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    let mime = kind ? MIME_FOR[kind] : ''
    if (kind === 'docx' && ext === 'xlsx') {
      kind = 'xlsx'
      mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } else if (!kind && ext === 'csv' && !buffer.subarray(0, 2048).includes(0)) {
      kind = 'csv'
      mime = 'text/csv'
    }
    if (!kind || ![...ALLOWED, 'xlsx', 'csv'].includes(kind)) {
      return json({ ok: false, error: 'Upload PDF, Word, Excel, CSV or image files' }, 400)
    }
    const doc = await req.payload.create({
      collection: 'form-files',
      overrideAccess: true,
      data: { originalName: file.name.slice(0, 200) },
      file: { data: buffer, mimetype: mime, name: safeFilename(file.name, kind), size: buffer.length },
    })
    return json({ ok: true, id: doc.id, name: file.name })
  },
}

export const FormFiles: CollectionConfig = {
  slug: 'form-files',
  labels: { singular: 'Form attachment', plural: 'Form attachments' },
  access: {
    create: () => false,
    read: roles('editor', 'analyst', 'procurement'),
    update: () => false,
    delete: roles('editor'),
  },
  admin: { group: 'Website', hidden: true },
  endpoints: [upload],
  fields: [{ name: 'originalName', type: 'text' }],
  upload: {
    staticDir: uploadsDir('private/form-files'),
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'image/png',
      'image/jpeg',
      'image/webp',
    ],
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'private, no-store')
      return headers
    },
  },
}
