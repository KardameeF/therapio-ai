# Stripe Setup — Eterapp

## Products to Create in Stripe Dashboard

### Subscription Plans (recurring, currency: EUR)
1. **Първа Стъпка** — €19.99/month (~39.99 лв/месец)
2. **Expanded Horizons** — €39.99/month (~78.22 лв/месец)

> BGN equivalents are shown in the UI as informational notes. Stripe charges in EUR.

### Prepaid Credit Packs (one-time payments, currency: EUR)
Handled dynamically via `create-prepaid-checkout.ts` — no Stripe products needed.
Packages: €5 / €10 / €20 (~9.80 / 19.60 / 39.20 лв)

## Environment Variables Required
```bash
VITE_STRIPE_PUBLIC_KEY=pk_live_...    # Frontend (publishable)
STRIPE_SECRET_KEY=sk_live_...         # Netlify functions only
STRIPE_WEBHOOK_SECRET=whsec_...       # Webhook verification
```

## Stripe Price IDs
After creating products, update price IDs in `src/pages/landing.tsx`:
```typescript
const STRIPE_PRICE_IDS = {
  personal_growth: 'price_YOUR_PERSONAL_GROWTH_ID',      // €19.99/mo
  expanded_horizons: 'price_YOUR_EXPANDED_HORIZONS_ID',  // €39.99/mo
};
```

## Webhook Events to Subscribe
- `checkout.session.completed` — activates subscription OR adds prepaid credits
- `customer.subscription.updated` — plan changes
- `customer.subscription.deleted` — cancellations → downgrade to free

## Prepaid Credits Flow
1. User clicks "Зареди €5/€10/€20" in /billing
2. Frontend calls `/.netlify/functions/create-prepaid-checkout`
3. User pays via Stripe Checkout (one-time, EUR)
4. Webhook receives `checkout.session.completed` with `metadata.type = "prepaid"`
5. `prepaid_credits` is incremented in profiles table (€1 = 100 credits)
6. Extra messages deduct 2 credits (€0.02) each from balance

## Testing
Use Stripe test card: `4242 4242 4242 4242`, any future expiry, any CVC.

## Go Live Checklist
- [ ] Switch from test keys (pk_test_, sk_test_) to live keys (pk_live_, sk_live_)
- [ ] Update webhook endpoint to production URL
- [ ] Verify webhook secret matches live endpoint
- [ ] Create products in Stripe Dashboard with EUR pricing
- [ ] Update STRIPE_PRICE_IDS in landing.tsx with real price IDs
- [ ] Test a real subscription purchase end-to-end
- [ ] Confirm profiles.subscription_plan updates correctly via webhook
