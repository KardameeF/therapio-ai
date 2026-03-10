import { Handler } from "@netlify/functions";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "" };

  const { userMessage, botMessage, language = "bg" } = JSON.parse(
    event.body || "{}"
  );
  if (!userMessage) return { statusCode: 400, body: "Missing userMessage" };

  const prompt =
    language === "bg"
      ? `Дай кратко заглавие (2-4 думи) на този разговор. 
Само заглавието — без кавички, без точка, без обяснения.
Започни с главна буква. На български.
Потребител: ${userMessage.slice(0, 150)}
Асистент: ${(botMessage || "").slice(0, 150)}`
      : `Give a short title (2-4 words) for this conversation.
Title only — no quotes, no period, no explanation.
Start with a capital letter. In English.
User: ${userMessage.slice(0, 150)}
Assistant: ${(botMessage || "").slice(0, 150)}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 15,
      temperature: 0.3,
    });

    let title =
      response.choices[0].message.content?.trim() || userMessage;
    title = title.replace(/^["„«]|["»]$/g, "").trim();
    title = title.charAt(0).toUpperCase() + title.slice(1);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    };
  } catch {
    const fallback =
      userMessage.charAt(0).toUpperCase() + userMessage.slice(1, 40);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: fallback }),
    };
  }
};

export { handler };
