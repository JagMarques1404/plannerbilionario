"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Trophy, Star, Clock, CheckCircle, Lock, Gift, Zap } from "lucide-react"
import { MissionsSkeleton } from "@/components/loading-skeleton"

interface Mission {
  id: string
  title: string
  description: string
  category: "daily" | "weekly" | "achievement" | "special"
  difficulty: "easy" | "medium" | "hard"
  reward: number
  progress: number
  maxProgress: number
  completed: boolean
  locked: boolean
  icon: string
  timeLeft?: string
}

const mockMissions: Mission[] = [
  {
    id: "1",
    title: "Primeira Operação",
    description: "Execute sua primeira operação de compra ou venda",
    category: "daily",
    difficulty: "easy",
    reward: 100,
    progress: 1,
    maxProgress: 1,
    completed: true,
    locked: false,
    icon: "🎯",
  },
  {
    id: "2",
    title: "Streak de 7 Dias",
    description: "Mantenha-se ativo por 7 dias consecutivos",
    category: "weekly",
    difficulty: "medium",
    reward: 500,
    progress: 4,
    maxProgress: 7,
    completed: false,
    locked: false,
    icon: "🔥",
    timeLeft: "3 dias",
  },
  {
    id: "3",
    title: "Mestre dos Dividendos",
    description: "Receba dividendos de 10 empresas diferentes",
    category: "achievement",
    difficulty: "hard",
    reward: 1000,
    progress: 3,
    maxProgress: 10,
    completed: false,
    locked: false,
    icon: "💰",
  },
  {
    id: "4",
    title: "Social Trader",
    description: "Siga 5 investidores experientes",
    category: "daily",
    difficulty: "easy",
    reward: 200,
    progress: 2,
    maxProgress: 5,
    completed: false,
    locked: false,
    icon: "👥",
  },
  {
    id: "5",
    title: "Análise Técnica",
    description: "Complete o curso de análise técnica",
    category: "special",
    difficulty: "hard",
    reward: 2000,
    progress: 0,
    maxProgress: 1,
    completed: false,
    locked: true,
    icon: "📊",
  },
  {
    id: "6",
    title: "Diversificação",
    description: "Invista em 5 setores diferentes",
    category: "weekly",
    difficulty: "medium",
    reward: 750,
    progress: 1,
    maxProgress: 5,
    completed: false,
    locked: false,
    icon: "🎲",
  },
]

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setMissions(mockMissions)
      setLoading(false)
    }, 1500)
  }, [])

  const filteredMissions = missions.filter((mission) => {
    if (activeTab === "all") return true
    return mission.category === activeTab
  })

  const completedMissions = missions.filter((m) => m.completed).length
  const totalRewards = missions.filter((m) => m.completed).reduce((sum, m) => sum + m.reward, 0)
  const currentStreak = 4

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "daily":
        return <Target className="h-4 w-4" />
      case "weekly":
        return <Clock className="h-4 w-4" />
      case "achievement":
        return <Trophy className="h-4 w-4" />
      case "special":
        return <Star className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  if (loading) {
    return <MissionsSkeleton />
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🎯</div>
          <h1 className="text-2xl font-bold text-gray-900">Missões</h1>
        </div>
        <p className="text-base text-gray-600">Complete missões para ganhar recompensas e subir no ranking</p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-orange-500" />
            Progresso Geral
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base text-gray-600">Missões Completadas</span>
            <span className="text-lg font-semibold text-gray-900">
              {completedMissions}/{missions.length}
            </span>
          </div>
          <Progress value={(completedMissions / missions.length) * 100} className="h-2" />
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="text-xl font-bold text-orange-500">{totalRewards}</div>
              <div className="text-sm text-gray-600">Pontos Ganhos</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-500">{currentStreak}</div>
              <div className="text-sm text-gray-600">Dias de Streak</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-500">{completedMissions}</div>
              <div className="text-sm text-gray-600">Completadas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm rounded-lg p-1">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Todas
          </TabsTrigger>
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Diárias
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Semanais
          </TabsTrigger>
          <TabsTrigger value="achievement" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Conquistas
          </TabsTrigger>
          <TabsTrigger value="special" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Especiais
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.map((mission) => (
              <Card
                key={mission.id}
                className={`bg-white shadow-lg rounded-xl border transition-all hover:shadow-xl ${
                  mission.completed
                    ? "border-green-200 bg-green-50"
                    : mission.locked
                      ? "border-gray-200 opacity-60"
                      : "border-gray-100"
                }`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl">{mission.icon}</div>
                    <div className="flex items-center gap-2">
                      {mission.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {mission.locked && <Lock className="h-5 w-5 text-gray-400" />}
                      <Badge className={getDifficultyColor(mission.difficulty)}>
                        {mission.difficulty === "easy"
                          ? "Fácil"
                          : mission.difficulty === "medium"
                            ? "Médio"
                            : "Difícil"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{mission.title}</h3>
                    <p className="text-base text-gray-600">{mission.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(mission.category)}
                      <span className="text-sm text-gray-600 capitalize">{mission.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gift className="h-4 w-4 text-orange-500" />
                      <span className="text-base font-semibold text-orange-500">{mission.reward}</span>
                    </div>
                  </div>

                  {!mission.completed && !mission.locked && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progresso</span>
                        <span className="font-medium text-gray-900">
                          {mission.progress}/{mission.maxProgress}
                        </span>
                      </div>
                      <Progress value={(mission.progress / mission.maxProgress) * 100} className="h-2" />
                      {mission.timeLeft && (
                        <div className="flex items-center gap-1 text-sm text-orange-600">
                          <Clock className="h-3 w-3" />
                          {mission.timeLeft} restantes
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    className={`w-full font-medium ${
                      mission.completed
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : mission.locked
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-orange-400 hover:bg-orange-500 text-white"
                    }`}
                    disabled={mission.completed || mission.locked}
                  >
                    {mission.completed ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completada
                      </>
                    ) : mission.locked ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Bloqueada
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Iniciar
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
