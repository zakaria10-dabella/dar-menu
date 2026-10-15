import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Welcome from './components/Welcome'
import Menu from './components/Menu'

export default function App() {
  const [entered, setEntered] = useState(false)
  return (
    <>
      {entered && <Menu />}
      <AnimatePresence>{!entered && <Welcome onEnter={() => setEntered(true)} />}</AnimatePresence>
    </>
  )
}
