"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Settings,
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  BarChart3,
  FileText,
  Shield,
  Play,
  Pause,
  RefreshCw,
  Send,
  Download,
  Search,
  Ban,
  UserX,
  Eye,
  Zap,
  Crown,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { AnimatedCounter, useEpicAnimations } from "@/components/epic-animations"

// Mock data for admin dashboard
const realTimeMetrics = {
  usersOnline: 1247,
  transactionsPerHour: 3456,
  dailyRevenue: 28500,
  systemHealth: 98.5,
  activeSimulations: 12,
}

const alertsData = [
  { id: 1, type: "high", message: "Pico de usuários simultâneos detectado", time: "2 min atrás" },
  { id: 2, type: "medium", message: "Simulação de mercado em alta volatilidade", time: "15 min atrás" },
  { id: 3, type: "low", message: "Backup automático concluído com sucesso", time: "1h atrás" },
]

const revenueData = [
  { month: "Jan", revenue: 2200000, costs: 1100000, profit: 1100000 },
  { month: "Fev", revenue: 2400000, costs: 1200000, profit: 1200000 },
  { month: "Mar", revenue: 2600000, costs: 1300000, profit: 1300000 },
  { month: "Abr", revenue: 2750000, costs: 1375000, profit: 1375000 },
  { month: "Mai", revenue: 2800000, costs: 1400000, profit: 1400000 },
  { month: "Jun", revenue: 2850000, costs: 1425000, profit: 1425000 },
]

const engagementData = [
  { day: "Seg", pageViews: 15420, avgTime: 8.5, conversions: 234 },
  { day: "Ter", pageViews: 18230, avgTime: 9.2, conversions: 287 },
  { day: "Qua", pageViews: 16890, avgTime: 7.8, conversions: 256 },
  { day: "Qui", pageViews: 19450, avgTime: 10.1, conversions: 312 },
  { day: "Sex", pageViews: 21200, avgTime: 11.3, conversions: 398 },
  { day: "Sab", pageViews: 12800, avgTime: 6.4, conversions: 189 },
  { day: "Dom", pageViews: 10500, avgTime: 5.9, conversions: 145 },
]

