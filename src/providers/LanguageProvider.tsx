"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { loadLocaleMessages } from "@/utils/loadMessages";

type SupportedLocale = "es" | "en" | "pt";

type LanguageContextType = {
  locale: SupportedLocale;
  messages: Record<string, string>;
  setLocale: (locale: SupportedLocale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const DEFAULT_LOCALE: SupportedLocale = "es";
const LOCAL_STORAGE_KEY = "app_locale";

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(DEFAULT_LOCALE);
  const [messages, setMessages] = useState<Record<string, string>>({});

  const setLocale = async (newLocale: SupportedLocale) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
    const loadedMessages = await loadLocaleMessages(newLocale);
    setMessages(loadedMessages);
  };

  useEffect(() => {
    const init = async () => {
      const storedLocale = localStorage.getItem(LOCAL_STORAGE_KEY) as SupportedLocale | null;
      const initialLocale = storedLocale || DEFAULT_LOCALE;
      setLocaleState(initialLocale);
      const loadedMessages = await loadLocaleMessages(initialLocale);
      setMessages(loadedMessages);
    };
    init();
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, messages, setLocale }}>
      {children}
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
