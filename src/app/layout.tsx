// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { NavBar } from "@/components/layout/nav";
import { ThemeProvider } from "@/components/utils/theme-provider";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// General SEO and Open Graph metadata for the entire site
export const metadata: Metadata = {
  title: {
    default: "NovaPage",
    template: "%s | NovaPage", // Allows each page to set its own title, fallback to "NovaPage"
  },
  description: "Desarrollo Full-Stack a la medida: web, cloud, automatización y AI. Soluciones profesionales, modernas y seguras para tu negocio.",
  keywords: [
    "desarrollo web",
    "full-stack",
    "automatización",
    "cloud",
    "AI",
    "React",
    "Next.js",
    "soluciones digitales",
    "software a medida"
  ],
  creator: "NovaPage",
  openGraph: {
    title: "NovaPage",
    description: "Desarrollo Full-Stack a la medida: web, cloud, automatización y AI.",
    url: "https://novapage.com.co",
    siteName: "NovaPage",
    images: [
      {
        url: "https://novapage.com.co/illustration-hero.png",
        width: 1200,
        height: 630,
        alt: "NovaPage Hero Image",
      },
    ],
    locale: "es_CO", // Cambia si tu público objetivo es otro país
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <LanguageProvider>
          <ThemeProvider>
            <NavBar />
            {children}
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
