import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()
    const taskId = params.id

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update task as completed
    const { data: task, error: taskError } = await supabase
      .from("daily_tasks")
      .update({
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq("id", taskId)
      .eq("user_id", user.id)
      .select()
      .single()

    if (taskError) {
      return NextResponse.json({ error: taskError.message }, { status: 500 })
    }

    // Update user points
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("points")
      .eq("id", user.id)
      .single()

    if (!userError && userData) {
      await supabase
        .from("users")
        .update({
          points: userData.points + task.points,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
    }

    return NextResponse.json({ success: true, data: task })
  } catch (error) {
    console.error("Task completion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
