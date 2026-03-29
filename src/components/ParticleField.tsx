import { useMemo } from 'react'
import { motion } from 'framer-motion'

type ParticleFieldProps = {
  className?: string
  density?: number
}

export function ParticleField({ className = '', density = 48 }: ParticleFieldProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: density }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 8,
      })),
    [density],
  )

  return (
    <div className={`particle-field ${className}`.trim()} aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="particle-field__dot"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0.15, 0.55, 0.15],
            y: [0, -12, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
