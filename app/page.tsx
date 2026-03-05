"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { FounderSection } from "@/components/founder-section"
import { CommandCenter } from "@/components/command-center"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { CursorGlow } from "@/components/cursor-glow"
import { ScrollProgress } from "@/components/scroll-progress"

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <>
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Cursor glow */}
      <CursorGlow />

      {/* Navbar */}
      <Navbar onOpenCommand={() => setCommandOpen(true)} />

      <main className="relative z-[2]">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <FounderSection />
        <Footer />
      </main>

      {/* Command Center */}
      <CommandCenter isOpen={commandOpen} setIsOpen={setCommandOpen} />
    </>
  )
}
