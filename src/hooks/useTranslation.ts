import { useLanguage } from "@/providers/LanguageProvider";

/**
 * Safely retrieves a nested value from a translation object using dot notation.
 * Example: getNestedValue({ navbar: { home: "Home" } }, "navbar.home") → "Home"
 */
function getNestedValue(obj: unknown, key: string): unknown {
  if (typeof obj !== "object" || obj === null) return undefined;

  return key.split(".").reduce<unknown>((acc, segment) => {
    if (typeof acc === "object" && acc !== null && segment in acc) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, obj);
}

/**
 * Translation hook that returns a translation function with optional generic return type.
 */
export function useTranslation() {
  const { messages } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function t<T = string>(key: string, _options?: { returnObjects?: boolean }): T {
    const val = getNestedValue(messages, key);
    return (val ?? key) as unknown as T;
  }

  return { t };
}
