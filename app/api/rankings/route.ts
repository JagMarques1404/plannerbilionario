import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "global"
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    let query = supabase.from("users").select("id, name, username, avatar, level, xp, tokens, balance, current_streak")

    // Ordenar baseado na categoria
    switch (category) {
      case "xp":
        query = query.order("xp", { ascending: false })
        break
      case "level":
        query = query.order("level", { ascending: false }).order("xp", { ascending: false })
        break
      case "tokens":
        query = query.order("tokens", { ascending: false })
        break
      case "balance":
        query = query.order("balance", { ascending: false })
        break
      case "streak":
        query = query.order("current_streak", { ascending: false }).order("xp", { ascending: false })
        break
      default:
        // Global ranking por XP
        query = query.order("xp", { ascending: false })
    }

    const { data: users, error } = await query.limit(limit)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Adicionar posição e score
    const ranking =
      users?.map((user, index) => ({
        ...user,
        position: index + 1,
        score:
          category === "tokens"
            ? user.tokens
            : category === "balance"
              ? user.balance
              : category === "level"
                ? user.level
                : category === "streak"
                  ? user.current_streak
                  : user.xp,
      })) || []

    return NextResponse.json(ranking)
  } catch (error) {
    console.error("Erro ao buscar rankings:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
