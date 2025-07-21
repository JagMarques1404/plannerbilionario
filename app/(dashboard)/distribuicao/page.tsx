"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Calculator,
  Calendar,
  Target,
  BarChart3,
  Coins,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Crown,
  Trophy,
  Bell,
  Clock,
  Zap,
  Users,
  Building2,
  GraduationCap,
  Heart,
} from "lucide-react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ComposedChart,
  AreaChart,
} from "recharts"
import { useApp } from "@/contexts/app-context"

// Detailed revenue breakdown by source
const revenueBreakdown = [
  {
    source: "Assinaturas Premium",
    value: 1200000,
    percentage: 42.9,
    color: "#3B82F6",
    growth: 15.2,
    description: "Planos mensais e anuais",
    subcategories: [
      { name: "Premium Individual", value: 720000, growth: 12.5 },
      { name: "Premium Família", value: 360000, growth: 18.7 },
      { name: "Premium Empresarial", value: 120000, growth: 25.3 },
    ],
  },
  {
    source: "Marketplace Comissões",
    value: 850000,
    percentage: 30.4,
    color: "#10B981",
    growth: 22.8,
    description: "Comissões de transações",
    subcategories: [
      { name: "Ações Nacionais", value: 425000, growth: 20.1 },
      { name: "Ações Internacionais", value: 255000, growth: 28.5 },
      { name: "Criptomoedas", value: 170000, growth: 35.2 },
    ],
  },
  {
    source: "Cursos e Educação",
    value: 420000,
    percentage: 15.0,
    color: "#F59E0B",
    growth: 8.5,
    description: "Conteúdo educacional",
    subcategories: [
      { name: "Cursos Online", value: 252000, growth: 10.2 },
      { name: "Mentorias", value: 126000, growth: 5.8 },
      { name: "Workshops", value: 42000, growth: 12.1 },
    ],
  },
  {
    source: "Parcerias Estratégicas",
    value: 280000,
    percentage: 10.0,
    color: "#8B5CF6",
    growth: 35.7,
    description: "Parcerias com corretoras",
    subcategories: [
      { name: "Corretoras Nacionais", value: 168000, growth: 32.4 },
      { name: "Corretoras Internacionais", value: 84000, growth: 42.1 },
      { name: "Fintechs", value: 28000, growth: 55.8 },
    ],
  },
  {
    source: "Publicidade",
    value: 48000,
    percentage: 1.7,
    color: "#EF4444",
    growth: -5.2,
    description: "Anúncios e patrocínios",
    subcategories: [
      { name: "Display Ads", value: 28800, growth: -8.1 },
      { name: "Patrocínios", value: 14400, growth: 2.3 },
      { name: "Affiliate Marketing", value: 4800, growth: -15.7 },
    ],
  },
]

// 12-month distribution history
const distributionHistory = [
  {
    month: "Jan 2024",
    dividend: 0.85,
    totalPaid: 425000,
    holders: 500000,
    revenue: 2100000,
    profitMargin: 20.2,
    specialBonus: false,
  },
  {
    month: "Fev 2024",
    dividend: 0.92,
    totalPaid: 460000,
    holders: 500000,
    revenue: 2200000,
    profitMargin: 20.9,
    specialBonus: false,
  },
  {
    month: "Mar 2024",
    dividend: 1.05,
    totalPaid: 525000,
    holders: 500000,
    revenue: 2350000,
    profitMargin: 22.3,
    specialBonus: true,
    bonusReason: "Trimestre excepcional",
  },
  {
    month: "Abr 2024",
    dividend: 1.18,
    totalPaid: 590000,
    holders: 500000,
    revenue: 2420000,
    profitMargin: 24.4,
    specialBonus: false,
  },
  {
    month: "Mai 2024",
    dividend: 1.32,
    totalPaid: 660000,
    holders: 500000,
    revenue: 2510000,
    profitMargin: 26.3,
    specialBonus: false,
  },
  {
    month: "Jun 2024",
    dividend: 1.45,
    totalPaid: 725000,
    holders: 500000,
    revenue: 2650000,
    profitMargin: 27.4,
    specialBonus: true,
    bonusReason: "Semestre histórico",
  },
  {
    month: "Jul 2024",
    dividend: 1.58,
    totalPaid: 790000,
    holders: 500000,
    revenue: 2720000,
    profitMargin: 29.0,
    specialBonus: false,
  },
  {
    month: "Ago 2024",
    dividend: 1.72,
    totalPaid: 860000,
    holders: 500000,
    revenue: 2800000,
    profitMargin: 30.7,
    specialBonus: false,
  },
  {
    month: "Set 2024",
    dividend: 1.89,
    totalPaid: 945000,
    holders: 500000,
    revenue: 2950000,
    profitMargin: 32.0,
    specialBonus: false,
  },
  {
    month: "Out 2024",
    dividend: 2.05,
    totalPaid: 1025000,
    holders: 500000,
    revenue: 3100000,
    profitMargin: 33.1,
    specialBonus: false,
  },
  {
    month: "Nov 2024",
    dividend: 2.24,
    totalPaid: 1120000,
    holders: 500000,
    revenue: 3250000,
    profitMargin: 34.5,
    specialBonus: false,
  },
  {
    month: "Dez 2024",
    dividend: 2.4,
    totalPaid: 1200000,
    holders: 500000,
    revenue: 3400000,
    profitMargin: 35.3,
    specialBonus: true,
    bonusReason: "Bônus de fim de ano",
  },
]

