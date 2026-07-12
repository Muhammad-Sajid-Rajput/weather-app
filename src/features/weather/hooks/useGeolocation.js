import { useState, useCallback, useRef } from 'react'
import { weatherRepository } from '../api/weather.repository'
import { historyStorage } from '@/shared/lib/storage'

const GEO_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 15000,
  maximumAge: 300000,
}

const geoErrorMessage = (error) => {
  switch (error?.code) {
    case 1:
      return 'Location permission denied. Enable it in your browser settings.'
    case 2:
      return 'Location information is unavailable.'
    case 3:
      return 'Location request timed out. Try again.'
    default:
      return 'Unable to access your location.'
  }
}

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const detect = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return null
    }

    if (!window.isSecureContext) {
      setError('Location requires HTTPS (or localhost) in your browser.')
      return null
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords

            if (
              !Number.isFinite(latitude) ||
              !Number.isFinite(longitude) ||
              latitude < -90 ||
              latitude > 90 ||
              longitude < -180 ||
              longitude > 180
            ) {
              setError('Received invalid coordinates from your device.')
              resolve(null)
              return
            }

            const data = await weatherRepository.getByCoords(
              latitude,
              longitude,
              controller.signal
            )

            if (controller.signal.aborted) {
              resolve(null)
              return
            }

            const fullLocationLabel = [data.location.name, data.location.region, data.location.country].filter(Boolean).join(', ')
            historyStorage.add(fullLocationLabel)
            resolve(fullLocationLabel)
          } catch (err) {
            if (!controller.signal.aborted) {
              setError(err.message || 'Could not fetch weather for your location.')
            }
            resolve(null)
          } finally {
            if (!controller.signal.aborted) setLoading(false)
          }
        },
        (geoError) => {
          if (!controller.signal.aborted) {
            setError(geoErrorMessage(geoError))
            setLoading(false)
          }
          resolve(null)
        },
        GEO_OPTIONS
      )
    })
  }, [])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    setLoading(false)
  }, [])

  return { detect, loading, error, clearError: () => setError(null), cancel }
}
