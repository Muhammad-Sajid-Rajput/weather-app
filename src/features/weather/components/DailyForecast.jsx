import ForecastWeatherIcon from './ForecastWeatherIcon'

const DailyForecast = ({ daily = [] }) => {
  if (!daily.length) return null

  return (
    <div className="glass-tile p-4 sm:p-5 h-full">
      <h3 className="font-mono text-label-mono text-on-surface-variant mb-3 uppercase tracking-wider text-xs sm:text-sm">
        Upcoming
      </h3>
      <div className="flex flex-col gap-3 sm:gap-4">
        {daily.map((day) => (
          <div key={day.date} className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="font-stat-lg text-on-surface w-9 sm:w-10 flex-shrink-0 text-sm sm:text-base">
              {day.dayName}
            </span>
            <ForecastWeatherIcon condition={day.condition} code={day.code} isDay={true} icon={day.icon} className="!text-2xl text-secondary flex-shrink-0" />
            <span className="font-body text-on-surface text-xs sm:text-sm truncate flex-1 min-w-0">
              {day.condition}
            </span>
            <div className="flex items-baseline gap-1.5 flex-shrink-0">
              <span className="font-stat-lg text-on-surface text-sm sm:text-base" title="High Temperature">↑{day.maxTemp}°</span>
              <span className="font-body text-on-surface-variant text-xs sm:text-sm" title="Low Temperature">↓{day.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyForecast
