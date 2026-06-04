const STORAGE_KEY = 'ecodome:userKey'
const MEMORY_KEY = '__ecodomeUserKey__'

export function getOrCreateResearchUserKey() {
  if (typeof window === 'undefined') return ''

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      window[MEMORY_KEY] = stored
      return stored
    }
  } catch {}

  if (!window[MEMORY_KEY]) {
    window[MEMORY_KEY] = `u_${Math.random().toString(36).slice(2, 10)}`
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, window[MEMORY_KEY])
  } catch {}

  return window[MEMORY_KEY]
}
