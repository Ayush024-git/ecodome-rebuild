'use client'

import { FileText, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ecodome/Reveal'

const papers = [
  {
    title: 'Why Sharks Are Essential to Mangrove Forest Ecosystems',
    category: 'Marine Ecology',
    author: 'Divya Venkatesan',
    description:
      'A deep ecological analysis of sharks as keystone species within mangrove ecosystems and their role in maintaining trophic balance.',
    file: '/docs/guardians-of-the-tidal-forest.pdf',
  },
  {
    title: 'The Role of Mangrove Forests in Ecology and Economy',
    category: 'Mangrove Conservation',
    author: 'Zenha K',
    description:
      'Explores how mangrove forests support biodiversity, fisheries, climate resilience, and coastal economies worldwide.',
    file: '/docs/roles-of-mangrove-forests.pdf',
  },
  {
    title: 'How Habitat Fragmentation Affects Early-Life Survival Strategies in Sharks',
    category: 'Shark Conservation',
    author: 'Syeda Aleeza Anaum',
    description:
      'Research on how fragmented coastal ecosystems impact juvenile shark survival, behavior, and nursery connectivity.',
    file: '/docs/habitat-fragmentation.pdf',
  },
  {
    title: 'Pilot Study Design: Modular HDPE Dome System',
    category: 'Pilot Research',
    author: 'Zenha K',
    description:
      'A proposed pilot framework testing EcoDome’s modular mangrove stabilization system in degraded coastal habitats.',
    file: '/docs/pilot-study-design.pdf',
  },
  {
    title: 'EcoDome: Mangroves × Sharks Project Framework',
    category: 'Environmental Innovation',
    author: 'EcoDome Research Team',
    description:
      'The foundational EcoDome research proposal connecting mangrove restoration with shark nursery protection.',
    file: '/docs/ecodome-mangroves-x-sharks.pdf',
  },
]

export default function ResearchArchive() {
  return (
    <section className="relative bg-[#F7F7F2] py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#0E7490] font-medium">
            Research Archive
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display mt-3 max-w-4xl text-[#0B3D2E] text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tightest">
            Scientific publications, field studies, and conservation frameworks.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {papers.map((paper, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <a
                href={paper.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl bg-white p-7 ring-1 ring-[#0B3D2E]/10 hover:ring-[#0B3D2E]/25 transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(11,61,46,0.28)]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-[#0E7490]/10 text-[#0E7490] px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold">
                      {paper.category}
                    </div>

                    <h3 className="mt-5 font-display text-2xl leading-tight font-semibold text-[#0B3D2E] group-hover:text-[#0E7490] transition-colors">
                      {paper.title}
                    </h3>

                    <p className="mt-4 text-[14px] leading-relaxed text-[#0B1F18]/65">
                      {paper.description}
                    </p>

                    <div className="mt-5 text-[13px] text-[#0B1F18]/55">
                      By {paper.author}
                    </div>
                  </div>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B3D2E]/5 text-[#0E7490] group-hover:bg-[#0E7490] group-hover:text-white transition-all">
                    <FileText className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-7 pt-5 border-t border-[#0B3D2E]/10 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0B3D2E]">
                    Open Research Paper
                  </span>

                  <ArrowUpRight className="h-4 w-4 text-[#0E7490] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
