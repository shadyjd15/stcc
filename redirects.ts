import type { NextConfig } from 'next'

/**
 * Old WordPress URLs (stcc.sa/index.php/…) → new URLs, permanently, so existing
 * Google rankings and bookmarks carry over. CMS-managed redirects live in
 * Website → Redirects and are handled at runtime.
 */
const legacy: [string, string][] = [
  ['/index.php/cme-works', '/divisions/cme-works'],
  ['/index.php/ro-swro', '/divisions/ro-swro'],
  ['/index.php/mbbr-systems', '/divisions/mbbr-systems'],
  ['/index.php/material-supply', '/divisions/material-supply'],
  ['/index.php/hvac', '/divisions/hvac'],
  ['/index.php/manpower-supply', '/divisions/manpower-supply'],
  ['/index.php/why-stcc', '/why-stcc'],
  ['/index.php/about', '/about'],
  ['/index.php/contact-us', '/contact'],
  ['/index.php', '/divisions'],
]

export const redirects: NextConfig['redirects'] = async () => [
  ...legacy.flatMap(([from, to]) => [
    { source: from, destination: to, permanent: true },
    { source: `${from}/`, destination: to, permanent: true },
  ]),
  { source: '/wp-admin/:path*', destination: '/admin', permanent: false },
  { source: '/contact-us', destination: '/contact', permanent: true },
  // English lives at the root: /en/... is only an internal path, so send visitors to the clean URL.
  // (Done here rather than in the proxy, because config redirects only see the URL the visitor asked for.)
  { source: '/en', destination: '/', permanent: true },
  { source: '/en/:path*', destination: '/:path*', permanent: true },
]
