"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  BarChart3,
  Shield,
  CheckCircle,
  AlertTriangle,
  Settings,
  RefreshCw,
  TrendingUp,
  DollarSign,
  CreditCard,
  Building2,
  Smartphone,
} from "lucide-react"
import { MarketWidget } from "@/components/market-widget"
import { ComplianceChecker } from "@/components/compliance-checker"

interface Integration {
  id: string
  name: string
  description: string
  category: "financial" | "banking" | "trading" | "compliance"
  status: "active" | "inactive" | "error" | "pending"
  icon: React.ReactNode
  features: string[]
  lastSync?: string
  dataPoints?: number
  isSimulated: boolean
}

const integrations: Integration[] = [
  {
    id: "yahoo-finance",
    name: "Yahoo Finance API",
    description: "Dados de mercado em tempo real",
    category: "financial",
    status: "active",
    icon: <BarChart3 className="h-5 w-5" />,
    features: ["Cotações em tempo real", "Dados históricos", "Indicadores técnicos"],
    lastSync: "2024-01-20T14:30:00",
    dataPoints: 1250,
    isSimulated: true,
  },
  {
    id: "banco-central",
    name: "Banco Central do Brasil",
    description: "Dados econômicos oficiais",
    category: "financial",
    status: "active",
    icon: <Building2 className="h-5 w-5" />,
    features: ["Taxa Selic", "IPCA", "Câmbio oficial"],
    lastSync: "2024-01-20T12:00:00",
    dataPoints: 850,
    isSimulated: true,
  },
  {
    id: "nubank",
    name: "Nubank",
    description: "Integração bancária completa",
    category: "banking",
    status: "active",
    icon: <CreditCard className="h-5 w-5" />,
    features: ["Saldo em tempo real", "Extrato automático", "Categorização"],
    lastSync: "2024-01-20T14:25:00",
    dataPoints: 2100,
    isSimulated: true,
  },
  {
    id: "pix-simulator",
    name: "PIX Simulator",
    description: "Simulador de transações PIX",
    category: "banking",
    status: "active",
    icon: <Smartphone className="h-5 w-5" />,
    features: ["Transferências instantâneas", "QR Code", "Chave PIX"],
    lastSync: "2024-01-20T14:20:00",
    dataPoints: 450,
    isSimulated: true,
  },
  {
    id: "binance",
    name: "Binance",
    description: "Exchange de criptomoedas",
    category: "trading",
    status: "error",
    icon: <DollarSign className="h-5 w-5" />,
    features: ["Trading automático", "Portfolio tracking", "Alertas de preço"],
    lastSync: "2024-01-19T18:45:00",
    dataPoints: 0,
    isSimulated: true,
  },
  {
    id: "clear-corretora",
    name: "Clear Corretora",
    description: "Corretora de valores",
    category: "trading",
    status: "inactive",
    icon: <TrendingUp className="h-5 w-5" />,
    features: ["Ações", "FIIs", "Renda fixa"],
    isSimulated: true,
  },
  {
    id: "compliance-engine",
    name: "Compliance Engine",
    description: "Sistema de conformidade",
    category: "compliance",
    status: "active",
    icon: <Shield className="h-5 w-5" />,
    features: ["KYC", "AML", "Monitoramento"],
    lastSync: "2024-01-20T13:00:00",
    dataPoints: 95,
    isSimulated: true,
  },
]

