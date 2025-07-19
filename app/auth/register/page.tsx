"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Coins, ArrowLeft, Gift } from "lucide-react"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { useRouter } from "next/navigation"
import { SandboxHeader } from "@/components/sandbox-header"

export default function RegisterPage() {
  const { register } = useApp()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const success = await register(formData)
      if (success) {
        router.push("/onboarding")
      }
    } catch (error) {
      console.error("Erro no registro:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SandboxHeader />

      <div className="flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-julius-orange transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para home
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Coins className="h-8 w-8 text-julius-orange" />
              <span className="text-2xl font-bold text-gradient-julius">JULIUS INVEST</span>
            </div>
            <p className="text-gray-600">Crie sua conta e comece sua jornada</p>
          </div>

          <Card className="shadow-2xl card-premium border-0">
            <CardHeader>
              <CardTitle className="text-center text-julius-blue">Criar Conta Gratuita</CardTitle>
              <CardDescription className="text-center">
                Receba R$ 100.000 + 1.250 tokens $BILLION para começar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-gradient-to-r from-julius-orange to-julius-yellow rounded-xl text-white text-center">
                <Gift className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-bold mb-1">Bônus de Boas-vindas</h3>
                <p className="text-sm opacity-90">R$ 100.000 + 1.250 $BILLION tokens</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
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
                    required
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
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full btn-julius text-white font-semibold py-3"
                  disabled={loading || !formData.name || !formData.email || !formData.password}
                >
                  {loading ? "Criando conta..." : "CRIAR CONTA GRÁTIS"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Badge className="bg-green-100 text-green-800 px-3 py-1">✅ 100% Gratuito - Valores Fictícios</Badge>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-gray-600 mt-4">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="text-julius-orange hover:underline font-semibold">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
