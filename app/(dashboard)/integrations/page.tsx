"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Building2,
  CreditCard,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Settings,
  ExternalLink,
} from "lucide-react"

const apiIntegrations = [
  {
    id: "yahoo-finance",
    name: "Yahoo Finance API",
    description: "Cotações em tempo real de ações e índices",
    status: "connected",
    lastSync: "2024-01-15 14:30",
    icon: "📈",
  },
  {
    id: "bcb-api",
    name: "API Banco Central",
    description: "Dados oficiais de inflação e taxa Selic",
    status: "connected",
    lastSync: "2024-01-15 14:25",
    icon: "🏛️",
  },
  {
    id: "crypto-api",
    name: "CoinGecko API",
    description: "Preços de criptomoedas em tempo real",
    status: "connected",
    lastSync: "2024-01-15 14:35",
    icon: "₿",
  },
  {
    id: "news-api",
    name: "Financial News API",
    description: "Notícias financeiras relevantes",
    status: "pending",
    lastSync: "Nunca",
    icon: "📰",
  },
]

const bankingIntegrations = [
  {
    id: "nubank",
    name: "Nubank",
    description: "Conta corrente e cartão de crédito",
    status: "connected",
    balance: "R$ 12.450,00",
    icon: "💜",
  },
  {
    id: "itau",
    name: "Itaú",
    description: "Conta poupança e investimentos",
    status: "connected",
    balance: "R$ 45.230,00",
    icon: "🔶",
  },
  {
    id: "bradesco",
    name: "Bradesco",
    description: "Conta corrente empresarial",
    status: "disconnected",
    balance: "---",
    icon: "🔴",
  },
  {
    id: "santander",
    name: "Santander",
    description: "Cartão de crédito e financiamentos",
    status: "pending",
    balance: "---",
    icon: "🔺",
  },
]

const tradingIntegrations = [
  {
    id: "clear",
    name: "Clear Corretora",
    description: "Ações, FIIs e renda fixa",
    status: "connected",
    portfolio: "R$ 85.600,00",
    icon: "📊",
  },
  {
    id: "rico",
    name: "Rico Investimentos",
    description: "Tesouro Direto e CDBs",
    status: "connected",
    portfolio: "R$ 32.100,00",
    icon: "💰",
  },
  {
    id: "binance",
    name: "Binance",
    description: "Criptomoedas e trading",
    status: "pending",
    portfolio: "---",
    icon: "🟡",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "pending":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "disconnected":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-600" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "connected":
      return <Badge className="bg-green-100 text-green-800">Conectado</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
    case "disconnected":
      return <Badge className="bg-red-100 text-red-800">Desconectado</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800">Desconhecido</Badge>
  }
}

