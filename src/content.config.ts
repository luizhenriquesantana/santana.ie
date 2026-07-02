import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    sourceUrl: z.url().optional(),
    publicUrl: z.url().optional(),
    featured: z.boolean().default(true),
    order: z.number()
  })
});

const resume = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resume' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    location: z.string(),
    email: z.email(),
    github: z.url(),
    linkedin: z.url(),
    skills: z.array(z.string()),
    highlights: z.array(z.string())
  })
});

export const collections = { projects, resume };
