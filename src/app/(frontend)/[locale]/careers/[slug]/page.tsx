import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ApplyForm } from '@/components/forms/ApplyForm'
import { Hero } from '@/components/Hero'
import { Arrow, Icon } from '@/components/Icon'
import { RichText } from '@/components/RichText'
import { localizePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getCareersPublic, getDocBySlug, getPublicIntegrations, getSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata, jsonLdHtml } from '@/lib/seo'
import type { Division } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { lexicalToText } from '@/utilities/lexicalToText'
import { asLocale } from '../../_components/CmsPage'

type Props = { params: Promise<{ locale: string; slug: string }> }

const SCHEMA_TYPE: Record<string, string> = {
  'full-time': 'FULL_TIME',
  contract: 'CONTRACTOR',
  'part-time': 'PART_TIME',
  temporary: 'TEMPORARY',
  internship: 'INTERN',
}
const TYPE_LABEL: Record<string, string> = {
  'full-time': 'Full-time',
  contract: 'Contract',
  'part-time': 'Part-time',
  temporary: 'Temporary / project',
  internship: 'Internship',
}

export default async function JobPage({ params }: Props) {
  const { locale: l, slug } = await params
  const locale = asLocale(l)
  const job = await getDocBySlug('job-openings', slug, locale)
  if (!job || job.status === 'draft' || job.status === 'paused') notFound()
  const t = getDictionary(locale)
  const [settings, integrations, careers] = await Promise.all([getSettings(locale), getPublicIntegrations(), getCareersPublic(locale)])
  const division = job.division && typeof job.division === 'object' ? (job.division as Division) : null
  const open = job.status === 'open' && (!job.closesAt || new Date(job.closesAt) > new Date())
  const crumbs = [
    { label: t.home, href: '/' },
    { label: locale === 'ar' ? 'الوظائف' : 'Careers', href: '/careers' },
    { label: job.title },
  ]
  const fmt = (d?: string | null) => (d ? new Date(d).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null)

  const site = getServerSideURL()
  const description = [
    job.summary ? `<p>${job.summary}</p>` : '',
    lexicalToText(job.description) ? `<p>${lexicalToText(job.description).replace(/\n/g, '<br>')}</p>` : '',
    job.responsibilities?.length ? `<h3>Responsibilities</h3><ul>${job.responsibilities.map((r) => `<li>${r.text}</li>`).join('')}</ul>` : '',
    job.requirements?.length ? `<h3>Requirements</h3><ul>${job.requirements.map((r) => `<li>${r.text}</li>`).join('')}</ul>` : '',
  ].join('')
  const posting = job.listed !== false
    ? {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description,
        identifier: { '@type': 'PropertyValue', name: settings.general?.siteName, value: String(job.id) },
        datePosted: job.postedAt || job.createdAt,
        validThrough: job.closesAt || undefined,
        employmentType: SCHEMA_TYPE[job.employmentType || 'full-time'],
        hiringOrganization: { '@type': 'Organization', name: settings.company?.legalName || settings.general?.siteName, sameAs: site, logo: `${site}/favicon.svg` },
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: (job.location || 'Dammam').split(',')[0], addressCountry: 'SA' } },
        directApply: true,
        ...(job.showSalary && job.salaryMin
          ? { baseSalary: { '@type': 'MonetaryAmount', currency: 'SAR', value: { '@type': 'QuantitativeValue', minValue: job.salaryMin, maxValue: job.salaryMax || job.salaryMin, unitText: 'MONTH' } } }
          : {}),
        experienceRequirements: job.experienceMin ? { '@type': 'OccupationalExperienceRequirements', monthsOfExperience: job.experienceMin * 12 } : undefined,
      }
    : null

  return (
    <article>
      <Hero
        hero={{ type: 'page', visual: 'none', text: job.summary, pattern: 'dots' }}
        locale={locale}
        title={job.title}
        crumbs={crumbs}
        eyebrow={[division?.shortTitle || division?.title, job.department].filter(Boolean).join(' · ').toUpperCase() || undefined}
      />
      <section className="section">
        <div className="container job-layout">
          <div className="job-layout__main">
            <div className="cluster" style={{ ['--gap' as string]: '10px' }}>
              {[
                ['map', job.location],
                ['briefcase', TYPE_LABEL[job.employmentType || 'full-time']],
                ['clock', job.experienceMin ? `${job.experienceMin}${job.experienceMax ? `–${job.experienceMax}` : '+'} ${t.years}` : null],
                ['graduation', job.educationLevel && job.educationLevel !== 'none' ? job.educationLevel : null],
              ]
                .filter(([, v]) => v)
                .map(([icon, v]) => (
                  <span key={icon} className="chip" style={{ display: 'inline-flex', gap: 8, alignItems: 'center', background: 'var(--white)' }}>
                    <Icon name={icon} size={16} />
                    {v}
                  </span>
                ))}
            </div>
            {job.description && (
              <section className="stack">
                <h2 className="h3" style={{ fontSize: 26 }}>{t.jobOverview}</h2>
                <RichText data={job.description} />
              </section>
            )}
            {[
              [t.responsibilities, job.responsibilities],
              [t.requirements, job.requirements],
              [t.benefits, job.benefits],
            ].map(([title, list]) =>
              Array.isArray(list) && list.length ? (
                <section className="stack" key={String(title)}>
                  <h2 className="h3" style={{ fontSize: 26 }}>{String(title)}</h2>
                  <ul className="check-list">
                    {list.map((r: { id?: string | null; text: string }, i: number) => (
                      <li key={r.id || i}>
                        <Icon name="check" strokeWidth={2.2} />
                        {r.text}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null,
            )}
            <section id="apply" className="form-card" style={{ boxShadow: 'none' }}>
              <h2 className="h3" style={{ fontSize: 28 }}>{t.applyFor}</h2>
              {open ? (
                <ApplyForm
                  jobId={job.id}
                  jobTitle={job.title}
                  questions={(job.screeningQuestions || []).map((q) => ({ question: q.question, type: q.type || 'text', options: q.options || '', required: q.required !== false }))}
                  consentText={careers.consentText}
                  turnstileSiteKey={integrations.turnstileSiteKey}
                  locale={locale}
                />
              ) : (
                <p className="alert alert--info">{t.positionClosed}</p>
              )}
            </section>
          </div>
          <aside className="job-layout__aside">
            <div className="card">
              <dl className="facts" style={{ gridTemplateColumns: '1fr' }}>
                {division && (
                  <div>
                    <dt>{t.division}</dt>
                    <dd>
                      <Link href={localizePath(`/divisions/${division.slug}`, locale)} prefetch={false}>
                        {division.title}
                      </Link>
                    </dd>
                  </div>
                )}
                <div>
                  <dt>{t.employmentType}</dt>
                  <dd>{TYPE_LABEL[job.employmentType || 'full-time']}</dd>
                </div>
                {job.postedAt && (
                  <div>
                    <dt>{t.posted}</dt>
                    <dd>{fmt(job.postedAt)}</dd>
                  </div>
                )}
                {job.closesAt && (
                  <div>
                    <dt>{t.closingDate}</dt>
                    <dd>{fmt(job.closesAt)}</dd>
                  </div>
                )}
                {job.showSalary && job.salaryMin ? (
                  <div>
                    <dt>Salary</dt>
                    <dd>
                      SAR {job.salaryMin.toLocaleString()}
                      {job.salaryMax ? ` – ${job.salaryMax.toLocaleString()}` : ''} / month
                    </dd>
                  </div>
                ) : null}
              </dl>
              {open && (
                <a href="#apply" className="btn btn--block" data-cta="job-apply">
                  {t.applyNow}
                  <Arrow />
                </a>
              )}
              <Link href={localizePath('/careers', locale)} className="link-arrow" prefetch={false}>
                {t.backToCareers}
                <Arrow />
              </Link>
            </div>
          </aside>
        </div>
      </section>
      {posting && open && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(posting)} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(breadcrumbJsonLd(crumbs, locale))} />
    </article>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, slug } = await params
  const locale = asLocale(l)
  const [job, settings] = await Promise.all([getDocBySlug('job-openings', slug, locale), getSettings(locale)])
  if (!job) return { title: 'Not found', robots: { index: false } }
  const meta = buildMetadata({ meta: job.meta, title: job.title, description: job.summary, path: `/careers/${slug}`, locale, settings })
  if (job.listed === false || job.status !== 'open') meta.robots = { index: false, follow: true }
  return meta
}
