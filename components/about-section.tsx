"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
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
    <section id="about" ref={ref} className="px-6 py-20 md:px-0 md:py-28">
      <div
        className={`mx-auto max-w-2xl transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="mb-12">
          <h2 className="mb-8 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            currently
          </h2>
          <ul className="flex flex-col gap-3 text-base leading-relaxed text-foreground/90">
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              Software Engineer and Web Developer
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              {"Founder of "}
              <a href="https://zstudios.digital/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition-colors hover:text-foreground">
                ZStudios
              </a>
              {", a digital marketing agency"}
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              Building products that solve real problems
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="mb-8 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            also
          </h2>
          <ul className="flex flex-col gap-3 text-base leading-relaxed text-foreground/90">
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              system design and architecture enthusiast
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              blockchain and decentralized systems explorer
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              automation and DevOps advocate
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="mb-8 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            how i work
          </h2>
          <ul className="flex flex-col gap-3 text-base leading-relaxed text-foreground/90">
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              i approach problems with systematic thinking and clean architecture
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              i can pick up new stacks fast because fundamentals transfer
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              i bridge the gap between engineering and business, running an agency alongside building software
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-8 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            in my free time
          </h2>
          <ul className="flex flex-col gap-3 text-base leading-relaxed text-foreground/90">
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              building side projects until an edge case humbles me
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              learning new technologies and shipping experiments
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground/40">-</span>
              growing ZStudios and helping brands scale digitally
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
