/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useRef, useEffect, useCallback } from 'react'

import { useTheme } from '@/context/theme-provider'
import { cn } from '@/lib/utils'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseOpacity: number
  phase: number
}

interface ParticleBackgroundProps {
  className?: string
  particleCount?: number
  connectionDistance?: number
  speed?: number
}

const DEFAULT_PARTICLE_COUNT = 100
const DEFAULT_CONNECTION_DISTANCE = 150
const DEFAULT_SPEED = 0.3

export function ParticleBackground({
  className,
  particleCount = DEFAULT_PARTICLE_COUNT,
  connectionDistance = DEFAULT_CONNECTION_DISTANCE,
  speed = DEFAULT_SPEED,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationIdRef = useRef<number>(0)
  const reduceMotionRef = useRef(false)
  const { resolvedTheme } = useTheme()

  const initParticles = useCallback(
    (w: number, h: number) => {
      const particles: Particle[] = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: Math.random() * 2.5 + 0.8,
          baseOpacity: Math.random() * 0.5 + 0.3,
          phase: Math.random() * Math.PI * 2,
        })
      }
      particlesRef.current = particles
    },
    [particleCount, speed]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotionRef.current = mq.matches

    const updateCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    updateCanvasSize()
    initParticles(canvas.width, canvas.height)

    const isDark = resolvedTheme === 'dark'
    const particleColor = isDark ? '160, 180, 255' : '100, 120, 200'
    const lineColor = isDark ? '140, 160, 240' : '80, 100, 180'

    let time = 0

    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!reduceMotionRef.current) {
        time += 0.005
      }

      const particles = particlesRef.current

      // Update and draw
      for (const p of particles) {
        if (!reduceMotionRef.current) {
          p.x += p.vx
          p.y += p.vy

          // Wrap around edges
          if (p.x < -10) p.x = w + 10
          if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          if (p.y > h + 10) p.y = -10
        }

        // Breathing opacity
        const breath = Math.sin(time * 1.5 + p.phase) * 0.2 + 0.8
        const opacity = p.baseOpacity * breath

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${opacity.toFixed(2)})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha.toFixed(3)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      updateCanvasSize()
      initParticles(
        canvas.width / (window.devicePixelRatio || 1),
        canvas.height / (window.devicePixelRatio || 1)
      )
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas.parentElement!)

    const motionListener = (e: MediaQueryListEvent) => {
      reduceMotionRef.current = e.matches
    }
    mq.addEventListener('change', motionListener)

    return () => {
      cancelAnimationFrame(animationIdRef.current)
      resizeObserver.disconnect()
      mq.removeEventListener('change', motionListener)
    }
  }, [resolvedTheme, initParticles, connectionDistance])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
    />
  )
}
