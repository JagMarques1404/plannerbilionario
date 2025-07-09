"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User, CustomActivity } from "@/lib/types"
import { Sparkles, Plus, Trash2, Target } from "lucide-react"

interface CustomQuestionnaireProps {
  onComplete: (user: User, activities: CustomActivity[]) => void
}

const EMOJI_OPTIONS = [
  "💰",
  "📚",
  "💪",
  "🧘",
  "🏃",
  "💧",
  "🎯",
  "📱",
  "🎨",
  "🎵",
  "🍎",
  "😴",
  "📝",
  "🤝",
  "📞",
  "💻",
  "🚀",
  "✨",
  "❤️",
  "🙏",
  "🔥",
  "⚡",
  "🌟",
  "🎉",
  "🏆",
  "💎",
  "🌱",
  "🎪",
  "🎭",
  "🎲",
]

const CATEGORIES = [
  "Saúde & Fitness",
  "Trabalho & Carreira",
  "Finanças",
  "Relacionamentos",
  "Desenvolvimento Pessoal",
  "Hobbies & Lazer",
  "Espiritualidade",
  "Casa & Organização",
]

export default function CustomQuestionnaire({ onComplete }: CustomQuestionnaireProps) {
  const [step, setStep] = useState(1)
  const [user, setUser] = useState({
    name: "",
    objective: "",
    dailyGoal: 100,
  })

  const [activities, setActivities] = useState<CustomActivity[]>([])
  const [currentActivity, setCurrentActivity] = useState({
    title: "",
    points: 10,
    icon: "✨",
    category: "",
  })

  const addActivity = () => {
    if (currentActivity.title && currentActivity.category) {
      const newActivity: CustomActivity = {
        id: Date.now().toString(),
        title: currentActivity.title,
        points: currentActivity.points,
        icon: currentActivity.icon,
        category: currentActivity.category,
        completed: false,
      }

      setActivities([...activities, newActivity])
      setCurrentActivity({
        title: "",
        points: 10,
        icon: "✨",
        category: "",
      })
    }
  }

  const removeActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id))
  }

  const handleSubmit = () => {
    if (user.name && user.objective && activities.length > 0) {
      // Ajustar meta diária baseada nas atividades
      const totalPossiblePoints = activities.reduce((sum, activity) => sum + activity.points, 0)
      const adjustedGoal = Math.min(user.dailyGoal, totalPossiblePoints)

      onComplete({ ...user, dailyGoal: adjustedGoal }, activities)
    }
  }

  const totalPossiblePoints = activities.reduce((sum, activity) => sum + activity.points, 0)

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Planner Bilionário
            </CardTitle>
          </div>
          <CardDescription className="text-lg">Crie sua rotina personalizada para o sucesso</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-8 h-0.5 mx-2 ${
                        step > stepNumber ? "bg-purple-600" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Vamos nos conhecer!</h3>
                <p className="text-muted-foreground">Conte-nos sobre você e seus objetivos</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-base font-medium">
                    Qual é o seu nome?
                  </Label>
                  <Input
                    id="name"
                    placeholder="Digite seu nome"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="text-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="objective" className="text-base font-medium">
                    Qual é o seu principal objetivo?
                  </Label>
                  <Textarea
                    id="objective"
                    placeholder="Ex: Construir riqueza, melhorar saúde, crescer profissionalmente..."
                    value={user.objective}
                    onChange={(e) => setUser({ ...user, objective: e.target.value })}
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="dailyGoal" className="text-base font-medium">
                    Meta de pontos diária
                  </Label>
                  <Input
                    id="dailyGoal"
                    type="number"
                    min="10"
                    max="500"
                    value={user.dailyGoal}
                    onChange={(e) => setUser({ ...user, dailyGoal: Number.parseInt(e.target.value) || 100 })}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">Recomendamos entre 50-150 pontos para começar</p>
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={!user.name || !user.objective}
              >
                Próximo: Criar Atividades
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Crie suas atividades diárias</h3>
                <p className="text-muted-foreground">Adicione as atividades que te levarão ao sucesso</p>
              </div>

              {/* Formulário para adicionar atividade */}
              <Card className="bg-gray-50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Nova Atividade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="activityTitle">Nome da Atividade</Label>
                      <Input
                        id="activityTitle"
                        placeholder="Ex: Exercitar-se 30min"
                        value={currentActivity.title}
                        onChange={(e) => setCurrentActivity({ ...currentActivity, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="activityCategory">Categoria</Label>
                      <Select
                        value={currentActivity.category}
                        onValueChange={(value) => setCurrentActivity({ ...currentActivity, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="activityPoints">Pontos (5-50)</Label>
                      <Input
                        id="activityPoints"
                        type="number"
                        min="5"
                        max="50"
                        value={currentActivity.points}
                        onChange={(e) =>
                          setCurrentActivity({ ...currentActivity, points: Number.parseInt(e.target.value) || 10 })
                        }
                      />
                    </div>
                    <div>
                      <Label>Ícone</Label>
                      <div className="flex flex-wrap gap-2 mt-2 max-h-20 overflow-y-auto">
                        {EMOJI_OPTIONS.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setCurrentActivity({ ...currentActivity, icon: emoji })}
                            className={`text-xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                              currentActivity.icon === emoji ? "bg-purple-100 dark:bg-purple-900" : ""
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={addActivity}
                    disabled={!currentActivity.title || !currentActivity.category}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Atividade
                  </Button>
                </CardContent>
              </Card>

              {/* Lista de atividades adicionadas */}
              {activities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Suas Atividades ({activities.length})</span>
                      <Badge variant="secondary">Total: {totalPossiblePoints} pontos</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{activity.icon}</span>
                          <div>
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-sm text-muted-foreground">{activity.category}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>+{activity.points} pts</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeActivity(activity.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={activities.length === 0}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Próximo: Revisar
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Revisão Final</h3>
                <p className="text-muted-foreground">Confirme suas informações antes de começar</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Seu Perfil
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Nome</Label>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Objetivo</Label>
                      <p className="font-medium">{user.objective}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Meta Diária</Label>
                      <p className="font-medium">{user.dailyGoal} pontos</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de atividades:</span>
                      <span className="font-medium">{activities.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pontos possíveis:</span>
                      <span className="font-medium">{totalPossiblePoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meta ajustada:</span>
                      <span className="font-medium">{Math.min(user.dailyGoal, totalPossiblePoints)} pontos</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Suas Atividades Diárias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                      >
                        <span className="text-xl">{activity.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">{activity.category}</div>
                        </div>
                        <Badge>+{activity.points}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Voltar
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 text-lg py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Começar Jornada!
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
