#!/bin/bash
# Script de implantação para Julius Invest

echo "🚀 Iniciando processo de implantação do Julius Invest..."

# 1. Instalar dependências
echo "📦 Instalando dependências..."
npm install

# 2. Testar localmente
echo "🧪 Construindo e testando localmente..."
npm run build
npm run dev

# 3. Inicializar Git
echo "🔄 Inicializando repositório Git..."
git init
git add .
git commit -m "feat: Julius Invest completo com Supabase"

# 4. Conectar ao GitHub
echo "🔗 Conectando ao GitHub..."
echo "⚠️ Lembre-se de criar o repositório no GitHub primeiro!"
echo "⚠️ Execute manualmente:"
echo "git remote add origin https://github.com/seu-usuario/julius-invest-complete.git"
echo "git push -u origin main"

# 5. Deploy no Vercel
echo "🌐 Para deploy no Vercel:"
echo "1. Acesse vercel.com"
echo "2. Clique em 'Import Git Repository'"
echo "3. Conecte ao repositório GitHub"
echo "4. Configure as variáveis de ambiente"

echo "✅ Script concluído! Siga as instruções acima para finalizar o deploy."
