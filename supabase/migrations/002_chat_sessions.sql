-- Fix: chat_sessions — uuid id + updated_at
-- Run in Supabase SQL Editor if table was created with wrong schema (int8 id, missing updated_at)

DROP TABLE IF EXISTS chat_sessions CASCADE;

CREATE TABLE chat_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT 'Нов чат',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own sessions"
  ON chat_sessions FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX chat_sessions_user_id_idx ON chat_sessions(user_id);
CREATE INDEX chat_sessions_updated_at_idx ON chat_sessions(updated_at DESC);

-- Drop old session_id if it had wrong type (int8), then add correct uuid
ALTER TABLE chat_messages DROP COLUMN IF EXISTS session_id;
ALTER TABLE chat_messages
  ADD COLUMN session_id uuid REFERENCES chat_sessions(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS chat_messages_session_id_idx ON chat_messages(session_id);
