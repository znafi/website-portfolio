"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

export function FounderSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section id="founder" ref={ref} className="px-6 py-20 md:px-0 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            Beyond code
          </h2>
          <p className="mb-10 text-base text-muted-foreground">
            Building a business alongside engineering.
          </p>
        </div>

        <a
          href="https://zstudios.digital/"
          target="_blank"
          rel="noopener noreferrer"
          className={`group block rounded-xl border border-border p-6 transition-all duration-500 hover:border-foreground/20 md:p-8 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="mb-1 text-xl font-bold text-foreground md:text-2xl">
                ZStudios
              </h3>
              <p className="text-sm text-muted-foreground">
                Full-service digital marketing agency
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            ZStudios bridges cutting-edge technology and strategic marketing.
            We help brands establish a powerful digital presence through web
            development, SEO, content strategy, and data-driven growth tactics.
          </p>

          <div className="flex flex-wrap gap-3">
            {["Web Development", "Digital Marketing", "Growth Strategy", "SEO", "Content"].map(
              (service) => (
                <span
                  key={service}
                  className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground/80"
                >
                  {service}
                </span>
              )
            )}
          </div>
        </a>
      </div>
    </section>
  )
}
