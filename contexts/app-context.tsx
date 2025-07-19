"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  patrimonio: number
  meta12meses: number
  grupo: string
  nivel: number
  xp: number
  billionTokens: number
  streak: number
  posicaoRanking: number
  badges: Badge[]
  missoesConcluidas: string[]
  kycStatus: "pending" | "verified" | "rejected"
  isVip: boolean
  joinedAt: string
  lastLogin: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt: string
}

export interface Mission {
  id: string
  title: string
  description: string
  category: "daily" | "weekly" | "monthly"
  difficulty: "easy" | "medium" | "hard"
  reward: number
  billionReward: number
  progress: number
  target: number
  completed: boolean
  deadline?: string
  type: "financial" | "educational" | "social" | "health"
}

export interface Group {
  id: string
  name: string
  minWealth: number
  entryFee: number
  monthlyFee: number
  color: string
  icon: string
  benefits: string[]
  memberCount: number
}

export interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "reward" | "purchase" | "fee"
  amount: number
  currency: "BRL" | "BILLION"
  description: string
  status: "pending" | "completed" | "failed"
  createdAt: string
}

export interface Competition {
  id: string
  title: string
  description: string
  type: "individual" | "group"
  startDate: string
  endDate: string
  prize: number
  participants: number
  status: "upcoming" | "active" | "ended"
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  missions: Mission[]
  groups: Group[]
  transactions: Transaction[]
  competitions: Competition[]
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  completeMission: (missionId: string) => void
  updatePatrimonio: (novoPatrimonio: number) => void
  purchaseTokens: (amount: number) => Promise<boolean>
  joinGroup: (groupId: string) => Promise<boolean>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Dados mockados expandidos
const mockGroups: Group[] = [
  {
    id: "iniciante",
    name: "INICIANTE",
    minWealth: 0,
    entryFee: 100,
    monthlyFee: 97,
    color: "from-emerald-500 to-teal-600",
    icon: "🌱",
    benefits: ["Missões básicas", "Comunidade de apoio", "Conteúdo educativo"],
    memberCount: 15420,
  },
  {
    id: "crescente",
    name: "CRESCENTE",
    minWealth: 10000,
    entryFee: 500,
    monthlyFee: 197,
    color: "from-blue-500 to-cyan-600",
    icon: "📈",
    benefits: ["Missões avançadas", "Webinars semanais", "Cashback 1%"],
    memberCount: 8930,
  },
  {
    id: "magnata",
    name: "MAGNATA",
    minWealth: 100000,
    entryFee: 5000,
    monthlyFee: 297,
    color: "from-purple-600 to-blue-600",
    icon: "💎",
    benefits: ["Mentoria VIP", "Eventos exclusivos", "Cashback 3%"],
    memberCount: 2150,
  },
  {
    id: "elite",
    name: "ELITE",
    minWealth: 500000,
    entryFee: 25000,
    monthlyFee: 497,
    color: "from-yellow-500 to-orange-600",
    icon: "👑",
    benefits: ["Consultoria 1:1", "Oportunidades VIP", "Cashback 5%"],
    memberCount: 680,
  },
  {
    id: "tita",
    name: "TITÃ",
    minWealth: 1000000,
    entryFee: 50000,
    monthlyFee: 997,
    color: "from-red-500 to-pink-600",
    icon: "🏆",
    benefits: ["Gestão patrimonial", "Deals exclusivos", "Cashback 7%"],
    memberCount: 180,
  },
  {
    id: "lendario",
    name: "LENDÁRIO",
    minWealth: 10000000,
    entryFee: 100000,
    monthlyFee: 1997,
    color: "from-gray-800 to-black",
    icon: "⚡",
    benefits: ["Acesso total", "Investimentos únicos", "Cashback 10%"],
    memberCount: 25,
  },
]

const mockMissions: Mission[] = [
  {
    id: "1",
    title: "Registrar gastos diários",
    description: "Anote todos os seus gastos durante o dia",
    category: "daily",
    difficulty: "easy",
    reward: 50,
    billionReward: 10,
    progress: 1,
    target: 1,
    completed: false,
    type: "financial",
  },
  {
    id: "2",
    title: "Assistir anúncio patrocinado",
    description: "Assista a um anúncio completo para ganhar tokens",
    category: "daily",
    difficulty: "easy",
    reward: 25,
    billionReward: 5,
    progress: 0,
    target: 1,
    completed: false,
    type: "educational",
  },
  {
    id: "3",
    title: "Economizar 20% da renda",
    description: "Mantenha 20% da sua renda mensal em poupança",
    category: "monthly",
    difficulty: "hard",
    reward: 500,
    billionReward: 100,
    progress: 15,
    target: 20,
    completed: false,
    type: "financial",
  },
  {
    id: "4",
    title: "Participar de networking",
    description: "Participe de um evento de networking do seu grupo",
    category: "weekly",
    difficulty: "medium",
    reward: 200,
    billionReward: 50,
    progress: 0,
    target: 1,
    completed: false,
    type: "social",
  },
  {
    id: "5",
    title: "Exercitar-se por 30 minutos",
    description: "Pratique exercícios físicos por pelo menos 30 minutos",
    category: "daily",
    difficulty: "medium",
    reward: 75,
    billionReward: 15,
    progress: 0,
    target: 1,
    completed: false,
    type: "health",
  },
]

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "reward",
    amount: 100,
    currency: "BILLION",
    description: "Recompensa por completar missão diária",
    status: "completed",
    createdAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    type: "fee",
    amount: 297,
    currency: "BILLION",
    description: "Mensalidade grupo MAGNATA",
    status: "completed",
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "3",
    type: "deposit",
    amount: 1000,
    currency: "BILLION",
    description: "Depósito via PIX",
    status: "completed",
    createdAt: "2024-01-10T14:20:00Z",
  },
]

