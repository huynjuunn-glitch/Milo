import sharp from "sharp";

// Deterministic reference fixture. The result is a reference-encoder measurement,
// not a claim about every browser or marketplace pipeline.
const fixture = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200">
  <rect width="1600" height="1200" fill="#f2e7d5"/>
  <rect x="180" y="160" width="1240" height="880" fill="#2765d7"/>
  <circle cx="800" cy="600" r="230" fill="#f4ba48"/>
  <text x="800" y="1080" text-anchor="middle" font-size="72" font-family="Arial">SELLER LAB FIXTURE</text>
</svg>`);

const jpg = await sharp(fixture).jpeg({ quality: 85 }).toBuffer();
const png = await sharp(fixture).png().toBuffer();
const webp = await sharp(fixture).webp({ quality: 85 }).toBuffer();

console.log(JSON.stringify({
  fixture: "1600 × 1200 deterministic SVG rasterized by sharp",
  jpgQuality: 85,
  webpQuality: 85,
  outputs: {
    jpg: { bytes: jpg.length, mime: "image/jpeg" },
    png: { bytes: png.length, mime: "image/png" },
    webp: { bytes: webp.length, mime: "image/webp" },
  },
}, null, 2));
