'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, BookmarkPlus, BookmarkCheck, Calendar, MapPin, Tag, Download, Share2, ChevronRight, FileText, ExternalLink } from 'lucide-react'
import Navbar from '@/components/ecodome/Navbar'
import Footer from '@/components/ecodome/Footer'
import { Reveal } from '@/components/ecodome/Reveal'
import { papers, paperImage, downloadName } from '@/lib/papers'
import { useBookmarks } from '@/hooks/use-bookmarks'
import { toast } from 'sonner'

export default function ResearchPaperPage({ params }) {
  const paper = papers.find((p) => p.id === params.id)
  const { ids, toggle } = useBookmarks()

  if (!paper) {
    return (
      <main className="min-h-screen bg-[#FAFAF7]"><Navbar variant="light" />
        <div className="pt-44 max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-display text-3xl font-bold text-[#0B3D2E]">Paper not found</h1>
          <Link href="/research" className="mt-6 inline-flex rounded-full bg-[#0B3D2E] text-white px-5 py-3 text-sm font-semibold">Back to Research Hub</Link>
        </div>
        <Footer />
      </main>
    )
  }

  const related = papers.filter((p) => p.category === paper.category && p.id !== paper.id).slice(0, 3)
  const bookmarked = ids.has(paper.id)

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: paper.title, text: paper.abstract.slice(0, 140), url: window.location.href })
      else { await navigator.clipboard.writeText(window.location.href); toast.success('Link copied') }
    } catch {}
  }

  return (
    <main className="relative bg-[#FAFAF7]">
      <Navbar variant="light" />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-14 sm:pb-16 bg-[#0B3D2E] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image src={paperImage(paper)} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/50 via-[#0B3D2E]/85 to-[#0B3D2E]" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Link href="/research" className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] text-white/70 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Research Hub</Link>
          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/85"><Tag className="h-3 w-3" /> {paper.category}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-[11px] text-white/85"><MapPin className="h-3 w-3" /> {paper.region}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-[11px] text-white/85"><Calendar className="h-3 w-3" /> {paper.year}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display mt-6 text-balance text-[clamp(1.7rem,5.4vw,3.6rem)] font-semibold leading-[1.06] sm:leading-[1.04] tracking-tightest">{paper.title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-white/75 text-[14px]">By {paper.authors.join(' · ')}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <a href={paper.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10"><ExternalLink className="h-4 w-4" /> Open PDF</a>
              <a href={paper.file} download={downloadName(paper)} className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0B3D2E] px-5 py-3 text-sm font-semibold hover:bg-white/90"><Download className="h-4 w-4" /> Download</a>
              <button onClick={() => toggle(paper.id)} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10">
                {bookmarked ? <><BookmarkCheck className="h-4 w-4" /> Saved</> : <><BookmarkPlus className="h-4 w-4" /> Save</>}
              </button>
              <button onClick={share} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10"><Share2 className="h-4 w-4" /> Share</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8">
            <Reveal>
              <h2 className="font-display text-xl font-semibold text-[#0B3D2E] tracking-tight">Abstract</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-[16px] leading-[1.8] text-[#0B1F18]/85">{paper.abstract}</p>
            </Reveal>

            {paper.tags?.length > 0 && (
              <Reveal>
                <div className="mt-12">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#0B1F18]/55 mb-3">Keywords</div>
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map((t) => <span key={t} className="rounded-full bg-white ring-1 ring-[#0B3D2E]/10 px-3 py-1 text-[12px] text-[#0B3D2E]">{t}</span>)}
                  </div>
                </div>
              </Reveal>
            )}
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-3xl bg-white ring-1 ring-[#0B3D2E]/10 p-6">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#0B1F18]/55 mb-3">Paper Stats</div>
                <div className="grid grid-cols-2 gap-4">
                  <Stat label="Year" value={paper.year} />
                  <Stat label="Region" value={paper.region} />
                  <Stat label="Authors" value={paper.authors.length} />
                  <Stat label="Access" value="Open" />
                </div>
              </div>
              <div className="rounded-3xl bg-[#0B3D2E] text-white p-6">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#9DE6CB] mb-3">Authors</div>
                <ul className="space-y-2">
                  {paper.authors.map((a) => (
                    <li key={a} className="text-[14px] flex items-center gap-2">
                      <span className="h-7 w-7 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-[11px] font-semibold">{a.split(' ').map((s) => s[0]).slice(0, 2).join('')}</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <a href={paper.file} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-3xl bg-[#FAFAF7] ring-1 ring-[#0B3D2E]/15 px-5 py-4 hover:bg-white">
                <span className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#0E7490]" />
                  <span className="text-[13px] font-semibold text-[#0B3D2E]">Full PDF · Open Access</span>
                </span>
                <ExternalLink className="h-4 w-4 text-[#0B3D2E]/55" />
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0B3D2E]">Related research</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.id} href={`/research/${r.id}`} className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-[#0B3D2E]/10 hover:ring-[#0B3D2E]/30 transition-all hover:-translate-y-1">
                  <div className="relative aspect-[16/9]">
                    <Image src={paperImage(r)} alt={r.title} fill sizes="(max-width:1024px)100vw,33vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#0E7490]">{r.category}</div>
                    <h3 className="mt-2 font-display text-[15.5px] leading-snug font-semibold text-[#0B3D2E] line-clamp-2">{r.title}</h3>
                    <span className="mt-3 inline-flex items-center text-[12px] text-[#0E7490] gap-1 group-hover:gap-2 transition-all">Read paper <ChevronRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-[#0B3D2E] tracking-tightest">{value}</div>
      <div className="text-[11px] text-[#0B1F18]/55 mt-0.5">{label}</div>
    </div>
  )
}
