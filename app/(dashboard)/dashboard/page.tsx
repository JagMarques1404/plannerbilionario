"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Target, TrendingUp, Flame, Star, Users, ArrowRight, CheckCircle } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Dados mockados para o gráfico
const patrimonioData = [
  { mes: "Jul", valor: 18000 },
  { mes: "Ago", valor: 20000 },
  { mes: "Set", valor: 19500 },
  { mes: "Out", valor: 22000 },
  { mes: "Nov", valor: 23500 },
  { mes: "Dez", valor: 25000 },
]

const feedAtividades = [
  { usuario: "Ana Silva", acao: 'completou a missão "Registrar gastos por 7 dias"', tempo: "2h atrás", xp: 100 },
  { usuario: "Carlos Santos", acao: "subiu para o grupo Acelerador", tempo: "4h atrás", xp: 0 },
  { usuario: "Maria Oliveira", acao: "alcançou streak de 30 dias", tempo: "6h atrás", xp: 500 },
  { usuario: "João Pereira", acao: 'completou a missão "Investir R$ 100"', tempo: "8h atrás", xp: 300 },
]

export default function DashboardPage() {
  const { user, missions, completeMission } = useApp()

  if (!user) return null

  const missionsAtivas = missions.filter((m) => !m.concluida).slice(0, 3)
  const proximasMetas = [
    { titulo: "Alcançar R$ 30.000", progresso: 83, recompensa: "500 XP + Badge Construtor Pro" },
    { titulo: "Completar 10 missões", progresso: 60, recompensa: "1000 XP + Acesso VIP" },
    { titulo: "Streak de 30 dias", progresso: 23, recompensa: "2000 XP + Badge Disciplina" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a237e]">Olá, {user.name.split(" ")[0]}! 👋</h1>
          <p className="text-gray-600 mt-1">Bem-vindo de volta ao seu painel de controle financeiro</p>
        </div>
        <Badge className="bg-[#ff5722] text-white px-3 py-1">Streak: {user.streak} dias 🔥</Badge>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patrimônio Atual</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {user.patrimonio.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% este mês</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pontos XP</CardTitle>
            <Star className="h-4 w-4 text-[#ff5722]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#ff5722]">{user.xp.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Nível {user.nivel}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posição no Ranking</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">#{user.posicaoRanking}</div>
            <p className="text-xs text-muted-foreground">Grupo {user.grupo}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Flame className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{user.streak} dias</div>
            <p className="text-xs text-muted-foreground">Recorde pessoal!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Evolução */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-[#1a237e]">Evolução Patrimonial</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patrimonioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, "Patrimônio"]} />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="#ff5722"
                  strokeWidth={3}
                  dot={{ fill: "#ff5722", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Missões Ativas */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#1a237e]">Missões Ativas</CardTitle>
                <CardDescription>Complete para ganhar XP</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/missions">
                  Ver todas <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {missionsAtivas.map((mission) => (
              <div key={mission.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{mission.titulo}</h4>
                  <Badge variant="secondary">+{mission.xp} XP</Badge>
                </div>
                <Progress value={(mission.progresso / mission.meta) * 100} className="h-2" />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {mission.progresso}/{mission.meta}
                  </span>
                  {mission.progresso === mission.meta && (
                    <Button
                      size="sm"
                      onClick={() => completeMission(mission.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Concluir
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feed de Atividades */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1a237e] flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Feed da Comunidade
            </CardTitle>
            <CardDescription>Atividades recentes dos membros</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {feedAtividades.map((atividade, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-[#1a237e] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {atividade.usuario
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{atividade.usuario}</span> {atividade.acao}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{atividade.tempo}</span>
                    {atividade.xp > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        +{atividade.xp} XP
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Próximas Metas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1a237e] flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Próximas Metas
            </CardTitle>
            <CardDescription>Conquistas em andamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {proximasMetas.map((meta, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{meta.titulo}</h4>
                  <span className="text-xs text-gray-500">{meta.progresso}%</span>
                </div>
                <Progress value={meta.progresso} className="h-2" />
                <p className="text-xs text-gray-600">🎁 {meta.recompensa}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* CTAs Estratégicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-[#1a237e] to-[#3949ab] text-white hover:shadow-xl transition-all cursor-pointer">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-bold mb-1">Subir de Grupo</h3>
            <p className="text-xs opacity-90">Desbloqueie benefícios premium</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#ff5722] to-[#ff9800] text-white hover:shadow-xl transition-all cursor-pointer">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-bold mb-1">Convidar Amigos</h3>
            <p className="text-xs opacity-90">Ganhe 500 XP por indicação</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl transition-all cursor-pointer">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-bold mb-1">Mentoria VIP</h3>
            <p className="text-xs opacity-90">Acelere seus resultados</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-xl transition-all cursor-pointer">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-bold mb-1">Eventos Exclusivos</h3>
            <p className="text-xs opacity-90">Participe da comunidade</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
