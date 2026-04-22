// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import { remarkReadingTime } from "./src/transforms/remarkReadingTime.ts";

// https://astro.build/config
export default defineConfig({
	site: "https://zero-context.com",
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [[remarkToc, { heading: "contents" }], remarkReadingTime],
		shikiConfig: {
			wrap: true,
		},
	},
});
