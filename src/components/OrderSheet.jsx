import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BottomSheet from './BottomSheet'
import Mark from './Mark'

export default function OrderSheet({ onClose }) {
  const { lang, t, price, lines, setQty, total, notes, setNotes, clear } = useApp()
  const [sent, setSent] = useState(false)

  return (
    <BottomSheet onClose={onClose} label={t.order}>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center px-6 pb-12 pt-8 text-center">
            <div className="relative grid h-24 w-24 place-items-center rounded-full bg-forest-900 text-saffron-400">
              <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
                <motion.path d="M13 25 L21 33 L36 16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.5 }} />
              </svg>
            </div>
            <h2 className="display mt-6 text-4xl">{t.sent}</h2>
            <p className="mt-2 text-ink-soft">{t.sentHint} {t.table} 7.</p>
            <button onClick={() => { clear(); onClose() }} className="mt-8 h-14 rounded-full bg-forest-900 px-8 font-bold text-paper-50 hover:bg-forest-800">{t.newOrder}</button>
          </motion.div>
        ) : (
          <motion.div key="list" exit={{ opacity: 0 }} className="flex min-h-0 flex-col">
            <div className="flex items-baseline justify-between px-6">
              <h2 className="display text-3xl">{t.order}</h2>
              <span className="eyebrow text-ink-soft">{t.table} 7</span>
            </div>
            {lines.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-14 text-center">
                <Mark className="h-12 w-12 text-forest-700" />
                <p className="mt-4 font-bold">{t.empty}</p>
                <p className="text-sm text-ink-soft">{t.emptyHint}</p>
              </div>
            ) : (
              <>
                <ul className="mt-3 max-h-[42dvh] divide-y divide-forest-900/10 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map(({ dish, qty }) => (
                      <motion.li key={dish.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-3 py-3">
                        <img src={dish.photo} alt="" width="56" height="56" loading="lazy" decoding="async" style={{ objectPosition: dish.focus }} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="display truncate text-[1.05rem]">{dish.name[lang]}</p>
                          <p className="tnum text-sm text-ink-soft">{price(dish.price)}</p>
                        </div>
                        <div className="flex items-center rounded-full border border-forest-900/15" role="group" aria-label={`${t.quantity} : ${dish.name[lang]}`}>
                          <button onClick={() => setQty(dish.id, qty - 1)} aria-label="−1" className="grid h-11 w-11 place-items-center rounded-full hover:bg-paper-200"><Minus size={14} /></button>
                          <span className="tnum w-5 text-center text-sm font-bold">{qty}</span>
                          <button onClick={() => setQty(dish.id, qty + 1)} aria-label="+1" className="grid h-11 w-11 place-items-center rounded-full hover:bg-paper-200"><Plus size={14} /></button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="px-6 pt-3">
                  <label className="text-sm font-bold" htmlFor="notes">{t.notes}</label>
                  <textarea id="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notesPh} className="mt-2 w-full resize-none rounded-2xl border border-forest-900/20 bg-paper-50 px-4 py-3 text-[0.95rem] placeholder:text-ink-soft/80 focus:border-forest-900 focus:outline-none" />
                </div>
                <div className="mt-2 border-t border-forest-900/10 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-ink-soft">{t.total} · {t.service}</span>
                    <span className="display tnum text-3xl">{price(total)}</span>
                  </div>
                  <motion.button whileTap={{ scale: 0.98 }} onClick={() => setSent(true)} className="mt-4 h-14 w-full rounded-full bg-saffron-400 font-bold text-forest-950 hover:bg-saffron-300">
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
