"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Crown, Star, Clock, CheckCircle, Lock } from "lucide-react"
import { useAppStore } from "@/store/app-store"
import { CelebrationModal } from "@/components/celebration-modal"

// Sistema de Níveis com Benefícios Tangíveis
const levelSystem = [
  {
    level: 1,
    name: "Iniciante Curioso",
    icon: "🌱",
    xpRequired: 0,
    benefits: [
      "Acesso ao simulador básico",
      "1 simulação por dia",
      "Conteúdo educativo básico",
      "Comunidade iniciante",
    ],
    color: "from-green-400 to-green-600",
  },
  {
    level: 2,
    name: "Aprendiz Dedicado",
    icon: "📚",
    xpRequired: 500,
    benefits: ["3 simulações por dia", "Acesso a webinars básicos", "Chat com mentores", "Relatórios semanais"],
    color: "from-blue-400 to-blue-600",
  },
  {
    level: 3,
    name: "Investidor Promissor",
    icon: "📈",
    xpRequired: 1500,
    benefits: ["5 simulações por dia", "Análises de mercado", "Grupos exclusivos", "Consultoria mensal"],
    color: "from-purple-400 to-purple-600",
  },
  {
    level: 4,
    name: "Estrategista Hábil",
    icon: "🎯",
    xpRequired: 3500,
    benefits: ["10 simulações por dia", "Acesso a IPOs simulados", "Mentoria semanal", "Eventos VIP"],
    color: "from-orange-400 to-orange-600",
  },
  {
    level: 5,
    name: "Mestre dos Mercados",
    icon: "👑",
    xpRequired: 7500,
    benefits: [
      "Simulações ilimitadas",
      "Acesso total à plataforma",
      "Mentoria personalizada",
      "Participação em decisões",
    ],
    color: "from-yellow-400 to-yellow-600",
  },
  {
    level: 6,
    name: "Lenda Bilionária",
    icon: "💎",
    xpRequired: 15000,
    benefits: ["Status de fundador", "Participação nos lucros", "Acesso vitalício", "Reconhecimento público"],
    color: "from-pink-400 to-pink-600",
  },
]

// Sistema de Joias com Benefícios
const gemSystem = [
  {
    name: "Quartzo",
    icon: "⚪",
    requirement: "Completar 7 dias consecutivos",
    benefit: "+5% XP em todas as atividades",
    rarity: "comum",
    color: "text-gray-500",
  },
  {
    name: "Ametista",
    icon: "🟣",
    requirement: "Alcançar 30 dias de streak",
    benefit: "+10% XP + Acesso a conteúdo premium",
    rarity: "raro",
    color: "text-purple-500",
  },
  {
    name: "Esmeralda",
    icon: "🟢",
    requirement: "Completar 100 missões",
    benefit: "+15% XP + Simulações extras",
    rarity: "épico",
    color: "text-green-500",
  },
  {
    name: "Rubi",
    icon: "🔴",
    requirement: "Estar no top 10 do ranking",
    benefit: "+20% XP + Mentoria exclusiva",
    rarity: "lendário",
    color: "text-red-500",
  },
  {
    name: "Safira",
    icon: "🔵",
    requirement: "Alcançar nível 5",
    benefit: "+25% XP + Acesso VIP",
    rarity: "mítico",
    color: "text-blue-500",
  },
  {
    name: "Diamante",
    icon: "💎",
    requirement: "Ser top 3 global",
    benefit: "+50% XP + Participação nos lucros",
    rarity: "divino",
    color: "text-yellow-500",
  },
]

