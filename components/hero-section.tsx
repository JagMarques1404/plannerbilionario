"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Star } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Star className="mr-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
            Novo produto lançado!
          </Badge>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Transforme suas{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ideias em realidade
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            A plataforma completa para criar, gerenciar e escalar seus projetos digitais. Junte-se a mais de 10.000
            usuários que já transformaram seus negócios.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Começar gratuitamente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              <Play className="mr-2 h-4 w-4" />
              Ver demonstração
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center justify-center gap-x-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-white dark:border-gray-900"
                  />
                ))}
              </div>
              <span>+10.000 usuários</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1">4.9/5 avaliação</span>
            </div>
          </div>
        </div>

        {/* Hero image/video placeholder */}
        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:bg-gray-100/5 dark:ring-gray-100/10 lg:rounded-2xl lg:p-4">
            <div className="aspect-video rounded-md bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 flex items-center justify-center">
              <div className="text-center">
                <Play className="mx-auto h-16 w-16 text-purple-600 mb-4" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Demonstração do Produto</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Clique para assistir (2:30)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
