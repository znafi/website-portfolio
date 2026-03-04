"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Iftar AutoSign",
    description:
      "Browser automation system that handles Iftar event sign-ups using scheduled workflows and persistent state management.",
    tech: ["Playwright", "GitHub Actions", "Supabase", "TypeScript"],
    github: "https://github.com/znafi",
  },
  {
    title: "ChainCycle",
    description:
      "Decentralized blockchain marketplace built on Internet Computer, enabling peer-to-peer transactions with smart contract integration.",
    tech: ["Internet Computer", "Motoko", "React", "Blockchain"],
    github: "https://github.com/znafi",
  },
  {
    title: "Global Legal Reference",
    description:
      "Comprehensive law search platform with full-text search capabilities for legal professionals to quickly find relevant statutes.",
    tech: ["Flask", "React", "Elasticsearch", "Python"],
    github: "https://github.com/znafi",
  },
  {
    title: "LinkUP",
    description:
      "Mobile social event discovery platform that connects users with local events and community activities in real-time.",
    tech: ["React Native", "Node.js", "Firebase", "Mobile"],
    github: "https://github.com/znafi",
  },
]

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section id="projects" ref={ref} className="px-6 py-20 md:px-0 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            My Projects
          </h2>
          <p className="text-base text-muted-foreground">
            From automation systems to blockchain marketplaces.
          </p>
        </div>

        <div className="flex flex-col gap-0">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col gap-3 border-t border-border py-8 transition-all duration-500 first:border-t-0 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-foreground/80">
                  {project.title}
                </h3>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6">
          <a
            href="https://github.com/znafi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            check out my repositories
          </a>
        </div>
      </div>
    </section>
  )
}
