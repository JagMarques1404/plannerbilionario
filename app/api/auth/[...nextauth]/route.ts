import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/supabase"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "sandbox",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null

        try {
          // Verificar se usuário existe
          const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("email", credentials.email)
            .single()

          if (existingUser && !fetchError) {
            return {
              id: existingUser.id,
              email: existingUser.email,
              name: existingUser.name,
            }
          }

          // Criar novo usuário
          const { data: newUser, error: createError } = await supabase
            .from("users")
            .insert({
              email: credentials.email,
              username: credentials.email.split("@")[0],
              name: "Usuário Sandbox",
              xp: 0,
              level: 1,
              tokens: 1000,
              balance: 100000,
              total_invested: 0,
              total_returns: 0,
              current_streak: 0,
            })
            .select()
            .single()

          if (createError || !newUser) {
            console.error("Error creating user:", createError)
            return null
          }

          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }: any) {
      if (token) session.user.id = token.id as string
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
