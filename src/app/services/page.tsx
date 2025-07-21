// app/services/page.tsx
'use client'
import { useTranslation } from "@/hooks/useTranslation";
import { FloatingCirclesBg } from "@/components/animations/FloatingCirclesBg";
import ServicesHeroSection from "@/components/services/ServicesHeroSection";
import ServicesCategoriesSection from "@/components/services/ServicesCategoriesSection";
// import ServicesBenefitsSection from "@/components/services/ServicesBenefitsSection";
// import ServicesCallToActionSection from "@/components/services/ServicesCallToActionSection";

export default function ServicesPage() {
  useTranslation();

  return (
    <main className="bg-muted/40 relative z-10 min-h-screen">
      <FloatingCirclesBg />
      <ServicesHeroSection />
      <ServicesCategoriesSection />
    </main>
  );
}
