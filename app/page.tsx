"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  DollarSign,
  Shield,
  BookOpen,
  Trophy,
  Gamepad2,
  Eye,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [stats, setStats] = useState({
    users: 0,
    patrimony: 0,
    transactions: 0,
  })

  const slides = [
    {
      title: "Aprenda Investindo",
      description: "Simule investimentos reais sem riscos financeiros",
      icon: BookOpen,
    },
    {
      title: "Gamificação Épica",
      description: "Ganhe XP, tokens e conquiste níveis investindo",
      icon: Trophy,
    },
    {
      title: "Transparência Total",
      description: "Veja todas as métricas da empresa em tempo real",
      icon: Eye,
    },
  ]

  const features = [
    {
      title: "Educação Financeira",
      description: "Aprenda conceitos de investimento através da prática simulada",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Gamificação",
      description: "Sistema de níveis, XP, tokens e conquistas para motivar o aprendizado",
      icon: Gamepad2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Transparência",
      description: "Métricas da empresa visíveis: receita, usuários, reservas de emergência",
      icon: Shield,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  // Animate stats on mount
  useEffect(() => {
    const animateStats = () => {
      const targetUsers = 6347
      const targetPatrimony = 72500000
      const targetTransactions = 28934

      let currentUsers = 0
      let currentPatrimony = 0
      let currentTransactions = 0

      const interval = setInterval(() => {
        if (currentUsers < targetUsers) {
          currentUsers += Math.ceil(targetUsers / 100)
          if (currentUsers > targetUsers) currentUsers = targetUsers
        }
        if (currentPatrimony < targetPatrimony) {
          currentPatrimony += Math.ceil(targetPatrimony / 100)
          if (currentPatrimony > targetPatrimony) currentPatrimony = targetPatrimony
        }
        if (currentTransactions < targetTransactions) {
          currentTransactions += Math.ceil(targetTransactions / 100)
          if (currentTransactions > targetTransactions) currentTransactions = targetTransactions
        }

        setStats({
          users: currentUsers,
          patrimony: currentPatrimony,
          transactions: currentTransactions,
        })

        if (
          currentUsers >= targetUsers &&
          currentPatrimony >= targetPatrimony &&
          currentTransactions >= targetTransactions
        ) {
          clearInterval(interval)
        }
      }, 50)
    }

    animateStats()
  }, [])

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="julius-bg min-h-screen">
      {/* Alert Banner */}
      <Alert className="m-4 border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="font-medium">
          🎓 <strong>PLATAFORMA EDUCACIONAL:</strong> Todos os valores são simulados para fins de aprendizado. Esta é
          uma ferramenta educativa sobre investimentos.
        </AlertDescription>
      </Alert>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-2xl shadow-lg">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gradient mb-4">Julius Invest</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            A plataforma educacional que transforma aprendizado em investimentos através de gamificação e transparência
            total
          </p>

          {/* Hero Carousel */}
          <Card className="card-premium max-w-2xl mx-auto mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                {(() => {
                  const IconComponent = slides[currentSlide].icon
                  return <IconComponent className="h-16 w-16 text-orange-500" />
                })()}
              </div>
              <h2 className="text-2xl font-bold julius-text-dark mb-2">{slides[currentSlide].title}</h2>
              <p className="text-gray-600">{slides[currentSlide].description}</p>
              <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-orange-500 w-8" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button className="btn-premium text-lg px-8 py-4">
                Começar Jornada
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-orange-300 hover:bg-orange-50 bg-transparent"
              >
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="card-premium card-hover text-center">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 animate-counter">{stats.users.toLocaleString()}</div>
              <p className="text-gray-600">Usuários Ativos</p>
            </CardContent>
          </Card>

          <Card className="card-premium card-hover text-center">
            <CardContent className="p-6">
              <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-600 animate-counter">
                R$ {(stats.patrimony / 1000000).toFixed(1)}M
              </div>
              <p className="text-gray-600">Patrimônio Simulado</p>
            </CardContent>
          </Card>

          <Card className="card-premium card-hover text-center">
            <CardContent className="p-6">
              <BarChart3 className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-orange-600 animate-counter">
                {stats.transactions.toLocaleString()}
              </div>
              <p className="text-gray-600">Transações Realizadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Tabs defaultValue="education" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
            <TabsTrigger value="education" className="rounded-xl font-semibold">
              Educação
            </TabsTrigger>
            <TabsTrigger value="gamification" className="rounded-xl font-semibold">
              Gamificação
            </TabsTrigger>
            <TabsTrigger value="transparency" className="rounded-xl font-semibold">
              Transparência
            </TabsTrigger>
          </TabsList>

          <TabsContent value="education" className="mt-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                  Educação Financeira Prática
                </CardTitle>
                <CardDescription className="text-lg">
                  Aprenda investimentos através de simulações realistas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">📚 Conteúdo Educativo</h3>
                    <p className="text-gray-600 mb-4">
                      Artigos, vídeos e tutoriais sobre conceitos fundamentais de investimento
                    </p>
                    <h3 className="font-semibold mb-2">🎯 Simulações Realistas</h3>
                    <p className="text-gray-600">Pratique com dados reais do mercado sem riscos financeiros</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                    <Target className="h-12 w-12 text-blue-500 mb-4" />
                    <h4 className="font-bold text-blue-900 mb-2">Missões Educativas</h4>
                    <p className="text-blue-700 text-sm">
                      Complete desafios práticos e aprenda conceitos importantes de forma interativa
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gamification" className="mt-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Sistema de Gamificação
                </CardTitle>
                <CardDescription className="text-lg">Torne o aprendizado divertido e motivador</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                    <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h4 className="font-bold text-yellow-900 mb-2">Níveis e XP</h4>
                    <p className="text-yellow-700 text-sm">Ganhe experiência completando missões e desafios</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h4 className="font-bold text-green-900 mb-2">Tokens $BILLION</h4>
                    <p className="text-green-700 text-sm">Ganhe tokens que representam participação nos lucros</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <h4 className="font-bold text-purple-900 mb-2">Conquistas</h4>
                    <p className="text-purple-700 text-sm">Desbloqueie badges e conquistas especiais</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transparency" className="mt-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Eye className="h-6 w-6 text-orange-500" />
                  Transparência Total
                </CardTitle>
                <CardDescription className="text-lg">Veja todas as métricas da empresa em tempo real</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Receita Mensal:</span>
                      <Badge className="bg-green-100 text-green-800">R$ 2,8M</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Margem de Lucro:</span>
                      <Badge className="bg-blue-100 text-blue-800">50%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Reserva de Emergência:</span>
                      <Badge className="bg-orange-100 text-orange-800">R$ 5,2M</Badge>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl">
                    <Shield className="h-12 w-12 text-orange-500 mb-4" />
                    <h4 className="font-bold text-orange-900 mb-2">Auditoria Aberta</h4>
                    <p className="text-orange-700 text-sm">
                      Todas as métricas financeiras são públicas e atualizadas em tempo real para total transparência
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="card-premium text-center animate-pulse-glow">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gradient mb-4">Pronto para Começar?</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Junte-se a milhares de pessoas aprendendo a investir de forma gamificada e transparente
            </p>
            <Link href="/auth/register">
              <Button className="btn-premium text-xl px-12 py-4">
                Criar Conta Gratuita
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
