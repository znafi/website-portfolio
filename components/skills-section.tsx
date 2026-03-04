"use client"

import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "React Native", level: 80 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Python", level: 85 },
      { name: "Flask", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    name: "Data & Infra",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "Supabase", level: 88 },
      { name: "Firebase", level: 82 },
      { name: "Elasticsearch", level: 78 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    name: "Tools & Other",
    skills: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 78 },
      { name: "GitHub Actions", level: 85 },
      { name: "Playwright", level: 82 },
      { name: "Blockchain", level: 70 },
    ],
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    const current = sectionRef.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-chart-2/5 blur-[150px]" />

      <div className="mx-auto max-w-5xl">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 font-mono text-sm text-primary">{"// skills"}</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl text-balance">
            Tech <span className="text-gradient">stack.</span>
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            A versatile toolkit spanning frontend, backend, mobile, automation,
            and blockchain development.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className={`mb-10 flex flex-wrap gap-2 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {skillCategories.map((cat, index) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(index)}
              className={`rounded-lg px-4 py-2 font-mono text-sm transition-all ${
                activeCategory === index
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,200,200,0.2)]"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skill bars */}
        <div
          className={`glass rounded-xl p-6 md:p-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col gap-6">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div key={skill.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-foreground">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-chart-2 transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDelay: `${500 + index * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech badges grid */}
        <div
          className={`mt-10 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            "JavaScript",
            "TypeScript",
            "Python",
            "React",
            "Next.js",
            "React Native",
            "Node.js",
            "Flask",
            "Supabase",
            "PostgreSQL",
            "Firebase",
            "Elasticsearch",
            "Docker",
            "Git",
            "GitHub Actions",
            "Playwright",
            "Motoko",
            "Internet Computer",
            "Tailwind CSS",
            "GraphQL",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-secondary/30 px-4 py-1.5 font-mono text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground hover:shadow-[0_0_15px_rgba(0,200,200,0.1)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
