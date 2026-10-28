import fs from 'fs/promises'

/**
 * Extracts plain text from a CV so it can be matched and searched.
 * PDF via unpdf (pdf.js), DOCX via mammoth. Legacy .doc gets a best-effort printable-string scan.
 */
export async function extractResumeText(filePath: string, mimeType?: string | null): Promise<string> {
  const buf = await fs.readFile(filePath).catch(() => null)
  return buf ? extractResumeTextFromBuffer(buf, filePath, mimeType) : ''
}

/** Same as extractResumeText, for a file already in memory (an upload, or a file read from cloud storage) */
export async function extractResumeTextFromBuffer(buf: Buffer, filename: string, mimeType?: string | null): Promise<string> {
  const lower = filename.toLowerCase()
  try {
    if (mimeType === 'application/pdf' || lower.endsWith('.pdf')) {
      hardenArrayPrototype()
      const { extractText, getDocumentProxy } = await import('unpdf')
      const pdf = await getDocumentProxy(new Uint8Array(buf))
      const { text } = await extractText(pdf, { mergePages: true })
      return clean(Array.isArray(text) ? text.join('\n') : text)
    }
    if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      lower.endsWith('.docx')
    ) {
      const mammoth = await import('mammoth')
      const { value } = await mammoth.extractRawText({ buffer: buf })
      return clean(value)
    }
    // .doc (binary) – pull out runs of readable text
    const ascii = buf.toString('latin1').match(/[\x20-\x7E -ÿ]{4,}/g) || []
    return clean(ascii.join(' '))
  } catch (err) {
    console.error('[careers] CV text extraction failed for', filename, err)
    return ''
  }
}

const clean = (s: string) =>
  s
    .replace(/\u0000/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 60_000)

/**
 * Some tooling (drizzle-kit, loaded by the Postgres adapter in dev) adds enumerable
 * methods to Array.prototype. pdf.js refuses to run when it finds them, so make any
 * such additions non-enumerable. Harmless when nothing has polluted the prototype.
 */
function hardenArrayPrototype() {
  for (const key in Array.prototype) {
    const desc = Object.getOwnPropertyDescriptor(Array.prototype, key)
    if (desc?.enumerable && desc.configurable) {
      Object.defineProperty(Array.prototype, key, { ...desc, enumerable: false })
    }
  }
}
