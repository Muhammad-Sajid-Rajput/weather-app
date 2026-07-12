import { Link } from 'react-router-dom'
import PageLayout from '@/shared/components/PageLayout'
import Icon from '@/shared/components/Icon'
import { ROUTES } from '@/shared/constants/routes'
import { getBackgroundImage } from '@/shared/utils/weather'

const NotFoundPage = () => (
  <PageLayout mainClassName="flex items-center justify-center" bgImage={getBackgroundImage(new Date().getHours())}>
    <div className="page-container-narrow flex flex-col items-center gap-4 text-center py-8">
      <Icon name="error" size={48} />
      <h1 className="font-display text-2xl sm:text-headline-lg text-on-surface">Page not found</h1>
      <p className="font-body text-on-surface-variant text-sm sm:text-base max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to={ROUTES.home}
        className="bg-primary text-on-primary-container font-stat-lg py-2.5 px-6 rounded-full text-sm sm:text-base"
      >
        Back to Home
      </Link>
    </div>
  </PageLayout>
)

export default NotFoundPage
