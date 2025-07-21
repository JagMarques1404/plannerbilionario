-- Insert sample teams
INSERT INTO teams (
  id,
  name,
  type,
  created_by,
  invite_code,
  created_at
) VALUES 
(
  gen_random_uuid(),
  'Financial Freedom Fighters',
  'public',
  '550e8400-e29b-41d4-a716-446655440001',
  'FF2024',
  NOW() - INTERVAL '30 days'
),
(
  gen_random_uuid(),
  'Budget Buddies',
  'private',
  '550e8400-e29b-41d4-a716-446655440000',
  'BB2024',
  NOW() - INTERVAL '20 days'
),
(
  gen_random_uuid(),
  'Investment Club',
  'public',
  '550e8400-e29b-41d4-a716-446655440001',
  'IC2024',
  NOW() - INTERVAL '45 days'
);
