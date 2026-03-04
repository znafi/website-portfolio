"use client"

import { useReveal } from "@/hooks/use-reveal"
import { ArrowUpRight } from "lucide-react"

export function FounderSection() {
  const { ref, visible } = useReveal(0.15)

  return (
    <section id="founder" ref={ref} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            04 / Agency
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Left - text */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="mb-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-tight text-foreground">
              I also run a{" "}
              <span className="text-muted-foreground/40">digital agency.</span>
            </h2>
            <p className="mb-8 max-w-md text-[15px] leading-relaxed text-foreground/60">
              ZStudios bridges technology and marketing, helping brands establish a powerful digital presence through web development, SEO, content strategy, and data-driven growth.
            </p>
            <a
              href="https://zstudios.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Visit ZStudios
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right - bento services */}
          <div
            className={`grid grid-cols-2 gap-3 transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              { label: "Web Dev", desc: "Custom sites & apps" },
              { label: "SEO", desc: "Search visibility" },
              { label: "Growth", desc: "Data-driven scaling" },
              { label: "Content", desc: "Strategy & creation" },
              { label: "Branding", desc: "Visual identity" },
              { label: "Analytics", desc: "Insights & tracking" },
            ].map((service, i) => (
              <div
                key={service.label}
                className={`group rounded-xl border border-border bg-secondary/30 p-5 transition-all duration-300 hover:bg-secondary/60 hover:border-foreground/10 ${
                  i === 0 ? "col-span-2" : ""
                }`}
              >
                <p className="mb-1 text-sm font-medium text-foreground">
                  {service.label}
                </p>
                <p className="text-xs text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
