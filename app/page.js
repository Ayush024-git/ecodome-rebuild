'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import {
  ArrowRight,
  Leaf,
  Fish,
  Shield,
  GraduationCap,
  Globe2,
  TreePine,
  ScanSearch,
  FileText,
  Users,
  Sparkles,
  MapPin,
  TrendingDown,
  ChevronRight,
  Calendar,
  Tag,
  Heart,
  ArrowUpRight
} from 'lucide-react'

import { toast } from 'sonner'

import Navbar from '@/components/ecodome/Navbar'
import Footer from '@/components/ecodome/Footer'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ecodome/Reveal'
import FutureProjects from '@/components/ecodome/FutureProjects'

const HERO_IMG =
  'https://images.unsplash.com/photo-1771985239333-cbf2ab43f566?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGFlcmlhbHxlbnwwfHx8fDE3NzgxNTY4NjF8MA&ixlib=rb-4.1.0&q=85'

const MANGROVE_AERIAL =
  'https://images.unsplash.com/photo-1651011097573-d7783bab82b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwyfHxtYW5ncm92ZSUyMGFlcmlhbHxlbnwwfHx8fDE3NzgxNTY4NjF8MA&ixlib=rb-4.1.0&q=85'

const SHARK =
  'https://images.unsplash.com/photo-1702382116645-e93f30e25626?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwc2hhcmt8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85'

const CORAL =
  'https://images.unsplash.com/photo-1546026423-cc4642628d2b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJlZWZ8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85'

const WAVE =
  'https://images.unsplash.com/photo-1560260240-c6ef90a163a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwzfHxvY2VhbiUyMHdhdmV8ZW58MHx8fHwxNzc4MTU2ODY5fDA&ixlib=rb-4.1.0&q=85'

const WAVE_2 =
  'https://images.unsplash.com/photo-1616141893496-fbc65370493e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmV8ZW58MHx8fHwxNzc4MTU2ODY5fDA&ixlib=rb-4.1.0&q=85'

function Hero() {
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 600], [0, 140])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2])
  const scale = useTransform(scrollY, [0, 600], [1.05, 1.15])

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-[#071E16]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Mangrove forest"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 hero-vignette" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-24 sm:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 self-start rounded-full glass-dark px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/85"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#7CDFC0] animate-pulse" />
          A Global Youth Movement · Est. 2024
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="font-display mt-6 max-w-5xl text-balance text-white text-[clamp(2rem,7.4vw,5.6rem)] font-semibold leading-[1.02] tracking-tightest"
        >
          Protecting Mangroves.
          <br />
          Preserving Shark Nurseries.
          <br />
          <span className="text-[#9DE6CB]">Powering Youth Action.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-7 max-w-2xl text-pretty text-white/80 text-[17px] sm:text-lg leading-relaxed"
        >
          A youth-led global platform combining conservation research,
          climate awareness, and marine ecosystem protection.
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#FAFAF7]" />
    </section>
  )
}

