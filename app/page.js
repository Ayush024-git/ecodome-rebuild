'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, ArrowDown, Leaf, Fish, Waves, Shield, GraduationCap, Globe2,
  TreePine, ScanSearch, FileText, Compass, Users, Sparkles, MapPin,
  TrendingDown, ChevronRight, Calendar, Clock, Tag, Quote, Heart
} from 'lucide-react'
import { toast } from 'sonner'
import Navbar from '@/components/ecodome/Navbar'
import Footer from '@/components/ecodome/Footer'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ecodome/Reveal'
import FutureProjects from '@/components/ecodome/FutureProjects'

const HERO_IMG = 'https://images.unsplash.com/photo-1771985239333-cbf2ab43f566?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGFlcmlhbHxlbnwwfHx8fDE3NzgxNTY4NjF8MA&ixlib=rb-4.1.0&q=85'
const MANGROVE_AERIAL = 'https://images.unsplash.com/photo-1651011097573-d7783bab82b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwyfHxtYW5ncm92ZSUyMGFlcmlhbHxlbnwwfHx8fDE3NzgxNTY4NjF8MA&ixlib=rb-4.1.0&q=85'
const MANGROVE_ROOTS = 'https://images.unsplash.com/photo-1717292741426-d050f4f25503?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxtYW5ncm92ZSUyMHJvb3RzJTIwdW5kZXJ3YXRlcnxlbnwwfHx8fDE3NzgxNTY4Njl8MA&ixlib=rb-4.1.0&q=85'
const MANGROVE_ROOTS_2 = 'https://images.unsplash.com/photo-1578142880638-9fc9aba285c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwzfHxtYW5ncm92ZSUyMHJvb3RzJTIwdW5kZXJ3YXRlcnxlbnwwfHx8fDE3NzgxNTY4Njl8MA&ixlib=rb-4.1.0&q=85'
const SHARK = 'https://images.unsplash.com/photo-1702382116645-e93f30e25626?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwc2hhcmt8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85'
const SHARK_2 = 'https://images.unsplash.com/photo-1702381964715-dcb5667a92f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHw0fHx1bmRlcndhdGVyJTIwc2hhcmt8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85'
const SHARK_3 = 'https://images.unsplash.com/photo-1702382116546-9ac886ed2e24?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwyfHx1bmRlcndhdGVyJTIwc2hhcmt8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85'
const CORAL = 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJlZWZ8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85'
const CORAL_2 = 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxjb3JhbCUyMHJlZWZ8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85'
const WAVE = 'https://images.unsplash.com/photo-1560260240-c6ef90a163a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwzfHxvY2VhbiUyMHdhdmV8ZW58MHx8fHwxNzc4MTU2ODY5fDA&ixlib=rb-4.1.0&q=85'
const WAVE_2 = 'https://images.unsplash.com/photo-1616141893496-fbc65370493e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmV8ZW58MHx8fHwxNzc4MTU2ODY5fDA&ixlib=rb-4.1.0&q=85'
const DIVER = 'https://images.unsplash.com/photo-1568816633267-1738dc4aaf97?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwzfHxtYXJpbmUlMjByZXNlYXJjaCUyMGRpdmVyfGVufDB8fHx8MTc3ODE1Njg2OXww&ixlib=rb-4.1.0&q=85'

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 140])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2])
  const scale = useTransform(scrollY, [0, 600], [1.05, 1.15])
  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-[#071E16]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={HERO_IMG} alt="Mangrove forest meeting the ocean" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 hero-vignette" />
      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-24 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="inline-flex items-center gap-2 self-start rounded-full glass-dark px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/85"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#7CDFC0] animate-pulse" />
          A Global Youth Movement · Est. 2024
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-display mt-6 max-w-5xl text-balance text-white text-[clamp(2.4rem,6.6vw,5.6rem)] font-semibold leading-[0.98] tracking-tightest"
        >
          Protecting Mangroves.<br />
          Preserving Shark Nurseries.<br />
          <span className="text-[#9DE6CB]">Powering Youth Action.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-7 max-w-2xl text-pretty text-white/80 text-[17px] sm:text-lg leading-relaxed"
        >
          A youth-led global platform combining conservation research, climate awareness, and marine ecosystem protection — from the canopy to the seafloor.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link href="/research" className="group inline-flex items-center gap-2 rounded-full bg-[#FAFAF7] text-[#0B3D2E] px-6 py-3.5 text-sm font-semibold hover:bg-white transition-all shadow-lg shadow-black/30">
            Explore Research <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="#community" className="group inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition-all">
            Join the Movement <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/55">Scroll</span>
        <span className="relative h-9 w-[1px] bg-white/20 overflow-hidden">
          <span className="absolute inset-0 bg-white animate-scroll-pulse" />
        </span>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#FAFAF7]" />
    </section>
  )
}

