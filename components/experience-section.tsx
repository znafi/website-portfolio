"use client"

import { useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const experiences = [
  {
    role: "Founder & Lead Developer",
    company: "ZStudios",
    monogram: "Z",
    favicon: "https://www.google.com/s2/favicons?domain=zstudios.digital&sz=64",
    url: "https://zstudios.digital/",
    period: "2024 – Present",
    label: "Currently active",
    description:
      "Founded and currently run a digital agency alongside full-time studies. Responsible for client acquisition, project scoping, engineering, and delivery, covering everything from architecture decisions to SEO.",
    tags: ["Next.js", "React", "SEO", "Branding", "Growth"],
    isCurrent: true,
    theme: {
      bg: "#0a0a0a",
      glow: "rgba(255,255,255,0.06)",
      heading: "#ffffff",
      sub: "rgba(255,255,255,0.45)",
      body: "rgba(255,255,255,0.65)",
      tagBg: "rgba(255,255,255,0.08)",
      tagText: "rgba(255,255,255,0.55)",
      arrow: "#ffffff",
      dot: "#6ee7b7",
      periodBg: "rgba(255,255,255,0.07)",
      periodText: "rgba(255,255,255,0.4)",
      monoBg: "rgba(255,255,255,0.07)",
      monoText: "#ffffff",
    },
  },
  {
    role: "Software Engineer Intern",
    company: "ConnectionHub",
    monogram: "CH",
    favicon: "/images/connectionhub-logo.png",
    url: "https://connectionhub.ca",
    period: "2024",
    label: "Internship",
    description:
      "Contributed full-stack features to a live platform serving communities across Canada. Worked across the stack, from API design to front-end implementation, in an active production environment.",
    tags: ["React", "Node.js", "TypeScript", "APIs"],
    isCurrent: false,
    theme: {
      bg: "#0d2c54",
      glow: "rgba(96,165,250,0.1)",
      heading: "#e0f2fe",
      sub: "rgba(186,230,253,0.5)",
      body: "rgba(186,230,253,0.7)",
      tagBg: "rgba(96,165,250,0.12)",
      tagText: "rgba(147,197,253,0.8)",
      arrow: "#7dd3fc",
      dot: "#38bdf8",
      periodBg: "rgba(96,165,250,0.1)",
      periodText: "rgba(147,197,253,0.6)",
      monoBg: "rgba(96,165,250,0.12)",
      monoText: "#7dd3fc",
    },
  },
]

function FaviconTile({
  src,
  monogram,
  bg,
  color,
}: {
  src: string
  monogram: string
  bg: string
  color: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl"
      style={{ background: bg }}
    >
      {!failed ? (
        <Image
          src={src}
          alt={monogram}
          width={32}
          height={32}
          className="h-8 w-8 rounded-sm object-contain"
          onError={() => setFailed(true)}
          unoptimized
        />
      ) : (
        <span className="font-mono text-base font-bold" style={{ color }}>
          {monogram}
        </span>
      )}
    </div>
  )
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  return (
    <section id="experience" ref={sectionRef} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            02 / Experience
          </span>
          <motion.div
            className="h-px flex-1 bg-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-tight text-foreground">
            Experience
          </h2>
        </motion.div>

        {/* Side-by-side cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {experiences.map((exp, i) => {
            const t = exp.theme
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full"
              >
                <motion.div
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl p-8 md:p-9"
                  style={{
                    background: t.bg,
                    boxShadow: "0 4px 48px 0 rgba(0,0,0,0.28)",
                  }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {/* Corner glow */}
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${t.glow} 0%, transparent 65%)`,
                    }}
                  />

                  {/* Top row: favicon + period */}
                  <div className="relative mb-8 flex items-start justify-between">
                    <FaviconTile
                      src={exp.favicon}
                      monogram={exp.monogram}
                      bg={t.monoBg}
                      color={t.monoText}
                    />

                    <span
                      className="rounded-full px-3 py-1.5 font-mono text-[11px]"
                      style={{ background: t.periodBg, color: t.periodText }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Company + link */}
                  <div className="relative mb-1 flex items-center gap-2">
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5"
                    >
                      <span
                        className="text-2xl font-bold tracking-tight md:text-3xl"
                        style={{ color: t.heading }}
                      >
                        {exp.company}
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: t.arrow }}
                      />
                    </a>
                  </div>

                  {/* Role + active indicator */}
                  <div className="relative mb-6 flex items-center gap-2">
                    {exp.isCurrent && (
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span
                          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                          style={{ background: t.dot }}
                        />
                        <span
                          className="relative inline-flex h-1.5 w-1.5 rounded-full"
                          style={{ background: t.dot }}
                        />
                      </span>
                    )}
                    <span
                      className="font-mono text-[11px] uppercase tracking-widest"
                      style={{ color: t.sub }}
                    >
                      {exp.role}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="relative mb-8 flex-1 text-[14px] leading-relaxed md:text-[15px]"
                    style={{ color: t.body }}
                  >
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div className="relative flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1.5 font-mono text-[11px] font-medium"
                        style={{ background: t.tagBg, color: t.tagText }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
