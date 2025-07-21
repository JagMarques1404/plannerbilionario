import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import type { CreateTransactionRequest } from "@/types/api"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(limit)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: transactions })
  } catch (error) {
    console.error("Transactions GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const body: CreateTransactionRequest = await request.json()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: transaction, error } = await supabase
      .from("transactions")
      .insert([
        {
          user_id: user.id,
          type: body.type,
          category: body.category,
          amount: body.amount,
          description: body.description,
          date: body.date || new Date().toISOString().split("T")[0],
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: transaction }, { status: 201 })
  } catch (error) {
    console.error("Transactions POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
