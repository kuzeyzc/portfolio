"use client";

import dynamic from "next/dynamic";

export const SkillsSection = dynamic(
  () =>
    import("@/components/sections/skills-section").then((mod) => ({
      default: mod.SkillsSection,
    })),
  { ssr: false }
);

export const ExperienceSection = dynamic(
  () =>
    import("@/components/sections/experience-section").then((mod) => ({
      default: mod.ExperienceSection,
    })),
  { ssr: false }
);

export const EducationSection = dynamic(
  () =>
    import("@/components/sections/education-section").then((mod) => ({
      default: mod.EducationSection,
    })),
  { ssr: false }
);

export const ContactSection = dynamic(
  () =>
    import("@/components/sections/contact-section").then((mod) => ({
      default: mod.ContactSection,
    })),
  { ssr: false }
);
