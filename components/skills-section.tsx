"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import {
  Code2,
  Database,
  Server,
  Box,
  GitBranch,
  Flame,
  Wind,
  Smartphone,
  Braces,
  Search,
  Workflow,
  Video,
  Send,
  Globe,
  type LucideIcon,
} from "lucide-react"
import { motion, useInView } from "framer-motion"

/* ---------- data ---------- */
const categories = [
  {
    name: "Languages",
    items: ["HTML", "CSS", "TypeScript", "JavaScript", "Python", "SQL", "C++", "Motoko"],
  },
  {
    name: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express", "Flask", "REST APIs", "GraphQL", "Prisma"],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "Supabase", "Firebase", "MongoDB", "SQLite", "Elasticsearch"],
  },
  {
    name: "DevOps & Tools",
    items: ["Git", "Docker", "GitHub Actions", "Playwright", "VS Code", "Postman"],
  },
  {
    name: "CMS",
    items: ["Drupal"],
  },
]

const allTechs = categories.flatMap((c) => c.items)

/* ---------- infinite marquee ---------- */
function InfiniteMarquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden border-y border-border py-5">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${reverse ? "40s" : "35s"} linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 font-mono text-sm text-muted-foreground/20 transition-colors duration-300 hover:text-foreground md:mx-8 md:text-base"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- 3D sphere tag cloud ---------- */

interface TagPoint {
  text: string
  x: number
  y: number
  z: number
}

function fibonacciSphere(tags: string[]): TagPoint[] {
  const n = tags.length
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  return tags.map((text, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const radiusAtY = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    return {
      text,
      x: Math.cos(theta) * radiusAtY,
      y,
      z: Math.sin(theta) * radiusAtY,
    }
  })
}

function rotateX(p: TagPoint, angle: number): TagPoint {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return { ...p, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos }
}

function rotateY(p: TagPoint, angle: number): TagPoint {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return { ...p, x: p.x * cos + p.z * sin, z: -p.x * sin + p.z * cos }
}

