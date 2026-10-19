"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { loadLocaleMessages } from "@/utils/loadMessages";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";

type LanguageContextType = {
  locale: Locale;
  messages: Record<string, unknown>;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "app_locale";
const COOKIE_KEY = "NEXT_LOCALE";

export const LanguageProvider = ({
  children,
  initialLocale = DEFAULT_LOCALE,
  initialMessages = {},
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
  initialMessages?: Record<string, unknown>;
}) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [messages, setMessages] = useState<Record<string, unknown>>(initialMessages);

  const setLocale = async (newLocale: Locale) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newLocale);
      document.cookie = `${COOKIE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // safe fallback for environments without storage/cookies
    }
    setLocaleState(newLocale);
    const loadedMessages = await loadLocaleMessages(newLocale);
    setMessages(loadedMessages);
  };

  useEffect(() => {
    const init = async () => {
      let storedLocale: Locale | null = null;
      try {
        storedLocale = localStorage.getItem(LOCAL_STORAGE_KEY) as Locale | null;
      } catch {
        // safe fallback
      }
      const activeLocale =
        storedLocale && LOCALES.includes(storedLocale) ? storedLocale : DEFAULT_LOCALE;
      setLocaleState(activeLocale);
      const loadedMessages = await loadLocaleMessages(activeLocale);
      setMessages(loadedMessages);
    };
    init();
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, messages, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
