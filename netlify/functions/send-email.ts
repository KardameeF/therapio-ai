import { Handler } from "@netlify/functions";
import { templates } from "./email-templates";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = "Eterapp <noreply@eterapp.io>";

function buildHtml(template: string, vars: Record<string, string>): string {
  let html = template;
  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }
  return html;
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
  return res.json();
}

const SUBJECTS: Record<string, string> = {
  welcome: "Добре дошъл в Eterapp! 👋",
  "payment-success": "Плащането е успешно! 🎉",
  "payment-cancelled": "Абонаментът ти е отменен",
  "prepaid-success": "Кредитите са заредени! ✓",
};

export const handler: Handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { type, to, vars } = JSON.parse(event.body || "{}");

    if (!type || !to) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Missing type or to" }),
      };
    }

    const template = templates[type];
    if (!template) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: `Unknown email type: ${type}` }),
      };
    }

    const subject = SUBJECTS[type] || "Eterapp";
    const html = buildHtml(template, vars || {});

    await sendEmail(to, subject, html);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("send-email error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};
