-- Insert sample daily tasks for today
INSERT INTO daily_tasks (
  id,
  user_id,
  task,
  category,
  points,
  completed,
  date,
  created_at
) VALUES 
-- Tasks for Alex Johnson
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'Review daily expenses',
  'budgeting',
  50,
  true,
  CURRENT_DATE,
  NOW()
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'Read financial news for 15 minutes',
  'education',
  30,
  true,
  CURRENT_DATE,
  NOW()
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'Update investment portfolio',
  'investment',
  75,
  false,
  CURRENT_DATE,
  NOW()
),
-- Tasks for Maria Silva
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'Check retirement account balance',
  'retirement',
  40,
  true,
  CURRENT_DATE,
  NOW()
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'Research new investment opportunities',
  'investment',
  60,
  false,
  CURRENT_DATE,
  NOW()
),
-- Tasks for David Chen
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440002',
  'Track daily spending',
  'budgeting',
  25,
  false,
  CURRENT_DATE,
  NOW()
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440002',
  'Make minimum debt payment',
  'debt',
  100,
  true,
  CURRENT_DATE,
  NOW()
);
