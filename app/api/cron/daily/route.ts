import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // 1. Atualizar valores de investimentos
    await updateInvestmentValues()

    // 2. Calcular rankings diários
    await updateDailyRankings()

    // 3. Verificar streaks de missões
    await checkMissionStreaks()

    return NextResponse.json({ success: true, timestamp: new Date() })
  } catch (error) {
    console.error("Erro no CRON diário:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}

async function updateInvestmentValues() {
  const { data: activeInvestments } = await supabase.from("investments").select("*").eq("status", "active")

  if (!activeInvestments) return

  for (const investment of activeInvestments) {
    // Simular volatilidade diária (-5% a +5%)
    const dailyVolatility = (Math.random() - 0.5) * 0.1 // -5% a +5%
    const dailyReturn = investment.return_rate / 365 + dailyVolatility
    const newValue = investment.current_value * (1 + dailyReturn)

    await supabase
      .from("investments")
      .update({
        current_value: Math.max(newValue, investment.amount * 0.5), // Mínimo 50% do valor inicial
      })
      .eq("id", investment.id)
  }
}

async function updateDailyRankings() {
  // Ranking por XP total
  const { data: usersByXP } = await supabase.from("users").select("*").order("xp", { ascending: false }).limit(100)

  if (!usersByXP) return

  const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD

  for (let i = 0; i < usersByXP.length; i++) {
    await supabase.from("rankings").upsert({
      user_id: usersByXP[i].id,
      category: "global",
      period: today,
      position: i + 1,
      score: usersByXP[i].xp,
    })
  }
}

async function checkMissionStreaks() {
  const { data: users } = await supabase.from("users").select("*")

  if (!users) return

  for (const user of users) {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      return date.toISOString().split("T")[0]
    })

    let streak = 0
    for (const dateStr of last7Days) {
      const { count } = await supabase
        .from("user_missions")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .eq("mission_date", dateStr)
        .not("completed_at", "is", null)

      if ((count || 0) > 0) {
        streak++
      } else {
        break
      }
    }

    // Atualizar streak do usuário
    await supabase.from("users").update({ current_streak: streak }).eq("id", user.id)
  }
}
