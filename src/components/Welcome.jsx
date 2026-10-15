import { motion } from 'framer-motion'
import { ArrowRight, Clock, MousePointerClick } from 'lucide-react'
import { useApp } from '../context/AppContext'
import LangSwitch from './LangSwitch'
import { Logo, TajineStage } from './Brand'

const rise = (d) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } })

export default function Welcome({ onEnter }) {
  const { t } = useApp()
  return (
    <motion.section
      key="welcome"
      exit={{ clipPath: 'circle(0% at 50% 100%)', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      initial={{ clipPath: 'circle(150% at 50% 100%)' }}
      animate={{ clipPath: 'circle(150% at 50% 100%)' }}
      className="zellige fixed inset-0 z-50 flex flex-col overflow-y-auto text-cream-50"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-5 lg:flex-row lg:items-center lg:gap-10 lg:px-10">
        <div className="flex items-center justify-between lg:absolute lg:inset-x-10 lg:top-6">
          <span className="flex items-center gap-2 text-sm font-semibold"><Logo className="h-9 w-9" /> Dar Zellige</span>
          <LangSwitch dark id="welcome-lang" />
        </div>
        <TajineStage className="mx-auto mt-2 aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:order-2 lg:mt-0 lg:max-w-[560px] lg:flex-1" />
        <div className="text-center lg:order-1 lg:flex-1 lg:text-start">
          <motion.p {...rise(0.2)} className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron-400">{t.welcome}</motion.p>
          <motion.h1 {...rise(0.3)} className="display mt-3 text-6xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">
            Dar <em className="text-saffron-400">Zellige</em>
          </motion.h1>
          <motion.p {...rise(0.4)} className="mx-auto mt-4 max-w-sm text-cream-100/75 lg:mx-0">{t.tagline}</motion.p>
          <motion.div {...rise(0.5)} className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm lg:justify-start">
            <span className="rounded-full border border-cream-100/20 bg-white/5 px-4 py-2 font-semibold backdrop-blur">{t.table} 7</span>
            <span className="flex items-center gap-1.5 text-cream-100/70"><Clock size={14} /> {t.open}</span>
          </motion.div>
          <motion.button
            {...rise(0.6)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-saffron-500 px-8 py-4 text-base font-bold text-emerald-900 shadow-[0_12px_40px_-10px_rgba(232,163,61,.7)] sm:w-auto"
          >
            {t.viewMenu}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </motion.button>
          <motion.p {...rise(0.8)} className="mt-4 flex items-center justify-center gap-1.5 text-xs text-cream-100/50 lg:justify-start"><MousePointerClick size={13} /> {t.tapLid}</motion.p>
        </div>
      </div>
    </motion.section>
  )
}
