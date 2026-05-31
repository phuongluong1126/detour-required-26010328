import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// ── Clickable image wrapper ──────────────────────────────────────
export function ClickableImage({ src, alt, caption, className, style, onOpen }) {
  return (
    <div
      className="relative group cursor-pointer overflow-hidden"
      style={style}
      onClick={() => onOpen({ src, alt, caption })}
    >
      <img src={src} alt={alt} className={className} style={{ transition: 'filter 0.3s' }} />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(20,8,44,0.55)', backdropFilter: 'blur(2px)' }}
      >
        <span className="text-lg">🔍</span>
        <p className="text-white text-xs font-semibold tracking-wide">Click to view</p>
      </div>
    </div>
  )
}

// ── Lightbox modal ───────────────────────────────────────────────
export default function ImageLightbox({ image, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {image && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] cursor-pointer"
            style={{ background: 'rgba(10,4,24,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Polaroid frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{   opacity: 0, scale: 0.88,  y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-none"
          >
            <div
              className="pointer-events-auto"
              style={{ width: '33vw', minWidth: 280, maxWidth: 520 }}
            >
              {/* Polaroid card */}
              <div
                className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{ transform: 'rotate(-1.2deg)' }}
              >
                {/* Photo */}
                <div className="w-full overflow-hidden" style={{ height: '54vw', maxHeight: 380 }}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Caption area — polaroid bottom */}
                <div className="px-5 pt-4 pb-5 bg-white">
                  {/* Decorative sticker dots */}
                  <div className="flex gap-1.5 mb-3">
                    {['#c4b5fd','#f9a8d4','#6ee7b7'].map((c, i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <p className="text-plum-900 font-bold text-sm mb-1 font-display">{image.alt}</p>
                  {image.caption && (
                    <p className="text-plum-700/60 text-xs leading-relaxed italic font-light">
                      {image.caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Close hint */}
              <p className="text-center text-white/30 text-xs mt-4 tracking-wide">
                Press Esc or click outside to close
              </p>
            </div>
          </motion.div>

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed top-5 right-5 z-[10002] p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </>
      )}
    </AnimatePresence>
  )
}
