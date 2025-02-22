import { defineCollection, z } from "astro:content";

const blitheringCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.string().transform((str) => new Date(str)),
      created: z.string().transform((str) => new Date(str)),
      description: z.string(),
      author: z.string(),
      tags: z.array(z.string()),
      layout: z.string().optional(),
      image: z.object({
        src: image(),
        alt: z.string(),
        aspectRatio: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      draft: z.boolean().optional(),
    }),
});

export const collections = {
  blithering: blitheringCollection,
};
