"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export function MarketWidget() {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: "PETR4", name: "Petrobras", price: 32.45, change: 1.23, changePercent: 3.94 },
    { symbol: "VALE3", name: "Vale", price: 68.9, change: -2.1, changePercent: -2.95 },
    { symbol: "ITUB4", name: "Itaú", price: 28.76, change: 0.45, changePercent: 1.59 },
    { symbol: "BBDC4", name: "Bradesco", price: 15.23, change: -0.32, changePercent: -2.06 },
    { symbol: "ABEV3", name: "Ambev", price: 12.89, change: 0.78, changePercent: 6.44 },
  ])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simular atualizações em tempo real
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((stock) => {
          const volatility = (Math.random() - 0.5) * 0.1 // -5% a +5%
          const newPrice = stock.price * (1 + volatility)
          const change = newPrice - stock.price
          const changePercent = (change / stock.price) * 100

          return {
            ...stock,
            price: Math.max(newPrice, 0.01),
            change: Number.parseFloat(change.toFixed(2)),
            changePercent: Number.parseFloat(changePercent.toFixed(2)),
          }
        }),
      )
    }, 5000) // Atualizar a cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5 text-green-600" />
          Mercado em Tempo Real
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {marketData.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">{stock.symbol}</span>
                <span className="text-sm text-gray-600">{stock.name}</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(stock.price)}</div>
            </div>

            <div className="text-right">
              <div className={`flex items-center gap-1 ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stock.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="font-semibold">{formatCurrency(Math.abs(stock.change))}</span>
              </div>
              <Badge variant={stock.changePercent >= 0 ? "default" : "destructive"} className="mt-1">
                {formatPercent(stock.changePercent)}
              </Badge>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500 text-center">Dados simulados • Atualização automática a cada 5s</p>
        </div>
      </CardContent>
    </Card>
  )
}
