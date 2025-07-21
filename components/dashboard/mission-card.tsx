"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Clock, Coins, Target, CheckCircle } from "lucide-react"

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

interface MissionCardProps {
  mission: Mission
  onComplete?: (missionId: string) => void
}

export function MissionCard({ mission, onComplete }: MissionCardProps) {
  const getDifficultyColor = (difficulty: Mission["difficulty"]) => {
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

  const getTypeColor = (type: Mission["type"]) => {
    switch (type) {
      case "daily":
        return "bg-blue-100 text-blue-800"
      case "weekly":
        return "bg-purple-100 text-purple-800"
      case "monthly":
        return "bg-orange-100 text-orange-800"
      case "special":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const progressPercentage = (mission.progress / mission.maxProgress) * 100

  return (
    <Card className={`hover:shadow-md transition-shadow ${mission.isCompleted ? "bg-green-50 border-green-200" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{mission.title}</CardTitle>
              {mission.isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
            </div>
            <div className="flex gap-2 mb-2">
              <Badge className={getDifficultyColor(mission.difficulty)} variant="secondary">
                {mission.difficulty}
              </Badge>
              <Badge className={getTypeColor(mission.type)} variant="secondary">
                {mission.type}
              </Badge>
            </div>
          </div>
          {mission.deadline && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{mission.deadline}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm">{mission.description}</p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>
              {mission.progress}/{mission.maxProgress}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Requirements */}
        {mission.requirements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Requisitos:</h4>
            <ul className="space-y-1">
              {mission.requirements.map((requirement, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                  <Target className="h-3 w-3" />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rewards */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">{mission.xpReward} XP</span>
            </div>
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">{mission.tokenReward} tokens</span>
            </div>
          </div>

          {mission.isCompleted ? (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Concluída
            </Badge>
          ) : (
            <Button
              size="sm"
              onClick={() => onComplete?.(mission.id)}
              disabled={mission.progress < mission.maxProgress}
            >
              {mission.progress >= mission.maxProgress ? "Resgatar" : "Em Progresso"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
