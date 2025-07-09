"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-blue-600/90" />
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="h-12 w-12 text-white" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pronto para transformar seu negócio?
          </h2>

          <p className="mt-6 text-lg leading-8 text-purple-100">
            Junte-se a milhares de empresas que já estão usando nossa plataforma para acelerar seu crescimento e
            alcançar resultados extraordinários.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
              Começar gratuitamente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 bg-transparent">
              Falar com especialista
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-x-6 text-sm text-purple-100">
            <div className="flex items-center gap-2">✓ Teste grátis por 14 dias</div>
            <div className="flex items-center gap-2">✓ Sem cartão de crédito</div>
            <div className="flex items-center gap-2">✓ Cancele a qualquer momento</div>
          </div>
        </div>
      </div>
    </section>
  )
}
