import { useState, useEffect, useCallback, useRef } from 'react'
import { weatherRepository } from '../api/weather.repository'
import { historyStorage } from '@/shared/lib/storage'
import { isValidCityName } from '@/shared/utils/city'
import { weatherCache } from '@/shared/lib/weatherCache'

export const useWeather = (city) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const abortRef = useRef(null)

  const load = useCallback(
    async (isRefresh = false) => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      const trimmed = city?.trim() ?? ''

      if (!isValidCityName(trimmed)) {
        setLoading(false)
        setRefreshing(false)
        setWeather(null)
        setError(trimmed ? 'City name is too long or invalid.' : 'No city specified.')
        return
      }

      const cached = weatherCache.get(trimmed)

      if (cached && !isRefresh) {
        setWeather(cached)
        setLoading(false)
        setRefreshing(false)
        setError(null)
        return // Strictly return early to prevent background requests
      }

      if (isRefresh) setRefreshing(true)
      else setLoading(true)

      setError(null)

      try {
        const data = await weatherRepository.getByCity(trimmed, controller.signal)
        if (controller.signal.aborted) return
        setWeather(data)
        weatherCache.set(trimmed, data)
        const fullLocationLabel = [data.location.name, data.location.region, data.location.country].filter(Boolean).join(', ')
        historyStorage.add(fullLocationLabel)
      } catch (err) {
        if (controller.signal.aborted) return
        // Don't overwrite error state if we have stale cached data displaying
        if (!cached) {
          setError(err.message || 'Failed to load weather data.')
          setWeather(null)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
          setRefreshing(false)
        }
      }
    },
    [city]
  )

  useEffect(() => {
    load(false)
    return () => abortRef.current?.abort()
  }, [load])

  return {
    weather,
    loading,
    error,
    refreshing,
    refetch: () => load(false),
    refresh: () => load(true),
  }
}
