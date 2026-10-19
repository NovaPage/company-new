export async function loadLocaleMessages(locale: string): Promise<Record<string, unknown>> {
  try {
    const messages = await import(`@/messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return {};
  }
}
