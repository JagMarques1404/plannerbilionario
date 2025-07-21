"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, ChevronLeft, ChevronRight, Play, Lightbulb, Target, MousePointer, Eye, ArrowDown } from "lucide-react"

interface TutorialPopupProps {
  titulo: string
  conteudo: string
  etapaAtual: number
  totalEtapas: number
  progresso: number
  video?: string
  gif?: string
  dica?: string
  acao?: "click" | "hover" | "scroll"
  onProximo: () => void
  onAnterior: () => void
  onPular: () => void
  onFechar: () => void
  podeVoltar: boolean
  ultimaEtapa: boolean
}

export const TutorialPopup: React.FC<TutorialPopupProps> = ({
  titulo,
  conteudo,
  etapaAtual,
  totalEtapas,
  progresso,
  video,
  gif,
  dica,
  acao,
  onProximo,
  onAnterior,
  onPular,
  onFechar,
  podeVoltar,
  ultimaEtapa,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-lg text-gray-800">{titulo}</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onFechar} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                Etapa {etapaAtual + 1} de {totalEtapas}
              </span>
              <span>{Math.round(progresso)}% concluído</span>
            </div>
            <Progress value={progresso} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">{conteudo}</p>

          {/* Mídia (Vídeo ou GIF) */}
          {(video || gif) && (
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              {video ? (
                <div className="space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-600">🎥 Vídeo explicativo (30s)</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    <Play className="h-4 w-4 mr-2" />
                    Assistir
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-600">🎬 Demonstração visual</p>
                </div>
              )}
            </div>
          )}

          {/* Ação Requerida */}
          {acao && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                {acao === "click" && <MousePointer className="h-4 w-4 text-orange-600" />}
                {acao === "hover" && <Eye className="h-4 w-4 text-orange-600" />}
                {acao === "scroll" && <ArrowDown className="h-4 w-4 text-orange-600" />}
                <span className="text-sm font-medium text-orange-800">
                  {acao === "click" && "Clique no elemento destacado"}
                  {acao === "hover" && "Passe o mouse sobre o elemento"}
                  {acao === "scroll" && "Role a página para baixo"}
                </span>
              </div>
            </div>
          )}

          {/* Dica Especial */}
          {dica && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 mb-1">💡 Dica Pro:</p>
                  <p className="text-sm text-yellow-700">{dica}</p>
                </div>
              </div>
            </div>
          )}

          {/* Botões de Navegação */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-2">
              {podeVoltar && (
                <Button variant="outline" size="sm" onClick={onAnterior} className="text-gray-600 bg-transparent">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
              )}

              <Button variant="ghost" size="sm" onClick={onPular} className="text-gray-500 hover:text-gray-700">
                Pular Tutorial
              </Button>
            </div>

            <Button
              onClick={onProximo}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              {ultimaEtapa ? (
                <>
                  Finalizar
                  <Target className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Continuar
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Badges de Progresso */}
          <div className="flex justify-center space-x-1 pt-2">
            {Array.from({ length: totalEtapas }, (_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i <= etapaAtual ? "bg-blue-500" : "bg-gray-300"}`} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
