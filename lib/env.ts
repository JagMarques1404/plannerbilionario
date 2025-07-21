// Environment variables with validation
export const env = {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

  // App
  NODE_ENV: process.env.NODE_ENV || "development",
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || "http://localhost:3000",

  // Features
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === "true",
  ENABLE_SENTRY: process.env.ENABLE_SENTRY === "true",
} as const

// Validate required environment variables
function validateEnv() {
  const required = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
  }
}

// Only validate in Node.js environment (not in browser)
if (typeof window === "undefined") {
  validateEnv()
}
