"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  BarChart3,
  Zap,
  Coins,
  Crown,
  Gem,
  LucidePieChart,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { AnimatedCounter } from "@/components/epic-animations"
import { Trophy } from "lucide-react"

// Mock data for transparency dashboard
const realTimeMetrics = {
  usersOnline: 1247,
  dailyTransactions: 8934,
  monthlyRevenue: 2800000,
  systemUptime: 99.8,
  lastUpdated: new Date(),
}

const tokenData = {
  valorAtual: 4.75,
  marketCap: 47500000,
  totalSupply: 10000000,
  circulatingSupply: 6347500,
  holders: 2847,
  transacoes24h: 1247,
  variacao24h: 12.3,
}

const distribuicaoTokens = [
  { categoria: "Usuários Ativos", quantidade: 3247500, percentual: 32.5, cor: "#3B82F6" },
  { categoria: "Pool de Premiação", quantidade: 1500000, percentual: 15.0, cor: "#10B981" },
  { categoria: "Liquidez", quantidade: 2252500, percentual: 22.5, cor: "#EC4899" },
  { categoria: "Equipe & Fundadores", quantidade: 1000000, percentual: 10.0, cor: "#8B5CF6" },
  { categoria: "Marketing & Parcerias", quantidade: 800000, percentual: 8.0, cor: "#F59E0B" },
  { categoria: "Reserva Estratégica", quantidade: 700000, percentual: 7.0, cor: "#EF4444" },
  { categoria: "Desenvolvimento", quantidade: 500000, percentual: 5.0, cor: "#6B7280" },
]

const maioresHolders = [
  { posicao: 1, endereco: "0x1a2b...3c4d", tokens: 247500, percentual: 2.48, badge: "👑", tipo: "Fundador" },
  { posicao: 2, endereco: "0x5e6f...7g8h", tokens: 189300, percentual: 1.89, badge: "🥈", tipo: "Investidor" },
  { posicao: 3, endereco: "0x9i0j...1k2l", tokens: 156700, percentual: 1.57, badge: "🥉", tipo: "Whale" },
  { posicao: 4, endereco: "0x3m4n...5o6p", tokens: 134200, percentual: 1.34, badge: "💎", tipo: "Premium" },
  { posicao: 5, endereco: "0x7q8r...9s0t", tokens: 98500, percentual: 0.99, badge: "⭐", tipo: "Ativo" },
  { posicao: 6, endereco: "0xuvwx...yz12", tokens: 87300, percentual: 0.87, badge: "🔥", tipo: "Trader" },
  { posicao: 7, endereco: "0x3456...789a", tokens: 76800, percentual: 0.77, badge: "🚀", tipo: "HODLer" },
  { posicao: 8, endereco: "0xbcde...f012", tokens: 65400, percentual: 0.65, badge: "💪", tipo: "Ativo" },
  { posicao: 9, endereco: "0x3456...789b", tokens: 54700, percentual: 0.55, badge: "🎯", tipo: "Staker" },
  { posicao: 10, endereco: "0x789c...def0", tokens: 43200, percentual: 0.43, badge: "⚡", tipo: "Novo" },
]

const evolucaoJoias = [
  { nome: "Bronze", preco: 2000, variacao: "+5.2%", holders: 1247, volume24h: 45600, icone: "🥉" },
  { nome: "Prata", preco: 8500, variacao: "+12.8%", holders: 634, volume24h: 127300, icone: "🥈" },
  { nome: "Ouro", preco: 25000, variacao: "+8.4%", holders: 289, volume24h: 234500, icone: "🥇" },
  { nome: "Platina", preco: 75000, variacao: "+15.7%", holders: 97, volume24h: 456700, icone: "💎" },
  { nome: "Diamante", preco: 200000, variacao: "+23.1%", holders: 34, volume24h: 789200, icone: "💠" },
  { nome: "Titã", preco: 500000, variacao: "+31.4%", holders: 12, volume24h: 1234500, icone: "👑" },
]

const rankingColecionadores = [
  { posicao: 1, usuario: "CryptoKing", joias: 47, valor: 2847500, badge: "👑" },
  { posicao: 2, usuario: "DiamondHands", joias: 34, valor: 1923400, badge: "💎" },
  { posicao: 3, usuario: "GemCollector", joias: 28, valor: 1456700, badge: "💠" },
  { posicao: 4, usuario: "TokenMaster", joias: 23, valor: 1234500, badge: "🏆" },
  { posicao: 5, usuario: "InvestPro", joias: 19, valor: 987600, badge: "⭐" },
]

