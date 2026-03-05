"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Work", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
]

export function Navbar({ onOpenCommand }: { onOpenCommand?: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const { theme, setTheme } = useTheme()
  void onOpenCommand

  const update = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 50)
    setHidden(y > lastScrollY.current && y > 200)
    lastScrollY.current = y

    const sections = navItems.map((n) => document.getElementById(n.id))
    let current = ""
    for (const sec of sections) {
      if (sec && sec.getBoundingClientRect().top <= 200) current = sec.id
    }
    setActiveSection(current)
    ticking.current = false
  }, [])

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true
      requestAnimationFrame(update)
    }
  }, [update])

  useEffect(() => {
    setMounted(true)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: hidden ? -80 : 0,
        opacity: mounted ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          ZN
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              {/* Active indicator dot */}
              <AnimatePresence>
                {activeSection === item.id && (
                  <motion.span
                    className="absolute -bottom-1 left-1/2 h-[3px] w-[3px] rounded-full bg-foreground"
                    initial={{ scale: 0, x: "-50%" }}
                    animate={{ scale: 1, x: "-50%" }}
                    exit={{ scale: 0, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </AnimatePresence>
            </a>
          ))}
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mounted && theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Sun className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Moon className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>
    </motion.header>
  )
}
