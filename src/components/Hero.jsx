import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Cat } from './ChapterReveal'

const PROFILE_IMG = '/photos/profile.jpg'
const roles = ['Frontend Developer', 'Programming Teacher', 'PM Trainee', 'MBA Student']

const sparkles = [
  { top: '18%', left: '8%',   delay: '0s',   size: 5 },
  { top: '72%', left: '5%',   delay: '1.2s', size: 4 },
  { top: '35%', right: '7%',  delay: '0.7s', size: 6 },
  { top: '80%', right: '12%', delay: '2s',   size: 4 },
  { top: '55%', left: '15%',  delay: '1.6s', size: 5 },
  { top: '15%', right: '18%', delay: '0.4s', size: 4 },
  { top: '90%', left: '40%',  delay: '2.4s', size: 3 },
]

const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: `${(i * 47 + 5) % 95}%`,
  y: `${(i * 31 + 10) % 90}%`,
  size: 1 + (i % 3),
  delay: `${(i * 0.4) % 4}s`,
  dur:   `${7 + (i % 5)}s`,
}))

/* ── Letter-by-letter title reveal ── */
function LetterReveal({ text, delay = 0, className = '' }) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 56, rotateX: -80 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

/* ─────────────────────────────────────────────────
   HERO CONSTELLATION
   Dark "portal" panel — cat narrator at centre,
   four career roles as glowing nodes at the corners,
   connected by animated gradient bridge lines.
   SVG coordinate space: 600 × 500
   Cat centre: (300, 255)
───────────────────────────────────────────────── */
const SVG_W = 600, SVG_H = 500
const CAT_X = 300, CAT_Y = 255

const NODES = [
  { label: 'Frontend Dev', sub: 'My Craft',   sx: 88,  sy: 78,  color: '#a78bfa', delay: 1.0 },
  { label: 'Teacher',      sub: 'My Heart',   sx: 512, sy: 78,  color: '#f9a8d4', delay: 1.2 },
  { label: 'PM Trainee',   sub: 'My Future',  sx: 512, sy: 422, color: '#fcd34d', delay: 1.4 },
  { label: 'MBA Student',  sub: 'My Vision',  sx: 88,  sy: 422, color: '#6ee7b7', delay: 1.6 },
]

const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: `${(i * 71 + 8) % 94}%`,
  y: `${(i * 43 + 6) % 92}%`,
  size: 1 + (i % 2),
  opacity: 0.12 + (i % 5) * 0.06,
  anim: `sparkle ${3 + (i % 3)}s ease-in-out ${((i * 0.37) % 3.5).toFixed(1)}s infinite`,
}))

