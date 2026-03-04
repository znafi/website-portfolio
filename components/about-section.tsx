"use client"

import { useReveal } from "@/hooks/use-reveal"

export function AboutSection() {
  const { ref, visible } = useReveal(0.15)

  return (
    <section id="about" ref={ref} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            01 / About
          </span>
        </div>

        {/* Big statement */}
        <div
          className={`mb-20 transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="max-w-4xl text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.2] tracking-tight text-foreground/90">
            {"I'm a software engineer who builds real products and doesn't just push pixels. I run a digital agency, ship side projects, and obsess over clean architecture."}
          </p>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <div
            className={`transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-6 h-px w-full bg-border" />
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              What I do
            </h3>
            <p className="text-[15px] leading-relaxed text-foreground/70">
              Full-stack engineering with a focus on web applications, browser automation, and distributed systems. From React frontends to Python backends.
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-6 h-px w-full bg-border" />
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              How I think
            </h3>
            <p className="text-[15px] leading-relaxed text-foreground/70">
              Systems-first approach. I care about architecture, scalability, and writing code that future-me won{"'"}t hate. Fundamentals transfer across any stack.
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-600 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-6 h-px w-full bg-border" />
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Beyond code
            </h3>
            <p className="text-[15px] leading-relaxed text-foreground/70">
              Founded ZStudios, a digital agency helping brands scale. I bridge engineering and business -- building products and growing companies at the same time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
