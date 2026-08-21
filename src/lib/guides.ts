import { getCollection } from 'astro:content';
import { HUBS, type GuideSection } from '../data/site';

export interface GuideData {
  title: string;
  description: string;
  summary: string;
  section: GuideSection;
  category: 'site-guide' | 'comparison' | 'itinerary' | 'architecture' | 'etiquette' | 'planning';
  region: string;
  heritageType: Array<'palace' | 'shrine' | 'temple' | 'tomb' | 'fortress' | 'village' | 'museum' | 'route' | 'planning'>;
  author: { name: string; url: string };
  createdAt: Date;
  publishedAt?: Date;
  updatedAt?: Date;
  checkedAt?: Date;
  heroImage?: { src: string; alt: string; width: number; height: number; credit: string; license: string; sourceUrl?: string; caption?: string };
  atAGlance: Array<{ label: string; value: string }>;
  sources: Array<{ label: string; url: string; role: string; checkedAt: Date }>;
  changes: Array<{ date: Date; summary: string }>;
  modules: Array<{
    type: 'decision' | 'route' | 'timeline' | 'look-for' | 'etiquette' | 'notice';
    title: string;
    intro?: string;
    items: Array<{ heading: string; text: string }>;
  }>;
  related: string[];
  draft: boolean;
  index: boolean;
  featured: boolean;
  adStatus: 'none' | 'review' | 'article';
}

export interface GuideEntry {
  id: string;
  collection: 'guides';
  data: GuideData;
  body?: string;
}

export const isPublicGuide = (guide: GuideEntry) => !guide.data.draft && guide.data.index;

export async function getPublicGuides(section?: GuideSection) {
  const guides = await getCollection('guides', ({ data }) => !data.draft && data.index) as GuideEntry[];
  return guides
    .filter((guide) => !section || guide.data.section === section)
    .sort((a, b) => (b.data.updatedAt?.getTime() ?? 0) - (a.data.updatedAt?.getTime() ?? 0));
}

export const guideUrl = (guide: Pick<GuideEntry, 'id'>) => `/guides/${guide.id}/`;

export const sectionUrl = (section: GuideSection) => HUBS[section].href;

export const sectionLabel = (section: GuideSection) => HUBS[section].label;

export const formatEditorialDate = (date?: Date) => date
  ? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date)
  : '';

export const isoDate = (date?: Date) => date?.toISOString().slice(0, 10);
