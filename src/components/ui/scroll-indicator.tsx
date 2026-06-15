"use client";

import { useLanguage } from "@/components/providers/language-provider";

export function ScrollIndicator() {
  const { t } = useLanguage();

  return (
    <div className="scroll-indicator">
      <span
        className="font-mono text-[0.625rem] uppercase tracking-[0.15em]"
        style={{ color: "var(--text-muted)" }}
      >
        {t.scroll}
      </span>
      <div className="dot" />
    </div>
  );
}
