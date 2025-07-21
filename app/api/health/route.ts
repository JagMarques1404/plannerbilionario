import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerClient()

    // Test database connection
    const { data, error } = await supabase.from("users").select("count").limit(1)

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Database connection failed",
          error: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      status: "healthy",
      message: "API is running",
      timestamp: new Date().toISOString(),
      database: "connected",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
