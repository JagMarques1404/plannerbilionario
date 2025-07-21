/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // PALETA OBRIGATÓRIA JULIUS INVEST
        yellow: {
          50: "#FFFDF5", // Fundo muito sutil
          100: "#FFF9E1", // Fundo principal suave ✅
          200: "#FFF7C7", // Fundo alternativo
          400: "#FFD23F", // APENAS detalhes/badges ✅
        },
        orange: {
          400: "#FF6B35", // Botões principais ✅
          500: "#FF5722", // Hover states ✅
        },
        blue: {
          600: "#2563EB", // Links e ações secundárias ✅
          900: "#004E89", // Textos importantes ✅
        },
        gray: {
          50: "#FAFAFA", // Fundo alternativo
          100: "#F6F6F6", // Sidebar ✅
          200: "#E5E7EB", // Bordas ✅
          600: "#4B5563", // Textos secundários ✅
          700: "#333333", // Textos principais ✅
          800: "#1F2937", // Textos escuros ✅
        },
        white: "#FFFFFF", // Cards e gráficos ✅
        black: "#222222", // Textos principais ✅

        // Cores do sistema shadcn/ui
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "gentle-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "gentle-bounce": "gentle-bounce 2s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      fontSize: {
        // TAMANHOS MÍNIMOS OBRIGATÓRIOS
        base: ["16px", "1.5"], // Corpo mínimo ✅
        lg: ["18px", "1.6"], // Corpo grande ✅
        xl: ["20px", "1.7"], // H3 mínimo ✅
        "2xl": ["24px", "1.8"], // H2 e valores ✅
        "3xl": ["30px", "1.9"], // H1 mínimo ✅
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
