import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Minus, Plus, Users, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { categories } from '../data/menu'
import BottomSheet from './BottomSheet'
import Photo from './Photo'
import { Tags } from './DishCard'

const item = { h: { opacity: 0, y: 14 }, s: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

export default function DishSheet({ dish, onClose }) {
  const { lang, t, price, add } = useApp()
  const [qty, setQty] = useState(1)
  const cat = categories.find((c) => c.id === dish.category)
  return (
    <BottomSheet onClose={onClose} label={dish.name[lang]} handle={false}>
      {(controls) => (
        <div className="overflow-y-auto overscroll-contain">
          <div onPointerDown={(e) => controls.start(e)} className="relative touch-none">
            <Photo
              src={dish.photo}
              alt={dish.name[lang]}
              focus={dish.focus}
              layoutId={`photo-${dish.id}`}
              ratio="4 / 3"
              radius={0}
              eager
              className="max-h-[48dvh] w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-forest-950/45 to-transparent" />
            <span className="absolute start-1/2 top-3 h-1.5 w-11 -translate-x-1/2 rounded-full bg-paper-50/80 rtl:translate-x-1/2" />
            <button
              onClick={onClose}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label={t.close}
              className="absolute end-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-paper-50/90 text-forest-950 hover:bg-paper-50"
            >
              <X size={18} />
            </button>
          </div>

          <motion.div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6" initial="h" animate="s" variants={{ h: {}, s: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}>
            <motion.p variants={item} className="eyebrow text-ink-soft">{cat?.[lang]}</motion.p>
            <motion.h2 variants={item} className="display mt-2 text-[2.1rem] leading-[1.02]">{dish.name[lang]}</motion.h2>
            <motion.p variants={item} className="mt-3 text-[1.02rem] leading-relaxed text-ink-soft">{dish.desc[lang]}</motion.p>
            <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
              <span className="inline-flex items-center gap-1.5"><Clock size={15} aria-hidden="true" /> {dish.prep} {t.prep}</span>
              {['tajines', 'couscous', 'grills'].includes(dish.category) && (
                <span className="inline-flex items-center gap-1.5"><Users size={15} aria-hidden="true" /> {t.serves} 1–2 {t.persons}</span>
              )}
              <Tags tags={dish.tags} className="text-sm" />
            </motion.div>

            <motion.div variants={item} className="mt-7 flex items-center gap-3 border-t border-forest-900/10 pt-5">
              <div className="flex items-center rounded-full border border-forest-900/15 p-0.5" role="group" aria-label={t.quantity}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="−1" className="grid h-11 w-11 place-items-center rounded-full hover:bg-paper-200"><Minus size={16} /></button>
                <span className="relative h-6 w-8 overflow-hidden text-center text-lg font-bold" aria-live="polite">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={qty} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} className="tnum absolute inset-0 leading-6">{qty}</motion.span>
                  </AnimatePresence>
                </span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="+1" className="grid h-11 w-11 place-items-center rounded-full hover:bg-paper-200"><Plus size={16} /></button>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => { add(dish.id, qty); onClose() }}
                className="flex h-14 flex-1 items-center justify-between rounded-full bg-forest-900 px-6 font-bold text-paper-50 transition-colors hover:bg-forest-800"
              >
                <span>{t.add}</span>
                <span className="tnum text-saffron-300">{price(dish.price * qty)}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </BottomSheet>
  )
}
