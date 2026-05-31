import { motion } from 'framer-motion'
import { ShieldCheck, RefreshCw, Heart, Minus } from 'lucide-react'

const trustItems = [
  {
    icon: ShieldCheck,
    label: 'Credibility',
    score: 4,
    color: 'violet',
    desc: 'Technical depth and real teaching experience. I know the areas I work in and I do not pretend otherwise.',
  },
  {
    icon: RefreshCw,
    label: 'Reliability',
    score: 3,
    color: 'blush',
    desc: 'Still building this. Moving into PM means proving I can deliver through coordination — not just solo execution.',
  },
  {
    icon: Heart,
    label: 'Intimacy',
    score: 4,
    color: 'rose',
    desc: 'People feel comfortable being honest around me. Trust takes time to build here, but it holds when it does.',
  },
  {
    icon: Minus,
    label: 'Self-Orientation',
    score: 1,
    color: 'sage',
    desc: 'Naturally low. I care about win-win outcomes and I am not trying to use the people around me to get somewhere.',
    invert: true,
  },
]

const coreValues = [
  { label: 'Win-Win Mindset',          why: 'I cannot lead well if I treat others as a means to an end.' },
  { label: 'Authenticity',             why: 'People follow someone real before they follow someone polished.' },
  { label: 'Fairness',                 why: 'Consistency in how I treat people is what makes trust last.' },
  { label: 'Mutual Respect',           why: 'I expect to be challenged — and I challenge others the same way.' },
  { label: 'Growth Through Competence',why: 'I believe in earning confidence through mastery, not just positivity.' },
  { label: 'Psychological Safety',     why: 'Nothing good gets said in a room where people are afraid to speak.' },
]

const colorMap = {
  violet: { dot: 'bg-lavender-400', icon: 'text-lavender-500', bg: 'bg-lavender-50',  border: 'border-lavender-200', ring: 'ring-lavender-300' },
  blush:  { dot: 'bg-blush-400',    icon: 'text-blush-500',    bg: 'bg-blush-50',     border: 'border-blush-200',    ring: 'ring-blush-300'   },
  rose:   { dot: 'bg-rose-400',     icon: 'text-rose-500',     bg: 'bg-rose-50',      border: 'border-rose-200',     ring: 'ring-rose-300'    },
  sage:   { dot: 'bg-sage-400',     icon: 'text-sage-500',     bg: 'bg-sage-50',      border: 'border-sage-200',     ring: 'ring-sage-300'    },
}

function ScoreDots({ score, color }) {
  const c = colorMap[color]
  return (
    <div className="flex items-center gap-1.5 mt-1">
      {[1, 2, 3, 4, 5].map(n => (
        <div
          key={n}
          className={`w-2.5 h-2.5 rounded-full transition-all ${
            n <= score ? `${c.dot} ring-2 ${c.ring}` : 'bg-plum-900/10'
          }`}
        />
      ))}
    </div>
  )
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
}

export default function Values() {
  return (
    <section
      id="values"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf4ff 0%, #f0fdf4 60%, #fdf4ff 100%)' }}
    >
      {/* Blobs */}
      <div className="absolute top-24 left-0 w-80 h-80 rounded-full bg-sage-50/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-lavender-100/40 blur-3xl pointer-events-none" />

      {/* Ambient chapter watermark */}
      <div
        className="absolute left-4 top-8 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(60px, 14vw, 160px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(16, 185, 129, 0.07)',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        03
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
          <p className="chapter-label justify-center">Chapter Three</p>
          <h2 className="section-title mb-4">
            What I Believe About{' '}
            <span className="text-gradient-violet">Leadership</span>
          </h2>
          <p className="text-plum-700/60 max-w-lg mx-auto text-base font-light leading-relaxed">
            I do not want to lead through authority. I want to lead through trust — and earn that trust through how I actually show up.
          </p>
        </motion.div>

        {/* Trust formula */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-white/70 border border-lavender-100 rounded-3xl p-8 text-center shadow-sm"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <p className="text-xs text-plum-700/40 uppercase tracking-widest mb-5 font-medium">Trust Equation · Authentic Leadership</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xl md:text-2xl font-bold">
            <span className="text-plum-900 text-4xl md:text-5xl font-display font-bold">T</span>
            <span className="text-plum-700/30 text-2xl">=</span>
            <div className="flex flex-col items-center">
              <div className="flex gap-3 items-center flex-wrap justify-center">
                <span className="text-lavender-500">Credibility</span>
                <span className="text-plum-700/20">×</span>
                <span className="text-blush-500">Reliability</span>
                <span className="text-plum-700/20">×</span>
                <span className="text-rose-500">Intimacy</span>
              </div>
              <div className="w-full h-px bg-plum-900/10 my-2.5" />
              <span className="text-sage-500">Self-Orientation</span>
            </div>
          </div>
        </motion.div>

        {/* Trust cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {trustItems.map((item, i) => {
            const c = colorMap[item.color]
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`card-light p-5`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${c.bg} border ${c.border}`}>
                    <Icon className={`w-4 h-4 ${c.icon}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-plum-900 font-semibold text-sm">{item.label}</h4>
                    <ScoreDots score={item.score} color={item.color} />
                    {item.invert && (
                      <span className="text-[10px] text-plum-700/40 italic">(lower = better)</span>
                    )}
                  </div>
                </div>
                <p className="text-plum-700/60 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Trust callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-14 bg-white/60 border border-lavender-100 rounded-2xl px-6 py-4 flex items-center gap-3"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div className="w-1 self-stretch rounded-full bg-gradient-to-b from-rose-400 to-blush-400 shrink-0" />
          <p className="text-plum-700/65 text-sm leading-relaxed font-light">
            <span className="font-semibold text-plum-800">Current trust strength:</span>{' '}
            <span className="text-rose-500 font-medium">Intimacy</span> — people feel safe being honest around me.{' '}
            <span className="font-semibold text-plum-800">Next priority:</span>{' '}
            <span className="text-blush-500 font-medium">Reliability</span> — moving into PM means proving I can deliver through coordination, not just solo work.
          </p>
        </motion.div>

        {/* Core values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs text-plum-700/40 uppercase tracking-widest mb-5 font-medium">Core Values</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
            {coreValues.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white/60 border border-lavender-100 rounded-xl px-4 py-3 hover:border-lavender-300 hover:bg-lavender-50/50 transition-all duration-200 cursor-default"
              >
                <p className="text-plum-900 font-semibold text-sm mb-1">{v.label}</p>
                <p className="text-plum-700/50 text-xs font-light leading-relaxed italic">{v.why}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
