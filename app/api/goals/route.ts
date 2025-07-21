import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import type { CreateGoalRequest } from "@/types/api"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: goals, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: goals })
  } catch (error) {
    console.error("Goals GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const body: CreateGoalRequest = await request.json()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: goal, error } = await supabase
      .from("goals")
      .insert([
        {
          user_id: user.id,
          title: body.title,
          description: body.description,
          type: body.type,
          target_value: body.target_value,
          current_value: 0,
          points: body.points || 500,
          status: "active",
          deadline: body.deadline,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: goal }, { status: 201 })
  } catch (error) {
    console.error("Goals POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
