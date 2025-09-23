import Stripe from 'stripe';
import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export const handler: Handler = async (event) => {
  // Consistent CORS headers for all responses
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle CORS preflight requests
  if (String(event.httpMethod) === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // Only allow POST requests
  if (String(event.httpMethod) !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const signature = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
    
    if (!signature) {
      console.error('Missing Stripe signature');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing Stripe signature' }),
      };
    }

    if (!event.body) {
      console.error('Missing request body');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing request body' }),
      };
    }

    // Verify webhook signature
    let stripeEvent: Stripe.Event;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        event.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid signature' }),
      };
    }

    console.log('Received Stripe event:', stripeEvent.type);

    // Handle the event
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(stripeEvent.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(stripeEvent.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ received: true }),
    };

  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Webhook processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

// Handle checkout.session.completed event
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Processing checkout.session.completed:', session.id);

  if (!session.subscription) {
    console.error('No subscription found in checkout session');
    return;
  }

  // Get subscription details from Stripe
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
  
  // Extract user_id and plan_type from session metadata
  const userId = session.metadata?.user_id;
  const planType = session.metadata?.plan_type;

  if (!userId) {
    console.error('No user_id found in session metadata');
    return;
  }

  if (!planType) {
    console.error('No plan_type found in session metadata');
    return;
  }

  // Validate plan_type
  const validPlanTypes = ['first_step', 'personal_growth', 'expanded_horizons'];
  if (!validPlanTypes.includes(planType)) {
    console.error('Invalid plan_type:', planType);
    return;
  }

  // Map Stripe status to our status
  const status = mapStripeStatusToOurStatus(subscription.status);

  // Upsert subscription record
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      stripe_subscription_id: subscription.id,
      plan_type: planType,
      status: status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id'
    });

  if (error) {
    console.error('Error upserting subscription:', error);
    throw error;
  }

  console.log('Successfully processed checkout.session.completed for user:', userId);
}

// Handle customer.subscription.updated event
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Processing customer.subscription.updated:', subscription.id);

  // Map Stripe status to our status
  const status = mapStripeStatusToOurStatus(subscription.status);

  // Map price_id to plan_type (you may need to adjust this mapping based on your actual price IDs)
  const planType = mapPriceIdToPlanType(subscription.items.data[0]?.price.id);

  // Update subscription record
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: status,
      plan_type: planType,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }

  console.log('Successfully processed customer.subscription.updated for subscription:', subscription.id);
}

// Handle customer.subscription.deleted event
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Processing customer.subscription.deleted:', subscription.id);

  // Update subscription status to cancelled
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription status to cancelled:', error);
    throw error;
  }

  console.log('Successfully processed customer.subscription.deleted for subscription:', subscription.id);
}

// Helper function to map Stripe status to our status
function mapStripeStatusToOurStatus(stripeStatus: Stripe.Subscription.Status): string {
  switch (stripeStatus) {
    case 'active':
      return 'active';
    case 'canceled':
    case 'cancelled':
      return 'cancelled';
    case 'past_due':
    case 'unpaid':
      return 'past_due';
    case 'incomplete':
    case 'incomplete_expired':
    case 'trialing':
    case 'paused':
    default:
      return 'active'; // Default to active for other statuses
  }
}

// Helper function to map Stripe price ID to our plan type
function mapPriceIdToPlanType(priceId?: string): string {
  if (!priceId) {
    return 'first_step'; // Default fallback
  }

  // Map your actual Stripe price IDs to plan types
  // Update these based on your actual Stripe price IDs
  const priceIdToPlanType: Record<string, string> = {
    'price_1S8qnIDVd6WnP7HIrd5qxgrt': 'personal_growth', // Personal Growth €20/month
    'price_1S8qoxDVd6WnP7HI4Vjfan7y': 'expanded_horizons', // Expanded Horizons €40/month
  };

  return priceIdToPlanType[priceId] || 'first_step';
}
