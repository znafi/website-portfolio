"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ArrowDown, Github, ExternalLink } from "lucide-react"
import Image from "next/image"

function useTextScramble(text: string, trigger: boolean, delay: number = 0) {
  const [display, setDisplay] = useState("")
  const chars = "!<>-_\\/[]{}#$%^&*()=+~`|;:,.?"

  useEffect(() => {
    if (!trigger) return
    const timeout = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " "
              if (i < iteration) return text[i]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
        )
        iteration += 1 / 2
        if (iteration >= text.length) {
          clearInterval(interval)
          setDisplay(text)
        }
      }, 30)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [trigger, text, delay, chars])

  return display
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const name = useTextScramble("Zawad Nafi", mounted, 600)
  const role1 = useTextScramble("Software Engineer", mounted, 1200)
  const role2 = useTextScramble("& Agency Founder", mounted, 1800)
  const imageRef = useRef<HTMLDivElement>(null)
  const [imageInView, setImageInView] = useState(false)

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setImageInView(true) },
      { threshold: 0.3 }
    )
    if (imageRef.current) observer.observe(imageRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)"
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center px-6 pt-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* Text content */}
          <div>
            {/* Status */}
            <div
              className={`mb-10 flex items-center gap-3 transition-all duration-700 delay-200 ${
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

            {/* Name with scramble */}
            <div className="mb-6 overflow-hidden">
              <h1
                className={`font-mono text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-tighter text-foreground transition-all duration-1000 delay-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                }`}
              >
                {name || "\u00A0"}
              </h1>
            </div>

            <div className="mb-4 overflow-hidden">
              <p
                className={`font-mono text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1] tracking-tight text-foreground/30 transition-all duration-1000 delay-700 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                }`}
              >
                {role1 || "\u00A0"}
              </p>
            </div>

            <div className="mb-12 overflow-hidden">
              <p
                className={`font-mono text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1] tracking-tight text-foreground/15 transition-all duration-1000 delay-1000 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                }`}
              >
                {role2 || "\u00A0"}
              </p>
            </div>

            {/* Description */}
            <div
              className={`mb-10 max-w-lg transition-all duration-700 delay-[1400ms] ${
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
              className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-[1600ms] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                View my work
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="https://github.com/znafi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/50 hover:scale-[1.03] active:scale-[0.97]"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href="https://zstudios.digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/50 hover:scale-[1.03] active:scale-[0.97]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                ZStudios
              </a>
            </div>
          </div>

          {/* Portrait image with tilt */}
          <div
            ref={imageRef}
            className={`relative hidden lg:block transition-all duration-1000 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="tilt-card image-hover-zoom relative h-[420px] w-[340px] overflow-hidden rounded-2xl border border-border"
            >
              <div
                className={`relative h-full w-full ${imageInView ? "animate-image-reveal" : "opacity-0"}`}
              >
                <Image
                  src="/images/portrait.jpg"
                  alt="Portrait of Zawad Nafi"
                  fill
                  className="object-cover"
                  sizes="340px"
                  priority
                />
              </div>
              {/* Overlay shimmer */}
              <div className="absolute inset-0 animate-shimmer" />
            </div>
            {/* Caption */}
            <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground/30">
              {"< replace with your photo />"}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`mx-auto mt-auto mb-10 w-full max-w-6xl transition-all duration-700 delay-[2000ms] ${
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
