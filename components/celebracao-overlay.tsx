"use client"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, Trophy, Star, Flame, Target, Brain, ShoppingCart } from "lucide-react"
import type { CelebracaoData } from "@/hooks/use-celebracoes"

interface CelebracaoOverlayProps {
  celebracao: CelebracaoData | null
  onClose: () => void
}

export const CelebracaoOverlay = ({ celebracao, onClose }: CelebracaoOverlayProps) => {
  if (!celebracao) return null

  const renderCelebracao = () => {
    switch (celebracao.tipo) {
      case "level_up":
        return <CelebracaoLevelUp dados={celebracao.dados} />
      case "badge":
        return <CelebracaoBadge dados={celebracao.dados} />
      case "streak":
        return <CelebracaoStreak dados={celebracao.dados} />
      case "missao":
        return <CelebracaoMissao dados={celebracao.dados} />
      case "quiz":
        return <CelebracaoQuiz dados={celebracao.dados} />
      case "compra":
        return <CelebracaoCompra dados={celebracao.dados} />
      default:
        return <CelebracaoGenerica dados={celebracao.dados} />
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative">
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"][
                  Math.floor(Math.random() * 6)
                ],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>

        {renderCelebracao()}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-20 rounded-full p-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Celebração de Level Up
const CelebracaoLevelUp = ({ dados }: { dados: any }) => {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center max-w-md mx-4 shadow-2xl animate-pulse">
      <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
      <h2 className="text-3xl font-bold mb-2">LEVEL UP!</h2>
      <div className="text-6xl font-bold mb-2">{dados.novoLevel}</div>
      <p className="text-xl mb-4">Parabéns! Você evoluiu!</p>
      <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
        <p className="text-sm">XP Total: {dados.xpTotal?.toLocaleString()}</p>
        <p className="text-sm">Próximo Nível: {dados.xpProximoLevel?.toLocaleString()} XP</p>
      </div>
      <div className="text-sm opacity-80">Continue assim e alcance o nível {dados.novoLevel + 1}!</div>
    </div>
  )
}

// Celebração de Badge
const CelebracaoBadge = ({ dados }: { dados: any }) => {
  return (
    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-8 text-white text-center max-w-md mx-4 shadow-2xl">
      <Star className="w-16 h-16 mx-auto mb-4 animate-spin" />
      <h2 className="text-2xl font-bold mb-2">NOVA CONQUISTA!</h2>
      <div className="text-4xl mb-2">{dados.icone}</div>
      <h3 className="text-xl font-semibold mb-2">{dados.nome}</h3>
      <p className="text-sm mb-4">{dados.descricao}</p>
      <div className="bg-white bg-opacity-20 rounded-lg p-3">
        <p className="text-sm">Recompensa: +{dados.xpBonus} XP</p>
        {dados.tokenBonus > 0 && <p className="text-sm">Bônus: +{dados.tokenBonus} tokens</p>}
      </div>
    </div>
  )
}

// Celebração de Streak
const CelebracaoStreak = ({ dados }: { dados: any }) => {
  return (
    <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-xl p-8 text-white text-center max-w-md mx-4 shadow-2xl">
      <Flame className="w-16 h-16 mx-auto mb-4 animate-bounce" />
      <h2 className="text-2xl font-bold mb-2">SEQUÊNCIA ÉPICA!</h2>
      <div className="text-5xl font-bold mb-2">{dados.diasConsecutivos}</div>
      <p className="text-lg mb-4">dias consecutivos</p>
      <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
        <p className="text-sm">Multiplicador: x{dados.multiplicador}</p>
        <p className="text-sm">XP Bônus: +{dados.xpBonus}</p>
        <p className="text-sm">Tokens Bônus: +{dados.tokenBonus}</p>
      </div>
      <div className="text-sm opacity-80">Mantenha o ritmo para aumentar o multiplicador!</div>
    </div>
  )
}

// Celebração de Missão
const CelebracaoMissao = ({ dados }: { dados: any }) => {
  return (
    <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-8 text-white text-center max-w-md mx-4 shadow-2xl">
      <Target className="w-16 h-16 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">MISSÃO COMPLETA!</h2>
      <div className="text-3xl mb-2">{dados.icone}</div>
      <h3 className="text-xl font-semibold mb-2">{dados.titulo}</h3>
      <p className="text-sm mb-4">{dados.descricao}</p>
      <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Progresso</span>
          <span className="text-sm">
            {dados.progresso}/{dados.meta}
          </span>
        </div>
        <Progress value={100} className="h-2 mb-2" />
        <p className="text-sm">Recompensa: {dados.recompensa}</p>
      </div>
    </div>
  )
}

// Celebração de Quiz
const CelebracaoQuiz = ({ dados }: { dados: any }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-8 text-white text-center max-w-md mx-4 shadow-2xl">
      <Brain className="w-16 h-16 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">QUIZ CONCLUÍDO!</h2>
      <div className="text-4xl font-bold mb-2">{dados.pontuacao}%</div>
      <p className="text-lg mb-4">de acertos</p>
      <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
        <p className="text-sm">Parceiro: {dados.parceiro}</p>
        <p className="text-sm">Tokens ganhos: +{dados.tokensGanhos}</p>
        <p className="text-sm">XP ganho: +{dados.xpGanho}</p>
      </div>
      {dados.pontuacao >= 80 && <Badge className="bg-yellow-500">🏆 Performance Excelente!</Badge>}
    </div>
  )
}

// Celebração de Compra
const CelebracaoCompra = ({ dados }: { dados: any }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-8 text-white text-center max-w-md mx-4 shadow-2xl">
      <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">COMPRA REALIZADA!</h2>
      <div className="text-lg mb-4">{dados.produto}</div>
      <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
        <p className="text-sm">Valor: {dados.valor}</p>
        <p className="text-sm">Método: {dados.metodo}</p>
        {dados.desconto > 0 && <p className="text-sm text-green-300">Desconto: -{dados.desconto}%</p>}
      </div>
      <div className="text-sm opacity-80">Obrigado pela sua compra! 🎉</div>
    </div>
  )
}

// Celebração Genérica
const CelebracaoGenerica = ({ dados }: { dados: any }) => {
  return (
    <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl p-8 text-white text-center max-w-md mx-4 shadow-2xl">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold mb-2">{dados.titulo || "Parabéns!"}</h2>
      <p className="text-lg mb-4">{dados.mensagem || "Você alcançou um marco importante!"}</p>
      {dados.detalhes && (
        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <p className="text-sm">{dados.detalhes}</p>
        </div>
      )}
    </div>
  )
}
