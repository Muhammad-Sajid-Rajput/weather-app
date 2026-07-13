import Icon from '@/shared/components/Icon'
import FavoriteButton from '@/features/favorites/components/FavoriteButton'
import CurrentWeatherIcon from './CurrentWeatherIcon'

const CurrentWeather = ({ weather, onRefresh, refreshing }) => {
  if (!weather?.location || !weather?.current) {
    return null
  }

  const { location, current } = weather
  const locationLabel = [location.name, location.region].filter(Boolean).join(', ')
  const fullLocationLabel = [location.name, location.region, location.country].filter(Boolean).join(', ')

  return (
    <div className="glass-tile p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-start gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-lg sm:text-2xl text-on-surface truncate">{locationLabel}</h2>
          <p className="font-mono text-label-mono text-on-surface-variant mt-0.5 truncate">
            {location.country}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 self-start">
          <FavoriteButton city={fullLocationLabel} />
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center justify-center w-10 h-10 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-white/10 disabled:opacity-50"
            aria-label="Refresh weather"
          >
            <Icon name="sync" className={refreshing ? 'animate-spin' : ''} size={22} />
          </button>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-5xl sm:text-6xl lg:text-7xl leading-none text-on-surface">
            {current.temp}°
          </p>
          <p className="font-stat-lg text-primary mt-1 text-sm sm:text-base truncate">{current.condition}</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4">
            <div>
              <span className="font-mono text-[10px] sm:text-label-mono text-on-surface-variant block">
                Feels
              </span>
              <span className="font-body text-on-surface text-sm sm:text-base">{current.feelsLike}°</span>
            </div>
            <div>
              <span className="font-mono text-[10px] sm:text-label-mono text-on-surface-variant block">
                Humidity
              </span>
              <span className="font-body text-on-surface text-sm sm:text-base">{current.humidity}%</span>
            </div>
            <div>
              <span className="font-mono text-[10px] sm:text-label-mono text-on-surface-variant block">
                Wind
              </span>
              <span className="font-body text-on-surface text-sm sm:text-base">{current.windKph} km/h</span>
            </div>
          </div>
        </div>

        {current.condition && (
          <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex-shrink-0 flex items-center justify-center">
            <CurrentWeatherIcon condition={current.condition} code={current.code} isDay={current.isDay} icon={current.icon} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CurrentWeather
