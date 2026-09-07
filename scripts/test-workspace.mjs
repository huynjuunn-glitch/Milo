// DOM integration checks with a simulated canvas/decoder, not real-browser visual QA.
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { Window } from "happy-dom";
import { inspectImage } from "../src/scripts/image-core.ts";
const window = new Window({
  url: "https://damaheritage.com",
  settings: {
    disableJavaScriptEvaluation: true,
    disableCSSFileLoading: true,
    disableJavaScriptFileLoading: true,
  },
});
window.document.write(
  fs
    .readFileSync("dist/index.html", "utf8")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ""),
);
const document = window.document;
globalThis.window = window;
globalThis.document = document;
globalThis.localStorage = window.localStorage;
const $ = (id) => document.getElementById(id);
const revoked = [];
const created = [];
const downloads = [];
let decoded = 0,
  maxDecoded = 0,
  decodeDelay = 0;
globalThis.fetch = () => {
  throw new Error("Unexpected network request");
};
window.fetch = globalThis.fetch;
const originalCreate = URL.createObjectURL,
  originalRevoke = URL.revokeObjectURL;
URL.createObjectURL = (blob) => {
  const url = originalCreate(blob);
  created.push(url);
  return url;
};
URL.revokeObjectURL = (url) => {
  revoked.push(url);
  originalRevoke(url);
};
window.HTMLAnchorElement.prototype.click = function () {
  downloads.push({ name: this.download, url: this.href });
};
window.HTMLElement.prototype.scrollIntoView = function () {};
function png(width, height) {
  const b = new Uint8Array(45),
    v = new DataView(b.buffer);
  b.set([137, 80, 78, 71, 13, 10, 26, 10]);
  v.setUint32(8, 13);
  b.set(Buffer.from("IHDR"), 12);
  v.setUint32(16, width);
  v.setUint32(20, height);
  b.set(Buffer.from("IEND"), 37);
  return b;
}
window.HTMLCanvasElement.prototype.getContext = function () {
  return {
    drawImage() {},
    fillRect() {},
    clearRect() {},
    strokeRect() {},
    fillText() {},
  };
};
window.HTMLCanvasElement.prototype.toBlob = function (cb, mime) {
  setTimeout(
    () => cb(new Blob([png(this.width, this.height)], { type: mime })),
    1,
  );
};
globalThis.createImageBitmap = async (blob) => {
  decoded++;
  maxDecoded = Math.max(decoded, maxDecoded);
  try {
    await new Promise((r) => setTimeout(r, decodeDelay));
    const info = inspectImage(new Uint8Array(await blob.arrayBuffer()));
    let closed = false;
    return {
      ...info,
      close() {
        if (!closed) {
          closed = true;
          decoded--;
        }
      },
    };
  } catch (error) {
    decoded--;
    throw error;
  }
};
window.createImageBitmap = globalThis.createImageBitmap;
const source = fs.readFileSync("src/scripts/workspace.ts", "utf8");
let code = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
  },
}).outputText;
code = code
  .replace(
    'from "fflate"',
    `from ${JSON.stringify(import.meta.resolve("fflate"))}`,
  )
  .replace(
    'from "./image-core"',
    `from ${JSON.stringify(new URL("../src/scripts/image-core.ts", import.meta.url).href)}`,
  );
