import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, isValid } from "date-fns"
import type { Goal, DailyTask, UserLevel } from "@/types/database"
import { USER_LEVELS, POINTS, DATE_FORMATS } from "./constants"

// Tailwind utility function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date utilities
export function formatDate(date: string | Date, formatStr: string = DATE_FORMATS.DISPLAY): string {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date
    if (!isValid(dateObj)) return "Invalid date"
    return format(dateObj, formatStr)
  } catch {
    return "Invalid date"
  }
}

export function isDatePast(date: string | Date): boolean {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date
    return isValid(dateObj) && dateObj < new Date()
  } catch {
    return false
  }
}

export function getDaysUntilDeadline(deadline: string | Date): number {
  try {
    const deadlineDate = typeof deadline === "string" ? parseISO(deadline) : deadline
    if (!isValid(deadlineDate)) return 0

    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  } catch {
    return 0
  }
}

// User utilities
export function getUserLevel(points: number): UserLevel {
  for (const [level, config] of Object.entries(USER_LEVELS)) {
    if (points >= config.minPoints && points <= config.maxPoints) {
      return level as UserLevel
    }
  }
  return "Beginner"
}

export function getPointsToNextLevel(currentPoints: number): number {
  const currentLevel = getUserLevel(currentPoints)
  const levels = Object.entries(USER_LEVELS)
  const currentIndex = levels.findIndex(([level]) => level === currentLevel)

  if (currentIndex === -1 || currentIndex === levels.length - 1) return 0

  const nextLevel = levels[currentIndex + 1][1]
  return nextLevel.minPoints - currentPoints
}

export function calculateLevelProgress(points: number): number {
  const currentLevel = getUserLevel(points)
  const levelConfig = USER_LEVELS[currentLevel]

  if (levelConfig.maxPoints === Number.POSITIVE_INFINITY) return 100

  const progress = ((points - levelConfig.minPoints) / (levelConfig.maxPoints - levelConfig.minPoints)) * 100
  return Math.min(Math.max(progress, 0), 100)
}

// Goal utilities
export function calculateGoalProgress(goal: Goal): number {
  if (goal.target_value === 0) return 0
  return Math.min((goal.current_value / goal.target_value) * 100, 100)
}

export function getGoalStatus(goal: Goal): "on-track" | "behind" | "completed" | "overdue" {
  if (goal.status === "completed") return "completed"

  const progress = calculateGoalProgress(goal)
  const daysUntil = getDaysUntilDeadline(goal.deadline)

  if (daysUntil < 0) return "overdue"
  if (progress >= 100) return "completed"
  if (progress >= 75) return "on-track"
  return "behind"
}

// Task utilities
export function calculateTaskCompletionRate(tasks: DailyTask[]): number {
  if (tasks.length === 0) return 0
  const completedTasks = tasks.filter((task) => task.completed).length
  return (completedTasks / tasks.length) * 100
}

export function getTaskPoints(category: string): number {
  return POINTS.TASK_COMPLETION[category as keyof typeof POINTS.TASK_COMPLETION] || 50
}

// Number utilities
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num)
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

// String utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8
}

export function validateGoal(goal: Partial<Goal>): string[] {
  const errors: string[] = []

  if (!goal.title || goal.title.trim().length === 0) {
    errors.push("Title is required")
  }

  if (goal.title && goal.title.length > 100) {
    errors.push("Title must be less than 100 characters")
  }

  if (!goal.target_value || goal.target_value <= 0) {
    errors.push("Target value must be greater than 0")
  }

  if (!goal.deadline) {
    errors.push("Deadline is required")
  } else if (isDatePast(goal.deadline)) {
    errors.push("Deadline must be in the future")
  }

  return errors
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const group = String(item[key])
      groups[group] = groups[group] || []
      groups[group].push(item)
      return groups
    },
    {} as Record<string, T[]>,
  )
}

export function sortBy<T>(array: T[], key: keyof T, direction: "asc" | "desc" = "asc"): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (aVal < bVal) return direction === "asc" ? -1 : 1
    if (aVal > bVal) return direction === "asc" ? 1 : -1
    return 0
  })
}

// Local storage utilities
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error("Error removing from localStorage:", error)
  }
}
