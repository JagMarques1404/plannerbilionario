"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, RefreshCw, DollarSign, BarChart3 } from "lucide-react"

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
}

const mockMarketData: MarketData[] = [
  {
    symbol: "BILLION",
    name: "Julius Token",
    price: 1.0,
    change: 0.05,
    changePercent: 5.26,
    volume: 1250000,
  },
  {
    symbol: "IBOV",
    name: "Ibovespa",
    price: 125430,
    change: 1250,
    changePercent: 1.01,
    volume: 8500000000,
  },
  {
    symbol: "PETR4",
    name: "Petrobras",
    price: 32.45,
    change: -0.85,
    changePercent: -2.55,
    volume: 45000000,
  },
  {
    symbol: "VALE3",
    name: "Vale",
    price: 65.2,
    change: 1.2,
    changePercent: 1.87,
    volume: 32000000,
  },
]

export function MarketWidget() {
  const [marketData, setMarketData] = useState<MarketData[]>(mockMarketData)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const updateMarketData = () => {
    setIsLoading(true)

    // Simular atualização dos dados
    setTimeout(() => {
      setMarketData((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * (item.price * 0.02),
          change: (Math.random() - 0.5) * (item.price * 0.05),
          changePercent: (Math.random() - 0.5) * 5,
          volume: Math.floor(item.volume * (0.8 + Math.random() * 0.4)),
        })),
      )
      setLastUpdate(new Date())
      setIsLoading(false)
    }, 1500)
  }

  // Auto-update a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(updateMarketData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="card-premium border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Mercado em Tempo Real
            </CardTitle>
            <CardDescription>Última atualização: {lastUpdate.toLocaleTimeString()}</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={updateMarketData}
            disabled={isLoading}
            className="rounded-xl bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marketData.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl border"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.symbol}</h4>
                  <p className="text-sm text-gray-600">{item.name}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg text-gray-900">
                  {item.symbol === "BILLION" ? "$" : "R$"}{" "}
                  {item.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={item.changePercent >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {item.changePercent >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {item.changePercent >= 0 ? "+" : ""}
                    {item.changePercent.toFixed(2)}%
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 mt-1">Vol: {item.volume.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">$BILLION Token</h4>
              <p className="text-sm text-gray-600">Token oficial da plataforma</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">$ {marketData[0]?.price.toFixed(4)}</div>
              <Badge className="bg-blue-500 text-white">Ativo Nativo</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
