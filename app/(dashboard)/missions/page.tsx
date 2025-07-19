"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Clock, Calendar, Trophy, CheckCircle, Star } from "lucide-react"
import { useApp } from "@/contexts/app-context"

export default function MissionsPage() {
  const { missions, completeMission, user } = useApp()
  const [selectedCategory, setSelectedCategory] = useState("todas")

  const filteredMissions =
    selectedCategory === "todas" ? missions : missions.filter((m) => m.categoria === selectedCategory)

  const getCategoryIcon = (categoria: string) => {
    switch (categoria) {
      case "diaria":
        return <Clock className="h-4 w-4" />
      case "semanal":
        return <Calendar className="h-4 w-4" />
      case "mensal":
        return <Trophy className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case "diaria":
        return "bg-green-100 text-green-800"
      case "semanal":
        return "bg-blue-100 text-blue-800"
      case "mensal":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const missoesConcluidas = missions.filter((m) => m.concluida).length
  const totalMissoes = missions.length
  const xpTotal = missions.filter((m) => m.concluida).reduce((acc, m) => acc + m.xp, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a237e]">Missões</h1>
          <p className="text-gray-600 mt-1">Complete missões para ganhar XP e subir no ranking</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#ff5722]">{user?.xp.toLocaleString()} XP</div>
          <p className="text-sm text-gray-600">Total acumulado</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missões Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {missoesConcluidas}/{totalMissoes}
            </div>
            <Progress value={(missoesConcluidas / totalMissoes) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP das Missões</CardTitle>
            <Star className="h-4 w-4 text-[#ff5722]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#ff5722]">{xpTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">De missões completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak Atual</CardTitle>
            <Target className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{user?.streak} dias</div>
            <p className="text-xs text-muted-foreground">Continue assim! 🔥</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="diaria">Diárias</TabsTrigger>
          <TabsTrigger value="semanal">Semanais</TabsTrigger>
          <TabsTrigger value="mensal">Mensais</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.map((mission) => (
              <Card
                key={mission.id}
                className={`hover:shadow-lg transition-all ${
                  mission.concluida ? "bg-green-50 border-green-200" : "hover:-translate-y-1"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(mission.categoria)}>
                      {getCategoryIcon(mission.categoria)}
                      <span className="ml-1 capitalize">{mission.categoria}</span>
                    </Badge>
                    <Badge variant="secondary">+{mission.xp} XP</Badge>
                  </div>
                  <CardTitle className="text-lg text-[#1a237e]">{mission.titulo}</CardTitle>
                  <CardDescription>{mission.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progresso</span>
                      <span>
                        {mission.progresso}/{mission.meta}
                      </span>
                    </div>
                    <Progress value={(mission.progresso / mission.meta) * 100} className="h-2" />
                  </div>

                  {mission.prazo && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      Prazo: {new Date(mission.prazo).toLocaleDateString()}
                    </div>
                  )}

                  {mission.concluida ? (
                    <div className="flex items-center text-green-600 font-medium">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Missão Concluída!
                    </div>
                  ) : mission.progresso === mission.meta ? (
                    <Button
                      onClick={() => completeMission(mission.id)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Concluir Missão
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full bg-transparent">
                      Continuar Missão
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Missões Sugeridas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1a237e]">Missões Sugeridas para Você</CardTitle>
          <CardDescription>Baseado no seu perfil e dificuldades declaradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-[#1a237e] mb-2">📱 Baixe um app de controle financeiro</h4>
              <p className="text-sm text-gray-600 mb-3">
                Instale e configure um aplicativo para acompanhar seus gastos diários
              </p>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800">+150 XP</Badge>
                <Button size="sm" variant="outline">
                  Aceitar
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-[#1a237e] mb-2">📚 Assista a um vídeo sobre investimentos</h4>
              <p className="text-sm text-gray-600 mb-3">Complete um curso básico sobre como começar a investir</p>
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-100 text-purple-800">+250 XP</Badge>
                <Button size="sm" variant="outline">
                  Aceitar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
