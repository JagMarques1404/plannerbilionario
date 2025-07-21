"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  TrendingUp,
  Clock,
  Users,
  Trophy,
  Zap,
  Target,
  Crown,
  Star,
  Timer,
  Calculator,
  Award,
  Flame,
  ArrowUp,
  ArrowDown,
  Calendar,
  DollarSign,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock data for blocks
const blocks = [
  {
    id: 1,
    name: "Bloco Genesis",
    status: "completed",
    targetAmount: 5000000,
    raisedAmount: 5000000,
    investors: 1247,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-02-01"),
    tokenPrice: 1.0,
    currentValue: 3.2,
    roi: 220,
    earlyBirdBonus: 20,
    badges: ["genesis-investor", "early-bird", "whale"],
  },
  {
    id: 2,
    name: "Bloco Expansion",
    status: "completed",
    targetAmount: 8000000,
    raisedAmount: 8000000,
    investors: 2156,
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-03-15"),
    tokenPrice: 1.5,
    currentValue: 2.8,
    roi: 87,
    earlyBirdBonus: 15,
    badges: ["expansion-pioneer", "growth-investor"],
  },
  {
    id: 3,
    name: "Bloco Innovation",
    status: "active",
    targetAmount: 12000000,
    raisedAmount: 8750000,
    investors: 3421,
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-07-31"),
    tokenPrice: 2.0,
    currentValue: 2.0,
    roi: 0,
    earlyBirdBonus: 25,
    badges: ["innovation-backer", "tech-investor"],
  },
  {
    id: 4,
    name: "Bloco Future",
    status: "upcoming",
    targetAmount: 15000000,
    raisedAmount: 0,
    investors: 0,
    startDate: new Date("2024-08-15"),
    endDate: new Date("2024-09-30"),
    tokenPrice: 2.5,
    currentValue: 2.5,
    roi: 0,
    earlyBirdBonus: 30,
    badges: ["future-visionary", "premium-investor"],
  },
]

const investorRankings = [
  { name: "Crypto Whale", amount: 250000, tokens: 125000, badge: "🐋", position: 1 },
  { name: "Tech Investor", amount: 180000, tokens: 90000, badge: "💎", position: 2 },
  { name: "Early Bird", amount: 150000, tokens: 100000, badge: "🚀", position: 3 },
  { name: "Growth Seeker", amount: 120000, tokens: 60000, badge: "📈", position: 4 },
  { name: "Innovation Fan", amount: 100000, tokens: 50000, badge: "⚡", position: 5 },
  { name: "Você", amount: 25000, tokens: 12500, badge: "⭐", position: 47 },
]

const roiComparison = [
  { block: "Bloco 1", investment: 10000, currentValue: 32000, roi: 220 },
  { block: "Bloco 2", investment: 10000, currentValue: 18700, roi: 87 },
  { block: "Bloco 3", investment: 10000, currentValue: 10000, roi: 0 },
  { block: "Bloco 4", investment: 10000, currentValue: 10000, roi: 0 },
]

