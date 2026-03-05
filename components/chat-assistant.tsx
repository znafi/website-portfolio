"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/* ────────────────────────────────────────────
   Knowledge base — everything the bot knows
   ──────────────────────────────────────────── */

interface QA {
  keywords: string[]
  answer: string
}

const knowledge: QA[] = [
  {
    keywords: ["who", "about", "yourself", "introduce", "tell me"],
    answer:
      "I'm Zawad Nafi, a third-year Computer Science student at the University of Alberta. I also run ZStudios, a digital agency I founded in 2024. I build full-stack products and care a lot about clean engineering.",
  },
  {
    keywords: ["skill", "tech", "stack", "language", "know", "proficient", "technologies"],
    answer:
      "I work with TypeScript, JavaScript, Python, SQL, C++, HTML, CSS, and Motoko. On the framework side: React, Next.js, React Native, Tailwind CSS, Node.js, Express, Flask, and more. For data I use PostgreSQL, Supabase, Firebase, MongoDB, and Elasticsearch.",
  },
  {
    keywords: ["experience", "work", "job", "intern", "career"],
    answer:
      "I'm currently the Founder & Lead Developer at ZStudios, a digital agency I started in 2024. Before that, I interned as a Software Engineer at ConnectionHub.ca, where I shipped full-stack features on a live platform serving communities across Canada.",
  },
  {
    keywords: ["zstudio", "agency", "founder", "company", "business"],
    answer:
      "ZStudios is the digital agency I founded while studying full-time. We help brands get online with clean engineering, thoughtful design, and practical marketing. I handle everything from client acquisition to architecture to delivery.",
  },
  {
    keywords: ["project", "built", "portfolio", "work on", "made"],
    answer:
      "Some of my projects: Auto-Signer (automated iftar registration that bypasses Cloudflare Turnstile), ChainCycle (P2P blockchain marketplace on ICP), Global Legal Reference (sub-200ms legal search engine), LinkUP (real-time event discovery app), and this portfolio site itself.",
  },
  {
    keywords: ["auto-signer", "autosign", "iftar", "playwright"],
    answer:
      "Auto-Signer is an automated iftar event registration system I built with Playwright and GitHub Actions. It bypasses Cloudflare Turnstile challenges, runs on a schedule, and has automated 30+ sign-ups with zero failures.",
  },
  {
    keywords: ["chaincycle", "blockchain", "icp", "internet computer"],
    answer:
      "ChainCycle is a peer-to-peer marketplace built on the Internet Computer blockchain. Smart contracts handle escrow and settlement without intermediaries. It's deployed on the ICP mainnet with live smart contracts.",
  },
  {
    keywords: ["legal", "search", "elasticsearch", "global legal"],
    answer:
      "Global Legal Reference is a full-text search engine for legal documents. It indexes thousands of statutes with Elasticsearch and returns results in under 200ms across 10K+ documents.",
  },
  {
    keywords: ["linkup", "event", "react native", "mobile", "app"],
    answer:
      "LinkUP is a React Native app for discovering local events. Firebase keeps data in sync across iOS and Android in real time, so users always see what's happening near them.",
  },
  {
    keywords: ["education", "school", "university", "ualberta", "study", "degree", "cs"],
    answer:
      "I'm in my third year of Computer Science at the University of Alberta in Edmonton. I've been building and shipping products alongside my studies since I started.",
  },
  {
    keywords: ["contact", "reach", "email", "hire", "connect", "message"],
    answer:
      "You can reach me at znafi@ualberta.ca, or connect on LinkedIn (linkedin.com/in/zawadnafi) and GitHub (github.com/znafi). I'm open to full-time roles, internships, and freelance projects.",
  },
  {
    keywords: ["github", "open source", "code", "repo"],
    answer:
      "Most of my work is open-source on GitHub at github.com/znafi. The code, commit history, and early iterations are all there to look through.",
  },
  {
    keywords: ["resume", "cv", "pdf"],
    answer:
      "You can download my resume from the Resume link on this site, or reach out to me at znafi@ualberta.ca and I'll send it directly.",
  },
  {
    keywords: ["location", "where", "based", "city", "live"],
    answer:
      "I'm based in Edmonton, Alberta, Canada. Open to remote work and relocation.",
  },
  {
    keywords: ["frontend", "react", "next", "ui"],
    answer:
      "On the frontend I primarily use React and Next.js with TypeScript. I style with Tailwind CSS and build animations with Framer Motion. This portfolio itself is a good example of my frontend work.",
  },
  {
    keywords: ["backend", "server", "api", "node", "python", "flask"],
    answer:
      "For backend work I use Node.js with Express, Python with Flask, and tools like Prisma and GraphQL. I'm comfortable building REST APIs, handling auth, and designing database schemas.",
  },
  {
    keywords: ["database", "data", "postgres", "mongo", "firebase", "supabase"],
    answer:
      "I've worked with PostgreSQL, MongoDB, SQLite, Supabase, Firebase, and Elasticsearch. I choose the data layer based on the project needs — relational for structured data, document stores for flexibility, and search engines for text-heavy workloads.",
  },
  {
    keywords: ["devops", "docker", "ci", "deploy", "github actions"],
    answer:
      "I use Docker for containerization, GitHub Actions for CI/CD pipelines, and Git for version control. I'm also familiar with tools like Postman and JIRA for team workflows.",
  },
  {
    keywords: ["hello", "hi", "hey", "sup", "what's up", "greet"],
    answer:
      "Hey! I'm Zawad's portfolio assistant. I can answer questions about his skills, experience, projects, education, and more. What would you like to know?",
  },
  {
    keywords: ["help", "what can", "how do", "options"],
    answer:
      "I can help with: who Zawad is, his tech stack, work experience, projects (Auto-Signer, ChainCycle, LinkUP, Global Legal Reference), education, contact info, and more. Just ask!",
  },
  {
    keywords: ["available", "open to", "looking for", "hiring", "freelance", "full-time", "internship"],
    answer:
      "Yes! Zawad is open to full-time roles, internships, and freelance projects. Best way to reach out is znafi@ualberta.ca or through the contact form on this site.",
  },
  {
    keywords: ["methodology", "agile", "scrum", "tdd", "process"],
    answer:
      "I follow Agile and Scrum methodologies, and I practice TDD where it makes sense. I believe in shipping iteratively and keeping feedback loops short.",
  },
]

