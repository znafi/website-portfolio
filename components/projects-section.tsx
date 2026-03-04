"use client"

import { useReveal } from "@/hooks/use-reveal"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

const projects = [
  {
    title: "Iftar AutoSign",
    description:
      "Browser automation system that handles event sign-ups with scheduled workflows, persistent state, and zero manual intervention.",
    tech: ["Playwright", "GitHub Actions", "Supabase", "TypeScript"],
    github: "https://github.com/znafi",
    number: "01",
  },
  {
    title: "ChainCycle",
    description:
      "Decentralized marketplace on Internet Computer with smart contracts enabling trustless peer-to-peer transactions.",
    tech: ["Internet Computer", "Motoko", "React", "Blockchain"],
    github: "https://github.com/znafi",
    number: "02",
  },
  {
    title: "Global Legal Reference",
    description:
      "Full-text search platform for legal professionals to quickly surface relevant statutes from massive document corpora.",
    tech: ["Flask", "React", "Elasticsearch", "Python"],
    github: "https://github.com/znafi",
    number: "03",
  },
  {
    title: "LinkUP",
    description:
      "Mobile-first social platform connecting users with local events and community activities through real-time discovery.",
    tech: ["React Native", "Node.js", "Firebase", "Mobile"],
    github: "https://github.com/znafi",
    number: "04",
  },
]

export function ProjectsSection() {
  const { ref, visible } = useReveal(0.05)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" ref={ref} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            02 / Selected Work
          </span>
        </div>

        {/* Header */}
        <div
          className={`mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-tight text-foreground">
            Projects
          </h2>
          <a
            href="https://github.com/znafi"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all on GitHub
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Project list */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative border-t border-border transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-6 py-8 md:py-10">
                {/* Number */}
                <span className="hidden text-xs font-mono text-muted-foreground/30 md:block md:w-12">
                  {project.number}
                </span>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-center md:gap-8">
                  <h3 className="shrink-0 text-xl font-semibold text-foreground transition-all md:w-56 md:text-2xl">
                    {project.title}
                  </h3>

                  <p
                    className={`min-w-0 flex-1 text-sm leading-relaxed transition-all duration-300 ${
                      hoveredIndex === index
                        ? "text-foreground/70"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="hidden shrink-0 items-center gap-2 lg:flex">
                    {project.tech.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground/50"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 2 && (
                      <span className="font-mono text-[11px] text-muted-foreground/30">
                        +{project.tech.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                    hoveredIndex === index
                      ? "text-foreground translate-x-1 -translate-y-1"
                      : "text-muted-foreground/20"
                  }`}
                />
              </div>

              {/* Hover bg */}
              <div
                className={`absolute inset-0 -mx-4 rounded-lg bg-secondary/50 transition-opacity duration-300 -z-10 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          ))}
          {/* Bottom border */}
          <div className="h-px w-full bg-border" />
        </div>
      </div>
    </section>
  )
}
