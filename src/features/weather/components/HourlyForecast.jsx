import { useState, useRef } from 'react'
import ForecastWeatherIcon from './ForecastWeatherIcon'

const HourlyForecast = ({ hourly = [] }) => {
  const upcoming = hourly.filter((_, i) => i % 2 === 0).slice(0, 12)
  const [activePage, setActivePage] = useState(0)
  const scrollRef = useRef(null)

  if (!upcoming.length) return null

  const handleScroll = (e) => {
    const container = e.target
    const scrollLeft = container.scrollLeft
    const maxScrollLeft = container.scrollWidth - container.clientWidth
    if (maxScrollLeft <= 0) return
    const ratio = scrollLeft / maxScrollLeft
    const pageIndex = Math.min(2, Math.round(ratio * 2))
    setActivePage(pageIndex)
  }

  const scrollToPage = (pageIndex) => {
    const container = scrollRef.current
    if (!container) return
    const maxScrollLeft = container.scrollWidth - container.clientWidth
    container.scrollTo({
      left: maxScrollLeft * (pageIndex / 2),
      behavior: 'smooth'
    })
    setActivePage(pageIndex)
  }

  return (
    <div className="glass-tile p-4 sm:p-5">
      <h3 className="font-mono text-label-mono text-on-surface-variant mb-3 uppercase tracking-wider text-xs sm:text-sm">
        Hourly
      </h3>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1"
      >
        {upcoming.map((hour) => (
          <div key={hour.time} className="flex flex-col items-center min-w-[4.5rem] gap-1.5 flex-shrink-0">
            <span className="font-mono text-[10px] sm:text-label-mono text-on-surface">{hour.timeLabel}</span>
            <ForecastWeatherIcon condition={hour.condition} code={hour.code} isDay={hour.isDay} icon={hour.icon} className="!text-3xl text-secondary my-1" />
            <span className="font-stat-lg text-on-surface text-sm sm:text-base">{hour.temp}°</span>
            <span
              className={`font-mono text-[10px] sm:text-label-mono flex items-center gap-0.5 justify-center ${
                hour.chanceOfRain > 0 ? 'text-primary' : 'text-on-surface-variant'
              }`}
              title="Chance of Rain"
              aria-label={`Chance of rain: ${hour.chanceOfRain}%`}
            >
              <span className="text-[10px] opacity-80" role="img" aria-label="droplet">💧</span>
              {hour.chanceOfRain}%
            </span>
          </div>
        ))}
      </div>

      {/* Pagination Indicators */}
      <div className="flex justify-center gap-1.5 mt-3.5">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToPage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activePage === index ? 'w-6 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to hourly slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast
