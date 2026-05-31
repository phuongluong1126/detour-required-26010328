import { useEffect, useRef } from 'react'

const COLORS = [
  '#c4b5fd', '#f9a8d4', '#a78bfa', '#f472b6',
  '#818cf8', '#fcd34d', '#6ee7b7', '#fb7185',
]

function rand(a, b) { return a + Math.random() * (b - a) }

export default function ParticleBurst({ trigger }) {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const firedRef  = useRef(false)

  useEffect(() => {
    if (!trigger || firedRef.current) return
    firedRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Match canvas resolution to viewport
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const origins = [
      { x: canvas.width * 0.15, y: canvas.height * 0.5  },
      { x: canvas.width * 0.38, y: canvas.height * 0.35 },
      { x: canvas.width * 0.5,  y: canvas.height * 0.4  },
      { x: canvas.width * 0.65, y: canvas.height * 0.35 },
      { x: canvas.width * 0.85, y: canvas.height * 0.5  },
    ]

    const particles = []
    origins.forEach((o, oi) => {
      for (let i = 0; i < 35; i++) {
        const angle = rand(0, Math.PI * 2)
        const speed = rand(3, 11)
        particles.push({
          x: o.x, y: o.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - rand(2, 5),
          size:     rand(4, 9),
          color:    COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha:    1,
          rotation: rand(0, Math.PI * 2),
          spin:     rand(-0.2, 0.2),
          isRect:   Math.random() > 0.5,
          life:     rand(80, 150),
          age:      0,
          delay:    oi * 5,
        })
      }
    })

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false

      particles.forEach(p => {
        if (p.age < p.delay) { p.age++; alive = true; return }
        p.x  += p.vx
        p.y  += p.vy
        p.vy += 0.22
        p.vx *= 0.983
        p.rotation += p.spin
        p.alpha = Math.max(0, 1 - (p.age - p.delay) / p.life)
        p.age++

        if (p.alpha > 0) {
          alive = true
          ctx.save()
          ctx.globalAlpha = p.alpha
          ctx.fillStyle   = p.color
          ctx.shadowBlur  = 6
          ctx.shadowColor = p.color
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)
          if (p.isRect) {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2.5)
          } else {
            ctx.beginPath()
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.restore()
        }
      })

      if (alive) animRef.current = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [trigger])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  )
}
