"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Grátis",
    description: "Perfeito para começar",
    features: ["Até 3 projetos", "5GB de armazenamento", "Suporte por email", "SSL gratuito", "Analytics básico"],
    cta: "Começar grátis",
    popular: false,
  },
  {
    name: "Pro",
    price: "R$ 29",
    period: "/mês",
    description: "Para profissionais e pequenas equipes",
    features: [
      "Projetos ilimitados",
      "100GB de armazenamento",
      "Suporte prioritário",
      "SSL + CDN",
      "Analytics avançado",
      "Colaboração em equipe",
      "Integrações premium",
    ],
    cta: "Começar teste grátis",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "R$ 99",
    period: "/mês",
    description: "Para grandes empresas",
    features: [
      "Tudo do Pro",
      "Armazenamento ilimitado",
      "Suporte 24/7",
      "SLA garantido",
      "White-label",
      "API personalizada",
      "Gerente de conta dedicado",
      "Treinamento personalizado",
    ],
    cta: "Falar com vendas",
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600 dark:text-purple-400">Preços</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Escolha o plano ideal para você
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Comece gratuitamente e escale conforme seu crescimento. Sem taxas ocultas.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "ring-2 ring-purple-600 shadow-lg" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600">
                  <Zap className="mr-1 h-3 w-3" />
                  Mais Popular
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{plan.period}</span>
                  )}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Todos os planos incluem teste grátis de 14 dias. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  )
}
