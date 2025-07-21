-- Criar tabelas do Julius Invest Sandbox

-- 1. USUÁRIOS
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Gamificação
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  tokens DECIMAL(10,2) DEFAULT 1000.00,
  
  -- Financeiro Fictício
  balance DECIMAL(12,2) DEFAULT 100000.00,
  total_invested DECIMAL(12,2) DEFAULT 0.00,
  total_returns DECIMAL(12,2) DEFAULT 0.00,
  current_streak INTEGER DEFAULT 0
);

-- 2. MISSÕES (Templates)
CREATE TABLE missions (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- daily, weekly, monthly
  type VARCHAR(50) NOT NULL, -- checkin, expense, investment, education
  xp_reward INTEGER NOT NULL,
  token_reward DECIMAL(8,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. MISSÕES DOS USUÁRIOS
CREATE TABLE user_missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mission_id VARCHAR(100) REFERENCES missions(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  progress DECIMAL(5,2) DEFAULT 0.00, -- 0-100%
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, mission_id, date)
);

-- 4. INVESTIMENTOS
CREATE TABLE investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- real_estate, stocks, crypto, nft
  amount DECIMAL(12,2) NOT NULL,
  current_value DECIMAL(12,2) NOT NULL,
  return_rate DECIMAL(5,4) NOT NULL, -- 0.1234 = 12.34%
  status VARCHAR(20) DEFAULT 'active', -- active, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CONQUISTAS (Templates)
CREATE TABLE achievements (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(10) NOT NULL,
  category VARCHAR(50) NOT NULL,
  rarity VARCHAR(20) NOT NULL, -- common, rare, epic, legendary
  criteria JSONB NOT NULL,
  xp_reward INTEGER NOT NULL,
  token_reward DECIMAL(8,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CONQUISTAS DOS USUÁRIOS
CREATE TABLE user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id VARCHAR(100) REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, achievement_id)
);

-- 7. ATIVIDADES (Histórico)
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- mission_completed, investment_made, level_up, achievement_unlocked
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. RANKINGS
CREATE TABLE rankings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL, -- global, weekly, monthly, investments
  position INTEGER NOT NULL,
  score DECIMAL(12,2) NOT NULL,
  period VARCHAR(20) NOT NULL, -- 2024-01, 2024-W01, etc
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, category, period)
);

-- ÍNDICES para performance
CREATE INDEX idx_user_missions_user_date ON user_missions(user_id, date);
CREATE INDEX idx_user_missions_completed ON user_missions(user_id, completed_at) WHERE completed_at IS NOT NULL;
CREATE INDEX idx_investments_user_status ON investments(user_id, status);
CREATE INDEX idx_activities_user_created ON activities(user_id, created_at DESC);
CREATE INDEX idx_rankings_category_score ON rankings(category, score DESC);

-- TRIGGERS para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investments_updated_at BEFORE UPDATE ON investments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Básico
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (usuários só veem seus próprios dados)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can view own missions" ON user_missions FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own investments" ON investments FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own achievements" ON user_achievements FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own activities" ON activities FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own rankings" ON rankings FOR ALL USING (auth.uid()::text = user_id::text);

-- Tabelas públicas (todos podem ler)
CREATE POLICY "Anyone can view missions" ON missions FOR SELECT USING (true);
CREATE POLICY "Anyone can view achievements" ON achievements FOR SELECT USING (true);
