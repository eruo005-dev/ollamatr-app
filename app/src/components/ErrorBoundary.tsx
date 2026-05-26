/** Standard React class error boundary with a Turkish fallback card using OllamaTR design tokens. */
import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary] Caught error:', error, info)
  }

  handleReload = (): void => {
    window.location.reload()
  }

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children
    }

    if (this.props.fallback !== undefined) {
      return this.props.fallback
    }

    return (
      <div
        role="alert"
        className="mx-auto my-12 max-w-md rounded-lg border border-border-subtle bg-bg-surface p-6 text-text-primary"
      >
        <h2 className="font-display text-lg font-bold uppercase tracking-tight text-accent-red-light">
          Bir hata oluştu
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-primary">
          Bir hata oluştu. Lütfen sayfayı yenileyin.
        </p>
        <button
          type="button"
          onClick={this.handleReload}
          className="mt-5 inline-flex items-center gap-2 rounded border border-border-subtle bg-bg-surface px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-text-primary transition-colors duration-200 hover:border-accent-red hover:text-accent-red-light"
        >
          Sayfayı Yenile
        </button>
      </div>
    )
  }
}

export default ErrorBoundary
