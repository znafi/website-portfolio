"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Globe, Megaphone, BarChart3 } from "lucide-react"

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
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
      id="founder"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 font-mono text-sm text-primary">
            {"// founder"}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl text-balance">
            Building beyond <span className="text-gradient">code.</span>
          </h2>
        </div>

        {/* ZStudios Card */}
        <a
          href="https://zstudios.digital/"
          target="_blank"
          rel="noopener noreferrer"
          className={`glass group block overflow-hidden rounded-2xl transition-all duration-700 hover:glow-border ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Gradient banner */}
          <div className="relative h-32 overflow-hidden bg-gradient-to-r from-primary/30 via-chart-2/20 to-primary/10 md:h-40">
            <div className="absolute inset-0 animate-gradient-shift bg-gradient-to-r from-primary/20 via-chart-2/30 to-chart-5/20 bg-[length:200%_200%]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Z<span className="text-primary">Studios</span>
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="mb-2 text-2xl font-bold text-foreground">
                  ZStudios Digital
                </h3>
                <p className="text-muted-foreground">
                  Full-service digital marketing agency
                </p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
              ZStudios bridges the gap between cutting-edge technology and
              strategic marketing. We help brands establish a powerful digital
              presence through web development, SEO, content strategy, and
              data-driven growth tactics.
            </p>

            {/* Services */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Globe,
                  label: "Web Development",
                  desc: "Custom websites & apps",
                },
                {
                  icon: Megaphone,
                  label: "Digital Marketing",
                  desc: "SEO, ads & social media",
                },
                {
                  icon: BarChart3,
                  label: "Growth Strategy",
                  desc: "Data-driven scaling",
                },
              ].map((service) => (
                <div
                  key={service.label}
                  className="rounded-lg bg-secondary/30 p-4 transition-colors group-hover:bg-secondary/50"
                >
                  <service.icon className="mb-2 h-5 w-5 text-primary" />
                  <p className="text-sm font-medium text-foreground">
                    {service.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
