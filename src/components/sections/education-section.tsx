"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/container";
import { useLanguage } from "@/components/providers/language-provider";
import type { CareerEntry } from "@/components/sections/career-section";

function NowDot() {
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "var(--accent-raw)",
        flexShrink: 0,
      }}
    />
  );
}

function EducationCard({ entry }: { entry: CareerEntry }) {
  return (
    <div
      className="edu-card flex flex-col justify-center"
      style={{
        padding: "clamp(40px, 5.5vw, 80px) clamp(28px, 3.5vw, 56px)",
        minHeight: "clamp(320px, 42vh, 520px)",
      }}
    >
      <div
        className="flex items-center gap-2.5"
        style={{ marginBottom: "clamp(20px, 2.5vw, 32px)" }}
      >
        {entry.isCurrent && <NowDot />}
        <span
          className="font-mono tracking-[0.12em]"
          style={{
            fontSize: "clamp(0.8125rem, 1vw, 1.125rem)",
            color: entry.isCurrent ? "var(--accent-raw)" : "var(--text)",
            opacity: entry.isCurrent ? 1 : 0.6,
          }}
        >
          {entry.dateLabel}
        </span>
      </div>

      <h3
        className="font-display font-bold text-balance tracking-[-0.03em] leading-[0.92] text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
        style={{
          color: "var(--text)",
          marginBottom: "clamp(18px, 2.2vw, 28px)",
        }}
      >
        {entry.role}
      </h3>

      <p
        className="font-body font-semibold leading-[1.45] tracking-[-0.01em]"
        style={{
          color: "var(--accent-raw)",
          fontSize: "var(--text-body)",
        }}
      >
        {entry.organization}
      </p>
    </div>
  );
}

export function EducationSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (gridRef.current) {
        gsap.set(gridRef.current.querySelectorAll(".edu-card"), { opacity: 1, y: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          end: "top 35%",
          scrub: 0.6,
        },
      });

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".edu-card");
        const hrs = gridRef.current.querySelectorAll(".edu-hr");
        const vrs = gridRef.current.querySelectorAll(".edu-vr");

        gsap.set(cards, { opacity: 0, y: 24 });
        gsap.set(hrs, { scaleX: 0 });
        gsap.set(vrs, { scaleY: 0 });

        tl.to(hrs, { scaleX: 1, duration: 0.25, stagger: 0.04, ease: "none" }, 0);
        tl.to(vrs, { scaleY: 1, duration: 0.25, stagger: 0.04, ease: "none" }, 0.02);
        tl.to(cards, { opacity: 1, y: 0, duration: 0.2, stagger: 0.06, ease: "none" }, 0.08);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="education" className="relative w-full overflow-hidden">
      <div className="py-[10vh] sm:py-[12vh] lg:py-[14vh]">
        <Container>
          <div ref={gridRef}>
            <div
              className="edu-hr h-px w-full origin-left"
              style={{ backgroundColor: "var(--border-custom)" }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr_1px_1fr]">
              {t.education.map((entry, i) => (
                <div key={entry.id} className="contents">
                  {i > 0 && (
                    <>
                      <div
                        className="edu-vr hidden lg:block origin-top"
                        style={{ backgroundColor: "var(--border-custom)" }}
                      />
                      <div
                        className="edu-hr lg:hidden h-px w-full origin-left"
                        style={{ backgroundColor: "var(--border-custom)" }}
                      />
                    </>
                  )}
                  <EducationCard entry={entry} />
                </div>
              ))}
            </div>

            <div
              className="edu-hr h-px w-full origin-left"
              style={{ backgroundColor: "var(--border-custom)" }}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
