"use client"

import { useReveal } from "@/hooks/use-reveal"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

export function FounderSection() {
  const { ref, visible } = useReveal(0.15)

  return (
    <section id="founder" ref={ref} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div
          className={`mb-16 flex items-center gap-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            04 / Agency
          </span>
          <div
            className={`h-px flex-1 bg-border ${visible ? "animate-line-grow" : "scale-x-0"}`}
          />
        </div>

        {/* Full-width agency card */}
        <div
          className={`group relative overflow-hidden rounded-2xl border border-border transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Image background */}
          <div className="image-hover-zoom relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/agency.jpg"
              alt="ZStudios digital agency workspace"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
                {"< replace with agency image />"}
              </p>
              <h2 className="mb-4 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-foreground">
                I also run a{" "}
                <span className="text-foreground/30">digital agency.</span>
              </h2>
              <p className="mb-8 max-w-lg text-[15px] leading-relaxed text-foreground/60">
                ZStudios bridges technology and marketing, helping brands establish a powerful digital presence through web development, SEO, content strategy, and data-driven growth.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://zstudios.digital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:scale-[1.03] active:scale-[0.97]"
                >
                  Visit ZStudios
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
                {["Web Dev", "SEO", "Growth", "Content", "Branding"].map((s) => (
                  <span
                    key={s}
                    className="hidden items-center rounded-full border border-foreground/10 px-4 py-3 text-[13px] text-foreground/40 md:inline-flex"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
