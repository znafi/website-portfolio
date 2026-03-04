"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Iftar AutoSign",
    description:
      "A browser automation system that automatically handles Iftar event sign-ups using scheduled workflows and persistent state management.",
    tech: ["Playwright", "GitHub Actions", "Supabase", "TypeScript"],
    github: "https://github.com/znafi",
    color: "from-primary/20 to-chart-2/20",
  },
  {
    title: "ChainCycle",
    description:
      "A decentralized blockchain marketplace built on Internet Computer, enabling peer-to-peer transactions with smart contract integration.",
    tech: ["Internet Computer", "Motoko", "React", "Blockchain"],
    github: "https://github.com/znafi",
    color: "from-chart-2/20 to-chart-5/20",
  },
  {
    title: "Global Legal Reference",
    description:
      "A comprehensive law search platform with full-text search capabilities, enabling legal professionals to quickly find relevant statutes and references.",
    tech: ["Flask", "React", "Elasticsearch", "Python"],
    github: "https://github.com/znafi",
    color: "from-chart-3/20 to-primary/20",
  },
  {
    title: "LinkUP",
    description:
      "A mobile social event discovery platform that connects users with local events and community activities in real-time.",
    tech: ["React Native", "Node.js", "Firebase", "Mobile"],
    github: "https://github.com/znafi",
    color: "from-chart-4/20 to-chart-2/20",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    const current = sectionRef.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-[150px]" />

      <div className="mx-auto max-w-5xl">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 font-mono text-sm text-primary">
            {"// projects"}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl text-balance">
            Things {"I've"} <span className="text-gradient">built.</span>
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            From automation systems to blockchain marketplaces -- each project
            represents a unique challenge solved with code.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`glass group relative overflow-hidden rounded-xl transition-all duration-500 hover:glow-border ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Gradient top bar */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${project.color}`}
              />

              <div className="p-6">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label={`View ${project.title} live`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-secondary/50 px-3 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
