import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { NavBar } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";


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
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
