import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    published: z.boolean().default(true),
    tags: z.array(z.string()),
    cover_image: z.string().optional(),
    cover_image_alt: z.string().optional(),
    series: z.string().optional(),
    layout: z.string().optional(), // We'll ignore this in Astro but keep for compatibility
  }),
});

export const collections = { blog };