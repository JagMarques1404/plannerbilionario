import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Criar conquistas padrão
  const achievements = [
    {
      id: "first_mission",
      name: "Primeira Missão",
      description: "Complete sua primeira missão",
      icon: "🎯",
      category: "missions",
      rarity: "common",
      criteria: { missions_completed: 1 },
      xpReward: 50,
      tokenReward: 25,
    },
    {
      id: "week_streak",
      name: "Semana Completa",
      description: "Complete missões por 7 dias seguidos",
      icon: "🔥",
      category: "streaks",
      rarity: "rare",
      criteria: { daily_streak: 7 },
      xpReward: 200,
      tokenReward: 100,
    },
    {
      id: "first_investment",
      name: "Primeiro Investimento",
      description: "Faça seu primeiro investimento",
      icon: "💰",
      category: "investments",
      rarity: "common",
      criteria: { investments_made: 1 },
      xpReward: 100,
      tokenReward: 50,
    },
    {
      id: "level_5",
      name: "Nível 5",
      description: "Alcance o nível 5",
      icon: "⭐",
      category: "levels",
      rarity: "common",
      criteria: { level: 5 },
      xpReward: 150,
      tokenReward: 75,
    },
    {
      id: "level_10",
      name: "Nível 10",
      description: "Alcance o nível 10",
      icon: "🌟",
      category: "levels",
      rarity: "rare",
      criteria: { level: 10 },
      xpReward: 300,
      tokenReward: 150,
    },
  ]

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { id: achievement.id },
      update: {},
      create: achievement,
    })
  }

  // Criar configurações sandbox
  await prisma.sandboxConfig.upsert({
    where: { key: "daily_mission_reset_time" },
    update: {},
    create: {
      key: "daily_mission_reset_time",
      value: { hour: 0, minute: 0 }, // Meia-noite
    },
  })

  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
