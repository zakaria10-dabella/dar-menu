import { motion } from 'framer-motion'

/**
 * Aspect-ratio box around a cover-cropped photo. Reserves its space before the
 * image loads (no layout shift) and can carry a layoutId for shared transitions.
 */
export default function Photo({ src, alt, ratio = '1 / 1', focus = '50% 50%', className = '', layoutId, eager = false, radius = 16, children }) {
  return (
    <motion.div
      layoutId={layoutId}
      style={{ aspectRatio: ratio, borderRadius: radius }}
      className={`relative overflow-hidden bg-paper-300 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width="1280"
        height="960"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...(eager ? { fetchpriority: 'high' } : {})}
        style={{ objectPosition: focus }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {children}
    </motion.div>
  )
}
