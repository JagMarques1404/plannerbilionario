"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Users,
  Star,
  CheckCircle,
  Play,
  Zap,
  Shield,
  Award,
  Menu,
  X,
  Coins,
  Trophy,
  BookOpen,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { useRouter } from "next/navigation"
import { SandboxHeader } from "@/components/sandbox-header"

export default function LandingPage() {
  const { isAuthenticated } = useApp()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/auth/register")
    }
  }

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Hábitos Financeiros",
      description: "Transforme sua rotina em XP e tokens $BILLION",
      color: "text-julius-orange",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Sistema de Joias",
      description: "Evolua de Bronze a Diamante conforme cresce",
      color: "text-julius-blue",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Educação Gamificada",
      description: "Aprenda investindo através de missões e desafios",
      color: "text-julius-yellow",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Comunidade Ativa",
      description: "Conecte-se com outros investidores em crescimento",
      color: "text-julius-orange",
    },
  ]

  const depoimentos = [
    {
      name: "Ana Silva",
      role: "Joia Ouro - 45 dias de streak",
      content: "Nunca pensei que cuidar das finanças pudesse ser tão divertido! Os hábitos diários mudaram minha vida.",
      avatar: "/placeholder.svg?height=60&width=60&text=AS",
      result: "+127% patrimônio",
    },
    {
      name: "Carlos Santos",
      role: "Joia Platina - Top 10 ranking",
      content: "O sistema de gamificação me motivou a estudar investimentos todos os dias. Resultados incríveis!",
      avatar: "/placeholder.svg?height=60&width=60&text=CS",
      result: "R$ 250k investidos",
    },
    {
      name: "Maria Oliveira",
      role: "Joia Diamante - 120 dias streak",
      content: "A disciplina que desenvolvi aqui se refletiu em todas as áreas da minha vida. Recomendo demais!",
      avatar: "/placeholder.svg?height=60&width=60&text=MO",
      result: "+89% crescimento",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SandboxHeader />

      {/* Header */}
      <header className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-julius rounded-xl flex items-center justify-center">
                <Coins className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient-julius">JULIUS INVEST</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-julius-orange transition-colors font-medium">
                Início
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-julius-orange transition-colors font-medium">
                Como Funciona
              </a>
              <a href="#habitos" className="text-gray-700 hover:text-julius-orange transition-colors font-medium">
                Hábitos
              </a>
              <a href="#depoimentos" className="text-gray-700 hover:text-julius-orange transition-colors font-medium">
                Depoimentos
              </a>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <Button onClick={() => router.push("/dashboard")} className="btn-julius text-white font-semibold">
                  Ir para Dashboard
                </Button>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" className="font-semibold">
                      Entrar
                    </Button>
                  </Link>
                  <Button onClick={handleGetStarted} className="btn-julius text-white font-semibold">
                    COMEÇAR GRÁTIS
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4 mt-4">
                <a href="#inicio" className="text-gray-700 hover:text-julius-orange transition-colors font-medium">
                  Início
                </a>
                <a
                  href="#como-funciona"
                  className="text-gray-700 hover:text-julius-orange transition-colors font-medium"
                >
                  Como Funciona
                </a>
                <a href="#habitos" className="text-gray-700 hover:text-julius-orange transition-colors font-medium">
                  Hábitos
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full bg-transparent">
                      Entrar
                    </Button>
                  </Link>
                  <Button onClick={handleGetStarted} className="btn-julius text-white w-full">
                    COMEÇAR GRÁTIS
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-julius opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-julius-orange to-julius-yellow text-white px-6 py-2 text-lg font-semibold animate-pulse-glow">
              🚀 Mais de 15.000 pessoas transformando hábitos em riqueza!
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Transforme Seus Hábitos
              <span className="block text-gradient-julius mt-2">em Riqueza</span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A primeira plataforma que transforma{" "}
              <span className="font-semibold text-julius-orange">educação financeira</span> em um jogo viciante.{" "}
              <span className="font-semibold text-julius-blue">Desenvolva hábitos</span>,{" "}
              <span className="font-semibold text-julius-yellow">ganhe tokens</span> e{" "}
              <span className="font-semibold text-julius-orange">construa patrimônio</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="btn-julius text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                COMEÇAR JORNADA GRÁTIS
                <Zap className="ml-3 h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-semibold rounded-2xl border-2 hover:bg-gray-50 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                VER DEMONSTRAÇÃO
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-julius-orange mb-2">15k+</div>
                <div className="text-gray-600 font-medium">Usuários Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-julius-blue mb-2">R$ 50M</div>
                <div className="text-gray-600 font-medium">Patrimônio Gerenciado</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-julius-yellow mb-2">2.8M</div>
                <div className="text-gray-600 font-medium">Hábitos Completados</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-julius-orange mb-2">94%</div>
                <div className="text-gray-600 font-medium">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-julius-orange rounded-full opacity-20"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-16 h-16 bg-julius-blue rounded-full opacity-20"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Por que escolher o <span className="text-gradient-julius">Julius Invest</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A única plataforma que combina gamificação, educação financeira e desenvolvimento de hábitos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover card-premium text-center border-0">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Como Funciona</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              4 passos simples para transformar seus hábitos financeiros
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Crie Sua Conta",
                description: "Cadastre-se gratuitamente e receba R$ 100k + 1.250 tokens para começar",
                icon: <Users className="h-8 w-8" />,
                color: "bg-julius-orange",
              },
              {
                step: "02",
                title: "Complete Hábitos",
                description: "Registre gastos, estude investimentos e desenvolva disciplina diária",
                icon: <Target className="h-8 w-8" />,
                color: "bg-julius-blue",
              },
              {
                step: "03",
                title: "Ganhe Recompensas",
                description: "Receba XP, tokens $BILLION e badges por cada hábito completado",
                icon: <Star className="h-8 w-8" />,
                color: "bg-julius-yellow",
              },
              {
                step: "04",
                title: "Evolua Suas Joias",
                description: "Use tokens para comprar joias melhores e desbloquear benefícios",
                icon: <Trophy className="h-8 w-8" />,
                color: "bg-julius-orange",
              },
            ].map((item, index) => (
              <Card key={index} className="card-hover card-premium border-0 relative">
                <CardContent className="p-8 text-center">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {item.step}
                    </div>
                  </div>
                  <div
                    className={`w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 text-julius-orange`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hábitos Section */}
      <section id="habitos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Hábitos que <span className="text-gradient-julius">Transformam</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              6 hábitos diários que vão revolucionar sua relação com o dinheiro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "📝", title: "Registrar Gastos", desc: "Anote todos os gastos do dia", xp: 50, tokens: 10 },
              { icon: "🎯", title: "Meta de Economia", desc: "Defina quanto quer economizar", xp: 75, tokens: 15 },
              { icon: "📚", title: "Estudar Investimentos", desc: "15min de aprendizado diário", xp: 100, tokens: 20 },
              { icon: "🧠", title: "Aprendizado", desc: "Leia artigos ou assista vídeos", xp: 80, tokens: 16 },
              { icon: "🤝", title: "Networking", desc: "Interaja com a comunidade", xp: 60, tokens: 12 },
              { icon: "🙏", title: "Gratidão", desc: "Reflita sobre 3 gratidões", xp: 40, tokens: 8 },
            ].map((habito, index) => (
              <Card key={index} className="card-hover border-0 overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 text-center">{habito.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-center">{habito.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 text-center">{habito.desc}</p>
                  <div className="flex justify-center space-x-4">
                    <Badge className="bg-blue-100 text-blue-800">+{habito.xp} XP</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">+{habito.tokens} $B</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Histórias de <span className="text-gradient-julius">Transformação</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como nossos usuários transformaram seus hábitos financeiros
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <Card key={index} className="card-hover card-premium border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={depoimento.avatar || "/placeholder.svg"}
                      alt={depoimento.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{depoimento.name}</h4>
                      <p className="text-gray-600 text-sm">{depoimento.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{depoimento.content}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Badge className="bg-green-500 text-white">{depoimento.result}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 gradient-julius text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              Pronto para Transformar
              <span className="block text-julius-yellow mt-2">Seus Hábitos?</span>
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
              Junte-se a milhares de pessoas que já estão construindo riqueza através de hábitos inteligentes
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-white text-julius-orange hover:bg-gray-100 px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                COMEÇAR AGORA - GRÁTIS
                <Heart className="ml-3 h-8 w-8" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm opacity-80">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                <span>Valores fictícios para aprender</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-julius rounded-xl flex items-center justify-center">
                  <Coins className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">JULIUS INVEST</span>
              </div>
              <p className="text-gray-400 mb-6">
                A primeira plataforma de gamificação financeira focada em hábitos e educação
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6">Produto</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hábitos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sistema de Joias
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Marketplace
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Suporte</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tutorial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Comunidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Modo Sandbox
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 Julius Invest. Todos os direitos reservados.</p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>Modo Sandbox</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                <span>Valores Fictícios</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
