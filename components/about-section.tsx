"use client"

import { useRef } from "react"
import { Code2, Lightbulb, Rocket } from "lucide-react"
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
    number: "01",
    label: "What I do",
    text: "Full-stack development across React, Python, TypeScript, and more. From polished UIs to backend services and automation pipelines, the focus is always on shipping something that works.",
    icon: Code2,
    iconBg: "#4f46e5",
  },
  {
    number: "02",
    label: "How I think",
    text: "Good software isn't just functional. It's maintainable, scalable, and intentional. I try to understand the system before writing a line, which tends to lead to better decisions down the road.",
    icon: Lightbulb,
    iconBg: "#eab308",
  },
  {
    number: "03",
    label: "Beyond code",
    text: "While studying full-time, I founded ZStudios, taking it from an idea to a running agency with real clients and delivered projects. It's taught me as much about engineering as any course.",
    icon: Rocket,
    iconBg: "#10b981",
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
          {details.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] md:p-7"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                {/* Icon + Number row */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: item.iconBg }}>
                    <Icon className="h-5 w-5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-neutral-300">
                    {item.number}
                  </span>
                </div>

                {/* Label */}
                <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-neutral-900 md:text-3xl">
                  {item.label}
                </h3>

                {/* Body */}
                <p className="text-[14px] font-semibold leading-relaxed text-neutral-800">
                  {item.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
