"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, BarChart3, Users, Shield, Settings, LogOut, Crown, TrendingUp, FileText, Bell } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">ProApp</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={user.plan === "premium" ? "default" : "secondary"}>
              {user.plan === "premium" ? "Premium" : "Gratuito"}
            </Badge>
            <Link href="/dashboard/notifications">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Olá, {user.name || user.email}!</h1>
          <p className="text-gray-600">Bem-vindo ao seu dashboard. Aqui você pode acessar todas as funcionalidades.</p>
        </div>

        {/* Premium Notice */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800">Área Premium Temporariamente Aberta</span>
            </div>
            <p className="text-yellow-700 mb-4">
              Você tem acesso completo a todos os recursos premium enquanto configuramos os meios de pagamento.
            </p>
            <Link href="/pricing">
              <Button variant="outline" size="sm">
                Ver Planos Futuros
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projetos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 desde o mês passado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+15% desde a semana passada</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 5.432</div>
              <p className="text-xs text-muted-foreground">+8% desde o mês passado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversão</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23.5%</div>
              <p className="text-xs text-muted-foreground">+3.2% desde ontem</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Free Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Recursos Gratuitos</span>
                </CardTitle>
                <CardDescription>Funcionalidades disponíveis no plano gratuito</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Projetos básicos</span>
                  <Badge variant="secondary">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Relatórios simples</span>
                  <Badge variant="secondary">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Suporte por email</span>
                  <Badge variant="secondary">Ativo</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uso mensal</span>
                    <span>75/100</span>
                  </div>
                  <Progress value={75} />
                </div>
              </CardContent>
            </Card>

            {/* Premium Features */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-blue-600" />
                  <span>Recursos Premium</span>
                  <Badge className="bg-blue-600">Acesso Liberado</Badge>
                </CardTitle>
                <CardDescription>Funcionalidades avançadas temporariamente disponíveis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/dashboard/analytics">
                  <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <span>Relatórios Avançados</span>
                    </div>
                    <Badge variant="outline">Disponível</Badge>
                  </div>
                </Link>
                <Link href="/dashboard/team">
                  <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-green-600" />
                      <span>Colaboração em Equipe</span>
                    </div>
                    <Badge variant="outline">Disponível</Badge>
                  </div>
                </Link>
                <Link href="/dashboard/security">
                  <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span>Segurança Avançada</span>
                    </div>
                    <Badge variant="outline">Disponível</Badge>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/projects">
                  <Button className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerenciar Projetos
                  </Button>
                </Link>
                <Link href="/dashboard/notifications">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Bell className="h-4 w-4 mr-2" />
                    Ver Notificações
                  </Button>
                </Link>
                <Link href="/dashboard/integrations">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Zap className="h-4 w-4 mr-2" />
                    Integrações
                  </Button>
                </Link>
                <Link href="/dashboard/settings">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Button>
                </Link>
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Novo Projeto
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Convidar Equipe
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Relatórios
                </Button>
                <Link href="/pricing">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Crown className="h-4 w-4 mr-2" />
                    Ver Planos
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Projeto "Website" atualizado</p>
                    <p className="text-xs text-gray-500">2 horas atrás</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Novo membro adicionado</p>
                    <p className="text-xs text-gray-500">1 dia atrás</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Backup realizado</p>
                    <p className="text-xs text-gray-500">2 dias atrás</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