export default function AdminPage() {
  const { triggerConfetti, triggerFire, triggerSparkles } = useEpicAnimations()
  const [metrics, setMetrics] = useState(realTimeMetrics)
  const [simulationControls, setSimulationControls] = useState({
    marketVolatility: 50,
    userGrowthRate: 12,
    revenueMultiplier: 1.0,
    simulationsActive: true,
  })

  const [communicationForm, setCommunicationForm] = useState({
    audience: "all",
    messageType: "announcement",
    title: "",
    message: "",
    pushNotification: true,
    scheduleTime: "",
  })

  const [moderationSearch, setModerationSearch] = useState("")
  const [selectedReports, setSelectedReports] = useState<string[]>([])

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        usersOnline: prev.usersOnline + Math.floor(Math.random() * 20 - 10),
        transactionsPerHour: prev.transactionsPerHour + Math.floor(Math.random() * 100 - 50),
        dailyRevenue: prev.dailyRevenue + Math.floor(Math.random() * 1000 - 500),
        systemHealth: Math.max(95, Math.min(100, prev.systemHealth + Math.random() * 2 - 1)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleMarketEvent = (eventType: string) => {
    switch (eventType) {
      case "bull":
        triggerFire("Bull Run Iniciado!")
        break
      case "crash":
        triggerSparkles("Crash Simulado")
        break
      case "volatility":
        triggerConfetti("Alta Volatilidade Ativada!")
        break
    }
  }

  const handleMassMessage = () => {
    if (communicationForm.title && communicationForm.message) {
      triggerConfetti("Mensagem Enviada!")
      setCommunicationForm({
        audience: "all",
        messageType: "announcement",
        title: "",
        message: "",
        pushNotification: true,
        scheduleTime: "",
      })
    }
  }

  const pendingReports = [
    { id: "1", user: "João Silva", reason: "Spam", content: "Mensagem promocional repetitiva", severity: "medium" },
    {
      id: "2",
      user: "Maria Santos",
      reason: "Conteúdo inadequado",
      content: "Linguagem ofensiva no chat",
      severity: "high",
    },
    { id: "3", user: "Pedro Costa", reason: "Manipulação", content: "Tentativa de manipular preços", severity: "high" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient flex items-center gap-2">
            <Crown className="h-8 w-8" />
            Painel Administrativo
          </h1>
          <p className="text-gray-600 mt-1">Controle total da plataforma Julius Invest</p>
        </div>
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <Shield className="h-4 w-4 mr-2" />
          Admin Access
        </Badge>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Online</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              <AnimatedCounter value={metrics.usersOnline} />
            </div>
            <p className="text-xs text-gray-600">Ativos agora</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações/Hora</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <AnimatedCounter value={metrics.transactionsPerHour} />
            </div>
            <p className="text-xs text-gray-600">Última hora</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Diária</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              R$ <AnimatedCounter value={metrics.dailyRevenue} />
            </div>
            <p className="text-xs text-gray-600">Hoje</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saúde Sistema</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              <AnimatedCounter value={metrics.systemHealth} suffix="%" />
            </div>
            <p className="text-xs text-gray-600">Uptime</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Simulações</CardTitle>
            <Settings className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              <AnimatedCounter value={metrics.activeSimulations} />
            </div>
            <p className="text-xs text-gray-600">Ativas</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Alertas do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertsData.map((alert) => (
              <Alert
                key={alert.id}
                className={`border-l-4 ${
                  alert.type === "high"
                    ? "border-red-500 bg-red-50"
                    : alert.type === "medium"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-blue-500 bg-blue-50"
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="flex justify-between items-center">
                  <span>{alert.message}</span>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Admin Tabs */}
      <Tabs defaultValue="simulation" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="simulation" className="rounded-xl font-semibold">
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Simulação</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="rounded-xl font-semibold">
            <Zap className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Eventos</span>
          </TabsTrigger>
          <TabsTrigger value="communication" className="rounded-xl font-semibold">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Comunicação</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-xl font-semibold">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-xl font-semibold">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Relatórios</span>
          </TabsTrigger>
          <TabsTrigger value="moderation" className="rounded-xl font-semibold">
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Moderação</span>
          </TabsTrigger>
          <TabsTrigger value="transparency" className="rounded-xl font-semibold">
            <Eye className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Transparência</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulation" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Controles de Simulação
              </CardTitle>
              <CardDescription>Ajuste os parâmetros da simulação em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="volatility">Volatilidade do Mercado: {simulationControls.marketVolatility}%</Label>
                    <Input
                      id="volatility"
                      type="range"
                      min="0"
                      max="100"
                      value={simulationControls.marketVolatility}
                      onChange={(e) =>
                        setSimulationControls((prev) => ({
                          ...prev,
                          marketVolatility: Number.parseInt(e.target.value),
                        }))
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="growth">
                      Taxa de Crescimento de Usuários: {simulationControls.userGrowthRate}%
                    </Label>
                    <Input
                      id="growth"
                      type="range"
                      min="0"
                      max="50"
                      value={simulationControls.userGrowthRate}
                      onChange={(e) =>
                        setSimulationControls((prev) => ({ ...prev, userGrowthRate: Number.parseInt(e.target.value) }))
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="revenue">Multiplicador de Receita: {simulationControls.revenueMultiplier}x</Label>
                    <Input
                      id="revenue"
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={simulationControls.revenueMultiplier}
                      onChange={(e) =>
                        setSimulationControls((prev) => ({
                          ...prev,
                          revenueMultiplier: Number.parseFloat(e.target.value),
                        }))
                      }
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Simulações Ativas</h4>
                      <p className="text-sm text-gray-600">Controle geral das simulações</p>
                    </div>
                    <Switch
                      checked={simulationControls.simulationsActive}
                      onCheckedChange={(checked) =>
                        setSimulationControls((prev) => ({ ...prev, simulationsActive: checked }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => triggerConfetti("Simulações Iniciadas!")}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar
                    </Button>
                    <Button variant="outline" onClick={() => triggerSparkles("Simulações Pausadas")}>
                      <Pause className="h-4 w-4 mr-2" />
                      Pausar
                    </Button>
                  </div>

                  <Button variant="destructive" className="w-full" onClick={() => triggerFire("Sistema Reiniciado!")}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reiniciar Sistema
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Geração de Eventos de Mercado
              </CardTitle>
              <CardDescription>Simule eventos que impactam o mercado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button
                  className="h-24 bg-green-500 hover:bg-green-600 flex flex-col"
                  onClick={() => handleMarketEvent("bull")}
                >
                  <TrendingUp className="h-8 w-8 mb-2" />
                  Bull Run
                </Button>
                <Button
                  className="h-24 bg-red-500 hover:bg-red-600 flex flex-col"
                  onClick={() => handleMarketEvent("crash")}
                >
                  <TrendingUp className="h-8 w-8 mb-2 rotate-180" />
                  Market Crash
                </Button>
                <Button
                  className="h-24 bg-orange-500 hover:bg-orange-600 flex flex-col"
                  onClick={() => handleMarketEvent("volatility")}
                >
                  <Activity className="h-8 w-8 mb-2" />
                  Alta Volatilidade
                </Button>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Evento Personalizado</h4>
                <Textarea placeholder="Descreva o evento de mercado personalizado..." className="min-h-20" />
                <Button className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Executar Evento Personalizado
                </Button>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Eventos Recentes</h4>
                <div className="space-y-2">
                  {[
                    { time: "14:32", event: "Bull Run ativado", impact: "+15%" },
                    { time: "13:15", event: "Alta volatilidade", impact: "±25%" },
                    { time: "11:45", event: "Crash simulado", impact: "-12%" },
                  ].map((event, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">
                        {event.time} - {event.event}
                      </span>
                      <Badge variant="outline">{event.impact}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                Comunicação em Massa
              </CardTitle>
              <CardDescription>Envie mensagens para diferentes grupos de usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="audience">Público-alvo</Label>
                    <Select
                      value={communicationForm.audience}
                      onValueChange={(value) => setCommunicationForm((prev) => ({ ...prev, audience: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os usuários</SelectItem>
                        <SelectItem value="premium">Usuários premium</SelectItem>
                        <SelectItem value="new">Novos usuários</SelectItem>
                        <SelectItem value="inactive">Usuários inativos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="messageType">Tipo de mensagem</Label>
                    <Select
                      value={communicationForm.messageType}
                      onValueChange={(value) => setCommunicationForm((prev) => ({ ...prev, messageType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="announcement">Anúncio</SelectItem>
                        <SelectItem value="alert">Alerta</SelectItem>
                        <SelectItem value="promotion">Promoção</SelectItem>
                        <SelectItem value="update">Atualização</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={communicationForm.title}
                    onChange={(e) => setCommunicationForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Título da mensagem"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={communicationForm.message}
                    onChange={(e) => setCommunicationForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Conteúdo da mensagem..."
                    className="min-h-32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="push"
                      checked={communicationForm.pushNotification}
                      onCheckedChange={(checked) =>
                        setCommunicationForm((prev) => ({ ...prev, pushNotification: checked }))
                      }
                    />
                    <Label htmlFor="push">Push notification</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Label htmlFor="schedule">Agendar:</Label>
                    <Input
                      id="schedule"
                      type="datetime-local"
                      value={communicationForm.scheduleTime}
                      onChange={(e) => setCommunicationForm((prev) => ({ ...prev, scheduleTime: e.target.value }))}
                    />
                  </div>
                </div>

                <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handleMassMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Métricas de Engajamento</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pageViews" fill="#3b82f6" name="Page Views" />
                    <Bar dataKey="conversions" fill="#10b981" name="Conversões" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Receita vs Custos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${(Number(value) / 1000000).toFixed(1)}M`, ""]} />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Receita" />
                    <Line type="monotone" dataKey="costs" stroke="#ef4444" strokeWidth={3} name="Custos" />
                    <Line type="monotone" dataKey="profit" stroke="#f59e0b" strokeWidth={3} name="Lucro" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="card-premium">
            <CardHeader>
              <CardTitle>KPIs Principais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    <AnimatedCounter value={8.7} suffix=" min" />
                  </div>
                  <p className="text-sm text-gray-600">Tempo Médio na Plataforma</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    <AnimatedCounter value={23.4} suffix="%" />
                  </div>
                  <p className="text-sm text-gray-600">Taxa de Conversão</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">
                    <AnimatedCounter value={87.2} suffix="%" />
                  </div>
                  <p className="text-sm text-gray-600">Taxa de Retenção</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    <AnimatedCounter value={9.1} suffix="/10" />
                  </div>
                  <p className="text-sm text-gray-600">Satisfação do Usuário</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Relatórios Automáticos
              </CardTitle>
              <CardDescription>Gere e baixe relatórios detalhados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 flex flex-col bg-blue-500 hover:bg-blue-600">
                  <FileText className="h-6 w-6 mb-2" />
                  Relatório Diário
                </Button>
                <Button className="h-20 flex flex-col bg-green-500 hover:bg-green-600">
                  <FileText className="h-6 w-6 mb-2" />
                  Relatório Semanal
                </Button>
                <Button className="h-20 flex flex-col bg-orange-500 hover:bg-orange-600">
                  <FileText className="h-6 w-6 mb-2" />
                  Relatório Mensal
                </Button>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Relatórios Recentes</h4>
                <div className="space-y-2">
                  {[
                    { name: "Relatório Mensal - Junho 2024", date: "01/07/2024", size: "2.3 MB" },
                    { name: "Relatório Semanal - Semana 26", date: "30/06/2024", size: "856 KB" },
                    { name: "Relatório Diário - 29/06/2024", date: "29/06/2024", size: "234 KB" },
                  ].map((report, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium">{report.name}</h5>
                        <p className="text-sm text-gray-600">
                          {report.date} • {report.size}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                Sistema de Moderação
              </CardTitle>
              <CardDescription>Gerencie relatórios e moderação de usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar usuário..."
                      value={moderationSearch}
                      onChange={(e) => setModerationSearch(e.target.value)}
                    />
                  </div>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Relatórios Pendentes ({pendingReports.length})</h4>
                  {pendingReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium">{report.user}</h5>
                          <p className="text-sm text-gray-600">{report.reason}</p>
                        </div>
                        <Badge
                          className={
                            report.severity === "high"
                              ? "bg-red-100 text-red-800"
                              : report.severity === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {report.severity}
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{report.content}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Revisar
                        </Button>
                        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                          Advertir
                        </Button>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          <UserX className="h-4 w-4 mr-2" />
                          Suspender
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          Banir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Aprovar Selecionados
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Rejeitar Selecionados
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transparency" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                Controle de Transparência
              </CardTitle>
              <CardDescription>Gerencie as informações públicas da empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Métricas Públicas</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Receita Mensal", value: "R$ 2.8M", public: true },
                      { label: "Usuários Ativos", value: "6.347", public: true },
                      { label: "Reserva de Emergência", value: "R$ 5.2M", public: true },
                      { label: "Margem de Lucro", value: "50%", public: false },
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{metric.label}</span>
                          <p className="text-sm text-gray-600">{metric.value}</p>
                        </div>
                        <Switch checked={metric.public} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Atualizações Automáticas</h4>
                  <div className="space-y-3">
                    {[
                      { item: "Dashboard de Métricas", status: "Ativo", frequency: "Tempo real" },
                      { item: "Relatórios Financeiros", status: "Ativo", frequency: "Mensal" },
                      { item: "Roadmap de Produto", status: "Ativo", frequency: "Trimestral" },
                      { item: "Auditoria Externa", status: "Pendente", frequency: "Anual" },
                    ].map((update, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{update.item}</span>
                          <p className="text-sm text-gray-600">{update.frequency}</p>
                        </div>
                        <Badge
                          className={
                            update.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {update.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Próximas Atualizações</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Relatório de impacto social (próxima semana)</li>
                  <li>• Dashboard de sustentabilidade (próximo mês)</li>
                  <li>• Auditoria de segurança independente (Q3 2024)</li>
                  <li>• Certificação ISO 27001 (Q4 2024)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
