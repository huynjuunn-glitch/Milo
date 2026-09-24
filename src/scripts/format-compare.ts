import { LIMITS, inspectImage, safePrefix } from "./image-core";

type Encoded = {
  requested: string;
  mime: string;
  blob: Blob;
  url: string;
  note?: string;
};

const fileInput = document.querySelector<HTMLInputElement>("#compare-file");
const qualityInput = document.querySelector<HTMLInputElement>("#compare-quality");
const qualityValue = document.querySelector<HTMLOutputElement>("#compare-quality-value");
const backgroundInput = document.querySelector<HTMLInputElement>("#compare-background");
const runButton = document.querySelector<HTMLButtonElement>("#compare-run");
const status = document.querySelector<HTMLElement>("#compare-status");
const results = document.querySelector<HTMLElement>("#compare-results");
const summary = document.querySelector<HTMLElement>("#compare-summary");
const rows = document.querySelector<HTMLTableSectionElement>("#compare-rows");
const previews = document.querySelector<HTMLElement>("#compare-previews");

let outputUrls: string[] = [];
let busy = false;
const pixelLimit = 6_000_000;

const formats = [
  { label: "JPG", mime: "image/jpeg" },
  { label: "PNG", mime: "image/png" },
  { label: "WebP", mime: "image/webp" },
] as const;

function setStatus(message: string, error = false) {
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("error", error);
}

function releaseOutputs() {
  for (const url of outputUrls) URL.revokeObjectURL(url);
  outputUrls = [];
  rows?.replaceChildren();
  previews?.replaceChildren();
  if (results) results.hidden = true;
}

function formatBytes(size: number) {
  return size >= 1_000_000
    ? `${(size / 1_000_000).toFixed(2)} MB`
    : `${Math.max(1, Math.round(size / 1_000))} KB`;
}

function outputExtension(mime: string) {
  return ({
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  } as Record<string, string>)[mime] ?? "bin";
}

function encode(canvas: HTMLCanvasElement, mime: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error(`The browser could not encode ${mime}.`)),
      mime,
      quality,
    );
  });
}

