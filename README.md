# NovaPage — Sitio web corporativo

Sitio oficial de **NovaPage**: [novapage.com.co](https://novapage.com.co). Presentación corporativa con i18n en español, inglés y portugués.

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** + shadcn/ui (Radix) + Framer Motion
- Fuentes locales (Efourpro, Glacial Indifference) · Vercel Analytics + Speed Insights

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run start   # servir el build
npm run lint
```

## Estructura

- `src/app/` — rutas: `/`, `/services` (Capacidades), `/projects` (Productos), `/contact`, `/profile` (CV del fundador)
- `src/components/` — componentes por dominio: `home/`, `services/`, `projects/`, `contact/`, `cv/`, `layout/`, `ui/`, `animations/`
- `src/messages/{es,en,pt}.json` — **todo el contenido visible** (i18n)
- `src/providers/LanguageProvider.tsx` + `src/hooks/useTranslation.ts` — i18n propio (idioma por defecto: `es`)
- `public/` — imágenes, fuentes, iconos de contacto, `robots.txt`, `sitemap.xml`

## Contenido e i18n

Todo el texto visible vive en `src/messages/*.json` y se resuelve con `t('ruta.de.la.clave')`.

Al editar contenido:

1. Actualizar **los 3 idiomas** (`es`, `en`, `pt`) manteniendo las mismas claves.
2. Vocabulario: **"agentes de IA"** — nunca "bots" / "chatbots".
3. El perfil del fundador (`/profile`) se alimenta de la sección `profile`; está fuera de la navegación y del sitemap, y excluido en `robots.txt`.

## Deploy

Vercel auto-deploy desde `main` (push → build → producción). Dominio: `novapage.com.co`; `www` redirige al dominio principal.
