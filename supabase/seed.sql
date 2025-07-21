-- Seed data para Julius Invest Sandbox

-- 1. CONQUISTAS PADRÃO
INSERT INTO achievements (id, name, description, icon, category, rarity, criteria, xp_reward, token_reward) VALUES
('first_mission', 'Primeira Missão', 'Complete sua primeira missão', '🎯', 'missions', 'common', '{"missions_completed": 1}', 50, 25),
('week_streak', 'Semana Completa', 'Complete missões por 7 dias seguidos', '🔥', 'streaks', 'rare', '{"daily_streak": 7}', 200, 100),
('month_streak', 'Mês Dedicado', 'Complete missões por 30 dias seguidos', '🏆', 'streaks', 'epic', '{"daily_streak": 30}', 500, 250),
('first_investment', 'Primeiro Investimento', 'Faça seu primeiro investimento', '💰', 'investments', 'common', '{"investments_made": 1}', 100, 50),
('investment_master', 'Mestre dos Investimentos', 'Tenha 10 investimentos ativos', '📈', 'investments', 'rare', '{"active_investments": 10}', 300, 150),
('level_5', 'Nível 5', 'Alcance o nível 5', '⭐', 'levels', 'common', '{"level": 5}', 150, 75),
('level_10', 'Nível 10', 'Alcance o nível 10', '🌟', 'levels', 'rare', '{"level": 10}', 300, 150),
('level_25', 'Nível 25', 'Alcance o nível 25', '💫', 'levels', 'epic', '{"level": 25}', 750, 375),
('level_50', 'Nível 50', 'Alcance o nível 50', '🚀', 'levels', 'legendary', '{"level": 50}', 1500, 750),
('token_collector', 'Colecionador de Tokens', 'Acumule 10.000 tokens', '🪙', 'tokens', 'rare', '{"tokens": 10000}', 200, 100),
('token_millionaire', 'Milionário de Tokens', 'Acumule 100.000 tokens', '💎', 'tokens', 'legendary', '{"tokens": 100000}', 1000, 500),
('balance_keeper', 'Guardião do Saldo', 'Mantenha R$ 500.000 de saldo', '🏦', 'balance', 'epic', '{"balance": 500000}', 400, 200),
('early_bird', 'Madrugador', 'Complete check-in antes das 8h', '🌅', 'habits', 'common', '{"early_checkin": 1}', 75, 35),
('night_owl', 'Coruja Noturna', 'Complete check-out depois das 22h', '🌙', 'habits', 'common', '{"late_checkout": 1}', 75, 35),
('perfect_week', 'Semana Perfeita', 'Complete todas as missões por 7 dias', '✨', 'perfection', 'epic', '{"perfect_days": 7}', 600, 300);

-- 2. MISSÕES DIÁRIAS PADRÃO
INSERT INTO missions (id, title, description, category, type, xp_reward, token_reward) VALUES
('daily_checkin', 'Check-in Matinal', 'Bom dia, campeão! 🌅', 'daily', 'checkin', 10, 5),
('daily_expense_review', 'Revisar Gastos de Ontem', 'Consciência é poder! 💡', 'daily', 'expense_review', 15, 8),
('daily_budget_planning', 'Definir Orçamento do Dia', 'Planeje para vencer! 📊', 'daily', 'budget_planning', 20, 10),
('daily_education', 'Lição Financeira', '5 min que valem ouro! 📚', 'daily', 'education', 25, 12),
('daily_savings', 'Registrar Economia do Dia', 'Cada centavo conta! 💰', 'daily', 'savings', 30, 15),
('daily_analysis', 'Análise Semanal', 'Reflexão e evolução! 🔍', 'daily', 'analysis', 50, 25),
('daily_checkout', 'Check-out Noturno', 'Finalize o dia com chave de ouro! 🌙', 'daily', 'checkout', 15, 8);

-- 3. MISSÕES SEMANAIS
INSERT INTO missions (id, title, description, category, type, xp_reward, token_reward) VALUES
('weekly_investment_review', 'Revisar Investimentos', 'Analise sua carteira semanal', 'weekly', 'investment', 100, 50),
('weekly_goal_setting', 'Definir Metas da Semana', 'Planejamento é tudo!', 'weekly', 'planning', 75, 40),
('weekly_education_deep', 'Estudo Aprofundado', '30 min de educação financeira', 'weekly', 'education', 150, 75);

-- 4. MISSÕES MENSAIS
INSERT INTO missions (id, title, description, category, type, xp_reward, token_reward) VALUES
('monthly_portfolio_review', 'Revisão Mensal da Carteira', 'Análise completa dos investimentos', 'monthly', 'investment', 500, 250),
('monthly_goal_review', 'Revisão de Metas Mensais', 'Como foi seu progresso?', 'monthly', 'planning', 300, 150),
('monthly_education_course', 'Curso Mensal Completo', 'Complete um curso de finanças', 'monthly', 'education', 750, 375);

-- 5. USUÁRIO DEMO (opcional - para testes)
INSERT INTO users (id, email, username, name, xp, level, tokens, balance, current_streak) VALUES
('demo-user-id', 'demo@juliusinvest.com', 'demo_user', 'Usuário Demo', 2500, 3, 5000, 150000, 5);

-- 6. ALGUMAS ATIVIDADES DEMO
INSERT INTO activities (user_id, type, description, metadata) VALUES
('demo-user-id', 'mission_completed', 'Completou: Check-in Matinal', '{"missionId": "daily_checkin", "xpGained": 10, "tokensGained": 5}'),
('demo-user-id', 'level_up', 'Subiu para o nível 2!', '{"newLevel": 2, "bonusTokens": 200}'),
('demo-user-id', 'achievement_unlocked', 'Desbloqueou: Primeira Missão', '{"achievementId": "first_mission", "xpGained": 50, "tokensGained": 25}');

-- 7. INVESTIMENTOS DEMO
INSERT INTO investments (user_id, name, type, amount, current_value, return_rate, status) VALUES
('demo-user-id', 'Tesouro Direto 2030', 'stocks', 10000, 10500, 0.12, 'active'),
('demo-user-id', 'FII Shopping Centers', 'real_estate', 5000, 5200, 0.10, 'active'),
('demo-user-id', 'Bitcoin Simulado', 'crypto', 2000, 2300, 0.25, 'active');

-- 8. CONQUISTAS DEMO DESBLOQUEADAS
INSERT INTO user_achievements (user_id, achievement_id) VALUES
('demo-user-id', 'first_mission'),
('demo-user-id', 'first_investment'),
('demo-user-id', 'level_5');

-- 9. RANKINGS DEMO
INSERT INTO rankings (user_id, category, position, score, period) VALUES
('demo-user-id', 'global', 1, 2500, '2024-01'),
('demo-user-id', 'weekly', 1, 500, '2024-W03'),
('demo-user-id', 'tokens', 1, 5000, '2024-01');

COMMIT;
