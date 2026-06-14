import type { ComponentType, CSSProperties } from "react";
import { Linkedin, Github, Mail, Instagram } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BehanceIcon } from "@/components/ui/behance-icon";
import { SITE_LINKS } from "@/lib/site-links";

export interface ContactLink {
  id: string;
  number: string;
  name: string;
  href: string;
  icon: LucideIcon | ComponentType<{ size?: number; className?: string; style?: CSSProperties }>;
  external?: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: "email",
    number: "01",
    name: "E-POSTA",
    href: SITE_LINKS.email,
    icon: Mail,
  },
  {
    id: "linkedin",
    number: "02",
    name: "LINKEDIN",
    href: SITE_LINKS.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    id: "github",
    number: "03",
    name: "GITHUB",
    href: SITE_LINKS.github,
    icon: Github,
    external: true,
  },
  {
    id: "behance",
    number: "04",
    name: "BEHANCE",
    href: SITE_LINKS.behance,
    icon: BehanceIcon,
    external: true,
  },
  {
    id: "instagram",
    number: "05",
    name: "INSTAGRAM",
    href: SITE_LINKS.instagram,
    icon: Instagram,
    external: true,
  },
];
