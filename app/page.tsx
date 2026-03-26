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

          <ul className="list-disc marker:content-['-\0020'] marker:text-subtle">
            <li>JavaScript, TypeScript, Kotlin, Python, C++, C#</li>
            <li>React, Next.js, Astro, Hono, Tailwind CSS</li>
            <li>Sanity CMS, Stripe, Amazon SES, Cloudflare</li>
            <li>Git, Docker, Linux</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <Heading tag="h2">Projects</Heading>
          <Projects />
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
      <Heading tag="h1">James Blair</Heading>
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
    },
    {
      name: "Bridging Plugin",
      description:
        "Developed a multiplayer game server plugin in Kotlin, implementing a session replay system, packet-level NMS hooks, and a persistent MariaDB database layer using Exposed and coroutines for async handling.",
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <Heading tag="h3" hashes={0}>
        {project.name}
      </Heading>

      <p>{project.description}</p>

      {project.links?.length ? (
        <div className="flex gap-4 mt-auto">
          {project.links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
