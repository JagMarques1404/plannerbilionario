"use client"

import type { ReactNode } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Crown, Zap, Gift } from "lucide-react"

interface CardAnimadoProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export const CardAnimado = ({ children, className = "", hover = true, glow = false }: CardAnimadoProps) => {
  return (
    <div
      className={`
      transform transition-all duration-300 
      ${hover ? "hover:scale-105 hover:shadow-xl hover:-translate-y-1" : ""}
      ${glow ? "hover:shadow-2xl hover:shadow-blue-500/25" : ""}
      bg-white rounded-xl shadow-lg 
      ${className}
    `}
    >
      {children}
    </div>
  )
}

// Variação Premium
interface CardPremiumProps {
  titulo: string
  descricao?: string
  preco?: string
  precoOriginal?: string
  desconto?: number
  categoria: string
  nivel: "iniciante" | "intermediario" | "avancado"
  children?: ReactNode
  onComprar?: () => void
}

export const CardPremium = ({
  titulo,
  descricao,
  preco,
  precoOriginal,
  desconto,
  categoria,
  nivel,
  children,
  onComprar,
}: CardPremiumProps) => {
  const coresNivel = {
    iniciante: "from-green-400 to-green-600",
    intermediario: "from-yellow-400 to-yellow-600",
    avancado: "from-red-400 to-red-600",
  }

  return (
    <CardAnimado className="relative overflow-hidden" glow>
      {desconto && desconto > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-red-500 text-white animate-pulse">-{desconto}%</Badge>
        </div>
      )}

      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${coresNivel[nivel]}`} />

      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {categoria}
          </Badge>
          <Crown className="w-4 h-4 text-yellow-500" />
        </div>
        <CardTitle className="text-lg">{titulo}</CardTitle>
        {descricao && <CardDescription>{descricao}</CardDescription>}
      </CardHeader>

      <CardContent>
        {children}

        {preco && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                {precoOriginal && <span className="text-sm text-gray-500 line-through mr-2">{precoOriginal}</span>}
                <span className="text-xl font-bold text-green-600">{preco}</span>
              </div>
              {onComprar && (
                <button
                  onClick={onComprar}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Comprar
                </button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </CardAnimado>
  )
}

// Variação Patrocinado
interface CardPatrocinadoProps {
  titulo: string
  parceiro: string
  descricao: string
  recompensa: string
  dificuldade: "facil" | "medio" | "dificil"
  children?: ReactNode
  onIniciar?: () => void
}

export const CardPatrocinado = ({
  titulo,
  parceiro,
  descricao,
  recompensa,
  dificuldade,
  children,
  onIniciar,
}: CardPatrocinadoProps) => {
  const coresDificuldade = {
    facil: "text-green-500",
    medio: "text-yellow-500",
    dificil: "text-red-500",
  }

  return (
    <CardAnimado className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className="bg-yellow-500 text-white">
            <Star className="w-3 h-3 mr-1" />
            Patrocinado
          </Badge>
          <Badge variant="outline" className={coresDificuldade[dificuldade]}>
            {dificuldade.toUpperCase()}
          </Badge>
        </div>
        <CardTitle className="text-lg">{titulo}</CardTitle>
        <CardDescription>
          Parceiro: <span className="font-semibold">{parceiro}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{descricao}</p>

        {children}

        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <Gift className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-semibold text-green-800">Recompensa: {recompensa}</span>
          </div>
        </div>

        {onIniciar && (
          <button
            onClick={onIniciar}
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <Zap className="w-4 h-4 mr-2" />
            Iniciar Agora
          </button>
        )}
      </CardContent>
    </CardAnimado>
  )
}

// Variação Missão
interface CardMissaoProps {
  titulo: string
  descricao: string
  progresso: number
  meta: number
  recompensa: string
  prazo?: string
  tipo: "diaria" | "semanal" | "mensal" | "especial"
  children?: ReactNode
}

export const CardMissao = ({
  titulo,
  descricao,
  progresso,
  meta,
  recompensa,
  prazo,
  tipo,
  children,
}: CardMissaoProps) => {
  const progressoPercentual = (progresso / meta) * 100
  const completa = progresso >= meta

  const coresTipo = {
    diaria: "from-blue-400 to-blue-600",
    semanal: "from-green-400 to-green-600",
    mensal: "from-purple-400 to-purple-600",
    especial: "from-pink-400 to-pink-600",
  }

  return (
    <CardAnimado className={`${completa ? "ring-2 ring-green-500 bg-green-50" : ""}`}>
      <div className={`h-1 bg-gradient-to-r ${coresTipo[tipo]}`} />

      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {tipo.toUpperCase()}
          </Badge>
          {completa && <Badge className="bg-green-500 text-white">✅ Completa</Badge>}
        </div>
        <CardTitle className="text-lg">{titulo}</CardTitle>
        <CardDescription>{descricao}</CardDescription>
      </CardHeader>

      <CardContent>
        {children}

        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progresso</span>
            <span>
              {progresso} / {meta}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${completa ? "bg-green-500" : "bg-blue-500"}`}
              style={{ width: `${Math.min(progressoPercentual, 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Recompensa: <span className="font-semibold">{recompensa}</span>
            </span>
            {prazo && <span className="text-orange-600">⏰ {prazo}</span>}
          </div>
        </div>
      </CardContent>
    </CardAnimado>
  )
}