function HeroConstellation() {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 130% 110% at 50% 45%, #1c0842 0%, #08011c 100%)',
      }}
    >
      {/* Inset glow border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: '0 0 0 1px rgba(167,127,245,0.20), inset 0 1px 0 rgba(196,181,253,0.09)',
        }}
      />

      {/* Ambient glow behind cat */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '58%', height: '58%',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.30) 0%, transparent 65%)',
          filter: 'blur(44px)',
        }}
      />

      {/* Background stars */}
      {STARS.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: s.x, top: s.y,
            width: s.size, height: s.size,
            background: '#c4b5fd',
            opacity: s.opacity,
            animation: s.anim,
          }}
        />
      ))}

      {/* SVG bridge lines — drawn from cat outward */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width="100%" height="100%"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="none"
      >
        <defs>
          {NODES.map((n, i) => (
            <linearGradient
              key={i}
              id={`hg${i}`}
              x1={CAT_X} y1={CAT_Y}
              x2={n.sx} y2={n.sy}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor={n.color} stopOpacity="0.00" />
              <stop offset="35%"  stopColor={n.color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.55" />
            </linearGradient>
          ))}
        </defs>
        {NODES.map((node, i) => (
          <motion.path
            key={i}
            d={`M ${CAT_X} ${CAT_Y} L ${node.sx} ${node.sy}`}
            stroke={`url(#hg${i})`}
            strokeWidth={1.6}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: node.delay, duration: 0.90, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>

      {/* 3D cat — fixed 200×240 canvas, centred */}
      <motion.div
        initial={{ opacity: 0, scale: 0.70, y: 16 }}
        animate={{ opacity: 1, scale: 1.00, y: 0 }}
        transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top:  `${(CAT_Y / SVG_H) * 100}%`,
          left: `${(CAT_X / SVG_W) * 100}%`,
          width: 200,
          height: 240,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1.6} />
          <directionalLight position={[3, 5, 4]}   intensity={2.0} color="#f0abfc" />
          <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#c4b5fd" />
          <pointLight       position={[0, 3, 2]}    intensity={1.5} color="#fdf4ff" />
          <pointLight       position={[2, -2, 1]}   intensity={0.8} color="#f9a8d4" />
          <Suspense fallback={null}>
            <Float speed={1.4} floatIntensity={0.55} rotationIntensity={0.08}>
              <Cat emotion="welcome" />
            </Float>
          </Suspense>
        </Canvas>

        {/* Boby speech bubble above head */}
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: -10,
            left: '50%',
            transform: 'translateX(-55%)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(196,181,253,0.28)',
              backdropFilter: 'blur(12px)',
              borderRadius: 16,
              padding: '8px 14px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.6)', marginBottom: 3 }}>
              Boby · Your guide
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              Hi! I'm <strong style={{ color: '#c4b5fd' }}>Boby</strong>, Phượng's assistant.
            </p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginTop: 2 }}>
              Let's explore her journey ✨
            </p>
            {/* Tail pointing down */}
            <div style={{
              position: 'absolute',
              bottom: -9,
              left: '55%',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '9px solid rgba(255,255,255,0.08)',
            }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Role nodes */}
      {NODES.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: node.delay + 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.12 }}
          className="absolute flex flex-col items-center gap-1.5 cursor-default select-none"
          style={{
            left: `${(node.sx / SVG_W) * 100}%`,
            top:  `${(node.sy / SVG_H) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Pulsing glow dot */}
          <div className="relative flex items-center justify-center" style={{ width: 18, height: 18 }}>
            <motion.div
              animate={{ scale: [1, 2.4, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: i * 0.65, ease: 'easeInOut' }}
              className="absolute rounded-full"
              style={{ width: 10, height: 10, background: node.color }}
            />
            <div
              className="rounded-full relative z-10"
              style={{
                width: 9, height: 9,
                background: node.color,
                boxShadow: `0 0 14px 4px ${node.color}55`,
              }}
            />
          </div>

          {/* Label chip */}
          <div
            className="px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{
              fontSize: '8.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              background: `${node.color}14`,
              border: `1px solid ${node.color}45`,
              color: node.color,
              textShadow: `0 0 8px ${node.color}77`,
            }}
          >
            {node.label}
          </div>

          {/* Sub-label */}
          <span
            style={{
              fontSize: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.22)',
            }}
          >
            {node.sub}
          </span>
        </motion.div>
      ))}

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-3 left-0 right-0 text-center pointer-events-none"
        style={{
          fontSize: '8px',
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          color: 'rgba(196,181,253,0.22)',
        }}
      >
        One journey · Four bridges
      </motion.p>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 100% at 60% 40%, #f3e8ff 0%, #fdf4ff 40%, #fdfcff 100%)',
      }}
    >
      {/* Soft background blobs */}
      <div className="absolute top-0 right-0 w-[55vw] h-[55vw] rounded-full bg-lavender-100/60 blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-blush-100/50 blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      {/* Ambient particle field */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: p.id % 3 === 0 ? '#c084fc' : p.id % 3 === 1 ? '#bea8ff' : '#f9a8d4',
            opacity: 0.25,
            animation: `float ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      {/* Sparkle dots */}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: s.top, left: s.left, right: s.right,
            width: s.size, height: s.size,
            background: 'radial-gradient(circle, #f0abfc, #a855f7)',
            animation: `sparkle 3s ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      {/* Ambient "00" watermark */}
      <div
        className="absolute right-8 bottom-12 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(80px, 18vw, 200px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(139, 92, 246, 0.07)',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        00
      </div>

      {/* ── Layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 py-24 lg:py-0 min-h-screen">

        {/* Left — text */}
        <div className="w-full lg:w-[44%] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

          {/* Story opening label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-lavender-400" />
            <div className="flex items-center gap-3">
              <div className="w-20 h-28 rounded-2xl overflow-hidden ring-2 ring-lavender-300/60 shrink-0 shadow-md">
                <img src={PROFILE_IMG} alt="Phoebe" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <p className="text-sm font-semibold text-plum-900 tracking-tight">Lương Kim Phượng</p>
                <p className="text-[10px] text-plum-700/40 tracking-wide">Student ID: 26010328</p>
              </div>
            </div>
          </motion.div>

          {/* Big animated title — letter by letter */}
          <div
            className="font-display font-bold leading-none mb-4"
            style={{ fontSize: 'clamp(52px, 9vw, 96px)', perspective: '800px' }}
          >
            <div className="block overflow-visible">
              <LetterReveal text="Detour" delay={0.3} className="text-plum-900" />
            </div>
            <div className="block overflow-visible">
              <LetterReveal text="Required" delay={0.65} className="text-gradient-violet" />
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="text-plum-700/60 text-lg md:text-xl italic font-light mb-8 max-w-md leading-relaxed"
          >
            Not every path is a straight line. Sometimes the detours are exactly where the real lessons are.
          </motion.p>

          {/* Role chips */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10">
            {roles.map((role, i) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                className="px-4 py-1.5 rounded-full border border-lavender-200 text-plum-700 text-sm bg-white/60 hover:bg-lavender-50 hover:border-lavender-400 transition-all duration-200 cursor-default"
              >
                {role}
              </motion.span>
            ))}
          </div>

          {/* Animated scroll CTA */}
          <motion.a
            href="#journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="flex flex-col items-center lg:items-start gap-2 text-lavender-500 hover:text-lavender-700 transition-colors group"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">
              Read the story
            </span>
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.18, ease: 'easeInOut' }}
                  className="w-1 h-1 rounded-full bg-lavender-400"
                />
              ))}
            </div>
          </motion.a>
        </div>

        {/* Right — constellation portal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[54%] h-[55vw] max-h-[560px] min-h-[340px] order-1 lg:order-2"
        >
          <HeroConstellation />
        </motion.div>
      </div>

      {/* Bottom page-turn fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-cream-50 to-transparent pointer-events-none" />
    </section>
  )
}
