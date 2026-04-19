-- Expanded Curriculum for Adelante Pathways
-- Professional Skills, Age-Appropriate Content, and Career Development

-- Add New Categories for Professional Skills
INSERT INTO public.categories (name, slug, description, icon, color, order_index) VALUES
('Sales & Entrepreneurship', 'sales', 'Sales skills, business basics, negotiation, and entrepreneurial thinking', 'TrendingUp', '#7C3AED', 9),
('Digital Marketing', 'digital-marketing', 'Social media, content creation, personal branding, and online presence', 'Share2', '#DB2777', 10),
('Technology & AI', 'tech-ai', 'Tech literacy, AI tools, coding basics, and digital transformation', 'Cpu', '#0EA5E9', 11),
('Data & Analytics', 'data-analytics', 'Data literacy, spreadsheets, basic analytics, and decision-making with data', 'BarChart3', '#059669', 12),
('Communication Skills', 'communication', 'Public speaking, writing, presentation, and professional communication', 'MessageCircle', '#F59E0B', 13),
('Emotional Intelligence', 'eq', 'Self-awareness, empathy, conflict resolution, and interpersonal skills', 'Brain', '#EC4899', 14),
('Job-Specific Skills', 'niche-skills', 'Industry knowledge, certifications, and career-specific competencies', 'Award', '#6366F1', 15)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- ELEMENTARY TO MIDDLE SCHOOL (Ages 10-12)
-- =====================================================

-- Communication Skills for Elementary to Middle
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'elementary-middle'),
  (SELECT id FROM public.categories WHERE slug = 'communication'),
  'Speaking Up: Finding Your Voice',
  'speaking-up-elem',
  'Learning to share your ideas confidently in class and with friends',
  'beginner',
  25,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'speaking-up-elem');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'speaking-up-elem'),
  'Why Your Voice Matters',
  'voice-matters-elem',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Have you ever had a great idea but were too nervous to share it? Everyone feels that way sometimes! Learning to speak up is like building a muscle - it gets stronger with practice."
      },
      {
        "type": "activity",
        "title": "Try This!",
        "description": "This week, challenge yourself to raise your hand at least once per day in class. It does not have to be a question - you can share an observation or add to what someone else said."
      },
      {
        "type": "key_points",
        "title": "Speaking Up Helps You",
        "points": [
          "Teachers notice when you participate and may give you better opportunities",
          "You learn more when you engage instead of just listening",
          "Other students might have the same question - you are helping them too!",
          "It gets easier every time you do it"
        ]
      },
      {
        "type": "story",
        "title": "Real Story",
        "content": "Maria was always quiet in class. One day she answered a question about a book she loved. Her teacher was so impressed that Maria got to lead a book discussion group. Now she loves sharing her ideas!"
      }
    ]
  }',
  'content',
  1,
  8,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'voice-matters-elem');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'speaking-up-elem'),
  'How to Ask Good Questions',
  'asking-questions-elem',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Smart people are not afraid to ask questions - in fact, asking questions is how they got smart! There is no such thing as a dumb question, but there are ways to ask better questions."
      },
      {
        "type": "comparison",
        "title": "Question Upgrade",
        "items": [
          {"before": "I do not get it", "after": "Can you explain the part about X again?"},
          {"before": "What do I do?", "after": "I tried X, but I am stuck on Y. What should I try next?"},
          {"before": "Is this right?", "after": "I solved it this way because... Does my thinking make sense?"}
        ]
      },
      {
        "type": "tip",
        "content": "Before asking, try to figure out what specifically confuses you. The more specific your question, the better help you will get!"
      }
    ]
  }',
  'content',
  2,
  7,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'asking-questions-elem');

-- Emotional Intelligence for Elementary to Middle
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'elementary-middle'),
  (SELECT id FROM public.categories WHERE slug = 'eq'),
  'Understanding Your Feelings',
  'feelings-elem',
  'Recognizing and managing emotions as you grow up',
  'beginner',
  30,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'feelings-elem');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'feelings-elem'),
  'The Feelings Check-In',
  'feelings-checkin-elem',
  '{
    "sections": [
      {
        "type": "text",
        "content": "As you get older, your feelings can get more complicated. Sometimes you might feel happy and nervous at the same time, or angry but not sure why. Learning to name your feelings is the first step to handling them well."
      },
      {
        "type": "interactive",
        "title": "Feelings Vocabulary",
        "description": "Beyond happy, sad, and mad - here are more precise words for what you might feel:",
        "categories": [
          {"feeling": "Happy", "variations": ["excited", "proud", "grateful", "hopeful", "calm", "confident"]},
          {"feeling": "Sad", "variations": ["disappointed", "lonely", "left out", "homesick", "discouraged"]},
          {"feeling": "Angry", "variations": ["frustrated", "annoyed", "jealous", "embarrassed", "overwhelmed"]},
          {"feeling": "Scared", "variations": ["nervous", "worried", "unsure", "anxious", "stressed"]}
        ]
      },
      {
        "type": "activity",
        "title": "Daily Check-In",
        "description": "Each morning and evening, take 30 seconds to ask yourself: What am I feeling right now? Try to use a specific word, not just good or bad."
      }
    ]
  }',
  'content',
  1,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'feelings-checkin-elem');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'feelings-elem'),
  'Handling Big Changes',
  'big-changes-elem',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Moving from elementary to middle school is a big change! You might have new teachers, new friends, and new expectations. It is totally normal to feel excited AND nervous about it."
      },
      {
        "type": "key_points",
        "title": "What Changes in Middle School",
        "points": [
          "You will have multiple teachers instead of one",
          "You will switch classes and have a locker",
          "There will be more homework and responsibility",
          "You will meet kids from other elementary schools",
          "You will have more independence and choices"
        ]
      },
      {
        "type": "strategies",
        "title": "Coping Strategies",
        "items": [
          {"strategy": "Talk to someone", "why": "Parents, older siblings, or school counselors have been through this"},
          {"strategy": "Focus on what you CAN control", "why": "You cannot control everything, but you can control your effort and attitude"},
          {"strategy": "Give yourself time", "why": "It takes about 6 weeks to adjust to something new - be patient with yourself"},
          {"strategy": "Stay connected", "why": "Keep in touch with old friends while making new ones"}
        ]
      }
    ]
  }',
  'content',
  2,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'big-changes-elem');

