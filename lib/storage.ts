import type { User, CustomActivity, Progress } from "./types"

const STORAGE_KEYS = {
  USER: "planner-user",
  ACTIVITIES: "planner-activities",
  PROGRESS: "planner-progress",
}

export const saveUser = (user: User) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(STORAGE_KEYS.USER)
  return stored ? JSON.parse(stored) : null
}

export const saveActivities = (activities: CustomActivity[]) => {
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities))
}

export const getActivities = (): CustomActivity[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITIES)
  return stored ? JSON.parse(stored) : []
}

export const saveProgress = (progress: Progress) => {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress))
}

export const getProgress = (): Progress => {
  if (typeof window === "undefined") return { currentStreak: 0, totalPoints: 0, dailyGoal: 100, lastActiveDate: "" }
  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS)
  return stored ? JSON.parse(stored) : { currentStreak: 0, totalPoints: 0, dailyGoal: 100, lastActiveDate: "" }
}

export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.USER)
  localStorage.removeItem(STORAGE_KEYS.ACTIVITIES)
  localStorage.removeItem(STORAGE_KEYS.PROGRESS)
}
