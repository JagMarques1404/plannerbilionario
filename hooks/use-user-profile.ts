"use client"

import { useState, useEffect } from "react"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  level: number
  xp: number
  tokens: number
  streak: number
  badges: string[]
  stats: {
    totalInvestments: number
    totalReturn: number
    bestStreak: number
    missionsCompleted: number
    rankingPosition: number
  }
  preferences: {
    notifications: boolean
    publicProfile: boolean
    theme: "light" | "dark" | "system"
  }
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)

        // Simular API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockProfile: UserProfile = {
          id: "1",
          name: "Investidor Julius",
          email: "investidor@julius.com",
          avatar: "/placeholder.svg?height=100&width=100&text=IJ",
          level: 15,
          xp: 12500,
          tokens: 2500,
          streak: 7,
          badges: ["Iniciante", "Consistente", "Diversificado", "Mentor"],
          stats: {
            totalInvestments: 45000,
            totalReturn: 8.5,
            bestStreak: 30,
            missionsCompleted: 127,
            rankingPosition: 23,
          },
          preferences: {
            notifications: true,
            publicProfile: true,
            theme: "system",
          },
        }

        setProfile(mockProfile)
      } catch (err) {
        setError("Erro ao carregar perfil do usuário")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return

    try {
      setIsLoading(true)

      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setProfile({ ...profile, ...updates })
    } catch (err) {
      setError("Erro ao atualizar perfil")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    profile,
    isLoading,
    error,
    updateProfile,
  }
}
