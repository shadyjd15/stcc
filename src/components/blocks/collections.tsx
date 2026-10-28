import Link from 'next/link'
import React from 'react'

import { localizePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getGeneralApplicationJob, listJobs, listProjects } from '@/lib/data'
import type { Division, JobsBlock as JobsType, Project, ProjectsBlock as ProjectsType, TabsBlock as TabsType } from '@/payload-types'
import { Arrow } from '../Icon'
import { Media } from '../Media'
import { FilterBar } from './Filters'
import { Section, SectionHead, type BlockContext } from './shared'
import { TabsClient } from './Tabs'

export function TabsBlock({ block, ctx }: { block: TabsType; ctx: BlockContext }) {
  const t = getDictionary(ctx.locale)
  const tabs = (block.tabs || []).map((tab) => ({
    id: tab.id,
    label: tab.label,
    text: tab.text,
    items: tab.items,
    image:
      tab.image && typeof tab.image === 'object' ? <Media resource={tab.image} fill size="(max-width: 900px) 100vw, 40vw" /> : null,
  }))
  if (!tabs.length) return null
  return (
    <Section background={block.background} anchor={block.anchor}>
      <SectionHead header={block.header} />
      <TabsClient tabs={tabs} orientation={block.orientation} placeholder={t.photoPlaceholder} />
    </Section>
  )
}

const divisionNames = (p: Project) =>
  ((p.divisions || []).filter((d) => typeof d === 'object') as Division[]).map((d) => d.shortTitle || d.title)

export function ProjectCard({ p, ctx }: { p: Project; ctx: BlockContext }) {
  const t = getDictionary(ctx.locale)
  const divs = (p.divisions || []).filter((d) => typeof d === 'object') as Division[]
  return (
    <Link href={localizePath(`/projects/${p.slug}`, ctx.locale)} className="project-card" data-filter={divs.map((d) => d.slug).join(' ')} prefetch={false}>
      <div className="project-card__img">
        {p.coverImage && typeof p.coverImage === 'object' ? (
          <Media resource={p.coverImage} fill size="(max-width: 700px) 100vw, 400px" />
        ) : (
          <div className="placeholder" style={{ height: '100%', color: 'var(--muted)' }}>[ {t.photoPlaceholder} ]</div>
        )}
      </div>
      <div className="project-card__body">
        <span className="project-meta">
          <span>{divisionNames(p).join(' · ')}</span>
          <span>{p.year}</span>
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20 }}>{p.title}</span>
        <span className="muted" style={{ fontSize: 14 }}>
          {[p.client, p.location].filter(Boolean).join(' · ')}
        </span>
      </div>
    </Link>
  )
}

