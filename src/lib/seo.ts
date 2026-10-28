import type { Metadata } from 'next'

import { localizePath, type Locale } from '@/i18n/config'
import type { Media, SiteSetting } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

type Meta = {
  title?: string | null
  description?: string | null
  image?: number | string | Media | null
  noIndex?: boolean | null
  canonical?: string | null
} | null | undefined

const imageUrl = (img: Meta extends infer M ? (M extends { image?: infer I } ? I : never) : never) => {
  if (img && typeof img === 'object' && 'url' in img) {
    const og = (img as Media).sizes?.og?.url
    const url = og || (img as Media).url
    return url ? (url.startsWith('http') ? url : `${getServerSideURL()}${url}`) : null
  }
  return null
}

export function buildMetadata({
  meta,
  title,
  description,
  path,
  locale,
  settings,
  type = 'website',
}: {
  meta?: Meta
  title: string
  description?: string | null
  path: string
  locale: Locale
  settings: SiteSetting
  type?: 'website' | 'article'
}): Metadata {
  const site = getServerSideURL()
  const metaTitle = meta?.title || title
  const desc = meta?.description || description || settings.general?.defaultDescription || settings.general?.tagline || ''
  const canonicalPath = localizePath(path, locale)
  const canonical = meta?.canonical || `${site}${canonicalPath === '/' ? '' : canonicalPath}`
  const ogImage = imageUrl(meta?.image as never) || imageUrl(settings.general?.ogImage as never) || `${site}/og-default.png`
  const arabic = Boolean(settings.languages?.enableArabic)

  return {
    title: metaTitle,
    description: desc,
    alternates: {
      canonical,
      languages: arabic
        ? {
            en: `${site}${path === '/' ? '' : path}`,
            ar: `${site}${localizePath(path, 'ar')}`,
            'x-default': `${site}${path === '/' ? '' : path}`,
          }
        : undefined,
    },
    robots: meta?.noIndex ? { index: false, follow: true } : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type,
      url: canonical,
      title: metaTitle,
      description: desc,
      siteName: settings.general?.siteName || 'STCC',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: metaTitle }],
    },
    twitter: { card: 'summary_large_image', title: metaTitle, description: desc, images: [ogImage] },
  }
}

/* ---------------- structured data ---------------- */

export function organizationJsonLd(settings: SiteSetting) {
  const site = getServerSideURL()
  const c = settings.company
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${site}/#organization`,
    name: c?.legalName || settings.general?.siteName,
    alternateName: settings.general?.shortName || 'STCC',
    url: site,
    logo: `${site}/favicon.svg`,
    description: settings.general?.defaultDescription || settings.general?.tagline,
    foundingDate: c?.foundingYear ? String(c.foundingYear) : undefined,
    email: c?.emails?.[0]?.email,
    telephone: c?.phones?.[0]?.number,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c?.street || undefined,
      addressLocality: c?.city || 'Dammam',
      postalCode: c?.postalCode || undefined,
      addressCountry: 'SA',
    },
    geo: c?.latitude && c?.longitude ? { '@type': 'GeoCoordinates', latitude: c.latitude, longitude: c.longitude } : undefined,
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
    sameAs: (settings.social?.profiles || []).map((p) => p.url),
    contactPoint: (c?.phones || []).slice(0, 2).map((p) => ({
      '@type': 'ContactPoint',
      telephone: p.number,
      contactType: 'sales',
      areaServed: 'SA',
      availableLanguage: ['English', 'Arabic'],
    })),
  }
}

export function breadcrumbJsonLd(items: { label: string; href?: string }[], locale: Locale) {
  const site = getServerSideURL()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href ? `${site}${localizePath(c.href, locale)}` : undefined,
    })),
  }
}

export const jsonLdHtml = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') })
