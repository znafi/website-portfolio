"use client"

import { useReveal } from "@/hooks/use-reveal"
import { ArrowUpRight } from "lucide-react"
import { useMemo, useEffect, useState, useRef } from "react"

function AnimatedNumber({ target, visible }: { target: number; visible: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!visible || hasAnimated.current) return
    hasAnimated.current = true
    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [visible, target])

  return <>{count}</>
}

export function GithubSection() {
  const { ref, visible } = useReveal(0.1)

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
    { label: "Repos", value: 20 },
    { label: "Stars", value: 48 },
    { label: "Forks", value: 25 },
    { label: "Followers", value: 30 },
  ]

  return (
    <section id="github" ref={ref} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            05 / Open Source
          </span>
        </div>

        {/* Header */}
        <div
          className={`mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-tight text-foreground">
            GitHub
          </h2>
          <a
            href="https://github.com/znafi"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            @znafi
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Stats counters */}
        <div
          className={`mb-16 grid grid-cols-2 gap-4 md:grid-cols-4 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-xl border border-border bg-secondary/30 p-6 transition-all hover:bg-secondary/60"
            >
              <span className="block text-3xl font-bold tabular-nums text-foreground md:text-4xl">
                <AnimatedNumber target={stat.value} visible={visible} />
                <span className="text-muted-foreground/30">+</span>
              </span>
              <span className="mt-1 block text-xs uppercase tracking-widest text-muted-foreground/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Contribution graph */}
        <div
          className={`rounded-2xl border border-border bg-secondary/20 p-6 transition-all duration-700 delay-400 md:p-8 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
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
                      <div
                        key={di}
                        className="h-[12px] w-[12px] rounded-[3px] transition-all duration-500"
                        style={{
                          backgroundColor: `rgba(237, 237, 237, ${opacity})`,
                          transitionDelay: visible
                            ? `${500 + wi * 6 + di * 12}ms`
                            : "0ms",
                          opacity: visible ? 1 : 0,
                          transform: visible ? "scale(1)" : "scale(0)",
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
        </div>
      </div>
    </section>
  )
}
