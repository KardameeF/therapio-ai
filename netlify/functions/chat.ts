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

const DIFFICULT_CONDITIONS = [
  "anxiety",
  "depression",
  "loneliness",
  "grief",
  "panic_attacks",
  "chronic_stress",
  "low_self_esteem",
] as const;

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

async function matchTherapyAudio(
  userId: string,
  sessionId: string,
  conversationMessages: { role: string; content: string }[]
): Promise<string | null> {
  const { data: existingTherapy } = await supabase
    .from("user_therapy_sessions")
    .select("id")
    .eq("chat_session_id", sessionId)
    .limit(1);

  if (existingTherapy?.length) return null;

  const classifyCompletion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Analyze this conversation and decide if the user is dealing with a difficult emotional topic.
If yes, classify it as ONE of: ${DIFFICULT_CONDITIONS.join(", ")}.
If the conversation is casual / light / not emotionally difficult, respond with "none".

Respond ONLY with valid JSON: {"condition":"..."}`,
      },
      ...conversationMessages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ],
    max_tokens: 50,
    response_format: { type: "json_object" },
  });

  const classifyRaw = classifyCompletion.choices[0].message.content || "{}";
  const { condition } = JSON.parse(classifyRaw);

  if (!condition || condition === "none") return null;

  const { data: profileData } = await supabase
    .from("profiles")
    .select("preferred_voice_gender")
    .eq("id", userId)
    .single();

  const voiceGender = profileData?.preferred_voice_gender || "female";

  // Try exact match first, then any gender for that condition, then fallback
  let { data: therapies } = await supabase
    .from("therapy_audio")
    .select("id")
    .eq("condition", condition)
    .eq("voice_gender", voiceGender)
    .limit(5);

  if (!therapies?.length) {
    ({ data: therapies } = await supabase
      .from("therapy_audio")
      .select("id")
      .eq("condition", condition)
      .limit(5));
  }

  if (!therapies?.length) return null;

  const picked = therapies[Math.floor(Math.random() * therapies.length)];

  await supabase.from("user_therapy_sessions").insert({
    user_id: userId,
    chat_session_id: sessionId,
    therapy_audio_id: picked.id,
  });

  return picked.id;
}

async function buildCompressedContext(
  msgs: Array<{ role: string; content: string }>
): Promise<Array<{ role: string; content: string }>> {
  const RECENT_KEEP = 20;
  const COMPRESS_THRESHOLD = 40;
  const SIMPLE_LIMIT = 30;

  if (msgs.length <= SIMPLE_LIMIT) return msgs;
  if (msgs.length <= COMPRESS_THRESHOLD) return msgs.slice(-SIMPLE_LIMIT);

  const oldHistory = msgs.slice(0, msgs.length - RECENT_KEEP);
  const recentMessages = msgs.slice(-RECENT_KEEP);

  const historyText = oldHistory
    .map((m) => `${m.role === "user" ? "Потребител" : "Eterapp"}: ${
      typeof m.content === "string" ? m.content : "[медия]"
    }`)
    .join("\n");

  try {
    const compressionResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content: `Summarize the following therapy conversation history in 2-3 sentences.
Focus on: main emotional themes, key concerns mentioned, progress made.
Write in the same language as the conversation (BG or EN). Max 250 words.`,
        },
        { role: "user", content: historyText },
      ],
    });

    const summary = compressionResponse.choices[0].message.content || "";
    return [
      { role: "user", content: `[Контекст от по-ранен разговор]: ${summary}` },
      { role: "assistant", content: "Разбрах контекста от нашия по-ранен разговор." },
      ...recentMessages,
    ];
  } catch {
    return msgs.slice(-SIMPLE_LIMIT);
  }
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
    .select("messages_used, subscription_plan, is_blocked, prepaid_credits, prepaid_spent_this_month, budget_cap, credits_per_message")
    .eq("id", user.id)
    .single();

  if (profile?.is_blocked) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Акаунтът е блокиран. Свържи се с поддръжката." }),
    };
  }

  const planLimits: Record<string, number> = {
    first_step: 30,
    personal_growth: 500,
    expanded_horizons: 1500,
  };
  const plan = profile?.subscription_plan ?? "first_step";
  const used = profile?.messages_used ?? 0;
  const limit = planLimits[plan] ?? 30;

  const usingPrepaid = used >= limit;

  if (usingPrepaid) {
    if ((profile?.prepaid_credits ?? 0) <= 0) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "message_limit_reached", used, limit, plan }),
      };
    }
    const cap = profile?.budget_cap ?? 0;
    const spent = profile?.prepaid_spent_this_month ?? 0;
    const costPerMsg = profile?.credits_per_message ?? 2;
    if (cap > 0 && spent + costPerMsg > cap) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "budget_cap_reached", used, limit, plan }),
      };
    }
  }

  const { messages, image, sessionId } = JSON.parse(event.body || "{}");
  if (!messages || !Array.isArray(messages)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request" }) };
  }

  if (image && image.length > 6_000_000) {
    return { statusCode: 400, body: JSON.stringify({ error: "Image too large" }) };
  }

  const model = plan === "expanded_horizons" ? "gpt-4o" : "gpt-4o-mini";

  const wasCompressed = messages.length > 40;
  const contextMessages = await buildCompressedContext(messages);
  const openaiMessages = contextMessages.map((m: { role: string; content: string }, idx: number) => {
    if (idx === contextMessages.length - 1 && m.role === "user" && image && plan !== "first_step") {
      return {
        role: "user" as const,
        content: [
          { type: "text" as const, text: m.content },
          { type: "image_url" as const, image_url: { url: image, detail: "low" as const } },
        ],
      };
    }
    return { role: m.role as "user" | "assistant", content: m.content };
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

    if (usingPrepaid && (profile?.prepaid_credits ?? 0) > 0) {
      const costPerMsg = profile?.credits_per_message ?? 2;
      await supabase
        .from("profiles")
        .update({
          prepaid_credits: Math.max(0, (profile!.prepaid_credits ?? 0) - costPerMsg),
          prepaid_spent_this_month: (profile!.prepaid_spent_this_month ?? 0) + costPerMsg,
        })
        .eq("id", user.id);
    }

    const reply = completion.choices[0].message.content;

    let hasNewInsights = false;
    let therapyAudioId: string | null = null;

    if (sessionId && plan !== "first_step") {
      const userMsgCount = messages.filter(
        (m: { role: string }) => m.role === "user"
      ).length;
      const lastUserMsg =
        [...messages].reverse().find((m: { role: string }) => m.role === "user")
          ?.content || "";

      const shouldAnalyze =
        userMsgCount >= 10 || FAREWELL_RE.test(lastUserMsg);

      if (shouldAnalyze) {
        const plainMessages = messages.map(
          (m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })
        );

        // Notes + tasks (personal_growth and expanded_horizons)
        try {
          hasNewInsights = await generateSessionInsights(
            user.id,
            sessionId,
            plainMessages
          );
        } catch (err) {
          console.error("Session insights error:", err);
        }

        // Therapy audio matching (expanded_horizons only)
        if (plan === "expanded_horizons") {
          try {
            therapyAudioId = await matchTherapyAudio(
              user.id,
              sessionId,
              plainMessages
            );
          } catch (err) {
            console.error("Therapy audio match error:", err);
          }
        }
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        ...(wasCompressed ? { "x-context-compressed": "true" } : {}),
      },
      body: JSON.stringify({
        reply,
        used: used + 1,
        limit,
        hasNewInsights,
        therapyAudioId,
      }),
    };
  } catch (err) {
    console.error("OpenAI error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI service error" }),
    };
  }
};
