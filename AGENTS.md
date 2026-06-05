# Project notes

This site is built with Astro, React islands, Tailwind CSS, pnpm, ESLint, and Prettier.

- Keep most content static in Astro components/pages.
- Use client islands only where interactivity is needed, such as the contact form.
- The contact form posts to `/api/contact`, which sends Discord embeds using `DISCORD_WEBHOOK_URL` via Cloudflare Workers.
- Deployed on Cloudflare Workers with `nodejs_compat` (required for OG image generation with satori/resvg).
- Environment secrets are set via `wrangler secret put DISCORD_WEBHOOK_URL`.
