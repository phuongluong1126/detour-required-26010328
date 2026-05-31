import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────
   SCENE CONFIG — one entry per chapter (0-4)
   plus a prologue entry at index -1 (handled separately)
───────────────────────────────────────────── */
const SCENES = [
  {
    number:   'One',
    title:    'Different Roles,\nDifferent Lessons',
    quote:    'Four roads.\nOne direction.',
    emotion:  'curious',
    glow1:    'rgba(139,92,246,0.30)',
    glow2:    'rgba(236,72,153,0.18)',
    particle: '#c4b5fd',
    accent:   '#a07ff5',
    bg:       'radial-gradient(ellipse 90% 70% at 40% 50%, rgba(28,8,56,0.98) 0%, rgba(6,1,18,0.99) 100%)',
  },
  {
    number:   'Two',
    title:    'Know Thyself',
    quote:    'Who are you,\nreally?',
    emotion:  'thoughtful',
    glow1:    'rgba(99,102,241,0.28)',
    glow2:    'rgba(139,92,246,0.22)',
    particle: '#a5b4fc',
    accent:   '#818cf8',
    bg:       'radial-gradient(ellipse 90% 70% at 60% 50%, rgba(14,6,40,0.98) 0%, rgba(4,2,14,0.99) 100%)',
  },
  {
    number:   'Three',
    title:    'What I Believe\nAbout Leadership',
    quote:    'Lead through trust,\nnot title.',
    emotion:  'proud',
    glow1:    'rgba(52,211,153,0.24)',
    glow2:    'rgba(139,92,246,0.20)',
    particle: '#6ee7b7',
    accent:   '#34d399',
    bg:       'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(4,20,16,0.98) 0%, rgba(2,8,6,0.99) 100%)',
  },
  {
    number:   'Four',
    title:    'Where I Still\nNeed to Grow',
    quote:    'Honesty is where\ngrowth begins.',
    emotion:  'humble',
    glow1:    'rgba(251,191,36,0.22)',
    glow2:    'rgba(249,115,22,0.16)',
    particle: '#fde68a',
    accent:   '#f59e0b',
    bg:       'radial-gradient(ellipse 90% 70% at 50% 55%, rgba(20,10,2,0.98) 0%, rgba(8,4,1,0.99) 100%)',
  },
  {
    number:   'Five',
    title:    'My Development\nPlan',
    quote:    'Step by step,\nforward.',
    emotion:  'determined',
    glow1:    'rgba(139,92,246,0.35)',
    glow2:    'rgba(244,114,182,0.24)',
    particle: '#f9a8d4',
    accent:   '#ec4899',
    bg:       'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(28,6,24,0.98) 0%, rgba(8,2,10,0.99) 100%)',
  },
]

/* ─────────────────────────────────────────────
   EMOTION ANIMATION PARAMS
───────────────────────────────────────────── */
const EMO = {
  curious:    { bob: 0.12, bobS: 1.4, swayY: 0.22, swayS: 0.55, tilt: 0.06, tail: 2.2 },
  thoughtful: { bob: 0.07, bobS: 0.8, swayY: 0.14, swayS: 0.38, tilt: 0.14, tail: 1.5 },
  proud:      { bob: 0.09, bobS: 0.9, swayY: 0.05, swayS: 0.28, tilt: 0.02, tail: 1.8 },
  humble:     { bob: 0.06, bobS: 0.85, swayY: 0.17, swayS: 0.44, tilt: 0.11, tail: 1.2 },
  determined: { bob: 0.15, bobS: 1.9, swayY: 0.10, swayS: 0.65, tilt: 0.04, tail: 3.2 },
  welcome:    { bob: 0.11, bobS: 1.2, swayY: 0.20, swayS: 0.50, tilt: 0.07, tail: 2.5 },
}

