interface Env {
  DISCORD_WEBHOOK_URL: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const DISCORD_EMBED_DESCRIPTION_LIMIT = 4096;
const TRUNCATION_SUFFIX = "\n\n[message truncated]";

function truncate(message: string, limit: number) {
  if (message.length <= limit) return message;
  return `${message.slice(0, limit - TRUNCATION_SUFFIX.length)}${TRUNCATION_SUFFIX}`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function onRequestPost({ request, env }: PagesContext) {
  const formData = await request.formData();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: Record<string, string[]> = {};

  if (!name) errors.name = ["Please enter your name."];
  if (!isValidEmail(email))
    errors.email = ["Please enter a valid email address."];
  if (message.length < 50)
    errors.message = ["Please enter at least 50 characters."];

  if (Object.keys(errors).length > 0) {
    return Response.json({ status: "error", errors }, { status: 400 });
  }

  const webhookUrl = env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json(
      {
        status: "error",
        errors: {
          form: [
            "Sorry, your message could not be sent. Please try again later.",
          ],
        },
      },
      { status: 500 },
    );
  }

  const submittedAt = new Date();

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        allowed_mentions: { parse: [] },
        content: "📬 New contact message from jamesblair.nz",
        embeds: [
          {
            title: "Message",
            description: truncate(message, DISCORD_EMBED_DESCRIPTION_LIMIT),
            color: 0x3b82f6,
            fields: [
              { name: "Name", value: name, inline: true },
              { name: "Email", value: email, inline: true },
            ],
            footer: { text: "jamesblair.nz" },
            timestamp: submittedAt.toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed with ${response.status}`);
    }

    return Response.json({ status: "success" });
  } catch {
    return Response.json(
      {
        status: "error",
        errors: {
          form: [
            "Sorry, your message could not be sent. Please try again later.",
          ],
        },
      },
      { status: 500 },
    );
  }
}
