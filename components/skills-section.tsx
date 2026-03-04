"use client"

import { useReveal } from "@/hooks/use-reveal"

const categories = [
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Motoko"],
  },
  {
    name: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Flask", "REST APIs", "GraphQL"],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "Supabase", "Firebase", "MongoDB", "Elasticsearch"],
  },
  {
    name: "DevOps",
    items: ["Docker", "GitHub Actions", "CI/CD", "Git"],
  },
  {
    name: "Other",
    items: ["Playwright", "Internet Computer", "Smart Contracts", "Blockchain"],
  },
]

const marqueeItems = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Docker",
  "Playwright",
  "Firebase",
  "Elasticsearch",
  "React Native",
  "Flask",
  "Motoko",
  "Tailwind",
  "GraphQL",
  "MongoDB",
  "Git",
]

export function SkillsSection() {
  const { ref, visible } = useReveal(0.1)

  return (
    <section id="skills" ref={ref} className="py-32 md:py-40">
      {/* Marquee ticker - full width, no padding */}
      <div
        className={`mb-20 overflow-hidden border-y border-border py-5 transition-all duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-6 font-mono text-sm text-muted-foreground/30 md:mx-8 md:text-base"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Section label */}
        <div
          className={`mb-16 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            03 / Tech Stack
          </span>
        </div>

        <div
          className={`mb-20 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="max-w-3xl text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-tight text-foreground/80">
            Tools and technologies I use to bring ideas to production.
          </h2>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className={`border-t border-border p-6 md:p-8 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } ${i % 3 !== 0 ? "lg:border-l" : ""} ${i % 2 !== 0 ? "md:border-l lg:border-l-0" : ""} ${i >= 3 ? "lg:border-l-0" : ""} ${i === 1 ? "md:border-l" : ""} ${i === 3 ? "md:border-l lg:border-l-0" : ""} ${i === 4 ? "lg:border-l" : ""} ${i === 5 ? "lg:border-l" : ""}`}
              style={{ transitionDelay: `${400 + i * 100}ms` }}
            >
              <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-[13px] text-foreground/70 transition-all hover:bg-foreground hover:text-background"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
