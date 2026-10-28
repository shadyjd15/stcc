/** Flattens a Lexical rich-text value to plain text (for matching, search and meta descriptions). */
export function lexicalToText(value: unknown): string {
  const out: string[] = []
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    const n = node as { text?: string; children?: unknown[]; type?: string; root?: unknown }
    if (n.root) return walk(n.root)
    if (typeof n.text === 'string') out.push(n.text)
    if (Array.isArray(n.children)) {
      n.children.forEach(walk)
      if (n.type && ['paragraph', 'heading', 'listitem', 'quote'].includes(n.type)) out.push('\n')
    }
  }
  walk(value)
  return out.join('').replace(/\n{2,}/g, '\n').trim()
}
