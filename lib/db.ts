import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on your schema
export interface User {
  id: string
  name: string
  email: string
  points: number
  streak: number
  level: string
  evolution_percentage: number
  is_premium: boolean
  financial_goal: string
  monthly_income_range: string
  age_range: string
  team_choice: string
  onboarded: boolean
  created_at: Date
  updated_at: Date
}

export interface Goal {
  id: string
  user_id: string
  title: string
  description: string
  type: string
  target_value: number
  current_value: number
  points: number
  status: string
  deadline: Date
  created_at: Date
  completed_at?: Date
}

export interface DailyTask {
  id: string
  user_id: string
  task: string
  category: string
  points: number
  completed: boolean
  date: Date
  completed_at?: Date
  created_at: Date
}

export interface Transaction {
  id: string
  user_id: string
  type: string
  category: string
  amount: number
  description: string
  date: Date
  created_at: Date
}

export interface UserBadge {
  id: string
  user_id: string
  badge_name: string
  badge_emoji: string
  earned_at: Date
}
