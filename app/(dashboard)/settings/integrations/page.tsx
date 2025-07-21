"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Link, Shield, Key, CheckCircle, ExternalLink } from "lucide-react"

const integrations = [
  {
    id: "broker-xp",
    name: "XP Investimentos",
    description: "Conecte sua conta XP para importar automaticamente suas operações",
    status: "connected",
    icon: "🏦",
    category: "brokers",
    features: ["Importação automática", "Análise de performance", "Alertas de operações"],
  },
  {
    id: "broker-clear",
    name: "Clear Corretora",
    description: "Sincronize suas operações da Clear com o Julius Invest",
    status: "available",
    icon: "📊",
    category: "brokers",
    features: ["Sincronização em tempo real", "Relatórios detalhados"],
  },
  {
    id: "telegram",
    name: "Telegram Bot",
    description: "Receba notificações e alertas diretamente no Telegram",
    status: "connected",
    icon: "📱",
    category: "notifications",
    features: ["Alertas personalizados", "Comandos por chat", "Relatórios diários"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Notificações importantes via WhatsApp",
    status: "available",
    icon: "💬",
    category: "notifications",
    features: ["Alertas de mercado", "Resumos semanais"],
  },
  {
    id: "email-marketing",
    name: "Email Marketing",
    description: "Sistema de emails educacionais e newsletters",
    status: "connected",
    icon: "📧",
    category: "marketing",
    features: ["Newsletters", "Conteúdo educacional", "Alertas personalizados"],
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Exporte seus dados para planilhas do Google",
    status: "available",
    icon: "📈",
    category: "data",
    features: ["Exportação automática", "Templates prontos", "Sincronização bidirecional"],
  },
]

const apiKeys = [
  {
    id: "julius-api",
    name: "Julius API Key",
    description: "Chave principal para acesso à API do Julius Invest",
    created: "2024-01-15",
    lastUsed: "2024-01-20",
    permissions: ["read", "write", "admin"],
  },
  {
    id: "webhook-key",
    name: "Webhook Key",
    description: "Chave para receber webhooks de operações",
    created: "2024-01-10",
    lastUsed: "2024-01-19",
    permissions: ["webhook"],
  },
]

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("integrations")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "Todas", count: integrations.length },
    { id: "brokers", name: "Corretoras", count: integrations.filter((i) => i.category === "brokers").length },
    {
      id: "notifications",
      name: "Notificações",
      count: integrations.filter((i) => i.category === "notifications").length,
    },
    { id: "marketing", name: "Marketing", count: integrations.filter((i) => i.category === "marketing").length },
    { id: "data", name: "Dados", count: integrations.filter((i) => i.category === "data").length },
  ]

  return (
    <div className="min-h-screen bg-yellow-100">
      <main className="p-4 md:ml-64 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Integrações</h1>
                <p className="text-base text-gray-600">Conecte suas contas e configure notificações</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-base font-medium text-green-800">3 Conectadas</span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Link className="h-5 w-5 text-blue-600" />
                  <span className="text-base font-medium text-blue-800">6 Disponíveis</span>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-orange-600" />
                  <span className="text-base font-medium text-orange-800">2 API Keys</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white shadow-lg rounded-xl p-1 border border-gray-100">
              <TabsTrigger value="integrations" className="text-base">
                Integrações
              </TabsTrigger>
              <TabsTrigger value="api-keys" className="text-base">
                API Keys
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="text-base">
                Webhooks
              </TabsTrigger>
              <TabsTrigger value="security" className="text-base">
                Segurança
              </TabsTrigger>
            </TabsList>

            <TabsContent value="integrations" className="space-y-6">
              {/* Filters */}
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search" className="text-base font-medium text-gray-700 mb-2 block">
                      Buscar integrações
                    </Label>
                    <Input
                      id="search"
                      placeholder="Digite o nome da integração..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-base"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">Categoria</Label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className={`text-sm ${
                            selectedCategory === category.id
                              ? "bg-orange-400 hover:bg-orange-500 text-white"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {category.name} ({category.count})
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredIntegrations.map((integration) => (
                  <Card
                    key={integration.id}
                    className="bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{integration.icon}</div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-800">{integration.name}</CardTitle>
                            <Badge
                              variant={integration.status === "connected" ? "default" : "secondary"}
                              className={`text-xs ${
                                integration.status === "connected"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {integration.status === "connected" ? "Conectado" : "Disponível"}
                            </Badge>
                          </div>
                        </div>
                        <Switch
                          checked={integration.status === "connected"}
                          className="data-[state=checked]:bg-orange-400"
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base text-gray-600 mb-4">{integration.description}</p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Recursos:</h4>
                          <ul className="space-y-1">
                            {integration.features.map((feature, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          className={`w-full text-base ${
                            integration.status === "connected"
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              : "bg-orange-400 hover:bg-orange-500 text-white"
                          }`}
                        >
                          {integration.status === "connected" ? "Configurar" : "Conectar"}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="api-keys" className="space-y-6">
              {/* API Keys Header */}
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">API Keys</h2>
                    <p className="text-base text-gray-600">Gerencie suas chaves de acesso à API</p>
                  </div>
                  <Button className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-2 rounded-lg">
                    <Key className="h-4 w-4 mr-2" />
                    Nova API Key
                  </Button>
                </div>
              </div>

              {/* API Keys List */}
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <Card key={apiKey.id} className="bg-white shadow-lg border border-gray-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Key className="h-5 w-5 text-gray-400" />
                            <h3 className="text-lg font-semibold text-gray-800">{apiKey.name}</h3>
                            <div className="flex space-x-2">
                              {apiKey.permissions.map((permission) => (
                                <Badge key={permission} variant="secondary" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-base text-gray-600 mb-3">{apiKey.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <span>Criada: {apiKey.created}</span>
                            <span>Último uso: {apiKey.lastUsed}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="text-sm bg-transparent">
                            Copiar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-sm text-red-600 hover:text-red-700 bg-transparent"
                          >
                            Revogar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-6">
              <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Link className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Webhooks</h3>
                <p className="text-base text-gray-600 mb-6">
                  Configure endpoints para receber notificações em tempo real
                </p>
                <Button className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-2 rounded-lg">
                  Configurar Webhooks
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Configurações de Segurança</h3>
                <p className="text-base text-gray-600 mb-6">Gerencie autenticação de dois fatores e permissões</p>
                <Button className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-2 rounded-lg">
                  Configurar Segurança
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
