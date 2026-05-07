'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'

export default function BeforeAfter({ before, after, beforeLabel = 'Degraded · 2014', afterLabel = 'Restored · 2024' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
      const next = Math.max(2, Math.min(98, (x / rect.width) * 100))
      setPos(next)
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [])

  return (
    <div ref={ref} className="relative aspect-[16/9] rounded-3xl overflow-hidden ring-1 ring-[#0B3D2E]/10 select-none">
      <Image src={after} alt={afterLabel} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="relative h-full w-full" style={{ width: `${100 / (pos / 100)}%` }}>
          <Image src={before} alt={beforeLabel} fill sizes="100vw" className="object-cover" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-4 left-4 rounded-full bg-black/55 backdrop-blur-md px-3 py-1 text-[11px] text-white/95 ring-1 ring-white/10">{beforeLabel}</div>
        <div className="absolute top-4 right-4 rounded-full bg-[#9DE6CB] text-[#0B3D2E] px-3 py-1 text-[11px] font-semibold">{afterLabel}</div>
      </div>
      <div className="absolute top-0 bottom-0 w-px bg-white/95 shadow-[0_0_24px_rgba(255,255,255,0.6)]" style={{ left: `${pos}%` }} />
      <button
        onMouseDown={() => { dragging.current = true }}
        onTouchStart={() => { dragging.current = true }}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-white shadow-2xl ring-2 ring-[#0B3D2E]/20 hover:scale-110 transition cursor-ew-resize flex items-center justify-center"
        style={{ left: `${pos}%` }}
        aria-label="Drag to compare"
      >
        <MoveHorizontal className="h-5 w-5 text-[#0B3D2E]" />
      </button>
    </div>
  )
}
