"use client";

import { useState, useCallback, useLayoutEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { resetPageScroll, useLenis } from "@/components/providers/smooth-scroll-provider";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { HeroSection } from "@/components/sections/hero-section";
import { Navigation } from "@/components/layout/navigation";
import { SectionMarquee } from "@/components/layout/section-marquee";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/project-section";
import { FooterSection } from "@/components/sections/footer-section";
import { ViewportLazySection } from "@/components/layout/viewport-lazy-section";
import {
  SkillsSection,
  ExperienceSection,
  EducationSection,
  ContactSection,
} from "@/lib/lazy-sections";
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
          <ViewportLazySection placeholderClassName="min-h-[55vh]">
            <SkillsSection />
          </ViewportLazySection>
        </div>

        <div className="dark-zone">
          <SectionMarquee text={t.marquees.projects} direction="left" speed={16} />
          <ProjectsSection />
        </div>

        <div className="light-zone">
          <SectionMarquee text={t.marquees.experience} direction="right" speed={24} />
          <ViewportLazySection placeholderClassName="min-h-[60vh]">
            <ExperienceSection />
          </ViewportLazySection>
        </div>

        <div className="dark-zone">
          <SectionMarquee text={t.marquees.education} direction="left" speed={24} />
          <ViewportLazySection placeholderClassName="min-h-[50vh]">
            <EducationSection />
          </ViewportLazySection>
        </div>

        <div className="light-zone">
          <SectionMarquee text={t.marquees.contact} direction="right" speed={26} />
          <ViewportLazySection placeholderClassName="min-h-[65vh]">
            <ContactSection />
          </ViewportLazySection>
        </div>

        <div className="dark-zone">
          <FooterSection />
        </div>
      </div>
    </>
  );
}
