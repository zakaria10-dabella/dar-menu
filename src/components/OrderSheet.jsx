import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, UtensilsCrossed } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BottomSheet from './BottomSheet'
import DishArt from './DishArt'

export default function OrderSheet({ onClose }) {
  const { lang, t, price, lines, setQty, total, notes, setNotes, clear } = useApp()
  const [sent, setSent] = useState(false)
  const service = 0

  return (
    <BottomSheet onClose={onClose} label={t.order}>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center px-6 pb-10 pt-6 text-center">
            <svg viewBox="0 0 120 120" className="h-28 w-28">
              <motion.circle cx="60" cy="60" r="52" fill="#0F3D33" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }} style={{ originX: '50%', originY: '50%' }} />
              <motion.path d="M38 62 L54 78 L84 44" fill="none" stroke="#E8A33D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.35, duration: 0.5 }} />
            </svg>
            <h2 className="display mt-6 text-4xl font-semibold">{t.sent}</h2>
            <p className="mt-2 text-ink/60">{t.sentHint} {t.table} 7.</p>
            <button onClick={() => { clear(); onClose() }} className="mt-8 rounded-full bg-emerald-800 px-8 py-4 font-bold text-cream-50">{t.newOrder}</button>
          </motion.div>
        ) : (
          <motion.div key="list" exit={{ opacity: 0, x: -30 }} className="flex min-h-0 flex-col">
            <h2 className="display px-6 text-3xl font-semibold">{t.order} <span className="font-sans text-base font-medium text-ink/50">· {t.table} 7</span></h2>
            {lines.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-14 text-center">
                <motion.div animate={{ rotate: [0, -12, 12, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="grid h-16 w-16 place-items-center rounded-full bg-cream-200 text-emerald-800"><UtensilsCrossed size={26} /></motion.div>
                <p className="mt-4 font-semibold">{t.empty}</p>
                <p className="text-sm text-ink/55">{t.emptyHint}</p>
              </div>
            ) : (
              <>
                <ul className="mt-4 max-h-[40vh] space-y-3 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map(({ dish, qty }) => (
                      <motion.li key={dish.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-3">
                        <DishArt art={dish.art} palette={dish.palette} className="h-14 w-14 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{dish.name[lang]}</p>
                          <p className="tnum text-sm text-ink/55">{price(dish.price)}</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-cream-50 p-1">
                          <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQty(dish.id, qty - 1)} aria-label="-1" className="grid h-8 w-8 place-items-center rounded-full bg-cream-200"><Minus size={14} /></motion.button>
                          <span className="tnum w-6 text-center text-sm font-bold">{qty}</span>
                          <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQty(dish.id, qty + 1)} aria-label="+1" className="grid h-8 w-8 place-items-center rounded-full bg-cream-200"><Plus size={14} /></motion.button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="px-6 pt-4">
                  <label className="text-sm font-semibold" htmlFor="notes">{t.notes}</label>
                  <textarea id="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notesPh} className="mt-2 w-full resize-none rounded-2xl border border-emerald-800/15 bg-cream-50 px-4 py-3 text-sm focus:border-emerald-800 focus:outline-none" />
                </div>
                <div className="mt-2 border-t border-emerald-800/10 px-6 pb-6 pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-ink/60">{t.total} · {t.service}</span>
                    <motion.span key={total} initial={{ y: -6, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} className="display tnum text-3xl font-semibold">{price(total + service)}</motion.span>
                  </div>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => setSent(true)} className="mt-4 w-full rounded-full bg-saffron-500 py-4 font-bold text-emerald-900 shadow-[0_12px_30px_-12px_rgba(232,163,61,.8)]">
                    {t.send}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </BottomSheet>
  )
}
