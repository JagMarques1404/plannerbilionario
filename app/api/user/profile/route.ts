import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { supabase } from "@/lib/supabase"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Buscar dados do usuário
    const { data: user, error: userError } = await supabase.from("users").select("*").eq("id", session.user.id).single()

    if (userError || !user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    // Buscar conquistas do usuário
    const { data: achievements } = await supabase
      .from("user_achievements")
      .select("*")
      .eq("user_id", session.user.id)
      .order("unlocked_at", { ascending: false })

    // Buscar atividades recentes
    const { data: activities } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    // Calcular estatísticas do dia
    const today = new Date().toISOString().split("T")[0]

    const { data: todayMissions } = await supabase
      .from("user_missions")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("mission_date", today)

    const { data: completedTodayMissions } = await supabase
      .from("user_missions")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("mission_date", today)
      .not("completed_at", "is", null)

    // Calcular investimentos
    const { data: investments } = await supabase
      .from("investments")
      .select("amount, current_value")
      .eq("user_id", session.user.id)
      .eq("status", "active")

    const totalInvested = investments?.reduce((sum, inv) => sum + inv.amount, 0) || 0
    const currentValue = investments?.reduce((sum, inv) => sum + inv.current_value, 0) || 0
    const totalReturns = currentValue - totalInvested

    const stats = {
      ...user,
      todayMissions: todayMissions?.length || 0,
      completedTodayMissions: completedTodayMissions?.length || 0,
      totalInvested,
      currentValue,
      totalReturns,
      returnPercentage: totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0,
      user_achievements: achievements || [],
      activities: activities || [],
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Erro ao buscar perfil:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updates = await request.json()

    // Campos permitidos para atualização
    const allowedFields = ["name", "username", "avatar"]
    const filteredUpdates = Object.keys(updates)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = updates[key]
        return obj
      }, {})

    if (Object.keys(filteredUpdates).length === 0) {
      return NextResponse.json({ error: "Nenhum campo válido para atualizar" }, { status: 400 })
    }

    const { data: user, error } = await supabase
      .from("users")
      .update({
        ...filteredUpdates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
