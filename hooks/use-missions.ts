"use client"

import { useState, useEffect } from "react"

interface Mission {
  id: string
  title: string
  description: string
  xpReward: number
  tokenReward: number
  completed: boolean
  type: "daily" | "weekly" | "achievement"
  icon: string
  difficulty: "easy" | "medium" | "hard"
}

export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)
  const [completedToday, setCompletedToday] = useState(0)

  useEffect(() => {
    // Simular missões para o preview
    const mockMissions: Mission[] = [
      {
        id: "1",
        title: "Check-in Matinal",
        description: "Faça seu primeiro login do dia",
        xpReward: 10,
        tokenReward: 5,
        completed: true,
        type: "daily",
        icon: "🌅",
        difficulty: "easy",
      },
      {
        id: "2",
        title: "Revisar Gastos",
        description: "Analise seus gastos da semana passada",
        xpReward: 15,
        tokenReward: 8,
        completed: false,
        type: "daily",
        icon: "💡",
        difficulty: "easy",
      },
      {
        id: "3",
        title: "Definir Orçamento",
        description: "Configure seu orçamento mensal",
        xpReward: 20,
        tokenReward: 10,
        completed: false,
        type: "daily",
        icon: "📊",
        difficulty: "medium",
      },
      {
        id: "4",
        title: "Lição Financeira",
        description: "Complete uma lição sobre investimentos",
        xpReward: 25,
        tokenReward: 12,
        completed: false,
        type: "daily",
        icon: "📚",
        difficulty: "medium",
      },
      {
        id: "5",
        title: "Registrar Economia",
        description: "Registre uma economia que você fez hoje",
        xpReward: 30,
        tokenReward: 15,
        completed: false,
        type: "daily",
        icon: "💰",
        difficulty: "medium",
      },
      {
        id: "6",
        title: "Análise Semanal",
        description: "Faça uma análise completa da semana",
        xpReward: 50,
        tokenReward: 25,
        completed: false,
        type: "weekly",
        icon: "🔍",
        difficulty: "hard",
      },
      {
        id: "7",
        title: "Check-out Noturno",
        description: "Revise suas atividades do dia",
        xpReward: 15,
        tokenReward: 8,
        completed: false,
        type: "daily",
        icon: "🌙",
        difficulty: "easy",
      },
    ]

    setTimeout(() => {
      setMissions(mockMissions)
      setCompletedToday(1)
      setLoading(false)
    }, 800)
  }, [])

  const completeMission = (missionId: string) => {
    setMissions((prev) => prev.map((mission) => (mission.id === missionId ? { ...mission, completed: true } : mission)))
    setCompletedToday((prev) => prev + 1)
  }

  const dailyMissions = missions.filter((m) => m.type === "daily")
  const weeklyMissions = missions.filter((m) => m.type === "weekly")
  const totalXpAvailable = missions.reduce((sum, m) => sum + m.xpReward, 0)
  const totalTokensAvailable = missions.reduce((sum, m) => sum + m.tokenReward, 0)

  return {
    missions,
    dailyMissions,
    weeklyMissions,
    loading,
    completedToday,
    totalXpAvailable,
    totalTokensAvailable,
    completeMission,
  }
}
