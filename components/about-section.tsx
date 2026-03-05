"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/* ---------- per-word reveal ---------- */
function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const words = text.split(" ")

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
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
    text: "Full-stack engineering with a focus on web applications, browser automation, and distributed systems. From React frontends to Python backends.",
  },
  {
    label: "How I think",
    text: "Systems-first approach. I care about architecture, scalability, and writing code that future-me won\u0027t hate. Fundamentals transfer across any stack.",
  },
  {
    label: "Beyond code",
    text: "Founded ZStudios, a digital agency helping brands scale. I bridge engineering and business -- building products and growing companies at the same time.",
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
            text="I'm a software engineer who builds real products and doesn't just push pixels. I run a digital agency, ship side projects, and obsess over clean architecture."
            className="max-w-4xl text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.2] tracking-tight text-foreground/90"
          />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {details.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="mb-6 h-px w-full bg-border"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ originX: 0 }}
              />
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground/80">
                {item.label}
              </h3>
              <p className="text-[15px] leading-relaxed text-foreground/70">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
