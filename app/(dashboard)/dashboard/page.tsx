"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Target,
  TrendingUp,
  Star,
  Users,
  ArrowRight,
  CheckCircle,
  Coins,
  Crown,
  Zap,
  Award,
  MessageSquare,
  Eye,
  Play,
  Gift,
} from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts"

// Dados mockados expandidos
const patrimonioData = [
  { mes: "Jun", valor: 120000, meta: 110000 },
  { mes: "Jul", valor: 125000, meta: 115000 },
  { mes: "Ago", valor: 135000, meta: 125000 },
  { mes: "Set", valor: 140000, meta: 135000 },
  { mes: "Out", valor: 145000, meta: 140000 },
  { mes: "Nov", valor: 150000, meta: 145000 },
]

const performanceData = [
  { categoria: "Você", valor: 23.5, cor: "#1E40AF" },
  { categoria: "Média do Grupo", valor: 18.2, cor: "#6B7280" },
  { categoria: "Top 10%", valor: 35.8, cor: "#F59E0B" },
]

const gastosData = [
  { categoria: "Investimentos", valor: 45, cor: "#10B981" },
  { categoria: "Moradia", valor: 25, cor: "#3B82F6" },
  { categoria: "Alimentação", valor: 15, cor: "#F59E0B" },
  { categoria: "Transporte", valor: 10, cor: "#EF4444" },
  { categoria: "Outros", valor: 5, cor: "#8B5CF6" },
]

const feedAtividades = [
  {
    usuario: "Carlos M.",
    acao: 'completou "Investir R$ 5.000 em CDB"',
    tempo: "2h atrás",
    xp: 500,
    avatar: "/placeholder.svg?height=40&width=40&text=CM",
    grupo: "ELITE",
  },
  {
    usuario: "Ana R.",
    acao: "subiu para o grupo MAGNATA",
    tempo: "4h atrás",
    xp: 0,
    avatar: "/placeholder.svg?height=40&width=40&text=AR",
    grupo: "MAGNATA",
  },
  {
    usuario: "Roberto S.",
    acao: "alcançou streak de 50 dias",
    tempo: "6h atrás",
    xp: 1000,
    avatar: "/placeholder.svg?height=40&width=40&text=RS",
    grupo: "TITÃ",
  },
  {
    usuario: "Marina L.",
    acao: 'ganhou o badge "Investidor Diamante"',
    tempo: "8h atrás",
    xp: 750,
    avatar: "/placeholder.svg?height=40&width=40&text=ML",
    grupo: "MAGNATA",
  },
]

const anunciosPatrocinados = [
  {
    id: "1",
    titulo: "Curso de Opções - Trader Milionário",
    descricao: "Aprenda a operar opções como um profissional",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Curso+Opções",
    recompensa: 50,
    duracao: "2:30",
    categoria: "Educação",
  },
  {
    id: "2",
    titulo: "Plataforma de Investimentos XYZ",
    descricao: "Invista com taxa zero e ganhe cashback",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Plataforma+XYZ",
    recompensa: 75,
    duracao: "1:45",
    categoria: "Fintech",
  },
]

const oportunidadesVip = [
  {
    titulo: "IPO Exclusivo - TechCorp",
    descricao: "Acesso antecipado ao IPO da maior startup de IA do Brasil",
    investimentoMin: 50000,
    prazo: "3 dias",
    badge: "EXCLUSIVO",
  },
  {
    titulo: "Fundo Imobiliário Premium",
    descricao: "Oportunidade em fundo com yield de 15% a.a.",
    investimentoMin: 25000,
    prazo: "7 dias",
    badge: "LIMITADO",
  },
]

