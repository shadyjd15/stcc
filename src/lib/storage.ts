import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { s3Storage } from '@payloadcms/storage-s3'
import fs from 'fs/promises'
import type { Plugin } from 'payload'

import { uploadsDir } from '@/utilities/uploadsDir'

/**
 * File storage.
 *
 * By default uploads live on the server's disk (`UPLOADS_DIR`). On hosts where the app folder is
 * replaced on every deploy (e.g. Hostinger Business web hosting), set the R2_* variables and all
 * files go to Cloudflare R2 instead:
 *
 *   R2_BUCKET           public bucket – website images and downloadable brochures, served from R2_PUBLIC_URL
 *   R2_PRIVATE_BUCKET   private bucket – CVs, vendor documents and form attachments. Never public:
 *                       files are streamed through the CMS, which checks the visitor's permissions.
 *
 * Both buckets use the same R2 API token (R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY) and R2_ENDPOINT.
 */

export const PUBLIC_UPLOADS = ['media', 'documents'] as const
export const PRIVATE_UPLOADS = ['resumes', 'vendor-documents', 'form-files'] as const

const env = () => ({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  publicBucket: process.env.R2_BUCKET,
  privateBucket: process.env.R2_PRIVATE_BUCKET,
  publicUrl: process.env.R2_PUBLIC_URL?.replace(/\/$/, ''),
})

const s3Config = () => {
  const e = env()
  return {
    endpoint: e.endpoint,
    region: 'auto',
    forcePathStyle: true,
    credentials: { accessKeyId: e.accessKeyId || '', secretAccessKey: e.secretAccessKey || '' },
  }
}

export const cloudStorageEnabled = () => {
  const e = env()
  return Boolean(e.endpoint && e.accessKeyId && e.secretAccessKey)
}

/**
 * Storage plugins for payload.config. They are always registered (disabled when R2 isn't
 * configured, so files stay on disk) – that keeps the database schema identical everywhere.
 */
export function storagePlugins(): Plugin[] {
  const e = env()
  const on = cloudStorageEnabled()
  return [
    s3Storage({
      enabled: on && Boolean(e.publicBucket),
      bucket: e.publicBucket || 'not-configured',
      config: s3Config(),
      clientCacheKey: 's3:public',
      alwaysInsertFields: true,
      collections: Object.fromEntries(
        PUBLIC_UPLOADS.map((slug) => [
          slug,
          {
            prefix: slug,
            // public files are linked straight from R2 (and cached by Cloudflare) when a public URL is set
            ...(e.publicUrl
              ? {
                  disablePayloadAccessControl: true as const,
                  generateFileURL: ({ filename, prefix }: { filename: string; prefix?: string }) =>
                    `${e.publicUrl}/${prefix ? `${prefix}/` : ''}${filename}`,
                }
              : {}),
          },
        ]),
      ),
    }),
    s3Storage({
      enabled: on && Boolean(e.privateBucket),
      bucket: e.privateBucket || 'not-configured',
      config: s3Config(),
      clientCacheKey: 's3:private',
      alwaysInsertFields: true,
      // files are served through /api/<collection>/file/<name>, which applies each collection's read access
      collections: Object.fromEntries(PRIVATE_UPLOADS.map((slug) => [slug, { prefix: slug }])),
    }),
  ]
}

let client: S3Client | null = null

/**
 * Reads an uploaded file into memory, wherever it is stored. Used by background work such as
 * CV text extraction that runs outside a visitor's request.
 */
export async function readUpload(
  collection: string,
  doc: { filename?: string | null; prefix?: string | null },
): Promise<Buffer | null> {
  if (!doc.filename) return null
  const isPrivate = (PRIVATE_UPLOADS as readonly string[]).includes(collection)
  const e = env()
  const bucket = isPrivate ? e.privateBucket : e.publicBucket

  if (cloudStorageEnabled() && bucket) {
    client ??= new S3Client(s3Config())
    const key = `${doc.prefix || collection}/${doc.filename}`
    try {
      const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
      return res.Body ? Buffer.from(await res.Body.transformToByteArray()) : null
    } catch {
      return null
    }
  }

  const dir = isPrivate ? `private/${collection}` : collection
  return fs.readFile(`${uploadsDir(dir)}/${doc.filename}`).catch(() => null)
}
