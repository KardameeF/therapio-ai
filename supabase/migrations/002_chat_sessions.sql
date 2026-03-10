-- Chat sessions table for per-conversation titles
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT 'Нов чат',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own sessions"
  ON chat_sessions FOR ALL
  USING (auth.uid() = user_id);

-- Add session_id to chat_messages if it doesn't exist
ALTER TABLE chat_messages
  ADD COLUMN IF NOT EXISTS session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE;

-- Indexes
CREATE INDEX IF NOT EXISTS chat_sessions_user_id_idx
  ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS chat_messages_session_id_idx
  ON chat_messages(session_id);
