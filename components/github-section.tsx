"use client"

import { useEffect, useRef, useState } from "react"
import { Github, GitFork, Star, Users } from "lucide-react"

export function GithubSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    const current = sectionRef.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  // Simulated contribution data for the graph
  const weeks = 52
  const days = 7
  const contributions = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.floor(Math.random() * 5))
  )

  const stats = [
    { icon: Star, label: "Stars Earned", value: "48+" },
    { icon: GitFork, label: "Forks", value: "25+" },
    { icon: Users, label: "Followers", value: "30+" },
    { icon: Github, label: "Repositories", value: "20+" },
  ]

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-5xl">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 font-mono text-sm text-primary">{"// github"}</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl text-balance">
            Open source <span className="text-gradient">activity.</span>
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Contributions, commits, and code in the open.
          </p>
        </div>

        {/* Stats row */}
        <div
          className={`mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass flex flex-col items-center rounded-xl p-5 text-center transition-all hover:glow-border"
            >
              <stat.icon className="mb-2 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Contribution graph */}
        <div
          className={`glass overflow-hidden rounded-xl p-6 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-mono text-sm text-muted-foreground">
              Contribution Activity
            </h3>
            <a
              href="https://github.com/znafi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Github className="h-3 w-3" />
              @znafi
            </a>
          </div>

          {/* Grid graph */}
          <div className="overflow-x-auto">
            <div className="flex gap-[3px] min-w-[700px]">
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className="h-[12px] w-[12px] rounded-[2px] transition-all duration-500"
                      style={{
                        backgroundColor:
                          level === 0
                            ? "oklch(0.18 0.01 260)"
                            : level === 1
                            ? "oklch(0.72 0.19 195 / 0.25)"
                            : level === 2
                            ? "oklch(0.72 0.19 195 / 0.5)"
                            : level === 3
                            ? "oklch(0.72 0.19 195 / 0.75)"
                            : "oklch(0.72 0.19 195)",
                        transitionDelay: isVisible
                          ? `${wi * 15 + di * 30}ms`
                          : "0ms",
                        opacity: isVisible ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-end gap-1.5">
            <span className="mr-2 text-xs text-muted-foreground">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="h-[12px] w-[12px] rounded-[2px]"
                style={{
                  backgroundColor:
                    level === 0
                      ? "oklch(0.18 0.01 260)"
                      : level === 1
                      ? "oklch(0.72 0.19 195 / 0.25)"
                      : level === 2
                      ? "oklch(0.72 0.19 195 / 0.5)"
                      : level === 3
                      ? "oklch(0.72 0.19 195 / 0.75)"
                      : "oklch(0.72 0.19 195)",
                }}
              />
            ))}
            <span className="ml-2 text-xs text-muted-foreground">More</span>
          </div>
        </div>
      </div>
    </section>
  )
}
