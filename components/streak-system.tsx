"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Flame, Calendar, Trophy, Target, Zap } from "lucide-react"

interface StreakData {
  current: number
  longest: number
  weeklyGoal: number
  weeklyProgress: number
  lastActivity: Date
  streakType: "missions" | "investments" | "learning"
}

interface StreakSystemProps {
  userId?: string
}

export function StreakSystem({ userId }: StreakSystemProps) {
  const [streaks, setStreaks] = useState<Record<string, StreakData>>({
    missions: {
      current: 7,
      longest: 15,
      weeklyGoal: 7,
      weeklyProgress: 5,
      lastActivity: new Date(),
      streakType: "missions",
    },
    investments: {
      current: 3,
      longest: 8,
      weeklyGoal: 3,
      weeklyProgress: 2,
      lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      streakType: "investments",
    },
    learning: {
      current: 12,
      longest: 20,
      weeklyGoal: 5,
      weeklyProgress: 4,
      lastActivity: new Date(),
      streakType: "learning",
    },
  })

  const [loading, setLoading] = useState(false)

  const getStreakIcon = (type: string) => {
    switch (type) {
      case "missions":
        return <Target className="h-5 w-5" />
      case "investments":
        return <Trophy className="h-5 w-5" />
      case "learning":
        return <Zap className="h-5 w-5" />
      default:
        return <Flame className="h-5 w-5" />
    }
  }

  const getStreakColor = (current: number) => {
    if (current >= 30) return "text-purple-600 bg-purple-100"
    if (current >= 14) return "text-orange-600 bg-orange-100"
    if (current >= 7) return "text-yellow-600 bg-yellow-100"
    if (current >= 3) return "text-green-600 bg-green-100"
    return "text-gray-600 bg-gray-100"
  }

  const getStreakTitle = (type: string) => {
    switch (type) {
      case "missions":
        return "Missões Diárias"
      case "investments":
        return "Investimentos"
      case "learning":
        return "Aprendizado"
      default:
        return "Atividade"
    }
  }

  const getStreakDescription = (type: string, current: number) => {
    if (current === 0) return "Comece sua sequência hoje!"

    switch (type) {
      case "missions":
        return `${current} dias completando missões`
      case "investments":
        return `${current} semanas investindo`
      case "learning":
        return `${current} dias estudando`
      default:
        return `${current} dias de atividade`
    }
  }

  const isStreakAtRisk = (lastActivity: Date) => {
    const now = new Date()
    const diffHours = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60)
    return diffHours > 20 // Mais de 20 horas sem atividade
  }

  const getNextMilestone = (current: number) => {
    const milestones = [3, 7, 14, 30, 60, 100, 365]
    return milestones.find((m) => m > current) || current + 30
  }

  const refreshStreaks = async () => {
    setLoading(true)
    // Simular atualização dos dados
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Aqui você faria a chamada real para a API
    // const response = await fetch(`/api/streaks/${userId}`)
    // const data = await response.json()
    // setStreaks(data)

    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Flame className="h-6 w-6 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-900">Sistema de Sequências</h2>
        </div>
        <Button onClick={refreshStreaks} disabled={loading} variant="outline" size="sm">
          {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div> : "Atualizar"}
        </Button>
      </div>

      {/* Streak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(streaks).map(([key, streak]) => {
          const nextMilestone = getNextMilestone(streak.current)
          const progressToNext = (streak.current / nextMilestone) * 100
          const isAtRisk = isStreakAtRisk(streak.lastActivity)

          return (
            <Card key={key} className="relative overflow-hidden">
              {/* Risk Warning */}
              {isAtRisk && (
                <div className="absolute top-2 right-2">
                  <Badge variant="destructive" className="text-xs">
                    Em Risco!
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  {getStreakIcon(key)}
                  <span>{getStreakTitle(key)}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Current Streak */}
                <div className="text-center">
                  <div
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStreakColor(streak.current)}`}
                  >
                    <Flame className="h-5 w-5" />
                    <span className="text-2xl font-bold">{streak.current}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{getStreakDescription(key, streak.current)}</p>
                </div>

                {/* Progress to Next Milestone */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Próxima meta: {nextMilestone} dias</span>
                    <span>{Math.round(progressToNext)}%</span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                </div>

                {/* Weekly Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Meta semanal</span>
                    <span>
                      {streak.weeklyProgress}/{streak.weeklyGoal}
                    </span>
                  </div>
                  <Progress value={(streak.weeklyProgress / streak.weeklyGoal) * 100} className="h-2" />
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-gray-600 pt-2 border-t">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{streak.longest}</div>
                    <div>Recorde</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {Math.floor((new Date().getTime() - streak.lastActivity.getTime()) / (1000 * 60 * 60))}h
                    </div>
                    <div>Última atividade</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Streak Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Recompensas por Sequência</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { days: 3, reward: "50 tokens", color: "bg-green-100 text-green-800" },
              { days: 7, reward: "150 tokens + Badge", color: "bg-blue-100 text-blue-800" },
              { days: 14, reward: "300 tokens + XP Boost", color: "bg-purple-100 text-purple-800" },
              { days: 30, reward: "1000 tokens + Título", color: "bg-yellow-100 text-yellow-800" },
            ].map((milestone) => (
              <div key={milestone.days} className={`p-4 rounded-lg ${milestone.color}`}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{milestone.days}</div>
                  <div className="text-sm font-medium mb-2">dias</div>
                  <div className="text-xs">{milestone.reward}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Dicas para Manter sua Sequência:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Complete pelo menos uma missão por dia</li>
                <li>• Defina lembretes para não perder o prazo</li>
                <li>• Comece com metas pequenas e aumente gradualmente</li>
                <li>• Use as recompensas como motivação extra</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
