"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calculator, Trophy, TrendingUp, Target, Zap, BarChart3, DollarSign } from "lucide-react"
import { SimuladorPremiacao } from "@/components/simulador-premiacao"
import { ROICalculator } from "@/components/roi-calculator"

export default function SimuladoresPage() {
  const [activeTab, setActiveTab] = useState("premiacao")

  const simuladores = [
    {
      id: "premiacao",
      nome: "Simulador de Premiação",
      descricao: "Descubra quanto você ganharia nos rankings",
      icone: Trophy,
      cor: "from-purple-500 to-pink-500",
      badge: "Novo",
    },
    {
      id: "roi",
      nome: "Calculadora de ROI",
      descricao: "Simule diferentes estratégias de investimento",
      icone: Calculator,
      cor: "from-blue-500 to-cyan-500",
      badge: "Popular",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Simuladores Financeiros
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ferramentas avançadas para simular seus ganhos e otimizar suas estratégias de investimento
          </p>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">R$ 2.8M</div>
              <p className="text-sm text-gray-600">Pool Total Mensal</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">7.2K</div>
              <p className="text-sm text-gray-600">Usuários Ativos</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">+23.4%</div>
              <p className="text-sm text-gray-600">ROI Médio Mensal</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">89.3%</div>
              <p className="text-sm text-gray-600">Taxa de Sucesso</p>
            </CardContent>
          </Card>
        </div>

        {/* Navegação dos Simuladores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {simuladores.map((simulador) => {
            const IconeComponent = simulador.icone
            return (
              <Card
                key={simulador.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  activeTab === simulador.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-lg"
                }`}
                onClick={() => setActiveTab(simulador.id)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${simulador.cor} flex items-center justify-center mb-4`}
                  >
                    <IconeComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CardTitle className="text-xl">{simulador.nome}</CardTitle>
                    <Badge className="bg-gradient-to-r from-orange-400 to-red-400 text-white border-0">
                      {simulador.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">{simulador.descricao}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Conteúdo dos Simuladores */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="hidden">
            <TabsTrigger value="premiacao">Premiação</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
          </TabsList>

          <TabsContent value="premiacao" className="space-y-6">
            <SimuladorPremiacao />
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <ROICalculator />
          </TabsContent>
        </Tabs>

        {/* Dicas e Avisos */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-yellow-800">💡 Dicas para Maximizar seus Resultados</h3>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>
                    • <strong>Consistência:</strong> Mantenha streaks longos para bônus progressivos
                  </li>
                  <li>
                    • <strong>Diversificação:</strong> Combine diferentes tipos de investimento
                  </li>
                  <li>
                    • <strong>Planejamento:</strong> Use os simuladores para definir metas realistas
                  </li>
                  <li>
                    • <strong>Paciência:</strong> Investimentos de longo prazo tendem a ter melhores retornos
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
