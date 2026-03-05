"use client"

import { useRef, useCallback, useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion, useInView, useMotionValue, useTransform, animate, PanInfo } from "framer-motion"

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

/* ---------- swipable card ---------- */
function ProjectCard({
  project,
  isActive,
}: {
  project: (typeof projects)[0]
  isActive: boolean
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
    },
    []
  )

  return (
    <motion.a
      ref={cardRef}
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="spotlight-card glow-border group relative block w-[85vw] max-w-[480px] shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-card md:w-[440px]"
      animate={{
        scale: isActive ? 1 : 0.92,
        opacity: isActive ? 1 : 0.5,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="image-hover-zoom relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 440px"
        />
        <div className="absolute inset-0 bg-background/30 transition-opacity duration-500 group-hover:opacity-0" />

        <span className="absolute bottom-4 left-4 font-mono text-[11px] text-foreground/40">
          {project.number}
        </span>

        <div
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <ArrowUpRight className="h-4 w-4 text-foreground" />
        </div>
      </div>

      {/* Info */}
      <div className="relative z-[2] p-6">
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          {project.title}
        </h3>
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
    </motion.a>
  )
}

/* ---------- main component ---------- */
export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })
  const [activeIndex, setActiveIndex] = useState(0)

  const dragX = useMotionValue(0)
  const CARD_W = 460 // card width + gap
  const maxDrag = -(projects.length - 1) * CARD_W

  const containerX = useTransform(dragX, (v) => v)

  function goTo(idx: number) {
    const clamped = Math.max(0, Math.min(idx, projects.length - 1))
    setActiveIndex(clamped)
    animate(dragX, -clamped * CARD_W, { type: "spring", stiffness: 260, damping: 30 })
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const threshold = CARD_W / 4
    if (info.offset.x < -threshold) {
      goTo(activeIndex + 1)
    } else if (info.offset.x > threshold) {
      goTo(activeIndex - 1)
    } else {
      goTo(activeIndex)
    }
  }

  return (
    <section id="projects" ref={sectionRef} className="py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
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
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
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
      </div>

      {/* Swipable carousel */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex cursor-grab items-start gap-5 px-[max(1.5rem,calc((100vw-480px)/2))] active:cursor-grabbing"
          style={{ x: containerX }}
          drag="x"
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              isActive={index === activeIndex}
            />
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between px-6">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-foreground" : "w-2 bg-foreground/20"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/60 transition-all hover:border-foreground/30 hover:text-foreground disabled:opacity-20 disabled:hover:border-border"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/60 transition-all hover:border-foreground/30 hover:text-foreground disabled:opacity-20 disabled:hover:border-border"
            aria-label="Next project"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
