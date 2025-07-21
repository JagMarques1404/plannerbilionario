-- Insert sample user badges
INSERT INTO user_badges (
  id,
  user_id,
  badge_name,
  badge_emoji,
  earned_at
) VALUES 
-- Badges for Alex Johnson
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'First Goal Setter',
  '🎯',
  NOW() - INTERVAL '20 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'Week Warrior',
  '🔥',
  NOW() - INTERVAL '7 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'Budget Master',
  '💰',
  NOW() - INTERVAL '5 days'
),
-- Badges for Maria Silva
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'Investment Pro',
  '📈',
  NOW() - INTERVAL '30 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'Streak Champion',
  '⚡',
  NOW() - INTERVAL '12 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'Knowledge Seeker',
  '📚',
  NOW() - INTERVAL '8 days'
),
-- Badges for David Chen
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440002',
  'Getting Started',
  '🌱',
  NOW() - INTERVAL '15 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440002',
  'Debt Fighter',
  '⚔️',
  NOW() - INTERVAL '10 days'
);
