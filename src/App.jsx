import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Journey from './components/Journey'
import SelfAwareness from './components/SelfAwareness'
import Values from './components/Values'
import Gaps from './components/Gaps'
import DevPlan from './components/DevPlan'
import Closing from './components/Closing'
import StoryProgress from './components/StoryProgress'
import ChapterReveal, { PrologueScene } from './components/ChapterReveal'

export default function App() {
  const [showPrologue, setShowPrologue] = useState(true)

  /* Auto-dismiss prologue after 4.8 s (matches timer bar) */
  useEffect(() => {
    const t = setTimeout(() => setShowPrologue(false), 4800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="font-sans overflow-x-hidden">

      {/* ── Opening prologue — "book cover" with the cat narrator ── */}
      <AnimatePresence>
        {showPrologue && (
          <PrologueScene
            key="prologue"
            onDismiss={() => setShowPrologue(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Persistent fixed overlays ── */}
      <StoryProgress />
      <Navbar />

      {/* ── Chapter 00 · Prologue / Hero ── */}
      <div className="story-chapter">
        <Hero />
      </div>

      {/* ── Chapter One ── */}
      <ChapterReveal chapterIndex={0}>
        <Journey />
      </ChapterReveal>

      {/* ── Chapter Two ── */}
      <ChapterReveal chapterIndex={1}>
        <SelfAwareness />
      </ChapterReveal>

      {/* ── Chapter Three ── */}
      <ChapterReveal chapterIndex={2}>
        <Values />
      </ChapterReveal>

      {/* ── Chapter Four ── */}
      <ChapterReveal chapterIndex={3}>
        <Gaps />
      </ChapterReveal>

      {/* ── Chapter Five ── */}
      <ChapterReveal chapterIndex={4}>
        <DevPlan />
      </ChapterReveal>

      {/* ── Epilogue ── */}
      <div className="story-chapter">
        <Closing />
      </div>
    </div>
  )
}
