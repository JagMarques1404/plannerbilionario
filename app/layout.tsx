import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/contexts/app-context"
import { NotificationSystem } from "@/components/notification-system"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Julius Investidor - Desafio Bilionário",
  description: "Plataforma gamificada de investimentos com missões, rankings e comunidade",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SessionProvider>
          <AppProvider>
            {children}
            <NotificationSystem />
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