// Sistema de Badges com 50+ conquistas
const badgeSystem = [
  // Badges de Início
  { id: "primeiro_login", name: "Primeiro Passo", icon: "👋", description: "Fez o primeiro login", category: "inicio" },
  {
    id: "perfil_completo",
    name: "Perfil Completo",
    icon: "✅",
    description: "Completou 100% do perfil",
    category: "inicio",
  },
  {
    id: "primeira_simulacao",
    name: "Primeira Simulação",
    icon: "🎯",
    description: "Realizou a primeira simulação",
    category: "inicio",
  },

  // Badges de Consistência
  { id: "streak_7", name: "Uma Semana", icon: "📅", description: "7 dias consecutivos", category: "consistencia" },
  { id: "streak_30", name: "Um Mês", icon: "🗓️", description: "30 dias consecutivos", category: "consistencia" },
  { id: "streak_100", name: "Cem Dias", icon: "💯", description: "100 dias consecutivos", category: "consistencia" },
  { id: "streak_365", name: "Um Ano", icon: "🎊", description: "365 dias consecutivos", category: "consistencia" },

  // Badges de Aprendizado
  { id: "estudioso", name: "Estudioso", icon: "📚", description: "Completou 50 lições", category: "aprendizado" },
  {
    id: "mestre_conhecimento",
    name: "Mestre do Conhecimento",
    icon: "🎓",
    description: "100% de acertos em 10 quizzes",
    category: "aprendizado",
  },
  { id: "leitor_voraz", name: "Leitor Voraz", icon: "📖", description: "Leu 100 artigos", category: "aprendizado" },

  // Badges de Simulação
  {
    id: "simulador_bronze",
    name: "Simulador Bronze",
    icon: "🥉",
    description: "100 simulações realizadas",
    category: "simulacao",
  },
  {
    id: "simulador_prata",
    name: "Simulador Prata",
    icon: "🥈",
    description: "500 simulações realizadas",
    category: "simulacao",
  },
  {
    id: "simulador_ouro",
    name: "Simulador Ouro",
    icon: "🥇",
    description: "1000 simulações realizadas",
    category: "simulacao",
  },
  {
    id: "lucro_consistente",
    name: "Lucro Consistente",
    icon: "📈",
    description: "10 simulações lucrativas seguidas",
    category: "simulacao",
  },

  // Badges Sociais
  {
    id: "social_butterfly",
    name: "Borboleta Social",
    icon: "🦋",
    description: "Interagiu com 50 usuários",
    category: "social",
  },
  { id: "mentor", name: "Mentor", icon: "👨‍🏫", description: "Ajudou 10 iniciantes", category: "social" },
  {
    id: "influenciador",
    name: "Influenciador",
    icon: "⭐",
    description: "100 seguidores na plataforma",
    category: "social",
  },

  // Badges de Conquista
  {
    id: "milionario_virtual",
    name: "Milionário Virtual",
    icon: "💰",
    description: "R$ 1M em simulações",
    category: "conquista",
  },
  {
    id: "bilionario_virtual",
    name: "Bilionário Virtual",
    icon: "💎",
    description: "R$ 1B em simulações",
    category: "conquista",
  },
  {
    id: "rei_dos_dividendos",
    name: "Rei dos Dividendos",
    icon: "👑",
    description: "R$ 10k em dividendos simulados",
    category: "conquista",
  },

  // Badges Especiais
  {
    id: "early_adopter",
    name: "Early Adopter",
    icon: "🚀",
    description: "Usuário dos primeiros 1000",
    category: "especial",
  },
  { id: "beta_tester", name: "Beta Tester", icon: "🧪", description: "Participou da fase beta", category: "especial" },
  {
    id: "feedback_hero",
    name: "Herói do Feedback",
    icon: "💬",
    description: "Enviou 50 feedbacks",
    category: "especial",
  },

  // Badges de Eventos
  {
    id: "black_friday",
    name: "Black Friday",
    icon: "🛍️",
    description: "Participou do evento Black Friday",
    category: "evento",
  },
  { id: "natal_2024", name: "Natal 2024", icon: "🎄", description: "Ativo durante o Natal 2024", category: "evento" },
  { id: "ano_novo", name: "Ano Novo", icon: "🎆", description: "Primeiro login do ano", category: "evento" },

  // Badges de Desafios
  {
    id: "desafio_30_dias",
    name: "Desafio 30 Dias",
    icon: "🏃",
    description: "Completou desafio de 30 dias",
    category: "desafio",
  },
  {
    id: "maratona_aprendizado",
    name: "Maratona do Aprendizado",
    icon: "🏃‍♀️",
    description: "24h estudando",
    category: "desafio",
  },
  { id: "sem_perdas", name: "Sem Perdas", icon: "🛡️", description: "50 simulações sem prejuízo", category: "desafio" },

  // Badges de Habilidades
  {
    id: "analista_tecnico",
    name: "Analista Técnico",
    icon: "📊",
    description: "Dominou análise técnica",
    category: "habilidade",
  },
  {
    id: "analista_fundamentalista",
    name: "Analista Fundamentalista",
    icon: "📋",
    description: "Dominou análise fundamentalista",
    category: "habilidade",
  },
  { id: "trader_day", name: "Day Trader", icon: "⚡", description: "100 operações intraday", category: "habilidade" },

  // Badges de Tempo
  { id: "madrugador", name: "Madrugador", icon: "🌅", description: "Login antes das 6h", category: "tempo" },
  { id: "coruja", name: "Coruja", icon: "🦉", description: "Ativo após meia-noite", category: "tempo" },
  {
    id: "fim_de_semana",
    name: "Guerreiro do Fim de Semana",
    icon: "🏖️",
    description: "Ativo nos fins de semana",
    category: "tempo",
  },

  // Badges de Precisão
  { id: "sniper", name: "Sniper", icon: "🎯", description: "95% de precisão em 100 operações", category: "precisao" },
  { id: "oraculo", name: "Oráculo", icon: "🔮", description: "Previu 10 movimentos corretos", category: "precisao" },
  {
    id: "estrategista",
    name: "Estrategista",
    icon: "♟️",
    description: "Criou 5 estratégias vencedoras",
    category: "precisao",
  },

  // Badges de Comunidade
  { id: "embaixador", name: "Embaixador", icon: "🌟", description: "Trouxe 10 amigos", category: "comunidade" },
  {
    id: "moderador",
    name: "Moderador",
    icon: "🛡️",
    description: "Ajudou a moderar a comunidade",
    category: "comunidade",
  },
  {
    id: "criador_conteudo",
    name: "Criador de Conteúdo",
    icon: "🎨",
    description: "Criou conteúdo para a plataforma",
    category: "comunidade",
  },

  // Badges de Inovação
  {
    id: "inovador",
    name: "Inovador",
    icon: "💡",
    description: "Sugeriu funcionalidade implementada",
    category: "inovacao",
  },
  {
    id: "pioneiro",
    name: "Pioneiro",
    icon: "🗺️",
    description: "Primeiro a testar nova funcionalidade",
    category: "inovacao",
  },
  {
    id: "visionario",
    name: "Visionário",
    icon: "👁️",
    description: "Antecipou tendência de mercado",
    category: "inovacao",
  },

  // Badges de Resistência
  {
    id: "resiliente",
    name: "Resiliente",
    icon: "💪",
    description: "Recuperou de 10 perdas seguidas",
    category: "resistencia",
  },
  {
    id: "inabalavel",
    name: "Inabalável",
    icon: "🗿",
    description: "Manteve estratégia em crise",
    category: "resistencia",
  },
  { id: "fenix", name: "Fênix", icon: "🔥", description: "Ressurgiu das cinzas", category: "resistencia" },

  // Badges de Velocidade
  { id: "flash", name: "Flash", icon: "⚡", description: "Operação em menos de 1 segundo", category: "velocidade" },
  { id: "sonic", name: "Sonic", icon: "💨", description: "100 operações em 1 hora", category: "velocidade" },
  {
    id: "bullet_time",
    name: "Bullet Time",
    icon: "🕐",
    description: "Timing perfeito em 50 operações",
    category: "velocidade",
  },
]

