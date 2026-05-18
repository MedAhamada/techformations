# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (hot reload)
npm run build      # Type-check with tsc, then Vite production build → dist/
npm run preview    # Serve the production build locally
npx tsc --noEmit   # Type-check only, no emit
```

There is no test runner or linter configured. Type-checking (`tsc --noEmit`) is the primary correctness gate — always run it after changes.

## Architecture

**Stack:** React 19 · React Router 7 · TypeScript 6 (strict) · Tailwind CSS 3 · Vite 8 · `react-intersection-observer` · `lucide-react`

### Routing

All routes are declared in `src/App.tsx`. Each page gets a dedicated file in `src/pages/`. The `Layout` wrapper (Navbar + Footer) is applied at the `App` level — pages render inside `<main>`. `ScrollToTop` resets scroll position on every route change.

Current routes:
| Path | Page |
|------|------|
| `/` | `HomePage` |
| `/formations` | `CatalogPage` |
| `/formations/devops-pour-developpeurs` | `DevOpsFormationPage` |
| `/a-propos` | `AboutPage` |
| `/contact` | `ContactPage` |

### Data layer (`src/data/`)

All content is static TypeScript — no API, no CMS. Formations are the central entity:

- `formations.ts` — the single source of truth for all formations (available + coming soon). Contains the full `Formation[]` array plus helper functions: `getFormationBySlug`, `getFeaturedFormations`, `getAvailableFormations`, `getFormationsByCategory`. The `categories` array is derived from this file and used by `CatalogPage` for filtering.
- `testimonials.ts` — `Testimonial[]`, all linked to formation titles by string.
- `faq.ts` — `faqDevops` and `faqGeneral` arrays used on formation and catalog pages.

### Adding a new formation

1. Add an entry to the `formations` array in `src/data/formations.ts` (set `available: false, comingSoon: true` until ready).
2. When ready to publish, set `available: true`, remove `comingSoon`, and create a dedicated page in `src/pages/`.
3. Register the new route in `src/App.tsx`.
4. No changes needed to `CatalogPage` or `FormationCard` — they read from the data array automatically.

### Supabase integration

**Client:** `src/lib/supabase.ts` exports the single `supabase` client instance. Requires two env vars in `.env`:
```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

**Edge Functions** live in `supabase/functions/<name>/index.ts` (Deno runtime). Deploy with:
```bash
supabase functions deploy <name>
```
The `send-inscription-email` function sends registration emails via the Resend API. It requires a `RESEND_API_KEY` secret set in the Supabase dashboard (not in `.env`):
```bash
supabase secrets set RESEND_API_KEY=<key>
```
Emails go to `formations@kandorlab.com` with `reply_to` set to the registrant's address.

**`InscriptionForm`** (`src/components/ui/InscriptionForm.tsx`) — registration form used on formation landing pages. Props: `{ formation: string }` (formation title, passed through to the email). Fields: prenom, nom, email, telephone, entreprise, niveau (select), message. Calls `supabase.functions.invoke('send-inscription-email', ...)`. States: `idle | submitting | success | error`. On success shows a confirmation + WhatsApp link.

### Types (`src/types/index.ts`)

All shared interfaces live here: `Formation`, `FormationModule`, `FormationLesson`, `Instructor`, `FormationStats`, `PricingPlan`, `Testimonial`, `FAQ`. `FormationCategory` and `FormationLevel` are union types — extend them when adding new categories.

`FormationLesson.type` is `'live' | 'video' | 'practice' | 'quiz' | 'project'`. Use `'live'` for live instructor-led sessions (the default for the DevOps formation). `TimelineModule` renders `'live'` with a camera icon in green.

### Components

`src/components/layout/` — `Navbar` (sticky, mobile-responsive, active route highlighting) and `Footer`.

`src/components/ui/` — stateless or lightly stateful display components:

| Component | Key props / notes |
|-----------|-------------------|
| `FormationCard` | `variant`: `'default'` \| `'featured'` \| `'compact'`. Renders a `ComingSoonCard` automatically when `available` is false. |
| `AnimatedTerminal` | `lines?: TerminalLine[]` (`{ type, text, delay }`), `autoPlay?`. Loops with a 3 s pause between cycles. The `'use client'` directive is present but unused (not a Next.js project). |
| `MetricsCard` | Single metric card: `label`, `value`, `change?`, `trend?`, `color?`. Uses `lucide-react` icons. |
| `TimelineModule` | Accordion-style module list. Manages its own `openModules: Set<string>` state. |
| `FAQAccordion` | Single-open accordion; `openIndex` state. |
| `PricingCard` | Pass `price: null` to render "Sur devis" mode. Not used on `DevOpsFormationPage` (pricing section hidden). |
| `InscriptionForm` | Registration form; `formation` prop is the formation title string. Invokes the `send-inscription-email` Supabase Edge Function. |
| `CTASection` | Full-width CTA band with optional secondary CTA; fades in on scroll via `useInView`. |
| `PipelineAnimation` | Purely decorative; hard-coded CI/CD step data. |

### Scroll animations

All pages use the `SectionWrapper` pattern — a local component wrapping `useInView` from `react-intersection-observer` (`threshold: 0.1, triggerOnce: true`) that applies `opacity-0 translate-y-8` → `opacity-100 translate-y-0` on enter. This pattern is duplicated per page rather than shared, which is intentional to keep page files self-contained.

### Styling

Tailwind with a custom theme in `tailwind.config.js`:
- **Color palette:** `brand.blue` `#3B82F6`, `brand.cyan` `#06B6D4`, `brand.violet` `#8B5CF6`; `dark.900` `#0A0F1E` (page background).
- **Utility classes** defined in `src/index.css` via `@layer components`: `.glass`, `.glass-strong`, `.gradient-text`, `.gradient-text-blue`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.section-badge`, `.card`, `.section-title`, `.section-subtitle`, `.grid-bg`.
- Use these classes in preference to duplicating the Tailwind utilities inline.

### TypeScript notes

- `noUnusedLocals` and `noUnusedParameters` are enabled — remove unused variables before committing.
- `ignoreDeprecations: "6.0"` is set because `baseUrl` is deprecated in TS 6 but still needed for the `@/*` path alias.
- Path alias `@/*` maps to `src/*`.
- `src/vite-env.d.ts` contains `/// <reference types="vite/client" />` — required to suppress TS2882 on CSS side-effect imports.
