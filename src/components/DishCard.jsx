import { AnimatePresence, motion } from 'framer-motion'
import { Flame, Leaf, Plus, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Photo from './Photo'

const ease = [0.22, 1, 0.36, 1]

export function Tags({ tags, className = '' }) {
  const { t } = useApp()
  const map = { veg: [Leaf, t.veg], spicy: [Flame, t.spicy], signature: [Star, t.signature] }
  if (!tags.length) return null
  return (
    <span className={`flex flex-wrap gap-x-3 gap-y-1 text-[0.78rem] font-medium text-ink-soft ${className}`}>
      {tags.map((tag) => {
        const [Icon, label] = map[tag]
        return (
          <span key={tag} className="inline-flex items-center gap-1">
            <Icon size={13} strokeWidth={2} aria-hidden="true" className={tag === 'signature' ? 'fill-saffron-400 text-saffron-500' : ''} />
            {label}
          </span>
        )
      })}
    </span>
  )
}

/** Round quick-add button; shows the running quantity once added. */
export function AddButton({ dish, className = '', light = false }) {
  const { lang, t, add, cart } = useApp()
  const qty = cart[dish.id] || 0
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={(e) => { e.stopPropagation(); add(dish.id) }}
      aria-label={`${t.add} : ${dish.name[lang]}${qty ? ` (${qty})` : ''}`}
      className={`grid h-11 w-11 place-items-center rounded-full shadow-[0_6px_16px_-6px_rgba(11,29,25,.55)] transition-colors ${
        qty > 0 ? 'bg-saffron-400 text-forest-950' : light ? 'bg-paper-50 text-forest-900 hover:bg-paper-200' : 'bg-forest-900 text-paper-50 hover:bg-forest-800'
      } ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {qty > 0 ? (
          <motion.span key={qty} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="tnum text-sm font-bold">{qty}</motion.span>
        ) : (
          <motion.span key="plus" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }}><Plus size={18} strokeWidth={2.2} /></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

const reveal = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-30px' }, transition: { duration: 0.6, ease } }

function useOpen(dish, onOpen) {
  return {
    role: 'button',
    tabIndex: 0,
    onClick: () => onOpen(dish.id),
    onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(dish.id)),
  }
}

/** Default: text-led row with a square photo at the end. */
export function DishRow({ dish, onOpen, compact = false }) {
  const { lang, price } = useApp()
  return (
    <motion.li {...reveal} className="border-b border-forest-900/10 last:border-0">
      <div {...useOpen(dish, onOpen)} className="group grid cursor-pointer grid-cols-[1fr_auto] items-center gap-4 py-4">
        <div className="min-w-0">
          <h3 className="display text-[1.2rem] leading-tight">{dish.name[lang]}</h3>
          {!compact && <p className="mt-1 line-clamp-2 text-[0.92rem] leading-snug text-ink-soft">{dish.desc[lang]}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="tnum font-bold text-forest-900">{price(dish.price)}</span>
            <Tags tags={dish.tags} />
          </div>
        </div>
        <div className="relative">
          <Photo
            src={dish.photo}
            alt={dish.name[lang]}
            focus={dish.focus}
            layoutId={`photo-${dish.id}`}
            radius={14}
            className={compact ? 'w-20' : 'w-[6.5rem] sm:w-28'}
          />
          <AddButton dish={dish} className="absolute bottom-1.5 end-1.5" light />
        </div>
      </div>
    </motion.li>
  )
}

/** Photo-led feature for a house signature. */
export function DishFeature({ dish, onOpen }) {
  const { lang, t, price } = useApp()
  return (
    <motion.li {...reveal} className="mb-2">
      <div {...useOpen(dish, onOpen)} className="group cursor-pointer">
        <div className="relative">
          <Photo src={dish.photo} alt={dish.name[lang]} focus={dish.focus} layoutId={`photo-${dish.id}`} ratio="4 / 3" radius={20} />
          <span className="eyebrow absolute start-4 top-4 rounded-full bg-paper-50 px-3 py-1.5 text-forest-900">{t.signature}</span>
          <AddButton dish={dish} className="absolute -bottom-5 end-4 h-12 w-12" />
        </div>
        <h3 className="display mt-5 text-[1.75rem] leading-[1.05]">{dish.name[lang]}</h3>
        <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">{dish.desc[lang]}</p>
        <p className="tnum mt-3 text-lg font-bold text-forest-900">{price(dish.price)}</p>
      </div>
    </motion.li>
  )
}

/** Portrait card for the horizontal gallery. */
export function DishPortrait({ dish, onOpen }) {
  const { lang, price } = useApp()
  return (
    <li className="w-[68%] shrink-0 snap-start sm:w-[15rem] lg:w-auto">
      <div {...useOpen(dish, onOpen)} className="cursor-pointer">
        <div className="relative">
          <Photo src={dish.photo} alt={dish.name[lang]} focus={dish.focus} layoutId={`photo-${dish.id}`} ratio="3 / 4" radius={18} />
          <AddButton dish={dish} className="absolute bottom-3 end-3" light />
        </div>
        <h3 className="display mt-3 text-[1.2rem] leading-tight">{dish.name[lang]}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-ink-soft">{dish.desc[lang]}</p>
        <p className="tnum mt-2 font-bold text-forest-900">{price(dish.price)}</p>
      </div>
    </li>
  )
}

/** Square tile for the two-column grid. */
export function DishTile({ dish, onOpen, i = 0 }) {
  const { lang, price } = useApp()
  return (
    <motion.li {...reveal} transition={{ ...reveal.transition, delay: (i % 2) * 0.08 }}>
      <div {...useOpen(dish, onOpen)} className="cursor-pointer">
        <div className="relative">
          <Photo src={dish.photo} alt={dish.name[lang]} focus={dish.focus} layoutId={`photo-${dish.id}`} ratio="1 / 1" radius={16} />
          <AddButton dish={dish} className="absolute bottom-2.5 end-2.5" light />
        </div>
        <h3 className="display mt-3 text-[1.08rem] leading-tight">{dish.name[lang]}</h3>
        <p className="tnum mt-1 font-bold text-forest-900">{price(dish.price)}</p>
      </div>
    </motion.li>
  )
}
