import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { guides } from "./src/data/guides.ts";
import { allLabContent } from "./src/data/content.ts";

export default defineConfig({
  site: "https://damaheritage.com",
  trailingSlash: "always",
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        const guide = guides.find((g) => path === `/guides/${g.slug}/`);
        const lab = allLabContent.find((item) =>
          path === `/${item.type === "reference" ? "marketplace" : "experiments"}/${item.slug}/`,
        );
        // Dates describe reviewed changes, never the build or crawler visit time.
        const updated =
          guide?.updated ?? lab?.updated ??
          (["/", "/guides/", "/marketplace/", "/experiments/", "/tools/"].includes(path)
            ? "2026-09-24"
            : undefined);
        return updated ? { ...item, lastmod: updated } : item;
      },
      filter: (page) =>
        ![
          "https://damaheritage.com/404/",
          "https://damaheritage.com/contact/",
          "https://damaheritage.com/privacy/",
          "https://damaheritage.com/terms/",
          "https://damaheritage.com/standards/",
          "https://damaheritage.com/updates/",
          "https://damaheritage.com/changelog/",
          "https://damaheritage.com/start-here/",
          "https://damaheritage.com/tools/image-prep/",
          "https://damaheritage.com/tools/image-qa/",
          "https://damaheritage.com/tools/format-compare/",
        ].includes(page),
    }),
  ],
  output: "static",
  build: { format: "directory" },
});
