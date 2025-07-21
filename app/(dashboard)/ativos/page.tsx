"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Building2,
  TrendingUp,
  Users,
  MapPin,
  Bed,
  Car,
  DollarSign,
  PieChart,
  BarChart3,
  Trophy,
  Target,
  Gem,
  Coins,
} from "lucide-react"

// Dados dos imóveis virtuais
const virtualProperties = [
  {
    id: 1,
    name: "Apartamento Copacabana Premium",
    type: "Residencial",
    location: "Rio de Janeiro, RJ",
    price: 850000,
    monthlyRent: 6200,
    yield: 8.7,
    occupancy: 100,
    area: 120,
    bedrooms: 3,
    parking: 2,
    minInvestment: 2500,
    investors: 340,
    image: "/placeholder.svg?height=200&width=300&text=Copacabana",
    features: ["Vista para o mar", "Mobiliado", "Portaria 24h", "Academia"],
    roi12m: 15.2,
  },
  {
    id: 2,
    name: "Casa Alphaville Residencial",
    type: "Casa",
    location: "São Paulo, SP",
    price: 1200000,
    monthlyRent: 7800,
    yield: 7.8,
    occupancy: 95,
    area: 280,
    bedrooms: 4,
    parking: 4,
    minInvestment: 5000,
    investors: 240,
    image: "/placeholder.svg?height=200&width=300&text=Alphaville",
    features: ["Condomínio fechado", "Piscina", "Churrasqueira", "Jardim"],
    roi12m: 12.4,
  },
  {
    id: 3,
    name: "Loja Shopping Center",
    type: "Comercial",
    location: "Belo Horizonte, MG",
    price: 450000,
    monthlyRent: 3900,
    yield: 10.4,
    occupancy: 90,
    area: 85,
    bedrooms: 0,
    parking: 0,
    minInvestment: 1000,
    investors: 890,
    image: "/placeholder.svg?height=200&width=300&text=Shopping",
    features: ["Alto fluxo", "Âncora forte", "Estacionamento", "Praça alimentação"],
    roi12m: 18.7,
  },
  {
    id: 4,
    name: "Sala Comercial Faria Lima",
    type: "Comercial",
    location: "São Paulo, SP",
    price: 680000,
    monthlyRent: 4200,
    yield: 7.4,
    occupancy: 100,
    area: 95,
    bedrooms: 0,
    parking: 2,
    minInvestment: 2000,
    investors: 156,
    image: "/placeholder.svg?height=200&width=300&text=Faria+Lima",
    features: ["Região nobre", "Transporte público", "Infraestrutura", "Valorização"],
    roi12m: 11.8,
  },
]

// Dados dos portfólios de ações
const stockPortfolios = [
  {
    id: 1,
    name: "Dividendos Aristocratas",
    manager: "Julius Asset Management",
    category: "Dividendos",
    aum: 45000000,
    dividendYield: 8.5,
    performance12m: 28.7,
    minInvestment: 1000,
    investors: 2340,
    risk: "Moderado",
    fee: 1.2,
    topHoldings: ["ITUB4", "BBDC4", "PETR4", "VALE3", "WEGE3"],
    monthlyDividend: 850,
    description: "Foco em empresas com histórico consistente de pagamento de dividendos",
  },
  {
    id: 2,
    name: "Tech Growth Brasil",
    manager: "Julius Tech Investments",
    category: "Crescimento",
    aum: 28000000,
    dividendYield: 2.1,
    performance12m: 45.3,
    minInvestment: 2500,
    investors: 1890,
    risk: "Agressivo",
    fee: 1.8,
    topHoldings: ["MGLU3", "B3SA3", "PAGS34", "STNE3", "TOTS3"],
    monthlyDividend: 210,
    description: "Empresas de tecnologia e inovação com alto potencial de crescimento",
  },
  {
    id: 3,
    name: "Global Diversificado",
    manager: "Julius Global Partners",
    category: "Internacional",
    aum: 67000000,
    dividendYield: 5.2,
    performance12m: 18.9,
    minInvestment: 5000,
    investors: 890,
    risk: "Moderado",
    fee: 1.5,
    topHoldings: ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"],
    monthlyDividend: 520,
    description: "Exposição global com foco em empresas consolidadas internacionalmente",
  },
  {
    id: 4,
    name: "Value Investing BR",
    manager: "Julius Value Fund",
    category: "Valor",
    aum: 35000000,
    dividendYield: 6.8,
    performance12m: 12.4,
    minInvestment: 1500,
    investors: 1560,
    risk: "Conservador",
    fee: 1.0,
    topHoldings: ["BBAS3", "ITSA4", "CIEL3", "EGIE3", "TAEE11"],
    monthlyDividend: 680,
    description: "Estratégia de valor com foco em empresas subvalorizadas pelo mercado",
  },
]

