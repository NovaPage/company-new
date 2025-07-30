import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { NavBar } from "@/components/layout/nav";
import { ThemeProvider } from "@/components/utils/theme-provider";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: "NovaPage",
  description: "Desarrollo Full-Stack a la medida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <LanguageProvider>
          <ThemeProvider>
            <NavBar />
              {children}
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
