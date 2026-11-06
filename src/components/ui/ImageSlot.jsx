import { useState } from 'react'
import { asset } from '../../utils/asset'
import PlaceholderArt from './PlaceholderArt'
import './ImageSlot.css'

const DEFAULT_RATIOS = {
  screen: '16 / 10',
  phone: '9 / 19.5',
  portrait: '4 / 5',
  thumbnail: '16 / 10',
}

/**
 * An image in a layout-stable frame.
 *
 * - `variant="screen"` adds a browser frame, `variant="phone"` a device frame.
 * - Empty `src`, or an image that fails to load, shows a quiet wireframe sketch
 *   instead of a broken image.
 */
export default function ImageSlot({
  src,
  alt = '',
  variant = 'thumbnail',
  ratio,
  priority = false,
  sizes,
  className = '',
}) {
  const [failedSrc, setFailedSrc] = useState('')
  const resolvedSrc = asset(src)
  const showImage = Boolean(resolvedSrc) && failedSrc !== resolvedSrc
  const aspectRatio = ratio ?? DEFAULT_RATIOS[variant] ?? DEFAULT_RATIOS.thumbnail

  return (
    <div className={`image-slot image-slot--${variant} ${className}`.trim()}>
      {variant === 'screen' && (
        <div className="image-slot__chrome" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}

      <div className="image-slot__media" style={{ aspectRatio }}>
        {showImage ? (
          <img
            src={resolvedSrc}
            sizes={sizes}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            onError={() => setFailedSrc(resolvedSrc)}
          />
        ) : (
          <div className="image-slot__placeholder" aria-hidden="true">
            {variant === 'portrait' ? (
              <span className="image-slot__monogram">RJ</span>
            ) : (
              <PlaceholderArt variant={variant} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
