"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  TrendingUp,
  TrendingDown,
  Copy,
  Eye,
  Award,
  BarChart3,
  AlertTriangle,
  Play,
  Pause,
  Settings,
} from "lucide-react"

interface Trader {
  id: string
  name: string
  avatar: string
  verified: boolean
  followers: number
  copiers: number
  totalReturn: number
  monthlyReturn: number
  winRate: number
  riskScore: number
  minInvestment: number
  strategy: string
  assets: string[]
  description: string
  isFollowing: boolean
  isCopying: boolean
}

interface Trade {
  id: string
  traderId: string
  traderName: string
  asset: string
  type: "buy" | "sell"
  amount: number
  price: number
  timestamp: string
  profit?: number
  status: "open" | "closed" | "pending"
}

const mockTraders: Trader[] = [
  {
    id: "1",
    name: "Carlos Investidor",
    avatar: "/placeholder.svg?height=40&width=40&text=CI",
    verified: true,
    followers: 2450,
    copiers: 180,
    totalReturn: 45.8,
    monthlyReturn: 8.2,
    winRate: 78,
    riskScore: 6,
    minInvestment: 1000,
    strategy: "Growth Stocks",
    assets: ["PETR4", "VALE3", "ITUB4"],
    description: "Especialista em ações de valor com foco em dividendos",
    isFollowing: true,
    isCopying: false,
  },
  {
    id: "2",
    name: "Ana Crypto",
    avatar: "/placeholder.svg?height=40&width=40&text=AC",
    verified: true,
    followers: 1890,
    copiers: 95,
    totalReturn: 125.4,
    monthlyReturn: 15.6,
    winRate: 65,
    riskScore: 8,
    minInvestment: 500,
    strategy: "Crypto Swing",
    assets: ["BTC", "ETH", "ADA"],
    description: "Trading de criptomoedas com análise técnica avançada",
    isFollowing: false,
    isCopying: true,
  },
  {
    id: "3",
    name: "Roberto FII",
    avatar: "/placeholder.svg?height=40&width=40&text=RF",
    verified: false,
    followers: 850,
    copiers: 45,
    totalReturn: 28.3,
    monthlyReturn: 2.1,
    winRate: 85,
    riskScore: 3,
    minInvestment: 2000,
    strategy: "Real Estate",
    assets: ["HGLG11", "XPML11", "KNRI11"],
    description: "Investimentos em fundos imobiliários de alta qualidade",
    isFollowing: false,
    isCopying: false,
  },
]

const mockTrades: Trade[] = [
  {
    id: "1",
    traderId: "1",
    traderName: "Carlos Investidor",
    asset: "PETR4",
    type: "buy",
    amount: 100,
    price: 32.45,
    timestamp: "2024-01-20T14:30:00",
    status: "open",
  },
  {
    id: "2",
    traderId: "2",
    traderName: "Ana Crypto",
    asset: "BTC",
    type: "sell",
    amount: 0.1,
    price: 42500,
    timestamp: "2024-01-20T13:15:00",
    profit: 850,
    status: "closed",
  },
  {
    id: "3",
    traderId: "1",
    traderName: "Carlos Investidor",
    asset: "VALE3",
    type: "buy",
    amount: 50,
    price: 65.2,
    timestamp: "2024-01-20T11:45:00",
    status: "pending",
  },
]

