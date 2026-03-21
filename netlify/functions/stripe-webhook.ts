import Stripe from 'stripe';
import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
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

// Handle prepaid credit purchase (one-time payment, no subscription)
async function handlePrepaidCheckout(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const credits = parseInt(session.metadata?.credits ?? "0", 10);

  if (!userId || credits <= 0) {
    console.error("Invalid prepaid metadata:", session.metadata);
    return;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("prepaid_credits")
    .eq("id", userId)
    .single();

  const { error } = await supabase
    .from("profiles")
    .update({ prepaid_credits: (profile?.prepaid_credits ?? 0) + credits })
    .eq("id", userId);

  if (error) {
    console.error("Error adding prepaid credits:", error);
    throw error;
  }

  console.log(`Added ${credits} prepaid credits for user ${userId}`);

  try {
    const { data: userData } = await supabase.auth.admin.getUserById(userId);
    const userEmail = userData?.user?.email;
    const amountEur = parseInt(session.metadata?.amount ?? "0", 10);

    if (userEmail && amountEur > 0) {
      const newBalance = (profile?.prepaid_credits ?? 0) + credits;
      const bgnEquiv: Record<number, string> = { 5: "9.78", 10: "19.56", 20: "39.12" };

      await fetch(`${process.env.URL}/.netlify/functions/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "prepaid-success",
          to: userEmail,
          vars: {
            AMOUNT_EUR: String(amountEur),
            AMOUNT_BGN: bgnEquiv[amountEur] || String((amountEur * 1.95583).toFixed(2)),
            CREDITS: String(newBalance),
          },
        }),
      });
    }
  } catch (emailErr) {
    console.error("Prepaid success email failed:", emailErr);
  }
}

// Handle checkout.session.completed event
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Processing checkout.session.completed:', session.id);

  if (session.metadata?.type === "prepaid") {
    await handlePrepaidCheckout(session);
    return;
  }

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

  // Sync subscription_plan to profiles table (used by chat function for limits)
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      subscription_plan: planType,
      messages_used: 0,
    })
    .eq('id', userId);

  if (profileError) {
    console.error('Error updating profile subscription_plan:', profileError);
    // Не хвърляме грешка — subscription е записан, само sync-ът фейлна
  }

  console.log('Successfully synced subscription_plan to profiles for user:', userId);

  try {
    const planNames: Record<string, string> = {
      personal_growth: "Личен Растеж",
      expanded_horizons: "Разширени Хоризонти",
    };
    const planFeatures: Record<string, string[]> = {
      personal_growth: ["500 AI съобщения на месец", "Бележки от сесии и задачи", "90 дни история на чата"],
      expanded_horizons: ["1500 AI съобщения на месец", "Гласов асистент и аудио терапии", "180 дни история на чата"],
    };

    const { data: userData } = await supabase.auth.admin.getUserById(userId);
    const userEmail = userData?.user?.email;

    if (userEmail) {
      const nextDate = new Date(subscription.current_period_end * 1000)
        .toLocaleDateString("bg-BG", { day: "numeric", month: "long", year: "numeric" });
      const features = planFeatures[planType] || ["Платени функции активирани", "", ""];

      await fetch(`${process.env.URL}/.netlify/functions/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "payment-success",
          to: userEmail,
          vars: {
            PLAN_NAME: planNames[planType] || planType,
            NEXT_BILLING_DATE: nextDate,
            FEATURE_1: features[0] || "",
            FEATURE_2: features[1] || "",
            FEATURE_3: features[2] || "",
          },
        }),
      });
    }
  } catch (emailErr) {
    console.error("Payment success email failed:", emailErr);
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

  // Sync back to first_step in profiles when subscription is cancelled
  const stripeSubForUser = await stripe.subscriptions.retrieve(subscription.id);
  const userId = stripeSubForUser.metadata?.user_id;

  if (userId) {
    await supabase
      .from('profiles')
      .update({ subscription_plan: 'first_step' })
      .eq('id', userId);

    try {
      const { data: userData } = await supabase.auth.admin.getUserById(userId);
      const userEmail = userData?.user?.email;

      if (userEmail) {
        const endDate = new Date(subscription.current_period_end * 1000)
          .toLocaleDateString("bg-BG", { day: "numeric", month: "long", year: "numeric" });

        await fetch(`${process.env.URL}/.netlify/functions/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "payment-cancelled",
            to: userEmail,
            vars: { END_DATE: endDate },
          }),
        });
      }
    } catch (emailErr) {
      console.error("Cancellation email failed:", emailErr);
    }
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
