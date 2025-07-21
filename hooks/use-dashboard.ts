"use client"

import { useEffect, useState } from "react"
import { useDashboardStore } from "@/lib/store"
import type { DashboardData } from "@/types/api"

export function useDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { missions, achievements, setMissions, setAchievements, completeMission } = useDashboardStore()

  const fetchDashboard = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/dashboard")
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch dashboard data")
      }

      const data: DashboardData = result.data
      setMissions(data.goals || [])
      setAchievements(data.badges || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const completeTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/complete`, {
        method: "PATCH",
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to complete task")
      }

      completeMission(taskId)
      return result.data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to complete task")
    }
  }

  const createGoal = async (goalData: any) => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to create goal")
      }

      await fetchDashboard() // Refresh data
      return result.data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to create goal")
    }
  }

  const createTransaction = async (transactionData: any) => {
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to create transaction")
      }

      await fetchDashboard() // Refresh data
      return result.data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to create transaction")
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return {
    data: {
      goals: [],
      tasks: [],
      badges: achievements,
      transactions: [],
      books: [],
    },
    isLoading,
    error,
    refetch: fetchDashboard,
    completeTask,
    createGoal,
    createTransaction,
  }
}
