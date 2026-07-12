import { Component } from 'react'
import Icon from '@/shared/components/Icon'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary:', error, info)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-shell items-center justify-center p-6 text-center gap-4">
          <Icon name="error" className="text-error" size={40} />
          <h1 className="font-display text-xl text-on-surface">Something went wrong</h1>
          <p className="font-body text-on-surface-variant text-sm max-w-md">
            Please refresh the page or return home.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="bg-primary text-on-primary-container font-stat-lg py-2.5 px-6 rounded-full text-sm"
          >
            Back to Home
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
