# Programmatic Open Graph Metadata + Image Plan

## Goal

Improve metadata and Open Graph support for `jamesblair.nz`, including a programmatically generated Open Graph image that matches the current Astro site’s minimal dark/terminal-ish aesthetic.

This plan intentionally removes all other feature work from the previous roadmap. Scope is only:

- stronger page metadata in `BaseLayout.astro`
- generated `/og.png` image endpoint
- wiring generated image into Open Graph and Twitter metadata
- validation for Discord/social previews and Vercel deployment

No implementation is included here.

## Current context / assumptions

- Repo: `/home/ubuntu/jamesblair.nz`
- Current branch at planning time: `main`
- App is Astro-based and deployed on Vercel.
- Package manager: pnpm.
- Formatting/linting: ESLint + Prettier with `prettier-plugin-astro`.
- Current relevant files:
  - `src/layouts/BaseLayout.astro`
  - `src/pages/index.astro`
  - `src/styles/global.css`
  - `astro.config.mjs`
  - `package.json`
- Current layout metadata is minimal:
  - `<meta name="description" />`
  - favicon
  - generator
  - title
- Site visual identity from `src/styles/global.css`:
  - background: `#151726`
  - interface/overlay: `#1c1e2d`, `#232534`
  - text: `#dee0ef`
  - subtle: `#8d8f9e`
  - salmon/accent: `#f8d2c9`
  - mint/blue accents: `#9ccfd8`, `#5ba2d0`
  - fonts: IBM Plex Sans and Lilex from Google Fonts

## Proposed approach

Use an Astro image endpoint at `src/pages/og.png.ts` that returns a generated `1200x630` PNG.

Recommended generation stack:

- `satori` to render a JSX-like object tree to SVG
- `@resvg/resvg-js` to rasterise SVG into PNG

Why this approach:

- Works well in serverless environments such as Vercel.
- Lets the OG card be generated from TypeScript data rather than manually designing/exporting an image.
- Avoids Playwright/Puppeteer in production, which would be much heavier for Vercel.
- Keeps the output deterministic and easy to test locally.

## Target output

Generated route:

- `GET /og.png`

Optional query params for future-proofing:

- `title`: defaults to `James Blair`
- `description`: defaults to `Computer Science student and full-stack developer.`

Recommended first-pass image:

- Size: `1200x630`
- Background: `#151726`
- Inner card/panel: `#1c1e2d` or `#232534`
- Text: `#dee0ef`
- Accent: salmon dashed border / cursor block using `#f8d2c9`
- Content:
  - `James Blair`
  - `Computer Science @ University of Auckland`
  - small tech line, e.g. `TypeScript · Astro · React · Tailwind · Kotlin · Python`
  - URL/footer: `jamesblair.nz`
  - optional vim-style cursor block near the name

## Step-by-step plan

### 1. Create a feature branch

Suggested branch name:

```bash
git checkout -b feat/programmatic-og-image
```

### 2. Add OG generation dependencies

Install runtime dependencies:

```bash
pnpm add satori @resvg/resvg-js
```

Notes:

- These should be regular dependencies, not dev dependencies, because the endpoint may run during production SSR/build output depending on adapter behaviour.
- If Vercel output bundles the route as a serverless function, both packages must be available at runtime.

### 3. Add a small metadata constants module

Create:

- `src/lib/site.ts`

Suggested exports:

```ts
export const site = {
  name: "James Blair",
  url: "https://jamesblair.nz",
  title: "James Blair",
  description:
    "Computer Science student at The University of Auckland building full-stack software.",
  ogImagePath: "/og.png",
};
```

Why:

- Avoids hardcoding title/description/site URL in multiple files.
- Makes future pages easier to wire into `BaseLayout`.

### 4. Update `BaseLayout.astro` metadata props

Update:

- `src/layouts/BaseLayout.astro`

Extend props to include:

```ts
interface Props {
  title?: string;
  description?: string;
  image?: string;
  canonicalPath?: string;
  type?: "website" | "article";
}
```

Compute:

- `pageTitle`
  - if `title === site.title`, use `site.title`
  - otherwise use `${title} | ${site.name}`
