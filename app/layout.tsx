import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/contexts/app-context"

export const metadata: Metadata = {
  title: "👑 DESAFIO BILIONÁRIO",
  description: "Transforme sua vida financeira em um jogo épico",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