// Growth scenarios with detailed projections
const growthScenarios = {
  conservative: {
    name: "Conservador",
    description: "Crescimento orgânico estável",
    yearlyGrowth: 15,
    color: "#10B981",
    icon: "🐢",
    projections: [
      { year: 2024, revenue: 3400000, dividend: 2.4, holders: 500000, marketCap: 1000000 },
      { year: 2025, revenue: 3910000, dividend: 2.76, holders: 575000, marketCap: 1150000 },
      { year: 2026, revenue: 4497000, dividend: 3.17, holders: 661250, marketCap: 1322500 },
      { year: 2027, revenue: 5172000, dividend: 3.65, holders: 760438, marketCap: 1520875 },
      { year: 2028, revenue: 5948000, dividend: 4.2, holders: 874503, marketCap: 1749006 },
    ],
  },
  moderate: {
    name: "Moderado",
    description: "Expansão com novos produtos",
    yearlyGrowth: 25,
    color: "#3B82F6",
    icon: "🚀",
    projections: [
      { year: 2024, revenue: 3400000, dividend: 2.4, holders: 500000, marketCap: 1000000 },
      { year: 2025, revenue: 4250000, dividend: 3.0, holders: 625000, marketCap: 1250000 },
      { year: 2026, revenue: 5312500, dividend: 3.75, holders: 781250, marketCap: 1562500 },
      { year: 2027, revenue: 6640625, dividend: 4.69, holders: 976563, marketCap: 1953125 },
      { year: 2028, revenue: 8300781, dividend: 5.86, holders: 1220703, marketCap: 2441406 },
    ],
  },
  aggressive: {
    name: "Agressivo",
    description: "Expansão internacional",
    yearlyGrowth: 40,
    color: "#F59E0B",
    icon: "🔥",
    projections: [
      { year: 2024, revenue: 3400000, dividend: 2.4, holders: 500000, marketCap: 1000000 },
      { year: 2025, revenue: 4760000, dividend: 3.36, holders: 700000, marketCap: 1400000 },
      { year: 2026, revenue: 6664000, dividend: 4.7, holders: 980000, marketCap: 1960000 },
      { year: 2027, revenue: 9329600, dividend: 6.58, holders: 1372000, marketCap: 2744000 },
      { year: 2028, revenue: 13061440, dividend: 9.22, holders: 1920800, marketCap: 3841600 },
    ],
  },
}

// Traditional investments comparison with real-time data
const traditionalComparison = [
  {
    investment: "Poupança",
    yield: 6.5,
    risk: "Muito Baixo",
    color: "#10B981",
    liquidity: "Imediata",
    taxation: "Isento IR",
    minInvestment: 1,
  },
  {
    investment: "CDB 100% CDI",
    yield: 12.8,
    risk: "Baixo",
    color: "#3B82F6",
    liquidity: "No vencimento",
    taxation: "IR regressivo",
    minInvestment: 1000,
  },
  {
    investment: "Tesouro Selic",
    yield: 11.2,
    risk: "Muito Baixo",
    color: "#8B5CF6",
    liquidity: "D+1",
    taxation: "IR regressivo",
    minInvestment: 30,
  },
  {
    investment: "Fundos DI",
    yield: 10.5,
    risk: "Baixo",
    color: "#06B6D4",
    liquidity: "D+1 a D+30",
    taxation: "IR + taxa adm",
    minInvestment: 500,
  },
  {
    investment: "LCI/LCA",
    yield: 9.8,
    risk: "Baixo",
    color: "#84CC16",
    liquidity: "No vencimento",
    taxation: "Isento IR",
    minInvestment: 5000,
  },
  {
    investment: "Ações Dividendos",
    yield: 8.5,
    risk: "Alto",
    color: "#EF4444",
    liquidity: "Imediata",
    taxation: "IR sobre ganhos",
    minInvestment: 100,
  },
  {
    investment: "FIIs",
    yield: 9.2,
    risk: "Médio",
    color: "#F59E0B",
    liquidity: "Imediata",
    taxation: "IR sobre ganhos",
    minInvestment: 100,
  },
  {
    investment: "Julius Tokens",
    yield: 28.8,
    risk: "Médio-Alto",
    color: "#FF8C42",
    liquidity: "Imediata",
    taxation: "IR sobre dividendos",
    minInvestment: 50,
  },
]

// Retirement projection scenarios
const retirementScenarios = [
  {
    name: "Aposentadoria Básica",
    targetAmount: 1000000,
    monthlyIncome: 8000,
    description: "Renda para necessidades básicas",
    icon: "🏠",
    color: "#10B981",
  },
  {
    name: "Aposentadoria Confortável",
    targetAmount: 2500000,
    monthlyIncome: 20000,
    description: "Renda para vida confortável",
    icon: "✈️",
    color: "#3B82F6",
  },
  {
    name: "Aposentadoria Premium",
    targetAmount: 5000000,
    monthlyIncome: 40000,
    description: "Renda para vida de luxo",
    icon: "👑",
    color: "#F59E0B",
  },
]

