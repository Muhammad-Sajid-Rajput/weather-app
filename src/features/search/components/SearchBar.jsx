import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '@/shared/components/Icon'
import { useCitySearch } from '@/features/search/hooks/useCitySearch'
import { historyStorage } from '@/shared/lib/storage'
import { ROUTES } from '@/shared/constants/routes'
import { isValidCityName } from '@/shared/utils/city'

const MAX_INPUT = 80

const SearchBar = ({ onDetectLocation, detecting = false }) => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const navigate = useNavigate()
  const wrapperRef = useRef(null)
  const { suggestions, loading, hasResults } = useCitySearch(query)

  useEffect(() => {
    if (hasResults) setOpen(true)
    if (query.trim().length < 2) setOpen(false)
  }, [hasResults, query])

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const goToCity = (city) => {
    if (!isValidCityName(city)) {
      setSubmitError('Enter a valid city name (2–100 characters).')
      return
    }
    setSubmitError(null)
    navigate(ROUTES.weather(city))
    setQuery('')
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) {
      setSubmitError('Enter a city name to search.')
      return
    }
    goToCity(query.trim())
  }

  return (
    <div ref={wrapperRef} className="w-full flex flex-col gap-3 sm:gap-4">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          <Icon name="search" className="text-on-surface-variant" size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value.slice(0, MAX_INPUT))
            setSubmitError(null)
          }}
          onFocus={() => hasResults && setOpen(true)}
          placeholder="Search for a city..."
          maxLength={MAX_INPUT}
          autoComplete="off"
          aria-label="Search for a city"
          className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base glass-panel rounded-full text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {loading && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </form>

      {submitError && (
        <p className="text-error font-mono text-label-mono text-center text-xs sm:text-sm" role="alert">
          {submitError}
        </p>
      )}

      {open && suggestions.length > 0 && (
        <ul className="w-full glass-panel rounded-xl sm:rounded-2xl overflow-hidden max-h-36 sm:max-h-48 overflow-y-auto border border-white/10">
          {suggestions.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goToCity(item.label)}
                className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-white/10 transition-colors"
              >
                <span className="font-stat-lg text-on-surface text-sm sm:text-base block truncate">
                  {item.name}
                </span>
                <span className="font-mono text-[10px] sm:text-label-mono text-on-surface-variant uppercase truncate block">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full">
        <button
          type="button"
          onClick={onDetectLocation}
          disabled={detecting}
          className="bg-sky-500/80 text-white font-stat-lg text-sm sm:text-base py-2.5 sm:py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-sky-400 transition-colors disabled:opacity-50"
        >
          <Icon name="my_location" size={18} />
          {detecting ? 'Detecting...' : 'Detect Location'}
        </button>
        <button
          type="button"
          onClick={() => navigate(ROUTES.favorites)}
          className="glass-panel text-on-surface font-stat-lg text-sm sm:text-base py-2.5 sm:py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
        >
          <Icon name="star" size={18} />
          Favorites
        </button>
      </div>
    </div>
  )
}

export default SearchBar
