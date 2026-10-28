'use client'

import { useEffect } from 'react'

/**
 * Injects administrator-provided HTML (Site settings → Custom code) after the page is
 * interactive. Scripts are re-created so they execute; nothing blocks first paint.
 */
export function CustomCode({ head, body }: { head?: string | null; body?: string | null }) {
  useEffect(() => {
    const inject = (html: string | null | undefined, target: HTMLElement) => {
      if (!html) return []
      const tpl = document.createElement('template')
      tpl.innerHTML = html
      const added: Node[] = []
      tpl.content.childNodes.forEach((node) => {
        if (node instanceof HTMLScriptElement) {
          const s = document.createElement('script')
          for (const attr of Array.from(node.attributes)) s.setAttribute(attr.name, attr.value)
          s.text = node.text
          target.appendChild(s)
          added.push(s)
        } else {
          const clone = node.cloneNode(true)
          target.appendChild(clone)
          added.push(clone)
        }
      })
      return added
    }
    const nodes = [...inject(head, document.head), ...inject(body, document.body)]
    return () => nodes.forEach((n) => n.parentNode?.removeChild(n))
  }, [head, body])
  return null
}
