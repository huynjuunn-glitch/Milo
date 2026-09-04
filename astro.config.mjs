import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://damaheritage.com',
  integrations: [sitemap({
    filter: (page) => ![
      'https://damaheritage.com/404/',
      'https://damaheritage.com/contact/',
      'https://damaheritage.com/privacy/',
      'https://damaheritage.com/terms/',
    ].includes(page),
  })],
  output: 'static',
  build: { format: 'directory' },
});