function StatBar() {
  const stats = [
    { v: '50%', l: 'of mangroves lost since 1950', icon: TrendingDown },
    { v: '4×', l: 'more carbon stored than rainforests', icon: Leaf },
    { v: '30%', l: 'of fish species rely on mangrove nurseries', icon: Fish },
    { v: '180+', l: 'youth researchers across 42 countries', icon: Globe2 },
  ]
  return (
    <section className="relative -mt-16 z-20 mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-3xl bg-[#0B3D2E]/10 shadow-[0_24px_60px_-30px_rgba(11,61,46,0.45)]">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.06} className="bg-[#FAFAF7] p-6 sm:p-7">
            <s.icon className="h-5 w-5 text-[#0E7490]" />
            <div className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-[#0B3D2E] tracking-tightest">{s.v}</div>
            <div className="mt-1 text-[13px] text-[#0B1F18]/65 leading-snug">{s.l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ProblemSnapshot() {
  const items = [
    { kpi: '−3.4M ha', title: 'Mangrove forest lost since 1996', body: 'Aquaculture, coastal development, and warming seas are erasing the planet’s most efficient coastal carbon sink.', icon: TreePine },
    { kpi: '−37%', title: 'Marine biodiversity decline', body: 'Reef and coastal fish populations have collapsed in regions where mangrove nurseries have disappeared.', icon: Fish },
    { kpi: '+1.02 GT', title: 'Carbon released annually', body: 'Mangrove deforestation alone emits more CO₂ than several mid-sized economies combined.', icon: Globe2 },
  ]
  return (
    <section className="relative bg-[#FAFAF7] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">The Crisis</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-3 max-w-3xl text-balance text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
            The coastlines that defend us are vanishing faster than we can map them.
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-[#0B3D2E]/10 hover:ring-[#0B3D2E]/30 transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(11,61,46,0.35)]">
                <it.icon className="h-6 w-6 text-[#0E7490]" />
                <div className="font-display mt-6 text-4xl font-bold text-[#0B3D2E] tracking-tightest">{it.kpi}</div>
                <div className="mt-3 text-[15px] font-semibold text-[#0B1F18]">{it.title}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-[#0B1F18]/65">{it.body}</p>
                <div className="mt-6 inline-flex items-center text-[13px] text-[#0E7490] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Read the report <ChevronRight className="h-4 w-4 ml-0.5" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyMangrovesMatter() {
  const features = [
    { icon: Leaf, title: 'Carbon Storage', desc: 'Mangroves sequester up to 4× more carbon per hectare than tropical rainforests — locked deep in coastal sediments for millennia.', img: MANGROVE_AERIAL, tag: 'Blue Carbon' },
    { icon: Sparkles, title: 'Biodiversity Hotspots', desc: 'A single hectare can host thousands of species — fish, crustaceans, birds, primates — weaving land and sea into one living system.', img: CORAL, tag: 'Ecosystems' },
    { icon: Fish, title: 'Shark Nurseries', desc: 'Juvenile sharks shelter in tangled mangrove roots, protected from predators while they grow into apex regulators of the ocean.', img: SHARK, tag: 'Apex Recovery' },
  ]
  return (
    <section id="mission" className="relative bg-gradient-tide py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px divider-rule" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">Why Mangroves Matter</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-3 text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
                Three reasons the next decade depends on the coastline.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] text-[#0B1F18]/65 leading-relaxed">
              Mangroves sit at the intersection of climate, biodiversity, and human survival. Restore them, and we move every needle at once.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="group relative h-[440px] overflow-hidden rounded-3xl ring-1 ring-[#0B3D2E]/10">
                <Image src={f.img} alt={f.title} fill sizes="(max-width:768px)100vw,33vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071E16] via-[#071E16]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/70">
                    <span className="h-1 w-1 rounded-full bg-[#7CDFC0]" />
                    {f.tag}
                  </div>
                  <div className="mt-3 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                      <f.icon className="h-4 w-4 text-white" />
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-white tracking-tightest">{f.title}</h3>
                  </div>
                  <p className="mt-3 text-[13.5px] text-white/75 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                    {f.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhatIsEcodome() {
  const pillars = [
    { icon: ScanSearch, title: 'Research', desc: 'Open-access papers, field data, and peer-reviewed studies from coastlines worldwide.' },
    { icon: Shield, title: 'Conservation', desc: 'Mangrove replanting, shark nursery monitoring, and reef protection programs.' },
    { icon: GraduationCap, title: 'Youth Participation', desc: 'A platform for the next generation to contribute, lead, and be heard.' },
    { icon: Globe2, title: 'Global Collaboration', desc: 'Universities, NGOs, governments, and Indigenous communities on one stack.' },
  ]
  return (
    <section className="relative bg-[#0B3D2E] text-[#FAFAF7] py-28 sm:py-36 overflow-hidden grain">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#0E7490]/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-[#7CDFC0]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#9DE6CB] font-medium">What is ECODOME</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
                A research dome for the planet — built by the youth defending it.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 text-[15.5px] leading-relaxed text-white/75 max-w-lg">
                ECODOME unites field researchers, marine biologists, climate students, and conservation organizations on a single open platform. Publish your findings, replicate field protocols, join campaigns — from documenting mangrove loss in the Sundarbans to tagging juvenile reef sharks in the Pacific.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex items-center gap-3">
                <Link href="/research" className="inline-flex items-center gap-2 rounded-full bg-[#FAFAF7] text-[#0B3D2E] px-5 py-3 text-sm font-semibold hover:bg-white">
                  Browse the Research Hub <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#community" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold hover:bg-white/10">
                  Become a Contributor
                </Link>
              </div>
            </Reveal>
          </div>
          <StaggerGroup className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <StaggerItem key={i}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 hover:bg-white/[0.07] hover:border-white/20 transition-all hover:-translate-y-0.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0E7490]/30 ring-1 ring-[#0E7490]/40">
                    <p.icon className="h-5 w-5 text-[#9DE6CB]" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tightest">{p.title}</h3>
                  <p className="mt-2 text-[14px] text-white/65 leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}

function FeaturedResearch({ papers }) {
  return (
    <section className="relative bg-[#FAFAF7] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">Featured Research</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-3 text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
                Field-grade science. Open to everyone.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/research" className="inline-flex items-center gap-2 rounded-full bg-[#0B3D2E] text-[#FAFAF7] px-5 py-3 text-sm font-semibold hover:bg-[#0F5238]">
              Open Research Hub <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(papers || []).slice(0, 6).map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.07}>
              <Link href={`/research/${p.id}`} className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-[#0B3D2E]/10 hover:ring-[#0B3D2E]/30 transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(11,61,46,0.35)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0B3D2E]/5">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width:768px)100vw,33vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[#0B3D2E] font-medium">
                    <Tag className="h-3 w-3" /> {p.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-[#0B1F18]/55">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.year}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.region}</span>
                  </div>
                  <h3 className="mt-3 font-display text-[19px] leading-snug font-semibold text-[#0B3D2E] line-clamp-2 group-hover:text-[#0F5238]">{p.title}</h3>
                  <p className="mt-3 text-[13.5px] text-[#0B1F18]/65 leading-relaxed line-clamp-3">{p.abstract}</p>
                  <div className="mt-5 pt-5 border-t border-[#0B3D2E]/10 flex items-center justify-between">
                    <div className="text-[12px] text-[#0B1F18]/70">{p.authors?.[0]}{p.authors?.length > 1 ? ` +${p.authors.length - 1}` : ''}</div>
                    <span className="inline-flex items-center text-[12px] font-semibold text-[#0E7490] group-hover:gap-2 transition-all gap-1">Read more <ChevronRight className="h-3.5 w-3.5" /></span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImpactStrip() {
  const stats = [
    { v: '1.2M', l: 'Mangrove saplings planted', icon: TreePine },
    { v: '342', l: 'Research papers published', icon: FileText },
    { v: '12,400', l: 'Volunteers worldwide', icon: Users },
    { v: '42', l: 'Countries on the platform', icon: Globe2 },
  ]
  return (
    <section id="impact" className="relative py-28 sm:py-36 bg-[#FAFAF7] overflow-hidden">
      <div className="absolute inset-0">
        <Image src={WAVE} alt="" fill sizes="100vw" className="object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF7] via-[#FAFAF7]/70 to-[#FAFAF7]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">Live Impact</span></Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-3 max-w-3xl text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
            Numbers updated in the field, not on slides.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="rounded-3xl bg-white p-7 ring-1 ring-[#0B3D2E]/10">
                <s.icon className="h-5 w-5 text-[#0E7490]" />
                <div className="font-display mt-5 text-4xl sm:text-5xl font-semibold text-[#0B3D2E] tracking-tightest">{s.v}</div>
                <div className="mt-1 text-[13px] text-[#0B1F18]/65">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Campaigns() {
  const campaigns = [
    { tag: 'Active', img: MANGROVE_ROOTS, title: 'Sundarbans Replant 2025', desc: 'Restoring 80,000 mangrove saplings across degraded coastline in West Bengal.', loc: 'India · Bangladesh', progress: 64 },
    { tag: 'Recruiting', img: SHARK_2, title: 'Shark Nursery Census', desc: 'Tagging and monitoring juvenile blacktip reef sharks across Pacific atolls.', loc: 'French Polynesia', progress: 28 },
    { tag: 'Coming Soon', img: CORAL_2, title: 'Coral-Mangrove Corridor', desc: 'Mapping connectivity between reef systems and mangrove nurseries via eDNA.', loc: 'Caribbean', progress: 12 },
  ]
  return (
    <section id="campaigns" className="relative bg-[#FAFAF7] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">Campaigns & Projects</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-3 text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
                On the ground. Under the water. Worldwide.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {campaigns.map((c, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group rounded-3xl overflow-hidden bg-white ring-1 ring-[#0B3D2E]/10 hover:ring-[#0B3D2E]/30 transition-all hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={c.img} alt={c.title} fill sizes="(max-width:768px)100vw,33vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-4 left-4 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium ${c.tag === 'Active' ? 'bg-[#9DE6CB] text-[#0B3D2E]' : c.tag === 'Recruiting' ? 'bg-[#0E7490] text-white' : 'bg-white/85 text-[#0B3D2E]'}`}>{c.tag}</span>
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 text-[11px] text-white/85"><MapPin className="h-3 w-3" /> {c.loc}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-[#0B3D2E] tracking-tightest">{c.title}</h3>
                  <p className="mt-2 text-[13.5px] text-[#0B1F18]/65 leading-relaxed">{c.desc}</p>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-[11px] text-[#0B1F18]/55 mb-1.5"><span>Progress</span><span>{c.progress}%</span></div>
                    <div className="h-1.5 rounded-full bg-[#0B3D2E]/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#0B3D2E] to-[#0E7490] rounded-full" style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                  <button className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0B3D2E] text-[#FAFAF7] px-4 py-2.5 text-[13px] font-semibold hover:bg-[#0F5238] transition-colors">
                    Volunteer <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CommunityVoices() {
  return (
    <section id="community" className="relative bg-[#0B3D2E] text-white py-28 sm:py-36 overflow-hidden grain">
      <div className="absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-[#0E7490]/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-[#9DE6CB] font-medium">Community & Youth Network</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
                The most ambitious youth coalition the ocean has ever seen.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-white/70 text-[15px] leading-relaxed">
              Researchers, ambassadors, divers, illustrators, policy nerds, and field volunteers — connected across 42 countries with shared protocols and open data.
            </p>
            <Link href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-[#0B3D2E] px-5 py-3 text-sm font-semibold hover:bg-white/90">
              Apply to be an Ambassador <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Partners() {
  const partners = ['UNESCO Ocean Decade','Smithsonian','NatGeo Society','IUCN','Stanford OE','MIT Sea Grant','WWF','Reef Check','Mongabay']
  return (
    <section className="bg-[#FAFAF7] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[#0B1F18]/50">In collaboration with research institutions worldwide</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-x-8 gap-y-6 items-center">
            {partners.map((p) => (
              <div key={p} className="text-center text-[12.5px] font-semibold tracking-tight text-[#0B1F18]/40 hover:text-[#0B3D2E] transition-colors">
                {p}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#071E16] text-white">
          <Image src={WAVE_2} alt="" fill sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071E16] via-[#071E16]/85 to-[#071E16]/40" />
          <div className="relative px-8 sm:px-14 py-20 sm:py-28 max-w-3xl">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#9DE6CB] font-medium">Join Us</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest text-balance">
                The ocean does not need spectators. It needs you.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-white/75 text-[16px] leading-relaxed max-w-xl">
                Volunteer, contribute research, run a campaign in your region, or fund a field project. Every action multiplies across the network.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="#community" className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B3D2E] px-6 py-3.5 text-sm font-semibold hover:bg-white/90">
                  Join the Movement <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/research" className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-6 py-3.5 text-sm font-semibold hover:bg-white/10">
                  Submit Research <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white px-3 py-3.5">
                  <Heart className="h-4 w-4" /> Donate
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [papers, setPapers] = useState([])

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        // Trigger seed if empty (idempotent)
        await fetch('/api/research/seed', { method: 'POST' })
        const r = await fetch('/api/research?limit=6')
        const data = await r.json()
        if (alive) setPapers(data?.items || [])
      } catch (e) { /* ignore */ }
    })()
    return () => { alive = false }
  }, [])

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <StatBar />
      <ProblemSnapshot />
      <WhyMangrovesMatter />
      <WhatIsEcodome />
      <FeaturedResearch papers={papers} />
      <ImpactStrip />
      <FutureProjects />
      <CommunityVoices />
      <Partners />
      <CTASection />
      <Footer />
    </main>
  )
}

export default App;
