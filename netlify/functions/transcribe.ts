import { Handler } from "@netlify/functions";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const authHeader = event.headers.authorization;
  if (!authHeader) return { statusCode: 401, body: "Unauthorized" };

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const token = authHeader.replace("Bearer ", "");
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);
  if (authError || !user) return { statusCode: 401, body: "Unauthorized" };

  const [{ data: subscription }, { data: profile }] = await Promise.all([
    supabase
      .from("subscriptions")
      .select("plan_type, status")
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("profiles")
      .select("subscription_plan")
      .eq("id", user.id)
      .single(),
  ]);

  const allowedPlans = ["personal_growth", "expanded_horizons"];
  const hasVoiceAccess =
    (subscription?.status === "active" &&
      allowedPlans.includes(subscription.plan_type)) ||
    allowedPlans.includes(profile?.subscription_plan ?? "");

  if (!hasVoiceAccess) {
    return { statusCode: 403, body: "Upgrade required" };
  }

  const body = JSON.parse(event.body || "{}");
  const { audioBase64, mimeType = "audio/webm" } = body;

  if (!audioBase64) return { statusCode: 400, body: "No audio data" };

  try {
    const audioBuffer = Buffer.from(audioBase64, "base64");
    const audioFile = new File([audioBuffer], "recording.webm", {
      type: mimeType,
    });

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "gpt-4o-mini-transcribe",
      response_format: "json",
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: transcription.text }),
    };
  } catch (err) {
    console.error("Transcription error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Transcription failed" }),
    };
  }
};

export { handler };
