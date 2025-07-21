-- ============================================================================
-- JULIUS INVEST - CONQUISTAS DE EXEMPLO
-- Criar conquistas para demonstrar o sistema de gamificação
-- ============================================================================

-- Inserir conquistas baseadas no progresso atual dos usuários
DO $$
DECLARE
    user_record RECORD;
    achievement_count INTEGER := 0;
BEGIN
    RAISE NOTICE '🏆 Criando conquistas para usuários...';
    
    -- Para cada usuário, criar conquistas baseadas em seu progresso
    FOR user_record IN 
        SELECT 
            u.id, 
            u.name, 
            u.email, 
            u.xp, 
            u.level, 
            u.current_streak,
            COUNT(um.id) as total_missions,
            COUNT(CASE WHEN um.completed_at IS NOT NULL THEN 1 END) as completed_missions
        FROM users u
        LEFT JOIN user_missions um ON u.id = um.user_id
        GROUP BY u.id, u.name, u.email, u.xp, u.level, u.current_streak
    LOOP
        RAISE NOTICE '👤 Processando conquistas para: % (%)', user_record.name, user_record.email;
        
        -- CONQUISTA: Primeira Missão (todos que completaram pelo menos 1 missão)
        IF user_record.completed_missions > 0 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'first_mission',
                NOW() - INTERVAL '1 day' - (random() * INTERVAL '10 days')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
        -- CONQUISTA: Primeiros Passos (XP > 100)
        IF user_record.xp > 100 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'first_steps',
                NOW() - INTERVAL '12 hours' - (random() * INTERVAL '5 days')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
        -- CONQUISTA: Streak de 3 dias
        IF user_record.current_streak >= 3 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'streak_3_days',
                NOW() - INTERVAL '6 hours' - (random() * INTERVAL '3 days')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
        -- CONQUISTA: Streak de 7 dias
        IF user_record.current_streak >= 7 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'streak_7_days',
                NOW() - INTERVAL '3 hours' - (random() * INTERVAL '2 days')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
        -- CONQUISTA: Streak de 14 dias
        IF user_record.current_streak >= 14 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'streak_14_days',
                NOW() - INTERVAL '1 hour' - (random() * INTERVAL '1 day')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
        -- CONQUISTA: Level Up (Level > 1)
        IF user_record.level > 1 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'level_up',
                NOW() - INTERVAL '8 hours' - (random() * INTERVAL '4 days')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
        -- CONQUISTA: Veterano (Level >= 3)
        IF user_record.level >= 3 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'veteran',
                NOW() - INTERVAL '4 hours' - (random() * INTERVAL '2 days')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
        -- CONQUISTA: Expert (Level >= 5)
        IF user_record.level >= 5 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'expert',
                NOW() - INTERVAL '2 hours' - (random() * INTERVAL '1 day')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
        -- CONQUISTA: Mestre (Level >= 7)
        IF user_record.level >= 7 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'master',
                NOW() - INTERVAL '1 hour' - (random() * INTERVAL '12 hours')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
        -- CONQUISTA: Completador (10+ missões completadas)
        IF user_record.completed_missions >= 10 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'completionist',
                NOW() - INTERVAL '5 hours' - (random() * INTERVAL '3 days')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
        -- CONQUISTA: Dedicado (20+ missões completadas)
        IF user_record.completed_missions >= 20 THEN
            INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) 
            VALUES (
                user_record.id,
                'dedicated',
                NOW() - INTERVAL '3 hours' - (random() * INTERVAL '2 days')
            ) ON CONFLICT (user_id, achievement_type) DO NOTHING;
            achievement_count := achievement_count + 1;
        END IF;
        
    END LOOP;
END $$;

-- ============================================================================
-- CONQUISTAS ESPECIAIS PARA USUÁRIOS ESPECÍFICOS
-- ============================================================================

-- Conquistas especiais para usuários de exemplo
INSERT INTO user_achievements (user_id, achievement_type, unlocked_at) VALUES
-- Alex Johnson - Conquistas intermediárias
('550e8400-e29b-41d4-a716-446655440000', 'early_adopter', NOW() - INTERVAL '25 days'),
('550e8400-e29b-41d4-a716-446655440000', 'consistent_player', NOW() - INTERVAL '10 days'),

