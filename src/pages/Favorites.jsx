import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '@/shared/components/PageLayout'
import Icon from '@/shared/components/Icon'
import Loader from '@/shared/components/ui/Loader'
import ConfirmModal from '@/shared/components/ui/ConfirmModal'
import { useFavorites } from '@/features/favorites/hooks/useFavorites'
import { ROUTES } from '@/shared/constants/routes'
import ForecastWeatherIcon from '@/features/weather/components/ForecastWeatherIcon'
import { getBackgroundImage } from '@/shared/utils/weather'

const FavoritesPage = () => {
  const navigate = useNavigate()
  const { cities, weatherByCity, loading, error, remove, clearAll, reload } = useFavorites()

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleClearAll = () => {
    setShowConfirmModal(true)
  }

  const currentHour = new Date().getHours()
  const dynamicBg = getBackgroundImage(currentHour)

  return (
    <PageLayout headerProps={{ favoritesActive: true, showBack: true }} bgImage={dynamicBg}>
      <div className="page-container flex flex-col gap-3 sm:gap-4 max-w-4xl pb-4">
        <div className="flex items-center justify-between gap-2 flex-shrink-0">
          <h1 className="font-display text-xl sm:text-2xl font-bold text-on-surface truncate">
            Favorite Cities
          </h1>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {cities.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="font-mono text-label-mono text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full glass-panel hover:bg-white/10"
                aria-label="Clear all favorites"
              >
                <Icon name="delete_sweep" size={18} />
                <span className="hidden sm:inline">Clear all</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate(ROUTES.home)}
              className="flex items-center justify-center w-10 h-10 rounded-full glass-panel hover:bg-white/10 text-on-surface-variant hover:text-on-surface"
              aria-label="Add city"
            >
              <Icon name="add" size={22} />
            </button>
          </div>
        </div>



        {error && !loading && (
          <p className="text-error font-mono text-label-mono text-center text-sm" role="alert">
            {error}{' '}
            <button type="button" onClick={reload} className="underline text-primary">
              Retry
            </button>
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : cities.length === 0 ? (
          <div className="glass-tile p-8 sm:p-10 text-center flex flex-col items-center gap-3">
            <Icon name="star" className="text-amber-400/60" size={40} />
            <p className="font-body text-on-surface-variant text-sm sm:text-base">
              No favorites yet. Search a city and tap the star to save it.
            </p>
            <button
              type="button"
              onClick={() => navigate(ROUTES.home)}
              className="bg-white/20 hover:bg-white/30 text-white transition-colors font-stat-lg py-2 px-5 rounded-full text-sm sm:text-base"
            >
              Explore Weather
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 sm:gap-3">
            {cities.map((city) => {
              const data = weatherByCity[city]
              const current = data?.current
              const daily = data?.daily?.[0]

              return (
                <div
                  key={city}
                  className="glass-panel rounded-xl flex items-center min-h-[4.5rem] hover:bg-white/5 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.weather(city))}
                    className="flex-1 p-3 sm:p-4 flex items-center gap-3 text-left min-w-0"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      {current && (
                        <ForecastWeatherIcon
                          condition={current.condition}
                          code={current.code}
                          isDay={current.isDay}
                          icon={current.icon}
                          className="!text-3xl"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-stat-lg text-on-surface truncate text-sm sm:text-base">
                        {city}
                      </h2>
                      <p className="font-mono text-[10px] sm:text-label-mono text-on-surface-variant truncate">
                        {current
                          ? `${current.condition} • H:${daily?.maxTemp ?? current.temp}° L:${daily?.minTemp ?? current.temp}°`
                          : 'Unable to load'}
                      </p>
                    </div>
                    <span className="font-stat-lg text-on-surface flex-shrink-0 ml-2">
                      {current ? `${current.temp}°` : '—'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(city)}
                    className="flex-shrink-0 w-10 h-10 mr-2 sm:mr-3 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-white/10 transition-colors"
                    aria-label={`Remove ${city}`}
                  >
                    <Icon name="close" size={20} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={clearAll}
        title="Clear All Favorites?"
        description="Are you sure you want to remove all favorite cities? This action cannot be undone."
      />
    </PageLayout>
  )
}

export default FavoritesPage
