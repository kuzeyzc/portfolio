import type { CareerEntry } from "@/components/sections/career-section";

export type Lang = "en" | "tr";

export type AboutStat = { title: string; subtitle: string; desc: string };

export type LocalizedSkill = {
  id: string;
  number: string;
  name: string;
  pills: string[];
};

export type LocalizedProject = {
  oneLiner: string;
  detailedDescription: string;
  whyIBuiltIt: string;
  imageAlt?: string;
};

export type SiteTranslations = {
  nav: {
    about: string;
    work: string;
    contact: string;
    menu: string;
    close: string;
  };
  marquees: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    education: string;
    contact: string;
  };
  hero: {
    role: string;
    subtitle: string;
    openToProjects: string;
    marquee: string[];
  };
  scroll: string;
  about: {
    headline: string;
    philosophy: string;
    availability: string;
    interests: string[];
    stats: AboutStat[];
  };
  skills: LocalizedSkill[];
  experience: CareerEntry[];
  education: CareerEntry[];
  projects: Record<string, LocalizedProject>;
  projectsUi: {
    liveDemo: string;
    whyBuilt: string;
  };
  contact: {
    heading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    visitLink: string;
    toast: {
      fillAll: string;
      invalidEmail: string;
      success: string;
      error: string;
    };
  };
  footer: {
    copyright: string;
    credit: string;
  };
};
