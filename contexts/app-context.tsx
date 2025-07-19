"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  patrimonio: number
  billionTokens: number
  nivel: number
  xp: number
  streak: number
  posicaoRanking: number
  joiaAtual: "Bronze" | "Prata" | "Ouro" | "Platina" | "Diamante"
  badges: Badge[]
  habitosConcluidos: string[]
  joinedAt: string
  lastLogin: string
  indicacoes: number
  totalInvestido: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt: string
}

export interface Habito {
  id: string
  titulo: string
  descricao: string
  icon: string
  xpReward: number
  billionReward: number
  categoria: "financeiro" | "educacao" | "social" | "mindset"
  concluido: boolean
  streak: number
}

export interface Joia {
  id: string
  nome: string
  preco: number
  precoVenda: number
  cor: string
  icon: string
  beneficios: string[]
  requisitos: {
    patrimonio: number
    nivel: number
  }
}

export interface TokenPrice {
  timestamp: string
  price: number
  volume: number
}

export interface Transaction {
  id: string
  type: "buy" | "sell" | "reward" | "habit"
  amount: number
  price?: number
  description: string
  timestamp: string
}

export interface CommunityStats {
  usuariosOnline: number
  volumeNegociado: number
  totalAportado: number
  maiorAporteHoje: number
  crescimentoSemanal: number
}