export default function IntegrationsPage() {
  const [selectedTab, setSelectedTab] = useState("apis")

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Integrações</h1>
          <p className="text-gray-600 text-lg">Conecte suas contas e APIs para uma experiência completa</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-lg">
            🏖️ MODO SANDBOX
          </Badge>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">APIs Conectadas</CardTitle>
            <Zap className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">3/4</div>
            <p className="text-sm opacity-90">75% ativas</p>
          </CardContent>
        </Card>

        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Bancos Conectados</CardTitle>
            <Building2 className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">2/4</div>
            <p className="text-sm opacity-90">R$ 57.680 total</p>
          </CardContent>
        </Card>

        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Corretoras</CardTitle>
            <TrendingUp className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">2/3</div>
            <p className="text-sm opacity-90">R$ 117.700 investido</p>
          </CardContent>
        </Card>

        <Card className="card-hover card-premium border-0 bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Compliance</CardTitle>
            <Shield className="h-5 w-5 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">100%</div>
            <p className="text-sm opacity-90">Todas aprovadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="apis" className="rounded-xl font-semibold">
            APIs Financeiras
          </TabsTrigger>
          <TabsTrigger value="banking" className="rounded-xl font-semibold">
            Bancos
          </TabsTrigger>
          <TabsTrigger value="trading" className="rounded-xl font-semibold">
            Corretoras
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl font-semibold">
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="apis" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-blue-500" />
                APIs Financeiras
              </CardTitle>
              <CardDescription>Conecte APIs para dados em tempo real</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {apiIntegrations.map((api) => (
                <div
                  key={api.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl border"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{api.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{api.name}</h4>
                      <p className="text-gray-600 text-sm">{api.description}</p>
                      <p className="text-gray-500 text-xs mt-1">Última sincronização: {api.lastSync}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(api.status)}
                    {getStatusBadge(api.status)}
                    <Switch checked={api.status === "connected"} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banking" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-green-500" />
                Conexões Bancárias
              </CardTitle>
              <CardDescription>Conecte suas contas bancárias para visão unificada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {bankingIntegrations.map((bank) => (
                <div
                  key={bank.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl border"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{bank.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{bank.name}</h4>
                      <p className="text-gray-600 text-sm">{bank.description}</p>
                      <p className="text-green-600 font-medium text-sm mt-1">Saldo: {bank.balance}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(bank.status)}
                    {getStatusBadge(bank.status)}
                    <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                      {bank.status === "connected" ? "Gerenciar" : "Conectar"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* PIX Integration */}
          <Card className="card-premium border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-green-500" />
                PIX Integrado
              </CardTitle>
              <CardDescription>Transferências instantâneas entre contas conectadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border">
                  <h4 className="font-semibold text-gray-900 mb-2">Chaves PIX Cadastradas</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPF</span>
                      <span className="text-green-600">***.***.***-**</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Email</span>
                      <span className="text-green-600">julius@*****.com</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Telefone</span>
                      <span className="text-green-600">(11) ****-****</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border">
                  <h4 className="font-semibold text-gray-900 mb-2">Transações Recentes</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Recebido</span>
                      <span className="text-green-600">+R$ 500,00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Enviado</span>
                      <span className="text-red-600">-R$ 150,00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Recebido</span>
                      <span className="text-green-600">+R$ 1.200,00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                Corretoras e Investimentos
              </CardTitle>
              <CardDescription>Conecte suas corretoras para visão consolidada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tradingIntegrations.map((broker) => (
                <div
                  key={broker.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl border"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{broker.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{broker.name}</h4>
                      <p className="text-gray-600 text-sm">{broker.description}</p>
                      <p className="text-purple-600 font-medium text-sm mt-1">Portfólio: {broker.portfolio}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(broker.status)}
                    {getStatusBadge(broker.status)}
                    <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {broker.status === "connected" ? "Ver Detalhes" : "Conectar"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Trading */}
          <Card className="card-premium border-0 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Social Trading
              </CardTitle>
              <CardDescription>Siga e copie estratégias de traders experientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-xl border text-center">
                  <div className="text-2xl mb-2">👑</div>
                  <h4 className="font-semibold text-gray-900">Traders Seguidos</h4>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
                <div className="p-4 bg-white rounded-xl border text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <h4 className="font-semibold text-gray-900">Operações Copiadas</h4>
                  <p className="text-2xl font-bold text-green-600">47</p>
                </div>
                <div className="p-4 bg-white rounded-xl border text-center">
                  <div className="text-2xl mb-2">💰</div>
                  <h4 className="font-semibold text-gray-900">Retorno Médio</h4>
                  <p className="text-2xl font-bold text-purple-600">+18.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-500" />
                Configurações de Integração
              </CardTitle>
              <CardDescription>Gerencie suas preferências e configurações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Sincronização Automática</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dados de mercado</p>
                      <p className="text-sm text-gray-600">Atualizar cotações a cada 5 minutos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Saldos bancários</p>
                      <p className="text-sm text-gray-600">Sincronizar saldos diariamente</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Transações</p>
                      <p className="text-sm text-gray-600">Importar transações automaticamente</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Notificações</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Falhas de conexão</p>
                      <p className="text-sm text-gray-600">Notificar quando uma integração falhar</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Novas oportunidades</p>
                      <p className="text-sm text-gray-600">Alertas de investimento baseados no perfil</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Segurança</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Autenticação 2FA</p>
                      <p className="text-sm text-gray-600">Exigir 2FA para novas integrações</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Criptografia avançada</p>
                      <p className="text-sm text-gray-600">Usar criptografia end-to-end</p>
                    </div>
                    <Switch defaultChecked />
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
