import path from 'path'

/**
 * Absolute folder for uploaded files. Resolved from the working directory (not the bundled
 * file location) so it is stable in dev, `next start` and the standalone Docker image.
 * Public media and private files (CVs, vendor documents) live in separate trees so a
 * misconfigured web server can never expose the private ones.
 */
export const uploadsDir = (sub: string) =>
  path.resolve(process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads'), sub)
