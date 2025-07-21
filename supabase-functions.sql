-- Função para atualizar recompensas do usuário
CREATE OR REPLACE FUNCTION update_user_rewards(
  user_id UUID,
  xp_to_add INTEGER,
  tokens_to_add DECIMAL
) RETURNS VOID AS $$
BEGIN
  UPDATE users 
  SET 
    xp = xp + xp_to_add,
    tokens = tokens + tokens_to_add,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Função para adicionar tokens
CREATE OR REPLACE FUNCTION add_tokens(
  user_id UUID,
  tokens_to_add DECIMAL
) RETURNS VOID AS $$
BEGIN
  UPDATE users 
  SET 
    tokens = tokens + tokens_to_add,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Função para calcular level baseado no XP
CREATE OR REPLACE FUNCTION calculate_level(xp_amount INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN FLOOR(xp_amount / 1000) + 1;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar level automaticamente
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.level = calculate_level(NEW.xp);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger se não existir
DROP TRIGGER IF EXISTS trigger_update_user_level ON users;
CREATE TRIGGER trigger_update_user_level
  BEFORE UPDATE ON users
  FOR EACH ROW
  WHEN (OLD.xp IS DISTINCT FROM NEW.xp)
  EXECUTE FUNCTION update_user_level();

-- Função para criar missões diárias automaticamente
CREATE OR REPLACE FUNCTION create_daily_missions(user_id UUID, mission_date DATE)
RETURNS VOID AS $$
DECLARE
  mission_types TEXT[] := ARRAY['checkin', 'expense_review', 'budget_planning', 'education', 'savings', 'analysis', 'checkout'];
  mission_type TEXT;
BEGIN
  FOREACH mission_type IN ARRAY mission_types
  LOOP
    INSERT INTO user_missions (user_id, mission_type, mission_date, xp_reward, token_reward, completed_at)
    VALUES (
      user_id, 
      mission_type, 
      mission_date,
      CASE mission_type
        WHEN 'checkin' THEN 10
        WHEN 'expense_review' THEN 15
        WHEN 'budget_planning' THEN 20
        WHEN 'education' THEN 25
        WHEN 'savings' THEN 30
        WHEN 'analysis' THEN 50
        WHEN 'checkout' THEN 15
        ELSE 10
      END,
      CASE mission_type
        WHEN 'checkin' THEN 5
        WHEN 'expense_review' THEN 8
        WHEN 'budget_planning' THEN 10
        WHEN 'education' THEN 12
        WHEN 'savings' THEN 15
        WHEN 'analysis' THEN 25
        WHEN 'checkout' THEN 8
        ELSE 5
      END,
      NULL
    )
    ON CONFLICT (user_id, mission_type, mission_date) DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
