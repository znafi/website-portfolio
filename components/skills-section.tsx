"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useInView } from "framer-motion"

const categories = [
  {
    name: "Languages",
    items: [
      { name: "TypeScript", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "Motoko", level: 60 },
    ],
    icon: "{ }",
  },
  {
    name: "Frontend",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "React Native", level: 75 },
      { name: "Tailwind CSS", level: 95 },
    ],
    icon: "</>",
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Flask", level: 80 },
      { name: "REST APIs", level: 92 },
      { name: "GraphQL", level: 70 },
    ],
    icon: ">>>",
  },
  {
    name: "Data",
    items: [
      { name: "PostgreSQL", level: 88 },
      { name: "Supabase", level: 85 },
      { name: "Firebase", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Elasticsearch", level: 70 },
    ],
    icon: "DB",
  },
  {
    name: "DevOps",
    items: [
      { name: "Docker", level: 80 },
      { name: "GitHub Actions", level: 88 },
      { name: "CI/CD", level: 85 },
      { name: "Git", level: 95 },
    ],
    icon: "CI",
  },
  {
    name: "Other",
    items: [
      { name: "Playwright", level: 90 },
      { name: "Internet Computer", level: 65 },
      { name: "Smart Contracts", level: 60 },
      { name: "Blockchain", level: 55 },
    ],
    icon: "**",
  },
]

const marqueeItems = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Docker",
  "Playwright",
  "Firebase",
  "Elasticsearch",
  "React Native",
  "Flask",
  "Motoko",
  "Tailwind",
  "GraphQL",
  "MongoDB",
  "Git",
]

/* ---------- skill card ---------- */
function SkillCard({
  cat,
  index,
}: {
  cat: (typeof categories)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-10%" })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.15 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="spotlight-card glow-border group relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Background icon */}
      <motion.span
        className="absolute right-4 top-4 font-mono text-[3rem] font-bold leading-none text-foreground/[0.03]"
        animate={{ x: isHovered ? 0 : 8, opacity: isHovered ? 0.08 : 0.03 }}
        transition={{ duration: 0.4 }}
      >
        {cat.icon}
      </motion.span>

      <h3 className="relative mb-5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground/70">
        {cat.name}
      </h3>

      <div className="relative flex flex-col gap-3">
        {cat.items.map((tech, j) => (
          <div key={tech.name}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[13px] text-foreground/70 transition-colors group-hover:text-foreground/90">
                {tech.name}
              </span>
              <motion.span
                className="font-mono text-[11px] text-muted-foreground/40"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 + j * 0.05 }}
              >
                {tech.level}%
              </motion.span>
            </div>
            {/* Progress bar */}
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-foreground/40 group-hover:bg-foreground/60"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${tech.level}%` } : {}}
                transition={{
                  duration: 1,
                  delay: 0.4 + index * 0.1 + j * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transition: "background-color 0.3s" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ---------- main component ---------- */
export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  return (
    <section id="skills" ref={sectionRef} className="py-32 md:py-40">
      {/* Marquee ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-20 overflow-hidden border-y border-border py-6"
      >
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-8 font-mono text-sm text-muted-foreground/25 transition-colors hover:text-foreground md:text-base"
            >
              {item}
            </span>
          ))}
        </div>
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
            03 / Tech Stack
          </span>
          <motion.div
            className="h-px flex-1 bg-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="max-w-3xl text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-tight text-foreground/80">
            Tools and technologies I use to bring ideas to production.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <SkillCard key={cat.name} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
