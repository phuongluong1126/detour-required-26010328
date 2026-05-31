import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

const chapters = [
  { id: 'home',    label: 'Prologue'      },
  { id: 'journey', label: 'The Journey'   },
  { id: 'self',    label: 'Know Thyself'  },
  { id: 'values',  label: 'Beliefs'       },
  { id: 'gaps',    label: 'Growth'        },
  { id: 'plan',    label: "What's Next"   },
]

export default function StoryProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const [active, setActive] = useState('home')
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const observers = chapters.map(ch => {
      const el = document.getElementById(ch.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(ch.id) },
        { rootMargin: '-30% 0px -50% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <>
      {/* Top scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-lavender-100/40 z-[100]">
        <motion.div
          style={{ scaleX, transformOrigin: '0%' }}
          className="h-full bg-gradient-to-r from-lavender-400 via-blush-400 to-lavender-500"
        />
      </div>

      {/* Right-side chapter dot navigation */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-5 items-end">
        {chapters.map((ch) => {
          const isActive = active === ch.id
          const isHov = hovered === ch.id

          return (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              onMouseEnter={() => setHovered(ch.id)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center gap-2.5 group"
              aria-label={ch.label}
            >
              {/* Label — appears on active or hover */}
              <AnimatePresence>
                {(isHov || isActive) && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.18 }}
                    className={`text-[9px] font-bold uppercase tracking-[0.18em] select-none ${
                      isActive ? 'text-lavender-600' : 'text-plum-700/40'
                    }`}
                  >
                    {ch.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Dot */}
              <div className="relative flex items-center justify-center w-5 h-5">
                <motion.div
                  animate={{
                    width:  isActive ? 9 : isHov ? 7 : 5,
                    height: isActive ? 9 : isHov ? 7 : 5,
                    backgroundColor: isActive ? '#8b5cf6' : isHov ? '#a07ff5' : '#d8caff',
                  }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="rounded-full"
                />
                {isActive && (
                  <motion.div
                    layoutId="activeRing"
                    className="absolute w-4 h-4 rounded-full border border-lavender-400/60 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </a>
          )
        })}
      </div>
    </>
  )
}
