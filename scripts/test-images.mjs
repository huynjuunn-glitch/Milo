import assert from "node:assert/strict";
import {
  DEFAULTS,
  LIMITS,
  geometry,
  inspectImage,
  outputName,
  safePrefix,
  validateSettings,
} from "../src/scripts/image-core.ts";
import { Zip, ZipPassThrough, unzipSync } from "fflate";
let count = 0;
const test = (name, fn) => {
  try {
    fn();
    count++;
  } catch (error) {
    console.error("FAIL:", name);
    throw error;
  }
};
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);
test("default settings valid", () =>
  assert.deepEqual(validateSettings(DEFAULTS), DEFAULTS));
for (const [key, value] of [
  ["width", 0],
  ["height", -1],
  ["width", 2000.5],
  ["width", NaN],
  ["height", Infinity],
  ["width", 4097],
  ["height", 63],
  ["start", 0],
  ["start", 1.5],
  ["quality", 101],
  ["padding", 21],
  ["quality", NaN],
  ["fit", "stretch"],
  ["format", "gif"],
  ["anchor", "evil"],
  ["background", "#xyzxyz"],
  ["upscale", "true"],
])
  test(`reject ${key}=${value}`, () =>
    assert.throws(() => validateSettings({ ...DEFAULTS, [key]: value })));
test("output pixel cap", () =>
  assert.throws(() =>
    validateSettings({ ...DEFAULTS, width: 4096, height: 4096 }),
  ));
test("input settings not mutated", () => {
  const s = { ...DEFAULTS, prefix: "../x" };
  assert.equal(validateSettings(s).prefix, "x");
  assert.equal(s.prefix, "../x");
});
test("contain landscape", () => {
  const g = geometry(4000, 3000, { ...DEFAULTS, padding: 0 });
  assert.deepEqual(g, { dx: 0, dy: 250, dw: 2000, dh: 1500, scale: 0.5 });
});
test("contain portrait", () => {
  const g = geometry(3000, 4000, { ...DEFAULTS, padding: 0 });
  assert.deepEqual(g, { dx: 250, dy: 0, dw: 1500, dh: 2000, scale: 0.5 });
});
test("cover centered", () => {
  const g = geometry(4000, 3000, { ...DEFAULTS, padding: 0, fit: "cover" });
  near(g.dw, 8000 / 3);
  near(g.dx, -1000 / 3);
  near(g.dy, 0);
});
test("guide example 5 percent margin", () =>
  assert.deepEqual(geometry(3000, 2000, DEFAULTS), {
    dx: 100,
    dy: 400,
    dw: 1800,
    dh: 1200,
    scale: 0.6,
  }));
test("guide portrait margin", () =>
  assert.deepEqual(geometry(1600, 2400, DEFAULTS), {
    dx: 400,
    dy: 100,
    dw: 1200,
    dh: 1800,
    scale: 0.75,
  }));
test("no enlarge even fill", () =>
  assert.deepEqual(geometry(800, 600, { ...DEFAULTS, fit: "cover" }), {
    dx: 600,
    dy: 700,
    dw: 800,
    dh: 600,
    scale: 1,
  }));
test("left fill anchor", () =>
  near(
    geometry(3000, 2000, { ...DEFAULTS, fit: "cover", anchor: "left" }).dx,
    0,
  ));
test("right fill anchor", () =>
  near(
    geometry(3000, 2000, { ...DEFAULTS, fit: "cover", anchor: "right" }).dx,
    -1000,
  ));
test("top fill anchor", () =>
  near(
    geometry(2000, 3000, { ...DEFAULTS, fit: "cover", anchor: "top" }).dy,
    0,
  ));
test("bottom fill anchor", () =>
  near(
    geometry(2000, 3000, { ...DEFAULTS, fit: "cover", anchor: "bottom" }).dy,
    -1000,
  ));
test("invalid source", () => assert.throws(() => geometry(0, 20, DEFAULTS)));
for (const sw of [64, 800, 1600, 3000, 4096])
  for (const sh of [64, 600, 2000, 4096])
    for (const fit of ["contain", "cover"])
      test(`geometry invariants ${sw}x${sh} ${fit}`, () => {
        const s = { ...DEFAULTS, fit, upscale: true };
        const g = geometry(sw, sh, s);
        near(g.dw / g.dh, sw / sh);
        if (fit === "contain") {
          assert.ok(g.dw <= 1800 + 1e-8 && g.dh <= 1800 + 1e-8);
          assert.ok(g.dx >= 100 - 1e-8 && g.dy >= 100 - 1e-8);
        } else assert.ok(g.dw >= 2000 - 1e-8 && g.dh >= 2000 - 1e-8);
      });
