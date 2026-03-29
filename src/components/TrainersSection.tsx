import { useState } from 'react'
import { motion } from 'framer-motion'

const trainers = [
  {
    id: '1',
    name: 'Riley Stone',
    role: 'Head Coach — Strength',
    bio: 'Former national lifter. Obsessed with positions, tempo, and sustainable PRs.',
    img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80',
  },
  {
    id: '2',
    name: 'Morgan Vega',
    role: 'Conditioning Lead',
    bio: 'Builds engines that last — intervals, pacing, and recovery that scales.',
    img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80',
  },
  {
    id: '3',
    name: 'Chris Hale',
    role: 'Athletic Performance',
    bio: 'Mobility-first, power-second. Great for return-to-training and busy schedules.',
    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
  },
] as const

export default function TrainersSection() {
  const [flipped, setFlipped] = useState<string | null>(null)

  return (
    <section id="trainers" className="trainers">
      <div className="trainers__head">
        <p className="eyebrow">Coaches</p>
        <h2 className="section-title">Trainers who show up</h2>
        <p className="trainers__lede">Hover for focus — click a card to flip the profile.</p>
      </div>

      <div className="trainers__grid">
        {trainers.map((t, i) => {
          const isFlipped = flipped === t.id
          return (
            <motion.div
              key={t.id}
              className="trainer"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              style={{ perspective: 1200 }}
            >
              <motion.button
                type="button"
                className="trainer__flip"
                onClick={() => setFlipped(isFlipped ? null : t.id)}
                whileHover={{ y: -6 }}
                aria-expanded={isFlipped}
                aria-label={`${t.name} profile`}
              >
                <motion.div
                  className="trainer__inner"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="trainer__face trainer__face--front">
                    <div className="trainer__media">
                      <motion.img
                        src={t.img}
                        alt=""
                        className="trainer__img"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.45 }}
                      />
                      <div className="trainer__fade" />
                    </div>
                    <div className="trainer__bar">
                      <span className="trainer__name">{t.name}</span>
                      <span className="trainer__role">{t.role}</span>
                    </div>
                  </div>
                  <div className="trainer__face trainer__face--back" aria-hidden={!isFlipped}>
                    <p className="trainer__bio">{t.bio}</p>
                    <span className="trainer__hint">Tap to flip back</span>
                  </div>
                </motion.div>
              </motion.button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
