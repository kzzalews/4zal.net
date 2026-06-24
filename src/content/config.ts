import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    lang: z.enum(['en', 'pl']),
    title: z.string(),
  }),
});

export const collections = { about };
