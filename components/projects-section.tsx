"use client"

import { useReveal } from "@/hooks/use-reveal"
import { ArrowUpRight } from "lucide-react"
import { useState, useCallback, useRef } from "react"
import Image from "next/image"

const projects = [
  {
    title: "Iftar AutoSign",
    description:
      "Browser automation system that handles event sign-ups with scheduled workflows, persistent state, and zero manual intervention.",
    tech: ["Playwright", "GitHub Actions", "Supabase", "TypeScript"],
    github: "https://github.com/znafi",
    image: "/images/project-1.jpg",
    number: "01",
  },
  {
    title: "ChainCycle",
    description:
      "Decentralized marketplace on Internet Computer with smart contracts enabling trustless peer-to-peer transactions.",
    tech: ["Internet Computer", "Motoko", "React", "Blockchain"],
    github: "https://github.com/znafi",
    image: "/images/project-2.jpg",
    number: "02",
  },
  {
    title: "Global Legal Reference",
    description:
      "Full-text search platform for legal professionals to quickly surface relevant statutes from massive document corpora.",
    tech: ["Flask", "React", "Elasticsearch", "Python"],
    github: "https://github.com/znafi",
    image: "/images/project-3.jpg",
    number: "03",
  },
  {
    title: "LinkUP",
    description:
      "Mobile-first social platform connecting users with local events and community activities through real-time discovery.",
    tech: ["React Native", "Node.js", "Firebase", "Mobile"],
    github: "https://github.com/znafi",
    image: "/images/project-4.jpg",
    number: "04",
  },
]

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: (typeof projects)[0]
  index: number
  visible: boolean
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.01)`
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)"
    setIsHovered(false)
  }, [])

  return (
    <a
      ref={cardRef}
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className={`tilt-card group relative block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${300 + index * 150}ms` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="image-hover-zoom relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-background/30 transition-opacity duration-500 group-hover:opacity-0" />

        {/* Number overlay */}
        <span className="absolute bottom-4 left-4 font-mono text-[11px] text-foreground/40">
          {project.number}
        </span>

        {/* Arrow */}
        <div
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <ArrowUpRight className="h-4 w-4 text-foreground" />
        </div>

        {/* Replace hint */}
        <p
          className={`absolute bottom-4 right-4 font-mono text-[10px] text-foreground/20 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {"< replace image />"}
        </p>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            {project.title}
          </h3>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/60 transition-colors group-hover:text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

export function ProjectsSection() {
  const { ref, visible } = useReveal(0.05)

  return (
    <section id="projects" ref={ref} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div
          className={`mb-16 flex items-center gap-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            02 / Selected Work
          </span>
          <div
            className={`h-px flex-1 bg-border ${visible ? "animate-line-grow" : "scale-x-0"}`}
          />
        </div>

        {/* Header */}
        <div
          className={`mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end transition-all duration-700 delay-200 ${
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

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
