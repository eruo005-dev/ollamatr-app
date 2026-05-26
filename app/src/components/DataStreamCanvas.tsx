import { useRef, useEffect, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  speed: number
  length: number
  opacity: number
}

export default function DataStreamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const isMobileRef = useRef(false)

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    isMobileRef.current = window.innerWidth < 768
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    resize()
    window.addEventListener('resize', resize)

    function createParticle(): Particle {
      return {
        x: Math.random() * canvas!.width,
        y: canvas!.height + Math.random() * 100,
        speed: 2 + Math.random() * 3,
        length: 50 + Math.random() * 100,
        opacity: 0.1 + Math.random() * 0.4,
      }
    }

    function drawParticle(p: Particle) {
      if (!ctx) return
      const gradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.length)
      gradient.addColorStop(0, `rgba(217, 30, 54, ${p.opacity})`)
      gradient.addColorStop(1, 'rgba(19, 18, 23, 0)')
      ctx.strokeStyle = gradient
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x, p.y + p.length)
      ctx.stroke()
    }

    function animate() {
      if (!ctx || !canvas) return

      // Clear with trail persistence
      ctx.fillStyle = 'rgba(10, 9, 12, 0.3)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Ambient red glow
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const glowGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        2000
      )
      glowGradient.addColorStop(0, 'rgba(217, 30, 54, 0.1)')
      glowGradient.addColorStop(1, 'rgba(10, 9, 12, 0)')
      ctx.fillStyle = glowGradient
      ctx.fillRect(
        canvas.width / 2 - 2000,
        canvas.height / 2 - 2000,
        4000,
        4000
      )
      ctx.restore()

      // Spawn new particle
      if (Math.random() > 0.1) {
        particlesRef.current.push(createParticle())
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.y -= p.speed
        drawParticle(p)
        return p.y + p.length > 0
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [resize])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}
