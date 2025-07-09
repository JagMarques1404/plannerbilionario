import type { Activity } from "./types"

export const getActivitiesByRoutine = (routine: string, objective: string): Activity[] => {
  const baseActivities: Record<string, Activity[]> = {
    riqueza: [
      { id: "1", title: "Ler sobre investimentos", points: 20, completed: false, icon: "📚" },
      { id: "2", title: "Revisar gastos do dia", points: 15, completed: false, icon: "💰" },
      { id: "3", title: "Estudar mercado financeiro", points: 25, completed: false, icon: "📈" },
      { id: "4", title: "Networking profissional", points: 30, completed: false, icon: "🤝" },
    ],
    saude: [
      { id: "1", title: "Exercitar-se 30min", points: 25, completed: false, icon: "💪" },
      { id: "2", title: "Beber 2L de água", points: 15, completed: false, icon: "💧" },
      { id: "3", title: "Meditar 10min", points: 20, completed: false, icon: "🧘" },
      { id: "4", title: "Dormir 8h", points: 30, completed: false, icon: "😴" },
    ],
    empresa: [
      { id: "1", title: "Planejar estratégias", points: 30, completed: false, icon: "🎯" },
      { id: "2", title: "Analisar concorrência", points: 20, completed: false, icon: "🔍" },
      { id: "3", title: "Desenvolver produto", points: 35, completed: false, icon: "🚀" },
      { id: "4", title: "Contatar clientes", points: 25, completed: false, icon: "📞" },
    ],
    espiritualidade: [
      { id: "1", title: "Oração/Meditação", points: 25, completed: false, icon: "🙏" },
      { id: "2", title: "Leitura espiritual", points: 20, completed: false, icon: "📖" },
      { id: "3", title: "Gratidão diária", points: 15, completed: false, icon: "✨" },
      { id: "4", title: "Ato de bondade", points: 30, completed: false, icon: "❤️" },
    ],
  }

  let activities = baseActivities[objective] || baseActivities.riqueza

  // Ajustar quantidade baseado na rotina
  if (routine === "leve") {
    activities = activities.slice(0, 2)
  } else if (routine === "moderada") {
    activities = activities.slice(0, 3)
  }

  return activities
}
