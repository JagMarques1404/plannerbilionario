"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Zap, Trophy, Star, Crown, Gem, Target, Award, Sparkles } from "lucide-react"

export interface AnimationConfig {
  type: "levelUp" | "achievement" | "streak" | "reward" | "milestone" | "combo"
  title: string
  subtitle?: string
  value?: number
  icon?: React.ReactNode
  color?: string
  duration?: number
  sound?: boolean
  confetti?: boolean
  particles?: boolean
}

export interface EpicAnimationsState {
  isVisible: boolean
  queue: AnimationConfig[]
  current: AnimationConfig | null
}

export function useEpicAnimations() {
  const [state, setState] = useState<EpicAnimationsState>({
    isVisible: false,
    queue: [],
    current: null,
  })

  const triggerAnimation = useCallback((config: AnimationConfig) => {
    setState((prev) => ({
      ...prev,
      queue: [...prev.queue, config],
    }))
  }, [])

  const processQueue = useCallback(() => {
    setState((prev) => {
      if (prev.queue.length === 0 || prev.isVisible) return prev

      const [next, ...remaining] = prev.queue
      return {
        ...prev,
        queue: remaining,
        current: next,
        isVisible: true,
      }
    })
  }, [])

  const hideAnimation = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isVisible: false,
      current: null,
    }))
  }, [])

  useEffect(() => {
    processQueue()
  }, [processQueue, state.queue.length])

  useEffect(() => {
    if (state.current && state.isVisible) {
      // Trigger confetti
      if (state.current.confetti !== false) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: [state.current.color || "#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1"],
        })
      }

      // Auto hide after duration
      const duration = state.current.duration || 3000
      const timer = setTimeout(hideAnimation, duration)
      return () => clearTimeout(timer)
    }
  }, [state.current, state.isVisible, hideAnimation])

  return {
    ...state,
    triggerAnimation,
    hideAnimation,
    triggerLevelUp: (level: number) =>
      triggerAnimation({
        type: "levelUp",
        title: `LEVEL UP!`,
        subtitle: `Você alcançou o nível ${level}!`,
        value: level,
        icon: <Crown className="w-12 h-12" />,
        color: "#FFD700",
        confetti: true,
      }),
    triggerAchievement: (title: string, subtitle?: string) =>
      triggerAnimation({
        type: "achievement",
        title: "CONQUISTA DESBLOQUEADA!",
        subtitle: title,
        icon: <Trophy className="w-12 h-12" />,
        color: "#FF6B6B",
        confetti: true,
      }),
    triggerStreak: (days: number) =>
      triggerAnimation({
        type: "streak",
        title: `${days} DIAS CONSECUTIVOS!`,
        subtitle: "Você está em chamas! 🔥",
        value: days,
        icon: <Zap className="w-12 h-12" />,
        color: "#FF4500",
        confetti: true,
      }),
    triggerReward: (amount: number, type: string) =>
      triggerAnimation({
        type: "reward",
        title: "RECOMPENSA RECEBIDA!",
        subtitle: `+${amount} ${type}`,
        value: amount,
        icon: <Gem className="w-12 h-12" />,
        color: "#9B59B6",
        confetti: true,
      }),
    triggerMilestone: (title: string, subtitle?: string) =>
      triggerAnimation({
        type: "milestone",
        title: "MARCO ALCANÇADO!",
        subtitle: title,
        icon: <Target className="w-12 h-12" />,
        color: "#2ECC71",
        confetti: true,
      }),
  }
}

export function useCommonAnimations() {
  const { triggerAnimation } = useEpicAnimations()

  return {
    celebrateInvestment: (amount: number) =>
      triggerAnimation({
        type: "reward",
        title: "INVESTIMENTO REALIZADO!",
        subtitle: `R$ ${amount.toLocaleString("pt-BR")} investidos`,
        icon: <Star className="w-12 h-12" />,
        color: "#4ECDC4",
      }),
    celebrateProfit: (profit: number) =>
      triggerAnimation({
        type: "reward",
        title: "LUCRO OBTIDO!",
        subtitle: `+R$ ${profit.toLocaleString("pt-BR")}`,
        icon: <Trophy className="w-12 h-12" />,
        color: "#2ECC71",
      }),
    celebrateRanking: (position: number) =>
      triggerAnimation({
        type: "achievement",
        title: `#${position} NO RANKING!`,
        subtitle: "Parabéns pela sua posição!",
        icon: <Award className="w-12 h-12" />,
        color: "#FFD700",
      }),
  }
}

export function EpicAnimationOverlay() {
  const { isVisible, current, hideAnimation } = useEpicAnimations()

  if (!current) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={hideAnimation}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="relative max-w-md mx-4 p-8 bg-white rounded-2xl shadow-2xl text-center"
            style={{ borderColor: current.color }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Particles Background */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-70"
                  initial={{
                    x: Math.random() * 400,
                    y: Math.random() * 300,
                    scale: 0,
                  }}
                  animate={{
                    y: -50,
                    scale: [0, 1, 0],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 10 }}
              className="mb-4 flex justify-center"
              style={{ color: current.color }}
            >
              {current.icon || <Sparkles className="w-12 h-12" />}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-2"
              style={{ color: current.color }}
            >
              {current.title}
            </motion.h2>

            {/* Subtitle */}
            {current.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-4"
              >
                {current.subtitle}
              </motion.p>
            )}

            {/* Value */}
            {current.value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-4xl font-bold mb-4"
                style={{ color: current.color }}
              >
                {current.value}
              </motion.div>
            )}

            {/* Glow Effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-20 blur-xl"
              style={{ backgroundColor: current.color }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AnimatedCounter({
  value,
  duration = 1000,
  format = (n: number) => n.toString(),
  className = "",
}: {
  value: number
  duration?: number
  format?: (n: number) => string
  className?: string
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(easeOutQuart * value)

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])

  return <span className={className}>{format(displayValue)}</span>
}

// Preset animations for common scenarios
export const presetAnimations = {
  firstInvestment: {
    type: "milestone" as const,
    title: "PRIMEIRO INVESTIMENTO!",
    subtitle: "Parabéns por dar o primeiro passo!",
    icon: <Star className="w-12 h-12" />,
    color: "#4ECDC4",
  },

  portfolioMilestone: (value: number) => ({
    type: "milestone" as const,
    title: "MARCO DA CARTEIRA!",
    subtitle: `Sua carteira alcançou R$ ${value.toLocaleString("pt-BR")}!`,
    icon: <Trophy className="w-12 h-12" />,
    color: "#FFD700",
  }),

  dailyStreak: (days: number) => ({
    type: "streak" as const,
    title: `${days} DIAS SEGUIDOS!`,
    subtitle: "Você está mantendo a consistência!",
    icon: <Zap className="w-12 h-12" />,
    color: "#FF4500",
  }),

  rankingUp: (position: number) => ({
    type: "achievement" as const,
    title: "SUBIU NO RANKING!",
    subtitle: `Agora você está na posição #${position}!`,
    icon: <Crown className="w-12 h-12" />,
    color: "#9B59B6",
  }),
}

export const EPIC_ANIMATIONS = {
  LEVEL_UP: "levelUp",
  ACHIEVEMENT: "achievement",
  STREAK: "streak",
  REWARD: "reward",
  MILESTONE: "milestone",
  COMBO: "combo",
} as const
