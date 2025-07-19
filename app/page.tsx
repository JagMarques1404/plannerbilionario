"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  Users,
  Trophy,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Zap,
  Shield,
  Target,
  Coins,
  Award,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const { isAuthenticated, groups } = useApp()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/auth/register")
    }
  }

  const depoimentos = [
    {
      name: "Carlos Mendes",
      role: "Empresário - Grupo ELITE",
      content: "Em 8 meses saí do grupo CRESCENTE para ELITE. O networking aqui é incomparável!",
      avatar: "/placeholder.svg?height=60&width=60&text=CM",
      result: "+340% patrimônio",
    },
    {
      name: "Ana Rodrigues",
      role: "Investidora - Grupo MAGNATA",
      content: "As oportunidades VIP que recebo aqui já pagaram minha mensalidade por anos.",
      avatar: "/placeholder.svg?height=60&width=60&text=AR",
      result: "R$ 2.3M em deals",
    },
    {
      name: "Roberto Silva",
      role: "CEO - Grupo TITÃ",
      content: "O acesso a investimentos exclusivos transformou completamente meu portfólio.",
      avatar: "/placeholder.svg?height=60&width=60&text=RS",
      result: "R$ 15M+ patrimônio",
    },
  ]

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Missões Gamificadas",
      description: "Complete desafios diários e ganhe $BILLION tokens",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Networking Premium",
      description: "Conecte-se com investidores do seu nível patrimonial",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Competições Épicas",
      description: "Dispute prêmios milionários em torneios mensais",
    },
    {
      icon: <Coins className="h-8 w-8" />,
      title: "Sistema de Tokens",
      description: "Ganhe e use $BILLION tokens em todo o ecossistema",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Premium */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">DESAFIO BILIONÁRIO</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Início
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Como Funciona
              </a>
              <a href="#grupos" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Grupos
              </a>
              <a href="#precos" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Preços
              </a>
              <a href="#depoimentos" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Depoimentos
              </a>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <Button onClick={() => router.push("/dashboard")} className="btn-premium text-white font-semibold">
                  Ir para Dashboard
                </Button>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" className="font-semibold">
                      Entrar
                    </Button>
                  </Link>
                  <Button onClick={handleGetStarted} className="btn-premium text-white font-semibold">
                    COMEÇAR AGORA
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
                <a href="#inicio" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Início
                </a>
                <a href="#como-funciona" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Como Funciona
                </a>
                <a href="#grupos" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Grupos
                </a>
                <a href="#precos" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Preços
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full bg-transparent">
                      Entrar
                    </Button>
                  </Link>
                  <Button onClick={handleGetStarted} className="btn-premium text-white w-full">
                    COMEÇAR AGORA
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section Premium */}
      <section id="inicio" className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 text-lg font-semibold animate-pulse-glow">
              🚀 Mais de 27.000 membros ativos gerando riqueza!
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Transforme Sua Vida Financeira
              <span className="block text-gradient mt-2">em um Jogo</span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Junte-se a milhares de pessoas que estão construindo riqueza através de{" "}
              <span className="font-semibold text-primary">gamificação</span>,{" "}
              <span className="font-semibold text-secondary">networking premium</span> e{" "}
              <span className="font-semibold text-accent">competição saudável</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="btn-premium text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                ENTRAR NO GRUPO DO MILHÃO
                <Crown className="ml-3 h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-semibold rounded-2xl border-2 hover:bg-gray-50 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                ASSISTIR DEMO
              </Button>
            </div>

            {/* Stats Premium */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">27k+</div>
                <div className="text-gray-600 font-medium">Membros Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">R$ 2.8B</div>
                <div className="text-gray-600 font-medium">Patrimônio Gerenciado</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-success mb-2">847%</div>
                <div className="text-gray-600 font-medium">ROI Médio Anual</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">98.7%</div>
                <div className="text-gray-600 font-medium">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 gradient-secondary rounded-full opacity-20"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-16 h-16 gradient-accent rounded-full opacity-20"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Por que escolher o <span className="text-gradient">Desafio Bilionário</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A única plataforma que combina gamificação, networking premium e oportunidades exclusivas de investimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover card-premium text-center border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
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
      <section id="como-funciona" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Como Funciona</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              4 passos simples para transformar sua vida financeira
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Escolha seu Grupo",
                description: "Selecione o grupo baseado no seu patrimônio atual",
                icon: <Users className="h-8 w-8" />,
              },
              {
                step: "02",
                title: "Pague a Joia",
                description: "Invista em $BILLION tokens e pague a mensalidade",
                icon: <Coins className="h-8 w-8" />,
              },
              {
                step: "03",
                title: "Complete Missões",
                description: "Ganhe XP e tokens completando desafios diários",
                icon: <Target className="h-8 w-8" />,
              },
              {
                step: "04",
                title: "Ganhe Prêmios",
                description: "Receba recompensas, networking e oportunidades VIP",
                icon: <Trophy className="h-8 w-8" />,
              },
            ].map((item, index) => (
              <Card key={index} className="card-hover card-premium border-0 relative">
                <CardContent className="p-8 text-center">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 gradient-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-white mt-4">
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

      {/* Grupos Premium */}
      <section id="grupos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Escolha seu <span className="text-gradient">Grupo</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada grupo oferece benefícios exclusivos baseados no seu nível patrimonial
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group, index) => (
              <Card
                key={group.id}
                className={`card-hover border-0 relative overflow-hidden ${
                  index === 2 ? "ring-4 ring-yellow-400 scale-105" : ""
                }`}
              >
                {index === 2 && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 font-bold text-sm">
                    MAIS POPULAR
                  </div>
                )}
                <div className={`h-2 bg-gradient-to-r ${group.color}`}></div>
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-4">{group.icon}</div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{group.name}</CardTitle>
                  <CardDescription className="text-lg">
                    Patrimônio mínimo: <span className="font-bold">R$ {group.minWealth.toLocaleString()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {group.entryFee.toLocaleString()} $BILLION
                    </div>
                    <div className="text-gray-600">Joia de entrada</div>
                    <div className="text-lg font-semibold text-secondary mt-2">{group.monthlyFee} $BILLION/mês</div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900">Benefícios Exclusivos:</h4>
                    {group.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    {group.memberCount.toLocaleString()} membros ativos
                  </div>

                  <Button className="w-full btn-premium text-white font-semibold">
                    ENTRAR NO GRUPO
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos Premium */}
      <section id="depoimentos" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Histórias de <span className="text-gradient">Sucesso</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como nossos membros transformaram suas vidas financeiras
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
                    <Badge className="bg-success text-white">{depoimento.result}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Premium */}
      <section className="py-20 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              Pronto para se tornar um
              <span className="block text-yellow-300 mt-2">BILIONÁRIO?</span>
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
              Junte-se a milhares de pessoas que já estão construindo riqueza de forma gamificada e inteligente
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                COMEÇAR AGORA - GRÁTIS
                <Zap className="ml-3 h-8 w-8" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm opacity-80">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                <span>Garantia de 30 dias</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">DESAFIO BILIONÁRIO</span>
              </div>
              <p className="text-gray-400 mb-6">
                A maior plataforma de gamificação financeira e networking premium do Brasil
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">IG</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">YT</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">LI</span>
                </div>
              </div>
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
                    Grupos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Preços
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
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Comunidade
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
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LGPD
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 Desafio Bilionário. Todos os direitos reservados.</p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>SSL Seguro</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                <span>Certificado ISO</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
