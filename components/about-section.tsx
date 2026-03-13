"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"

/* ---------- animated counter ---------- */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  isInView,
}: {
  target: number
  suffix?: string
  duration?: number
  isInView: boolean
}) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

/* ---------- spotlight card with mouse tracking ---------- */
function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255,255,255,0.06)",
}: {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-300)
    mouseY.set(-300)
  }, [mouseX, mouseY])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          x: springX,
          y: springY,
          width: 600,
          height: 600,
          marginLeft: -300,
          marginTop: -300,
          background: `radial-gradient(circle, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/* ---------- per-word reveal ---------- */
function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const words = text.split(" ")

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="inline-block transition-all duration-500"
            style={{
              transitionDelay: `${i * 30}ms`,
              transform: isInView ? "translateY(0)" : "translateY(100%)",
              opacity: isInView ? 1 : 0,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </p>
  )
}

/* ---------- stats data ---------- */
const stats = [
  { value: 3, suffix: "+", label: "Years coding" },
  { value: 10, suffix: "+", label: "Projects shipped" },
  { value: 5, suffix: "+", label: "Clients served" },
  { value: 1000, suffix: "+", label: "Commits this year" },
]

/* ---------- bento card data ---------- */
const bentoCards = [
  {
    id: "build",
    icon: "</>" ,
    label: "What I build",
    text: "Full-stack products across React, Python, TypeScript, and more. From polished UIs to backend services and automation pipelines — always shipping something that works.",
    gradient: "from-violet-500/20 via-transparent to-transparent",
    spotlightColor: "rgba(139,92,246,0.1)",
    span: "md:col-span-2",
  },
  {
    id: "think",
    icon: "{ }",
    label: "How I think",
    text: "Understand the system before writing a line. Maintainable, scalable, intentional — good decisions compound over time.",
    gradient: "from-cyan-500/20 via-transparent to-transparent",
    spotlightColor: "rgba(6,182,212,0.1)",
    span: "md:col-span-1",
  },
  {
    id: "beyond",
    icon: "//",
    label: "Beyond code",
    text: "Founded ZStudios while studying full-time — from zero to a running agency with real clients and delivered projects.",
    gradient: "from-amber-500/20 via-transparent to-transparent",
    spotlightColor: "rgba(245,158,11,0.1)",
    span: "md:col-span-1",
  },
  {
    id: "stack",
    icon: "**",
    label: "My edge",
    text: "I don't just write code — I build products. Engineering meets design thinking meets business sense. That's what happens when you run an agency and ship your own projects at the same time.",
    gradient: "from-rose-500/20 via-transparent to-transparent",
    spotlightColor: "rgba(244,63,94,0.1)",
    span: "md:col-span-2",
  },
]

/* ---------- card variants ---------- */
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" })

  return (
    <section id="about" ref={sectionRef} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            01 / About
          </span>
          <motion.div
            className="h-px flex-1 bg-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Big statement with word-by-word reveal */}
        <div className="mb-20">
          <WordReveal
            text="Third-year CS student at the University of Alberta, with a running agency, shipped products, and real client work. Building in parallel with studying, not after."
            className="max-w-4xl text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.2] tracking-tight text-foreground/90"
          />
        </div>

        {/* Animated stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.4 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group flex flex-col items-center py-6 transition-colors ${
                i < stats.length - 1
                  ? "md:border-r md:border-white/10"
                  : ""
              }`}
            >
              <span className="mb-1 font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/50 transition-colors group-hover:text-muted-foreground/80">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {bentoCards.map((card, i) => (
            <motion.div
              key={card.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={card.span}
            >
              <SpotlightCard
                spotlightColor={card.spotlightColor}
                className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] md:p-8"
              >
                {/* Gradient accent */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                />

                {/* Icon */}
                <div className="relative mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.08]">
                    <span className="font-mono text-lg font-bold text-white/80 transition-colors group-hover:text-white">
                      {card.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                    {card.label}
                  </h3>
                </div>

                {/* Body */}
                <p className="relative text-[14px] leading-[1.8] text-white/50 transition-colors duration-300 group-hover:text-white/70 md:text-[15px]">
                  {card.text}
                </p>

                {/* Decorative corner line */}
                <div className="absolute bottom-0 right-0 h-20 w-20 overflow-hidden rounded-br-3xl">
                  <div className="absolute bottom-3 right-3 h-px w-8 bg-gradient-to-l from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-3 right-3 h-8 w-px bg-gradient-to-t from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
