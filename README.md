# jamesblair.nz

Personal site built with Astro, React islands, Tailwind CSS, and configured for Cloudflare Workers + Assets.

## Getting Started

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) with your browser.

## Scripts

- `pnpm dev` - start the Astro dev server
- `pnpm build` - type-check and build for production
- `pnpm preview` - preview the production build locally
- `pnpm lint` - run ESLint
- `pnpm format` - format with Prettier
- `pnpm deploy` - build and deploy to Cloudflare Workers

## Deployment

The site is configured to deploy to Cloudflare Workers with static Assets hosting. After building, the `dist/` directory is served from Cloudflare's edge network.

Preview the production build locally with Workers:

```bash
pnpm build
wrangler dev
```
