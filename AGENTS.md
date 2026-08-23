# Project notes

This site is built with Astro, React islands, Tailwind CSS, pnpm, ESLint, and Prettier.

- Static output — all pages prerendered at build time, served from Cloudflare Workers + Assets.
- React islands load client-side for interactivity (contribution graph).
- GitHub contributions are fetched client-side from the jogruber API (CORS-safe).
- Local dev: `pnpm dev` for Astro development server, or `pnpm build && wrangler dev` to preview the production build with Workers.
