"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { useDashboardStore, formatTokens, formatCurrency, calculateLevelProgress } from "@/lib/store"
import { Zap, Coins, Calendar, LogOut, TrendingUp, Star, Plus, Loader2 } from "lucide-react"

interface UserMission {
  id: string
  user_id: string
  mission_type: string
  completed_at: string | null
  mission_date: string
  xp_reward: number
  token_reward: number
  created_at: string
}

interface UserAchievement {
  id: string
  user_id: string
  achievement_type: string
  unlocked_at: string
}

function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = "blue",
}: {
  title: string
  value: string | number
  icon: any
  description?: string
  trend?: string
  color?: "blue" | "yellow" | "orange" | "gray"
}) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    yellow: "bg-yellow-50 border-yellow-200",
    orange: "bg-orange-50 border-orange-200",
    gray: "bg-gray-100 border-gray-200",
  }

  const iconClasses = {
    blue: "text-blue-900",
    yellow: "text-yellow-600",
    orange: "text-orange-500",
    gray: "text-gray-700",
  }

  return (
    <Card className={`card-hover ${colorClasses[color]} border-2`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconClasses[color]}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        {description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
        {trend && (
          <p className="text-xs text-orange-500 mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

// Função para obter nome amigável do tipo de missão
function getMissionDisplayName(missionType: string): string {
  const missionNames: Record<string, string> = {
    daily_check: "Verificação Diária do Portfólio",
    market_research: "Pesquisa de Mercado",
    budget_review: "Revisão do Orçamento",
    savings_goal: "Meta de Poupança",
    expense_tracking: "Rastreamento de Gastos",
    checkin: "Check-in Matinal",
    expense_review: "Revisar Gastos de Ontem",
    budget_planning: "Definir Orçamento do Dia",
    education: "Lição Financeira",
    savings: "Registrar Economia do Dia",
    analysis: "Análise Semanal",
    checkout: "Check-out Noturno",
  }

  return missionNames[missionType] || missionType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClient()
  const { currentUser, setCurrentUser, missions, setMissions, achievements, setAchievements, completeMission } =
    useDashboardStore()

  const [loading, setLoading] = useState(true)
  const [todayMissions, setTodayMissions] = useState<UserMission[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    initializeUser()
  }, [])

  const initializeUser = async () => {
    try {
      setLoading(true)

      // Verificar autenticação via localStorage (sandbox mode)
      const authToken = localStorage.getItem("julius_auth_token")
      const savedEmail = localStorage.getItem("julius_user_email")
      const savedUserId = localStorage.getItem("julius_user_id")

      if (!authToken || !savedEmail || !savedUserId) {
        console.log("Não autenticado, redirecionando para login")
        router.push("/login")
        return
      }

      setIsAuthenticated(true)

      // Buscar dados atualizados do usuário no banco
      const { data: profile, error } = await supabase.from("users").select("*").eq("email", savedEmail).single()

      if (error || !profile) {
        console.error("Erro ao carregar perfil:", error)
        // Se não encontrar o usuário, limpar localStorage e ir para login
        clearAuthData()
        router.push("/login")
        return
      }

      // Configurar usuário no store
      setCurrentUser({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        xp: profile.xp || 0,
        level: profile.level || 1,
        tokens: profile.tokens || 1000,
        balance: profile.balance || 100000,
        current_streak: profile.current_streak || 0,
        longest_streak: profile.longest_streak || 0,
        total_missions_completed: profile.total_missions_completed || 0,
        last_login_date: profile.last_login_date || new Date().toISOString(),
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      })

      // Carregar dados adicionais
      await loadUserData(profile.id)
    } catch (error) {
      console.error("Erro na inicialização:", error)
      clearAuthData()
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const clearAuthData = () => {
    localStorage.removeItem("julius_user_email")
    localStorage.removeItem("julius_user_id")
    localStorage.removeItem("julius_user_data")
    localStorage.removeItem("julius_auth_token")
  }

  const loadUserData = async (userId: string) => {
    try {
      // Carregar missões de hoje
      const today = new Date().toISOString().split("T")[0]
      const { data: todayMissionsData } = await supabase
        .from("user_missions")
        .select("*")
        .eq("user_id", userId)
        .eq("mission_date", today)
        .order("completed_at", { ascending: true })

      // Carregar conquistas
      const { data: achievementsData } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", userId)
        .order("unlocked_at", { ascending: false })
        .limit(10)

      if (todayMissionsData) {
        setTodayMissions(todayMissionsData)
      }

      if (achievementsData) {
        setAchievements(
          achievementsData.map((a) => ({
            id: a.id,
            user_id: a.user_id,
            achievement_type: a.achievement_type,
            unlocked_at: a.unlocked_at,
          })),
        )
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error)
    }
  }

  const handleCompleteMission = async (missionId: string) => {
    if (!currentUser) return

    try {
      const mission = todayMissions.find((m) => m.id === missionId)
      if (!mission || mission.completed_at) return

      // Atualizar missão como completa
      const { error } = await supabase
        .from("user_missions")
        .update({
          completed_at: new Date().toISOString(),
        })
        .eq("id", missionId)

      if (error) throw error

      // Atualizar XP e tokens do usuário
      const newXP = currentUser.xp + mission.xp_reward
      const newTokens = currentUser.tokens + mission.token_reward
      const newLevel = Math.floor(newXP / 1000) + 1

      const { error: userError } = await supabase
        .from("users")
        .update({
          xp: newXP,
          tokens: newTokens,
          level: newLevel,
          updated_at: new Date().toISOString(),
        })
        .eq("id", currentUser.id)

      if (userError) throw userError

      // Atualizar estado local
      setCurrentUser({
        ...currentUser,
        xp: newXP,
        tokens: newTokens,
        level: newLevel,
      })

      // Recarregar dados
      await loadUserData(currentUser.id)
    } catch (error) {
      console.error("Erro ao completar missão:", error)
    }
  }

  const createSampleMission = async () => {
    if (!currentUser) return

    const sampleMissions = [
      {
        mission_type: "daily_check",
        xp_reward: 50,
        token_reward: 10,
      },
      {
        mission_type: "market_research",
        xp_reward: 75,
        token_reward: 15,
      },
      {
        mission_type: "budget_review",
        xp_reward: 100,
        token_reward: 20,
      },
      {
        mission_type: "savings_goal",
        xp_reward: 80,
        token_reward: 18,
      },
      {
        mission_type: "expense_tracking",
        xp_reward: 60,
        token_reward: 12,
      },
      {
        mission_type: "investment_research",
        xp_reward: 90,
        token_reward: 22,
      },
      {
        mission_type: "financial_education",
        xp_reward: 70,
        token_reward: 16,
      },
    ]

    const today = new Date().toISOString().split("T")[0]

    try {
      // Buscar missões existentes para hoje
      const { data: existingMissions, error: fetchError } = await supabase
        .from("user_missions")
        .select("mission_type")
        .eq("user_id", currentUser.id)
        .eq("mission_date", today)

      if (fetchError) {
        console.error("Erro ao buscar missões existentes:", fetchError)
        return
      }

      // Filtrar missões que ainda não existem
      const existingTypes = existingMissions?.map((m) => m.mission_type) || []
      const availableMissions = sampleMissions.filter((mission) => !existingTypes.includes(mission.mission_type))

      if (availableMissions.length === 0) {
        alert("Todas as missões disponíveis já foram criadas para hoje!")
        return
      }

      // Selecionar uma missão aleatória das disponíveis
      const randomMission = availableMissions[Math.floor(Math.random() * availableMissions.length)]

      // Inserir a nova missão
      const { error } = await supabase.from("user_missions").insert([
        {
          user_id: currentUser.id,
          mission_type: randomMission.mission_type,
          xp_reward: randomMission.xp_reward,
          token_reward: randomMission.token_reward,
          mission_date: today,
          completed_at: null,
        },
      ])

      if (error) {
        console.error("Erro ao criar missão:", error)
        alert("Erro ao criar missão. Tente novamente.")
        return
      }

      // Recarregar dados
      await loadUserData(currentUser.id)

      // Feedback para o usuário
      alert(`Missão "${getMissionDisplayName(randomMission.mission_type)}" criada com sucesso!`)
    } catch (error) {
      console.error("Erro ao criar missão:", error)
      alert("Erro inesperado ao criar missão.")
    }
  }

  const createAllDailyMissions = async () => {
    if (!currentUser) return

    const dailyMissions = [
      { mission_type: "checkin", xp_reward: 10, token_reward: 5 },
      { mission_type: "expense_review", xp_reward: 15, token_reward: 8 },
      { mission_type: "budget_planning", xp_reward: 20, token_reward: 10 },
      { mission_type: "education", xp_reward: 25, token_reward: 12 },
      { mission_type: "savings", xp_reward: 30, token_reward: 15 },
      { mission_type: "analysis", xp_reward: 50, token_reward: 25 },
      { mission_type: "checkout", xp_reward: 15, token_reward: 8 },
    ]

    const today = new Date().toISOString().split("T")[0]

    try {
      // Buscar missões existentes para hoje
      const { data: existingMissions } = await supabase
        .from("user_missions")
        .select("mission_type")
        .eq("user_id", currentUser.id)
        .eq("mission_date", today)

      const existingTypes = existingMissions?.map((m) => m.mission_type) || []

      // Filtrar apenas missões que não existem
      const newMissions = dailyMissions
        .filter((mission) => !existingTypes.includes(mission.mission_type))
        .map((mission) => ({
          user_id: currentUser.id,
          mission_type: mission.mission_type,
          xp_reward: mission.xp_reward,
          token_reward: mission.token_reward,
          mission_date: today,
          completed_at: null,
        }))

      if (newMissions.length === 0) {
        alert("Todas as missões diárias já foram criadas!")
        return
      }

      // Inserir todas as missões de uma vez
      const { error } = await supabase.from("user_missions").insert(newMissions)

      if (error) {
        console.error("Erro ao criar missões:", error)
        alert("Erro ao criar missões diárias.")
        return
      }

      await loadUserData(currentUser.id)
      alert(`${newMissions.length} missões diárias criadas com sucesso!`)
    } catch (error) {
      console.error("Erro ao criar missões diárias:", error)
      alert("Erro inesperado ao criar missões.")
    }
  }

  const handleSignOut = async () => {
    try {
      // Limpar dados de autenticação
      clearAuthData()

      // Limpar store
      setCurrentUser(null)
      setMissions([])
      setAchievements([])

      router.push("/login")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
      router.push("/login")
    }
  }

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <Loader2 className="animate-spin h-12 w-12 text-blue-900 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Carregando seu dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Verificando autenticação e carregando dados...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated || !currentUser) {
    return null // Will redirect to login
  }

  const completedTodayMissions = todayMissions.filter((mission) => mission.completed_at).length
  const totalTodayMissions = todayMissions.length
  const missionCompletionRate = totalTodayMissions > 0 ? (completedTodayMissions / totalTodayMissions) * 100 : 0

  // Calculate level progress
  const levelProgress = calculateLevelProgress(currentUser.xp, currentUser.level)

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Bem-vindo, <span className="text-gradient">{currentUser.name}</span>! 👋
            </h1>
            <p className="text-gray-600 mt-2 flex items-center space-x-4">
              <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                Level {currentUser.level}
              </span>
              <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {currentUser.xp.toLocaleString()} XP
              </span>
              <span className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentUser.current_streak} dias streak 🔥
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-yellow-400 text-gray-800 hover:bg-yellow-300">
              <Coins className="w-3 h-3 mr-1" />
              {formatTokens(currentUser.tokens)}
            </Badge>
            <Badge variant="outline" className="border-orange-400 text-orange-500">
              {formatCurrency(currentUser.balance)} saldo
            </Badge>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="border-gray-300 bg-transparent">
              <LogOut className="w-4 h-4 mr-1" />
              Sair
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total XP"
            value={currentUser.xp.toLocaleString()}
            icon={Star}
            description="Pontos de experiência"
            trend="+15% esta semana"
            color="yellow"
          />
          <StatsCard
            title="Streak Atual"
            value={`${currentUser.current_streak} dias`}
            icon={Zap}
            description="Continue assim!"
            color="orange"
          />
          <StatsCard
            title="Tokens"
            value={currentUser.tokens.toLocaleString()}
            icon={Coins}
            description="Disponível para gastar"
            color="blue"
          />
          <StatsCard
            title="Progresso Hoje"
            value={`${completedTodayMissions}/${totalTodayMissions}`}
            icon={Calendar}
            description="Missões completadas"
            color="gray"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-200 overflow-hidden">
          <Tabs defaultValue="missions" className="space-y-0">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-none h-14">
              <TabsTrigger value="missions" className="data-[state=active]:bg-blue-900 data-[state=active]:text-white">
                Missões
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
              >
                Conquistas
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-blue-900 data-[state=active]:text-white">
                Perfil
              </TabsTrigger>
              <TabsTrigger value="sandbox" className="data-[state=active]:bg-blue-900 data-[state=active]:text-white">
                Sandbox
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="missions" className="space-y-4 mt-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-orange-500">Missões de Hoje</h3>
                    <p className="text-sm text-gray-600">Complete missões para ganhar XP e tokens</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={createSampleMission} className="bg-orange-400 hover:bg-orange-500 text-white">
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar Missão
                    </Button>
                    <Button
                      onClick={createAllDailyMissions}
                      variant="outline"
                      className="border-orange-400 text-orange-500 bg-transparent"
                    >
                      Criar Todas (7)
                    </Button>
                  </div>
                </div>

                <Card className="border-2 border-orange-200">
                  <CardContent className="p-4">
                    {todayMissions.length > 0 ? (
                      <div className="space-y-3">
                        {todayMissions.map((mission) => (
                          <div
                            key={mission.id}
                            className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl bg-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => !mission.completed_at && handleCompleteMission(mission.id)}
                                className={`w-5 h-5 rounded-full border-2 transition-all ${
                                  mission.completed_at
                                    ? "bg-orange-400 border-orange-400"
                                    : "border-gray-400 hover:border-orange-400 cursor-pointer hover:scale-110"
                                }`}
                              />
                              <div>
                                <p
                                  className={`font-medium ${
                                    mission.completed_at ? "line-through text-gray-500" : "text-gray-800"
                                  }`}
                                >
                                  {getMissionDisplayName(mission.mission_type)}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">Tipo: {mission.mission_type}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Badge className="bg-yellow-400 text-gray-800">+{mission.xp_reward} XP</Badge>
                              <Badge className="bg-blue-900 text-white">+{mission.token_reward} tokens</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Nenhuma missão para hoje!</p>
                        <Button onClick={createSampleMission} className="bg-orange-400 hover:bg-orange-500 text-white">
                          <Plus className="w-4 h-4 mr-1" />
                          Criar Sua Primeira Missão
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4 mt-0">
                <Card className="border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-600">Suas Conquistas</CardTitle>
                    <CardDescription>Marcos que você desbloqueou</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {achievements.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement) => (
                          <div
                            key={achievement.id}
                            className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl bg-gray-100 card-hover"
                          >
                            <div className="text-3xl">🏆</div>
                            <div>
                              <p className="font-semibold text-gray-800">{achievement.achievement_type}</p>
                              <p className="text-xs text-gray-600">
                                Desbloqueado em {new Date(achievement.unlocked_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Nenhuma conquista ainda. Complete missões para desbloquear sua primeira conquista!
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-4 mt-0">
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900">Estatísticas do Perfil</CardTitle>
                    <CardDescription>Sua jornada no Julius Invest</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nome:</span>
                          <span className="font-medium">{currentUser.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{currentUser.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nível:</span>
                          <span className="font-medium">{currentUser.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">XP Total:</span>
                          <span className="font-medium">{currentUser.xp.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tokens:</span>
                          <span className="font-medium">{formatTokens(currentUser.tokens)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saldo:</span>
                          <span className="font-medium">{formatCurrency(currentUser.balance)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Streak Atual:</span>
                          <span className="font-medium">{currentUser.current_streak} dias</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Membro desde:</span>
                          <span className="font-medium">{new Date(currentUser.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Progresso do Nível</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Nível {currentUser.level}</span>
                          <span className="font-medium text-blue-900">
                            {levelProgress.current}/{levelProgress.needed} XP
                          </span>
                        </div>
                        <Progress value={levelProgress.percentage} className="h-3 bg-blue-100" />
                        <p className="text-xs text-gray-600">
                          {levelProgress.needed - levelProgress.current} XP necessário para o nível{" "}
                          {levelProgress.nextLevel}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sandbox" className="space-y-4 mt-0">
                <Card className="border-2 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-800">🎮 Modo Sandbox</CardTitle>
                    <CardDescription>Recursos de demonstração e ferramentas de teste</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-yellow-800 mb-2">Recursos Iniciais</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• 1.000 tokens para gastar</li>
                          <li>• R$ 100.000 de saldo demo</li>
                          <li>• Nível 1 como ponto de partida</li>
                          <li>• 0 XP para começar a ganhar</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-800 mb-2">Recursos Demo</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Criar missões de exemplo</li>
                          <li>• Completar tarefas por recompensas</li>
                          <li>• Acompanhar progresso de XP e nível</li>
                          <li>• Desbloquear conquistas</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button onClick={createSampleMission} className="bg-orange-400 hover:bg-orange-500 text-white">
                        <Plus className="w-4 h-4 mr-1" />
                        Adicionar Missão Aleatória
                      </Button>
                      <Button onClick={createAllDailyMissions} className="bg-blue-900 hover:bg-blue-800 text-white">
                        Criar Todas as Missões Diárias
                      </Button>
                      <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="border-gray-300 text-gray-700"
                      >
                        Atualizar Dados
                      </Button>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <p className="text-sm text-gray-600">
                        <strong>Nota:</strong> Este é um ambiente sandbox com autenticação simplificada. Todos os dados
                        são para fins de demonstração. Em um ambiente de produção, seria usado um sistema de
                        autenticação mais robusto.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
