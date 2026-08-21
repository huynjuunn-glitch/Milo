export const SITE = {
  name: 'Dama Korea',
  shortName: 'Dama',
  url: 'https://damaheritage.com',
  description: 'Independent English-language field guides to Korean heritage sites, history and practical visits.',
  publisherId: 'ca-pub-5504483871402657',
  correctionsUrl: 'https://github.com/huynjuunn-glitch/Milo/issues/new',
};

export const NAVIGATION = [
  { href: '/start-here/', label: 'Start Here' },
  { href: '/seoul-palaces/', label: 'Seoul Palaces' },
  { href: '/gyeongju/', label: 'Gyeongju' },
  { href: '/korean-temples/', label: 'Korean Temples' },
  { href: '/visit/', label: 'Plan Your Visit' },
  { href: '/about/', label: 'About' },
] as const;

export type GuideSection = 'seoul-palaces' | 'gyeongju' | 'korean-temples' | 'visit';

export const HUBS: Record<GuideSection, {
  href: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string[];
  focus: { title: string; text: string }[];
}> = {
  'seoul-palaces': {
    href: '/seoul-palaces/',
    label: 'Seoul Palaces',
    eyebrow: 'Royal Seoul',
    title: 'Read the palaces as places, not backdrops.',
    description: 'Field guides to Seoul’s royal palaces, Jongmyo Shrine and the architecture that makes each visit legible.',
    intro: [
      'Seoul’s royal sites share gates, courtyards and tiled roofs, but they were built for different political, ritual and domestic purposes. A useful visit begins by choosing the right site and understanding the sequence of spaces.',
      'This collection combines visit logistics with visual clues: what to notice at a gate, how rank shaped movement and why a quiet side courtyard may explain more than the main photo point.',
    ],
    focus: [
      { title: 'Choose the right palace', text: 'Compare scale, restoration, landscape and the time available before committing to a route.' },
      { title: 'Follow the spatial order', text: 'Move from public ceremony toward council, residence and garden spaces with a reason for each transition.' },
      { title: 'Verify the day', text: 'Use the responsible heritage authority for closures, tours, ceremonies and temporary access restrictions.' },
    ],
  },
  gyeongju: {
    href: '/gyeongju/',
    label: 'Gyeongju',
    eyebrow: 'Silla landscape',
    title: 'Plan Gyeongju as a connected heritage landscape.',
    description: 'Practical routes through Gyeongju’s Silla-era tombs, temples, museums and historic districts.',
    intro: [
      'Gyeongju is not one attraction. Royal tombs, palace remains, Buddhist sites and museum collections are spread across a modern city and the surrounding mountains.',
      'The field-guide approach groups sites by geography and historical relationship, then makes transport time and walking effort visible before the day becomes an exhausting checklist.',
    ],
    focus: [
      { title: 'Build geographic clusters', text: 'Combine sites that form one understandable landscape instead of chasing a list across the city.' },
      { title: 'Protect transfer time', text: 'Account for bus frequency, rural stops and the return journey before adding another monument.' },
      { title: 'Use museums for context', text: 'See excavated objects and site models before or after walking through remains that can be visually subtle.' },
    ],
  },
  'korean-temples': {
    href: '/korean-temples/',
    label: 'Korean Temples',
    eyebrow: 'Living heritage',
    title: 'Enter a temple with context and care.',
    description: 'Respectful field guides to Korean Buddhist temple layouts, etiquette, symbols and mountain visits.',
    intro: [
      'A Korean Buddhist temple is both heritage and an active religious place. The route from mountain gate to worship hall carries meaning, while ceremonies and daily practice continue around visitors.',
      'These guides explain what can be observed without turning worship into spectacle, and separate broad etiquette from the instructions posted at a specific temple.',
    ],
    focus: [
      { title: 'Recognize the sequence', text: 'Read gates, guardians, courtyards and halls as a gradual transition rather than isolated buildings.' },
      { title: 'Yield to active practice', text: 'Site notices and worshippers take priority over photography, tours and generalized travel advice.' },
      { title: 'Prepare for the setting', text: 'Mountain weather, slopes, transport gaps and closing times matter as much as indoor etiquette.' },
    ],
  },
  visit: {
    href: '/visit/',
    label: 'Plan Your Visit',
    eyebrow: 'Practical fieldwork',
    title: 'Make the heritage day work on the ground.',
    description: 'Decision tools for maps, transport, timing, accessibility and respectful visits to Korean heritage sites.',
    intro: [
      'Good heritage travel depends on ordinary details: the correct entrance, the last useful bus, a Korean place name and enough time to understand what is in front of you.',
      'This collection turns official information into repeatable checks while keeping schedules, prices and access rules tied to the organizations responsible for them.',
    ],
    focus: [
      { title: 'Confirm the authority', text: 'Check current hours, closures and reservations on the responsible site rather than an old screenshot.' },
      { title: 'Save Korean place data', text: 'Keep the official Korean name, road address and final walking route available offline.' },
      { title: 'Plan a fallback', text: 'Decide what changes if weather, mobility, transport or a temporary closure alters the route.' },
    ],
  },
};
