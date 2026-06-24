/**
 * Site-wide constants and configuration.
 * Edit this file to update social links, metadata, and languages.
 */

export const SITE = {
  // Kanoniczny URL (non-www, bo Cytrus nie ma vhosta dla www)
  url: 'https://4zal.net',
  // Dla Open Graph absolute URLs
  ogImage: '/og-image.png',
  // Domena zarejestrowana
  registered: '2007-01-18',
  // Default language
  defaultLang: 'en' as const,
  // Author (JSON-LD Person)
  author: {
    name: 'Karol Zalewski',
    alternateName: 'kzzalews',
    jobTitle: 'Software Engineer',
    employer: 'Dynatrace',
    email: 'mailto:karol.zalewski@4zal.net',
    url: 'https://4zal.net',
    sameAs: [
      'https://mastodon.social/@kzzalews',
      'https://github.com/kzzalews',
      'https://www.linkedin.com/in/kzzalews',
    ],
    // PGP fingerprint (bez spacji, małe litery)
    pgpFingerprint: '37AFD6577717FB314B9A6CD7AD7C7F9D2A49055D',
    pgpKeyUrl: '/37AFD6577717FB314B9A6CD7AD7C7F9D2A49055D.asc',
  },
} as const;

// Dostępne języki
export const LANGUAGES = {
  en: 'English',
  pl: 'Polski',
} as const;

export type Lang = keyof typeof LANGUAGES;

// Tłumaczenia UI
export const UI = {
  en: {
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.greeting': 'Hi, I’m Karol.',
    'hero.role': 'Software Engineer at Dynatrace — fascinated by cloud, distributed systems, and high-performance infrastructure.',
    'hero.cta.about': 'About me',
    'hero.cta.contact': 'Get in touch',
    'about.title': 'About',
    'about.lead': 'I build things that run unattended.',
    'contact.title': 'Contact',
    'contact.lead': 'Find me around the fediverse, on GitHub, or drop me an email. I read everything; I reply to most.',
    'contact.cta.email': 'Send email',
    'contact.cta.mastodon': 'Mastodon',
    'contact.cta.github': 'GitHub',
    'contact.cta.pgp': 'PGP key',
    'footer.tagline': 'Built with Astro, deployed to Mikrus Cytrus, served with care.',
    'footer.copyright': 'All rights reserved.',
    'theme.toggle': 'Toggle theme',
    'lang.switch': 'Polski',
  },
  pl: {
    'nav.about': 'O mnie',
    'nav.contact': 'Kontakt',
    'hero.greeting': 'Cześć, jestem Karol.',
    'hero.role': 'Inżynier oprogramowania w Dynatrace — fascynują mnie chmura, systemy rozproszone i infrastruktura wysokiej wydajności.',
    'hero.cta.about': 'O mnie',
    'hero.cta.contact': 'Napisz',
    'about.title': 'O mnie',
    'about.lead': 'Buduję rzeczy, które działają bez nadzoru.',
    'contact.title': 'Kontakt',
    'contact.lead': 'Znajdziesz mnie na fediwersum, GitHubie albo napisz maila. Czytam wszystko; odpowiadam na większość.',
    'contact.cta.email': 'Napisz maila',
    'contact.cta.mastodon': 'Mastodon',
    'contact.cta.github': 'GitHub',
    'contact.cta.pgp': 'Klucz PGP',
    'footer.tagline': 'Zbudowane z Astro, wdrożone na Mikrus Cytrus, serwowane z troską.',
    'footer.copyright': 'Wszystkie prawa zastrzeżone.',
    'theme.toggle': 'Przełącz motyw',
    'lang.switch': 'English',
  },
} as const;

// SEO / Meta defaults (per język)
export const META = {
  en: {
    title: 'Karol Zalewski — Software Engineer at Dynatrace',
    description:
      'Personal site of Karol Zalewski (kzzalews) — Software Engineer at Dynatrace. Cloud, distributed systems, self-hosted infrastructure.',
  },
  pl: {
    title: 'Karol Zalewski — Inżynier oprogramowania w Dynatrace',
    description:
      'Strona osobista Karola Zalewskiego (kzzalews) — inżynier oprogramowania w Dynatrace. Chmura, systemy rozproszone, infrastruktura self-hosted.',
  },
} as const;
