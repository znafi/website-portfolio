"use client"

import { useRef } from "react"
import { ArrowUpRight, Briefcase } from "lucide-react"
import { motion, useInView } from "framer-motion"

const experiences = [
  {
    role: "Founder & Lead Developer",
    company: "ZStudios",
    url: "https://zstudios.digital/",
    period: "2024 - Present",
    description:
      "Building a digital agency from the ground up. Leading end-to-end web development, SEO strategy, and brand growth for clients across multiple industries.",
    tags: ["Next.js", "React", "SEO", "Branding", "Growth"],
    isCurrent: true,
  },
  {
    role: "Software Engineer Intern",
    company: "ConnectionHub.ca",
    url: "https://connectionhub.ca",
    period: "2024",
    description:
      "Contributed to full-stack development of the platform, building features that connect communities. Worked across the stack with modern web technologies.",
    tags: ["React", "Node.js", "TypeScript", "APIs"],
    isCurrent: false,
  },
]

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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[19px] top-0 bottom-0 w-px bg-border md:left-[23px]"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
          />

          <div className="flex flex-col gap-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex gap-6 md:gap-8"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <motion.div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border md:h-12 md:w-12 ${
                      exp.isCurrent
                        ? "border-foreground/40 bg-foreground/10"
                        : "border-border bg-card"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {exp.isCurrent ? (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/50" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-foreground" />
                      </span>
                    ) : (
                      <Briefcase className="h-4 w-4 text-muted-foreground/50" />
                    )}
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.div
                  className="spotlight-card glow-border flex-1 overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-foreground md:text-xl">
                        {exp.role}
                      </h3>
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="animated-underline inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {exp.company}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                    <span className="shrink-0 rounded-full border border-border bg-secondary/50 px-3 py-1 font-mono text-[11px] text-muted-foreground/60">
                      {exp.period}
                    </span>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground/70 md:text-[15px]">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/50 transition-colors group-hover:text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
