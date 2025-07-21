import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { supabase } from "@/lib/supabase"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data: investments, error } = await supabase
      .from("investments")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(investments || [])
  } catch (error) {
    console.error("Erro ao buscar investimentos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { name, type, amount } = await request.json()

    if (!name || !type || !amount || amount <= 0) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    // Verificar saldo
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("balance, total_invested")
      .eq("id", session.user.id)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    if (user.balance < amount) {
      return NextResponse.json({ error: "Saldo insuficiente" }, { status: 400 })
    }

    // Simular retorno baseado no tipo
    const returnRates: Record<string, number> = {
      real_estate: 0.12, // 12% ao ano
      stocks: 0.15, // 15% ao ano
      crypto: 0.25, // 25% ao ano (mais volátil)
      nft: 0.3, // 30% ao ano (mais arriscado)
      bonds: 0.08, // 8% ao ano (mais conservador)
      funds: 0.1, // 10% ao ano
    }

    const baseReturn = returnRates[type] || 0.1

    // Criar investimento
    const { data: investment, error: investmentError } = await supabase
      .from("investments")
      .insert({
        user_id: session.user.id,
        name,
        type,
        amount,
        current_value: amount,
        return_rate: baseReturn,
        status: "active",
      })
      .select()
      .single()

    if (investmentError) {
      return NextResponse.json({ error: investmentError.message }, { status: 400 })
    }

    // Debitar do saldo e atualizar total investido
    const { error: updateError } = await supabase
      .from("users")
      .update({
        balance: user.balance - amount,
        total_invested: user.total_invested + amount,
      })
      .eq("id", session.user.id)

    if (updateError) {
      console.error("Erro ao atualizar saldo:", updateError)
    }

    // Registrar atividade
    await supabase.from("activities").insert({
      user_id: session.user.id,
      type: "investment_made",
      description: `Investiu R$ ${amount.toLocaleString()} em ${name}`,
      metadata: {
        investmentId: investment.id,
        amount,
        type,
        name,
      },
    })

    return NextResponse.json(investment)
  } catch (error) {
    console.error("Erro ao criar investimento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
