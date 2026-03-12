import { Handler } from "@netlify/functions";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const FAREWELL_RE =
  /\b(чао|довиждане|лека нощ|благодаря ти|мерси|сбогом|приятен ден|bye|goodbye|good night|thank you|thanks|see you|take care)\b/i;

async function generateSessionInsights(
  userId: string,
  sessionId: string,
  conversationMessages: { role: string; content: string }[]
) {
  const { data: existing } = await supabase
    .from("session_notes")
    .select("id")
    .eq("chat_session_id", sessionId)
    .limit(1);

  if (existing?.length) return false;

  const summaryCompletion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are Eterapp's session analyst. Based on the conversation below, generate:
1. A session note (max 150 words): current emotional state, main topics, what to monitor going forward. NO diagnoses — observations only. Write in the same language as the conversation.
2. 2-3 small, actionable tasks for the user over the next few days. Each has a title (short) and description (1-2 sentences). Realistic and encouraging.

Respond ONLY with valid JSON:
{"note":"...","tasks":[{"title":"...","description":"..."}]}`,
      },
      ...conversationMessages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ],
    max_tokens: 800,
    response_format: { type: "json_object" },
  });

  const raw = summaryCompletion.choices[0].message.content || "{}";
  const insights = JSON.parse(raw);

  if (insights.note) {
    await supabase.from("session_notes").insert({
      user_id: userId,
      chat_session_id: sessionId,
      content: insights.note,
    });
  }

  if (insights.tasks?.length) {
    await supabase.from("session_tasks").insert(
      insights.tasks.map((t: { title: string; description?: string }) => ({
        user_id: userId,
        chat_session_id: sessionId,
        title: t.title,
        description: t.description || "",
      }))
    );
  }

  return true;
}

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

  const { messages, image, sessionId } = JSON.parse(event.body || "{}");
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

    // Session insights: paid plans only, after 10+ exchanges or farewell
    let hasNewInsights = false;
    if (sessionId && plan !== "first_step") {
      const userMsgCount = messages.filter(
        (m: { role: string }) => m.role === "user"
      ).length;
      const lastUserMsg =
        [...messages].reverse().find((m: { role: string }) => m.role === "user")
          ?.content || "";

      if (userMsgCount >= 10 || FAREWELL_RE.test(lastUserMsg)) {
        try {
          const plainMessages = messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          }));
          hasNewInsights = await generateSessionInsights(
            user.id,
            sessionId,
            plainMessages
          );
        } catch (err) {
          console.error("Session insights error:", err);
        }
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply, used: used + 1, limit, hasNewInsights }),
    };
  } catch (err) {
    console.error("OpenAI error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI service error" }),
    };
  }
};