-- Technology Basics for Elementary to Middle
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'elementary-middle'),
  (SELECT id FROM public.categories WHERE slug = 'tech-ai'),
  'Digital Basics: Being Smart Online',
  'digital-basics-elem',
  'Internet safety, digital citizenship, and responsible technology use',
  'beginner',
  30,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'digital-basics-elem');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'digital-basics-elem'),
  'Your Digital Footprint',
  'digital-footprint-elem',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Everything you do online leaves a trail - like footprints in sand, but these do not wash away! Posts, comments, photos, and even things you think are private can be saved and found later. Future schools and employers might look at your online history."
      },
      {
        "type": "rule",
        "title": "The Billboard Test",
        "content": "Before posting anything online, ask yourself: Would I be okay if this was on a giant billboard with my name on it? If not, do not post it!"
      },
      {
        "type": "do_dont",
        "do": [
          "Think before you post or send",
          "Use privacy settings",
          "Be kind in comments",
          "Tell a trusted adult if something feels wrong"
        ],
        "dont": [
          "Share personal info (address, phone, school name)",
          "Post photos you would not show your parents",
          "Talk to strangers online",
          "Share passwords (except with parents)"
        ]
      }
    ]
  }',
  'content',
  1,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'digital-footprint-elem');

-- Money Basics for Elementary to Middle
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'elementary-middle'),
  (SELECT id FROM public.categories WHERE slug = 'money'),
  'Money Smarts for Kids',
  'money-smarts-elem',
  'Understanding money, saving, and making good choices with allowance or gift money',
  'beginner',
  25,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'money-smarts-elem');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'money-smarts-elem'),
  'Save, Spend, Share',
  'save-spend-share-elem',
  '{
    "sections": [
      {
        "type": "text",
        "content": "When you get money - from allowance, gifts, or chores - what do you do with it? Learning to split your money into three buckets helps you enjoy now while preparing for later."
      },
      {
        "type": "breakdown",
        "title": "The Three Buckets",
        "items": [
          {"name": "Save (50%)", "description": "Put half away for bigger goals or emergencies", "example": "Want a $60 video game? Save $10 from each $20 you get, and you will have it in 6 gifts!"},
          {"name": "Spend (40%)", "description": "Use this for fun stuff you want now", "example": "A snack, a small toy, or going to the movies"},
          {"name": "Share (10%)", "description": "Give to help others or causes you care about", "example": "Donate to an animal shelter, help a friend, or give to your church"}
        ]
      },
      {
        "type": "activity",
        "title": "Try This",
        "description": "Get three jars or envelopes. Label them Save, Spend, and Share. Next time you get money, divide it up right away!"
      }
    ]
  }',
  'content',
  1,
  8,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'save-spend-share-elem');

-- =====================================================
-- MIDDLE TO HIGH SCHOOL (Ages 13-15)
-- =====================================================

-- Communication Skills for Middle to High
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'middle-high'),
  (SELECT id FROM public.categories WHERE slug = 'communication'),
  'Professional Communication',
  'prof-comm-middle',
  'Email etiquette, texting vs formal writing, and communicating with adults',
  'beginner',
  35,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'prof-comm-middle');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'prof-comm-middle'),
  'Email Like a Pro',
  'email-pro-middle',
  '{
    "sections": [
      {
        "type": "text",
        "content": "The way you text your friends is NOT the way you should email teachers, coaches, or future employers. Learning professional email now will help you throughout high school, college, and your career."
      },
      {
        "type": "template",
        "title": "Professional Email Structure",
        "parts": [
          {"section": "Subject Line", "example": "Question about the History Assignment", "tip": "Be specific - not just Hi or Help"},
          {"section": "Greeting", "example": "Dear Mr. Johnson, or Hello Ms. Garcia,", "tip": "Use their title and last name unless they say otherwise"},
          {"section": "Body", "example": "I am writing to ask about the essay due Friday. You mentioned we could choose our own topic - could I write about the Civil Rights Movement?", "tip": "Be clear, polite, and get to the point"},
          {"section": "Closing", "example": "Thank you for your time. Best regards, [Your Name]", "tip": "Always sign your full name"}
        ]
      },
      {
        "type": "comparison",
        "title": "Texting vs Emailing",
        "items": [
          {"texting": "hey whats the hw", "email": "Hello Mr. Smith, Could you please clarify what pages we need to read for homework? Thank you, Maria Rodriguez"},
          {"texting": "sry im gonna be late", "email": "Dear Coach Davis, I apologize, but I will be arriving 10 minutes late to practice today due to a doctors appointment. I will be ready to join as soon as I arrive. Thank you for understanding, James Chen"},
          {"texting": "thx", "email": "Thank you for your help with this. I really appreciate it!"}
        ]
      }
    ]
  }',
  'content',
  1,
  12,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'email-pro-middle');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'prof-comm-middle'),
  'Speaking to Adults',
  'speaking-adults-middle',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Talking to teachers, employers, or other adults professionally is different from talking to friends. The way you communicate can affect whether you get opportunities, help, or respect."
      },
      {
        "type": "key_points",
        "title": "Professional Speaking Tips",
        "points": [
          "Make eye contact (shows confidence and respect)",
          "Use please and thank you",
          "Avoid slang and filler words (um, like, you know)",
          "Speak clearly - do not mumble",
          "Listen fully before responding",
          "Address them properly (Mr., Ms., Dr., Coach)"
        ]
      },
      {
        "type": "scenarios",
        "title": "Practice These Situations",
        "items": [
          {"situation": "Asking for help", "good": "Excuse me, Ms. Taylor. I have been working on problem 5 and I am stuck on the second step. Could you help me understand what I should do next?"},
          {"situation": "Disagreeing respectfully", "good": "I understand your point, but I see it a little differently. Would it be okay if I explained my perspective?"},
          {"situation": "Requesting something", "good": "Coach, I was hoping to discuss whether I could try a different position. When would be a good time to talk?"}
        ]
      }
    ]
  }',
  'content',
  2,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'speaking-adults-middle');

