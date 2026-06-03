import type { ContactFormValues } from "@/lib/contact-form";

const DISCORD_EMBED_DESCRIPTION_LIMIT = 4096;
const TRUNCATION_SUFFIX = "\n\n[message truncated]";

function truncateDiscordEmbedDescription(message: string) {
  if (message.length <= DISCORD_EMBED_DESCRIPTION_LIMIT) {
    return message;
  }

  return `${message.slice(
    0,
    DISCORD_EMBED_DESCRIPTION_LIMIT - TRUNCATION_SUFFIX.length,
  )}${TRUNCATION_SUFFIX}`;
}

function formatContactEmbed(values: ContactFormValues) {
  const submittedAt = new Date();

  return {
    title: "New contact message",
    description: truncateDiscordEmbedDescription(values.message),
    color: 0x3b82f6,
    fields: [
      {
        name: "Name",
        value: values.name,
        inline: true,
      },
      {
        name: "Email",
        value: values.email,
        inline: true,
      },
    ],
    footer: {
      text: "jamesblair.nz",
    },
    timestamp: submittedAt.toISOString(),
  };
}

export async function sendContactFormSubmission(values: ContactFormValues) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("DISCORD_WEBHOOK_URL is not configured.");
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
      content: "📬 New contact message from jamesblair.nz",
      embeds: [formatContactEmbed(values)],
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Discord webhook failed with ${response.status} ${response.statusText}`,
    );
  }
}
