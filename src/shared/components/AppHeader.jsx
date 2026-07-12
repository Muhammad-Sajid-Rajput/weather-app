import { Link, useNavigate } from 'react-router-dom'
import Icon from '@/shared/components/Icon'
import { ROUTES } from '@/shared/constants/routes'
import Logo from '@/assets/Logo.webp'

const AppHeader = ({ showBack = false, favoritesActive = false }) => {
  const navigate = useNavigate()

  return (
    <header className="flex-shrink-0 z-20 border-b border-white/10 bg-transparent">
      <div className="flex justify-between items-center w-full h-14 sm:h-16 px-4 sm:px-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {showBack && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="md:hidden flex-shrink-0 border border-white/10 rounded-full w-9 h-9 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors"
              aria-label="Go back"
            >
              <Icon name="arrow_back" size={20} />
            </button>
          )}
          <Link to={ROUTES.home} className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
              <img src={Logo} alt="ClimateX Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display text-lg sm:text-2xl font-bold text-on-surface tracking-tight truncate">
              ClimateX
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <Link
            to={ROUTES.favorites}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/10 ${
              favoritesActive ? 'text-amber-400' : 'text-on-surface-variant hover:text-on-surface'
            }`}
            aria-label="Favorites"
          >
            <Icon name="star" filled={favoritesActive} size={22} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
