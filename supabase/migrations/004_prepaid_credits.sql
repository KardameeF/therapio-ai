-- Add prepaid credits and budget cap to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS prepaid_credits INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS prepaid_spent_this_month INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS budget_cap INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS credits_per_message INTEGER NOT NULL DEFAULT 2;

-- prepaid_credits: remaining credits (1 credit = 1 BGN стотинка = 0.01 лв)
-- budget_cap: max credits to spend via prepaid per month (0 = unlimited)
-- credits_per_message: cost in credits per extra message (default 2 = 0.02 лв/msg)
-- prepaid_spent_this_month: resets monthly via scheduled function or on check
