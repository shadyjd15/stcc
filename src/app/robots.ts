import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const site = getServerSideURL()
  const production = process.env.NODE_ENV === 'production' && !/localhost|staging|dev\./.test(site)
  return {
    rules: production
      ? [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/next/', '/vendor-portal', '/search'] }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  }
}
