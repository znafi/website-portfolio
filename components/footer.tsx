"use client"

import { useRef } from "react"
import { Github, ArrowUpRight, Mail } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useMagnetic } from "@/hooks/use-magnetic"

/* ---------- magnetic CTA button ---------- */
function MagneticCTA({
  children,
  className,
  ...props
}: React.ComponentProps<"a">) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.2)

  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}

/* ---------- word-by-word reveal heading ---------- */
function RevealHeading({
  words,
  isInView,
}: {
  words: { text: string; className?: string }[]
  isInView: boolean
}) {
  return (
    <h2 className="mb-8 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${w.className || "text-foreground"}`}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w.text}
            {"\u00A0"}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  const headingWords = [
    { text: "Let's" },
    { text: "build" },
    { text: "something", className: "text-muted-foreground/30" },
    { text: "great.", className: "text-muted-foreground/30" },
  ]

  return (
    <footer id="contact" ref={sectionRef} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            06 / Contact
          </span>
          <motion.div
            className="h-px flex-1 bg-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Big CTA with word-by-word reveal */}
        <div className="mb-20">
          <RevealHeading words={headingWords} isInView={isInView} />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 max-w-md text-[15px] leading-relaxed text-foreground/60"
          >
            {"Always open to discussing new projects, creative ideas, or opportunities. Drop a message and let's connect."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <MagneticCTA
              href="mailto:hello@zawadnafi.com"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 active:scale-[0.97]"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticCTA>
            <MagneticCTA
              href="https://github.com/znafi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/50 active:scale-[0.97]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </MagneticCTA>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-border pt-8"
        >
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
                className="animated-underline inline-flex items-center gap-1 text-xs text-muted-foreground/30 transition-colors hover:text-foreground"
              >
                ZStudios
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
