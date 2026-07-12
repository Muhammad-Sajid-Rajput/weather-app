import Icon from '@/shared/components/Icon'
import { aqiLabel } from '@/shared/utils/weatherIcons'

const Chip = ({ icon, label, value }) => (
  <div className="glass-panel rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-initial sm:min-w-[8.5rem]">
    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
      <Icon name={icon} filled size={20} />
    </div>
    <div className="min-w-0">
      <span className="font-mono text-[10px] sm:text-label-mono text-on-surface-variant uppercase block truncate">
        {label}
      </span>
      <span className="font-stat-lg text-on-surface text-sm sm:text-base block truncate">{value}</span>
    </div>
  </div>
)

const WeatherHighlights = ({ weather }) => {
  const { current, airQuality, astro } = weather

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <h3 className="font-mono text-label-mono text-on-surface-variant uppercase tracking-wider text-xs sm:text-sm">
        Highlights
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        <Chip icon="wb_sunny" label="UV" value={current.uv} />
        <Chip icon="visibility" label="Visibility" value={`${current.visibility} km`} />
        <Chip icon="compress" label="Pressure" value={`${current.pressure} mb`} />
        {airQuality && <Chip icon="air" label="Air" value={aqiLabel(airQuality.usEpaIndex)} />}
        {astro && (
          <>
            <Chip icon="wb_twilight" label="Sunrise" value={astro.sunrise} />
            <Chip icon="dark_mode" label="Sunset" value={astro.sunset} />
          </>
        )}
      </div>
    </div>
  )
}

export default WeatherHighlights
