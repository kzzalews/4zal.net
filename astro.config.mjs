import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Site URL — kanoniczny adres (non-www, bo Cytrus nie ma vhosta dla www)
const SITE_URL = 'https://4zal.net';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
