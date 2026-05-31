import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Chapter messages the cat shows as you scroll through ── */
const chapterData = [
  { id: 'home',    msg: null },
  { id: 'journey', msg: 'Four roads,\none direction.' },
  { id: 'self',    msg: 'Who are you,\nreally?' },
  { id: 'values',  msg: 'Lead with trust,\nnot authority.' },
  { id: 'gaps',    msg: 'Honest gaps\ngrow you.' },
  { id: 'plan',    msg: 'Step by step,\nforward.' },
]

/* ── 3D Cat built from Three.js primitives ── */
function Cat({ excited }) {
  const rootRef    = useRef()
  const headRef    = useRef()
  const tailRef    = useRef()
  const lEarRef    = useRef()
  const rEarRef    = useRef()
  const lEyeRef    = useRef()
  const rEyeRef    = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const spd = excited ? 2.0 : 1.1
    const amp = excited ? 0.16 : 0.09

    /* body bob */
    if (rootRef.current) rootRef.current.position.y = Math.sin(t * spd) * amp

    /* head gentle look */
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.55) * 0.18
      headRef.current.rotation.z = excited
        ? Math.sin(t * 2.8) * 0.1
        : Math.sin(t * 0.9) * 0.04
    }

    /* tail wag — faster when excited */
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * (excited ? 3.8 : 2.0)) * 0.38
    }

    /* ear flick every ~4 s */
    const flick = (t % 4) < 0.12 ? 1 : 0
    if (lEarRef.current) lEarRef.current.rotation.z = -0.2 + flick * -0.28
    if (rEarRef.current) rEarRef.current.rotation.z =  0.2 + flick *  0.28

    /* blink every ~5 s */
    const blink = (t % 5) < 0.10
    const eyeScaleY = blink ? 0.08 : 1
    if (lEyeRef.current) lEyeRef.current.scale.y = eyeScaleY
    if (rEyeRef.current) rEyeRef.current.scale.y = eyeScaleY
  })

  const body  = '#c4b5fd'   /* lavender */
  const deep  = '#7c3aed'   /* violet */
  const pink  = '#f9a8d4'   /* blush */
  const dark  = '#1a0d2e'   /* plum / eyes */

  return (
    <group ref={rootRef}>

      {/* ── Body ── */}
      <mesh position={[0, -0.32, 0]}>
        <sphereGeometry args={[0.50, 20, 20]} />
        <meshStandardMaterial color={body} roughness={0.3} metalness={0.04} />
      </mesh>

      {/* ── Head ── */}
      <group ref={headRef} position={[0, 0.34, 0]}>

        <mesh>
          <sphereGeometry args={[0.38, 20, 20]} />
          <meshStandardMaterial color={body} roughness={0.3} metalness={0.04} />
        </mesh>

        {/* ── Ears ── */}
        <group ref={lEarRef} position={[-0.20, 0.30, 0]} rotation={[0, 0, -0.2]}>
          <mesh>
            <coneGeometry args={[0.11, 0.23, 8]} />
            <meshStandardMaterial color={deep} />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <coneGeometry args={[0.063, 0.16, 8]} />
            <meshStandardMaterial color={pink} />
          </mesh>
        </group>

        <group ref={rEarRef} position={[0.20, 0.30, 0]} rotation={[0, 0, 0.2]}>
          <mesh>
            <coneGeometry args={[0.11, 0.23, 8]} />
            <meshStandardMaterial color={deep} />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <coneGeometry args={[0.063, 0.16, 8]} />
            <meshStandardMaterial color={pink} />
          </mesh>
        </group>

        {/* ── Eyes ── */}
        <group ref={lEyeRef} position={[-0.135, 0.055, 0.35]}>
          <mesh>
            <sphereGeometry args={[0.065, 10, 10]} />
            <meshStandardMaterial color={dark} />
          </mesh>
          {/* shine */}
          <mesh position={[-0.03, 0.028, 0.055]}>
            <sphereGeometry args={[0.022, 6, 6]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
          </mesh>
        </group>

        <group ref={rEyeRef} position={[0.135, 0.055, 0.35]}>
          <mesh>
            <sphereGeometry args={[0.065, 10, 10]} />
            <meshStandardMaterial color={dark} />
          </mesh>
          <mesh position={[0.03, 0.028, 0.055]}>
            <sphereGeometry args={[0.022, 6, 6]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
          </mesh>
        </group>

        {/* ── Nose ── */}
        <mesh position={[0, -0.038, 0.384]}>
          <sphereGeometry args={[0.036, 8, 8]} />
          <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.4} />
        </mesh>

        {/* ── Mouth (tiny arc) ── */}
        <mesh position={[-0.025, -0.085, 0.378]} rotation={[0, 0, 0.4]}>
          <torusGeometry args={[0.038, 0.011, 6, 12, Math.PI * 0.55]} />
          <meshStandardMaterial color={deep} />
        </mesh>
        <mesh position={[0.025, -0.085, 0.378]} rotation={[0, 0, Math.PI - 0.4]}>
          <torusGeometry args={[0.038, 0.011, 6, 12, Math.PI * 0.55]} />
          <meshStandardMaterial color={deep} />
        </mesh>

        {/* ── Cheek blushes ── */}
        <mesh position={[-0.22, -0.035, 0.29]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshStandardMaterial color={pink} transparent opacity={0.32} />
        </mesh>
        <mesh position={[0.22, -0.035, 0.29]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshStandardMaterial color={pink} transparent opacity={0.32} />
        </mesh>

        {/* ── Whiskers (thin box slivers) ── */}
        {/* Left upper */}
        <mesh position={[-0.30, -0.022, 0.36]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[0.19, 0.008, 0.007]} />
          <meshStandardMaterial color="#c4b5fd" transparent opacity={0.75} />
        </mesh>
        {/* Left lower */}
        <mesh position={[-0.30, -0.063, 0.36]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.19, 0.008, 0.007]} />
          <meshStandardMaterial color="#c4b5fd" transparent opacity={0.75} />
        </mesh>
        {/* Right upper */}
        <mesh position={[0.30, -0.022, 0.36]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.19, 0.008, 0.007]} />
          <meshStandardMaterial color="#c4b5fd" transparent opacity={0.75} />
        </mesh>
        {/* Right lower */}
        <mesh position={[0.30, -0.063, 0.36]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[0.19, 0.008, 0.007]} />
          <meshStandardMaterial color="#c4b5fd" transparent opacity={0.75} />
        </mesh>
      </group>

      {/* ── Tail ── */}
      <group ref={tailRef} position={[-0.36, -0.46, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.28, 0.052, 8, 22, Math.PI * 0.78]} />
          <meshStandardMaterial color={deep} roughness={0.2} />
        </mesh>
        {/* fluffy tip */}
        <mesh position={[0.195, 0.195, 0]}>
          <sphereGeometry args={[0.092, 10, 10]} />
          <meshStandardMaterial color={pink} roughness={0.25} />
        </mesh>
      </group>

      {/* ── Front paws ── */}
      <mesh position={[-0.19, -0.74, 0.20]}>
        <sphereGeometry args={[0.105, 10, 10]} />
        <meshStandardMaterial color={body} roughness={0.3} />
      </mesh>
      <mesh position={[0.19, -0.74, 0.20]}>
        <sphereGeometry args={[0.105, 10, 10]} />
        <meshStandardMaterial color={body} roughness={0.3} />
      </mesh>

    </group>
  )
}

