import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import React from 'react'

import { CustomCode } from '@/components/site/CustomCode'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { SiteRuntime } from '@/components/site/SiteRuntime'
import { isLocale, localeDir, locales, type Locale } from '@/i18n/config'
import { getDivisions, getFooter, getHeader, getPublicIntegrations, getSettings } from '@/lib/data'
import { jsonLdHtml, organizationJsonLd } from '@/lib/seo'
import { getServerSideURL } from '@/utilities/getURL'

import '../styles.css'

const sora = localFont({ src: '../../../fonts/sora.woff2', variable: '--font-sora', weight: '400 700', display: 'swap', preload: true })
const plex = localFont({
  src: [
    { path: '../../../fonts/plex-400.woff2', weight: '400' },
    { path: '../../../fonts/plex-500.woff2', weight: '500' },
    { path: '../../../fonts/plex-600.woff2', weight: '600' },
  ],
  variable: '--font-plex',
  display: 'swap',
})
const plexArabic = localFont({
  src: [
    { path: '../../../fonts/plex-arabic-400.woff2', weight: '400' },
    { path: '../../../fonts/plex-arabic-500.woff2', weight: '500' },
    { path: '../../../fonts/plex-arabic-600.woff2', weight: '600' },
  ],
  variable: '--font-plex-ar',
  display: 'swap',
  preload: false,
})
const mono = localFont({ src: '../../../fonts/jetbrains-mono.woff2', variable: '--font-jbm', weight: '400 600', display: 'swap', preload: false })

// Pages render on first request and are then cached until content changes – the build never needs a database
export const generateStaticParams = () => (process.env.NEXT_PHASE === 'phase-production-build' ? [] : locales.map((locale) => ({ locale })))

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const settings = await getSettings(isLocale(locale) ? locale : 'en')
  const name = settings.general?.siteName || 'Sahara Technical Contracting Co.'
  return {
    metadataBase: new URL(getServerSideURL()),
    title: { default: `${name} | ${settings.general?.tagline || ''}`.replace(/ \| $/, ''), template: settings.general?.titleTemplate || '%s | STCC' },
    description: settings.general?.defaultDescription || settings.general?.tagline || undefined,
    applicationName: settings.general?.shortName || 'STCC',
    icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: '32x32' }], apple: '/apple-touch-icon.png' },
    verification: settings.code?.googleSiteVerification ? { google: settings.code.googleSiteVerification } : undefined,
    formatDetection: { telephone: false },
  }
}

export const viewport: Viewport = {
  themeColor: '#071A33',
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale

  const [settings, header, footer, divisions, integrations] = await Promise.all([
    getSettings(locale),
    getHeader(locale),
    getFooter(locale),
    getDivisions(locale),
    getPublicIntegrations(),
  ])
  if (locale === 'ar' && !settings.languages?.enableArabic) notFound()

  const theme = settings.theme || {}
  const style = {
    '--accent': theme.accent || '#F07A2B',
    '--navy': theme.navy || '#0B2545',
    '--deep': theme.navyDeep || '#071A33',
  } as React.CSSProperties

  return (
    <html
      lang={locale}
      dir={localeDir(locale)}
      className={[sora.variable, plex.variable, plexArabic.variable, mono.variable].join(' ')}
      style={style}
      suppressHydrationWarning
    >
      <head>
        {/* enables scroll-reveal styles only when JS runs, so content is never hidden without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(organizationJsonLd(settings))} />
      </head>
      <body>
        <Header header={header} settings={settings} divisions={divisions} locale={locale} />
        <main id="main">{children}</main>
        <Footer footer={footer} settings={settings} divisions={divisions} locale={locale} />
        <SiteRuntime analytics={integrations.analyticsEnabled} />
        {integrations.gtmId && (
          <Script id="gtm" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${integrations.gtmId}');`}
          </Script>
        )}
        {integrations.ga4Id && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${integrations.ga4Id}`} strategy="lazyOnload" />
            <Script id="ga4" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${integrations.ga4Id}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
        {integrations.cfBeacon && (
          <Script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token: integrations.cfBeacon })} strategy="lazyOnload" />
        )}
        {(settings.code?.head || settings.code?.bodyEnd) && <CustomCode head={settings.code?.head} body={settings.code?.bodyEnd} />}
      </body>
    </html>
  )
}
