-- ============================================================================
-- JULIUS INVEST - USUÁRIOS DE EXEMPLO
-- Criar usuários de demonstração para testar o sistema
-- ============================================================================

-- Inserir usuários de exemplo
INSERT INTO users (
  id,
  email,
  name,
  xp,
  level,
  tokens,
  balance,
  current_streak,
  created_at,
  updated_at
) VALUES 
-- Usuário 1: Alex Johnson (Usuário Intermediário)
(
  '550e8400-e29b-41d4-a716-446655440000',
  'alex@example.com',
  'Alex Johnson',
  2450,
  3,
  1850,
  125000,
  7,
  NOW() - INTERVAL '30 days',
  NOW()
),
-- Usuário 2: Maria Silva (Usuária Avançada)
(
  '550e8400-e29b-41d4-a716-446655440001',
  'maria@example.com',
  'Maria Silva',
  4850,
  5,
  3200,
  180000,
  12,
  NOW() - INTERVAL '45 days',
  NOW()
),
-- Usuário 3: David Chen (Usuário Iniciante)
(
  '550e8400-e29b-41d4-a716-446655440002',
  'david@example.com',
  'David Chen',
  950,
  1,
  1200,
  95000,
  3,
  NOW() - INTERVAL '15 days',
  NOW()
),
-- Usuário 4: Ana Costa (Usuária Experiente)
(
  '550e8400-e29b-41d4-a716-446655440003',
  'ana@example.com',
  'Ana Costa',
  6750,
  7,
  4500,
  250000,
  15,
  NOW() - INTERVAL '60 days',
  NOW()
),
-- Usuário 5: Carlos Santos (Usuário Médio)
(
  '550e8400-e29b-41d4-a716-446655440004',
  'carlos@example.com',
  'Carlos Santos',
  1800,
  2,
  1600,
  110000,
  5,
  NOW() - INTERVAL '20 days',
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  xp = EXCLUDED.xp,
  level = EXCLUDED.level,
  tokens = EXCLUDED.tokens,
  balance = EXCLUDED.balance,
  current_streak = EXCLUDED.current_streak,
  updated_at = NOW();

-- ============================================================================
-- USUÁRIO SANDBOX PADRÃO
-- ============================================================================

-- Inserir usuário padrão para testes (será criado automaticamente no login)
INSERT INTO users (
  id,
  email,
  name,
  xp,
  level,
  tokens,
  balance,
  current_streak,
  created_at,
  updated_at
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440999',
  'sandbox@planobilionario.com.br',
  'Usuário Sandbox',
  500,
  1,
  1000,
  100000,
  1,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  updated_at = NOW();

-- ============================================================================
-- VERIFICAÇÃO E RELATÓRIO
-- ============================================================================

-- Mostrar usuários criados
DO $$
DECLARE
    user_count INTEGER;
    user_record RECORD;
BEGIN
    SELECT COUNT(*) INTO user_count FROM users;
    
    RAISE NOTICE '✅ Usuários criados com sucesso!';
    RAISE NOTICE '👥 Total de usuários: %', user_count;
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    
    FOR user_record IN 
        SELECT name, email, level, xp, tokens, current_streak 
        FROM users 
        ORDER BY xp DESC
    LOOP
        RAISE NOTICE '👤 % (%) - Level % | % XP | % tokens | % dias streak', 
            user_record.name, 
            user_record.email, 
            user_record.level, 
            user_record.xp, 
            user_record.tokens, 
            user_record.current_streak;
    END LOOP;
    
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '🎮 Usuários prontos para demonstração!';
END $$;
