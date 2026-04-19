-- Transition OS - Profile Auto-Creation Trigger
-- This trigger automatically creates a profile and user_stats when a new user signs up

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create the profile
  INSERT INTO public.profiles (id, email, full_name, role, onboarding_completed)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'student'),
    FALSE
  )
  ON CONFLICT (id) DO NOTHING;

  -- Create user stats
  INSERT INTO public.user_stats (user_id, total_xp, current_level)
  VALUES (NEW.id, 0, 1)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- AUTO-UPDATE USER STATS ON LESSON COMPLETION
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_lesson_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  lesson_xp INTEGER;
  new_total_xp INTEGER;
  new_level INTEGER;
BEGIN
  -- Get XP reward for the lesson
  SELECT xp_reward INTO lesson_xp FROM lessons WHERE id = NEW.lesson_id;
  
  -- Update user stats
  UPDATE user_stats
  SET 
    total_xp = total_xp + COALESCE(lesson_xp, 10),
    total_lessons_completed = total_lessons_completed + 1,
    total_time_spent_minutes = total_time_spent_minutes + COALESCE(NEW.time_spent_seconds / 60, 0),
    last_activity_date = CURRENT_DATE,
    current_streak_days = CASE 
      WHEN last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN current_streak_days + 1
      WHEN last_activity_date = CURRENT_DATE THEN current_streak_days
      ELSE 1
    END,
    longest_streak_days = GREATEST(longest_streak_days, 
      CASE 
        WHEN last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN current_streak_days + 1
        ELSE current_streak_days
      END
    )
  WHERE user_id = NEW.user_id
  RETURNING total_xp INTO new_total_xp;

  -- Calculate new level (every 500 XP = 1 level)
  new_level := GREATEST(1, FLOOR(new_total_xp / 500) + 1);
  
  UPDATE user_stats
  SET current_level = new_level
  WHERE user_id = NEW.user_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_lesson_completed ON lesson_completions;

CREATE TRIGGER on_lesson_completed
  AFTER INSERT ON lesson_completions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_lesson_completion();

-- ============================================
-- AUTO-UPDATE USER STATS ON SIMULATION COMPLETION
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_simulation_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE user_stats
  SET 
    total_simulations_completed = total_simulations_completed + 1,
    total_xp = total_xp + 50, -- Base XP for completing a simulation
    total_time_spent_minutes = total_time_spent_minutes + COALESCE(NEW.time_spent_seconds / 60, 0),
    last_activity_date = CURRENT_DATE
  WHERE user_id = NEW.user_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_simulation_completed ON simulation_results;

CREATE TRIGGER on_simulation_completed
  AFTER INSERT ON simulation_results
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_simulation_completion();

-- ============================================
-- AUTO-UPDATE COURSE PROGRESS
-- ============================================
CREATE OR REPLACE FUNCTION public.update_course_progress()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_course_id UUID;
  v_module_id UUID;
  total_lessons INTEGER;
  completed_lessons INTEGER;
  progress DECIMAL(5,2);
BEGIN
  -- Get module and course IDs
  SELECT l.module_id, m.course_id 
  INTO v_module_id, v_course_id
  FROM lessons l
  JOIN modules m ON l.module_id = m.id
  WHERE l.id = NEW.lesson_id;

  -- Count total and completed lessons for this course
  SELECT COUNT(*) INTO total_lessons
  FROM lessons l
  JOIN modules m ON l.module_id = m.id
  WHERE m.course_id = v_course_id;

  SELECT COUNT(*) INTO completed_lessons
  FROM lesson_completions lc
  JOIN lessons l ON lc.lesson_id = l.id
  JOIN modules m ON l.module_id = m.id
  WHERE m.course_id = v_course_id AND lc.user_id = NEW.user_id;

  -- Calculate progress percentage
  progress := (completed_lessons::DECIMAL / NULLIF(total_lessons, 0)::DECIMAL) * 100;

  -- Update or insert progress
  INSERT INTO user_progress (user_id, course_id, current_module_id, current_lesson_id, progress_percentage, started_at, completed_at)
  VALUES (
    NEW.user_id, 
    v_course_id, 
    v_module_id, 
    NEW.lesson_id, 
    progress,
    NOW(),
    CASE WHEN progress >= 100 THEN NOW() ELSE NULL END
  )
  ON CONFLICT (user_id, course_id) 
  DO UPDATE SET 
    current_module_id = v_module_id,
    current_lesson_id = NEW.lesson_id,
    progress_percentage = progress,
    completed_at = CASE WHEN progress >= 100 THEN NOW() ELSE NULL END;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_lesson_completion_progress ON lesson_completions;

CREATE TRIGGER on_lesson_completion_progress
  AFTER INSERT ON lesson_completions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_course_progress();
