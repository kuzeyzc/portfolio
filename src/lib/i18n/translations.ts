import type { SiteTranslations } from "./types";

export const translations: Record<"en" | "tr", SiteTranslations> = {
  en: {
    nav: {
      about: "About",
      work: "Projects",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
    },
    marquees: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      contact: "Get in Touch",
    },
    hero: {
      role: "Full-Stack Developer & Graphic Designer",
      subtitle:
        "Since 2018, blending aesthetics with engineering — building flawless digital experiences and autonomous systems for brands.",
      openToProjects: "Open to New Projects",
      marquee: [
        "Design",
        "Front-End",
        "Back-End",
        "AI",
        "Autonomous Systems",
        "Brand Identity",
        "UI/UX",
        "Social Media",
      ],
    },
    scroll: "Scroll",
    about: {
      headline:
        "No system that doesn't look perfect can have lasting impact. I unite the power of design with the intelligence of software.",
      philosophy:
        "I'm Kuzey Yazıcıoğlu, based in Ankara. My path into the digital world began with a passion for visuals and graphic design. After turning a hobby into a professional career and teaching, I pursued software engineering at Çankaya University to bring the worlds I design to life technically. Today, I combine aesthetic vision with deep craft to build products that don't just work — they captivate.",
      availability:
        "Currently open to corporate collaborations, global freelance projects, and innovative proposals.",
      interests: [
        "Active life in digital and physical worlds.",
        "Human-centered technology research and network building.",
        "Design trends and next-generation visual arts.",
      ],
      stats: [
        {
          title: "1000+",
          subtitle: "Projects & References",
          desc: "Successful digital solutions across industries — where aesthetics and engineering meet.",
        },
        {
          title: "2018",
          subtitle: "Since",
          desc: "Continuous production at the intersection of design and software — setting trends, not following them.",
        },
        {
          title: "100%",
          subtitle: "Pixel Perfection",
          desc: "Flawless proportions, golden-ratio math, and fluid user experience (UI/UX) in every interface.",
        },
        {
          title: "AI",
          subtitle: "Autonomous Systems",
          desc: "Smart architectures with AI integration that accelerate workflows and run on a zero-error principle.",
        },
      ],
    },
    skills: [
      {
        id: "visual-design",
        number: "01",
        name: "Visual Design & UI/UX",
        pills: [
          "Adobe Photoshop",
          "Adobe Illustrator",
          "Figma",
          "UI/UX Design",
          "After Effects",
          "Premiere Pro",
          "Brand Identity",
          "Motion Graphics",
          "Typography",
        ],
      },
      {
        id: "frontend",
        number: "02",
        name: "Front-End Development",
        pills: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "GSAP",
          "Responsive Design",
          "Modern Web Architecture",
        ],
      },
      {
        id: "backend",
        number: "03",
        name: "Back-End & Database",
        pills: [
          "Node.js",
          "Python",
          "RESTful API",
          "PostgreSQL",
          "MongoDB",
          "Prisma ORM",
          "Serverless",
          "Microservices",
        ],
      },
      {
        id: "ai-autonomous",
        number: "04",
        name: "AI & Autonomous Systems",
        pills: [
          "LLM Integrations",
          "Workflow Automation",
          "Prompt Engineering",
          "Semantic Search",
          "OpenAI/Gemini API",
          "RAG Systems",
          "Data Processing",
        ],
      },
      {
        id: "tooling",
        number: "05",
        name: "Tools & Process Management",
        pills: [
          "Git",
          "GitHub Actions",
          "CI/CD",
          "Vercel",
          "Docker",
          "SEO Optimization",
          "Web Performance",
          "Agile/Scrum",
        ],
      },
    ],
    experience: [
      {
        id: "brand-identity",
        isCurrent: true,
        dateLabel: "Since 2018",
        role: "Brand Identity & Brand Management",
        organization: "300+ Successful References",
        summary:
          "Brand identity and digital experience design across a wide spectrum — from publishers to global companies.",
        bullets: [
          "Logo, social media, and digital brand identity design for clients ranging from publishers to global companies.",
          "Custom interface and visual experience design for game servers and digital communities.",
        ],
      },
      {
        id: "web-development",
        isCurrent: true,
        dateLabel: "Since 2020",
        role: "Full-Time Web & App Development",
        organization: "Freelance & Contract Projects",
        summary: "Aesthetic-focused modern web applications and AI-powered autonomous systems.",
        bullets: [
          "Development of aesthetic, UX-centered modern websites and custom admin panels for businesses.",
          "Setup of AI-powered autonomous systems and data-processing architectures that accelerate workflows.",
        ],
      },
    ],
    education: [
      {
        id: "cankaya-cs",
        isCurrent: true,
        dateLabel: "Software",
        role: "Computer Programming",
        organization: "Modern Software Architecture & System Development",
        summary: "",
        bullets: [],
      },
      {
        id: "graphic-design",
        isCurrent: true,
        dateLabel: "Design",
        role: "Advanced Graphic Design",
        organization: "UI/UX Architecture & Corporate Brand Management",
        summary: "",
        bullets: [],
      },
      {
        id: "language-education",
        isCurrent: true,
        dateLabel: "Language",
        role: "Professional Foreign Language (English)",
        organization: "Technical Literature & Global Communication",
        summary: "",
        bullets: [],
      },
    ],
    projects: {
      yoru: {
        oneLiner: "A full-screen ambient station you step into — not one you press play on.",
        detailedDescription:
          "Yoru is a full-screen listening environment built around 21 anime-style scenes and a 13-layer soundscape. Scenes and audio are paired — when you change the track, visuals adapt automatically. After a few seconds of stillness, the interface fades away; nothing stands between you and the atmosphere. Every transition crossfades, every interaction is keyboard-driven; the entire experience is designed to make you forget you're in a browser.",
        whyIBuiltIt:
          "I wanted to build something that delivers a feeling — not productivity or metrics. Most music sites are built around playlists and controls. I wondered what would happen if you removed all of that and designed around atmosphere instead.",
        imageAlt: "Yoru — cinematic ambient web experience",
      },
      "pr-sensei": {
        oneLiner: "AI-powered code reviews on your PR in under 30 seconds.",
        detailedDescription:
          "PR Sensei connects to GitHub webhooks, captures pull requests, queues them through an async Redis and BullMQ pipeline, and produces structured code reviews using OpenAI and Gemini APIs — all in under 30 seconds. It leaves a summary comment and up to 5 inline comments on changed lines. Reviews are deduplicated; the same line isn't flagged twice, and the system is idempotent per commit SHA. The Next.js dashboard tracks per-repo review metrics, file hotspots, and history backed by a multi-tenant PostgreSQL schema.",
        whyIBuiltIt:
          "Code reviews were a bottleneck on every team I was part of. I wanted something fast and structured to catch obvious issues before the architecture and design conversation — not to replace human review.",
      },
      "llm-cookbook": {
        oneLiner: "Type what's in your fridge, get recipes that actually make sense.",
        detailedDescription:
          'LLM Cookbook matches natural-language queries to recipes via FAISS vector search and MiniLM embeddings — when you search for "something warm and spicy," results come from meaning, not keywords. If there\'s no good match, it generates a recipe from scratch with a local LLM. Supports diet filters, allergen exclusions, and ingredient substitution. A Pandas pipeline converts 10,000+ raw recipe records into model-ready embeddings via a single repeatable script; served through a FastAPI backend.',
        whyIBuiltIt:
          "I wanted to see how far semantic search could go without a full LLM. Recipes are an ideal domain — structured enough to test retrieval quality, complex enough to require real NLP. It started as a class project; I went deep on embeddings, vector search, and when generation vs. retrieval is enough.",
      },
      "financial-saas": {
        oneLiner: "A personal finance dashboard that connects to real bank accounts and makes your money understandable.",
        detailedDescription:
          "Horizon connects to multiple bank accounts via Plaid, pulls real transaction data, and unifies balances, spending breakdowns, transaction history, and fund transfers via Dwolla in a single panel. Authentication is managed server-side with Appwrite; the interface updates in real time as accounts connect or transactions arrive. The focus wasn't just a feature demo — but a full product with proper loading states, responsive tables, Zod form validation, and a consistent design system.",
        whyIBuiltIt:
          "I wanted to build something that feels like a real product, not just a feature. Most portfolio projects stay on the surface — I wanted to wrestle with real bank APIs, real auth flows, real-time data, and the messy details that make an end-to-end app work.",
      },
    },
    projectsUi: {
      liveDemo: "Live Demo",
      whyBuilt: "Why I built it",
    },
    contact: {
      heading:
        "Let's turn every idea in your mind into flawless design, and your complex needs into intelligent software. Get in touch.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      messageLabel: "Message",
      messagePlaceholder: "What's on your mind?",
      submit: "Send Message",
      submitting: "Sending...",
      visitLink: "Visit link",
      toast: {
        fillAll: "Please fill in all fields.",
        invalidEmail: "Please enter a valid email address.",
        success: "Your message was sent. I'll get back to you soon.",
        error: "Something went wrong. Try sending an email directly.",
      },
    },
    footer: {
      copyright: "All rights reserved",
      credit: "Designed & built with",
    },
  },
  tr: {
    nav: {
      about: "Hakkımda",
      work: "Projeler",
      contact: "İletişim",
      menu: "Menü",
      close: "Kapat",
    },
    marquees: {
      about: "HAKKIMDA",
      skills: "YETENEKLER",
      projects: "PROJELER",
      experience: "DENEYİM",
      education: "EĞİTİM",
      contact: "İLETİŞİME GEÇİN",
    },
    hero: {
      role: "Full-Stack Developer & Graphic Designer",
      subtitle:
        "2018'den bu yana estetiği mühendislikle harmanlıyor; markalar için kusursuz dijital deneyimler ve otonom sistemler inşa ediyorum.",
      openToProjects: "YENİ PROJELERE AÇIK",
      marquee: [
        "TASARIM",
        "FRONT-END",
        "BACK-END",
        "YAPAY ZEKA",
        "OTONOM SİSTEMLER",
        "KURUMSAL KİMLİK",
        "UI/UX",
        "SOSYAL MEDYA",
      ],
    },
    scroll: "KAYDIR",
    about: {
      headline:
        "Mükemmel görünmeyen hiçbir sistemin kalıcı etkisi olamaz. Tasarımın gücünü, yazılımın zekasıyla birleştiriyorum.",
      philosophy:
        "Ben Kuzey Yazıcıoğlu, Ankara'da yaşıyorum. Dijital dünyaya adımım, görselliğe olan tutkumla grafik tasarım alanında başladı. Hobimi profesyonel bir kariyere ve eğitmenliğe dönüştürdükten sonra, tasarladığım dünyaları teknik olarak da hayata geçirmek için Çankaya Üniversitesi'nde yazılım eğitimi aldım. Bugün, estetik vizyonumu ve derin algımı birleştirerek, sadece çalışan değil, aynı zamanda büyüleyen ürünler geliştiriyorum.",
      availability:
        "Şu an kurumsal iş birliklerine, global freelance projelere ve yenilikçi tekliflere açığım.",
      interests: [
        "Dijital ve fiziksel dünyada aktif yaşam.",
        "İnsan odaklı teknoloji araştırmaları ve network geliştirme",
        "Tasarım trendleri ve yeni nesil görsel sanatlar",
      ],
      stats: [
        {
          title: "1000+",
          subtitle: "PROJE & REFERANS",
          desc: "Farklı sektörlerden markalar için üretilmiş, estetik ve mühendisliği birleştiren başarılı dijital çözümler.",
        },
        {
          title: "2018",
          subtitle: "YILINDAN BERİ",
          desc: "Tasarım ve yazılımın kesişim noktasında, trendleri takip eden değil belirleyen aralıksız üretim.",
        },
        {
          title: "%100",
          subtitle: "PİKSEL MÜKEMMELLİĞİ",
          desc: "Her bir arayüzde kusursuz oranlar, altın oran matematiği ve akıcı kullanıcı deneyimi (UI/UX).",
        },
        {
          title: "AI",
          subtitle: "OTONOM SİSTEMLER",
          desc: "İş süreçlerini hızlandıran, yapay zeka entegrasyonlu ve sıfır hata prensibiyle çalışan akıllı mimariler.",
        },
      ],
    },
    skills: [
      {
        id: "visual-design",
        number: "01",
        name: "GÖRSEL TASARIM & UI/UX",
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
    ],
    experience: [
      {
        id: "brand-identity",
        isCurrent: true,
        dateLabel: "2018'den Bu Yana",
        role: "Kurumsal Kimlik & Marka Yönetimi",
        organization: "300+ Başarılı Referans",
        summary:
          "Yayıncılardan global şirketlere kadar geniş bir yelpazede marka kimliği ve dijital deneyim tasarımı.",
        bullets: [
          "Yayıncılardan global şirketlere kadar geniş bir yelpazede logo, sosyal medya ve dijital marka kimliği tasarımları.",
          "Oyun sunucuları ve dijital topluluklar için özel arayüz ve görsel deneyim inşası.",
        ],
      },
      {
        id: "web-development",
        isCurrent: true,
        dateLabel: "2020'den Bu Yana",
        role: "Tam Zamanlı Web & Uygulama Geliştirme",
        organization: "Freelance & Sözleşmeli Projeler",
        summary:
          "Estetik odaklı modern web uygulamaları ve yapay zeka destekli otonom sistemler.",
        bullets: [
          "Kullanıcı deneyimini (UX) merkeze alan, estetik odaklı modern web sitelerinin ve şirketlere özel yönetim panellerinin geliştirilmesi.",
          "İş süreçlerini hızlandıran, yapay zeka destekli otonom sistemler ve veri işleme mimarilerinin kurulumu.",
        ],
      },
    ],
    education: [
      {
        id: "cankaya-cs",
        isCurrent: true,
        dateLabel: "Yazılım",
        role: "Bilgisayar Programcılığı",
        organization: "Modern Yazılım Mimarisi & Sistem Geliştirme",
        summary: "",
        bullets: [],
      },
      {
        id: "graphic-design",
        isCurrent: true,
        dateLabel: "Tasarım",
        role: "İleri Düzey Grafik Tasarım",
        organization: "UI/UX Mimarisi & Kurumsal Marka Yönetimi",
        summary: "",
        bullets: [],
      },
      {
        id: "language-education",
        isCurrent: true,
        dateLabel: "Dil",
        role: "Profesyonel Yabancı Dil (İngilizce)",
        organization: "Teknik Literatür Hakimiyeti & Global İletişim",
        summary: "",
        bullets: [],
      },
    ],
    projects: {
      yoru: {
        oneLiner: "Play'e basmadığınız, içine adım attığınız tam ekran bir ambient istasyonu.",
        detailedDescription:
          "Yoru, 21 anime tarzı sahne ve 13 katmanlı ses manzarası etrafında kurulu tam ekran bir dinleme ortamı. Sahne ve sesler eşleştirilmiş — ses değiştirdiğinizde görseller otomatik olarak uyum sağlıyor. Birkaç saniyelik hareketsizlikten sonra arayüz kayboluyor; siz ile atmosfer arasında hiçbir engel kalmıyor. Her geçiş crossfade, her etkileşim klavye destekli; tüm deneyim tarayıcıda olduğunuzu unutturmak için tasarlandı.",
        whyIBuiltIt:
          "Verimlilik veya metrik hedefi olmayan, yalnızca bir his veren bir şey inşa etmek istedim. Çoğu müzik sitesi çalma listeleri ve kontroller etrafında kurulu. Hepsini çıkarıp atmosfer etrafında tasarlarsak ne olur diye merak ettim.",
        imageAlt: "Yoru — sinematik ambient web deneyimi",
      },
      "pr-sensei": {
        oneLiner: "30 saniyeden kısa sürede PR'ınıza ulaşan yapay zeka destekli kod incelemeleri.",
        detailedDescription:
          "PR Sensei, GitHub webhook sistemine bağlanarak pull request'leri yakalar, async Redis ve BullMQ hattı üzerinden kuyruğa alır ve OpenAI ile Gemini API'leri kullanarak yapılandırılmış kod incelemeleri üretir — hepsi 30 saniyenin altında. Özet yorum ve değişen satırlara en fazla 5 satır içi yorum bırakır. İncelemeler tekilleştirilir; aynı satır iki kez işaretlenmez ve sistem commit SHA başına idempotent çalışır. Next.js paneli, çok kiracılı PostgreSQL şemasıyla desteklenen depo bazlı inceleme metriklerini, dosya hotspot'larını ve geçmişi takip eder.",
        whyIBuiltIt:
          "Kod incelemeleri içinde bulunduğum her ekipte darboğazdı. Biri PR açar, mimari ve tasarım konuşmasına geçmeden önce bariz hataları yakalayacak hızlı ve yapılandırılmış geri bildirim veren bir şey istedim — insan incelemesinin yerini almak için değil.",
      },
      "llm-cookbook": {
        oneLiner: "Buzdolabındakileri yazın, gerçekten mantıklı tarifler alın.",
        detailedDescription:
          'LLM Cookbook, doğal dil sorgularını FAISS vektör araması ve MiniLM embedding\'leriyle tariflere eşleştirir — "sıcak ve baharatlı bir şey" aradığınızda anahtar kelime değil anlam üzerinden sonuç döner. Yeterince iyi eşleşme yoksa yerel LLM ile sıfırdan tarif üretir. Diyet filtreleri, alerjen dışlamaları ve malzeme ikamesini destekler. Pandas hattı 10.000+ ham tarif kaydını tek tekrarlanabilir script ile modele hazır embedding\'lere dönüştürür; FastAPI backend üzerinden sunulur.',
        whyIBuiltIt:
          "Tam bir LLM'e ihtiyaç duymadan semantik aramayı ne kadar ilerletebileceğimi görmek istedim. Tarifler ideal bir alan — geri getirme kalitesini test etmek için yeterince yapılandırılmış, gerçek NLP gerektirecek kadar karmaşık. Ders projesi olarak başladı; embedding, vektör arama ve ne zaman üretim ne zaman retrieval yeterli sorusuna derinlemesine daldım.",
      },
      "financial-saas": {
        oneLiner:
          "Gerçek banka hesaplarına bağlanan ve paranızı anlaşılır kılan kişisel finans paneli.",
        detailedDescription:
          "Horizon, Plaid üzerinden birden fazla banka hesabına bağlanır, gerçek işlem verilerini çeker ve bakiyeler, harcama dağılımları, işlem geçmişi ve Dwolla ile fon transferlerini tek panelde birleştirir. Kimlik doğrulama Appwrite ile sunucu tarafında yönetilir; hesaplar bağlandıkça veya işlemler geldikçe arayüz gerçek zamanlı güncellenir. Odak, yalnızca bir özellik demosu değil; doğru yükleme durumları, duyarlı tablolar, Zod ile form doğrulama ve tutarlı bir tasarım sistemi olan tam bir ürün inşa etmekti.",
        whyIBuiltIt:
          "Yalnızca bir özellik değil, gerçek bir ürün gibi hissettiren bir şey inşa etmek istedim. Çoğu portfolyo projesi arayüzde kalır — gerçek banka API'leri, gerçek auth akışları, gerçek zamanlı veri ve uçtan uca çalışan bir uygulamayı mümkün kılan dağınık detaylarla uğraşmak istedim.",
      },
    },
    projectsUi: {
      liveDemo: "Canlı Demo",
      whyBuilt: "Neden yaptım",
    },
    contact: {
      heading:
        "Hayalinizdeki her fikri kusursuz bir tasarıma, karmaşık ihtiyaçlarınızı ise akıllı yazılımlara dönüştürelim. İletişime geçin.",
      nameLabel: "İsim",
      namePlaceholder: "Adınız",
      emailLabel: "E-posta",
      emailPlaceholder: "siz@email.com",
      messageLabel: "Mesaj",
      messagePlaceholder: "Aklınızdan ne geçiyor?",
      submit: "Mesaj Gönder",
      submitting: "Gönderiliyor...",
      visitLink: "bağlantısını ziyaret et",
      toast: {
        fillAll: "Lütfen tüm alanları doldurun.",
        invalidEmail: "Lütfen geçerli bir e-posta adresi girin.",
        success: "Mesajınız gönderildi. En kısa sürede size dönüş yapacağım.",
        error: "Bir şeyler ters gitti. Doğrudan e-posta göndermeyi deneyin.",
      },
    },
    footer: {
      copyright: "Tüm hakları saklıdır",
      credit: "Tasarım & geliştirme",
    },
  },
};

export const DEFAULT_LANG: "en" | "tr" = "en";
