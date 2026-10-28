import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Hero } from '@/components/Hero'
import { VendorPortal } from '@/components/vendor/VendorPortal'
import { getDictionary } from '@/i18n/dictionary'
import { getDivisions } from '@/lib/data'
import { asLocale } from '../_components/CmsPage'

type Props = { params: Promise<{ locale: string }> }

export default async function VendorPortalPage({ params }: Props) {
  const { locale: l } = await params
  const locale = asLocale(l)
  const t = getDictionary(locale)
  const divisions = await getDivisions(locale)
  return (
    <article>
      <Hero
        hero={{ type: 'page', visual: 'none', eyebrow: 'VENDOR PORTAL', heading: locale === 'ar' ? 'بوابة الموردين' : 'Your vendor *dashboard*' }}
        locale={locale}
        title="Vendor portal"
        crumbs={[{ label: t.home, href: '/' }, { label: t.vendorRegistration, href: '/vendor-registration' }, { label: 'Portal' }]}
      />
      <section className="section section--tight">
        <div className="container">
          <Suspense>
            <VendorPortal locale={locale} divisions={divisions.map((d) => ({ id: d.id, title: d.title }))} />
          </Suspense>
        </div>
      </section>
    </article>
  )
}

export const metadata: Metadata = { title: 'Vendor portal', robots: { index: false, follow: false } }
