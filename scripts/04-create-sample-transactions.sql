-- Insert sample transactions
INSERT INTO transactions (
  id,
  user_id,
  type,
  category,
  amount,
  description,
  date,
  created_at
) VALUES 
-- Transactions for Alex Johnson
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'income',
  'salary',
  4500.00,
  'Monthly salary deposit',
  CURRENT_DATE - INTERVAL '1 day',
  NOW()
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'expense',
  'groceries',
  -125.50,
  'Weekly grocery shopping',
  CURRENT_DATE - INTERVAL '2 days',
  NOW()
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'expense',
  'utilities',
  -89.99,
  'Electricity bill',
  CURRENT_DATE - INTERVAL '3 days',
  NOW()
),
-- Transactions for Maria Silva
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'income',
  'salary',
  6200.00,
  'Monthly salary deposit',
  CURRENT_DATE - INTERVAL '1 day',
  NOW()
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'investment',
  'stocks',
  -1000.00,
  'Monthly investment contribution',
  CURRENT_DATE - INTERVAL '2 days',
  NOW()
),
-- Transactions for David Chen
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440002',
  'income',
  'salary',
  2800.00,
  'Monthly salary deposit',
  CURRENT_DATE - INTERVAL '1 day',
  NOW()
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440002',
  'expense',
  'debt_payment',
  -300.00,
  'Credit card payment',
  CURRENT_DATE - INTERVAL '1 day',
  NOW()
);
