"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardPremium, CardPatrocinado } from "@/components/card-animado"
import { SkeletonProdutosList } from "@/components/loading-skeleton"
import { useCelebracoes } from "@/hooks/use-celebracoes"
import { CelebracaoOverlay } from "@/components/celebracao-overlay"
import { useToast } from "@/components/toast-notification"
import { Search, Star, Heart, Share2, Coins, CreditCard, Award, Clock, User } from "lucide-react"

interface Produto {
  id: string
  titulo: string
  preco: number
  precoTokens: number
  descricao: string
  autor: string
  rating: number
  vendas: number
  categoria: "educacao" | "mentoria" | "curso" | "ferramenta" | "analise" | "masterclass"
  nivel: "iniciante" | "intermediario" | "avancado"
  duracao?: string
  thumbnail: string
  tags: string[]
  promocao?: {
    desconto: number
    validoAte: Date
  }
  isFavorito?: boolean
}

interface Quiz {
  id: string
  patrocinador: string
  titulo: string
  recompensa: number
  tempo: number
  perguntas: number
  participantes: number
  logo: string
  categoria: string
  nivel: "facil" | "medio" | "dificil"
  concluido?: boolean
}

export default function LojaPremiumPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca] = useState("")
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos")
  const [filtroNivel, setFiltroNivel] = useState<string>("todos")
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [quizAtivo, setQuizAtivo] = useState<Quiz | null>(null)

  const { celebracaoAtiva, celebrar, limparCelebracao } = useCelebracoes()
  const { addToast } = useToast()

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setProdutos([
        {
          id: "ebook_investimentos",
          titulo: "E-book: Investimentos para Iniciantes",
          preco: 47.9,
          precoTokens: 2500,
          descricao:
            "Guia completo com 150 páginas sobre investimentos básicos, análise fundamentalista e estratégias para iniciantes.",
          autor: "Julius Expert",
          rating: 4.8,
          vendas: 1247,
          categoria: "educacao",
          nivel: "iniciante",
          duracao: "150 páginas",
          thumbnail: "/investment-ebook-cover.png",
          tags: ["investimentos", "iniciante", "ebook", "fundamentos"],
          promocao: {
            desconto: 20,
            validoAte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        },
        {
          id: "mentoria_individual",
          titulo: "Mentoria Individual 1:1",
          preco: 297.0,
          precoTokens: 15000,
          descricao: "Sessão de 1 hora com especialista certificado para análise personalizada do seu portfólio.",
          autor: "Ana Master",
          rating: 4.9,
          vendas: 89,
          categoria: "mentoria",
          nivel: "intermediario",
          duracao: "1 hora",
          thumbnail: "/mentorship-session.png",
          tags: ["mentoria", "1:1", "personalizado", "portfólio"],
        },
        {
          id: "curso_avancado",
          titulo: "Curso Avançado de Trading",
          preco: 497.0,
          precoTokens: 25000,
          descricao: "20 aulas em vídeo + material complementar + acesso ao grupo VIP no Telegram.",
          autor: "Carlos Pro",
          rating: 4.7,
          vendas: 234,
          categoria: "curso",
          nivel: "avancado",
          duracao: "20 horas",
          thumbnail: "/placeholder-yurft.png",
          tags: ["trading", "avançado", "vídeo", "grupo vip"],
        },
        {
          id: "calculadora_premium",
          titulo: "Calculadora de Investimentos Pro",
          preco: 97.0,
          precoTokens: 5000,
          descricao: "Ferramenta avançada para cálculo de rentabilidade, diversificação e planejamento financeiro.",
          autor: "FinTech Julius",
          rating: 4.6,
          vendas: 456,
          categoria: "ferramenta",
          nivel: "intermediario",
          thumbnail: "/investment-calculator.png",
          tags: ["calculadora", "ferramenta", "rentabilidade", "planejamento"],
        },
        {
          id: "relatorio_mensal",
          titulo: "Relatório Mensal de Mercado",
          preco: 67.0,
          precoTokens: 3500,
          descricao: "Análise detalhada do mercado brasileiro com recomendações de investimento.",
          autor: "Equipe Julius",
          rating: 4.5,
          vendas: 789,
          categoria: "analise",
          nivel: "intermediario",
          duracao: "Mensal",
          thumbnail: "/market-analysis-report.png",
          tags: ["relatório", "mercado", "análise", "recomendações"],
        },
        {
          id: "masterclass_dividendos",
          titulo: "Masterclass: Estratégia de Dividendos",
          preco: 197.0,
          precoTokens: 10000,
          descricao: "Aula especial de 3 horas sobre como construir uma carteira focada em dividendos.",
          autor: "Maria Dividends",
          rating: 4.9,
          vendas: 123,
          categoria: "masterclass",
          nivel: "avancado",
          duracao: "3 horas",
          thumbnail: "/dividends-masterclass.png",
          tags: ["masterclass", "dividendos", "estratégia", "carteira"],
        },
      ])

      setQuizzes([
        {
          id: "nubank_quiz",
          patrocinador: "Nubank",
          titulo: "Quiz sobre Cartão de Crédito",
          recompensa: 50,
          tempo: 3,
          perguntas: 5,
          participantes: 2847,
          logo: "💜",
          categoria: "cartao",
          nivel: "facil",
        },
        {
          id: "xp_quiz",
          patrocinador: "XP Investimentos",
          titulo: "Conhecimentos em Renda Fixa",
          recompensa: 75,
          tempo: 5,
          perguntas: 8,
          participantes: 1923,
          logo: "🟡",
          categoria: "renda-fixa",
          nivel: "medio",
        },
        {
          id: "btg_quiz",
          patrocinador: "BTG Pactual",
          titulo: "Fundos de Investimento",
          recompensa: 100,
          tempo: 7,
          perguntas: 10,
          participantes: 1456,
          logo: "🔵",
          categoria: "fundos",
          nivel: "dificil",
        },
        {
          id: "inter_quiz",
          patrocinador: "Banco Inter",
          titulo: "Conta Digital e PIX",
          recompensa: 40,
          tempo: 4,
          perguntas: 6,
          participantes: 3421,
          logo: "🧡",
          categoria: "digital",
          nivel: "facil",
        },
        {
          id: "clear_quiz",
          patrocinador: "Clear Corretora",
          titulo: "Trading e Análise Técnica",
          recompensa: 120,
          tempo: 10,
          perguntas: 12,
          participantes: 987,
          logo: "⚫",
          categoria: "trading",
          nivel: "dificil",
        },
        {
          id: "rico_quiz",
          patrocinador: "Rico Investimentos",
          titulo: "Tesouro Direto",
          recompensa: 60,
          tempo: 6,
          perguntas: 8,
          participantes: 2156,
          logo: "🟢",
          categoria: "tesouro",
          nivel: "medio",
        },
      ])

      setLoading(false)
    }, 1500)
  }, [])

  const produtosFiltrados = produtos.filter((produto) => {
    const matchBusca =
      produto.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      produto.tags.some((tag) => tag.toLowerCase().includes(busca.toLowerCase()))

    const matchCategoria = filtroCategoria === "todos" || produto.categoria === filtroCategoria
    const matchNivel = filtroNivel === "todos" || produto.nivel === filtroNivel

    return matchBusca && matchCategoria && matchNivel
  })

  const handleComprarProduto = (produto: Produto, metodo: "dinheiro" | "tokens") => {
    celebrar("compra", {
      produto: produto.titulo,
      valor: metodo === "tokens" ? produto.precoTokens : produto.preco,
      metodo,
    })

    addToast({
      tipo: "sucesso",
      titulo: "Compra Realizada!",
      mensagem: `${produto.titulo} foi adicionado à sua biblioteca.`,
      acao: {
        label: "Ver Biblioteca",
        onClick: () => console.log("Navegar para biblioteca"),
      },
    })
  }

  const handleFavoritar = (produtoId: string) => {
    setProdutos((prev) => prev.map((p) => (p.id === produtoId ? { ...p, isFavorito: !p.isFavorito } : p)))

    addToast({
      tipo: "info",
      titulo: "Favoritos",
      mensagem: "Produto adicionado aos favoritos!",
    })
  }

  const handleIniciarQuiz = (quiz: Quiz) => {
    setQuizAtivo(quiz)
  }

  const handleConcluirQuiz = (quiz: Quiz, pontuacao: number) => {
    celebrar("quiz", {
      pontuacao,
      totalPerguntas: quiz.perguntas,
      recompensa: quiz.recompensa,
      patrocinador: quiz.patrocinador,
    })

    setQuizzes((prev) => prev.map((q) => (q.id === quiz.id ? { ...q, concluido: true } : q)))

    setQuizAtivo(null)

    addToast({
      tipo: "sucesso",
      titulo: "Quiz Concluído!",
      mensagem: `Você ganhou ${quiz.recompensa} tokens!`,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🛒 Loja Premium Julius</h1>
          <p className="text-gray-600">Produtos exclusivos e quizzes patrocinados</p>
        </div>
        <SkeletonProdutosList />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🛒 Loja Premium Julius</h1>
        <p className="text-gray-600">Produtos exclusivos e quizzes patrocinados para acelerar seu aprendizado</p>
      </div>

      <Tabs defaultValue="produtos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="produtos">Produtos Premium</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes Patrocinados</TabsTrigger>
        </TabsList>

        <TabsContent value="produtos" className="space-y-6">
          {/* Filtros e Busca */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar produtos..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="todos">Todas Categorias</option>
                    <option value="educacao">Educação</option>
                    <option value="mentoria">Mentoria</option>
                    <option value="curso">Cursos</option>
                    <option value="ferramenta">Ferramentas</option>
                    <option value="analise">Análises</option>
                    <option value="masterclass">Masterclass</option>
                  </select>
                  <select
                    value={filtroNivel}
                    onChange={(e) => setFiltroNivel(e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="todos">Todos Níveis</option>
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtosFiltrados.map((produto) => (
              <CardPremium key={produto.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={produto.thumbnail || "/placeholder.svg"}
                    alt={produto.titulo}
                    className="w-full h-48 object-cover"
                  />
                  {produto.promocao && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{produto.promocao.desconto}%</Badge>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => handleFavoritar(produto.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${produto.isFavorito ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {produto.categoria.toUpperCase()}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{produto.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{produto.titulo}</h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{produto.descricao}</p>

                  <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {produto.autor}
                    </div>
                    {produto.duracao && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {produto.duracao}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {produto.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        {produto.promocao ? (
                          <div>
                            <span className="text-lg font-bold text-green-600">
                              R$ {(produto.preco * (1 - produto.promocao.desconto / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              R$ {produto.preco.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-green-600">R$ {produto.preco.toFixed(2)}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">ou {produto.precoTokens} tokens</span>
                    </div>
                    <p className="text-xs text-gray-500">{produto.vendas} vendas</p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleComprarProduto(produto, "dinheiro")}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Comprar com Dinheiro
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
                      onClick={() => handleComprarProduto(produto, "tokens")}
                    >
                      <Coins className="h-4 w-4 mr-2" />
                      Comprar com Tokens
                    </Button>
                  </div>
                </div>
              </CardPremium>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Quizzes Patrocinados
                <Badge variant="secondary">Ganhe tokens</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizzes.map((quiz) => (
                  <CardPatrocinado key={quiz.id}>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{quiz.logo}</span>
                          <span className="text-sm font-medium text-gray-600">{quiz.patrocinador}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          PATROCINADO
                        </Badge>
                      </div>

                      <h3 className="font-bold text-lg text-gray-800 mb-2">{quiz.titulo}</h3>

                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Recompensa:</span>
                          <span className="font-semibold text-green-600 flex items-center gap-1">
                            <Coins className="h-3 w-3" />+{quiz.recompensa} tokens
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tempo:</span>
                          <span>{quiz.tempo} minutos</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Perguntas:</span>
                          <span>{quiz.perguntas}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Participantes:</span>
                          <span>{quiz.participantes.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nível:</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              quiz.nivel === "facil"
                                ? "border-green-500 text-green-600"
                                : quiz.nivel === "medio"
                                  ? "border-yellow-500 text-yellow-600"
                                  : "border-red-500 text-red-600"
                            }`}
                          >
                            {quiz.nivel.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        className={`w-full ${
                          quiz.concluido ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        } text-white`}
                        onClick={() => !quiz.concluido && handleIniciarQuiz(quiz)}
                        disabled={quiz.concluido}
                      >
                        {quiz.concluido ? (
                          <>
                            <Award className="h-4 w-4 mr-2" />
                            Concluído
                          </>
                        ) : (
                          <>🚀 Iniciar Quiz</>
                        )}
                      </Button>
                    </div>
                  </CardPatrocinado>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Transparência:</strong> Seus dados são usados apenas para melhorar a experiência. Você pode
                  optar por não participar a qualquer momento nas configurações.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quiz Modal */}
      {quizAtivo && (
        <QuizModal
          quiz={quizAtivo}
          onClose={() => setQuizAtivo(null)}
          onConcluir={(pontuacao) => handleConcluirQuiz(quizAtivo, pontuacao)}
        />
      )}

      {/* Celebração Overlay */}
      <CelebracaoOverlay celebracao={celebracaoAtiva} onClose={limparCelebracao} />
    </div>
  )
}

// Modal do Quiz
function QuizModal({
  quiz,
  onClose,
  onConcluir,
}: {
  quiz: Quiz
  onClose: () => void
  onConcluir: (pontuacao: number) => void
}) {
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostas, setRespostas] = useState<number[]>([])
  const [tempoRestante, setTempoRestante] = useState(quiz.tempo * 60) // em segundos

  // Perguntas mock baseadas no quiz
  const perguntas = Array.from({ length: quiz.perguntas }, (_, i) => ({
    id: i + 1,
    pergunta: `Pergunta ${i + 1} sobre ${quiz.titulo}`,
    opcoes: [
      "Opção A - Resposta correta",
      "Opção B - Resposta incorreta",
      "Opção C - Resposta incorreta",
      "Opção D - Resposta incorreta",
    ],
    respostaCorreta: 0,
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          // Tempo esgotado
          const pontuacao = respostas.filter((r, i) => r === perguntas[i]?.respostaCorreta).length
          onConcluir(pontuacao)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [respostas, perguntas, onConcluir])

  const handleResposta = (opcao: number) => {
    const novasRespostas = [...respostas]
    novasRespostas[perguntaAtual] = opcao
    setRespostas(novasRespostas)

    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual((prev) => prev + 1)
    } else {
      // Quiz concluído
      const pontuacao = novasRespostas.filter((r, i) => r === perguntas[i]?.respostaCorreta).length
      onConcluir(pontuacao)
    }
  }

  const formatTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60)
    const secs = segundos % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progresso = ((perguntaAtual + 1) / perguntas.length) * 100

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{quiz.logo}</span>
                {quiz.titulo}
              </CardTitle>
              <p className="text-sm text-gray-600">Patrocinado por {quiz.patrocinador}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">{formatTempo(tempoRestante)}</div>
              <div className="text-sm text-gray-500">
                {perguntaAtual + 1} de {perguntas.length}
              </div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">{perguntas[perguntaAtual]?.pergunta}</h3>

            <div className="space-y-3">
              {perguntas[perguntaAtual]?.opcoes.map((opcao, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start p-4 h-auto hover:bg-blue-50 bg-transparent"
                  onClick={() => handleResposta(index)}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {opcao}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <div className="text-sm text-gray-500">Recompensa: {quiz.recompensa} tokens</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
