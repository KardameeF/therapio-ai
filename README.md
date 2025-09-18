# Therapio AI

A modern, AI-powered mental wellness application built with Vite, React, TypeScript, and Supabase.

## Features

- 🧠 **Mood Tracking** - Track daily mood and emotional patterns
- 😴 **Sleep & Stress Monitoring** - Monitor sleep quality and stress levels
- 🎯 **Goal Setting** - Set and track mental health and wellness goals
- 🤖 **AI Insights** - Get personalized recommendations based on your data
- 🌙 **Dark/Light Theme** - Beautiful, accessible theme switching
- 🌍 **Internationalization** - Support for English and Bulgarian
- 💳 **Stripe Billing** - Secure subscription management
- 🔐 **Supabase Auth** - Secure authentication with Google OAuth
- 🛡️ **reCAPTCHA v3** - Advanced bot protection
- 📊 **Sentry Monitoring** - Error tracking and performance monitoring

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Payments**: Stripe
- **Security**: reCAPTCHA v3, Sentry
- **Internationalization**: i18next
- **Code Quality**: ESLint + Prettier

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp env.example .env
```

Fill in your environment variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration  
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key

# Sentry Configuration
VITE_SENTRY_DSN=your_sentry_dsn

# Google reCAPTCHA Configuration
VITE_RECAPTCHA_KEY=your_recaptcha_site_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API

### 2. Database Schema

Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Mood entries table
CREATE TABLE mood_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mood INTEGER NOT NULL CHECK (mood >= 1 AND mood <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sleep & stress table
CREATE TABLE sleep_stress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  sleep_hours DECIMAL(3,1) NOT NULL CHECK (sleep_hours >= 0 AND sleep_hours <= 24),
  stress_level INTEGER NOT NULL CHECK (stress_level >= 1 AND stress_level <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Goals table
CREATE TABLE goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plan limits view
CREATE VIEW plan_limits AS
SELECT 
  id as user_id,
  CASE 
    WHEN email LIKE '%premium%' THEN 999999
    ELSE 5 
  END as mood_entries_limit,
  CASE 
    WHEN email LIKE '%premium%' THEN 999999
    ELSE 5 
  END as sleep_stress_limit,
  CASE 
    WHEN email LIKE '%premium%' THEN 999999
    ELSE 3 
  END as goals_limit
FROM auth.users;

-- RLS Policies
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_stress ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Policies for mood_entries
CREATE POLICY "Users can view own mood entries" ON mood_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood entries" ON mood_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood entries" ON mood_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood entries" ON mood_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for sleep_stress
CREATE POLICY "Users can view own sleep stress entries" ON sleep_stress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sleep stress entries" ON sleep_stress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sleep stress entries" ON sleep_stress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sleep stress entries" ON sleep_stress
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for goals
CREATE POLICY "Users can view own goals" ON goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" ON goals
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. Configure Authentication

1. Go to Authentication > Providers in Supabase
2. Enable Google OAuth and configure with your Google OAuth credentials
3. Set up redirect URLs: `http://localhost:5173/auth/callback` (development)

## Stripe Setup

### 1. Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Create an account and get your publishable key
3. Set up webhook endpoints for subscription management

### 2. Create Edge Function

Create a Supabase Edge Function for Stripe webhooks:

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase in your project
supabase init

# Create the function
supabase functions new stripe-webhook
```

## Google reCAPTCHA Setup

1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Create a new site with reCAPTCHA v3
3. Add your domain (localhost for development)
4. Get your site key and add it to `.env`

## Sentry Setup

1. Go to [sentry.io](https://sentry.io)
2. Create a new project for React
3. Get your DSN and add it to `.env`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── header.tsx      # Main header component
│   ├── auth-menu.tsx   # Authentication menu
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useMoodEntries.ts
│   ├── useSleepStress.ts
│   └── useGoals.ts
├── layouts/            # Layout components
│   └── app-layout.tsx
├── lib/                # Utility libraries
│   ├── supabaseClient.ts
│   ├── stripe.ts
│   ├── recaptcha.ts
│   └── ...
├── pages/              # Page components
│   ├── landing.tsx
│   ├── login.tsx
│   ├── dashboard.tsx
│   ├── mood.tsx
│   ├── sleep-stress.tsx
│   ├── goals.tsx
│   ├── billing.tsx
│   ├── profile.tsx
│   ├── admin.tsx
│   └── legal/
├── providers/          # React context providers
│   ├── AuthProvider.tsx
│   └── theme-provider.tsx
└── App.tsx             # Main app component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

# therapio-ai