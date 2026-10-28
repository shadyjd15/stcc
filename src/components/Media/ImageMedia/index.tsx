import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

/**
 * Next.js serves every CMS image as responsive AVIF/WebP with the right size for the
 * viewport. The focal point set in the media library drives object-position on crops.
 */
export const ImageMedia: React.FC<MediaProps> = (props) => {
  const { alt: altFromProps, fill, imgClassName, priority, resource, size, src: srcFromProps, loading } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: string | import('next/image').StaticImageData = srcFromProps || ''
  let objectPosition: string | undefined

  if (!src && resource && typeof resource === 'object') {
    width = resource.width || undefined
    height = resource.height || undefined
    alt = altFromProps ?? resource.alt ?? ''
    src = getMediaUrl(resource.url, resource.updatedAt)
    if (resource.focalX != null && resource.focalY != null) objectPosition = `${resource.focalX}% ${resource.focalY}%`
  }
  if (!src) return null

  const isSvg = typeof src === 'string' && /\.svg(\?|$)/.test(src)

  return (
    <NextImage
      alt={alt || ''}
      className={imgClassName}
      fill={fill}
      height={!fill ? height : undefined}
      width={!fill ? width : undefined}
      priority={priority}
      loading={priority ? undefined : loading || 'lazy'}
      sizes={size || (fill ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 1280px')}
      src={src}
      unoptimized={isSvg}
      style={objectPosition ? { objectPosition } : undefined}
    />
  )
}
