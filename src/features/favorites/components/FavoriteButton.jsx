import { useState, useEffect } from 'react'
import Icon from '@/shared/components/Icon'
import { favoritesStorage } from '@/shared/lib/storage'

const FavoriteButton = ({ city }) => {
  const [isFavorite, setIsFavorite] = useState(() => favoritesStorage.has(city))

  useEffect(() => {
    setIsFavorite(favoritesStorage.has(city))
  }, [city])

  const toggle = () => {
    if (isFavorite) {
      favoritesStorage.remove(city)
      setIsFavorite(false)
    } else {
      favoritesStorage.add(city)
      setIsFavorite(true)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
        isFavorite
          ? 'bg-amber-400/20 text-amber-400 hover:bg-amber-400/30 hover:text-amber-400'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-white/10'
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Icon name="star" filled={isFavorite} size={22} />
    </button>
  )
}

export default FavoriteButton
