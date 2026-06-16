import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { MeshGradient } from "@/components/background/mesh-gradient";
import { FloatingThemeToggle } from "@/components/ui/floating-theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_LINKS, SITE_NAME } from "@/lib/site-links";
import { azeretMono, clashDisplay, satoshi } from "@/lib/fonts";


export const metadata: Metadata = {
  title: "NorthBound Studio",
  description:
    "2018'den bu yana estetiği mühendislikle harmanlayan NorthBound; markalar için kusursuz dijital deneyimler ve otonom sistemler inşa eder.",
  metadataBase: new URL("https://nrthbound.me"),
  keywords: [
    "NorthBound",
    "full-stack developer",
    "graphic designer",
    "portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Ankara",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    title: "NorthBound Studio",
    description:
      "Estetik vizyon ve yazılım zekasını birleştiren NorthBound; dijital deneyimler ve otonom sistemler geliştirir.",
    url: "https://northbound.studio",
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NorthBound — Full-Stack Developer & Graphic Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NorthBound — Full-Stack Developer & Graphic Designer",
    description:
      "Estetik vizyon ve yazılım zekasını birleştiren NorthBound; dijital deneyimler ve otonom sistemler geliştirir.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/333333.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F4F4F5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${clashDisplay.variable} ${satoshi.variable} ${azeretMono.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />

        {/* Lock scroll position before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration='manual';window.scrollTo(0,0);",
          }}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: SITE_NAME,
              url: "https://northbound.studio",
              jobTitle: "Full-Stack Developer & Graphic Designer",
              description:
                "Estetik vizyon ve yazılım zekasını birleştiren NorthBound; dijital deneyimler ve otonom sistemler geliştirir.",
              alumniOf: [
                {
                  "@type": "CollegeOrUniversity",
                  name: "Çankaya Üniversitesi",
                },
              ],
              sameAs: [SITE_LINKS.github, SITE_LINKS.linkedin, SITE_LINKS.behance, SITE_LINKS.instagram],
            }),
          }}
        />
      </head>
      <body className={`${satoshi.className} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
          <SmoothScrollProvider>
            {/* Skip-to-content — visible only on keyboard focus */}
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            <MeshGradient />
            <FloatingThemeToggle />
            <main id="main-content" className="relative overflow-x-hidden" style={{ zIndex: 1 }}>
              {children}
            </main>
            <Toaster />
          </SmoothScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
