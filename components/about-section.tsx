"use client"

import { useReveal } from "@/hooks/use-reveal"
import Image from "next/image"

export function AboutSection() {
  const { ref, visible } = useReveal(0.15)

  return (
    <section id="about" ref={ref} className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div
          className={`mb-16 flex items-center gap-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
            01 / About
          </span>
          <div
            className={`h-px flex-1 bg-border ${visible ? "animate-line-grow" : "scale-x-0"}`}
          />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px] lg:gap-20">
          <div>
            {/* Big statement */}
            <div
              className={`mb-20 transition-all duration-1000 delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="max-w-4xl text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.2] tracking-tight text-foreground/90">
                {"I'm a software engineer who builds real products and doesn't just push pixels. I run a digital agency, ship side projects, and obsess over clean architecture."}
              </p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
              {[
                {
                  label: "What I do",
                  text: "Full-stack engineering with a focus on web applications, browser automation, and distributed systems. From React frontends to Python backends.",
                },
                {
                  label: "How I think",
                  text: "Systems-first approach. I care about architecture, scalability, and writing code that future-me won\u0027t hate. Fundamentals transfer across any stack.",
                },
                {
                  label: "Beyond code",
                  text: "Founded ZStudios, a digital agency helping brands scale. I bridge engineering and business -- building products and growing companies at the same time.",
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`group transition-all duration-700 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${400 + i * 150}ms` }}
                >
                  <div
                    className={`mb-6 h-px w-full bg-border origin-left ${
                      visible ? "animate-line-grow" : "scale-x-0"
                    }`}
                    style={{ animationDelay: `${400 + i * 150}ms` }}
                  />
                  <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground/80">
                    {item.label}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-foreground/70">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo for mobile + desktop sidebar */}
          <div
            className={`relative transition-all duration-1000 delay-600 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="image-hover-zoom sticky top-32 overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/portrait.jpg"
                alt="Zawad Nafi"
                width={320}
                height={400}
                className="h-auto w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground/30">
              {"< replace with your photo />"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
