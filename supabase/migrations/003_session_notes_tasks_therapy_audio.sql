-- Migration: session_notes, session_tasks, therapy_audio, user_therapy_sessions
-- + preferred_voice_gender column on profiles

-- Enum for voice gender
CREATE TYPE voice_gender AS ENUM ('male', 'female');

-- 1. session_notes — automatic notes after a chat session
CREATE TABLE session_notes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  chat_session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own session notes"
  ON session_notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE INDEX session_notes_user_id_idx ON session_notes(user_id);
CREATE INDEX session_notes_chat_session_id_idx ON session_notes(chat_session_id);

-- 2. session_tasks — tasks generated after a chat session
CREATE TABLE session_tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  chat_session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  is_completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE session_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own session tasks"
  ON session_tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own session tasks completion"
  ON session_tasks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX session_tasks_user_id_idx ON session_tasks(user_id);
CREATE INDEX session_tasks_chat_session_id_idx ON session_tasks(chat_session_id);

-- 3. therapy_audio — pre-generated therapy audio library (admin-managed, read-only for users)
CREATE TABLE therapy_audio (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  condition text NOT NULL,
  voice_gender voice_gender NOT NULL,
  title text NOT NULL,
  description text,
  duration_seconds integer NOT NULL,
  storage_path text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE therapy_audio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read therapy audio"
  ON therapy_audio FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE INDEX therapy_audio_condition_idx ON therapy_audio(condition);
CREATE INDEX therapy_audio_voice_gender_idx ON therapy_audio(voice_gender);

-- 4. user_therapy_sessions — tracks which therapy was sent to which user
CREATE TABLE user_therapy_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  chat_session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
  therapy_audio_id uuid REFERENCES therapy_audio(id) ON DELETE CASCADE NOT NULL,
  sent_at timestamptz DEFAULT now(),
  listened_at timestamptz
);

ALTER TABLE user_therapy_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own therapy sessions"
  ON user_therapy_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE INDEX user_therapy_sessions_user_id_idx ON user_therapy_sessions(user_id);
CREATE INDEX user_therapy_sessions_chat_session_id_idx ON user_therapy_sessions(chat_session_id);

-- 5. Add preferred_voice_gender to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS preferred_voice_gender voice_gender NOT NULL DEFAULT 'female';
