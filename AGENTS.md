# AGENTS.md — 4zal.net

Instrukcje dla agentów kodujących pracujących na tym repozytorium.

## Project overview

Personal website of Karol Zalewski (4zal.net). Static site built with **Astro 5** and **Tailwind CSS 4**. Bilingual: English (default) and Polish (`/pl/`). No backend, no CMS, no database — pure static output.

Source of truth is this repository; production is a plain static directory on an external server.

## Build & commands

- Install deps: `npm install`
- Dev server: `npm run dev` (Astro dev, hot reload)
- Production build: `npm run build` → output in `dist/`
- Preview build locally: `npm run preview`

## Project structure

```
astro.config.mjs      # Astro config (site URL, integrations)
tailwind.config.mjs   # Tailwind 4 config
package.json
tsconfig.json
src/
  content/            # Astro content collections (blog/posts if any)
  layouts/            # Base layouts
  components/         # Reusable Astro components
  pages/              # Routes — index.astro (EN), pl/ (Polish versions)
  styles/             # Global CSS
  consts.ts           # Site-wide constants (title, social links, identity)
public/
  favicon.svg
  og-image.png
  robots.txt
  .well-known/        # webfinger, host-meta, nodeinfo — federated identity
```

## Deploy

- Deploy is **manual**, from the build output: `dist/` is uploaded to `/cytrus/4zal.net/` on the server (Mikrus) with passwordless sudo.
- **CRITICAL:** the following production files/paths live outside the build and must NEVER be deleted or overwritten during deploy:
  - `.well-known/` (webfinger, host-meta, nodeinfo — Mastodon/federated identity chain `@karol.zalewski@4zal.net` → `@kzzalews`)
  - `@karol.zalewski` and other `@*` handles (PHP endpoints)
  - `*.asc` (PGP public key)
- PHP 8.2 is active on the vhost and required for the identity endpoints — do not remove `.htaccess` or suggest migrating these to static files.
- Server runs nginx with HSTS (`max-age=31536000`) and gzip enabled.

## Conventions

- Content changes: edit `src/consts.ts` and the relevant page/component — no hardcoded strings duplicated across pages.
- Both language versions (EN + PL) must be updated together; routes mirror each other.
- SEO/identity features are intentional, do not remove: JSON-LD `Person` schema, auto-generated `sitemap.xml`, RSS feed, `robots.txt`, custom 404 page, OG image.
- Keep the site lightweight — the whole production build is ~144 KB. No new JS frameworks, no client-side hydration unless strictly necessary (current JS ≈ 2 KB).
- Tailwind 4 utility-first styling; avoid writing raw CSS unless a utility can't express it.

## Definition of done

1. `npm run build` completes without errors or Astro warnings.
2. Both EN and PL pages render correctly in `npm run preview`.
3. Deploy step preserves all files listed under "Deploy / CRITICAL" above.
