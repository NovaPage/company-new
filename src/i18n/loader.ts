export const LOCALES = ['es', 'en', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

export const NAMESPACES = [
  'common',
  'home',
  'projects',
  'services',
  'profile',
  'contact',
] as const;
export type Namespace = (typeof NAMESPACES)[number];

// Static loader registry for bundler code-splitting and zero-dynamic-path overhead
const loaders: Record<
  Namespace,
  Record<Locale, () => Promise<{ default: Record<string, unknown> }>>
> = {
  common: {
    es: () => import('../messages/es/common.json', { with: { type: 'json' } }),
    en: () => import('../messages/en/common.json', { with: { type: 'json' } }),
    pt: () => import('../messages/pt/common.json', { with: { type: 'json' } }),
  },
  home: {
    es: () => import('../messages/es/home.json', { with: { type: 'json' } }),
    en: () => import('../messages/en/home.json', { with: { type: 'json' } }),
    pt: () => import('../messages/pt/home.json', { with: { type: 'json' } }),
  },
  projects: {
    es: () => import('../messages/es/projects.json', { with: { type: 'json' } }),
    en: () => import('../messages/en/projects.json', { with: { type: 'json' } }),
    pt: () => import('../messages/pt/projects.json', { with: { type: 'json' } }),
  },
  services: {
    es: () => import('../messages/es/services.json', { with: { type: 'json' } }),
    en: () => import('../messages/en/services.json', { with: { type: 'json' } }),
    pt: () => import('../messages/pt/services.json', { with: { type: 'json' } }),
  },
  profile: {
    es: () => import('../messages/es/profile.json', { with: { type: 'json' } }),
    en: () => import('../messages/en/profile.json', { with: { type: 'json' } }),
    pt: () => import('../messages/pt/profile.json', { with: { type: 'json' } }),
  },
  contact: {
    es: () => import('../messages/es/contact.json', { with: { type: 'json' } }),
    en: () => import('../messages/en/contact.json', { with: { type: 'json' } }),
    pt: () => import('../messages/pt/contact.json', { with: { type: 'json' } }),
  },
};

// In-memory cache to prevent duplicate fetches across renders
const cache = new Map<string, Record<string, unknown>>();

/**
 * Loads a single namespace for a given locale.
 */
export async function loadNamespace(
  locale: Locale,
  ns: Namespace
): Promise<Record<string, unknown>> {
  const cacheKey = `${locale}:${ns}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const fn = loaders[ns]?.[locale];
  if (fn) {
    const mod = await fn();
    const data = ((mod as unknown as { default: Record<string, unknown> }).default ||
      mod) as Record<string, unknown>;
    cache.set(cacheKey, data);
    return data;
  }

  return {};
}

/**
 * Loads specific namespaces for a route, returning an aggregated messages object.
 * Modular route loading reduces First Load JS size.
 */
export async function loadNamespaces(
  locale: Locale,
  namespaces: readonly Namespace[]
): Promise<Record<string, unknown>> {
  const results = await Promise.all(
    namespaces.map(async (ns) => {
      const data = await loadNamespace(locale, ns);
      return { ns, data };
    })
  );

  const aggregated: Record<string, unknown> = {};

  for (const { ns, data } of results) {
    if (ns === 'common') {
      // Common contains top-level layout keys: nav & footer
      if (data.nav) aggregated.nav = data.nav;
      if (data.footer) aggregated.footer = data.footer;
    } else {
      aggregated[ns] = data;
    }
  }

  return aggregated;
}

/**
 * Loads all namespaces for full application or global fallback.
 */
export async function loadAllMessages(
  locale: Locale
): Promise<Record<string, unknown>> {
  return loadNamespaces(locale, NAMESPACES);
}
