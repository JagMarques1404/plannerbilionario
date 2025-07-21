import { create } from "zustand"
import type {
  User,
  Mission,
  Habit,
  FundraisingBlock,
  CompanyMetrics,
  SocialPost,
  Jewelry,
  RankingUser,
  Notification,
} from "@/types"

interface AppState {
  // User State
  user: User | null
  isAuthenticated: boolean

  // Data
  missions: Mission[]
  habits: Habit[]
  fundraisingBlocks: FundraisingBlock[]
  companyMetrics: CompanyMetrics
  socialFeed: SocialPost[]
  jewelry: Jewelry[]
  ranking: RankingUser[]

  // UI State
  isLoading: boolean
  showConfetti: boolean
  notifications: Notification[]

  // Actions
  setUser: (user: User) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  completeMission: (missionId: string) => void
  completeHabit: (habitId: string) => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  removeNotification: (index: number) => void
  triggerConfetti: () => void
  updateTokens: (amount: number) => void
  updateXP: (amount: number) => void
  markNotificationAsRead: (id: string) => void
  setLoading: (loading: boolean) => void
  updateUserStats: (stats: Partial<User>) => void
}

// Mock Data
const mockUser: User = {
  id: "1",
  name: "João Silva",
  email: "joao@email.com",
  avatar: "/placeholder.svg?height=40&width=40",
  level: 42,
  xp: 8750,
  totalPatrimony: 157500,
  billionTokens: 12847,
  monthlyIncome: 14238,
  participationPercentage: 2.5,
  joinedAt: new Date("2023-01-15"),
  badges: [
    {
      id: "1",
      name: "Primeiro Investimento",
      description: "Realizou seu primeiro investimento",
      icon: "🎯",
      rarity: "common",
      unlockedAt: new Date("2023-01-15"),
    },
    {
      id: "2",
      name: "Diamond Hands",
      description: "Manteve tokens por 6 meses",
      icon: "💎",
      rarity: "legendary",
      unlockedAt: new Date("2023-07-15"),
    },
  ],
  jewelry: [
    {
      id: "1",
      name: "Anel de Ouro",
      description: "Aumenta XP em 10%",
      rarity: "rare",
      level: 15,
      power: 150,
      image: "/placeholder.svg?height=60&width=60",
      acquiredAt: new Date("2023-03-20"),
    },
  ],
  streak: 15,
}

const mockMissions: Mission[] = [
  {
    id: "1",
    title: "Login Diário",
    description: "Faça login por 7 dias consecutivos",
    type: "daily",
    xpReward: 50,
    tokenReward: 10,
    progress: 5,
    maxProgress: 7,
    completed: false,
  },
  {
    id: "2",
    title: "Compartilhar Conquista",
    description: "Compartilhe uma conquista nas redes sociais",
    type: "weekly",
    xpReward: 200,
    tokenReward: 50,
    progress: 0,
    maxProgress: 1,
    completed: false,
  },
]

const mockHabits: Habit[] = [
  {
    id: "1",
    title: "Leitura de Mercado",
    description: "Ler notícias do mercado financeiro",
    category: "learning",
    streak: 7,
    completedToday: false,
    xpReward: 25,
    tokenReward: 10,
    icon: "📰",
  },
  {
    id: "2",
    title: "Check Portfolio",
    description: "Verificar performance do portfolio",
    category: "investment",
    streak: 5,
    completedToday: false,
    xpReward: 30,
    tokenReward: 15,
    icon: "📈",
  },
  {
    id: "3",
    title: "Networking",
    description: "Interagir com outros investidores",
    category: "social",
    streak: 3,
    completedToday: false,
    xpReward: 35,
    tokenReward: 20,
    icon: "🤝",
  },
]

const mockFundraisingBlocks: FundraisingBlock[] = [
  {
    id: "1",
    name: "Bloco SEED",
    stage: "SEED",
    tokenPrice: 0.5,
    totalTokens: 10000000,
    soldTokens: 10000000,
    raised: 5000000,
    target: 5000000,
    progress: 100,
    isActive: false,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    benefits: ["Acesso antecipado", "Desconto de 50%", "NFT exclusivo"],
    minInvestment: 100,
  },
  {
    id: "2",
    name: "Bloco SERIES A",
    stage: "SERIES_A",
    tokenPrice: 1.0,
    totalTokens: 15000000,
    soldTokens: 15000000,
    raised: 15000000,
    target: 15000000,
    progress: 100,
    isActive: false,
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    benefits: ["Participação nos lucros", "Acesso VIP", "Mentoria gratuita"],
    minInvestment: 500,
  },
  {
    id: "3",
    name: "Bloco SERIES B",
    stage: "SERIES_B",
    tokenPrice: 2.0,
    totalTokens: 20000000,
    soldTokens: 13400000,
    raised: 26800000,
    target: 40000000,
    progress: 67,
    isActive: true,
    startDate: "2024-07-01",
    endDate: "2024-12-31",
    benefits: ["Royalties vitalícios", "Acesso premium", "Consultoria 1:1"],
    minInvestment: 1000,
  },
]

