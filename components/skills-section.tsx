"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"

const categories = [
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Motoko"],
    icon: "{ }",
  },
  {
    name: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS"],
    icon: "</>"
  },
  {
    name: "Backend",
    items: ["Node.js", "Flask", "REST APIs", "GraphQL"],
    icon: ">>>"
  },
  {
    name: "Data",
    items: ["PostgreSQL", "Supabase", "Firebase", "MongoDB", "Elasticsearch"],
    icon: "DB"
  },
  {
    name: "DevOps",
    items: ["Docker", "GitHub Actions", "CI/CD", "Git"],
    icon: "CI"
  },
  {
    name: "Other",
    items: ["Playwright", "Internet Computer", "Smart Contracts", "Blockchain"],
    icon: "**"
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
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  return (
    <section id="skills" ref={ref} className="py-32 md:py-40">
      {/* Marquee ticker */}
      <div
        className={`mb-20 overflow-hidden border-y border-border py-6 transition-all duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-8 font-mono text-sm text-muted-foreground/25 transition-colors hover:text-foreground md:text-base"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Section label */}
        <div
          className={`mb-16 flex items-center gap-4 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            03 / Tech Stack
          </span>
          <div
            className={`h-px flex-1 bg-border ${visible ? "animate-line-grow" : "scale-x-0"}`}
          />
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-foreground/15 md:p-8 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + i * 100}ms` }}
              onMouseEnter={() => setHoveredCategory(i)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background icon */}
              <span
                className={`absolute right-4 top-4 font-mono text-[3rem] font-bold leading-none transition-all duration-500 ${
                  hoveredCategory === i
                    ? "text-foreground/8 translate-x-0"
                    : "text-foreground/3 translate-x-2"
                }`}
              >
                {cat.icon}
              </span>

              <h3 className="relative mb-5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground/70">
                {cat.name}
              </h3>
              <div className="relative flex flex-wrap gap-2">
                {cat.items.map((tech, j) => (
                  <span
                    key={tech}
                    className={`rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-[13px] text-foreground/70 transition-all duration-300 hover:bg-foreground hover:text-background ${
                      visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                    style={{
                      transitionDelay: visible ? `${500 + i * 100 + j * 50}ms` : "0ms",
                    }}
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
