"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  FolderOpen,
  Github,
  ExternalLink,
  User,
  Mail,
  Zap,
  Code2,
  ArrowRight,
  Search,
  X,
} from "lucide-react"

interface CommandItem {
  id: string
  label: string
  description: string
  icon: React.ElementType
  action: () => void
  category: string
}

export function CommandCenter({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const commands: CommandItem[] = [
    {
      id: "projects",
      label: "View Projects",
      description: "Browse selected work",
      icon: FolderOpen,
      action: () => scrollTo("projects"),
      category: "Navigate",
    },
    {
      id: "about",
      label: "About Me",
      description: "Background and approach",
      icon: User,
      action: () => scrollTo("about"),
      category: "Navigate",
    },
    {
      id: "skills",
      label: "Tech Stack",
      description: "Tools and technologies",
      icon: Code2,
      action: () => scrollTo("skills"),
      category: "Navigate",
    },
    {
      id: "founder",
      label: "ZStudios Agency",
      description: "Digital marketing agency",
      icon: Zap,
      action: () => scrollTo("founder"),
      category: "Navigate",
    },
    {
      id: "github-section",
      label: "GitHub Activity",
      description: "Contributions and stats",
      icon: Github,
      action: () => scrollTo("github"),
      category: "Navigate",
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch",
      icon: Mail,
      action: () => scrollTo("contact"),
      category: "Navigate",
    },
    {
      id: "open-github",
      label: "Open GitHub",
      description: "github.com/znafi",
      icon: Github,
      action: () => window.open("https://github.com/znafi", "_blank"),
      category: "External",
    },
    {
      id: "visit-zstudios",
      label: "Visit ZStudios",
      description: "zstudios.digital",
      icon: ExternalLink,
      action: () => window.open("https://zstudios.digital/", "_blank"),
      category: "External",
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
      if (e.key === "/" && !isOpen && !(e.target instanceof HTMLInputElement)) {
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
        setIsOpen(!isOpen)
        setQuery("")
        setSelectedIndex(0)
      }
    },
    [isOpen, setIsOpen]
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

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-background/90 pt-[18vh] backdrop-blur-xl animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === overlayRef.current) setIsOpen(false)
      }}
    >
      <div className="mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/60 animate-in slide-in-from-top-4 fade-in duration-300">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-4 w-4 text-muted-foreground/50" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInternalKeyDown}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md border border-border p-1 text-muted-foreground/40 transition-colors hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[340px] overflow-y-auto p-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="mb-1 mt-3 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/30 first:mt-1">
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
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                      selectedIndex === currentIndex
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <cmd.icon className="h-4 w-4 shrink-0 opacity-60" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium">{cmd.label}</p>
                      <p className="truncate text-[11px] opacity-40">
                        {cmd.description}
                      </p>
                    </div>
                    {selectedIndex === currentIndex && (
                      <ArrowRight className="h-3 w-3 shrink-0 opacity-40" />
                    )}
                  </button>
                )
              })}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground/30">
              No commands found.
            </p>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-5 border-t border-border px-5 py-2.5">
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/25">
            <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[9px]">
              {"↑↓"}
            </kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/25">
            <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[9px]">
              {"↵"}
            </kbd>
            Select
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/25">
            <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[9px]">
              esc
            </kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  )
}
