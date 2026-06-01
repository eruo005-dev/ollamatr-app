/**
 * Card primitive — formerly a 3D mouse-tilt + neon-glow effect, now a flat
 * grounded surface with a subtle border-color hover (per the taste-skill
 * design read: trust-first community OSS, MOTION_INTENSITY: 3).
 *
 * API kept identical so consumers (Home, Modeller) don't need touching.
 * Keyboard activation for role="button" / role="link" is preserved.
 */
import { useCallback } from 'react'
import type {
  AriaAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
} from 'react'

export interface TiltCardProps extends AriaAttributes {
  children: ReactNode
  className?: string
  onClick?: () => void
  role?: string
  tabIndex?: number
  id?: string
}

export function TiltCard({
  children,
  className = '',
  onClick,
  role,
  tabIndex,
  id,
  ...aria
}: TiltCardProps) {
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (!onClick) return
      if (role !== 'button' && role !== 'link') return
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault()
        onClick()
      }
    },
    [onClick, role]
  )

  const isInteractive = Boolean(onClick) && (role === 'button' || role === 'link')
  const effectiveTabIndex = tabIndex ?? (isInteractive ? 0 : undefined)

  return (
    <div
      id={id}
      role={role}
      tabIndex={effectiveTabIndex}
      className={`${className} transition-colors duration-200 hover:border-accent-red/50`}
      onClick={onClick}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      {...aria}
    >
      {children}
    </div>
  )
}

export default TiltCard
