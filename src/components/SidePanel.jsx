import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { categories } from '../data/menu'
import Mark from './Mark'

// One photograph per chapter of the menu; the panel cross-fades as you read.
const shots = {
  starters: { src: '/photos/riad-hall.jpg', pos: '50% 60%' },
  tajines: { src: '/photos/tajine-agneau.jpg', pos: '45% 50%' },
  couscous: { src: '/photos/couscous-royal.jpg', pos: '50% 60%' },
  grills: { src: '/photos/riad-ceiling.jpg', pos: '50% 50%' },
  desserts: { src: '/photos/chebakia.jpg', pos: '50% 50%' },
  drinks: { src: '/photos/the.jpg', pos: '50% 55%' },
}

/** Desktop-only ambience column beside the phone-width menu. */
export default function SidePanel({ active }) {
  const { lang, t } = useApp()
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1])
  const cat = categories.find((c) => c.id === active)
  const shot = shots[active]

  return (
    <aside className="on-dark fixed inset-y-0 start-0 hidden w-[42%] overflow-hidden bg-forest-950 text-paper-50 lg:block" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
          <motion.img
            src={shot.src}
            alt=""
            width="1280"
            height="960"
            decoding="async"
            style={{ scale, objectPosition: shot.pos }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,29,25,.94)_0%,rgba(11,29,25,.55)_34%,rgba(11,29,25,0)_60%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-forest-950/70 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
        <div className="flex items-center gap-3">
          <Mark className="h-7 w-7 text-saffron-400" />
          <span className="display text-2xl">{lang === 'ar' ? 'دار الزليج' : 'Dar Zellige'}</span>
        </div>
        <div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active + lang} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <p className="display text-[clamp(3.5rem,6vw,6rem)] leading-[0.92]">{cat?.[lang]}</p>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-paper-50/85">{cat?.note[lang]}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-1 border-t border-paper-50/20 pt-5 text-sm text-paper-50/75">
            <span>{t.address}, {t.city}</span>
            <span>{t.open}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
