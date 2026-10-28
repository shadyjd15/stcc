/** Minimal helpers to build Lexical rich-text JSON for seed content */

type Node = Record<string, unknown>

const text = (t: string, format = 0): Node => ({ type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1 })

const inline = (s: string): Node[] =>
  s.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part) => (part.startsWith('**') ? text(part.slice(2, -2), 1) : text(part)))

export const paragraph = (s: string): Node => ({
  type: 'paragraph',
  children: inline(s),
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const heading = (s: string, tag: 'h2' | 'h3' = 'h2'): Node => ({
  type: 'heading',
  tag,
  children: inline(s),
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

export const list = (items: string[]): Node => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((it, i) => ({
    type: 'listitem',
    value: i + 1,
    children: inline(it),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

/** Paragraphs separated by blank lines; lines starting with "## " become headings, "- " lists */
export const rich = (src: string) => {
  const blocks = src.trim().split(/\n{2,}/)
  const children: Node[] = blocks.map((b) => {
    if (b.startsWith('## ')) return heading(b.slice(3))
    if (b.startsWith('### ')) return heading(b.slice(4), 'h3')
    if (b.split('\n').every((l) => l.startsWith('- '))) return list(b.split('\n').map((l) => l.slice(2)))
    return paragraph(b.replace(/\n/g, ' '))
  })
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } }
}
