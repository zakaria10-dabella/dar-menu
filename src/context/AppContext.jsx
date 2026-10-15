import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { currency, ui } from '../data/i18n'
import { dishes } from '../data/menu'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

const initialLang = () => {
  try {
    return localStorage.getItem('dar-lang') || 'fr'
  } catch {
    return 'fr'
  }
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const [cart, setCart] = useState({})
  const [notes, setNotes] = useState('')

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('dar-lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const value = useMemo(() => {
    const t = ui[lang]
    const price = (n) => (lang === 'ar' ? `${n} ${currency.ar}` : `${n} ${currency[lang]}`)
    const lines = Object.entries(cart)
      .filter(([, q]) => q > 0)
      .map(([id, qty]) => ({ dish: dishes.find((d) => d.id === id), qty }))
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const total = lines.reduce((s, l) => s + l.qty * l.dish.price, 0)
    return {
      lang, setLang, t, price, cart, lines, count, total, notes, setNotes,
      add: (id, n = 1) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + n })),
      setQty: (id, q) => setCart((c) => ({ ...c, [id]: Math.max(0, q) })),
      clear: () => { setCart({}); setNotes('') },
    }
  }, [lang, cart, notes])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
