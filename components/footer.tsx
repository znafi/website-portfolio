"use client"

import { useRef, useState } from "react"
import { Github, ArrowUpRight, Mail, Linkedin, FileText, Send, CheckCircle, MessageCircle } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"
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

/* ---------- inline contact form ---------- */
function ContactForm({ isInView }: { isInView: boolean }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setSending(true)
    setError(false)
    
    try {
      const res = await fetch("https://formspree.io/f/mojkw0re", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          name, 
          email, 
          message 
        }),
      })
      
      console.log('Formspree response status:', res.status)
      
      if (res.ok) {
        setSent(true)
        setName("")
        setEmail("")
        setMessage("")
      } else {
        console.error('Formspree error:', await res.text())
        setError(true)
      }
    } catch (err) {
      console.error('Form submission error:', err)
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="mb-4 w-full max-w-xl"
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-6 text-sm text-foreground/70"
          >
            <CheckCircle className="h-5 w-5 shrink-0 text-foreground/50" />
            Thanks! I'll get back to you within 24 hours.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground/40 outline-none transition-colors focus:border-foreground/30 focus:bg-secondary/40"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground/40 outline-none transition-colors focus:border-foreground/30 focus:bg-secondary/40"
              />
            </div>
            <textarea
              placeholder="What are you working on?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground/40 outline-none transition-colors focus:border-foreground/30 focus:bg-secondary/40"
            />
            <button
              type="submit"
              disabled={sending}
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.97] disabled:opacity-60"
            >
              <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              {sending ? "Sending…" : "Send message"}
            </button>
            {error && (
              <p className="text-sm text-red-500">
                Failed to send message. Please try again or email me directly at znafi@ualberta.ca
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Footer({ onOpenChat }: { onOpenChat?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  const headingWords = [
    { text: "Get" },
    { text: "in" },
    { text: "touch.", className: "text-muted-foreground/30" },
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
            05 / Contact
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
            {"Open to full-time roles, internships, and freelance projects. If you have something worth building, feel free to reach out."}
          </motion.p>

          {/* Inline contact form */}
          <ContactForm isInView={isInView} />

          {/* Chat nudge */}
          {onOpenChat && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 mt-4"
            >
              <button
                onClick={onOpenChat}
                className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-foreground/[0.04] px-5 py-2.5 text-sm text-foreground/70 transition-all hover:bg-foreground/[0.08] hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                Prefer to chat? Ask my AI assistant
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-wrap gap-4"
          >
            <MagneticCTA
              href="mailto:znafi@ualberta.ca"
              className="group inline-flex items-center gap-3 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/50 active:scale-[0.97]"
            >
              <Mail className="h-4 w-4" />
              znafi@ualberta.ca
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticCTA>
            <MagneticCTA
              href="https://linkedin.com/in/zawadnafi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/50 active:scale-[0.97]"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
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
            <MagneticCTA
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/50 active:scale-[0.97]"
            >
              <FileText className="h-4 w-4" />
              Resume
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
              Designed, built & shipped by Zawad Nafi
            </p>

            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com/in/zawadnafi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/30 transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
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
