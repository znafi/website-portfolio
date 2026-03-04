"use client"

import { Github, ExternalLink, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-5xl">
        {/* Contact CTA */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-4xl text-balance">
            {"Let's"} work <span className="text-gradient">together.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            {"I'm"} always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <a
            href="mailto:hello@zawadnafi.com"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,200,200,0.3)]"
          >
            <Mail className="h-4 w-4" />
            Get in Touch
          </a>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px w-full bg-border" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Built with <Heart className="h-3 w-3 text-primary" /> by Zawad Nafi
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/znafi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://zstudios.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="ZStudios"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
