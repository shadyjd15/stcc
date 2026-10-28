import { docPath, type RoutableCollection } from './paths'

export type PreviewSearchParams = { path: string; previewSecret: string }

export const generatePreviewPath = ({
  collection,
  doc,
  locale,
}: {
  collection: RoutableCollection
  doc: { slug?: string | null; path?: string | null }
  locale?: string
}): string | null => {
  if (!doc?.slug) return null
  let path = docPath(collection, doc)
  if (locale && locale !== 'en') path = path === '/' ? `/${locale}` : `/${locale}${path}`
  const params = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)
  return `/next/preview?${params.toString()}`
}
