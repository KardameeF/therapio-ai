# Deployment Guide

This guide covers deploying the Therapio AI application to various platforms.

## Environment Variables

Ensure all environment variables are set in your deployment platform:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
VITE_SENTRY_DSN=your_sentry_dsn
VITE_RECAPTCHA_KEY=your_recaptcha_site_key
```

## Vercel Deployment

### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect it's a Vite project

### 2. Configure Environment Variables

1. Go to your project settings
2. Add all environment variables under "Environment Variables"
3. Set them for Production, Preview, and Development

### 3. Deploy

Vercel will automatically deploy on every push to your main branch.

## Netlify Deployment

### 1. Connect Repository

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository

### 2. Build Settings

Set these build settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18` (or higher)

### 3. Environment Variables

1. Go to Site settings > Environment variables
2. Add all required environment variables

### 4. Deploy

Netlify will automatically deploy on every push.

## Supabase Edge Functions

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Initialize Supabase

```bash
supabase init
supabase login
supabase link --project-ref your-project-ref
```

### 3. Create Edge Function

```bash
supabase functions new stripe-webhook
```

### 4. Deploy Function

```bash
supabase functions deploy stripe-webhook
```

## Domain Configuration

### 1. Update Supabase Auth URLs

In your Supabase project settings:
- **Site URL**: `https://yourdomain.com`
- **Redirect URLs**: `https://yourdomain.com/auth/callback`

### 2. Update reCAPTCHA Domains

In Google reCAPTCHA admin:
- Add your production domain to the domain list

### 3. Update Stripe Webhooks

In Stripe dashboard:
- Update webhook endpoints to use your production domain

## Build Optimization

### 1. Bundle Analysis

```bash
npm run build
npx vite-bundle-analyzer dist
```

### 2. Performance Optimization

- Enable gzip compression on your hosting platform
- Use a CDN for static assets
- Implement service worker for caching

## Monitoring

### 1. Sentry

- Verify Sentry is receiving errors in production
- Set up alerts for critical errors
- Monitor performance metrics

### 2. Analytics

- Set up Google Analytics or similar
- Monitor user engagement
- Track conversion rates

## Security Checklist

- [ ] Environment variables are secure
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] reCAPTCHA is working
- [ ] Supabase RLS policies are active
- [ ] Stripe webhooks are verified

## Troubleshooting

### Common Issues

1. **Build fails**: Check environment variables
2. **Auth not working**: Verify Supabase URLs
3. **Payments not working**: Check Stripe keys
4. **reCAPTCHA errors**: Verify domain configuration

### Debug Mode

For debugging, you can temporarily enable debug mode:

```bash
VITE_DEBUG=true npm run dev
```

## Performance Monitoring

Monitor these key metrics:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

Use tools like:
- Google PageSpeed Insights
- WebPageTest
- Lighthouse CI