export default function DistribuicaoPage() {
  const { user, addNotification } = useApp()
  const [selectedScenario, setSelectedScenario] = useState("moderate")
  const [simulatorTokens, setSimulatorTokens] = useState(10000)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentAge, setCurrentAge] = useState(30)
  const [monthlyContribution, setMonthlyContribution] = useState(1000)
  const [selectedRetirementScenario, setSelectedRetirementScenario] = useState("Aposentadoria Confortável")
  const [simulatorResults, setSimulatorResults] = useState({
    monthlyDividend: 0,
    yearlyDividend: 0,
    participation: 0,
    projectedValue: 0,
  })
  const [retirementResults, setRetirementResults] = useState({
    yearsToRetirement: 0,
    totalContributions: 0,
    finalAmount: 0,
    monthlyIncome: 0,
    feasible: false,
  })

  // Real-time calculator updates
  useEffect(() => {
    const totalTokens = 500000
    const currentDividend = 2.4
    const participation = (simulatorTokens / totalTokens) * 100
    const monthlyDividend = simulatorTokens * currentDividend
    const yearlyDividend = monthlyDividend * 12
    const projectedValue = simulatorTokens * 2.0 // Current token price

    setSimulatorResults({
      monthlyDividend,
      yearlyDividend,
      participation,
      projectedValue,
    })
  }, [simulatorTokens])

  // Retirement calculator
  useEffect(() => {
    const yearsToRetirement = retirementAge - currentAge
    const monthsToRetirement = yearsToRetirement * 12
    const targetScenario = retirementScenarios.find((s) => s.name === selectedRetirementScenario)
    const targetAmount = targetScenario?.targetAmount || 2500000

    // Calculate with Julius Tokens yield (28.8% annually)
    const monthlyRate = 0.288 / 12
    const totalContributions = monthlyContribution * monthsToRetirement
    let finalAmount = 0

    // Future value of annuity formula
    if (monthlyRate > 0) {
      finalAmount = monthlyContribution * (((1 + monthlyRate) ** monthsToRetirement - 1) / monthlyRate)
    } else {
      finalAmount = totalContributions
    }

    const monthlyIncome = (finalAmount * 0.04) / 12 // 4% withdrawal rule
    const feasible = finalAmount >= targetAmount

    setRetirementResults({
      yearsToRetirement,
      totalContributions,
      finalAmount,
      monthlyIncome,
      feasible,
    })
  }, [retirementAge, currentAge, monthlyContribution, selectedRetirementScenario])

  // Special distribution alerts
  useEffect(() => {
    const checkSpecialDistributions = () => {
      const today = new Date()
      const currentMonth = today.getMonth()
      const currentDay = today.getDate()

      // Check for special distribution dates
      if (currentDay === 15 && [2, 5, 8, 11].includes(currentMonth)) {
        // Quarterly bonuses
        addNotification({
          type: "success",
          title: "🎉 Distribuição Especial!",
          message: "Bônus trimestral será pago em 3 dias. Prepare-se para dividendos extras!",
        })
      }

      if (currentDay === 1 && currentMonth === 0) {
        // New year bonus
        addNotification({
          type: "success",
          title: "🎊 Bônus de Ano Novo!",
          message: "Distribuição especial de fim de ano será creditada hoje!",
        })
      }
    }

    checkSpecialDistributions()
    const interval = setInterval(checkSpecialDistributions, 24 * 60 * 60 * 1000) // Daily check

    return () => clearInterval(interval)
  }, [addNotification])

  const currentRevenue = revenueBreakdown.reduce((sum, item) => sum + item.value, 0)
  const currentDividendYield = ((2.4 * 12) / 2.0) * 100

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Alert className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
        <Bell className="h-4 w-4" />
        <AlertDescription className="font-medium">
          🎓 <strong>SIMULAÇÃO EDUCATIVA:</strong> Sistema completo de distribuição de receitas para aprendizado sobre
          participação nos lucros e planejamento financeiro.
        </AlertDescription>
      </Alert>

      {/* Header with Live Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Centro de Distribuição 💰
          </h1>
          <p className="text-gray-600 mt-1">Sistema completo de análise e projeções de receitas</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-green-100 border-green-300 animate-pulse">
            <Zap className="h-4 w-4 mr-2" />
            Yield: {currentDividendYield.toFixed(1)}% a.a.
          </Badge>
          <Badge variant="outline" className="bg-blue-100 border-blue-300">
            <Clock className="h-4 w-4 mr-2" />
            Próxima: 5 dias
          </Badge>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">R$ {(currentRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +18.5% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Dividendo/Token</CardTitle>
            <Coins className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">R$ 2,40</div>
            <p className="text-xs text-blue-600 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +7.1% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-yellow-100 border-orange-200 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Total Distribuído</CardTitle>
            <Trophy className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">R$ 1,2M</div>
            <p className="text-xs text-gray-600">Este mês para holders</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Holders Ativos</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">500.000</div>
            <p className="text-xs text-purple-600 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +2.3% novos holders
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-800">Margem de Lucro</CardTitle>
            <BarChart3 className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700">35.3%</div>
            <p className="text-xs text-indigo-600 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +1.2% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs */}
      <Tabs defaultValue="breakdown" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-8 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="breakdown" className="rounded-xl font-semibold min-h-[44px]">
            <PieChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Receitas</span>
          </TabsTrigger>
          <TabsTrigger value="simulator" className="rounded-xl font-semibold min-h-[44px]">
            <Calculator className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Simulador</span>
          </TabsTrigger>
          <TabsTrigger value="evolution" className="rounded-xl font-semibold min-h-[44px]">
            <TrendingUp className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Evolução</span>
          </TabsTrigger>
          <TabsTrigger value="projections" className="rounded-xl font-semibold min-h-[44px]">
            <Target className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Projeções</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl font-semibold min-h-[44px]">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Histórico</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="rounded-xl font-semibold min-h-[44px]">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Comparação</span>
          </TabsTrigger>
          <TabsTrigger value="retirement" className="rounded-xl font-semibold min-h-[44px]">
            <GraduationCap className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Aposentadoria</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="rounded-xl font-semibold min-h-[44px]">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Alertas</span>
          </TabsTrigger>
        </TabsList>

        {/* Detailed Revenue Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Pie Chart */}
            <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-500" />
                  Fontes de Receita Detalhadas
                </CardTitle>
                <CardDescription>Distribuição completa da receita mensal por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsPieChart>
                    <Pie
                      data={revenueBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name.split(" ")[0]} ${percentage.toFixed(1)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, "Receita"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Análise Detalhada por Fonte</CardTitle>
                <CardDescription>Performance, crescimento e subcategorias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {revenueBreakdown.map((source, index) => (
                    <div key={index} className="p-4 bg-white rounded-xl border shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }} />
                          <div>
                            <h4 className="font-semibold">{source.source}</h4>
                            <p className="text-xs text-gray-500">{source.description}</p>
                          </div>
                        </div>
                        <div
                          className={`flex items-center gap-1 ${source.growth > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {source.growth > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          <span className="text-sm font-semibold">{Math.abs(source.growth)}%</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        <span className="text-2xl font-bold">R$ {(source.value / 1000).toFixed(0)}k</span>
                        <Badge variant="outline">{source.percentage.toFixed(1)}%</Badge>
                      </div>

                      <Progress value={source.percentage} className="h-2 mb-3" />

                      {/* Subcategories */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-700">Subcategorias:</h5>
                        {source.subcategories.map((sub, subIndex) => (
                          <div key={subIndex} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{sub.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">R$ {(sub.value / 1000).toFixed(0)}k</span>
                              <span className={`text-xs ${sub.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                                {sub.growth > 0 ? "+" : ""}
                                {sub.growth}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Trend Analysis */}
          <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Análise de Tendências por Categoria
              </CardTitle>
              <CardDescription>Crescimento histórico e projeções futuras</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  data={revenueBreakdown.map((item) => ({
                    name: item.source.split(" ")[0],
                    atual: item.value / 1000,
                    projetado: (item.value * (1 + item.growth / 100)) / 1000,
                    crescimento: item.growth,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "crescimento" ? `${value}%` : `R$ ${Number(value).toFixed(0)}k`,
                      name === "atual" ? "Receita Atual" : name === "projetado" ? "Projeção" : "Crescimento",
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="atual" fill="#3B82F6" name="Receita Atual" />
                  <Bar dataKey="projetado" fill="#10B981" name="Projeção Próximo Mês" />
                  <Line type="monotone" dataKey="crescimento" stroke="#F59E0B" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Real-time Simulator Tab */}
        <TabsContent value="simulator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Simulator Inputs */}
            <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-500" />
                  Simulador de Participação em Tempo Real
                </CardTitle>
                <CardDescription>Calcule seus dividendos e participação nos lucros</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tokens">Quantidade de Tokens</Label>
                  <Input
                    id="tokens"
                    type="number"
                    value={simulatorTokens}
                    onChange={(e) => setSimulatorTokens(Number(e.target.value))}
                    className="min-h-[44px] text-lg font-semibold"
                    min="1"
                    max="100000"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Mínimo: 1 token</span>
                    <span>Máximo: 100.000 tokens</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSimulatorTokens(1000)} className="min-h-[44px]">
                    1k
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSimulatorTokens(5000)} className="min-h-[44px]">
                    5k
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSimulatorTokens(10000)}
                    className="min-h-[44px]"
                  >
                    10k
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSimulatorTokens(25000)}
                    className="min-h-[44px]"
                  >
                    25k
                  </Button>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Como Funciona a Distribuição:
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Dividendos pagos mensalmente no dia 15
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      50% do lucro líquido distribuído aos holders
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Distribuição proporcional aos tokens detidos
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Bônus especiais em trimestres excepcionais
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Reinvestimento automático opcional
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Valor Atual dos Tokens:
                  </h4>
                  <div className="text-2xl font-bold text-green-700">
                    R$ {simulatorResults.projectedValue.toLocaleString()}
                  </div>
                  <p className="text-sm text-green-600">Valor de mercado atual</p>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Results */}
            <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Resultados da Simulação</CardTitle>
                <CardDescription>Baseado em {simulatorTokens.toLocaleString()} tokens (R$ 2,00 cada)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200">
                    <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      R$ {simulatorResults.monthlyDividend.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Dividendo Mensal</div>
                    <div className="text-xs text-green-600 mt-1">
                      +{((simulatorResults.monthlyDividend / simulatorResults.projectedValue) * 100).toFixed(1)}% do
                      investimento
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl border border-blue-200">
                    <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      R$ {simulatorResults.yearlyDividend.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Dividendo Anual</div>
                    <div className="text-xs text-blue-600 mt-1">
                      {((simulatorResults.yearlyDividend / simulatorResults.projectedValue) * 100).toFixed(1)}% yield
                      anual
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl border border-purple-200">
                  <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{simulatorResults.participation.toFixed(4)}%</div>
                  <div className="text-sm text-gray-600">Participação nos Lucros da Empresa</div>
                  <div className="text-xs text-purple-600 mt-1">
                    Você recebe {simulatorResults.participation.toFixed(4)}% de todos os lucros distribuídos
                  </div>
                </div>

                {/* Enhanced Comparison */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Comparação com Investimentos Tradicionais
                  </h4>
                  <div className="space-y-2">
                    {[
                      { name: "Poupança (6.5% a.a.)", yield: 0.065, color: "bg-gray-100" },
                      { name: "CDB (12.8% a.a.)", yield: 0.128, color: "bg-blue-100" },
                      { name: "Tesouro Selic (11.2% a.a.)", yield: 0.112, color: "bg-purple-100" },
                      { name: "Julius Tokens (28.8% a.a.)", yield: 0.288, color: "bg-orange-100 border-orange-300" },
                    ].map((investment, index) => {
                      const monthlyReturn = (simulatorResults.projectedValue * investment.yield) / 12
                      return (
                        <div
                          key={index}
                          className={`flex justify-between items-center p-3 ${investment.color} rounded-lg ${
                            investment.name.includes("Julius") ? "border-2" : ""
                          }`}
                        >
                          <span className="text-sm font-medium">{investment.name}</span>
                          <div className="text-right">
                            <span className="text-sm font-semibold">R$ {monthlyReturn.toFixed(0)}/mês</span>
                            {investment.name.includes("Julius") && (
                              <div className="text-xs text-orange-600 font-semibold">
                                +
                                {(((simulatorResults.monthlyDividend - monthlyReturn) / monthlyReturn) * 100).toFixed(
                                  0,
                                )}
                                % superior
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Investment Breakdown */}
                <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
                    <Coins className="h-4 w-4 mr-2" />
                    Resumo do Investimento:
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Tokens:</span>
                      <span className="font-semibold ml-2">{simulatorTokens.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Valor Total:</span>
                      <span className="font-semibold ml-2">R$ {simulatorResults.projectedValue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Yield Mensal:</span>
                      <span className="font-semibold ml-2 text-green-600">
                        {((simulatorResults.monthlyDividend / simulatorResults.projectedValue) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Yield Anual:</span>
                      <span className="font-semibold ml-2 text-green-600">
                        {((simulatorResults.yearlyDividend / simulatorResults.projectedValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Participation Calculator */}
          <Card className="bg-gradient-to-br from-white to-indigo-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                Calculadora de Participação Proporcional em Tempo Real
              </CardTitle>
              <CardDescription>Veja exatamente como sua participação impacta seus ganhos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl border border-blue-200">
                  <Building2 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">500.000</div>
                  <div className="text-sm text-gray-600">Total de Tokens</div>
                  <div className="text-xs text-blue-600 mt-1">Em circulação</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200">
                  <Coins className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{simulatorTokens.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Seus Tokens</div>
                  <div className="text-xs text-green-600 mt-1">Sua posição</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl border border-purple-200">
                  <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{simulatorResults.participation.toFixed(4)}%</div>
                  <div className="text-sm text-gray-600">Sua Participação</div>
                  <div className="text-xs text-purple-600 mt-1">Do total</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl border border-orange-200">
                  <DollarSign className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">
                    R$ {((currentRevenue * 0.5 * simulatorResults.participation) / 100).toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-600">Sua Parte Mensal</div>
                  <div className="text-xs text-orange-600 mt-1">50% do lucro</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl border border-yellow-200">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">
                    R$ {(((currentRevenue * 0.5 * simulatorResults.participation) / 100) * 12).toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-600">Sua Parte Anual</div>
                  <div className="text-xs text-yellow-600 mt-1">Projeção</div>
                </div>
              </div>

              {/* Participation Progress Bar */}
              <div className="mt-6 p-4 bg-white rounded-xl border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Sua Participação na Empresa</span>
                  <span className="text-sm font-bold">{simulatorResults.participation.toFixed(4)}%</span>
                </div>
                <Progress value={simulatorResults.participation} className="h-3" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>20% (Holder Significativo)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Evolution Tab */}
        <TabsContent value="evolution" className="space-y-6">
          <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Evolução Completa dos Dividendos (12 Meses)
              </CardTitle>
              <CardDescription>Histórico detalhado de dividendos, receitas e margem de lucro</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={450}>
                <ComposedChart data={distributionHistory}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "dividend"
                        ? `R$ ${value}`
                        : name === "totalPaid"
                          ? `R$ ${Number(value).toLocaleString()}`
                          : name === "revenue"
                            ? `R$ ${(Number(value) / 1000000).toFixed(1)}M`
                            : `${value}%`,
                      name === "dividend"
                        ? "Dividendo/Token"
                        : name === "totalPaid"
                          ? "Total Distribuído"
                          : name === "revenue"
                            ? "Receita"
                            : "Margem de Lucro",
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    fill="url(#colorRevenue)"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                  <Bar yAxisId="right" dataKey="totalPaid" fill="#10B981" opacity={0.7} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="dividend"
                    stroke="#F59E0B"
                    strokeWidth={4}
                    dot={{ fill: "#F59E0B", strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="profitMargin"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enhanced Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-center text-green-800">Crescimento Médio</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">+12.8%</div>
                <p className="text-sm text-gray-600 mb-2">Crescimento mensal médio dos dividendos</p>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Consistente
                </Badge>
                <div className="mt-3 text-xs text-green-700">
                  <div>Melhor mês: +19.5% (Set)</div>
                  <div>Pior mês: +7.1% (Nov)</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-center text-blue-800">Maior Crescimento</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">+19.5%</div>
                <p className="text-sm text-gray-600 mb-2">Setembro 2024 (R$ 1,58 → R$ 1,89)</p>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  Recorde
                </Badge>
                <div className="mt-3 text-xs text-blue-700">
                  <div>Receita: R$ 2,95M</div>
                  <div>Margem: 32.0%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-yellow-100 border-orange-200 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-center text-orange-800">Projeção Janeiro</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">R$ 2,65</div>
                <p className="text-sm text-gray-600 mb-2">Baseado na tendência atual (+10.4%)</p>
                <Badge variant="outline" className="bg-orange-100 text-orange-800">
                  Estimativa
                </Badge>
                <div className="mt-3 text-xs text-orange-700">
                  <div>Receita proj.: R$ 3,6M</div>
                  <div>Total dist.: R$ 1,32M</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-center text-purple-800">Acumulado 2024</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">R$ 9,2M</div>
                <p className="text-sm text-gray-600 mb-2">Total distribuído no ano</p>
                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                  Histórico
                </Badge>
                <div className="mt-3 text-xs text-purple-700">
                  <div>Média mensal: R$ 767k</div>
                  <div>Crescimento: +182%</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Special Distributions Highlight */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Distribuições Especiais de 2024
              </CardTitle>
              <CardDescription>Bônus extras pagos em momentos excepcionais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {distributionHistory
                  .filter((record) => record.specialBonus)
                  .map((record, index) => (
                    <div key={index} className="p-4 bg-white rounded-xl border border-yellow-300">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-yellow-800">{record.month}</h4>
                        <Badge className="bg-yellow-100 text-yellow-800">Bônus</Badge>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600 mb-1">R$ {record.dividend.toFixed(2)}</div>
                      <p className="text-sm text-gray-600 mb-2">{record.bonusReason}</p>
                      <div className="text-xs text-yellow-700">
                        Total distribuído: R$ {record.totalPaid.toLocaleString()}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Growth Projections Tab */}
        <TabsContent value="projections" className="space-y-6">
          <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                Projeções Detalhadas de Crescimento por Cenário
              </CardTitle>
              <CardDescription>Compare diferentes cenários de crescimento com métricas detalhadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="scenario">Selecione o Cenário de Crescimento</Label>
                <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                  <SelectTrigger className="min-h-[44px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(growthScenarios).map(([key, scenario]) => (
                      <SelectItem key={key} value={key}>
                        {scenario.icon} {scenario.name} - {scenario.yearlyGrowth}% a.a.
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <ResponsiveContainer width="100%" height={450}>
                <ComposedChart data={growthScenarios[selectedScenario as keyof typeof growthScenarios].projections}>
                  <defs>
                    <linearGradient id="colorProjection" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={growthScenarios[selectedScenario as keyof typeof growthScenarios].color}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={growthScenarios[selectedScenario as keyof typeof growthScenarios].color}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "revenue"
                        ? `R$ ${(Number(value) / 1000000).toFixed(1)}M`
                        : name === "dividend"
                          ? `R$ ${value}`
                          : name === "holders"
                            ? Number(value).toLocaleString()
                            : `R$ ${(Number(value) / 1000000).toFixed(1)}M`,
                      name === "revenue"
                        ? "Receita"
                        : name === "dividend"
                          ? "Dividendo/Token"
                          : name === "holders"
                            ? "Holders"
                            : "Market Cap",
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    fill="url(#colorProjection)"
                    stroke={growthScenarios[selectedScenario as keyof typeof growthScenarios].color}
                    strokeWidth={2}
                  />
                  <Bar yAxisId="left" dataKey="marketCap" fill="#8B5CF6" opacity={0.6} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="dividend"
                    stroke="#F59E0B"
                    strokeWidth={4}
                    dot={{ fill: "#F59E0B", strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="holders"
                    stroke="#10B981"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Scenario Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(growthScenarios).map(([key, scenario]) => (
              <Card
                key={key}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedScenario === key
                    ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-xl"
                    : "hover:shadow-lg bg-gradient-to-br from-white to-gray-50"
                }`}
                onClick={() => setSelectedScenario(key)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">{scenario.icon}</span>
                      {scenario.name}
                    </span>
                    <Badge style={{ backgroundColor: scenario.color, color: "white" }}>{scenario.yearlyGrowth}%</Badge>
                  </CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Receita 2028:</span>
                      <span className="font-semibold">
                        R$ {(scenario.projections[4].revenue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Dividendo 2028:</span>
                      <span className="font-semibold">R$ {scenario.projections[4].dividend.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Holders 2028:</span>
                      <span className="font-semibold">{scenario.projections[4].holders.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">ROI Anual 2028:</span>
                      <span className="font-semibold text-green-600">
                        {(((scenario.projections[4].dividend * 12) / 2.0) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Market Cap 2028:</span>
                      <span className="font-semibold text-purple-600">
                        R$ {(scenario.projections[4].marketCap / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Projections Table */}
          <Card className="bg-gradient-to-br from-white to-indigo-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                Projeções Detalhadas - Cenário {growthScenarios[selectedScenario as keyof typeof growthScenarios].name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Ano</th>
                      <th className="text-right p-3">Receita</th>
                      <th className="text-right p-3">Dividendo/Token</th>
                      <th className="text-right p-3">Total Distribuído</th>
                      <th className="text-right p-3">Holders</th>
                      <th className="text-right p-3">Market Cap</th>
                      <th className="text-right p-3">ROI Anual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {growthScenarios[selectedScenario as keyof typeof growthScenarios].projections.map(
                      (projection, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-semibold">{projection.year}</td>
                          <td className="p-3 text-right">R$ {(projection.revenue / 1000000).toFixed(1)}M</td>
                          <td className="p-3 text-right font-semibold text-green-600">
                            R$ {projection.dividend.toFixed(2)}
                          </td>
                          <td className="p-3 text-right">
                            R$ {((projection.dividend * projection.holders) / 1000).toFixed(0)}k
                          </td>
                          <td className="p-3 text-right">{projection.holders.toLocaleString()}</td>
                          <td className="p-3 text-right">R$ {(projection.marketCap / 1000000).toFixed(1)}M</td>
                          <td className="p-3 text-right font-semibold text-blue-600">
                            {(((projection.dividend * 12) / 2.0) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced 12-Month History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Histórico Completo de 12 Meses - Distribuições Detalhadas
              </CardTitle>
              <CardDescription>Registro completo de todas as distribuições com métricas de performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {distributionHistory
                  .slice()
                  .reverse()
                  .map((record, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                        record.specialBonus
                          ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              record.specialBonus ? "bg-yellow-100" : "bg-green-100"
                            }`}
                          >
                            {record.specialBonus ? (
                              <Sparkles className="h-6 w-6 text-yellow-600" />
                            ) : (
                              <Coins className="h-6 w-6 text-green-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              Distribuição {record.month}
                              {record.specialBonus && (
                                <Badge className="bg-yellow-100 text-yellow-800">Bônus Especial</Badge>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">
                              R$ {record.dividend.toFixed(2)} por token • {record.holders.toLocaleString()} holders
                            </p>
                            {record.specialBonus && (
                              <p className="text-xs text-yellow-700 font-medium">{record.bonusReason}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">R$ {record.totalPaid.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Total distribuído</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="text-sm font-semibold">R$ {(record.revenue / 1000000).toFixed(1)}M</div>
                          <div className="text-xs text-gray-600">Receita</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="text-sm font-semibold">{record.profitMargin.toFixed(1)}%</div>
                          <div className="text-xs text-gray-600">Margem</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="text-sm font-semibold">
                            {index < distributionHistory.length - 1
                              ? `+${(
                                  ((record.dividend -
                                    distributionHistory[distributionHistory.length - 2 - index].dividend) /
                                    distributionHistory[distributionHistory.length - 2 - index].dividend) *
                                    100
                                ).toFixed(1)}%`
                              : "N/A"}
                          </div>
                          <div className="text-xs text-gray-600">Crescimento</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="text-sm font-semibold">
                            {(((record.dividend * 12) / 2.0) * 100).toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-600">Yield Anual</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Annual Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Estatísticas do Ano 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-green-200">
                    <span className="font-medium">Total Distribuído:</span>
                    <span className="text-lg font-bold text-green-600">
                      R$ {distributionHistory.reduce((sum, record) => sum + record.totalPaid, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-blue-200">
                    <span className="font-medium">Média Mensal:</span>
                    <span className="text-lg font-bold text-blue-600">
                      R$ {(distributionHistory.reduce((sum, record) => sum + record.totalPaid, 0) / 12).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-purple-200">
                    <span className="font-medium">Crescimento Total:</span>
                    <span className="text-lg font-bold text-purple-600">
                      +{(((2.4 - 0.85) / 0.85) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-orange-200">
                    <span className="font-medium">Distribuições Especiais:</span>
                    <span className="text-lg font-bold text-orange-600">
                      {distributionHistory.filter((r) => r.specialBonus).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Próximas Distribuições</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Janeiro 2025</span>
                      <Badge className="bg-orange-100 text-orange-800 animate-pulse">Em 5 dias</Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Estimativa: R$ 2,65 por token</div>
                    <div className="text-xs text-orange-600 mt-1">Total estimado: R$ 1,32M • Yield: 15.9% a.a.</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Fevereiro 2025</span>
                      <Badge variant="outline">Em 35 dias</Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Estimativa: R$ 2,92 por token</div>
                    <div className="text-xs text-gray-500 mt-1">Total estimado: R$ 1,46M</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Março 2025</span>
                      <Badge variant="outline">Em 65 dias</Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Estimativa: R$ 3,22 por token</div>
                    <div className="text-xs text-purple-600 mt-1">
                      Possível bônus trimestral • Total estimado: R$ 1,61M
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Enhanced Traditional Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-gradient-to-br from-white to-orange-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                Comparação Detalhada com Investimentos Tradicionais
              </CardTitle>
              <CardDescription>Julius Tokens vs. principais opções do mercado financeiro brasileiro</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={traditionalComparison} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" />
                  <YAxis dataKey="investment" type="category" width={150} />
                  <Tooltip
                    formatter={(value, name, props) => [`${value}% a.a.`, "Rendimento", `Risco: ${props.payload.risk}`]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="yield" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Comparison Table */}
          <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Análise Comparativa Detalhada</CardTitle>
              <CardDescription>Características completas de cada investimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Investimento</th>
                      <th className="text-right p-3">Rendimento</th>
                      <th className="text-center p-3">Risco</th>
                      <th className="text-center p-3">Liquidez</th>
                      <th className="text-center p-3">Tributação</th>
                      <th className="text-right p-3">Investimento Mín.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {traditionalComparison.map((investment, index) => (
                      <tr
                        key={index}
                        className={`border-b hover:bg-gray-50 ${
                          investment.investment === "Julius Tokens" ? "bg-orange-50 font-semibold" : ""
                        }`}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: investment.color }} />
                            {investment.investment}
                            {investment.investment === "Julius Tokens" && (
                              <Badge className="bg-orange-100 text-orange-800 ml-2">Destaque</Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-right font-semibold">{investment.yield}% a.a.</td>
                        <td className="p-3 text-center">
                          <Badge
                            variant="outline"
                            className={
                              investment.risk === "Muito Baixo"
                                ? "bg-green-100 text-green-800"
                                : investment.risk === "Baixo"
                                  ? "bg-blue-100 text-blue-800"
                                  : investment.risk === "Médio"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : investment.risk === "Médio-Alto"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-red-100 text-red-800"
                            }
                          >
                            {investment.risk}
                          </Badge>
                        </td>
                        <td className="p-3 text-center text-xs">{investment.liquidity}</td>
                        <td className="p-3 text-center text-xs">{investment.taxation}</td>
                        <td className="p-3 text-right">R$ {investment.minInvestment.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Investment Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
              <CardHeader>
                <CardTitle>Simulação de R$ 10.000</CardTitle>
                <CardDescription>Comparação de rendimento em 1 ano</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {traditionalComparison
                    .sort((a, b) => b.yield - a.yield)
                    .slice(0, 6)
                    .map((investment, index) => {
                      const finalValue = 10000 * (1 + investment.yield / 100)
                      const profit = finalValue - 10000
                      return (
                        <div
                          key={index}
                          className={`p-3 rounded-lg transition-all ${
                            investment.investment === "Julius Tokens"
                              ? "bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300 shadow-md"
                              : "bg-white border"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold text-sm">{investment.investment}</h4>
                              <p className="text-xs text-gray-600">R$ 10.000 → R$ {finalValue.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <div
                                className={`font-bold ${
                                  investment.investment === "Julius Tokens" ? "text-orange-600" : "text-green-600"
                                }`}
                              >
                                +R$ {profit.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">{investment.yield}% a.a.</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>

                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                    <Trophy className="h-4 w-4 mr-2" />
                    Vantagem Julius Tokens:
                  </h4>
                  <p className="text-sm text-green-700">
                    <strong>+R$ {(10000 * 0.288 - 10000 * 0.128).toLocaleString()}</strong> a mais que o CDB
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Rendimento {((28.8 / 12.8) * 100 - 100).toFixed(0)}% superior ao melhor CDB
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
              <CardHeader>
                <CardTitle>Matriz Risco vs Retorno</CardTitle>
                <CardDescription>Posicionamento estratégico dos investimentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="text-sm font-semibold text-green-800 mb-2">Baixo Risco</div>
                    <div className="space-y-1">
                      <div className="text-xs bg-white p-2 rounded border">Poupança: 6.5%</div>
                      <div className="text-xs bg-white p-2 rounded border">CDB: 12.8%</div>
                      <div className="text-xs bg-white p-2 rounded border">Tesouro: 11.2%</div>
                      <div className="text-xs bg-white p-2 rounded border">LCI/LCA: 9.8%</div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-sm font-semibold text-blue-800 mb-2">Médio Risco</div>
                    <div className="space-y-1">
                      <div className="text-xs bg-white p-2 rounded border">FIIs: 9.2%</div>
                      <div className="text-xs bg-white p-2 rounded border">Fundos DI: 10.5%</div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="text-sm font-semibold text-orange-800 mb-2">Médio-Alto</div>
                    <div className="space-y-1">
                      <div className="text-xs bg-orange-100 p-2 rounded border-2 border-orange-300 font-semibold">
                        Julius: 28.8%
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="text-sm font-semibold text-red-800 mb-2">Alto Risco</div>
                    <div className="space-y-1">
                      <div className="text-xs bg-white p-2 rounded border">Ações: 8.5%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-1 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Sweet Spot:
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Julius Tokens oferece o melhor equilíbrio entre risco e retorno, com rendimento superior e risco
                    controlado.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* New Retirement Planning Tab */}
        <TabsContent value="retirement" className="space-y-6">
          <Card className="bg-gradient-to-br from-white to-indigo-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-500" />
                Planejamento de Aposentadoria com Julius Tokens
              </CardTitle>
              <CardDescription>
                Calcule quanto você precisa investir para se aposentar com renda passiva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Retirement Calculator Inputs */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentAge">Idade Atual</Label>
                      <Input
                        id="currentAge"
                        type="number"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(Number(e.target.value))}
                        className="min-h-[44px]"
                        min="18"
                        max="65"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retirementAge">Idade para Aposentar</Label>
                      <Input
                        id="retirementAge"
                        type="number"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(Number(e.target.value))}
                        className="min-h-[44px]"
                        min="50"
                        max="80"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyContribution">Aporte Mensal (R$)</Label>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      className="min-h-[44px]"
                      min="100"
                      max="50000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Cenário de Aposentadoria</Label>
                    <Select value={selectedRetirementScenario} onValueChange={setSelectedRetirementScenario}>
                      <SelectTrigger className="min-h-[44px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {retirementScenarios.map((scenario) => (
                          <SelectItem key={scenario.name} value={scenario.name}>
                            {scenario.icon} {scenario.name} - R$ {scenario.monthlyIncome.toLocaleString()}/mês
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMonthlyContribution(500)}
                      className="min-h-[44px]"
                    >
                      R$ 500
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMonthlyContribution(1000)}
                      className="min-h-[44px]"
                    >
                      R$ 1.000
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMonthlyContribution(2000)}
                      className="min-h-[44px]"
                    >
                      R$ 2.000
                    </Button>
                  </div>
                </div>

                {/* Retirement Results */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl border border-blue-200">
                      <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{retirementResults.yearsToRetirement}</div>
                      <div className="text-sm text-gray-600">Anos para Aposentar</div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200">
                      <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">
                        R$ {(retirementResults.finalAmount / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-gray-600">Patrimônio Final</div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl border border-purple-200">
                    <Heart className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">
                      R$ {retirementResults.monthlyIncome.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Renda Mensal Passiva</div>
                    <div className="text-xs text-purple-600 mt-1">Regra dos 4% (sustentável)</div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                      <Calculator className="h-4 w-4 mr-2" />
                      Resumo do Plano:
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Investido:</span>
                        <span className="font-semibold">
                          R$ {retirementResults.totalContributions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rendimento Total:</span>
                        <span className="font-semibold text-green-600">
                          R$ {(retirementResults.finalAmount - retirementResults.totalContributions).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Multiplicador:</span>
                        <span className="font-semibold text-blue-600">
                          {(retirementResults.finalAmount / retirementResults.totalContributions).toFixed(1)}x
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-xl border-2 ${
                      retirementResults.feasible
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300"
                        : "bg-gradient-to-r from-red-50 to-pink-50 border-red-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {retirementResults.feasible ? (
                        <Trophy className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      )}
                      <h4 className={`font-semibold ${retirementResults.feasible ? "text-green-900" : "text-red-900"}`}>
                        {retirementResults.feasible ? "✅ Plano Viável!" : "⚠️ Ajuste Necessário"}
                      </h4>
                    </div>
                    <p className={`text-sm ${retirementResults.feasible ? "text-green-700" : "text-red-700"}`}>
                      {retirementResults.feasible
                        ? `Parabéns! Com este plano você conseguirá se aposentar com a renda desejada de R$ ${retirementScenarios
                            .find((s) => s.name === selectedRetirementScenario)
                            ?.monthlyIncome.toLocaleString()}/mês.`
                        : `Para atingir a meta de R$ ${retirementScenarios
                            .find((s) => s.name === selectedRetirementScenario)
                            ?.monthlyIncome.toLocaleString()}/mês, você precisa aumentar o aporte mensal ou escolher um cenário mais conservador.`}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retirement Scenarios Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {retirementScenarios.map((scenario) => (
              <Card
                key={scenario.name}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedRetirementScenario === scenario.name
                    ? "ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-xl"
                    : "hover:shadow-lg bg-gradient-to-br from-white to-gray-50"
                }`}
                onClick={() => setSelectedRetirementScenario(scenario.name)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: scenario.color }}>
                    <span className="text-2xl">{scenario.icon}</span>
                    {scenario.name}
                  </CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-2xl font-bold" style={{ color: scenario.color }}>
                        R$ {scenario.monthlyIncome.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Renda Mensal</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">R$ {(scenario.targetAmount / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-gray-600">Patrimônio Necessário</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">
                        R$ {Math.ceil(scenario.targetAmount / (retirementResults.yearsToRetirement * 12) / 100) * 100}
                      </div>
                      <div className="text-sm text-gray-600">Aporte Mensal Necessário</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Retirement Projection Chart */}
          <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Projeção de Crescimento do Patrimônio
              </CardTitle>
              <CardDescription>
                Evolução do seu patrimônio até a aposentadoria com Julius Tokens (28.8% a.a.)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={Array.from({ length: retirementResults.yearsToRetirement + 1 }, (_, i) => {
                    const year = currentAge + i
                    const monthsInvested = i * 12
                    const monthlyRate = 0.288 / 12
                    let accumulated = 0

                    if (monthsInvested > 0) {
                      accumulated = monthlyContribution * (((1 + monthlyRate) ** monthsInvested - 1) / monthlyRate)
                    }

                    return {
                      age: year,
                      patrimonio: accumulated,
                      contribuicoes: monthlyContribution * monthsInvested,
                      rendimentos: accumulated - monthlyContribution * monthsInvested,
                    }
                  })}
                >
                  <defs>
                    <linearGradient id="colorPatrimonio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorContribuicoes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      `R$ ${(Number(value) / 1000000).toFixed(1)}M`,
                      name === "patrimonio"
                        ? "Patrimônio Total"
                        : name === "contribuicoes"
                          ? "Contribuições"
                          : "Rendimentos",
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="patrimonio"
                    stackId="1"
                    stroke="#8B5CF6"
                    fill="url(#colorPatrimonio)"
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="contribuicoes"
                    stackId="2"
                    stroke="#3B82F6"
                    fill="url(#colorContribuicoes)"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="rendimentos" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Special Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-gradient-to-br from-white to-yellow-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-yellow-500" />
                Sistema de Alertas de Distribuições Especiais
              </CardTitle>
              <CardDescription>Configurações e histórico de notificações sobre distribuições e bônus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Alert Settings */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Configurações de Alertas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border">
                      <div>
                        <h4 className="font-medium">Distribuições Mensais</h4>
                        <p className="text-sm text-gray-600">Notificar 3 dias antes do pagamento</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border">
                      <div>
                        <h4 className="font-medium">Bônus Trimestrais</h4>
                        <p className="text-sm text-gray-600">Alertas sobre distribuições especiais</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border">
                      <div>
                        <h4 className="font-medium">Recordes de Dividendos</h4>
                        <p className="text-sm text-gray-600">Quando dividendos batem recordes históricos</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border">
                      <div>
                        <h4 className="font-medium">Mudanças na Margem</h4>
                        <p className="text-sm text-gray-600">Alterações significativas na margem de lucro</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pausado</Badge>
                    </div>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Alertas Recentes</h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Bell className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-900">Distribuição Janeiro em 5 dias!</h4>
                          <p className="text-sm text-green-700">
                            Prepare-se para receber R$ 2,65 por token no dia 15/01
                          </p>
                          <p className="text-xs text-green-600 mt-1">Há 2 horas</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-yellow-900">Novo Recorde de Dividendos!</h4>
                          <p className="text-sm text-yellow-700">
                            Dezembro 2024: R$ 2,40 por token - maior valor da história
                          </p>
                          <p className="text-xs text-yellow-600 mt-1">Há 5 dias</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-900">Margem de Lucro Excepcional</h4>
                          <p className="text-sm text-blue-700">Margem atingiu 35.3% em dezembro - recorde histórico</p>
                          <p className="text-xs text-blue-600 mt-1">Há 1 semana</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Crown className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-purple-900">Bônus de Fim de Ano Confirmado</h4>
                          <p className="text-sm text-purple-700">
                            Distribuição especial de dezembro incluiu bônus de 15%
                          </p>
                          <p className="text-xs text-purple-600 mt-1">Há 2 semanas</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-indigo-900">Marco de 500k Holders Atingido</h4>
                          <p className="text-sm text-indigo-700">
                            Comunidade Julius atingiu meio milhão de holders ativos
                          </p>
                          <p className="text-xs text-indigo-600 mt-1">Há 3 semanas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Special Events */}
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                Próximos Eventos Especiais
              </CardTitle>
              <CardDescription>Datas importantes para distribuições e bônus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">15 de Janeiro</h4>
                      <p className="text-sm text-gray-600">Distribuição Mensal</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">R$ 2,65</div>
                  <p className="text-sm text-gray-600">Estimativa por token</p>
                  <Badge className="mt-2 bg-orange-100 text-orange-800">Em 5 dias</Badge>
                </div>

                <div className="p-4 bg-white rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">15 de Março</h4>
                      <p className="text-sm text-gray-600">Bônus Trimestral</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mb-1">+20%</div>
                  <p className="text-sm text-gray-600">Bônus estimado</p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">Em 65 dias</Badge>
                </div>

                <div className="p-4 bg-white rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">15 de Junho</h4>
                      <p className="text-sm text-gray-600">Bônus Semestral</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">+35%</div>
                  <p className="text-sm text-gray-600">Bônus histórico</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">Em 155 dias</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-center text-blue-800">Alertas Enviados</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
                <p className="text-sm text-gray-600">Nos últimos 12 meses</p>
                <Badge variant="outline" className="mt-2 bg-blue-100 text-blue-800">
                  +23% vs ano anterior
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-center text-green-800">Taxa de Abertura</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                <p className="text-sm text-gray-600">Alertas visualizados</p>
                <Badge variant="outline" className="mt-2 bg-green-100 text-green-800">
                  Excelente
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-center text-yellow-800">Bônus Alertados</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">12</div>
                <p className="text-sm text-gray-600">Distribuições especiais</p>
                <Badge variant="outline" className="mt-2 bg-yellow-100 text-yellow-800">
                  Ano recorde
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-center text-purple-800">Precisão</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">98.7%</div>
                <p className="text-sm text-gray-600">Previsões corretas</p>
                <Badge variant="outline" className="mt-2 bg-purple-100 text-purple-800">
                  Altíssima
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
