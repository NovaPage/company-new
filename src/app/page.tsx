'use client'

import { Shirt, Home as HomeIcon, Layers3, Handshake, Sparkle } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="bg-muted/40">
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight font-parfumerie text-primary">
            {t("home.heroTitle")}
          </h1>
          <Image
            src="/favicon.png"
            alt="NovaPage logo"
            width={160}
            height={160}
            className="mx-auto rounded-full shadow-xl border border-border"
          />

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("home.heroDescription")}
          </p>

          <div className="grid sm:grid-cols-3 gap-10 pt-12">
            {/* Service 1 */}
            <div className="bg-secondary rounded-xl shadow-xl p-8 transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-foreground">
                {t("servicesHome.service1.title")}
              </h3>
              <ul className="text-sm text-primary space-y-3 text-left">
                <li className="flex items-start gap-2">
                  <Shirt size={18} className="mt-1" />
                  {t("servicesHome.service1.point1")}
                </li>
                <li className="flex items-start gap-2">
                  <HomeIcon size={18} className="mt-1" />
                  {t("servicesHome.service1.point2")}
                </li>
                <li className="flex items-start gap-2">
                  <Layers3 size={18} className="mt-1" />
                  {t("servicesHome.service1.point3")}
                </li>
                <li className="flex items-start gap-2">
                  <Handshake size={18} className="mt-1" />
                  {t("servicesHome.service1.point4")}
                </li>
                <li className="flex items-start gap-2">
                  <Sparkle size={18} className="mt-1" />
                  {t("servicesHome.service1.point5")}
                </li>
              </ul>
              <Link
                href="/services#servicio-1"
                className="mt-4 inline-block text-sm underline hover:text-foreground transition-colors"
              >
                {t("servicesHome.seeDetails")}
              </Link>
            </div>
          </div>

          <LanguageSwitcher />
        </div>
      </section>
    </main>
  );
}
