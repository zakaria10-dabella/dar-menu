import { motion } from 'framer-motion'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { useApp } from '../context/AppContext'
import LangSwitch from './LangSwitch'
import Mark from './Mark'

const ease = [0.22, 1, 0.36, 1]
const rise = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.9, ease } })

export default function Welcome({ onEnter }) {
  const { t, lang } = useApp()
  return (
    <motion.section
      key="welcome"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="on-dark fixed inset-0 z-50 overflow-hidden bg-forest-950 text-paper-50"
      aria-label="Dar Zellige"
    >
      <motion.img
        src="/photos/tajine-agneau.jpg"
        alt={lang === 'fr' ? 'Tajine d’agneau aux pruneaux, amandes et sésame, sur une table en zellige' : lang === 'ar' ? 'طاجين اللحم بالبرقوق واللوز والجلجلان على مائدة من الزليج' : 'Lamb tajine with prunes, almonds and sesame on a zellige table'}
        width="1280"
        height="854"
        fetchpriority="high"
        decoding="async"
        initial={{ scale: 1.14 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 2.6, ease }}
        className="absolute inset-x-0 top-0 h-[60%] w-full object-cover object-[50%_45%] lg:inset-y-0 lg:start-auto lg:end-0 lg:h-full lg:w-[80%] lg:object-[50%_50%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)] rtl:lg:[mask-image:linear-gradient(to_left,transparent,black_30%)]"
      />
      {/* band scrim on phones, corner scrim on wide screens */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,29,25,1)_0%,rgba(11,29,25,1)_40%,rgba(11,29,25,.55)_52%,rgba(11,29,25,0)_66%)] lg:bg-[linear-gradient(to_right,rgba(11,29,25,1)_0%,rgba(11,29,25,.95)_22%,rgba(11,29,25,.45)_40%,rgba(11,29,25,0)_55%)] rtl:lg:bg-[linear-gradient(to_left,rgba(11,29,25,1)_0%,rgba(11,29,25,.95)_22%,rgba(11,29,25,.45)_40%,rgba(11,29,25,0)_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-forest-950/70 to-transparent" />

      <div className="relative flex h-full flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 lg:px-14 lg:pb-14 lg:pt-8">
        <header className="flex items-center justify-between">
          <motion.span {...rise(0.1)} className="flex items-center gap-2.5 text-sm font-bold tracking-wide">
            <Mark className="h-6 w-6 text-saffron-400" />
            <span className="hidden sm:inline">{t.address}</span>
            <span className="sm:hidden">{t.district}</span>
          </motion.span>
          <motion.div {...rise(0.15)}><LangSwitch dark id="welcome-lang" /></motion.div>
        </header>

        <div className="mt-auto max-w-2xl">
          <motion.p {...rise(0.35)} className="eyebrow text-saffron-300">
            {t.welcome} · {t.table} 7
          </motion.p>
          <motion.h1 {...rise(0.45)} className="display mt-3 text-[clamp(3.6rem,17vw,8.5rem)] leading-[0.88]">
            {lang === 'ar' ? 'دار الزليج' : <>Dar<br className="sm:hidden" /> Zellige</>}
          </motion.h1>
          <motion.p {...rise(0.55)} className="mt-5 max-w-sm text-[1.05rem] leading-relaxed text-paper-50/85 lg:max-w-md lg:text-lg">
            {t.tagline}.
          </motion.p>
          <motion.div {...rise(0.65)} className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <button
              onClick={onEnter}
              className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full bg-saffron-400 pe-2 ps-7 text-base font-bold text-forest-950 transition-colors hover:bg-saffron-300 sm:w-auto"
            >
              {t.viewMenu}
              <span className="grid h-10 w-10 place-items-center rounded-full bg-forest-950 text-saffron-300">
                <ArrowRight size={18} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </span>
            </button>
            <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-paper-50/80">
              <span className="inline-flex items-center gap-1.5"><Clock size={15} aria-hidden="true" /> {t.open}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin size={15} aria-hidden="true" /> {t.city}</span>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
