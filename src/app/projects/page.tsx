// app/services/page.tsx
'use client'
import { useTranslation } from "@/hooks/useTranslation";
import { FloatingCirclesBg } from "@/components/animations/FloatingCirclesBg";
import ProjectsHeroSection from "@/components/projects/ProjectsHeroSection";
import ProjectsSection from "@/components/projects/ProjectsSection";


export default function ServicesPage() {
  useTranslation();

  return (
    <main className="bg-muted/40 relative z-10 min-h-screen">
      <FloatingCirclesBg />
      <ProjectsHeroSection />
      < ProjectsSection />
    </main>
  );
}
