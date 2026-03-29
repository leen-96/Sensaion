import { useRef } from 'react'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'

const BG =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80'

function EnergyLine({
  text,
  speed,
  scrollYProgress,
}: {
  text: string
  speed: number
  scrollYProgress: MotionValue<number>
}) {
  const y = useTransform(scrollYProgress, [0, 1], [40 * speed, -60 * speed])
  return (
    <motion.span className="energy__line" style={{ y }}>
      {text}
    </motion.span>
  )
}

export default function EnergySection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.06, 0.96])

  return (
    <section ref={ref} className="energy">
      <div
        className="energy__bg"
        style={{ backgroundImage: `url(${BG})` }}
        aria-hidden
      />
      <div className="energy__scrim" />

      <motion.div className="energy__content" style={{ scale }}>
        <div className="energy__row">
          <EnergyLine text="NO " speed={0.15} scrollYProgress={scrollYProgress} />
          <EnergyLine text="EXCUSES." speed={0.35} scrollYProgress={scrollYProgress} />
        </div>
        <div className="energy__row">
          <EnergyLine text="JUST " speed={0.22} scrollYProgress={scrollYProgress} />
          <EnergyLine text="REPS." speed={0.5} scrollYProgress={scrollYProgress} />
        </div>
      </motion.div>
    </section>
  )
}
