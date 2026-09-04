export const SITE = {
  name: 'Dama Workshop',
  shortName: 'Dama',
  url: 'https://damaheritage.com',
  description: 'Fast, practical woodworking calculators for layout, lumber, cut lists, cabinetry and shop math.',
  publisherId: 'ca-pub-5504483871402657',
  correctionsUrl: 'https://github.com/huynjuunn-glitch/Milo/issues/new',
};

export const NAVIGATION = [
  { href: '/tools/', label: 'Calculators' },
  { href: '/guides/', label: 'Workshop Guides' },
  { href: '/about/', label: 'About' },
] as const;

export const CATEGORIES = {
  layout: {
    label: 'Layout & angles',
    description: 'Fractions, spacing, miters and curved layout.',
  },
  materials: {
    label: 'Material planning',
    description: 'Cut lists, board feet, sheet goods and saw kerf.',
  },
  cabinetry: {
    label: 'Cabinetry',
    description: 'Drawer boxes, doors, shelves and hardware layout.',
  },
} as const;

export type ToolCategory = keyof typeof CATEGORIES;
