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
  const isInView = useInView(ref, { margin: "-8%" })

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
  const isInView = useInView(ref, { margin: "-5%" })

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
  const isInView = useInView(sectionRef, { margin: "-10%" })

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
                Founder of ZStudios.
              </span>
            </h2>
          </RevealLine>

          <Note delay={0.2}>University of Alberta</Note>

          {/* What ZStudios is */}
          <div className="space-y-1 pt-6">
            <RevealLine>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                ZStudios is a digital agency where I work with businesses
              </p>
            </RevealLine>
            <RevealLine delay={0.06}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                to design and launch web products, AI automations,
              </p>
            </RevealLine>
            <RevealLine delay={0.12}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                SEO, and social media marketing.
              </p>
            </RevealLine>
          </div>

          {/* Leadership journey */}
          <div className="space-y-1 pt-6">
            <RevealLine>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                Starting the agency while studying
              </p>
            </RevealLine>
            <RevealLine delay={0.06}>
              <p className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold tracking-tight text-foreground/90">
                pushed me into a leadership role early.
              </p>
            </RevealLine>
          </div>

          <div className="space-y-1 pt-4">
            <RevealLine>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                Managing projects end-to-end,
              </p>
            </RevealLine>
            <RevealLine delay={0.06}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                working with clients,
              </p>
            </RevealLine>
            <RevealLine delay={0.12}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                turning ideas into working products.
              </p>
            </RevealLine>
          </div>

          {/* What drives you */}
          <div className="pt-8">
            <RevealLine>
              <h3 className="max-w-3xl text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-foreground">
                Building things that go from idea → product → people using it
              </h3>
            </RevealLine>
            <RevealLine delay={0.1}>
              <p className="mt-4 max-w-2xl text-xl leading-relaxed text-foreground/50 md:text-2xl">
                is what excites me most.
              </p>
            </RevealLine>
          </div>

          {/* What you learned */}
          <div className="space-y-1 pt-6">
            <RevealLine>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                Running ZStudios alongside university taught me
              </p>
            </RevealLine>
            <RevealLine delay={0.06}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                how to operate under real deadlines,
              </p>
            </RevealLine>
            <RevealLine delay={0.12}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                solve practical problems,
              </p>
            </RevealLine>
            <RevealLine delay={0.18}>
              <p className="text-xl leading-relaxed text-foreground/50 md:text-2xl">
                and deliver work that businesses rely on.
              </p>
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
                Looking for opportunities to contribute to meaningful products and collaborate with strong teams
              </span>
            </div>
          </RevealLine>
        </div>
      </div>
    </section>
  )
}
