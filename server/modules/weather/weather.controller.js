import { buildWeatherQuery, parseSearchQuery } from '../../utils/validators.js'
import { weatherService } from './weather.service.js'

export const getWeather = async (req, res) => {
  const { location, q, lat, lon } = req.query
  const query = buildWeatherQuery({ location, q, lat, lon })
  const data = await weatherService.getForecast(query)
  res.json({ success: true, data })
}

export const searchLocations = async (req, res) => {
  const searchQuery = parseSearchQuery(req.query.query)

  if (!searchQuery) {
    return res.json({ success: true, data: [] })
  }

  const data = await weatherService.searchCities(searchQuery)
  res.json({ success: true, data })
}