/* ─────────────────────────────────────────────
   3-D CAT — built from Three.js primitives
───────────────────────────────────────────── */
export function Cat({ emotion = 'curious' }) {
  const e = EMO[emotion] || EMO.curious
  const rootRef = useRef(), headRef = useRef(), tailRef = useRef()
  const lEarRef = useRef(), rEarRef = useRef()
  const lEyeRef = useRef(), rEyeRef = useRef()

  useFrame(({ clock: { elapsedTime: t } }) => {
    if (rootRef.current)
      rootRef.current.position.y = Math.sin(t * e.bobS) * e.bob

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * e.swayS) * e.swayY
      headRef.current.rotation.z = Math.sin(t * 0.78) * e.tilt
    }

    if (tailRef.current)
      tailRef.current.rotation.z = Math.sin(t * e.tail) * 0.40

    const flick = (t % 4) < 0.13
    if (lEarRef.current) lEarRef.current.rotation.z = -0.2 - (flick ? 0.30 : 0)
    if (rEarRef.current) rEarRef.current.rotation.z =  0.2 + (flick ? 0.30 : 0)

    const blink = (t % 5) < 0.11
    if (lEyeRef.current) lEyeRef.current.scale.y = blink ? 0.07 : 1
    if (rEyeRef.current) rEyeRef.current.scale.y = blink ? 0.07 : 1
  })

  const B = '#c4b5fd', D = '#7c3aed', P = '#f9a8d4', K = '#1a0d2e'

  return (
    <group ref={rootRef}>

      {/* body */}
      <mesh position={[0, -0.32, 0]}>
        <sphereGeometry args={[0.50, 22, 22]} />
        <meshStandardMaterial color={B} roughness={0.22} metalness={0.07} />
      </mesh>

      {/* head + face */}
      <group ref={headRef} position={[0, 0.34, 0]}>
        <mesh>
          <sphereGeometry args={[0.38, 22, 22]} />
          <meshStandardMaterial color={B} roughness={0.22} metalness={0.07} />
        </mesh>

        {/* ears */}
        <group ref={lEarRef} position={[-0.20, 0.30, 0]} rotation={[0, 0, -0.2]}>
          <mesh><coneGeometry args={[0.11, 0.23, 8]} />
            <meshStandardMaterial color={D} /></mesh>
          <mesh position={[0, 0, 0.05]}><coneGeometry args={[0.063, 0.16, 8]} />
            <meshStandardMaterial color={P} /></mesh>
        </group>
        <group ref={rEarRef} position={[0.20, 0.30, 0]} rotation={[0, 0, 0.2]}>
          <mesh><coneGeometry args={[0.11, 0.23, 8]} />
            <meshStandardMaterial color={D} /></mesh>
          <mesh position={[0, 0, 0.05]}><coneGeometry args={[0.063, 0.16, 8]} />
            <meshStandardMaterial color={P} /></mesh>
        </group>

        {/* eyes */}
        <group ref={lEyeRef} position={[-0.135, 0.055, 0.35]}>
          <mesh><sphereGeometry args={[0.066, 12, 12]} />
            <meshStandardMaterial color={K} /></mesh>
          <mesh position={[-0.03, 0.03, 0.055]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2.5} />
          </mesh>
        </group>
        <group ref={rEyeRef} position={[0.135, 0.055, 0.35]}>
          <mesh><sphereGeometry args={[0.066, 12, 12]} />
            <meshStandardMaterial color={K} /></mesh>
          <mesh position={[0.03, 0.03, 0.055]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2.5} />
          </mesh>
        </group>

        {/* nose */}
        <mesh position={[0, -0.038, 0.385]}>
          <sphereGeometry args={[0.036, 10, 10]} />
          <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.5} />
        </mesh>

        {/* mouth — two tiny arcs */}
        <mesh position={[-0.026, -0.087, 0.378]} rotation={[0, 0, 0.42]}>
          <torusGeometry args={[0.037, 0.011, 6, 14, Math.PI * 0.55]} />
          <meshStandardMaterial color={D} />
        </mesh>
        <mesh position={[0.026, -0.087, 0.378]} rotation={[0, 0, Math.PI - 0.42]}>
          <torusGeometry args={[0.037, 0.011, 6, 14, Math.PI * 0.55]} />
          <meshStandardMaterial color={D} />
        </mesh>

        {/* cheek blushes */}
        <mesh position={[-0.22, -0.034, 0.29]}>
          <sphereGeometry args={[0.072, 10, 10]} />
          <meshStandardMaterial color={P} transparent opacity={0.33} />
        </mesh>
        <mesh position={[0.22, -0.034, 0.29]}>
          <sphereGeometry args={[0.072, 10, 10]} />
          <meshStandardMaterial color={P} transparent opacity={0.33} />
        </mesh>

        {/* whiskers — thin box slivers */}
        {[
          [-0.30, -0.021,  0.08],
          [-0.30, -0.064, -0.08],
          [ 0.30, -0.021, -0.08],
          [ 0.30, -0.064,  0.08],
        ].map(([x, y, rz], i) => (
          <mesh key={i} position={[x, y, 0.36]} rotation={[0, 0, rz]}>
            <boxGeometry args={[0.195, 0.008, 0.007]} />
            <meshStandardMaterial color="#c4b5fd" transparent opacity={0.72} />
          </mesh>
        ))}
      </group>

      {/* tail */}
      <group ref={tailRef} position={[-0.36, -0.46, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.28, 0.053, 8, 24, Math.PI * 0.78]} />
          <meshStandardMaterial color={D} roughness={0.18} />
        </mesh>
        <mesh position={[0.195, 0.195, 0]}>
          <sphereGeometry args={[0.093, 10, 10]} />
          <meshStandardMaterial color={P} roughness={0.22} />
        </mesh>
      </group>

      {/* paws */}
      <mesh position={[-0.19, -0.74, 0.20]}>
        <sphereGeometry args={[0.106, 12, 12]} />
        <meshStandardMaterial color={B} roughness={0.3} />
      </mesh>
      <mesh position={[0.19, -0.74, 0.20]}>
        <sphereGeometry args={[0.106, 12, 12]} />
        <meshStandardMaterial color={B} roughness={0.3} />
      </mesh>
    </group>
  )
}

