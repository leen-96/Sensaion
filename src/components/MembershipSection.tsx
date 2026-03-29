import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const plans = [
  {
    id: 'base',
    name: 'Base',
    monthly: 49,
    yearly: 490,
    perks: ['Floor access off-peak', 'Locker room', 'App check-ins'],
    highlight: false,
  },
  {
    id: 'plus',
    name: 'Plus',
    monthly: 79,
    yearly: 790,
    perks: ['All classes', 'Open gym anytime', 'Guest pass monthly'],
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    monthly: 129,
    yearly: 1190,
    perks: ['4 PT sessions / mo', 'Nutrition check-ins', 'Priority booking'],
    highlight: false,
  },
] as const

export default function MembershipSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="pricing">
      <div className="pricing__head">
        <p className="eyebrow">Membership</p>
        <h2 className="section-title">Plans that scale with you</h2>

        <div className="pricing__toggle" role="group" aria-label="Billing period">
          <button
            type="button"
            className={!yearly ? 'is-active' : ''}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            className={yearly ? 'is-active' : ''}
            onClick={() => setYearly(true)}
          >
            Yearly
          </button>
          <motion.div
            className="pricing__knob"
            initial={false}
            animate={{ left: yearly ? 'calc(50% + 2px)' : '4px' }}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          />
        </div>
      </div>

      <div className="pricing__grid">
        {plans.map((p, i) => (
          <motion.article
            key={p.id}
            className={`price-card${p.highlight ? ' price-card--highlight' : ''}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.07, duration: 0.55 }}
          >
            {p.highlight && <span className="price-card__badge">Most popular</span>}
            <h3 className="price-card__name">{p.name}</h3>
            <div className="price-card__amount">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={yearly ? 'y' : 'm'}
                  className="price-card__digits"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  ${yearly ? p.yearly : p.monthly}
                </motion.span>
              </AnimatePresence>
              <span className="price-card__term">/{yearly ? 'yr' : 'mo'}</span>
            </div>
            <ul className="price-card__list">
              {p.perks.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <a className="price-card__cta" href="#join">
              Choose {p.name}
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
