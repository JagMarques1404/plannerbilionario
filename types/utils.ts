import type React from "react"
// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type DatabaseInsert<T> = Omit<T, "id" | "created_at" | "updated_at">

export type DatabaseUpdate<T> = Partial<Omit<T, "id" | "created_at">> & {
  updated_at?: string
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  description?: string
  trend?: string
  color?: "blue" | "yellow" | "orange" | "gray"
}

export interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
}

// State management types
export interface UserState {
  user: any | null // Declare User type or import it
  isLoading: boolean
  error: string | null
}

export interface AppState {
  user: UserState
  dashboard: {
    goals: any[] // Declare Goal type or import it
    tasks: any[] // Declare DailyTask type or import it
    badges: any[] // Declare UserBadge type or import it
    transactions: any[] // Declare Transaction type or import it
    books: any[] // Declare BookRead type or import it
    isLoading: boolean
    error: string | null
  }
  ui: {
    sidebarOpen: boolean
    theme: "light" | "dark"
    notifications: any[] // Declare Notification type or import it
  }
}

export interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  read: boolean
}

// Hook return types
export interface UseAuthReturn {
  user: any | null // Declare User type or import it
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: any) => Promise<void> // Declare SignUpFormData type or import it
  signOut: () => Promise<void>
  updateProfile: (data: any) => Promise<void> // Declare UpdateUserRequest type or import it
}

export interface UseDashboardReturn {
  data: any | null // Declare DashboardData type or import it
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  completeTask: (taskId: string) => Promise<void>
  updateGoalProgress: (goalId: string, progress: number) => Promise<void>
}
