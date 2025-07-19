"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Crown, Target, Users, Trophy, Star, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const { isAuthenticated } = useApp()
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/auth/register")
    }
  }

  const grupos = [
    { nome: "Iniciante", icon: "🥉", range: "R$ 0-10k", cor: "bg-amber-100 text-amber-800" },
    { nome: "Construtor", icon: "🥈", range: "R$ 10k-50k", cor: "bg-gray-100 text-gray-800" },
    { nome: "Acelerador", icon: "🥇", range: "R$ 50k-200k", cor: "bg-yellow-100 text-yellow-800" },
    { nome: "Investidor", icon: "💎", range: "R$ 200k-1M", cor: "bg-blue-100 text-blue-800" },
    { nome: "Magnata", icon: "👑", range: "R$ 1M-10M", cor: "bg-purple-100 text-purple-800" },
    { nome: "Titã", icon: "🏆", range: "R$ 10M+", cor: "bg-red-100 text-red-800" },
  ]

  const depoimentos = [
    {
      nome: "Ana Silva",
      cargo: "Empresária",
      texto: "Em 6 meses saí do grupo Iniciante para Construtor! As missões me ajudaram a criar disciplina financeira.",
      avatar: "👩‍💼",
    },
    {
      nome: "Carlos Santos",
      cargo: "Desenvolvedor",
      texto: "O sistema de ranking me motivou a investir mais. Já estou no top 10 do meu grupo!",
      avatar: "👨‍💻",
    },
    {
      nome: "Maria Oliveira",
      cargo: "Professora",
      texto: "Nunca pensei que aprender sobre finanças poderia ser tão divertido. Recomendo para todos!",
      avatar: "👩‍🏫",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-[#1a237e]" />
            <span className="text-2xl font-bold text-[#1a237e]">DESAFIO BILIONÁRIO</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#como-funciona" className="text-gray-600 hover:text-[#1a237e] transition-colors">
              Como Funciona
            </a>
            <a href="#grupos" className="text-gray-600 hover:text-[#1a237e] transition-colors">
              Grupos
            </a>
            <a href="#depoimentos" className="text-gray-600 hover:text-[#1a237e] transition-colors">
              Depoimentos
            </a>
            {isAuthenticated ? (
              <Button onClick={() => router.push("/dashboard")} className="bg-[#ff5722] hover:bg-[#e64a19]">
                Ir para Dashboard
              </Button>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-[#1a237e] text-[#1a237e] hover:bg-[#1a237e] hover:text-white bg-transparent"
                >
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-[#ff5722] text-white px-4 py-2 text-lg">
              🚀 Mais de 10.000 pessoas já estão no desafio!
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transforme sua vida financeira em um
              <span className="gradient-text block mt-2">jogo épico</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Junte-se a milhares de pessoas que estão construindo riqueza através de missões gamificadas, ranking
              competitivo e uma comunidade que te apoia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-[#ff5722] hover:bg-[#e64a19] text-white px-8 py-4 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                COMEÇAR AGORA - GRÁTIS
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <div className="flex items-center text-blue-100">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>100% Gratuito • Sem cartão de crédito</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ff5722]">10k+</div>
                <div className="text-blue-100">Usuários Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ff5722]">R$ 50M+</div>
                <div className="text-blue-100">Patrimônio Criado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ff5722]">95%</div>
                <div className="text-blue-100">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a237e] mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Um sistema simples e eficaz que transforma sua jornada financeira em uma experiência gamificada
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-[#ff5722] transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-[#ff5722] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[#1a237e]">1. Complete Missões</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Receba missões diárias, semanais e mensais personalizadas para seu perfil financeiro. Cada missão
                  concluída te dá XP e te aproxima dos seus objetivos.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-[#ff5722] transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-[#ff5722] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[#1a237e]">2. Suba no Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Compete com pessoas do seu nível patrimonial. O ranking é baseado no crescimento percentual, não no
                  valor absoluto - todos têm chances iguais!
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-[#ff5722] transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-[#ff5722] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[#1a237e]">3. Evolua de Grupo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comece como Iniciante e evolua até Titã. Cada grupo tem benefícios exclusivos, mentorias especiais e
                  uma comunidade engajada.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Grupos por Patrimônio */}
      <section id="grupos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a237e] mb-4">Grupos por Patrimônio</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encontre seu grupo e compete com pessoas do seu nível. A jornada é justa para todos!
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {grupos.map((grupo, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader className="pb-2">
                  <div className="text-4xl mb-2">{grupo.icon}</div>
                  <CardTitle className="text-lg text-[#1a237e]">{grupo.nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className={`${grupo.cor} text-sm`}>{grupo.range}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              💡 <strong>Dica:</strong> O ranking é baseado no crescimento percentual, não no valor absoluto!
            </p>
            <p className="text-sm text-gray-500">
              Isso significa que alguém que cresce de R$ 1.000 para R$ 1.500 (50%) fica à frente de quem cresce de R$
              100.000 para R$ 120.000 (20%)
            </p>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a237e] mb-4">O que nossos usuários dizem</h2>
            <p className="text-xl text-gray-600">Histórias reais de transformação financeira</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{depoimento.avatar}</div>
                    <div>
                      <CardTitle className="text-[#1a237e]">{depoimento.nome}</CardTitle>
                      <CardDescription>{depoimento.cargo}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{depoimento.texto}"</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#ff5722] text-[#ff5722]" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a237e] mb-4">Perguntas Frequentes</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">Como funciona o sistema de pontos?</AccordionTrigger>
                <AccordionContent>
                  Você ganha XP (pontos de experiência) completando missões. Missões diárias dão 50 XP, semanais 100-200
                  XP, e mensais 300-500 XP. Quanto mais XP, maior sua posição no ranking do seu grupo.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">É realmente gratuito?</AccordionTrigger>
                <AccordionContent>
                  Sim! O Desafio Bilionário é 100% gratuito. Temos planos premium opcionais com mentorias exclusivas e
                  ferramentas avançadas, mas você pode usar todas as funcionalidades principais sem pagar nada.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Como são definidos os grupos?</AccordionTrigger>
                <AccordionContent>
                  Os grupos são baseados no seu patrimônio atual declarado. Você compete apenas com pessoas do seu
                  nível, tornando a competição justa. Conforme seu patrimônio cresce, você evolui para grupos
                  superiores.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Preciso compartilhar dados bancários?</AccordionTrigger>
                <AccordionContent>
                  Não! Você apenas declara seu patrimônio atual e metas. Não pedimos acesso a contas bancárias ou dados
                  sensíveis. Tudo é baseado na sua autodeclaração e comprometimento pessoal.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">Quanto tempo preciso dedicar por dia?</AccordionTrigger>
                <AccordionContent>
                  Apenas 10-15 minutos por dia! As missões são projetadas para se encaixar na sua rotina. O importante é
                  a consistência, não o tempo gasto.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para transformar sua vida financeira?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão construindo riqueza de forma gamificada e divertida
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-[#ff5722] hover:bg-[#e64a19] text-white px-12 py-6 text-2xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            COMEÇAR AGORA - GRÁTIS
            <Crown className="ml-3 h-8 w-8" />
          </Button>
          <p className="mt-4 text-blue-100">
            ✅ Cadastro em 2 minutos • ✅ Sem cartão de crédito • ✅ Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a237e] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="h-6 w-6" />
                <span className="text-xl font-bold">DESAFIO BILIONÁRIO</span>
              </div>
              <p className="text-blue-200">Transformando vidas através da gamificação financeira</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-blue-200">
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
                    Missões
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ranking
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-blue-200">
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
                    FAQ
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
              <h4 className="font-bold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  YouTube
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 Desafio Bilionário. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
