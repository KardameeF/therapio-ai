# CONTEXT — Eterapp Development

This document provides context for Cursor when generating code for Eterapp.

## Overview
Eterapp is a bilingual (BG/EN) emotional-support web application (non-medical, no diagnoses). It features:
- Auth (email + Google OAuth) with reCAPTCHA v3
- Subscription plans with Stripe (Free / Първа Стъпка / Expanded Horizons)
- Prepaid credits system with budget cap for extra messages beyond plan limits
- Supabase for auth, PostgreSQL database, RLS
- OpenAI API (chat completions + TTS via tts-1) for AI chat and voice assistant
- ElevenLabs for therapeutic audio (planned)
- Web Speech API for speech-to-text (STT)
- Dark/light themes, modern UI with Vite + React + TypeScript + Tailwind + shadcn/ui + i18next
- Netlify hosting (functions for server-side logic), Sentry monitoring

## Architecture
Frontend (React/Vite) → Netlify Functions → Supabase (Auth + DB) + OpenAI API + Stripe

## Supabase Project
- Project ID: vhzaxxmirscnhgwwpjqx
- URL: https://vhzaxxmirscnhgwwpjqx.supabase.co
- Project name: therapio-prod

## Database Schema (profiles table key columns)
- subscription_plan: 'first_step' | 'personal_growth' | 'expanded_horizons' (default: 'first_step')
- messages_used: integer (monthly counter, default 0)
- preferred_voice_gender: 'male' | 'female' (default 'female')
- prepaid_credits: integer — remaining credits (100 credits = €1 / ~1.96 лв)
- prepaid_spent_this_month: integer — resets monthly
- budget_cap: integer — max credits/month via prepaid (0 = no cap)
- credits_per_message: integer — cost per extra message (default 2 = €0.02 / ~0.04 лв)
- role: 'user' | 'admin'

## Additional Tables
- chat_sessions (id: bigint, user_id, title, updated_at)
- chat_messages (id, session_id, role, content, created_at)
- session_notes (id, chat_session_id: bigint, user_id, content, created_at)
- session_tasks (id, chat_session_id: bigint, user_id, title, is_completed, completed_at, created_at)
- therapy_audio (id, condition, voice_gender, language, title, description, storage_path, duration_seconds)
- user_therapy_sessions (id, user_id, chat_session_id: bigint, therapy_audio_id, listened_at)

## Subscription Plans & Message Limits
| Plan | Messages/month | Price (EUR) | Price (BGN) |
|---|---|---|---|
| Free (first_step) | 30 | Free | Free |
| Първа Стъпка (personal_growth) | 500 | €19.99/month | ~39.99 лв/месец |
| Expanded Horizons (expanded_horizons) | 1500 | €39.99/month | ~78.22 лв/месец |

Extra messages beyond plan limit: deducted from prepaid_credits (2 credits = €0.02 each).

## Plan Features
- Free: AI chat only
- Първа Стъпка: + Session notes (📋), Tasks (✅), 90-day history
- Expanded Horizons: + Audio therapy (🎧), Voice assistant (🎙️), 180-day history

## Netlify Functions
- chat.ts — OpenAI chat completions, enforces message limits server-side, increments messages_used
- generate-title.ts — Auto-generates chat session titles via GPT
- create-checkout.ts — Stripe subscription checkout
- create-prepaid-checkout.ts — Stripe one-time prepaid credits purchase
- billing-portal.ts — Stripe customer portal
- stripe-webhook.ts — Handles subscription events + prepaid credit top-ups
- tts.ts — OpenAI TTS (text-to-speech) for voice assistant
- transcribe.ts — OpenAI Whisper STT
- verify-captcha.ts — reCAPTCHA v3 verification

## Admin Panel
Protected /admin route (profiles.role = 'admin').
Displays: user list, subscription plans, usage counters, feature flags.
Actions: reset usage counters, grant admin role, export CSV.

## Important Rules for Cursor
- NEVER use Edge Functions — all server logic is in netlify/functions/
- Netlify functions use non-VITE_ env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, STRIPE_SECRET_KEY, OPENAI_API_KEY
- Frontend uses VITE_ prefixed vars: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, etc.
- All user-facing text must be in i18n (EN + BG) via src/lib/i18n.ts
- chat_sessions.id is BIGINT (not UUID) — foreign keys must use BIGINT
- Run locally with: netlify dev (not npm run dev) — this loads .env and runs functions
- Prices are displayed in EUR (€) as primary currency, with BGN (лв) shown in parentheses
