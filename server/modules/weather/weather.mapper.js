import { AppError } from '../../utils/AppError.js'

export const mapForecastResponse = (data) => {
  if (!data?.location || !data?.current || !data?.forecast?.forecastday?.length) {
    throw new AppError('Incomplete weather data received.', 502)
  }

  const { location, current, forecast } = data
  const today = forecast.forecastday[0]

  if (!today?.hour?.length) {
    throw new AppError('Hourly forecast unavailable.', 502)
  }

  return {
    location: {
      name: location.name ?? 'Unknown',
      country: location.country ?? '',
      region: location.region ?? '',
      lat: location.lat,
      lon: location.lon,
      localtime: location.localtime ?? '',
      tz_id: location.tz_id ?? '',
    },
    current: {
      temp: Math.round(current.temp_c ?? 0),
      feelsLike: Math.round(current.feelslike_c ?? current.temp_c ?? 0),
      condition: current.condition?.text ?? 'Unknown',
      code: current.condition?.code,
      icon: current.condition?.icon ?? '',
      humidity: current.humidity ?? 0,
      windKph: Math.round(current.wind_kph ?? 0),
      pressure: current.pressure_mb ?? 0,
      visibility: Math.round(current.vis_km ?? 0),
      uv: current.uv ?? 0,
      isDay: current.is_day === 1,
    },
    airQuality: current.air_quality
      ? {
          pm25: current.air_quality.pm2_5,
          pm10: current.air_quality.pm10,
          co: current.air_quality.co,
          no2: current.air_quality.no2,
          o3: current.air_quality.o3,
          so2: current.air_quality.so2,
          usEpaIndex: current.air_quality['us-epa-index'],
        }
      : null,
    astro: {
      sunrise: today.astro?.sunrise ?? '—',
      sunset: today.astro?.sunset ?? '—',
      moonPhase: today.astro?.moon_phase ?? '',
    },
    hourly: today.hour.map((hour) => ({
      time: hour.time,
      timeLabel: new Date(hour.time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      temp: Math.round(hour.temp_c ?? 0),
      condition: hour.condition?.text ?? 'Unknown',
      code: hour.condition?.code,
      icon: hour.condition?.icon ?? '',
      chanceOfRain: hour.chance_of_rain ?? 0,
      isDay: hour.is_day === 1,
    })),
    daily: forecast.forecastday.map((day) => ({
      date: day.date,
      dayName: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      maxTemp: Math.round(day.day?.maxtemp_c ?? 0),
      minTemp: Math.round(day.day?.mintemp_c ?? 0),
      condition: day.day?.condition?.text ?? 'Unknown',
      code: day.day?.condition?.code,
      icon: day.day?.condition?.icon ?? '',
      chanceOfRain: day.day?.daily_chance_of_rain ?? 0,
      sunrise: day.astro?.sunrise ?? '—',
      sunset: day.astro?.sunset ?? '—',
    })),
  }
}

export const mapSearchResults = (items) => {
  if (!Array.isArray(items)) return []
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    region: item.region,
    country: item.country,
    lat: item.lat,
    lon: item.lon,
    label: [item.name, item.region, item.country].filter(Boolean).join(', '),
  }))
}
