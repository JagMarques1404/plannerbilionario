"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Eye,
  Coins,
  ShoppingBag,
  Star,
  Clock,
  Filter,
  Search,
  TrendingUp,
  Gift,
  Zap,
  Award,
  Users,
  Heart,
  Share2,
} from "lucide-react"
import { useApp } from "@/contexts/app-context"

const anunciosPatrocinados = [
  {
    id: "1",
    titulo: "Curso Completo de Day Trade",
    empresa: "Trader Academy",
    descricao: "Aprenda as estratégias dos traders profissionais em 30 dias",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Day+Trade+Course",
    duracao: "3:45",
    recompensa: 150,
    categoria: "Educação",
    rating: 4.8,
    views: 12500,
    cashback: 5,
  },
  {
    id: "2",
    titulo: "Plataforma de Investimentos Rico",
    empresa: "Rico Investimentos",
    descricao: "Invista com taxa zero e ganhe cashback em todas as operações",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Rico+Platform",
    duracao: "2:30",
    recompensa: 200,
    categoria: "Fintech",
    rating: 4.9,
    views: 8900,
    cashback: 10,
  },
  {
    id: "3",
    titulo: "Cartão de Crédito Premium",
    empresa: "Banco Digital XYZ",
    descricao: "Cartão sem anuidade com cashback de até 5% em compras",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Credit+Card",
    duracao: "1:50",
    recompensa: 100,
    categoria: "Banco",
    rating: 4.7,
    views: 15200,
    cashback: 3,
  },
  {
    id: "4",
    titulo: "Seguro de Vida Inteligente",
    empresa: "Seguradora Alpha",
    descricao: "Proteção completa para você e sua família com preços exclusivos",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Life+Insurance",
    duracao: "2:15",
    recompensa: 120,
    categoria: "Seguros",
    rating: 4.6,
    views: 6700,
    cashback: 8,
  },
]

const produtosP2P = [
  {
    id: "1",
    titulo: "Consultoria Financeira Personalizada",
    vendedor: "Carlos Mendes",
    grupo: "ELITE",
    preco: 500,
    descricao: "Análise completa do seu portfólio e estratégia personalizada",
    rating: 5.0,
    avaliacoes: 47,
    categoria: "Consultoria",
    tempo: "2h",
    avatar: "/placeholder.svg?height=50&width=50&text=CM",
  },
  {
    id: "2",
    titulo: "Planilha de Controle Financeiro Pro",
    vendedor: "Ana Rodrigues",
    grupo: "MAGNATA",
    preco: 97,
    descricao: "Planilha completa com dashboards e automações avançadas",
    rating: 4.9,
    avaliacoes: 156,
    categoria: "Ferramentas",
    tempo: "Imediato",
    avatar: "/placeholder.svg?height=50&width=50&text=AR",
  },
  {
    id: "3",
    titulo: "Mentoria em Investimentos Imobiliários",
    vendedor: "Roberto Silva",
    grupo: "TITÃ",
    preco: 1200,
    descricao: "Sessão de 3h sobre estratégias de investimento imobiliário",
    rating: 5.0,
    avaliacoes: 23,
    categoria: "Mentoria",
    tempo: "3h",
    avatar: "/placeholder.svg?height=50&width=50&text=RS",
  },
]

const ofertasExclusivas = [
  {
    id: "1",
    titulo: "Acesso Vitalício - Plataforma de Análises",
    descricao: "Análises técnicas e fundamentalistas em tempo real",
    precoOriginal: 2400,
    precoDesconto: 997,
    desconto: 58,
    prazo: "48h",
    badge: "LIMITADO",
    cor: "from-red-500 to-pink-600",
  },
  {
    id: "2",
    titulo: "Bundle Completo - 5 Cursos Premium",
    descricao: "Todos os cursos de investimento em um pacote especial",
    precoOriginal: 1500,
    precoDesconto: 497,
    desconto: 67,
    prazo: "72h",
    badge: "EXCLUSIVO",
    cor: "from-purple-500 to-blue-600",
  },
]

