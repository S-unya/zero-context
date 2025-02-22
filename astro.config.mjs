import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import remarkToc from "remark-toc";
import { remarkReadingTime } from "./src/transforms/remarkReadingTime.ts";
import copy from 'rollup-plugin-copy';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://zero-context.com",
	integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [[remarkToc, { heading: "contents" }], remarkReadingTime],
    shikiConfig: {
      wrap: true,
      langs: ["javascript", "typescript", "css", "html", "json", "scss"],
    },
  },
  experimental: {
    responsiveImages: true,
  },
  vite: {
    plugins: [
      copy({
        // Copy only on first build. We dont want to trigger additional server reloads.
        copyOnce: true,
        hook: 'buildStart',
        targets: [
          { src: 'node_modules/@shoelace-style/shoelace/dist/assets/*', dest: 'public/shoelace-assets/assets/' }
        ]
      })
    ]
  }
});
