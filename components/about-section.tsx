"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/* ---------- scroll-triggered line reveal ---------- */
function RevealLine({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-8%" })

  const offsets = {
    up: { y: 50, x: 0 },
    left: { y: 0, x: -50 },
    right: { y: 0, x: 50 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- inline annotation ---------- */
function Note({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="my-8 flex items-center gap-4"
    >
      <div className="h-px w-10 bg-foreground/15" />
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/25">
        {children}
      </span>
    </motion.div>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  return (
    <section id="about" ref={sectionRef} className="px-6 py-32 md:py-44">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 flex items-center gap-4"
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

        {/* ——— ABOUT CONTENT ——— */}
        <div className="space-y-3">
          {/* Opening */}
          <RevealLine>
            <h2 className="text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-tighter text-foreground">
              Third-year CS student.
            </h2>
          </RevealLine>

          <RevealLine delay={0.12}>
            <h2 className="text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-tighter">
              <span className="bg-gradient-to-r from-foreground via-foreground/70 to-foreground/30 bg-clip-text text-transparent">
                Full-stack developer.
              </span>
            </h2>
          </RevealLine>

          <Note delay={0.2}>University of Alberta</Note>

          {/* What I do */}
          <div className="space-y-1 pt-6">
            <RevealLine>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                I build web applications end-to-end.
              </p>
            </RevealLine>
            <RevealLine delay={0.06}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                React frontends, Python backends,
              </p>
            </RevealLine>
            <RevealLine delay={0.12}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                deployed to production.
              </p>
            </RevealLine>
          </div>

          <Note>React · Python · TypeScript · Flask · Next.js</Note>

          {/* Experience */}
          <div className="space-y-1 pt-6">
            <RevealLine>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                Founded <span className="font-semibold text-foreground/85">ZStudios</span> in 2024.
              </p>
            </RevealLine>
            <RevealLine delay={0.06}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                Delivered projects for 5+ clients.
              </p>
            </RevealLine>
            <RevealLine delay={0.12}>
              <p className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold tracking-tight text-foreground/90">
                Balanced agency work with full-time studies.
              </p>
            </RevealLine>
          </div>

          {/* Projects */}
          <div className="space-y-1 pt-6">
            <RevealLine>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                Built an automated event registration system
              </p>
            </RevealLine>
            <RevealLine delay={0.06}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                that handled 30+ sign-ups with zero failures.
              </p>
            </RevealLine>
          </div>

          <div className="space-y-1 pt-4">
            <RevealLine>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                Deployed a blockchain marketplace on ICP mainnet
              </p>
            </RevealLine>
            <RevealLine delay={0.06}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                with smart contracts handling escrow.
              </p>
            </RevealLine>
          </div>

          <div className="space-y-1 pt-4">
            <RevealLine>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                Created a legal document search engine
              </p>
            </RevealLine>
            <RevealLine delay={0.06}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                indexing 10,000+ documents with sub-200ms queries.
              </p>
            </RevealLine>
          </div>

          {/* Approach */}
          <div className="pt-8">
            <RevealLine>
              <h3 className="max-w-3xl text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-foreground">
                I focus on solving problems, not just writing code.
              </h3>
            </RevealLine>
          </div>

          {/* Currently */}
          <RevealLine delay={0.1}>
            <div className="flex items-center gap-3 pt-12">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[12px] tracking-wide text-foreground/30">
                Open to internship opportunities for Summer 2026
              </span>
            </div>
          </RevealLine>
        </div>
      </div>
    </section>
  )
}
