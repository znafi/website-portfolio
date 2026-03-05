"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

/* ---------- data ---------- */
const categories = [
  {
    name: "Languages",
    icon: "{ }",
    items: [
      { name: "TypeScript", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "Motoko", level: 60 },
    ],
  },
  {
    name: "Frontend",
    icon: "</>",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "React Native", level: 75 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    name: "Backend",
    icon: ">>>",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Flask", level: 80 },
      { name: "REST APIs", level: 92 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    name: "Data",
    icon: "DB",
    items: [
      { name: "PostgreSQL", level: 88 },
      { name: "Supabase", level: 85 },
      { name: "Firebase", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Elasticsearch", level: 70 },
    ],
  },
  {
    name: "DevOps",
    icon: "CI",
    items: [
      { name: "Docker", level: 80 },
      { name: "GitHub Actions", level: 88 },
      { name: "CI/CD", level: 85 },
      { name: "Git", level: 95 },
    ],
  },
  {
    name: "Other",
    icon: "**",
    items: [
      { name: "Playwright", level: 90 },
      { name: "Internet Computer", level: 65 },
      { name: "Smart Contracts", level: 60 },
      { name: "Blockchain", level: 55 },
    ],
  },
]

const allTechs = categories.flatMap((c) => c.items.map((i) => i.name))

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

/* ---------- interactive category panel ---------- */
function CategoryPanel({
  cat,
  isOpen,
  onToggle,
  index,
}: {
  cat: (typeof categories)[0]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accordion header */}
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between border-b border-border py-6 text-left transition-colors hover:border-foreground/20 md:py-8"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border font-mono text-xs text-muted-foreground/40 transition-all group-hover:border-foreground/20 group-hover:text-foreground/70 md:h-12 md:w-12 md:text-sm"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {cat.icon}
          </motion.span>
          <span className="text-xl font-medium tracking-tight text-foreground/80 transition-colors group-hover:text-foreground md:text-2xl lg:text-3xl">
            {cat.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs text-muted-foreground/30 md:block">
            {cat.items.length} skills
          </span>
          <motion.span
            className="text-xl text-muted-foreground/40 transition-colors group-hover:text-foreground"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            +
          </motion.span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2 md:py-8">
              {cat.items.map((tech, j) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: j * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group/item flex items-center gap-4 rounded-xl border border-transparent px-4 py-3 transition-colors hover:border-border hover:bg-card"
                >
                  {/* Circular progress */}
                  <div className="relative h-12 w-12 shrink-0">
                    <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-border"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-foreground/60 transition-colors group-hover/item:text-foreground"
                        strokeDasharray={`${2 * Math.PI * 20}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - tech.level / 100) }}
                        transition={{ duration: 1, delay: 0.2 + j * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-muted-foreground/50 transition-colors group-hover/item:text-foreground/70">
                      {tech.level}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground/80 transition-colors group-hover/item:text-foreground">
                      {tech.name}
                    </span>
                    {/* Thin progress bar as secondary indicator */}
                    <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full bg-border">
                      <motion.div
                        className="h-full rounded-full bg-foreground/30 transition-colors group-hover/item:bg-foreground/60"
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: 0.3 + j * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ---------- main ---------- */
export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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

        {/* Big heading with counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="max-w-2xl text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-tight text-foreground/80">
            Tools and technologies I use to bring ideas to production.
          </h2>
          <div className="flex items-baseline gap-2">
            <motion.span
              className="font-mono text-5xl font-bold text-foreground md:text-6xl"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              {allTechs.length}
            </motion.span>
            <span className="text-sm text-muted-foreground/50">technologies</span>
          </div>
        </motion.div>

        {/* Accordion panels */}
        <div>
          {categories.map((cat, i) => (
            <CategoryPanel
              key={cat.name}
              cat={cat}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
