-- ============================================================================
-- JULIUS INVEST - SCHEMA PRINCIPAL (VERSÃO SIMPLIFICADA)
-- Criar todas as tabelas com apenas as colunas essenciais
-- ============================================================================

-- Limpar tabelas existentes (se necessário)
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS user_missions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Criar tabela de usuários
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  tokens DECIMAL DEFAULT 1000,
  balance DECIMAL DEFAULT 100000,
  current_streak INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de missões dos usuários (apenas campos essenciais)
CREATE TABLE user_missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mission_type TEXT NOT NULL,
  completed_at TIMESTAMP,
  mission_date DATE DEFAULT CURRENT_DATE,
  xp_reward INTEGER DEFAULT 0,
  token_reward DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, mission_type, mission_date)
);

-- Criar tabela de conquistas dos usuários
CREATE TABLE user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_type)
);

-- ============================================================================
-- FUNÇÕES RPC PARA OTIMIZAÇÃO
-- ============================================================================

-- Função para atualizar recompensas do usuário
CREATE OR REPLACE FUNCTION update_user_rewards(
  p_user_id UUID,
  p_xp_to_add INTEGER,
  p_tokens_to_add DECIMAL
)
RETURNS VOID AS $$
BEGIN
  UPDATE users 
  SET 
    xp = xp + p_xp_to_add,
    tokens = tokens + p_tokens_to_add,
    level = GREATEST(1, (xp + p_xp_to_add) / 1000 + 1),
    updated_at = NOW()
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Função para completar missão
CREATE OR REPLACE FUNCTION complete_mission(
  p_user_id UUID,
  p_mission_type TEXT,
  p_mission_date DATE DEFAULT CURRENT_DATE
)
RETURNS JSON AS $$
DECLARE
  mission_record RECORD;
  result JSON;
BEGIN
  -- Buscar a missão
  SELECT * INTO mission_record
  FROM user_missions 
  WHERE user_id = p_user_id 
    AND mission_type = p_mission_type 
    AND mission_date = p_mission_date
    AND completed_at IS NULL;
  
  IF NOT FOUND THEN
    RETURN '{"success": false, "error": "Mission not found or already completed"}';
  END IF;
  
  -- Completar a missão
  UPDATE user_missions 
  SET completed_at = NOW()
  WHERE id = mission_record.id;
  
  -- Atualizar recompensas do usuário
  PERFORM update_user_rewards(p_user_id, mission_record.xp_reward, mission_record.token_reward);
  
  -- Retornar resultado
  SELECT json_build_object(
    'success', true,
    'mission_id', mission_record.id,
    'xp_earned', mission_record.xp_reward,
    'tokens_earned', mission_record.token_reward
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_xp ON users(xp DESC);
CREATE INDEX idx_users_level ON users(level DESC);

CREATE INDEX idx_user_missions_user_date ON user_missions(user_id, mission_date);
CREATE INDEX idx_user_missions_type_date ON user_missions(mission_type, mission_date);
CREATE INDEX idx_user_missions_completed ON user_missions(completed_at) WHERE completed_at IS NOT NULL;

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_type ON user_achievements(achievement_type);

-- ============================================================================
-- TRIGGERS PARA ATUALIZAÇÕES AUTOMÁTICAS
-- ============================================================================

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- CONFIGURAÇÕES DE SEGURANÇA (RLS) - SIMPLIFICADAS PARA SANDBOX
-- ============================================================================

-- Habilitar Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Políticas permissivas para sandbox (em produção seria mais restritivo)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on user_missions" ON user_missions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on user_achievements" ON user_achievements FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- FINALIZAÇÃO
-- ============================================================================

-- Verificar se as tabelas foram criadas
DO $$
BEGIN
    RAISE NOTICE '✅ Schema simplificado criado com sucesso!';
    RAISE NOTICE '📊 Tabelas: users, user_missions, user_achievements';
    RAISE NOTICE '⚡ Funções: update_user_rewards, complete_mission';
    RAISE NOTICE '🔒 RLS habilitado com políticas permissivas para sandbox';
    RAISE NOTICE '🎮 Pronto para uso em modo demonstração!';
END $$;
