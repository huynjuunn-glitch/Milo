// Code-drawn, reproducible explanatory artwork, not product photos or screenshots.
import fs from "node:fs/promises";
import sharp from "sharp";
import { guides } from "../src/data/guides.ts";

const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const text = (x, y, label, size = 26, color = "#243c52") =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${color}">${esc(label)}</text>`;
const rect = (x, y, w, h, fill = "#e6efff") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="#8ba5c7" stroke-width="2"/>`;
const frame = (x, y, w, h) => rect(x, y, w, h, "#fff");
const drawings = {
  "fit-vs-fill":
    text(150, 285, "FIT: keep the whole photo") +
    frame(170, 315, 230, 230) +
    rect(170, 354, 230, 152, "#2465dc") +
    text(660, 285, "FILL: crop the sides") +
    rect(654, 315, 345, 230, "#f3c1ba") +
    rect(711, 315, 230, 230, "#2465dc"),
  "thumbnail-crop-checklist":
    frame(120, 315, 220, 220) +
    frame(450, 340, 260, 195) +
    frame(840, 275, 195, 260) +
    text(180, 580, "1:1") +
    text(535, 580, "4:3") +
    text(895, 580, "3:4") +
    text(100, 253, "Preview shapes — verify the actual Etsy listing too", 27),
  "consistent-product-grid":
    [120, 480, 840]
      .map(
        (x, i) =>
          frame(x, 320, 220, 220) +
          rect(x + 65, 350 + i * 20, 90, 155 - i * 40, "#2465dc"),
      )
      .join("") +
    text(120, 285, "Same canvas ratio") +
    text(120, 592, "Equal canvases do not guarantee equal product scale", 28),
  "file-size-and-quality":
    ["DIMENSIONS", "QUALITY", "FORMAT"]
      .map(
        (label, i) =>
          rect(70 + 375 * i, 285, 310, 215) +
          text(90 + 375 * i, 340, label, 27) +
          text(
            90 + 375 * i,
            420,
            ["2000 × 2000 px", "85% → 75%", "JPG / PNG / WebP"][i],
            26,
          ),
      )
      .join("") +
    text(80, 570, "Compare the actual export — no fixed KB guarantee", 29),
  "product-photo-workflow":
    ["IMG_1048.jpg", "IMG_1051.jpg", "detail-final.png"]
      .map(
        (name, i) =>
          text(100, 315 + i * 90, name, 31) +
          text(500, 315 + i * 90, "→", 35) +
          text(640, 315 + i * 90, `MUG-042-00${i + 1}.jpg`, 31),
      )
      .join("") +
    text(100, 590, "One product prefix · sequential names · ZIP export", 27),
  "browser-image-troubleshooting":
    rect(100, 290, 440, 220) +
    text(135, 350, "4000 × 3000 pixels", 33) +
    text(135, 410, "12 million pixels", 28) +
    text(580, 402, "→", 44) +
    rect(665, 290, 430, 220) +
    text(710, 360, "About 48 MB", 38) +
    text(710, 420, "RGBA buffer alone", 27) +
    text(100, 577, "Decoded memory is larger than the compressed file", 28),
  "image-workspace":
    ["RESIZE + PAD", "CHECK CROPS", "RENAME + ZIP"]
      .map(
        (label, i) =>
          rect(70 + i * 375, 300, 310, 220) +
          text(94 + i * 375, 365, `0${i + 1}`, 40, "#135ceb") +
          text(94 + i * 375, 435, label, 27),
      )
      .join("") + text(80, 580, "Image processing stays on your device", 29),
};
const wrap = (title) => {
  const lines = [""];
  for (const word of title.split(" ")) {
    if ((lines.at(-1) + " " + word).trim().length > 47) lines.push(word);
    else lines[lines.length - 1] = (lines.at(-1) + " " + word).trim();
  }
  return lines
    .map((line, i) => text(65, 142 + i * 52, line, 42, "#142d48"))
    .join("");
};
await fs.mkdir("public/images", { recursive: true });
for (const item of [
  { slug: "image-workspace", title: "Batch Resize Product Photos" },
  ...guides,
]) {
  if (!drawings[item.slug]) throw new Error(`Missing artwork: ${item.slug}`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f5f8fd"/><g font-family="Arial, sans-serif">${text(65, 65, "SELLER OPERATIONS LAB · WORKFLOW ILLUSTRATION", 21, "#135ceb")}${wrap(item.title)}${drawings[item.slug]}</g></svg>`;
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(`public/images/${item.slug}.png`);
}
console.log("Generated 7 distinct workflow preview images.");
