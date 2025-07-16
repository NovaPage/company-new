'use client'
import { useTranslation } from "@/hooks/useTranslation";
import HeroSection from "@/components/home/HeroSection";
import { FloatingCirclesBg } from "@/components/animations/FloatingCirclesBg";
import BenefitsSection from "@/components/home/benefistSection";
import AboutSection from "@/components/home/aboutSection";
import RecentProjectsSection from "@/components/home/recentProjectsSection";
import CallToActionSection from "@/components/home/callToActionSection";

export default function Home() {
  useTranslation();

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
