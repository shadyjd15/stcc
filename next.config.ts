import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

import { redirects } from './redirects'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const serverUrl = new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
const r2Url = process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL) : null

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  // Docker uses the self-contained standalone server; Hostinger runs `next start` via server.mjs
  output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
  serverExternalPackages: ['unpdf', 'mammoth', 'nodemailer', 'sharp'],
  // never bundle user uploads, caught test mail or source files into the deployable output
  outputFileTracingExcludes: {
    '*': ['./uploads/**/*', './.mail/**/*', './src/**/*', './scripts/**/*', './backups/**/*', './tests/**/*'],
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  sassOptions: { loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'] },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/**' }],
    remotePatterns: [
      { hostname: serverUrl.hostname, protocol: serverUrl.protocol.replace(':', '') as 'http' | 'https' },
      ...(r2Url ? [{ hostname: r2Url.hostname, protocol: 'https' as const }] : []),
    ],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // fonts, Next static chunks and optimised images can be cached "forever" at the edge
      { source: '/_next/static/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/(favicon.svg|favicon.ico|apple-touch-icon.png|og-default.png)', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }] },
      // never cache the CMS, APIs, previews or the vendor portal at the edge
      { source: '/admin/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-store' }, { key: 'X-Robots-Tag', value: 'noindex' }] },
      { source: '/vendor-portal/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
    ]
  },
  redirects,
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: { root: path.resolve(dirname) },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
