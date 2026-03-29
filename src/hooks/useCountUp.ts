import { useEffect, useRef, useState } from 'react'

export function useCountUp(
  end: number,
  durationMs: number,
  startWhenVisible: boolean,
  isVisible: boolean,
  prefix = '',
  suffix = '',
) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (startWhenVisible && !isVisible) return
    if (started.current) return
    started.current = true

    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - t) ** 3
      setValue(Math.round(eased * end))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [end, durationMs, startWhenVisible, isVisible])

  return `${prefix}${value}${suffix}`
}