export default function MarketplacePage() {
  const { user } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")

  if (!user) return null

  const categorias = ["todos", "educacao", "fintech", "banco", "seguros", "consultoria", "ferramentas"]

  const handleWatchAd = (adId: string) => {
    // Simular assistir anúncio
    console.log(`Assistindo anúncio ${adId}`)
  }

  const handlePurchase = (productId: string) => {
    // Simular compra
    console.log(`Comprando produto ${productId}`)
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Marketplace Premium</h1>
          <p className="text-gray-600 text-lg">
            Ganhe tokens assistindo anúncios e compre produtos exclusivos da comunidade
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-xl">
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5" />
              <span className="font-bold">{user.billionTokens.toLocaleString()} $BILLION</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="card-premium border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar produtos, cursos, consultorias..."
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

      {/* Tabs */}
      <Tabs defaultValue="anuncios" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="anuncios" className="rounded-xl font-semibold">
            Anúncios
          </TabsTrigger>
          <TabsTrigger value="p2p" className="rounded-xl font-semibold">
            P2P
          </TabsTrigger>
          <TabsTrigger value="ofertas" className="rounded-xl font-semibold">
            Ofertas
          </TabsTrigger>
          <TabsTrigger value="historico" className="rounded-xl font-semibold">
            Histórico
          </TabsTrigger>
        </TabsList>

        {/* Anúncios Patrocinados */}
        <TabsContent value="anuncios" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Play className="h-5 w-5 mr-2 text-red-500" />
                Anúncios Patrocinados Premium
              </CardTitle>
              <CardDescription>Assista anúncios relevantes e ganhe $BILLION tokens + cashback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {anunciosPatrocinados.map((anuncio) => (
                  <Card key={anuncio.id} className="card-hover border-0 overflow-hidden">
                    <div className="relative">
                      <img
                        src={anuncio.thumbnail || "/placeholder.svg"}
                        alt={anuncio.titulo}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">{anuncio.duracao}</Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-500 text-white">+{anuncio.recompensa} $B</Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <Button
                          onClick={() => handleWatchAd(anuncio.id)}
                          className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold rounded-xl"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Assistir Agora
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {anuncio.categoria}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{anuncio.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{anuncio.titulo}</h3>
                      <p className="text-gray-600 text-sm mb-3">{anuncio.empresa}</p>
                      <p className="text-gray-600 text-xs mb-3">{anuncio.descricao}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{anuncio.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{anuncio.cashback}% cashback</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Marketplace P2P */}
        <TabsContent value="p2p" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Marketplace P2P da Comunidade
              </CardTitle>
              <CardDescription>Produtos e serviços exclusivos criados pelos membros da comunidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {produtosP2P.map((produto) => (
                  <Card key={produto.id} className="card-hover border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src={produto.avatar || "/placeholder.svg"}
                          alt={produto.vendedor}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{produto.vendedor}</h4>
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                            {produto.grupo}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                          <Share2 className="h-4 w-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-900 mb-2">{produto.titulo}</h3>
                      <p className="text-gray-600 text-sm mb-4">{produto.descricao}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">{produto.rating}</span>
                          <span className="text-gray-500 text-sm">({produto.avaliacoes})</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {produto.categoria}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>{produto.tempo}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{produto.preco} $BILLION</div>
                          <div className="text-xs text-gray-500">≈ R$ {produto.preco.toLocaleString()}</div>
                        </div>
                      </div>

                      <Button
                        onClick={() => handlePurchase(produto.id)}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Comprar Agora
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ofertas Exclusivas */}
        <TabsContent value="ofertas" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Gift className="h-5 w-5 mr-2 text-purple-500" />
                Ofertas Exclusivas VIP
              </CardTitle>
              <CardDescription>Descontos especiais apenas para membros do seu grupo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {ofertasExclusivas.map((oferta) => (
                  <Card
                    key={oferta.id}
                    className={`card-hover border-0 bg-gradient-to-br ${oferta.cor} text-white overflow-hidden relative`}
                  >
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 text-white border-white/30">{oferta.badge}</Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">{oferta.titulo}</h3>
                        <p className="opacity-90 text-sm">{oferta.descricao}</p>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl font-bold">{oferta.precoDesconto} $BILLION</span>
                          <span className="text-lg line-through opacity-60">{oferta.precoOriginal} $BILLION</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-500 text-white">{oferta.desconto}% OFF</Badge>
                          <div className="flex items-center space-x-1 text-sm opacity-90">
                            <Clock className="h-4 w-4" />
                            <span>Expira em {oferta.prazo}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 font-semibold rounded-xl">
                        <Zap className="h-4 w-4 mr-2" />
                        Aproveitar Oferta
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Histórico */}
        <TabsContent value="historico" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Award className="h-5 w-5 mr-2 text-green-500" />
                Seu Histórico no Marketplace
              </CardTitle>
              <CardDescription>Anúncios assistidos, compras realizadas e tokens ganhos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">47</div>
                  <div className="text-gray-600 text-sm">Anúncios Assistidos</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
                  <div className="text-gray-600 text-sm">Compras Realizadas</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Coins className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mb-1">3,450</div>
                  <div className="text-gray-600 text-sm">$BILLION Ganhos</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Atividades Recentes</h4>
                {[
                  {
                    tipo: "anuncio",
                    descricao: "Assistiu: Curso de Day Trade",
                    valor: "+150 $BILLION",
                    tempo: "2h atrás",
                    cor: "text-green-600",
                  },
                  {
                    tipo: "compra",
                    descricao: "Comprou: Consultoria Financeira",
                    valor: "-500 $BILLION",
                    tempo: "1 dia atrás",
                    cor: "text-red-600",
                  },
                  {
                    tipo: "cashback",
                    descricao: "Cashback: Plataforma Rico",
                    valor: "+75 $BILLION",
                    tempo: "2 dias atrás",
                    cor: "text-blue-600",
                  },
                ].map((atividade, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border">
                    <div>
                      <p className="font-medium text-gray-900">{atividade.descricao}</p>
                      <p className="text-gray-500 text-sm">{atividade.tempo}</p>
                    </div>
                    <div className={`font-bold ${atividade.cor}`}>{atividade.valor}</div>
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