-- Emotional Intelligence for Middle to High
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'middle-high'),
  (SELECT id FROM public.categories WHERE slug = 'eq'),
  'EQ: Your Secret Superpower',
  'eq-middle',
  'Building emotional intelligence for better relationships and success',
  'intermediate',
  40,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'eq-middle');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'eq-middle'),
  'What is Emotional Intelligence?',
  'what-is-eq-middle',
  '{
    "sections": [
      {
        "type": "text",
        "content": "IQ measures how smart you are academically. EQ (Emotional Intelligence) measures how smart you are with emotions - yours and others. Studies show EQ is actually MORE important than IQ for success in life, work, and relationships."
      },
      {
        "type": "breakdown",
        "title": "The 5 Parts of EQ",
        "items": [
          {"name": "Self-Awareness", "description": "Knowing what you are feeling and why", "example": "I notice I am getting frustrated because I feel like no one is listening to me"},
          {"name": "Self-Regulation", "description": "Managing your emotions instead of letting them control you", "example": "I am angry, but I will take a breath before responding"},
          {"name": "Motivation", "description": "Pushing yourself even when things are hard", "example": "This homework is boring, but finishing it means I can relax later"},
          {"name": "Empathy", "description": "Understanding how others feel", "example": "My friend seems quiet today - maybe something is bothering them"},
          {"name": "Social Skills", "description": "Building good relationships and handling conflicts", "example": "Let me try to understand their side before explaining mine"}
        ]
      },
      {
        "type": "fact",
        "content": "Research shows that people with high EQ earn more money, have better relationships, and are happier - even if their IQ is average!"
      }
    ]
  }',
  'content',
  1,
  12,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'what-is-eq-middle');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'eq-middle'),
  'Managing Anger and Frustration',
  'managing-anger-middle',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Everyone gets angry sometimes - it is a normal emotion. But HOW you handle anger makes all the difference. Uncontrolled anger can ruin friendships, get you in trouble, and make problems worse."
      },
      {
        "type": "steps",
        "title": "The STOP Method",
        "steps": [
          {"step": "S - Stop", "details": "Pause before reacting. Do not say or do anything yet."},
          {"step": "T - Take a breath", "details": "Deep breaths activate your calm-down system. Try 4 counts in, 4 counts out."},
          {"step": "O - Observe", "details": "What am I feeling? Why? Is my reaction proportional to the situation?"},
          {"step": "P - Proceed thoughtfully", "details": "Choose how to respond instead of just reacting."}
        ]
      },
      {
        "type": "strategies",
        "title": "Healthy Ways to Release Anger",
        "items": [
          "Physical activity (run, punch a pillow, do pushups)",
          "Write it out in a journal",
          "Talk to someone you trust",
          "Listen to music",
          "Take a walk away from the situation"
        ]
      }
    ]
  }',
  'content',
  2,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'managing-anger-middle');

-- Technology & AI for Middle to High
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'middle-high'),
  (SELECT id FROM public.categories WHERE slug = 'tech-ai'),
  'AI Tools for School',
  'ai-tools-middle',
  'Using AI responsibly for learning, without crossing into cheating',
  'beginner',
  35,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'ai-tools-middle');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'ai-tools-middle'),
  'AI: Tool vs Cheat',
  'ai-tool-vs-cheat-middle',
  '{
    "sections": [
      {
        "type": "text",
        "content": "AI tools like ChatGPT are powerful - they can help you learn faster and work smarter. But there is a big difference between using AI to LEARN and using AI to CHEAT. Understanding this difference will matter more and more as you go through school and into careers."
      },
      {
        "type": "do_dont",
        "title": "Using AI the Right Way",
        "do": [
          "Ask AI to explain a concept you do not understand",
          "Use AI to brainstorm ideas, then develop them yourself",
          "Ask AI to check your work and explain errors",
          "Use AI to practice - like creating practice quiz questions",
          "Ask AI for feedback on drafts YOU wrote"
        ],
        "dont": [
          "Copy AI answers and submit them as your own",
          "Have AI write your essays or homework",
          "Use AI during tests unless allowed",
          "Skip learning because AI can do it for you",
          "Trust AI blindly - it makes mistakes!"
        ]
      },
      {
        "type": "real_world",
        "content": "In your future job, you WILL use AI tools. But employers want people who can THINK and use AI to enhance their work - not people who cannot do anything without AI. Build your skills now, and AI will make you even more powerful later."
      }
    ]
  }',
  'content',
  1,
  12,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'ai-tool-vs-cheat-middle');

