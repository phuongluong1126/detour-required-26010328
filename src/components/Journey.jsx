import { motion } from 'framer-motion'
import { Code2, BookOpen, ClipboardList, GraduationCap } from 'lucide-react'

const roles = [
  {
    icon: Code2,
    chapter: '01',
    color: 'violet',
    title: 'Frontend Developer',
    type: 'Main career',
    imgPos: 'center center',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&q=80',
    description:
      'Where it all started. Software engineering degree, main income, most of my working hours. I enjoy problem-solving, building things that work, and thinking in systems.',
    lesson: 'Structured thinking & independent ownership',
    lessonDetail:
      'Taught me to break complex problems into manageable parts and take full ownership of my work. The challenge: learning to delegate and trust others to do things differently.',
  },
  {
    icon: BookOpen,
    chapter: '02',
    color: 'rose',
    title: 'Programming Teacher',
    type: 'Side income → Passion',
    imgPos: 'center top',
    img: '/photos/anh2.jpg',
    description:
      'Started at VUS when they launched a digital skills program for children. Needed the extra income — stayed because I genuinely started caring about the students.',
    lesson: 'Empathy & creating conditions for growth',
    lessonDetail:
      'Children do not learn from people they do not trust. That taught me more about psychological safety than any leadership book.',
  },
  {
    icon: ClipboardList,
    chapter: '03',
    color: 'blush',
    title: 'PM Training at FPT',
    type: 'Career transition',
    imgPos: 'center 55%',
    img: '/photos/anh1.jpg',
    description:
      'A deliberate step toward transitioning from developer to project manager. Currently 50% through — two months left. The goal is clear.',
    lesson: 'Coordination & the bigger picture',
    lessonDetail:
      "Showed me how much a project's success depends on coordination, not just individual execution. Changing how I think about my role in any team.",
  },
  {
    icon: GraduationCap,
    chapter: '04',
    color: 'sage',
    title: 'MBA Student',
    type: 'Broadening perspective',
    imgPos: 'center center',
    img: '/photos/mba_class.jpg',
    description:
      'About stepping back. Technical work keeps you focused on how. Business thinking forces you to ask why — why this project, for whom, what is the actual value.',
    lesson: 'Business thinking & long-term vision',
    lessonDetail:
      'Studying alongside people from different industries has expanded how I think about problems and what good leadership actually looks like.',
  },
]

const colorMap = {
  violet: {
    accent:  'text-lavender-500',
    bg:      'bg-lavender-50',
    border:  'border-lavender-200',
    lessonBg:'bg-lavender-50/80',
    dot:     'bg-lavender-400',
    tag:     'border-lavender-200 text-lavender-600 bg-lavender-50',
  },
  rose: {
    accent:  'text-rose-500',
    bg:      'bg-rose-50',
    border:  'border-rose-200',
    lessonBg:'bg-rose-50/80',
    dot:     'bg-rose-400',
    tag:     'border-rose-200 text-rose-600 bg-rose-50',
  },
  blush: {
    accent:  'text-blush-500',
    bg:      'bg-blush-50/70',
    border:  'border-blush-200',
    lessonBg:'bg-blush-50/80',
    dot:     'bg-blush-400',
    tag:     'border-blush-200 text-blush-600 bg-blush-50',
  },
  sage: {
    accent:  'text-sage-500',
    bg:      'bg-sage-50',
    border:  'border-sage-200',
    lessonBg:'bg-sage-50/80',
    dot:     'bg-sage-400',
    tag:     'border-sage-200 text-sage-600 bg-sage-50',
  },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}
const card = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Journey() {
  return (
    <section
      id="journey"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdfcff 0%, #fff0f6 60%, #fdf4ff 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-blush-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-lavender-100/40 blur-3xl pointer-events-none" />

      {/* Ambient chapter watermark */}
      <div
        className="absolute left-4 top-8 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(60px, 14vw, 160px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(236, 72, 153, 0.07)',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        01
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="chapter-label justify-center">Chapter One</p>
          <h2 className="section-title mb-4">
            Different Roles,{' '}
            <span className="text-gradient-rose">Different Lessons</span>
          </h2>
          <p className="mt-2 text-plum-700/60 max-w-xl mx-auto text-base font-light leading-relaxed">
            A career is rarely just one thing. Mine grew sideways — each experience teaching me something the others could not.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {roles.map((role) => {
            const c = colorMap[role.color]
            const Icon = role.icon
            return (
              <motion.div
                key={role.title}
                variants={card}
                className={`group card-light overflow-hidden hover:-translate-y-1`}
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden mb-5">
                  <img
                    src={role.img}
                    alt={role.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                    style={{ objectPosition: role.imgPos || 'center center' }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.bg.replace('bg-', 'from-').replace('/80','')}/80 via-transparent to-transparent`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

                  {/* Chapter badge */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${c.bg} ${c.border} border text-[10px] font-bold uppercase tracking-widest ${c.accent}`}>
                    {role.chapter}
                  </div>

                  {/* Type badge */}
                  <span className={`absolute top-3 right-3 tag-light ${c.tag} text-xs`}>
                    {role.type}
                  </span>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`p-2 rounded-xl ${c.bg} border ${c.border}`}>
                      <Icon className={`w-4 h-4 ${c.accent}`} />
                    </div>
                    <h3 className="text-plum-900 font-bold text-lg">{role.title}</h3>
                  </div>

                  <p className="text-plum-700/65 text-sm leading-relaxed mb-4">{role.description}</p>

                  {/* Lesson box */}
                  <div className={`rounded-xl p-4 ${c.lessonBg} border ${c.border}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${c.accent} mb-1.5`}>
                      Key Lesson
                    </p>
                    <p className="text-plum-800 text-sm font-semibold mb-1">{role.lesson}</p>
                    <p className="text-plum-700/60 text-xs leading-relaxed">{role.lessonDetail}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
