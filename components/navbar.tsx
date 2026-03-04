"use client"

import { useEffect, useState } from "react"
import { Terminal } from "lucide-react"

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Agency", href: "#founder" },
  { label: "GitHub", href: "#github" },
]

export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      } ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : ""}`}
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
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={onOpenCommand}
          className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[12px] text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
        >
          <Terminal className="h-3 w-3" />
          <span className="hidden md:inline">
            {'Press /'}
          </span>
          <span className="md:hidden">Menu</span>
        </button>
      </nav>
    </header>
  )
}
