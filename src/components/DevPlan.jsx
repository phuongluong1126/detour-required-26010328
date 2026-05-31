import { motion } from 'framer-motion'
import { CheckCircle2, Circle, GraduationCap, Rocket, Target } from 'lucide-react'

const milestones = [
  {
    period: '2026 – mid 2027',
    title: 'Transition & Foundation',
    status: 'now',
    color: 'violet',
    tagline: 'Make the PM move real.',
    icon: Target,
    items: [
      {
        done: true,
        text: '50% through PM training at FPT — two months left to complete.',
        measure: 'Certificate in hand by mid-2026.',
      },
      {
        done: false,
        text: 'Land a PM or project coordinator role in a real project.',
        measure: 'I am actively contributing as PM/coordinator, not just a team member.',
      },
      {
        done: false,
        text: 'Reduce teaching hours to create focused space for the PM transition.',
        measure: 'Teaching is < 20% of my working week.',
      },
      {
        done: false,
        text: 'Practise faster decisions: frame the problem, give myself two days max, act.',
        measure: 'I can reflect on 3+ decisions I made without over-analysing.',
      },
      {
        done: false,
        text: 'Speak up earlier in team settings instead of waiting until I feel certain.',
        measure: 'I contribute a point before the midpoint of most meetings.',
      },
      {
        done: false,
        text: 'Get the most out of the MBA — absorb from teachers, learn from classmates, and build a real network.',
        measure: '',
      },
    ],
  },
  {
    period: 'mid 2027 – end 2027',
    title: 'MBA Completion',
    status: 'bridge',
    color: 'sage',
    tagline: 'Finish strong. Integrate everything.',
    icon: GraduationCap,
    items: [
      {
        done: false,
        text: 'Graduate from the MBA program.',
        measure: 'Degree received by end of 2027.',
      },
      {
        done: false,
        text: 'Complete a capstone or final project that bridges tech, people, and business strategy.',
        measure: 'Capstone outcome is something I am genuinely proud of.',
      },
      {
        done: false,
        text: 'Consolidate key lessons from MBA into my leadership practice.',
        measure: 'I can name 3 concrete changes in how I think or decide.',
      },
      {
        done: false,
        text: 'Actively seek mentors and peers I want to stay connected with beyond the program.',
        measure: 'At least 3 meaningful ongoing relationships from the MBA cohort.',
      },
    ],
  },
  {
    period: '2028 – 2030',
    title: 'Apply. Build. Lead.',
    status: 'next',
    color: 'blush',
    tagline: 'MBA is done. Now put it to work.',
    icon: Rocket,
    items: [
      {
        done: false,
        text: 'Lead or co-lead a cross-functional project — people, tech, and business goals together.',
        measure: 'I have owned a full project outcome from kickoff to delivery.',
      },
      {
        done: false,
        text: 'Identify a real problem worth solving at the intersection of tech and people.',
        measure: 'I can articulate the problem clearly and have tested at least one solution.',
      },
      {
        done: false,
        text: 'Build a network of mentors and peers in product, PM, and business.',
        measure: 'I have at least 5 people I can call on for honest feedback or support.',
      },
      {
        done: false,
        text: 'Develop conflict management and stakeholder communication skills.',
        measure: 'I have navigated at least one difficult stakeholder situation with a good outcome.',
      },
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

        {/* 70-20-10 framework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 bg-white/60 border border-lavender-100 rounded-2xl p-6"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <p className="text-xs text-plum-700/40 uppercase tracking-widest mb-4 font-medium text-center">70 · 20 · 10 Development Model</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { pct: '70%', label: 'Real Experience', desc: 'PM projects, coordination tasks, decision-making practice', color: 'text-lavender-500', bg: 'bg-lavender-50', border: 'border-lavender-200' },
              { pct: '20%', label: 'Learning from Others', desc: 'Mentor coaching, peer feedback, stakeholder reflection', color: 'text-blush-500', bg: 'bg-blush-50', border: 'border-blush-200' },
              { pct: '10%', label: 'Formal Learning', desc: 'PM training program, MBA coursework', color: 'text-sage-500', bg: 'bg-sage-50', border: 'border-sage-200' },
            ].map(item => (
              <div key={item.pct} className={`${item.bg} border ${item.border} rounded-xl p-4`}>
                <p className={`text-2xl font-black font-display ${item.color} mb-1`}>{item.pct}</p>
                <p className="text-plum-900 font-semibold text-xs mb-1">{item.label}</p>
                <p className="text-plum-700/50 text-xs font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-2 bottom-2 w-px bg-gradient-to-b from-lavender-300 via-sage-300 to-blush-300 opacity-60" />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const c = colorMap[m.color]
              const PhaseIcon = m.icon
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
                  <div className={`absolute left-4 md:left-6 top-1.5 w-5 h-5 rounded-full ${c.dot} ring-4 ${c.ring} flex items-center justify-center shadow-sm`}>
                    {m.status === 'now' && (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="card-light p-6 hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <PhaseIcon className={`w-4 h-4 ${c.text}`} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>{m.period}</span>
                      </div>
                      {m.status === 'now' && (
                        <span className={`tag-light ${c.tag} text-xs`}>Current Focus</span>
                      )}
                      {m.status === 'bridge' && (
                        <span className={`tag-light ${c.tag} text-xs`}>Bridge Phase</span>
                      )}
                    </div>
                    <h3 className="text-plum-900 font-bold text-lg mb-1 font-display">{m.title}</h3>
                    <p className="text-plum-700/50 text-sm italic mb-5 font-light">{m.tagline}</p>

                    <ul className="space-y-4">
                      {m.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          {item.done ? (
                            <CheckCircle2 className={`w-4 h-4 ${c.check} shrink-0 mt-0.5`} />
                          ) : (
                            <Circle className="w-4 h-4 text-plum-900/20 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className={`text-sm ${item.done ? 'text-plum-800' : 'text-plum-700/70'}`}>
                              {item.text}
                            </p>
                            {item.measure && (
                              <p className={`text-xs mt-1 ${c.text} opacity-70 font-light`}>
                                ✓ {item.measure}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Self-assessment card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 bg-white/60 border border-lavender-100 rounded-2xl p-6 md:p-8"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <p className="text-xs text-plum-700/40 uppercase tracking-widest mb-6 font-medium text-center">Quarterly Self-Assessment</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { q: 'What did I actually do this quarter?', hint: 'Concrete actions, not intentions.' },
              { q: 'Which gap am I making the least progress on?', hint: 'Be honest — this one needs more attention.' },
              { q: 'What will I do differently next quarter?', hint: 'One specific change, not a list.' },
              { q: 'Who gave me useful feedback recently?', hint: 'And did I act on it?' },
            ].map((item, i) => (
              <div key={i} className="bg-white/70 border border-lavender-100 rounded-xl p-4">
                <p className="text-plum-900 font-semibold text-sm mb-1">{item.q}</p>
                <p className="text-plum-700/40 text-xs italic font-light">{item.hint}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-plum-700/30 text-xs mt-5 font-light italic">
            A plan without review is just a wish list. Schedule 30 minutes each quarter.
          </p>
        </motion.div>

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
              className="bg-white p-3 pb-8 rounded-lg shadow-md relative group cursor-pointer"
              style={{ transform: 'rotate(2deg)', width: 180 }}
              onClick={() => window.__openLightbox?.({ src: '/photos/anh7.jpg', alt: 'Nam Cat Tien, 2025', caption: 'Not every plan goes on schedule. But as long as you know where you are and where you\'re heading — the rest is just time and steps forward.' })}
            >
              <img
                src="/photos/anh7.jpg"
                alt="Nam Cat Tien forest"
                className="w-full rounded transition-opacity duration-300 group-hover:opacity-70"
                style={{ height: 200, objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div className="absolute inset-3 bottom-8 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"
                style={{ background: 'rgba(20,8,44,0.45)', backdropFilter: 'blur(2px)' }}>
                <span className="text-lg">🔍</span>
                <p className="text-white text-[10px] font-semibold">Click to view</p>
              </div>
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
