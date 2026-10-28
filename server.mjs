/**
 * Production entry point for Node hosts that start an app from a file (e.g. Hostinger web hosting:
 * set "Entry file" to server.mjs). Equivalent to `next start`, honouring the PORT the host provides
 * (and BIND_HOST if set). Docker images use the standalone server instead (see Dockerfile).
 */
process.env.NODE_ENV ??= 'production'
process.env.NODE_OPTIONS = [process.env.NODE_OPTIONS, '--no-deprecation'].filter(Boolean).join(' ')

const port = process.env.PORT || '3000'
const args = ['start', '--port', port]
// HOSTNAME is often preset to the machine name, so a dedicated variable chooses the bind address
if (process.env.BIND_HOST) args.push('--hostname', process.env.BIND_HOST)
process.argv.splice(2, process.argv.length - 2, ...args)

await import('next/dist/bin/next')
