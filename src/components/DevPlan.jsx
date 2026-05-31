import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Rocket } from 'lucide-react'

const milestones = [
  {
    period: '2026 — 2027',
    title: 'Transition & Foundation',
    status: 'now',
    color: 'violet',
    tagline: 'Make the PM move real.',
    items: [
      { done: true,  text: '50% through PM training at FPT — two months left to complete.' },
      { done: false, text: 'Finish the program and actively look for a PM role in a real project.' },
      { done: false, text: 'Reduce teaching hours to create more focus for the career transition.' },
      { done: false, text: 'Practise faster decisions: frame the problem, give myself two days max, act.' },
      { done: false, text: 'Speak up earlier in team settings instead of waiting until I feel certain.' },
    ],
  },
  {
    period: '2028 — 2030',
    title: 'Apply. Build. Lead.',
    status: 'next',
    color: 'blush',
    tagline: 'MBA is done. Now put it to work.',
    items: [
      { done: false, text: 'Apply MBA knowledge to real decisions — strategy, people, and business model thinking.' },
      { done: false, text: 'Identify a real problem worth solving at the intersection of tech and people.' },
      { done: false, text: 'Build the network, confidence, and financial foundation to launch a business.' },
      { done: false, text: 'Develop conflict management and stakeholder skills — still my weakest area.' },
    ],
  },
]

const colorMap = {
  violet: {
    dot:    'bg-lavender-500',
    ring:   'ring-lavender-200',
    text:   'text-lavender-500',
    border: 'border-lavender-200',
    bg:     'bg-lavender-50',
    check:  'text-lavender-500',
    line:   'bg-gradient-to-b from-lavender-300 via-blush-300 to-sage-300',
    tag:    'border-lavender-300 text-lavender-600 bg-lavender-50',
  },
  blush: {
    dot:    'bg-blush-500',
    ring:   'ring-blush-200',
    text:   'text-blush-500',
    border: 'border-blush-200',
    bg:     'bg-blush-50',
    check:  'text-blush-500',
    tag:    'border-blush-300 text-blush-600 bg-blush-50',
  },
  sage: {
    dot:    'bg-sage-500',
    ring:   'ring-sage-200',
    text:   'text-sage-500',
    border: 'border-sage-200',
    bg:     'bg-sage-50',
    check:  'text-sage-500',
    tag:    'border-sage-300 text-sage-600 bg-sage-50',
  },
}

export default function DevPlan() {
  return (
    <section
      id="plan"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff0f6 0%, #f5f0ff 50%, #f0f9ff 100%)' }}
    >
      {/* Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-lavender-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-blush-100/40 blur-3xl pointer-events-none" />

      {/* Ambient chapter watermark */}
      <div
        className="absolute left-4 top-8 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(60px, 14vw, 160px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(139, 92, 246, 0.06)',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        05
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="chapter-label justify-center">Chapter Five</p>
          <h2 className="section-title mb-4">
            My Development{' '}
            <span className="text-gradient-violet">Plan</span>
          </h2>
          <p className="text-plum-700/60 max-w-md mx-auto text-base font-light leading-relaxed">
            A plan only means something if it is specific enough to hold you accountable.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-2 bottom-2 w-px bg-gradient-to-b from-lavender-300 via-blush-300 to-sage-300 opacity-60" />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const c = colorMap[m.color]
              return (
                <motion.div
                  key={m.period}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-4 md:left-6 top-1.5 w-5 h-5 rounded-full ${c.dot} ring-4 ${c.ring} bg-white flex items-center justify-center shadow-sm`}>
                    {m.status === 'now' && (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                    {m.status === 'future' && (
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="card-light p-6 hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <span className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>
                        {m.period}
                      </span>
                      {m.status === 'now' && (
                        <span className={`tag-light ${c.tag} text-xs`}>
                          Current Focus
                        </span>
                      )}
                    </div>
                    <h3 className="text-plum-900 font-bold text-lg mb-1 font-display">{m.title}</h3>
                    <p className="text-plum-700/50 text-sm italic mb-5 font-light">{m.tagline}</p>

                    <ul className="space-y-2.5">
                      {m.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm">
                          {item.done ? (
                            <CheckCircle2 className={`w-4 h-4 ${c.check} shrink-0 mt-0.5`} />
                          ) : (
                            <Circle className="w-4 h-4 text-plum-900/20 shrink-0 mt-0.5" />
                          )}
                          <span className={item.done ? 'text-plum-800' : 'text-plum-700/60'}>
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── "Tỉnh táo" photo — a reminder not to take it all too seriously ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col md:flex-row items-center gap-8 bg-white/60 backdrop-blur-sm border border-lavender-100 rounded-2xl p-6 md:p-8"
        >
          {/* Polaroid */}
          <div className="shrink-0">
            <div
              className="bg-white p-3 pb-8 rounded-lg shadow-md relative"
              style={{ transform: 'rotate(2deg)', width: 180 }}
            >
              <img
                src="/photos/anh7.jpg"
                alt="Nam Cat Tien forest"
                className="w-full rounded"
                style={{ height: 200, objectFit: 'cover', objectPosition: 'center top' }}
              />
              <p className="absolute bottom-1.5 left-0 right-0 text-center text-plum-700/50 text-[9px] italic">
                Nam Cat Tien, 2025
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-3 text-center md:text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-lavender-500">
              A note to future me
            </p>
            <p className="font-display font-bold text-plum-900 text-xl leading-snug">
              Stay Clear.{' '}
              <span className="text-gradient-violet">Keep Moving.</span>
            </p>
            <p className="text-plum-700/55 text-sm leading-relaxed font-light max-w-sm">
              Not every plan goes on schedule. But as long as you know where you are and where you're heading — the rest is just time and steps forward.
            </p>
            <p className="text-plum-700/35 text-xs italic">
              — Written in a forest, wearing the most honest shirt I own
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
