'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sprout, GraduationCap, Compass, Shield, Globe2, Sparkles,
  ArrowRight, Bell, X, CheckCircle2, Clock
} from 'lucide-react'
import { toast } from 'sonner'
import { Reveal } from '@/components/ecodome/Reveal'

const PROJECTS = [
  {
    id: 'mangrove-restoration-missions',
    icon: Sprout,
    title: 'Mangrove Restoration Missions',
    tagline: 'Field deployments. Million-sapling targets. Real coastlines.',
    description: 'A coordinated network of community-led replanting expeditions across the Indo-Pacific, West Africa, and the Caribbean — combining indigenous land knowledge with ECODOME\u2019s open hydrology sensors.',
    eta: 'Q1 2026',
    color: '#9DE6CB',
    accent: 'from-[#9DE6CB]/30 to-transparent',
  },
  {
    id: 'youth-research-fellowship',
    icon: GraduationCap,
    title: 'Youth Research Fellowship',
    tagline: 'Funded research stipends for under-25 climate scientists.',
    description: 'A 12-month structured fellowship pairing emerging youth researchers with senior mentors at partner institutions. Includes field budget, publication support, and conference travel.',
    eta: 'Q2 2026',
    color: '#7CDFC0',
    accent: 'from-[#7CDFC0]/30 to-transparent',
  },
  {
    id: 'marine-biodiversity-mapping',
    icon: Compass,
    title: 'Marine Biodiversity Mapping',
    tagline: 'Open eDNA atlas of the world\u2019s coastal waters.',
    description: 'A distributed citizen-science protocol turning every snorkeler, diver, and coastal student into a contributor to the planet\u2019s most comprehensive open biodiversity dataset.',
    eta: 'Q3 2026',
    color: '#5DD3F1',
    accent: 'from-[#5DD3F1]/30 to-transparent',
  },
  {
    id: 'shark-nursery-protection',
    icon: Shield,
    title: 'Shark Nursery Protection Campaign',
    tagline: 'Protect 217 critical sites in 5 years.',
    description: 'A policy + on-ground initiative to formally protect every shark nursery identified in ECODOME\u2019s Global Atlas. Combines acoustic monitoring, MPA advocacy, and youth-led stewardship.',
    eta: 'Q4 2026',
    color: '#0E7490',
    accent: 'from-[#0E7490]/30 to-transparent',
  },
  {
    id: 'global-student-ambassador',
    icon: Globe2,
    title: 'Global Student Ambassador Program',
    tagline: 'One student leader per country. One movement.',
    description: 'A flagship leadership track training nominated student ambassadors in conservation science, science communication, and policy — with a global summit hosted annually.',
    eta: 'Q1 2027',
    color: '#0B3D2E',
    accent: 'from-[#0B3D2E]/30 to-transparent',
  },
]

