import { useState, useEffect, useRef } from 'react'
import { weatherRepository } from '@/features/weather/api/weather.repository'

const DEBOUNCE_MS = 600
const MIN_QUERY = 2
const MAX_QUERY = 80

export const useCitySearch = (query) => {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef(null)

  useEffect(() => {
    const trimmed = query.trim().slice(0, MAX_QUERY)

    if (trimmed.length < MIN_QUERY) {
      setSuggestions([])
      setLoading(false)
      return
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setLoading(true)
      try {
        const results = await weatherRepository.searchCities(trimmed, controller.signal)
        if (!controller.signal.aborted) {
          setSuggestions(Array.isArray(results) ? results.slice(0, 5) : [])
        }
      } catch {
        if (!controller.signal.aborted) setSuggestions([])
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      abortRef.current?.abort()
    }
  }, [query])

  return { suggestions, loading, hasResults: suggestions.length > 0 }
}
