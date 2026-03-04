"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  FolderOpen,
  Github,
  ExternalLink,
  User,
  Mail,
  Terminal,
  Zap,
  Code2,
  ArrowRight,
  Search,
} from "lucide-react"

interface CommandItem {
  id: string
  label: string
  description: string
  icon: React.ElementType
  action: () => void
  category: string
}

export function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const commands: CommandItem[] = [
    {
      id: "projects",
      label: "View Projects",
      description: "Browse my featured work",
      icon: FolderOpen,
      action: () => scrollTo("projects"),
      category: "Navigate",
    },
    {
      id: "about",
      label: "About",
      description: "Learn more about me",
      icon: User,
      action: () => scrollTo("about"),
      category: "Navigate",
    },
    {
      id: "skills",
      label: "Tech Stack",
      description: "See my technologies",
      icon: Code2,
      action: () => scrollTo("skills"),
      category: "Navigate",
    },
    {
      id: "founder",
      label: "ZStudios Agency",
      description: "My digital agency",
      icon: Zap,
      action: () => scrollTo("founder"),
      category: "Navigate",
    },
    {
      id: "github-section",
      label: "GitHub Stats",
      description: "Open-source activity",
      icon: Github,
      action: () => scrollTo("github"),
      category: "Navigate",
    },
    {
      id: "open-github",
      label: "Open GitHub",
      description: "github.com/znafi",
      icon: Github,
      action: () => window.open("https://github.com/znafi", "_blank"),
      category: "Links",
    },
    {
      id: "visit-zstudios",
      label: "Visit ZStudios",
      description: "zstudios.digital",
      icon: ExternalLink,
      action: () => window.open("https://zstudios.digital/", "_blank"),
      category: "Links",
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch",
      icon: Mail,
      action: () => scrollTo("contact"),
      category: "Links",
    },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen) {
        e.preventDefault()
        setIsOpen(true)
        setQuery("")
        setSelectedIndex(0)
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        setQuery("")
        setSelectedIndex(0)
      }
    },
    [isOpen]
  )

  const handleInternalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1))
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    }
    if (e.key === "Enter" && filtered[selectedIndex]) {
      filtered[selectedIndex].action()
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {})

  let flatIndex = -1

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => {
          setIsOpen(true)
          setQuery("")
          setSelectedIndex(0)
        }}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all hover:border-foreground/30 md:bottom-8 md:right-8"
        aria-label="Open command center"
      >
        <Terminal className="h-4 w-4" />
      </button>

      {/* Keyboard hint */}
      <div className="fixed bottom-6 right-20 z-50 hidden items-center gap-1.5 md:bottom-8 md:right-22 md:flex">
        <span className="text-[10px] text-muted-foreground/50">Press</span>
        <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/60">
          /
        </kbd>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-background/80 pt-[20vh] backdrop-blur-sm animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === overlayRef.current) setIsOpen(false)
          }}
        >
          <div className="mx-4 w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/50 animate-in slide-in-from-top-4 fade-in duration-200">
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInternalKeyDown}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/50">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto p-1.5">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <p className="mb-1 mt-2 px-3 text-[10px] font-medium tracking-widest uppercase text-muted-foreground/40">
                    {category}
                  </p>
                  {items.map((cmd) => {
                    flatIndex++
                    const currentIndex = flatIndex
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => {
                          cmd.action()
                          setIsOpen(false)
                        }}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                          selectedIndex === currentIndex
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <cmd.icon className="h-4 w-4 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm">{cmd.label}</p>
                          <p className="truncate text-[11px] opacity-50">
                            {cmd.description}
                          </p>
                        </div>
                        {selectedIndex === currentIndex && (
                          <ArrowRight className="h-3 w-3 shrink-0 text-foreground/50" />
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}

              {filtered.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground/50">
                  No commands found.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-border px-4 py-2">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground/40">
                <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[9px]">
                  {"↑↓"}
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground/40">
                <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[9px]">
                  {"↵"}
                </kbd>
                Select
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
