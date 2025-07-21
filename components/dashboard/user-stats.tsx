"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Coins, TrendingUp, Target, Zap, Award, BarChart3 } from "lucide-react"
import { useUserProfile } from "@/hooks/use-user-profile"
import { useUser } from "@/hooks/use-user"

export function UserStats() {
  const { profile, loading: profileLoading, stats: profileStats } = useUserProfile()
  const { user, loading: userLoading } = useUser()

  const loading = profileLoading || userLoading

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!profile || !user) return null

  const statCards = [
    {
      title: "Nível",
      value: user.level,
      subtitle: `${user.xp} XP`,
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      progress: profileStats.xpProgress,
      progressLabel: `${profileStats.xpToNextLevel} XP para próximo nível`,
    },
    {
      title: "Tokens $BILLION",
      value: user.tokens.toLocaleString(),
      subtitle: "Saldo atual",
      icon: Coins,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      badge: user.tokens >= 10000 ? "Rico!" : user.tokens >= 5000 ? "Próspero" : "Crescendo",
    },
    {
      title: "Patrimônio",
      value: `R$ ${user.balance.toLocaleString()}`,
      subtitle: "Saldo fictício",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      badge: user.balance >= 50000 ? "Alto" : "Médio",
    },
    {
      title: "Streak",
      value: `${user.current_streak} dias`,
      subtitle: "Consistência",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header do usuário */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            {user.current_streak > 0 && (
              <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {user.current_streak}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-gray-600">@{profile.username}</p>

            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 font-medium">
                <Trophy className="w-3 h-3 mr-1" />
                Nível {user.level}
              </Badge>

              {user.current_streak > 0 && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-medium">
                  <Zap className="w-3 h-3 mr-1" />
                  {user.current_streak} dias
                </Badge>
              )}

              {profile.user_achievements && profile.user_achievements.length > 0 && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 font-medium">
                  <Award className="w-3 h-3 mr-1" />
                  {profile.user_achievements.length} conquistas
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Barra de progresso XP */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className="font-medium">Progresso para Nível {user.level + 1}</span>
            <span className="font-mono">
              {user.xp} / {profileStats.xpForNextLevel} XP
            </span>
          </div>
          <Progress value={profileStats.xpProgress} className="h-3 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${profileStats.xpProgress}%` }}
            />
          </Progress>
          <p className="text-xs text-gray-500 mt-1">{profileStats.xpToNextLevel} XP restantes</p>
        </div>
      </Card>

      {/* Grid de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor} shadow-sm`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>

            {stat.progress !== undefined && (
              <div className="space-y-1">
                <Progress value={stat.progress} className="h-2" />
                <p className="text-xs text-gray-500">{stat.progressLabel}</p>
              </div>
            )}

            {stat.badge && (
              <Badge variant="outline" className="mt-2 text-xs">
                {stat.badge}
              </Badge>
            )}
          </Card>
        ))}
      </div>

      {/* Conquistas recentes */}
      {profile.user_achievements && profile.user_achievements.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
            Conquistas Recentes
            <Badge variant="secondary" className="ml-2">
              {profile.user_achievements.length}
            </Badge>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {profile.user_achievements.slice(0, 6).map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{achievement.achievements.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{achievement.achievements.name}</p>
                  <p className="text-xs text-gray-600 truncate">{achievement.achievements.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-yellow-600">+{achievement.achievements.xp_reward} XP</span>
                    <span className="text-xs text-orange-600">+{achievement.achievements.token_reward} tokens</span>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    achievement.achievements.rarity === "legendary"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                      : achievement.achievements.rarity === "epic"
                        ? "bg-purple-100 text-purple-800 border-purple-300"
                        : achievement.achievements.rarity === "rare"
                          ? "bg-blue-100 text-blue-800 border-blue-300"
                          : "bg-gray-100 text-gray-800 border-gray-300"
                  }`}
                >
                  {achievement.achievements.rarity}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Atividades recentes */}
      {profile.activities && profile.activities.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Atividades Recentes
          </h3>

          <div className="space-y-3">
            {profile.activities.slice(0, 5).map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
