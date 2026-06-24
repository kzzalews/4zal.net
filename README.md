# 4zal.net — Personal Site

Personal landing page of **Karol Zalewski** — Software Engineer at Dynatrace.

Built with [Astro](https://astro.build/) + [Tailwind CSS 4](https://tailwindcss.com/).
Deployed to [Mikrus Cytrus](https://mikr.us) shared nginx hosting.

## Features

- ⚡ Zero-JS by default (Astro islands)
- 🌗 Light/dark mode with `prefers-color-scheme` + toggle
- 🌐 Bilingual (EN default, PL toggle)
- 🔒 HSTS, gzip, secure headers via `.htaccess`
- 📡 Sitemap + RSS feed auto-generated
- 🎯 Open Graph + Twitter Card + JSON-LD `Person`
- 🚀 View Transitions API

## Architecture

- **Source**: Markdown content in `src/content/`
- **Build**: `npm run build` → static `dist/`
- **Deploy**: `npm run deploy` → uploads to `/cytrus/4zal.net/` via SSH
- **Special files** (preserved, never overwritten):
  - `.well-known/` (webfinger, host-meta, nodeinfo, openpgpkey, posh)
  - `@karol.zalewski`, `@marta.tyminska` (Mastodon identity)
  - `*.asc` (PGP public key)
  - `.htaccess` (managed separately, versioned in repo)

## Local development

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # → dist/
```

## Deploy

Manual:
```bash
npm run deploy  # builds + uploads to Cytrus via SSH
```

CI (GitHub Actions): see `.github/workflows/deploy.yml`.

## Content

Edit:
- `src/content/about/en.md` — English bio
- `src/content/about/pl.md` — Polish bio
- `src/content/site/config.ts` — site metadata, socials, languages

## License

MIT — see [LICENSE](LICENSE).
