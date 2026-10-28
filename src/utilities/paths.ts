/**
 * Single source of truth for public URLs of every routable collection.
 * Used by links, sitemap, revalidation, Cloudflare purge, previews and search.
 */
export const collectionPathPrefix = {
  pages: '',
  divisions: '/divisions',
  projects: '/projects',
  'job-openings': '/careers',
  news: '/news',
} as const

export type RoutableCollection = keyof typeof collectionPathPrefix

export const docPath = (
  collection: RoutableCollection | string,
  doc: { slug?: string | null; path?: string | null } | null | undefined,
): string => {
  if (!doc) return '/'
  if (collection === 'pages') {
    if (doc.path) return doc.path
    if (!doc.slug || doc.slug === 'home') return '/'
    return `/${doc.slug}`
  }
  const prefix = collectionPathPrefix[collection as RoutableCollection] ?? ''
  return doc.slug ? `${prefix}/${doc.slug}` : prefix || '/'
}
