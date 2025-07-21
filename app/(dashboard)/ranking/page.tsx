"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Award,
  TrendingUp,
  Flame,
  Star,
  Crown,
  Target,
  Calendar,
  Users,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import { RankingSkeleton } from "@/components/loading-skeleton"

export default function RankingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedCategory, setSelectedCategory] = useState("overall")

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const rankings = {
    overall: [
      {
        id: 1,
        position: 1,
        previousPosition: 1,
        name: "Ana Carolina Silva",
        avatar: "/diverse-avatars.png",
        level: 89,
        xp: 45750,
        points: 89420,
        streak: 45,
        badges: ["legendary", "epic", "rare"],
        specialty: "Análise Fundamentalista",
        monthlyGrowth: 15.2,
        achievements: 47,
      },
      {
        id: 2,
        position: 2,
        previousPosition: 3,
        name: "Carlos Eduardo Santos",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 84,
        xp: 42100,
        points: 84200,
        streak: 38,
        badges: ["legendary", "epic"],
        specialty: "Day Trading",
        monthlyGrowth: 22.8,
        achievements: 41,
      },
      {
        id: 3,
        position: 3,
        previousPosition: 2,
        name: "Mariana Oliveira",
        avatar: "/portrait-thoughtful-woman.png",
        level: 82,
        xp: 41200,
        points: 82400,
        streak: 29,
        badges: ["epic", "rare"],
        specialty: "Fundos Imobiliários",
        monthlyGrowth: -2.1,
        achievements: 39,
      },
      {
        id: 4,
        position: 4,
        previousPosition: 4,
        name: "Roberto Ferreira",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 78,
        xp: 39000,
        points: 78000,
        streak: 22,
        badges: ["epic", "rare"],
        specialty: "Renda Fixa",
        monthlyGrowth: 8.5,
        achievements: 35,
      },
      {
        id: 5,
        position: 5,
        previousPosition: 6,
        name: "Juliana Costa",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 75,
        xp: 37500,
        points: 75000,
        streak: 31,
        badges: ["rare", "common"],
        specialty: "Criptomoedas",
        monthlyGrowth: 18.7,
        achievements: 32,
      },
      // Usuário atual
      {
        id: 42,
        position: 42,
        previousPosition: 45,
        name: "Cristiano (Você)",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 42,
        xp: 8750,
        points: 15420,
        streak: 7,
        badges: ["rare", "common"],
        specialty: "Investidor Iniciante",
        monthlyGrowth: 12.3,
        achievements: 12,
        isCurrentUser: true,
      },
    ],
    weekly: [
      // Top performers da semana
      {
        id: 15,
        position: 1,
        previousPosition: 8,
        name: "Pedro Henrique",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 67,
        xp: 2850,
        points: 5200,
        streak: 7,
        badges: ["epic"],
        specialty: "Swing Trading",
        weeklyGrowth: 45.2,
        achievements: 28,
      },
      {
        id: 23,
        position: 2,
        previousPosition: 12,
        name: "Fernanda Lima",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 59,
        xp: 2650,
        points: 4890,
        streak: 6,
        badges: ["rare"],
        specialty: "ETFs",
        weeklyGrowth: 38.7,
        achievements: 24,
      },
    ],
    missions: [
      // Top em missões
      {
        id: 7,
        position: 1,
        previousPosition: 1,
        name: "Lucas Martins",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 71,
        missionsCompleted: 847,
        streak: 67,
        badges: ["legendary"],
        specialty: "Completador Serial",
        completionRate: 98.5,
        achievements: 45,
      },
    ],
  }

  const currentUserRank = rankings.overall.find((user) => user.isCurrentUser)

  if (isLoading) {
    return <RankingSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🏆 Ranking Global</h1>
          <p className="text-base text-gray-600 mt-1">
            Veja sua posição e compete com outros investidores da comunidade Julius
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
            <Crown className="h-3 w-3 mr-1" />
            Liga Ouro
          </Badge>
        </div>
      </div>

      {/* Sua Posição Atual */}
      {currentUserRank && (
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 shadow-lg rounded-xl border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Sua Posição Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  #{currentUserRank.position}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {currentUserRank.level}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-800">{currentUserRank.name}</h3>
                <p className="text-base text-gray-600">{currentUserRank.specialty}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700 font-medium">{currentUserRank.points.toLocaleString()} pontos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-700">{currentUserRank.streak} dias</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUp className="h-3 w-3" />
                    <span className="font-medium">+{currentUserRank.monthlyGrowth}%</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">#{currentUserRank.position}</div>
                <div className="text-sm text-gray-600">de 2.847</div>
                <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                  <ArrowUp className="h-3 w-3" />
                  <span>+3 posições</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs de Ranking */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger
            value="overall"
            className="focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger
            value="weekly"
            className="focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Semanal
          </TabsTrigger>
          <TabsTrigger
            value="missions"
            className="focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none"
          >
            <Target className="h-4 w-4 mr-2" />
            Missões
          </TabsTrigger>
        </TabsList>

        {/* Ranking Geral */}
        <TabsContent value="overall" className="space-y-4">
          <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Ranking Geral - Este Mês
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Top 3 Destacado */}
              <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {rankings.overall.slice(0, 3).map((user, index) => (
                    <TopThreeCard key={user.id} user={user} position={index + 1} />
                  ))}
                </div>
              </div>

              {/* Lista Completa */}
              <div className="divide-y divide-gray-100">
                {rankings.overall.slice(3).map((user) => (
                  <RankingRow key={user.id} user={user} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ranking Semanal */}
        <TabsContent value="weekly" className="space-y-4">
          <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-500" />
                Maiores Crescimentos - Esta Semana
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-gray-100">
              {rankings.weekly.map((user) => (
                <WeeklyRankingRow key={user.id} user={user} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ranking de Missões */}
        <TabsContent value="missions" className="space-y-4">
          <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
                <Target className="h-6 w-6 text-purple-500" />
                Mestres das Missões
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-gray-100">
              {rankings.missions.map((user) => (
                <MissionRankingRow key={user.id} user={user} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Estatísticas da Liga */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">2.847</div>
            <div className="text-base text-gray-600">Investidores Ativos</div>
          </div>
        </Card>

        <Card className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">156</div>
            <div className="text-base text-gray-600">Dias de Competição</div>
          </div>
        </Card>

        <Card className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">1.247</div>
            <div className="text-base text-gray-600">Conquistas Desbloqueadas</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Componente Top 3
function TopThreeCard({ user, position }: { user: any; position: number }) {
  const getPositionColor = (pos: number) => {
    switch (pos) {
      case 1:
        return "from-yellow-400 to-yellow-500"
      case 2:
        return "from-gray-300 to-gray-400"
      case 3:
        return "from-orange-400 to-orange-500"
      default:
        return "from-gray-200 to-gray-300"
    }
  }

  const getPositionIcon = (pos: number) => {
    switch (pos) {
      case 1:
        return "👑"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return "🏅"
    }
  }

  return (
    <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="relative mb-3">
        <Avatar className="w-16 h-16 mx-auto">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback className={`bg-gradient-to-br ${getPositionColor(position)} text-white text-lg font-bold`}>
            {user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -top-2 -right-2 text-2xl">{getPositionIcon(position)}</div>
        <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {user.level}
        </div>
      </div>
      <h3 className="text-base font-medium text-gray-800 mb-1">{user.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{user.specialty}</p>
      <div className="text-lg font-bold text-gray-800">{user.points.toLocaleString()}</div>
      <div className="text-xs text-gray-500">pontos</div>
      <div className="flex items-center justify-center gap-1 mt-2 text-green-600 text-sm">
        <ArrowUp className="h-3 w-3" />
        <span>+{user.monthlyGrowth}%</span>
      </div>
    </div>
  )
}

// Componente Linha do Ranking
function RankingRow({ user }: { user: any }) {
  const getPositionChange = () => {
    const change = user.previousPosition - user.position
    if (change > 0) return { icon: ArrowUp, color: "text-green-600", text: `+${change}` }
    if (change < 0) return { icon: ArrowDown, color: "text-red-600", text: `${change}` }
    return { icon: Minus, color: "text-gray-500", text: "=" }
  }

  const positionChange = getPositionChange()

  return (
    <div
      className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200 ${user.isCurrentUser ? "bg-orange-50 border-l-4 border-orange-400" : ""}`}
    >
      {/* Posição */}
      <div className="w-12 text-center">
        <div className={`text-xl font-bold ${user.isCurrentUser ? "text-orange-600" : "text-gray-800"}`}>
          #{user.position}
        </div>
        <div className={`flex items-center justify-center gap-1 text-xs ${positionChange.color}`}>
          <positionChange.icon className="h-3 w-3" />
          <span>{positionChange.text}</span>
        </div>
      </div>

      {/* Avatar e Info */}
      <div className="flex items-center gap-3 flex-1">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-orange-400 text-white font-bold">
              {user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {user.level}
          </div>
        </div>
        <div className="flex-1">
          <h3 className={`text-base font-medium ${user.isCurrentUser ? "text-orange-800" : "text-gray-800"}`}>
            {user.name}
          </h3>
          <p className="text-sm text-gray-600">{user.specialty}</p>
          <div className="flex items-center gap-3 mt-1 text-xs">
            <div className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-orange-500" />
              <span className="text-gray-600">{user.streak} dias</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3 text-purple-500" />
              <span className="text-gray-600">{user.achievements} conquistas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pontos */}
      <div className="text-right">
        <div className="text-lg font-bold text-gray-800">{user.points.toLocaleString()}</div>
        <div className="text-sm text-gray-600">pontos</div>
        <div
          className={`flex items-center gap-1 text-sm ${user.monthlyGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          {user.monthlyGrowth >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          <span>{Math.abs(user.monthlyGrowth)}%</span>
        </div>
      </div>
    </div>
  )
}

// Componente Ranking Semanal
function WeeklyRankingRow({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="w-12 text-center">
        <div className="text-xl font-bold text-gray-800">#{user.position}</div>
      </div>
      <div className="flex items-center gap-3 flex-1">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback className="bg-green-500 text-white font-bold">
            {user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.specialty}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-green-600">+{user.weeklyGrowth}%</div>
        <div className="text-sm text-gray-600">crescimento</div>
      </div>
    </div>
  )
}

// Componente Ranking de Missões
function MissionRankingRow({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="w-12 text-center">
        <div className="text-xl font-bold text-gray-800">#{user.position}</div>
      </div>
      <div className="flex items-center gap-3 flex-1">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback className="bg-purple-500 text-white font-bold">
            {user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.specialty}</p>
          <div className="flex items-center gap-1 mt-1">
            <Progress value={user.completionRate} className="flex-1 h-2" />
            <span className="text-xs text-gray-600">{user.completionRate}%</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-purple-600">{user.missionsCompleted}</div>
        <div className="text-sm text-gray-600">missões</div>
      </div>
    </div>
  )
}
