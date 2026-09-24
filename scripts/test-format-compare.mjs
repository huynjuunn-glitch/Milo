// DOM integration checks use a simulated decoder and canvas; real-browser output is environment-specific.
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { Window } from "happy-dom";

const window = new Window({
  url: "https://damaheritage.com/tools/format-compare/",
  settings: {
    disableJavaScriptEvaluation: true,
    disableCSSFileLoading: true,
    disableJavaScriptFileLoading: true,
  },
});
window.document.write(
  fs
    .readFileSync("dist/tools/format-compare/index.html", "utf8")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ""),
);
const document = window.document;
globalThis.window = window;
globalThis.document = document;
let unsupportedWebp = false;
let encoded = [];
const created = [];
const revoked = [];
globalThis.fetch = () => {
  throw new Error("Format comparison must not make a network request");
};

const originalCreate = URL.createObjectURL;
const originalRevoke = URL.revokeObjectURL;
URL.createObjectURL = (blob) => {
  const url = `blob:format-test-${created.length + 1}`;
  created.push({ blob, url });
  return url;
};
URL.revokeObjectURL = (url) => revoked.push(url);

window.HTMLCanvasElement.prototype.getContext = function () {
  return {
    fillStyle: "#ffffff",
    drawImage() {},
    fillRect() {},
  };
};
window.HTMLCanvasElement.prototype.toBlob = function (callback, requestedMime, quality) {
  const mime = requestedMime === "image/webp" && unsupportedWebp ? "image/png" : requestedMime;
  const size = mime === "image/png" ? 1200 : mime === "image/jpeg" ? Math.round(900 * (1.5 - quality)) : 650;
  encoded.push({ requestedMime, mime, quality, width: this.width, height: this.height });
  callback(new Blob([new Uint8Array(size)], { type: mime }));
};

const onePixelPng = new Uint8Array(45);
const view = new DataView(onePixelPng.buffer);
onePixelPng.set([137, 80, 78, 71, 13, 10, 26, 10]);
view.setUint32(8, 13);
onePixelPng.set(Buffer.from("IHDR"), 12);
view.setUint32(16, 100);
view.setUint32(20, 50);
onePixelPng.set(Buffer.from("IEND"), 37);

globalThis.createImageBitmap = async () => ({
  width: 100,
  height: 50,
  close() {},
});
window.createImageBitmap = globalThis.createImageBitmap;

const source = fs.readFileSync("src/scripts/format-compare.ts", "utf8");
const code = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
  },
}).outputText.replace(
  'from "./image-core"',
  `from ${JSON.stringify(new URL("../src/scripts/image-core.ts", import.meta.url).href)}`,
);
await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));

const input = document.querySelector("#compare-file");
const run = document.querySelector("#compare-run");
const status = document.querySelector("#compare-status");
const results = document.querySelector("#compare-results");
const setFile = (file) => {
  Object.defineProperty(input, "files", {
    configurable: true,
    value: file ? [file] : [],
  });
  input.dispatchEvent(new window.Event("change", { bubbles: true }));
};
const waitFor = async (predicate) => {
  for (let i = 0; i < 200; i++) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 2));
  }
  throw new Error("Format comparison did not finish");
};

assert.ok(run.disabled, "compare button starts disabled");
setFile(new File([onePixelPng], "sample.png", { type: "image/png" }));
assert.ok(!run.disabled, "selecting a file enables comparison");
run.click();
await waitFor(() => !run.disabled && status.textContent.includes("Comparison complete"));
assert.equal(document.querySelectorAll("#compare-rows tr").length, 3);
assert.equal(document.querySelectorAll("#compare-previews img").length, 3);
assert.equal(created.length, 3);
assert.equal(encoded.map((entry) => entry.requestedMime).join(","), "image/jpeg,image/png,image/webp");
assert.ok([...document.querySelectorAll("#compare-rows a[download]")].every((link) => link.download.startsWith("sample-")));
assert.ok(!results.hidden);

const quality = document.querySelector("#compare-quality");
quality.value = "90";
quality.dispatchEvent(new window.Event("input", { bubbles: true }));
assert.ok(results.hidden, "changing quality clears exports made with the old setting");
assert.equal(revoked.length, 3, "changing settings releases obsolete previews");
quality.value = "85";
quality.dispatchEvent(new window.Event("input", { bubbles: true }));

unsupportedWebp = true;
setFile(new File([onePixelPng], "second.png", { type: "image/png" }));
assert.ok(results.hidden, "new selection clears previous result previews");
assert.equal(revoked.length, 3, "previous local preview URLs are released");
encoded = [];
run.click();
await waitFor(() => !run.disabled && status.textContent.includes("Comparison complete"));
const webpRow = [...document.querySelectorAll("#compare-rows tr")].at(-1);
assert.match(webpRow.textContent, /PNG.*requested WebP/);
assert.match(webpRow.querySelector("a").download, /\.png$/);
assert.ok(!status.classList.contains("error"));

const overLimitPng = onePixelPng.slice();
const overLimitView = new DataView(overLimitPng.buffer);
overLimitView.setUint32(16, 3000);
overLimitView.setUint32(20, 2001);
setFile(new File([overLimitPng], "large.png", { type: "image/png" }));
run.click();
await waitFor(() => !run.disabled && status.classList.contains("error"));
assert.match(status.textContent, /6 megapixels/);
assert.ok(results.hidden, "over-limit image produces no misleading partial comparison");

setFile(undefined);
assert.ok(run.disabled, "clearing selection disables comparison");
assert.ok(results.hidden, "clearing selection removes stale results");
assert.equal(revoked.length, 6, "all generated preview URLs are released when selection changes");

await window.happyDOM.close();
URL.createObjectURL = originalCreate;
URL.revokeObjectURL = originalRevoke;
console.log("Format comparison DOM QA passed: local workflow, three encodes, MIME fallback, downloads and object URL cleanup.");
