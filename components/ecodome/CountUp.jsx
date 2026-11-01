'use client'
import { useEffect, useRef, useState } from 'react'

export default function CountUp({ to = 100, duration = 1.6, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (t) => {
            const k = Math.min(1, (t - start) / (duration * 1000))
            const eased = 1 - Math.pow(1 - k, 3) // ease-out cubic
            setVal(to * eased)
            if (k < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.3 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to, duration])

  const formatted = val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>
}
