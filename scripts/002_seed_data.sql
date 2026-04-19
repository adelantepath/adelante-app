-- Seed Data for Adelante Pathways

-- Life Stages
INSERT INTO public.life_stages (name, slug, description, min_age, max_age, order_index) VALUES
('Elementary to Middle School', 'elementary-middle', 'Transitioning from 5th to 6th grade - building independence and study habits', 10, 12, 1),
('Middle to High School', 'middle-high', 'Preparing for high school - identity, responsibility, and future planning', 13, 15, 2),
('High School to Adulthood', 'high-adult', 'Real-world readiness - finances, housing, career, and life systems', 16, 21, 3)
ON CONFLICT (slug) DO NOTHING;

-- Categories
INSERT INTO public.categories (name, slug, description, icon, color, order_index) VALUES
('Money & Finance', 'money', 'Banking, budgeting, credit, taxes, and investing', 'DollarSign', '#10B981', 1),
('Housing & Living', 'housing', 'Renting, utilities, cooking, cleaning, and daily life', 'Home', '#3B82F6', 2),
('Health & Wellness', 'health', 'Medical care, insurance, mental health, and self-care', 'Heart', '#EC4899', 3),
('Transportation', 'transportation', 'Driving, car ownership, insurance, and getting around', 'Car', '#F59E0B', 4),
('Career & Education', 'career', 'Jobs, college, trade schools, resumes, and professional growth', 'Briefcase', '#8B5CF6', 5),
('Legal & Civic', 'legal', 'Laws, voting, contracts, and civic responsibility', 'Scale', '#6366F1', 6),
('Life Management', 'life', 'Time management, goal setting, problem-solving, and independence', 'Clock', '#14B8A6', 7),
('Relationships', 'relationships', 'Healthy relationships, communication, and social responsibility', 'Users', '#F97316', 8)
ON CONFLICT (slug) DO NOTHING;

-- Modules for High School to Adult Stage (the main focus)
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'money'),
  'Banking Basics',
  'banking-basics',
  'Understanding checking accounts, savings, debit cards, and how banks work',
  'beginner',
  30,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'banking-basics');

INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'money'),
  'Credit & Debt',
  'credit-debt',
  'How credit works, credit scores, credit cards, and avoiding debt traps',
  'intermediate',
  45,
  2,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'credit-debt');

INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'money'),
  'Taxes & the IRS',
  'taxes-irs',
  'Understanding income tax, W-2s, 1099s, filing taxes, and the IRS',
  'intermediate',
  60,
  3,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'taxes-irs');

INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'money'),
  'Investing & Building Wealth',
  'investing',
  'Stocks, retirement accounts, Bitcoin, and building long-term wealth',
  'advanced',
  60,
  4,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'investing');

INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'money'),
  'Budgeting & Money Management',
  'budgeting',
  'Creating budgets, tracking expenses, and making your money work for you',
  'beginner',
  45,
  5,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'budgeting');

INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'housing'),
  'First Apartment',
  'first-apartment',
  'Finding housing, understanding leases, roommates, and moving in',
  'beginner',
  45,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'first-apartment');

INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'housing'),
  'Living on Your Own',
  'independent-living',
  'Cooking, cleaning, groceries, and managing daily life independently',
  'beginner',
  30,
  2,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'independent-living');

INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'health'),
  'Healthcare Basics',
  'healthcare-basics',
  'Understanding health insurance, finding doctors, and managing your health',
  'beginner',
  30,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'healthcare-basics');

INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'career'),
  'Getting Your First Job',
  'first-job',
  'Resumes, applications, interviews, and workplace expectations',
  'beginner',
  45,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'first-job');

INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'transportation'),
  'Car Ownership',
  'car-ownership',
  'Buying, insuring, and maintaining a vehicle',
  'intermediate',
  45,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'car-ownership');

