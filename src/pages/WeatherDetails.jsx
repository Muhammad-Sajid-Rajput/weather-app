import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import PageLayout from '@/shared/components/PageLayout'
import CurrentWeather from '@/features/weather/components/CurrentWeather'
import HourlyForecast from '@/features/weather/components/HourlyForecast'
import DailyForecast from '@/features/weather/components/DailyForecast'
import WeatherHighlights from '@/features/weather/components/WeatherHighlights'
import Loader from '@/shared/components/ui/Loader'
import ErrorState from '@/shared/components/ui/ErrorState'
import { useWeather } from '@/features/weather/hooks/useWeather'
import { deslugifyCity, isValidCityName, slugifyCity } from '@/shared/utils/city'
import { ROUTES } from '@/shared/constants/routes'
import { getBackgroundImage } from '@/shared/utils/weather'

const WeatherDetailsPage = () => {
  const { city } = useParams()
  const navigate = useNavigate()
  const decodedCity = deslugifyCity(city)
  const invalidCity = !isValidCityName(decodedCity)
  const { weather, loading, error, refreshing, refetch, refresh } = useWeather(
    invalidCity ? '' : decodedCity
  )

  useEffect(() => {
    if (weather?.location) {
      const { name, region, country } = weather.location
      const fullLabel = [name, region, country].filter(Boolean).join(', ')
      const canonicalSlug = slugifyCity(fullLabel)
      if (canonicalSlug && canonicalSlug !== city) {
        navigate(ROUTES.weather(fullLabel), { replace: true })
      }
    }
  }, [weather, city, navigate])

  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  let bgHour = now.getHours()
  let bgCondition = ''
  if (weather) {
    if (weather.location?.localtime) {
      const timePart = weather.location.localtime.split(' ')[1]
      if (timePart) {
        bgHour = parseInt(timePart.split(':')[0], 10)
      }
    }
    if (weather.current?.condition) {
      bgCondition = weather.current.condition
    }
  }
  const dynamicBg = getBackgroundImage(bgHour, bgCondition)

  return (
    <PageLayout
      headerProps={{ showBack: true }}
      bgImage={dynamicBg}
    >
      <div className="page-container flex flex-col gap-3 sm:gap-4 pb-4">
        <div className="text-center py-1 sm:py-2">
          <p className="font-display text-3xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight leading-none">
            {timeStr}
          </p>
          <p className="font-mono text-label-mono text-on-surface-variant mt-1">{dateStr}</p>
        </div>

        {invalidCity && (
          <div className="flex flex-col items-center gap-3">
            <ErrorState message="Invalid or missing city in the URL." />
            <Link
              to={ROUTES.home}
              className="font-stat-lg text-primary hover:text-primary-fixed transition-colors"
            >
              Search for a city
            </Link>
          </div>
        )}

        {!invalidCity && loading && (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        )}

        {!invalidCity && error && !loading && (
          <ErrorState message={error} onRetry={refetch} />
        )}

        {!invalidCity && weather && !loading && (
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
              {/* Left Column */}
              <div className="lg:col-span-8 flex flex-col gap-3 sm:gap-4">
                <CurrentWeather weather={weather} onRefresh={refresh} refreshing={refreshing} />
                <HourlyForecast hourly={weather.hourly} />
              </div>

              {/* Right Column */}
              <div className="lg:col-span-4 flex flex-col">
                <DailyForecast daily={weather.daily} />
              </div>
            </div>
            <WeatherHighlights weather={weather} />
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default WeatherDetailsPage
