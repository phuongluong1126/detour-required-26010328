import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VolumeX, Volume2 } from 'lucide-react'

let sharedAudio  = null
let audioReady   = false   // true once browser has allowed playback
let pendingPlay  = false   // startMusic() was called before first interaction

export function getAudio() {
  if (!sharedAudio) {
    sharedAudio = new Audio('/music/dreamers.mp3')
    sharedAudio.loop   = true
    sharedAudio.volume = 0
  }
  return sharedAudio
}

function fadeIn(audio, target = 0.7, ms = 4000) {
  audio.volume = 0
  const steps    = 80
  const interval = ms / steps
  const inc      = target / steps
  const t = setInterval(() => {
    if (audio.volume + inc < target) {
      audio.volume = Math.min(audio.volume + inc, target)
    } else {
      audio.volume = target
      clearInterval(t)
    }
  }, interval)
}

// Called by Closing section when it scrolls into view
export function startMusic() {
  if (audioReady) {
    const audio = getAudio()
    fadeIn(audio, 0.7, 4000)
    audio.play().catch(() => {})
  } else {
    pendingPlay = true          // will fire as soon as user taps
  }
}

// Global one-time interaction listener to unlock audio
function attachUnlockListener() {
  const unlock = () => {
    const audio = getAudio()
    audio.play().then(() => {
      audioReady = true
      if (pendingPlay) {
        // Closing section already in view — start music now
        pendingPlay = false
        fadeIn(audio, 0.7, 4000)
      } else {
        // Not needed yet — pause silently, keep unlocked
        audio.pause()
        audio.currentTime = 0
      }
    }).catch(() => {})
    ;['click','touchstart','keydown'].forEach(ev =>
      window.removeEventListener(ev, unlock)
    )
  }
  ;['click','touchstart','keydown'].forEach(ev =>
    window.addEventListener(ev, unlock, { once: true })
  )
}

if (typeof window !== 'undefined') attachUnlockListener()

// ── React component ──────────────────────────────
export default function MusicPlayer() {
  const [playing,  setPlaying]  = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [needsTap, setNeedsTap] = useState(false)   // show tap-to-play hint

  useEffect(() => {
    const audio = getAudio()
    const onPlay  = () => { setPlaying(true);  setVisible(true);  setNeedsTap(false) }
    const onPause = () =>   setPlaying(false)
    audio.addEventListener('play',  onPlay)
    audio.addEventListener('pause', onPause)
    return () => {
      audio.removeEventListener('play',  onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  // Expose a way for Closing to tell the player "show tap hint"
  useEffect(() => {
    window.__musicNeedsTap = () => setNeedsTap(true)
    return () => { delete window.__musicNeedsTap }
  }, [])

  const handleTap = (e) => {
    e.stopPropagation()
    const audio = getAudio()
    audio.play().then(() => {
      audioReady   = true
      pendingPlay  = false
      setNeedsTap(false)
      fadeIn(audio, 0.7, 4000)
    }).catch(() => {})
  }

  const toggle = (e) => {
    e.stopPropagation()
    const audio = getAudio()
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
      fadeIn(audio, 0.7, 2000)
    }
  }

  return (
    <>
      {/* Tap-to-play hint — shown when user reaches Closing without having clicked */}
      <AnimatePresence>
        {needsTap && !visible && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            onClick={handleTap}
            className="fixed bottom-6 left-6 z-[9998] flex items-center gap-2.5 px-4 py-3 rounded-full text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
            style={{
              background: 'rgba(30,12,60,0.88)',
              border: '1px solid rgba(167,139,250,0.35)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-base"
            >
              🎵
            </motion.span>
            <span className="text-xs">Tap to play your gift</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main toggle — shown once music has started */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed bottom-6 left-6 z-[9998]"
          >
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full text-sm font-medium text-white/80 hover:text-white transition-colors"
              style={{
                background: 'rgba(30,12,60,0.82)',
                border: '1px solid rgba(167,139,250,0.25)',
                backdropFilter: 'blur(14px)',
                boxShadow: playing ? '0 0 18px rgba(139,92,246,0.25)' : 'none',
              }}
            >
              {playing ? (
                <>
                  <span className="flex items-end gap-[3px] h-4">
                    {[0,1,2,3].map(i => (
                      <motion.span key={i}
                        className="w-[3px] rounded-full bg-lavender-400"
                        animate={{ height: ['4px','14px','6px','12px','4px'] }}
                        transition={{ repeat: Infinity, duration: 0.9 + i * 0.15, ease: 'easeInOut', delay: i * 0.1 }}
                        style={{ display: 'inline-block' }}
                      />
                    ))}
                  </span>
                  <Volume2 className="w-3.5 h-3.5 text-lavender-400" />
                </>
              ) : (
                <VolumeX className="w-4 h-4 text-white/40" />
              )}
              <span className="text-xs">{playing ? 'Dreamers' : 'Play music'}</span>
              {playing && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-lavender-400/30"
                  animate={{ scale: [1, 1.18], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
                />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
