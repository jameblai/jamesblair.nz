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

export const projects: Project[] = [
  {
    name: "WaiMUN",
    description:
      "Website and registration for Interschool MUN (~80 delegates in 2024, over 120 in 2025). Sanity CMS, Airtable, and Stripe, plus tooling for event badges and personalised allocation emails.",
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
      "Astro",
      "Sanity CMS",
      "Airtable",
      "Stripe",
      "TypeScript",
      "React Email",
    ],
  },
  {
    name: "Lectern",
    description:
      "Event management platform for organisations, bringing publishing, registration, ticketing, check-in, participant imports, branded public pages, and printable materials into one place.",
    tech: [
      "TypeScript",
      "TanStack Start",
      "Convex",
      "WorkOS",
      "Stripe",
      "Resend",
      "React PDF",
    ],
  },
  {
    name: "TimeTree",
    description:
      "Lead developer on a UOACS × DEVS hackathon project. Maps decisions as pathways so you can see how outcomes branch.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jameblai/uoacs-devs-hackathon",
      },
      {
        label: "Demo",
        href: "https://blairshare.s3.us-east-1.amazonaws.com/Cap+2026-07-19+at+22.03.49_4x.mp4",
      },
    ],
    tech: ["Next.js", "TypeScript", "Convex", "Clerk", "AI SDK", "React Flow"],
  },
  {
    name: "Saku",
    description:
      "Discord-hosted coding agent and harness in Rust with threaded conversations, file and shell tools, web search, and memory system for working on codebases away from the terminal.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jameblai/saku",
      },
    ],
    tech: ["Rust", "Serenity", "Codex", "Exa"],
  },
  {
    name: "Alien Helpdesk",
    description:
      "Helpdesk simulator game where players answer tickets from aliens, with AI-graded user responses.",
    links: [
      {
        label: "Demo",
        href: "https://helpdesk.blair.nz/",
      },
      {
        label: "GitHub",
        href: "https://github.com/jameblai/helpdesk",
      },
    ],
    tech: ["Next.js", "TypeScript", "Zustand", "AI SDK", "Base UI"],
  },
  {
    name: "AnkAI",
    description:
      "Built a study app that turns messy notes into Anki-style decks, with a collaborative, realtime editor and an AI microservice which generates structured flashcards.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/gitgooduoa/ankai",
      },
    ],
    tech: ["Next.js", "TypeScript", "Convex", "Clerk", "Tiptap", "OpenRouter"],
  },
  {
    name: "Homelab",
    description:
      "Maintain self-hosted infrastructure for learning production-style operations, including Linux servers, Docker services, reverse proxies, backups, and home networking.",
    tech: ["Linux", "Docker", "Caddy", "Cloudflare", "Networking", "UniFi"],
  },
  {
    name: "Bridging Plugin",
    description:
      "Developed a multiplayer game server plugin in Kotlin, implementing a session replay system, packet-level NMS hooks, and a persistent MariaDB database layer using Exposed and coroutines for async handling.",
    tech: ["Kotlin", "Spigot", "Exposed", "MariaDB"],
  },
  {
    name: "PaperSpigot Patch",
    description:
      "Identified and patched a state desync bug in PaperSpigot – out-of-range block placements were rejected without a corrective client update, causing ghost blocks. Fixed by forking the project and issuing the missing update packets.",
    tech: ["Java", "PaperSpigot", "Minecraft", "NMS"],
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
