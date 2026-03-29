import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const programs = [
  {
    id: 'strength',
    title: 'Strength Training',
    blurb: 'Progressive overload, compound lifts, and smart accessory work.',
    detail:
      'Programs rotate weekly blocks with RPE-based autoregulation. Perfect for building raw power and resilient joints.',
  },
  {
    id: 'cardio',
    title: 'Cardio',
    blurb: 'Intervals, sleds, and engine work that scales with you.',
    detail:
      'Mix Assault bike, rower, and track-style intervals. Heart rate zones and pacing cues keep every session honest.',
  },
  {
    id: 'coaching',
    title: 'Personal Coaching',
    blurb: 'One-on-one sessions tailored to your goals and schedule.',
    detail:
      'Assessment, movement prep, and accountability. Ideal for beginners or athletes dialing competition prep.',
  },
  {
    id: 'crossfit',
    title: 'CrossFit',
    blurb: 'Varied functional fitness — barbells, gymnastics, conditioning.',
    detail:
      'Class format with scalable workouts. Emphasis on mechanics, consistency, then intensity.',
  },
] as const

export default function ProgramsSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const active = programs.find((p) => p.id === openId)

  return (
    <section id="programs" className="programs">
      <div className="programs__head">
        <p className="eyebrow">Programs</p>
        <h2 className="section-title">Train your way</h2>
        <p className="programs__lede">Pick a track — open a card for the full picture.</p>
      </div>

      <div className="programs__grid">
        {programs.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            className="program-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setOpenId(p.id)}
          >
            <span className="program-card__glow" />
            <span className="program-card__title">{p.title}</span>
            <span className="program-card__blurb">{p.blurb}</span>
            <span className="program-card__hint">View details</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="program-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="program-modal-title" className="modal__title">
                {active.title}
              </h3>
              <p className="modal__body">{active.detail}</p>
              <button type="button" className="modal__close" onClick={() => setOpenId(null)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
