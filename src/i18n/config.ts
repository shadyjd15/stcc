export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (locales as readonly string[]).includes(value)

export const localeDir = (locale: Locale): 'ltr' | 'rtl' => (locale === 'ar' ? 'rtl' : 'ltr')

/** Prefix a site path with the locale (English has no prefix). */
export const localizePath = (path: string, locale: Locale): string => {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

export const payloadLocalization = {
  locales: [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية', rtl: true },
  ],
  defaultLocale: 'en',
  fallback: true,
}
