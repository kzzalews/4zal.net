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

- Deploy is **manual**, from the build output: `dist/` is uploaded to `/cytrus/4zal.net/` on the server (Mikrus) with `sudo -n -u cytrus rsync` (NOPASSWD sudoers for rsync/cp/mv/mkdir/rm/chmod/chown/touch/install/tar/find — no tee, no shell).
- Canonical rsync:
  `sudo -n -u cytrus rsync -av --delete --exclude=".well-known" --exclude="@*" --exclude="*.asc" --exclude="mta-sts*" dist/ /cytrus/4zal.net/`
- **CRITICAL:** the following production files/paths live outside the build and must NEVER be deleted or overwritten during deploy:
  - `.well-known/` (webfinger.php, host-meta.php, nodeinfo.php, openpgpkey/, posh/ — federated identity chain `@karol.zalewski@4zal.net` → `@kzzalews@mastodon.social`)
  - `@karol.zalewski.php`, `@marta.tyminska.php` (301 redirects to Mastodon profiles)
  - `*.asc` (PGP public key)
- **Cytrus is pure nginx — `.htaccess` is NOT parsed** (verified 2026-06-24: mod_rewrite/mod_headers/AddType all inert). Do not create or rely on `.htaccess`; headers/redirects would have to go through the Mikrus panel or Cloudflare.
- PHP IS executed by the vhost (webfinger.php etc. work), but extensionless URLs 404 — there are no rewrites.

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
