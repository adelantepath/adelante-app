-- Transition OS - Seed Data
-- Version 1.0.0

-- ============================================
-- COURSE CATEGORIES
-- ============================================
INSERT INTO course_categories (name, slug, description, icon, color, display_order) VALUES
  ('Life Transitions', 'life-transitions', 'Navigate major life changes with confidence', 'compass', '#10b981', 1),
  ('Financial Literacy', 'financial-literacy', 'Master money management fundamentals', 'wallet', '#3b82f6', 2),
  ('Taxes & Investing', 'taxes-investing', 'Build wealth and understand the tax system', 'trending-up', '#8b5cf6', 3),
  ('Career Skills', 'career-skills', 'Land jobs and advance your career', 'briefcase', '#f59e0b', 4),
  ('Sales', 'sales', 'Learn persuasion and closing techniques', 'megaphone', '#ef4444', 5),
  ('Digital Marketing', 'digital-marketing', 'Master online marketing and personal branding', 'share-2', '#ec4899', 6),
  ('Tech & AI', 'tech-ai', 'Leverage technology and AI tools effectively', 'cpu', '#06b6d4', 7),
  ('Data Analytics', 'data-analytics', 'Make data-driven decisions', 'bar-chart-2', '#84cc16', 8),
  ('Communication', 'communication', 'Express yourself clearly and confidently', 'message-circle', '#f97316', 9),
  ('EQ & Leadership', 'eq-leadership', 'Develop emotional intelligence and lead others', 'users', '#6366f1', 10)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- ACHIEVEMENTS
