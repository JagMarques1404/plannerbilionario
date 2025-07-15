"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  Zap,
  Github,
  Slack,
  Mail,
  Calendar,
  Database,
  Cloud,
  Webhook,
  Key,
  Settings,
  ExternalLink,
  Crown,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const integrations = [
    {
      id: 1,
      name: "GitHub",
      description: "Sincronize repositórios e commits com seus projetos",
      icon: Github,
      category: "Desenvolvimento",
      status: "connected",
      premium: false,
      color: "text-gray-900",
      bgColor: "bg-gray-100",
    },
    {
      id: 2,
      name: "Slack",
      description: "Receba notificações e atualizações no Slack",
      icon: Slack,
      category: "Comunicação",
      status: "available",
      premium: true,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: 3,
      name: "Google Calendar",
      description: "Sincronize prazos e eventos com seu calendário",
      icon: Calendar,
      category: "Produtividade",
      status: "connected",
      premium: false,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 4,
      name: "Gmail",
      description: "Envie relatórios e notificações por email",
      icon: Mail,
      category: "Comunicação",
      status: "available",
      premium: false,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: 5,
      name: "AWS S3",
      description: "Armazenamento em nuvem para backups e arquivos",
      icon: Cloud,
      category: "Armazenamento",
      status: "available",
      premium: true,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: 6,
      name: "PostgreSQL",
      description: "Conecte bancos de dados externos",
      icon: Database,
      category: "Banco de Dados",
      status: "available",
      premium: true,
      color: "text-blue-800",
      bgColor: "bg-blue-100",
    },
    {
      id: 7,
      name: "Webhooks",
      description: "Configure webhooks personalizados",
      icon: Webhook,
      category: "Desenvolvimento",
      status: "connected",
      premium: true,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 8,
      name: "Zapier",
      description: "Automatize workflows com milhares de apps",
      icon: Zap,
      category: "Automação",
      status: "available",
      premium: true,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ]

  const categories = [
    "Todos",
    "Desenvolvimento",
    "Comunicação",
    "Produtividade",
    "Armazenamento",
    "Banco de Dados",
    "Automação",
  ]
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const connectedCount = integrations.filter((i) => i.status === "connected").length

  const canAccessPremiumIntegration = (integration: any) => {
    if (!integration.premium) return true
    return user?.plan === "premium" || user?.plan === "enterprise"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center space-x-2">
                  <Zap className="h-6 w-6" />
                  <span>Integrações</span>
                </h1>
                <p className="text-gray-600">Conecte suas ferramentas favoritas</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{connectedCount} conectadas</Badge>
              <Button>
                <Key className="h-4 w-4 mr-2" />
                API Keys
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar integrações..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Disponível</p>
                  <p className="text-2xl font-bold">{integrations.length}</p>
                </div>
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conectadas</p>
                  <p className="text-2xl font-bold">{connectedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Premium</p>
                  <p className="text-2xl font-bold">{integrations.filter((i) => i.premium).length}</p>
                </div>
                <Crown className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categorias</p>
                  <p className="text-2xl font-bold">{categories.length - 1}</p>
                </div>
                <Settings className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integrations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${integration.bgColor}`}>
                      <integration.icon className={`h-6 w-6 ${integration.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>{integration.name}</span>
                        {integration.premium && <Crown className="h-4 w-4 text-yellow-600" />}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {integration.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {integration.status === "connected" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{integration.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={integration.status === "connected" ? "default" : "secondary"}
                    className={integration.status === "connected" ? "bg-green-600" : ""}
                  >
                    {integration.status === "connected" ? "Conectado" : "Disponível"}
                  </Badge>
                  <div className="flex space-x-2">
                    {integration.status === "connected" ? (
                      <>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Desconectar
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        disabled={integration.premium && !canAccessPremiumIntegration(integration)}
                        onClick={() => {
                          if (integration.premium && !canAccessPremiumIntegration(integration)) {
                            router.push("/pricing")
                          }
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {integration.premium && !canAccessPremiumIntegration(integration) ? "Upgrade" : "Conectar"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma integração encontrada</h3>
              <p className="text-gray-500 mb-4">Tente ajustar os filtros de busca ou categoria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Todos")
                }}
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        )}

        {/* API Documentation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>API e Webhooks</span>
            </CardTitle>
            <CardDescription>Crie integrações personalizadas usando nossa API</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">API REST</h4>
                <p className="text-sm text-gray-600">Acesse todos os recursos da plataforma via API REST</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Documentação
                  </Button>
                  <Button variant="outline" size="sm">
                    <Key className="h-4 w-4 mr-2" />
                    Gerar Token
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Webhooks</h4>
                <p className="text-sm text-gray-600">Receba notificações em tempo real sobre eventos</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Webhook className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Gerenciar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
