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
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (String(event.httpMethod) === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (String(event.httpMethod) !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid token' }) };
    }

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (!subscription?.stripe_subscription_id) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'No active subscription found' }),
      };
    }

    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripe_subscription_id
    );

    const customerId = stripeSubscription.customer as string;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.URL}/billing`,
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ url: portalSession.url }),
    };
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Failed to create portal session',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
