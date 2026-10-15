import { Fragment, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { categories, dishes } from '../data/menu'
import { DishFeature, DishPortrait, DishRow, DishTile } from './DishCard'
import DishSheet from './DishSheet'
import OrderSheet from './OrderSheet'
import LangSwitch from './LangSwitch'
import SidePanel from './SidePanel'
import QuoteBand from './QuoteBand'
import Footer from './Footer'
import Mark from './Mark'

const ease = [0.22, 1, 0.36, 1]

function SectionHead({ c, lang }) {
  return (
    <motion.header initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mb-5">
      <h2 className="display text-[2.4rem] leading-none">{c[lang]}</h2>
      <p className="mt-2 text-[0.95rem] italic text-ink-soft">{c.note[lang]}</p>
    </motion.header>
  )
}

/** Each chapter of the menu gets its own layout so the page reads like a printed carte, not a feed. */
function Section({ c, lang, onOpen }) {
  const list = dishes.filter((d) => d.category === c.id)
  const head = <SectionHead c={c} lang={lang} />

  if (c.id === 'tajines') {
    const [hero, ...rest] = [...list].sort((a, b) => b.tags.includes('signature') - a.tags.includes('signature'))
    return (
      <>
        {head}
        <ul>
          <DishFeature dish={hero} onOpen={onOpen} />
          {rest.map((d) => <DishRow key={d.id} dish={d} onOpen={onOpen} />)}
        </ul>
      </>
    )
  }
  if (c.id === 'couscous') {
    return (
      <>
        {head}
        <ul className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0" aria-label={c[lang]}>
          {list.map((d) => <DishPortrait key={d.id} dish={d} onOpen={onOpen} />)}
        </ul>
      </>
    )
  }
  if (c.id === 'desserts') {
    return (
      <>
        {head}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-7">
          {list.map((d, i) => <DishTile key={d.id} dish={d} i={i} onOpen={onOpen} />)}
        </ul>
      </>
    )
  }
  return (
    <>
      {head}
      <ul>{list.map((d) => <DishRow key={d.id} dish={d} onOpen={onOpen} compact={c.id === 'drinks'} />)}</ul>
    </>
  )
}

export default function Menu() {
  const { lang, t, price, count, total } = useApp()
  const [active, setActive] = useState(categories[0].id)
  const [openDish, setOpenDish] = useState(null)
  const [orderOpen, setOrderOpen] = useState(false)
  const tabRefs = useRef({})
  const lock = useRef(false)

  // scroll-spy: highlight the category whose section crosses the upper third of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && !lock.current && setActive(e.target.dataset.cat)),
      { rootMargin: '-35% 0px -60% 0px' },
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
    setTimeout(() => (lock.current = false), 900)
  }

  const dish = dishes.find((d) => d.id === openDish)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <SidePanel active={active} />

      <div className="lg:ms-[42%]">
        <header className="sticky top-0 z-30 border-b border-forest-900/10 bg-paper-100/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-3 px-5 pt-3 sm:px-8">
            <div className="flex min-w-0 items-center gap-2.5">
              <Mark className="h-6 w-6 shrink-0 text-forest-800" />
              <p className="truncate">
                <span className="display text-lg">{lang === 'ar' ? 'دار الزليج' : 'Dar Zellige'}</span>
                <span className="ms-2 text-sm text-ink-soft">{t.table} 7</span>
              </p>
            </div>
            <LangSwitch />
          </div>
          <nav className="scrollbar-none mx-auto mt-1 flex max-w-xl gap-1 overflow-x-auto px-3 sm:px-6" aria-label={t.menu}>
            {categories.map((c) => (
              <button
                key={c.id}
                ref={(el) => (tabRefs.current[c.id] = el)}
                onClick={() => jump(c.id)}
                aria-current={active === c.id ? 'true' : undefined}
                className={`relative h-11 shrink-0 whitespace-nowrap px-3 text-[0.95rem] font-bold transition-colors ${active === c.id ? 'text-forest-900' : 'text-ink-soft hover:text-ink'}`}
              >
                {c[lang]}
                {active === c.id && <motion.span layoutId="tab-underline" className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-saffron-400" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
              </button>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-xl px-5 pb-16 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }} className="pb-4 pt-9">
            <p className="eyebrow text-ink-soft">{t.district} · {t.city}</p>
            <h1 className="display mt-2 text-[clamp(3.2rem,15vw,4.6rem)] leading-[0.9]">{t.menu}</h1>
            <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">{t.intro}</p>
          </motion.div>

          {categories.map((c) => (
            <Fragment key={c.id}>
              {c.id === 'grills' && <QuoteBand />}
              <section id={`cat-${c.id}`} data-cat={c.id} className="scroll-mt-32 pt-12">
                <Section c={c} lang={lang} onOpen={setOpenDish} />
              </section>
            </Fragment>
          ))}
        </main>
        <Footer />
      </div>

      <AnimatePresence>
        {count > 0 && !orderOpen && !dish && (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ type: 'spring', stiffness: 400, damping: 38 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:start-[42%]"
          >
            <button
              onClick={() => setOrderOpen(true)}
              className="on-dark mx-auto flex h-16 w-full max-w-xl items-center gap-3 rounded-full bg-forest-900 pe-6 ps-2.5 text-paper-50 shadow-[0_20px_40px_-14px_rgba(11,29,25,.7)] transition-colors hover:bg-forest-800"
            >
              <motion.span key={count} initial={{ scale: 1.25 }} animate={{ scale: 1 }} className="tnum grid h-11 min-w-11 place-items-center rounded-full bg-saffron-400 px-2 font-bold text-forest-950">
                {count}
              </motion.span>
              <span className="font-bold">{t.viewOrder}</span>
              <span className="tnum ms-auto font-bold text-saffron-300">{price(total)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{dish && <DishSheet key={dish.id} dish={dish} onClose={() => setOpenDish(null)} />}</AnimatePresence>
      <AnimatePresence>{orderOpen && <OrderSheet onClose={() => setOrderOpen(false)} />}</AnimatePresence>
    </motion.div>
  )
}