const fallbacks = [
  "I don't have a specific answer for that, but feel free to ask about Zawad's skills, projects, experience, or how to get in touch.",
  "Not sure about that one. Try asking about his tech stack, work experience, or any of his projects!",
  "I might not have that info. I can tell you about Zawad's skills, projects like Auto-Signer or ChainCycle, his agency ZStudios, or how to contact him.",
]

/* ────────────────────────────────────────────
   Matching engine
   ──────────────────────────────────────────── */

function findBestAnswer(input: string): string {
  const lower = input.toLowerCase()
  const words = lower.split(/\s+/)

  let bestScore = 0
  let bestAnswer = ""

  for (const qa of knowledge) {
    let score = 0
    for (const kw of qa.keywords) {
      if (lower.includes(kw)) {
        score += kw.length
        if (words.includes(kw)) score += 2
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestAnswer = qa.answer
    }
  }

  if (bestScore === 0) {
    return fallbacks[Math.floor(Math.random() * fallbacks.length)]
  }

  return bestAnswer
}

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

interface Message {
  id: number
  role: "user" | "bot"
  text: string
}

const suggestions = [
  "What's your tech stack?",
  "Tell me about your projects",
  "Are you open to work?",
  "What is ZStudios?",
]

export function ChatAssistant({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (v: boolean) => void
}) {
  const [nudgeVisible, setNudgeVisible] = useState(false)

  useEffect(() => {
    if (open) return
    const t = setTimeout(() => setNudgeVisible(true), 3500)
    return () => clearTimeout(t)
  }, [open])

  const handleOpen = () => {
    setOpen(true)
    setNudgeVisible(false)
  }
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hey! I'm Zawad's assistant. Ask me anything about his skills, projects, or experience.",
    },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idRef = useRef(1)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    })
  }, [])

  useEffect(() => {
    if (open) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [open, scrollToBottom])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text ?? input).trim()
      if (!msg || typing) return

      const userMsg: Message = { id: idRef.current++, role: "user", text: msg }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setTyping(true)

      const answer = findBestAnswer(msg)

      const delay = Math.min(400 + answer.length * 4, 1500)
      setTimeout(() => {
        const botMsg: Message = { id: idRef.current++, role: "bot", text: answer }
        setMessages((prev) => [...prev, botMsg])
        setTyping(false)
      }, delay)
    },
    [input, typing]
  )

  return (
    <>
      {/* Nudge bubble — pointer-events-none so it never blocks scrolling */}
      <AnimatePresence>
        {nudgeVisible && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed bottom-24 right-6 z-50"
          >
            <div
              className="pointer-events-auto cursor-pointer rounded-2xl rounded-br-sm border border-border bg-card px-4 py-3 shadow-xl shadow-black/30"
              onClick={handleOpen}
            >
              <p className="whitespace-nowrap text-[13px] font-medium text-foreground">
                Have questions? Ask me anything 👋
              </p>
              <div className="absolute -bottom-2 right-4 h-3 w-3 rotate-45 border-b border-r border-border bg-card" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => (open ? setOpen(false) : handleOpen())}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 touch-manipulation items-center justify-center rounded-full bg-foreground text-background shadow-lg shadow-black/30 transition-transform hover:scale-105 active:scale-95"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Chat panel — full screen on mobile, floating panel on desktop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-card md:inset-auto md:bottom-24 md:right-6 md:h-[520px] md:w-[380px] md:rounded-2xl md:border md:border-border md:shadow-2xl md:shadow-black/40"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10">
                <Bot className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Zawad&apos;s Assistant
                </p>
                <p className="text-[11px] text-muted-foreground/50">
                  Ask me anything
                </p>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth"
            >
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-2.5 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        msg.role === "bot"
                          ? "bg-foreground/10"
                          : "bg-foreground/20"
                      }`}
                    >
                      {msg.role === "bot" ? (
                        <Bot className="h-3 w-3 text-foreground/70" />
                      ) : (
                        <User className="h-3 w-3 text-foreground/70" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === "bot"
                          ? "rounded-tl-sm bg-secondary/60 text-foreground/80"
                          : "rounded-tr-sm bg-foreground text-background"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/10">
                      <Bot className="h-3 w-3 text-foreground/70" />
                    </div>
                    <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-secondary/60 px-4 py-3">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/30 [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/30 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/30 [animation-delay:300ms]" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Quick suggestions */}
            {messages.length <= 1 && (
              <div className="border-t border-border/50 px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground/60 transition-all hover:border-foreground/20 hover:text-foreground/80"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border px-4 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground/30 outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background transition-all hover:bg-foreground/90 disabled:opacity-30"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
