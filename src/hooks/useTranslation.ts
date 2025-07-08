import { useLanguage } from "@/providers/LanguageProvider";

/**
 * Safely retrieves a nested string value from a translation object using dot notation.
 * Example: getNestedValue({ navbar: { home: "Home" } }, "navbar.home") → "Home"
 */
function getNestedValue(obj: unknown, key: string): string | undefined {
  if (typeof obj !== "object" || obj === null) return undefined;

  return key.split(".").reduce<unknown>((acc, segment) => {
    if (typeof acc === "object" && acc !== null && segment in acc) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, obj) as string | undefined;
}

/**
 * Translation hook that returns a translation function using nested key paths.
 */
export function useTranslation() {
  const { messages } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function t(key: string, p0?: { returnObjects: boolean; }): string {
    return getNestedValue(messages, key) ?? key;
  }

  return { t };
}
