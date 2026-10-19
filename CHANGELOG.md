# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [Unreleased]

### Added
- Componente centralizado `ResponsiveModal` (`responsive-modal.tsx`) que renderiza un Radix Dialog en escritorio y un Bottom Sheet Drawer en móvil.
- Hooks SSR-safe `useMediaQuery` y `useIsDesktop`.
- `ProjectDetailModal` con reproductor lazy de YouTube (`youtube-nocookie.com`), cero latencia inicial, badges de estado, bullets y fichas de arquitectura.
- **SIS Consultorios** como producto estrella SaaS (reemplazando a Koda en la sección principal y servicios).
- Catálogo completo de proyectos reales de NovaPage: SIS Consultorios, Orbit, Habits, D'AGUA, Outreach y EduPlatform.
- Enlaces a videos oficiales de YouTube en alta definición para todos los proyectos del portafolio y CV.

### Changed
- `ProjectsSection` y `recentProjectsSection` rediseñados con tarjetas limpias, badges de estado (SaaS, Beta Gratuita, Software a la Medida, Sistema Interno) e integración con el modal responsivo.
- `ServiceBottomSheetModal` migrado al componente centralizado `ResponsiveModal`.
- `ServicesCategoriesSection` refinado con espaciado armónico, mobile-first y tipografía limpia.
- Retirado Evana y renombrado CourseWebsite a EduPlatform en todas las vistas y perfil profesional.
- Sincronización y validación estricta de las 3 traducciones (`es.json`, `en.json`, `pt.json`) con 0 claves huérfanas.
- Tipado robusto en `LanguageProvider` (`Record<string, unknown>`) y función genérica `t<T>()` en `useTranslation`.

## [1.1.0] - 2026-09-13

### Added
- Perfil del fundador (`/profile`): proyectos en producción — *Agente de IA de Atención por WhatsApp* y *Plataforma de Pedidos y Reparto* — con el contenido del CV vigente (es/en/pt).

### Changed
- Perfil del fundador actualizado con la información vigente del CV en los 3 idiomas: resumen (4 años de experiencia, métricas clave), habilidades técnicas, experiencia profesional y proyectos.
- Vocabulario en Capacidades: "Chatbots" → "Agentes de IA" (es/en/pt).

### Docs
- README real del proyecto (stack, estructura, i18n, deploy).
- CHANGELOG con releases e historial.

## [1.0.0] - 2026-07-14

### Added
- Componente `KodaSection`: banner de Koda como producto estrella, con enlace a `koda.novapage.com.co`.
- Traducciones `home.koda` (es/en/pt).
- Instagram y TikTok en la página de contacto + footer con redes sociales (Instagram, TikTok, LinkedIn, WhatsApp).

### Changed
- Hero rediseñado con mensaje AI-first en es/en/pt.
- Orden de la home: Hero → Benefits → KodaSection → Projects → About → CTA.
