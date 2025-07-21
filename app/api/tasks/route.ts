import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import type { CreateTaskRequest } from "@/types/api"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0]

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: tasks, error } = await supabase
      .from("daily_tasks")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", date)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: tasks })
  } catch (error) {
    console.error("Tasks GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const body: CreateTaskRequest = await request.json()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: task, error } = await supabase
      .from("daily_tasks")
      .insert([
        {
          user_id: user.id,
          task: body.task,
          category: body.category,
          points: body.points,
          date: body.date || new Date().toISOString().split("T")[0],
          completed: false,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: task }, { status: 201 })
  } catch (error) {
    console.error("Tasks POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
