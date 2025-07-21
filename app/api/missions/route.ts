import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { supabase } from "@/lib/supabase"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Missões diárias padrão
const DAILY_MISSIONS = [
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

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const today = new Date().toISOString().split("T")[0]

  try {
    // Buscar missões do usuário para hoje
    const { data: userMissions, error } = await supabase
      .from("user_missions")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("mission_date", today)

    if (error) {
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    // Se não há missões para hoje, criar
    if (!userMissions || userMissions.length === 0) {
      const missionsToCreate = DAILY_MISSIONS.map((mission) => ({
        user_id: session.user.id,
        mission_type: mission.type,
        mission_date: today,
        xp_reward: mission.xp,
        token_reward: mission.tokens,
        completed_at: null,
        progress: 0,
      }))

      const { data: newMissions, error: createError } = await supabase
        .from("user_missions")
        .insert(missionsToCreate)
        .select()

      if (createError) {
        return NextResponse.json({ error: "Failed to create missions" }, { status: 500 })
      }

      // Adicionar dados das missões
      const missionsWithData = newMissions.map((mission) => {
        const missionData = DAILY_MISSIONS.find((m) => m.type === mission.mission_type)
        return {
          ...mission,
          title: missionData?.title || "",
          description: missionData?.description || "",
        }
      })

      return NextResponse.json(missionsWithData)
    }

    // Adicionar dados das missões existentes
    const missionsWithData = userMissions.map((mission) => {
      const missionData = DAILY_MISSIONS.find((m) => m.type === mission.mission_type)
      return {
        ...mission,
        title: missionData?.title || "",
        description: missionData?.description || "",
      }
    })

    return NextResponse.json(missionsWithData)
  } catch (error) {
    console.error("Error fetching missions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { missionType } = await request.json()
    const today = new Date().toISOString().split("T")[0]

    // Completar missão
    const { data: mission, error: updateError } = await supabase
      .from("user_missions")
      .update({ completed_at: new Date().toISOString() })
      .eq("user_id", session.user.id)
      .eq("mission_type", missionType)
      .eq("mission_date", today)
      .select()
      .single()

    if (updateError || !mission) {
      return NextResponse.json({ error: "Mission not found" }, { status: 404 })
    }

    // Atualizar XP e tokens do usuário
    const { data: user } = await supabase.from("users").select("xp, tokens").eq("id", session.user.id).single()

    if (user) {
      await supabase
        .from("users")
        .update({
          xp: user.xp + mission.xp_reward,
          tokens: user.tokens + mission.token_reward,
        })
        .eq("id", session.user.id)
    }

    return NextResponse.json({ success: true, mission })
  } catch (error) {
    console.error("Error completing mission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
