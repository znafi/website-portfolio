"use client"

import { useEffect, useState } from "react"
import { Github, ExternalLink, ChevronDown } from "lucide-react"

const roles = [
  "Software Engineer",
  "Web Developer",
  "Founder of ZStudios",
]

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-chart-2/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/5 blur-[80px] animate-pulse-glow" style={{ animationDelay: "0.75s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className={`relative z-10 mx-auto max-w-4xl text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Status badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-sm font-medium text-primary">
            Available for opportunities
          </span>
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="text-balance">Zawad</span>{" "}
          <span className="text-gradient">Nafi</span>
        </h1>

        {/* Rotating roles */}
        <div className="mb-8 h-10 overflow-hidden">
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${currentRole * 40}px)` }}
          >
            {roles.map((role) => (
              <p
                key={role}
                className="flex h-10 items-center justify-center font-mono text-lg text-muted-foreground md:text-xl"
              >
                <span className="text-primary mr-2">{">"}</span> {role}
              </p>
            ))}
          </div>
        </div>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Building real products, crafting elegant code, and running a digital
          agency. I turn ideas into software that makes an impact.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,200,200,0.3)]"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 -translate-x-full bg-chart-2/30 transition-transform duration-300 group-hover:translate-x-0" />
          </a>
          <a
            href="https://github.com/znafi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 font-medium text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://zstudios.digital/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 font-medium text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
          >
            <ExternalLink className="h-4 w-4" />
            ZStudios
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
