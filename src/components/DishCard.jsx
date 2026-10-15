import { AnimatePresence, motion } from 'framer-motion'
import { Flame, Leaf, Plus, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'
import DishArt from './DishArt'

export function Tags({ tags, size = 12 }) {
  const { t } = useApp()
  const map = { veg: [Leaf, t.veg, 'text-emerald-700 bg-emerald-700/10'], spicy: [Flame, t.spicy, 'text-terracotta bg-terracotta/10'], signature: [Sparkles, t.signature, 'text-[#9A6A12] bg-saffron-500/20'] }
  return (
    <span className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const [Icon, label, cls] = map[tag]
        return <span key={tag} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${cls}`}><Icon size={size} />{label}</span>
      })}
    </span>
  )
}

export default function DishCard({ dish, onOpen }) {
  const { lang, price, add, cart } = useApp()
  const qty = cart[dish.id] || 0
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(dish.id)}
        onKeyDown={(e) => e.key === 'Enter' && onOpen(dish.id)}
        whileTap={{ scale: 0.98 }}
        className="flex cursor-pointer gap-4 rounded-3xl bg-cream-50 p-3 pe-3 shadow-[0_1px_0_rgba(15,61,51,.06),0_10px_30px_-18px_rgba(15,61,51,.35)] transition-shadow hover:shadow-[0_1px_0_rgba(15,61,51,.06),0_16px_40px_-16px_rgba(15,61,51,.45)]"
      >
        <div className="min-w-0 flex-1 py-1 ps-1">
          <h3 className="display text-xl font-semibold leading-tight">{dish.name[lang]}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink/60">{dish.desc[lang]}</p>
          <div className="mt-2"><Tags tags={dish.tags} /></div>
          <p className="tnum mt-2 font-bold text-emerald-800">{price(dish.price)}</p>
        </div>
        <div className="relative w-28 shrink-0 self-center sm:w-32">
          <motion.div layoutId={`art-${dish.id}`} whileHover={{ rotate: 20 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}>
            <DishArt art={dish.art} palette={dish.palette} className="w-full" />
          </motion.div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={(e) => { e.stopPropagation(); add(dish.id) }}
            aria-label={`${dish.name[lang]} +1`}
            className="absolute -bottom-1 end-0 grid h-10 w-10 place-items-center rounded-full bg-emerald-800 text-cream-50 shadow-lg"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {qty > 0 ? (
                <motion.span key={qty} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="tnum text-sm font-bold">{qty}</motion.span>
              ) : (
                <motion.span key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Plus size={18} /></motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </motion.li>
  )
}
