'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

import type { Locale } from '@/i18n/config'

export function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || '/'
  const target =
    locale === 'ar' ? pathname.replace(/^\/ar(?=\/|$)/, '') || '/' : `/ar${pathname === '/' ? '' : pathname}`
  return (
    <a href={target} className="topbar__lang" lang={locale === 'ar' ? 'en' : 'ar'} hrefLang={locale === 'ar' ? 'en' : 'ar'}>
      {label}
    </a>
  )
}
