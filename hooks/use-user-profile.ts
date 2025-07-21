"use client"

import { useState, useEffect } from "react"

interface UserProfile {
  id: string
  name: string
  email: string
  level: number
  xp: number
  tokens: number
  balance: number
  avatar?: string
  createdAt: string
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simular dados do usuário para o preview
    const mockProfile: UserProfile = {
      id: "1",
      name: "Julius Investidor",
      email: "julius@invest.com",
      level: 5,
      xp: 4250,
      tokens: 1850,
      balance: 125000,
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
    }

    setTimeout(() => {
      setProfile(mockProfile)
      setLoading(false)
    }, 1000)
  }, [])

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...updates })
    }
  }

  const addXp = (amount: number) => {
    if (profile) {
      const newXp = profile.xp + amount
      const newLevel = Math.floor(newXp / 1000) + 1
      updateProfile({ xp: newXp, level: newLevel })
    }
  }

  const addTokens = (amount: number) => {
    if (profile) {
      updateProfile({ tokens: profile.tokens + amount })
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    addXp,
    addTokens,
  }
}
