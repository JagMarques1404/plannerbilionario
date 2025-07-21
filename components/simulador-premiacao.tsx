"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, TrendingUp, Zap, Calculator, Gem } from "lucide-react"
import { AnimatedCounter } from "@/components/epic-animations"

interface SimuladorPremiacaoProps {
  className?: string
}

export function SimuladorPremiacao({ className }: SimuladorPremiacaoProps) {
  const [posicaoAtual, setPosicaoAtual] = useState(23)
  const [cenario, setCenario] = useState("conservador")
  const [tipoCalculo, setTipoCalculo] = useState("mensal")

  const cenarios = {
    conservador: { multiplicador: 1, descricao: "Crescimento estável", cor: "blue" },
    moderado: { multiplicador: 1.5, descricao: "Crescimento acelerado", cor: "green" },
    otimista: { multiplicador: 2.2, descricao: "Crescimento explosivo", cor: "orange" },
    premium: { multiplicador: 3.5, descricao: "Cenário premium", cor: "purple" },
  }

  const tiposPremiacao = {
    mensal: { pool: 125000, descricao: "🏆 Premiação Mensal", multiplicador: 1 },
    trimestral: { pool: 450000, descricao: "🎯 Premiação Trimestral", multiplicador: 1.2 },
    anual: { pool: 2847500, descricao: "👑 Grande Prêmio Anual", multiplicador: 1.5 },
    especial: { pool: 5000000, descricao: "💎 Evento Especial", multiplicador: 2 },
  }

  const getTierInfo = (posicao: number) => {
    if (posicao <= 1) return { nome: "Lendário", cor: "from-purple-500 to-pink-500", icone: "👑" }
    if (posicao <= 5) return { nome: "Diamante", cor: "from-blue-500 to-cyan-500", icone: "💎" }
    if (posicao <= 10) return { nome: "Platina", cor: "from-gray-400 to-gray-600", icone: "🏆" }
    if (posicao <= 25) return { nome: "Ouro", cor: "from-yellow-400 to-orange-500", icone: "🥇" }
    if (posicao <= 50) return { nome: "Prata", cor: "from-gray-300 to-gray-500", icone: "🥈" }
    return { nome: "Bronze", cor: "from-orange-400 to-red-500", icone: "🥉" }
  }

  const calcularPremio = () => {
    const poolBase = tiposPremiacao[tipoCalculo as keyof typeof tiposPremiacao].pool
    const posicaoFator = Math.max(1, 101 - posicaoAtual) / 100
    const multiplicadorCenario = cenarios[cenario as keyof typeof cenarios].multiplicador
    const multiplicadorTipo = tiposPremiacao[tipoCalculo as keyof typeof tiposPremiacao].multiplicador

    let bonusRanking = 1
    if (posicaoAtual <= 1) bonusRanking = 3
    else if (posicaoAtual <= 5) bonusRanking = 2
    else if (posicaoAtual <= 10) bonusRanking = 1.5

    const premio = poolBase * posicaoFator * multiplicadorCenario * multiplicadorTipo * bonusRanking * 0.1
    return premio
  }

  const calcularMetas = () => {
    const premioAtual = calcularPremio()
    return [
      { posicao: 10, premio: premioAtual * 2.5, diferenca: Math.max(0, posicaoAtual - 10) },
      { posicao: 5, premio: premioAtual * 4, diferenca: Math.max(0, posicaoAtual - 5) },
      { posicao: 1, premio: premioAtual * 8, diferenca: Math.max(0, posicaoAtual - 1) },
    ]
  }

  const tierAtual = getTierInfo(posicaoAtual)
  const metas = calcularMetas()

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-purple-600" />
            Simulador de Premiação Real
          </CardTitle>
          <CardDescription className="text-lg">
            Descubra quanto você ganharia se os prêmios fossem reais! 💰
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Sua Posição Atual</label>
              <div className="relative">
                <input
                  type="number"
                  value={posicaoAtual}
                  onChange={(e) => setPosicaoAtual(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  min="1"
                  max="10000"
                />
                <div
                  className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${tierAtual.cor} flex items-center justify-center text-white text-sm font-bold shadow-lg`}
                >
                  {tierAtual.icone}
                </div>
              </div>
              <Badge className={`bg-gradient-to-r ${tierAtual.cor} text-white border-0`}>Tier {tierAtual.nome}</Badge>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Tipo de Premiação</label>
              <select
                value={tipoCalculo}
                onChange={(e) => setTipoCalculo(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              >
                {Object.entries(tiposPremiacao).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.descricao}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Cenário de Crescimento</label>
              <select
                value={cenario}
                onChange={(e) => setCenario(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              >
                {Object.entries(cenarios).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.descricao}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Resultado Principal */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center border-2 border-green-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gem className="h-8 w-8 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-800">Seu Prêmio Estimado</h3>
            </div>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
              R$ <AnimatedCounter value={calcularPremio()} />
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <Badge variant="outline" className="bg-white">
                Posição #{posicaoAtual}
              </Badge>
              <Badge variant="outline" className="bg-white">
                {cenarios[cenario as keyof typeof cenarios].descricao}
              </Badge>
              <Badge variant="outline" className="bg-white">
                {tiposPremiacao[tipoCalculo as keyof typeof tiposPremiacao].descricao}
              </Badge>
            </div>
          </div>

          {/* Breakdown e Metas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Breakdown do Cálculo */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-500" />
                  Breakdown do Cálculo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pool Total:</span>
                  <span className="font-semibold">
                    R$ {tiposPremiacao[tipoCalculo as keyof typeof tiposPremiacao].pool.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fator Posição:</span>
                  <span className="font-semibold">{((101 - posicaoAtual) / 100).toFixed(2)}x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Multiplicador Cenário:</span>
                  <span className="font-semibold">{cenarios[cenario as keyof typeof cenarios].multiplicador}x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bônus Ranking:</span>
                  <span className="font-semibold text-green-600">
                    {posicaoAtual <= 1 ? "+200%" : posicaoAtual <= 5 ? "+100%" : posicaoAtual <= 10 ? "+50%" : "Base"}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Seu Prêmio:</span>
                  <span className="font-bold text-green-600">
                    R$ <AnimatedCounter value={calcularPremio()} />
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Metas para Melhorar */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  Metas para Melhorar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {metas.map((meta, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {meta.posicao === 1 ? "👑 1º Lugar" : `🏆 Top ${meta.posicao}`}
                      </span>
                      <span className="text-sm text-gray-600">-{meta.diferenca} posições</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        R$ <AnimatedCounter value={meta.premio} />
                      </span>
                      <Badge
                        className={
                          meta.posicao === 1
                            ? "bg-purple-100 text-purple-800"
                            : meta.posicao === 5
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                        }
                      >
                        +{((meta.premio / calcularPremio() - 1) * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <Progress value={Math.max(0, 100 - (meta.diferenca / posicaoAtual) * 100)} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Aviso e Call to Action */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-orange-600" />
                <p className="text-lg font-semibold text-orange-800">⚠️ Valores Fictícios para Demonstração</p>
              </div>
              <p className="text-orange-700">
                Na versão real da plataforma, você receberia estes prêmios em tokens BILLION!
              </p>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all">
                <TrendingUp className="h-5 w-5 mr-2" />
                Melhorar Posição Agora
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
