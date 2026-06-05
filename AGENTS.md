# Project notes

This site is built with Astro, React islands, Tailwind CSS, pnpm, ESLint, and Prettier.

- Static output — all pages prerendered at build time, served from Cloudflare Pages CDN.
- React islands load client-side for interactivity (contact form, contribution graph).
- GitHub contributions are fetched client-side from the jogruber API (CORS-safe).
- The contact form posts to `/api/contact`, handled by a Cloudflare Pages Function (`functions/api/contact.ts`).
- The Pages Function sends Discord embeds using the `DISCORD_WEBHOOK_URL` secret.
- Environment secrets are set in the Cloudflare Pages dashboard (or `wrangler pages secret put`).
- Local dev: use `wrangler pages dev ./dist` with secrets in `.dev.vars`.
