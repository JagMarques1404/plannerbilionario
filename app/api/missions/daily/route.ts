import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0]

    // Buscar todos os usuários
    const { data: users } = await supabase.from("users").select("id")

    if (!users) {
      return NextResponse.json({ error: "No users found" }, { status: 404 })
    }

    // Missões diárias padrão
    const dailyMissions = [
      {
        type: "checkin",
        title: "Check-in Matinal",
        description: "Bom dia, campeão!",
        xp: 10,
        tokens: 5,
      },
      {
        type: "expense_review",
        title: "Revisar Gastos de Ontem",
        description: "Consciência é poder!",
        xp: 15,
        tokens: 8,
      },
      {
        type: "budget_planning",
        title: "Definir Orçamento do Dia",
        description: "Planeje para vencer!",
        xp: 20,
        tokens: 10,
      },
      {
        type: "education",
        title: "Lição Financeira",
        description: "5 min que valem ouro!",
        xp: 25,
        tokens: 12,
      },
      {
        type: "savings",
        title: "Registrar Economia do Dia",
        description: "Cada centavo conta!",
        xp: 30,
        tokens: 15,
      },
      {
        type: "analysis",
        title: "Análise Semanal",
        description: "Reflexão e evolução!",
        xp: 50,
        tokens: 25,
      },
      {
        type: "checkout",
        title: "Check-out Noturno",
        description: "Finalize o dia com chave de ouro!",
        xp: 15,
        tokens: 8,
      },
    ]

    // Criar missões para cada usuário
    for (const user of users) {
      // Verificar se já existem missões para hoje
      const { data: existingMissions } = await supabase
        .from("user_missions")
        .select("*")
        .eq("user_id", user.id)
        .eq("mission_date", today)

      if (!existingMissions || existingMissions.length === 0) {
        // Criar missões para o usuário
        const missionsToCreate = dailyMissions.map((mission) => ({
          user_id: user.id,
          mission_type: mission.type,
          mission_date: today,
          xp_reward: mission.xp,
          token_reward: mission.tokens,
          progress: 0,
        }))

        await supabase.from("user_missions").insert(missionsToCreate)
      }
    }

    return NextResponse.json({ success: true, created: users.length })
  } catch (error) {
    console.error("Erro ao criar missões diárias:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
