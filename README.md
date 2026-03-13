# Eterapp — Твоят асистент за емоционална подкрепа

AI-powered emotional support web application, bilingual (Bulgarian/English).

## Features
- 💬 **AI Chat** — Empathetic AI conversations with OpenAI
- 📋 **Session Notes** — Auto-generated session summaries (paid plans)
- ✅ **Tasks** — AI-suggested action steps after sessions (paid plans)
- 🎧 **Audio Therapy** — Curated therapeutic audio matched to mood (Expanded Horizons)
- 🎙️ **Voice Assistant** — Bidirectional voice chat with Web Speech API + OpenAI TTS (Expanded Horizons)
- 😊 **Mood Tracking** — Track daily emotional patterns
- 😴 **Sleep & Stress** — Monitor sleep and stress levels
- 🎯 **Goals** — Set and track personal wellness goals
- 📊 **Dashboard** — AI insights based on your data
- 🌐 **Bilingual** — Full BG/EN support
- 🌙 **Dark/Light Theme**
- 💳 **Stripe Billing** — Subscriptions + prepaid credits
- 💰 **Budget Cap** — Set monthly spending limit for extra messages
- 🔐 **Google OAuth + reCAPTCHA v3**

## Tech Stack
- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: Netlify Functions (TypeScript)
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **AI**: OpenAI (chat, TTS, Whisper STT), ElevenLabs (planned)
- **Payments**: Stripe (subscriptions + one-time prepaid)
- **Monitoring**: Sentry
- **i18n**: i18next (BG + EN)

## Quick Start

### 1. Install
```bash
npm install
```

### 2. Environment Setup
```bash
cp env.example .env
```

Fill in `.env`:
```bash
# Supabase
VITE_SUPABASE_URL=https://vhzaxxmirscnhgwwpjqx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Supabase (server-side — for Netlify functions, NO VITE_ prefix)
SUPABASE_URL=https://vhzaxxmirscnhgwwpjqx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI
OPENAI_API_KEY=sk-...

# Other
VITE_SENTRY_DSN=your_sentry_dsn
VITE_RECAPTCHA_KEY=your_recaptcha_site_key
```

### 3. Run Development Server
```bash
netlify dev
```
Opens at http://localhost:8888

> ⚠️ Use `netlify dev`, NOT `npm run dev` — Netlify dev loads env vars and runs functions correctly.

## Subscription Plans
| Plan | Messages/month | Price (EUR) | Price (BGN) | Features |
|---|---|---|---|---|
| Free | 30 | Free | Free | AI chat |
| Първа Стъпка | 500 | €19.99/mo | ~39.99 лв/мес | + Notes, Tasks |
| Expanded Horizons | 1500 | €39.99/mo | ~78.22 лв/мес | + Audio, Voice |

**Prepaid credits**: Extra messages at €0.02 each (~0.04 лв). Top up €5/€10/€20 via Stripe.

## Project Structure
```
netlify/functions/   — Server-side functions (chat, TTS, Stripe, etc.)
src/
  components/        — Reusable UI components
  pages/             — Route pages (chat, billing, profile, features, etc.)
  layouts/           — App layout with sidebar
  hooks/             — Custom React hooks
  lib/               — i18n, Supabase client, utils
public/              — Static assets
supabase/migrations/ — DB migrations (apply manually in Supabase SQL Editor)
```

## Database Migrations
Apply in Supabase SQL Editor in order:

1. `001_base_schema.sql` — profiles, RLS
2. `002_chat_sessions.sql` — chat_sessions, chat_messages
3. `003_session_notes_tasks_therapy_audio.sql` — notes, tasks, audio tables
4. `004_prepaid_credits.sql` — prepaid_credits, budget_cap columns
