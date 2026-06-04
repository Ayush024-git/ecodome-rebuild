'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, Waves } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { href: '/#mission', label: 'Mission' },
  { href: '/research', label: 'Research' },
  { href: '/impact', label: 'Impact' },
  { href: '/#campaigns', label: 'Future Projects' },
  { href: '/#community', label: 'Community' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar({ variant = 'auto' }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLight = variant === 'light' || scrolled

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'pt-2' : 'pt-4'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`flex items-center justify-between rounded-full border transition-all duration-500 ${isLight ? 'glass border-[#0B3D2E]/10 shadow-[0_8px_32px_-12px_rgba(11,61,46,0.18)]' : 'glass-dark border-white/10'} px-3 sm:px-5 py-2.5`}>
          <Link href="/" className="flex items-center gap-2.5 group">
            <span
              className={`relative flex h-10 w-10 overflow-hidden items-center justify-center rounded-full ${
                isLight
                  ? 'bg-[#0B3D2E]'
                  : 'bg-white/10 ring-1 ring-white/20'
              }`}
            >
              <img
                src="/logo.png"
                alt="ECODOME Logo"
                className="h-full w-full object-cover"
              />
            </span>
            <div className="flex flex-col leading-none">
              <span className={`font-display text-[15px] font-bold tracking-tightest ${isLight ? 'text-[#0B3D2E]' : 'text-white'}`}>ECODOME</span>
              <span className={`text-[9px] uppercase tracking-[0.22em] mt-0.5 ${isLight ? 'text-[#0B3D2E]/55' : 'text-white/55'}`}>Youth · Ocean · Earth</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[13px] font-medium transition-colors hover:opacity-100 ${isLight ? 'text-[#0B1F18]/70 hover:text-[#0B3D2E]' : 'text-white/75 hover:text-white'}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/research"
              className={`hidden sm:inline-flex items-center rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${isLight ? 'bg-[#0B3D2E] text-[#FAFAF7] hover:bg-[#0F5238]' : 'bg-white text-[#0B3D2E] hover:bg-white/90'}`}
            >
              Explore Research
            </Link>
            <button
              onClick={() => setOpen(true)}
              className={`lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full ${isLight ? 'text-[#0B3D2E] hover:bg-[#0B3D2E]/5' : 'text-white hover:bg-white/10'}`}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#0B3D2E]/60 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-[#FAFAF7] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-[#0B3D2E]">ECODOME</span>
                <button onClick={() => setOpen(false)} className="h-9 w-9 rounded-full hover:bg-[#0B3D2E]/5 flex items-center justify-center">
                  <X className="h-5 w-5 text-[#0B3D2E]" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 border-b border-[#0B3D2E]/10 text-[#0B3D2E] font-medium">
                    {l.label}
                  </Link>
                ))}
              </nav>
              <Link href="/research" onClick={() => setOpen(false)} className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0B3D2E] text-[#FAFAF7] px-5 py-3 font-semibold">
                Explore Research
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
