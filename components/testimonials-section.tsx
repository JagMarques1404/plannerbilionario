"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    content:
      "Esta plataforma revolucionou completamente nosso fluxo de trabalho. A produtividade da equipe aumentou 300% em apenas 2 meses.",
    author: "Maria Silva",
    role: "CEO, TechStart",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    content:
      "Interface intuitiva e recursos poderosos. Conseguimos lançar nosso produto 50% mais rápido do que o planejado.",
    author: "João Santos",
    role: "CTO, InnovaCorp",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    content:
      "O suporte é excepcional e a plataforma é extremamente confiável. Recomendo para qualquer empresa que busca crescimento.",
    author: "Ana Costa",
    role: "Diretora de Produto, ScaleUp",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    content: "Migrar para esta solução foi a melhor decisão que tomamos. ROI positivo já no primeiro mês de uso.",
    author: "Carlos Oliveira",
    role: "Founder, StartupXYZ",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    content:
      "Funcionalidades avançadas com simplicidade de uso. Nossa equipe se adaptou rapidamente e os resultados são impressionantes.",
    author: "Lucia Ferreira",
    role: "VP Engenharia, TechGiant",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    content:
      "A automação e integração com nossas ferramentas existentes economizou horas de trabalho manual diariamente.",
    author: "Pedro Almeida",
    role: "Head of Operations, GrowthCo",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600 dark:text-purple-400">Depoimentos</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            O que nossos clientes dizem
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Mais de 10.000 empresas confiam em nossa plataforma para impulsionar seus negócios.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-900 dark:text-gray-100 mb-6">
                  <p>"{testimonial.content}"</p>
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback>
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