export default function SocialTradingPage() {
  const [traders, setTraders] = useState<Trader[]>(mockTraders)
  const [trades] = useState<Trade[]>(mockTrades)
  const [selectedTab, setSelectedTab] = useState("discover")

  const toggleFollow = (traderId: string) => {
    setTraders((prev) =>
      prev.map((trader) => (trader.id === traderId ? { ...trader, isFollowing: !trader.isFollowing } : trader)),
    )
  }

  const toggleCopy = (traderId: string) => {
    setTraders((prev) =>
      prev.map((trader) => (trader.id === traderId ? { ...trader, isCopying: !trader.isCopying } : trader)),
    )
  }

  const getRiskColor = (score: number) => {
    if (score <= 3) return "bg-green-100 text-green-800"
    if (score <= 6) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getRiskText = (score: number) => {
    if (score <= 3) return "Baixo"
    if (score <= 6) return "Médio"
    return "Alto"
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Social Trading</h1>
          <p className="text-gray-600 text-lg">Siga e copie os melhores traders (modo simulado)</p>
        </div>
        <Badge className="bg-red-500 text-white px-4 py-2">
          <AlertTriangle className="h-4 w-4 mr-2" />
          MODO SIMULADO
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Seguindo</p>
                <p className="text-3xl font-bold text-gray-900">{traders.filter((t) => t.isFollowing).length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Copiando</p>
                <p className="text-3xl font-bold text-gray-900">{traders.filter((t) => t.isCopying).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Copy className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Retorno Total</p>
                <p className="text-3xl font-bold text-green-600">+24.5%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trades Ativos</p>
                <p className="text-3xl font-bold text-gray-900">{trades.filter((t) => t.status === "open").length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="discover" className="rounded-xl font-semibold">
            Descobrir
          </TabsTrigger>
          <TabsTrigger value="following" className="rounded-xl font-semibold">
            Seguindo
          </TabsTrigger>
          <TabsTrigger value="copying" className="rounded-xl font-semibold">
            Copiando
          </TabsTrigger>
          <TabsTrigger value="trades" className="rounded-xl font-semibold">
            Meus Trades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {traders.map((trader) => (
              <Card key={trader.id} className="card-premium border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
                        <AvatarFallback>
                          {trader.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{trader.name}</h3>
                          {trader.verified && (
                            <Badge className="bg-blue-500 text-white text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Verificado
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{trader.strategy}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">{trader.description}</p>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">+{trader.totalReturn}%</div>
                      <div className="text-xs text-gray-600">Retorno Total</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{trader.winRate}%</div>
                      <div className="text-xs text-gray-600">Taxa de Acerto</div>
                    </div>
                  </div>

                  {/* Risk and Investment */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Risco:</span>
                      <Badge className={getRiskColor(trader.riskScore)}>{getRiskText(trader.riskScore)}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Mín. Investimento:</span>
                      <span className="font-medium">R$ {trader.minInvestment.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Social Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{trader.followers} seguidores</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Copy className="h-4 w-4" />
                      <span>{trader.copiers} copiando</span>
                    </div>
                  </div>

                  {/* Assets */}
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Principais ativos:</div>
                    <div className="flex flex-wrap gap-1">
                      {trader.assets.map((asset) => (
                        <Badge key={asset} variant="outline" className="text-xs">
                          {asset}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant={trader.isFollowing ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFollow(trader.id)}
                      className="flex-1"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      {trader.isFollowing ? "Seguindo" : "Seguir"}
                    </Button>
                    <Button
                      variant={trader.isCopying ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCopy(trader.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      {trader.isCopying ? "Copiando" : "Copiar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {traders
              .filter((trader) => trader.isFollowing)
              .map((trader) => (
                <Card key={trader.id} className="card-premium border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
                          <AvatarFallback>
                            {trader.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-semibold text-gray-900">{trader.name}</h3>
                            {trader.verified && <Badge className="bg-blue-500 text-white">Verificado</Badge>}
                          </div>
                          <p className="text-gray-600 mb-2">{trader.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>
                              Retorno mensal:{" "}
                              <span className="font-medium text-green-600">+{trader.monthlyReturn}%</span>
                            </span>
                            <span>
                              Seguidores: <span className="font-medium">{trader.followers}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleCopy(trader.id)}
                          className={trader.isCopying ? "bg-green-500 text-white" : "bg-transparent"}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {trader.isCopying ? "Copiando" : "Copiar Trades"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleFollow(trader.id)}
                          className="bg-transparent"
                        >
                          Deixar de Seguir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            {traders.filter((trader) => trader.isFollowing).length === 0 && (
              <Card className="card-premium border-0">
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum trader seguido</h3>
                  <p className="text-gray-600 mb-4">Comece seguindo traders na aba "Descobrir"</p>
                  <Button onClick={() => setSelectedTab("discover")}>Descobrir Traders</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="copying" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {traders
              .filter((trader) => trader.isCopying)
              .map((trader) => (
                <Card key={trader.id} className="card-premium border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
                          <AvatarFallback>
                            {trader.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{trader.name}</h3>
                          <p className="text-sm text-gray-600">{trader.strategy}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">
                          <Play className="h-3 w-3 mr-1" />
                          Ativo
                        </Badge>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Settings className="h-4 w-4 mr-1" />
                          Configurar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleCopy(trader.id)}
                          className="bg-transparent text-red-600 hover:text-red-700"
                        >
                          <Pause className="h-4 w-4 mr-1" />
                          Parar
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">R$ 5.250</div>
                        <div className="text-xs text-gray-600">Valor Copiado</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">+12.5%</div>
                        <div className="text-xs text-gray-600">Retorno</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">8</div>
                        <div className="text-xs text-gray-600">Trades Copiados</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">75%</div>
                        <div className="text-xs text-gray-600">Taxa Sucesso</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Configurações de Cópia:</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Valor por trade:</span>
                          <span className="font-medium ml-2">R$ 500</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Stop Loss:</span>
                          <span className="font-medium ml-2">-5%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Take Profit:</span>
                          <span className="font-medium ml-2">+15%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Max trades/dia:</span>
                          <span className="font-medium ml-2">3</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            {traders.filter((trader) => trader.isCopying).length === 0 && (
              <Card className="card-premium border-0">
                <CardContent className="p-12 text-center">
                  <Copy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum trader sendo copiado</h3>
                  <p className="text-gray-600 mb-4">Comece copiando traders para automatizar seus investimentos</p>
                  <Button onClick={() => setSelectedTab("discover")}>Encontrar Traders para Copiar</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="trades" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle>Histórico de Trades</CardTitle>
              <CardDescription>Todos os trades executados via copy trading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          trade.type === "buy" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {trade.type === "buy" ? (
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {trade.type === "buy" ? "Compra" : "Venda"} - {trade.asset}
                        </div>
                        <div className="text-sm text-gray-600">Copiado de {trade.traderName}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {trade.amount} x R$ {trade.price.toLocaleString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            trade.status === "open"
                              ? "bg-blue-100 text-blue-800"
                              : trade.status === "closed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {trade.status === "open" ? "Aberto" : trade.status === "closed" ? "Fechado" : "Pendente"}
                        </Badge>
                        {trade.profit && (
                          <span
                            className={`text-sm font-medium ${trade.profit > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {trade.profit > 0 ? "+" : ""}R$ {trade.profit.toLocaleString()}
                          </span>
                        )}
                      </div>
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
