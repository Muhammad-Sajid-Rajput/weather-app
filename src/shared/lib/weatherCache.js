import { slugifyCity } from '@/shared/utils/city'

const CACHE_KEY_PREFIX = 'weatherx_cache_'
const SLUG_MAP_PREFIX = 'weatherx_slug_'
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes
const MAX_CACHE_SIZE = 20

// In-memory maps
const memoryCache = new Map()
const slugToCoordsMap = new Map()

const generateCoordsKey = (lat, lon) => {
  if (lat == null || lon == null) return null;
  return `${Number(lat).toFixed(2)},${Number(lon).toFixed(2)}`;
}

// Sync from sessionStorage to memoryCache on load (for surviving page refreshes)
const loadFromSessionStorage = () => {
  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key?.startsWith(CACHE_KEY_PREFIX)) {
        const raw = sessionStorage.getItem(key)
        if (raw) {
          const parsed = JSON.parse(raw)
          const originalKey = key.slice(CACHE_KEY_PREFIX.length)
          memoryCache.set(originalKey, parsed)
        }
      } else if (key?.startsWith(SLUG_MAP_PREFIX)) {
        const slug = key.slice(SLUG_MAP_PREFIX.length)
        const coordsKey = sessionStorage.getItem(key)
        if (coordsKey) {
          slugToCoordsMap.set(slug, coordsKey)
        }
      }
    }
  } catch (error) {
    console.warn('Failed to restore weather cache from sessionStorage', error)
  }
}

// Initial load
loadFromSessionStorage()

const enforceSizeLimit = () => {
  if (memoryCache.size > MAX_CACHE_SIZE) {
    // Maps iterate in insertion order, so the first key is the oldest
    const oldestKey = memoryCache.keys().next().value
    memoryCache.delete(oldestKey)
    try {
      sessionStorage.removeItem(`${CACHE_KEY_PREFIX}${oldestKey}`)
    } catch (e) {
      // ignore
    }
  }
}

export const weatherCache = {
  get: (city) => {
    if (!city) return null
    const slug = slugifyCity(city)
    const coordsKey = slugToCoordsMap.get(slug)
    
    // Fallback if slug hasn't been mapped to coordinates yet
    const keyToLookup = coordsKey || slug
    
    const cached = memoryCache.get(keyToLookup)
    
    if (!cached) return null

    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION

    if (isExpired) {
      weatherCache.remove(city)
      return null
    }

    return cached.data
  },

  set: (city, data) => {
    if (!city || !data) return
    const slug = slugifyCity(city)
    
    let coordsKey = slug
    // Always use coordinates if available from API response
    if (data.location?.lat != null && data.location?.lon != null) {
      coordsKey = generateCoordsKey(data.location.lat, data.location.lon) || slug
      
      slugToCoordsMap.set(slug, coordsKey)
      try {
        sessionStorage.setItem(`${SLUG_MAP_PREFIX}${slug}`, coordsKey)
      } catch (e) {
        // ignore
      }
    }
    
    const cacheEntry = {
      data,
      timestamp: Date.now()
    }

    // Set in memory
    memoryCache.set(coordsKey, cacheEntry)

    // Set in session storage
    try {
      sessionStorage.setItem(`${CACHE_KEY_PREFIX}${coordsKey}`, JSON.stringify(cacheEntry))
    } catch (e) {
      console.warn('Failed to save to sessionStorage', e)
    }

    enforceSizeLimit()
  },

  remove: (city) => {
    if (!city) return
    const slug = slugifyCity(city)
    const coordsKey = slugToCoordsMap.get(slug) || slug
    
    memoryCache.delete(coordsKey)
    try {
      sessionStorage.removeItem(`${CACHE_KEY_PREFIX}${coordsKey}`)
    } catch (e) {
      // ignore
    }
  },

  clearAll: () => {
    memoryCache.clear()
    slugToCoordsMap.clear()
    try {
      const keysToRemove = []
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key?.startsWith(CACHE_KEY_PREFIX) || key?.startsWith(SLUG_MAP_PREFIX)) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach(k => sessionStorage.removeItem(k))
    } catch (e) {
      // ignore
    }
  }
}
