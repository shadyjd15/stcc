import crypto from 'crypto'
import type { FieldHook, TextField } from 'payload'

const PREFIX = 'enc:v1:'
export const SECRET_MASK = '••••••••'

const getKey = (): Buffer => {
  const source = process.env.ENCRYPTION_KEY || process.env.PAYLOAD_SECRET || ''
  if (!source) throw new Error('ENCRYPTION_KEY or PAYLOAD_SECRET must be set')
  return crypto.createHash('sha256').update(source).digest()
}

export const isEncrypted = (value: unknown): value is string =>
  typeof value === 'string' && value.startsWith(PREFIX)

export const encrypt = (plain: string): string => {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', getKey(), iv)
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return PREFIX + Buffer.concat([iv, tag, enc]).toString('base64')
}

export const decrypt = (value: string | null | undefined): string => {
  if (!value) return ''
  if (!isEncrypted(value)) return value
  try {
    const raw = Buffer.from(value.slice(PREFIX.length), 'base64')
    const iv = raw.subarray(0, 12)
    const tag = raw.subarray(12, 28)
    const data = raw.subarray(28)
    const decipher = crypto.createDecipheriv('aes-256-gcm', getKey(), iv)
    decipher.setAuthTag(tag)
    return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')
  } catch {
    return ''
  }
}

/** Mask everything except the last 4 characters, e.g. for IBANs in lists */
export const maskTail = (value: string, visible = 4): string =>
  value.length <= visible ? value : '•'.repeat(Math.min(value.length - visible, 12)) + value.slice(-visible)

/* ------------------------------------------------------------------ */
/* Field factories                                                     */
/* ------------------------------------------------------------------ */

const keepPreviousIfMasked: FieldHook = ({ value, previousValue }) => {
  if (value === undefined || value === SECRET_MASK) return previousValue
  if (value === '' || value === null) return ''
  if (isEncrypted(value)) return value
  return encrypt(String(value))
}

/**
 * A write-only secret (API tokens, SMTP passwords). The admin UI only ever sees a mask;
 * server code reads the plain value by passing `context: { decryptSecrets: true }`.
 */
export const secretField = (
  name: string,
  overrides: Partial<Omit<TextField, 'type' | 'name'>> = {},
): TextField =>
  ({
    name,
    type: 'text',
    ...overrides,
    admin: {
      description: 'Stored encrypted. Leave the mask in place to keep the current value.',
      ...overrides.admin,
    },
    hooks: {
      beforeChange: [keepPreviousIfMasked],
      afterRead: [
        ({ value, req }) => {
          if (!value) return ''
          if (req.context?.decryptSecrets) return decrypt(value)
          return SECRET_MASK
        },
      ],
    },
  }) as TextField

/**
 * Sensitive data that authorised readers may see in clear (e.g. a vendor's IBAN).
 * Encrypted at rest; field-level `access.read` decides who can read it.
 */
export const encryptedField = (
  name: string,
  overrides: Partial<Omit<TextField, 'type' | 'name'>> = {},
): TextField =>
  ({
    name,
    type: 'text',
    ...overrides,
    hooks: {
      beforeChange: [
        ({ value, previousValue }) => {
          if (value === undefined) return previousValue
          if (value === '' || value === null) return ''
          if (isEncrypted(value)) return value
          return encrypt(String(value).trim())
        },
      ],
      afterRead: [({ value }) => (value ? decrypt(value) : value)],
    },
  }) as TextField
