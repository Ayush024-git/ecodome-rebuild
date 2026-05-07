'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, Calendar, MapPin, Tag, ChevronRight, BookmarkPlus, BookmarkCheck, ArrowLeft, SlidersHorizontal, FileText, Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Navbar from '@/components/ecodome/Navbar'
import Footer from '@/components/ecodome/Footer'
import { Reveal } from '@/components/ecodome/Reveal'

const CATEGORIES = ['Mangrove Conservation','Marine Biodiversity','Shark Ecology','Climate Impact']

function useUserKey() {
  const [k, setK] = useState('')
  useEffect(() => {
    let v = typeof window !== 'undefined' ? localStorage.getItem('ecodome:userKey') : ''
    if (!v) { v = 'u_' + Math.random().toString(36).slice(2, 10); localStorage.setItem('ecodome:userKey', v) }
    setK(v)
  }, [])
  return k
}

function useBookmarks(userKey) {
  const [ids, setIds] = useState(new Set())
  useEffect(() => {
    if (!userKey) return
    fetch(`/api/bookmarks?userKey=${userKey}`).then(r => r.json()).then(d => {
      setIds(new Set((d.items || []).map(b => b.paperId)))
    }).catch(() => {})
  }, [userKey])
  const toggle = async (paperId) => {
    if (!userKey) return
    if (ids.has(paperId)) {
      await fetch(`/api/bookmarks?userKey=${userKey}&paperId=${paperId}`, { method: 'DELETE' })
      setIds(prev => { const n = new Set(prev); n.delete(paperId); return n })
      toast('Removed bookmark')
    } else {
      await fetch('/api/bookmarks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paperId, userKey }) })
      setIds(prev => new Set(prev).add(paperId))
      toast.success('Saved to your library')
    }
  }
  return { ids, toggle }
}

export default function ResearchHubPage() {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')
  const [year, setYear] = useState('')
  const [data, setData] = useState({ items: [], total: 0, facets: { categories: [], regions: [], years: [], authors: [] } })
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const userKey = useUserKey()
  const { ids, toggle } = useBookmarks(userKey)

  useEffect(() => {
    let cancel = false
    setLoading(true)
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category) params.set('category', category)
    if (region) params.set('region', region)
    if (year) params.set('year', year)
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/research?${params.toString()}`)
        const d = await r.json()
        if (!cancel) setData(d)
      } finally {
        if (!cancel) setLoading(false)
      }
    }, 220)
    return () => { cancel = true; clearTimeout(t) }
  }, [q, category, region, year])

  const clearAll = () => { setQ(''); setCategory(''); setRegion(''); setYear('') }
  const activeFilters = [category, region, year].filter(Boolean).length + (q ? 1 : 0)

  return (
    <main className="relative min-h-screen bg-[#FAFAF7]">
      <Navbar variant="light" />
      {/* Hero */}
      <section className="relative pt-36 sm:pt-44 pb-16 bg-gradient-to-b from-[#0B3D2E] via-[#0F5238] to-[#0B3D2E] text-white overflow-hidden grain">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1717292741426-d050f4f25503?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxtYW5ncm92ZSUyMHJvb3RzJTIwdW5kZXJ3YXRlcnxlbnwwfHx8fDE3NzgxNTY4Njl8MA&ixlib=rb-4.1.0&q=85" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/60 via-[#0B3D2E]/80 to-[#0B3D2E]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] text-white/70 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Back to ECODOME</Link>
          <Reveal>
            <span className="mt-6 inline-block text-[11px] uppercase tracking-[0.3em] text-[#9DE6CB] font-medium">Research Hub</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display mt-3 max-w-4xl text-[clamp(2.2rem,5.4vw,4.5rem)] font-semibold leading-[1.02] tracking-tightest text-balance">
              The world’s open library for mangrove, marine, and shark research.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">
              {data.total || '—'} peer-reviewed papers, field reports, and youth-led studies from 42 countries. Search, filter, save, and contribute.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center gap-2 max-w-3xl">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0B3D2E]/50" />
                <input
                  value={q} onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by title, author, region, tag…"
                  className="w-full rounded-full bg-white text-[#0B1F18] placeholder:text-[#0B3D2E]/50 px-12 py-4 text-[14.5px] focus:outline-none focus:ring-4 focus:ring-[#9DE6CB]/30"
                />
                {q && (
                  <button onClick={() => setQ('')} className="absolute right-4 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full hover:bg-[#0B3D2E]/5 flex items-center justify-center">
                    <X className="h-4 w-4 text-[#0B3D2E]/60" />
                  </button>
                )}
              </div>
              <button onClick={() => setFiltersOpen(true)} className="sm:hidden inline-flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#0B3D2E]">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-5 flex items-center gap-2 flex-wrap">
              <button onClick={() => setCategory('')} className={`rounded-full px-3.5 py-1.5 text-[12px] transition ${!category ? 'bg-white text-[#0B3D2E] font-semibold' : 'bg-white/10 text-white hover:bg-white/15'}`}>All Topics</button>
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c === category ? '' : c)} className={`rounded-full px-3.5 py-1.5 text-[12px] transition ${category === c ? 'bg-white text-[#0B3D2E] font-semibold' : 'bg-white/10 text-white hover:bg-white/15'}`}>{c}</button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar filters */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-8">
              <FacetGroup title="Region" options={data.facets.regions} value={region} onChange={setRegion} />
              <FacetGroup title="Year" options={data.facets.years} value={year} onChange={(v) => setYear(v ? String(v) : '')} />
              <FacetGroup title="Top Authors" options={data.facets.authors} value={''} onChange={(v) => setQ(v)} small />
              {activeFilters > 0 && (
                <button onClick={clearAll} className="inline-flex items-center gap-1.5 text-[12px] text-[#0E7490] hover:underline">
                  <X className="h-3.5 w-3.5" /> Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between">
              <div className="text-[13px] text-[#0B1F18]/65">
                {loading ? 'Searching…' : <><span className="font-semibold text-[#0B3D2E]">{data.total}</span> result{data.total === 1 ? '' : 's'}{category && <> in <span className="text-[#0B3D2E] font-medium">{category}</span></>}</>}
              </div>
              {activeFilters > 0 && (
                <button onClick={clearAll} className="text-[12px] text-[#0E7490] hover:underline">Clear filters</button>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <AnimatePresence mode="popLayout">
                {(data.items || []).map((p, i) => (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, delay: (i % 4) * 0.04, ease: [0.22,1,0.36,1] }}
                    className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-[#0B3D2E]/10 hover:ring-[#0B3D2E]/30 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgba(11,61,46,0.35)] transition-all"
                  >
                    <Link href={`/research/${p.id}`} className="block">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image src={p.image} alt={p.title} fill sizes="(max-width:1024px)100vw,50vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[#0B3D2E] font-medium">
                          <Tag className="h-3 w-3" /> {p.category}
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={(e) => { e.preventDefault(); toggle(p.id) }}
                      className="absolute top-3 right-3 z-10 inline-flex items-center justify-center h-9 w-9 rounded-full glass hover:bg-white"
                      aria-label="Bookmark"
                    >
                      {ids.has(p.id) ? <BookmarkCheck className="h-4 w-4 text-[#0B3D2E]" /> : <BookmarkPlus className="h-4 w-4 text-[#0B3D2E]" />}
                    </button>
                    <Link href={`/research/${p.id}`} className="block p-6">
                      <div className="flex items-center gap-3 text-[11px] text-[#0B1F18]/55">
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.year}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.region}</span>
                        <span className="inline-flex items-center gap-1"><Quote className="h-3 w-3" /> {p.citations}</span>
                      </div>
                      <h3 className="mt-3 font-display text-[18.5px] leading-snug font-semibold text-[#0B3D2E] line-clamp-2 group-hover:text-[#0F5238]">{p.title}</h3>
                      <p className="mt-3 text-[13.5px] text-[#0B1F18]/65 leading-relaxed line-clamp-3">{p.abstract}</p>
                      <div className="mt-5 pt-4 border-t border-[#0B3D2E]/10 flex items-center justify-between">
                        <div className="text-[12px] text-[#0B1F18]/70 truncate max-w-[60%]">{p.authors?.[0]}{p.authors?.length > 1 ? ` +${p.authors.length - 1}` : ''}</div>
                        <span className="inline-flex items-center text-[12px] font-semibold text-[#0E7490] gap-1 group-hover:gap-2 transition-all">Read paper <ChevronRight className="h-3.5 w-3.5" /></span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {!loading && data.items?.length === 0 && (
              <div className="mt-16 rounded-3xl border border-dashed border-[#0B3D2E]/20 p-14 text-center">
                <FileText className="h-7 w-7 text-[#0B3D2E]/40 mx-auto" />
                <p className="mt-3 text-[#0B1F18]/65">No papers match your search.</p>
                <button onClick={clearAll} className="mt-4 inline-flex text-[13px] font-semibold text-[#0E7490] hover:underline">Reset filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-[#0B3D2E]/60 backdrop-blur-md" onClick={() => setFiltersOpen(false)} />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 240 }} className="absolute bottom-0 inset-x-0 max-h-[85vh] overflow-y-auto bg-[#FAFAF7] rounded-t-3xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-[#0B3D2E]">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="h-9 w-9 rounded-full hover:bg-[#0B3D2E]/5 flex items-center justify-center"><X className="h-5 w-5 text-[#0B3D2E]" /></button>
              </div>
              <div className="mt-6 space-y-8">
                <FacetGroup title="Category" options={data.facets.categories} value={category} onChange={(v) => { setCategory(v); setFiltersOpen(false) }} />
                <FacetGroup title="Region" options={data.facets.regions} value={region} onChange={setRegion} />
                <FacetGroup title="Year" options={data.facets.years} value={year} onChange={(v) => setYear(v ? String(v) : '')} />
              </div>
              <button onClick={() => { clearAll(); setFiltersOpen(false) }} className="mt-8 w-full rounded-full bg-[#0B3D2E] text-white py-3 font-semibold">Clear & Apply</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}

function FacetGroup({ title, options = [], value, onChange, small = false }) {
  if (!options?.length) return null
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-[#0B1F18]/55 font-medium mb-3">{title}</div>
      <div className={small ? 'flex flex-wrap gap-2' : 'space-y-1'}>
        {options.slice(0, 10).map((o) => {
          const v = String(o.value)
          const selected = String(value) === v
          return (
            <button
              key={v}
              onClick={() => onChange(selected ? '' : o.value)}
              className={small
                ? `rounded-full px-3 py-1 text-[11.5px] ${selected ? 'bg-[#0B3D2E] text-white' : 'bg-white text-[#0B1F18]/75 ring-1 ring-[#0B3D2E]/10 hover:ring-[#0B3D2E]/30'}`
                : `w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-[13px] transition ${selected ? 'bg-[#0B3D2E] text-white' : 'text-[#0B1F18]/80 hover:bg-[#0B3D2E]/5'}`}
            >
              <span className="truncate">{o.value}</span>
              <span className={`text-[11px] ${selected ? 'text-white/70' : 'text-[#0B1F18]/45'} ml-3`}>{o.count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
