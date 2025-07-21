"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, LineChart, Activity } from "lucide-react"

interface ChartData {
  date: string
  value: number
  change?: number
  volume?: number
}

interface InteractiveChartProps {
  title?: string
  data?: ChartData[]
  type?: "line" | "bar" | "area" | "pie"
  timeframe?: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL"
}

export function InteractiveChart({
  title = "Performance do Portfólio",
  data,
  type = "line",
  timeframe = "1M",
}: InteractiveChartProps) {
  const [chartType, setChartType] = useState<"line" | "bar" | "area" | "pie">(type)
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe)
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(false)
  const [hoveredPoint, setHoveredPoint] = useState<ChartData | null>(null)

  // Gerar dados simulados se não fornecidos
  useEffect(() => {
    if (data) {
      setChartData(data)
    } else {
      generateSimulatedData()
    }
  }, [data, selectedTimeframe])

  const generateSimulatedData = () => {
    setLoading(true)

    const periods = {
      "1D": 24,
      "1W": 7,
      "1M": 30,
      "3M": 90,
      "1Y": 365,
      ALL: 730,
    }

    const points = periods[selectedTimeframe]
    const baseValue = 100000
    let currentValue = baseValue
    const newData: ChartData[] = []

    for (let i = 0; i < points; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (points - i))

      // Simular volatilidade realista
      const volatility = 0.02 // 2% de volatilidade diária
      const randomChange = (Math.random() - 0.5) * volatility
      const trend = 0.0003 // Tendência ligeiramente positiva

      currentValue = currentValue * (1 + randomChange + trend)
      const change = i > 0 ? currentValue - newData[i - 1].value : 0

      newData.push({
        date: date.toISOString().split("T")[0],
        value: Math.round(currentValue * 100) / 100,
        change: Math.round(change * 100) / 100,
        volume: Math.round(Math.random() * 1000000),
      })
    }

    setTimeout(() => {
      setChartData(newData)
      setLoading(false)
    }, 500)
  }

  const getCurrentValue = () => {
    return chartData.length > 0 ? chartData[chartData.length - 1].value : 0
  }

  const getTotalChange = () => {
    if (chartData.length < 2) return { value: 0, percentage: 0 }

    const first = chartData[0].value
    const last = chartData[chartData.length - 1].value
    const change = last - first
    const percentage = (change / first) * 100

    return { value: change, percentage }
  }

  const getMaxValue = () => Math.max(...chartData.map((d) => d.value))
  const getMinValue = () => Math.min(...chartData.map((d) => d.value))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  const renderChart = () => {
    if (loading) {
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )
    }

    if (chartData.length === 0) {
      return <div className="h-64 flex items-center justify-center text-gray-500">Nenhum dado disponível</div>
    }

    const maxValue = getMaxValue()
    const minValue = getMinValue()
    const range = maxValue - minValue

    return (
      <div className="h-64 relative">
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1="0"
              y1={`${ratio * 100}%`}
              x2="100%"
              y2={`${ratio * 100}%`}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {/* Chart line/area */}
          {chartType === "line" || chartType === "area" ? (
            <>
              {chartType === "area" && (
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              )}

              <path
                d={chartData
                  .map((point, index) => {
                    const x = (index / (chartData.length - 1)) * 100
                    const y = ((maxValue - point.value) / range) * 100
                    return `${index === 0 ? "M" : "L"} ${x}% ${y}%`
                  })
                  .join(" ")}
                fill={chartType === "area" ? "url(#areaGradient)" : "none"}
                stroke="#3b82f6"
                strokeWidth="2"
                className="drop-shadow-sm"
              />
            </>
          ) : (
            // Bar chart
            chartData.map((point, index) => {
              const x = (index / chartData.length) * 100
              const height = ((point.value - minValue) / range) * 100
              const y = 100 - height

              return (
                <rect
                  key={index}
                  x={`${x}%`}
                  y={`${y}%`}
                  width={`${80 / chartData.length}%`}
                  height={`${height}%`}
                  fill="#3b82f6"
                  className="hover:fill-blue-700 cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              )
            })
          )}

          {/* Data points */}
          {(chartType === "line" || chartType === "area") &&
            chartData.map((point, index) => {
              const x = (index / (chartData.length - 1)) * 100
              const y = ((maxValue - point.value) / range) * 100

              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="3"
                  fill="#3b82f6"
                  className="hover:r-5 cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              )
            })}
        </svg>

        {/* Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-4 left-4 bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-10">
            <div className="text-sm">
              <div className="font-semibold">{formatCurrency(hoveredPoint.value)}</div>
              <div className="text-gray-600">{hoveredPoint.date}</div>
              {hoveredPoint.change && (
                <div className={`${hoveredPoint.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {hoveredPoint.change >= 0 ? "+" : ""}
                  {formatCurrency(hoveredPoint.change)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  const totalChange = getTotalChange()

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-2xl font-bold">{formatCurrency(getCurrentValue())}</span>
              <Badge
                variant={totalChange.value >= 0 ? "default" : "destructive"}
                className="flex items-center space-x-1"
              >
                {totalChange.value >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{formatPercent(totalChange.percentage)}</span>
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Chart Type Selector */}
            <div className="flex border rounded-lg">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="rounded-r-none"
              >
                <LineChart className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="rounded-none border-x"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("area")}
                className="rounded-l-none"
              >
                <Activity className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex space-x-1 mt-4">
          {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((period) => (
            <Button
              key={period}
              variant={selectedTimeframe === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTimeframe(period as any)}
            >
              {period}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {renderChart()}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <div className="text-sm text-gray-600">Máximo</div>
            <div className="font-semibold">{formatCurrency(getMaxValue())}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Mínimo</div>
            <div className="font-semibold">{formatCurrency(getMinValue())}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Variação</div>
            <div className={`font-semibold ${totalChange.value >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(Math.abs(totalChange.value))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Período</div>
            <div className="font-semibold">{selectedTimeframe}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
