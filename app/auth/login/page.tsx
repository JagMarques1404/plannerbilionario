"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Sparkles, LogIn } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/app-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { addNotification } = useApp()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      addNotification({
        type: "success",
        title: "Login realizado!",
        message: "Bem-vindo ao Julius Invest Sandbox!",
      })
      router.push("/dashboard")
      setIsLoading(false)
    }, 1500)
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
              <LogIn className="h-5 w-5" />
              Entrar na Simulação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="btn-premium w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar no Sandbox"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link href="/auth/register" className="text-orange-600 hover:underline font-semibold">
                  Criar conta gratuita
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>💡 Dica:</strong> Esta é uma simulação educativa. Todos os valores são fictícios para fins de
                aprendizado sobre investimentos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
