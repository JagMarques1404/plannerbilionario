import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import type { UpdateUserRequest } from "@/types/api"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: user, error } = await supabase.from("users").select("*").eq("id", authUser.id).single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error("Profile GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const body: UpdateUserRequest = await request.json()

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: user, error } = await supabase
      .from("users")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", authUser.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error("Profile PATCH error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
