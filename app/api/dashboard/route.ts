import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"
import type { DashboardData, UserStats } from "@/types/api"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Get the current user
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile
    const { data: user, error: userError } = await supabase.from("users").select("*").eq("id", authUser.id).single()

    if (userError) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get goals
    const { data: goals } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", authUser.id)
      .order("created_at", { ascending: false })

    // Get today's tasks
    const today = new Date().toISOString().split("T")[0]
    const { data: tasks } = await supabase
      .from("daily_tasks")
      .select("*")
      .eq("user_id", authUser.id)
      .eq("date", today)
      .order("created_at", { ascending: false })

    // Get badges
    const { data: badges } = await supabase
      .from("user_badges")
      .select("*")
      .eq("user_id", authUser.id)
      .order("earned_at", { ascending: false })
      .limit(10)

    // Get recent transactions
    const { data: transactions } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", authUser.id)
      .order("date", { ascending: false })
      .limit(10)

    // Get recent books
    const { data: books } = await supabase
      .from("books_read")
      .select("*")
      .eq("user_id", authUser.id)
      .order("read_at", { ascending: false })
      .limit(5)

    // Calculate stats
    const completedTasks = (tasks || []).filter((task) => task.completed).length
    const totalTasks = (tasks || []).length
    const activeGoals = (goals || []).filter((goal) => goal.status === "active").length
    const completedGoals = (goals || []).filter((goal) => goal.status === "completed").length

    const stats: UserStats = {
      totalPoints: user.points || 0,
      currentStreak: user.streak || 0,
      activeGoals,
      completedGoals,
      completedTasks,
      totalTasks,
      taskCompletionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      monthlyProgress: user.evolution_percentage || 0,
    }

    const dashboardData: DashboardData = {
      user,
      goals: goals || [],
      tasks: tasks || [],
      badges: badges || [],
      transactions: transactions || [],
      books: books || [],
      stats,
    }

    return NextResponse.json({ success: true, data: dashboardData })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
