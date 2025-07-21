"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Gift, Zap, Crown, Target } from "lucide-react"

interface CelebrationData {
  type: "mission_completed" | "level_up" | "achievement_unlocked" | "streak_milestone" | "investment_profit"
  title: string
  description: string
  rewards: {
    xp?: number
    tokens?: number
    badge?: string
  }
  rarity?: "common" | "rare" | "epic" | "legendary"
}

interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  celebration: CelebrationData | null
}

export function CelebrationModal({ isOpen, onClose, celebration }: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<"enter" | "celebrate" | "exit">("enter")

  useEffect(() => {
    if (isOpen && celebration) {
      setShowConfetti(true)
      setAnimationPhase("enter")

      // Sequência de animações
      const timer1 = setTimeout(() => setAnimationPhase("celebrate"), 500)
      const timer2 = setTimeout(() => setShowConfetti(false), 3000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [isOpen, celebration])

  if (!celebration) return null

  const getIcon = () => {
    switch (celebration.type) {
      case "mission_completed":
        return <Target className="h-12 w-12 text-blue-500" />
      case "level_up":
        return <Crown className="h-12 w-12 text-yellow-500" />
      case "achievement_unlocked":
        return <Trophy className="h-12 w-12 text-purple-500" />
      case "streak_milestone":
        return <Zap className="h-12 w-12 text-orange-500" />
      case "investment_profit":
        return <Star className="h-12 w-12 text-green-500" />
      default:
        return <Gift className="h-12 w-12 text-pink-500" />
    }
  }

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getBackgroundGradient = () => {
    switch (celebration.rarity) {
      case "rare":
        return "bg-gradient-to-br from-blue-50 to-indigo-100"
      case "epic":
        return "bg-gradient-to-br from-purple-50 to-pink-100"
      case "legendary":
        return "bg-gradient-to-br from-yellow-50 to-orange-100"
      default:
        return "bg-gradient-to-br from-gray-50 to-blue-50"
    }
  }

  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[60]">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400"][
                    Math.floor(Math.random() * 6)
                  ]
                }`}
              />
            </div>
          ))}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className={`max-w-md mx-auto ${getBackgroundGradient()} border-2 ${
            celebration.rarity === "legendary"
              ? "border-yellow-300"
              : celebration.rarity === "epic"
                ? "border-purple-300"
                : celebration.rarity === "rare"
                  ? "border-blue-300"
                  : "border-gray-300"
          }`}
        >
          <div className="text-center space-y-6 py-4">
            {/* Icon with Animation */}
            <div className={`flex justify-center ${animationPhase === "celebrate" ? "animate-bounce" : ""}`}>
              <div className="p-4 rounded-full bg-white shadow-lg">{getIcon()}</div>
            </div>

            {/* Rarity Badge */}
            {celebration.rarity && (
              <div className="flex justify-center">
                <Badge className={`${getRarityColor(celebration.rarity)} border font-semibold uppercase tracking-wide`}>
                  {celebration.rarity}
                </Badge>
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">{celebration.title}</h2>
              <p className="text-gray-600">{celebration.description}</p>
            </div>

            {/* Rewards */}
            {(celebration.rewards.xp || celebration.rewards.tokens || celebration.rewards.badge) && (
              <div className="bg-white/80 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Recompensas:</h3>
                <div className="flex justify-center space-x-4">
                  {celebration.rewards.xp && (
                    <div className="flex items-center space-x-2 bg-blue-100 px-3 py-2 rounded-full">
                      <Trophy className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-blue-800">+{celebration.rewards.xp} XP</span>
                    </div>
                  )}
                  {celebration.rewards.tokens && (
                    <div className="flex items-center space-x-2 bg-orange-100 px-3 py-2 rounded-full">
                      <span className="text-orange-600">💰</span>
                      <span className="font-semibold text-orange-800">+{celebration.rewards.tokens} tokens</span>
                    </div>
                  )}
                  {celebration.rewards.badge && (
                    <div className="flex items-center space-x-2 bg-purple-100 px-3 py-2 rounded-full">
                      <Star className="h-4 w-4 text-purple-600" />
                      <span className="font-semibold text-purple-800">{celebration.rewards.badge}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Button */}
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3"
            >
              Continuar Jornada! 🚀
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Hook para usar celebrações
export function useCelebration() {
  const [celebration, setCelebration] = useState<CelebrationData | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const showCelebration = (data: CelebrationData) => {
    setCelebration(data)
    setIsOpen(true)
  }

  const closeCelebration = () => {
    setIsOpen(false)
    setTimeout(() => setCelebration(null), 300) // Aguardar animação de saída
  }

  return {
    celebration,
    isOpen,
    showCelebration,
    closeCelebration,
  }
}
