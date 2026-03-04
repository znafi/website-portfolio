"use client"

import { Github, ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="px-6 py-20 md:px-0 md:py-28">
      <div className="mx-auto max-w-2xl">
        {/* Contact */}
        <div className="mb-16">
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl text-balance">
            {"Let's work together."}
          </h2>
          <p className="mb-8 max-w-md text-base text-muted-foreground">
            {"Always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
          </p>
          <a
            href="mailto:hello@zawadnafi.com"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Get in Touch
          </a>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px w-full bg-border" />

        {/* Bottom */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground/50">
            Built by Zawad Nafi
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/znafi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/50 transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://zstudios.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground/50 transition-colors hover:text-foreground"
              aria-label="ZStudios"
            >
              ZStudios
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
