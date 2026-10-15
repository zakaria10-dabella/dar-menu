import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useApp } from '../context/AppContext'

/** Full-bleed photograph of a carved cedar ceiling, with a single line of house philosophy. */
export default function QuoteBand() {
  const { t, lang } = useApp()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  return (
    <figure ref={ref} className="on-dark relative -mx-5 my-14 overflow-hidden bg-forest-950 text-paper-50 sm:mx-0 sm:rounded-3xl">
      <div className="relative aspect-[4/5] sm:aspect-[5/4]">
        <motion.img
          src="/photos/riad-ceiling.jpg"
          alt={lang === 'ar' ? 'سقف من خشب الأرز المنقوش في رياض' : lang === 'fr' ? 'Plafond en cèdre sculpté d’un riad' : 'Carved cedar ceiling in a riad'}
          width="1280"
          height="952"
          loading="lazy"
          decoding="async"
          style={{ y }}
          className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,29,25,.96)_0%,rgba(11,29,25,.86)_42%,rgba(11,29,25,.35)_66%,rgba(11,29,25,0)_82%)]" />
        <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
          <blockquote className="display text-[clamp(1.9rem,8vw,2.6rem)] leading-[1.05]">“{t.quote}”</blockquote>
          <p className="eyebrow mt-4 text-saffron-300">— {t.quoteBy}, Dar Zellige</p>
        </figcaption>
      </div>
    </figure>
  )
}
