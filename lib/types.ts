export interface User {
  name: string
  objective: string
  dailyGoal: number
}

export interface CustomActivity {
  id: string
  title: string
  points: number
  completed: boolean
  icon: string
  category: string
}

export interface Progress {
  currentStreak: number
  totalPoints: number
  dailyGoal: number
  lastActiveDate: string
}

export interface Activity {
  id: string
  title: string
  points: number
  completed: boolean
  icon: string
}
