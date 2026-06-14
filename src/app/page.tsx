"use client";

import { useState, useCallback, useLayoutEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { resetPageScroll, useLenis } from "@/components/providers/smooth-scroll-provider";
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
  const lenis = useLenis();
  const [isLoading, setIsLoading] = useState(true);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useLayoutEffect(() => {
    resetPageScroll(lenis);
  }, [lenis]);

  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  const handleLoadingComplete = useCallback(() => {
    resetPageScroll(lenis);

    setIsLoading(false);
    setHeroRevealed(true);

    requestAnimationFrame(() => {
      resetPageScroll(lenis);
      unlockScroll();
      ScrollTrigger.refresh();
    });
  }, [lenis, unlockScroll]);

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
    resetPageScroll(lenis);
    requestAnimationFrame(() => {
      resetPageScroll(lenis);
      ScrollTrigger.refresh();
    });
  }, [lenis]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className={isLoading ? "invisible overflow-x-hidden" : "overflow-x-hidden"} aria-hidden={isLoading}>
        {!isLoading && <Navigation />}

        <div className="light-zone">
          <HeroSection revealed={heroRevealed} onReady={handleHeroReady} />
        </div>

        <div className="dark-zone">
          <SectionMarquee text="ABOUT" direction="left" speed={22} />
          <AboutSection />
        </div>

        <div className="light-zone">
          <SectionMarquee text="SKILLS" direction="right" speed={18} />
          <SkillsSection />
        </div>

        <div className="dark-zone">
          <SectionMarquee text="WORK" direction="left" speed={16} />
          <ProjectsSection />
        </div>

        <div className="light-zone">
          <SectionMarquee text="DENEYİM & UZMANLIK" direction="right" speed={24} />
          <ExperienceSection />
        </div>

        <div className="dark-zone">
          <SectionMarquee text="EDUCATION" direction="left" speed={24} />
          <EducationSection />
        </div>

        <div className="light-zone">
          <SectionMarquee text="GET IN TOUCH" direction="right" speed={26} />
          <ContactSection />
        </div>

        <div className="dark-zone">
          <FooterSection />
        </div>
      </div>
    </>
  );
}
