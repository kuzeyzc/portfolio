/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { Magnetic } from "@/components/ui/magnetic";
import { LiveClock } from "@/components/ui/live-clock";
import { Github, Linkedin } from "lucide-react";
import { SITE_LINKS } from "@/lib/site-links";
import { useLanguage } from "@/components/providers/language-provider";

const HERO_CHAR_FROM = {
  opacity: 0,
  y: 60,
  scale: 0.85,
  filter: "blur(12px)",
  rotationX: -30,
  transformOrigin: "50% 100%",
} as const;

const HERO_CHAR_TO = {
  opacity: 1,
  y: 0,
  scale: 1,
  filter: "blur(0px)",
  rotationX: 0,
  duration: 0.85,
  stagger: 0.04,
  ease: "back.out(1.2)",
} as const;

type HeroPhase = "waiting" | "revealing" | "ready";

interface HeroSectionProps {
  revealed?: boolean;
  skipReveal?: boolean;
  onReady?: () => void;
}


export function HeroSection({ revealed = false, skipReveal = false, onReady }: HeroSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<HeroPhase>(skipReveal ? "ready" : "waiting");

  // ── Trigger reveal when LoadingScreen completes ──
  useEffect(() => {
    if (revealed && phase === "waiting") {
      setPhase("revealing");
    }
  }, [revealed, phase]);

  // ── Phase 2: Reveal ──
  useEffect(() => {
    if (phase !== "revealing" || !sectionRef.current) return;

    const splits: InstanceType<typeof SplitText>[] = [];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setPhase("ready");
          onReady?.();
        },
      });

      // Show content wrappers
      tl.fromTo(
        [desktopContentRef.current, mobileContentRef.current].filter(Boolean),
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
        0
      );

      const allFade = sectionRef.current!.querySelectorAll("[data-hero-fade]");
      const allLines = sectionRef.current!.querySelectorAll("[data-hero-line]");
      const nameEls = sectionRef.current!.querySelectorAll("[data-hero-name]");
      const marqueeEl = sectionRef.current!.querySelectorAll("[data-hero-marquee]");
      const infoBar = sectionRef.current!.querySelectorAll("[data-hero-info]");
      const scrollInd = sectionRef.current!.querySelector("[data-hero-scroll]");

      // Draw horizontal rules
      tl.fromTo(
        allLines,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 },
        "-=0.1"
      );

      // Fade in peripheral elements (top strip, bottom strip)
      tl.fromTo(
        allFade,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.03 },
        "-=0.5"
      );

      // SplitText reveal — blur + scale spring stagger (RAJ, then DESAI)
      nameEls.forEach((el, index) => {
        const textTarget = el.querySelector(".hero-name-text") ?? el;
        const split = new SplitText(textTarget, { type: "chars", charsClass: "char" });
        splits.push(split);

        if (prefersReducedMotion) {
          tl.fromTo(
            split.chars,
            { opacity: 0 },
            { opacity: 1, duration: 0.45, stagger: 0.02, ease: "power2.out" },
            index === 0 ? "-=0.3" : "-=0.5"
          );
        } else {
          tl.fromTo(
            split.chars,
            { ...HERO_CHAR_FROM },
            { ...HERO_CHAR_TO },
            index === 0 ? "-=0.3" : "-=0.5"
          );
        }

        // Fade in marquee between NORTH and BOUND
        if (index === 0 && marqueeEl.length > 0) {
          tl.fromTo(
            marqueeEl,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power3.out" },
            "-=0.4"
          );
        }

        // Subtitle — sync with NORTH/BOUND reveal (not after dot)
        if (index === 0 && infoBar.length > 0) {
          tl.fromTo(
            infoBar,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.3"
          );
        }

        // Geometric accent dot — elastic pop after DESAI letters finish
        const dot = el.querySelector("[data-hero-dot]");
        if (dot) {
          tl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.7,
              ease: prefersReducedMotion ? "power2.out" : "elastic.out(1, 0.5)",
            },
            ">"
          );
        }
      });

      // Scroll indicator
      if (scrollInd) {
        tl.fromTo(
          scrollInd,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, [phase, onReady]);

  // ── Skip phase (returning visitor) ──
  useEffect(() => {
    if (phase !== "ready" || !skipReveal || !sectionRef.current) return;
    const allFade = sectionRef.current.querySelectorAll("[data-hero-fade]");
    const allLines = sectionRef.current.querySelectorAll("[data-hero-line]");
    gsap.set(allFade, { opacity: 1, y: 0 });
    gsap.set(allLines, { scaleX: 1, opacity: 1 });
    gsap.set(sectionRef.current.querySelectorAll("[data-hero-name]"), {
      opacity: 1,
    });
    gsap.set(sectionRef.current.querySelectorAll("[data-hero-marquee]"), {
      opacity: 1,
    });
    gsap.set(sectionRef.current.querySelectorAll("[data-hero-info]"), {
      opacity: 1,
      y: 0,
    });
    gsap.set(sectionRef.current.querySelectorAll("[data-hero-dot]"), {
      opacity: 1,
      scale: 1,
    });
    const scrollInd = sectionRef.current.querySelector("[data-hero-scroll]");
    if (scrollInd) gsap.set(scrollInd, { opacity: 1 });
    if (desktopContentRef.current) desktopContentRef.current.style.opacity = "1";
    if (mobileContentRef.current) mobileContentRef.current.style.opacity = "1";
  }, [phase, skipReveal]);

  // ── Shared: Marquee content ──
  const marqueeItems = Array.from({ length: 4 }, () => t.hero.marquee).flat();

  const renderMarqueeStrip = (copyIndex: number) => (
    <div key={copyIndex} className="flex items-center shrink-0" aria-hidden={copyIndex === 1}>
      {marqueeItems.map((item, i) => (
        <Fragment key={`${copyIndex}-${i}`}>
          <span
            className="font-mono text-[0.9375rem] lg:text-[1rem] uppercase tracking-[0.18em] whitespace-nowrap px-3 lg:px-5"
            style={{ color: "var(--text)" }}
          >
            {item}
          </span>
          <span
            className="text-[0.9375rem] lg:text-[1.0625rem] px-1.5 lg:px-2.5"
            style={{ color: "var(--accent-raw)", opacity: 0.5 }}
          >
            ✦
          </span>
        </Fragment>
      ))}
    </div>
  );

  // ── Shared: Icon link ──
  const renderIconLink = (
    href: string,
    label: string,
    icon: React.ReactNode,
    isDownload?: boolean
  ) => (
    <Magnetic strength={0.3} radius={50}>
      <a
        href={href}
        target={isDownload ? undefined : "_blank"}
        rel={isDownload ? undefined : "noopener noreferrer"}
        download={isDownload || undefined}
        className="cursor-pointer transition-colors duration-200 flex items-center justify-center min-h-11 min-w-11 w-11 h-11 lg:w-[34px] lg:h-[34px] lg:min-h-0 lg:min-w-0"
        style={{ color: "var(--text-muted)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--text)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--text-muted)";
        }}
        aria-label={label}
      >
        {icon}
      </a>
    </Magnetic>
  );

  return (
    <section ref={sectionRef} id="hero" className="relative w-full h-screen overflow-hidden">

      {/* ═══════════════════════════════════════════
          DESKTOP HERO (lg+)
          ═══════════════════════════════════════════ */}
      <div
        ref={desktopContentRef}
        className="relative z-[2] h-full hidden lg:flex flex-col px-6 md:px-12 pt-32 pb-6"
        style={{ opacity: skipReveal ? 1 : 0 }}
      >
        {/* ── Top Strip: Role left, Clock right ── */}
        <div className="shrink-0">
          <div data-hero-fade className="flex items-center justify-between opacity-0">
            <span
              className="font-mono text-[0.6875rem] xl:text-[0.75rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--text-muted)" }}
            >
              {t.hero.role}
            </span>
            <LiveClock />
          </div>

          {/* Top HR */}
          <div
            data-hero-line
            className="w-full h-px origin-left scale-x-0 mt-4"
            style={{ backgroundColor: "var(--border-custom)" }}
          />
        </div>

        {/* ── Main Content Area: RAJ / Marquee / DESAI ── */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          {/* RAJ — left-aligned */}
          <h1
            data-hero-name
            className="hero-name-line font-display font-bold text-balance leading-[0.82] tracking-[-0.04em] whitespace-nowrap text-[clamp(3rem,18vw,26rem)]"
            style={{
              color: "var(--text)",
            }}
          >
            NORTH
          </h1>

          {/* ── Marquee Strip ── */}
          <div
            data-hero-marquee
            className="w-full overflow-hidden opacity-0 border-y my-0 py-3.5 lg:py-4"
            style={{
              borderColor: "var(--border-custom)",
              backgroundColor: "var(--bg)",
            }}
          >
            <div className="hero-marquee-track flex">
              {renderMarqueeStrip(0)}
              {renderMarqueeStrip(1)}
            </div>
          </div>

          {/* BOUND — right-aligned */}
          <h1
            data-hero-name
            className="hero-name-line hero-name-with-dot font-display font-bold text-balance leading-[0.82] tracking-[-0.04em] whitespace-nowrap text-right justify-end text-[clamp(3rem,18vw,26rem)]"
            style={{
              color: "var(--text)",
            }}
          >
            <span className="hero-name-text">BOUND</span>
            <span className="hero-accent-dot" data-hero-dot aria-hidden="true" />
          </h1>

          {/* Subtitle — right-aligned under BOUND */}
          <p
            data-hero-info
            className="font-body text-[1.125rem] xl:text-[1.4375rem] text-right mt-3 opacity-0"
            style={{ color: "var(--text)" }}
          >
            {t.hero.subtitle}
          </p>
        </div>

        {/* ── Bottom Strip ── */}
        <div className="shrink-0">
          <div
            data-hero-line
            className="w-full h-px origin-left scale-x-0 mb-4"
            style={{ backgroundColor: "var(--border-custom)" }}
          />
          <div className="flex items-end justify-between">
            <div data-hero-fade className="flex items-center gap-3 opacity-0">
              {renderIconLink(SITE_LINKS.github, "GitHub", <Github size={16} />)}
              {renderIconLink(SITE_LINKS.linkedin, "LinkedIn", <Linkedin size={16} />)}
            </div>

            <div data-hero-scroll className="opacity-0">
              <ScrollIndicator />
            </div>

            <span
              data-hero-fade
              className="font-mono text-[0.6875rem] xl:text-[0.75rem] uppercase tracking-[0.1em] opacity-0"
              style={{ color: "var(--accent-raw)" }}
            >
              {t.hero.openToProjects}
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE HERO (<lg)
          ═══════════════════════════════════════════ */}
      <div
        ref={mobileContentRef}
        className="relative z-[2] h-full flex flex-col px-6 md:px-12 pt-[4.5rem] pb-6 lg:hidden"
        style={{ opacity: skipReveal ? 1 : 0 }}
      >
        {/* ── Top Strip: Icons ── */}
        <div className="shrink-0">
          <div data-hero-fade className="flex items-center gap-2 opacity-0">
            <a
              href={SITE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-h-11 min-w-11"
              style={{ color: "var(--text-muted)" }}
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href={SITE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-h-11 min-w-11"
              style={{ color: "var(--text-muted)" }}
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
          </div>

          <div
            data-hero-line
            className="w-full h-px origin-left scale-x-0 mt-3"
            style={{ backgroundColor: "var(--border-custom)" }}
          />
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          {/* RAJ — left-aligned */}
          <h1
            data-hero-name
            className="hero-name-line font-display font-bold text-balance leading-[0.82] tracking-[-0.04em] whitespace-nowrap text-[clamp(2.75rem,22vw,8rem)]"
            style={{
              color: "var(--text)",
            }}
          >
            NORTH
          </h1>

          {/* Marquee Strip */}
          <div
            data-hero-marquee
            className="w-full overflow-hidden opacity-0 border-y my-0 py-3 lg:py-3.5"
            style={{
              borderColor: "var(--border-custom)",
              backgroundColor: "var(--bg)",
            }}
          >
            <div className="hero-marquee-track flex">
              {renderMarqueeStrip(0)}
              {renderMarqueeStrip(1)}
            </div>
          </div>

          {/* BOUND — left-aligned on mobile */}
          <h1
            data-hero-name
            className="hero-name-line hero-name-with-dot font-display font-bold text-balance leading-[0.82] tracking-[-0.04em] whitespace-nowrap text-[clamp(2.75rem,22vw,8rem)]"
            style={{
              color: "var(--text)",
            }}
          >
            <span className="hero-name-text">BOUND</span>
            <span className="hero-accent-dot" data-hero-dot aria-hidden="true" />
          </h1>

          {/* Subtitle */}
          <p
            data-hero-info
            className="font-body text-[1.0625rem] sm:text-[1.125rem] leading-[1.4] mt-3 opacity-0"
            style={{ color: "var(--text-muted)" }}
          >
            {t.hero.subtitle}
          </p>
        </div>

        {/* ── Bottom Strip ── */}
        <div className="shrink-0">
          <div
            data-hero-line
            className="w-full h-px origin-left scale-x-0 mb-3"
            style={{ backgroundColor: "var(--border-custom)" }}
          />
          <div data-hero-fade className="flex items-end justify-between opacity-0">
            <span
              className="font-mono text-[0.5625rem] sm:text-[0.625rem] uppercase tracking-[0.1em]"
              style={{ color: "var(--text-muted)" }}
            >
              {t.hero.role}
            </span>
            <span
              className="font-mono text-[0.5rem] sm:text-[0.5625rem] uppercase tracking-[0.1em]"
              style={{ color: "var(--accent-raw)" }}
            >
              {t.hero.openToProjects}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
