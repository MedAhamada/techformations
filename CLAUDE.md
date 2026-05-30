# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Astro dev server (hot reload)
npm run build      # Astro production build → dist/
npm run preview    # Serve the production build locally
npx tsc --noEmit   # Type-check only, no emit
```

There is no test runner or linter configured. Type-checking (`tsc --noEmit`) is the primary correctness gate — always run it after changes.

## Architecture

**Stack:** Astro 6 · React 19 · TypeScript 6 (strict) · Tailwind CSS 3 (via PostCSS) · `react-intersection-observer` · `lucide-react` · `@supabase/supabase-js`

### Routing

File-based routing via Astro. Pages are `.astro` files in `src/pages/`. React view components live in `src/views/` and are mounted as Astro islands with `client:load`. The `Layout` wrapper (`src/layouts/Layout.astro`) wraps all pages — it renders `Navbar` (as an island) and `Footer` (static SSR).

`Navbar` accepts a `pathname` prop from `Astro.url.pathname` for active link detection (no React Router).

Current routes:
| Path | Astro page | React view |
|------|-----------|------------|
| `/` | `src/pages/index.astro` | `src/views/HomePage` |
| `/formations` | `src/pages/formations/index.astro` | `src/views/CatalogPage` |
| `/formations/devops-pour-developpeurs` | `src/pages/formations/devops-pour-developpeurs.astro` | `src/views/DevOpsFormationPage` |
| `/a-propos` | `src/pages/a-propos.astro` | `src/views/AboutPage` |
| `/contact` | `src/pages/contact.astro` | `src/views/ContactPage` |
| `/404` | `src/pages/404.astro` | `src/views/NotFoundPage` |

### Adding a new formation

1. Add an entry to the `formations` array in `src/data/formations.ts` (set `available: false, comingSoon: true` until ready).
2. When ready to publish, set `available: true`, remove `comingSoon`, and create a React view in `src/views/` + an Astro page in `src/pages/formations/`.
3. No changes needed to `CatalogPage` or `FormationCard` — they read from the data array automatically.

### Data layer (`src/data/`)

All content is static TypeScript — no API, no CMS. Formations are the central entity:

- `formations.ts` — the single source of truth for all formations (available + coming soon). Contains the full `Formation[]` array plus helper functions: `getFormationBySlug`, `getFeaturedFormations`, `getAvailableFormations`, `getFormationsByCategory`. The `categories` array is derived from this file and used by `CatalogPage` for filtering.
- `testimonials.ts` — `Testimonial[]`, all linked to formation titles by string.
- `faq.ts` — `faqDevops` and `faqGeneral` arrays used on formation and catalog pages.

### Supabase integration

**Client:** `src/lib/supabase.ts` exports the single `supabase` client instance. Requires two env vars in `.env`:
```
PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

**Important:** In Astro, only `PUBLIC_*` prefixed variables are exposed to client-side code. Using `VITE_*` prefix will cause the variable to be `undefined` in the browser, crashing React hydration silently. Always use `PUBLIC_` for any env var accessed from React components.

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

`Formation.nextSession?: string` — optional human-readable date shown in the hero quick-info row and the inscription section.

### Components

`src/components/layout/` — `Navbar` (sticky, mobile-responsive, active route via `pathname` prop) and `Footer` (static, no `client:load`).

`src/components/ui/` — stateless or lightly stateful display components:

| Component | Key props / notes |
|-----------|-------------------|
| `FormationCard` | `variant`: `'default'` \| `'featured'` \| `'compact'`. Renders a `ComingSoonCard` automatically when `available` is false. Price and stats are hidden. |
| `AnimatedTerminal` | `lines?: TerminalLine[]` (`{ type, text, delay }`), `autoPlay?`. Loops continuously: shows all lines, pauses 3 s, clears, restarts after 1.2 s. Uses `cycleKey` state to re-trigger the effect each cycle. |
| `MetricsCard` | Single metric card: `label`, `value`, `change?`, `trend?`, `color?`. Uses `lucide-react` icons. |
| `TimelineModule` | Accordion-style module list. Manages its own `openModules: Set<string>` state. |
| `FAQAccordion` | Single-open accordion; `openIndex` state. |
| `PricingCard` | Pass `price: null` to render "Sur devis" mode. Not used on `DevOpsFormationPage` (pricing section hidden). |
| `InscriptionForm` | Registration form; `formation` prop is the formation title string. Invokes the `send-inscription-email` Supabase Edge Function. |
| `CTASection` | Full-width CTA band with optional secondary CTA; subtle slide-in on scroll via `useInView`. |
| `PipelineAnimation` | Purely decorative; hard-coded CI/CD step data. |

### Scroll animations

All pages use a local `SectionWrapper` component (not shared — kept per-page for self-containment). It uses `useInView` from `react-intersection-observer` (`threshold: 0.1, triggerOnce: true`).

**Important Astro SSR constraint:** Sections must start visible (`opacity-100`) to avoid content being permanently hidden if React hydration is slow or IntersectionObserver hasn't fired yet. The non-inView initial state is `opacity-100 translate-y-4` (visible but slightly shifted) rather than `opacity-0`. On enter, sections transition to `opacity-100 translate-y-0`.

`DevOpsFormationPage` uses its own `SectionWrapper` implemented directly with `useRef`/`useEffect`/`IntersectionObserver` (no external library dependency for that page).

### Styling

Tailwind with a custom theme in `tailwind.config.js`:
- **Color palette:** `brand.blue` `#3B82F6`, `brand.cyan` `#06B6D4`, `brand.violet` `#8B5CF6`; `dark.900` `#0A0F1E` (page background).
- **Utility classes** defined in `src/index.css` via `@layer components`: `.glass`, `.glass-strong`, `.gradient-text`, `.gradient-text-blue`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.section-badge`, `.card`, `.section-title`, `.section-subtitle`, `.grid-bg`.
- Use these classes in preference to duplicating the Tailwind utilities inline.
- Tailwind is configured via PostCSS (`postcss.config.cjs`) — there is no `@astrojs/tailwind` integration (incompatible with Astro 6).

### TypeScript notes

- `noUnusedLocals` and `noUnusedParameters` are enabled — remove unused variables before committing.
- `ignoreDeprecations: "6.0"` is set because `baseUrl` is deprecated in TS 6 but still needed for the `@/*` path alias.
- Path alias `@/*` maps to `src/*`.
- Astro types are included via `.astro/types.d.ts` in `tsconfig.json`.
