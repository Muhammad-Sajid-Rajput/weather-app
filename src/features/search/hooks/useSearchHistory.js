import { useState, useEffect, useCallback, useRef } from 'react'
import { historyStorage } from '@/shared/lib/storage'
import { weatherRepository } from '@/features/weather/api/weather.repository'
import { weatherCache } from '@/shared/lib/weatherCache'

export const useSearchHistory = () => {
  const [cities, setCities] = useState([])
  const [previews, setPreviews] = useState({})
  const [loading, setLoading] = useState(false)
  const abortRef = useRef(null)

  const loadPreviews = useCallback(async (history) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    if (history.length === 0) {
      setPreviews({})
      setLoading(false)
      return
    }

    setLoading(true)

    const nextPreviews = {}
    
    // First pass: instantly load cached previews
    let hasUncached = false
    history.forEach(city => {
      const cached = weatherCache.get(city)
      if (cached) {
        nextPreviews[city] = {
          temp: cached.current.temp,
          region: [cached.location.region, cached.location.country].filter(Boolean).join(', '),
          condition: cached.current.condition,
          code: cached.current.code,
          isDay: cached.current.isDay,
          icon: cached.current.icon,
        }
      } else {
        hasUncached = true
      }
    })

    // If we have some cached ones, show them immediately
    if (Object.keys(nextPreviews).length > 0) {
      setPreviews({...nextPreviews})
    }

    if (!hasUncached) {
      setLoading(false)
      return
    }

    // Fetch the ones that aren't cached
    await Promise.all(
      history.map(async (city) => {
        if (nextPreviews[city]) return // Already cached

        try {
          const data = await weatherRepository.getByCity(city, controller.signal)
          if (!controller.signal.aborted) {
            weatherCache.set(city, data)
            nextPreviews[city] = {
              temp: data.current.temp,
              region: [data.location.region, data.location.country].filter(Boolean).join(', '),
              condition: data.current.condition,
              code: data.current.code,
              isDay: data.current.isDay,
              icon: data.current.icon,
            }
          }
        } catch {
          if (!controller.signal.aborted) {
            nextPreviews[city] = null
          }
        }
      })
    )

    if (!controller.signal.aborted) {
      setPreviews({ ...nextPreviews })
      setLoading(false)
    }
  }, [])

  const reload = useCallback(() => {
    const history = historyStorage.getAll()
    setCities(history)
    loadPreviews(history)
  }, [loadPreviews])

  useEffect(() => {
    reload()
    return () => abortRef.current?.abort()
  }, [reload])

  const remove = (city) => {
    historyStorage.remove(city)
    reload()
  }

  const clearAll = () => {
    historyStorage.clearAll()
    abortRef.current?.abort()
    setCities([])
    setPreviews({})
    setLoading(false)
  }

  return { cities, previews, loading, remove, clearAll, reload }
}
