-- ============================================================================
-- JULIUS INVEST - MISSÕES DE EXEMPLO (VERSÃO SIMPLIFICADA)
-- Criar missões diárias usando apenas campos que existem
-- ============================================================================

-- Definir missões padrão do sistema
DO $$
DECLARE
    user_record RECORD;
    today DATE := CURRENT_DATE;
    yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
    mission_types TEXT[] := ARRAY[
        'checkin',
        'expense_review', 
        'budget_planning',
        'education',
        'savings',
        'analysis',
        'checkout'
    ];
    mission_type TEXT;
BEGIN
    RAISE NOTICE '🎯 Criando missões simplificadas para todos os usuários...';
    
    -- Para cada usuário existente
    FOR user_record IN SELECT id, name, email FROM users LOOP
        RAISE NOTICE '👤 Criando missões para: % (%)', user_record.name, user_record.email;
        
        -- Criar missões para hoje
        FOREACH mission_type IN ARRAY mission_types LOOP
            INSERT INTO user_missions (
                user_id, 
                mission_type, 
                mission_date, 
                xp_reward, 
                token_reward,
                completed_at
            ) VALUES (
                user_record.id,
                mission_type,
                today,
                CASE mission_type
                    WHEN 'checkin' THEN 10
                    WHEN 'expense_review' THEN 15
                    WHEN 'budget_planning' THEN 20
                    WHEN 'education' THEN 25
                    WHEN 'savings' THEN 30
                    WHEN 'analysis' THEN 50
                    WHEN 'checkout' THEN 15
                    ELSE 20
                END,
                CASE mission_type
                    WHEN 'checkin' THEN 5
                    WHEN 'expense_review' THEN 8
                    WHEN 'budget_planning' THEN 10
                    WHEN 'education' THEN 12
                    WHEN 'savings' THEN 15
                    WHEN 'analysis' THEN 25
                    WHEN 'checkout' THEN 8
                    ELSE 10
                END,
                NULL
            ) ON CONFLICT (user_id, mission_type, mission_date) DO NOTHING;
        END LOOP;
        
        -- Criar missões para ontem (algumas já completadas)
        FOREACH mission_type IN ARRAY mission_types LOOP
            INSERT INTO user_missions (
                user_id, 
                mission_type, 
                mission_date, 
                xp_reward, 
                token_reward,
                completed_at
            ) VALUES (
                user_record.id,
                mission_type,
                yesterday,
                CASE mission_type
                    WHEN 'checkin' THEN 10
                    WHEN 'expense_review' THEN 15
                    WHEN 'budget_planning' THEN 20
                    WHEN 'education' THEN 25
                    WHEN 'savings' THEN 30
                    WHEN 'analysis' THEN 50
                    WHEN 'checkout' THEN 15
                    ELSE 20
                END,
                CASE mission_type
                    WHEN 'checkin' THEN 5
                    WHEN 'expense_review' THEN 8
                    WHEN 'budget_planning' THEN 10
                    WHEN 'education' THEN 12
                    WHEN 'savings' THEN 15
                    WHEN 'analysis' THEN 25
                    WHEN 'checkout' THEN 8
                    ELSE 10
                END,
                CASE 
                    WHEN random() > 0.3 THEN yesterday + INTERVAL '8 hours' + (random() * INTERVAL '10 hours')
                    ELSE NULL 
                END
            ) ON CONFLICT (user_id, mission_type, mission_date) DO NOTHING;
        END LOOP;
        
        -- Completar algumas missões de hoje aleatoriamente para demonstração
        UPDATE user_missions 
        SET completed_at = today + INTERVAL '6 hours' + (random() * INTERVAL '8 hours')
        WHERE user_id = user_record.id 
        AND mission_date = today 
        AND mission_type IN ('checkin', 'expense_review')
        AND random() > 0.4
        AND completed_at IS NULL;
        
    END LOOP;
END $$;

-- ============================================================================
-- RELATÓRIO DE MISSÕES CRIADAS
-- ============================================================================

DO $$
DECLARE
    total_missions INTEGER;
    completed_missions INTEGER;
    today_missions INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_missions FROM user_missions;
    SELECT COUNT(*) INTO completed_missions FROM user_missions WHERE completed_at IS NOT NULL;
    SELECT COUNT(*) INTO today_missions FROM user_missions WHERE mission_date = CURRENT_DATE;
    
    RAISE NOTICE '✅ Missões simplificadas criadas com sucesso!';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '📊 ESTATÍSTICAS GERAIS:';
    RAISE NOTICE '   • Total de missões: %', total_missions;
    RAISE NOTICE '   • Missões completadas: %', completed_missions;
    RAISE NOTICE '   • Missões para hoje: %', today_missions;
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '🎮 Sistema de missões ativo e funcionando!';
END $$;
