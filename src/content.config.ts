import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const datedChange = z.object({
  date: z.coerce.date(),
  summary: z.string().min(10).max(180),
});

const source = z.object({
  label: z.string().min(2).max(100),
  url: z.string().url(),
  role: z.string().min(12).max(240),
  checkedAt: z.coerce.date(),
});

const imageMetadata = z.object({
  src: z.string().startsWith('/'),
  alt: z.string().min(8).max(180),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  credit: z.string().min(2).max(120),
  license: z.string().min(2).max(120),
  sourceUrl: z.string().url().optional(),
  caption: z.string().min(8).max(240).optional(),
});

const fieldModule = z.object({
  type: z.enum(['decision', 'route', 'timeline', 'look-for', 'etiquette', 'notice']),
  title: z.string().min(4).max(100),
  intro: z.string().min(10).max(300).optional(),
  items: z.array(z.object({
    heading: z.string().min(2).max(100),
    text: z.string().min(10).max(500),
  })).min(2).max(8),
});

export const guideSchema = z.object({
    title: z.string().min(12).max(90),
    description: z.string().min(60).max(180),
    summary: z.string().min(40).max(400),
    section: z.enum(['seoul-palaces', 'gyeongju', 'korean-temples', 'visit']),
    category: z.enum(['site-guide', 'comparison', 'itinerary', 'architecture', 'etiquette', 'planning']),
    region: z.string().min(2).max(60),
    heritageType: z.array(z.enum(['palace', 'shrine', 'temple', 'tomb', 'fortress', 'village', 'museum', 'route', 'planning'])).min(1).max(4),
    author: z.object({
      name: z.string().min(2).max(80),
      url: z.string().startsWith('/'),
    }),
    createdAt: z.coerce.date(),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    checkedAt: z.coerce.date().optional(),
    heroImage: imageMetadata.optional(),
    atAGlance: z.array(z.object({
      label: z.string().min(2).max(40),
      value: z.string().min(2).max(140),
    })).max(6).default([]),
    sources: z.array(source).max(12).default([]),
    changes: z.array(datedChange).max(12).default([]),
    modules: z.array(fieldModule).max(8).default([]),
    related: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).max(5).default([]),
    draft: z.boolean().default(true),
    index: z.boolean().default(false),
    featured: z.boolean().default(false),
    adStatus: z.enum(['none', 'review', 'article']).default('none'),
  }).superRefine((data, context) => {
    if (data.draft) {
      if (data.index) {
        context.addIssue({ code: 'custom', path: ['index'], message: 'Draft guides cannot be indexable.' });
      }
      if (data.adStatus !== 'none') {
        context.addIssue({ code: 'custom', path: ['adStatus'], message: 'Draft guides cannot request ads.' });
      }
      return;
    }

    const requiredForPublication = [
      ['publishedAt', data.publishedAt],
      ['updatedAt', data.updatedAt],
      ['checkedAt', data.checkedAt],
      ['heroImage', data.heroImage],
    ] as const;

    for (const [field, value] of requiredForPublication) {
      if (!value) context.addIssue({ code: 'custom', path: [field], message: `${field} is required for published guides.` });
    }
    if (data.atAGlance.length < 2) context.addIssue({ code: 'custom', path: ['atAGlance'], message: 'Published guides need at least two at-a-glance facts.' });
    if (data.sources.length < 2) context.addIssue({ code: 'custom', path: ['sources'], message: 'Published guides need at least two role-labelled sources.' });
    if (data.changes.length < 1) context.addIssue({ code: 'custom', path: ['changes'], message: 'Published guides need an initial change-log entry.' });
    if (!data.index) context.addIssue({ code: 'custom', path: ['index'], message: 'Published guides must explicitly opt into indexing.' });
  });

export type GuideData = z.infer<typeof guideSchema>;

const guides = defineCollection({
  loader: glob({
    base: './src/content/guides',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: guideSchema,
});

export const collections = { guides };
