// app/projects/page.tsx

import type { Metadata } from "next";
import { FloatingCirclesBg } from "@/components/animations/FloatingCirclesBg";
import ProjectsHeroSection from "@/components/projects/ProjectsHeroSection";
import ProjectsSection from "@/components/projects/ProjectsSection";

// Metadata específico para la página de Proyectos
export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Explora nuestros proyectos recientes de desarrollo web, automatización y soluciones digitales. Conoce los casos de éxito de NovaPage y cómo hemos transformado negocios.",
  keywords: [
    "proyectos web",
    "casos de éxito",
    "portafolio",
    "automatización",
    "desarrollo a medida",
    "soluciones digitales",
    "NovaPage"
  ],
  openGraph: {
    title: "Proyectos y Casos de Éxito | NovaPage",
    description:
      "Descubre los proyectos más destacados y los resultados obtenidos por NovaPage en desarrollo web, automatización y AI.",
    url: "https://novapage.com.co/projects",
    siteName: "NovaPage",
    images: [
      {
        url: "https://novapage.com.co/illustration-projects.png",
        width: 1200,
        height: 630,
        alt: "Proyectos NovaPage",
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

export default function ProjectsPage() {

  return (
    <main className="bg-muted/40 relative z-10 min-h-screen">
      <FloatingCirclesBg />
      <ProjectsHeroSection />
      <ProjectsSection />
    </main>
  );
}
