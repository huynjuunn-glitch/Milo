import assert from "node:assert/strict";
import fs from "node:fs";
import { Window } from "happy-dom";
import { initFramingDemo } from "../src/scripts/framing-demo.ts";

const window = new Window({
  settings: {
    disableJavaScriptEvaluation: true,
    disableCSSFileLoading: true,
    disableJavaScriptFileLoading: true,
  },
});
const document = window.document;
document.write(
  fs
    .readFileSync("dist/index.html", "utf8")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ""),
);
const controls = document.querySelector("[data-demo-controls]");
const image = document.querySelector("[data-demo-image]");
const caption = document.querySelector("[data-demo-caption]");
assert.equal(
  controls.hidden,
  true,
  "No-JS version does not offer inert controls",
);
assert.equal(
  image.getAttribute("src"),
  image.dataset.contain,
  "No-JS version shows the full photograph",
);
assert.equal(
  document.querySelectorAll(".download-pair a[download]").length,
  2,
  "Both files remain downloadable without JavaScript",
);
initFramingDemo(document);
assert.equal(
  controls.hidden,
  false,
  "Working controls become visible after initialization",
);
for (const [value, expectedText] of [
  ["cover", /^Fill:/],
  ["contain", /^Fit:/],
  ["cover", /^Fill:/],
]) {
  // Simulate the mutually exclusive checked state provided by native browser radios.
  for (const radio of controls.querySelectorAll("input"))
    radio.checked = radio.value === value;
  controls.dispatchEvent(new window.Event("change", { bubbles: true }));
  assert.equal(
    image.getAttribute("src"),
    image.dataset[value],
    `${value}: use the corresponding real image`,
  );
  assert.match(
    caption.textContent,
    expectedText,
    `${value}: caption describes the displayed result`,
  );
  assert.match(
    image.alt,
    value === "cover" ? /cropping/ : /white side margins/,
  );
}
document.querySelector("[data-framing-demo]").remove();
assert.doesNotThrow(
  () => initFramingDemo(document),
  "Unrelated pages are a safe no-op",
);
await window.happyDOM.close();
console.log(
  "Framing demo QA passed: progressive enhancement, three switches, accessible descriptions and safe absent state.",
);
