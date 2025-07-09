"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Smartphone, BarChart3, Users, Rocket, Clock, Globe } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Performance Extrema",
    description: "Carregamento ultra-rápido com otimizações avançadas e CDN global.",
    badge: "Novo",
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    description: "Proteção de dados com criptografia de ponta e conformidade LGPD.",
    badge: null,
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Interface responsiva que funciona perfeitamente em todos os dispositivos.",
    badge: null,
  },
  {
    icon: BarChart3,
    title: "Analytics Inteligente",
    description: "Insights detalhados sobre performance e comportamento dos usuários.",
    badge: "Popular",
  },
  {
    icon: Users,
    title: "Colaboração em Tempo Real",
    description: "Trabalhe em equipe com sincronização instantânea e comentários.",
    badge: null,
  },
  {
    icon: Rocket,
    title: "Deploy Automático",
    description: "Publique suas mudanças automaticamente com integração Git.",
    badge: null,
  },
  {
    icon: Clock,
    title: "Suporte 24/7",
    description: "Equipe especializada disponível a qualquer hora para te ajudar.",
    badge: null,
  },
  {
    icon: Globe,
    title: "Alcance Global",
    description: "Infraestrutura mundial para entregar conteúdo com baixa latência.",
    badge: null,
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600 dark:text-purple-400">Recursos Poderosos</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Tudo que você precisa para ter sucesso
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Nossa plataforma oferece todas as ferramentas necessárias para criar, gerenciar e escalar seus projetos
            digitais com eficiência.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    {feature.badge && (
                      <Badge variant={feature.badge === "Novo" ? "default" : "secondary"}>{feature.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-6">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
