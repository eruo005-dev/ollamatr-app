/** Shared 3D mouse-tilt card with accessibility-friendly keyboard activation, extracted from Home and Modeller pages. */
import { useCallback, useRef, useState } from 'react'
import type {
  AriaAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
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

const REST_TRANSFORM = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'

export function TiltCard({
  children,
  className = '',
  onClick,
  role,
  tabIndex,
  id,
  ...aria
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState<string>(REST_TRANSFORM)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
    )
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])

  const handleMouseLeave = useCallback(() => {
    setTransform(REST_TRANSFORM)
    setIsHovered(false)
  }, [])

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
      ref={cardRef}
      id={id}
      role={role}
      tabIndex={effectiveTabIndex}
      className={className}
      style={{
        transform,
        transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        borderColor: isHovered ? 'rgba(217, 30, 54, 0.5)' : undefined,
        boxShadow: isHovered ? '0 0 20px rgba(217, 30, 54, 0.15)' : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      {...aria}
    >
      {children}
    </div>
  )
}

export default TiltCard
