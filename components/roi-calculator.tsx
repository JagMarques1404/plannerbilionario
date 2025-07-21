"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Target, PieChart, BarChart3, Info, Download, Share2, Bookmark } from "lucide-react"

interface ROIResult {
  totalReturn: number
  percentageReturn: number
  annualizedReturn: number
  monthlyReturn: number
  totalProfit: number
  breakEvenTime: number
  riskLevel: string
  recommendation: string
}

export function ROICalculator() {
  const [calculationType, setCalculationType] = useState("simple")
  const [inputs, setInputs] = useState({
    initialInvestment: "",
    finalValue: "",
    timeframe: "",
    timeUnit: "months",
    monthlyContribution: "",
    interestRate: "",
    compoundFrequency: "monthly",
    inflationRate: "4.5",
    fees: "",
  })

  const [result, setResult] = useState<ROIResult | null>(null)
  const [savedCalculations, setSavedCalculations] = useState<any[]>([])

  const calculateROI = () => {
    const initial = Number.parseFloat(inputs.initialInvestment) || 0
    const final = Number.parseFloat(inputs.finalValue) || 0
    const time = Number.parseFloat(inputs.timeframe) || 1
    const monthly = Number.parseFloat(inputs.monthlyContribution) || 0
    const rate = Number.parseFloat(inputs.interestRate) || 0
    const fees = Number.parseFloat(inputs.fees) || 0
    const inflation = Number.parseFloat(inputs.inflationRate) || 0

    if (initial === 0) return

    let totalReturn = 0
    let percentageReturn = 0
    let annualizedReturn = 0
    let monthlyReturn = 0
    let totalProfit = 0

    if (calculationType === "simple") {
      // ROI Simples
      totalReturn = final - initial
      percentageReturn = (totalReturn / initial) * 100
      const timeInYears = inputs.timeUnit === "months" ? time / 12 : time
      annualizedReturn = Math.pow(final / initial, 1 / timeInYears) - 1
      monthlyReturn = Math.pow(1 + annualizedReturn, 1 / 12) - 1
      totalProfit = totalReturn - fees
    } else if (calculationType === "compound") {
      // Juros Compostos
      const timeInMonths = inputs.timeUnit === "months" ? time : time * 12
      const monthlyRate = rate / 100 / 12

      // Valor futuro com aportes mensais
      const futureValue =
        initial * Math.pow(1 + monthlyRate, timeInMonths) +
        monthly * ((Math.pow(1 + monthlyRate, timeInMonths) - 1) / monthlyRate)

      totalReturn = futureValue - initial - monthly * timeInMonths
      percentageReturn = (totalReturn / (initial + monthly * timeInMonths)) * 100
      annualizedReturn = rate / 100
      monthlyReturn = monthlyRate
      totalProfit = totalReturn - fees
    }

    // Ajustar pela inflação
    const realReturn = (1 + annualizedReturn) / (1 + inflation / 100) - 1

    // Determinar nível de risco
    let riskLevel = "Baixo"
    let recommendation = "Investimento conservador adequado para perfil iniciante"

    if (percentageReturn > 15) {
      riskLevel = "Alto"
      recommendation = "Retorno elevado indica maior risco. Diversifique seus investimentos."
    } else if (percentageReturn > 8) {
      riskLevel = "Médio"
      recommendation = "Retorno equilibrado. Mantenha disciplina e consistência."
    }

    const breakEvenTime = initial / (monthly || 1)

    setResult({
      totalReturn,
      percentageReturn,
      annualizedReturn: annualizedReturn * 100,
      monthlyReturn: monthlyReturn * 100,
      totalProfit,
      breakEvenTime,
      riskLevel,
      recommendation,
    })
  }

  const saveCalculation = () => {
    if (!result) return

    const calculation = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      type: calculationType,
      inputs: { ...inputs },
      result: { ...result },
    }

    setSavedCalculations((prev) => [calculation, ...prev.slice(0, 4)]) // Manter apenas 5 cálculos
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Calculator className="h-6 w-6 text-blue-600" />
            Calculadora de ROI Avançada
          </CardTitle>
          <p className="text-base text-gray-600">
            Calcule o retorno sobre investimento com precisão e planeje suas estratégias financeiras
          </p>
        </CardHeader>

        <CardContent>
          <Tabs value={calculationType} onValueChange={setCalculationType} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="simple" className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                ROI Simples
              </TabsTrigger>
              <TabsTrigger value="compound" className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                <BarChart3 className="h-4 w-4 mr-2" />
                Juros Compostos
              </TabsTrigger>
              <TabsTrigger value="advanced" className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                <PieChart className="h-4 w-4 mr-2" />
                Análise Avançada
              </TabsTrigger>
            </TabsList>

            {/* ROI Simples */}
            <TabsContent value="simple" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="initial" className="text-base font-medium text-gray-700">
                      Investimento Inicial (R$)
                    </Label>
                    <Input
                      id="initial"
                      type="number"
                      placeholder="10.000"
                      value={inputs.initialInvestment}
                      onChange={(e) => setInputs({ ...inputs, initialInvestment: e.target.value })}
                      className="text-base focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final" className="text-base font-medium text-gray-700">
                      Valor Final (R$)
                    </Label>
                    <Input
                      id="final"
                      type="number"
                      placeholder="15.000"
                      value={inputs.finalValue}
                      onChange={(e) => setInputs({ ...inputs, finalValue: e.target.value })}
                      className="text-base focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="timeframe" className="text-base font-medium text-gray-700">
                        Período
                      </Label>
                      <Input
                        id="timeframe"
                        type="number"
                        placeholder="12"
                        value={inputs.timeframe}
                        onChange={(e) => setInputs({ ...inputs, timeframe: e.target.value })}
                        className="text-base focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-medium text-gray-700">Unidade</Label>
                      <Select
                        value={inputs.timeUnit}
                        onValueChange={(value) => setInputs({ ...inputs, timeUnit: value })}
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-lg rounded-xl border border-gray-100">
                          <SelectItem value="months">Meses</SelectItem>
                          <SelectItem value="years">Anos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fees" className="text-base font-medium text-gray-700">
                      Taxas e Custos (R$)
                    </Label>
                    <Input
                      id="fees"
                      type="number"
                      placeholder="100"
                      value={inputs.fees}
                      onChange={(e) => setInputs({ ...inputs, fees: e.target.value })}
                      className="text-base focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    />
                  </div>
                </div>

                {/* Resultado */}
                <div className="space-y-4">
                  {result && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        Resultado do Cálculo
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-base text-gray-700">Retorno Total:</span>
                          <span className="text-xl font-bold text-green-600">{formatCurrency(result.totalReturn)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-base text-gray-700">Retorno Percentual:</span>
                          <span className="text-xl font-bold text-blue-600">
                            {formatPercentage(result.percentageReturn)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-base text-gray-700">Retorno Anualizado:</span>
                          <span className="text-lg font-semibold text-gray-800">
                            {formatPercentage(result.annualizedReturn)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-base text-gray-700">Lucro Líquido:</span>
                          <span className="text-lg font-semibold text-green-600">
                            {formatCurrency(result.totalProfit)}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              className={`${
                                result.riskLevel === "Alto"
                                  ? "bg-red-100 text-red-800"
                                  : result.riskLevel === "Médio"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              } px-2 py-1 rounded-full text-sm font-medium`}
                            >
                              Risco {result.riskLevel}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{result.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={calculateROI}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular ROI
                </Button>

                {result && (
                  <>
                    <Button
                      variant="outline"
                      onClick={saveCalculation}
                      className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 bg-transparent"
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      Salvar
                    </Button>
                    <Button
                      variant="outline"
                      className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                    <Button
                      variant="outline"
                      className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 bg-transparent"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>

            {/* Juros Compostos */}
            <TabsContent value="compound" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="compound-initial" className="text-base font-medium text-gray-700">
                      Investimento Inicial (R$)
                    </Label>
                    <Input
                      id="compound-initial"
                      type="number"
                      placeholder="10.000"
                      value={inputs.initialInvestment}
                      onChange={(e) => setInputs({ ...inputs, initialInvestment: e.target.value })}
                      className="text-base focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly-contribution" className="text-base font-medium text-gray-700">
                      Aporte Mensal (R$)
                    </Label>
                    <Input
                      id="monthly-contribution"
                      type="number"
                      placeholder="500"
                      value={inputs.monthlyContribution}
                      onChange={(e) => setInputs({ ...inputs, monthlyContribution: e.target.value })}
                      className="text-base focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest-rate" className="text-base font-medium text-gray-700">
                      Taxa de Juros Anual (%)
                    </Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      placeholder="12"
                      step="0.1"
                      value={inputs.interestRate}
                      onChange={(e) => setInputs({ ...inputs, interestRate: e.target.value })}
                      className="text-base focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="compound-timeframe" className="text-base font-medium text-gray-700">
                        Período
                      </Label>
                      <Input
                        id="compound-timeframe"
                        type="number"
                        placeholder="60"
                        value={inputs.timeframe}
                        onChange={(e) => setInputs({ ...inputs, timeframe: e.target.value })}
                        className="text-base focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-medium text-gray-700">Unidade</Label>
                      <Select
                        value={inputs.timeUnit}
                        onValueChange={(value) => setInputs({ ...inputs, timeUnit: value })}
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-lg rounded-xl border border-gray-100">
                          <SelectItem value="months">Meses</SelectItem>
                          <SelectItem value="years">Anos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Resultado Juros Compostos */}
                <div className="space-y-4">
                  {result && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-green-600" />
                        Projeção de Crescimento
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-base text-gray-700">Valor Futuro:</span>
                          <span className="text-xl font-bold text-green-600">
                            {formatCurrency(result.totalReturn + Number.parseFloat(inputs.initialInvestment || "0"))}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-base text-gray-700">Juros Ganhos:</span>
                          <span className="text-xl font-bold text-blue-600">{formatCurrency(result.totalReturn)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-base text-gray-700">Retorno Mensal:</span>
                          <span className="text-lg font-semibold text-gray-800">
                            {formatPercentage(result.monthlyReturn)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-base text-gray-700">Retorno Anual:</span>
                          <span className="text-lg font-semibold text-gray-800">
                            {formatPercentage(result.annualizedReturn)}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-green-200">
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              💡 <strong>Dica:</strong> O poder dos juros compostos se intensifica com o tempo
                            </p>
                            <p>📈 Mantenha a disciplina nos aportes mensais para maximizar os resultados</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={calculateROI}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Calcular Projeção
                </Button>
              </div>
            </TabsContent>

            {/* Análise Avançada */}
            <TabsContent value="advanced" className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-yellow-600" />
                  <h4 className="text-base font-medium text-yellow-800">Análise Avançada</h4>
                </div>
                <p className="text-sm text-yellow-700">
                  Esta seção inclui análise de inflação, volatilidade, diversificação e cenários de risco.
                  Funcionalidade em desenvolvimento para usuários Premium.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Cálculos Salvos */}
      {savedCalculations.length > 0 && (
        <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-purple-600" />
              Cálculos Salvos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedCalculations.map((calc) => (
                <div
                  key={calc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div>
                    <div className="text-base font-medium text-gray-800">
                      {calc.type === "simple" ? "ROI Simples" : "Juros Compostos"}
                    </div>
                    <div className="text-sm text-gray-600">{calc.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{formatCurrency(calc.result.totalReturn)}</div>
                    <div className="text-sm text-gray-600">{formatPercentage(calc.result.percentageReturn)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
