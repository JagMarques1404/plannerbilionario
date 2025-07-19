"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, Copy, Eye, DollarSign, Award, Search, Filter, UserPlus, Activity } from "lucide-react"

const topTraders = [
  {
    id: "1",
    name: "Carlos Mendes",
    username: "@carlosm_trader",
    avatar: "/placeholder.svg?height=60&width=60&text=CM",
    followers: 2847,
    copiers: 156,
    totalReturn: 45.8,
    monthlyReturn: 12.3,
    winRate: 78,
    riskScore: 6,
    verified: true,
    strategies: ["Day Trade", "Swing Trade", "Opções"],
    recentTrades: [
      { symbol: "PETR4", action: "BUY", profit: 8.5, time: "2h" },
      { symbol: "VALE3", action: "SELL", profit: -2.1, time: "4h" },
      { symbol: "ITUB4", action: "BUY", profit: 5.2, time: "1d" },
    ],
  },
  {
    id: "2",
    name: "Ana Rodrigues",
    username: "@ana_investments",
    avatar: "/placeholder.svg?height=60&width=60&text=AR",
    followers: 1923,
    copiers: 89,
    totalReturn: 38.2,
    monthlyReturn: 9.7,
    winRate: 82,
    riskScore: 4,
    verified: true,
    strategies: ["Long Term", "Dividendos", "FIIs"],
    recentTrades: [
      { symbol: "BBDC4", action: "BUY", profit: 3.8, time: "1d" },
      { symbol: "HGLG11", action: "BUY", profit: 2.5, time: "2d" },
      { symbol: "TAEE11", action: "HOLD", profit: 1.2, time: "3d" },
    ],
  },
  {
    id: "3",
    name: "Roberto Silva",
    username: "@roberto_crypto",
    avatar: "/placeholder.svg?height=60&width=60&text=RS",
    followers: 3421,
    copiers: 234,
    totalReturn: 67.3,
    monthlyReturn: 18.9,
    winRate: 65,
    riskScore: 8,
    verified: true,
    strategies: ["Crypto", "DeFi", "NFTs"],
    recentTrades: [
      { symbol: "BTC", action: "BUY", profit: 15.2, time: "3h" },
      { symbol: "ETH", action: "SELL", profit: 8.7, time: "6h" },
      { symbol: "SOL", action: "BUY", profit: 22.1, time: "1d" },
    ],
  },
]

const myPortfolio = {
  totalValue: 125000,
  totalReturn: 23.5,
  monthlyReturn: 8.2,
  copiedTrades: 47,
  activeCopies: 12,
  followedTraders: 8,
}

const recentActivity = [
  {
    type: "copy",
    trader: "Carlos Mendes",
    action: "Copiou compra de PETR4",
    amount: "R$ 2.500",
    profit: 8.5,
    time: "2h atrás",
  },
  {
    type: "follow",
    trader: "Marina Costa",
    action: "Começou a seguir",
    amount: "",
    profit: 0,
    time: "4h atrás",
  },
  {
    type: "copy",
    trader: "Ana Rodrigues",
    action: "Copiou compra de BBDC4",
    amount: "R$ 1.800",
    profit: 3.8,
    time: "1d atrás",
  },
  {
    type: "profit",
    trader: "Roberto Silva",
    action: "Lucro em BTC",
    amount: "R$ 3.200",
    profit: 15.2,
    time: "1d atrás",
  },
]

