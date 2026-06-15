"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  /** Desktop nav uses uppercase tracking; mobile drawer uses larger type */
  variant?: "nav" | "drawer";
}

export function LanguageSwitcher({ className, variant = "nav" }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();

  const baseClass =
    variant === "nav"
      ? "font-body font-medium text-[0.9375rem] uppercase tracking-[0.04em]"
      : "font-mono text-[0.5625rem] uppercase tracking-[0.14em]";

  const activeStyle = { color: "var(--text)", opacity: 1, fontWeight: 600 as const };
  const inactiveStyle = { color: "var(--text)", opacity: 0.4, fontWeight: 500 as const };

  return (
    <div
      className={cn("flex items-baseline gap-1.5 shrink-0", baseClass, className)}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("tr")}
        className="transition-opacity duration-200 hover:opacity-80 cursor-pointer min-h-11 lg:min-h-0 inline-flex items-center"
        style={lang === "tr" ? activeStyle : inactiveStyle}
        aria-current={lang === "tr" ? "true" : undefined}
      >
        TR
      </button>
      <span style={{ color: "var(--text)", opacity: 0.25 }} aria-hidden>
        |
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className="transition-opacity duration-200 hover:opacity-80 cursor-pointer min-h-11 lg:min-h-0 inline-flex items-center"
        style={lang === "en" ? activeStyle : inactiveStyle}
        aria-current={lang === "en" ? "true" : undefined}
      >
        EN
      </button>
    </div>
  );
}
