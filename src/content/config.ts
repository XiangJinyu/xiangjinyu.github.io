import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    abstract: z.string(),
    tags: z.array(z.string()),
    author: z.string().default('Jinyu Xiang'),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const publicationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    badge: z.string(),
    image: z.string(),
    url: z.string(),
    order: z.number(),
  }),
});

const dataCollection = defineCollection({
  type: 'data',
  schema: z.object({
    news: z.array(z.object({
      date: z.string(),
      content: z.string(),
    })).optional(),
    educations: z.array(z.object({
      period: z.string(),
      institution: z.string(),
      degree: z.string(),
    })).optional(),
    jobs: z.array(z.object({
      period: z.string(),
      title: z.string(),
      company: z.string(),
      url: z.string().optional(),
    })).optional(),
    projects: z.array(z.object({
      date: z.string(),
      title: z.string(),
      url: z.string(),
      description: z.string(),
    })).optional(),
    talks: z.array(z.object({
      date: z.string(),
      title: z.string(),
      url: z.string(),
    })).optional(),
  }),
});

export const collections = {
  'posts': blogCollection,
  'publications': publicationsCollection,
  'data': dataCollection,
};
