import type { User, Goal, DailyTask, Transaction, UserBadge, BookRead } from "./database"

// API Response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface DashboardData {
  user: User
  goals: Goal[]
  tasks: DailyTask[]
  badges: UserBadge[]
  transactions: Transaction[]
  books: BookRead[]
  stats: UserStats
}

export interface UserStats {
  totalPoints: number
  currentStreak: number
  activeGoals: number
  completedGoals: number
  completedTasks: number
  totalTasks: number
  taskCompletionRate: number
  monthlyProgress: number
}

export interface CreateGoalRequest {
  title: string
  description: string
  type: string
  target_value: number
  deadline: string
  points?: number
}

export interface CreateTaskRequest {
  task: string
  category: string
  points: number
  date?: string
}

export interface CreateTransactionRequest {
  type: string
  category: string
  amount: number
  description: string
  date?: string
}

export interface UpdateUserRequest {
  name?: string
  financial_goal?: string
  monthly_income_range?: string
  age_range?: string
  team_choice?: string
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface SignUpFormData {
  name: string
  email: string
  password: string
  financial_goal?: string
  monthly_income_range?: string
  age_range?: string
}
