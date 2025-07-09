"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { User } from "@/lib/types"
import { Sparkles } from "lucide-react"

interface QuestionnaireProps {
  onComplete: (user: User) => void
}

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [formData, setFormData] = useState({
    name: "",
    objective: "",
    routine: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.objective && formData.routine) {
      onComplete(formData as User)
    }
  }

  const objectives = [
    { value: "riqueza", label: "Riqueza Financeira", icon: "💰", description: "Foco em investimentos e prosperidade" },
    { value: "saude", label: "Saúde & Bem-estar", icon: "💪", description: "Corpo e mente saudáveis" },
    { value: "empresa", label: "Sucesso Empresarial", icon: "🚀", description: "Construir e expandir negócios" },
    { value: "espiritualidade", label: "Crescimento Espiritual", icon: "✨", description: "Desenvolvimento interior" },
  ]

  const routines = [
    { value: "leve", label: "Leve", description: "2 atividades por dia" },
    { value: "moderada", label: "Moderada", description: "3 atividades por dia" },
    { value: "intensa", label: "Intensa", description: "4+ atividades por dia" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Planner Bilionário
            </CardTitle>
          </div>
          <CardDescription className="text-lg">
            Transforme seus sonhos em realidade com um plano personalizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">
                Qual é o seu nome?
              </Label>
              <Input
                id="name"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-lg p-3"
                required
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Qual é o seu objetivo principal?</Label>
              <RadioGroup
                value={formData.objective}
                onValueChange={(value) => setFormData({ ...formData, objective: value })}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {objectives.map((obj) => (
                  <div key={obj.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={obj.value} id={obj.value} className="sr-only" />
                    <Label
                      htmlFor={obj.value}
                      className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent ${
                        formData.objective === obj.value
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{obj.icon}</span>
                        <div>
                          <div className="font-medium">{obj.label}</div>
                          <div className="text-sm text-muted-foreground">{obj.description}</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Que tipo de rotina você prefere?</Label>
              <RadioGroup
                value={formData.routine}
                onValueChange={(value) => setFormData({ ...formData, routine: value })}
                className="space-y-3"
              >
                {routines.map((routine) => (
                  <div key={routine.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={routine.value} id={routine.value} className="sr-only" />
                    <Label
                      htmlFor={routine.value}
                      className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent ${
                        formData.routine === routine.value
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{routine.label}</div>
                        <div className="text-sm text-muted-foreground">{routine.description}</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={!formData.name || !formData.objective || !formData.routine}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Começar Jornada Bilionária
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
