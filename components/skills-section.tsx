"use client"

import { useEffect, useRef, useState } from "react"

const techStack = {
  "full stack": ["React", "Next.js", "TypeScript", "Node.js", "Python", "Flask", "Tailwind CSS"],
  "mobile": ["React Native"],
  "data & infra": ["PostgreSQL", "Supabase", "Firebase", "Elasticsearch", "MongoDB"],
  "blockchain": ["Internet Computer", "Motoko", "Smart Contracts"],
  "automation & tools": ["Playwright", "GitHub Actions", "Docker", "Git", "CI/CD"],
}

const allTech = [
  "JavaScript", "TypeScript", "Python", "React", "Next.js",
  "React Native", "Node.js", "Flask", "Supabase", "PostgreSQL",
  "Firebase", "Elasticsearch", "Docker", "Git", "GitHub Actions",
  "Playwright", "Motoko", "Internet Computer", "Tailwind CSS",
  "GraphQL", "MongoDB", "REST APIs",
]

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section id="skills" ref={ref} className="px-6 py-20 md:px-0 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            {"My go-to Tech Stack"}
          </h2>
        </div>

        <div
          className={`mb-14 flex flex-col gap-8 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-medium tracking-widest uppercase text-muted-foreground">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-foreground/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="mb-4 text-xs tracking-widest uppercase text-muted-foreground/60">
            {"view all tech I've tinkered with"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {allTech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
