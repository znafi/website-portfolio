"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ArrowDown, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion"
import { useMagnetic } from "@/hooks/use-magnetic"

/* ---------- text scramble (kept from original) ---------- */
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

/* ---------- rotating text carousel ---------- */
const rotatingTexts = [
  "full-stack engineer",
  "agency founder",
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
          className="inline-block whitespace-nowrap text-foreground/50"
        >
          {rotatingTexts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ---------- floating particles ---------- */
function FloatingParticles() {
  const particles = useRef(
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
  ).current

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-foreground/[0.07]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

/* ---------- magnetic button wrapper ---------- */
function MagneticButton({
  children,
  className,
  ...props
}: React.ComponentProps<"a">) {
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

/* ---------- main component ---------- */
export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const name = useTextScramble("Zawad Nafi", mounted, 600)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })
  const imageY = useTransform(smoothProgress, [0, 1], [0, 80])
  const textY = useTransform(smoothProgress, [0, 1], [0, -40])
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  const imageRef = useRef<HTMLDivElement>(null)
  const [imageInView, setImageInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setImageInView(true)
      },
      { threshold: 0.3 }
    )
    if (imageRef.current) observer.observe(imageRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
    },
    []
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg)"
    },
    []
  )

  /* stagger spring variants */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24"
    >
      <FloatingParticles />

      <motion.div
        className="mx-auto w-full max-w-6xl"
        style={{ y: textY, opacity }}
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
          >
            {/* Status */}
            <motion.div
              variants={childVariants}
              className="mb-10 flex items-center gap-3"
            >
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
              </div>
              <span className="text-[13px] tracking-wide text-muted-foreground">
                Available for new opportunities
              </span>
            </motion.div>

            {/* Name with scramble */}
            <motion.div variants={childVariants} className="mb-6 overflow-hidden">
              <h1 className="font-mono text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-tighter text-foreground">
                {name || "\u00A0"}
              </h1>
            </motion.div>

            {/* Rotating text carousel */}
            <motion.div variants={childVariants} className="mb-4 overflow-hidden">
              <p className="font-mono text-[clamp(1.2rem,3vw,2.2rem)] font-medium leading-[1.2] tracking-tight">
                {"I'm a "}
                <RotatingText />
              </p>
            </motion.div>

            {/* Description */}
            <motion.div variants={childVariants} className="mb-10 max-w-lg">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                I build products, write clean systems, and run{" "}
                <a
                  href="https://zstudios.digital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-underline text-foreground"
                >
                  ZStudios
                </a>
                . Obsessed with code that actually ships.
              </p>
            </motion.div>

            {/* CTAs with magnetic effect */}
            <motion.div
              variants={childVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90 active:scale-[0.97]"
              >
                View my work
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </MagneticButton>
              <MagneticButton
                href="https://github.com/znafi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/50 active:scale-[0.97]"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </MagneticButton>
              <MagneticButton
                href="https://zstudios.digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/50 active:scale-[0.97]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                ZStudios
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Portrait image with tilt + parallax */}
          <motion.div
            ref={imageRef}
            style={{ y: imageY }}
            initial={{ opacity: 0, y: 50 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="tilt-card image-hover-zoom relative h-[420px] w-[340px] overflow-hidden rounded-2xl border border-border"
            >
              <div
                className={`relative h-full w-full ${imageInView ? "animate-image-reveal" : "opacity-0"}`}
              >
                <Image
                  src="/images/portrait.jpg"
                  alt="Portrait of Zawad Nafi"
                  fill
                  className="object-cover"
                  sizes="340px"
                  priority
                />
              </div>
              {/* Overlay shimmer */}
              <div className="absolute inset-0 animate-shimmer" />
            </div>
            {/* Caption */}
            <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground/30">
              {"< replace with your photo />"}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.7 }}
        className="mx-auto mt-auto mb-10 w-full max-w-6xl"
      >
        <motion.div
          className="flex flex-col items-start gap-2"
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
