import { useNavigate } from 'react-router-dom'
import PageLayout from '@/shared/components/PageLayout'
import SearchBar from '@/features/search/components/SearchBar'
import SearchHistory from '@/features/search/components/SearchHistory'
import { useGeolocation } from '@/features/weather/hooks/useGeolocation'
import { ROUTES } from '@/shared/constants/routes'
import { getBackgroundImage } from '@/shared/utils/weather'
import Logo from '@/assets/Logo.webp'

const HomePage = () => {
  const navigate = useNavigate()
  const { detect, loading: detecting, error } = useGeolocation()

  const handleDetectLocation = async () => {
    const city = await detect()
    if (city) navigate(ROUTES.weather(city))
  }



  const currentHour = new Date().getHours()
  const dynamicBg = getBackgroundImage(currentHour)

  return (
    <PageLayout
      mainClassName="flex flex-col"
      bgImage={dynamicBg}
    >
      <div className="page-container-narrow flex flex-col gap-4 sm:gap-6 my-auto">
        <div className="p-5 sm:p-8 w-full flex flex-col items-center gap-5 sm:gap-6">
          <div className="text-center flex flex-col items-center gap-2 sm:gap-3">
            <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center flex-shrink-0">
              <img src={Logo} alt="ClimateX Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl text-on-surface leading-tight">
              ClimateX
            </h1>
            <p className="font-mono text-[10px] sm:text-label-mono text-on-surface-variant uppercase">
              Real-Time Forecasts. Reliable Insights.
            </p>
          </div>

          <SearchBar onDetectLocation={handleDetectLocation} detecting={detecting} />

          {error && (
            <p className="text-error font-mono text-label-mono text-center text-sm" role="alert">
              {error}
            </p>
          )}
        </div>

        <SearchHistory />
      </div>
    </PageLayout>
  )
}

export default HomePage
