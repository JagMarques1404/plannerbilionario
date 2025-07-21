import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para TypeScript
export interface User {
  id: string
  email: string
  username: string
  name: string
  avatar?: string
  created_at: string
  updated_at: string
  xp: number
  level: number
  tokens: number
  balance: number
  total_invested: number
  total_returns: number
  current_streak: number
}

export interface Mission {
  id: string
  title: string
  description: string
  category: "daily" | "weekly" | "monthly"
  type: "checkin" | "expense" | "investment" | "education"
  xp_reward: number
  token_reward: number
  is_active: boolean
  created_at: string
}

export interface UserMission {
  id: string
  user_id: string
  mission_id: string
  mission_type: string
  mission_date: string
  completed_at?: string
  progress: number
  xp_reward: number
  token_reward: number
  title?: string
  description?: string
}

export interface Investment {
  id: string
  user_id: string
  name: string
  type: "real_estate" | "stocks" | "crypto" | "nft"
  amount: number
  current_value: number
  return_rate: number
  status: "active" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: string
  rarity: "common" | "rare" | "epic" | "legendary"
  criteria: Record<string, any>
  xp_reward: number
  token_reward: number
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  achievement_type: string
  unlocked_at: string
}

export interface Activity {
  id: string
  user_id: string
  type: "mission_completed" | "investment_made" | "level_up" | "achievement_unlocked"
  description: string
  metadata?: Record<string, any>
  created_at: string
}

export interface Ranking {
  id: string
  user_id: string
  category: "global" | "weekly" | "monthly" | "investments"
  position: number
  score: number
  period: string
  created_at: string
}
