"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Coins, TrendingUp, Trophy, Target } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if user is already logged in (via localStorage)
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const savedEmail = localStorage.getItem("julius_user_email")
      if (savedEmail) {
        router.push("/")
      }
    } catch (error) {
      console.error("Auth check error:", error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Por favor, digite um email")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Verificar se o usuário já existe no banco
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single()

      let userData = null

      if (existingUser && !fetchError) {
        // Usuário existe
        userData = existingUser
        console.log("Usuário existente encontrado:", existingUser.name)
      } else {
        // Criar novo usuário
        const { data: newUser, error: createError } = await supabase
          .from("users")
          .insert({
            email: email,
            name: email.split("@")[0] || "Usuário Sandbox",
            xp: 0,
            level: 1,
            tokens: 1000,
            balance: 100000,
            current_streak: 0,
            longest_streak: 0,
            total_missions_completed: 0,
            last_login_date: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single()

        if (createError) {
          console.error("Erro ao criar usuário:", createError)
          setError("Erro ao criar conta de usuário")
          return
        }

        userData = newUser
        console.log("Novo usuário criado:", newUser.name)
      }

      // Salvar dados do usuário no localStorage (autenticação simplificada para sandbox)
      if (typeof window !== "undefined") {
        localStorage.setItem("julius_user_email", email)
        localStorage.setItem("julius_user_id", userData.id)
        localStorage.setItem("julius_user_data", JSON.stringify(userData))
        localStorage.setItem("julius_auth_token", `sandbox_${Date.now()}`) // Token simples para sandbox
      }

      console.log("Login bem-sucedido, redirecionando...")
      router.push("/")
    } catch (error) {
      console.error("Erro no login:", error)
      setError("Falha na autenticação. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-orange-400 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Julius Invest</h1>
          </div>
          <div className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
            MODO SANDBOX - VALORES FICTÍCIOS
          </div>
          <p className="text-gray-600">Plataforma de gamificação financeira para educação e diversão</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email (qualquer email para demonstração)
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar no Sandbox"}
            </button>
          </form>

          {/* Quick Login Options */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3">Ou use um dos emails de exemplo:</p>
            <div className="flex flex-wrap gap-2">
              {["alex@example.com", "maria@example.com", "david@example.com"].map((exampleEmail) => (
                <button
                  key={exampleEmail}
                  onClick={() => setEmail(exampleEmail)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                >
                  {exampleEmail}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <Coins className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Tokens $BILLION</h3>
            <p className="text-sm text-gray-600">Moeda virtual do jogo</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Investimentos</h3>
            <p className="text-sm text-gray-600">Simulação realista</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Missões Diárias</h3>
            <p className="text-sm text-gray-600">7 desafios por dia</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Ranking Global</h3>
            <p className="text-sm text-gray-600">Compete com outros</p>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          Todos os valores são fictícios. Esta é uma demonstração educativa.
        </div>
      </div>
    </div>
  )
}
