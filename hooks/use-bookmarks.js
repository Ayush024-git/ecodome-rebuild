'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

const STORAGE_KEY = 'ecodome:bookmarks'

function readIds() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return new Set(Array.isArray(raw) ? raw.filter((id) => typeof id === 'string') : [])
  } catch {
    return new Set()
  }
}

export function useBookmarks() {
  // Start empty on both server and client so hydration matches, then load after mount.
  const [ids, setIds] = useState(() => new Set())

  useEffect(() => {
    setIds(readIds())
  }, [])

  const toggle = useCallback((paperId) => {
    const adding = !ids.has(paperId)
    setIds((prev) => {
      const next = new Set(prev)
      if (adding) next.add(paperId)
      else next.delete(paperId)
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {}
      return next
    })
    if (adding) toast.success('Saved to your library')
    else toast('Removed bookmark')
  }, [ids])

  return { ids, toggle }
}
