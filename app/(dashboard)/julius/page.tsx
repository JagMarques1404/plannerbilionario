"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  Send,
  BookOpen,
  Star,
  ThumbsUp,
  Share2,
  Lightbulb,
  TrendingUp,
  Users,
  Clock,
  Bot,
  User,
  Sparkles,
} from "lucide-react"

export default function JuliusPage() {
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot" as const,
      content:
        "Olá! Eu sou o Julius, seu mentor financeiro pessoal. Estou aqui para te ajudar a tomar decisões mais inteligentes com seu dinheiro. Como posso te ajudar hoje?",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 2,
      type: "user" as const,
      content: "Oi Julius! Quero começar a investir mas não sei por onde começar.",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: 3,
      type: "bot" as const,
      content:
        "Excelente pergunta! Começar a investir é uma das melhores decisões que você pode tomar. Primeiro, me conta: você já tem uma reserva de emergência? E qual é seu perfil de risco - conservador, moderado ou arrojado?",
      timestamp: new Date(Date.now() - 180000),
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: currentMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")
    setIsTyping(true)

    // Simular resposta do Julius
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot" as const,
        content: generateJuliusResponse(currentMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateJuliusResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("reserva") || lowerMessage.includes("emergência")) {
      return "Perfeito! A reserva de emergência é fundamental. Recomendo guardar de 3 a 6 meses dos seus gastos mensais em investimentos líquidos como poupança ou CDB. Isso te dará segurança para investir o restante com mais tranquilidade."
    }

    if (lowerMessage.includes("renda fixa") || lowerMessage.includes("conservador")) {
      return "Ótima escolha para começar! Para perfil conservador, sugiro: 1) Tesouro Selic (liquidez diária), 2) CDB de bancos grandes, 3) LCI/LCA (isentos de IR). Comece com pequenos valores para se acostumar."
    }

    if (lowerMessage.includes("ações") || lowerMessage.includes("bolsa")) {
      return "Ações podem ser muito rentáveis no longo prazo! Dicas importantes: 1) Estude a empresa antes de investir, 2) Diversifique entre setores, 3) Pense em pelo menos 5 anos de prazo. Quer que eu te ensine a analisar uma ação específica?"
    }

    if (lowerMessage.includes("quanto") || lowerMessage.includes("valor")) {
      return "Não existe valor mínimo para começar! Mesmo R$ 30 por mês já faz diferença com o tempo. O importante é criar o hábito. Sugiro começar com 10% da sua renda e ir aumentando gradualmente."
    }

    return "Entendo sua dúvida! Cada situação é única, mas posso te dar algumas dicas gerais. O mais importante é começar, mesmo que seja com pouco. Quer que eu te ajude a montar um plano personalizado baseado no seu perfil?"
  }

  const quickQuestions = [
    "Como começar a investir?",
    "Qual a diferença entre renda fixa e variável?",
    "Como montar uma carteira diversificada?",
    "Quando vender um investimento?",
    "Como calcular minha reserva de emergência?",
    "Vale a pena investir em criptomoedas?",
  ]

  return (
    <div className="space-y-6">
      {/* Header Julius */}
      <Card className="julius-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                🧠
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="julius-text-h1 flex items-center gap-2">
                Julius - Seu Mentor IA
                <Badge className="julius-badge-level">
                  <Sparkles className="h-3 w-3 mr-1" />
                  IA
                </Badge>
              </h1>
              <p className="julius-text-body">
                Especialista em educação financeira • Mais de 10.000 conversas • Disponível 24/7
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-medium">Online agora</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">2.847 pessoas ajudadas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-gray-600">4.9/5 avaliação</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Conteúdo */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
          <TabsTrigger value="chat" className="julius-focus">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="tips" className="julius-focus">
            <Lightbulb className="h-4 w-4 mr-2" />
            Dicas
          </TabsTrigger>
          <TabsTrigger value="library" className="julius-focus">
            <BookOpen className="h-4 w-4 mr-2" />
            Biblioteca
          </TabsTrigger>
          <TabsTrigger value="stats" className="julius-focus">
            <TrendingUp className="h-4 w-4 mr-2" />
            Estatísticas
          </TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="space-y-4">
          <Card className="julius-card">
            <CardHeader>
              <CardTitle className="julius-text-h3 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-orange-400" />
                Conversa com Julius
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Área de Mensagens */}
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input de Mensagem */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Digite sua pergunta para o Julius..."
                    className="flex-1 julius-focus"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isTyping}
                    className="julius-btn-primary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Perguntas Rápidas */}
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Perguntas frequentes:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.slice(0, 3).map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentMessage(question)}
                        className="text-xs julius-btn-outline"
                        disabled={isTyping}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dicas Tab */}
        <TabsContent value="tips" className="space-y-4">
          <TipsSection />
        </TabsContent>

        {/* Biblioteca Tab */}
        <TabsContent value="library" className="space-y-4">
          <LibrarySection />
        </TabsContent>

        {/* Estatísticas Tab */}
        <TabsContent value="stats" className="space-y-4">
          <StatsSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Componente de Bolha de Mensagem
