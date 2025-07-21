"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { supabase } from "@/lib/supabase"
import type { User } from "@/lib/supabase"

export function useUser() {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.id) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [session])

  const fetchUser = async () => {
    if (!session?.user?.id) return

    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

      if (error) {
        console.error("Error fetching user:", error)
      } else {
        setUser(data)
      }
    } catch (error) {
      console.error("Error fetching user:", error)
    } finally {
      setLoading(false)
    }
  }

  const refreshUser = () => {
    if (session?.user?.id) {
      fetchUser()
    }
  }

  return { user, loading, refreshUser }
}
