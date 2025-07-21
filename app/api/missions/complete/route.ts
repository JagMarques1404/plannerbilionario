import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { supabase } from "@/lib/supabase"
import { checkLevelUp, checkAchievements, calculateStreak } from "@/lib/gamification"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { missionId } = await request.json()
    const today = new Date().toISOString().split("T")[0]

    // Buscar a missão do usuário
    const { data: userMission, error: missionError } = await supabase
      .from("user_missions")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("id", missionId)
      .eq("mission_date", today)
      .single()

    if (missionError || !userMission) {
      return NextResponse.json({ error: "Missão não encontrada" }, { status: 404 })
    }

    if (userMission.completed_at) {
      return NextResponse.json({ error: "Missão já completada" }, { status: 400 })
    }

    // Completar missão
    const { error: updateError } = await supabase
      .from("user_missions")
      .update({
        completed_at: new Date().toISOString(),
        progress: 100,
      })
      .eq("id", userMission.id)

    if (updateError) {
      console.error("Erro ao completar missão:", updateError)
      return NextResponse.json({ error: "Erro ao completar missão" }, { status: 500 })
    }

    // Buscar dados atuais do usuário
    const { data: user } = await supabase.from("users").select("xp, tokens, level").eq("id", session.user.id).single()

    if (user) {
      // Atualizar XP e tokens do usuário
      const { error: userUpdateError } = await supabase
        .from("users")
        .update({
          xp: user.xp + userMission.xp_reward,
          tokens: user.tokens + userMission.token_reward,
        })
        .eq("id", session.user.id)

      if (userUpdateError) {
        console.error("Erro ao atualizar usuário:", userUpdateError)
      }
    }

    // Registrar atividade
    await supabase.from("activities").insert({
      user_id: session.user.id,
      type: "mission_completed",
      description: `Completou missão: ${userMission.mission_type}`,
      metadata: {
        missionId,
        xpGained: userMission.xp_reward,
        tokensGained: userMission.token_reward,
      },
    })

    // Verificar level up
    const levelUpResult = await checkLevelUp(session.user.id)

    // Verificar conquistas
    await checkAchievements(session.user.id)

    // Calcular streak
    const streak = await calculateStreak(session.user.id)

    return NextResponse.json({
      success: true,
      userMission,
      rewards: {
        xp: userMission.xp_reward,
        tokens: userMission.token_reward,
      },
      levelUp: levelUpResult,
      streak,
    })
  } catch (error) {
    console.error("Erro na API de completar missão:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