function SphereCloud({ techs }: { techs: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasPoints = useRef(fibonacciSphere(techs))
  const angleX = useRef(0)
  const angleY = useRef(0)
  const targetSpeedX = useRef(0.002)
  const targetSpeedY = useRef(0.004)
  const speedX = useRef(0.002)
  const speedY = useRef(0.004)
  const raf = useRef(0)
  const [rendered, setRendered] = useState<
    { text: string; tx: number; ty: number; scale: number; opacity: number }[]
  >([])
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    canvasPoints.current = fibonacciSphere(techs)
  }, [techs])

  const tick = useCallback(() => {
    speedX.current += (targetSpeedX.current - speedX.current) * 0.08
    speedY.current += (targetSpeedY.current - speedY.current) * 0.08

    angleX.current += speedX.current
    angleY.current += speedY.current

    const container = containerRef.current
    if (!container) {
      raf.current = requestAnimationFrame(tick)
      return
    }
    const rect = container.getBoundingClientRect()
    const radius = Math.min(rect.width, rect.height) * 0.42

    const items = canvasPoints.current.map((p) => {
      const r1 = rotateX(p, angleX.current)
      const r2 = rotateY(r1, angleY.current)
      const fov = 600
      const perspective = fov / (fov + r2.z * radius)
      return {
        text: p.text,
        tx: r2.x * radius * perspective,
        ty: r2.y * radius * perspective,
        scale: perspective,
        opacity: Math.max(0.15, (r2.z + 1) / 2),
      }
    })

    setRendered(items)
    raf.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [tick])

  const lastTouch = useRef({ x: 0, y: 0 })
  const isTouching = useRef(false)

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch") return // handled by touch handlers
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const mx = (e.clientX - rect.left) / rect.width - 0.5
      const my = (e.clientY - rect.top) / rect.height - 0.5
      targetSpeedX.current = -my * 0.025
      targetSpeedY.current = mx * 0.025
    },
    []
  )

  const handlePointerLeave = useCallback(() => {
    if (!isTouching.current) {
      targetSpeedX.current = 0.002
      targetSpeedY.current = 0.004
    }
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    isTouching.current = true
    lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dx = e.touches[0].clientX - lastTouch.current.x
    const dy = e.touches[0].clientY - lastTouch.current.y
    lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    targetSpeedX.current = (-dy / rect.height) * 0.8
    targetSpeedY.current = (dx / rect.width) * 0.8
  }, [])

  const handleTouchEnd = useCallback(() => {
    isTouching.current = false
    targetSpeedX.current = 0.002
    targetSpeedY.current = 0.004
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[600px] min-h-[320px] cursor-grab select-none touch-none active:cursor-grabbing"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {rendered.map((item) => {
        const isHovered = hovered === item.text
        const fontSize = item.scale > 1.1 ? "text-[11px] md:text-lg" : item.scale > 0.9 ? "text-[10px] md:text-base" : "text-[9px] md:text-sm"

        return (
          <div
            key={item.text}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
            style={{
              transform: `translate(-50%, -50%) translate(${item.tx}px, ${item.ty}px) scale(${item.scale})`,
              opacity: isHovered ? 1 : item.opacity,
              zIndex: Math.round(item.scale * 100),
              transition: "opacity 0.3s",
            }}
            onPointerEnter={() => setHovered(item.text)}
            onPointerLeave={() => setHovered(null)}
          >
            <span
              className={`font-mono font-medium tracking-tight transition-all duration-300 ${fontSize} ${
                isHovered
                  ? "text-foreground scale-125"
                  : "text-foreground/70"
              }`}
              style={
                isHovered
                  ? { textShadow: "0 0 24px currentColor" }
                  : undefined
              }
            >
              {item.text}
            </span>
          </div>
        )
      })}

      {/* Center glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "40%",
          height: "40%",
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}

/* ---------- Lucide icon mapping (no external CDN) ---------- */
const techIconMap: Partial<Record<string, LucideIcon>> = {
  "HTML": Code2,
  "CSS": Code2,
  "TypeScript": Braces,
  "JavaScript": Braces,
  "Python": Code2,
  "SQL": Database,
  "C++": Braces,
  "React": Box,
  "Next.js": Box,
  "React Native": Smartphone,
  "Tailwind CSS": Wind,
  "Node.js": Server,
  "Express": Server,
  "Flask": Server,
  "REST APIs": Server,
  "GraphQL": Database,
  "Prisma": Database,
  "PostgreSQL": Database,
  "Supabase": Database,
  "Firebase": Flame,
  "MongoDB": Database,
  "SQLite": Database,
  "Elasticsearch": Search,
  "Git": GitBranch,
  "Docker": Box,
  "GitHub Actions": Workflow,
  "Playwright": Video,
  "VS Code": Code2,
  "Postman": Send,
  "Drupal": Globe,
}

function TechIcon({ name }: { name: string }) {
  const Icon = techIconMap[name]
  if (Icon) {
    return (
      <Icon size={18} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="shrink-0" />
    )
  }
  return (
    <span className="flex h-[18px] w-[18px] items-center justify-center font-mono text-[9px] font-bold uppercase">
      {name.slice(0, 2)}
    </span>
  )
}

/* ---------- icon grid ---------- */
function TechIconGrid({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-6"
    >
      {categories.map((cat, ci) => (
        <div key={cat.name} className="mb-10">
          <p
            className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white"
            style={{ textShadow: "0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.15)" }}
          >
            {cat.name}
          </p>
          <div className="flex flex-wrap gap-3">
            {cat.items.map((item, ii) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.65 + ci * 0.05 + ii * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-center gap-2.5 rounded-xl border border-white/20 bg-black/90 px-3.5 py-2.5 transition-all hover:border-white/35 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
              >
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center text-white">
                  <TechIcon name={item} />
                </span>
                <span className="font-mono text-[12px] text-white/80 transition-colors group-hover:text-white">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

/* ---------- main ---------- */
export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  return (
    <section id="skills" ref={sectionRef} className="py-32 md:py-40">
      {/* Double marquee ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-20 flex flex-col gap-0"
      >
        <InfiniteMarquee items={allTechs} />
        <InfiniteMarquee items={[...allTechs].reverse()} reverse />
      </motion.div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            04 / Tech Stack
          </span>
          <motion.div
            className="h-px flex-1 bg-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Heading + count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="max-w-2xl text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-tight text-foreground/80">
            Tools and technologies I use to bring ideas to production.
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-5xl font-bold text-foreground md:text-6xl">
              {allTechs.length}
            </span>
            <span className="text-sm text-muted-foreground/50">technologies</span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground/30"
        >
          move your cursor to interact
        </motion.p>

        {/* 3D Sphere Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <SphereCloud techs={allTechs} />
        </motion.div>

        {/* Icon grid by category */}
        <TechIconGrid isInView={isInView} />
      </div>
    </section>
  )
}
