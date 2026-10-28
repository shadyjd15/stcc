import React, { Fragment } from 'react'

/**
 * Renders CMS headings where *words in asterisks* get the accent colour and
 * line breaks are preserved. Keeps editors in plain text (no HTML in the CMS).
 */
export function Accented({ text }: { text?: string | null }) {
  if (!text) return null
  const lines = text.split(/\n/)
  return (
    <>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\*[^*]+\*)/g).map((part, pi) =>
            part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
              <span className="accent" key={pi}>
                {part.slice(1, -1)}
              </span>
            ) : (
              <Fragment key={pi}>{part}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  )
}

export const stripAccents = (text?: string | null) => (text || '').replace(/\*/g, '').replace(/\n/g, ' ')
