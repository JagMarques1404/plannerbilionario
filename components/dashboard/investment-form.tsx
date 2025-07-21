"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InvestmentForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    amount: "",
  })

  const investmentTypes = [
    { value: "real_estate", label: "Imóveis", return: "12%" },
    { value: "stocks", label: "Ações", return: "15%" },
    { value: "crypto", label: "Criptomoedas", return: "25%" },
    { value: "nft", label: "NFTs", return: "30%" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.type || !formData.amount) {
      alert("Preencha todos os campos")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          amount: Number.parseFloat(formData.amount),
        }),
      })

      if (response.ok) {
        alert("Investimento realizado com sucesso!")
        setFormData({ name: "", type: "", amount: "" })
        onSuccess?.()
      } else {
        const error = await response.json()
        alert(error.error || "Erro ao realizar investimento")
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao realizar investimento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Investimento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Investimento</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Apartamento Centro"
            />
          </div>

          <div>
            <Label htmlFor="type">Tipo de Investimento</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {investmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label} (~{type.return} a.a.)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
              placeholder="10000"
              min="100"
              step="100"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Investindo..." : "Realizar Investimento"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