test("safe filenames", () => {
  assert.equal(safePrefix("../CON"), "product-CON");
  assert.equal(safePrefix(""), "product");
  assert.equal(safePrefix("MUG / 42"), "MUG-42");
  assert.equal(safePrefix("ＰＲＮ"), "product-PRN");
  assert.ok(safePrefix("x".repeat(100)).length <= 60);
});
test("actual mime names", () => {
  assert.equal(outputName(DEFAULTS, 0, "image/png"), "product-001.png");
  assert.equal(
    outputName({ ...DEFAULTS, prefix: "MUG-042", start: 99 }, 1, "image/jpeg"),
    "MUG-042-100.jpg",
  );
  assert.throws(() => outputName(DEFAULTS, 0, "text/html"));
});
test("unique sequence", () =>
  assert.equal(
    new Set(
      Array.from({ length: 20 }, (_, i) =>
        outputName(DEFAULTS, i, "image/webp"),
      ),
    ).size,
    20,
  ));
function png(w, h, animated = false) {
  const b = new Uint8Array(animated ? 65 : 45),
    v = new DataView(b.buffer);
  b.set([137, 80, 78, 71, 13, 10, 26, 10]);
  v.setUint32(8, 13);
  b.set(Buffer.from("IHDR"), 12);
  v.setUint32(16, w);
  v.setUint32(20, h);
  let end = 33;
  if (animated) {
    v.setUint32(33, 8);
    b.set(Buffer.from("acTL"), 37);
    end = 53;
  }
  b.set(Buffer.from("IEND"), end + 4);
  return b;
}
function jpeg(w, h) {
  return Uint8Array.from([
    255,
    216,
    255,
    224,
    0,
    4,
    0,
    0,
    255,
    192,
    0,
    8,
    8,
    h >> 8,
    h & 255,
    w >> 8,
    w & 255,
    1,
    255,
    217,
  ]);
}
function webp(w, h, animated = false) {
  const b = new Uint8Array(30),
    v = new DataView(b.buffer);
  b.set(Buffer.from("RIFF"));
  v.setUint32(4, 22, true);
  b.set(Buffer.from("WEBPVP8X"), 8);
  v.setUint32(16, 10, true);
  b[20] = animated ? 2 : 0;
  const set24 = (p, n) => {
    b[p] = n & 255;
    b[p + 1] = (n >> 8) & 255;
    b[p + 2] = (n >> 16) & 255;
  };
  set24(24, w - 1);
  set24(27, h - 1);
  return b;
}
test("PNG header", () =>
  assert.deepEqual(inspectImage(png(640, 480)), {
    width: 640,
    height: 480,
    mime: "image/png",
  }));
test("JPEG header with APP segment", () =>
  assert.deepEqual(inspectImage(jpeg(640, 480)), {
    width: 640,
    height: 480,
    mime: "image/jpeg",
  }));
test("WebP extended header", () =>
  assert.deepEqual(inspectImage(webp(640, 480)), {
    width: 640,
    height: 480,
    mime: "image/webp",
  }));
test("animation PNG rejected", () =>
  assert.throws(() => inspectImage(png(100, 100, true)), /Animated/));
test("animation WebP rejected", () =>
  assert.throws(() => inspectImage(webp(100, 100, true)), /Animated/));
test("pixel bomb rejected", () =>
  assert.throws(() => inspectImage(png(100000, 100000)), /24 megapixels/));
test("zero pixels rejected", () =>
  assert.throws(() => inspectImage(png(0, 100))));
test("truncated PNG", () =>
  assert.throws(() => inspectImage(png(100, 100).slice(0, 30))));
test("truncated WebP", () =>
  assert.throws(() => inspectImage(webp(100, 100).slice(0, 28))));
test("SVG masquerading as JPEG", () =>
  assert.throws(
    () => inspectImage(Buffer.from('<svg width="1" height="1"></svg>')),
    /Unsupported/,
  ));
test("empty input", () => assert.throws(() => inspectImage(new Uint8Array())));
test("image header subarray", () => {
  const b = new Uint8Array(100);
  b.set(png(640, 480), 7);
  assert.equal(inspectImage(b.subarray(7, 52)).height, 480);
});
test("streamed ZIP preserves bytes and filenames", () => {
  const chunks = [];
  const zip = new Zip((e, b) => {
    if (e) throw e;
    chunks.push(b);
  });
  const inputs = {
    "MUG-042-001.jpg": jpeg(640, 480),
    "MUG-042-003.png": png(640, 480),
  };
  for (const [name, b] of Object.entries(inputs)) {
    const entry = new ZipPassThrough(name);
    zip.add(entry);
    entry.push(b, true);
  }
  zip.end();
  const archive = Buffer.concat(chunks);
  const output = unzipSync(archive);
  assert.deepEqual(Object.keys(output), Object.keys(inputs));
  for (const [name, b] of Object.entries(inputs))
    assert.deepEqual(output[name], b);
});
test("resource limits explicit", () => assert.equal(LIMITS.total, 100_000_000));
console.log(
  `Image core QA passed: ${count} assertions/groups (geometry, headers, validation, naming and ZIP).`,
);