function NotifyDialog({ project, onClose }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const r = await fetch('/api/projects/notify', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, projectId: project.id, projectTitle: project.title }),
      })
      if (r.ok) {
        setDone(true)
        toast.success('You\u2019re on the list. We\u2019ll be in touch.')
      } else toast.error('Could not save \u2014 try again.')
    } catch { toast.error('Network error.') } finally { setLoading(false) }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-[#0B3D2E]/60 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative w-full max-w-md rounded-3xl bg-[#FAFAF7] p-8 ring-1 ring-[#0B3D2E]/15 shadow-[0_30px_80px_-20px_rgba(11,61,46,0.45)]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 rounded-full hover:bg-[#0B3D2E]/5 flex items-center justify-center">
          <X className="h-4 w-4 text-[#0B3D2E]" />
        </button>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${project.color}26`, color: project.color }}>
          <project.icon className="h-6 w-6" strokeWidth={1.8} />
        </span>
        {!done ? (
          <>
            <h3 className="font-display mt-5 text-2xl font-semibold text-[#0B3D2E] tracking-tightest leading-tight">{project.title}</h3>
            <p className="mt-2 text-[14px] text-[#0B1F18]/65 leading-relaxed">Be first to know when this initiative launches. Expected: <span className="font-medium text-[#0B3D2E]">{project.eta}</span>.</p>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-full bg-white border border-[#0B3D2E]/15 px-5 py-3.5 text-sm placeholder:text-[#0B3D2E]/40 focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
              />
              <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0B3D2E] text-[#FAFAF7] px-5 py-3.5 text-sm font-semibold hover:bg-[#0F5238] disabled:opacity-60">
                {loading ? 'Saving\u2026' : (<>Notify Me <Bell className="h-4 w-4" /></>)}
              </button>
            </form>
            <p className="mt-3 text-[11px] text-[#0B1F18]/50 text-center">No spam. One email when this launches. Unsubscribe anytime.</p>
          </>
        ) : (
          <>
            <h3 className="font-display mt-5 text-2xl font-semibold text-[#0B3D2E] tracking-tightest">You\u2019re on the list.</h3>
            <p className="mt-2 text-[14px] text-[#0B1F18]/65">We\u2019ll write to you when <strong className="text-[#0B3D2E]">{project.title}</strong> goes live.</p>
            <button onClick={onClose} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0B3D2E] text-white px-5 py-3 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4" /> Done
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function FutureProjects() {
  const [active, setActive] = useState(null)

  return (
    <section id="campaigns" className="relative bg-[#FAFAF7] py-28 sm:py-36 overflow-hidden">
      {/* subtle futuristic grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0B3D2E 1px, transparent 1px), linear-gradient(to bottom, #0B3D2E 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute -top-24 -right-24 h-[480px] w-[480px] rounded-full bg-[#7CDFC0]/15 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-[420px] w-[420px] rounded-full bg-[#0E7490]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">
                <Sparkles className="h-3.5 w-3.5" /> Future Projects
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-3 text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
                What ECODOME will build next.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] text-[#0B1F18]/65 leading-relaxed max-w-xl">
                A roadmap of upcoming initiatives. Each one is in active design with our research, conservation, and youth networks. Add your name to a project and we&rsquo;ll notify you the moment it goes live.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="inline-flex items-center gap-2 rounded-full glass border border-[#0B3D2E]/10 px-4 py-2 text-[12px] text-[#0B3D2E]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[#0E7490] animate-ping opacity-50" />
                <span className="relative h-2 w-2 rounded-full bg-[#0E7490]" />
              </span>
              <span className="font-medium">5 initiatives in development</span>
            </div>
          </Reveal>
        </div>

        {/* Featured wide card (first project) */}
        <Reveal delay={0.2}>
          <FeaturedFutureCard project={PROJECTS[0]} onNotify={() => setActive(PROJECTS[0])} />
        </Reveal>

        {/* Grid of remaining projects */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.slice(1).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <FutureProjectCard project={p} index={i + 1} onNotify={() => setActive(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>{active && <NotifyDialog project={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}

function ComingSoonBadge({ eta, color = '#9DE6CB' }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium ring-1 ring-inset"
      style={{ background: `${color}1f`, color: '#0B3D2E', borderColor: `${color}80` }}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: color }} />
        <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      </span>
      Coming · {eta}
    </span>
  )
}

function FeaturedFutureCard({ project, onNotify }) {
  return (
    <div className="mt-14 group relative overflow-hidden rounded-[2rem] bg-[#0B3D2E] text-white">
      <div className="absolute inset-0 opacity-90">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D2E] via-[#0F5238] to-[#0E7490]" />
      </div>
      {/* faint dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -right-20 h-[360px] w-[360px] rounded-full bg-[#9DE6CB]/25 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -20, 0], y: [0, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -left-10 h-[320px] w-[320px] rounded-full bg-[#0E7490]/40 blur-3xl"
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-12">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2">
            <ComingSoonBadge eta={project.eta} color={project.color} />
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/80">
              <Sparkles className="h-3 w-3" /> Flagship
            </span>
          </div>
          <h3 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.02] tracking-tightest text-balance">
            {project.title}
          </h3>
          <p className="mt-4 text-[16px] text-white/80 leading-relaxed max-w-xl">{project.tagline}</p>
          <p className="mt-3 text-[14px] text-white/60 leading-relaxed max-w-xl">{project.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={onNotify} className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B3D2E] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition">
              Notify Me <Bell className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold hover:bg-white/10">
              Read the Brief <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-square max-w-[320px] mx-auto">
            {/* Concentric pulse rings */}
            {[1, 2, 3].map((r) => (
              <motion.span
                key={r}
                aria-hidden
                initial={{ opacity: 0.6, scale: 0.6 }}
                animate={{ opacity: 0, scale: 1.4 }}
                transition={{ duration: 3.6, repeat: Infinity, delay: r * 0.6, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full ring-1 ring-[#9DE6CB]/40"
              />
            ))}
            <div className="absolute inset-8 rounded-full bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-md flex items-center justify-center">
              <div className="absolute inset-6 rounded-full bg-white/[0.04] ring-1 ring-white/10 flex items-center justify-center">
                <project.icon className="h-12 w-12 text-[#9DE6CB]" strokeWidth={1.4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FutureProjectCard({ project, index, onNotify }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl bg-white ring-1 ring-[#0B3D2E]/10 hover:ring-[#0B3D2E]/30 transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(11,61,46,0.35)]">
      {/* gradient wash */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-50 group-hover:opacity-90 transition-opacity duration-700`} />
      {/* corner index */}
      <div className="absolute top-6 right-6 font-display text-[11px] tracking-[0.3em] text-[#0B3D2E]/35">0{index + 1}</div>

      <div className="relative p-7 sm:p-8 flex flex-col h-full">
        <div className="flex items-center justify-between gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ring-inset transition-transform group-hover:scale-105"
            style={{ background: `${project.color}1c`, color: project.color, borderColor: `${project.color}40` }}>
            <project.icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <ComingSoonBadge eta={project.eta} color={project.color} />
        </div>

        <h3 className="font-display mt-7 text-2xl font-semibold text-[#0B3D2E] tracking-tightest leading-snug">{project.title}</h3>
        <p className="mt-2 text-[14px] font-medium text-[#0E7490]">{project.tagline}</p>
        <p className="mt-3 text-[13.5px] text-[#0B1F18]/65 leading-relaxed">{project.description}</p>

        <div className="mt-auto pt-7 flex items-center justify-between border-t border-[#0B3D2E]/10">
          <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#0B1F18]/55">
            <Clock className="h-3.5 w-3.5" /> Targeted launch · {project.eta}
          </span>
          <button onClick={onNotify} className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0B3D2E] hover:text-[#0E7490] transition-colors">
            Notify Me <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* hover glow line */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
      </div>
    </div>
  )
}