const distribuicaoReceitas = {
  total: 2847500,
  distribuicao: [
    { categoria: "Dividendos para Holders", valor: 1138000, percentual: 40, cor: "#10B981" },
    { categoria: "Pool de Premiação", valor: 854250, percentual: 30, cor: "#3B82F6" },
    { categoria: "Desenvolvimento", valor: 427125, percentual: 15, cor: "#8B5CF6" },
    { categoria: "Marketing", valor: 284750, percentual: 10, cor: "#F59E0B" },
    { categoria: "Reserva Operacional", valor: 142375, percentual: 5, cor: "#EF4444" },
  ],
}

const monthlyFinancials = [
  { month: "Jan", revenue: 2200000, costs: 1320000, profit: 880000, users: 5200 },
  { month: "Fev", revenue: 2400000, costs: 1440000, profit: 960000, users: 5650 },
  { month: "Mar", revenue: 2600000, costs: 1560000, profit: 1040000, users: 6100 },
  { month: "Abr", revenue: 2750000, costs: 1650000, profit: 1100000, users: 6400 },
  { month: "Mai", revenue: 2800000, costs: 1680000, profit: 1120000, users: 6800 },
  { month: "Jun", revenue: 2850000, costs: 1710000, profit: 1140000, users: 7200 },
]