-- ============================================
INSERT INTO achievements (name, description, icon, category, xp_value, criteria, is_secret) VALUES
  -- Progress achievements
  ('First Steps', 'Complete your first lesson', 'footprints', 'progress', 50, '{"lessons_completed": 1}', false),
  ('Getting Started', 'Complete 5 lessons', 'play-circle', 'progress', 100, '{"lessons_completed": 5}', false),
  ('Dedicated Learner', 'Complete 25 lessons', 'book-open', 'progress', 250, '{"lessons_completed": 25}', false),
  ('Knowledge Seeker', 'Complete 100 lessons', 'graduation-cap', 'progress', 500, '{"lessons_completed": 100}', false),
  ('Course Champion', 'Complete your first course', 'award', 'progress', 200, '{"courses_completed": 1}', false),
  ('Multi-Disciplinary', 'Complete courses in 3 different categories', 'layers', 'progress', 400, '{"categories_completed": 3}', false),
  
  -- Streak achievements
  ('Consistent', 'Maintain a 3-day streak', 'flame', 'streak', 75, '{"streak_days": 3}', false),
  ('Weekly Warrior', 'Maintain a 7-day streak', 'zap', 'streak', 150, '{"streak_days": 7}', false),
  ('Monthly Master', 'Maintain a 30-day streak', 'crown', 'streak', 500, '{"streak_days": 30}', false),
  ('Unstoppable', 'Maintain a 100-day streak', 'rocket', 'streak', 1000, '{"streak_days": 100}', true),
  
  -- Simulation achievements
  ('Simulator', 'Complete your first simulation', 'play', 'simulation', 100, '{"simulations_completed": 1}', false),
  ('Budget Boss', 'Score 90%+ on the budget simulation', 'dollar-sign', 'simulation', 200, '{"budget_score": 90}', false),
  ('Tax Pro', 'Complete the tax filing simulation without errors', 'file-text', 'simulation', 250, '{"tax_perfect": true}', false),
  ('Credit Master', 'Achieve 750+ in the credit score simulation', 'credit-card', 'simulation', 300, '{"credit_score": 750}', false),
  ('Crisis Manager', 'Successfully navigate the job loss simulation', 'umbrella', 'simulation', 300, '{"job_loss_survived": true}', false),
  ('Investor', 'Grow portfolio by 50% in investing simulation', 'trending-up', 'simulation', 350, '{"portfolio_growth": 50}', false),
  
  -- Skill achievements
  ('Financial Foundations', 'Complete the Financial Literacy category', 'landmark', 'skill', 400, '{"category_complete": "financial-literacy"}', false),
  ('Tax Expert', 'Complete the Taxes & Investing category', 'receipt', 'skill', 400, '{"category_complete": "taxes-investing"}', false),
  ('Career Ready', 'Complete the Career Skills category', 'briefcase', 'skill', 400, '{"category_complete": "career-skills"}', false),
  ('Sales Star', 'Complete the Sales category', 'star', 'skill', 400, '{"category_complete": "sales"}', false),
  ('Digital Native', 'Complete the Digital Marketing category', 'globe', 'skill', 400, '{"category_complete": "digital-marketing"}', false),
  ('Tech Savvy', 'Complete the Tech & AI category', 'monitor', 'skill', 400, '{"category_complete": "tech-ai"}', false),
  ('Data Wizard', 'Complete the Data Analytics category', 'database', 'skill', 400, '{"category_complete": "data-analytics"}', false),
  ('Great Communicator', 'Complete the Communication category', 'mic', 'skill', 400, '{"category_complete": "communication"}', false),
  ('Emotional Leader', 'Complete the EQ & Leadership category', 'heart', 'skill', 400, '{"category_complete": "eq-leadership"}', false),
  
  -- Special achievements
  ('Early Adopter', 'Join Transition OS in the first year', 'sparkles', 'special', 500, '{"early_adopter": true}', false),
  ('Perfect Score', 'Score 100% on any quiz', 'target', 'special', 150, '{"perfect_quiz": true}', false),
  ('Speed Learner', 'Complete a course in under a week', 'clock', 'special', 200, '{"fast_completion": true}', true),
  ('Completionist', 'Complete all courses in a category', 'check-circle', 'special', 750, '{"category_all_complete": true}', false),
  ('Life Ready', 'Complete all Life Transitions courses', 'compass', 'special', 1000, '{"life_transitions_complete": true}', false)
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE COURSES (Financial Literacy)
-- ============================================
INSERT INTO courses (id, category_id, title, slug, description, target_stage, difficulty, estimated_hours, is_premium, is_published) VALUES
  (
    'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    (SELECT id FROM course_categories WHERE slug = 'financial-literacy'),
    'Banking Basics',
    'banking-basics',
    'Learn how banks work, how to open accounts, and manage your money effectively. Understand checking vs savings, fees, and how to build a relationship with your bank.',
    'middle_to_high',
    'beginner',
    2.5,
    false,
    true
  ),
  (
    'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e',
    (SELECT id FROM course_categories WHERE slug = 'financial-literacy'),
    'Credit & Debt Mastery',
    'credit-debt-mastery',
    'Understand how credit works, build your credit score, and learn to manage debt responsibly. Includes strategies for paying off debt and avoiding common traps.',
    'high_to_adult',
    'intermediate',
    4.0,
    true,
    true
  ),
  (
    'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f',
    (SELECT id FROM course_categories WHERE slug = 'financial-literacy'),
    'Budgeting for Real Life',
    'budgeting-real-life',
    'Create and stick to a budget that actually works. Learn the 50/30/20 rule, track expenses, and build habits that lead to financial freedom.',
    'all',
    'beginner',
    3.0,
    false,
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SAMPLE COURSES (Taxes & Investing)
-- ============================================
INSERT INTO courses (id, category_id, title, slug, description, target_stage, difficulty, estimated_hours, is_premium, is_published) VALUES
  (
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    (SELECT id FROM course_categories WHERE slug = 'taxes-investing'),
    'Tax Filing 101',
    'tax-filing-101',
    'Learn how to file your taxes confidently. Understand W-2s, 1099s, deductions, and credits. Includes a hands-on tax filing simulation.',
    'high_to_adult',
    'intermediate',
    3.5,
    false,
    true
  ),
  (
    'e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b',
    (SELECT id FROM course_categories WHERE slug = 'taxes-investing'),
    'Stock Market Fundamentals',
    'stock-market-fundamentals',
    'Demystify the stock market. Learn about stocks, bonds, ETFs, and index funds. Start your investing journey with confidence.',
    'high_to_adult',
    'intermediate',
    4.5,
    true,
    true
  ),
  (
    'f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c',
    (SELECT id FROM course_categories WHERE slug = 'taxes-investing'),
    'Retirement Planning for Young Adults',
    'retirement-planning-young',
    'Start planning for retirement early. Understand 401(k)s, IRAs, compound interest, and why starting early is your biggest advantage.',
    'high_to_adult',
    'advanced',
    3.0,
    true,
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SAMPLE COURSES (Career Skills)
-- ============================================
INSERT INTO courses (id, category_id, title, slug, description, target_stage, difficulty, estimated_hours, is_premium, is_published) VALUES
  (
    'a7b8c9d0-e1f2-0a1b-4c5d-6e7f8a9b0c1d',
    (SELECT id FROM course_categories WHERE slug = 'career-skills'),
    'Resume That Gets Interviews',
    'resume-interviews',
    'Build a resume that stands out. Learn formatting, keywords, accomplishment statements, and how to tailor your resume for each application.',
    'high_to_adult',
    'beginner',
    2.0,
    false,
    true
  ),
  (
    'b8c9d0e1-f2a3-1b2c-5d6e-7f8a9b0c1d2e',
    (SELECT id FROM course_categories WHERE slug = 'career-skills'),
    'Interview Mastery',
    'interview-mastery',
    'Ace any interview. Learn to answer common questions, tell your story, ask great questions, and negotiate offers. Includes mock interview simulations.',
    'high_to_adult',
    'intermediate',
    4.0,
    true,
    true
  ),
  (
    'c9d0e1f2-a3b4-2c3d-6e7f-8a9b0c1d2e3f',
    (SELECT id FROM course_categories WHERE slug = 'career-skills'),
    'Workplace Navigation',
    'workplace-navigation',
    'Thrive in your first job. Learn professional communication, office politics, building relationships, and advancing your career.',
    'adult_skills',
    'intermediate',
    3.5,
    true,
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SAMPLE MODULES FOR "Banking Basics"
-- ============================================
INSERT INTO modules (id, course_id, title, description, order_index, estimated_minutes) VALUES
  ('m1a2b3c4-d5e6-1234-abcd-ef1234567890', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'How Banks Work', 'Understand the basics of banking and how banks make money', 1, 30),
  ('m2b3c4d5-e6f7-2345-bcde-f12345678901', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Types of Bank Accounts', 'Learn about checking, savings, and other account types', 2, 25),
  ('m3c4d5e6-f7a8-3456-cdef-123456789012', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Managing Your Account', 'Day-to-day banking skills and best practices', 3, 35),
  ('m4d5e6f7-a8b9-4567-def0-234567890123', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Banking Fees & How to Avoid Them', 'Understand common fees and how to minimize them', 4, 20)
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE LESSONS FOR "How Banks Work" MODULE
-- ============================================
INSERT INTO lessons (id, module_id, title, type, content, order_index, estimated_minutes, xp_reward) VALUES
  (
    'l1a2b3c4-d5e6-1111-aaaa-111111111111',
    'm1a2b3c4-d5e6-1234-abcd-ef1234567890',
    'What is a Bank?',
    'video',
    '{"videoUrl": "/videos/what-is-a-bank.mp4", "transcript": "Banks are financial institutions that accept deposits and make loans...", "duration": 420}',
    1,
    8,
    15
  ),
  (
    'l2b3c4d5-e6f7-2222-bbbb-222222222222',
    'm1a2b3c4-d5e6-1234-abcd-ef1234567890',
    'How Banks Make Money',
    'text',
    '{"body": "Banks make money primarily through **interest**. When you deposit money, the bank pays you a small interest rate (like 0.5%). They then lend that money to other people at a higher rate (like 7%). The difference is their profit.\n\n### Key Concepts:\n- **Interest Spread**: The difference between what banks pay depositors and charge borrowers\n- **Fees**: ATM fees, overdraft fees, account maintenance fees\n- **Investments**: Banks invest in various securities\n\n### Why This Matters To You:\nUnderstanding how banks make money helps you:\n1. Choose the right bank\n2. Avoid unnecessary fees\n3. Negotiate better rates", "images": []}',
    2,
    10,
    15
  ),
  (
    'l3c4d5e6-f7a8-3333-cccc-333333333333',
    'm1a2b3c4-d5e6-1234-abcd-ef1234567890',
    'Banks vs Credit Unions',
    'text',
    '{"body": "## Banks\n- For-profit corporations\n- Owned by shareholders\n- Often have more branches and ATMs\n- May offer more services\n\n## Credit Unions\n- Non-profit cooperatives\n- Owned by members (you!)\n- Often have better rates\n- May have fewer locations\n\n### Which Should You Choose?\nIt depends on your priorities. Credit unions often have better rates and lower fees, while banks may offer more convenience and services.", "images": []}',
    3,
    8,
    15
  ),
  (
    'l4d5e6f7-a8b9-4444-dddd-444444444444',
    'm1a2b3c4-d5e6-1234-abcd-ef1234567890',
    'Banking Knowledge Check',
    'quiz',
    '{"questions": [{"id": "q1", "question": "What is the primary way banks make money?", "options": ["Printing money", "Interest spread on loans", "Government funding", "ATM fees only"], "correct": 1, "explanation": "Banks make most of their money from the interest spread - the difference between what they pay depositors and charge borrowers."}, {"id": "q2", "question": "Who owns a credit union?", "options": ["Shareholders", "The government", "Members", "The CEO"], "correct": 2, "explanation": "Credit unions are cooperatives owned by their members."}, {"id": "q3", "question": "What is FDIC insurance?", "options": ["Car insurance from banks", "Federal protection for deposits up to $250,000", "A type of loan", "Credit card insurance"], "correct": 1, "explanation": "FDIC insurance protects your deposits at member banks up to $250,000 per depositor, per bank."}], "passingScore": 70}',
    4,
    5,
    25
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE STANDALONE SIMULATIONS
-- ============================================
INSERT INTO simulations (name, slug, description, type, initial_state, scenarios, consequences, difficulty, is_standalone) VALUES
  (
    'Monthly Budget Challenge',
    'monthly-budget-challenge',
    'You have a monthly income of $3,000. Can you make it through the month while paying bills, saving, and handling unexpected expenses?',
    'budget',
    '{"income": 3000, "savings": 500, "checking": 200, "creditCardDebt": 0, "creditScore": 680}',
    '{"weeks": [{"events": [{"id": "rent", "name": "Rent Due", "amount": 1000, "required": true}, {"id": "groceries", "name": "Groceries", "min": 200, "max": 400, "required": true}]}, {"events": [{"id": "unexpected", "name": "Car Repair", "amount": 350, "required": false, "alternatives": ["Use credit card", "Borrow from savings", "Skip and risk breakdown"]}]}]}',
    '{"overspend": {"creditScore": -20, "message": "Your credit score dropped because you maxed out your credit card"}, "save": {"savings": 200, "message": "Great job! You built your emergency fund"}, "carBreakdown": {"income": -500, "message": "Without reliable transportation, you missed work and lost income"}}',
    'medium',
    true
  ),
  (
    'First Tax Return',
    'first-tax-return',
    'File your first tax return as a young adult with a part-time job. Learn about W-2s, standard deductions, and getting your refund.',
    'tax_filing',
    '{"w2Income": 18500, "federalWithheld": 1850, "stateWithheld": 600, "studentLoanInterest": 200, "filingStatus": "single"}',
    '{"steps": [{"id": "gather", "name": "Gather Documents", "documents": ["W-2", "1098-E"]}, {"id": "choose", "name": "Choose Filing Method", "options": ["Free File", "Tax Software", "CPA"]}, {"id": "deduction", "name": "Standard vs Itemized", "standardAmount": 13850}]}',
    '{"correctFiling": {"refund": 1050, "message": "You filed correctly and received your refund!"}, "missedDeduction": {"refund": 800, "message": "You missed a deduction. Next time, remember student loan interest!"}, "lateFiling": {"penalty": 150, "message": "Filing late resulted in a penalty"}}',
    'medium',
    true
  ),
  (
    'Credit Score Builder',
    'credit-score-builder',
    'Start with no credit history and build your score over 12 simulated months. Every decision affects your score.',
    'credit_score',
    '{"creditScore": 0, "creditHistory": [], "creditCards": 0, "creditLimit": 0, "utilization": 0}',
    '{"months": [{"decisions": [{"id": "secured", "name": "Apply for secured credit card", "impact": {"score": 10, "limit": 500}}]}, {"decisions": [{"id": "autopay", "name": "Set up autopay", "impact": {"score": 5}}, {"id": "utilization", "name": "Keep utilization under 30%", "impact": {"score": 15}}]}]}',
    '{"excellent": {"finalScore": 750, "message": "Excellent! You have a great credit score"}, "good": {"finalScore": 680, "message": "Good work! Your score is building nicely"}, "poor": {"finalScore": 550, "message": "Your score needs work. Review what went wrong"}}',
    'medium',
    true
  ),
  (
    'Job Loss Recovery',
    'job-loss-recovery',
    'You just lost your job. Can you navigate unemployment, job searching, and financial survival for 3 months?',
    'job_loss',
    '{"savings": 2000, "monthlyExpenses": 2500, "unemploymentBenefit": 1200, "severance": 3000, "jobApplications": 0}',
    '{"phases": [{"name": "Week 1", "decisions": [{"id": "file", "name": "File for unemployment", "impact": {"income": 1200}}, {"id": "budget", "name": "Cut expenses", "options": ["Cut 10%", "Cut 25%", "No changes"]}]}, {"name": "Month 1-2", "decisions": [{"id": "apply", "name": "Job applications per week", "options": [5, 15, 30]}]}]}',
    '{"survival": {"employed": true, "savingsLeft": 1500, "message": "You found a new job and managed your finances!"}, "struggle": {"employed": true, "debt": 2000, "message": "You found work but accumulated debt"}, "crisis": {"employed": false, "message": "Unable to find work in time. Consider what you could do differently"}}',
    'hard',
    true
  )
ON CONFLICT (slug) DO NOTHING;
