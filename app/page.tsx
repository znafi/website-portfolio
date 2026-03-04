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
    <main className="relative min-h-screen bg-background">
      <HeroSection />
      <div className="mx-auto h-px max-w-2xl bg-border" />
      <AboutSection />
      <div className="mx-auto h-px max-w-2xl bg-border" />
      <ProjectsSection />
      <div className="mx-auto h-px max-w-2xl bg-border" />
      <SkillsSection />
      <div className="mx-auto h-px max-w-2xl bg-border" />
      <FounderSection />
      <div className="mx-auto h-px max-w-2xl bg-border" />
      <GithubSection />
      <div className="mx-auto h-px max-w-2xl bg-border" />
      <Footer />
      <CommandCenter />
    </main>
  )
}
