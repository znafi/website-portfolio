"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ArrowDown } from "lucide-react"
import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion"
import { useMagnetic } from "@/hooks/use-magnetic"

/* ---------- text scramble ---------- */
function useTextScramble(text: string, trigger: boolean, delay: number = 0) {
  const [display, setDisplay] = useState("")
  const chars = "!<>-_\\/[]{}#$%^&*()=+~`|;:,.?"

  useEffect(() => {
    if (!trigger) return
    const timeout = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " "
              if (i < iteration) return text[i]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
        )
        iteration += 1 / 2
        if (iteration >= text.length) {
          clearInterval(interval)
          setDisplay(text)
        }
      }, 30)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [trigger, text, delay, chars])

  return display
}

/* ---------- rotating text ---------- */
const rotatingTexts = [
  "full-stack engineer",
  "automation nerd",
  "clean code obsessive",
  "product builder",
  "system designer",
]

function RotatingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-flex h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block whitespace-nowrap text-foreground"
            style={{ textShadow: "0 0 20px currentColor" }}
          >
            {rotatingTexts[index]}
          </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ---------- hero background (blobs + grid + particles) ---------- */
type Particle = { id: number; x: number; y: number; size: number; duration: number; delay: number }

function HeroBackground() {
  const [particles, setParticles] = useState<Particle[] | null>(null)

  useEffect(() => {
    setParticles(
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 6,
      }))
    )
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Atmosphere blobs */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />
      {/* Dot grid */}
      <div className="hero-grid hidden md:block" />
      {/* Floating particles */}
      {particles?.map((p) => (
        <div
          key={p.id}
          className="hero-particle absolute rounded-full bg-white/10"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ---------- magnetic button ---------- */
function MagneticButton({ children, className, ...props }: React.ComponentProps<"a">) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.25)
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

/* ---------- main ---------- */
export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const name = useTextScramble("Zawad Nafi", mounted, 600)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const textY = useTransform(smoothProgress, [0, 1], [0, -40])
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.08])

  useEffect(() => setMounted(true), [])

  const imageRef = useRef<HTMLDivElement>(null)
  const [imageInView, setImageInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setImageInView(true) },
      { threshold: 0.3 }
    )
    if (imageRef.current) observer.observe(imageRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)"
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden px-6 pt-24"
    >
      <HeroBackground />

      <motion.div className="mx-auto flex w-full max-w-6xl flex-1 flex-col" style={{ opacity }}>
        {/* --- Portrait at the top --- */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex justify-center md:mb-16"
        >
          <motion.div style={{ scale: imageScale }}>
            <div className="relative">
              <div className="portrait-halo" />
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="tilt-card image-hover-zoom relative h-[180px] w-[180px] overflow-hidden rounded-full border-2 border-white/10 md:h-[220px] md:w-[220px]"
            >
              <div className={`relative h-full w-full ${imageInView ? "animate-image-reveal" : "opacity-0"}`}>
                <Image
                  src="/images/portrait.png"
                  alt="Portrait of Zawad Nafi"
                  fill
                  className="object-cover"
                  sizes="220px"
                  priority
                />
              </div>
              <div className="absolute inset-0 animate-shimmer" />
            </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- Text content --- */}
        <motion.div
          className="flex flex-1 flex-col items-center text-center"
          style={{ y: textY }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="flex flex-col items-center"
          >
            {/* Name */}
            <motion.div variants={childVariants} className="mb-6 overflow-hidden">
              <h1
                className="font-mono text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-tighter bg-gradient-to-b from-foreground to-foreground/65 bg-clip-text"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {name || "\u00A0"}
              </h1>
            </motion.div>

            {/* Flashy role badges */}
            <motion.div variants={childVariants} className="mb-5 flex flex-wrap items-center justify-center gap-3">
              <motion.span
                className="role-badge-swe relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-foreground/30 bg-foreground/[0.08] px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-foreground backdrop-blur-md md:text-base"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
                  </span>
                  Software Engineer
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-foreground/[0.06] via-foreground/[0.12] to-foreground/[0.06] opacity-0 transition-opacity duration-500 hover:opacity-100" />
              </motion.span>

              <span className="text-lg font-light text-foreground/20">|</span>

              <motion.span
                className="role-badge-founder relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-foreground/30 bg-foreground/[0.08] px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-foreground backdrop-blur-md md:text-base"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/60" style={{ animationDelay: "0.5s" }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
                  </span>
                  Agency Founder
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-foreground/[0.06] via-foreground/[0.12] to-foreground/[0.06] opacity-0 transition-opacity duration-500 hover:opacity-100" />
              </motion.span>
            </motion.div>

            {/* University line */}
            <motion.div variants={childVariants} className="mb-4">
              <p className="font-mono text-[15px] font-semibold tracking-wide text-muted-foreground/70 md:text-base">
                3rd Year CS{" "}
                <span className="mx-2 text-foreground/20">|</span>{" "}
                <span className="text-muted-foreground/90">University of Alberta</span>
              </p>
            </motion.div>

            {/* Rotating text carousel */}
            <motion.div variants={childVariants} className="mb-4 overflow-hidden">
              <p className="font-mono text-[clamp(1rem,2.5vw,1.5rem)] font-medium leading-[1.2] tracking-tight text-foreground/50">
                <RotatingText />
              </p>
            </motion.div>

            {/* Description */}
            <motion.div variants={childVariants} className="mb-10 max-w-lg">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Software engineer and founder based in Edmonton. I build full-stack products and run{" "}
                <a
                  href="https://zstudios.digital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-underline text-foreground"
                >
                  ZStudios
                </a>
                , a digital agency, while studying Computer Science at the University of Alberta.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={childVariants} className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90 active:scale-[0.97]"
              >
                View my work
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.7 }}
        className="mx-auto mb-10 flex w-full max-w-6xl justify-center"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/30">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
