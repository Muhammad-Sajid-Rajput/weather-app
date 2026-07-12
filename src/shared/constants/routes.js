import { slugifyCity } from '@/shared/utils/city'

export const ROUTES = {
  home: '/',
  favorites: '/favorites',
  weather: (city) => `/weather/${slugifyCity(city)}`,
}
