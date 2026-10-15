import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Minus, Plus, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BottomSheet from './BottomSheet'
import DishArt from './DishArt'
import { Tags } from './DishCard'

export default function DishSheet({ dish, onClose }) {
  const { lang, t, price, add } = useApp()
  const [qty, setQty] = useState(1)
  return (
    <BottomSheet onClose={onClose} label={dish.name[lang]}>
      {(controls) => (
        <div className="overflow-y-auto px-6 pb-6">
          <div onPointerDown={(e) => controls.start(e)} className="relative mx-auto -mt-1 w-56 touch-none sm:w-64">
            <motion.div layoutId={`art-${dish.id}`} animate={{ rotate: 360 }} transition={{ rotate: { duration: 40, repeat: Infinity, ease: 'linear' } }}>
              <DishArt art={dish.art} palette={dish.palette} className="w-full" />
            </motion.div>
          </div>
          <motion.div initial="h" animate="s" variants={{ h: {}, s: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}>
            <motion.div variants={item}><Tags tags={dish.tags} size={13} /></motion.div>
            <motion.h2 variants={item} className="display mt-3 text-4xl font-semibold leading-tight">{dish.name[lang]}</motion.h2>
            <motion.p variants={item} className="mt-2 leading-relaxed text-ink/70">{dish.desc[lang]}</motion.p>
            <motion.div variants={item} className="mt-4 flex gap-4 text-sm text-ink/60">
              <span className="flex items-center gap-1.5"><Clock size={15} /> {dish.prep} {t.prep}</span>
              {['tajines', 'couscous', 'grills'].includes(dish.category) && <span className="flex items-center gap-1.5"><Users size={15} /> {t.serves} 1–2 {t.persons}</span>}
            </motion.div>
            <motion.div variants={item} className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-full bg-cream-50 p-1 shadow-inner" aria-label={t.quantity}>
                <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="-1" className="grid h-10 w-10 place-items-center rounded-full bg-cream-200"><Minus size={16} /></motion.button>
                <span className="relative h-6 w-10 overflow-hidden text-center text-lg font-bold">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={qty} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="tnum absolute inset-0 leading-6">{qty}</motion.span>
                  </AnimatePresence>
                </span>
                <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQty((q) => q + 1)} aria-label="+1" className="grid h-10 w-10 place-items-center rounded-full bg-cream-200"><Plus size={16} /></motion.button>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { add(dish.id, qty); onClose() }}
                className="flex flex-1 items-center justify-between rounded-full bg-emerald-800 px-6 py-4 font-bold text-cream-50"
              >
                <span>{t.add}</span>
                <motion.span key={qty} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="tnum">{price(dish.price * qty)}</motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </BottomSheet>
  )
}

const item = { h: { opacity: 0, y: 16 }, s: { opacity: 1, y: 0 } }
