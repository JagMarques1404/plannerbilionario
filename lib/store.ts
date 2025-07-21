// lib/store.ts
// Store global para gerenciar estado do dashboard do Julius Invest

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Tipos TypeScript para o store
interface User {
  id: string
  email: string
  name: string
  xp: number
  level: number
  tokens: number
  balance: number
  current_streak: number
  longest_streak: number
  total_missions_completed: number
  last_login_date: string
  created_at: string
  updated_at: string
}

interface Mission {
  id: string
  user_id: string
  mission_type: string
  completed_at: string | null
  mission_date: string
  xp_reward: number
  token_reward: number
  created_at: string
}

interface Achievement {
  id: string
  user_id: string
  achievement_type: string
  unlocked_at: string
}

interface DashboardStats {
  totalUsers: number
  totalMissions: number
  totalTokens: number
  averageLevel: number
  topUsers: User[]
  recentAchievements: Achievement[]
}

interface DashboardState {
  // Estado do usuário atual
  currentUser: User | null
  isLoading: boolean
  error: string | null

  // Missões do usuário
  missions: Mission[]
  missionsLoading: boolean

  // Conquistas do usuário
  achievements: Achievement[]
  achievementsLoading: boolean

  // Estatísticas globais
  dashboardStats: DashboardStats | null
  statsLoading: boolean

  // Ações para atualizar o estado
  setCurrentUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  setMissions: (missions: Mission[]) => void
  setMissionsLoading: (loading: boolean) => void

  setAchievements: (achievements: Achievement[]) => void
  setAchievementsLoading: (loading: boolean) => void

  setDashboardStats: (stats: DashboardStats) => void
  setStatsLoading: (loading: boolean) => void

  // Ações para completar missões
  completeMission: (missionId: string) => void

  // Ações para adicionar conquistas
  addAchievement: (achievement: Achievement) => void

  // Ação para resetar o store
  reset: () => void
}

// Estado inicial
const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
  missions: [],
  missionsLoading: false,
  achievements: [],
  achievementsLoading: false,
  dashboardStats: null,
  statsLoading: false,
}

// Store principal do dashboard
export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Ações para usuário
      setCurrentUser: (user) => set({ currentUser: user }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      // Ações para missões
      setMissions: (missions) => set({ missions }),
      setMissionsLoading: (loading) => set({ missionsLoading: loading }),

      // Ações para conquistas
      setAchievements: (achievements) => set({ achievements }),
      setAchievementsLoading: (loading) => set({ achievementsLoading: loading }),

      // Ações para estatísticas
      setDashboardStats: (stats) => set({ dashboardStats: stats }),
      setStatsLoading: (loading) => set({ statsLoading: loading }),

      // Completar missão
      completeMission: (missionId) => {
        const missions = get().missions.map((mission) =>
          mission.id === missionId ? { ...mission, completed_at: new Date().toISOString() } : mission,
        )
        set({ missions })

        // Atualizar XP e tokens do usuário (simulado)
        const currentUser = get().currentUser
        if (currentUser) {
          const mission = missions.find((m) => m.id === missionId)
          if (mission) {
            const updatedUser = {
              ...currentUser,
              xp: currentUser.xp + mission.xp_reward,
              tokens: currentUser.tokens + mission.token_reward,
              total_missions_completed: currentUser.total_missions_completed + 1,
            }

            // Calcular novo nível (1000 XP por nível)
            const newLevel = Math.floor(updatedUser.xp / 1000) + 1
            if (newLevel > updatedUser.level) {
              updatedUser.level = newLevel
              // Bônus de level up
              updatedUser.tokens += (newLevel - currentUser.level) * 100
            }

            set({ currentUser: updatedUser })
          }
        }
      },

      // Adicionar conquista
      addAchievement: (achievement) => {
        const achievements = [...get().achievements, achievement]
        set({ achievements })
      },

      // Reset do store
      reset: () => set(initialState),
    }),
    {
      name: "julius-invest-dashboard", // Nome para localStorage
      partialize: (state) => ({
        currentUser: state.currentUser,
        missions: state.missions,
        achievements: state.achievements,
      }), // Apenas persistir dados importantes
    },
  ),
)

// Hook para acessar apenas o usuário atual
export const useCurrentUser = () => useDashboardStore((state) => state.currentUser)

// Hook para acessar apenas as missões
export const useMissions = () =>
  useDashboardStore((state) => ({
    missions: state.missions,
    loading: state.missionsLoading,
    completeMission: state.completeMission,
  }))

// Hook para acessar apenas as conquistas
export const useAchievements = () =>
  useDashboardStore((state) => ({
    achievements: state.achievements,
    loading: state.achievementsLoading,
    addAchievement: state.addAchievement,
  }))

// Hook para acessar estatísticas do dashboard
export const useDashboardStats = () =>
  useDashboardStore((state) => ({
    stats: state.dashboardStats,
    loading: state.statsLoading,
  }))

// Seletores úteis
export const selectUserLevel = (state: DashboardState) => state.currentUser?.level || 1
export const selectUserXP = (state: DashboardState) => state.currentUser?.xp || 0
export const selectUserTokens = (state: DashboardState) => state.currentUser?.tokens || 0
export const selectUserStreak = (state: DashboardState) => state.currentUser?.current_streak || 0

// Função para calcular progresso do nível
export const calculateLevelProgress = (xp: number, level: number) => {
  const currentLevelXP = (level - 1) * 1000
  const nextLevelXP = level * 1000
  const progressXP = xp - currentLevelXP
  const neededXP = nextLevelXP - currentLevelXP
  const percentage = Math.min((progressXP / neededXP) * 100, 100)

  return {
    current: progressXP,
    needed: neededXP,
    percentage: Math.round(percentage),
    nextLevel: level + 1,
  }
}

// Função para calcular próximo nível
export const getNextLevelInfo = (xp: number) => {
  const currentLevel = Math.floor(xp / 1000) + 1
  const nextLevel = currentLevel + 1
  const xpForNextLevel = nextLevel * 1000
  const xpNeeded = xpForNextLevel - xp

  return {
    currentLevel,
    nextLevel,
    xpNeeded,
    xpForNextLevel,
  }
}

// Função para formatar números
export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k"
  }
  return num.toString()
}

// Função para formatar moeda
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount)
}

// Função para formatar tokens
export const formatTokens = (tokens: number) => {
  return `${formatNumber(tokens)} $BILLION`
}

// Tipos exportados para uso em outros arquivos
export type { User, Mission, Achievement, DashboardStats, DashboardState }