/* ─────────────────────────────────────────────
   SHARED CAT CANVAS — reused in all scenes
───────────────────────────────────────────── */
function CatCanvas({ emotion, width = 240, height = 280 }) {
  return (
    <div style={{ width, height, flexShrink: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 4.0], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[3, 5, 4]}  intensity={2.0} color="#f0abfc" />
        <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#c4b5fd" />
        <pointLight position={[0, 3, 2]}  intensity={1.5} color="#fdf4ff" />
        <pointLight position={[2, -2, 1]} intensity={0.8} color="#f9a8d4" />
        <Suspense fallback={null}>
          <Float speed={1.4} floatIntensity={0.58} rotationIntensity={0.10}>
            <Cat emotion={emotion} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CHAPTER SCENE OVERLAY
───────────────────────────────────────────── */
function SceneOverlay({ scene, onDismiss }) {
  const rings = [200, 320, 450, 580, 720, 860]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } }}
      transition={{ duration: 0.32 }}
      className="absolute inset-0 z-[90] overflow-hidden flex items-center justify-center cursor-pointer"
      style={{ background: scene.bg }}
      onClick={onDismiss}
    >
      {/* Depth glow orbs */}
      <div className="absolute pointer-events-none"
        style={{
          top: '15%', left: '10%', width: 560, height: 440,
          background: `radial-gradient(ellipse, ${scene.glow1} 0%, transparent 65%)`,
          filter: 'blur(72px)',
        }}
      />
      <div className="absolute pointer-events-none"
        style={{
          bottom: '12%', right: '8%', width: 420, height: 360,
          background: `radial-gradient(ellipse, ${scene.glow2} 0%, transparent 65%)`,
          filter: 'blur(55px)',
        }}
      />

      {/* Concentric rings — atmospheric backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {rings.map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size, height: size,
              border: `1px solid ${scene.particle}`,
              opacity: 0.03 + i * 0.01,
            }}
          />
        ))}
      </div>

      {/* Floating micro-particles */}
      {Array.from({ length: 22 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left:   `${(i * 53 + 6) % 94}%`,
            top:    `${(i * 37 + 8) % 90}%`,
            width:  1 + (i % 3),
            height: 1 + (i % 3),
            background: scene.particle,
            opacity: 0.10 + (i % 5) * 0.06,
            animation: `float ${5 + (i % 4)}s ease-in-out ${(i * 0.41) % 3.5}s infinite`,
          }}
        />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-14 px-8 max-w-5xl w-full">

        {/* Cat — enters from left */}
        <motion.div
          initial={{ x: -70, opacity: 0, scale: 0.80 }}
          animate={{ x:  0,  opacity: 1, scale: 1.00 }}
          exit={{    x: -45, opacity: 0, scale: 0.88 }}
          transition={{ delay: 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <CatCanvas emotion={scene.emotion} width={240} height={278} />
        </motion.div>

        {/* Text — staggered reveal */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md">

          {/* Chapter label */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.30, duration: 0.45 }}
            className="text-[10px] font-bold uppercase tracking-[0.42em] mb-4"
            style={{ color: scene.particle, opacity: 0.7 }}
          >
            Chapter&nbsp;{scene.number}
          </motion.p>

          {/* Chapter title — large serif */}
          <motion.h2
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0,  scale: 1.00 }}
            exit={{    opacity: 0, y: -16 }}
            transition={{ delay: 0.42, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white leading-tight mb-6 whitespace-pre-line"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 3.8rem)' }}
          >
            {scene.title}
          </motion.h2>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.60, duration: 0.60, ease: [0.22, 1, 0.36, 1] }}
            className="h-px mb-5"
            style={{
              width: 60,
              background: `linear-gradient(90deg, ${scene.accent}, transparent)`,
              transformOrigin: 'left',
            }}
          />

          {/* Cat's quote */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.74, duration: 0.55 }}
            className="italic font-light leading-relaxed whitespace-pre-line"
            style={{
              color: 'rgba(255,255,255,0.50)',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.15rem)',
            }}
          >
            {scene.quote}
          </motion.p>
        </div>
      </div>

      {/* Timer progress bar — burns down over the display duration */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 3.4, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, ${scene.accent}, ${scene.particle})`,
          transformOrigin: 'left',
        }}
      />

      {/* Tap hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 right-6 text-[10px] uppercase tracking-[0.22em]"
        style={{ color: 'rgba(255,255,255,0.20)' }}
      >
        tap to skip
      </motion.p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   PROLOGUE SCENE — fires once on page load
   (exported so App.jsx can use it)
───────────────────────────────────────────── */
export function PrologueScene({ onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeIn' } }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] overflow-hidden flex items-center justify-center cursor-pointer"
      style={{
        background:
          'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(20,6,44,0.99) 0%, rgba(4,1,12,1) 100%)',
      }}
      onClick={onDismiss}
    >
      {/* Deep glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '20%', width: 700, height: 500,
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.22) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '15%', right: '18%', width: 500, height: 380,
          background: 'radial-gradient(ellipse, rgba(236,72,153,0.16) 0%, transparent 65%)',
          filter: 'blur(65px)',
        }}
      />

      {/* Concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[180, 320, 470, 630, 800, 980].map((size, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.03 + i * 0.008 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 1.0 }}
            className="absolute rounded-full"
            style={{ width: size, height: size, border: '1px solid #c4b5fd' }}
          />
        ))}
      </div>

      {/* Particles */}
      {Array.from({ length: 26 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left:   `${(i * 53 + 6) % 94}%`,
            top:    `${(i * 37 + 8) % 90}%`,
            width:  1 + (i % 3),
            height: 1 + (i % 3),
            background: i % 2 === 0 ? '#c4b5fd' : '#f9a8d4',
            opacity: 0.10 + (i % 5) * 0.06,
            animation: `float ${5 + (i % 5)}s ease-in-out ${(i * 0.38) % 4}s infinite`,
          }}
        />
      ))}

      {/* Layout: cat left + book title right */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-20 px-8 max-w-5xl w-full">

        {/* Big cat — the narrator appears */}
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.75 }}
          animate={{ y: 0,  opacity: 1, scale: 1.00 }}
          transition={{ delay: 0.25, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <CatCanvas emotion="welcome" width={280} height={330} />
        </motion.div>

        {/* Book-cover text */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.50, duration: 0.5 }}
            className="text-lavender-300/50 text-[10px] font-bold uppercase tracking-[0.45em] mb-5"
          >
            Leadership Development Studies
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.90 }}
            animate={{ opacity: 1, y: 0,  scale: 1.00 }}
            transition={{ delay: 0.62, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white leading-none mb-3"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
          >
            Detour
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.90 }}
            animate={{ opacity: 1, y: 0,  scale: 1.00 }}
            transition={{ delay: 0.80, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-none mb-8"
            style={{
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              background: 'linear-gradient(135deg, #a07ff5 0%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Required
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="h-px mb-6 origin-left"
            style={{
              width: 64,
              background: 'linear-gradient(90deg, #a07ff5, transparent)',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.55 }}
            className="italic font-light leading-relaxed mb-8"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.05rem' }}
          >
            Not every path is a straight line.<br />
            Sometimes the detours are exactly<br />
            where the real lessons are.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
            transition={{ delay: 1.5, duration: 1.8, repeat: Infinity }}
            className="text-[10px] uppercase tracking-[0.35em]"
            style={{ color: '#c4b5fd' }}
          >
            Scroll down to begin
          </motion.p>
        </div>
      </div>

      {/* Timer bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 4.5, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, #a07ff5, #f472b6)',
          transformOrigin: 'left',
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 right-6 text-[10px] uppercase tracking-[0.22em]"
        style={{ color: 'rgba(255,255,255,0.18)' }}
      >
        tap to skip
      </motion.p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   CHAPTER REVEAL — wraps each content section
───────────────────────────────────────────── */
export default function ChapterReveal({ chapterIndex, children }) {
  const [show, setShow] = useState(false)
  const ref = useRef(null)
  const revealed = useRef(false)
  const scene = SCENES[chapterIndex]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35 && !revealed.current) {
          revealed.current = true
          setShow(true)
          setTimeout(() => setShow(false), 3600)
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="story-chapter relative">
      <AnimatePresence>
        {show && (
          <SceneOverlay
            key="scene"
            scene={scene}
            onDismiss={() => setShow(false)}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  )
}
