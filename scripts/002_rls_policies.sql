-- Transition OS - Row Level Security Policies
-- Version 1.0.0

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is org admin for a specific org
CREATE OR REPLACE FUNCTION is_org_admin(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM organization_members 
    WHERE organization_id = org_id 
    AND user_id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is parent of a child
CREATE OR REPLACE FUNCTION is_parent_of(child_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM family_members fm_parent
    JOIN family_members fm_child ON fm_parent.family_id = fm_child.family_id
    WHERE fm_parent.user_id = auth.uid() 
    AND fm_parent.role = 'parent'
    AND fm_child.user_id = child_user_id 
    AND fm_child.role = 'child'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is member of an org
CREATE OR REPLACE FUNCTION is_org_member(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM organization_members 
    WHERE organization_id = org_id 
    AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- PROFILES POLICIES
-- ============================================
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles 
  FOR SELECT USING (
    auth.uid() = id 
    OR is_super_admin() 
    OR is_parent_of(id)
    OR EXISTS (
      SELECT 1 FROM organization_members om1
      JOIN organization_members om2 ON om1.organization_id = om2.organization_id
      WHERE om1.user_id = auth.uid() 
      AND om1.role IN ('admin', 'instructor')
      AND om2.user_id = profiles.id
    )
  );

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles 
  FOR UPDATE USING (auth.uid() = id OR is_super_admin());

-- ============================================
-- ORGANIZATIONS POLICIES
-- ============================================
DROP POLICY IF EXISTS "organizations_select" ON organizations;
CREATE POLICY "organizations_select" ON organizations 
  FOR SELECT USING (
    is_super_admin() 
    OR is_org_member(id)
  );

DROP POLICY IF EXISTS "organizations_insert" ON organizations;
CREATE POLICY "organizations_insert" ON organizations 
  FOR INSERT WITH CHECK (is_super_admin() OR auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "organizations_update" ON organizations;
CREATE POLICY "organizations_update" ON organizations 
  FOR UPDATE USING (is_super_admin() OR is_org_admin(id));

DROP POLICY IF EXISTS "organizations_delete" ON organizations;
CREATE POLICY "organizations_delete" ON organizations 
  FOR DELETE USING (is_super_admin());

-- ============================================
-- ORGANIZATION MEMBERS POLICIES
-- ============================================
DROP POLICY IF EXISTS "org_members_select" ON organization_members;
CREATE POLICY "org_members_select" ON organization_members 
  FOR SELECT USING (
    is_super_admin() 
    OR is_org_member(organization_id)
  );

DROP POLICY IF EXISTS "org_members_insert" ON organization_members;
CREATE POLICY "org_members_insert" ON organization_members 
  FOR INSERT WITH CHECK (
    is_super_admin() 
    OR is_org_admin(organization_id)
  );

DROP POLICY IF EXISTS "org_members_update" ON organization_members;
CREATE POLICY "org_members_update" ON organization_members 
  FOR UPDATE USING (
    is_super_admin() 
    OR is_org_admin(organization_id)
  );

DROP POLICY IF EXISTS "org_members_delete" ON organization_members;
CREATE POLICY "org_members_delete" ON organization_members 
  FOR DELETE USING (
    is_super_admin() 
    OR is_org_admin(organization_id) 
    OR user_id = auth.uid()
  );

-- ============================================
-- FAMILY GROUPS POLICIES
-- ============================================
DROP POLICY IF EXISTS "family_groups_select" ON family_groups;
CREATE POLICY "family_groups_select" ON family_groups 
  FOR SELECT USING (
    is_super_admin()
    OR created_by = auth.uid()
    OR id IN (SELECT family_id FROM family_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "family_groups_insert" ON family_groups;
CREATE POLICY "family_groups_insert" ON family_groups 
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "family_groups_update" ON family_groups;
CREATE POLICY "family_groups_update" ON family_groups 
  FOR UPDATE USING (created_by = auth.uid() OR is_super_admin());

DROP POLICY IF EXISTS "family_groups_delete" ON family_groups;
CREATE POLICY "family_groups_delete" ON family_groups 
  FOR DELETE USING (created_by = auth.uid() OR is_super_admin());

-- ============================================
-- FAMILY MEMBERS POLICIES
-- ============================================
DROP POLICY IF EXISTS "family_members_select" ON family_members;
CREATE POLICY "family_members_select" ON family_members 
  FOR SELECT USING (
    is_super_admin()
    OR user_id = auth.uid()
    OR family_id IN (SELECT family_id FROM family_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "family_members_insert" ON family_members;
CREATE POLICY "family_members_insert" ON family_members 
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR family_id IN (
      SELECT id FROM family_groups WHERE created_by = auth.uid()
    )
    OR family_id IN (
      SELECT family_id FROM family_members 
      WHERE user_id = auth.uid() AND role = 'parent'
    )
  );

DROP POLICY IF EXISTS "family_members_delete" ON family_members;
CREATE POLICY "family_members_delete" ON family_members 
  FOR DELETE USING (
    is_super_admin()
    OR family_id IN (
      SELECT family_id FROM family_members 
      WHERE user_id = auth.uid() AND role = 'parent'
    )
  );

-- ============================================
-- COURSE CATEGORIES POLICIES (public read)
-- ============================================
DROP POLICY IF EXISTS "categories_select_all" ON course_categories;
CREATE POLICY "categories_select_all" ON course_categories 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "categories_manage" ON course_categories;
CREATE POLICY "categories_manage" ON course_categories 
  FOR ALL USING (is_super_admin());

-- ============================================
-- COURSES POLICIES
-- ============================================
DROP POLICY IF EXISTS "courses_select" ON courses;
CREATE POLICY "courses_select" ON courses 
  FOR SELECT USING (
    is_published = true 
    OR is_super_admin()
    OR created_by = auth.uid()
  );

DROP POLICY IF EXISTS "courses_insert" ON courses;
CREATE POLICY "courses_insert" ON courses 
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('instructor', 'org_admin'))
  );

DROP POLICY IF EXISTS "courses_update" ON courses;
CREATE POLICY "courses_update" ON courses 
  FOR UPDATE USING (
    is_super_admin() 
    OR created_by = auth.uid()
  );

DROP POLICY IF EXISTS "courses_delete" ON courses;
CREATE POLICY "courses_delete" ON courses 
  FOR DELETE USING (is_super_admin());

-- ============================================
-- MODULES POLICIES
-- ============================================
DROP POLICY IF EXISTS "modules_select" ON modules;
CREATE POLICY "modules_select" ON modules 
  FOR SELECT USING (
    course_id IN (SELECT id FROM courses WHERE is_published = true)
    OR is_super_admin()
    OR course_id IN (SELECT id FROM courses WHERE created_by = auth.uid())
  );

DROP POLICY IF EXISTS "modules_manage" ON modules;
CREATE POLICY "modules_manage" ON modules 
  FOR ALL USING (
    is_super_admin()
    OR course_id IN (SELECT id FROM courses WHERE created_by = auth.uid())
  );

-- ============================================
-- LESSONS POLICIES
-- ============================================
DROP POLICY IF EXISTS "lessons_select" ON lessons;
CREATE POLICY "lessons_select" ON lessons 
  FOR SELECT USING (
    module_id IN (
      SELECT m.id FROM modules m 
      JOIN courses c ON m.course_id = c.id 
      WHERE c.is_published = true
    )
    OR is_super_admin()
    OR module_id IN (
      SELECT m.id FROM modules m 
      JOIN courses c ON m.course_id = c.id 
      WHERE c.created_by = auth.uid()
    )
  );

DROP POLICY IF EXISTS "lessons_manage" ON lessons;
CREATE POLICY "lessons_manage" ON lessons 
  FOR ALL USING (
    is_super_admin()
    OR module_id IN (
      SELECT m.id FROM modules m 
      JOIN courses c ON m.course_id = c.id 
      WHERE c.created_by = auth.uid()
    )
  );

-- ============================================
-- SIMULATIONS POLICIES
-- ============================================
DROP POLICY IF EXISTS "simulations_select" ON simulations;
CREATE POLICY "simulations_select" ON simulations 
  FOR SELECT USING (
    is_standalone = true
    OR is_super_admin()
    OR lesson_id IN (
      SELECT l.id FROM lessons l
      JOIN modules m ON l.module_id = m.id
      JOIN courses c ON m.course_id = c.id
      WHERE c.is_published = true
    )
  );

DROP POLICY IF EXISTS "simulations_manage" ON simulations;
CREATE POLICY "simulations_manage" ON simulations 
  FOR ALL USING (is_super_admin());

-- ============================================
-- USER PROGRESS POLICIES
-- ============================================
DROP POLICY IF EXISTS "user_progress_select" ON user_progress;
CREATE POLICY "user_progress_select" ON user_progress 
  FOR SELECT USING (
    user_id = auth.uid() 
    OR is_super_admin()
    OR is_parent_of(user_id)
    OR EXISTS (
      SELECT 1 FROM organization_members om1
      JOIN organization_members om2 ON om1.organization_id = om2.organization_id
      WHERE om1.user_id = auth.uid() 
      AND om1.role IN ('admin', 'instructor')
      AND om2.user_id = user_progress.user_id
    )
  );

DROP POLICY IF EXISTS "user_progress_insert" ON user_progress;
CREATE POLICY "user_progress_insert" ON user_progress 
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "user_progress_update" ON user_progress;
CREATE POLICY "user_progress_update" ON user_progress 
  FOR UPDATE USING (user_id = auth.uid() OR is_super_admin());

-- ============================================
-- LESSON COMPLETIONS POLICIES
-- ============================================
DROP POLICY IF EXISTS "lesson_completions_select" ON lesson_completions;
CREATE POLICY "lesson_completions_select" ON lesson_completions 
  FOR SELECT USING (
    user_id = auth.uid() 
    OR is_super_admin()
    OR is_parent_of(user_id)
  );

DROP POLICY IF EXISTS "lesson_completions_insert" ON lesson_completions;
CREATE POLICY "lesson_completions_insert" ON lesson_completions 
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "lesson_completions_update" ON lesson_completions;
CREATE POLICY "lesson_completions_update" ON lesson_completions 
  FOR UPDATE USING (user_id = auth.uid());

-- ============================================
-- SIMULATION RESULTS POLICIES
-- ============================================
DROP POLICY IF EXISTS "simulation_results_select" ON simulation_results;
CREATE POLICY "simulation_results_select" ON simulation_results 
  FOR SELECT USING (
    user_id = auth.uid() 
    OR is_super_admin()
    OR is_parent_of(user_id)
  );

DROP POLICY IF EXISTS "simulation_results_insert" ON simulation_results;
CREATE POLICY "simulation_results_insert" ON simulation_results 
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- ============================================
-- ACHIEVEMENTS POLICIES (public read)
-- ============================================
DROP POLICY IF EXISTS "achievements_select" ON achievements;
CREATE POLICY "achievements_select" ON achievements 
  FOR SELECT USING (is_secret = false OR is_super_admin());

DROP POLICY IF EXISTS "achievements_manage" ON achievements;
CREATE POLICY "achievements_manage" ON achievements 
  FOR ALL USING (is_super_admin());

-- ============================================
-- USER ACHIEVEMENTS POLICIES
-- ============================================
DROP POLICY IF EXISTS "user_achievements_select" ON user_achievements;
CREATE POLICY "user_achievements_select" ON user_achievements 
  FOR SELECT USING (
    user_id = auth.uid() 
    OR is_super_admin()
    OR is_parent_of(user_id)
  );

DROP POLICY IF EXISTS "user_achievements_insert" ON user_achievements;
CREATE POLICY "user_achievements_insert" ON user_achievements 
  FOR INSERT WITH CHECK (user_id = auth.uid() OR is_super_admin());

-- ============================================
-- USER STATS POLICIES
-- ============================================
DROP POLICY IF EXISTS "user_stats_select" ON user_stats;
CREATE POLICY "user_stats_select" ON user_stats 
  FOR SELECT USING (
    user_id = auth.uid() 
    OR is_super_admin()
    OR is_parent_of(user_id)
  );

DROP POLICY IF EXISTS "user_stats_insert" ON user_stats;
CREATE POLICY "user_stats_insert" ON user_stats 
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "user_stats_update" ON user_stats;
CREATE POLICY "user_stats_update" ON user_stats 
  FOR UPDATE USING (user_id = auth.uid() OR is_super_admin());

-- ============================================
-- SUBSCRIPTIONS POLICIES
-- ============================================
DROP POLICY IF EXISTS "subscriptions_select" ON subscriptions;
CREATE POLICY "subscriptions_select" ON subscriptions 
  FOR SELECT USING (user_id = auth.uid() OR is_super_admin());

DROP POLICY IF EXISTS "subscriptions_manage" ON subscriptions;
CREATE POLICY "subscriptions_manage" ON subscriptions 
  FOR ALL USING (is_super_admin());

-- ============================================
-- CERTIFICATES POLICIES
-- ============================================
DROP POLICY IF EXISTS "certificates_select" ON certificates;
CREATE POLICY "certificates_select" ON certificates 
  FOR SELECT USING (
    user_id = auth.uid() 
    OR is_super_admin()
    OR is_parent_of(user_id)
  );

DROP POLICY IF EXISTS "certificates_manage" ON certificates;
CREATE POLICY "certificates_manage" ON certificates 
  FOR ALL USING (is_super_admin());

-- ============================================
-- PARENT ASSIGNMENTS POLICIES
-- ============================================
DROP POLICY IF EXISTS "parent_assignments_select" ON parent_assignments;
CREATE POLICY "parent_assignments_select" ON parent_assignments 
  FOR SELECT USING (
    parent_id = auth.uid() 
    OR child_id = auth.uid()
    OR is_super_admin()
  );

DROP POLICY IF EXISTS "parent_assignments_insert" ON parent_assignments;
CREATE POLICY "parent_assignments_insert" ON parent_assignments 
  FOR INSERT WITH CHECK (
    parent_id = auth.uid() 
    AND is_parent_of(child_id)
  );

DROP POLICY IF EXISTS "parent_assignments_update" ON parent_assignments;
CREATE POLICY "parent_assignments_update" ON parent_assignments 
  FOR UPDATE USING (parent_id = auth.uid() OR child_id = auth.uid());

DROP POLICY IF EXISTS "parent_assignments_delete" ON parent_assignments;
CREATE POLICY "parent_assignments_delete" ON parent_assignments 
  FOR DELETE USING (parent_id = auth.uid() OR is_super_admin());

-- ============================================
-- NOTIFICATIONS POLICIES
-- ============================================
DROP POLICY IF EXISTS "notifications_select" ON notifications;
CREATE POLICY "notifications_select" ON notifications 
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "notifications_insert" ON notifications;
CREATE POLICY "notifications_insert" ON notifications 
  FOR INSERT WITH CHECK (is_super_admin() OR user_id = auth.uid());

DROP POLICY IF EXISTS "notifications_update" ON notifications;
CREATE POLICY "notifications_update" ON notifications 
  FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "notifications_delete" ON notifications;
CREATE POLICY "notifications_delete" ON notifications 
  FOR DELETE USING (user_id = auth.uid() OR is_super_admin());

-- ============================================
-- ACTIVITY LOG POLICIES
-- ============================================
DROP POLICY IF EXISTS "activity_log_select" ON activity_log;
CREATE POLICY "activity_log_select" ON activity_log 
  FOR SELECT USING (user_id = auth.uid() OR is_super_admin());

DROP POLICY IF EXISTS "activity_log_insert" ON activity_log;
CREATE POLICY "activity_log_insert" ON activity_log 
  FOR INSERT WITH CHECK (user_id = auth.uid() OR is_super_admin());
