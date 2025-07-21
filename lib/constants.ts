import type { GoalType, TaskCategory, TransactionType, UserLevel, AgeRange, IncomeRange } from "@/types/database"

// Application constants
export const APP_NAME = "Julius Invest"
export const APP_DESCRIPTION = "Your gamified financial growth platform"

// User levels and points
export const USER_LEVELS: Record<UserLevel, { minPoints: number; maxPoints: number; color: string }> = {
  Beginner: { minPoints: 0, maxPoints: 999, color: "gray" },
  Intermediate: { minPoints: 1000, maxPoints: 4999, color: "blue" },
  Advanced: { minPoints: 5000, maxPoints: 9999, color: "orange" },
  Expert: { minPoints: 10000, maxPoints: Number.POSITIVE_INFINITY, color: "yellow" },
}

// Goal types
export const GOAL_TYPES: Record<GoalType, { label: string; icon: string; color: string }> = {
  savings: { label: "Savings", icon: "💰", color: "yellow" },
  investment: { label: "Investment", icon: "📈", color: "blue" },
  debt: { label: "Debt Reduction", icon: "⚔️", color: "orange" },
  budgeting: { label: "Budgeting", icon: "📊", color: "gray" },
  retirement: { label: "Retirement", icon: "🏖️", color: "blue" },
}

// Task categories
export const TASK_CATEGORIES: Record<TaskCategory, { label: string; icon: string; color: string }> = {
  budgeting: { label: "Budgeting", icon: "📊", color: "gray" },
  education: { label: "Education", icon: "📚", color: "blue" },
  investment: { label: "Investment", icon: "📈", color: "blue" },
  debt: { label: "Debt Management", icon: "⚔️", color: "orange" },
  retirement: { label: "Retirement", icon: "🏖️", color: "blue" },
  savings: { label: "Savings", icon: "💰", color: "yellow" },
}

// Transaction types
export const TRANSACTION_TYPES: Record<TransactionType, { label: string; icon: string; color: string }> = {
  income: { label: "Income", icon: "💵", color: "green" },
  expense: { label: "Expense", icon: "💸", color: "red" },
  investment: { label: "Investment", icon: "📈", color: "blue" },
  debt_payment: { label: "Debt Payment", icon: "⚔️", color: "orange" },
}

// Age ranges
export const AGE_RANGES: AgeRange[] = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]

// Income ranges
export const INCOME_RANGES: IncomeRange[] = [
  "Under $2,000",
  "$2,000-$3,000",
  "$3,000-$5,000",
  "$5,000-$7,500",
  "$7,500-$10,000",
  "Over $10,000",
]

// Financial goals
export const FINANCIAL_GOALS = [
  "Build Emergency Fund",
  "Pay Off Debt",
  "Save for House",
  "Invest for Retirement",
  "Start a Business",
  "Travel Fund",
  "Education Fund",
  "General Savings",
]

// Team choices
export const TEAM_CHOICES = ["Savers", "Investors", "Budgeters", "Debt Fighters", "Entrepreneurs"]

// Points system
export const POINTS = {
  TASK_COMPLETION: {
    budgeting: 50,
    education: 30,
    investment: 75,
    debt: 100,
    retirement: 60,
    savings: 40,
  },
  GOAL_COMPLETION: {
    savings: 500,
    investment: 800,
    debt: 600,
    budgeting: 300,
    retirement: 1000,
  },
  BOOK_READING: {
    min: 100,
    max: 200,
  },
  STREAK_BONUS: {
    weekly: 100,
    monthly: 500,
    quarterly: 1500,
  },
}

// Badge definitions
export const BADGES = {
  FIRST_GOAL: { name: "First Goal Setter", emoji: "🎯", points: 100 },
  WEEK_STREAK: { name: "Week Warrior", emoji: "🔥", points: 150 },
  MONTH_STREAK: { name: "Month Master", emoji: "⚡", points: 500 },
  BUDGET_MASTER: { name: "Budget Master", emoji: "💰", points: 300 },
  INVESTMENT_PRO: { name: "Investment Pro", emoji: "📈", points: 400 },
  DEBT_FIGHTER: { name: "Debt Fighter", emoji: "⚔️", points: 350 },
  KNOWLEDGE_SEEKER: { name: "Knowledge Seeker", emoji: "📚", points: 200 },
  STREAK_CHAMPION: { name: "Streak Champion", emoji: "⚡", points: 1000 },
  GETTING_STARTED: { name: "Getting Started", emoji: "🌱", points: 50 },
}

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: "/api/auth/signin",
    SIGN_UP: "/api/auth/signup",
    SIGN_OUT: "/api/auth/signout",
    PROFILE: "/api/auth/profile",
  },
  DASHBOARD: "/api/dashboard",
  GOALS: "/api/goals",
  TASKS: "/api/tasks",
  TRANSACTIONS: "/api/transactions",
  BADGES: "/api/badges",
  BOOKS: "/api/books",
  TEAMS: "/api/teams",
}

// Validation rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  GOAL_TITLE_MAX_LENGTH: 100,
  GOAL_DESCRIPTION_MAX_LENGTH: 500,
  TASK_MAX_LENGTH: 200,
  TRANSACTION_DESCRIPTION_MAX_LENGTH: 200,
  MAX_GOALS_PER_USER: 10,
  MAX_TASKS_PER_DAY: 20,
}

// Date formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  INPUT: "yyyy-MM-dd",
  TIMESTAMP: "yyyy-MM-dd HH:mm:ss",
}

// Colors
export const COLORS = {
  PRIMARY: "#004E89",
  SECONDARY: "#FFD23F",
  ACCENT: "#FF6B35",
  SUCCESS: "#10B981",
  ERROR: "#EF4444",
  WARNING: "#F59E0B",
  INFO: "#3B82F6",
}
