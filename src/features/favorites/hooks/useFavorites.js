import { useState, useEffect, useCallback, useRef } from 'react'
import { favoritesStorage } from '@/shared/lib/storage'
import { weatherRepository } from '@/features/weather/api/weather.repository'
import { weatherCache } from '@/shared/lib/weatherCache'

export const useFavorites = () => {
  const [cities, setCities] = useState([])
  const [weatherByCity, setWeatherByCity] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const load = useCallback(async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    const list = favoritesStorage.getAll()
    setCities(list)

    if (list.length === 0) {
      setWeatherByCity({})
      setLoading(false)
      return
    }

    const nextWeather = {}
    let hasUncached = false

    list.forEach((city) => {
      const cached = weatherCache.get(city)
      if (cached) {
        nextWeather[city] = cached
      } else {
        hasUncached = true
      }
    })

    if (Object.keys(nextWeather).length > 0) {
      setWeatherByCity({ ...nextWeather })
    }

    if (!hasUncached) {
      setLoading(false)
      return
    }

    try {
      const entries = await Promise.all(
        list.map(async (city) => {
          if (nextWeather[city]) return [city, nextWeather[city]]
          try {
            const data = await weatherRepository.getByCity(city, controller.signal)
            if (!controller.signal.aborted) {
              weatherCache.set(city, data)
            }
            return [city, data]
          } catch {
            return [city, null]
          }
        })
      )

      if (!controller.signal.aborted) {
        setWeatherByCity(Object.fromEntries(entries))
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err.message || 'Failed to load favorites.')
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    return () => abortRef.current?.abort()
  }, [load])

  const remove = (city) => {
    favoritesStorage.remove(city)
    load()
  }

  const clearAll = () => {
    favoritesStorage.clearAll()
    abortRef.current?.abort()
    setCities([])
    setWeatherByCity({})
    setLoading(false)
    setError(null)
  }

  return { cities, weatherByCity, loading, error, remove, clearAll, reload: load }
}
