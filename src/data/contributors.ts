import type { GuideSection } from './site';

export interface EditorialDesk {
  id: string;
  name: string;
  section: GuideSection;
  role: string;
  description: string;
  method: string[];
  limits: string;
}

export const EDITORIAL_DESKS: EditorialDesk[] = [
  {
    id: 'palace-desk',
    name: 'Dama Korea Palace Desk',
    section: 'seoul-palaces',
    role: 'Palaces, royal ritual and architectural interpretation',
    description: 'Builds comparison, route and architecture guides for Seoul’s royal heritage sites.',
    method: [
      'Starts with the Royal Palaces and Tombs Center, Korea Heritage Service and museum records.',
      'Separates durable historical interpretation from opening hours, tours and temporary restrictions.',
      'Adds spatial reading sequences and comparison tools instead of reproducing official summaries.',
    ],
    limits: 'This is a Dama Korea editorial-desk byline, not a separate person, academic credential or claim of an on-site visit.',
  },
  {
    id: 'gyeongju-desk',
    name: 'Dama Korea Gyeongju Desk',
    section: 'gyeongju',
    role: 'Silla heritage landscapes and route planning',
    description: 'Connects Gyeongju’s monuments, museum context and transport constraints into usable visit plans.',
    method: [
      'Uses Gyeongju City, Korea Heritage Service, UNESCO and official museum material for place identity and significance.',
      'Groups sites by geography and historical relationship before proposing a route.',
      'Marks transport, terrain and time-sensitive details for rechecking with the responsible operator.',
    ],
    limits: 'This is a Dama Korea editorial-desk byline, not a separate person, licensed guide or claim of an on-site visit.',
  },
  {
    id: 'temple-desk',
    name: 'Dama Korea Temple Desk',
    section: 'korean-temples',
    role: 'Buddhist heritage, spatial reading and respectful conduct',
    description: 'Explains temple layouts and etiquette while treating each site as a living religious place.',
    method: [
      'Uses official temple, Templestay, heritage-service and UNESCO material for site-specific claims.',
      'Distinguishes general orientation from instructions posted by the temple being visited.',
      'Avoids treating worship, monastic life or restricted spaces as visitor entertainment.',
    ],
    limits: 'This is a Dama Korea editorial-desk byline, not a monk, religious authority or claim of an on-site visit.',
  },
  {
    id: 'visit-desk',
    name: 'Dama Korea Visit Desk',
    section: 'visit',
    role: 'Maps, verification workflows and practical visit preparation',
    description: 'Turns scattered official information into repeatable planning and verification tools.',
    method: [
      'Assigns each question to the source responsible for answering it.',
      'Keeps map orientation separate from heritage interpretation and current operating rules.',
      'Includes fallback checks for closures, weather, transport and access changes.',
    ],
    limits: 'This is a Dama Korea editorial-desk byline, not a separate person, travel agency or professional adviser.',
  },
];

export const editorialDeskUrl = (desk: Pick<EditorialDesk, 'id'>) => `/contributors/#${desk.id}`;

export const getEditorialDesk = (id: string) => EDITORIAL_DESKS.find((desk) => desk.id === id);

export const getEditorialDeskForSection = (section: GuideSection) => {
  const desk = EDITORIAL_DESKS.find((candidate) => candidate.section === section);
  if (!desk) throw new Error(`No editorial desk configured for ${section}`);
  return desk;
};
