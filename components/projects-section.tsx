"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion"

const projects = [
  {
    title: "Auto-Signer",
    description:
      "Automated iftar event registration system built with Playwright and GitHub Actions. Bypasses Cloudflare Turnstile challenges, runs on a schedule, maintains session state, and completes sign-ups without any manual input.",
    stat: "Automated 30+ sign-ups with zero failures",
    tech: ["Playwright", "GitHub Actions", "Supabase", "TypeScript"],
    github: "https://github.com/znafi/iftar-autosign",
    image: "/images/autosign-screenshot.png",
    number: "01",
  },
  {
    title: "ChainCycle",
    description:
      "Peer-to-peer marketplace on the Internet Computer blockchain. Smart contracts handle escrow and settlement, removing the need for a central intermediary or fees.",
    stat: "Deployed on ICP mainnet with live smart contracts",
    tech: ["Internet Computer", "Motoko", "React", "Blockchain"],
    github: "https://github.com/znafi/Chain-Cycle",
    image: "/images/project-2.jpg",
    number: "02",
  },
  {
    title: "Lawyer-Up",
    description:
      "Full-text search engine for legal documents, indexing thousands of statutes with Elasticsearch. Returns precise results in under 200ms, built to handle large document sets reliably.",
    stat: "Sub-200ms search across 10K+ legal documents",
    tech: ["Flask", "React", "Elasticsearch", "Python"],
    github: "https://github.com/znafi/Lawyer-UP",
    image: "/images/project-3.jpg",
    number: "03",
  },
  {
    title: "LinkUP",
    description:
      "React Native app for discovering local events and activities. Firebase keeps data in sync across devices in real time, so users always see what's current near them.",
    stat: "Real-time sync across iOS and Android",
    tech: ["React Native", "Node.js", "Firebase", "Mobile"],
    github: "https://github.com/znafi/linkup",
    image: "/images/linkup-logo.png",
    number: "04",
  },
  {
    title: "Portfolio",
    description:
      "This site. Built with Next.js, Framer Motion, and Tailwind CSS. Features a 3D interactive skill sphere, drag-to-shuffle project cards, company-themed experience cards, and a custom cursor glow — all optimized for performance.",
    stat: "Custom animations, zero UI libraries",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/znafi/website-portfolio",
    image: "/images/portfolio-screenshot.png",
    number: "05",
  },
]

/* Depth offsets for card layering */
const DEPTH = [
  { y: 0,  scale: 1,    rotate: 0,    opacity: 1    },
  { y: 18, scale: 0.96, rotate: 2,    opacity: 1    },
  { y: 36, scale: 0.92, rotate: -1.5, opacity: 0.88 },
  { y: 54, scale: 0.88, rotate: 1.5,  opacity: 0.72 },
  { y: 70, scale: 0.84, rotate: -1,   opacity: 0.55 },
]

const THROW_X_THRESHOLD = 120
const THROW_V_THRESHOLD = 500

/* ---------- single stack card ---------- */
function StackCard({
  project,
  stackPos,
  isTop,
  onThrow,
  onDragStateChange,
}: {
  project: (typeof projects)[0]
  stackPos: number
  isTop: boolean
  onThrow: () => void
  onDragStateChange: (d: boolean) => void
}) {
  const x = useMotionValue(0)
  const dragRotate = useTransform(x, [-500, 500], [-14, 14])
  const depth = DEPTH[Math.min(stackPos, DEPTH.length - 1)]

  useEffect(() => {
    if (!isTop) x.set(0)
  }, [isTop, x])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    onDragStateChange(false)
    const shouldThrow =
      Math.abs(info.offset.x) > THROW_X_THRESHOLD ||
      Math.abs(info.velocity.x) > THROW_V_THRESHOLD

    if (shouldThrow) {
      const dir = info.offset.x > 0 ? 1 : -1
      animate(x, dir * 1600, {
        type: "tween",
        duration: 0.4,
        ease: [0.2, 0, 0.2, 1],
        onComplete: onThrow,
      })
    } else {
      animate(x, 0, { type: "spring", stiffness: 450, damping: 35 })
    }
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x,
        zIndex: 40 - stackPos * 10,
        ...(isTop ? { rotate: dragRotate } : {}),
      }}
      animate={{
        y: depth.y,
        scale: depth.scale,
        rotate: isTop ? 0 : depth.rotate,
        opacity: depth.opacity,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragStart={() => onDragStateChange(true)}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
    >
      {/* Card */}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full w-full overflow-hidden rounded-3xl border border-border bg-card"
        onClick={(e) => {
          if (Math.abs(x.get()) > 4) e.preventDefault()
        }}
        draggable={false}
      >
        {/* Left: image */}
        <div className="relative w-[44%] shrink-0 overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} project screenshot`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 45vw, 520px"
            draggable={false}
          />
          {/* Fade image into card background on the right edge */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80" />
          <div className="absolute inset-0 bg-background/10 transition-opacity duration-500 group-hover:opacity-0" />

          <span className="absolute bottom-5 left-5 font-mono text-xs text-white/30">
            {project.number}
          </span>
        </div>

        {/* Right: content */}
        <div className="flex flex-1 flex-col justify-between px-8 py-8 md:px-10">
          {/* Top */}
          <div>
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
                {project.title}
              </h3>
              <div className="mt-1 flex h-9 w-9 shrink-0 translate-y-1 scale-75 items-center justify-center rounded-full border border-foreground/20 bg-background/60 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4 text-foreground" />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {project.description}
            </p>
          </div>

          {/* Stat callout */}
          <p className="mt-4 font-mono text-[11px] text-foreground/40 group-hover:text-foreground/60 transition-colors">
            ↗ {project.stat}
          </p>

          {/* Bottom: tech tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground/70 transition-colors group-hover:border-foreground/20 group-hover:text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  )
}

/* ---------- the stack deck ---------- */
function CardStackDeck() {
  const [order, setOrder] = useState(projects.map((_, i) => i))
  const [dragging, setDragging] = useState(false)

  const sendToBack = useCallback((projectIdx: number) => {
    setOrder((prev) => [...prev.filter((i) => i !== projectIdx), projectIdx])
  }, [])

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Floating cloud wrapper */}
      <div
        className="cloud-stack relative w-full select-none touch-pan-y"
        style={{ height: 340 }}
        data-dragging={dragging}
      >
        {[...order].reverse().map((projectIdx) => {
          const stackPos = order.indexOf(projectIdx)
          return (
            <StackCard
              key={projectIdx}
              project={projects[projectIdx]}
              stackPos={stackPos}
              isTop={stackPos === 0}
              onThrow={() => sendToBack(projectIdx)}
              onDragStateChange={setDragging}
            />
          )
        })}
      </div>

      {/* Bottom controls */}
      <div className="flex w-full items-center justify-between">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                order[0] === i
                  ? "h-2 w-8 bg-foreground"
                  : "h-2 w-2 bg-foreground/20"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="font-mono text-xs text-muted-foreground/40">
          {String(order[0] + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>

        {/* Drag hint */}
        <p className="font-mono text-[11px] text-muted-foreground/30">
          drag to shuffle
        </p>
      </div>
    </div>
  )
}

/* ---------- main section ---------- */
export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

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
            03 / Selected Work
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

        {/* Card stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <CardStackDeck />
        </motion.div>
      </div>
    </section>
  )
}
