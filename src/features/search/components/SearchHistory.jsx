import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Icon from '@/shared/components/Icon'
import { useSearchHistory } from '@/features/search/hooks/useSearchHistory'
import { ROUTES } from '@/shared/constants/routes'
import ForecastWeatherIcon from '@/features/weather/components/ForecastWeatherIcon'
import ConfirmModal from '@/shared/components/ui/ConfirmModal'

const SearchHistory = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cities, previews, loading, remove, clearAll, reload } = useSearchHistory()

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  useEffect(() => {
    if (location.pathname === ROUTES.home) {
      reload()
    }
  }, [location.pathname, reload])

  if (cities.length === 0) return null

  const handleClearAll = () => {
    setShowConfirmModal(true)
  }

  return (
    <div className="w-full flex flex-col gap-2 sm:gap-3 flex-shrink-0">
      <div className="flex items-center justify-between gap-2 px-0.5">
        <h2 className="font-mono text-xs sm:text-sm font-semibold text-on-surface uppercase tracking-wider">
          Last Searched
        </h2>
        <button
          type="button"
          onClick={handleClearAll}
          className="font-mono text-label-mono text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full glass-panel hover:bg-white/10 flex-shrink-0"
          aria-label="Clear all search history"
        >
          <Icon name="delete_sweep" size={18} />
          <span>Clear all</span>
        </button>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        {cities.map((city) => {
          const preview = previews[city]
          return (
            <div
              key={city}
              className="glass-panel rounded-xl flex items-center"
            >
              <button
                type="button"
                onClick={() => navigate(ROUTES.weather(city))}
                className="flex-1 p-3 flex items-center justify-between gap-2 text-left min-w-0"
              >
                <div className="min-w-0">
                  <span className="font-stat-lg text-on-surface text-sm block truncate">{city}</span>
                  <span className="font-mono text-[10px] text-on-surface-variant block truncate">
                    {loading && preview === undefined
                      ? 'Loading...'
                      : preview?.region || 'Unavailable'}
                  </span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="font-stat-lg text-on-surface text-sm">
                    {preview?.temp != null ? `${preview.temp}°` : '—'}
                  </span>
                  {preview?.condition && (
                    <ForecastWeatherIcon
                      condition={preview.condition}
                      code={preview.code}
                      isDay={preview.isDay}
                      icon={preview.icon}
                      className="!text-2xl ml-1"
                    />
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => remove(city)}
                className="flex-shrink-0 px-2 text-on-surface-variant hover:text-error transition-colors"
                aria-label={`Remove ${city} from history`}
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          )
        })}
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={clearAll}
        title="Clear Search History?"
        description="Are you sure you want to clear your recent searches? This action cannot be undone."
      />
    </div>
  )
}

export default SearchHistory
