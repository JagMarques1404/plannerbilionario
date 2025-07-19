"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"

const marketData = [
  {
    symbol: "IBOV",
    name: "Ibovespa",
    price: 126847,
    change: 2.34,
    changePercent: 1.88,
  },
  {
    symbol: "USDBRL",
    name: "Dólar",
    price: 5.23,
    change: -0.05,
    changePercent: -0.95,
  },
  {
    symbol: "BITCOIN",
    name: "Bitcoin",
    price: 43250,
    change: 1250,
    changePercent: 2.98,
  },
  {
    symbol: "BILLION",
    name: "$BILLION Token",
    price: 1.25,
    change: 0.03,
    changePercent: 2.46,
  },
]

export function MarketWidget() {
  return (
    <Card className="card-premium border-0">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-green-500" />
          Mercado em Tempo Real
        </CardTitle>
        <CardDescription>Dados simulados para demonstração</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {marketData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">{item.symbol}</span>
                <Badge variant="outline" className="text-xs">
                  {item.name}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg font-bold">
                  {item.symbol === "USDBRL" || item.symbol === "BILLION"
                    ? `R$ ${item.price.toFixed(2)}`
                    : item.price.toLocaleString()}
                </span>
                <div className={`flex items-center space-x-1 ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {item.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span className="text-sm font-medium">
                    {item.changePercent >= 0 ? "+" : ""}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-4 w-4 text-yellow-600" />
            <span className="font-semibold text-yellow-800">$BILLION Token</span>
          </div>
          <div className="text-sm text-yellow-700">
            <p>Volume 24h: R$ 2.8M</p>
            <p>Market Cap: R$ 125M</p>
            <p className="text-xs mt-1 opacity-75">*Dados simulados para demonstração</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
