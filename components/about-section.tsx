"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Lightbulb, Rocket } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Problem Solver",
    description:
      "I approach every challenge with systematic thinking and clean architecture, building solutions that scale.",
  },
  {
    icon: Lightbulb,
    title: "System Designer",
    description:
      "From database schemas to API architecture, I design systems that are maintainable and performant.",
  },
  {
    icon: Rocket,
    title: "Entrepreneur",
    description:
      "Running ZStudios, a digital marketing agency, I bridge the gap between technology and business growth.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    const current = sectionRef.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 font-mono text-sm text-primary">{"// about"}</p>
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-5xl text-balance">
            More than a developer.
            <br />
            <span className="text-gradient">A builder.</span>
          </h2>
        </div>

        {/* About text */}
        <div
          className={`mb-16 max-w-3xl transition-all delay-200 duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
            {"I'm"} Zawad Nafi, a software engineer and web developer who {"doesn't"} just
            write code -- I build products. From browser automation systems to
            blockchain marketplaces, I thrive on turning complex problems into
            elegant solutions.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Beyond development, I founded{" "}
            <a
              href="https://zstudios.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              ZStudios
            </a>
            , a digital marketing agency where I combine my technical expertise
            with business strategy to help brands grow in the digital landscape.
          </p>
        </div>

        {/* Highlight cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className={`glass group rounded-xl p-6 transition-all duration-500 hover:glow-border ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