-- Data & Analytics for Middle to High
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'middle-high'),
  (SELECT id FROM public.categories WHERE slug = 'data-analytics'),
  'Spreadsheet Power',
  'spreadsheets-middle',
  'Using spreadsheets for school projects, personal tracking, and problem-solving',
  'beginner',
  40,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'spreadsheets-middle');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'spreadsheets-middle'),
  'Spreadsheets 101',
  'spreadsheets-101-middle',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Spreadsheets (like Google Sheets or Excel) are one of the most useful tools you can learn. They help you organize information, do calculations automatically, and even make decisions. Learning them now gives you an advantage in school and any career."
      },
      {
        "type": "key_points",
        "title": "What You Can Do With Spreadsheets",
        "points": [
          "Track your grades and calculate your GPA",
          "Manage your budget and savings",
          "Organize research for school projects",
          "Create schedules and planners",
          "Analyze data for science or math projects",
          "Make charts and graphs that impress teachers"
        ]
      },
      {
        "type": "basics",
        "title": "Essential Formulas to Know",
        "formulas": [
          {"formula": "=SUM(A1:A10)", "does": "Adds up all numbers in cells A1 through A10"},
          {"formula": "=AVERAGE(B1:B10)", "does": "Calculates the average of numbers"},
          {"formula": "=MAX(C1:C10)", "does": "Finds the highest number"},
          {"formula": "=MIN(C1:C10)", "does": "Finds the lowest number"},
          {"formula": "=COUNT(D1:D10)", "does": "Counts how many cells have numbers"}
        ]
      }
    ]
  }',
  'content',
  1,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'spreadsheets-101-middle');

-- =====================================================
-- HIGH SCHOOL TO ADULTHOOD (Ages 16-21)
-- =====================================================

-- Sales & Entrepreneurship for High to Adult
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'sales'),
  'Sales Skills for Everyone',
  'sales-skills',
  'Persuasion, negotiation, and selling yourself in any situation',
  'intermediate',
  50,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'sales-skills');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'sales-skills'),
  'Everyone Sells Something',
  'everyone-sells',
  '{
    "sections": [
      {
        "type": "text",
        "content": "You might think sales is just for salespeople, but you are selling every day - selling your ideas in class, selling yourself in job interviews, even selling your parents on letting you borrow the car. Understanding how persuasion works gives you power in any situation."
      },
      {
        "type": "key_points",
        "title": "When You Are Selling",
        "points": [
          "Job interviews - selling yourself as the best candidate",
          "Asking for a raise - selling your value to your employer",
          "College applications - selling yourself to admissions",
          "Starting a business - selling your product or service",
          "Negotiating rent - selling yourself as a good tenant",
          "Any time you need to convince someone of something"
        ]
      },
      {
        "type": "breakdown",
        "title": "The Psychology of Persuasion",
        "items": [
          {"principle": "Reciprocity", "meaning": "People want to return favors", "use": "Give value first, then ask"},
          {"principle": "Social Proof", "meaning": "People follow what others do", "use": "Show that others trust you"},
          {"principle": "Authority", "meaning": "People trust experts", "use": "Demonstrate your knowledge"},
          {"principle": "Scarcity", "meaning": "People want what is rare", "use": "Show limited availability or unique value"},
          {"principle": "Liking", "meaning": "People buy from people they like", "use": "Build genuine rapport"}
        ]
      }
    ]
  }',
  'content',
  1,
  12,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'everyone-sells');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'sales-skills'),
  'Negotiation Basics',
  'negotiation-basics',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Negotiation is not about winning and making someone else lose - it is about finding solutions that work for everyone. Good negotiators get better job offers, pay less for cars, and resolve conflicts without burning bridges."
      },
      {
        "type": "steps",
        "title": "How to Negotiate",
        "steps": [
          {"step": 1, "title": "Know Your BATNA", "details": "Best Alternative To Negotiated Agreement - what will you do if this deal fails? The stronger your backup plan, the more power you have."},
          {"step": 2, "title": "Research First", "details": "Know the market rate, the other side motivations, and what is reasonable to ask for."},
          {"step": 3, "title": "Start Higher (or Lower)", "details": "Anchor the negotiation. If you want $50K salary, ask for $60K. You can always come down."},
          {"step": 4, "title": "Listen More Than Talk", "details": "Ask questions. Understand what they really want. There might be creative solutions."},
          {"step": 5, "title": "Be Willing to Walk Away", "details": "Desperation kills negotiations. Know your limits and stick to them."}
        ]
      },
      {
        "type": "practice",
        "title": "Real Negotiations You Will Face",
        "items": [
          {"situation": "Job offer", "tip": "Always negotiate salary - most employers expect it and leave room"},
          {"situation": "Car purchase", "tip": "Never pay sticker price. Research the invoice price and negotiate from there"},
          {"situation": "Rent", "tip": "Ask about move-in specials, lower rent for longer lease, or included utilities"},
          {"situation": "Raise at work", "tip": "Document your accomplishments, research market rates, and ask for a specific number"}
        ]
      }
    ]
  }',
  'content',
  2,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'negotiation-basics');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'sales-skills'),
  'Starting a Side Hustle',
  'side-hustle',
  '{
    "sections": [
      {
        "type": "text",
        "content": "A side hustle is a small business or income stream outside your main job. It could become your main career someday, or just extra money. Either way, learning to create value and make money on your own is one of the most valuable skills you can develop."
      },
      {
        "type": "ideas",
        "title": "Side Hustle Ideas Based on Your Skills",
        "categories": [
          {"skill": "Tech-savvy", "hustles": ["Social media management", "Website building", "Tech support for small businesses", "Online tutoring"]},
          {"skill": "Creative", "hustles": ["Graphic design", "Photography", "Content creation", "Handmade products on Etsy"]},
          {"skill": "Good with people", "hustles": ["Tutoring", "Event planning", "Sales", "Consulting"]},
          {"skill": "Physical/hands-on", "hustles": ["Lawn care", "Cleaning services", "Moving help", "Car detailing"]}
        ]
      },
      {
        "type": "steps",
        "title": "Starting Your First Side Hustle",
        "steps": [
          {"step": 1, "title": "Identify Your Value", "details": "What can you do that others need? What problems can you solve?"},
          {"step": 2, "title": "Start Small", "details": "Do one project for free or cheap to build experience and get a testimonial"},
          {"step": 3, "title": "Set Your Price", "details": "Research what others charge. Start a bit lower while building reputation, then raise prices"},
          {"step": 4, "title": "Find Customers", "details": "Start with people you know. Ask for referrals. Use social media and local groups"},
          {"step": 5, "title": "Keep It Legal", "details": "Report income on taxes. Consider simple business structure as you grow"}
        ]
      }
    ]
  }',
  'content',
  3,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'side-hustle');

