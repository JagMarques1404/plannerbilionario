"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MissionCard } from "@/components/dashboard/mission-card"
import { useApp } from "@/contexts/app-context"
import {
  Trophy,
  TrendingUp,
  Target,
  Flame,
  Coins,
  Star,
  Calendar,
  Award,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"

interface Mission {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly" | "special"
  difficulty: "easy" | "medium" | "hard"
  xpReward: number
  tokenReward: number
  progress: number
  maxProgress: number
  isCompleted: boolean
  deadline?: string
  requirements: string[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

export default function DashboardPage() {
  const { user, addNotification } = useApp()
  const [missions, setMissions] = useState<Mission[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [stats, setStats] = useState({
    totalInvestments: 0,
    monthlyReturn: 0,
    completedMissions: 0,
    currentStreak: 0,
    rankingPosition: 0,
    totalUsers: 0,
  })

  useEffect(() => {
    // Simular carregamento de dados
    setMissions([
      {
        id: "1",
        title: "Primeira Aplicação",
        description: "Faça sua primeira aplicação em qualquer investimento",
        type: "daily",
        difficulty: "easy",
        xpReward: 100,
        tokenReward: 50,
        progress: 1,
        maxProgress: 1,
        isCompleted: true,
        requirements: ["Aplicar qualquer valor em um investimento"],
      },
      {
        id: "2",
        title: "Diversificação Básica",
        description: "Invista em pelo menos 3 tipos diferentes de ativos",
        type: "weekly",
        difficulty: "medium",
        xpReward: 250,
        tokenReward: 100,
        progress: 2,
        maxProgress: 3,
        isCompleted: false,
        deadline: "3 dias",
        requirements: ["Investir em ações", "Investir em FIIs", "Investir em renda fixa"],
      },
      {
        id: "3",
        title: "Streak de Ouro",
        description: "Mantenha um streak de 30 dias consecutivos",
        type: "monthly",
        difficulty: "hard",
        xpReward: 500,
        tokenReward: 250,
        progress: 7,
        maxProgress: 30,
        isCompleted: false,
        deadline: "23 dias",
        requirements: ["Acessar a plataforma por 30 dias consecutivos"],
      },
      {
        id: "4",
        title: "Mentor da Comunidade",
        description: "Ajude 5 usuários iniciantes com dicas e conselhos",
        type: "special",
        difficulty: "medium",
        xpReward: 300,
        tokenReward: 150,
        progress: 1,
        maxProgress: 5,
        isCompleted: false,
        requirements: ["Responder perguntas no feed", "Dar dicas úteis", "Receber avaliações positivas"],
      },
    ])

    setAchievements([
      {
        id: "1",
        title: "Primeiro Passo",
        description: "Completou o primeiro investimento",
        icon: <Trophy className="h-6 w-6" />,
        rarity: "common",
        unlockedAt: "2024-01-15",
      },
      {
        id: "2",
        title: "Investidor Consistente",
        description: "Manteve streak de 7 dias",
        icon: <Flame className="h-6 w-6" />,
        rarity: "rare",
        unlockedAt: "2024-01-20",
      },
      {
        id: "3",
        title: "Diversificador Expert",
        description: "Investiu em mais de 10 tipos de ativos",
        icon: <PieChart className="h-6 w-6" />,
        rarity: "epic",
        progress: 7,
        maxProgress: 10,
      },
      {
        id: "4",
        title: "Lenda dos Investimentos",
        description: "Alcançou rentabilidade de 50% em um ano",
        icon: <Star className="h-6 w-6" />,
        rarity: "legendary",
        progress: 8.5,
        maxProgress: 50,
      },
    ])

    setStats({
      totalInvestments: 45000,
      monthlyReturn: 8.5,
      completedMissions: 12,
      currentStreak: 7,
      rankingPosition: 23,
      totalUsers: 1247,
    })
  }, [])

  const handleCompleteMission = (missionId: string) => {
    setMissions(missions.map((mission) => (mission.id === missionId ? { ...mission, isCompleted: true } : mission)))

    const mission = missions.find((m) => m.id === missionId)
    if (mission) {
      addNotification({
        type: "success",
        title: "Missão Concluída!",
        message: `Você ganhou ${mission.xpReward} XP e ${mission.tokenReward} tokens!`,
      })
    }
  }

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo de volta, {user.name}!</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
            <Trophy className="h-4 w-4 mr-1" />
            Nível {user.level}
          </Badge>
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            <Flame className="h-4 w-4 mr-1" />
            {user.streak} dias
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Investimentos Totais</p>
                <p className="text-2xl font-bold text-gray-900">R$ {stats.totalInvestments.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Retorno Mensal</p>
                <p className="text-2xl font-bold text-green-600">+{stats.monthlyReturn}%</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Missões Concluídas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedMissions}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ranking</p>
                <p className="text-2xl font-bold text-gray-900">
                  #{stats.rankingPosition}
                  <span className="text-sm text-gray-500 ml-1">de {stats.totalUsers}</span>
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Progresso do Nível
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Nível {user.level}</span>
              <span className="text-sm text-gray-500">
                {user.xp} / {(user.level + 1) * 1000} XP
              </span>
            </div>
            <Progress value={(user.xp % 1000) / 10} className="h-3" />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Faltam {(user.level + 1) * 1000 - user.xp} XP para o próximo nível</span>
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4" />
                <span>{user.tokens} tokens</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="missions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="missions" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Missões
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Conquistas
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Análises
          </TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Missões Ativas</h2>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Ver Histórico
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} onComplete={handleCompleteMission} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Conquistas</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{achievements.filter((a) => a.unlockedAt).length} desbloqueadas</Badge>
              <Badge variant="outline">{achievements.length} total</Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`border-2 ${getRarityColor(achievement.rarity)} ${
                  achievement.unlockedAt ? "opacity-100" : "opacity-60"
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">{achievement.icon}</div>
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

                  <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                    {achievement.rarity}
                  </Badge>

                  {achievement.unlockedAt ? (
                    <p className="text-xs text-gray-500 mt-2">
                      Desbloqueada em {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR")}
                    </p>
                  ) : achievement.progress !== undefined ? (
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progresso</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress value={(achievement.progress! / achievement.maxProgress!) * 100} className="h-2" />
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2">Bloqueada</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Gráfico de performance será implementado aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Gráfico de distribuição será implementado aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
