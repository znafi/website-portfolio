"use client"

import { useRef, useMemo } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

/* ---------- main component ---------- */
export function GithubSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  const contributions = useMemo(() => {
    const seed = 42
    const weeks = 52
    const days = 7
    let s = seed
    return Array.from({ length: weeks }, () =>
      Array.from({ length: days }, () => {
        s = (s * 16807 + 0) % 2147483647
        return s % 5
      })
    )
  }, [])

  return (
    <section id="github" ref={sectionRef} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            05 / Open Source
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
          <div>
            <h2 className="mb-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-tight text-foreground">
              GitHub
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground/60">
              Most of my work is open-source. The code, commit history, and early iterations are all there to look through.
            </p>
          </div>
          <a
            href="https://github.com/znafi"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-underline group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            @znafi
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Contribution graph with wave animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
              Contribution Activity
            </p>
            <span className="font-mono text-xs text-muted-foreground/30">
              Last 12 months
            </span>
          </div>

            <div className="overflow-x-auto">
            <div
              className="flex gap-[3px] transition-opacity duration-700"
              style={{ minWidth: 700, opacity: isInView ? 1 : 0 }}
            >
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => {
                    const opacity =
                      level === 0
                        ? 0.04
                        : level === 1
                        ? 0.15
                        : level === 2
                        ? 0.35
                        : level === 3
                        ? 0.6
                        : 0.9
                    return (
                      <div
                        key={di}
                        className="h-[12px] w-[12px] rounded-[3px] hover:ring-1 hover:ring-foreground/20"
                        style={{
                          backgroundColor: `color-mix(in srgb, var(--foreground) ${Math.round(opacity * 100)}%, transparent)`,
                        }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-1.5">
            <span className="mr-1 text-[10px] text-muted-foreground/30">
              Less
            </span>
            {[0.04, 0.15, 0.35, 0.6, 0.9].map((op, i) => (
              <div
                key={i}
                className="h-[12px] w-[12px] rounded-[3px]"
                style={{ backgroundColor: `color-mix(in srgb, var(--foreground) ${Math.round(op * 100)}%, transparent)` }}
              />
            ))}
            <span className="ml-1 text-[10px] text-muted-foreground/30">
              More
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
