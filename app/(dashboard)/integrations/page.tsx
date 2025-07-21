"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, Download, ExternalLink, CheckCircle, Clock, TrendingUp } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  icon: string
  category: "broker" | "bank" | "analytics" | "notification" | "automation"
  rating: number
  downloads: number
  price: "free" | "premium" | "enterprise"
  status: "available" | "installed" | "coming-soon"
  features: string[]
  developer: string
  lastUpdate: string
}

const mockIntegrations: Integration[] = [
  {
    id: "1",
    name: "Clear Corretora",
    description: "Integração oficial com a Clear para sincronização automática de operações e posições",
    icon: "🏦",
    category: "broker",
    rating: 4.8,
    downloads: 15420,
    price: "free",
    status: "installed",
    features: ["Sync em tempo real", "Histórico completo", "API oficial"],
    developer: "Clear Corretora",
    lastUpdate: "2024-02-15",
  },
  {
    id: "2",
    name: "Rico Investimentos",
    description: "Conecte sua conta Rico e importe automaticamente suas operações",
    icon: "💼",
    category: "broker",
    rating: 4.6,
    downloads: 8930,
    price: "free",
    status: "available",
    features: ["Import automático", "Análise de performance", "Relatórios"],
    developer: "Rico Investimentos",
    lastUpdate: "2024-02-10",
  },
  {
    id: "3",
    name: "TradingView Charts",
    description: "Gráficos avançados e análise técnica integrada ao seu dashboard",
    icon: "📈",
    category: "analytics",
    rating: 4.9,
    downloads: 23150,
    price: "premium",
    status: "available",
    features: ["Gráficos avançados", "Indicadores técnicos", "Alertas personalizados"],
    developer: "TradingView",
    lastUpdate: "2024-02-12",
  },
  {
    id: "4",
    name: "Nubank Connect",
    description: "Analise seus gastos e investimentos do Nubank em um só lugar",
    icon: "💳",
    category: "bank",
    rating: 4.7,
    downloads: 12680,
    price: "free",
    status: "available",
    features: ["Extrato automático", "Categorização", "Metas de economia"],
    developer: "Nubank",
    lastUpdate: "2024-02-08",
  },
  {
    id: "5",
    name: "WhatsApp Alerts",
    description: "Receba alertas e notificações importantes via WhatsApp",
    icon: "📱",
    category: "notification",
    rating: 4.5,
    downloads: 9870,
    price: "premium",
    status: "installed",
    features: ["Alertas de preço", "Resumo diário", "Notificações personalizadas"],
    developer: "Julius Team",
    lastUpdate: "2024-02-14",
  },
  {
    id: "6",
    name: "Auto Rebalance",
    description: "Rebalanceamento automático da carteira baseado em suas metas",
    icon: "⚖️",
    category: "automation",
    rating: 4.4,
    downloads: 5420,
    price: "enterprise",
    status: "coming-soon",
    features: ["Rebalanceamento automático", "Estratégias personalizadas", "Backtesting"],
    developer: "Julius Team",
    lastUpdate: "2024-03-01",
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(mockIntegrations)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    const matchesPrice = selectedPrice === "all" || integration.price === selectedPrice

    return matchesSearch && matchesCategory && matchesPrice
  })

  const getPriceColor = (price: string) => {
    switch (price) {
      case "free":
        return "bg-green-100 text-green-800"
      case "premium":
        return "bg-blue-100 text-blue-800"
      case "enterprise":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriceLabel = (price: string) => {
    switch (price) {
      case "free":
        return "Gratuito"
      case "premium":
        return "Premium"
      case "enterprise":
        return "Enterprise"
      default:
        return price
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "installed":
        return "bg-green-100 text-green-800"
      case "available":
        return "bg-blue-100 text-blue-800"
      case "coming-soon":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "installed":
        return "Instalado"
      case "available":
        return "Disponível"
      case "coming-soon":
        return "Em Breve"
      default:
        return status
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "broker":
        return "🏦"
      case "bank":
        return "💳"
      case "analytics":
        return "📊"
      case "notification":
        return "🔔"
      case "automation":
        return "🤖"
      default:
        return "🔧"
    }
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🔌</div>
            <h1 className="text-2xl font-bold text-gray-900">Loja de Integrações</h1>
          </div>
          <p className="text-base text-gray-600">Descubra e instale integrações para potencializar sua experiência</p>
        </div>
        <Badge className="bg-orange-100 text-orange-800 px-3 py-1">
          {integrations.filter((i) => i.status === "installed").length} instaladas
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar integrações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base border-gray-300 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 px-4 border border-gray-300 rounded-lg text-base focus:border-orange-400 focus:ring-orange-400 bg-white"
            >
              <option value="all">Todas as categorias</option>
              <option value="broker">Corretoras</option>
              <option value="bank">Bancos</option>
              <option value="analytics">Analytics</option>
              <option value="notification">Notificações</option>
              <option value="automation">Automação</option>
            </select>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="h-12 px-4 border border-gray-300 rounded-lg text-base focus:border-orange-400 focus:ring-orange-400 bg-white"
            >
              <option value="all">Todos os preços</option>
              <option value="free">Gratuito</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { key: "broker", label: "Corretoras", icon: "🏦", count: 2 },
          { key: "bank", label: "Bancos", icon: "💳", count: 1 },
          { key: "analytics", label: "Analytics", icon: "📊", count: 1 },
          { key: "notification", label: "Notificações", icon: "🔔", count: 1 },
          { key: "automation", label: "Automação", icon: "🤖", count: 1 },
        ].map((category) => (
          <Card
            key={category.key}
            className={`bg-white shadow-lg rounded-xl border cursor-pointer transition-all hover:shadow-xl ${
              selectedCategory === category.key ? "border-orange-300 bg-orange-50" : "border-gray-100"
            }`}
            onClick={() => setSelectedCategory(category.key)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-base font-medium text-gray-900">{category.label}</div>
              <div className="text-sm text-gray-600">{category.count} disponíveis</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <Card
            key={integration.id}
            className="bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{integration.icon}</div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-600">por {integration.developer}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(integration.status)}>
                  {integration.status === "installed" && <CheckCircle className="h-3 w-3 mr-1" />}
                  {integration.status === "coming-soon" && <Clock className="h-3 w-3 mr-1" />}
                  {getStatusLabel(integration.status)}
                </Badge>
              </div>

              <p className="text-base text-gray-600 line-clamp-2">{integration.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{integration.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{integration.downloads.toLocaleString()}</span>
                  </div>
                </div>
                <Badge className={getPriceColor(integration.price)}>{getPriceLabel(integration.price)}</Badge>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-medium text-gray-900">Recursos:</h4>
                <ul className="space-y-1">
                  {integration.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2">
                {integration.status === "installed" ? (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white font-medium">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Instalado
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Configurar
                    </Button>
                  </div>
                ) : integration.status === "coming-soon" ? (
                  <Button size="sm" disabled className="bg-gray-200 text-gray-500 cursor-not-allowed">
                    <Clock className="h-4 w-4 mr-1" />
                    Em Breve
                  </Button>
                ) : (
                  <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white font-medium">
                    <Download className="h-4 w-4 mr-1" />
                    Instalar
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                Atualizado em {new Date(integration.lastUpdate).toLocaleDateString("pt-BR")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhuma integração encontrada</h3>
            <p className="text-base text-gray-600 mb-6">Tente ajustar seus filtros de busca</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedPrice("all")
              }}
              className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-3"
            >
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Popular Integrations */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            Integrações Populares
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {integrations
              .sort((a, b) => b.downloads - a.downloads)
              .slice(0, 3)
              .map((integration) => (
                <div key={integration.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{integration.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-gray-900">{integration.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      {integration.rating}
                      <span>•</span>
                      <Download className="h-3 w-3" />
                      {integration.downloads.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