export default function CaptacaoPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [selectedBlock, setSelectedBlock] = useState(3)
  const [simulationAmount, setSimulationAmount] = useState(10000)

  // Countdown timer for active block
  useEffect(() => {
    const activeBlock = blocks.find((block) => block.status === "active")
    if (!activeBlock) return

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const endTime = activeBlock.endDate.getTime()
      const difference = endTime - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getBlockStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "upcoming":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getBlockIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Trophy className="h-4 w-4" />
      case "active":
        return <Flame className="h-4 w-4" />
      case "upcoming":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const activeBlock = blocks.find((block) => block.status === "active")
  const progressPercentage = activeBlock ? (activeBlock.raisedAmount / activeBlock.targetAmount) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Sistema de Captação por Blocos</h1>
          <p className="text-gray-600 mt-1">Invista em diferentes fases da empresa e acompanhe seu crescimento</p>
        </div>
        <Badge variant="outline" className="bg-orange-100 border-orange-300">
          <Zap className="h-4 w-4 mr-2" />4 Blocos Disponíveis
        </Badge>
      </div>

      {/* Alert Banner */}
      <Alert className="border-orange-200 bg-orange-50">
        <Flame className="h-4 w-4" />
        <AlertDescription className="font-medium">
          🔥 <strong>BLOCO ATIVO:</strong> Bloco Innovation com 25% de bônus Early Bird nas primeiras 48h!
        </AlertDescription>
      </Alert>

      {/* Active Block Countdown */}
      {activeBlock && (
        <Card className="card-premium bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Timer className="h-6 w-6" />
              {activeBlock.name} - Tempo Restante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{timeLeft.days}</div>
                <div className="text-sm text-blue-700">Dias</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{timeLeft.hours}</div>
                <div className="text-sm text-blue-700">Horas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{timeLeft.minutes}</div>
                <div className="text-sm text-blue-700">Minutos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{timeLeft.seconds}</div>
                <div className="text-sm text-blue-700">Segundos</div>
              </div>
            </div>

            {/* Progress with Visual Milestones */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Progresso: R$ {activeBlock.raisedAmount.toLocaleString()}</span>
                <span>Meta: R$ {activeBlock.targetAmount.toLocaleString()}</span>
              </div>
              <div className="relative">
                <Progress value={progressPercentage} className="h-4" />
                {/* Visual Milestones */}
                <div className="absolute top-0 left-1/4 w-0.5 h-4 bg-yellow-400"></div>
                <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-orange-400"></div>
                <div className="absolute top-0 left-3/4 w-0.5 h-4 bg-red-400"></div>

                {/* Milestone Labels */}
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {progressPercentage.toFixed(1)}% concluído • {activeBlock.investors.toLocaleString()} investidores
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Zap className="h-3 w-3 mr-1" />
                  Early Bird: +{activeBlock.earlyBirdBonus}%
                </Badge>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button className="btn-premium flex-1">
                <DollarSign className="h-4 w-4 mr-2" />
                Investir Agora
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Calculator className="h-4 w-4 mr-2" />
                Simular Investimento
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Tabs */}
      <Tabs defaultValue="blocks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="blocks" className="rounded-xl font-semibold">
            <Target className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Todos os Blocos</span>
          </TabsTrigger>
          <TabsTrigger value="simulator" className="rounded-xl font-semibold">
            <Calculator className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Simulador</span>
          </TabsTrigger>
          <TabsTrigger value="ranking" className="rounded-xl font-semibold">
            <Trophy className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Ranking</span>
          </TabsTrigger>
          <TabsTrigger value="roi" className="rounded-xl font-semibold">
            <TrendingUp className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">ROI Comparação</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blocks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {blocks.map((block) => (
              <Card key={block.id} className="card-premium card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getBlockIcon(block.status)}
                      {block.name}
                    </CardTitle>
                    <Badge className={getBlockStatusColor(block.status)}>
                      {block.status === "completed" && "Concluído"}
                      {block.status === "active" && "Ativo"}
                      {block.status === "upcoming" && "Em Breve"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>R$ {block.raisedAmount.toLocaleString()}</span>
                        <span>R$ {block.targetAmount.toLocaleString()}</span>
                      </div>
                      <Progress value={(block.raisedAmount / block.targetAmount) * 100} className="h-2" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">R$ {block.tokenPrice.toFixed(2)}</div>
                        <div className="text-xs text-gray-600">Preço Token</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          {block.roi > 0 ? `+${block.roi}%` : "0%"}
                        </div>
                        <div className="text-xs text-gray-600">ROI Atual</div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {block.investors.toLocaleString()} investidores
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {block.startDate.toLocaleDateString("pt-BR")}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {block.badges.map((badge) => (
                        <Badge key={badge} variant="outline" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Early Bird Bonus */}
                    {block.status === "active" && (
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <Flame className="h-4 w-4" />
                          <span className="font-semibold">Early Bird: +{block.earlyBirdBonus}% bônus</span>
                        </div>
                        <div className="text-xs text-yellow-700 mt-1">
                          Válido apenas nas primeiras 48 horas do bloco
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      className={`w-full ${
                        block.status === "active"
                          ? "btn-premium"
                          : block.status === "upcoming"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-green-100 text-green-800"
                      }`}
                      disabled={block.status !== "active"}
                    >
                      {block.status === "active" && (
                        <>
                          <DollarSign className="h-4 w-4 mr-2" />
                          Investir Agora
                        </>
                      )}
                      {block.status === "upcoming" && (
                        <>
                          <Clock className="h-4 w-4 mr-2" />
                          Em Breve
                        </>
                      )}
                      {block.status === "completed" && (
                        <>
                          <Trophy className="h-4 w-4 mr-2" />
                          Concluído
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulator" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-500" />
                Simulador: "Se tivesse investido no Bloco 1..."
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor do Investimento</label>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">R$</span>
                      <input
                        type="number"
                        value={simulationAmount}
                        onChange={(e) => setSimulationAmount(Number(e.target.value))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1000"
                        step="1000"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {blocks
                      .filter((block) => block.status === "completed")
                      .map((block) => {
                        const tokens = simulationAmount / block.tokenPrice
                        const currentValue = tokens * block.currentValue
                        const profit = currentValue - simulationAmount
                        const roi = ((currentValue - simulationAmount) / simulationAmount) * 100

                        return (
                          <div key={block.id} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                            <h3 className="font-semibold text-green-900 mb-2">{block.name}</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-600">Tokens recebidos:</div>
                                <div className="font-bold">{tokens.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Valor atual:</div>
                                <div className="font-bold text-green-600">R$ {currentValue.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Lucro:</div>
                                <div className="font-bold text-green-600">+R$ {profit.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-gray-600">ROI:</div>
                                <div className="font-bold text-green-600">+{roi.toFixed(1)}%</div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Comparação Visual</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={blocks
                        .filter((block) => block.status === "completed")
                        .map((block) => ({
                          name: block.name,
                          investimento: simulationAmount,
                          valorAtual: (simulationAmount / block.tokenPrice) * block.currentValue,
                        }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, ""]} />
                      <Bar dataKey="investimento" fill="#e5e7eb" name="Investimento" />
                      <Bar dataKey="valorAtual" fill="#10b981" name="Valor Atual" />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Análise</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Bloco Genesis teve o melhor desempenho (+220% ROI)</li>
                      <li>• Investidores early bird receberam bônus adicional</li>
                      <li>• Diversificação entre blocos reduz riscos</li>
                      <li>• Blocos anteriores já mostraram resultados</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ranking" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Ranking de Investidores - Bloco Innovation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investorRankings.map((investor, index) => (
                  <div
                    key={investor.name}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      investor.name === "Você"
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            index < 3 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {investor.position}
                        </div>
                        <div className="text-2xl">{investor.badge}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{investor.name}</h3>
                        <p className="text-sm text-gray-600">{investor.tokens.toLocaleString()} tokens</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">R$ {investor.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">investido</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">🏆 Benefícios do Ranking</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-yellow-800">Top 10</div>
                    <div className="text-yellow-700">Badge exclusivo + 5% bônus</div>
                  </div>
                  <div>
                    <div className="font-semibold text-orange-800">Top 50</div>
                    <div className="text-orange-700">Acesso antecipado + 3% bônus</div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-800">Top 100</div>
                    <div className="text-red-700">Newsletter exclusiva + 1% bônus</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ROI Comparison Chart */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Comparação de ROI por Bloco
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roiComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="block" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "ROI"]} />
                    <Bar dataKey="roi" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* ROI Details */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Detalhes de Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roiComparison.map((item, index) => {
                    const isPositive = item.roi > 0
                    return (
                      <div key={item.block} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold">{item.block}</h4>
                          <p className="text-sm text-gray-600">Investimento: R$ {item.investment.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">R$ {item.currentValue.toLocaleString()}</div>
                          <div
                            className={`flex items-center gap-1 text-sm ${
                              isPositive ? "text-green-600" : "text-gray-600"
                            }`}
                          >
                            {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                            {isPositive ? `+${item.roi}%` : `${item.roi}%`}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">📊 Estatísticas Gerais</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-green-700">ROI Médio:</div>
                      <div className="font-bold text-green-800">+76.75%</div>
                    </div>
                    <div>
                      <div className="text-green-700">Melhor Bloco:</div>
                      <div className="font-bold text-green-800">Genesis (+220%)</div>
                    </div>
                    <div>
                      <div className="text-green-700">Total Investido:</div>
                      <div className="font-bold text-green-800">R$ 40.000</div>
                    </div>
                    <div>
                      <div className="text-green-700">Valor Atual:</div>
                      <div className="font-bold text-green-800">R$ 70.700</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historical Performance */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Performance Histórica dos Blocos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={[
                    { month: "Jan", bloco1: 1.0, bloco2: 0, bloco3: 0 },
                    { month: "Fev", bloco1: 1.2, bloco2: 1.5, bloco3: 0 },
                    { month: "Mar", bloco1: 1.8, bloco2: 1.7, bloco3: 0 },
                    { month: "Abr", bloco1: 2.1, bloco2: 2.0, bloco3: 0 },
                    { month: "Mai", bloco1: 2.8, bloco2: 2.3, bloco3: 0 },
                    { month: "Jun", bloco1: 3.2, bloco2: 2.8, bloco3: 2.0 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value}`, "Valor do Token"]} />
                  <Line type="monotone" dataKey="bloco1" stroke="#10b981" strokeWidth={3} name="Bloco Genesis" />
                  <Line type="monotone" dataKey="bloco2" stroke="#2563eb" strokeWidth={3} name="Bloco Expansion" />
                  <Line type="monotone" dataKey="bloco3" stroke="#f59e0b" strokeWidth={3} name="Bloco Innovation" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Exclusive Badges Section */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Badges Exclusivos por Bloco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {blocks.map((block) => (
              <div key={block.id} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <h3 className="font-semibold mb-3">{block.name}</h3>
                <div className="space-y-2">
                  {block.badges.map((badge) => (
                    <Badge key={badge} variant="outline" className="w-full justify-start">
                      <Star className="h-3 w-3 mr-2" />
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  {block.status === "completed" && "✅ Disponível"}
                  {block.status === "active" && "🔥 Investindo agora"}
                  {block.status === "upcoming" && "⏳ Em breve"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