export interface Mission {
  id: string
  title: string
  description: string
  target: number
  progress: number
  reward: number
  billionReward: number
  completed: boolean
  category: "financeiro" | "educacao" | "social" | "mindset"
  deadline?: string
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  habitos: Habito[]
  joias: Joia[]
  tokenPrices: TokenPrice[]
  transactions: Transaction[]
  communityStats: CommunityStats
  ranking: User[]
  isAuthenticated: boolean
  isSandboxMode: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  completeHabito: (habitoId: string) => void
  buyJoia: (joiaId: string) => Promise<boolean>
  sellJoia: (joiaId: string) => Promise<boolean>
  buyTokens: (amount: number) => Promise<boolean>
  sellTokens: (amount: number) => Promise<boolean>
  resetAccount: () => void
  updatePatrimonio: (novoPatrimonio: number) => void
  missions: Mission[]
  completeMission: (missionId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Dados mockados para sandbox
const mockJoias: Joia[] = [
  {
    id: "bronze",
    nome: "Bronze",
    preco: 1000,
    precoVenda: 800,
    cor: "from-amber-600 to-amber-800",
    icon: "🥉",
    beneficios: ["Cashback 1%", "Acesso ao chat básico"],
    requisitos: { patrimonio: 1000, nivel: 1 },
  },
  {
    id: "prata",
    nome: "Prata",
    preco: 5000,
    precoVenda: 4000,
    cor: "from-gray-400 to-gray-600",
    icon: "🥈",
    beneficios: ["Cashback 2%", "Missões exclusivas", "Análises semanais"],
    requisitos: { patrimonio: 5000, nivel: 5 },
  },
  {
    id: "ouro",
    nome: "Ouro",
    preco: 25000,
    precoVenda: 20000,
    cor: "from-yellow-400 to-yellow-600",
    icon: "🥇",
    beneficios: ["Cashback 3%", "Mentoria mensal", "Sinais premium"],
    requisitos: { patrimonio: 25000, nivel: 10 },
  },
  {
    id: "platina",
    nome: "Platina",
    preco: 100000,
    precoVenda: 80000,
    cor: "from-slate-300 to-slate-500",
    icon: "💎",
    beneficios: ["Cashback 5%", "Consultoria 1:1", "Oportunidades VIP"],
    requisitos: { patrimonio: 100000, nivel: 20 },
  },
  {
    id: "diamante",
    nome: "Diamante",
    preco: 500000,
    precoVenda: 400000,
    cor: "from-blue-400 to-purple-600",
    icon: "💠",
    beneficios: ["Cashback 10%", "Gestão patrimonial", "Deals exclusivos"],
    requisitos: { patrimonio: 500000, nivel: 50 },
  },
]

const mockHabitos: Habito[] = [
  {
    id: "registrar-gastos",
    titulo: "Registrar Gastos",
    descricao: "Anote todos os gastos do dia",
    icon: "📝",
    xpReward: 50,
    billionReward: 10,
    categoria: "financeiro",
    concluido: false,
    streak: 0,
  },
  {
    id: "meta-economia",
    titulo: "Definir Meta de Economia",
    descricao: "Estabeleça quanto quer economizar hoje",
    icon: "🎯",
    xpReward: 75,
    billionReward: 15,
    categoria: "financeiro",
    concluido: false,
    streak: 0,
  },
  {
    id: "estudar-investimentos",
    titulo: "Estudar Investimentos",
    descricao: "Dedique 15min para aprender sobre investimentos",
    icon: "📚",
    xpReward: 100,
    billionReward: 20,
    categoria: "educacao",
    concluido: false,
    streak: 0,
  },
  {
    id: "aprendizado-diario",
    titulo: "Aprendizado Diário",
    descricao: "Leia um artigo ou assista um vídeo educativo",
    icon: "🧠",
    xpReward: 80,
    billionReward: 16,
    categoria: "educacao",
    concluido: false,
    streak: 0,
  },
  {
    id: "networking",
    titulo: "Networking",
    descricao: "Interaja com a comunidade ou faça uma conexão",
    icon: "🤝",
    xpReward: 60,
    billionReward: 12,
    categoria: "social",
    concluido: false,
    streak: 0,
  },
  {
    id: "gratidao",
    titulo: "Gratidão",
    descricao: "Reflita sobre 3 coisas pelas quais é grato",
    icon: "🙏",
    xpReward: 40,
    billionReward: 8,
    categoria: "mindset",
    concluido: false,
    streak: 0,
  },
]

const mockMissions: Mission[] = [
  {
    id: "1",
    title: "Primeira Compra de Tokens",
    description: "Compre seus primeiros $BILLION tokens",
    target: 1,
    progress: 0,
    reward: 100,
    billionReward: 50,
    completed: false,
    category: "financeiro",
  },
  {
    id: "2",
    title: "Adquirir Joia Bronze",
    description: "Compre sua primeira joia para subir de nível",
    target: 1,
    progress: 0,
    reward: 200,
    billionReward: 100,
    completed: false,
    category: "financeiro",
  },
  {
    id: "3",
    title: "Estudar por 7 dias",
    description: "Complete o hábito de estudo por 7 dias consecutivos",
    target: 7,
    progress: 3,
    reward: 500,
    billionReward: 250,
    completed: false,
    category: "educacao",
  },
  {
    id: "4",
    title: "Alcançar Top 100",
    description: "Entre no top 100 do ranking global",
    target: 100,
    progress: 47,
    reward: 1000,
    billionReward: 500,
    completed: false,
    category: "social",
  },
]

// Gerar dados históricos de preço do token
const generateTokenPrices = (): TokenPrice[] => {
  const prices: TokenPrice[] = []
  let currentPrice = 1.0
  const now = new Date()

  for (let i = 30; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString()
    const volatility = (Math.random() - 0.5) * 0.1
    currentPrice = Math.max(0.5, currentPrice * (1 + volatility))

    prices.push({
      timestamp,
      price: Number(currentPrice.toFixed(4)),
      volume: Math.floor(Math.random() * 100000) + 50000,
    })
  }

  return prices
}

// Gerar usuários fictícios para ranking
const generateMockUsers = (): User[] => {
  const names = [
    "Ana Silva",
    "Carlos Santos",
    "Maria Oliveira",
    "João Pereira",
    "Fernanda Costa",
    "Ricardo Lima",
    "Juliana Alves",
    "Pedro Rodrigues",
    "Camila Ferreira",
    "Lucas Martins",
    "Beatriz Souza",
    "Rafael Carvalho",
    "Larissa Barbosa",
    "Thiago Nascimento",
    "Gabriela Ramos",
  ]

  return names.map((name, index) => ({
    id: `user-${index + 1}`,
    name,
    email: `${name.toLowerCase().replace(" ", ".")}@email.com`,
    patrimonio: Math.floor(Math.random() * 500000) + 10000,
    billionTokens: Math.floor(Math.random() * 5000) + 500,
    nivel: Math.floor(Math.random() * 30) + 1,
    xp: Math.floor(Math.random() * 10000) + 1000,
    streak: Math.floor(Math.random() * 100),
    posicaoRanking: index + 2,
    joiaAtual: ["Bronze", "Prata", "Ouro", "Platina", "Diamante"][Math.floor(Math.random() * 5)] as any,
    badges: [],
    habitosConcluidos: [],
    joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date().toISOString(),
    indicacoes: Math.floor(Math.random() * 20),
    totalInvestido: Math.floor(Math.random() * 100000) + 5000,
  }))
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [habitos, setHabitos] = useState<Habito[]>(mockHabitos)
  const [joias] = useState<Joia[]>(mockJoias)
  const [tokenPrices] = useState<TokenPrice[]>(generateTokenPrices())
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [ranking] = useState<User[]>(generateMockUsers())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isSandboxMode = true
  const [missions, setMissions] = useState<Mission[]>(mockMissions)

  const communityStats: CommunityStats = {
    usuariosOnline: 1247,
    volumeNegociado: 2847392,
    totalAportado: 15847293,
    maiorAporteHoje: 50000,
    crescimentoSemanal: 12.5,
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("julius-invest-user")
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
        name: "Julius Investidor",
        email,
        avatar: "/placeholder.svg?height=100&width=100&text=JI",
        patrimonio: 100000,
        billionTokens: 1250,
        nivel: 8,
        xp: 3420,
        streak: 12,
        posicaoRanking: 1,
        joiaAtual: "Ouro",
        badges: [
          {
            id: "welcome",
            name: "Bem-vindo",
            description: "Primeiro acesso à plataforma",
            icon: "🎉",
            rarity: "common",
            unlockedAt: new Date().toISOString(),
          },
          {
            id: "streak-7",
            name: "Disciplinado",
            description: "Manteve streak por 7 dias",
            icon: "🔥",
            rarity: "rare",
            unlockedAt: new Date().toISOString(),
          },
        ],
        habitosConcluidos: [],
        joinedAt: "2024-01-01",
        lastLogin: new Date().toISOString(),
        indicacoes: 5,
        totalInvestido: 75000,
      }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("julius-invest-user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const register = async (userData: any): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      patrimonio: 100000, // Valor inicial sandbox
      billionTokens: 1250, // Tokens iniciais
      nivel: 1,
      xp: 0,
      streak: 0,
      posicaoRanking: 999,
      joiaAtual: "Bronze",
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
      habitosConcluidos: [],
      joinedAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      indicacoes: 0,
      totalInvestido: 0,
    }
    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("julius-invest-user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("julius-invest-user")
  }

  const completeHabito = (habitoId: string) => {
    if (user) {
      const habito = habitos.find((h) => h.id === habitoId)
      if (habito && !habito.concluido) {
        // Atualizar hábito
        setHabitos((prev) => prev.map((h) => (h.id === habitoId ? { ...h, concluido: true, streak: h.streak + 1 } : h)))

        // Atualizar usuário
        const updatedUser = {
          ...user,
          xp: user.xp + habito.xpReward,
          billionTokens: user.billionTokens + habito.billionReward,
          habitosConcluidos: [...user.habitosConcluidos, habitoId],
        }
        setUser(updatedUser)
        localStorage.setItem("julius-invest-user", JSON.stringify(updatedUser))

        // Adicionar transação
        const transaction: Transaction = {
          id: Date.now().toString(),
          type: "habit",
          amount: habito.billionReward,
          description: `Hábito completado: ${habito.titulo}`,
          timestamp: new Date().toISOString(),
        }
        setTransactions((prev) => [transaction, ...prev])
      }
    }
  }

  const buyJoia = async (joiaId: string): Promise<boolean> => {
    if (user) {
      const joia = joias.find((j) => j.id === joiaId)
      if (joia && user.billionTokens >= joia.preco) {
        const updatedUser = {
          ...user,
          billionTokens: user.billionTokens - joia.preco,
          joiaAtual: joia.nome as any,
        }
        setUser(updatedUser)
        localStorage.setItem("julius-invest-user", JSON.stringify(updatedUser))
        return true
      }
    }
    return false
  }

  const sellJoia = async (joiaId: string): Promise<boolean> => {
    if (user) {
      const joia = joias.find((j) => j.id === joiaId)
      if (joia) {
        const updatedUser = {
          ...user,
          billionTokens: user.billionTokens + joia.precoVenda,
          joiaAtual: "Bronze",
        }
        setUser(updatedUser)
        localStorage.setItem("julius-invest-user", JSON.stringify(updatedUser))
        return true
      }
    }
    return false
  }

  const buyTokens = async (amount: number): Promise<boolean> => {
    if (user) {
      const currentPrice = tokenPrices[tokenPrices.length - 1]?.price || 1
      const cost = amount * currentPrice

      if (user.patrimonio >= cost) {
        const updatedUser = {
          ...user,
          patrimonio: user.patrimonio - cost,
          billionTokens: user.billionTokens + amount,
        }
        setUser(updatedUser)
        localStorage.setItem("julius-invest-user", JSON.stringify(updatedUser))
        return true
      }
    }
    return false
  }

  const sellTokens = async (amount: number): Promise<boolean> => {
    if (user && user.billionTokens >= amount) {
      const currentPrice = tokenPrices[tokenPrices.length - 1]?.price || 1
      const revenue = amount * currentPrice

      const updatedUser = {
        ...user,
        patrimonio: user.patrimonio + revenue,
        billionTokens: user.billionTokens - amount,
      }
      setUser(updatedUser)
      localStorage.setItem("julius-invest-user", JSON.stringify(updatedUser))
      return true
    }
    return false
  }

  const resetAccount = () => {
    if (user) {
      const resetUser = {
        ...user,
        patrimonio: 100000,
        billionTokens: 1250,
        nivel: 1,
        xp: 0,
        streak: 0,
        joiaAtual: "Bronze" as any,
        habitosConcluidos: [],
        totalInvestido: 0,
      }
      setUser(resetUser)
      localStorage.setItem("julius-invest-user", JSON.stringify(resetUser))

      // Reset hábitos
      setHabitos(mockHabitos.map((h) => ({ ...h, concluido: false, streak: 0 })))
      setTransactions([])
    }
  }

  const updatePatrimonio = (novoPatrimonio: number) => {
    if (user) {
      const updatedUser = { ...user, patrimonio: novoPatrimonio }
      setUser(updatedUser)
      localStorage.setItem("julius-invest-user", JSON.stringify(updatedUser))
    }
  }

  const completeMission = (missionId: string) => {
    if (user) {
      const mission = missions.find((m) => m.id === missionId)
      if (mission && !mission.completed) {
        setMissions((prev) => prev.map((m) => (m.id === missionId ? { ...m, completed: true } : m)))

        const updatedUser = {
          ...user,
          xp: user.xp + mission.reward,
          billionTokens: user.billionTokens + mission.billionReward,
        }
        setUser(updatedUser)
        localStorage.setItem("julius-invest-user", JSON.stringify(updatedUser))
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        habitos,
        joias,
        tokenPrices,
        transactions,
        communityStats,
        ranking,
        isAuthenticated,
        isSandboxMode,
        login,
        register,
        logout,
        completeHabito,
        buyJoia,
        sellJoia,
        buyTokens,
        sellTokens,
        resetAccount,
        updatePatrimonio,
        missions,
        completeMission,
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