-- Digital Marketing for High to Adult
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'digital-marketing'),
  'Personal Branding & Social Media',
  'personal-branding',
  'Building your online presence for career opportunities',
  'intermediate',
  45,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'personal-branding');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'personal-branding'),
  'Your Personal Brand',
  'personal-brand-intro',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Your personal brand is what people think of when they hear your name. Companies have brands - but so do you. Whether you build it intentionally or not, people form opinions based on your online presence, how you communicate, and what you are known for."
      },
      {
        "type": "key_points",
        "title": "Why Personal Branding Matters",
        "points": [
          "70% of employers check social media before hiring",
          "A strong LinkedIn profile can get recruiters to contact YOU",
          "Your reputation follows you through your career",
          "It is easier to get opportunities when people know what you are good at"
        ]
      },
      {
        "type": "exercise",
        "title": "Define Your Brand",
        "questions": [
          "What 3 words would you want people to use to describe you?",
          "What are you genuinely passionate about or good at?",
          "What makes you different from others with similar backgrounds?",
          "What value can you provide to others?"
        ]
      }
    ]
  }',
  'content',
  1,
  12,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'personal-brand-intro');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'personal-branding'),
  'LinkedIn for Beginners',
  'linkedin-basics',
  '{
    "sections": [
      {
        "type": "text",
        "content": "LinkedIn is the professional social network. While Instagram and TikTok are for fun, LinkedIn is where careers are built. Even if you are just starting out, having a strong LinkedIn profile can open doors you did not know existed."
      },
      {
        "type": "checklist",
        "title": "LinkedIn Profile Essentials",
        "items": [
          {"item": "Professional photo", "tip": "Dress nicely, good lighting, plain background, smile"},
          {"item": "Compelling headline", "tip": "Not just your job title - what value do you provide? Example: Aspiring Data Analyst | Business Student | Problem Solver"},
          {"item": "About section", "tip": "Tell your story. What drives you? What are you working toward?"},
          {"item": "Experience", "tip": "Include internships, volunteer work, and relevant projects - not just paid jobs"},
          {"item": "Skills", "tip": "List relevant skills and ask connections to endorse them"},
          {"item": "Education", "tip": "Include your school, relevant courses, GPA if strong, activities"}
        ]
      },
      {
        "type": "strategy",
        "title": "Growing Your Network",
        "points": [
          "Connect with classmates, teachers, and family friends in your field",
          "Follow companies and people you want to learn from",
          "Engage with posts - thoughtful comments get noticed",
          "Share articles or thoughts about your industry",
          "Message people for advice (not jobs) - most are happy to help"
        ]
      }
    ]
  }',
  'content',
  2,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'linkedin-basics');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'personal-branding'),
  'Content Creation Basics',
  'content-creation',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Creating content - posts, videos, articles - is one of the most powerful ways to build your personal brand and create opportunities. You do not need to go viral. Consistently sharing valuable content builds credibility over time."
      },
      {
        "type": "ideas",
        "title": "Content You Can Create",
        "items": [
          {"type": "Document your learning", "example": "Today I learned about compound interest. Here is why it matters..."},
          {"type": "Share your projects", "example": "I just finished building this website for a class project. Here is what I learned..."},
          {"type": "Give tips from experience", "example": "5 things I wish I knew before my first job interview"},
          {"type": "Comment on industry news", "example": "AI is changing marketing. Here is how I am preparing..."},
          {"type": "Interview others", "example": "I asked 10 professionals how they got started. Here is what they said..."}
        ]
      },
      {
        "type": "tip",
        "content": "Consistency beats perfection. Posting one thoughtful thing per week builds more credibility than one viral post followed by silence."
      }
    ]
  }',
  'content',
  3,
  12,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'content-creation');

-- Technology & AI for High to Adult
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'tech-ai'),
  'AI for Career Advantage',
  'ai-career',
  'Using AI tools to be more productive and competitive in any job',
  'intermediate',
  55,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'ai-career');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'ai-career'),
  'AI Tools That Will Change Your Career',
  'ai-tools-career',
  '{
    "sections": [
      {
        "type": "text",
        "content": "AI is not replacing jobs - it is replacing people who do not know how to use AI. The workers who learn to leverage AI tools will be 10x more productive than those who do not. This is not about being a programmer - it is about knowing which tools to use and how."
      },
      {
        "type": "tools",
        "title": "Essential AI Tools to Know",
        "categories": [
          {
            "category": "Writing & Communication",
            "tools": [
              {"name": "ChatGPT/Claude", "use": "Drafting emails, reports, brainstorming, research"},
              {"name": "Grammarly", "use": "Writing improvement and proofreading"},
              {"name": "Jasper/Copy.ai", "use": "Marketing copy and content creation"}
            ]
          },
          {
            "category": "Productivity",
            "tools": [
              {"name": "Notion AI", "use": "Note-taking, project management, summaries"},
              {"name": "Otter.ai", "use": "Meeting transcription and notes"},
              {"name": "Zapier/Make", "use": "Automating repetitive tasks"}
            ]
          },
          {
            "category": "Design & Creative",
            "tools": [
              {"name": "Canva AI", "use": "Quick graphics and presentations"},
              {"name": "Midjourney/DALL-E", "use": "Image generation"},
              {"name": "Descript", "use": "Video and podcast editing"}
            ]
          },
          {
            "category": "Data & Analysis",
            "tools": [
              {"name": "ChatGPT Code Interpreter", "use": "Data analysis without coding"},
              {"name": "Obviously AI", "use": "No-code machine learning"},
              {"name": "Sheets/Excel AI features", "use": "Automated insights from spreadsheets"}
            ]
          }
        ]
      }
    ]
  }',
  'content',
  1,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'ai-tools-career');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'ai-career'),
  'Prompt Engineering: Talking to AI',
  'prompt-engineering',
  '{
    "sections": [
      {
        "type": "text",
        "content": "The quality of AI output depends on the quality of your input. Learning to write effective prompts - instructions that get AI to do what you want - is becoming a valuable skill. Good prompts can save hours of work."
      },
      {
        "type": "formula",
        "title": "The Perfect Prompt Formula",
        "parts": [
          {"element": "Role", "example": "You are an experienced marketing manager..."},
          {"element": "Context", "example": "...at a small e-commerce company selling eco-friendly products..."},
          {"element": "Task", "example": "...write 5 Instagram post ideas for Earth Day..."},
          {"element": "Format", "example": "...with engaging captions under 150 characters each..."},
          {"element": "Constraints", "example": "...that avoid clichés and appeal to Gen Z."}
        ]
      },
      {
        "type": "comparison",
        "title": "Bad vs Good Prompts",
        "items": [
          {"bad": "Write a cover letter", "good": "Write a cover letter for a marketing internship at Nike. I am a college junior with social media and content creation experience. Emphasize my creativity and data-driven approach. Keep it under 300 words."},
          {"bad": "Help me with my resume", "good": "Review my resume for a software engineering role. Identify weak bullet points and rewrite them using the XYZ format (accomplished X by doing Y, resulting in Z). Focus on quantifiable achievements."},
          {"bad": "Explain investing", "good": "Explain index fund investing to an 18-year-old with no finance background. Use simple analogies, avoid jargon, and explain why starting early matters. Include one specific example with numbers."}
        ]
      }
    ]
  }',
  'content',
  2,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'prompt-engineering');

