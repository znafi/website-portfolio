import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { FounderSection } from "@/components/founder-section"
import { GithubSection } from "@/components/github-section"
import { CommandCenter } from "@/components/command-center"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Section dividers with subtle gradient lines */}
      <HeroSection />
      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-border to-transparent" />
      <AboutSection />
      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-border to-transparent" />
      <ProjectsSection />
      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-border to-transparent" />
      <SkillsSection />
      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-border to-transparent" />
      <FounderSection />
      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-border to-transparent" />
      <GithubSection />
      <Footer />
      <CommandCenter />
    </main>
  )
}