function cell(text: string, tag: "td" | "th" = "td") {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function renderOutputs(file: File, outputs: Encoded[], width: number, height: number, background: string) {
  if (!rows || !previews || !results || !summary) return;
  const prefix = safePrefix(file.name.replace(/\.[^.]+$/, ""));

  for (const output of outputs) {
    const delta = ((output.blob.size - file.size) / Math.max(file.size, 1)) * 100;
    const change = Math.abs(delta) < 0.05
      ? "About the same size"
      : `${Math.abs(delta).toFixed(1)}% ${delta < 0 ? "smaller" : "larger"}`;
    const actualLabel = output.mime.replace("image/", "").toUpperCase();
    const row = document.createElement("tr");
    row.append(
      cell(output.requested, "th"),
      cell(output.note ? `${actualLabel} · ${output.note}` : actualLabel),
      cell(formatBytes(output.blob.size)),
      cell(change),
    );

    const link = document.createElement("a");
    link.href = output.url;
    const extension = outputExtension(output.mime);
    link.download = `${prefix}-${extension}.${extension}`;
    link.textContent = `Save ${extension.toUpperCase()}`;
    const downloadCell = document.createElement("td");
    downloadCell.append(link);
    row.append(downloadCell);
    rows.append(row);

    const card = document.createElement("figure");
    card.className = "format-preview-card";
    card.style.backgroundColor = background;
    const image = document.createElement("img");
    image.src = output.url;
    image.alt = `${output.requested} output preview at ${width} by ${height} pixels`;
    image.width = width;
    image.height = height;
    image.loading = "lazy";
    const caption = document.createElement("figcaption");
    caption.textContent = output.note
      ? `${output.requested} request returned ${actualLabel} (${formatBytes(output.blob.size)}); browser fallback.`
      : `${actualLabel} · ${formatBytes(output.blob.size)} · ${width} × ${height}px`;
    card.append(image, caption);
    previews.append(card);
  }

  summary.textContent = `Original: ${formatBytes(file.size)} · ${width} × ${height}px · ${outputs.length} browser encodes. Values describe this file and browser only.`;
  results.hidden = false;
}

qualityInput?.addEventListener("input", () => {
  if (qualityValue) qualityValue.value = `${qualityInput.value}%`;
  if (results && !results.hidden) {
    releaseOutputs();
    setStatus("Quality changed. Run the comparison again to create matching outputs.");
  }
});

backgroundInput?.addEventListener("input", () => {
  if (results && !results.hidden) {
    releaseOutputs();
    setStatus("Background changed. Run the comparison again to create matching previews.");
  }
});

fileInput?.addEventListener("change", () => {
  releaseOutputs();
  const file = fileInput.files?.[0];
  runButton && (runButton.disabled = !file || busy);
  setStatus(file ? `${file.name} selected. Run the comparison when ready.` : "Choose an image to begin.");
});

runButton?.addEventListener("click", async () => {
  const file = fileInput?.files?.[0];
  if (!file || busy || !qualityInput || !backgroundInput) return;
  releaseOutputs();

  if (file.size > LIMITS.file) {
    setStatus("This file is larger than 20 MB. Choose a smaller copy.", true);
    return;
  }

  busy = true;
  runButton.disabled = true;
  fileInput.disabled = true;
  qualityInput.disabled = true;
  backgroundInput.disabled = true;
  const encoded: Encoded[] = [];
  let bitmap: ImageBitmap | undefined;
  let sourceCanvas: HTMLCanvasElement | undefined;
  let jpegCanvas: HTMLCanvasElement | undefined;

  try {
    const info = inspectImage(new Uint8Array(await file.arrayBuffer()));
    if (info.width * info.height > pixelLimit)
      throw new Error("This comparison is limited to 6 megapixels to keep three local encodes manageable. Resize a copy with Image Prep first.");
    if (!("createImageBitmap" in window))
      throw new Error("This browser does not support local image decoding. Try a current browser.");

    setStatus("Decoding the original locally…");
    bitmap = await createImageBitmap(file);
    sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = bitmap.width;
    sourceCanvas.height = bitmap.height;
    const sourceContext = sourceCanvas.getContext("2d");
    if (!sourceContext) throw new Error("Canvas is unavailable in this browser.");
    sourceContext.drawImage(bitmap, 0, 0);

    jpegCanvas = document.createElement("canvas");
    jpegCanvas.width = bitmap.width;
    jpegCanvas.height = bitmap.height;
    const jpegContext = jpegCanvas.getContext("2d");
    if (!jpegContext) throw new Error("Canvas is unavailable in this browser.");
    jpegContext.fillStyle = backgroundInput.value;
    jpegContext.fillRect(0, 0, bitmap.width, bitmap.height);
    jpegContext.drawImage(bitmap, 0, 0);

    const quality = Number(qualityInput.value) / 100;
    for (const format of formats) {
      setStatus(`Encoding ${format.label} locally…`);
      const source = format.mime === "image/jpeg" ? jpegCanvas : sourceCanvas;
      const blob = await encode(source, format.mime, quality);
      const mime = blob.type || "application/octet-stream";
      if (!["image/jpeg", "image/png", "image/webp"].includes(mime))
        throw new Error(`The browser returned an unsupported image type for ${format.label}.`);
      const fallback = mime === format.mime ? undefined : `requested ${format.label}`;
      const url = URL.createObjectURL(blob);
      outputUrls.push(url);
      encoded.push({ requested: format.label, mime, blob, url, note: fallback });
    }

    renderOutputs(file, encoded, bitmap.width, bitmap.height, backgroundInput.value);
    setStatus("Comparison complete. All outputs were encoded locally; inspect each before choosing one.");
  } catch (error) {
    releaseOutputs();
    setStatus(error instanceof Error ? error.message : "The image could not be compared.", true);
  } finally {
    bitmap?.close();
    if (sourceCanvas) sourceCanvas.width = sourceCanvas.height = 0;
    if (jpegCanvas) jpegCanvas.width = jpegCanvas.height = 0;
    busy = false;
    if (runButton) runButton.disabled = !fileInput?.files?.length;
    if (fileInput) fileInput.disabled = false;
    if (qualityInput) qualityInput.disabled = false;
    if (backgroundInput) backgroundInput.disabled = false;
  }
});

window.addEventListener("pagehide", (event) => {
  if (!event.persisted) releaseOutputs();
});