-- Data & Analytics for High to Adult
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'data-analytics'),
  'Data Literacy for Any Career',
  'data-literacy',
  'Understanding data, making data-driven decisions, and basic analytics',
  'intermediate',
  50,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'data-literacy');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'data-literacy'),
  'Why Data Skills Matter',
  'why-data-matters',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Data is everywhere, and the ability to understand and use it is becoming essential in almost every job. You do not need to be a data scientist - but understanding the basics of data will make you more valuable in any career."
      },
      {
        "type": "key_points",
        "title": "How Data is Used in Different Careers",
        "points": [
          "Marketing: Which ads are working? Who is our best customer?",
          "Healthcare: What treatments work best? Where are disease outbreaks?",
          "Sales: Which leads are most likely to buy? What is our revenue trend?",
          "Education: Which students need help? What teaching methods work?",
          "Retail: What products sell together? When should we restock?",
          "Any manager: How is my team performing? Are we meeting goals?"
        ]
      },
      {
        "type": "fact",
        "content": "According to LinkedIn, data skills are among the most in-demand skills across industries. Even jobs that are not data jobs increasingly require data literacy."
      }
    ]
  }',
  'content',
  1,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'why-data-matters');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'data-literacy'),
  'Reading Charts and Graphs',
  'reading-data',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Being data literate starts with being able to read and interpret charts, graphs, and statistics. Misleading data is everywhere - in news, advertising, and social media. Learning to spot bad data protects you from manipulation."
      },
      {
        "type": "chart_types",
        "title": "Common Charts and When to Use Them",
        "charts": [
          {"type": "Bar Chart", "use": "Comparing different categories", "example": "Sales by region"},
          {"type": "Line Chart", "use": "Showing trends over time", "example": "Stock price over 5 years"},
          {"type": "Pie Chart", "use": "Showing parts of a whole", "example": "Budget breakdown"},
          {"type": "Scatter Plot", "use": "Showing relationships between variables", "example": "Education vs income"}
        ]
      },
      {
        "type": "warning",
        "title": "How Data Can Lie",
        "items": [
          {"trick": "Misleading axes", "example": "Starting a bar chart at 95 instead of 0 makes small differences look huge"},
          {"trick": "Cherry-picking", "example": "Showing only data that supports your point while hiding contradicting data"},
          {"trick": "Correlation vs causation", "example": "Ice cream sales and drowning both rise in summer - but ice cream does not cause drowning"},
          {"trick": "Small sample size", "example": "9 out of 10 dentists... but they only asked 10 dentists"}
        ]
      }
    ]
  }',
  'content',
  2,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'reading-data');

