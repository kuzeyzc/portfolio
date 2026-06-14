"use client";

import { useState, useCallback } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { HeroSection } from "@/components/sections/hero-section";
import { Navigation } from "@/components/layout/navigation";
import { SectionMarquee } from "@/components/layout/section-marquee";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/project-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setHeroRevealed(true);
  }, []);

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }, []);

  return (
    <>
      {/* ─── Page-level Loading Screen ─── */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <Navigation />

      <div className="light-zone">
        <HeroSection revealed={heroRevealed} onReady={handleHeroReady} />
      </div>

      {/* ─── About (Dark) ─── */}
      <div className="dark-zone">
        <SectionMarquee text="ABOUT" direction="left" speed={22} />
        <AboutSection />
      </div>

      {/* ─── Skills (Light) ─── */}
      <div className="light-zone">
        <SectionMarquee text="SKILLS" direction="right" speed={18} />
        <SkillsSection />
      </div>

      {/* ─── Work (Dark) ─── */}
      <div className="dark-zone">
        <SectionMarquee text="WORK" direction="left" speed={16} />
        <ProjectsSection />
      </div>

      {/* ─── Experience (Light) ─── */}
      <div className="light-zone">
        <SectionMarquee text="EXPERIENCE" direction="right" speed={24} />
        <ExperienceSection />
      </div>

      {/* ─── Education (Dark) ─── */}
      <div className="dark-zone">
        <SectionMarquee text="EDUCATION" direction="left" speed={24} />
        <EducationSection />
      </div>

      {/* ─── Contact (Light) ─── */}
      <div className="light-zone">
        <SectionMarquee text="GET IN TOUCH" direction="right" speed={26} />
        <ContactSection />
      </div>

      {/* ─── Footer (Dark) ─── */}
      <div className="dark-zone">
        <FooterSection />
      </div>
    </>
  );
}
