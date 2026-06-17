import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://santana.ie',
  output: 'static',
  adapter: cloudflare()
});