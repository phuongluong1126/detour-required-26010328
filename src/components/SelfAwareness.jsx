import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Users, Eye } from 'lucide-react'

const tabs = [
  {
    id: 'mbti',
    icon: Brain,
    label: 'MBTI',
    subtitle: 'A starting point',
    type: 'INTP',
    typeLabel: 'The Logician',
    content:
      'My MBTI result is INTP — someone who thinks deeply, works independently, and prefers meaningful conversations over small talk. On paper, not the most obvious leadership profile. But personality types describe tendencies, not limits.',
    traits: [
      { label: 'Analytical',   desc: 'Break problems down logically' },
      { label: 'Observant',    desc: 'Notice what others miss' },
      { label: 'Independent',  desc: 'Self-directed and autonomous' },
      { label: 'Curious',      desc: 'Always asking deeper questions' },
    ],
  },
  {
    id: 'feedback',
    icon: Users,
    label: 'External Feedback',
    subtitle: 'What others notice',
    type: null,
    content:
      'Feedback from people I have worked and studied with has been more grounding than any test. A few things come up consistently.',
    traits: [
      { label: 'Safe to talk to',    desc: 'People feel comfortable being honest around me' },
      { label: 'Calm under pressure',desc: 'I tend to stay steady when things get tense' },
      { label: 'Asks good questions',desc: 'Help people think rather than just giving answers' },
      { label: 'Quieter than I seem',desc: 'Open up and become funnier once people know me' },
    ],
  },
  {
    id: 'self',
    icon: Eye,
    label: 'Self-Reflection',
    subtitle: 'What I see in myself',
    type: null,
    content:
      'Through self-reflection — especially during this course — I have noticed a few consistent patterns in how I show up.',
    traits: [
      { label: 'Observe first',  desc: 'I notice what is not being said as much as what is' },
      { label: 'Listen more',    desc: 'Talk less in groups, but try to make it count when I do' },
      { label: 'Deep connector', desc: 'One-on-one conversations over large social settings' },
      { label: 'Delayed warmth', desc: 'I open up — including the humor — once I feel at ease' },
    ],
  },
]

export default function SelfAwareness() {
  const [active, setActive] = useState('mbti')
  const current = tabs.find(t => t.id === active)
  const Icon = current.icon

  return (
    <section
      id="self"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf4ff 0%, #f5f0ff 50%, #fdf4ff 100%)' }}
    >
      {/* Blobs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[400px] rounded-full bg-lavender-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-64 h-64 rounded-full bg-blush-100/40 blur-3xl pointer-events-none" />

      {/* Ambient chapter watermark */}
      <div
        className="absolute right-4 top-8 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(60px, 14vw, 160px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(139, 92, 246, 0.07)',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        02
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="chapter-label justify-center">Chapter Two</p>
          <h2 className="section-title mb-4">
            Know <span className="text-gradient-violet italic">Thyself</span>
          </h2>
          <p className="text-plum-700/60 max-w-lg mx-auto text-base font-light leading-relaxed">
            Self-awareness does not come from one source. It builds through three lenses.
          </p>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 justify-center mb-10 flex-wrap"
        >
          {tabs.map(tab => {
            const T = tab.icon
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  isActive
                    ? 'bg-lavender-500 border-lavender-500 text-white shadow-md shadow-lavender-200'
                    : 'border-lavender-200 text-plum-700/70 bg-white/60 hover:border-lavender-300 hover:text-lavender-600 hover:bg-white'
                }`}
              >
                <T className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </motion.div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white/70 border border-lavender-100 rounded-3xl p-8 md:p-10 shadow-sm"
            style={{ backdropFilter: 'blur(16px)' }}
          >
            <div className="flex flex-col md:flex-row gap-8">

              {/* Left side */}
              <div className="md:w-2/5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-lavender-50 border border-lavender-200">
                    <Icon className="w-5 h-5 text-lavender-500" />
                  </div>
                  <div>
                    <p className="text-xs text-plum-700/40 uppercase tracking-wider">{current.subtitle}</p>
                    <h3 className="text-plum-900 font-bold text-lg">{current.label}</h3>
                  </div>
                </div>

                {/* MBTI badge */}
                {current.type && (
                  <div className="mb-5 inline-flex items-center gap-3 bg-gradient-to-br from-lavender-50 to-blush-50 border border-lavender-200 rounded-2xl px-4 py-3">
                    <span className="text-3xl font-black text-gradient-violet">{current.type}</span>
                    <div>
                      <p className="text-plum-900 font-semibold text-sm">{current.typeLabel}</p>
                      <p className="text-plum-700/50 text-xs">Myers-Briggs Type</p>
                    </div>
                  </div>
                )}

                <p className="text-plum-700/70 text-sm leading-relaxed">{current.content}</p>
              </div>

              {/* Right side — traits */}
              <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.traits.map((trait, i) => (
                  <motion.div
                    key={trait.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white/80 rounded-2xl p-4 border border-lavender-100 hover:border-lavender-300 hover:shadow-sm transition-all"
                  >
                    <p className="text-lavender-600 font-semibold text-sm mb-1">{trait.label}</p>
                    <p className="text-plum-700/60 text-xs leading-relaxed">{trait.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom insight */}
            <div className="mt-8 pt-6 border-t border-lavender-100/80">
              <p className="text-plum-700/50 text-sm italic text-center font-light leading-relaxed">
                "Leadership does not always mean owning the room. Sometimes it means understanding it better than anyone else — and then doing something with that understanding."
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── "Beyond the labels" — two personal photos ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-12 pt-10 border-t border-lavender-100/80"
        >
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.32em] text-lavender-400 mb-8">
            Beyond the labels
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">

            {/* anh3 — Sapa trail run */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-lavender-100 cursor-default"
              style={{ transform: 'rotate(-1.5deg)' }}
            >
              <div className="overflow-hidden" style={{ height: 200 }}>
                <img
                  src="/photos/anh3.jpg"
                  alt="Vietnam Mountain Marathon - Sapa"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="text-plum-900 font-semibold text-sm">Trail running · Sapa</p>
                <p className="text-plum-700/50 text-xs mt-1 leading-relaxed">
                  "I know discomfort. It doesn't stop me — it just becomes part of the plan."
                </p>
              </div>
            </motion.div>

            {/* anh6 — mountain peak flag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-lavender-100 cursor-default"
              style={{ transform: 'rotate(1.5deg)' }}
            >
              <div className="overflow-hidden" style={{ height: 200 }}>
                <img
                  src="/photos/anh6.png"
                  alt="La Ban Peak, Nui Dinh mountain"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="text-plum-900 font-semibold text-sm">La Ban Peak · Nui Dinh</p>
                <p className="text-plum-700/50 text-xs mt-1 leading-relaxed">
                  "Self-awareness also means knowing what you're capable of when you choose to push."
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
