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
    name: "GÖRSEL TASARIM & UI/UX",
    description: "",
    pills: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Figma",
      "UI/UX Tasarımı",
      "After Effects",
      "Premiere Pro",
      "Kurumsal Kimlik",
      "Motion Graphics",
      "Tipografi",
    ],
  },
  {
    id: "frontend",
    number: "02",
    name: "FRONT-END GELİŞTİRME",
    description: "",
    pills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Responsive Tasarım",
      "Modern Web Mimarisi",
    ],
  },
  {
    id: "backend",
    number: "03",
    name: "BACK-END & VERİTABANI",
    description: "",
    pills: [
      "Node.js",
      "Python",
      "RESTful API",
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Serverless",
      "Mikroservisler",
    ],
  },
  {
    id: "ai-autonomous",
    number: "04",
    name: "YAPAY ZEKA & OTONOM SİSTEMLER",
    description: "",
    pills: [
      "LLM Entegrasyonları",
      "İş Akışı Otomasyonu",
      "Prompt Engineering",
      "Semantic Search",
      "OpenAI/Gemini API",
      "RAG Sistemleri",
      "Veri İşleme",
    ],
  },
  {
    id: "tooling",
    number: "05",
    name: "ARAÇLAR & SÜREÇ YÖNETİMİ",
    description: "",
    pills: [
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Vercel",
      "Docker",
      "SEO Optimizasyonu",
      "Web Performansı",
      "Agile/Scrum",
    ],
  },
];
