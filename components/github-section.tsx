"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { ArrowUpRight } from "lucide-react"

export function GithubSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  // Stable contribution data
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
    { label: "Repositories", value: "20+" },
    { label: "Stars", value: "48+" },
    { label: "Forks", value: "25+" },
    { label: "Followers", value: "30+" },
  ]

  return (
    <section id="github" ref={ref} className="px-6 py-20 md:px-0 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div
          className={`mb-10 flex items-start justify-between transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div>
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              GitHub
            </h2>
            <p className="text-base text-muted-foreground">
              Contributions, commits, and open-source work.
            </p>
          </div>
          <a
            href="https://github.com/znafi"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            @znafi
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {/* Stats */}
        <div
          className={`mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border p-4"
            >
              <span className="block text-2xl font-bold text-foreground">
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
          className={`rounded-xl border border-border p-5 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="mb-4 text-xs font-medium tracking-widest uppercase text-muted-foreground">
            Contribution Activity
          </p>

          <div className="overflow-x-auto">
            <div className="flex gap-[3px] min-w-[660px]">
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => {
                    const opacity =
                      level === 0 ? 0.06 : level === 1 ? 0.2 : level === 2 ? 0.4 : level === 3 ? 0.65 : 0.9
                    return (
                      <div
                        key={di}
                        className="h-[11px] w-[11px] rounded-[2px] transition-all duration-300"
                        style={{
                          backgroundColor: `rgba(250, 250, 250, ${opacity})`,
                          transitionDelay: visible ? `${wi * 8 + di * 15}ms` : "0ms",
                          opacity: visible ? 1 : 0,
                        }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-1.5">
            <span className="mr-1 text-[10px] text-muted-foreground/50">Less</span>
            {[0.06, 0.2, 0.4, 0.65, 0.9].map((op, i) => (
              <div
                key={i}
                className="h-[11px] w-[11px] rounded-[2px]"
                style={{ backgroundColor: `rgba(250, 250, 250, ${op})` }}
              />
            ))}
            <span className="ml-1 text-[10px] text-muted-foreground/50">More</span>
          </div>
        </div>
      </div>
    </section>
  )
}
