# Changelog

## [Unreleased]

### Added
- Centralized `ResponsiveModal` component (`responsive-modal.tsx`) that renders a Radix Dialog on desktop and a Bottom Sheet Drawer on mobile.
- `useMediaQuery` and `useIsDesktop` SSR-safe hooks.
- `ProjectDetailModal` with lazy-loaded embedded YouTube demo videos (`youtube-nocookie.com`), project tags, highlights, and status badges.
- SIS Consultorios as flagship SaaS product (replacing Koda in services and projects).
- Showcase of real NovaPage products: SIS Consultorios, Orbit, Habits, D'AGUA, Outreach, EduPlatform.

### Changed
- Refactored `ProjectsSection` and `recentProjectsSection` with interactive responsive modals and zero-latency video loading.
- Refactored `ServiceBottomSheetModal` to use the centralized `ResponsiveModal` without hardcoded window measurements.
- Refactored `ServicesCategoriesSection` typography and spacing.
- Replaced Evana and CourseWebsite with Outreach and EduPlatform across all sections and CV/profile.
- Synchronized and verified all 869 key paths across `es.json`, `en.json`, and `pt.json` without orphan keys.
- Enhanced `useTranslation` hook with generic return types and strict typing in `LanguageProvider`.