// Dados das coleções de NFTs
const nftCollections = [
  {
    id: 1,
    name: "Julius Avatars Genesis",
    category: "Avatars",
    blockchain: "Ethereum",
    floorPrice: 2.5,
    totalSupply: 10000,
    owners: 3400,
    royalty: 7.5,
    monthlyRoyalty: 0.18,
    volume24h: 45.2,
    utility: ["Avatar no metaverso", "Acesso VIP", "Airdrops exclusivos"],
    creator: "Julius Studios",
    description: "Coleção de avatars únicos com utilidade no ecossistema Julius",
  },
  {
    id: 2,
    name: "Virtual Real Estate",
    category: "Metaverso",
    blockchain: "Polygon",
    floorPrice: 1.8,
    totalSupply: 5000,
    owners: 2100,
    royalty: 10.0,
    monthlyRoyalty: 0.25,
    volume24h: 28.7,
    utility: ["Propriedade virtual", "Renda passiva", "Eventos exclusivos"],
    creator: "MetaJulius",
    description: "Propriedades virtuais no metaverso Julius com renda passiva real",
  },
  {
    id: 3,
    name: "AI Art Collection",
    category: "Arte",
    blockchain: "Solana",
    floorPrice: 0.9,
    totalSupply: 7500,
    owners: 1890,
    royalty: 5.0,
    monthlyRoyalty: 0.08,
    volume24h: 15.3,
    utility: ["Arte exclusiva", "Licenciamento", "Exposições virtuais"],
    creator: "Julius AI Lab",
    description: "Arte gerada por IA com direitos de licenciamento comercial",
  },
  {
    id: 4,
    name: "Gaming Assets Pro",
    category: "Gaming",
    blockchain: "Ethereum",
    floorPrice: 3.2,
    totalSupply: 3000,
    owners: 1200,
    royalty: 12.5,
    monthlyRoyalty: 0.32,
    volume24h: 67.8,
    utility: ["Itens de jogo", "Torneios", "Staking rewards"],
    creator: "Julius Gaming",
    description: "Ativos de jogos com utilidade real e competições esportivas",
  },
]

// Dados para calculadora de diversificação
const diversificationData = [
  { name: "Imóveis", value: 35, color: "#ff8c42" },
  { name: "Ações", value: 30, color: "#2563eb" },
  { name: "NFTs", value: 15, color: "#10b981" },
  { name: "Renda Fixa", value: 20, color: "#f59e0b" },
]

// Dados do cashflow mensal
const cashflowData = [
  { month: "Jan", imoveis: 12500, acoes: 8900, nfts: 2100, total: 23500 },
  { month: "Fev", imoveis: 13200, acoes: 9400, nfts: 2300, total: 24900 },
  { month: "Mar", imoveis: 13800, acoes: 10200, nfts: 2500, total: 26500 },
  { month: "Abr", imoveis: 14500, acoes: 11100, nfts: 2800, total: 28400 },
  { month: "Mai", imoveis: 15200, acoes: 12000, nfts: 3200, total: 30400 },
  { month: "Jun", imoveis: 16000, acoes: 12900, nfts: 3600, total: 32500 },
]

// Ranking de rentistas
const topRentistas = [
  { name: "Carlos Investidor", monthlyIncome: 45780, patrimony: 2850000, badge: "TITÃ", growth: 8.2 },
  { name: "Maria Rentista", monthlyIncome: 38900, patrimony: 2100000, badge: "DIAMANTE", growth: 6.7 },
  { name: "João Diversificado", monthlyIncome: 32400, patrimony: 1850000, badge: "PLATINA", growth: 5.9 },
  { name: "Ana Estratégica", monthlyIncome: 28700, patrimony: 1650000, badge: "PLATINA", growth: 7.1 },
  { name: "Pedro Consistente", monthlyIncome: 24890, patrimony: 1280000, badge: "OURO", growth: 4.8 },
]

