"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Users, Eye, MousePointer, Crown, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Visualizações",
      value: "45,231",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Usuários Únicos",
      value: "12,543",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Taxa de Conversão",
      value: "3.24%",
      change: "-0.5%",
      trend: "down",
      icon: MousePointer,
    },
    {
      title: "Receita",
      value: "R$ 23,456",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
    },
  ]

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
                  <BarChart3 className="h-6 w-6" />
                  <span>Relatórios Avançados</span>
                </h1>
                <p className="text-gray-600">Análises detalhadas e insights em tempo real</p>
              </div>
            </div>
            <Badge className="bg-blue-600">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Premium Notice */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Recurso Premium Ativo</span>
            </div>
            <p className="text-blue-700">
              Você está acessando relatórios avançados com dados em tempo real e análises preditivas.
            </p>
          </CardContent>
        </Card>

        {/* Metrics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Fontes de Tráfego</CardTitle>
                <CardDescription>De onde vêm seus visitantes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Busca Orgânica</span>
                    <span className="font-semibold">45.2%</span>
                  </div>
                  <Progress value={45.2} />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Direto</span>
                    <span className="font-semibold">28.7%</span>
                  </div>
                  <Progress value={28.7} />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Redes Sociais</span>
                    <span className="font-semibold">16.3%</span>
                  </div>
                  <Progress value={16.3} />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Email Marketing</span>
                    <span className="font-semibold">9.8%</span>
                  </div>
                  <Progress value={9.8} />
                </div>
              </CardContent>
            </Card>

            {/* Geographic Data */}
            <Card>
              <CardHeader>
                <CardTitle>Dados Geográficos</CardTitle>
                <CardDescription>Localização dos seus usuários</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Brasil</span>
                      <p className="text-sm text-gray-500">São Paulo, Rio de Janeiro</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">67.4%</span>
                      <p className="text-sm text-gray-500">8,432 usuários</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Estados Unidos</span>
                      <p className="text-sm text-gray-500">Nova York, Califórnia</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">18.2%</span>
                      <p className="text-sm text-gray-500">2,284 usuários</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Portugal</span>
                      <p className="text-sm text-gray-500">Lisboa, Porto</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">8.7%</span>
                      <p className="text-sm text-gray-500">1,092 usuários</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Real-time Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Tempo Real</span>
                </CardTitle>
                <CardDescription>Usuários ativos agora</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">247</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Página inicial</span>
                    <span>89</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Dashboard</span>
                    <span>76</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Relatórios</span>
                    <span>45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Configurações</span>
                    <span>37</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Páginas Mais Visitadas</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">/dashboard</span>
                  <span className="text-sm font-semibold">12,543</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">/</span>
                  <span className="text-sm font-semibold">8,921</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">/analytics</span>
                  <span className="text-sm font-semibold">5,432</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">/pricing</span>
                  <span className="text-sm font-semibold">3,876</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">/login</span>
                  <span className="text-sm font-semibold">2,654</span>
                </div>
              </CardContent>
            </Card>

            {/* Device Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Dispositivos</CardTitle>
                <CardDescription>Como os usuários acessam</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Desktop</span>
                    <span>58.3%</span>
                  </div>
                  <Progress value={58.3} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mobile</span>
                    <span>35.7%</span>
                  </div>
                  <Progress value={35.7} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tablet</span>
                    <span>6.0%</span>
                  </div>
                  <Progress value={6.0} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
