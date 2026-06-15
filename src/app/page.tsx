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
import { useLanguage } from "@/components/providers/language-provider";

export default function Home() {
  const { t } = useLanguage();
  const lenis = useLenis();
  const [isLoading, setIsLoading] = useState(true);
  const [heroRevealed, setHeroRevealed] = useState(false);

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
    unlockScroll();

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [lenis, unlockScroll]);

  const handleHeroReady = useCallback(() => {
    // Hero reveal finished — refresh ScrollTrigger only; never reset scroll here
    // (user may already be scrolling and would get yanked to top).
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className={isLoading ? "invisible overflow-x-hidden" : "overflow-x-hidden"} aria-hidden={isLoading}>
        {!isLoading && <Navigation />}

        <div className="light-zone">
          <HeroSection revealed={heroRevealed} onReady={handleHeroReady} />
        </div>

        <div className="dark-zone">
          <SectionMarquee text={t.marquees.about} direction="left" speed={22} />
          <AboutSection />
        </div>

        <div className="light-zone">
          <SectionMarquee text={t.marquees.skills} direction="right" speed={18} />
          <SkillsSection />
        </div>

        <div className="dark-zone">
          <SectionMarquee text={t.marquees.projects} direction="left" speed={16} />
          <ProjectsSection />
        </div>

        <div className="light-zone">
          <SectionMarquee text={t.marquees.experience} direction="right" speed={24} />
          <ExperienceSection />
        </div>

        <div className="dark-zone">
          <SectionMarquee text={t.marquees.education} direction="left" speed={24} />
          <EducationSection />
        </div>

        <div className="light-zone">
          <SectionMarquee text={t.marquees.contact} direction="right" speed={26} />
          <ContactSection />
        </div>

        <div className="dark-zone">
          <FooterSection />
        </div>
      </div>
    </>
  );
}
