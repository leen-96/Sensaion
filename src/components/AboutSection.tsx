import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const GYM_IMG =
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=85'

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section ref={ref} id="about" className="about">
      <div className="about__grid">
        <motion.div
          className="about__text"
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Who we are</p>
          <h2 className="section-title">Built for effort. Designed for results.</h2>
          <p className="about__copy">
            Sensaion Gym is a high-intensity training floor where coaching, community, and
            equipment come together. From first rep to final set, we push you with structure and
            respect for the craft of strength.
          </p>
        </motion.div>

        <motion.div
          className="about__visual"
          initial={{ opacity: 0, x: 64 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about__frame">
            <motion.img
              src={GYM_IMG}
              alt="Open gym floor with racks and training space"
              className="about__img"
              style={{ y: imgY }}
            />
            <div className="about__shine" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