export default function DashboardPage() {
  const { user, missions, completeMission } = useApp()
  const [selectedTab, setSelectedTab] = useState("overview")

  if (!user) return null

  const missionsAtivas = missions.filter((m) => !m.completed).slice(0, 4)
  const proximasMetas = [
    { titulo: "Alcançar R$ 200.000", progresso: 75, recompensa: "Upgrade para ELITE", cor: "bg-yellow-500" },
    { titulo: "Completar 20 missões", progresso: 65, recompensa: "Badge Disciplinado", cor: "bg-blue-500" },
    { titulo: "Streak de 30 dias", progresso: 50, recompensa: "2.000 $BILLION", cor: "bg-red-500" },
  ]

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header Premium */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Olá, {user.name.split(" ")[0]}! 👋</h1>
          <p className="text-gray-600 text-lg">Bem-vindo de volta ao seu painel de controle financeiro premium</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-lg">
            🔥 Streak: {user.streak} dias
          </Badge>
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-lg">
            👑 {user.grupo}
          </Badge>
        </div>
      </div>

      {/* Cards de Métricas Premium */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Patrimônio Atual</CardTitle>
            <TrendingUp className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">R$ {user.patrimonio.toLocaleString()}</div>
            <p className="text-sm opacity-90">+23.5% este mês 📈</p>
          </CardContent>
        </Card>

        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">$BILLION Tokens</CardTitle>
            <Coins className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{user.billionTokens.toLocaleString()}</div>
            <p className="text-sm opacity-90">≈ R$ {user.billionTokens.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Posição Ranking</CardTitle>
            <Trophy className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">#{user.posicaoRanking}</div>
            <p className="text-sm opacity-90">Grupo {user.grupo}</p>
          </CardContent>
        </Card>

        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total XP</CardTitle>
            <Star className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{user.xp.toLocaleString()}</div>
            <p className="text-sm opacity-90">Nível {user.nivel}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Premium */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="overview" className="rounded-xl font-semibold">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="missions" className="rounded-xl font-semibold">
            Missões
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="rounded-xl font-semibold">
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="vip" className="rounded-xl font-semibold">
            VIP
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Evolução Premium */}
            <Card className="card-premium border-0">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Evolução Patrimonial
                </CardTitle>
                <CardDescription>Últimos 6 meses vs Meta</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={patrimonioData}>
                    <defs>
                      <linearGradient id="colorPatrimonio" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="mes" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      formatter={(value, name) => [
                        `R$ ${Number(value).toLocaleString()}`,
                        name === "valor" ? "Patrimônio" : "Meta",
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="valor"
                      stroke="#10B981"
                      strokeWidth={3}
                      fill="url(#colorPatrimonio)"
                    />
                    <Area
                      type="monotone"
                      dataKey="meta"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="url(#colorMeta)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance vs Grupo */}
            <Card className="card-premium border-0">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance vs Grupo
                </CardTitle>
                <CardDescription>Crescimento percentual últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis type="number" stroke="#6B7280" />
                    <YAxis dataKey="categoria" type="category" stroke="#6B7280" width={100} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Crescimento"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar dataKey="valor" fill="#1E40AF" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Feed de Atividades Premium */}
          <Card className="card-premium border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                    Feed da Comunidade Premium
                  </CardTitle>
                  <CardDescription>Atividades recentes dos membros VIP</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                  Ver Tudo
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedAtividades.map((atividade, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:shadow-md transition-all"
                >
                  <img
                    src={atividade.avatar || "/placeholder.svg"}
                    alt={atividade.usuario}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900">{atividade.usuario}</span>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                        {atividade.grupo}
                      </Badge>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{atividade.acao}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{atividade.tempo}</span>
                      {atividade.xp > 0 && (
                        <Badge className="bg-yellow-500 text-white text-xs">+{atividade.xp} XP</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Missões Ativas */}
            <Card className="card-premium border-0">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-500" />
                  Missões Ativas
                </CardTitle>
                <CardDescription>Complete para ganhar XP e $BILLION tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {missionsAtivas.map((mission) => (
                  <div key={mission.id} className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{mission.title}</h4>
                      <div className="flex space-x-2">
                        <Badge className="bg-blue-500 text-white text-xs">+{mission.reward} XP</Badge>
                        <Badge className="bg-yellow-500 text-white text-xs">+{mission.billionReward} $B</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs mb-3">{mission.description}</p>
                    <div className="space-y-2">
                      <Progress value={(mission.progress / mission.target) * 100} className="h-2" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          {mission.progress}/{mission.target}
                        </span>
                        {mission.progress === mission.target && (
                          <Button
                            size="sm"
                            onClick={() => completeMission(mission.id)}
                            className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-lg"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Concluir
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Próximas Metas */}
            <Card className="card-premium border-0">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-purple-500" />
                  Próximas Conquistas
                </CardTitle>
                <CardDescription>Objetivos de longo prazo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {proximasMetas.map((meta, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{meta.titulo}</h4>
                      <span className="text-xs text-gray-500">{meta.progresso}%</span>
                    </div>
                    <Progress value={meta.progresso} className="h-2 mb-3" />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600">🎁 {meta.recompensa}</p>
                      <div className={`w-3 h-3 rounded-full ${meta.cor}`}></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-6">
          {/* Anúncios Patrocinados */}
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Play className="h-5 w-5 mr-2 text-red-500" />
                Anúncios Patrocinados
              </CardTitle>
              <CardDescription>Assista e ganhe $BILLION tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {anunciosPatrocinados.map((anuncio) => (
                  <div key={anuncio.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 border">
                    <div className="relative mb-4">
                      <img
                        src={anuncio.thumbnail || "/placeholder.svg"}
                        alt={anuncio.titulo}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="h-6 w-6 text-gray-900 ml-1" />
                        </div>
                      </div>
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">{anuncio.duracao}</Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{anuncio.titulo}</h4>
                    <p className="text-gray-600 text-sm mb-4">{anuncio.descricao}</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-500 text-white">+{anuncio.recompensa} $BILLION</Badge>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-lg">
                        <Eye className="h-4 w-4 mr-1" />
                        Assistir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vip" className="space-y-6">
          {/* Oportunidades VIP */}
          <Card className="card-premium border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Crown className="h-5 w-5 mr-2 text-yellow-500" />
                Oportunidades VIP Exclusivas
              </CardTitle>
              <CardDescription>Apenas para membros do seu nível</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {oportunidadesVip.map((oportunidade, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-2xl border-2 border-yellow-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-bold text-gray-900">{oportunidade.titulo}</h4>
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                          {oportunidade.badge}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{oportunidade.descricao}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Mín: R$ {oportunidade.investimentoMin.toLocaleString()}</span>
                        <span>Prazo: {oportunidade.prazo}</span>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl">
                      <Gift className="h-4 w-4 mr-2" />
                      Acessar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Benefícios do Grupo */}
          <Card className="card-premium border-0 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Star className="h-5 w-5 mr-2 text-purple-500" />
                Seus Benefícios - Grupo {user.grupo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Cashback 3%</h5>
                    <p className="text-gray-600 text-sm">Em todas as transações</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Networking VIP</h5>
                    <p className="text-gray-600 text-sm">Eventos exclusivos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Mentoria 1:1</h5>
                    <p className="text-gray-600 text-sm">Sessões mensais</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Acesso Antecipado</h5>
                    <p className="text-gray-600 text-sm">Novos produtos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