// Sistema de Ligas Competitivas
const leagueSystem = [
  { name: "Bronze", icon: "🥉", minPoints: 0, maxPoints: 999, color: "text-amber-600" },
  { name: "Prata", icon: "🥈", minPoints: 1000, maxPoints: 2499, color: "text-gray-500" },
  { name: "Ouro", icon: "🥇", minPoints: 2500, maxPoints: 4999, color: "text-yellow-500" },
  { name: "Platina", icon: "💍", minPoints: 5000, maxPoints: 9999, color: "text-blue-400" },
  { name: "Diamante", icon: "💎", minPoints: 10000, maxPoints: 19999, color: "text-cyan-400" },
  { name: "Mestre", icon: "👑", minPoints: 20000, maxPoints: 49999, color: "text-purple-500" },
  { name: "Grão-Mestre", icon: "🏆", minPoints: 50000, maxPoints: 99999, color: "text-red-500" },
  { name: "Lenda", icon: "⭐", minPoints: 100000, maxPoints: Number.POSITIVE_INFINITY, color: "text-yellow-400" },
]

// Componente principal da Rotina Julius
const RotinaJulius = () => {
  const [habitos, setHabitos] = useState([])
  const [diarioEntries, setDiarioEntries] = useState([])
  const [streakAtual, setStreakAtual] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header da Rotina */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🌟 Rotina Julius</h1>
            <p className="text-gray-600">Transforme hábitos simples em riqueza extraordinária</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500">{streakAtual}</div>
            <div className="text-sm text-gray-500">dias consecutivos</div>
          </div>
        </div>
      </div>

      {/* Checklist Diário */}
      <ChecklistDiario />

      {/* Missões Bônus Bem-estar */}
      <MissoesBemEstar />

      {/* Diário do Investidor */}
      <DiarioInvestidor />
    </div>
  )
}

