"use client"

import { useAppStore } from "@/store/app-store"
import { useEffect, useState } from "react"

export function ConfettiOverlay() {
  const { showConfetti } = useAppStore()
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([])

  useEffect(() => {
    if (showConfetti) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setParticles(newParticles)
    }
  }, [showConfetti])

  if (!showConfetti) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti"
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full" />
        </div>
      ))}
    </div>
  )
}