-- Communication for High to Adult
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'communication'),
  'Professional Communication Mastery',
  'prof-comm-adult',
  'Advanced communication skills for workplace success',
  'intermediate',
  55,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'prof-comm-adult');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'prof-comm-adult'),
  'Presenting with Confidence',
  'presenting-confidence',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Public speaking is consistently ranked as one of people biggest fears - but it is also one of the most valuable career skills. Leaders in every field need to present ideas, pitch projects, and influence others. The good news: it is a learnable skill."
      },
      {
        "type": "steps",
        "title": "Building a Great Presentation",
        "steps": [
          {"step": 1, "title": "Start with the End", "details": "What do you want people to DO after your presentation? Work backward from that goal."},
          {"step": 2, "title": "Structure It Simply", "details": "Opening hook, 3 main points, strong conclusion. People cannot remember more than 3 things."},
          {"step": 3, "title": "Make Slides Visual", "details": "Less text, more images. Slides support your talk - they are not a script."},
          {"step": 4, "title": "Practice Out Loud", "details": "Practice at least 5 times. Record yourself. The more you practice, the more natural it feels."},
          {"step": 5, "title": "Handle Nerves", "details": "Deep breaths, power poses, and remember: the audience wants you to succeed."}
        ]
      },
      {
        "type": "tips",
        "title": "Pro Tips",
        "points": [
          "Arrive early to test tech and get comfortable in the space",
          "Make eye contact with different people around the room",
          "Pause after important points - silence is powerful",
          "Have a backup plan if tech fails (can you present without slides?)",
          "End with a clear call to action"
        ]
      }
    ]
  }',
  'content',
  1,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'presenting-confidence');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'prof-comm-adult'),
  'Difficult Conversations',
  'difficult-conversations',
  '{
    "sections": [
      {
        "type": "text",
        "content": "The conversations you dread - asking for a raise, addressing conflict with a coworker, giving negative feedback - are often the most important ones. Avoiding them creates bigger problems. Learning to have difficult conversations well is a superpower."
      },
      {
        "type": "framework",
        "title": "The SBI Feedback Model",
        "steps": [
          {"step": "Situation", "example": "In yesterday team meeting..."},
          {"step": "Behavior", "example": "...you interrupted me three times while I was presenting..."},
          {"step": "Impact", "example": "...which made it hard for me to finish my points and made me feel dismissed."}
        ],
        "note": "Focus on specific, observable behavior - not personality or assumptions about intent."
      },
      {
        "type": "scenarios",
        "title": "Scripts for Common Difficult Conversations",
        "items": [
          {"situation": "Asking for a raise", "script": "I have been in this role for [time] and have achieved [specific accomplishments]. Based on my research and contributions, I would like to discuss adjusting my compensation to [specific number]. Can we talk about what it would take to make that happen?"},
          {"situation": "Addressing conflict", "script": "I value our working relationship and want to address something that is been on my mind. When [specific behavior], I felt [emotion] because [reason]. Can we talk about how to handle this differently going forward?"},
          {"situation": "Setting boundaries", "script": "I appreciate you thinking of me for this project, but I am not able to take it on right now and deliver quality work. Can we discuss priorities or timeline adjustments?"}
        ]
      }
    ]
  }',
  'content',
  2,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'difficult-conversations');

-- Emotional Intelligence for High to Adult
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'eq'),
  'Emotional Intelligence at Work',
  'eq-work',
  'Advanced EQ skills for professional success and leadership',
  'advanced',
  60,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'eq-work');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'eq-work'),
  'Reading the Room',
  'reading-room',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Reading the room means picking up on unspoken social cues, emotional undercurrents, and group dynamics. It is the difference between saying the right thing at the right time and putting your foot in your mouth. This skill is essential for leadership, sales, and any role involving people."
      },
      {
        "type": "signals",
        "title": "Non-Verbal Cues to Watch",
        "items": [
          {"cue": "Body language", "positive": "Leaning in, nodding, open posture", "negative": "Crossed arms, leaning away, checking phone"},
          {"cue": "Eye contact", "positive": "Engaged, looking at speaker", "negative": "Looking around, glazed over, avoiding eye contact"},
          {"cue": "Energy level", "positive": "Alert, responsive, asking questions", "negative": "Yawning, fidgeting, clock-watching"},
          {"cue": "Tone of voice", "positive": "Enthusiastic, curious", "negative": "Flat, rushed, defensive"}
        ]
      },
      {
        "type": "strategies",
        "title": "Adjusting Based on What You See",
        "items": [
          {"observation": "People seem confused", "adjust": "Slow down, ask if there are questions, use simpler language"},
          {"observation": "Energy is low", "adjust": "Take a break, change activity, ask for input"},
          {"observation": "Someone is upset", "adjust": "Acknowledge feelings, create space for them to share, do not dismiss"},
          {"observation": "There is tension between people", "adjust": "Address it directly or redirect conversation, do not ignore it"}
        ]
      }
    ]
  }',
  'content',
  1,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'reading-room');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'eq-work'),
  'Building Strong Work Relationships',
  'work-relationships',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Your career success depends heavily on relationships. People hire, promote, and recommend people they know, like, and trust. Building genuine professional relationships is not networking - it is being someone people want to work with."
      },
      {
        "type": "key_points",
        "title": "What Builds Strong Work Relationships",
        "points": [
          "Reliability: Do what you say you will do, when you say you will do it",
          "Generosity: Help others without expecting immediate return",
          "Authenticity: Be yourself, not a fake professional persona",
          "Interest: Ask about people lives, remember details, follow up",
          "Credit: Share credit generously, give recognition publicly",
          "Respect: Value people time, listen fully, acknowledge contributions"
        ]
      },
      {
        "type": "warning",
        "title": "Relationship Killers",
        "items": [
          "Taking credit for others work",
          "Gossiping or talking behind people backs",
          "Only reaching out when you need something",
          "Being unreliable or flaky",
          "Dismissing others ideas or contributions"
        ]
      }
    ]
  }',
  'content',
  2,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'work-relationships');

