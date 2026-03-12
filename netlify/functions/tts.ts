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
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Invalid token" }) };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_plan")
    .eq("id", user.id)
    .single();

  if (profile?.subscription_plan !== "expanded_horizons") {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "TTS requires Expanded Horizons plan" }),
    };
  }

  const { text, voice } = JSON.parse(event.body || "{}");
  if (!text || typeof text !== "string") {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing text" }) };
  }

  const safeVoice = voice === "onyx" ? "onyx" : "alloy";
  const truncated = text.slice(0, 4096);

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: safeVoice,
      input: truncated,
      response_format: "mp3",
    });

    const arrayBuffer = await mp3.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audio: base64 }),
    };
  } catch (err) {
    console.error("TTS error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "TTS generation failed" }),
    };
  }
};
