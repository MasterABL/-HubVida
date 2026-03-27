-- Script de Criação de Tabelas do Módulo Faculdade
-- Execute este script no SQL Editor do Supabase

-- 1. disciplines
CREATE TABLE IF NOT EXISTS public.disciplines (
    id UUID DEFAULT auth.uid() NOT NULL, -- será substituído pelo id correto, que é gerado na inserção
    user_id UUID REFERENCES auth.users NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT,
    semester TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id)
);

-- Correção no default do ID
ALTER TABLE public.disciplines ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- 2. topics
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    discipline_id UUID REFERENCES public.disciplines(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id)
);

-- 3. topic_notes
CREATE TABLE IF NOT EXISTS public.topic_notes (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users NOT NULL,
    content TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id),
    UNIQUE(topic_id, user_id)
);

-- 4. as_items
CREATE TABLE IF NOT EXISTS public.as_items (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    discipline_id UUID REFERENCES public.disciplines(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users NOT NULL,
    title TEXT NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id)
);

-- 5. free_notes
CREATE TABLE IF NOT EXISTS public.free_notes (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    discipline_id UUID REFERENCES public.disciplines(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users NOT NULL,
    content TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id),
    UNIQUE(discipline_id, user_id)
);

-- 6. spaced_reviews
CREATE TABLE IF NOT EXISTS public.spaced_reviews (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users NOT NULL,
    next_review_date DATE NOT NULL,
    interval_days INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE(topic_id, user_id)
);

-- 7. pomodoro_sessions
CREATE TABLE IF NOT EXISTS public.pomodoro_sessions (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID REFERENCES auth.users NOT NULL,
    discipline_id UUID REFERENCES public.disciplines(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
    duration_minutes INTEGER NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id)
);

-- HABILITAR ROW LEVEL SECURITY (RLS)

ALTER TABLE public.disciplines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.as_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.free_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaced_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pomodoro_sessions ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS RLS (Garantem que os usuários só acessem e modifiquem seus próprios dados)

-- Policies para disciplines
CREATE POLICY "Users can manage their own disciplines" 
ON public.disciplines FOR ALL USING (auth.uid() = user_id);

-- Policies para topics (Checa o dono da disciplina atrelada, ou adicionamos user_id direto no DB. Como não há user_id na especificação, fazemos JOIN na policy)
CREATE POLICY "Users can manage their topics" 
ON public.topics FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.disciplines d 
    WHERE d.id = topics.discipline_id AND d.user_id = auth.uid()
  )
);

-- Policies para topic_notes
CREATE POLICY "Users can manage their topic notes" 
ON public.topic_notes FOR ALL USING (auth.uid() = user_id);

-- Policies para as_items
CREATE POLICY "Users can manage their as items" 
ON public.as_items FOR ALL USING (auth.uid() = user_id);

-- Policies para free_notes
CREATE POLICY "Users can manage their free notes" 
ON public.free_notes FOR ALL USING (auth.uid() = user_id);

-- Policies para spaced_reviews
CREATE POLICY "Users can manage their spaced reviews" 
ON public.spaced_reviews FOR ALL USING (auth.uid() = user_id);

-- Policies para pomodoro_sessions
CREATE POLICY "Users can manage their pomodoro sessions" 
ON public.pomodoro_sessions FOR ALL USING (auth.uid() = user_id);
