import { defineCollection, z } from 'astro:content';

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
  }),
});

export const collections = { blog };
