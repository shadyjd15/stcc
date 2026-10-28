import React, { Fragment } from 'react'

import type { Page, ReusableBlock } from '@/payload-types'
import { JobsBlock, ProjectsBlock, TabsBlock } from './collections'
import { FormBlock } from './FormBlock'
import {
  CallToAction,
  Chips,
  Comparison,
  Content,
  DivisionsGrid,
  Downloads,
  FAQ,
  FeatureCards,
  ImageText,
  ListPanel,
  Logos,
  MediaBlockView,
  ProcessSteps,
  RfqCard,
  Stats,
  Team,
} from './server'
import type { BlockContext } from './shared'

type AnyBlock = NonNullable<Page['layout']>[number] | NonNullable<ReusableBlock['blocks']>[number]

/* eslint-disable @typescript-eslint/no-explicit-any */
const renderOne = (block: AnyBlock, ctx: BlockContext, key: React.Key): React.ReactNode => {
  const b = block as any
  switch (block.blockType) {
    case 'divisionsGrid':
      return <DivisionsGrid key={key} block={b} ctx={ctx} />
    case 'processSteps':
      return <ProcessSteps key={key} block={b} />
    case 'featureCards':
      return <FeatureCards key={key} block={b} ctx={ctx} />
    case 'stats':
      return <Stats key={key} block={b} />
    case 'logos':
      return <Logos key={key} block={b} />
    case 'cta':
      return <CallToAction key={key} block={b} ctx={ctx} />
    case 'content':
      return <Content key={key} block={b} />
    case 'chips':
      return <Chips key={key} block={b} />
    case 'tabs':
      return <TabsBlock key={key} block={b} ctx={ctx} />
    case 'comparison':
      return <Comparison key={key} block={b} />
    case 'faq':
      return <FAQ key={key} block={b} />
    case 'downloads':
      return <Downloads key={key} block={b} />
    case 'team':
      return <Team key={key} block={b} ctx={ctx} />
    case 'mediaBlock':
      return <MediaBlockView key={key} block={b} />
    case 'imageText':
      return <ImageText key={key} block={b} ctx={ctx} />
    case 'formBlock':
      return <FormBlock key={key} block={b} ctx={ctx} />
    case 'projects':
      return <ProjectsBlock key={key} block={b} ctx={ctx} />
    case 'jobs':
      return <JobsBlock key={key} block={b} ctx={ctx} />
    case 'listPanel':
      return <ListPanel key={key} block={b} />
    case 'rfqCard':
      return <RfqCard key={key} block={b} ctx={ctx} />
    case 'reusable': {
      const section = b.section as ReusableBlock | null
      if (!section || typeof section !== 'object') return null
      return (
        <Fragment key={key}>{(section.blocks || []).map((inner, i) => renderOne(inner as AnyBlock, ctx, `${String(key)}-${i}`))}</Fragment>
      )
    }
    default:
      return null
  }
}

export function RenderBlocks({ blocks, ctx }: { blocks?: AnyBlock[] | null; ctx: BlockContext }) {
  if (!blocks?.length) return null
  return <>{blocks.map((b, i) => renderOne(b, ctx, b.id || i))}</>
}
