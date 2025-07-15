"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, FileText, Globe, Shield, ArrowLeft, Check, Crown, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan") || "premium"

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [loading, setLoading] = useState(false)

  const planDetails = {
    premium: {
      name: "Premium",
      price: "R$ 29",
      period: "/mês",
      features: [
        "Projetos ilimitados",
        "Relatórios avançados",
        "Colaboração em equipe",
        "100GB de armazenamento",
        "Backup automático",
        "Suporte prioritário",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: "R$ 99",
      period: "/mês",
      features: [
        "Tudo do Premium",
        "Usuários ilimitados",
        "Armazenamento ilimitado",
        "SLA garantido",
        "Suporte dedicado",
        "API completa",
      ],
    },
  }

  const currentPlan = planDetails[plan as keyof typeof planDetails] || planDetails.premium

  const handlePayment = async () => {
    setLoading(true)

    // Simular processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Atualizar plano do usuário
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      user.plan = plan
      localStorage.setItem("user", JSON.stringify(user))
    }

    setLoading(false)
    router.push("/dashboard?upgraded=true")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/pricing" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar aos Planos</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">ProApp</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Finalizar Assinatura</h1>
          <p className="text-gray-600">Complete seu pagamento e comece a usar todos os recursos</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Método de Pagamento</CardTitle>
                <CardDescription>Escolha como deseja pagar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Payment Methods */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("credit-card")}
                    className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                      paymentMethod === "credit-card" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span className="text-sm font-medium">Cartão</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                      paymentMethod === "pix" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="text-sm font-medium">PIX</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("boleto")}
                    className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                      paymentMethod === "boleto" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <FileText className="h-6 w-6" />
                    <span className="text-sm font-medium">Boleto</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                      paymentMethod === "paypal" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <Globe className="h-6 w-6" />
                    <span className="text-sm font-medium">PayPal</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            {paymentMethod === "credit-card" && (
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Cartão</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Número do Cartão</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Nome no Cartão</Label>
                    <Input id="card-name" placeholder="João Silva" />
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "pix" && (
              <Card>
                <CardHeader>
                  <CardTitle>Pagamento via PIX</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Smartphone className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-medium mb-2">PIX Instantâneo</h3>
                    <p className="text-gray-600 mb-4">Após confirmar, você receberá o código PIX para pagamento</p>
                    <Badge className="bg-green-600">Confirmação Imediata</Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "boleto" && (
              <Card>
                <CardHeader>
                  <CardTitle>Boleto Bancário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-medium mb-2">Boleto Bancário</h3>
                    <p className="text-gray-600 mb-4">
                      Vencimento em 3 dias úteis. Confirmação em até 2 dias úteis após pagamento.
                    </p>
                    <Badge variant="outline">Processamento: 1-2 dias</Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "paypal" && (
              <Card>
                <CardHeader>
                  <CardTitle>PayPal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Globe className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-medium mb-2">PayPal</h3>
                    <p className="text-gray-600 mb-4">
                      Você será redirecionado para o PayPal para completar o pagamento
                    </p>
                    <Badge className="bg-blue-600">Seguro e Rápido</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  <span>Resumo do Pedido</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Plano {currentPlan.name}</span>
                  <Badge className="bg-blue-600">{currentPlan.name}</Badge>
                </div>
                <div className="flex items-center justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>
                    {currentPlan.price}
                    {currentPlan.period}
                  </span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Incluído no plano:</h4>
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Garantias</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Garantia de reembolso em 7 dias</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Cancele a qualquer momento</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Suporte 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Dados protegidos com SSL</span>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handlePayment} disabled={loading} className="w-full text-lg py-6">
              {loading ? "Processando..." : `Assinar ${currentPlan.name} - ${currentPlan.price}${currentPlan.period}`}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade. Sua assinatura será
              renovada automaticamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
