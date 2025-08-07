// app/contact/page.tsx

import type { Metadata } from "next";
import { FloatingCirclesBg } from "@/components/animations/FloatingCirclesBg";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactFormSection from "@/components/contact/ContactFormSection";

// Metadata específico para la página de Contacto
export const metadata: Metadata = {
  title: "Contáctanos",
  description:
    "¿Listo para transformar tu negocio? Ponte en contacto con NovaPage para desarrollo web, automatización y soluciones digitales. Resolvemos tus dudas y te asesoramos sin compromiso.",
  keywords: [
    "contacto",
    "asesoría digital",
    "desarrollo web",
    "automatización",
    "soluciones digitales",
    "consultoría tecnológica",
    "NovaPage"
  ],
  openGraph: {
    title: "Contáctanos | NovaPage",
    description:
      "Comunícate con NovaPage para recibir asesoría en desarrollo web, inteligencia artificial y automatización. ¡Hablemos de tu próximo proyecto!",
    url: "https://company-new-green.vercel.app/contact",
    siteName: "NovaPage",
    images: [
      {
        url: "https://company-new-green.vercel.app/illustration-contact.png",
        width: 1200,
        height: 630,
        alt: "Contacto NovaPage",
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

export default function ContactPage() {

  return (
    <main className="bg-muted/40 relative z-10 min-h-screen">
      <FloatingCirclesBg />
      <ContactHeroSection />
      <ContactFormSection />
    </main>
  );
}
