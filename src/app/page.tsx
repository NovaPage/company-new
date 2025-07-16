'use client'
import { useTranslation } from "@/hooks/useTranslation";
import HeroSection from "@/components/home/HeroSection";
import { FloatingCirclesBg } from "@/components/animations/FloatingCirclesBg";

export default function Home() {
  useTranslation();

  return (
    <main className="bg-muted/40 relative z-10 min-h-screen">
      <FloatingCirclesBg />
      <HeroSection />
      {/* ...más contenido */}
    </main>
  );
}
