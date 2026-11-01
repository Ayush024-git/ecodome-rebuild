'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function ResearchError({ error, reset }) {
  useEffect(() => {
    console.error('Research page crashed:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-6 pt-40 pb-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-[#0B3D2E]">Something went wrong</h1>
      <p className="mx-auto mt-4 max-w-md text-[14px] text-[#0B1F18]/65">
        The research library failed to load. You can retry, or head back to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="rounded-full bg-[#0B3D2E] px-5 py-3 text-sm font-semibold text-white">Try again</button>
        <Link href="/" className="rounded-full px-5 py-3 text-sm font-semibold text-[#0B3D2E] ring-1 ring-[#0B3D2E]/20">Home</Link>
      </div>
    </main>
  )
}
