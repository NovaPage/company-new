// app/services/page.tsx

import type { Metadata } from "next";
import { FloatingCirclesBg } from "@/components/animations/FloatingCirclesBg";
import ServicesHeroSection from "@/components/services/ServicesHeroSection";
import ServicesCategoriesSection from "@/components/services/ServicesCategoriesSection";

// Metadata específico para la página de Servicios
export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Descubre nuestros servicios: desarrollo web a medida, automatización de procesos, soluciones cloud e inteligencia artificial. Todo lo que tu empresa necesita para innovar con NovaPage.",
  keywords: [
    "servicios web",
    "desarrollo a medida",
    "automatización",
    "cloud",
    "inteligencia artificial",
    "consultoría digital",
    "NovaPage"
  ],
  openGraph: {
    title: "Servicios de Desarrollo Web, Automatización y AI | NovaPage",
    description:
      "Conoce nuestros servicios: desarrollo web personalizado, automatización, inteligencia artificial y cloud. Impulsa tu empresa con NovaPage.",
    url: "https://novapage.com.co/services",
    siteName: "NovaPage",
    images: [
      {
        url: "https://novapage.com.co/illustration-services.png",
        width: 1200,
        height: 630,
        alt: "Servicios NovaPage",
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

export default function ServicesPage() {

  return (
    <main className="bg-muted/40 relative z-10 min-h-screen">
      <FloatingCirclesBg />
      <ServicesHeroSection />
      <ServicesCategoriesSection />
    </main>
  );
}