const mockCompetitions: Competition[] = [
  {
    id: "1",
    title: "Desafio de Economia Mensal",
    description: "Quem conseguir economizar mais percentualmente ganha",
    type: "individual",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    prize: 10000,
    participants: 1250,
    status: "active",
  },
  {
    id: "2",
    title: "Batalha dos Grupos",
    description: "Competição entre grupos por maior crescimento médio",
    type: "group",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    prize: 50000,
    participants: 6,
    status: "active",
  },
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [missions] = useState<Mission[]>(mockMissions)
  const [groups] = useState<Group[]>(mockGroups)
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [competitions] = useState<Competition[]>(mockCompetitions)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("desafio-bilionario-user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email && password) {
      const userData: User = {
        id: "1",
        name: "Alexandre Silva",
        email,
        avatar: "/placeholder.svg?height=100&width=100&text=AS",
        patrimonio: 150000,
        meta12meses: 300000,
        grupo: "MAGNATA",
        nivel: 12,
        xp: 8750,
        billionTokens: 2500,
        streak: 15,
        posicaoRanking: 8,
        badges: [
          {
            id: "1",
            name: "Primeiro Login",
            description: "Bem-vindo à plataforma",
            icon: "🎉",
            rarity: "common",
            unlockedAt: "2024-01-01",
          },
          {
            id: "2",
            name: "Magnata",
            description: "Alcançou o grupo Magnata",
            icon: "💎",
            rarity: "epic",
            unlockedAt: "2024-01-10",
          },
        ],
        missoesConcluidas: ["1", "2"],
        kycStatus: "verified",
        isVip: true,
        joinedAt: "2024-01-01",
        lastLogin: new Date().toISOString(),
      }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("desafio-bilionario-user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const register = async (userData: any): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      patrimonio: userData.patrimonio,
      meta12meses: userData.meta12meses,
      grupo: "INICIANTE",
      nivel: 1,
      xp: 0,
      billionTokens: 100, // Bônus de boas-vindas
      streak: 0,
      posicaoRanking: 999,
      badges: [
        {
          id: "welcome",
          name: "Bem-vindo",
          description: "Primeiro acesso à plataforma",
          icon: "🎉",
          rarity: "common",
          unlockedAt: new Date().toISOString(),
        },
      ],
      missoesConcluidas: [],
      kycStatus: "pending",
      isVip: false,
      joinedAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }
    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("desafio-bilionario-user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("desafio-bilionario-user")
  }

  const completeMission = (missionId: string) => {
    if (user) {
      const mission = missions.find((m) => m.id === missionId)
      if (mission) {
        const updatedUser = {
          ...user,
          xp: user.xp + mission.reward,
          billionTokens: user.billionTokens + mission.billionReward,
          missoesConcluidas: [...user.missoesConcluidas, missionId],
        }
        setUser(updatedUser)
        localStorage.setItem("desafio-bilionario-user", JSON.stringify(updatedUser))
      }
    }
  }

  const updatePatrimonio = (novoPatrimonio: number) => {
    if (user) {
      const updatedUser = { ...user, patrimonio: novoPatrimonio }
      setUser(updatedUser)
      localStorage.setItem("desafio-bilionario-user", JSON.stringify(updatedUser))
    }
  }

  const purchaseTokens = async (amount: number): Promise<boolean> => {
    if (user) {
      const updatedUser = {
        ...user,
        billionTokens: user.billionTokens + amount,
      }
      setUser(updatedUser)
      localStorage.setItem("desafio-bilionario-user", JSON.stringify(updatedUser))
      return true
    }
    return false
  }

  const joinGroup = async (groupId: string): Promise<boolean> => {
    if (user) {
      const group = groups.find((g) => g.id === groupId)
      if (group && user.billionTokens >= group.entryFee) {
        const updatedUser = {
          ...user,
          grupo: group.name,
          billionTokens: user.billionTokens - group.entryFee,
        }
        setUser(updatedUser)
        localStorage.setItem("desafio-bilionario-user", JSON.stringify(updatedUser))
        return true
      }
    }
    return false
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        missions,
        groups,
        transactions,
        competitions,
        isAuthenticated,
        login,
        register,
        logout,
        completeMission,
        updatePatrimonio,
        purchaseTokens,
        joinGroup,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