- `canonicalUrl`
  - `new URL(canonicalPath ?? Astro.url.pathname, site.url).toString()`
- `ogImageUrl`
  - `new URL(image ?? site.ogImagePath, site.url).toString()`

Add metadata:

```astro
<title>{pageTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />

<meta property="og:title" content={pageTitle} />
<meta property="og:description" content={description} />
<meta property="og:type" content={type} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={`${pageTitle} — ${description}`} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={pageTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />
```

Keep the existing favicon and generator metadata.

### 5. Implement the generated image endpoint

Create:

- `src/pages/og.png.ts`

Implementation outline:

```ts
import type { APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { site } from "@/lib/site";

export const GET: APIRoute = async ({ url }) => {
  const title = url.searchParams.get("title") ?? site.name;
  const description =
    url.searchParams.get("description") ??
    "Computer Science @ University of Auckland · Full-stack developer";

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#151726",
          color: "#dee0ef",
          padding: "72px",
          fontFamily: "Inter",
        },
        children: [
          /* generated card tree */
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        /* see font section below */
      ],
    },
  );

  const png = new Resvg(svg).render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
```

Important Satori constraints:

- Use object/React-like trees, not Astro components.
- Use inline styles; Tailwind classes will not apply.
- Prefer simple flexbox layouts.
- Avoid unsupported CSS features.
- Explicitly provide fonts if using non-system fonts.

### 6. Decide font strategy for the generated image

Best first-pass strategy:

- Use bundled local font files from `public/fonts` or `src/assets/fonts`.
- Load font bytes with `fs/promises` in the endpoint.
- Pass them to Satori’s `fonts` option.

Suggested files:

- `public/fonts/IBMPlexSans-Regular.ttf`
- `public/fonts/IBMPlexSans-Bold.ttf`

Endpoint helper example:

```ts
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const regularFont = await readFile(
  fileURLToPath(
    new URL("../../public/fonts/IBMPlexSans-Regular.ttf", import.meta.url),
  ),
);
```

Then:

```ts
fonts: [
  {
    name: "IBM Plex Sans",
    data: regularFont,
    weight: 400,
    style: "normal",
  },
  {
    name: "IBM Plex Sans",
    data: boldFont,
    weight: 700,
    style: "normal",
  },
];
```

Tradeoff:

- Bundling fonts is more reliable than fetching Google Fonts from inside the serverless function.
- If avoiding committed font files, use a generic bundled fallback font or fetch font CSS at build/runtime, but that is less deterministic.

### 7. Design the generated card tree

Recommended structure:

```ts
const card = {
  type: "div",
  props: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#151726",
      color: "#dee0ef",
      padding: "72px",
      fontFamily: "IBM Plex Sans",
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            border: "2px dashed #f8d2c9",
            backgroundColor: "#1c1e2d",
            borderRadius: "28px",
            padding: "56px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          },
          children: [
            // small label: jamesblair.nz
            // title row: James Blair + cursor block
            // description
            // tech tags row
          ],
        },
      },
      // footer row
    ],
  },
};
```

Visual details to match current site:

- Use a dashed salmon border, like existing tech tags.
- Use a small square cursor block after `James Blair`.
- Use muted text for supporting copy.
- Use tag pills with border `#f8d2c9` and text `#f8d2c9`.
- Keep the design quiet and readable at Discord preview size.

### 8. Add input sanitisation / length limits

If supporting query params:

- `title`: trim and cap to roughly 80 characters
- `description`: trim and cap to roughly 140 characters

Example helper:

```ts
const clamp = (value: string, max: number) =>
  value.trim().length > max
    ? `${value.trim().slice(0, max - 1)}…`
    : value.trim();
```

Why:

- Prevents accidental giant images/layout overflow.
- Makes future per-page OG URLs safe enough to generate with query params.

### 9. Wire generated image into pages

For the homepage, `BaseLayout` defaults should be enough:

```astro
<BaseLayout />
```

For future pages, allow custom image URLs such as:

```astro
<BaseLayout
  title="Some Post"
  description="Short summary"
  image={`/og.png?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`}
/>
```

