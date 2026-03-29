import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const HERO_VIDEO =
  'https://videos.pexels.com/video-files/4763824/4763824-hd_1920_1080_30fps.mp4'

const titleWords = ['Sensaion', 'Gym']

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.65], [0.78, 0.12])
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -40])

  return (
    <section ref={ref} id="top" className="hero">
      <div className="hero__media">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <motion.div className="hero__overlay" style={{ opacity: overlayOpacity }} />
        <div className="hero__vignette" />
      </div>

      <div className="hero__content">
        <motion.h1 className="hero__title" style={{ y: titleY }}>
          {titleWords.map((word, i) => (
            <motion.span
              key={word}
              className="hero__word"
              initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 0.35 + i * 0.35,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}{' '}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          Train Hard. Feel Strong.
        </motion.p>

        <motion.a
          className="hero__cta"
          href="#join"
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.035, 1],
          }}
          transition={{
            opacity: { delay: 1.35, duration: 0.5 },
            y: { delay: 1.35, duration: 0.5 },
            scale: { delay: 2, duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
          }}
          whileHover={{ scale: 1.06, boxShadow: '0 0 32px rgba(220,38,38,0.55)' }}
          whileTap={{ scale: 0.98 }}
        >
          Join Now
        </motion.a>
      </div>
    </section>
  )
}
