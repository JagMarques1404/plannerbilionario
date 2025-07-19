"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Bell, Key, Database, Cloud, AlertTriangle, CheckCircle, RefreshCw, Trash2, Plus } from "lucide-react"

const apiConnections = [
  {
    id: "banco-brasil",
    name: "Banco do Brasil",
    type: "Bancária",
    status: "connected",
    lastSync: "2024-01-20T14:30:00",
    permissions: ["read_balance", "read_transactions"],
    logo: "🏦",
  },
  {
    id: "nubank",
    name: "Nubank",
    type: "Bancária",
    status: "connected",
    lastSync: "2024-01-20T12:15:00",
    permissions: ["read_balance", "read_transactions", "read_cards"],
    logo: "💜",
  },
  {
    id: "binance",
    name: "Binance",
    type: "Exchange",
    status: "error",
    lastSync: "2024-01-19T18:45:00",
    permissions: ["read_portfolio", "read_trades"],
    logo: "🟡",
  },
  {
    id: "clear",
    name: "Clear Corretora",
    type: "Corretora",
    status: "disconnected",
    lastSync: null,
    permissions: [],
    logo: "📈",
  },
]

export default function IntegrationsSettingsPage() {
  const [connections, setConnections] = useState(apiConnections)
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    transactionAlerts: true,
    syncErrors: true,
    weeklyReports: false,
    marketNews: true,
  })

  const handleToggleConnection = (id: string) => {
    setConnections((prev) =>
      prev.map((conn) =>
        conn.id === id ? { ...conn, status: conn.status === "connected" ? "disconnected" : "connected" } : conn,
      ),
    )
  }

  const handleSyncConnection = (id: string) => {
    // Simular sincronização
    setConnections((prev) =>
      prev.map((conn) => (conn.id === id ? { ...conn, lastSync: new Date().toISOString() } : conn)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "disconnected":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Conectado"
      case "error":
        return "Erro"
      case "disconnected":
        return "Desconectado"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Configurações de Integrações</h1>
          <p className="text-gray-600 text-lg">Gerencie suas conexões e APIs simuladas</p>
        </div>
        <Badge className="bg-red-500 text-white px-4 py-2">
          <AlertTriangle className="h-4 w-4 mr-2" />
          MODO SIMULADO
        </Badge>
      </div>

      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="connections" className="rounded-xl font-semibold">
            Conexões
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="rounded-xl font-semibold">
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl font-semibold">
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl font-semibold">
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Conexões */}
        <TabsContent value="connections" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-gray-900">
                    <Database className="h-5 w-5 mr-2 text-blue-500" />
                    Conexões Ativas (Simuladas)
                  </CardTitle>
                  <CardDescription>Gerencie suas integrações bancárias e de investimento</CardDescription>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Conexão
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connections.map((connection) => (
                  <div key={connection.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{connection.logo}</div>
                        <div>
                          <div className="font-semibold text-gray-900">{connection.name}</div>
                          <div className="text-sm text-gray-600">{connection.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(connection.status)}>{getStatusText(connection.status)}</Badge>
                        <Switch
                          checked={connection.status === "connected"}
                          onCheckedChange={() => handleToggleConnection(connection.id)}
                        />
                      </div>
                    </div>

                    {connection.lastSync && (
                      <div className="text-sm text-gray-600 mb-3">
                        Última sincronização: {new Date(connection.lastSync).toLocaleString()}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {connection.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSyncConnection(connection.id)}
                          className="bg-transparent"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Sincronizar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api-keys" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Key className="h-5 w-5 mr-2 text-yellow-500" />
                Chaves de API (Simuladas)
              </CardTitle>
              <CardDescription>Gerencie suas chaves de acesso às APIs externas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Importante</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Todas as chaves de API são simuladas. Em um ambiente real, mantenha suas chaves seguras e nunca as
                  compartilhe.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Binance API Key</span>
                    <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Input value="sk_test_••••••••••••••••••••••••••••••••" readOnly className="font-mono text-sm" />
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Mostrar
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">Criada em: 15/01/2024 • Último uso: 20/01/2024</div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Alpha Vantage API Key</span>
                    <Badge className="bg-gray-100 text-gray-800">Inativa</Badge>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Input value="av_test_••••••••••••••••••••••••••••••••" readOnly className="font-mono text-sm" />
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Mostrar
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">Criada em: 10/01/2024 • Nunca usada</div>
                </div>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Nova Chave
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Bell className="h-5 w-5 mr-2 text-purple-500" />
                Configurações de Notificação
              </CardTitle>
              <CardDescription>Configure quando e como receber alertas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">Alertas de Preço</div>
                    <div className="text-sm text-gray-600">Notificações quando ativos atingem alvos</div>
                  </div>
                  <Switch
                    checked={notifications.priceAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, priceAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">Alertas de Transação</div>
                    <div className="text-sm text-gray-600">Notificações de movimentações bancárias</div>
                  </div>
                  <Switch
                    checked={notifications.transactionAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, transactionAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">Erros de Sincronização</div>
                    <div className="text-sm text-gray-600">Alertas quando APIs falham</div>
                  </div>
                  <Switch
                    checked={notifications.syncErrors}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, syncErrors: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">Relatórios Semanais</div>
                    <div className="text-sm text-gray-600">Resumo semanal por email</div>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyReports: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">Notícias do Mercado</div>
                    <div className="text-sm text-gray-600">Atualizações importantes do mercado</div>
                  </div>
                  <Switch
                    checked={notifications.marketNews}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketNews: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="security" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                Configurações de Segurança
              </CardTitle>
              <CardDescription>Proteja suas integrações e dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">Criptografia Ativa</span>
                </div>
                <p className="text-sm text-green-700">Todas as suas chaves de API são criptografadas com AES-256.</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Cloud className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Backup Automático</span>
                </div>
                <p className="text-sm text-blue-700">Configurações são salvas automaticamente na nuvem.</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Logs de Acesso (Simulados)</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span>Login via API - Binance</span>
                      <span className="text-gray-500">20/01/2024 14:30</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span>Sincronização - Nubank</span>
                      <span className="text-gray-500">20/01/2024 12:15</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span>Chave API criada</span>
                      <span className="text-gray-500">19/01/2024 09:45</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Ver Todos os Logs
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
