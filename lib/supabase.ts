import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Your Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const createClient = () =>
  createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

// Server-side Supabase client
export const createServerClient = () =>
  createServerComponentClient({
    cookies,
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

// Direct client for server actions
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Database types matching your actual schema
export interface User {
  id: string
  email: string
  name: string
  xp: number
  level: number
  tokens: number
  balance: number
  current_streak: number
  created_at: string
  updated_at: string
}

export interface UserMission {
  id: string
  user_id: string
  mission_type: string
  completed_at: string | null
  mission_date: string
  xp_reward: number
  token_reward: number
  title?: string
  description?: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_type: string
  unlocked_at: string
}

// Additional types for the application
export interface Mission {
  id: string
  type: string
  title: string
  description: string
  xp_reward: number
  token_reward: number
  category: string
  difficulty: "easy" | "medium" | "hard"
  is_daily: boolean
}

export interface Achievement {
  id: string
  type: string
  title: string
  description: string
  icon: string
  requirement: number
  category: string
}