-- Lessons for Banking Basics Module
INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'banking-basics'),
  'What is a Bank?',
  'what-is-bank',
  '{
    "sections": [
      {
        "type": "text",
        "content": "A bank is a financial institution that keeps your money safe and helps you manage it. Unlike keeping cash under your mattress, banks provide security, convenience, and even help your money grow through interest."
      },
      {
        "type": "key_points",
        "title": "Why Use a Bank?",
        "points": [
          "Your money is insured up to $250,000 by the FDIC",
          "Easy access through debit cards and online banking",
          "Direct deposit for paychecks",
          "Build a relationship for future loans"
        ]
      },
      {
        "type": "real_world",
        "content": "When you get your first job, your employer will likely pay you through direct deposit - money sent electronically straight to your bank account. No more waiting for checks to clear!"
      }
    ]
  }',
  'content',
  1,
  5,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'what-is-bank');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'banking-basics'),
  'Checking vs Savings Accounts',
  'checking-vs-savings',
  '{
    "sections": [
      {
        "type": "comparison",
        "title": "Checking Account",
        "description": "Your everyday spending account",
        "features": [
          "Use debit card for purchases",
          "Write checks",
          "Pay bills online",
          "Usually no or low interest"
        ]
      },
      {
        "type": "comparison",
        "title": "Savings Account",
        "description": "Your money-growing account",
        "features": [
          "Earns interest on your balance",
          "Limited monthly withdrawals",
          "Best for emergency fund",
          "Higher interest = faster growth"
        ]
      },
      {
        "type": "tip",
        "content": "Open BOTH accounts. Use checking for bills and daily expenses. Use savings for goals and emergencies. Many people keep 1-2 months of expenses in checking and the rest in savings."
      }
    ]
  }',
  'content',
  2,
  8,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'checking-vs-savings');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'banking-basics'),
  'Avoiding Bank Fees',
  'avoiding-fees',
  '{
    "sections": [
      {
        "type": "warning",
        "title": "Common Fees to Watch Out For",
        "items": [
          {"name": "Overdraft Fee", "cost": "$25-35", "description": "When you spend more than you have"},
          {"name": "Monthly Maintenance", "cost": "$5-15", "description": "Just for having the account"},
          {"name": "ATM Fees", "cost": "$2-5", "description": "Using another banks ATM"},
          {"name": "Minimum Balance", "cost": "$5-25", "description": "If balance drops below required amount"}
        ]
      },
      {
        "type": "strategy",
        "title": "How to Avoid These Fees",
        "points": [
          "Choose a bank with no monthly fees (many online banks)",
          "Set up low balance alerts on your phone",
          "Use your banks ATM network",
          "Link savings to checking for overdraft protection"
        ]
      }
    ]
  }',
  'content',
  3,
  7,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'avoiding-fees');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'banking-basics'),
  'Budget Simulation: Your First Paycheck',
  'first-paycheck-sim',
  '{
    "intro": "You just got your first paycheck! Learn how to manage it wisely.",
    "simulation_type": "budget"
  }',
  'simulation',
  4,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'first-paycheck-sim');

-- Lessons for Credit & Debt Module
INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'credit-debt'),
  'Understanding Credit Scores',
  'credit-scores',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Your credit score is a 3-digit number (300-850) that tells lenders how trustworthy you are with borrowed money. It affects whether you can rent an apartment, get a car loan, or even get certain jobs."
      },
      {
        "type": "scale",
        "title": "Credit Score Ranges",
        "ranges": [
          {"range": "800-850", "label": "Excellent", "description": "Best rates on everything"},
          {"range": "740-799", "label": "Very Good", "description": "Great rates, easy approvals"},
          {"range": "670-739", "label": "Good", "description": "Decent rates, most approvals"},
          {"range": "580-669", "label": "Fair", "description": "Higher rates, some denials"},
          {"range": "300-579", "label": "Poor", "description": "Hard to get approved, very high rates"}
        ]
      },
      {
        "type": "breakdown",
        "title": "What Makes Up Your Score",
        "factors": [
          {"name": "Payment History", "percentage": 35, "tip": "Pay on time, every time"},
          {"name": "Credit Utilization", "percentage": 30, "tip": "Use less than 30% of your limit"},
          {"name": "Length of History", "percentage": 15, "tip": "Keep old accounts open"},
          {"name": "Credit Mix", "percentage": 10, "tip": "Different types of credit"},
          {"name": "New Credit", "percentage": 10, "tip": "Dont open too many accounts at once"}
        ]
      }
    ]
  }',
  'content',
  1,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'credit-scores');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'credit-debt'),
  'Credit Cards: Friend or Foe?',
  'credit-cards',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Credit cards can be powerful tools for building credit and earning rewards - or dangerous traps that lead to crushing debt. The difference is how you use them."
      },
      {
        "type": "do_dont",
        "do": [
          "Pay the FULL balance every month",
          "Set up autopay for at least the minimum",
          "Keep utilization under 30%",
          "Use for planned purchases only",
          "Check statements for fraud"
        ],
        "dont": [
          "Only pay the minimum payment",
          "Max out your cards",
          "Use for impulse purchases",
          "Take cash advances",
          "Ignore your statements"
        ]
      },
      {
        "type": "math_example",
        "title": "The Real Cost of Minimum Payments",
        "scenario": "You have $1,000 on a credit card at 22% APR. If you only pay the minimum ($25/month):",
        "result": "It takes 5 years to pay off and costs $1,580 total - thats $580 in interest!"
      }
    ]
  }',
  'content',
  2,
  12,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'credit-cards');

