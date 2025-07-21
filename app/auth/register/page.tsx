"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Sparkles, UserPlus, Gift } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/app-context"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { addNotification } = useApp()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      addNotification({
        type: "error",
        title: "Erro",
        message: "As senhas não coincidem!",
      })
      return
    }

    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      addNotification({
        type: "success",
        title: "Conta criada!",
        message: "Bem-vindo ao Julius Invest! Você ganhou 1000 tokens de bônus!",
      })
      router.push("/dashboard")
      setIsLoading(false)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50 flex items-center justify-center p-4">
      {/* Sandbox Warning Banner */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 text-center font-bold z-50">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>🚨 MODO SANDBOX - AMBIENTE DE SIMULAÇÃO 🚨</span>
          <AlertTriangle className="h-4 w-4" />
        </div>
      </div>

      <div className="w-full max-w-md mt-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Julius Invest</h1>
          <Badge variant="outline" className="bg-yellow-100 border-yellow-300">
            <Sparkles className="h-4 w-4 mr-2" />
            Sandbox Educativo
          </Badge>
        </div>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <UserPlus className="h-5 w-5" />
              Criar Conta Gratuita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-800">
                <Gift className="h-4 w-4" />
                <span className="text-sm font-semibold">Bônus de Boas-vindas: 1.000 tokens $BILLION!</span>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="btn-premium w-full" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Criar Conta e Ganhar Bônus"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link href="/auth/login" className="text-orange-600 hover:underline font-semibold">
                  Fazer login
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>📚 Educativo:</strong> Esta plataforma é 100% educativa. Aprenda sobre investimentos sem riscos
                reais!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
