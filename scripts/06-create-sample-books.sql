-- Insert sample books read
INSERT INTO books_read (
  id,
  user_id,
  book_title,
  author,
  points_earned,
  read_at
) VALUES 
-- Books for Alex Johnson
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'The Total Money Makeover',
  'Dave Ramsey',
  150,
  NOW() - INTERVAL '5 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440000',
  'Rich Dad Poor Dad',
  'Robert Kiyosaki',
  120,
  NOW() - INTERVAL '12 days'
),
-- Books for Maria Silva
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'A Random Walk Down Wall Street',
  'Burton Malkiel',
  180,
  NOW() - INTERVAL '3 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'The Intelligent Investor',
  'Benjamin Graham',
  200,
  NOW() - INTERVAL '15 days'
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001',
  'Your Money or Your Life',
  'Vicki Robin',
  140,
  NOW() - INTERVAL '25 days'
),
-- Books for David Chen
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440002',
  'The Automatic Millionaire',
  'David Bach',
  100,
  NOW() - INTERVAL '8 days'
);
