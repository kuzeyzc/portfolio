export interface Project {
  id: string;
  number: string;
  name: string;
  oneLiner: string;
  detailedDescription: string;
  whyIBuiltIt: string;
  pills: string[];
  image?: {
    src: string;
    alt: string;
  };
  links: {
    live?: string;
    github: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "yoru",
    number: "01",
    name: "YORU",
    oneLiner: "Play'e basmadığınız, içine adım attığınız tam ekran bir ambient istasyonu.",
    detailedDescription:
      "Yoru, 21 anime tarzı sahne ve 13 katmanlı ses manzarası etrafında kurulu tam ekran bir dinleme ortamı. Sahne ve sesler eşleştirilmiş — ses değiştirdiğinizde görseller otomatik olarak uyum sağlıyor. Birkaç saniyelik hareketsizlikten sonra arayüz kayboluyor; siz ile atmosfer arasında hiçbir engel kalmıyor. Her geçiş crossfade, her etkileşim klavye destekli; tüm deneyim tarayıcıda olduğunuzu unutturmak için tasarlandı.",
    whyIBuiltIt:
      "Verimlilik veya metrik hedefi olmayan, yalnızca bir his veren bir şey inşa etmek istedim. Çoğu müzik sitesi çalma listeleri ve kontroller etrafında kurulu. Hepsini çıkarıp atmosfer etrafında tasarlarsak ne olur diye merak ettim.",
    pills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Howler.js",
      "shadcn/ui",
      "Vitest",
    ],
    image: {
      src: "/images/yoru-project.png",
      alt: "Yoru — sinematik ambient web deneyimi",
    },
    links: {
      live: "https://yoru-sandy.vercel.app",
      github: "https://github.com/RajDesai-18/yoru",
    },
  },
  {
    id: "pr-sensei",
    number: "02",
    name: "PR SENSEI",
    oneLiner: "30 saniyeden kısa sürede PR'ınıza ulaşan yapay zeka destekli kod incelemeleri.",
    detailedDescription:
      "PR Sensei, GitHub webhook sistemine bağlanarak pull request'leri yakalar, async Redis ve BullMQ hattı üzerinden kuyruğa alır ve OpenAI ile Gemini API'leri kullanarak yapılandırılmış kod incelemeleri üretir — hepsi 30 saniyenin altında. Özet yorum ve değişen satırlara en fazla 5 satır içi yorum bırakır. İncelemeler tekilleştirilir; aynı satır iki kez işaretlenmez ve sistem commit SHA başına idempotent çalışır. Next.js paneli, çok kiracılı PostgreSQL şemasıyla desteklenen depo bazlı inceleme metriklerini, dosya hotspot'larını ve geçmişi takip eder.",
    whyIBuiltIt:
      "Kod incelemeleri içinde bulunduğum her ekipte darboğazdı. Biri PR açar, mimari ve tasarım konuşmasına geçmeden önce bariz hataları yakalayacak hızlı ve yapılandırılmış geri bildirim veren bir şey istedim — insan incelemesinin yerini almak için değil.",
    pills: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Fastify",
      "Redis",
      "BullMQ",
      "PostgreSQL",
      "Prisma ORM",
      "OpenAI API",
      "Gemini API",
      "OAuth 2.0",
    ],
    links: {
      github: "https://github.com/RajDesai-18/pr-sensei",
    },
  },
  {
    id: "llm-cookbook",
    number: "03",
    name: "LLM COOKBOOK",
    oneLiner: "Buzdolabındakileri yazın, gerçekten mantıklı tarifler alın.",
    detailedDescription:
      'LLM Cookbook, doğal dil sorgularını FAISS vektör araması ve MiniLM embedding\'leriyle tariflere eşleştirir — "sıcak ve baharatlı bir şey" aradığınızda anahtar kelime değil anlam üzerinden sonuç döner. Yeterince iyi eşleşme yoksa yerel LLM ile sıfırdan tarif üretir. Diyet filtreleri, alerjen dışlamaları ve malzeme ikamesini destekler. Pandas hattı 10.000+ ham tarif kaydını tek tekrarlanabilir script ile modele hazır embedding\'lere dönüştürür; FastAPI backend üzerinden sunulur.',
    whyIBuiltIt:
      "Tam bir LLM'e ihtiyaç duymadan semantik aramayı ne kadar ilerletebileceğimi görmek istedim. Tarifler ideal bir alan — geri getirme kalitesini test etmek için yeterince yapılandırılmış, gerçek NLP gerektirecek kadar karmaşık. Ders projesi olarak başladı; embedding, vektör arama ve ne zaman üretim ne zaman retrieval yeterli sorusuna derinlemesine daldım.",
    pills: [
      "Python",
      "FastAPI",
      "FAISS",
      "Sentence Transformers",
      "Ollama",
      "OpenAI API",
      "Streamlit",
      "Pandas",
      "NumPy",
    ],
    links: {
      github: "https://github.com/RajDesai-18/llm-cookbook",
    },
  },
  {
    id: "financial-saas",
    number: "04",
    name: "FINANCIAL SAAS",
    oneLiner:
      "Gerçek banka hesaplarına bağlanan ve paranızı anlaşılır kılan kişisel finans paneli.",
    detailedDescription:
      "Horizon, Plaid üzerinden birden fazla banka hesabına bağlanır, gerçek işlem verilerini çeker ve bakiyeler, harcama dağılımları, işlem geçmişi ve Dwolla ile fon transferlerini tek panelde birleştirir. Kimlik doğrulama Appwrite ile sunucu tarafında yönetilir; hesaplar bağlandıkça veya işlemler geldikçe arayüz gerçek zamanlı güncellenir. Odak, yalnızca bir özellik demosu değil; doğru yükleme durumları, duyarlı tablolar, Zod ile form doğrulama ve tutarlı bir tasarım sistemi olan tam bir ürün inşa etmekti.",
    whyIBuiltIt:
      "Yalnızca bir özellik değil, gerçek bir ürün gibi hissettiren bir şey inşa etmek istedim. Çoğu portfolyo projesi arayüzde kalır — gerçek banka API'leri, gerçek auth akışları, gerçek zamanlı veri ve uçtan uca çalışan bir uygulamayı mümkün kılan dağınık detaylarla uğraşmak istedim.",
    pills: [
      "Next.js",
      "TypeScript",
      "Appwrite",
      "Plaid",
      "Dwolla",
      "Tailwind CSS",
      "Chart.js",
      "React Hook Form",
      "Zod",
      "shadcn/ui",
    ],
    links: {
      live: "https://financial-saas-platform.vercel.app",
      github: "https://github.com/RajDesai-18/Financial_SaaS_Platform",
    },
  },
];
