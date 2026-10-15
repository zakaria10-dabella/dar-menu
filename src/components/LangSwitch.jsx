import { motion } from 'framer-motion'
import { languages } from '../data/i18n'
import { useApp } from '../context/AppContext'

export default function LangSwitch({ dark = false, id = 'lang' }) {
  const { lang, setLang } = useApp()
  return (
    <div
      role="radiogroup"
      aria-label="Language / Langue / اللغة"
      className={`flex rounded-full border p-0.5 ${dark ? 'border-paper-50/25 bg-forest-950/30 backdrop-blur-sm' : 'border-forest-900/15'}`}
    >
      {languages.map((l) => {
        const active = l.id === lang
        return (
          <button
            key={l.id}
            role="radio"
            aria-checked={active}
            aria-label={l.name}
            lang={l.id}
            onClick={() => setLang(l.id)}
            className={`relative grid h-11 w-11 place-items-center rounded-full text-[0.8rem] font-bold tracking-wide transition-colors ${
              active ? (dark ? 'text-forest-950' : 'text-paper-50') : dark ? 'text-paper-50/80 hover:text-paper-50' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className={`absolute inset-0.5 rounded-full ${dark ? 'bg-saffron-400' : 'bg-forest-900'}`}
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <span className={`relative ${l.id === 'ar' ? 'font-arabic text-sm' : ''}`}>{l.label}</span>
          </button>
        )
      })}
    </div>
  )
}
