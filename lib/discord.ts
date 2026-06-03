import type { ContactFormValues } from "@/lib/contact-form";

const DISCORD_MESSAGE_LIMIT = 2000;

function formatContactMessage(values: ContactFormValues) {
  const submittedAt = new Date().toISOString();
  const lines = [
    "## New website contact form submission",
    `**Name:** ${values.name}`,
    `**Email:** ${values.email}`,
    `**Submitted:** ${submittedAt}`,
    "",
    "**Message:**",
    values.message,
  ];

  const message = lines.join("\n");

  if (message.length <= DISCORD_MESSAGE_LIMIT) {
    return message;
  }

  return `${message.slice(0, DISCORD_MESSAGE_LIMIT - 20)}\n\n[message truncated]`;
}

export async function sendContactFormSubmission(values: ContactFormValues) {
  const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("DISCORD_CONTACT_WEBHOOK_URL is not configured.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      allowed_mentions: {
        parse: [],
      },
      content: formatContactMessage(values),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Discord webhook failed with ${response.status} ${response.statusText}`,
    );
  }
}
