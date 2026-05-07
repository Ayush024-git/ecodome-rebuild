'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Waves, Instagram, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const r = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      if (r.ok) { toast.success('Subscribed. Welcome to the movement.'); setEmail('') }
      else toast.error('Could not subscribe — try again.')
    } catch { toast.error('Network error.') } finally { setLoading(false) }
  }

  return (
    <footer id="contact" className="relative bg-[#071E16] text-[#FAFAF7]">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAFAF7]/10 ring-1 ring-white/10">
                <Waves className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="font-display text-lg font-bold tracking-tightest">ECODOME</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/55">Youth · Ocean · Earth</div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
              A youth-led global platform combining conservation research, climate awareness, and marine ecosystem protection. We document. We restore. We act.
            </p>
            <form onSubmit={subscribe} className="mt-8 flex items-center gap-2 max-w-md">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
              />
              <button disabled={loading} className="inline-flex items-center gap-1.5 rounded-full bg-[#FAFAF7] text-[#0B3D2E] px-5 py-3 text-sm font-semibold hover:bg-white disabled:opacity-60">
                {loading ? '…' : (<>Subscribe <ArrowRight className="h-4 w-4" /></>)}
              </button>
            </form>
            <p className="mt-3 text-xs text-white/40">Field reports, research drops, and movement updates. No spam.</p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 mb-4">Platform</div>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/research" className="hover:text-white">Research Hub</Link></li>
                <li><Link href="/#campaigns" className="hover:text-white">Campaigns</Link></li>
                <li><Link href="/impact" className="hover:text-white">Impact Map</Link></li>
                <li><Link href="/#community" className="hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 mb-4">Movement</div>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/#mission" className="hover:text-white">Our Mission</Link></li>
                <li><Link href="/#campaigns" className="hover:text-white">Volunteer</Link></li>
                <li><Link href="/#community" className="hover:text-white">Become an Ambassador</Link></li>
                <li><Link href="/research" className="hover:text-white">Submit Research</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 mb-4">Connect</div>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="#" className="hover:text-white inline-flex items-center gap-2"><Instagram className="h-4 w-4" /> Instagram</a></li>
                <li><a href="#" className="hover:text-white inline-flex items-center gap-2"><Twitter className="h-4 w-4" /> Twitter / X</a></li>
                <li><a href="#" className="hover:text-white inline-flex items-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn</a></li>
                <li><a href="#" className="hover:text-white inline-flex items-center gap-2"><Youtube className="h-4 w-4" /> YouTube</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-white/45">© {new Date().getFullYear()} ECODOME · A global youth movement for marine conservation.</div>
          <div className="flex items-center gap-6 text-xs text-white/45">
            <a href="#" className="hover:text-white/80">Privacy</a>
            <a href="#" className="hover:text-white/80">Terms</a>
            <a href="#" className="hover:text-white/80">Press Kit</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
