import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCountUp } from '../hooks/useCountUp'

gsap.registerPlugin(ScrollTrigger)

const slides = [
  {
    quote: '“Lost 24 lbs — gained confidence I didn’t know I had.”',
    name: 'Alex M.',
  },
  {
    quote: '“Coaching fixed my squat path. Numbers followed.”',
    name: 'Jordan K.',
  },
  {
    quote: '“The energy here hits different. I show up every week.”',
    name: 'Sam R.',
  },
]

const BEFORE =
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80'
const AFTER =
  'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80'

export default function TransformationSection() {
  const stripRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-20%' })

  const members = useCountUp(500, 1800, true, statsInView, '+', ' Members')
  const sessions = useCountUp(12000, 2200, true, statsInView, '+', ' Sessions')

  const [split, setSplit] = useState(50)
  const dragging = useRef(false)
  const baRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback((clientX: number, rect: DOMRect) => {
    const x = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 5), 95)
    setSplit(x)
  }, [])

  useEffect(() => {
    const strip = stripRef.current
    const track = trackRef.current
    if (!strip || !track) return

    const getScrollAmount = () => -(track.scrollWidth - strip.clientWidth)

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: strip,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount()) * 1.2}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    })

    const onRefresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onRefresh)

    return () => {
      window.removeEventListener('resize', onRefresh)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section id="transform" className="transform">
      <div className="transform__intro">
        <p className="eyebrow">Transformations</p>
        <h2 className="section-title">Proof on the floor</h2>
        <p className="transform__lede">
          Scroll through member stories — then drag the slider to compare.
        </p>
      </div>

      <div ref={stripRef} className="transform__strip">
        <div ref={trackRef} className="transform__track">
          {slides.map((s) => (
            <article key={s.name} className="story-card">
              <p className="story-card__quote">{s.quote}</p>
              <p className="story-card__name">{s.name}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="transform__ba">
        <p className="eyebrow">Before / After</p>
        <div
          ref={baRef}
          className="ba"
          onPointerMove={(e) => {
            if (!dragging.current || !baRef.current) return
            onMove(e.clientX, baRef.current.getBoundingClientRect())
          }}
          onPointerUp={() => {
            dragging.current = false
          }}
          onPointerLeave={() => {
            dragging.current = false
          }}
        >
          <img src={AFTER} alt="" className="ba__base" />
          <div className="ba__top-wrap" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
            <img src={BEFORE} alt="" className="ba__top" />
          </div>
          <div
            className="ba__handle"
            style={{ left: `${split}%` }}
            onPointerDown={(e) => {
              if (!baRef.current) return
              e.currentTarget.setPointerCapture(e.pointerId)
              dragging.current = true
              onMove(e.clientX, baRef.current.getBoundingClientRect())
            }}
          >
            <span className="ba__grip" />
          </div>
        </div>
      </div>

      <div ref={statsRef} className="transform__stats">
        <motion.div
          className="stat-pill"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="stat-pill__value">{members}</span>
        </motion.div>
        <motion.div
          className="stat-pill"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <span className="stat-pill__value">{sessions}</span>
        </motion.div>
        <motion.div
          className="stat-pill"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
        >
          <span className="stat-pill__value">4.9★ Avg rating</span>
        </motion.div>
      </div>
    </section>
  )
}
