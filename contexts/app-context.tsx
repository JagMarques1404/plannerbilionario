"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  level: number
  xp: number
  tokens: number
  patrimony: number
  monthlyIncome: number
  ranking: number
  streak: number
  badges: string[]
  joinedAt: Date
}

interface Activity {
  id: string
  type: "investment" | "dividend" | "mission" | "level_up" | "badge"
  title: string
  description: string
  amount?: number
  timestamp: Date
  icon: string
}

interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  activities: Activity[]
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markNotificationAsRead: (id: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addActivity = (activity: Omit<Activity, "id" | "timestamp">) => {
    const newActivity: Activity = {
      ...activity,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }
    setActivities((prev) => [newActivity, ...prev.slice(0, 49)]) // Keep only last 50 activities
  }

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])

    // Auto remove after 10 seconds for non-important notifications
    if (notification.type === "info") {
      setTimeout(() => {
        markNotificationAsRead(newNotification.id)
      }, 10000)
    }
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // Initialize with mock data
  useEffect(() => {
    const mockUser: User = {
      id: "1",
      name: "Investidor Iniciante",
      email: "investidor@julius.com",
      level: 5,
      xp: 2450,
      tokens: 12847,
      patrimony: 157500,
      monthlyIncome: 14238,
      ranking: 247,
      streak: 7,
      badges: ["early-adopter", "consistent-investor", "first-million"],
      joinedAt: new Date("2024-01-01"),
    }
    setUser(mockUser)

    // Mock activities
    const mockActivities: Activity[] = [
      {
        id: "1",
        type: "dividend",
        title: "Dividendo Recebido",
        description: "PETR4 - R$ 0,25 por ação",
        amount: 125.5,
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        icon: "💰",
      },
      {
        id: "2",
        type: "investment",
        title: "Nova Compra",
        description: "100 ações VALE3 a R$ 65,40",
        amount: 6540,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        icon: "📈",
      },
      {
        id: "3",
        type: "level_up",
        title: "Subiu de Nível!",
        description: "Parabéns! Você alcançou o nível 5",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        icon: "🏆",
      },
      {
        id: "4",
        type: "mission",
        title: "Missão Completa",
        description: "Análise Diária - +50 XP, +25 tokens",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
        icon: "🎯",
      },
      {
        id: "5",
        type: "badge",
        title: "Nova Conquista",
        description: "Badge 'Primeiro Milhão' desbloqueado!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        icon: "🏅",
      },
    ]
    setActivities(mockActivities)

    // Simulate real-time activities
    const interval = setInterval(() => {
      const randomActivities = [
        {
          type: "dividend" as const,
          title: "Dividendo Recebido",
          description: `${["ITUB4", "BBDC4", "PETR4", "VALE3"][Math.floor(Math.random() * 4)]} - R$ ${(Math.random() * 2).toFixed(2)} por ação`,
          amount: Math.random() * 500 + 50,
          icon: "💰",
        },
        {
          type: "investment" as const,
          title: "Nova Compra",
          description: `${Math.floor(Math.random() * 100 + 10)} ações ${["MGLU3", "ABEV3", "WEGE3", "RENT3"][Math.floor(Math.random() * 4)]}`,
          amount: Math.random() * 5000 + 1000,
          icon: "📈",
        },
        {
          type: "mission" as const,
          title: "Missão Completa",
          description: `${["Análise Diária", "Check Portfolio", "Interação Social"][Math.floor(Math.random() * 3)]} - +${Math.floor(Math.random() * 50 + 25)} XP`,
          icon: "🎯",
        },
      ]

      if (Math.random() < 0.3) {
        // 30% chance every 30 seconds
        const randomActivity = randomActivities[Math.floor(Math.random() * randomActivities.length)]
        addActivity(randomActivity)
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        activities,
        addActivity,
        notifications,
        addNotification,
        markNotificationAsRead,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
