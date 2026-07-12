import { AppError } from './AppError.js'
import {
  LOCATION_MAX_LENGTH,
  SEARCH_MAX_LENGTH,
  SEARCH_MIN_LENGTH,
} from '../config/constants.js'

export const sanitizeText = (value, maxLength) => {
  if (value == null) return ''
  return String(value).trim().slice(0, maxLength)
}

export const parseLocationQuery = (location, q) => {
  const raw = sanitizeText(location || q, LOCATION_MAX_LENGTH)
  if (!raw) {
    throw new AppError('Please enter a valid city name.', 400)
  }
  if (raw.length < 2) {
    throw new AppError('City name must be at least 2 characters.', 400)
  }
  return raw
}

export const parseSearchQuery = (query) => {
  const raw = sanitizeText(query, SEARCH_MAX_LENGTH)
  if (!raw || raw.length < SEARCH_MIN_LENGTH) {
    return null
  }
  return raw
}

export const parseCoordinates = (lat, lon) => {
  const latitude = Number(lat)
  const longitude = Number(lon)

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new AppError('Invalid coordinates.', 400)
  }

  if (latitude < -90 || latitude > 90) {
    throw new AppError('Latitude must be between -90 and 90.', 400)
  }

  if (longitude < -180 || longitude > 180) {
    throw new AppError('Longitude must be between -180 and 180.', 400)
  }

  return { latitude, longitude }
}

export const buildWeatherQuery = ({ location, q, lat, lon }) => {
  const hasCoords = lat != null && lat !== '' && lon != null && lon !== ''
  const hasLocation = Boolean(sanitizeText(location || q, LOCATION_MAX_LENGTH))

  if (!hasLocation && !hasCoords) {
    throw new AppError('Location or coordinates are required.', 400)
  }

  if (hasCoords) {
    const { latitude, longitude } = parseCoordinates(lat, lon)
    return `${latitude},${longitude}`
  }

  return parseLocationQuery(location, q)
}
