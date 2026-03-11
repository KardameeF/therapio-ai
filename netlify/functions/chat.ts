import { Handler } from "@netlify/functions";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const authHeader = event.headers.authorization;
  if (!authHeader) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Invalid token" }) };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("messages_used, subscription_plan, is_blocked")
    .eq("id", user.id)
    .single();

  if (profile?.is_blocked) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Акаунтът е блокиран. Свържи се с поддръжката." }),
    };
  }

  const limits: Record<string, number> = {
    first_step: 30,
    personal_growth: 500,
    expanded_horizons: 1500,
  };
  const plan = profile?.subscription_plan || "first_step";
  const used = profile?.messages_used || 0;
  const limit = limits[plan] || 30;

  if (used >= limit) {
    return {
      statusCode: 429,
      body: JSON.stringify({ error: "Message limit reached", used, limit }),
    };
  }

  const { messages, image } = JSON.parse(event.body || "{}");
  if (!messages || !Array.isArray(messages)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request" }) };
  }

  if (image && image.length > 6_000_000) {
    return { statusCode: 400, body: JSON.stringify({ error: "Image too large" }) };
  }

  const model = plan === "first_step" ? "gpt-4o-mini" : "gpt-4o";

  const openaiMessages = messages.map((m: { role: string; content: string }, idx: number) => {
    if (idx === messages.length - 1 && m.role === "user" && image && plan !== "first_step") {
      return {
        role: "user",
        content: [
          { type: "text", text: m.content },
          { type: "image_url", image_url: { url: image, detail: "low" } },
        ],
      };
    }
    return { role: m.role, content: m.content };
  });

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `You are Eterapp, a compassionate emotional support assistant. 
You provide empathetic, supportive responses. You are NOT a medical professional 
and always remind users to seek professional help for serious issues.
Respond in the same language the user writes in (Bulgarian or English).`,
        },
        ...openaiMessages,
      ],
      max_tokens: 500,
    });

    await supabase
      .from("profiles")
      .update({ messages_used: used + 1 })
      .eq("id", user.id);

    const reply = completion.choices[0].message.content;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply, used: used + 1, limit }),
    };
  } catch (err) {
    console.error("OpenAI error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI service error" }),
    };
  }
};
