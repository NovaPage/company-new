import { loadAllMessages } from "@/i18n/loader";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";

/**
 * Loads aggregated messages for a given locale using the modular namespace loader.
 * Preserves backwards compatibility with legacy callers.
 */
export async function loadLocaleMessages(locale: string): Promise<Record<string, unknown>> {
  const safeLocale: Locale = LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;

  try {
    return await loadAllMessages(safeLocale);
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return {};
  }
}
