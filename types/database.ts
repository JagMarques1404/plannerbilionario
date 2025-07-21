// Database table types
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
  team_name?: string
  user_id_code?: string
  onboarded: boolean
  premium_expires_at?: string
  created_at: string
  updated_at: string
}

export interface Goal {
  id: string
  user_id: string
  title: string
  description: string
  type: GoalType
  target_value: number
  current_value: number
  points: number
  status: GoalStatus
  deadline: string
  created_at: string
  completed_at?: string
}

export interface DailyTask {
  id: string
  user_id: string
  task: string
  category: TaskCategory
  points: number
  completed: boolean
  date: string
  completed_at?: string
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: TransactionType
  category: string
  amount: number
  description: string
  date: string
  created_at: string
}

export interface UserBadge {
  id: string
  user_id: string
  badge_name: string
  badge_emoji: string
  earned_at: string
}

export interface BookRead {
  id: string
  user_id: string
  book_title: string
  author: string
  points_earned: number
  read_at: string
}

export interface Team {
  id: string
  name: string
  type: TeamType
  created_by: string
  invite_code: string
  created_at: string
}

export interface TeamMember {
  id: string
  team_id: string
  user_id: string
  joined_at: string
}

export interface TeamChallenge {
  id: string
  team_id: string
  title: string
  description: string
  target_value: number
  current_value: number
  points: number
  status: ChallengeStatus
  deadline: string
  created_by: string
  created_at: string
}

export interface ChallengeParticipant {
  id: string
  challenge_id: string
  user_id: string
  contribution: number
  joined_at: string
}

export interface TeamFeed {
  id: string
  team_id: string
  user_id: string
  action: string
  badge_emoji?: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  status: SubscriptionStatus
  current_period_start: string
  current_period_end: string
  created_at: string
  updated_at: string
}

// Enum types
export type GoalType = "savings" | "investment" | "debt" | "budgeting" | "retirement"
export type GoalStatus = "active" | "completed" | "paused" | "cancelled"
export type TaskCategory = "budgeting" | "education" | "investment" | "debt" | "retirement" | "savings"
export type TransactionType = "income" | "expense" | "investment" | "debt_payment"
export type TeamType = "public" | "private"
export type ChallengeStatus = "active" | "completed" | "expired"
export type SubscriptionStatus = "active" | "cancelled" | "past_due" | "unpaid"
export type UserLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert"
export type AgeRange = "18-24" | "25-34" | "35-44" | "45-54" | "55-64" | "65+"
export type IncomeRange =
  | "Under $2,000"
  | "$2,000-$3,000"
  | "$3,000-$5,000"
  | "$5,000-$7,500"
  | "$7,500-$10,000"
  | "Over $10,000"
