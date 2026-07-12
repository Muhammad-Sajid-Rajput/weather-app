import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loader from '@/shared/components/ui/Loader'

const HomePage = lazy(() => import('@/pages/Home'))
const WeatherDetailsPage = lazy(() => import('@/pages/WeatherDetails'))
const FavoritesPage = lazy(() => import('@/pages/Favorites'))
const NotFoundPage = lazy(() => import('@/pages/NotFound'))

export const AppRoutes = () => (
  <Suspense fallback={<div className="flex items-center justify-center h-dvh"><Loader size="lg" /></div>}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weather/:city" element={<WeatherDetailsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
)
