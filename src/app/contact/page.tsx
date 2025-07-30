// app/services/page.tsx
'use client'
import { useTranslation } from "@/hooks/useTranslation";
import { FloatingCirclesBg } from "@/components/animations/FloatingCirclesBg";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactFormSection from "@/components/contact/ContactFormSection";


export default function ServicesPage() {
  useTranslation();

  return (
    <main className="bg-muted/40 relative z-10 min-h-screen">
      <FloatingCirclesBg />
      <ContactHeroSection />
      <ContactFormSection />
    </main>
  );
}
