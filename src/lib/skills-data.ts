export interface Skill {
  id: string;
  number: string;
  name: string;
  description: string;
  pills: string[];
}

export const SKILLS: Skill[] = [
  {
    id: "visual-design",
    number: "01",
    name: "GÖRSEL TASARIM",
    description: "",
    pills: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe After Effects",
      "Premiere Pro",
      "Figma",
      "UI/UX Design",
    ],
  },
  {
    id: "software-web",
    number: "02",
    name: "YAZILIM & WEB",
    description: "",
    pills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "Python",
      "Full-Stack Architecture",
    ],
  },
  {
    id: "ai-autonomous",
    number: "03",
    name: "YAPAY ZEKA & OTONOM SİSTEMLER",
    description: "",
    pills: [
      "LLM Integrations",
      "Workflow Automation",
      "Semantic Search",
      "Prompt Engineering",
      "API Design",
    ],
  },
];