-- Niche/Job-Specific Skills
INSERT INTO public.modules (stage_id, category_id, title, slug, description, difficulty, estimated_minutes, order_index, is_published)
SELECT 
  (SELECT id FROM public.life_stages WHERE slug = 'high-adult'),
  (SELECT id FROM public.categories WHERE slug = 'niche-skills'),
  'Finding Your Career Path',
  'career-path',
  'Exploring industries, identifying strengths, and building relevant skills',
  'beginner',
  45,
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE slug = 'career-path');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'career-path'),
  'Discovering Your Strengths',
  'discover-strengths',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Your career should build on your natural strengths - not fight against them. Understanding what you are naturally good at helps you choose the right path and succeed faster. Strengths are not just skills - they are things that energize you and come naturally."
      },
      {
        "type": "exercise",
        "title": "Identify Your Strengths",
        "questions": [
          "What do people consistently ask for your help with?",
          "What activities make you lose track of time?",
          "What comes easily to you that others struggle with?",
          "What were you doing during your proudest moments?",
          "What do you enjoy learning about in your free time?"
        ]
      },
      {
        "type": "categories",
        "title": "Common Strength Areas",
        "items": [
          {"area": "Analytical", "signs": "Love solving puzzles, spot patterns, enjoy data", "careers": "Engineering, Finance, Data Science, Research"},
          {"area": "Creative", "signs": "Generate ideas, see unique solutions, enjoy making things", "careers": "Design, Marketing, Writing, Product Development"},
          {"area": "Social", "signs": "Energized by people, build relationships easily, persuasive", "careers": "Sales, HR, Teaching, Healthcare"},
          {"area": "Organizational", "signs": "Love planning, detail-oriented, create systems", "careers": "Operations, Project Management, Accounting"},
          {"area": "Technical", "signs": "Like figuring out how things work, comfortable with tech", "careers": "IT, Engineering, Trades, Technical Support"}
        ]
      }
    ]
  }',
  'content',
  1,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'discover-strengths');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'career-path'),
  'High-Demand Career Paths',
  'high-demand-careers',
  '{
    "sections": [
      {
        "type": "text",
        "content": "While following your passion matters, so does market demand. The best career choices combine what you are good at, what you enjoy, and what the world needs (and pays for). Here are fields with strong demand and growth potential."
      },
      {
        "type": "career_paths",
        "title": "Growing Career Fields",
        "paths": [
          {
            "field": "Technology",
            "roles": ["Software Developer", "Data Analyst", "Cybersecurity", "UX Designer"],
            "education": "Bootcamps, certifications, or degree",
            "outlook": "Excellent - tech touches every industry"
          },
          {
            "field": "Healthcare",
            "roles": ["Nursing", "Medical Technology", "Healthcare Administration", "Mental Health"],
            "education": "Certificates to advanced degrees depending on role",
            "outlook": "Strong - aging population driving demand"
          },
          {
            "field": "Skilled Trades",
            "roles": ["Electrician", "Plumber", "HVAC", "Construction Management"],
            "education": "Apprenticeship or trade school",
            "outlook": "Excellent - shortage of skilled workers, cannot be outsourced"
          },
          {
            "field": "Business & Finance",
            "roles": ["Financial Analyst", "Marketing", "Project Manager", "Sales"],
            "education": "Degree helpful but experience valued",
            "outlook": "Steady - every company needs business functions"
          }
        ]
      },
      {
        "type": "tip",
        "content": "You do not have to decide everything now. Start exploring, try internships, talk to people in different careers. Your path will become clearer as you gain experience."
      }
    ]
  }',
  'content',
  2,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'high-demand-careers');

INSERT INTO public.lessons (module_id, title, slug, content, lesson_type, order_index, estimated_minutes, is_published)
SELECT 
  (SELECT id FROM public.modules WHERE slug = 'career-path'),
  'Certifications That Matter',
  'certifications',
  '{
    "sections": [
      {
        "type": "text",
        "content": "Certifications can boost your resume, validate your skills, and sometimes increase your salary - often faster and cheaper than a degree. The right certification depends on your field and career goals."
      },
      {
        "type": "certifications",
        "title": "High-Value Certifications by Field",
        "fields": [
          {
            "field": "Technology",
            "certs": [
              {"name": "Google IT Support", "time": "6 months", "cost": "Free-$49/month", "value": "Entry-level IT jobs"},
              {"name": "AWS Cloud Practitioner", "time": "2-3 months", "cost": "$100 exam", "value": "Cloud computing roles"},
              {"name": "CompTIA A+", "time": "2-4 months", "cost": "$250 exam", "value": "IT technician jobs"}
            ]
          },
          {
            "field": "Data & Analytics",
            "certs": [
              {"name": "Google Data Analytics", "time": "6 months", "cost": "Free-$49/month", "value": "Entry-level data jobs"},
              {"name": "Tableau Desktop Specialist", "time": "1-2 months", "cost": "$100 exam", "value": "Data visualization roles"},
              {"name": "SQL Certification", "time": "1-2 months", "cost": "Free-$200", "value": "Any data-related role"}
            ]
          },
          {
            "field": "Business & Marketing",
            "certs": [
              {"name": "Google Digital Marketing", "time": "40 hours", "cost": "Free", "value": "Marketing roles"},
              {"name": "HubSpot Inbound Marketing", "time": "4-5 hours", "cost": "Free", "value": "Content/marketing jobs"},
              {"name": "PMP (Project Management)", "time": "3-6 months", "cost": "$555 exam", "value": "Project manager roles - $10-20K salary bump"}
            ]
          }
        ]
      }
    ]
  }',
  'content',
  3,
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.lessons WHERE slug = 'certifications');

-- Add achievements for new categories
INSERT INTO public.achievements (name, description, icon, criteria, points) VALUES
('Communication Champion', 'Completed all communication modules', 'MessageCircle', '{"type": "category_complete", "category": "communication"}', 200),
('EQ Master', 'Completed all emotional intelligence modules', 'Brain', '{"type": "category_complete", "category": "eq"}', 200),
('Tech Savvy', 'Completed all technology and AI modules', 'Cpu', '{"type": "category_complete", "category": "tech-ai"}', 200),
('Data Driven', 'Completed all data analytics modules', 'BarChart3', '{"type": "category_complete", "category": "data-analytics"}', 200),
('Sales Star', 'Completed all sales modules', 'TrendingUp', '{"type": "category_complete", "category": "sales"}', 200),
('Marketing Maven', 'Completed all digital marketing modules', 'Share2', '{"type": "category_complete", "category": "digital-marketing"}', 200),
('Career Ready', 'Completed all job-specific skills modules', 'Award', '{"type": "category_complete", "category": "niche-skills"}', 200),
('Elementary Graduate', 'Completed all Elementary to Middle School transition modules', 'GraduationCap', '{"type": "stage_complete", "stage": "elementary-middle"}', 500),
('Middle School Graduate', 'Completed all Middle to High School transition modules', 'GraduationCap', '{"type": "stage_complete", "stage": "middle-high"}', 500)
ON CONFLICT DO NOTHING;
