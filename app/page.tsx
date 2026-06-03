import { Card } from "@/components/card";
import { ContactForm } from "@/components/contact-form";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";

interface Project {
  name: string;
  description: string;
  links?: {
    label: string;
    href: string;
  }[];
  tech?: string[];
}

interface Hackathon {
  event: string;
  team?: string;
  result?: string;
  project: string;
  description: string;
  links: {
    label: string;
    href: string;
  }[];
  tech: string[];
}

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl p-8 flex flex-col">
      <Header />

      <main className="flex flex-col gap-8 py-8">
        <section>
          <p>
            Kia ora! I'm a first-year Computer Science student at The University
            of Auckland.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <Heading tag="h2">Skills</Heading>

          <ul>
            <li>
              <span className="text-subtle font-mono">-</span> JavaScript,
              TypeScript, Kotlin, Python, C++, C#
            </li>
            <li>
              <span className="text-subtle font-mono">-</span> React, Next.js,
              Astro, Hono, Tailwind CSS
            </li>
            <li>
              <span className="text-subtle font-mono">-</span> Sanity CMS,
              Stripe, Amazon SES, Cloudflare
            </li>
            <li>
              <span className="text-subtle font-mono">-</span> Git, Docker,
              Linux
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <Heading tag="h2">Projects</Heading>
          <Projects />
        </section>

        <section className="flex flex-col gap-4">
          <Heading tag="h2">Hackathons</Heading>
          <Hackathons />
        </section>

        <section className="flex flex-col gap-4">
          <Heading tag="h2">Contact</Heading>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

export function Header() {
  return (
    <header className="flex justify-between gap-4 md:gap-8 md:items-start flex-col md:flex-row">
      <Heading tag="h1">
        <span>James Blair</span>
        <span
          aria-hidden="true"
          className="inline-block bg-text align-baseline vim-cursor whitespace-pre"
        >
          {" "}
        </span>
      </Heading>
      <HeaderLinks />
    </header>
  );
}

function HeaderLinks() {
  const links: { label: string; href: string }[] = [
    {
      label: "GitHub",
      href: "https://github.com/jameblai",
    },
    {
      label: "CV",
      href: "https://drive.google.com/file/d/1wiNEvkXyqB1AEJolVoJmddSpXueT59Gg/view",
    },
  ];

  return (
    <div className="flex gap-4">
      {links.map(({ label, href }) => (
        <Link key={label} href={href}>
          {label}
        </Link>
      ))}
    </div>
  );
}

function Projects() {
  const projects: Project[] = [
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
        "Next.js",
        "Tailwind CSS",
        "Sanity CMS",
        "Airtable",
        "Stripe",
        "React Email",
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
      tech: ["TypeScript", "Astro", "SolidJS", "Tailwind CSS", "Sentry"],
    },
    {
      name: "Bridging Plugin",
      description:
        "Developed a multiplayer game server plugin in Kotlin, implementing a session replay system, packet-level NMS hooks, and a persistent MariaDB database layer using Exposed and coroutines for async handling.",
      tech: ["Kotlin", "Spigot", "Exposed", "MariaDB"],
    },
    {
      name: "PaperSpigot Fork",
      description:
        "Identified and patched a state desync bug in PaperSpigot – out-of-range block placements were rejected without a corrective client update, causing ghost blocks. Fixed by forking the project and issuing the missing update packets.",
    },
  ];

  return (
    <div className="grid gap-4 max-w-4xl">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}

function Hackathons() {
  const hackathons: Hackathon[] = [
    {
      event: "DEVS x SESA Beginner Hackathon 2026",
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
      event: "WEB3UOA Hackathon 2026",
      team: "No Clue",
      project: "Web3 Bonus Distribution App",
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
    {
      event: "GDGC Hackathon",
      team: "Picasa",
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
  ];

  return (
    <div className="grid gap-4 max-w-4xl">
      {hackathons.map((hackathon) => (
        <HackathonCard key={hackathon.event} hackathon={hackathon} />
      ))}
    </div>
  );
}

function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  return (
    <Card>
      <div className="flex flex-col gap-1">
        <Heading tag="h3" hashes={0}>
          {hackathon.event}
        </Heading>
        <p className="text-subtle">
          {[
            hackathon.team ? `Team ${hackathon.team}` : undefined,
            hackathon.result,
            hackathon.project,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      <p>{hackathon.description}</p>

      <ul className="flex flex-wrap gap-2">
        {hackathon.tech.map((item) => (
          <li
            key={item}
            className="px-2 py-1 border text-salmon border-salmon font-mono border-dashed text-sm"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="flex gap-4 mt-auto">
        {hackathon.links.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </Card>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <Heading tag="h3" hashes={0}>
        {project.name}
      </Heading>

      <p>{project.description}</p>

      {project.tech?.length && (
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li
              key={item}
              className="px-2 py-1 border text-salmon border-salmon font-mono border-dashed text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {project.links?.length && (
        <div className="flex gap-4 mt-auto">
          {project.links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
