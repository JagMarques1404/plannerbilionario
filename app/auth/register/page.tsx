"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Crown, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const { register } = useApp()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    patrimonio: 0,
    meta12meses: 0,
    dificuldadePrincipal: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const success = await register(formData)
      if (success) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Erro no registro:", error)
    } finally {
      setLoading(false)
    }
  }

  const getGrupoByPatrimonio = (patrimonio: number): string => {
    if (patrimonio < 10000) return "Iniciante 🥉"
    if (patrimonio < 50000) return "Construtor 🥈"
    if (patrimonio < 200000) return "Acelerador 🥇"
    if (patrimonio < 1000000) return "Investidor 💎"
    if (patrimonio < 10000000) return "Magnata 👑"
    return "Titã 🏆"
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-white hover:text-blue-200 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="h-8 w-8 text-[#ff5722]" />
            <span className="text-2xl font-bold text-white">DESAFIO BILIONÁRIO</span>
          </div>
          <p className="text-blue-200">Crie sua conta e comece sua jornada</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-[#1a237e]">
              {step === 1 && "Dados Pessoais"}
              {step === 2 && "Situação Financeira"}
              {step === 3 && "Definir Metas"}
            </CardTitle>
            <CardDescription className="text-center">Etapa {step} de 3</CardDescription>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#ff5722] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleNext}
                  className="w-full bg-[#ff5722] hover:bg-[#e64a19]"
                  disabled={!formData.name || !formData.email || !formData.password}
                >
                  Continuar
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="patrimonio">Qual seu patrimônio atual?</Label>
                  <Input
                    id="patrimonio"
                    type="number"
                    placeholder="Ex: 25000"
                    value={formData.patrimonio || ""}
                    onChange={(e) => handleInputChange("patrimonio", Number(e.target.value))}
                  />
                  <p className="text-sm text-gray-500">Inclua investimentos, conta corrente, poupança, etc.</p>
                  {formData.patrimonio > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        🎯 Você será classificado no grupo: <strong>{getGrupoByPatrimonio(formData.patrimonio)}</strong>
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Qual sua principal dificuldade financeira?</Label>
                  <Select onValueChange={(value) => handleInputChange("dificuldadePrincipal", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="controlar-gastos">Controlar gastos</SelectItem>
                      <SelectItem value="poupar-dinheiro">Poupar dinheiro</SelectItem>
                      <SelectItem value="investir">Começar a investir</SelectItem>
                      <SelectItem value="aumentar-renda">Aumentar renda</SelectItem>
                      <SelectItem value="organizar-financas">Organizar finanças</SelectItem>
                      <SelectItem value="quitar-dividas">Quitar dívidas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                    Voltar
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-[#ff5722] hover:bg-[#e64a19]"
                    disabled={!formData.patrimonio || !formData.dificuldadePrincipal}
                  >
                    Continuar
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="meta12meses">Qual sua meta de patrimônio em 12 meses?</Label>
                  <Input
                    id="meta12meses"
                    type="number"
                    placeholder="Ex: 50000"
                    value={formData.meta12meses || ""}
                    onChange={(e) => handleInputChange("meta12meses", Number(e.target.value))}
                  />
                  {formData.meta12meses > formData.patrimonio && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        🚀 Meta de crescimento:{" "}
                        <strong>
                          {(((formData.meta12meses - formData.patrimonio) / formData.patrimonio) * 100).toFixed(1)}%
                        </strong>{" "}
                        em 12 meses
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Resumo do seu perfil:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Grupo: {getGrupoByPatrimonio(formData.patrimonio)}</li>
                    <li>• Patrimônio atual: R$ {formData.patrimonio.toLocaleString()}</li>
                    <li>• Meta 12 meses: R$ {formData.meta12meses.toLocaleString()}</li>
                    <li>• Foco: {formData.dificuldadePrincipal.replace("-", " ")}</li>
                  </ul>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                    Voltar
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-[#ff5722] hover:bg-[#e64a19]"
                    disabled={loading || !formData.meta12meses}
                  >
                    {loading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-blue-200 mt-4">
          Já tem uma conta?{" "}
          <Link href="/auth/login" className="text-[#ff5722] hover:underline font-semibold">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}
