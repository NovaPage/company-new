export { LOCALES, NAMESPACES, type Locale, type Namespace } from './loader';

export const DEFAULT_LOCALE = 'es' as const;

export const ROUTE_NAMESPACES = {
  '/': ['common', 'home'],
  '/projects': ['common', 'projects'],
  '/services': ['common', 'services'],
  '/profile': ['common', 'profile'],
  '/contact': ['common', 'contact'],
} as const;

export const LOCALE_LABELS = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
} as const;
