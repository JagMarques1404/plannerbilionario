-- Atualizar estatísticas dos usuários baseado nas missões completadas
UPDATE users 
SET 
    xp = (
        SELECT COALESCE(SUM(xp_reward), 0) 
        FROM user_missions 
        WHERE user_id = users.id 
        AND completed_at IS NOT NULL
    ),
    tokens = 1000 + (
        SELECT COALESCE(SUM(token_reward), 0) 
        FROM user_missions 
        WHERE user_id = users.id 
        AND completed_at IS NOT NULL
    ),
    level = GREATEST(1, (
        SELECT COALESCE(SUM(xp_reward), 0) 
        FROM user_missions 
        WHERE user_id = users.id 
        AND completed_at IS NOT NULL
    ) / 1000 + 1),
    current_streak = CASE 
        WHEN EXISTS (
            SELECT 1 FROM user_missions 
            WHERE user_id = users.id 
            AND mission_date = CURRENT_DATE 
            AND completed_at IS NOT NULL
        ) THEN current_streak + 1
        ELSE current_streak
    END,
    updated_at = NOW()
WHERE EXISTS (
    SELECT 1 FROM user_missions 
    WHERE user_id = users.id
);
