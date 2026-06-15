"use client";

import { CareerSection } from "@/components/sections/career-section";
import { useLanguage } from "@/components/providers/language-provider";

export function ExperienceSection() {
  const { t } = useLanguage();
  return <CareerSection id="experience" entries={t.experience} />;
}
