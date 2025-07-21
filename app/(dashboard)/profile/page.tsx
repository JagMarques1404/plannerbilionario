"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  TrendingUp,
  Calendar,
  Target,
  Settings,
  Edit,
  Share2,
  BarChart3,
  Wallet,
  Users,
  Clock,
} from "lucide-react"
import { ProfileSkeleton } from "@/components/loading-skeleton"

interface UserProfile {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  level: number
  xp: number
  nextLevelXp: number
  rank: number
  totalUsers: number
  joinDate: string
  streak: number
  completedMissions: number
  totalRewards: number
  portfolioValue: number
  totalReturn: number
  followers: number
  following: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

const mockProfile: UserProfile = {
  id: "1",
  name: "João Silva",
  username: "joao_investidor",
  email: "joao@email.com",
  avatar: "/placeholder.svg?height=100&width=100",
  level: 12,
  xp: 2450,
  nextLevelXp: 3000,
  rank: 47,
  totalUsers: 1250,
  joinDate: "2024-01-15",
  streak: 15,
  completedMissions: 28,
  totalRewards: 5600,
  portfolioValue: 25000,
  totalReturn: 12.5,
  followers: 89,
  following: 156,
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Primeiro Passo",
    description: "Complete sua primeira missão",
    icon: "🎯",
    unlockedAt: "2024-01-16",
    rarity: "common",
  },
  {
    id: "2",
    title: "Streak Master",
    description: "Mantenha um streak de 10 dias",
    icon: "🔥",
    unlockedAt: "2024-01-25",
    rarity: "rare",
  },
  {
    id: "3",
    title: "Social Butterfly",
    description: "Siga 50 investidores",
    icon: "👥",
    unlockedAt: "2024-02-01",
    rarity: "epic",
  },
  {
    id: "4",
    title: "Midas Touch",
    description: "Alcance 10% de retorno",
    icon: "💰",
    unlockedAt: "2024-02-10",
    rarity: "legendary",
  },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setProfile(mockProfile)
      setAchievements(mockAchievements)
      setLoading(false)
    }, 1500)
  }, [])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "epic":
        return "bg-purple-100 text-purple-800"
      case "legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading || !profile) {
    return <ProfileSkeleton />
  }

  const xpProgress = (profile.xp / profile.nextLevelXp) * 100

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
          <p className="text-base text-gray-600">Gerencie suas informações e acompanhe seu progresso</p>
        </div>
        <Button className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-3">
          <Edit className="h-4 w-4 mr-2" />
          Editar Perfil
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback className="text-xl font-semibold bg-orange-100 text-orange-600">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-orange-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {profile.level}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-base text-gray-600">@{profile.username}</p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Badge className="bg-orange-100 text-orange-800">Nível {profile.level}</Badge>
                  <Badge className="bg-blue-100 text-blue-800">#{profile.rank} no Ranking</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-base text-gray-600">Experiência</span>
                  <span className="text-base font-semibold text-gray-900">
                    {profile.xp}/{profile.nextLevelXp} XP
                  </span>
                </div>
                <Progress value={xpProgress} className="h-2" />
                <p className="text-sm text-gray-500">{profile.nextLevelXp - profile.xp} XP para o próximo nível</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-500">{profile.streak}</div>
                  <div className="text-sm text-gray-600">Dias de Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-500">{profile.completedMissions}</div>
                  <div className="text-sm text-gray-600">Missões</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-500">{profile.followers}</div>
                  <div className="text-sm text-gray-600">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-500">{profile.following}</div>
                  <div className="text-sm text-gray-600">Seguindo</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm rounded-lg p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Conquistas
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Portfólio
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Atividade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Estatísticas Gerais</h3>
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Ranking Atual</span>
                    <span className="text-base font-semibold text-gray-900">#{profile.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Total de Usuários</span>
                    <span className="text-base font-semibold text-gray-900">{profile.totalUsers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Membro desde</span>
                    <span className="text-base font-semibold text-gray-900">
                      {new Date(profile.joinDate).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recompensas</h3>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Total de Pontos</span>
                    <span className="text-base font-semibold text-orange-500">{profile.totalRewards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Missões Completadas</span>
                    <span className="text-base font-semibold text-gray-900">{profile.completedMissions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Conquistas</span>
                    <span className="text-base font-semibold text-gray-900">{achievements.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Social</h3>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Seguidores</span>
                    <span className="text-base font-semibold text-gray-900">{profile.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Seguindo</span>
                    <span className="text-base font-semibold text-gray-900">{profile.following}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Streak Atual</span>
                    <span className="text-base font-semibold text-orange-500">{profile.streak} dias</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="bg-white shadow-lg rounded-xl border border-gray-100">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{achievement.icon}</div>
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity === "common"
                        ? "Comum"
                        : achievement.rarity === "rare"
                          ? "Raro"
                          : achievement.rarity === "epic"
                            ? "Épico"
                            : "Lendário"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-base text-gray-600">{achievement.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-green-500" />
                  Valor do Portfólio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-green-500">
                  R$ {profile.portfolioValue.toLocaleString("pt-BR")}
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-base font-semibold text-green-500">+{profile.totalReturn}%</span>
                  <span className="text-base text-gray-600">retorno total</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Melhor Mês</span>
                    <span className="text-base font-semibold text-green-500">+8.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Pior Mês</span>
                    <span className="text-base font-semibold text-red-500">-2.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Volatilidade</span>
                    <span className="text-base font-semibold text-gray-900">12.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Completou a missão 'Primeira Operação'", time: "2 horas atrás", icon: "🎯" },
                  { action: "Seguiu João Investidor", time: "1 dia atrás", icon: "👥" },
                  { action: "Desbloqueou conquista 'Streak Master'", time: "2 dias atrás", icon: "🏆" },
                  { action: "Fez uma operação de compra", time: "3 dias atrás", icon: "📈" },
                  { action: "Completou o curso de análise técnica", time: "1 semana atrás", icon: "📚" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-base text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
