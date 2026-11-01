'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, TrendingDown, Leaf, Fish, Globe2, Droplets,
  Waves, Activity, Map as MapIcon, Wind
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, RadialBarChart, RadialBar, Legend, PolarAngleAxis,
} from 'recharts'
import Navbar from '@/components/ecodome/Navbar'
import Footer from '@/components/ecodome/Footer'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ecodome/Reveal'
import WorldMap from '@/components/ecodome/WorldMap'
import BeforeAfter from '@/components/ecodome/BeforeAfter'
import CountUp from '@/components/ecodome/CountUp'

const HERO = 'https://images.unsplash.com/photo-1717292741426-d050f4f25503?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxtYW5ncm92ZSUyMHJvb3RzJTIwdW5kZXJ3YXRlcnxlbnwwfHx8fDE3NzgxNTY4Njl8MA&ixlib=rb-4.1.0&q=85'
const CORAL = 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJlZWZ8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85'
const SHARK = 'https://images.unsplash.com/photo-1702382116645-e93f30e25626?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwc2hhcmt8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85'
const MANGROVE_AERIAL_HEALTHY = 'https://images.unsplash.com/photo-1771985239333-cbf2ab43f566?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGFlcmlhbHxlbnwwfHx8fDE3NzgxNTY4NjF8MA&ixlib=rb-4.1.0&q=85'
const MANGROVE_DEGRADED = 'https://images.unsplash.com/photo-1578142880638-9fc9aba285c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwzfHxtYW5ncm92ZSUyMHJvb3RzJTIwdW5kZXJ3YXRlcnxlbnwwfHx8fDE3NzgxNTY4Njl8MA&ixlib=rb-4.1.0&q=85'
const DIVER = 'https://images.unsplash.com/photo-1568816633267-1738dc4aaf97?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwzfHxtYXJpbmUlMjByZXNlYXJjaCUyMGRpdmVyfGVufDB8fHx8MTc3ODE1Njg2OXww&ixlib=rb-4.1.0&q=85'

const lossData = [
  { year: 1996, area: 152.0, lost: 0 },
  { year: 2000, area: 149.4, lost: 2.6 },
  { year: 2004, area: 146.1, lost: 5.9 },
  { year: 2008, area: 142.7, lost: 9.3 },
  { year: 2012, area: 139.0, lost: 13.0 },
  { year: 2016, area: 136.4, lost: 15.6 },
  { year: 2020, area: 134.1, lost: 17.9 },
  { year: 2024, area: 132.3, lost: 19.7 },
]
const biodiversityData = [
  { region: 'Indo-Pacific', species: 612, threatened: 184 },
  { region: 'Caribbean', species: 478, threatened: 142 },
  { region: 'West Africa', species: 312, threatened: 138 },
  { region: 'South Asia', species: 558, threatened: 217 },
  { region: 'Coral Triangle', species: 749, threatened: 211 },
  { region: 'Pacific Islands', species: 384, threatened: 96 },
]
const carbonStorage = [
  { name: 'Mangroves', value: 1023, fill: '#9DE6CB' },
  { name: 'Tropical rainforest', value: 264, fill: '#7CB8A2' },
  { name: 'Boreal forest', value: 198, fill: '#4F8C7A' },
  { name: 'Temperate forest', value: 157, fill: '#3A6E5F' },
]

function HeroImpact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 220])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  return (
    <section ref={ref} className="relative h-[100vh] w-full overflow-hidden bg-[#071E16]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={HERO} alt="Mangrove root system underwater" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 hero-vignette" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-24 sm:pb-28">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] text-white/70 hover:text-white self-start">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to ECODOME
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 inline-flex items-center gap-2 self-start rounded-full glass-dark px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/85"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E15554] animate-pulse" />
          Impact & Awareness
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-6 max-w-5xl text-balance text-white text-[clamp(2rem,7.4vw,5.4rem)] font-semibold leading-[1.04] sm:leading-[0.98] tracking-tightest"
        >
          Every coastline tells a story.<br />
          <span className="text-[#9DE6CB]">We listen, measure, restore.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.55 }}
          className="mt-7 max-w-2xl text-pretty text-white/80 text-[17px] leading-relaxed"
        >
          A live atlas of mangrove loss, marine biodiversity decline, and the recovery work happening at the edges of the ocean — visualized for the world to see.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.75 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
        >
          <a href="#atlas" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FAFAF7] text-[#0B3D2E] px-6 py-3.5 text-sm font-semibold hover:bg-white shadow-lg shadow-black/30">
            Open the Atlas <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#story" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white px-6 py-3.5 text-sm font-semibold hover:bg-white/10">
            See Restoration Story
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#FAFAF7]" />
    </section>
  )
}

