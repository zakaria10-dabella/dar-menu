import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { categories, dishes } from '../data/menu'
import DishCard from './DishCard'
import DishSheet from './DishSheet'
import OrderSheet from './OrderSheet'
import LangSwitch from './LangSwitch'
import { Logo, TajineStage } from './Brand'

export default function Menu() {
  const { lang, t, price, count, total } = useApp()
  const [active, setActive] = useState(categories[0].id)
  const [openDish, setOpenDish] = useState(null)
  const [orderOpen, setOrderOpen] = useState(false)
  const tabRefs = useRef({})
  const lock = useRef(false)

  // scroll-spy: highlight the category whose section crosses the middle of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && !lock.current && setActive(e.target.dataset.cat)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    categories.forEach((c) => {
      const el = document.getElementById(`cat-${c.id}`)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  const jump = (id) => {
    setActive(id)
    lock.current = true
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => (lock.current = false), 800)
  }

  const dish = dishes.find((d) => d.id === openDish)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      {/* desktop brand panel */}
      <aside className="zellige fixed inset-y-0 start-0 hidden w-[44%] flex-col justify-between p-10 text-cream-50 lg:flex">
        <div className="flex items-center gap-3"><Logo className="h-10 w-10" /><span className="display text-2xl font-semibold">Dar Zellige</span></div>
        <TajineStage className="mx-auto aspect-square w-full max-w-[520px]" />
        <div>
          <p className="display text-5xl font-semibold leading-tight">{t.tagline}</p>
          <p className="mt-3 text-sm text-cream-100/60">Boulevard de la Corniche, Aïn Diab · {t.open}</p>
        </div>
      </aside>

      <div className="lg:ms-[44%]">
        <header className="sticky top-0 z-30 bg-cream-100/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-lg items-center justify-between px-5 pt-4">
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-9 lg:hidden" />
              <div>
                <p className="display text-xl font-semibold leading-none">{t.menu}</p>
                <p className="text-xs text-ink/50">Dar Zellige · {t.table} 7</p>
              </div>
            </div>
            <LangSwitch />
          </div>
          <nav className="scrollbar-none mx-auto mt-3 flex max-w-lg gap-1 overflow-x-auto border-b border-emerald-800/10 px-3" aria-label="Categories">
            {categories.map((c) => (
              <button
                key={c.id}
                ref={(el) => (tabRefs.current[c.id] = el)}
                onClick={() => jump(c.id)}
                aria-current={active === c.id}
                className={`relative shrink-0 whitespace-nowrap px-3 pb-3 pt-1 text-sm font-semibold transition-colors ${active === c.id ? 'text-emerald-800' : 'text-ink/45 hover:text-ink/70'}`}
              >
                {c[lang]}
                {active === c.id && <motion.span layoutId="tab-underline" className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-saffron-500" transition={{ type: 'spring', stiffness: 500, damping: 36 }} />}
              </button>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-lg px-4 pb-36 pt-4">
          {categories.map((c) => (
            <section key={c.id} id={`cat-${c.id}`} data-cat={c.id} className="scroll-mt-28 pt-6">
              <motion.h2 initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="display mb-4 flex items-center gap-3 px-1 text-3xl font-semibold">
                {c[lang]}
                <span className="h-px flex-1 bg-gradient-to-r from-saffron-500/60 to-transparent rtl:bg-gradient-to-l" />
              </motion.h2>
              <ul className="space-y-3">
                {dishes.filter((d) => d.category === c.id).map((d) => <DishCard key={d.id} dish={d} onOpen={setOpenDish} />)}
              </ul>
            </section>
          ))}
          <p className="mt-10 text-center text-xs text-ink/40">{t.service} · Concept by Zakaria Dabella</p>
        </main>
      </div>

      <AnimatePresence>
        {count > 0 && !orderOpen && !dish && (
          <motion.div initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }} transition={{ type: 'spring', stiffness: 400, damping: 34 }} className="fixed inset-x-0 bottom-0 z-40 px-4 pb-5 lg:start-[44%]">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setOrderOpen(true)}
              className="mx-auto flex w-full max-w-lg items-center gap-3 rounded-full bg-emerald-800 py-3 pe-6 ps-3 text-cream-50 shadow-[0_20px_40px_-12px_rgba(10,42,35,.6)]"
            >
              <motion.span key={count} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="relative grid h-11 w-11 place-items-center rounded-full bg-saffron-500 text-emerald-900">
                <ShoppingBag size={18} />
                <span className="tnum absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cream-50 px-1 text-[11px] font-bold text-emerald-900">{count}</span>
              </motion.span>
              <span className="font-bold">{t.viewOrder}</span>
              <span className="tnum ms-auto font-bold">{price(total)}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{dish && <DishSheet key={dish.id} dish={dish} onClose={() => setOpenDish(null)} />}</AnimatePresence>
      <AnimatePresence>{orderOpen && <OrderSheet onClose={() => setOrderOpen(false)} />}</AnimatePresence>
    </motion.div>
  )
}
