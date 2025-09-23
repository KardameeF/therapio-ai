# Stripe Checkout Integration Setup

## ✅ Completed Tasks

1. **Netlify Function Created**: `netlify/functions/create-checkout.ts`
   - Handles POST requests with `priceId`
   - Creates Stripe Checkout sessions in subscription mode
   - Includes CORS support and error handling

2. **Frontend Integration**: 
   - Created `useStripeCheckout` hook for checkout functionality
   - Updated landing page pricing cards to use Stripe checkout
   - Added success and cancel pages with proper routing

3. **Required Packages**: Already installed
   - `stripe` (for Netlify function)
   - `@stripe/stripe-js` (for frontend)

## 🔧 Required Setup Steps

### 1. Get Your Stripe Price IDs

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Products** → **Your Products**
3. Find your products:
   - **Personal Growth (€20/month)**
   - **Expanded Horizons (€40/month)**
4. Copy the **Price ID** for each product (starts with `price_`)

### 2. Update Price IDs in Code

Edit `src/pages/landing.tsx` and replace the placeholder price IDs:

```typescript
const STRIPE_PRICE_IDS = {
  PERSONAL_GROWTH: 'price_YOUR_ACTUAL_PRICE_ID_HERE', // Replace with Personal Growth price ID
  EXPANDED_HORIZONS: 'price_YOUR_ACTUAL_PRICE_ID_HERE', // Replace with Expanded Horizons price ID
};
```

### 3. Environment Variables (Already Set in Netlify)

Make sure these are set in your Netlify environment variables:
- ✅ `VITE_STRIPE_PUBLIC_KEY` = your publishable key (pk_test_...)
- ✅ `STRIPE_SECRET_KEY` = your secret key (sk_test_...)
- ✅ `STRIPE_WEBHOOK_SECRET` = your webhook secret (not used yet)

### 4. Test the Integration

1. Deploy your changes to Netlify
2. Visit your landing page
3. Click on the "Personal Growth" or "Expanded Horizons" pricing buttons
4. You should be redirected to Stripe Checkout
5. Test with Stripe's test card: `4242 4242 4242 4242`

## 🎯 How It Works

1. **User clicks pricing button** → Calls `createCheckoutSession(priceId)`
2. **Frontend calls Netlify function** → `/.netlify/functions/create-checkout`
3. **Function creates Stripe session** → Returns checkout URL
4. **User redirected to Stripe** → Completes payment
5. **Success/Cancel redirect** → Returns to your app

## 📁 Files Created/Modified

- `netlify/functions/create-checkout.ts` - Netlify function
- `src/pages/success.tsx` - Success page
- `src/pages/cancel.tsx` - Cancel page  
- `src/hooks/useStripeCheckout.ts` - Checkout hook
- `src/pages/landing.tsx` - Updated pricing cards
- `src/App.tsx` - Added new routes

## 🔄 Next Steps (Optional)

- Add webhook handling for subscription events
- Integrate with user authentication
- Add subscription management in user profile
- Implement usage limits based on subscription tier
