declare module "cloudflare:workers" {
  export const env: {
    DISCORD_WEBHOOK_URL?: string;
    [key: string]: string | undefined;
  };
}
