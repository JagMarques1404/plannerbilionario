"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ThemeProvider } from "@/components/theme-provider"
import {
  Sparkles,
  Target,
  Mail,
  Brain,
  Monitor,
  Palette,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Crown,
  FileText,
  Smartphone,
  TrendingUp,
  BarChart3,
} from "lucide-react"

export default function PlannerBilionarioLanding() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section className="px-6 py-16 flex flex-col items-center text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black" />
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.1))]" />

          <div className="relative z-10 max-w-4xl">
            <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30 px-4 py-2">
              <Sparkles className="mr-2 h-4 w-4" />
              Lançamento Oficial
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Planner Bilionário
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Crie sua rotina personalizada em poucos minutos. Um app inteligente para transformar seus dias em{" "}
              <span className="text-purple-400 font-semibold">progresso real</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 rounded-xl shadow-lg shadow-purple-500/25"
                asChild
              >
                <a href="https://v0-o-que-vc-consegue-fazer.vercel.app/" target="_blank" rel="noreferrer">
                  <Zap className="mr-2 h-5 w-5" />
                  Começar Agora Gratuitamente
                </a>
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Sem cartão de crédito
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-black"
                    />
                  ))}
                </div>
                <span>+2.500 usuários</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <CheckCircle className="inline mr-3 h-8 w-8 text-green-400" />
              Por que usar o Planner Bilionário?
            </h2>
            <p className="text-gray-400 text-lg">Descubra os benefícios que vão transformar sua rotina</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Rotina Personalizada", desc: "Com base nos seus objetivos únicos" },
              { icon: Mail, title: "Receba por E-mail", desc: "Ou WhatsApp, como preferir" },
              { icon: Brain, title: "Dicas de Performance", desc: "Desbloqueie estratégias práticas" },
              { icon: Monitor, title: "100% Online", desc: "Sem instalar nada, use no navegador" },
              { icon: Palette, title: "Interface Moderna", desc: "Simples, intuitiva e bonita" },
              { icon: Zap, title: "Resultados Rápidos", desc: "Veja mudanças em poucos dias" },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                      <benefit.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{benefit.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section className="px-6 py-16 bg-gradient-to-r from-gray-900/50 to-purple-900/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">🚀 Como funciona em 3 passos simples</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Responda 3 Perguntas", desc: "Sobre sua rotina e objetivos pessoais" },
                { step: "2", title: "Receba sua Rotina", desc: "Personalizada e gerada na hora pelo app" },
                { step: "3", title: "Comece a Aplicar", desc: "E acompanhe seus resultados diários" },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                  {index < 2 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-purple-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planos */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-yellow-400">🔥</span> Comece Grátis. Atualize Quando Quiser.
            </h2>
            <p className="text-gray-400 text-lg">Escolha o plano ideal para seus objetivos</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Plano Gratuito */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Zap className="h-6 w-6 text-blue-400" />
                  Plano Gratuito
                </CardTitle>
                <CardDescription className="text-lg">Perfeito para começar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Acesso completo ao app",
                    "Rotina personalizada no navegador",
                    "Sem precisar criar conta",
                    "Suporte por email",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-6" asChild>
                  <a href="https://v0-o-que-vc-consegue-fazer.vercel.app/" target="_blank" rel="noreferrer">
                    Começar Grátis
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/20 border-purple-500 relative overflow-hidden">
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                <Crown className="mr-1 h-3 w-3" />
                Mais Popular
              </Badge>

              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-purple-300">
                  <Crown className="h-6 w-6" />
                  Plano Premium
                </CardTitle>
                <CardDescription className="text-lg text-purple-200">Para quem quer resultados máximos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { icon: FileText, text: "PDF pronto para imprimir" },
                    { icon: Smartphone, text: "Envio diário de lembretes" },
                    { icon: Target, text: "Trilha de produtividade + dicas exclusivas" },
                    { icon: BarChart3, text: "Visual com estatísticas de progresso" },
                    { icon: TrendingUp, text: "Relatórios semanais de performance" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <feature.icon className="h-5 w-5 text-purple-400" />
                      <span className="text-purple-200">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-purple-500/30">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-white">R$ 19,90 único</div>
                    <div className="text-sm text-purple-300">ou R$ 14/mês</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Crown className="mr-2 h-4 w-4" />
                    Quero Desbloquear Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="px-6 py-16 bg-gradient-to-r from-purple-900/10 to-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">📢 O que dizem os usuários</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  text: "Em 3 minutos já tinha uma rotina nova e realista. Incrível como é simples!",
                  author: "Larissa",
                  age: "28",
                  rating: 5,
                },
                {
                  text: "Genial a ideia de adaptar com base no meu objetivo. Já virei fã do app!",
                  author: "Felipe",
                  age: "35",
                  rating: 5,
                },
                {
                  text: "Organizei minha rotina matinal inteira. Valeu muito a pena investir!",
                  author: "Diego",
                  age: "24",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-gray-300 mb-4 italic">"{testimonial.text}"</blockquote>
                    <div className="text-sm">
                      <span className="font-semibold text-white">{testimonial.author}</span>
                      <span className="text-gray-400">, {testimonial.age} anos</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="px-6 py-16 max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/20 border-purple-500/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">📧 Receba dicas exclusivas</h3>
              <p className="text-gray-300 mb-6">Estratégias de produtividade e organização direto no seu email</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Seu melhor email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Inscrever-se
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Final */}
        <section className="px-6 py-20 text-center bg-gradient-to-r from-purple-900/20 via-blue-900/10 to-black">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                dominar
              </span>{" "}
              seus dias?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Teste agora o Planner Bilionário e transforme sua rotina em ação concreta.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 rounded-xl shadow-lg shadow-purple-500/25"
                asChild
              >
                <a href="https://v0-o-que-vc-consegue-fazer.vercel.app/" target="_blank" rel="noreferrer">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Começar Agora
                </a>
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Grátis para sempre
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span>✓ Sem compromisso</span>
              <span>✓ Resultados em dias</span>
              <span>✓ Suporte incluído</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-gray-800 text-center text-gray-500">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold text-white">Planner Bilionário</span>
            </div>
            <p className="text-sm">© 2024 Planner Bilionário. Transformando rotinas em resultados.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
