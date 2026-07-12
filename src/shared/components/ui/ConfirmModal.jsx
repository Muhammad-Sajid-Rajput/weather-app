import Icon from '@/shared/components/Icon'

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Clear All',
  cancelText = 'Cancel',
  type = 'danger',
}) => {
  if (!isOpen) return null

  const isDanger = type === 'danger'

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-tile p-6 max-w-sm w-full text-center flex flex-col gap-4 shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-200">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${isDanger ? 'bg-error/15 text-error' : 'bg-primary/15 text-primary'
          }`}>
          <Icon name={isDanger ? 'error' : 'info'} size={24} className={isDanger ? 'text-error' : 'text-primary'} />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-on-surface">
            {title}
          </h3>
          <p className="font-body text-sm text-on-surface-variant mt-2 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full glass-panel hover:bg-white/10 text-on-surface-variant font-mono text-label-mono text-sm border border-white/10"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`flex-1 py-2.5 rounded-full font-mono text-label-mono text-sm transition-colors ${isDanger
                ? 'bg-error/20 text-error hover:bg-error/30 border border-error/30'
                : 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30'
              }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
