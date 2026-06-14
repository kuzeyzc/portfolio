"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/container";
import { SKILLS } from "@/lib/skills-data";

const SKILL_BADGE_CLASS =
  "inline-flex items-center px-5 py-2.5 rounded-full border border-black/10 bg-black/5 text-sm font-medium text-black/80 transition-all duration-300 ease-out cursor-default hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_8px_16px_-6px_rgba(37,99,235,0.4)]";

/* ──────────────────────────────────────────────────────────
   SKILL BADGES — interactive pills
   ────────────────────────────────────────────────────────── */

function SkillBadges({ pills }: { pills: string[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {pills.map((tech) => (
        <div key={tech} className={SKILL_BADGE_CLASS}>
          {tech}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SKILL CELL — category name + skill badges
   ────────────────────────────────────────────────────────── */

function SkillCell({ skill }: { skill: (typeof SKILLS)[number] }) {
  return (
    <div
      className="skill-cell"
      style={{ padding: "clamp(24px, 2.5vw, 36px) clamp(20px, 2vw, 32px)" }}
    >
      <h3
        className="font-display font-bold text-balance text-4xl md:text-6xl tracking-[-0.03em] mb-8 sm:mb-10 lg:mb-12"
        style={{
          color: "var(--text)",
        }}
      >
        {skill.name}
      </h3>

      <SkillBadges pills={skill.pills} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SOLO CELL — full-width row (name left, badges right)
   ────────────────────────────────────────────────────────── */

function SoloCell({ skill }: { skill: (typeof SKILLS)[number] }) {
  return (
    <div
      className="skill-cell"
      style={{ padding: "clamp(24px, 2.5vw, 36px) clamp(20px, 2vw, 32px)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(220px,0.9fr)_1.4fr] gap-8 lg:gap-14 xl:gap-16 items-start">
        <h3
          className="font-display font-bold text-balance text-4xl md:text-6xl tracking-[-0.03em] lg:pt-1"
          style={{
            color: "var(--text)",
          }}
        >
          {skill.name}
        </h3>

        <SkillBadges pills={skill.pills} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────── */

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (gridRef.current) gsap.set(gridRef.current, { opacity: 1, y: 0, scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          end: "top 20%",
          scrub: 0.6,
        },
      });

      if (gridRef.current) {
        const cells = gridRef.current.querySelectorAll(".skill-cell");
        const hrs = gridRef.current.querySelectorAll(".skill-hr");
        const vrs = gridRef.current.querySelectorAll(".skill-vr");

        gsap.set(cells, { opacity: 0, y: 24 });
        gsap.set(hrs, { scaleX: 0 });
        gsap.set(vrs, { scaleY: 0 });

        tl.to(hrs, { scaleX: 1, duration: 0.25, stagger: 0.04, ease: "none" }, 0);
        tl.to(vrs, { scaleY: 1, duration: 0.25, stagger: 0.04, ease: "none" }, 0.02);
        tl.to(cells, { opacity: 1, y: 0, duration: 0.2, stagger: 0.04, ease: "none" }, 0.08);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const row1 = [SKILLS[0], SKILLS[1]];
  const row2 = [SKILLS[2], SKILLS[3]];
  const solo = SKILLS[4];

  return (
    <section ref={sectionRef} id="skills" className="relative w-full overflow-hidden">
      <div className="py-[6vh] sm:py-[8vh] lg:py-[10vh]">
        <Container>
          <div ref={gridRef}>
            {/* ── Row 1: Görsel Tasarım | Front-End ── */}
            <div
              className="skill-hr h-px w-full origin-left"
              style={{ backgroundColor: "var(--border-custom)" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]">
              <SkillCell skill={row1[0]} />
              <div
                className="skill-vr hidden md:block origin-top"
                style={{ backgroundColor: "var(--border-custom)" }}
              />
              <div
                className="md:hidden h-px w-full"
                style={{ backgroundColor: "var(--border-custom)" }}
              />
              <SkillCell skill={row1[1]} />
            </div>

            {/* ── Row 2: Back-End | Yapay Zeka ── */}
            <div
              className="skill-hr h-px w-full origin-left"
              style={{ backgroundColor: "var(--border-custom)" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]">
              <SkillCell skill={row2[0]} />
              <div
                className="skill-vr hidden md:block origin-top"
                style={{ backgroundColor: "var(--border-custom)" }}
              />
              <div
                className="md:hidden h-px w-full"
                style={{ backgroundColor: "var(--border-custom)" }}
              />
              <SkillCell skill={row2[1]} />
            </div>

            {/* ── Row 3: Araçlar & Süreç Yönetimi (full width) ── */}
            <div
              className="skill-hr h-px w-full origin-left"
              style={{ backgroundColor: "var(--border-custom)" }}
            />
            <div className="hidden md:block">
              <SoloCell skill={solo} />
            </div>
            <div className="md:hidden">
              <SkillCell skill={solo} />
            </div>

            <div
              className="skill-hr h-px w-full origin-left"
              style={{ backgroundColor: "var(--border-custom)" }}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
