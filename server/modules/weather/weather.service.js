import axios from 'axios'
import { env } from '../../config/env.js'
import { WEATHER_API_BASE, FORECAST_DAYS, API_TIMEOUT_MS } from '../../config/constants.js'
import { AppError } from '../../utils/AppError.js'
import { mapForecastResponse, mapSearchResults } from './weather.mapper.js'

const weatherClient = axios.create({
  baseURL: WEATHER_API_BASE,
  timeout: API_TIMEOUT_MS,
})

const getClientParams = () => {
  if (!env.weatherApiKey) {
    throw new AppError('Weather service is not configured.', 503)
  }
  return { key: env.weatherApiKey }
}

const handleWeatherApiError = (error, fallbackMessage) => {
  if (error instanceof AppError) throw error

  if (error.code === 'ECONNABORTED') {
    throw new AppError('Weather service timed out. Please try again.', 504)
  }

  if (!error.response) {
    throw new AppError('Unable to reach weather service. Check your connection.', 503)
  }

  const status = error.response.status
  const apiMessage = error.response.data?.error?.message

  if (status === 401 || status === 403) {
    throw new AppError('Weather API authentication failed.', 503)
  }

  if (status === 429) {
    throw new AppError('Weather API rate limit exceeded. Try again shortly.', 429)
  }

  if (status === 400 || status === 404) {
    throw new AppError(apiMessage || 'Location not found.', 404)
  }

  throw new AppError(apiMessage || fallbackMessage, status >= 500 ? 502 : 500)
}

export const weatherService = {
  async getForecast(query) {
    try {
      const { data } = await weatherClient.get('/forecast.json', {
        params: {
          ...getClientParams(),
          q: query,
          days: FORECAST_DAYS,
          aqi: 'yes',
          alerts: 'no',
        },
      })
      return mapForecastResponse(data)
    } catch (error) {
      handleWeatherApiError(error, 'Failed to fetch weather data.')
    }
  },

  async searchCities(query) {
    try {
      const { data } = await weatherClient.get('/search.json', {
        params: { ...getClientParams(), q: query },
      })
      return mapSearchResults(data)
    } catch (error) {
      handleWeatherApiError(error, 'Failed to search locations.')
    }
  },
}
