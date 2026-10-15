import { useEffect } from 'react'
import { motion, useDragControls } from 'framer-motion'

/** Bottom sheet with a grab handle: drag down (or flick) to dismiss. */
export default function BottomSheet({ onClose, children, label }) {
  const controls = useDragControls()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 lg:left-[44%]" role="dialog" aria-modal="true" aria-label={label}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-emerald-900/50 backdrop-blur-[2px]" />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 38 }}
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.9 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 600) onClose()
        }}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[92vh] max-w-lg flex-col rounded-t-[2rem] bg-cream-100 shadow-2xl"
      >
        <div onPointerDown={(e) => controls.start(e)} className="flex cursor-grab touch-none justify-center pb-2 pt-3 active:cursor-grabbing">
          <span className="h-1.5 w-12 rounded-full bg-emerald-800/20" />
        </div>
        {typeof children === 'function' ? children(controls) : children}
      </motion.div>
    </div>
  )
}
