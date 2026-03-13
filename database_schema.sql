-- Database Schema for Notifications

CREATE TABLE IF NOT EXISTS notifications_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL,
  title text NOT NULL,
  body text,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_notification_settings (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  enabled boolean DEFAULT true,
  faculdade boolean DEFAULT true,
  academia boolean DEFAULT true,
  sono boolean DEFAULT true,
  nutricao boolean DEFAULT true,
  haircare boolean DEFAULT true,
  financas boolean DEFAULT true,
  hora_dormir text DEFAULT '22:00',
  hora_treino_lembrete text DEFAULT '16:30',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE notifications_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notification_settings ENABLE ROW LEVEL SECURITY;

-- If policies already exist, these might fail, but they are safe for a first run.
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'user own notifications') THEN
        CREATE POLICY "user own notifications" ON notifications_history
          FOR ALL USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'user own settings') THEN
        CREATE POLICY "user own settings" ON user_notification_settings
          FOR ALL USING (auth.uid() = user_id);
    END IF;
END $$;
