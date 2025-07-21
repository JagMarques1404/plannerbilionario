import { supabase } from "./supabase"

export async function checkLevelUp(userId: string) {
  try {
    const { data: user } = await supabase.from("users").select("xp, level, tokens").eq("id", userId).single()

    if (!user) return

    // Fórmula de XP por nível: level * 1000
    const xpForNextLevel = user.level * 1000

    if (user.xp >= xpForNextLevel) {
      const newLevel = user.level + 1
      const bonusTokens = newLevel * 100 // Bônus de level up

      await supabase
        .from("users")
        .update({
          level: newLevel,
          tokens: user.tokens + bonusTokens,
        })
        .eq("id", userId)

      // Registrar atividade
      await supabase.from("activities").insert({
        user_id: userId,
        type: "level_up",
        description: `Subiu para o nível ${newLevel}!`,
        metadata: {
          newLevel,
          bonusTokens,
        },
      })

      // Verificar conquistas de nível
      await checkLevelAchievements(userId, newLevel)

      return { leveledUp: true, newLevel, bonusTokens }
    }

    return { leveledUp: false }
  } catch (error) {
    console.error("Erro ao verificar level up:", error)
    return { leveledUp: false }
  }
}

export async function checkAchievements(userId: string) {
  try {
    // Buscar dados do usuário
    const { data: user } = await supabase.from("users").select("*").eq("id", userId).single()

    if (!user) return

    // Buscar missões completadas
    const { data: completedMissions } = await supabase
      .from("user_missions")
      .select("*")
      .eq("user_id", userId)
      .not("completed_at", "is", null)

    // Buscar conquistas já desbloqueadas
    const { data: unlockedAchievements } = await supabase
      .from("user_achievements")
      .select("achievement_type")
      .eq("user_id", userId)

    const completedMissionsCount = completedMissions?.length || 0
    const unlockedTypes = unlockedAchievements?.map((ua) => ua.achievement_type) || []

    // Conquistas por missões completadas
    const missionAchievements = [
      { id: "first_mission", threshold: 1, name: "Primeira Missão" },
      { id: "mission_streak_7", threshold: 7, name: "Semana Completa" },
      { id: "mission_streak_30", threshold: 30, name: "Mês Dedicado" },
      { id: "mission_master", threshold: 100, name: "Mestre das Missões" },
    ]

    for (const achievement of missionAchievements) {
      if (completedMissionsCount >= achievement.threshold && !unlockedTypes.includes(achievement.id)) {
        await unlockAchievement(userId, achievement.id)
      }
    }

    // Conquistas por nível
    const levelAchievements = [
      { id: "level_5", threshold: 5, name: "Iniciante Dedicado" },
      { id: "level_10", threshold: 10, name: "Investidor Experiente" },
      { id: "level_25", threshold: 25, name: "Mestre Financeiro" },
      { id: "level_50", threshold: 50, name: "Lenda dos Investimentos" },
    ]

    for (const achievement of levelAchievements) {
      if (user.level >= achievement.threshold && !unlockedTypes.includes(achievement.id)) {
        await unlockAchievement(userId, achievement.id)
      }
    }

    // Conquistas por tokens
    const tokenAchievements = [
      { id: "tokens_10k", threshold: 10000, name: "Colecionador" },
      { id: "tokens_50k", threshold: 50000, name: "Magnata Digital" },
      { id: "tokens_100k", threshold: 100000, name: "Bilionário Virtual" },
    ]

    for (const achievement of tokenAchievements) {
      if (user.tokens >= achievement.threshold && !unlockedTypes.includes(achievement.id)) {
        await unlockAchievement(userId, achievement.id)
      }
    }
  } catch (error) {
    console.error("Erro ao verificar conquistas:", error)
  }
}

async function checkLevelAchievements(userId: string, level: number) {
  const levelMilestones = [5, 10, 25, 50, 100]

  for (const milestone of levelMilestones) {
    if (level >= milestone) {
      await unlockAchievement(userId, `level_${milestone}`)
    }
  }
}

async function unlockAchievement(userId: string, achievementType: string) {
  try {
    // Verificar se já foi desbloqueada
    const { data: existing } = await supabase
      .from("user_achievements")
      .select("id")
      .eq("user_id", userId)
      .eq("achievement_type", achievementType)
      .single()

    if (existing) return

    // Desbloquear conquista
    await supabase.from("user_achievements").insert({
      user_id: userId,
      achievement_type: achievementType,
    })

    // Dar recompensas baseadas no tipo
    let xpReward = 50
    let tokenReward = 25

    if (achievementType.includes("veteran")) {
      xpReward = 150
      tokenReward = 75
    } else if (achievementType.includes("master")) {
      xpReward = 500
      tokenReward = 250
    }

    // Atualizar recompensas do usuário
    const { data: user } = await supabase.from("users").select("xp, tokens").eq("id", userId).single()

    if (user) {
      await supabase
        .from("users")
        .update({
          xp: user.xp + xpReward,
          tokens: user.tokens + tokenReward,
        })
        .eq("id", userId)
    }

    // Registrar atividade
    await supabase.from("activities").insert({
      user_id: userId,
      type: "achievement_unlocked",
      description: `Desbloqueou: ${achievementType}`,
      metadata: {
        achievementType,
        xpGained: xpReward,
        tokensGained: tokenReward,
      },
    })

    return { unlocked: true, xpReward, tokenReward }
  } catch (error) {
    console.error("Erro ao desbloquear conquista:", error)
    return { unlocked: false }
  }
}

export async function calculateStreak(userId: string) {
  try {
    const today = new Date()
    let streak = 0
    const currentDate = new Date(today)

    // Verificar os últimos 30 dias
    for (let i = 0; i < 30; i++) {
      const dateStr = currentDate.toISOString().split("T")[0]

      const { data: completedMissions } = await supabase
        .from("user_missions")
        .select("id")
        .eq("user_id", userId)
        .eq("mission_date", dateStr)
        .not("completed_at", "is", null)

      if (completedMissions && completedMissions.length > 0) {
        streak++
      } else if (i > 0) {
        // Se não completou missões hoje, mas é o primeiro dia, não quebra o streak
        break
      }

      currentDate.setDate(currentDate.getDate() - 1)
    }

    // Atualizar streak do usuário
    await supabase.from("users").update({ current_streak: streak }).eq("id", userId)

    return streak
  } catch (error) {
    console.error("Erro ao calcular streak:", error)
    return 0
  }
}
