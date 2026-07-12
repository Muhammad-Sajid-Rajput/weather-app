import Icon from '@/shared/components/Icon'

const ErrorState = ({ message, onRetry }) => (
  <div className="glass-tile p-8 flex flex-col items-center text-center gap-4 max-w-md mx-auto">
    <Icon name="error" className="text-error text-5xl" size={48} />
    <p className="font-body text-on-surface-variant">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="bg-primary text-on-primary-container font-stat-lg py-2 px-6 rounded-full hover:bg-primary-fixed transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
)

export default ErrorState