-- Lessons for Taxes Module
INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'taxes-irs'),
  'Why Do We Pay Taxes?',
  'why-taxes',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Taxes fund the services and infrastructure we all use - roads, schools, emergency services, national defense, Social Security, and more. The IRS (Internal Revenue Service) is the government agency that collects federal taxes."
      },
      {
        "type": "breakdown",
        "title": "Types of Taxes You Will Pay",
        "items": [
          {"name": "Federal Income Tax", "description": "Goes to the federal government (IRS)"},
          {"name": "State Income Tax", "description": "Goes to your state (some states have none)"},
          {"name": "FICA (Social Security & Medicare)", "description": "Funds retirement and healthcare programs"},
          {"name": "Sales Tax", "description": "Added when you buy things"}
        ]
      },
      {
        "type": "real_world",
        "content": "When you see your first paycheck, you might be surprised - the amount is less than you expected! Thats because taxes are taken out automatically. A $15/hour job at 40 hours = $600/week gross, but you might only take home $480-520 after taxes."
      }
    ]
  }',
  'content',
  1,
  8,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'why-taxes');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'taxes-irs'),
  'W-2 vs 1099: Employee vs Contractor',
  'w2-vs-1099',
  '{
    "sections": [
      {
        "type": "comparison",
        "title": "W-2 Employee",
        "description": "Traditional employment",
        "features": [
          "Taxes automatically withheld",
          "Employer pays half your FICA",
          "May get benefits (health insurance, 401k)",
          "File taxes once a year",
          "Get a W-2 form in January"
        ]
      },
      {
        "type": "comparison", 
        "title": "1099 Independent Contractor",
        "description": "Self-employed / gig work",
        "features": [
          "No taxes withheld - YOU must save and pay",
          "Pay BOTH halves of FICA (15.3%)",
          "No employer benefits",
          "May need to pay quarterly taxes",
          "Get a 1099 form if you earn $600+"
        ]
      },
      {
        "type": "warning",
        "content": "If you do gig work (Uber, DoorDash, freelancing), you are a 1099 contractor. Set aside 25-30% of your earnings for taxes, or you will owe a big bill in April!"
      }
    ]
  }',
  'content',
  2,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'w2-vs-1099');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'taxes-irs'),
  'Filing Your First Tax Return',
  'filing-taxes',
  '{
    "sections": [
      {
        "type": "steps",
        "title": "How to File Taxes (Step by Step)",
        "steps": [
          {"step": 1, "title": "Gather Your Documents", "details": "W-2 from employer, 1099s, Social Security number, last years tax return if applicable"},
          {"step": 2, "title": "Choose How to File", "details": "Free options: IRS Free File (if income under $79,000), Cash App Taxes, or pay for TurboTax/H&R Block"},
          {"step": 3, "title": "Enter Your Information", "details": "The software walks you through it - personal info, income, deductions"},
          {"step": 4, "title": "Review and Submit", "details": "Double-check everything, then e-file for fastest processing"},
          {"step": 5, "title": "Get Your Refund or Pay What You Owe", "details": "Refunds arrive in 2-3 weeks via direct deposit"}
        ]
      },
      {
        "type": "deadline",
        "content": "Tax Day is April 15th. If you cant file by then, you can request an extension - but you still need to pay any taxes owed by April 15th to avoid penalties."
      }
    ]
  }',
  'content',
  3,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'filing-taxes');

