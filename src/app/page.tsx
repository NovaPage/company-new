// src/app/page.tsx

import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import { FloatingCirclesBg } from "@/components/animations/FloatingCirclesBg";
import BenefitsSection from "@/components/home/benefistSection";
import AboutSection from "@/components/home/aboutSection";
import RecentProjectsSection from "@/components/home/recentProjectsSection";
import CallToActionSection from "@/components/home/callToActionSection";

// Home page specific SEO metadata
export const metadata: Metadata = {
  title: "Inicio | NovaPage",
  description: "Impulsa tu negocio con desarrollo web moderno, automatización, inteligencia artificial y soluciones cloud. Descubre los proyectos recientes y los beneficios de NovaPage.",
  keywords: [
    "desarrollo web",
    "automatización",
    "inteligencia artificial",
    "soluciones cloud",
    "proyectos web",
    "servicios digitales",
    "NovaPage"
  ],
  openGraph: {
    title: "Soluciones Web Modernas y AI para tu negocio | NovaPage",
    description: "Impulsa tu negocio con desarrollo web moderno, automatización y soluciones cloud de NovaPage.",
    url: "https://company-new-green.vercel.app/",
    siteName: "NovaPage",
    images: [
      {
        url: "https://company-new-green.vercel.app/illustration-hero.png",
        width: 1200,
        height: 630,
        alt: "Hero NovaPage",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {

  return (
    <main className="bg-muted/40 relative z-10 min-h-screen">
      <FloatingCirclesBg />
      <HeroSection />
      <BenefitsSection />
      <RecentProjectsSection />
      <AboutSection />
      <CallToActionSection />
    </main>
  );
}
