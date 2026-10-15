import { useEffect, useState } from 'react'
import { ArrowUpRight, Clock, MapPin } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Mark from './Mark'

export default function Footer() {
  const { t, lang } = useApp()
  const [credits, setCredits] = useState([])
  useEffect(() => {
    fetch('/photos/credits.json').then((r) => r.json()).then(setCredits).catch(() => {})
  }, [])

  return (
    <footer className="on-dark bg-forest-900 text-paper-50">
      <div className="mx-auto max-w-xl px-5 pb-40 pt-14 sm:px-8">
        <Mark className="h-8 w-8 text-saffron-400" />
        <p className="display mt-4 text-4xl leading-none">{lang === 'ar' ? 'دار الزليج' : 'Dar Zellige'}</p>
        <ul className="mt-6 space-y-2 text-[0.95rem] text-paper-50/85">
          <li className="flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> {t.address}, {t.city}</li>
          <li className="flex items-center gap-2"><Clock size={16} aria-hidden="true" /> {t.open}</li>
        </ul>
        <p className="mt-2 text-sm text-paper-50/70">{t.service}</p>

        <details className="group mt-10 border-t border-paper-50/15 pt-5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-bold">
            {t.credits}
            <span className="text-saffron-300 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="mt-1 text-sm text-paper-50/70">{t.creditsHint}</p>
          <ul className="mt-4 space-y-2 text-[0.82rem] leading-snug text-paper-50/80" dir="ltr">
            {credits.map((c) => (
              <li key={c.file}>
                <a href={c.source} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1 underline decoration-paper-50/30 underline-offset-2 hover:decoration-saffron-300">
                  <span>{c.file.replace('photos/', '')} — {c.author}, {c.license}</span>
                  <ArrowUpRight size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </details>
        <p className="mt-8 text-xs text-paper-50/60">{t.concept}</p>
      </div>
    </footer>
  )
}
