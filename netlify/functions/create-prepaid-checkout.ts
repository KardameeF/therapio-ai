import Stripe from "stripe";
import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const VALID_AMOUNTS = [5, 10, 20] as const;

export const handler: Handler = async (event) => {
  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (String(event.httpMethod) === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  if (String(event.httpMethod) !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Unauthorized" }),
      };
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Invalid token" }),
      };
    }

    const { amount } = JSON.parse(event.body ?? "{}");

    if (!VALID_AMOUNTS.includes(amount)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Invalid amount. Must be 5, 10, or 20." }),
      };
    }

    const credits = amount * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Eterapp кредити ${amount}€`,
              description: `${credits} кредита за съобщения`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        credits: String(credits),
        type: "prepaid",
      },
      success_url: `${process.env.URL}/billing?prepaid_success=true`,
      cancel_url: `${process.env.URL}/billing`,
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Error creating prepaid checkout:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Failed to create prepaid checkout",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
