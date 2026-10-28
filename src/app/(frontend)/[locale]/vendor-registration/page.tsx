import type { Metadata } from 'next'
import Link from 'next/link'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { Hero } from '@/components/Hero'
import { VendorSignup } from '@/components/vendor/VendorSignup'
import { localizePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getPageByPath, getSettings, getVendorSettingsPublic } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'
import { asLocale, blockContext } from '../_components/CmsPage'

type Props = { params: Promise<{ locale: string }> }

export default async function VendorRegistrationPage({ params }: Props) {
  const { locale: l } = await params
  const locale = asLocale(l)
  const t = getDictionary(locale)
  const [page, vs, ctx] = await Promise.all([getPageByPath('/vendor-registration', locale), getVendorSettingsPublic(locale), blockContext(locale, '/vendor-registration')])
  const docs = (vs.documentTypes || []).filter((d) => d.required)

  return (
    <article>
      <Hero
        hero={page?.hero || { type: 'page', visual: 'none', eyebrow: 'SUPPLIER & SUBCONTRACTOR PORTAL', heading: 'Become an approved *STCC vendor.*' }}
        locale={locale}
        title={page?.title || t.vendorRegistration}
        crumbs={[{ label: t.home, href: '/' }, { label: page?.title || t.vendorRegistration }]}
        divisions={ctx.divisions}
      />
      <section className="section section--tight">
        <div className="container stack" style={{ ['--gap' as string]: '16px' }}>
          <div className="card" style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
            <span>
              <strong>{locale === 'ar' ? 'مسجل بالفعل؟' : 'Already registered?'}</strong>{' '}
              {locale === 'ar' ? 'سجّل الدخول لإكمال طلبك أو تحديث المستندات.' : 'Sign in to complete your application, update expiring documents or check your status.'}
            </span>
            <Link href={localizePath('/vendor-portal', locale)} className="btn btn--outline btn--sm" prefetch={false}>
              {t.vendorSignIn}
            </Link>
          </div>
          <div className="portal-shell">
            <div className="form-card portal-main" style={{ boxShadow: 'none' }} id="register">
              <div className="stack" style={{ ['--gap' as string]: '8px' }}>
                <span className="mono muted">{locale === 'ar' ? 'الخطوة 1 · إنشاء حساب' : 'STEP 1 · CREATE YOUR ACCOUNT'}</span>
                <h2 className="h3" style={{ fontSize: 28 }}>
                  {locale === 'ar' ? 'ابدأ تسجيلك' : 'Start your registration'}
                </h2>
                {vs.introText && <p className="muted">{vs.introText}</p>}
              </div>
              <VendorSignup locale={locale} turnstileSiteKey={ctx.turnstileSiteKey} />
            </div>
            <aside className="portal-nav" style={{ gap: 14, padding: 24 }}>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{locale === 'ar' ? 'جهّز هذه المستندات' : 'Have these documents ready'}</strong>
              <ul className="check-list">
                {docs.map((d) => (
                  <li key={d.key}>
                    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2.5h8l4 4v15H6zM14 2.5v4h4" />
                    </svg>
                    <span>
                      {d.label}
                      {d.description && <span className="muted" style={{ display: 'block', fontSize: 13 }}>{d.description}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="muted" style={{ fontSize: 13 }}>PDF, JPG or PNG · up to 10 MB each</p>
            </aside>
          </div>
        </div>
      </section>
      <RenderBlocks blocks={page?.layout} ctx={ctx} />
    </article>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params
  const locale = asLocale(l)
  const [page, settings] = await Promise.all([getPageByPath('/vendor-registration', locale), getSettings(locale)])
  return buildMetadata({
    meta: page?.meta,
    title: page?.title || 'Vendor Registration',
    description: 'Register as an approved STCC supplier or subcontractor. Upload your company documents and track the review online.',
    path: '/vendor-registration',
    locale,
    settings,
  })
}
