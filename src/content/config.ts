import { defineCollection, z } from 'astro:content';

// Articles : src/content/blog/<slug>.md (FR), src/content/blog/en/<slug>.md (EN), src/content/blog/de/<slug>.md (DE).
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Date de publication ET de dernière vérification des informations.
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    // Court résumé affiché sur la page listing (/blog/).
    excerpt: z.string(),
    lang: z.enum(['fr', 'en', 'de']).optional(),
    // Identifiant commun aux versions FR/EN/DE d'un même article.
    translationKey: z.string().optional(),
  }),
});

export const collections = { blog };
