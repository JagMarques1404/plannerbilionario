"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, Eye, Copy, UserPlus, UserMinus } from "lucide-react"
import { SocialTradingCardSkeleton } from "@/components/loading-skeleton"

interface Trader {
  id: string
  name: string
  username: string
  avatar: string
  verified: boolean
  followers: number
  following: number
  totalReturn: number
  monthlyReturn: number
  winRate: number
  riskScore: number
  copiers: number
  aum: number
  experience: number
  strategy: string
  topAssets: string[]
  isFollowing: boolean
  isCopying: boolean
  lastActive: string
  joinDate: string
}

const mockTraders: Trader[] = [
  {
    id: "1",
    name: "Carlos Silva",
    username: "carlos_trader",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    followers: 2847,
    following: 156,
    totalReturn: 24.5,
    monthlyReturn: 3.2,
    winRate: 68,
    riskScore: 6,
    copiers: 1240,
    aum: 850000,
    experience: 5,
    strategy: "Growth Stocks",
    topAssets: ["PETR4", "VALE3", "ITUB4"],
    isFollowing: true,
    isCopying: false,
    lastActive: "2 horas atrás",
    joinDate: "2019-03-15",
  },
  {
    id: "2",
    name: "Ana Investidora",
    username: "ana_dividendos",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    followers: 1923,
    following: 89,
    totalReturn: 18.7,
    monthlyReturn: 2.1,
    winRate: 72,
    riskScore: 4,
    copiers: 856,
    aum: 620000,
    experience: 7,
    strategy: "Dividend Focus",
    topAssets: ["BBDC4", "ITSA4", "TAEE11"],
    isFollowing: false,
    isCopying: false,
    lastActive: "1 hora atrás",
    joinDate: "2017-08-22",
  },
  {
    id: "3",
    name: "Pedro Tech",
    username: "pedro_tech_stocks",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: false,
    followers: 1456,
    following: 234,
    totalReturn: 31.2,
    monthlyReturn: 4.8,
    winRate: 65,
    riskScore: 8,
    copiers: 567,
    aum: 420000,
    experience: 3,
    strategy: "Tech Growth",
    topAssets: ["MGLU3", "B3SA3", "POSI3"],
    isFollowing: false,
    isCopying: true,
    lastActive: "30 minutos atrás",
    joinDate: "2021-01-10",
  },
  {
    id: "4",
    name: "Maria Conservadora",
    username: "maria_rf",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    followers: 3421,
    following: 67,
    totalReturn: 12.3,
    monthlyReturn: 1.8,
    winRate: 78,
    riskScore: 3,
    copiers: 2134,
    aum: 1200000,
    experience: 8,
    strategy: "Conservative",
    topAssets: ["SELIC", "IPCA+", "LTN"],
    isFollowing: true,
    isCopying: true,
    lastActive: "4 horas atrás",
    joinDate: "2016-05-30",
  },
]