export default function AtivosPage() {
  const [selectedTab, setSelectedTab] = useState("imoveis")
  const [propertyFilter, setPropertyFilter] = useState("todos")
  const [portfolioFilter, setPortfolioFilter] = useState("todos")
  const [nftFilter, setNftFilter] = useState("todos")
  const [riskAllocation, setRiskAllocation] = useState({
    conservador: 40,
    moderado: 35,
    agressivo: 25,
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value)
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "TITÃ":
        return "bg-purple-600 text-white"
      case "DIAMANTE":
        return "bg-blue-600 text-white"
      case "PLATINA":
        return "bg-gray-400 text-white"
      case "OURO":
        return "bg-yellow-500 text-white"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Conservador":
        return "text-green-600"
      case "Moderado":
        return "text-yellow-600"
      case "Agressivo":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredProperties = virtualProperties.filter((property) => {
    if (propertyFilter === "todos") return true
    return property.type.toLowerCase() === propertyFilter
  })

  const filteredPortfolios = stockPortfolios.filter((portfolio) => {
    if (portfolioFilter === "todos") return true
    return portfolio.category.toLowerCase() === portfolioFilter
  })

  const filteredNFTs = nftCollections.filter((nft) => {
    if (nftFilter === "todos") return true
    return nft.category.toLowerCase() === nftFilter
  })

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ativos Disponíveis</h1>
          <p className="text-gray-600 mt-2">Explore e invista em imóveis virtuais, portfólios de ações e NFTs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Target className="w-4 h-4 mr-2" />
            Calculadora ROI
          </Button>
          <Button size="sm">
            <PieChart className="w-4 h-4 mr-2" />
            Diversificar Carteira
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Ativos</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+12% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Yield Médio</p>
                <p className="text-2xl font-bold text-gray-900">8.7%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+0.3% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Investidores Ativos</p>
                <p className="text-2xl font-bold text-gray-900">15,890</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+8% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Volume Total</p>
                <p className="text-2xl font-bold text-gray-900">R$ 2.8B</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+15% este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="imoveis">Imóveis Virtuais</TabsTrigger>
          <TabsTrigger value="acoes">Portfólios de Ações</TabsTrigger>
          <TabsTrigger value="nfts">Coleções NFT</TabsTrigger>
          <TabsTrigger value="diversificacao">Diversificação</TabsTrigger>
        </TabsList>

        {/* Imóveis Virtuais */}
        <TabsContent value="imoveis" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <h2 className="text-xl font-semibold">Imóveis Virtuais Disponíveis</h2>
            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="residencial">Residencial</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-white text-gray-900">{property.type}</Badge>
                  <Badge className="absolute top-2 right-2 bg-green-600 text-white">{property.yield}% a.a.</Badge>
                </div>

                <CardContent className="p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{property.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Valor do Imóvel</p>
                      <p className="font-semibold">{formatCurrency(property.price)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Aluguel Mensal</p>
                      <p className="font-semibold">{formatCurrency(property.monthlyRent)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.bedrooms}
                        </div>
                      )}
                      {property.parking > 0 && (
                        <div className="flex items-center">
                          <Car className="w-4 h-4 mr-1" />
                          {property.parking}
                        </div>
                      )}
                      <div className="text-gray-600">{property.area}m²</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Ocupação</span>
                      <span className="font-semibold">{property.occupancy}%</span>
                    </div>
                    <Progress value={property.occupancy} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {property.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {property.features.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.features.length - 2} mais
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <p className="text-xs text-gray-600">Investimento mínimo</p>
                      <p className="font-semibold">{formatCurrency(property.minInvestment)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">{formatNumber(property.investors)} investidores</p>
                      <p className="text-sm font-semibold text-green-600">ROI 12m: {property.roi12m}%</p>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Coins className="w-4 h-4 mr-2" />
                    Investir Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Portfólios de Ações */}
        <TabsContent value="acoes" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <h2 className="text-xl font-semibold">Portfólios de Ações Gerenciados</h2>
            <Select value={portfolioFilter} onValueChange={setPortfolioFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as categorias</SelectItem>
                <SelectItem value="dividendos">Dividendos</SelectItem>
                <SelectItem value="crescimento">Crescimento</SelectItem>
                <SelectItem value="internacional">Internacional</SelectItem>
                <SelectItem value="valor">Valor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPortfolios.map((portfolio) => (
              <Card key={portfolio.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{portfolio.name}</CardTitle>
                      <CardDescription className="mt-1">Gerenciado por {portfolio.manager}</CardDescription>
                    </div>
                    <Badge className={getRiskColor(portfolio.risk)}>{portfolio.risk}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{portfolio.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">AUM</p>
                      <p className="font-semibold">{formatCurrency(portfolio.aum)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Taxa de Administração</p>
                      <p className="font-semibold">{portfolio.fee}% a.a.</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Dividend Yield</p>
                      <p className="font-semibold text-green-600">{portfolio.dividendYield}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Performance 12m</p>
                      <p className="font-semibold text-blue-600">+{portfolio.performance12m}%</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Principais Holdings</p>
                    <div className="flex flex-wrap gap-1">
                      {portfolio.topHoldings.map((holding, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {holding}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <p className="text-xs text-gray-600">Investimento mínimo</p>
                      <p className="font-semibold">{formatCurrency(portfolio.minInvestment)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">{formatNumber(portfolio.investors)} investidores</p>
                      <p className="text-sm font-semibold text-green-600">
                        {formatCurrency(portfolio.monthlyDividend)}/mês
                      </p>
                    </div>
                  </div>

                  <Button className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Investir no Portfólio
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Coleções NFT */}
        <TabsContent value="nfts" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <h2 className="text-xl font-semibold">Coleções NFT com Utilidade</h2>
            <Select value={nftFilter} onValueChange={setNftFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as categorias</SelectItem>
                <SelectItem value="avatars">Avatars</SelectItem>
                <SelectItem value="metaverso">Metaverso</SelectItem>
                <SelectItem value="arte">Arte</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNFTs.map((nft) => (
              <Card key={nft.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{nft.name}</CardTitle>
                      <CardDescription>por {nft.creator}</CardDescription>
                    </div>
                    <Badge variant="outline">{nft.blockchain}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{nft.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Floor Price</p>
                      <p className="font-semibold">{nft.floorPrice} ETH</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Volume 24h</p>
                      <p className="font-semibold">{nft.volume24h} ETH</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Supply Total</p>
                      <p className="font-semibold">{formatNumber(nft.totalSupply)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Owners</p>
                      <p className="font-semibold">{formatNumber(nft.owners)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Utilidades</p>
                    <div className="flex flex-wrap gap-1">
                      {nft.utility.map((util, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {util}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <p className="text-xs text-gray-600">Royalty</p>
                      <p className="font-semibold">{nft.royalty}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Renda mensal</p>
                      <p className="text-sm font-semibold text-purple-600">{nft.monthlyRoyalty} ETH</p>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Gem className="w-4 h-4 mr-2" />
                    Comprar NFT
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Diversificação */}
        <TabsContent value="diversificacao" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculadora de Alocação */}
            <Card>
              <CardHeader>
                <CardTitle>Calculadora de Alocação por Risco</CardTitle>
                <CardDescription>Ajuste sua alocação baseada no seu perfil de risco</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Conservador</Label>
                      <span className="text-sm font-medium">{riskAllocation.conservador}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={riskAllocation.conservador}
                      onChange={(e) =>
                        setRiskAllocation((prev) => ({
                          ...prev,
                          conservador: Number.parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Moderado</Label>
                      <span className="text-sm font-medium">{riskAllocation.moderado}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={riskAllocation.moderado}
                      onChange={(e) =>
                        setRiskAllocation((prev) => ({
                          ...prev,
                          moderado: Number.parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Agressivo</Label>
                      <span className="text-sm font-medium">{riskAllocation.agressivo}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={riskAllocation.agressivo}
                      onChange={(e) =>
                        setRiskAllocation((prev) => ({
                          ...prev,
                          agressivo: Number.parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Retorno Esperado Anual</p>
                  <p className="text-2xl font-bold text-green-600">
                    {(
                      (riskAllocation.conservador * 0.08 +
                        riskAllocation.moderado * 0.12 +
                        riskAllocation.agressivo * 0.18) /
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>

                <Button className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Aplicar Estratégia
                </Button>
              </CardContent>
            </Card>

            {/* Ranking de Rentistas */}
            <Card>
              <CardHeader>
                <CardTitle>Top Rentistas da Plataforma</CardTitle>
                <CardDescription>Veja os investidores com maior renda passiva mensal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRentistas.map((rentista, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{rentista.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getBadgeColor(rentista.badge)} size="sm">
                              {rentista.badge}
                            </Badge>
                            <span className="text-xs text-green-600">+{rentista.growth}% este mês</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{formatCurrency(rentista.monthlyIncome)}/mês</p>
                        <p className="text-xs text-gray-600">Patrimônio: {formatCurrency(rentista.patrimony)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <Trophy className="w-4 h-4 mr-2" />
                  Ver Ranking Completo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Simulador de Cashflow */}
          <Card>
            <CardHeader>
              <CardTitle>Simulador de Cashflow Mensal</CardTitle>
              <CardDescription>Projete sua renda passiva baseada nos ativos disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="imoveis-investment">Investimento em Imóveis</Label>
                    <Input id="imoveis-investment" type="number" placeholder="R$ 50.000" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="acoes-investment">Investimento em Ações</Label>
                    <Input id="acoes-investment" type="number" placeholder="R$ 30.000" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="nfts-investment">Investimento em NFTs</Label>
                    <Input id="nfts-investment" type="number" placeholder="R$ 10.000" className="mt-1" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Projeção de Renda Mensal</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Imóveis (8.5% a.a.)</span>
                        <span className="font-semibold">R$ 354/mês</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ações (6.8% dividend yield)</span>
                        <span className="font-semibold">R$ 170/mês</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NFTs (royalties)</span>
                        <span className="font-semibold">R$ 45/mês</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>Total Mensal</span>
                        <span className="text-green-600">R$ 569/mês</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Total Anual</span>
                        <span>R$ 6.828/ano</span>
                      </div>
                    </div>
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
