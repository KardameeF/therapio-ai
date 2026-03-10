import { Handler } from "@netlify/functions";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "" };

  const { userMessage, botMessage, language = "bg" } = JSON.parse(
    event.body || "{}"
  );

  const prompt =
    language === "bg"
      ? `Дай кратко заглавие (3-5 думи) на този разговор. 
       Само заглавието, без кавички, без точка накрая.
       Започни с главна буква.
       Разговор:
       Потребител: ${userMessage}
       Асистент: ${botMessage}`
      : `Give a short title (3-5 words) for this conversation.
       Title only, no quotes, no period at end.
       Start with a capital letter.
       Conversation:
       User: ${userMessage}
       Assistant: ${botMessage}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 20,
      temperature: 0.3,
    });

    const title =
      response.choices[0].message.content?.trim() || userMessage;
    const capitalizedTitle =
      title.charAt(0).toUpperCase() + title.slice(1);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: capitalizedTitle }),
    };
  } catch (err) {
    console.error("Title generation error:", err);
    const fallback =
      userMessage.charAt(0).toUpperCase() + userMessage.slice(1);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: fallback.slice(0, 60) }),
    };
  }
};

export { handler };
