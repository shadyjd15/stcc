import type { DefaultNodeTypes, SerializedLinkNode, DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { docPath } from '@/utilities/paths'
import { Media } from './Media'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields.doc
  if (!doc || typeof doc.value !== 'object') return '#'
  return docPath(doc.relationTo, doc.value as { slug?: string; path?: string })
}

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  upload: ({ node }) => {
    const value = node.value
    if (!value || typeof value !== 'object') return null
    const caption = (node.fields as { caption?: string } | undefined)?.caption
    return (
      <figure className="media-figure">
        <Media resource={value as never} size="(max-width: 800px) 100vw, 800px" />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    )
  },
})

export function RichText({ data, className }: { data: DefaultTypedEditorState | null | undefined | unknown; className?: string }) {
  if (!data || typeof data !== 'object') return null
  return <ConvertRichText converters={converters} data={data as DefaultTypedEditorState} className={['prose', className].filter(Boolean).join(' ')} />
}