// Checklist de Hábitos Diários
const ChecklistDiario = () => {
  const habitosDiarios = [
    {
      id: "economizar",
      titulo: "💰 Economizei hoje",
      descricao: "Evitei um gasto desnecessário",
      xp: 15,
      tokens: 5,
    },
    {
      id: "registrar_gastos",
      titulo: "📝 Registrei meus gastos",
      descricao: "Anotei todas as despesas do dia",
      xp: 20,
      tokens: 8,
    },
    {
      id: "estudar",
      titulo: "📚 Estudei sobre finanças",
      descricao: "Li um artigo ou assisti um vídeo",
      xp: 25,
      tokens: 10,
    },
    {
      id: "evitar_impulsos",
      titulo: "🛡️ Evitei compras por impulso",
      descricao: "Resisti à tentação de comprar algo desnecessário",
      xp: 30,
      tokens: 12,
    },
    {
      id: "gratidao",
      titulo: "🙏 Pratiquei gratidão",
      descricao: "Refleti sobre conquistas financeiras",
      xp: 10,
      tokens: 3,
    },
    {
      id: "planejamento",
      titulo: "🎯 Revisei metas financeiras",
      descricao: "Verifiquei progresso das metas mensais",
      xp: 20,
      tokens: 7,
    },
    {
      id: "investimento",
      titulo: "📈 Simulei um investimento",
      descricao: "Explorei oportunidades no marketplace",
      xp: 25,
      tokens: 10,
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ Checklist Diário</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habitosDiarios.map((habito) => (
          <HabitoCard key={habito.id} habito={habito} />
        ))}
      </div>
    </div>
  )
}