const mockCompanyMetrics: CompanyMetrics = {
  totalUsers: 6347,
  totalRaised: 72500000,
  monthlyRevenue: 2800000,
  profitMargin: 50,
  tokenHolders: 12847,
  currentTokenPrice: 2.0,
  marketCap: 25694000,
  reserveFund: 5200000,
}

const mockJewelry: Jewelry[] = [
  {
    id: "1",
    name: "Anel do Iniciante",
    rarity: "common",
    price: 100,
    image: "/placeholder.svg?height=100&width=100&text=Ring",
    description: "Seu primeiro passo na jornada",
    benefits: ["+5% XP em missões diárias"],
    owned: true,
  },
  {
    id: "2",
    name: "Colar da Fortuna",
    rarity: "rare",
    price: 500,
    image: "/placeholder.svg?height=100&width=100&text=Necklace",
    description: "Atrai prosperidade e sucesso",
    benefits: ["+10% tokens em todas as atividades", "+2% rendimento mensal"],
    owned: false,
  },
  {
    id: "3",
    name: "Coroa do Titã",
    rarity: "legendary",
    price: 10000,
    image: "/placeholder.svg?height=100&width=100&text=Crown",
    description: "O símbolo máximo de poder",
    benefits: ["+50% XP", "+25% tokens", "Acesso VIP exclusivo", "Mentoria pessoal"],
    owned: false,
  },
]

const mockRanking: RankingUser[] = [
  {
    id: "1",
    name: "Maria Santos",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 67,
    totalPatrimony: 450000,
    billionTokens: 25000,
    position: 1,
    change: 0,
  },
  {
    id: "2",
    name: "Carlos Lima",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 54,
    totalPatrimony: 320000,
    billionTokens: 18500,
    position: 2,
    change: 1,
  },
  {
    id: "3",
    name: "Ana Costa",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 48,
    totalPatrimony: 280000,
    billionTokens: 16200,
    position: 3,
    change: -1,
  },
]

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  user: mockUser,
  isAuthenticated: false,
  missions: mockMissions,
  habits: mockHabits,
  fundraisingBlocks: mockFundraisingBlocks,
  companyMetrics: mockCompanyMetrics,
  socialFeed: [],
  jewelry: mockUser.jewelry,
  ranking: mockRanking,
  isLoading: false,
  showConfetti: false,
  notifications: [],

  // Actions
  setUser: (user) => set({ user, isAuthenticated: true }),

  login: async (email, password) => {
    set({ isLoading: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    set({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    })

    return true
  },

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  completeMission: (missionId) => {
    const { missions, user } = get()
    const mission = missions.find((m) => m.id === missionId)

    if (mission && user) {
      set({
        missions: missions.map((m) => (m.id === missionId ? { ...m, completed: true, progress: m.maxProgress } : m)),
        user: {
          ...user,
          xp: user.xp + mission.xpReward,
          billionTokens: user.billionTokens + mission.tokenReward,
        },
        showConfetti: true,
      })

      get().addNotification({
        type: "success",
        title: "Missão Completada!",
        message: `Você ganhou ${mission.xpReward} XP e ${mission.tokenReward} tokens!`,
      })

      // Hide confetti after 3 seconds
      setTimeout(() => set({ showConfetti: false }), 3000)
    }
  },

  completeHabit: (habitId) => {
    const { habits, user } = get()
    const habit = habits.find((h) => h.id === habitId)

    if (habit && user) {
      set({
        habits: habits.map((h) => (h.id === habitId ? { ...h, completedToday: true, streak: h.streak + 1 } : h)),
        user: {
          ...user,
          xp: user.xp + habit.xpReward,
          billionTokens: user.billionTokens + habit.tokenReward,
          streak: user.streak + 1,
        },
      })

      get().addNotification(`Hábito completado! Streak: ${habit.streak + 1} dias`)
    }
  },

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }))
  },

  removeNotification: (index) => {
    const { notifications } = get()
    set({
      notifications: notifications.filter((_, i) => i !== index),
    })
  },

  triggerConfetti: () => {
    set({ showConfetti: true })
    setTimeout(() => set({ showConfetti: false }), 3000)
  },

  updateTokens: (amount) => {
    const { user } = get()
    if (user) {
      set({
        user: {
          ...user,
          billionTokens: user.billionTokens + amount,
        },
      })
    }
  },

  updateXP: (amount) => {
    const { user } = get()
    if (user) {
      const newXP = user.xp + amount
      const newLevel = Math.floor(newXP / 500) + 1

      set({
        user: {
          ...user,
          xp: newXP,
          level: newLevel,
        },
      })

      if (newLevel > user.level) {
        get().addNotification(`Parabéns! Você subiu para o nível ${newLevel}!`)
        get().triggerConfetti()
      }
    }
  },

  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }))
  },

  setLoading: (loading) => set({ isLoading: loading }),

  updateUserStats: (stats) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...stats } : null,
    }))
  },
}))
