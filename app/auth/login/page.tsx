"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Crown, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { login } = useApp()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Email ou senha incorretos")
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setLoading(false)
    }
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
          <p className="text-blue-200">Entre na sua conta</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-[#1a237e]">Fazer Login</CardTitle>
            <CardDescription className="text-center">Acesse sua conta e continue sua jornada</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
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
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <Button type="submit" className="w-full bg-[#ff5722] hover:bg-[#e64a19]" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-[#1a237e] hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-blue-200 mt-4">
          Não tem uma conta?{" "}
          <Link href="/auth/register" className="text-[#ff5722] hover:underline font-semibold">
            Cadastre-se grátis
          </Link>
        </p>
      </div>
    </div>
  )
}
