"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/* ---------- per-word reveal (CSS-driven) ---------- */
function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const words = text.split(" ")

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="inline-block transition-all duration-500"
            style={{
              transitionDelay: `${i * 30}ms`,
              transform: isInView ? "translateY(0)" : "translateY(100%)",
              opacity: isInView ? 1 : 0,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </p>
  )
}

/* ---------- about card ---------- */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.3 + i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const details = [
  {
    label: "What I do",
    text: "Full-stack development across React, Python, TypeScript, and more. From polished UIs to backend services and automation pipelines, the focus is always on shipping something that works.",
  },
  {
    label: "How I think",
    text: "Good software isn't just functional. It's maintainable, scalable, and intentional. I try to understand the system before writing a line, which tends to lead to better decisions down the road.",
  },
  {
    label: "Beyond code",
    text: "While studying full-time, I founded ZStudios, taking it from an idea to a running agency with real clients and delivered projects. It's taught me as much about engineering as any course.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" })

  return (
    <section id="about" ref={sectionRef} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            01 / About
          </span>
          <motion.div
            className="h-px flex-1 bg-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Big statement with word-by-word reveal */}
        <div className="mb-20">
          <WordReveal
            text="Third-year CS student at the University of Alberta, with a running agency, shipped products, and real client work. Building in parallel with studying, not after."
            className="max-w-4xl text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.2] tracking-tight text-foreground/90"
          />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5">
          {details.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-md shadow-black/5 md:p-7"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Corner glow */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)" }}
              />
              <h3 className="relative mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                {item.label}
              </h3>
              <p className="relative text-[15px] leading-relaxed text-neutral-600">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
