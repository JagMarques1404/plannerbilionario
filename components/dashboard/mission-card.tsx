"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Star, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UserMission } from "@/lib/supabase"

interface MissionCardProps {
  mission: UserMission & {
    title?: string
    description?: string
  }
  onComplete?: (missionId: string) => void
}

export function MissionCard({ mission, onComplete }: MissionCardProps) {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = async () => {
    if (mission.completed_at || isCompleting) return

    setIsCompleting(true)
    try {
      await onComplete?.(mission.id)
    } finally {
      setIsCompleting(false)
    }
  }

  const isCompleted = !!mission.completed_at
  const progress = mission.progress || 0

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", isCompleted && "bg-green-50 border-green-200")}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-orange-500" />
              )}
              {mission.title || `Missão ${mission.mission_type}`}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {mission.description || "Complete esta missão para ganhar recompensas"}
            </p>
          </div>
          <Badge variant={isCompleted ? "default" : "secondary"}>{isCompleted ? "Completa" : "Pendente"}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Rewards */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{mission.xp_reward} XP</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Zap className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{mission.token_reward} Tokens</span>
            </div>
          </div>

          {!isCompleted && (
            <Button size="sm" onClick={handleComplete} disabled={isCompleting} className="min-w-[100px]">
              {isCompleting ? "Completando..." : "Completar"}
            </Button>
          )}
        </div>

        {isCompleted && (
          <div className="text-center py-2">
            <p className="text-sm text-green-600 font-medium">✨ Missão completada! Recompensas recebidas.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
