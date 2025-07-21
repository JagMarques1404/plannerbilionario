import type React from "react"
export interface User {
  id: string
  email: string
  username: string
  name: string
  avatar?: string
  createdAt: Date
  updatedAt: Date

  // Gamificação
  xp: number
  level: number
  tokens: number

  // Financeiro Fictício
  balance: number
  totalInvested: number
  totalReturns: number

  // Relacionamentos
  missions?: UserMission[]
  investments?: Investment[]
  achievements?: UserAchievement[]
  activities?: Activity[]
  rankings?: Ranking[]
}

export interface Mission {
  id: string
  title: string
  description: string
  category: "daily" | "weekly" | "monthly"
  type: "checkin" | "expense" | "investment" | "education"
  xpReward: number
  tokenReward: number
  isActive: boolean
  createdAt: Date

  userMissions?: UserMission[]
}

export interface UserMission {
  id: string
  userId: string
  missionId: string
  completedAt?: Date
  progress: number // 0-100%
  date: Date

  user?: User
  mission?: Mission
}

export interface Investment {
  id: string
  userId: string
  name: string
  type: "real_estate" | "stocks" | "crypto" | "nft"
  amount: number
  currentValue: number
  returnRate: number
  status: "active" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date

  user?: User
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: string
  rarity: "common" | "rare" | "epic" | "legendary"
  criteria: Record<string, any>
  xpReward: number
  tokenReward: number

  userAchievements?: UserAchievement[]
}

export interface UserAchievement {
  id: string
  userId: string
  achievementId: string
  unlockedAt: Date

  user?: User
  achievement?: Achievement
}

export interface Activity {
  id: string
  userId: string
  type: "mission_completed" | "investment_made" | "level_up" | "achievement_unlocked"
  description: string
  metadata?: Record<string, any>
  createdAt: Date

  user?: User
}

export interface Ranking {
  id: string
  userId: string
  category: "global" | "weekly" | "monthly" | "investments"
  position: number
  score: number
  period: string // 2024-01, 2024-W01, etc
  createdAt: Date

  user?: User
}

export interface SandboxConfig {
  id: string
  key: string
  value: Record<string, any>
  updatedAt: Date
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Component Props Types
export interface DashboardStats {
  totalBalance: number
  totalInvested: number
  totalReturns: number
  returnPercentage: number
  level: number
  xp: number
  tokens: number
  completedMissions: number
  activeInvestments: number
  achievements: number
}

export interface MissionCardProps {
  mission: Mission & { userMission?: UserMission }
  onComplete?: (missionId: string) => void
}

export interface InvestmentCardProps {
  investment: Investment
  onUpdate?: (investmentId: string) => void
}

export interface RankingItemProps {
  user: User
  position: number
  score: number
  category: string
}

// Form Types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  username: string
  name: string
  password: string
  confirmPassword: string
}

export interface InvestmentForm {
  name: string
  type: Investment["type"]
  amount: number
}

export interface ProfileForm {
  name: string
  username: string
  avatar?: string
}

// Store Types
export interface AppState {
  user: User | null
  missions: Mission[]
  investments: Investment[]
  activities: Activity[]
  rankings: Ranking[]
  achievements: Achievement[]

  // Loading states
  loading: {
    user: boolean
    missions: boolean
    investments: boolean
    activities: boolean
    rankings: boolean
    achievements: boolean
  }

  // Actions
  setUser: (user: User | null) => void
  setMissions: (missions: Mission[]) => void
  setInvestments: (investments: Investment[]) => void
  setActivities: (activities: Activity[]) => void
  setRankings: (rankings: Ranking[]) => void
  setAchievements: (achievements: Achievement[]) => void

  setLoading: (key: keyof AppState["loading"], value: boolean) => void

  // API Actions
  fetchUserData: () => Promise<void>
  fetchMissions: () => Promise<void>
  fetchInvestments: () => Promise<void>
  fetchActivities: () => Promise<void>
  fetchRankings: () => Promise<void>
  fetchAchievements: () => Promise<void>

  completeMission: (missionId: string) => Promise<void>
  createInvestment: (data: InvestmentForm) => Promise<void>
  updateProfile: (data: ProfileForm) => Promise<void>
}

// Utility Types
export type LoadingState = "idle" | "loading" | "success" | "error"

export interface Toast {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  description?: string
  duration?: number
}

export interface Modal {
  id: string
  type: "celebration" | "confirmation" | "form"
  title: string
  content: React.ReactNode
  onClose?: () => void
  onConfirm?: () => void
}

// Chart Types
export interface ChartDataPoint {
  date: string
  value: number
  change?: number
  volume?: number
}

export interface ChartConfig {
  type: "line" | "bar" | "area" | "pie"
  timeframe: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL"
  showGrid?: boolean
  showTooltip?: boolean
  animated?: boolean
}

// Social Types
export interface SocialPost {
  id: string
  userId: string
  user: User
  content: string
  type: "text" | "investment" | "achievement" | "milestone"
  metadata?: Record<string, any>
  likes: number
  comments: number
  shares: number
  isLiked?: boolean
  createdAt: Date
}

export interface SocialGroup {
  id: string
  name: string
  description: string
  avatar?: string
  memberCount: number
  isPrivate: boolean
  category: string
  isMember?: boolean
  createdAt: Date
}

export interface SocialComment {
  id: string
  postId: string
  userId: string
  user: User
  content: string
  likes: number
  isLiked?: boolean
  createdAt: Date
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: "mission_completed" | "level_up" | "achievement_unlocked" | "investment_update" | "social_activity"
  title: string
  description: string
  metadata?: Record<string, any>
  isRead: boolean
  createdAt: Date
}

// Filter Types
export interface MissionFilter {
  category?: Mission["category"]
  type?: Mission["type"]
  completed?: boolean
  date?: Date
}

export interface InvestmentFilter {
  type?: Investment["type"]
  status?: Investment["status"]
  minAmount?: number
  maxAmount?: number
  sortBy?: "amount" | "returns" | "date"
  sortOrder?: "asc" | "desc"
}

export interface RankingFilter {
  category?: Ranking["category"]
  period?: string
  limit?: number
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: Record<string, any>
}

export interface ValidationError {
  field: string
  message: string
}

// Theme Types
export interface ThemeConfig {
  mode: "light" | "dark" | "system"
  primaryColor: string
  accentColor: string
  borderRadius: "none" | "sm" | "md" | "lg" | "xl"
  fontFamily: "inter" | "roboto" | "poppins"
}