export default function SocialTradingPage() {
  const [traders, setTraders] = useState<Trader[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStrategy, setSelectedStrategy] = useState("all")
  const [sortBy, setSortBy] = useState("return")

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setTraders(mockTraders)
      setLoading(false)
    }, 1500)
  }, [])

  const filteredTraders = traders
    .filter((trader) => {
      const matchesSearch =
        trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trader.username.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStrategy =
        selectedStrategy === "all" || trader.strategy.toLowerCase().includes(selectedStrategy.toLowerCase())
      return matchesSearch && matchesStrategy
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "return":
          return b.totalReturn - a.totalReturn
        case "followers":
          return b.followers - a.followers
        case "winrate":
          return b.winRate - a.winRate
        case "aum":
          return b.aum - a.aum
        default:
          return 0
      }
    })

  const getRiskColor = (risk: number) => {
    if (risk <= 3) return "bg-green-100 text-green-800"
    if (risk <= 6) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getRiskLabel = (risk: number) => {
    if (risk <= 3) return "Baixo"
    if (risk <= 6) return "Médio"
    return "Alto"
  }

  if (loading) {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SocialTradingCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="text-2xl">👥</div>
          <h1 className="text-2xl font-bold text-gray-900">Social Trading</h1>
        </div>
        <p className="text-base text-gray-600">Siga e copie as estratégias dos melhores investidores</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{traders.filter((t) => t.isFollowing).length}</div>
            <div className="text-sm text-gray-600">Seguindo</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{traders.filter((t) => t.isCopying).length}</div>
            <div className="text-sm text-gray-600">Copiando</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {traders.reduce((sum, t) => (t.isCopying ? sum + t.monthlyReturn : sum), 0).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Retorno Médio</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">
              R$ {(traders.reduce((sum, t) => (t.isCopying ? sum + t.aum * 0.1 : sum), 0) / 1000).toFixed(0)}k
            </div>
            <div className="text-sm text-gray-600">Capital Copiado</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar traders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base border-gray-300 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>
            <select
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(e.target.value)}
              className="h-12 px-4 border border-gray-300 rounded-lg text-base focus:border-orange-400 focus:ring-orange-400 bg-white"
            >
              <option value="all">Todas as estratégias</option>
              <option value="growth">Growth Stocks</option>
              <option value="dividend">Dividend Focus</option>
              <option value="tech">Tech Growth</option>
              <option value="conservative">Conservative</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 border border-gray-300 rounded-lg text-base focus:border-orange-400 focus:ring-orange-400 bg-white"
            >
              <option value="return">Maior Retorno</option>
              <option value="followers">Mais Seguidores</option>
              <option value="winrate">Maior Win Rate</option>
              <option value="aum">Maior AUM</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Traders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTraders.map((trader) => (
          <Card
            key={trader.id}
            className="bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
                      <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                        {trader.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {trader.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                        <Star className="h-3 w-3 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900">{trader.name}</h3>
                    <p className="text-sm text-gray-600">@{trader.username}</p>
                    <Badge className="text-xs bg-gray-100 text-gray-800">{trader.strategy}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${trader.totalReturn >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {trader.totalReturn >= 0 ? "+" : ""}
                    {trader.totalReturn}%
                  </div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-base font-semibold text-gray-900">{trader.followers}</div>
                  <div className="text-sm text-gray-600">Seguidores</div>
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-900">{trader.winRate}%</div>
                  <div className="text-sm text-gray-600">Win Rate</div>
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-900">{trader.copiers}</div>
                  <div className="text-sm text-gray-600">Copiadores</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Retorno Mensal</span>
                  <span
                    className={`text-sm font-semibold ${trader.monthlyReturn >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {trader.monthlyReturn >= 0 ? "+" : ""}
                    {trader.monthlyReturn}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Risco</span>
                  <Badge className={getRiskColor(trader.riskScore)}>{getRiskLabel(trader.riskScore)}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AUM</span>
                  <span className="text-sm font-semibold text-gray-900">R$ {(trader.aum / 1000).toFixed(0)}k</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Top Ativos:</h4>
                <div className="flex flex-wrap gap-1">
                  {trader.topAssets.map((asset, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-600">
                      {asset}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={trader.isFollowing ? "outline" : "default"}
                    className={
                      trader.isFollowing
                        ? "border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        : "bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    }
                  >
                    {trader.isFollowing ? (
                      <>
                        <UserMinus className="h-4 w-4 mr-1" />
                        Seguindo
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-1" />
                        Seguir
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    className={
                      trader.isCopying
                        ? "bg-green-500 hover:bg-green-600 text-white font-medium"
                        : "bg-orange-400 hover:bg-orange-500 text-white font-medium"
                    }
                  >
                    {trader.isCopying ? (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copiando
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                Ativo {trader.lastActive} • Membro desde {new Date(trader.joinDate).getFullYear()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTraders.length === 0 && (
        <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum trader encontrado</h3>
            <p className="text-base text-gray-600 mb-6">Tente ajustar seus filtros de busca</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedStrategy("all")
              }}
              className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-3"
            >
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