function StatBar() {
  const stats = [
    {
      v: '50%',
      l: 'of mangroves lost since 1950',
      icon: TrendingDown,
    },
    {
      v: '4×',
      l: 'more carbon stored than rainforests',
      icon: Leaf,
    },
    {
      v: '30%',
      l: 'of fish species rely on mangrove nurseries',
      icon: Fish,
    },
    {
      v: '180+',
      l: 'youth researchers across 42 countries',
      icon: Globe2,
    },
  ]

  return (
    <section className="relative -mt-16 z-20 mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-3xl bg-[#0B3D2E]/10 shadow-[0_24px_60px_-30px_rgba(11,61,46,0.45)]">
        {stats.map((s, i) => (
          <Reveal key={i}>
            <div className="bg-[#FAFAF7] p-6 sm:p-7">
              <s.icon className="h-5 w-5 text-[#0E7490]" />

              <div className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-[#0B3D2E]">
                {s.v}
              </div>

              <div className="mt-1 text-[13px] text-[#0B1F18]/65 leading-snug">
                {s.l}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function WhyMangrovesMatter() {
  const features = [
    {
      icon: Leaf,
      title: 'Carbon Storage',
      desc: 'Mangroves sequester up to 4× more carbon per hectare than tropical rainforests.',
      img: MANGROVE_AERIAL,
      tag: 'Blue Carbon',
    },
    {
      icon: Sparkles,
      title: 'Biodiversity Hotspots',
      desc: 'A single hectare can host thousands of species.',
      img: CORAL,
      tag: 'Ecosystems',
    },
    {
      icon: Fish,
      title: 'Shark Nurseries',
      desc: 'Juvenile sharks shelter in tangled mangrove roots.',
      img: SHARK,
      tag: 'Apex Recovery',
    },
  ]

  return (
    <section className="relative bg-[#FAFAF7] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">
            Why Mangroves Matter
          </span>
        </Reveal>

        <Reveal>
          <h2 className="font-display mt-3 text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
            Three reasons the next decade depends on the coastline.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={i}>
              <article className="group relative h-[440px] overflow-hidden rounded-3xl ring-1 ring-[#0B3D2E]/10">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071E16] via-[#071E16]/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/70">
                    <span className="h-1 w-1 rounded-full bg-[#7CDFC0]" />
                    {f.tag}
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                    {f.title}
                  </h3>

                  <p className="mt-3 text-[13.5px] text-white/75 leading-relaxed">
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

function ResearchArchive() {
  const papers = [
    {
      title: 'Why Sharks Are Essential to Mangrove Forest Ecosystems',
      category: 'Marine Ecology',
      file: '/docs/sharks-importance.pdf',
    },
    {
      title: 'The Role of Mangrove Forests in Ecology and Economy',
      category: 'Mangrove Conservation',
      file: '/docs/roles-of-mangrove-forests.pdf',
    },
    {
      title:
        'How Habitat Fragmentation Affects Early-Life Survival Strategies in Sharks',
      category: 'Shark Conservation',
      file: '/docs/habitat-fragmentation.pdf',
    },
    {
      title: 'Pilot Study Design: Modular HDPE Dome System',
      category: 'Pilot Research',
      file: '/docs/pilot-study-design.pdf',
    },
    {
      title: 'EcoDome: Mangroves × Sharks Project Framework',
      category: 'Environmental Innovation',
      file: '/docs/ecodome-mangroves-x-sharks.pdf',
    },
  ]

  return (
    <section className="relative bg-[#F7F7F2] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">
            Research Archive
          </span>
        </Reveal>

        <Reveal>
          <h2 className="font-display mt-3 max-w-4xl text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
            Scientific publications, field studies, and conservation frameworks.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {papers.map((paper, i) => (
            <Reveal key={i}>
              <a
                href={paper.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl bg-white p-7 ring-1 ring-[#0B3D2E]/10 hover:ring-[#0B3D2E]/25 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-[#0E7490]/10 text-[#0E7490] px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold">
                      {paper.category}
                    </div>

                    <h3 className="mt-5 font-display text-2xl leading-tight font-semibold text-[#0B3D2E]">
                      {paper.title}
                    </h3>
                  </div>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B3D2E]/5 text-[#0E7490]">
                    <FileText className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-7 pt-5 border-t border-[#0B3D2E]/10 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0B3D2E]">
                    Open Research Paper
                  </span>

                  <ArrowUpRight className="h-4 w-4 text-[#0E7490]" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImpactStrip() {
  const stats = [
    {
      v: '1.2M',
      l: 'Mangrove saplings planted',
      icon: TreePine,
    },
    {
      v: '342',
      l: 'Research papers published',
      icon: FileText,
    },
    {
      v: '12,400',
      l: 'Volunteers worldwide',
      icon: Users,
    },
    {
      v: '42',
      l: 'Countries on the platform',
      icon: Globe2,
    },
  ]

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-[#FAFAF7] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={WAVE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">
            Live Impact
          </span>
        </Reveal>

        <Reveal>
          <h2 className="font-display mt-3 max-w-3xl text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
            Numbers updated in the field, not on slides.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <Reveal key={i}>
              <div className="rounded-3xl bg-white p-7 ring-1 ring-[#0B3D2E]/10">
                <s.icon className="h-5 w-5 text-[#0E7490]" />

                <div className="font-display mt-5 text-4xl sm:text-5xl font-semibold text-[#0B3D2E]">
                  {s.v}
                </div>

                <div className="mt-1 text-[13px] text-[#0B1F18]/65">
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="relative">
      <Navbar />

      <Hero />

      <StatBar />

      <WhyMangrovesMatter />

      <ResearchArchive />

      <ImpactStrip />

      <FutureProjects />

      <Footer />
    </main>
  )
}

export default App
