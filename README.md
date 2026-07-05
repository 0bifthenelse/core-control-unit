# Core Control Unit

Marketing and lead-generation website for Core Control Unit, a software engineering and digital services company. The site presents the company's services (web development, billboard marketing, custom apps/bots, and blockchain/Solidity work), a project showcase, and a GDPR-compliant contact flow, in four languages.

Live domain: `ccunit.com`.

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4** for styling
- **next-intl 4** for internationalisation and locale-aware routing
- **Playwright** for end-to-end/visual checks

No database, CMS, or backend services — the site is fully static/server-rendered content sourced from local i18n message files.

## Internationalisation

Locales: `fr` (default), `en`, `es`, `it`, configured in `src/i18n/routing.ts`. Every route is nested under a `[locale]` segment (`src/app/[locale]`); `src/proxy.ts` handles locale negotiation/redirects. All page copy lives in `src/messages/{locale}.json`, loaded per-request via `next-intl/server`.

## Architecture

Feature-first organisation:

```
src/
  app/[locale]/          route segments (home, /projects, /mentions-legales)
  features/<feature>/    one folder per page section (hero, services, projects, about, contact, cookies, legal)
    components/
  components/ui/         shared design-system primitives (HudPanel, AccentLine, NavBarServer, Footer, StickyContact, LanguageSelector)
  i18n/                  next-intl routing/navigation/request config
  messages/              {fr,en,es,it}.json translation content
  styles/                global styles
```

Each feature exposes a server component (e.g. `HeroSection`, `ServicesSection`, `ProjectsSection`) that fetches its own translations via `getTranslations()` and is composed into pages in `src/app/[locale]`.

## Routes

- `/{locale}` — single-page homepage: Hero, Services, Projects (teaser), About, Contact.
- `/{locale}/projects` — full project showcase with extended descriptions, screenshots, and links.
- `/{locale}/mentions-legales` — French legal notice / GDPR rights page.

## Design system

Dark, HUD/technical aesthetic built on a three-color palette (`#0d0f12` background, `#e8eaf0` text, `#ff7d27` accent). Angular clip-path panels (`HudPanel`) and accent underlines (`AccentLine`) are the two recurring structural primitives; everything else is plain Tailwind utility classes.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                        |
| ------------------ | ----------------------------------- |
| `npm run dev`       | Start the development server        |
| `npm run build`     | Production build                    |
| `npm run start`     | Serve the production build          |
| `npm run lint`      | Run ESLint                          |

## Deployment

Vercel-ready out of the box — no additional configuration required beyond a standard Next.js deployment.
