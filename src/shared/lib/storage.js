const MAX_CITY_LENGTH = 100
const MAX_FAVORITES = 25

const read = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export const STORAGE_KEYS = {
  favorites: 'weatherx_favorites',
  history: 'weatherx_search_history',
  theme: 'weatherx_theme',
}

const sanitizeCity = (city) => {
  const name = String(city ?? '').trim().slice(0, MAX_CITY_LENGTH)
  return name.length >= 2 ? name : ''
}

const normalizeList = (raw) => {
  if (!Array.isArray(raw)) return []
  if (raw.length && typeof raw[0] === 'object') {
    return raw.map((item) => sanitizeCity(item.location || item.query || item.name)).filter(Boolean)
  }
  return raw.map(sanitizeCity).filter(Boolean)
}

export const favoritesStorage = {
  getAll: () => normalizeList(read(STORAGE_KEYS.favorites) || []),

  add: (city) => {
    const name = sanitizeCity(city)
    if (!name) return false
    const list = favoritesStorage.getAll().filter((c) => c.toLowerCase() !== name.toLowerCase())
    list.unshift(name)
    write(STORAGE_KEYS.favorites, list.slice(0, MAX_FAVORITES))
    return true
  },

  remove: (city) => {
    write(
      STORAGE_KEYS.favorites,
      favoritesStorage.getAll().filter((c) => c.toLowerCase() !== sanitizeCity(city).toLowerCase())
    )
  },

  clearAll: () => {
    write(STORAGE_KEYS.favorites, [])
  },

  has: (city) => {
    const name = sanitizeCity(city).toLowerCase()
    return favoritesStorage.getAll().some((c) => c.toLowerCase() === name)
  },
}

export const historyStorage = {
  MAX: 5,

  getAll: () => normalizeList(read(STORAGE_KEYS.history) || []),

  add: (city) => {
    const name = sanitizeCity(city)
    if (!name) return
    const list = historyStorage.getAll().filter((c) => c.toLowerCase() !== name.toLowerCase())
    list.unshift(name)
    write(STORAGE_KEYS.history, list.slice(0, historyStorage.MAX))
  },

  remove: (city) => {
    write(
      STORAGE_KEYS.history,
      historyStorage.getAll().filter((c) => c.toLowerCase() !== sanitizeCity(city).toLowerCase())
    )
  },

  clearAll: () => {
    write(STORAGE_KEYS.history, [])
  },
}

export const themeStorage = {
  get: () => {
    const theme = read(STORAGE_KEYS.theme)
    return theme === 'light' || theme === 'dark' ? theme : 'dark'
  },
  set: (theme) => write(STORAGE_KEYS.theme, theme === 'light' ? 'light' : 'dark'),
}
