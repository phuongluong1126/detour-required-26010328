import { motion } from 'framer-motion'

export default function Closing() {
  return (
    <section
      className="relative py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #2d1b4e 0%, #1a0d2e 40%, #3d1528 100%)',
      }}
    >
      {/* Soft glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.08] blur-3xl pointer-events-none" style={{ background: '#a855f7' }} />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-[0.06] blur-3xl animate-float-slow pointer-events-none" style={{ background: '#ec4899' }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-[0.06] blur-3xl animate-float-mid pointer-events-none" style={{ background: '#a855f7' }} />

      {/* Sparkle dots */}
      {[
        { top: '15%', left: '10%',  d: '0s',   s: 4 },
        { top: '70%', left: '8%',   d: '1.2s', s: 3 },
        { top: '25%', right: '8%',  d: '0.7s', s: 5 },
        { top: '75%', right: '12%', d: '2.1s', s: 3 },
        { top: '50%', left: '20%',  d: '1.6s', s: 4 },
        { top: '20%', right: '22%', d: '0.4s', s: 3 },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: s.top, left: s.left, right: s.right,
            width: s.s, height: s.s,
            background: 'radial-gradient(circle, #f0abfc, #c084fc)',
            animation: `sparkle 3s ease-in-out ${s.d} infinite`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Label */}
          <p className="text-lavender-300/60 text-xs uppercase tracking-[0.3em] font-medium mb-10">
            Leadership Development Studies
          </p>

          {/* Big quote */}
          <div className="mb-10">
            <span className="text-7xl text-blush-400/20 font-display leading-none select-none">"</span>
            <p className="font-display text-2xl md:text-3xl text-white/90 font-light leading-relaxed -mt-5">
              I am not the loudest person in the room.{' '}
              <span className="bg-gradient-to-r from-lavender-300 to-blush-300 bg-clip-text text-transparent font-semibold italic">
                But I have learned that you do not need to be the loudest to matter.
              </span>{' '}
              You need to be{' '}
              <span className="text-blush-300 font-semibold italic">present, honest,</span>{' '}
              and willing to keep growing.
            </p>
            <span className="text-7xl text-blush-400/20 font-display leading-none select-none block -mt-4">"</span>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-lavender-400/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-lavender-400/60" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-lavender-400/40" />
          </div>

          {/* Sub quote */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/40 text-sm font-light italic mb-10 max-w-lg mx-auto leading-relaxed"
          >
            This portfolio is not a finished story. It is a current one — still being written, one deliberate step at a time.
          </motion.p>

          {/* LDS concepts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <p className="text-white/20 text-xs uppercase tracking-widest mb-4">LDS Concepts Applied</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'MBTI', 'Self-Awareness', 'Authentic Leadership',
                'Trust Formula', 'Emotional Intelligence',
                'Growth Mindset', 'Agile Leadership',
              ].map(c => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-full border border-white/10 text-white/30 text-xs hover:border-lavender-400/40 hover:text-lavender-300/70 transition-all cursor-default"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Gấu Bự — Chief Motivation Officer ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 flex flex-col items-center gap-4"
          >
            <div className="flex items-end justify-center gap-5">
              {/* Polaroid */}
              <div
                className="relative bg-white/90 p-2.5 pb-8 rounded shadow-2xl cursor-default select-none"
                style={{ transform: 'rotate(-3deg)', maxWidth: 190 }}
              >
                <img
                  src="/photos/anh5.jpg"
                  alt="Gau Bu yawning"
                  className="w-full rounded"
                  style={{ height: 150, objectFit: 'cover', objectPosition: 'center 30%' }}
                />
                <p className="absolute bottom-1.5 left-0 right-0 text-center text-plum-700/60 text-[9px] italic font-light">
                  Gau Bu · Chief Motivation Officer
                </p>
              </div>

              {/* Speech bubble */}
              <div className="relative mb-6">
                <div
                  className="px-4 py-3 rounded-2xl text-sm text-white/70 leading-relaxed italic max-w-[200px] text-left"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  "Are you sleepy?<br />Thank you for your<br />effort to read all ^^"
                  {/* Bubble tail */}
                  <div
                    className="absolute -left-2 bottom-4 w-0 h-0"
                    style={{
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      borderRight: '10px solid rgba(255,255,255,0.07)',
                    }}
                  />
                </div>
              </div>
            </div>
            <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
              The one who waited at home through all of this
            </p>
          </motion.div>

          {/* Back to top */}
          <motion.a
            href="#home"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-lavender-400/30 text-lavender-300 text-sm hover:bg-lavender-500/10 hover:border-lavender-400/60 transition-all duration-200 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to the beginning
          </motion.a>
        </motion.div>
      </div>

      {/* Footer line */}
      <div className="absolute bottom-0 left-0 right-0 py-4 border-t border-white/5">
        <p className="text-center text-white/20 text-xs">
          Individual Leadership Styles Exercise · Leadership Development Studies · MBA Program
        </p>
      </div>
    </section>
  )
}
