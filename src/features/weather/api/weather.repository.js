import httpClient from '@/shared/api/httpClient'

const pendingRequests = new Map()

export const weatherRepository = {
  getByCity: (location, signal) => {
    const key = `city_${String(location).toLowerCase().trim()}`
    
    if (pendingRequests.has(key)) {
      return pendingRequests.get(key)
    }

    const promise = httpClient.get('/api/weather', {
      params: { location },
      // Omit signal so that if one caller aborts, it doesn't kill the shared network request for others
    }).then(res => {
      pendingRequests.delete(key)
      return res.data
    }).catch(err => {
      pendingRequests.delete(key)
      throw err
    })

    pendingRequests.set(key, promise)
    return promise
  },

  getByCoords: async (lat, lon, signal) => {
    const { data } = await httpClient.get('/api/weather', {
      params: { lat, lon },
      signal,
    })
    return data
  },

  searchCities: async (query, signal) => {
    const { data } = await httpClient.get('/api/weather/search', {
      params: { query },
      signal,
    })
    return data
  },
}