export default function TransparenciaPage() {
  const [metrics, setMetrics] = useState(realTimeMetrics)
  const [activeTab, setActiveTab] = useState("token")

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        usersOnline: prev.usersOnline + Math.floor(Math.random() * 20 - 10),
        dailyTransactions: prev.dailyTransactions + Math.floor(Math.random() * 50 - 25),
        lastUpdated: new Date(),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Transparência Total
            </h1>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 mr-2" />
              100% Transparente
            </Badge>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe em tempo real todas as métricas do ecossistema Julius Investidor
          </p>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Online</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                <AnimatedCounter value={metrics.usersOnline} />
              </div>
              <p className="text-xs text-gray-600">Atualizado: {metrics.lastUpdated.toLocaleTimeString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transações Hoje</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                <AnimatedCounter value={metrics.dailyTransactions} />
              </div>
              <p className="text-xs text-gray-600">+12% vs ontem</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                R$ <AnimatedCounter value={metrics.monthlyRevenue / 1000000} suffix="M" />
              </div>
              <p className="text-xs text-gray-600">Meta: R$ 3M</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime Sistema</CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                <AnimatedCounter value={metrics.systemUptime} suffix="%" />
              </div>
              <p className="text-xs text-gray-600">Últimos 30 dias</p>
            </CardContent>
          </Card>
        </div>

        {/* Token Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4 text-center">
              <Coins className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">
                R$ <AnimatedCounter value={tokenData.valorAtual} />
              </div>
              <p className="text-sm text-gray-600">Valor do Token</p>
              <Badge className="bg-green-100 text-green-800 text-xs mt-1">+{tokenData.variacao24h}%</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-indigo-600">
                R$ <AnimatedCounter value={tokenData.marketCap / 1000000} suffix="M" />
              </div>
              <p className="text-sm text-gray-600">Market Cap</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-600">
                <AnimatedCounter value={tokenData.holders} />
              </div>
              <p className="text-sm text-gray-600">Total Holders</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 text-teal-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-teal-600">
                <AnimatedCounter value={tokenData.transacoes24h} />
              </div>
              <p className="text-sm text-gray-600">Transações 24h</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Transparency Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
            <TabsTrigger value="token" className="rounded-xl font-semibold">
              <Coins className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Token</span>
            </TabsTrigger>
            <TabsTrigger value="joias" className="rounded-xl font-semibold">
              <Gem className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Joias</span>
            </TabsTrigger>
            <TabsTrigger value="financials" className="rounded-xl font-semibold">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Financeiro</span>
            </TabsTrigger>
            <TabsTrigger value="receitas" className="rounded-xl font-semibold">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Receitas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="token" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Distribuição de Tokens */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LucidePieChart className="h-5 w-5 text-blue-500" />
                    Distribuição de Tokens
                  </CardTitle>
                  <CardDescription>Como os 10M de tokens estão distribuídos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {distribuicaoTokens.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.cor }} />
                            <span className="font-medium text-sm">{item.categoria}</span>
                          </div>
                          <span className="text-sm text-gray-600">{item.percentual}%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{item.quantidade.toLocaleString()} tokens</span>
                          <span>R$ {((item.quantidade * tokenData.valorAtual) / 1000000).toFixed(1)}M</span>
                        </div>
                        <Progress value={item.percentual} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Maiores Holders */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Top 10 Holders
                  </CardTitle>
                  <CardDescription>Distribuição saudável e democrática</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {maioresHolders.map((holder) => (
                      <div
                        key={holder.posicao}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{holder.badge}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">#{holder.posicao}</span>
                              <Badge className="text-xs bg-blue-100 text-blue-800">{holder.tipo}</Badge>
                            </div>
                            <div className="text-xs text-gray-500 font-mono">{holder.endereco}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{holder.tokens.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">{holder.percentual}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Descentralização:</strong> Os top 10 holders possuem apenas 11.54% do total, garantindo
                      uma distribuição saudável.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="joias" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Evolução das Joias */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gem className="h-5 w-5 text-purple-500" />
                    Evolução das Joias
                  </CardTitle>
                  <CardDescription>Preços e volume de negociação em tempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {evolucaoJoias.map((joia, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{joia.icone}</div>
                          <div>
                            <h3 className="font-semibold text-lg">{joia.nome}</h3>
                            <p className="text-sm text-gray-500">{joia.holders} holders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            <AnimatedCounter value={joia.preco} /> tokens
                          </div>
                          <div
                            className={`text-sm ${joia.variacao.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                          >
                            {joia.variacao} (24h)
                          </div>
                          <div className="text-xs text-gray-500">
                            Vol: <AnimatedCounter value={joia.volume24h} /> tokens
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ranking de Colecionadores */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-gold-500" />
                    Ranking de Colecionadores
                  </CardTitle>
                  <CardDescription>Maiores colecionadores de joias da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rankingColecionadores.map((colecionador) => (
                      <div
                        key={colecionador.posicao}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{colecionador.badge}</div>
                          <div>
                            <div className="font-semibold">
                              #{colecionador.posicao} {colecionador.usuario}
                            </div>
                            <div className="text-sm text-gray-500">{colecionador.joias} joias</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            R$ <AnimatedCounter value={colecionador.valor / 1000} suffix="K" />
                          </div>
                          <div className="text-xs text-gray-500">Valor total</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle>Receita, Custos e Lucro</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyFinancials}>
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

              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle>Crescimento de Usuários</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyFinancials}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${Number(value).toLocaleString()}`, "Usuários"]} />
                      <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fill="url(#colorUsers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="receitas" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Distribuição de Receitas (Mensal)
                </CardTitle>
                <CardDescription>Como utilizamos os R$ 2.8M mensais de receita</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Resumo */}
                  <div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 Receita Total Mensal</h3>
                      <div className="text-3xl font-bold text-green-600">
                        R$ <AnimatedCounter value={distribuicaoReceitas.total} />
                      </div>
                      <p className="text-gray-600 text-sm mt-2">Baseado no volume atual da plataforma</p>
                    </div>
                    {/* Breakdown */}
                    <div className="space-y-3">
                      {distribuicaoReceitas.distribuicao.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.cor }} />
                            <span className="font-medium">{item.categoria}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              R$ <AnimatedCounter value={item.valor} />
                            </div>
                            <div className="text-sm text-gray-500">{item.percentual}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Simulador de Participação */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Sua Participação nos Lucros</h3>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>Seus Tokens:</span>
                        <span className="font-semibold">2.500 BILLION</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>% do Total:</span>
                        <span className="font-semibold">0.025%</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Dividendo Mensal:</span>
                        <span className="font-semibold text-green-600">R$ 284,50</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Dividendo Anual:</span>
                        <span className="font-semibold text-green-600">R$ 3.414,00</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Para Aumentar seus Dividendos:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Complete mais missões diárias (+tokens)</li>
                        <li>• Participe de clubes de investimento</li>
                        <li>• Mantenha streaks longos (bônus)</li>
                        <li>• Convide amigos (comissão de indicação)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer com Avisos */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-yellow-800">⚠️ Importante: Valores Simulados</h3>
                <p className="text-yellow-700 text-sm">
                  Todos os valores apresentados são fictícios e servem apenas para demonstração das funcionalidades da
                  plataforma. Em uma implementação real, estes dados seriam conectados a APIs reais e sistemas de
                  blockchain.
                </p>
                <ul className="text-yellow-700 space-y-1 text-sm mt-3">
                  <li>
                    • <strong>Tokens:</strong> Representariam uma criptomoeda real com valor de mercado
                  </li>
                  <li>
                    • <strong>Joias:</strong> Seriam NFTs únicos com valor real de colecionador
                  </li>
                  <li>
                    • <strong>Dividendos:</strong> Distribuição real de lucros para holders
                  </li>
                  <li>
                    • <strong>Transparência:</strong> Dados auditáveis em blockchain público
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
