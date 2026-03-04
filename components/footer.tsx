"use client"

import { Github, ArrowUpRight, Mail } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"

export function Footer() {
  const { ref, visible } = useReveal(0.1)

  return (
    <footer id="contact" ref={ref} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div
          className={`mb-16 flex items-center gap-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            06 / Contact
          </span>
          <div
            className={`h-px flex-1 bg-border ${visible ? "animate-line-grow" : "scale-x-0"}`}
          />
        </div>

        {/* Big CTA */}
        <div
          className={`mb-20 transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter text-foreground">
            {"Let's build"}
            <br />
            <span className="text-muted-foreground/30">something great.</span>
          </h2>
          <p className="mb-10 max-w-md text-[15px] leading-relaxed text-foreground/60">
            {"Always open to discussing new projects, creative ideas, or opportunities. Drop a message and let's connect."}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:hello@zawadnafi.com"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://github.com/znafi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/50 hover:scale-[1.03] active:scale-[0.97]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-xs text-muted-foreground/30">
              Designed and built by Zawad Nafi
            </p>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/znafi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/30 transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://zstudios.digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground/30 transition-colors hover:text-foreground"
              >
                ZStudios
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
