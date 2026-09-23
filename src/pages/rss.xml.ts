import type { APIRoute } from "astro";
import { guides } from "../data/guides";
import { allLabContent } from "../data/content";
import { SITE } from "../data/site";

const escape = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );

export const GET: APIRoute = () => {
  const guideItems = guides.map((guide) => {
      const url = `${SITE.url}/guides/${guide.slug}/`;
      const body = [
        guide.description,
        `Updated ${guide.updated}.`,
        guide.imageAlt,
        ...guide.sections.flatMap((section) => [
          section.title,
          ...section.paragraphs,
          ...(section.steps ?? []).map((step, i) => `${i + 1}. ${step}`),
        ]),
        ...(guide.example
          ? [
              guide.example.headers.join(" | "),
              ...guide.example.rows.map((row) => row.join(" | ")),
            ]
          : []),
        "This is an editorial explanation of a documented workflow, not a claim of first-hand selling experience. Examples are illustrative or reproducible; browser output and marketplace presentation can vary.",
        ...(guide.source
          ? [`Reference: ${guide.source.title} — ${guide.source.url}`]
          : []),
      ].join("\n\n");
      return `<item><title>${escape(guide.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(`${guide.published}T00:00:00Z`).toUTCString()}</pubDate><description>${escape(body)}</description></item>`;
    });
  const labItems = allLabContent.map((item) => {
    const base = item.type === "reference" ? "marketplace" : "experiments";
    const url = `${SITE.url}/${base}/${item.slug}/`;
    const body = [
      item.description,
      `Last checked ${item.lastVerified}.`,
      ...item.sections.flatMap((section) => [
        section.title,
        ...section.paragraphs,
        ...(section.steps ?? []).map((step, i) => `${i + 1}. ${step}`),
      ]),
      ...(item.evidence
        ? [
            `Question: ${item.evidence.question}`,
            `Method: ${item.evidence.method}`,
            `Result: ${item.evidence.result}`,
            `Limitation: ${item.evidence.limitation}`,
          ]
        : []),
      ...item.sources.map((source) => `Reference: ${source.title} — ${source.url}`),
    ].join("\n\n");
    return `<item><title>${escape(item.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(`${item.published}T00:00:00Z`).toUTCString()}</pubDate><description>${escape(body)}</description></item>`;
  });
  const items = [...guideItems, ...labItems].join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${SITE.name} — Research and Guides</title><link>${SITE.url}/</link><description>Source-led Etsy seller workflows, marketplace references and reproducible browser experiments.</description><language>en</language><atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    },
  );
};
