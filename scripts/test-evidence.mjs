import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { unzipSync } from "fflate";

const manifest = JSON.parse(
  await fs.readFile("public/evidence/manifest.json", "utf8"),
);
const files = [];
function collect(value) {
  if (!value || typeof value !== "object") return;
  if (value.url?.startsWith("/evidence/")) files.push(value);
  else for (const child of Object.values(value)) collect(child);
}
collect(manifest);
assert.equal(manifest.cases.length, 6);
assert.equal(
  manifest.cases.filter((c) => c.credit?.license === "CC0 1.0").length,
  2,
);
for (const file of files) {
  const bytes = await fs.readFile(`public${file.url}`);
  assert.equal(bytes.length, file.bytes, `${file.url}: byte count`);
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    file.sha256,
    `${file.url}: hash`,
  );
  if (!file.format) continue;
  const meta = await sharp(bytes).metadata();
  assert.equal(meta.width, file.width);
  assert.equal(meta.height, file.height);
  assert.equal(meta.format, file.format);
}
for (const item of manifest.cases) {
  const original = await sharp(`public${item.input.url}`).raw().toBuffer();
  const png = await sharp(`public${item.outputs.png.url}`).raw().toBuffer();
  assert.deepEqual(
    png,
    original,
    `${item.id}: PNG preserves the normalized pixels`,
  );
  for (const output of Object.values(item.outputs)) {
    assert.equal(output.width, 1200);
    assert.equal(output.height, 900);
  }
}
assert.equal(
  (await sharp(`public${manifest.transparency.source.url}`).metadata())
    .hasAlpha,
  true,
);
for (const color of ["white", "black"])
  assert.equal(
    (await sharp(`public${manifest.transparency[color].url}`).metadata())
      .hasAlpha,
    false,
  );
for (const frame of manifest.framing.outputs) {
  assert.equal(frame.file.width, 800);
  assert.equal(frame.file.height, 800);
}
const archive = unzipSync(await fs.readFile(`public${manifest.batch.url}`));
assert.deepEqual(
  Object.keys(archive),
  manifest.batch.entries.map((e) => e.name),
);
assert.deepEqual(Object.keys(archive), [
  "MUG-042-001.jpg",
  "MUG-042-002.jpg",
  "MUG-042-003.jpg",
]);
for (const entry of manifest.batch.entries)
  assert.deepEqual(
    Buffer.from(archive[entry.name]),
    await fs.readFile(`public${entry.output}`),
  );
const imageCount = new Set(
  files.filter((file) => file.format).map((file) => file.url),
).size;
console.log(
  `Evidence QA passed: ${imageCount} images and one ZIP verified by decoding, bytes and SHA-256; normalized PNG pixels, archive names and alpha behavior checked.`,
);
