# CONTEXT – Therapio.ai Development

This document provides the context for Cursor when generating code for Therapio.ai.

## Overview
Therapio.ai is a bilingual (BG/EN) emotional-support web application (non-medical, no diagnoses). It features:
- Auth (email + Google/Facebook/Apple) with reCAPTCHA v3
- Subscription plans with Stripe (First Step / Personal Growth / Expanded Horizons)
- Supabase for authentication, Postgres, RLS, Edge Functions
- OpenAI API (ChatGPT models) for chat functionality (per plan limits)
- Dark/Light themes, modern UI built with Vite + React + TypeScript + Tailwind + shadcn/ui + i18next
- Netlify hosting and Sentry monitoring

## Architecture
Frontend (Netlify + React) ↔ Supabase (Auth, DB, Edge Functions) ↔ Stripe (Checkout, Billing Portal, Webhooks) ↔ OpenAI API.

## Admin Panel
A protected `/admin` route visible only if `profiles.role='admin'`.
It displays:
- Users list (email, name, role)
- Subscriptions (plan, status, current period)
- Usage counters (AI messages, voice minutes, OCR pages)
- Feature flags per plan
Admin actions: reset usage counters, grant admin role, export CSV.

## Chat Function
Frontend calls a Supabase Edge Function `/chat`, which:
- verifies auth,
- checks user plan/model/limits,
- calls OpenAI Chat Completions API with the right model,
- streams the response,
- increments `usage_counters.ai_messages_used`.

## Dark/Light Themes
Light theme: white background, purple accent, dark text.
Dark theme: calm dark background (#121826), light text, lavender accents.

## Current Tasks
- Add password validator (uppercase, lowercase, digit, special char) + confirm password field.
- Replace testimonials on landing page with plan cards.
- Implement Admin Panel `/admin` as described.
- Ensure Stripe plans and Supabase usage counters match.
- Connect Edge Function `/chat` to OpenAI API.