/* ── Main StoryGuide overlay component ── */
export default function StoryGuide() {
  const [chapterIdx,  setChapterIdx]  = useState(0)
  const [showBubble,  setShowBubble]  = useState(false)
  const [bubbleMsg,   setBubbleMsg]   = useState('')
  const [minimized,   setMinimized]   = useState(false)
  const [pulsing,     setPulsing]     = useState(false)
  const prevIdx = useRef(-1)

  /* Greeting bubble after initial load */
  useEffect(() => {
    const t = setTimeout(() => {
      setBubbleMsg('Hi! I\'ll guide you\nthrough the story ✨')
      setShowBubble(true)
      setTimeout(() => setShowBubble(false), 3800)
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  /* Watch sections and show chapter messages */
  useEffect(() => {
    const observers = chapterData.map((ch, i) => {
      const el = document.getElementById(ch.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && i !== prevIdx.current) {
            prevIdx.current = i
            setChapterIdx(i)

            /* pulse the cat widget */
            setPulsing(true)
            setTimeout(() => setPulsing(false), 600)

            if (ch.msg) {
              setBubbleMsg(ch.msg)
              setShowBubble(true)
              setTimeout(() => setShowBubble(false), 3500)
            }
          }
        },
        { rootMargin: '-30% 0px -40% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const excited = chapterIdx > 0

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 select-none">

      {/* ── Speech bubble ── */}
      <AnimatePresence>
        {showBubble && !minimized && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 10, scale: 0.88 }}
            animate={{ opacity: 1, y: 0,  scale: 1.00 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[175px] px-3.5 py-2.5 rounded-2xl rounded-br-sm shadow-lg"
            style={{
              background: 'rgba(255,255,255,0.88)',
              border: '1px solid rgba(190,168,255,0.45)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <p className="text-plum-800 text-[11px] leading-relaxed font-light whitespace-pre-line">
              {bubbleMsg}
            </p>
            {/* bubble tail */}
            <div
              className="absolute -bottom-[7px] right-3.5 w-3.5 h-3.5 rotate-45"
              style={{
                background: 'rgba(255,255,255,0.88)',
                borderRight: '1px solid rgba(190,168,255,0.45)',
                borderBottom: '1px solid rgba(190,168,255,0.45)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cat widget ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Minimize toggle */}
        <button
          onClick={() => setMinimized(m => !m)}
          className="absolute -top-2 -left-2 z-10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200 hover:scale-110"
          style={{
            background: 'rgba(245,240,255,0.9)',
            border: '1px solid rgba(190,168,255,0.6)',
            color: '#8b5cf6',
          }}
          aria-label={minimized ? 'Show story guide' : 'Hide story guide'}
        >
          {minimized ? '+' : '−'}
        </button>

        <AnimatePresence mode="wait">
          {!minimized ? (
            <motion.div
              key="cat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: pulsing ? [1, 1.08, 1] : 1,
                opacity: 1,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: pulsing ? 0.5 : 0.3 }}
              className="cursor-pointer"
              onClick={() => {
                const msg = chapterData[chapterIdx]?.msg || 'Keep scrolling...'
                setBubbleMsg(msg)
                setShowBubble(true)
                setTimeout(() => setShowBubble(false), 3500)
              }}
              title="Click me!"
              style={{
                width: 118,
                height: 138,
                borderRadius: 20,
                overflow: 'hidden',
                background:
                  'linear-gradient(160deg, rgba(245,240,255,0.85) 0%, rgba(255,240,246,0.85) 100%)',
                border: '1px solid rgba(190,168,255,0.5)',
                boxShadow: '0 8px 28px rgba(139,92,246,0.18), 0 2px 8px rgba(139,92,246,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Canvas
                camera={{ position: [0, 0, 4.0], fov: 40 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true }}
              >
                <ambientLight intensity={1.6} />
                <directionalLight position={[3, 5, 4]}  intensity={1.6} color="#f0abfc" />
                <directionalLight position={[-3, -2, -2]} intensity={0.5} color="#c4b5fd" />
                <pointLight       position={[0, 3, 2]}   intensity={1.4} color="#fdf4ff" />
                <pointLight       position={[2, -2, 1]}  intensity={0.8} color="#f9a8d4" />

                <Suspense fallback={null}>
                  <Float speed={1.5} floatIntensity={0.45} rotationIntensity={0.1}>
                    <Cat excited={excited} />
                  </Float>
                </Suspense>
              </Canvas>
            </motion.div>
          ) : (
            /* minimized pill */
            <motion.button
              key="pill"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setMinimized(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-xl cursor-pointer hover:scale-110 transition-transform"
              style={{
                background: 'rgba(245,240,255,0.9)',
                border: '1px solid rgba(190,168,255,0.55)',
                boxShadow: '0 4px 16px rgba(139,92,246,0.2)',
              }}
              aria-label="Show story guide"
            >
              🐱
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