// Card de Hábito Individual
const HabitoCard = ({ habito }) => {
  const [concluido, setConcluido] = useState(false)

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
        concluido ? "bg-green-50 border-green-200 shadow-lg" : "bg-gray-50 border-gray-200 hover:border-orange-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{habito.titulo}</h3>
          <p className="text-sm text-gray-600">{habito.descricao}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              +{habito.xp} XP
            </Badge>
            <Badge variant="outline" className="text-xs">
              +{habito.tokens} tokens
            </Badge>
          </div>
        </div>
        <Button
          onClick={() => setConcluido(!concluido)}
          variant={concluido ? "default" : "outline"}
          size="sm"
          className={concluido ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {concluido ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}

// Missões Bônus de Bem-estar
const MissoesBemEstar = () => {
  const missoesBemEstar = [
    {
      id: "sem_impulsos_5d",
      titulo: "🏆 5 dias sem compras por impulso",
      progresso: 3,
      meta: 5,
      recompensa: '100 XP + Badge "Disciplina de Ferro"',
      dificuldade: "hard",
    },
    {
      id: "economia_semanal",
      titulo: "💎 Economizar R$ 50 esta semana",
      progresso: 32.5,
      meta: 50,
      recompensa: "150 tokens + Joia Bronze",
      dificuldade: "medium",
    },
    {
      id: "estudo_consecutivo",
      titulo: "📖 7 dias consecutivos estudando",
      progresso: 4,
      meta: 7,
      recompensa: '200 XP + Badge "Estudioso"',
      dificuldade: "medium",
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Missões Bônus Bem-estar</h2>
      <div className="space-y-4">
        {missoesBemEstar.map((missao) => (
          <MissaoBemEstarCard key={missao.id} missao={missao} />
        ))}
      </div>
    </div>
  )
}

// Card de Missão de Bem-estar
const MissaoBemEstarCard = ({ missao }) => {
  const progressoPercentual = (missao.progresso / missao.meta) * 100

  const getDifficultyColor = (dificuldade) => {
    switch (dificuldade) {
      case "easy":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "hard":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{missao.titulo}</h3>
        <Badge className={getDifficultyColor(missao.dificuldade)}>{missao.dificuldade.toUpperCase()}</Badge>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progresso</span>
          <span>
            {missao.progresso} / {missao.meta}
          </span>
        </div>
        <Progress value={progressoPercentual} className="h-2" />
      </div>

      <div className="text-sm text-gray-600">
        <strong>Recompensa:</strong> {missao.recompensa}
      </div>
    </div>
  )
}

// Diário do Investidor
const DiarioInvestidor = () => {
  const [entradaHoje, setEntradaHoje] = useState("")

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📔 Diário do Investidor</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entrada de Hoje */}
        <div>
          <h3 className="text-lg font-semibold mb-3">✍️ Entrada de Hoje</h3>
          <textarea
            value={entradaHoje}
            onChange={(e) => setEntradaHoje(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="O que aprendi hoje sobre finanças? Quais foram meus acertos e erros?"
          />
          <Button className="mt-3 bg-orange-500 text-white hover:bg-orange-600" disabled={!entradaHoje.trim()}>
            💾 Salvar Entrada (+10 XP)
          </Button>
        </div>

        {/* Entradas Recentes */}
        <div>
          <h3 className="text-lg font-semibold mb-3">📚 Entradas Recentes</h3>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">19/12/2024</div>
              <div className="text-sm">Aprendi sobre diversificação de carteira...</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">18/12/2024</div>
              <div className="text-sm">Consegui economizar R$ 25 hoje evitando delivery...</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">17/12/2024</div>
              <div className="text-sm">Estudei sobre análise fundamentalista...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const GamificacaoPage = () => {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentXP, setCurrentXP] = useState(750)
  const [currentTokens, setCurrentTokens] = useState(1250)
  const [currentStreak, setCurrentStreak] = useState(12)
  const [unlockedBadges, setUnlockedBadges] = useState([
    "primeiro_login",
    "perfil_completo",
    "primeira_simulacao",
    "streak_7",
  ])
  const [currentGems, setCurrentGems] = useState(["Quartzo"])
  const [showCelebration, setShowCelebration] = useState(false)
  const appStore = useAppStore()

  // Calcular nível atual baseado no XP
  useEffect(() => {
    const level = levelSystem.find(
      (l) =>
        currentXP >= l.xpRequired &&
        (levelSystem[levelSystem.indexOf(l) + 1]?.xpRequired > currentXP || !levelSystem[levelSystem.indexOf(l) + 1]),
    )
    if (level) {
      setCurrentLevel(level.level)
    }
  }, [currentXP])

  // Calcular liga atual
  const currentLeague =
    leagueSystem.find((league) => currentXP >= league.minPoints && currentXP <= league.maxPoints) || leagueSystem[0]

  // Próximo nível
  const nextLevel = levelSystem.find((l) => l.level === currentLevel + 1)
  const progressToNextLevel = nextLevel
    ? ((currentXP - levelSystem[currentLevel - 1].xpRequired) /
        (nextLevel.xpRequired - levelSystem[currentLevel - 1].xpRequired)) *
      100
    : 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      {/* Header Principal */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            🎮 Sistema de Gamificação Épico
          </h1>
          <p className="text-gray-600 text-lg">Transforme sua jornada financeira em uma aventura épica!</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{currentLevel}</div>
              <div className="text-sm opacity-90">Nível Atual</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{currentXP.toLocaleString()}</div>
              <div className="text-sm opacity-90">XP Total</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{currentTokens.toLocaleString()}</div>
              <div className="text-sm opacity-90">Tokens</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{currentStreak}</div>
              <div className="text-sm opacity-90">Dias Consecutivos</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="levels">Níveis</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="gems">Joias</TabsTrigger>
          <TabsTrigger value="leagues">Ligas</TabsTrigger>
          <TabsTrigger value="routine">Rotina Julius</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progresso do Nível */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Progresso do Nível
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {levelSystem[currentLevel - 1]?.icon} {levelSystem[currentLevel - 1]?.name}
                      </div>
                      <div className="text-sm text-gray-600">Nível {currentLevel}</div>
                    </div>
                    {nextLevel && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Próximo: {nextLevel.name}</div>
                        <div className="text-xs text-gray-500">{nextLevel.xpRequired - currentXP} XP restantes</div>
                      </div>
                    )}
                  </div>

                  {nextLevel && (
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{currentXP} XP</span>
                        <span>{nextLevel.xpRequired} XP</span>
                      </div>
                      <Progress value={progressToNextLevel} className="h-3" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Benefícios Atuais:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {levelSystem[currentLevel - 1]?.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liga Atual */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-purple-500" />
                  Liga Competitiva
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl">{currentLeague.icon}</div>
                  <div>
                    <div className={`text-2xl font-bold ${currentLeague.color}`}>Liga {currentLeague.name}</div>
                    <div className="text-sm text-gray-600">
                      {currentLeague.minPoints.toLocaleString()} -{" "}
                      {currentLeague.maxPoints === Number.POSITIVE_INFINITY
                        ? "∞"
                        : currentLeague.maxPoints.toLocaleString()}{" "}
                      pontos
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-semibold mb-2">Ranking da Liga</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>🥇 João Silva</span>
                        <span>2,847 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>🥈 Maria Santos</span>
                        <span>2,756 pts</span>
                      </div>
                      <div className="flex justify-between font-semibold text-blue-600">
                        <span>🥉 Você</span>
                        <span>{currentXP} pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conquistas Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Conquistas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {unlockedBadges.slice(-6).map((badgeId) => {
                  const badge = badgeSystem.find((b) => b.id === badgeId)
                  return badge ? (
                    <div
                      key={badge.id}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                    >
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <div className="font-semibold text-sm">{badge.name}</div>
                        <div className="text-xs text-gray-600">{badge.description}</div>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sistema de Níveis */}
        <TabsContent value="levels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Níveis</CardTitle>
              <CardDescription>Evolua através dos níveis e desbloqueie benefícios incríveis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {levelSystem.map((level, index) => (
                  <div
                    key={level.level}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      level.level === currentLevel
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : level.level < currentLevel
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{level.icon}</div>
                        <div>
                          <div className="font-bold text-lg">{level.name}</div>
                          <div className="text-sm text-gray-600">Nível {level.level}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{level.xpRequired.toLocaleString()} XP</div>
                        {level.level === currentLevel && <Badge className="bg-blue-500">Atual</Badge>}
                        {level.level < currentLevel && <Badge className="bg-green-500">Concluído</Badge>}
                        {level.level > currentLevel && <Badge variant="outline">Bloqueado</Badge>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Benefícios:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {level.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center gap-2">
                            {level.level <= currentLevel ? (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            ) : (
                              <Lock className="w-3 h-3 text-gray-400" />
                            )}
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sistema de Badges */}
        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coleção de Badges</CardTitle>
              <CardDescription>
                {unlockedBadges.length} de {badgeSystem.length} badges desbloqueados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={(unlockedBadges.length / badgeSystem.length) * 100} className="h-2" />
              </div>

              {/* Filtros por categoria */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {["todos", ...new Set(badgeSystem.map((b) => b.category))].map((category) => (
                    <Button key={category} variant="outline" size="sm">
                      {category === "todos" ? "Todos" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badgeSystem.map((badge) => {
                  const isUnlocked = unlockedBadges.includes(badge.id)
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isUnlocked
                          ? "border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg"
                          : "border-gray-200 bg-gray-50 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`text-2xl ${isUnlocked ? "" : "grayscale"}`}>
                          {isUnlocked ? badge.icon : "🔒"}
                        </div>
                        <div>
                          <div className="font-semibold">{badge.name}</div>
                          <Badge variant="outline" className="text-xs">
                            {badge.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{badge.description}</div>
                      {isUnlocked && <div className="mt-2 text-xs text-green-600 font-semibold">✅ Desbloqueado!</div>}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sistema de Joias */}
        <TabsContent value="gems" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coleção de Joias</CardTitle>
              <CardDescription>Joias especiais que concedem bônus permanentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gemSystem.map((gem) => {
                  const isUnlocked = currentGems.includes(gem.name)
                  return (
                    <div
                      key={gem.name}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        isUnlocked
                          ? "border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg"
                          : "border-gray-200 bg-gray-50 opacity-60"
                      }`}
                    >
                      <div className="text-center mb-4">
                        <div className={`text-6xl mb-2 ${isUnlocked ? "" : "grayscale"}`}>
                          {isUnlocked ? gem.icon : "🔒"}
                        </div>
                        <div className={`text-xl font-bold ${gem.color}`}>{gem.name}</div>
                        <Badge
                          className={`mt-1 ${
                            gem.rarity === "comum"
                              ? "bg-gray-500"
                              : gem.rarity === "raro"
                                ? "bg-blue-500"
                                : gem.rarity === "épico"
                                  ? "bg-purple-500"
                                  : gem.rarity === "lendário"
                                    ? "bg-orange-500"
                                    : gem.rarity === "mítico"
                                      ? "bg-red-500"
                                      : "bg-yellow-500"
                          }`}
                        >
                          {gem.rarity.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="font-semibold text-sm mb-1">Requisito:</div>
                          <div className="text-sm text-gray-600">{gem.requirement}</div>
                        </div>

                        <div>
                          <div className="font-semibold text-sm mb-1">Benefício:</div>
                          <div className="text-sm text-gray-600">{gem.benefit}</div>
                        </div>

                        {isUnlocked && (
                          <div className="text-center">
                            <Badge className="bg-green-500">✨ Ativo</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sistema de Ligas */}
        <TabsContent value="leagues" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ligas Competitivas</CardTitle>
              <CardDescription>Compete com outros investidores e suba de liga</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leagueSystem.map((league, index) => (
                  <div
                    key={league.name}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      league.name === currentLeague.name
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : currentXP > league.maxPoints
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{league.icon}</div>
                        <div>
                          <div className={`text-xl font-bold ${league.color}`}>Liga {league.name}</div>
                          <div className="text-sm text-gray-600">
                            {league.minPoints.toLocaleString()} -{" "}
                            {league.maxPoints === Number.POSITIVE_INFINITY ? "∞" : league.maxPoints.toLocaleString()}{" "}
                            pontos
                          </div>
                        </div>
                      </div>
                      <div>
                        {league.name === currentLeague.name && <Badge className="bg-blue-500">Atual</Badge>}
                        {currentXP > league.maxPoints && <Badge className="bg-green-500">Concluída</Badge>}
                        {currentXP < league.minPoints && <Badge variant="outline">Bloqueada</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rotina Julius */}
        <TabsContent value="routine" className="space-y-6">
          <RotinaJulius />
        </TabsContent>
      </Tabs>

      {/* Modal de Celebração */}
      {showCelebration && (
        <CelebrationModal
          title="Parabéns!"
          description="Você desbloqueou uma nova conquista!"
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  )
}

export default GamificacaoPage
