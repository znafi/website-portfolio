"use client"

import { useRef, useCallback, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

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

/* ---------- project card with spotlight + tilt ---------- */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      el.style.setProperty("--spotlight-x", `${x * 100}%`)
      el.style.setProperty("--spotlight-y", `${y * 100}%`)

      const rx = (x - 0.5) * 6
      const ry = (y - 0.5) * -6
      el.style.transform = `perspective(1000px) rotateY(${rx}deg) rotateX(${ry}deg) scale(1.01)`
    },
    []
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)"
      setIsHovered(false)
    },
    []
  )

  const directions = [
    { x: -60, y: 40 },
    { x: 60, y: 40 },
    { x: -60, y: -40 },
    { x: 60, y: -40 },
  ]
  const dir = directions[index % 4]

  return (
    <motion.a
      ref={cardRef}
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="spotlight-card glow-border tilt-card group relative block overflow-hidden rounded-2xl border border-border bg-card"
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
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

        {/* Number overlay with typewriter feel */}
        <motion.span
          className="absolute bottom-4 left-4 font-mono text-[11px] text-foreground/40"
          initial={{ width: 0 }}
          whileInView={{ width: "auto" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 + index * 0.12 }}
          style={{ overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {project.number}
        </motion.span>

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
      <div className="relative z-[2] p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            {project.title}
          </h3>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, j) => (
            <motion.span
              key={t}
              className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/60 transition-colors group-hover:text-muted-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.12 + j * 0.05 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

/* ---------- main component ---------- */
export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  return (
    <section id="projects" ref={sectionRef} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            02 / Selected Work
          </span>
          <motion.div
            className="h-px flex-1 bg-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-tight text-foreground">
            Projects
          </h2>
          <a
            href="https://github.com/znafi"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-underline group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all on GitHub
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
