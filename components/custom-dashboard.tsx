"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import type { User, CustomActivity, Progress as ProgressType } from "@/lib/types"
import { saveActivities, getActivities, saveProgress, getProgress, clearAllData } from "@/lib/storage"
import { Sparkles, Trophy, Flame, RotateCcw, Sun, Moon, Settings } from "lucide-react"
import { useTheme } from "next-themes"

interface CustomDashboardProps {
  user: User
  initialActivities: CustomActivity[]
  onReset: () => void
  onEditActivities: () => void
}

export default function CustomDashboard({ user, initialActivities, onReset, onEditActivities }: CustomDashboardProps) {
  const [activities, setActivities] = useState<CustomActivity[]>(initialActivities)
  const [progress, setProgress] = useState<ProgressType>({
    currentStreak: 0,
    totalPoints: 0,
    dailyGoal: user.dailyGoal,
    lastActiveDate: "",
  })
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Carregar atividades salvas ou usar as iniciais
    const savedActivities = getActivities()
    if (savedActivities.length > 0) {
      setActivities(savedActivities)
    } else {
      setActivities(initialActivities)
      saveActivities(initialActivities)
    }

    // Carregar progresso
    const savedProgress = getProgress()
    setProgress({ ...savedProgress, dailyGoal: user.dailyGoal })
  }, [initialActivities, user.dailyGoal])

  const toggleActivity = (activityId: string) => {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === activityId) {
        return { ...activity, completed: !activity.completed }
      }
      return activity
    })

    setActivities(updatedActivities)
    saveActivities(updatedActivities)

    // Atualizar progresso
    const completedActivities = updatedActivities.filter((a) => a.completed)
    const totalPoints = completedActivities.reduce((sum, a) => sum + a.points, 0)
    const today = new Date().toDateString()

    let newStreak = progress.currentStreak
    if (totalPoints >= progress.dailyGoal && progress.lastActiveDate !== today) {
      newStreak =
        progress.lastActiveDate === new Date(Date.now() - 86400000).toDateString() ? progress.currentStreak + 1 : 1
    }

    const newProgress = {
      ...progress,
      totalPoints,
      currentStreak: newStreak,
      lastActiveDate: totalPoints >= progress.dailyGoal ? today : progress.lastActiveDate,
    }

    setProgress(newProgress)
    saveProgress(newProgress)
  }

  const resetProgress = () => {
    clearAllData()
    onReset()
  }

  const completedActivities = activities.filter((a) => a.completed)
  const dailyProgress = Math.min((progress.totalPoints / progress.dailyGoal) * 100, 100)
  const totalPossiblePoints = activities.reduce((sum, a) => sum + a.points, 0)

  const getMotivationalMessage = () => {
    if (dailyProgress === 100) return "🎉 Parabéns! Meta diária alcançada!"
    if (dailyProgress >= 75) return "🔥 Quase lá! Continue assim!"
    if (dailyProgress >= 50) return "💪 Você está no caminho certo!"
    if (dailyProgress >= 25) return "🚀 Bom começo! Vamos continuar!"
    return "✨ Hora de começar sua jornada!"
  }

  // Agrupar atividades por categoria
  const activitiesByCategory = activities.reduce(
    (acc, activity) => {
      if (!acc[activity.category]) {
        acc[activity.category] = []
      }
      acc[activity.category].push(activity)
      return acc
    },
    {} as Record<string, CustomActivity[]>,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Planner Bilionário
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" onClick={onEditActivities}>
              <Settings className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button variant="outline" onClick={resetProgress}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Olá, {user.name}!
            </CardTitle>
            <CardDescription className="text-lg">{user.objective}</CardDescription>
          </CardHeader>
        </Card>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                Progresso Diário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {progress.totalPoints}/{progress.dailyGoal}
              </div>
              <Progress value={dailyProgress} className="mb-2" />
              <p className="text-sm text-muted-foreground">{Math.round(dailyProgress)}% concluído</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                Sequência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{progress.currentStreak}</div>
              <p className="text-sm text-muted-foreground">dias consecutivos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Atividades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {completedActivities.length}/{activities.length}
              </div>
              <p className="text-sm text-muted-foreground">concluídas hoje</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Potencial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{totalPossiblePoints}</div>
              <p className="text-sm text-muted-foreground">pontos possíveis</p>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Message */}
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="pt-6">
            <p className="text-center text-lg font-medium">{getMotivationalMessage()}</p>
          </CardContent>
        </Card>

        {/* Activities by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(activitiesByCategory).map(([category, categoryActivities]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{category}</span>
                  <Badge variant="secondary">
                    {categoryActivities.filter((a) => a.completed).length}/{categoryActivities.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg border transition-all ${
                      activity.completed
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <Checkbox
                      id={activity.id}
                      checked={activity.completed}
                      onCheckedChange={() => toggleActivity(activity.id)}
                    />
                    <div className="flex-1 flex items-center gap-3">
                      <span className="text-xl">{activity.icon}</span>
                      <div className="flex-1">
                        <label
                          htmlFor={activity.id}
                          className={`font-medium cursor-pointer ${
                            activity.completed ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {activity.title}
                        </label>
                      </div>
                      <Badge variant={activity.completed ? "default" : "secondary"}>+{activity.points} pts</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