export default function IntegrationsPage() {
  const [activeIntegrations, setActiveIntegrations] = useState(integrations)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const toggleIntegration = (id: string) => {
    setActiveIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              status: integration.status === "active" ? "inactive" : "active",
              lastSync: integration.status === "inactive" ? new Date().toISOString() : integration.lastSync,
            }
          : integration,
      ),
    )
  }

  const syncIntegration = async (id: string) => {
    setActiveIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              status: "pending",
            }
          : integration,
      ),
    )

    // Simular sincronização
    setTimeout(() => {
      setActiveIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === id
            ? {
                ...integration,
                status: "active",
                lastSync: new Date().toISOString(),
                dataPoints: Math.floor(Math.random() * 2000) + 500,
              }
            : integration,
        ),
      )
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "pending":
        return <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />
      default:
        return null
    }
  }

  const filteredIntegrations =
    selectedCategory === "all"
      ? activeIntegrations
      : activeIntegrations.filter((integration) => integration.category === selectedCategory)

  const activeCount = activeIntegrations.filter((i) => i.status === "active").length
  const totalDataPoints = activeIntegrations.reduce((acc, i) => acc + (i.dataPoints || 0), 0)

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Integrações Simuladas</h1>
          <p className="text-gray-600 text-lg">Conecte-se com APIs e serviços financeiros (modo demonstração)</p>
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
                <p className="text-sm font-medium text-gray-600">Integrações Ativas</p>
                <p className="text-3xl font-bold text-gray-900">{activeCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pontos de Dados</p>
                <p className="text-3xl font-bold text-gray-900">{totalDataPoints.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-3xl font-bold text-gray-900">99.9%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Última Sync</p>
                <p className="text-lg font-bold text-gray-900">Agora</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="integrations" className="rounded-xl font-semibold">
            Integrações
          </TabsTrigger>
          <TabsTrigger value="market" className="rounded-xl font-semibold">
            Mercado
          </TabsTrigger>
          <TabsTrigger value="compliance" className="rounded-xl font-semibold">
            Compliance
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl font-semibold">
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          {/* Category Filter */}
          <div className="flex space-x-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="rounded-xl"
            >
              Todas
            </Button>
            <Button
              variant={selectedCategory === "financial" ? "default" : "outline"}
              onClick={() => setSelectedCategory("financial")}
              className="rounded-xl"
            >
              Financeiras
            </Button>
            <Button
              variant={selectedCategory === "banking" ? "default" : "outline"}
              onClick={() => setSelectedCategory("banking")}
              className="rounded-xl"
            >
              Bancárias
            </Button>
            <Button
              variant={selectedCategory === "trading" ? "default" : "outline"}
              onClick={() => setSelectedCategory("trading")}
              className="rounded-xl"
            >
              Trading
            </Button>
            <Button
              variant={selectedCategory === "compliance" ? "default" : "outline"}
              onClick={() => setSelectedCategory("compliance")}
              className="rounded-xl"
            >
              Compliance
            </Button>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="card-premium border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {integration.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={integration.status === "active"}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(integration.status)}>
                        {getStatusIcon(integration.status)}
                        <span className="ml-1">
                          {integration.status === "active"
                            ? "Ativo"
                            : integration.status === "inactive"
                              ? "Inativo"
                              : integration.status === "error"
                                ? "Erro"
                                : "Sincronizando"}
                        </span>
                      </Badge>
                      {integration.isSimulated && (
                        <Badge variant="outline" className="text-xs">
                          SIMULADO
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-900">Funcionalidades:</h4>
                      <div className="space-y-1">
                        {integration.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {integration.lastSync && (
                      <div className="text-xs text-gray-500">
                        Última sincronização: {new Date(integration.lastSync).toLocaleString()}
                      </div>
                    )}

                    {integration.dataPoints && (
                      <div className="text-xs text-gray-500">
                        Pontos de dados: {integration.dataPoints.toLocaleString()}
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => syncIntegration(integration.id)}
                        disabled={integration.status === "pending"}
                        className="flex-1 bg-transparent"
                      >
                        <RefreshCw
                          className={`h-3 w-3 mr-1 ${integration.status === "pending" ? "animate-spin" : ""}`}
                        />
                        Sincronizar
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Settings className="h-3 w-3 mr-1" />
                        Config
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <MarketWidget />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <ComplianceChecker />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configure suas integrações e preferências</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sincronização Automática</h4>
                    <p className="text-sm text-gray-600">Atualizar dados automaticamente a cada 5 minutos</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações de Erro</h4>
                    <p className="text-sm text-gray-600">Receber alertas quando integrações falharem</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Modo Debug</h4>
                    <p className="text-sm text-gray-600">Mostrar logs detalhados das integrações</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
