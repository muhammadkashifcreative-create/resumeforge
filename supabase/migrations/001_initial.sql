CREATE TABLE resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Untitled Resume',
  template_id text NOT NULL DEFAULT 'classic-01',
  theme jsonb DEFAULT '{"primary":"#2563eb","font":"Inter"}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE resume_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id uuid REFERENCES resumes(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  order_index int NOT NULL DEFAULT 0,
  is_visible boolean DEFAULT true
);

CREATE TABLE ai_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date date NOT NULL DEFAULT current_date,
  count int NOT NULL DEFAULT 0,
  UNIQUE (user_id, usage_date)
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own resumes"
  ON resumes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes"
  ON resumes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes"
  ON resumes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes"
  ON resumes FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own sections"
  ON resume_sections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = resume_sections.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own sections"
  ON resume_sections FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = resume_sections.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own sections"
  ON resume_sections FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = resume_sections.resume_id
      AND resumes.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = resume_sections.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own sections"
  ON resume_sections FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = resume_sections.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can read own usage"
  ON ai_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own usage"
  ON ai_usage FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX resume_sections_resume_id_order_idx ON resume_sections (resume_id, order_index);
CREATE INDEX resumes_user_id_updated_at_idx ON resumes (user_id, updated_at DESC);
CREATE UNIQUE INDEX resume_sections_resume_id_type_unique_idx ON resume_sections (resume_id, type);
