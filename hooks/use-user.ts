"use client"

import { useState, useEffect } from "react"

interface User {
  name?: string
  email: string
  plan: "free" | "premium" | "enterprise"
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return {
    user,
    updateUser,
    logout,
    isLoggedIn: !!user,
    isPremium: user?.plan === "premium" || user?.plan === "enterprise",
    plan: user?.plan || "free",
  }
}
