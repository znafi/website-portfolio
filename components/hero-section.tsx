"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

const descriptors = [
  "software engineer",
  "web developer",
  "founder of ZStudios",
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [descriptorIndex, setDescriptorIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setDescriptorIndex((prev) => (prev + 1) % descriptors.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="flex min-h-[90vh] flex-col justify-center px-6 md:px-0"
    >
      <div
        className={`mx-auto w-full max-w-2xl transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
          {"Hey there! I'm"}{" "}
          <span className="text-foreground">Zawad</span>
        </h1>

        <p className="mb-3 text-lg text-muted-foreground md:text-xl">
          {descriptors[descriptorIndex]}
        </p>

        <p className="mb-10 max-w-lg text-base leading-relaxed text-muted-foreground">
          I build real products, write clean code, and run a digital agency.
          I live and breathe programming.
        </p>

        <p className="mb-3 text-xs tracking-widest uppercase text-muted-foreground/60">
          I am also a
        </p>
        <div className="mb-12 flex flex-wrap gap-2">
          {[
            "system design enthusiast",
            "automation nerd",
            "blockchain builder",
            "agency founder",
            "problem solver",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            View Projects
          </a>
          <a
            href="https://github.com/znafi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
          >
            GitHub
          </a>
          <a
            href="https://zstudios.digital/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            ZStudios
          </a>
        </div>
      </div>

      <div className="mx-auto mt-auto mb-8 w-full max-w-2xl">
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
        >
          <ArrowDown className="h-3 w-3" />
          scroll
        </a>
      </div>
    </section>
  )
}
