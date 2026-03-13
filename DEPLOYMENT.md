# Deployment Guide — Eterapp

## Platform: Netlify (primary)

### 1. Connect Repository
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository (KardameeF/therapio-ai)

### 2. Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18+

### 3. Environment Variables
Set these in Netlify → Site settings → Environment variables:
```bash
# Supabase
VITE_SUPABASE_URL=https://vhzaxxmirscnhgwwpjqx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=https://vhzaxxmirscnhgwwpjqx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=sk-...

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Other
VITE_RECAPTCHA_KEY=your_recaptcha_site_key
VITE_SENTRY_DSN=your_sentry_dsn
URL=https://your-eterapp-domain.com
```

> ⚠️ Critical: Netlify functions require `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` WITHOUT the `VITE_` prefix. The `VITE_` vars are frontend-only and NOT accessible in functions.

### 4. Stripe Webhook
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/.netlify/functions/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the signing secret → set as `STRIPE_WEBHOOK_SECRET` in Netlify

### 5. Deploy
Push to `main` branch — Netlify deploys automatically.

## Local Development
```bash
netlify dev   # Starts on http://localhost:8888
```

## Supabase Setup
- Project: therapio-prod (vhzaxxmirscnhgwwpjqx)
- Apply migrations manually in Supabase SQL Editor (files in supabase/migrations/)
- RLS is enabled on all tables
- Google OAuth configured in Supabase Auth providers

## Payment Integration
- Stripe subscriptions: recurring plans in EUR (€)
- Stripe one-time payments: prepaid credit top-ups in EUR (€)
- BGN (лв) equivalents shown in UI for Bulgarian users (~1.96 лв = €1)
- Webhook at `/.netlify/functions/stripe-webhook` handles all payment events
