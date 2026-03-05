"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView, useSpring, useMotionValue } from "framer-motion"

/* ---------- spring-based animated number ---------- */
function SpringNumber({ target, visible }: { target: number; visible: boolean }) {
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 20 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (visible) mv.set(target)
  }, [visible, target, mv])

  useEffect(() => {
    const unsub = spring.on("change", (v: number) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return <>{display}</>
}

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

  const stats = [
    { label: "Repos", value: 20, icon: "///" },
    { label: "Stars", value: 48, icon: "***" },
    { label: "Forks", value: 25, icon: "<->" },
    { label: "Followers", value: 30, icon: "@" },
  ]

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
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-tight text-foreground">
            GitHub
          </h2>
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

        {/* Stats counters with spring physics */}
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="spotlight-card glow-border group relative overflow-hidden rounded-2xl border border-border bg-card p-6"
            >
              {/* Background icon */}
              <span className="absolute right-3 top-3 font-mono text-[2rem] font-bold leading-none text-foreground/[0.03] transition-all duration-500 group-hover:text-foreground/[0.08]">
                {stat.icon}
              </span>
              <span className="relative block text-3xl font-bold tabular-nums text-foreground md:text-4xl">
                <SpringNumber target={stat.value} visible={isInView} />
                <span className="text-muted-foreground/30">+</span>
              </span>
              <span className="relative mt-1 block text-xs uppercase tracking-widest text-muted-foreground/50">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

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
            <div className="flex gap-[3px]" style={{ minWidth: 700 }}>
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
                      <motion.div
                        key={di}
                        className="h-[12px] w-[12px] rounded-[3px] hover:ring-1 hover:ring-foreground/20"
                        style={{
                          backgroundColor: `rgba(237, 237, 237, ${opacity})`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={
                          isInView
                            ? { opacity: 1, scale: 1 }
                            : {}
                        }
                        transition={{
                          duration: 0.3,
                          delay: 0.5 + wi * 0.008 + di * 0.015,
                          ease: [0.16, 1, 0.3, 1],
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
                style={{ backgroundColor: `rgba(237, 237, 237, ${op})` }}
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