function KPIBand() {
  const stats = [
    { v: 19.7, suffix: 'M ha', label: 'Mangrove area lost since 1996', icon: TrendingDown, color: '#E15554' },
    { v: 1023, suffix: ' Mg C/ha', label: 'Average mangrove carbon stock', icon: Leaf, color: '#9DE6CB' },
    { v: 1102, prefix: '+', suffix: ' GT', label: 'CO₂ released by mangrove loss', icon: Wind, color: '#F0A03B', decimals: 0 },
    { v: 217, label: 'Critical shark nursery sites', icon: Fish, color: '#0E7490' },
  ]
  return (
    <section className="relative -mt-16 z-20 mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-3xl bg-[#0B3D2E]/10 shadow-[0_24px_60px_-30px_rgba(11,61,46,0.45)]">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.06} className="bg-[#FAFAF7] p-7">
            <s.icon className="h-5 w-5" style={{ color: s.color }} />
            <div className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-[#0B3D2E] tracking-tightest">
              <CountUp to={s.v} suffix={s.suffix || ''} prefix={s.prefix || ''} decimals={s.decimals ?? (s.v < 100 ? 1 : 0)} />
            </div>
            <div className="mt-1 text-[12.5px] text-[#0B1F18]/65 leading-snug">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function AtlasSection() {
  return (
    <section id="atlas" className="relative bg-[#FAFAF7] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium inline-flex items-center gap-2"><MapIcon className="h-3.5 w-3.5" /> Mangrove Loss Atlas</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-3 text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
                The map you can&rsquo;t unsee.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] text-[#0B1F18]/65 leading-relaxed">
              12 globally significant mangrove regions, monitored by ECODOME field teams and partner labs. Click any hotspot to read the story.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12">
            <WorldMap />
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-7">
            <div className="rounded-3xl bg-white ring-1 ring-[#0B3D2E]/10 p-6 sm:p-8">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#0B1F18]/55">Global mangrove area · 1996 → 2024</div>
                  <div className="font-display mt-1 text-2xl font-semibold text-[#0B3D2E]">A 12.9% net loss in 28 years</div>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[#0B1F18]/65">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#0E7490]" /> Area (M ha)</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#E15554]" /> Cumulative loss</span>
                </div>
              </div>
              <div className="mt-6 h-[280px]">
                <ResponsiveContainer>
                  <AreaChart data={lossData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0E7490" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#0E7490" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#E15554" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#E15554" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#0B3D2E" strokeOpacity={0.08} vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: '#0B1F18', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#0B1F18', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#0B3D2E', border: 'none', borderRadius: 12, color: '#fff', fontSize: 12 }} />
                    <Area type="monotone" dataKey="area" stroke="#0E7490" strokeWidth={2.5} fill="url(#g1)" />
                    <Area type="monotone" dataKey="lost" stroke="#E15554" strokeWidth={2} fill="url(#g2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-3xl bg-[#0B3D2E] text-white p-6 sm:p-8 h-full">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#9DE6CB]">Carbon density · Mg C / ha</div>
              <div className="font-display mt-1 text-2xl font-semibold">Mangroves dwarf every other forest</div>
              <div className="mt-6 h-[260px]">
                <ResponsiveContainer>
                  <RadialBarChart innerRadius="22%" outerRadius="100%" data={carbonStorage} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 1100]} tick={false} />
                    <RadialBar background={{ fill: 'rgba(255,255,255,0.08)' }} dataKey="value" cornerRadius={20} />
                    <Tooltip contentStyle={{ background: '#FAFAF7', border: 'none', borderRadius: 12, color: '#0B3D2E', fontSize: 12 }} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {carbonStorage.map((c) => (
                  <div key={c.name} className="flex items-center gap-2 text-[12px] text-white/85">
                    <span className="h-2 w-2 rounded-full" style={{ background: c.fill }} />
                    {c.name} <span className="ml-auto text-white/60">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function BiodiversitySection() {
  return (
    <section className="relative bg-gradient-tide py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium inline-flex items-center gap-2"><Activity className="h-3.5 w-3.5" /> Biodiversity Pressure</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-3 text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
                Where life is densest — and most at risk.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-[15px] text-[#0B1F18]/65 leading-relaxed">
              Mangrove regions support disproportionately rich marine life. They also host the highest share of IUCN-threatened species. Each bar is a coastline at the front line.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 rounded-3xl bg-white ring-1 ring-[#0B3D2E]/10 p-6 sm:p-8">
            <div className="flex items-center gap-4 text-[11px] text-[#0B1F18]/65 mb-4">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#0E7490]" /> Documented species</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#E15554]" /> IUCN-listed threatened</span>
            </div>
            <div className="h-[340px]">
              <ResponsiveContainer>
                <BarChart data={biodiversityData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="#0B3D2E" strokeOpacity={0.08} vertical={false} />
                  <XAxis dataKey="region" tick={{ fill: '#0B1F18', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#0B1F18', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(11,61,46,0.05)' }} contentStyle={{ background: '#0B3D2E', border: 'none', borderRadius: 12, color: '#fff', fontSize: 12 }} />
                  <Bar dataKey="species" fill="#0E7490" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="threatened" fill="#E15554" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section id="story" className="relative bg-[#FAFAF7] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">Restoration in Motion</span></Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-3 max-w-3xl text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
            Drag the slider. Watch a coastline come back to life.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-[15px] text-[#0B1F18]/65 leading-relaxed">
            Sundarbans · West Bengal. ECODOME community-led replanting of 1,420 hectares. 84% sapling survival at 36 months.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12">
            <BeforeAfter
              before={MANGROVE_DEGRADED}
              after={MANGROVE_AERIAL_HEALTHY}
              beforeLabel="Degraded · 2014"
              afterLabel="Restored · 2024"
            />
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Droplets, k: '84%', l: 'Sapling survival at 36 months', sub: '+31 pts vs. agency-led plantations' },
            { icon: Fish, k: '2.4×', l: 'Increase in juvenile reef sharks', sub: 'BACI study, 11 sites, Bay of Bengal' },
            { icon: Globe2, k: '1,420 ha', l: 'Restored mangrove canopy', sub: 'Community-led, 312 youth volunteers' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="rounded-3xl bg-white p-7 ring-1 ring-[#0B3D2E]/10">
                <s.icon className="h-5 w-5 text-[#0E7490]" />
                <div className="font-display mt-5 text-4xl font-semibold text-[#0B3D2E] tracking-tightest">{s.k}</div>
                <div className="mt-1 text-[14px] font-semibold text-[#0B1F18]">{s.l}</div>
                <div className="mt-1 text-[12.5px] text-[#0B1F18]/55">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScrollStory() {
  const stories = [
    {
      img: SHARK,
      tag: 'Shark Ecology',
      title: 'A nursery the size of a city.',
      body: 'In the lagoons of French Polynesia, juvenile blacktip reef sharks shelter exclusively in mangrove root systems at night. Acoustic tagging of 64 individuals revealed a 92% nocturnal residency rate — meaning the loss of even small mangrove patches translates to direct shark mortality.',
      stat: '92%',
      statLabel: 'Nocturnal residency',
    },
    {
      img: CORAL,
      tag: 'Marine Biodiversity',
      title: 'Coral that survives a heatwave.',
      body: 'During the 2024 marine heatwave, reefs adjacent to mangrove outflow experienced 1.8–2.6 °C lower peak SST and 38% lower bleaching incidence. Tannin-rich water creates a thermal refuge — the mangrove forest is, quite literally, the reef\u2019s shade.',
      stat: '−38%',
      statLabel: 'Bleaching incidence',
    },
    {
      img: DIVER,
      tag: 'Citizen Science',
      title: 'Lab-grade data, by 19-year-olds.',
      body: '312 youth volunteers across 9 countries collected eDNA water samples for biodiversity monitoring. Detection accuracy reached 96.4% versus expert teams — proof that the next generation isn\u2019t just learning the science. They are the science.',
      stat: '96.4%',
      statLabel: 'Lab-equivalent accuracy',
    },
  ]
  return (
    <section className="relative bg-[#0B3D2E] text-white py-20 sm:py-28 lg:py-36 overflow-hidden grain">
      <div className="absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-[#0E7490]/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#9DE6CB] font-medium">Field Notes</span></Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-3 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
            Stories the data cannot tell alone.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-24">
          {stories.map((s, i) => (
            <Reveal key={i} delay={0.05}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                <div className="lg:col-span-7 [direction:ltr]">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-white/10">
                    <Image src={s.img} alt={s.title} fill sizes="(max-width:1024px)100vw,60vw" className="object-cover" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white">{s.tag}</div>
                  </div>
                </div>
                <div className="lg:col-span-5 [direction:ltr]">
                  <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tightest">{s.title}</h3>
                  <p className="mt-5 text-[15.5px] leading-relaxed text-white/75">{s.body}</p>
                  <div className="mt-7 inline-flex items-baseline gap-3 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 px-5 py-3">
                    <span className="font-display text-3xl font-semibold text-[#9DE6CB] tracking-tightest">{s.stat}</span>
                    <span className="text-[12px] uppercase tracking-[0.22em] text-white/60">{s.statLabel}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTAImpact() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2rem] bg-[#FAFAF7] ring-1 ring-[#0B3D2E]/10 p-10 sm:p-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">Add Your Data</span></Reveal>
            <Reveal delay={0.05}>
              <h3 className="font-display mt-3 text-3xl sm:text-4xl font-semibold text-[#0B3D2E] tracking-tightest">
                Help us map the missing 70%.
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[15px] text-[#0B1F18]/65 leading-relaxed max-w-md">
                If you have field data, drone footage, or species sightings from a coastline, contribute them to ECODOME&rsquo;s open atlas.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row md:justify-end gap-3">
              <Link href="/research" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B3D2E] text-white px-6 py-3.5 text-sm font-semibold hover:bg-[#0F5238]">
                Submit Field Data <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#community" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0B3D2E]/20 text-[#0B3D2E] px-6 py-3.5 text-sm font-semibold hover:bg-[#0B3D2E]/5">
                Join as Volunteer
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function ImpactPage() {
  return (
    <main className="relative bg-[#FAFAF7]">
      <Navbar />
      <HeroImpact />
      <KPIBand />
      <AtlasSection />
      <BiodiversitySection />
      <StorySection />
      <ScrollStory />
      <CTAImpact />
      <Footer />
    </main>
  )
}
