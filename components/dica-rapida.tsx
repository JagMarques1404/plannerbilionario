"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, X, Lightbulb, Star, Crown, Zap, CheckCircle } from "lucide-react"

interface DicaRapidaProps {
  titulo: string
  conteudo: string
  categoria: "basico" | "intermediario" | "avancado" | "pro"
  icone?: string
  posicao?: "top" | "bottom" | "left" | "right"
  autoShow?: boolean
  delay?: number
  id?: string
}

const categoriaConfig = {
  basico: {
    cor: "bg-green-100 text-green-800 border-green-200",
    icone: Info,
    label: "Básico",
  },
  intermediario: {
    cor: "bg-blue-100 text-blue-800 border-blue-200",
    icone: Lightbulb,
    label: "Intermediário",
  },
  avancado: {
    cor: "bg-purple-100 text-purple-800 border-purple-200",
    icone: Star,
    label: "Avançado",
  },
  pro: {
    cor: "bg-orange-100 text-orange-800 border-orange-200",
    icone: Crown,
    label: "Pro",
  },
}

export const DicaRapida: React.FC<DicaRapidaProps> = ({
  titulo,
  conteudo,
  categoria,
  icone,
  posicao = "top",
  autoShow = false,
  delay = 2000,
  id,
}) => {
  const [mostrarDica, setMostrarDica] = useState(false)
  const [dicaVista, setDicaVista] = useState(false)
  const [animacao, setAnimacao] = useState(false)

  const config = categoriaConfig[categoria]
  const IconeCategoria = config.icone

  // Verificar se a dica já foi vista
  useEffect(() => {
    if (id) {
      const dicasVistas = JSON.parse(localStorage.getItem("dicas_vistas") || "[]")
      setDicaVista(dicasVistas.includes(id))
    }
  }, [id])

  // Auto-show com delay
  useEffect(() => {
    if (autoShow && !dicaVista) {
      const timer = setTimeout(() => {
        setMostrarDica(true)
        setAnimacao(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [autoShow, delay, dicaVista])

  const marcarComoVista = () => {
    if (id) {
      const dicasVistas = JSON.parse(localStorage.getItem("dicas_vistas") || "[]")
      if (!dicasVistas.includes(id)) {
        dicasVistas.push(id)
        localStorage.setItem("dicas_vistas", JSON.stringify(dicasVistas))
        setDicaVista(true)
      }
    }
  }

  const toggleDica = () => {
    setMostrarDica(!mostrarDica)
    if (!mostrarDica) {
      setAnimacao(true)
      marcarComoVista()
    }
  }

  const fecharDica = () => {
    setMostrarDica(false)
    marcarComoVista()
  }

  const posicaoClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  }

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDica}
        className={`relative text-blue-500 hover:text-blue-700 ${!dicaVista ? "animate-pulse" : ""}`}
      >
        <div className="flex items-center space-x-1">
          <IconeCategoria className="h-4 w-4" />
          <span className="text-sm">Dica</span>
          {!dicaVista && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />}
        </div>
      </Button>

      {/* Dica Popup */}
      {mostrarDica && (
        <Card
          className={`absolute ${posicaoClasses[posicao]} w-80 z-20 shadow-xl border-0 ${
            animacao ? "animate-in slide-in-from-bottom-2 duration-300" : ""
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded-full ${config.cor.split(" ")[0]}`}>
                  {icone ? <span className="text-lg">{icone}</span> : <IconeCategoria className="h-4 w-4" />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{titulo}</h4>
                  <Badge variant="outline" className={`text-xs ${config.cor}`}>
                    {config.label}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={fecharDica}
                className="text-gray-400 hover:text-gray-600 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{conteudo}</p>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={fecharDica}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Entendi!
              </Button>

              {categoria === "pro" && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  Dica Pro
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Componente para múltiplas dicas em uma página
export const GerenciadorDicas: React.FC<{
  dicas: Array<DicaRapidaProps & { elemento: string }>
}> = ({ dicas }) => {
  return (
    <>
      {dicas.map((dica, index) => {
        const elemento = document.querySelector(dica.elemento)
        if (!elemento) return null

        return (
          <div
            key={index}
            className="absolute"
            style={{
              top: elemento.getBoundingClientRect().top + window.scrollY - 10,
              left: elemento.getBoundingClientRect().left + elemento.getBoundingClientRect().width + 10,
            }}
          >
            <DicaRapida {...dica} />
          </div>
        )
      })}
    </>
  )
}