-- Lessons for Investing Module
INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'investing'),
  'What is Investing?',
  'what-is-investing',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Investing means putting your money to work so it grows over time. Instead of just saving cash (which loses value to inflation), investing lets your money earn more money. The key is starting early - even small amounts grow significantly over decades."
      },
      {
        "type": "math_example",
        "title": "The Power of Starting Early",
        "scenario": "If you invest $200/month starting at age 18 vs age 28, with 8% average returns:",
        "comparisons": [
          {"age": 18, "by_65": "$1,034,000"},
          {"age": 28, "by_65": "$443,000"}
        ],
        "conclusion": "Starting 10 years earlier means $591,000 more - with the SAME monthly investment!"
      },
      {
        "type": "key_points",
        "title": "Types of Investments",
        "points": [
          "Stocks: Ownership pieces of companies (higher risk, higher potential reward)",
          "Bonds: Loans to companies/government (lower risk, steady returns)",
          "Index Funds: Baskets of many stocks (diversified, lower fees)",
          "Real Estate: Property ownership",
          "Cryptocurrency: Digital assets like Bitcoin (very high risk)"
        ]
      }
    ]
  }',
  'content',
  1,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'what-is-investing');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'investing'),
  'Understanding Stocks',
  'understanding-stocks',
  '{
    "sections": [
      {
        "type": "text",
        "content": "When you buy a stock, you are buying a tiny piece of ownership in a company. If the company does well, your stock becomes more valuable. Some stocks also pay dividends - regular cash payments to shareholders."
      },
      {
        "type": "example",
        "title": "Real Example: Apple Stock",
        "content": "If you bought $1,000 of Apple stock in 2010, it would be worth over $15,000 today. But not all stocks perform this well - some companies fail completely, and you can lose your entire investment."
      },
      {
        "type": "strategy",
        "title": "Smart Stock Investing",
        "points": [
          "Never invest money you cant afford to lose",
          "Diversify - dont put all eggs in one basket",
          "Think long-term (years, not days)",
          "Index funds are safer than picking individual stocks",
          "Ignore short-term market swings"
        ]
      }
    ]
  }',
  'content',
  2,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'understanding-stocks');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'investing'),
  'Cryptocurrency: Bitcoin and Beyond',
  'crypto-basics',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Cryptocurrency is digital money that exists only on the internet, secured by technology called blockchain. Bitcoin, created in 2009, was the first cryptocurrency. Today there are thousands of different cryptocurrencies."
      },
      {
        "type": "key_points",
        "title": "What You Need to Know",
        "points": [
          "Extremely volatile - prices can swing 20%+ in a day",
          "Not backed by any government or physical asset",
          "Can be used for purchases at some places",
          "Stored in digital wallets with private keys",
          "If you lose your keys, your crypto is gone forever"
        ]
      },
      {
        "type": "warning",
        "title": "Crypto Risks",
        "content": "Cryptocurrency is highly speculative. Many people have made fortunes, but many more have lost everything. NEVER invest more than you can afford to lose completely. This is NOT a get-rich-quick scheme - treat it as gambling, not investing."
      },
      {
        "type": "tip",
        "content": "If you want crypto exposure, limit it to 5-10% of your investment portfolio maximum. Focus on building traditional investments (401k, index funds) first."
      }
    ]
  }',
  'content',
  3,
  12,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'crypto-basics');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'investing'),
  'Retirement Accounts: 401k and IRA',
  'retirement-accounts',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Retirement accounts are special investment accounts with tax advantages. The earlier you start, the more time compound interest has to work its magic."
      },
      {
        "type": "comparison",
        "title": "401(k)",
        "description": "Employer-sponsored retirement plan",
        "features": [
          "Pre-tax contributions lower your taxable income",
          "Many employers MATCH your contributions (free money!)",
          "2024 limit: $23,000/year",
          "Penalty for withdrawing before age 59.5",
          "Taxes paid when you withdraw in retirement"
        ]
      },
      {
        "type": "comparison",
        "title": "Roth IRA",
        "description": "Individual retirement account",
        "features": [
          "Contribute after-tax money",
          "All growth is TAX-FREE",
          "2024 limit: $7,000/year",
          "Can withdraw contributions (not earnings) anytime",
          "No employer needed - open one yourself"
        ]
      },
      {
        "type": "action",
        "title": "What You Should Do",
        "steps": [
          "If employer offers 401k match, contribute at least enough to get the full match",
          "Open a Roth IRA and contribute what you can",
          "Even $50/month makes a huge difference over 40 years"
        ]
      }
    ]
  }',
  'content',
  4,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'retirement-accounts');

-- Achievements
INSERT INTO public.achievements (name, description, icon, criteria, points) VALUES
('First Steps', 'Complete your first lesson', 'footprints', '{"lessons_completed": 1}', 10),
('Quick Learner', 'Complete 5 lessons', 'zap', '{"lessons_completed": 5}', 25),
('Knowledge Seeker', 'Complete 10 lessons', 'book-open', '{"lessons_completed": 10}', 50),
('Module Master', 'Complete an entire module', 'award', '{"modules_completed": 1}', 100),
('Simulation Pro', 'Complete your first simulation', 'play', '{"simulations_completed": 1}', 25),
('Budget Boss', 'Score 80%+ on a budget simulation', 'piggy-bank', '{"simulation_type": "budget", "min_score": 80}', 50),
('Tax Expert', 'Complete the Taxes & IRS module', 'file-text', '{"module_slug": "taxes-irs"}', 100),
('Investment Ready', 'Complete the Investing module', 'trending-up', '{"module_slug": "investing"}', 100)
ON CONFLICT DO NOTHING;
