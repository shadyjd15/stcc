import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import type { BlockContext } from '@/components/blocks/shared'
import { Hero, type Crumb } from '@/components/Hero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getDivisions, getPageByPath, getPublicIntegrations, getSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata, jsonLdHtml } from '@/lib/seo'
import type { Page } from '@/payload-types'

export const asLocale = (l: string): Locale => (isLocale(l) ? l : 'en')

export async function blockContext(locale: Locale, pagePath: string, extra: Partial<BlockContext> = {}): Promise<BlockContext> {
  const [settings, divisions, integrations] = await Promise.all([getSettings(locale), getDivisions(locale), getPublicIntegrations()])
  return { locale, settings, divisions, turnstileSiteKey: integrations.turnstileSiteKey, pagePath, ...extra }
}

export const pageCrumbs = (page: Page, locale: Locale): Crumb[] => {
  const t = getDictionary(locale)
  const trail = ((page as unknown as { breadcrumbs?: { label?: string; url?: string }[] }).breadcrumbs || []).map((b) => ({
    label: b.label || '',
    href: b.url,
  }))
  return [{ label: t.home, href: '/' }, ...(trail.length ? trail : [{ label: page.title, href: page.path || undefined }])]
}

/** Renders any CMS page (hero + blocks). Falls back to CMS redirects / 404. */
export async function CmsPage({ path, locale }: { path: string; locale: Locale }) {
  const page = await getPageByPath(path, locale)
  const { isEnabled: draft } = await draftMode()
  if (!page) {
    return <PayloadRedirects url={path} />
  }
  const ctx = await blockContext(locale, path)
  const crumbs = path === '/' ? [] : pageCrumbs(page, locale)
  return (
    <article>
      {draft && <LivePreviewListener />}
      <Hero hero={page.hero} locale={locale} title={page.title} crumbs={crumbs} divisions={ctx.divisions} />
      <RenderBlocks blocks={page.layout} ctx={ctx} />
      {crumbs.length > 1 && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(breadcrumbJsonLd(crumbs, locale))} />}
    </article>
  )
}

export async function cmsPageMetadata(path: string, locale: Locale): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPageByPath(path, locale), getSettings(locale)])
  if (!page) return { title: 'Not found', robots: { index: false } }
  const meta = buildMetadata({
    meta: page.meta,
    title: page.title,
    description: page.hero?.text,
    path,
    locale,
    settings,
  })
  // the home page uses the default (template-less) title
  if (path === '/' && !page.meta?.title) delete meta.title
  return meta
}

export const ensurePage = (page: unknown) => {
  if (!page) notFound()
}