export default function SocialTradingPage() {
  const [selectedTab, setSelectedTab] = useState("discover")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Social Trading</h1>
          <p className="text-gray-600 text-lg">Siga e copie as estratégias dos melhores traders</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-lg">
            🏖️ MODO SANDBOX
          </Badge>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Valor Total</CardTitle>
            <DollarSign className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">R$ {myPortfolio.totalValue.toLocaleString()}</div>
            <p className="text-sm opacity-90">+{myPortfolio.totalReturn}% total</p>
          </CardContent>
        </Card>

        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Retorno Mensal</CardTitle>
            <TrendingUp className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">+{myPortfolio.monthlyReturn}%</div>
            <p className="text-sm opacity-90">{myPortfolio.copiedTrades} trades copiados</p>
          </CardContent>
        </Card>

        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Cópias Ativas</CardTitle>
            <Copy className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{myPortfolio.activeCopies}</div>
            <p className="text-sm opacity-90">De {myPortfolio.followedTraders} traders</p>
          </CardContent>
        </Card>

        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Seguindo</CardTitle>
            <Users className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{myPortfolio.followedTraders}</div>
            <p className="text-sm opacity-90">Traders experientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="discover" className="rounded-xl font-semibold">
            Descobrir
          </TabsTrigger>
          <TabsTrigger value="following" className="rounded-xl font-semibold">
            Seguindo
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="rounded-xl font-semibold">
            Meu Portfólio
          </TabsTrigger>
          <TabsTrigger value="activity" className="rounded-xl font-semibold">
            Atividade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {/* Search and Filters */}
          <Card className="card-premium border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar traders por nome ou estratégia..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-xl border-gray-200 focus:border-blue-500"
                  />
                </div>
                <Button variant="outline" className="rounded-xl bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Traders */}
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Top Traders
              </CardTitle>
              <CardDescription>Os traders com melhor performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {topTraders.map((trader) => (
                <div
                  key={trader.id}
                  className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={trader.avatar || "/placeholder.svg"}
                        alt={trader.name}
                        className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-900 text-lg">{trader.name}</h3>
                          {trader.verified && <Badge className="bg-blue-500 text-white text-xs">✓ Verificado</Badge>}
                        </div>
                        <p className="text-gray-600">{trader.username}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>{trader.followers.toLocaleString()} seguidores</span>
                          <span>{trader.copiers} copiadores</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        Seguir
                      </Button>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                        <Copy className="h-4 w-4 mr-1" />
                        Copiar
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-white rounded-xl">
                      <div className="text-2xl font-bold text-green-600">+{trader.totalReturn}%</div>
                      <div className="text-xs text-gray-600">Retorno Total</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">+{trader.monthlyReturn}%</div>
                      <div className="text-xs text-gray-600">Retorno Mensal</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{trader.winRate}%</div>
                      <div className="text-xs text-gray-600">Taxa de Acerto</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-xl">
                      <div className="flex items-center justify-center space-x-1">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < trader.riskScore ? "bg-red-500" : "bg-gray-200"}`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">Risco {trader.riskScore}/10</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Estratégias</h4>
                      <div className="flex space-x-2">
                        {trader.strategies.map((strategy, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {strategy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Trades Recentes</h4>
                      <div className="space-y-1">
                        {trader.recentTrades.slice(0, 3).map((trade, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            <span className="font-medium">{trade.symbol}</span>
                            <span className={`${trade.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {trade.profit >= 0 ? "+" : ""}
                              {trade.profit}%
                            </span>
                            <span className="text-gray-500">{trade.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="following" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <UserPlus className="h-5 w-5 mr-2 text-blue-500" />
                Traders que Você Segue
              </CardTitle>
              <CardDescription>Acompanhe o desempenho dos seus traders favoritos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Você ainda não segue nenhum trader</h3>
                <p className="text-gray-600 mb-4">Explore a aba "Descobrir" para encontrar traders interessantes</p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl">Descobrir Traders</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Copy className="h-5 w-5 mr-2 text-green-500" />
                Portfólio de Copy Trading
              </CardTitle>
              <CardDescription>Suas posições copiadas e performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Copy className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma posição copiada ainda</h3>
                <p className="text-gray-600 mb-4">Comece a copiar traders para ver suas posições aqui</p>
                <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl">Começar a Copiar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple-500" />
                Atividade Recente
              </CardTitle>
              <CardDescription>Histórico das suas ações de social trading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === "copy"
                          ? "bg-blue-100"
                          : activity.type === "follow"
                            ? "bg-green-100"
                            : "bg-yellow-100"
                      }`}
                    >
                      {activity.type === "copy" ? (
                        <Copy className="h-5 w-5 text-blue-600" />
                      ) : activity.type === "follow" ? (
                        <UserPlus className="h-5 w-5 text-green-600" />
                      ) : (
                        <DollarSign className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{activity.trader}</p>
                      <p className="text-gray-600 text-sm">{activity.action}</p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && <p className="font-semibold text-gray-900">{activity.amount}</p>}
                    {activity.profit !== 0 && (
                      <p className={`text-sm ${activity.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {activity.profit >= 0 ? "+" : ""}
                        {activity.profit}%
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