await import(
  "data:text/javascript;base64," + Buffer.from(code).toString("base64")
);
let checks = 0;
const check = (name, fn) => {
  try {
    fn();
    checks++;
  } catch (e) {
    console.error("FAIL:", name);
    throw e;
  }
};
async function idle() {
  for (let i = 0; i < 500; i++) {
    await new Promise((r) => setTimeout(r, 3));
    if (!$("demo").disabled) return;
  }
  throw new Error("Workspace did not become idle");
}
async function drop(files) {
  const event = new window.Event("drop", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "dataTransfer", { value: { files } });
  $("drop-zone").dispatchEvent(event);
  await idle();
}
check("empty initial state", () => {
  assert.ok($("process").disabled);
  assert.ok($("download").disabled);
});
await $("demo").onclick();
check("sample batch added", () =>
  assert.equal(document.querySelectorAll(".file-card").length, 3),
);
$("process").click();
await idle();
check("three results prepared", () => {
  assert.equal(document.querySelectorAll("a[download]").length, 3);
  assert.ok(!$("download").disabled);
  assert.match($("export-summary").textContent, /3 ready/);
});
const firstURL = document.querySelector("a[download]").href;
await drop([new File(["<svg/>"], "bad.jpg", { type: "image/jpeg" })]);
check("invalid additions preserve results", () => {
  assert.equal(document.querySelector("a[download]").href, firstURL);
  assert.ok(!$("download").disabled);
  assert.equal($("file-errors").children.length, 1);
});
const revokesBefore = revoked.length;
const pagehide = new window.Event("pagehide");
Object.defineProperty(pagehide, "persisted", { value: true });
window.dispatchEvent(pagehide);
check("BFCache preserves object URLs", () =>
  assert.equal(revoked.length, revokesBefore),
);
$("download").click();
await idle();
const zipURL = downloads.at(-1).url;
const createsBefore = created.length;
$("download").click();
await idle();
check("repeated ZIP download reuses archive", () => {
  assert.equal(downloads.at(-1).url, zipURL);
  assert.equal(created.length, createsBefore);
  assert.equal(downloads.at(-1).name, "dama-product-photos.zip");
});
decodeDelay = 15;
const previews = [...document.querySelectorAll(".file-actions button")].filter(
  (b) => b.textContent === "Check crops",
);
const maxBefore = maxDecoded;
previews[0].click();
previews[1].click();
await new Promise((r) => setTimeout(r, 50));
decodeDelay = 0;
check("preview decode is serialized", () => {
  assert.equal(maxDecoded, Math.max(maxBefore, 1));
  assert.equal(decoded, 0);
  assert.ok(!$("preview-panel").hidden);
});
$("width").value = "1000";
$("width").dispatchEvent(new window.Event("input", { bubbles: true }));
check("settings invalidate exports and archive", () => {
  assert.ok($("download").disabled);
  assert.equal(document.querySelectorAll("a[download]").length, 0);
  assert.ok(revoked.includes(zipURL));
});
$("prefix").value = "../CON";
$("save-settings").click();
check("sanitized settings only stored", () => {
  const saved = JSON.parse(localStorage.getItem("dama-image-prep-settings-v1"));
  assert.equal(saved.settings.prefix, "product-CON");
  assert.equal(saved.settings.width, 1000);
  assert.ok(!JSON.stringify(saved).includes("sample-1"));
});
$("forget-settings").click();
check("forget removes saved recipe", () =>
  assert.equal(localStorage.getItem("dama-image-prep-settings-v1"), null),
);
$("width").value = "0";
$("process").click();
check("invalid settings do not lock UI", () => {
  assert.match($("status").textContent, /64 to 4096/);
  assert.ok(!$("demo").disabled);
});
$("reset-settings").click();
$("process").click();
$("cancel").click();
await idle();
check("cancel recovers controls", () => {
  assert.match($("status").textContent, /Cancelled/);
  assert.ok(!$("process").disabled);
});
$("clear").click();
check("clear empties active batch", () => {
  assert.equal(document.querySelectorAll(".file-card").length, 0);
  assert.ok($("download").disabled);
  assert.equal($("width").value, "2000");
});
const demoRun = $("demo").onclick();
check("demo locks immediately", () => assert.ok($("demo").disabled));
await demoRun;
check("demo completes and releases decoders", () => {
  assert.equal(document.querySelectorAll(".file-card").length, 3);
  assert.equal(decoded, 0);
});
await drop(
  Array.from(
    { length: 17 },
    (_, i) =>
      new File([png(100, 100)], `extra-${i}.png`, { type: "image/png" }),
  ),
);
$("process").click();
await idle();
const fullURL = document.querySelector("a[download]").href;
await drop([
  new File([png(100, 100)], "over-limit.png", { type: "image/png" }),
]);
check("full-batch rejection preserves exports", () => {
  assert.equal(document.querySelectorAll(".file-card").length, 20);
  assert.equal(document.querySelector("a[download]").href, fullURL);
  assert.match($("file-errors").textContent, /Batch is full/);
});
$("clear").click();
check("all selected file URLs released", () => assert.equal(decoded, 0));
await window.happyDOM.close();
URL.createObjectURL = originalCreate;
URL.revokeObjectURL = originalRevoke;
console.log(
  `Workspace DOM QA passed: ${checks} checks with simulated canvas/decoder. Real device encoding and visual QA are separate.`,
);
