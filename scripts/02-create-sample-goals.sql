-- Insert sample goals
INSERT INTO goals (
  id,
  user_id,
  title,
  description,
  type,
  target_value,
  current_value,
  points,
  status,
  deadline,
  created_at
) VALUES 
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'Emergency Fund',
  'Build a 6-month emergency fund to cover unexpected expenses',
  'savings',
  10000,
  6500,
  500,
  'active',
  '2024-12-31',
  NOW() - INTERVAL '20 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'Reduce Monthly Expenses',
  'Cut monthly spending by 20% through better budgeting',
  'budgeting',
  500,
  320,
  300,
  'active',
  '2024-06-30',
  NOW() - INTERVAL '15 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'Investment Portfolio',
  'Build a diversified investment portfolio worth $50,000',
  'investment',
  50000,
  32000,
  800,
  'active',
  '2025-12-31',
  NOW() - INTERVAL '60 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440002',
  'Pay Off Credit Card',
  'Eliminate $5,000 in credit card debt',
  'debt',
  5000,
  2800,
  400,
  'active',
  '2024-08-31',
  NOW() - INTERVAL '10 days'
);
