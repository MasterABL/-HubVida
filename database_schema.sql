-- Study Progress Table
CREATE TABLE IF NOT EXISTS study_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  disciplina text NOT NULL,
  quiz_score integer DEFAULT 0,
  quiz_total integer DEFAULT 0,
  ultima_sessao timestamptz DEFAULT now(),
  paginas_visitadas text[] DEFAULT '{}',
  UNIQUE(user_id, disciplina)
);

ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user own progress" ON study_progress
  FOR ALL USING (auth.uid() = user_id);
