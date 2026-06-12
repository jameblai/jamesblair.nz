export interface LinkItem {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  description: string;
  links?: LinkItem[];
  tech?: string[];
}

export interface Hackathon {
  event: string;
  team?: string;
  result?: string;
  project: string;
  description: string;
  links: LinkItem[];
  tech: string[];
}

export const headerLinks: LinkItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/jameblai",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jamesblair14",
  },
];

export const skillMarqueeItems = [
  "TypeScript",
  "React",
  "Next.js",
  "Astro",
  "Convex",
  "Hono",
  "ElysiaJS",
  "FastAPI",
  "Tailwind CSS",
  "TanStack Query",
  "TanStack Router",
  "Drizzle ORM",
  "Postgres",
  "SQLite",
  "Sanity CMS",
  "Clerk",
  "Stripe",
  "React Email",
  "Cloudflare",
  "Vercel",
  "Docker",
  "Linux",
  "Caddy",
  "Git",
  "Python",
  "Kotlin",
  "C++",
  "Base UI",
  "Radix UI",
  "shadcn",
];

export const projects: Project[] = [
  {
    name: "WaiMUN",
    description:
      "Built and deployed the full-stack event platform in collaboration with organising committee members – managing registration, payments, personalised badge generation and automated emails for 126 registered students across 15 schools.",
    links: [
      {
        label: "Website",
        href: "https://waimun.org",
      },
      {
        label: "GitHub",
        href: "https://github.com/waimun-org/waimun",
      },
    ],
    tech: [
      "TypeScript",
      "Astro",
      "Tailwind CSS",
      "Sanity CMS",
      "Airtable",
      "Stripe",
      "React Email",
    ],
  },
  {
    name: "AnkAI",
    description:
      "Built a study app that turns messy notes into Anki-style decks, with a collaborative Tiptap editor synced through Convex and a FastAPI AI service that generates structured flashcards through OpenRouter.",
    links: [
      {
        label: "App GitHub",
        href: "https://github.com/gitgooduoa/ankai",
      },
      {
        label: "AI service GitHub",
        href: "https://github.com/gitgooduoa/ankai-ai",
      },
    ],
    tech: [
      "TypeScript",
      "Next.js",
      "Convex",
      "Clerk",
      "Tiptap",
      "FastAPI",
      "OpenRouter",
    ],
  },
  {
    name: "Profiles",
    description:
      "A polished link-in-bio platform with auth, profile editing, public username pages, database on D1, and media uploads with R2, deployed on Cloudflare Workers.",
    links: [
      {
        label: "Website",
        href: "https://profiles.r80.workers.dev/",
      },
      {
        label: "Profile",
        href: "https://profiles.r80.workers.dev/u/james",
      },
      {
        label: "GitHub",
        href: "https://github.com/jameblai/profiles",
      },
    ],
    tech: [
      "TypeScript",
      "TanStack Start",
      "React",
      "Better Auth",
      "Drizzle ORM",
      "Cloudflare Workers",
      "D1",
      "R2",
    ],
  },
  {
    name: "Air Quality Monitor",
    description:
      "Developed an air quality monitor on an ESP32 in C++, pushing serialised eCO2, TVOC and climate readings to a Hono/Drizzle REST API, with a Next.js frontend displaying live statistics using TanStack Query.",
    links: [
      {
        href: "https://github.com/jameblai/air-quality",
        label: "GitHub",
      },
    ],
    tech: [
      "C++",
      "Arduino",
      "TypeScript",
      "Hono",
      "Drizzle ORM",
      "Next.js",
      "Tailwind CSS",
      "TanStack Query",
    ],
  },
  {
    name: "RHS Netball",
    description:
      "Developed a static website using Astro, serving assets from Cloudflare R2 – optimised for fast load times, giving coaches and umpires quick access to resources, photos and the embedded calendar.",
    links: [
      {
        href: "https://rhs-netball.vercel.app",
        label: "Website",
      },
      {
        href: "https://github.com/jameblai/rhs-netball",
        label: "GitHub",
      },
    ],
    tech: ["TypeScript", "Astro", "SolidJS", "Tailwind CSS", "Sentry", "R2"],
  },
  {
    name: "Homelab",
    description:
      "Maintain self-hosted infrastructure for learning production-style operations, including Linux servers, Docker services, reverse proxies, DNS, backups, and home networking.",
    tech: ["Linux", "Docker", "Caddy", "Cloudflare", "Networking", "UniFi"],
  },
  {
    name: "PaperSpigot Fork",
    description:
      "Identified and patched a state desync bug in PaperSpigot – out-of-range block placements were rejected without a corrective client update, causing ghost blocks. Fixed by forking the project and issuing the missing update packets.",
    tech: ["Java", "PaperSpigot", "Minecraft", "NMS"],
  },
  {
    name: "Bridging Plugin",
    description:
      "Developed a multiplayer game server plugin in Kotlin, implementing a session replay system, packet-level NMS hooks, and a persistent MariaDB database layer using Exposed and coroutines for async handling.",
    tech: ["Kotlin", "Spigot", "Exposed", "MariaDB"],
  },
];

export const hackathons: Hackathon[] = [
  {
    event: "DEVS x SESA Hackathon 2026",
    team: "First Try",
    result: "3rd place",
    project: "Intergalactic Space Agency Helpdesk",
    description:
      "Built a fast-paced helpdesk game where players answer alien support tickets against the clock using an in-app reference manual. The app combines a Next.js game UI, FastAPI ticket generation, and an Express/OpenRouter semantic answer checker.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/devsuoa/devs-sesa-beginner-hackathon-2026-first-try",
      },
    ],
    tech: ["TypeScript", "Next.js", "Express", "FastAPI", "OpenRouter"],
  },
  {
    event: "GDGC Hackathon 2026",
    team: "Picasa",
    result: "Most Promising award",
    project: "Repstation",
    description:
      "Prototyped a reputation-backed marketplace for sharing items and proving trust. The app includes user accounts, marketplace listings, claims and attestations, skill proof flows, uploads, chat features and a trust-scoring model built around community verification.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jameblai/gdgc-hackathon",
      },
    ],
    tech: ["TypeScript", "Next.js", "Drizzle ORM", "Postgres", "UploadThing"],
  },
  {
    event: "WEB3UOA Hackathon 2026",
    team: "No Clue",
    project: "Bonus Distribution",
    description:
      "Created an employer dashboard for calculating and distributing employee bonuses on Base Sepolia. It pairs wallet-based onboarding, AI-assisted bonus summaries and payout history with a Foundry smart contract that transfers dNZD bonuses to employees.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jameblai/web3-hackathon",
      },
    ],
    tech: ["TypeScript", "Hono", "TanStack Router", "SQLite", "Solidity"],
  },
];
