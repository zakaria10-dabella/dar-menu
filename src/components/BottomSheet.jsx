import { useEffect, useRef } from 'react'
import { motion, useDragControls } from 'framer-motion'

/** Bottom sheet with a grab handle: drag down (or flick) to dismiss. */
export default function BottomSheet({ onClose, children, label, handle = true }) {
  const controls = useDragControls()
  const panel = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const last = document.activeElement
    panel.current?.focus({ preventScroll: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      last?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 lg:start-[42%]" role="dialog" aria-modal="true" aria-label={label}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-forest-950/60" />
      <motion.div
        ref={panel}
        tabIndex={-1}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.04, bottom: 0.9 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 600) onClose()
        }}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[94dvh] max-w-xl flex-col overflow-hidden rounded-t-[1.75rem] bg-paper-100 shadow-[0_-20px_60px_-20px_rgba(11,29,25,.5)] outline-none"
      >
        {handle && (
          <div onPointerDown={(e) => controls.start(e)} className="flex cursor-grab touch-none justify-center pb-2 pt-3 active:cursor-grabbing">
            <span className="h-1.5 w-11 rounded-full bg-forest-900/20" />
          </div>
        )}
        {typeof children === 'function' ? children(controls) : children}
      </motion.div>
    </div>
  )
}
