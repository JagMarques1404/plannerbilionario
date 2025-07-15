import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Zap, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Perfeito para começar",
      features: ["Até 3 projetos", "Relatórios básicos", "Suporte por email", "1GB de armazenamento", "Acesso básico"],
      limitations: [
        "Sem colaboração em equipe",
        "Sem relatórios avançados",
        "Sem backup automático",
        "Sem suporte prioritário",
      ],
      buttonText: "Plano Atual",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Premium",
      price: "R$ 29",
      period: "/mês",
      description: "Para profissionais e equipes",
      features: [
        "Projetos ilimitados",
        "Relatórios avançados",
        "Colaboração em equipe",
        "100GB de armazenamento",
        "Backup automático",
        "Suporte prioritário",
        "Integrações avançadas",
        "Segurança premium",
      ],
      limitations: [],
      buttonText: "Assinar Agora",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "R$ 99",
      period: "/mês",
      description: "Para grandes organizações",
      features: [
        "Tudo do Premium",
        "Usuários ilimitados",
        "Armazenamento ilimitado",
        "SLA garantido",
        "Suporte dedicado",
        "Customizações",
        "API completa",
        "Compliance avançado",
      ],
      limitations: [],
      buttonText: "Contatar Vendas",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ProApp</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/login">
              <Button>Entrar</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Escolha o plano ideal para você</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece gratuitamente e faça upgrade quando precisar de mais recursos. Todos os recursos premium estão
            temporariamente disponíveis.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600">
                    <Crown className="w-3 h-3 mr-1" />
                    Mais Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700">Incluído:</h4>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-700">Limitações:</h4>
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <X className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-600">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                {plan.name === "Premium" ? (
                  <Link href="/checkout?plan=premium">
                    <Button className="w-full">Assinar Agora</Button>
                  </Link>
                ) : plan.name === "Enterprise" ? (
                  <Link href="/checkout?plan=enterprise">
                    <Button className="w-full bg-transparent" variant="outline">
                      Assinar Enterprise
                    </Button>
                  </Link>
                ) : (
                  <Button className="w-full" variant={plan.buttonVariant} disabled={plan.name === "Gratuito"}>
                    {plan.buttonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Métodos de Pagamento</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cartão de Crédito/Débito</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Visa, Mastercard, American Express</p>
                <p className="text-sm text-gray-500">Cobrança automática mensal</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">PIX</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Pagamento instantâneo</p>
                <p className="text-sm text-gray-500">Confirmação imediata</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Boleto Bancário</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Vencimento em 3 dias úteis</p>
                <p className="text-sm text-gray-500">Confirmação em até 2 dias úteis</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">PayPal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Pagamento internacional</p>
                <p className="text-sm text-gray-500">Processamento seguro</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso cancelar a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sim, você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento ou multas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como funciona o período de teste?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Atualmente todos os recursos premium estão liberados gratuitamente enquanto desenvolvemos o sistema de
                  pagamento.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso fazer upgrade/downgrade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sim, você pode alterar seu plano a qualquer momento. As mudanças entram em vigor no próximo ciclo de
                  cobrança.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Há desconto para pagamento anual?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sim, ofereceremos desconto de 20% para assinaturas anuais quando o sistema de pagamento estiver ativo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
