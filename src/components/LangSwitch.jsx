import { motion } from 'framer-motion'
import { languages } from '../data/i18n'
import { useApp } from '../context/AppContext'

export default function LangSwitch({ dark = false, id = 'lang' }) {
  const { lang, setLang } = useApp()
  return (
    <div role="radiogroup" aria-label="Language" className={`flex rounded-full p-1 ${dark ? 'bg-white/10' : 'bg-emerald-800/5'}`}>
      {languages.map((l) => {
        const active = l.id === lang
        return (
          <button
            key={l.id}
            role="radio"
            aria-checked={active}
            aria-label={l.name}
            onClick={() => setLang(l.id)}
            className={`relative h-8 w-10 rounded-full text-xs font-bold transition-colors ${active ? (dark ? 'text-emerald-900' : 'text-cream-50') : dark ? 'text-cream-100/70' : 'text-emerald-800/60'}`}
          >
            {active && <motion.span layoutId={`${id}-pill`} className={`absolute inset-0 rounded-full ${dark ? 'bg-saffron-500' : 'bg-emerald-800'}`} transition={{ type: 'spring', stiffness: 500, damping: 34 }} />}
            <span className="relative">{l.label}</span>
          </button>
        )
      })}
    </div>
  )
}
