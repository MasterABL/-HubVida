-- VERIFICAR SE EXISTE E CRIAR study_progress
CREATE TABLE IF NOT EXISTS public.study_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  disciplina TEXT NOT NULL,
  quiz_score INT DEFAULT 0,
  quiz_total INT DEFAULT 0,
  ultima_sessao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, disciplina)
);

-- HABILITAR RLS
ALTER TABLE public.study_progress ENABLE ROW LEVEL SECURITY;

-- CRIAR POLICIES
DROP POLICY IF EXISTS "Users can read own study_progress" ON public.study_progress;
CREATE POLICY "Users can read own study_progress"
  ON public.study_progress
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own study_progress" ON public.study_progress;
CREATE POLICY "Users can insert own study_progress"
  ON public.study_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own study_progress" ON public.study_progress;
CREATE POLICY "Users can update own study_progress"
  ON public.study_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
