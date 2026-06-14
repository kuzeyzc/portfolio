"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { ScrambleText } from "@/components/ui/scramble-text";
import { SITE_BRAND } from "@/lib/site-links";

const NAV_LINKS = [
  { label: "HAKKIMDA", href: "#about", number: "01" },
  { label: "PROJELER", href: "#work", number: "02" },
  { label: "İLETİŞİM", href: "#contact", number: "03" },
] as const;

export function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const hrTopRef = useRef<HTMLDivElement>(null);
  const hrBottomRef = useRef<HTMLDivElement>(null);

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  /* ── GSAP Scrub: continuous morph from full-width → compact centered ── */
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    if (!navWrapRef.current || !navBarRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "+=400",
          scrub: 0.3,
          onUpdate: (self) => {
            /* Add/remove a class for pointer-events on the backdrop area */
            if (navWrapRef.current) {
              navWrapRef.current.setAttribute(
                "data-compact",
                self.progress > 0.95 ? "true" : "false"
              );
            }
          },
        },
      });

      /* Nav wrapper: shrink width + add centering padding */
      tl.fromTo(
        navWrapRef.current,
        {
          paddingLeft: "64px",
          paddingRight: "64px",
          paddingTop: "32px",
        },
        {
          paddingLeft: "calc(50vw - 270px)",
          paddingRight: "calc(50vw - 270px)",
          paddingTop: "16px",
          duration: 1,
          ease: "none",
        },
        0
      );

      /* Nav bar: gain backdrop + border lines */
      tl.fromTo(
        navBarRef.current,
        {
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
          paddingTop: "0px",
          paddingBottom: "0px",
          paddingLeft: "0px",
          paddingRight: "0px",
        },
        {
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          paddingTop: "12px",
          paddingBottom: "12px",
          paddingLeft: "24px",
          paddingRight: "24px",
          duration: 1,
          ease: "none",
        },
        0
      );

      /* HR lines: draw in from center */
      tl.fromTo(
        [hrTopRef.current, hrBottomRef.current],
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "none", stagger: 0.05 },
        0.3
      );
    });

    return () => ctx.revert();
  }, []);

  /* ── Lock scroll when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* ── Focus trap: drawer ── */
  useEffect(() => {
    if (drawerOpen && drawerRef.current) {
      const timer = setTimeout(() => {
        const firstLink = drawerRef.current?.querySelector("a, button") as HTMLElement | null;
        firstLink?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else if (!drawerOpen) {
      hamburgerRef.current?.focus();
    }
  }, [drawerOpen]);

  /* ── Tab trap inside drawer ── */
  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusableEls = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls.length === 0) return;
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  const handleLinkClick = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════
          DESKTOP NAV — Single element that morphs (lg+)
          ═══════════════════════════════════════════ */}
      <div
        ref={navWrapRef}
        className="dark-zone fixed top-0 left-0 right-0 z-50 hidden lg:block h-[80px] opacity-100"
        style={{
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "24px",
        }}
      >
        <nav aria-label="Main navigation">
          {/* Top HR */}
          <div
            ref={hrTopRef}
            className="h-px w-full origin-center"
            style={{
              backgroundColor: "var(--border-custom)",
              transform: "scaleX(0)",
              opacity: 0,
            }}
          />

          {/* Nav bar content */}
          <div ref={navBarRef} className="flex items-baseline justify-between">
            <a
              href="#hero"
              className="font-body font-medium text-[0.8125rem] xl:text-[1.0625rem] tracking-[0.05em] transition-opacity duration-300 hover:opacity-80 cursor-pointer uppercase"
              style={{ color: "var(--text)" }}
              aria-label="Back to top"
            >
              {SITE_BRAND}
            </a>

            <div className="flex items-baseline gap-8 xl:gap-10" role="list">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-cursor-hide
                  role="listitem"
                  className="group flex items-baseline gap-2 transition-all duration-300 cursor-pointer"
                  style={{ color: "var(--text)", opacity: 0.7 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent-raw)";
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text)";
                    e.currentTarget.style.opacity = "0.7";
                  }}
                >
                  <span
                    className="font-mono text-[0.9375rem] tracking-[0.06em] tabular-nums"
                    style={{ color: "var(--accent-raw)", opacity: 0.8 }}
                  >
                    {link.number}
                  </span>
                  <span className="font-body font-medium text-[0.9375rem] uppercase tracking-[0.04em]">
                    <ScrambleText text={link.label} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom HR */}
          <div
            ref={hrBottomRef}
            className="h-px w-full origin-center"
            style={{
              backgroundColor: "var(--border-custom)",
              transform: "scaleX(0)",
              opacity: 0,
            }}
          />
        </nav>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE — Fixed bar + drawer
          ═══════════════════════════════════════════ */}

      <header
        className="dark-zone fixed top-0 left-0 right-0 z-[60] lg:hidden h-[60px] px-6 md:px-12 flex items-center justify-between"
        aria-label="Mobile navigation"
      >
        <a
          href="#hero"
          className="font-body font-medium text-[0.625rem] sm:text-[0.9375rem] tracking-[0.05em] uppercase transition-opacity duration-300 hover:opacity-80 min-h-11 inline-flex items-center"
          style={{ color: "var(--text)" }}
          aria-label="Back to top"
        >
          {SITE_BRAND}
        </a>

        <button
          ref={hamburgerRef}
          className="mobile-hamburger flex items-center justify-center gap-2 min-h-11 min-w-11 px-3 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: drawerOpen ? "transparent" : "var(--surface)",
            border: drawerOpen ? "none" : "1px solid var(--border-custom)",
            backdropFilter: drawerOpen ? "none" : "blur(12px)",
            WebkitBackdropFilter: drawerOpen ? "none" : "blur(12px)",
            color: "var(--text)",
          }}
          onClick={() => setDrawerOpen((prev) => !prev)}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          aria-controls="mobile-nav-drawer"
        >
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em]">
            {drawerOpen ? "Close" : "Menu"}
          </span>
          <div className="relative w-4 h-3 flex flex-col justify-between" aria-hidden="true">
            <span
              className="block w-full h-[1.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                backgroundColor: "var(--text)",
                transform: drawerOpen ? "translateY(4px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-full h-[1.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                backgroundColor: "var(--text)",
                opacity: drawerOpen ? 0 : 1,
                transform: drawerOpen ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <span
              className="block w-full h-[1.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                backgroundColor: "var(--text)",
                transform: drawerOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }}
            />
          </div>
        </button>
      </header>

      {/* Mobile: Backdrop */}
      <div
        className="fixed inset-0 z-[55] lg:hidden transition-opacity duration-400"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
        }}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile: Drawer */}
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        className="mobile-drawer dark-zone fixed top-0 right-0 bottom-0 z-[56] lg:hidden flex flex-col w-full max-w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: drawerOpen ? "translateX(0)" : "translateX(100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!drawerOpen}
        tabIndex={-1}
      >
        <div className="h-[60px] shrink-0" />
        <nav
          className="flex-1 flex flex-col justify-center px-6 md:px-12 gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="group flex items-baseline gap-4 min-h-11 py-3 transition-colors duration-200"
              style={{
                borderBottom: i < NAV_LINKS.length - 1 ? "1px solid var(--border-custom)" : "none",
              }}
              tabIndex={drawerOpen ? 0 : -1}
            >
              <span
                className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase"
                style={{ color: "var(--accent-raw)" }}
              >
                {link.number}
              </span>
              <span
                className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.02em] uppercase transition-colors duration-200 group-active:text-[var(--accent-raw)] text-balance"
                style={{ color: "var(--text)" }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="px-6 md:px-12 pb-8 flex items-center justify-end">
          <span
            className="font-mono text-[0.5625rem] uppercase tracking-[0.1em]"
            style={{ color: "var(--text-muted)" }}
          >
            North Bound · 2026
          </span>
        </div>
      </div>
    </>
  );
}