export async function ProjectsBlock({ block, ctx }: { block: ProjectsType; ctx: BlockContext }) {
  const t = getDictionary(ctx.locale)
  const all = await listProjects(ctx.locale)
  let projects: Project[] =
    block.source === 'selected'
      ? ((block.projects || []).filter((p) => typeof p === 'object') as Project[])
      : block.source === 'featured'
        ? all.filter((p) => p.featured)
        : all
  const featured = block.showFeatured ? all.find((p) => p.featured) : undefined
  if (featured && block.source === 'all') projects = projects.filter((p) => p.id !== featured.id)
  projects = projects.slice(0, block.limit || 50)

  const usedDivisions = new Map<string, string>()
  projects.forEach((p) =>
    ((p.divisions || []).filter((d) => typeof d === 'object') as Division[]).forEach((d) => usedDivisions.set(d.slug || '', d.shortTitle || d.title)),
  )

  return (
    <Section background={block.background} anchor={block.anchor} tight>
      <SectionHead header={block.header} />
      {!featured && !projects.length && (
        <div className="card" style={{ textAlign: 'center', padding: 'clamp(32px, 5vw, 56px)' }} data-reveal>
          <p className="muted" style={{ maxWidth: 520, margin: '0 auto 20px' }}>
            {t.projectsEmpty}
          </p>
          <a className="btn btn--secondary" href={ctx.locale === 'ar' ? '/ar/contact' : '/contact'}>
            {t.askForReferences} <Arrow />
          </a>
        </div>
      )}
      {featured && (
        <article className="featured" style={{ marginBottom: 56 }} data-reveal>
          <div className="featured__media">
            {featured.coverImage && typeof featured.coverImage === 'object' ? (
              <Media resource={featured.coverImage} fill size="(max-width: 900px) 100vw, 60vw" />
            ) : (
              <div className="placeholder" style={{ height: '100%' }}>[ {t.photoPlaceholder} ]</div>
            )}
          </div>
          <div className="featured__body">
            <span className="mono accent">{t.featuredCaseStudy}</span>
            <h2 className="h3" style={{ fontSize: 'clamp(26px, 2.6vw, 36px)' }}>{featured.title}</h2>
            <dl className="facts">
              <div>
                <dt>{t.client}</dt>
                <dd>{featured.client || '—'}</dd>
              </div>
              <div>
                <dt>{t.location}</dt>
                <dd>{featured.location || '—'}</dd>
              </div>
              <div>
                <dt>{t.division}</dt>
                <dd>{divisionNames(featured).join(', ') || '—'}</dd>
              </div>
              <div>
                <dt>{t.completed}</dt>
                <dd>{featured.year || '—'}</dd>
              </div>
            </dl>
            <div className="stack" style={{ ['--gap' as string]: '12px', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.12)', color: 'var(--on-dark)' }}>
              {featured.challenge && (
                <p>
                  <strong style={{ color: '#fff' }}>{t.challenge}.</strong> {featured.challenge}
                </p>
              )}
              {featured.solution && (
                <p>
                  <strong style={{ color: '#fff' }}>{t.solution}.</strong> {featured.solution}
                </p>
              )}
              {featured.result && (
                <p>
                  <strong style={{ color: '#fff' }}>{t.result}.</strong> {featured.result}
                </p>
              )}
            </div>
            <Link href={localizePath(`/projects/${featured.slug}`, ctx.locale)} className="btn btn--sm" style={{ alignSelf: 'flex-start' }} prefetch={false}>
              {t.readCaseStudy}
              <Arrow />
            </Link>
          </div>
        </article>
      )}
      {block.source === 'all' && (
        <FilterBar
          target="projects"
          allLabel={t.allProjects}
          label={t.division}
          options={[...usedDivisions.entries()].map(([value, label]) => ({ value, label }))}
        />
      )}
      <div className="grid grid--3" data-filter-group="projects">
        {projects.map((p) => (
          <ProjectCard key={p.id} p={p} ctx={ctx} />
        ))}
      </div>
      <p className="empty" data-filter-empty="projects" hidden>
        —
      </p>
    </Section>
  )
}

const TYPE_LABEL: Record<string, string> = {
  'full-time': 'Full-time',
  contract: 'Contract',
  'part-time': 'Part-time',
  temporary: 'Temporary',
  internship: 'Internship',
}

export async function JobsBlock({ block, ctx }: { block: JobsType; ctx: BlockContext }) {
  const t = getDictionary(ctx.locale)
  const jobs = (await listJobs(ctx.locale)).slice(0, block.limit || 50)
  const general = await getGeneralApplicationJob()
  const divisions = new Map<string, string>()
  jobs.forEach((j) => {
    const d = j.division && typeof j.division === 'object' ? (j.division as Division) : null
    if (d) divisions.set(d.slug || '', d.shortTitle || d.title)
  })
  return (
    <Section background={block.background} anchor={block.anchor} tight>
      <div className="split" style={{ marginBottom: 24 }}>
        <h2 className="h2 h2--sm">{block.header?.heading || t.openPositions}</h2>
        {block.header?.eyebrow && <span className="mono muted">{block.header.eyebrow}</span>}
      </div>
      {block.showFilters && (
        <FilterBar target="jobs" allLabel={t.allDivisionsFilter} label={t.division} options={[...divisions.entries()].map(([value, label]) => ({ value, label }))} />
      )}
      {jobs.length ? (
        <div style={{ borderTop: '1px solid var(--line)' }} data-filter-group="jobs">
          {jobs.map((j) => {
            const d = j.division && typeof j.division === 'object' ? (j.division as Division) : null
            const href = localizePath(`/careers/${j.slug}`, ctx.locale)
            return (
              <div className="job-row" key={j.id} data-filter={d?.slug || ''}>
                <div className="job-row__main">
                  <Link href={href} className="job-row__title" prefetch={false}>
                    {j.title}
                  </Link>
                  <span className="job-meta">
                    {d && <span>{d.shortTitle || d.title}</span>}
                    {j.location && <span>{j.location}</span>}
                    {j.employmentType && <span>{TYPE_LABEL[j.employmentType] || j.employmentType}</span>}
                    {j.experienceMin ? <span>{j.experienceMin}+ {t.years}</span> : null}
                  </span>
                </div>
                <Link href={href} className="btn btn--outline btn--sm" prefetch={false}>
                  {t.apply}
                  <Arrow />
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="empty">{block.emptyText}</p>
      )}
      {general && (
        <p style={{ marginTop: 24 }}>
          <Link href={localizePath(`/careers/${general.slug}`, ctx.locale)} className="link-arrow" prefetch={false}>
            {t.generalApplication}
            <Arrow />
          </Link>
        </p>
      )}
    </Section>
  )
}