For this PR, only the default homepage OG image needs to be wired and verified.

### 10. Check Astro/Vercel rendering mode

Verify the endpoint works with the current Astro Vercel adapter config in:

- `astro.config.mjs`
- `vercel.json` if relevant

Potential issue:

- If the site is fully static, a dynamic endpoint with query params may need SSR/server output support through `@astrojs/vercel`.
- If dynamic query-param images cause adapter complexity, fallback first PR can generate only a static `/og.png` at build time or return a default generated PNG without relying on params.

Do not switch the whole app rendering mode casually; keep the deployment simple unless the endpoint requires it and the adapter supports it cleanly.

## Files likely to change

Core changes:

- `package.json`
- `pnpm-lock.yaml`
- `src/layouts/BaseLayout.astro`

New files:

- `src/lib/site.ts`
- `src/pages/og.png.ts`

Optional new files if bundling fonts:

- `public/fonts/IBMPlexSans-Regular.ttf`
- `public/fonts/IBMPlexSans-Bold.ttf`

No planned changes:

- `src/pages/index.astro`, unless passing explicit `title`/`description` props becomes desirable
- `src/components/ContactForm.tsx`
- `src/pages/api/contact.ts`

## Tests / validation

Run after implementation:

```bash
pnpm format:check
pnpm lint
pnpm build
```

Local route checks:

```bash
pnpm dev
```

Then verify in browser or with `curl`:

```bash
curl -I http://localhost:4321/og.png
curl -o /tmp/james-og.png http://localhost:4321/og.png
file /tmp/james-og.png
```

Expected:

- `Content-Type: image/png`
- image dimensions: `1200 x 630`
- image visually matches site style

HTML metadata checks:

```bash
curl http://localhost:4321 | grep -E "og:|twitter:|canonical|description|<title>"
```

Expected homepage tags:

- canonical URL points to `https://jamesblair.nz/`
- `og:image` points to `https://jamesblair.nz/og.png`
- Twitter card is `summary_large_image`

Browser/manual checks:

- Open `/og.png` directly and inspect the image.
- Open homepage and inspect page source metadata.
- Confirm no browser console errors.

Deployment validation:

- Open Vercel preview deployment.
- Confirm `https://<preview-url>/og.png` returns PNG.
- Confirm final production `https://jamesblair.nz/og.png` after merge/deploy.
- Paste `https://jamesblair.nz` into Discord or a link preview tester and verify a large image card appears.

## Risks and tradeoffs

- **Serverless bundle size:** `@resvg/resvg-js` adds native/WASM-ish rendering weight. It is acceptable for a single endpoint but should be checked in Vercel build output.
- **Font loading:** Google Fonts imports in CSS do not automatically apply to Satori. Fonts must be supplied explicitly or the OG image should use a reliable fallback.
- **Dynamic query params:** Fully dynamic OG images are more flexible but may require SSR endpoint support. The first implementation should prioritise a stable default `/og.png`.
- **CSS support:** Satori supports a subset of CSS. Keep the image layout simple and inline-styled.
- **Caching:** Immutable caching is good for default `/og.png`, but if query-param images are used later, ensure URLs change when content changes.
- **Preview vs production URL:** Metadata should use `https://jamesblair.nz`, not the Vercel preview host, unless preview-specific metadata is desired.

## Open questions

- Should the OG image use committed local font files, or is a generic bundled font acceptable?
- Should `/og.png` support query params in the first PR, or only generate the homepage image?
- Should the OG visual include project/hackathon tech tags, or stay focused on name + role + URL?
- Should metadata always use the production canonical URL, even on Vercel preview deployments?

## Suggested first PR scope

Keep this PR focused:

1. Add `satori` and `@resvg/resvg-js`.
2. Add `src/lib/site.ts` constants.
3. Add `src/pages/og.png.ts` generated PNG endpoint.
4. Update `src/layouts/BaseLayout.astro` with canonical, Open Graph, and Twitter tags.
5. Validate locally with `pnpm build`, `/og.png`, and homepage metadata.
6. Deploy/PR and verify Vercel preview returns the image correctly.
