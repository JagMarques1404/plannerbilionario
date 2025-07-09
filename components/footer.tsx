"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react"

const navigation = {
  product: [
    { name: "Recursos", href: "#" },
    { name: "Preços", href: "#" },
    { name: "Integrações", href: "#" },
    { name: "API", href: "#" },
  ],
  company: [
    { name: "Sobre nós", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Carreiras", href: "#" },
    { name: "Imprensa", href: "#" },
  ],
  support: [
    { name: "Central de Ajuda", href: "#" },
    { name: "Documentação", href: "#" },
    { name: "Status", href: "#" },
    { name: "Contato", href: "#" },
  ],
  legal: [
    { name: "Privacidade", href: "#" },
    { name: "Termos", href: "#" },
    { name: "Cookies", href: "#" },
    { name: "LGPD", href: "#" },
  ],
}

const social = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Newsletter */}
        <div className="border-b border-gray-800 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold">Fique por dentro das novidades</h3>
              <p className="mt-2 text-gray-400">
                Receba dicas, atualizações e ofertas exclusivas diretamente no seu email.
              </p>
            </div>
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Seu melhor email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg" />
              <span className="text-xl font-bold">SuaEmpresa</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transformando ideias em realidade através de tecnologia inovadora e soluções que impulsionam o crescimento
              dos negócios.
            </p>

            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP - Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>+55 (11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>contato@suaempresa.com</span>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8">
          <p className="text-gray-400 text-sm">© 2024 SuaEmpresa. Todos os direitos reservados.</p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
