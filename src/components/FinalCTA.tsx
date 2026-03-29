import { motion } from 'framer-motion'
import { ParticleField } from './ParticleField'

export default function FinalCTA() {
  return (
    <section id="join" className="final-cta">
      <ParticleField density={56} />
      <div className="final-cta__scrim" />
      <motion.div
        className="final-cta__inner"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="final-cta__title">Start Your Journey Today</h2>
        <p className="final-cta__sub">Your first session is on us — bring effort, we’ll handle the plan.</p>
        <motion.a
          className="final-cta__btn"
          href="mailto:join@sensaiongym.com"
          animate={{ x: [0, -4, 4, -3, 3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(220,38,38,0.5)' }}
          whileTap={{ scale: 0.98 }}
        >
          Join Now
        </motion.a>
      </motion.div>
    </section>
  )
}