-- Maria Silva - Conquistas avançadas
('550e8400-e29b-41d4-a716-446655440001', 'early_adopter', NOW() - INTERVAL '40 days'),
('550e8400-e29b-41d4-a716-446655440001', 'consistent_player', NOW() - INTERVAL '20 days'),
('550e8400-e29b-41d4-a716-446655440001', 'high_achiever', NOW() - INTERVAL '15 days'),
('550e8400-e29b-41d4-a716-446655440001', 'streak_champion', NOW() - INTERVAL '5 days'),

-- David Chen - Conquistas iniciantes
('550e8400-e29b-41d4-a716-446655440002', 'newcomer', NOW() - INTERVAL '10 days'),

-- Ana Costa - Conquistas de mestre
('550e8400-e29b-41d4-a716-446655440003', 'early_adopter', NOW() - INTERVAL '55 days'),
('550e8400-e29b-41d4-a716-446655440003', 'consistent_player', NOW() - INTERVAL '30 days'),
('550e8400-e29b-41d4-a716-446655440003', 'high_achiever', NOW() - INTERVAL '25 days'),
('550e8400-e29b-41d4-a716-446655440003', 'streak_champion', NOW() - INTERVAL '10 days'),
('550e8400-e29b-41d4-a716-446655440003', 'legend', NOW() - INTERVAL '3 days'),

-- Carlos Santos - Conquistas médias
('550e8400-e29b-41d4-a716-446655440004', 'early_adopter', NOW() - INTERVAL '15 days'),
('550e8400-e29b-41d4-a716-446655440004', 'consistent_player', NOW() - INTERVAL '8 days')

ON CONFLICT (user_id, achievement_type) DO NOTHING;

-- ============================================================================
-- RELATÓRIO DE CONQUISTAS CRIADAS
-- ============================================================================

DO $$
DECLARE
    total_achievements INTEGER;
    unique_achievement_types INTEGER;
    user_achievement_stats RECORD;
BEGIN
    SELECT COUNT(*) INTO total_achievements FROM user_achievements;
    SELECT COUNT(DISTINCT achievement_type) INTO unique_achievement_types FROM user_achievements;
    
    RAISE NOTICE '✅ Conquistas criadas com sucesso!';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '🏆 ESTATÍSTICAS DE CONQUISTAS:';
    RAISE NOTICE '   • Total de conquistas desbloqueadas: %', total_achievements;
    RAISE NOTICE '   • Tipos únicos de conquistas: %', unique_achievement_types;
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    
    RAISE NOTICE '👥 CONQUISTAS POR USUÁRIO:';
    FOR user_achievement_stats IN 
        SELECT 
            u.name,
            u.email,
            u.level,
            u.xp,
            COUNT(ua.id) as achievement_count,
            string_agg(ua.achievement_type, ', ' ORDER BY ua.unlocked_at DESC) as recent_achievements
        FROM users u
        LEFT JOIN user_achievements ua ON u.id = ua.user_id
        GROUP BY u.id, u.name, u.email, u.level, u.xp
        ORDER BY achievement_count DESC, u.xp DESC
    LOOP
        RAISE NOTICE '   • % (%) - Level % | % XP | % conquistas', 
            user_achievement_stats.name,
            user_achievement_stats.email,
            user_achievement_stats.level,
            user_achievement_stats.xp,
            user_achievement_stats.achievement_count;
        
        IF user_achievement_stats.recent_achievements IS NOT NULL THEN
            RAISE NOTICE '     Conquistas: %', 
                CASE 
                    WHEN length(user_achievement_stats.recent_achievements) > 100 
                    THEN substring(user_achievement_stats.recent_achievements, 1, 100) || '...'
                    ELSE user_achievement_stats.recent_achievements
                END;
        END IF;
    END LOOP;
    
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    
    RAISE NOTICE '🎯 TIPOS DE CONQUISTAS DISPONÍVEIS:';
    FOR user_achievement_stats IN 
        SELECT 
            achievement_type,
            COUNT(*) as unlock_count,
            MIN(unlocked_at) as first_unlock,
            MAX(unlocked_at) as last_unlock
        FROM user_achievements
        GROUP BY achievement_type
        ORDER BY unlock_count DESC
    LOOP
        RAISE NOTICE '   • %: % usuários desbloquearam', 
            user_achievement_stats.achievement_type,
            user_achievement_stats.unlock_count;
    END LOOP;
    
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '🎮 Sistema de conquistas ativo e funcionando!';
END $$;
