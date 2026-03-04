"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Github, ExternalLink } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center px-6 pt-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Status line */}
        <div
          className={`mb-12 flex items-center gap-3 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
          </div>
          <span className="text-[13px] tracking-wide text-muted-foreground">
            Available for new opportunities
          </span>
        </div>

        {/* Main headline */}
        <div className="mb-8 overflow-hidden">
          <h1
            className={`text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tighter text-foreground transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
            }`}
          >
            Zawad Nafi
          </h1>
        </div>

        <div className="mb-6 overflow-hidden">
          <p
            className={`text-[clamp(2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-muted-foreground/40 transition-all duration-1000 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
            }`}
          >
            Software Engineer
          </p>
        </div>

        <div className="mb-16 overflow-hidden">
          <p
            className={`text-[clamp(2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-muted-foreground/20 transition-all duration-1000 delay-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
            }`}
          >
            {'& Agency Founder'}
          </p>
        </div>

        {/* Description */}
        <div
          className={`mb-12 max-w-xl transition-all duration-700 delay-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            I build products, write clean systems, and run{" "}
            <a
              href="https://zstudios.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-foreground/20 underline-offset-4 transition-all hover:decoration-foreground/60"
            >
              ZStudios
            </a>
            . Obsessed with code that actually ships.
          </p>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-[1200ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            View my work
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://github.com/znafi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-all hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href="https://zstudios.digital/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-all hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            ZStudios
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`mx-auto mt-auto mb-10 w-full max-w-6xl transition-all duration-700 delay-[1500ms] ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-start gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/30">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
