import { motion } from 'framer-motion'
import { Layers, Archive, Clock, EyeOff } from 'lucide-react'

const gaps = [
  {
    icon: Layers,
    title: 'Spreading myself too thin',
    theory: 'Growth Mindset',
    desc: 'Developer, teacher, MBA student, PM trainee — all at once. Each feels meaningful. But the combined weight means I rarely go deep enough in any one area. Moving across many things, finishing fewer than I intend.',
    honest: 'Tired from activity, but not always satisfied with the results.',
    color: 'amber',
  },
  {
    icon: Archive,
    title: 'Holding on too long',
    theory: 'Growth Mindset',
    desc: 'I find it hard to let things go. I worry that stopping means the time I already spent was wasted. So I keep going, even when it no longer makes sense.',
    honest: 'Not commitment. Closer to an inability to walk away from a sunk cost.',
    color: 'rose',
  },
  {
    icon: Clock,
    title: 'Slow to decide',
    theory: 'Agile Leadership',
    desc: 'I want to understand every angle before committing. This is occasionally useful. More often, it makes me slow in environments that need momentum. Agile leadership asks for the opposite reflex.',
    honest: "My default is to keep analysing until certainty arrives — which in most situations, it never does.",
    color: 'blush',
  },
  {
    icon: EyeOff,
    title: 'Not visible enough',
    theory: 'Authentic Leadership',
    desc: 'I contribute quietly and trust the work will be noticed. In practice, leaders who cannot make their thinking visible are often overlooked — regardless of how strong that thinking is.',
    honest: 'Being genuinely useful is not enough if nobody can see you being useful.',
    color: 'violet',
  },
]

const colorMap = {
  amber:  { icon: 'text-amber-500',    bg: 'bg-amber-50',     border: 'border-amber-200',   tag: 'border-amber-200 text-amber-600 bg-amber-50',    line: 'border-amber-300' },
  rose:   { icon: 'text-rose-500',     bg: 'bg-rose-50',      border: 'border-rose-200',    tag: 'border-rose-200 text-rose-600 bg-rose-50',       line: 'border-rose-300'  },
  blush:  { icon: 'text-blush-500',    bg: 'bg-blush-50/70',  border: 'border-blush-200',   tag: 'border-blush-200 text-blush-600 bg-blush-50',    line: 'border-blush-300' },
  violet: { icon: 'text-lavender-500', bg: 'bg-lavender-50',  border: 'border-lavender-200',tag: 'border-lavender-200 text-lavender-600 bg-lavender-50', line: 'border-lavender-300' },
}

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Gaps() {
  return (
    <section
      id="gaps"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf4ff 0%, #fffbf0 60%, #fff0f6 100%)' }}
    >
      {/* Blobs */}
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-amber-50/80 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-rose-50/60 blur-3xl pointer-events-none" />

      {/* Ambient chapter watermark */}
      <div
        className="absolute right-4 top-8 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(60px, 14vw, 160px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(245, 158, 11, 0.07)',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        04
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-center"
        >
          <p className="chapter-label justify-center">Chapter Four</p>
          <h2 className="section-title mb-4">
            Where I Still Need{' '}
            <span className="text-gradient-rose">to Grow</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-plum-700/60 mb-14 max-w-lg mx-auto text-base font-light leading-relaxed"
        >
          A leadership reflection that only lists strengths is not very honest. Here is where I genuinely fall short.
        </motion.p>

        {/* Gap cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-4"
        >
          {gaps.map((gap) => {
            const c = colorMap[gap.color]
            const Icon = gap.icon
            return (
              <motion.div
                key={gap.title}
                variants={item}
                className="card-light p-6 flex gap-5 hover:-translate-y-0.5"
              >
                <div className={`shrink-0 p-2.5 rounded-xl ${c.bg} border ${c.border} h-fit`}>
                  <Icon className={`w-5 h-5 ${c.icon}`} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="text-plum-900 font-bold text-base">{gap.title}</h3>
                    <span className={`tag-light ${c.tag} text-xs`}>{gap.theory}</span>
                  </div>
                  <p className="text-plum-700/65 text-sm leading-relaxed mb-3">{gap.desc}</p>
                  <p className={`text-plum-700/50 text-xs italic border-l-2 ${c.line} pl-3 font-light`}>
                    {gap.honest}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Growth mindset quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 bg-white/60 border border-sage-200 rounded-3xl p-7 text-center"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <p className="text-sage-500 text-xs font-semibold uppercase tracking-wider mb-2">Carol Dweck — Growth Mindset</p>
          <p className="text-plum-700/65 text-sm italic max-w-lg mx-auto font-light leading-relaxed">
            "These are not permanent traits. They are patterns I developed — and patterns, unlike personality, can be changed. Recognising them honestly is step one."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
