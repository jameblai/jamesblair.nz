import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";

export default function Home() {
  return (
    <div className="container mx-auto p-8 flex flex-col">
      <header className="flex justify-between items-center gap-8">
        <Heading tag="h1">jamesblair.nz</Heading>

        <div className="flex gap-4">
          <Link href="https://github.com/jameblai">GitHub</Link>

          <Link href="https://drive.google.com/file/d/1wiNEvkXyqB1AEJolVoJmddSpXueT59Gg/view">
            CV
          </Link>
        </div>
      </header>

      <main className="flex flex-col gap-8 py-8">
        <section>
          <p>Kia ora! I'm a first-year CS student at University of Auckland.</p>
        </section>

        <section className="flex flex-col gap-4">
          <Heading tag="h2">Skills</Heading>

          <p>
            <span className="font-bold">Languages:</span> JavaScript,
            TypeScript, Kotlin, Python, C++, C#
          </p>
          <p>
            <span className="font-bold">Web:</span> React, Next.js, Astro, Hono,
            Tailwind CSS
          </p>
          <p>
            <span className="font-bold">Services:</span> Sanity CMS, Stripe,
            Amazon SES, Cloudflare
          </p>
          <p>
            <span className="font-bold">Tooling:</span> Git, Docker, Linux
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <Heading tag="h2">Work</Heading>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <Card>
              <Heading tag="h4" hashes={0}>
                WaiMUN
              </Heading>

              <p>
                Built and deployed the full-stack event platform in
                collaboration with organising committee members – managing
                registration, payments, personalised badge generation and
                automated emails for 126 registered students across 15 schools.
              </p>

              <div className="flex gap-4">
                <Link href="https://waimun.org">Website</Link>
                <Link href="https://github.com/waimun-org/waimun">GitHub</Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