function MessageBubble({ message }: { message: any }) {
  const isBot = message.type === "bot"

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} gap-3`}>
      {isBot && (
        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div className={`max-w-md p-3 rounded-lg ${isBot ? "bg-gray-100 text-gray-800" : "bg-orange-400 text-white"}`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`text-xs mt-2 ${isBot ? "text-gray-500" : "text-orange-100"}`}>
          {message.timestamp.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      {!isBot && (
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}

// Indicador de Digitação
function TypingIndicator() {
  return (
    <div className="flex justify-start gap-3">
      <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
        <Bot className="h-4 w-4" />
      </div>
      <div className="bg-gray-100 p-3 rounded-lg">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}

// Seção de Dicas
function TipsSection() {
  const tips = [
    {
      category: "💰 Economia Básica",
      items: [
        {
          title: "Regra dos 50/30/20",
          content: "50% necessidades, 30% desejos, 20% poupança",
          likes: 247,
        },
        {
          title: "Lista de Compras",
          content: "Nunca vá ao mercado sem lista para evitar gastos desnecessários",
          likes: 189,
        },
      ],
    },
    {
      category: "📈 Investimentos",
      items: [
        {
          title: "Comece Pequeno",
          content: "R$ 50 por mês já é um ótimo começo para criar o hábito",
          likes: 312,
        },
        {
          title: "Diversificação",
          content: "Não coloque todos os ovos na mesma cesta",
          likes: 278,
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {tips.map((category, index) => (
        <Card key={index} className="julius-card">
          <CardHeader>
            <CardTitle className="julius-text-h3">{category.category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.items.map((tip, tipIndex) => (
              <div key={tipIndex} className="p-4 bg-gray-50 rounded-lg julius-hover">
                <h4 className="font-semibold text-gray-800 mb-2">{tip.title}</h4>
                <p className="julius-text-body mb-3">{tip.content}</p>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="julius-focus">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {tip.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="julius-focus">
                    <Share2 className="h-4 w-4 mr-1" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Seção da Biblioteca
function LibrarySection() {
  const articles = [
    {
      title: "Guia Completo: Como Começar a Investir",
      description: "Tudo que você precisa saber para dar os primeiros passos no mundo dos investimentos",
      readTime: "8 min",
      category: "Iniciante",
    },
    {
      title: "Análise Fundamentalista: O Que Observar",
      description: "Aprenda a analisar empresas antes de investir em suas ações",
      readTime: "12 min",
      category: "Intermediário",
    },
    {
      title: "Diversificação: A Chave do Sucesso",
      description: "Como montar uma carteira equilibrada e reduzir riscos",
      readTime: "6 min",
      category: "Iniciante",
    },
  ]

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <Card key={index} className="julius-card julius-hover">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="julius-badge-status">{article.category}</Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="julius-text-h3 mb-2">{article.title}</h3>
                <p className="julius-text-body">{article.description}</p>
              </div>
              <Button className="julius-btn-primary ml-4">Ler</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Seção de Estatísticas
function StatsSection() {
  return (
    <div className="julius-grid-responsive">
      <Card className="julius-card">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-orange-400 mb-2">2.847</div>
          <div className="text-sm text-gray-600">Pessoas Ajudadas</div>
        </CardContent>
      </Card>
      <Card className="julius-card">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">97%</div>
          <div className="text-sm text-gray-600">Taxa de Satisfação</div>
        </CardContent>
      </Card>
      <Card className="julius-card">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
          <div className="text-sm text-gray-600">Disponibilidade</div>
        </CardContent>
      </Card>
    </div>
  )
}
