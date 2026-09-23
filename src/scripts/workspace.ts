import { Zip, ZipPassThrough } from "fflate";
import {
  DEFAULTS,
  LIMITS,
  geometry,
  inspectImage,
  outputName,
  validateSettings,
  type Settings,
} from "./image-core";
type Item = {
  id: number;
  file: File;
  width: number;
  height: number;
  thumb: string;
  result?: Blob;
  url?: string;
  name?: string;
  note?: string;
};
const $ = <T extends HTMLElement = HTMLElement>(id: string) =>
  document.getElementById(id) as T;
const input = (id: string) => $<HTMLInputElement>(id);
let items: Item[] = [],
  busy = false,
  cancelled = false,
  nextId = 0,
  previewToken = 0,
  previewBusy = false,
  zipUrl: string | undefined;
const STORAGE = "seller-operations-lab-settings-v1";
const status = (message: string, error = false) => {
  $("status").textContent = message;
  $("status").classList.toggle("error", error);
};
const showError = (name: string, error: unknown) => {
  const li = document.createElement("li");
  li.textContent = `${name}: ${error instanceof Error ? error.message : "Could not process this file. Try a smaller image."}`;
  $("file-errors").append(li);
};
const bytes = (n: number) =>
  n >= 1e6
    ? `${(n / 1e6).toFixed(2)} MB`
    : `${Math.max(1, Math.round(n / 1000))} KB`;
function settings(): Settings {
  return validateSettings({
    width: Number(input("width").value),
    height: Number(input("height").value),
    fit: input("fit").value as Settings["fit"],
    padding: Number(input("padding").value),
    background: input("background").value,
    anchor: input("anchor").value as Settings["anchor"],
    upscale: input("upscale").checked,
    format: input("format").value as Settings["format"],
    quality: Number(input("quality").value),
    prefix: input("prefix").value,
    start: Number(input("start").value),
  });
}
function labels() {
  $("padding-value").textContent = `${input("padding").value}%`;
  $("quality-value").textContent = `${input("quality").value}%`;
  input("quality").disabled = input("format").value === "png" || busy;
  input("padding").disabled = input("fit").value === "cover" || busy;
  input("anchor").disabled = input("fit").value === "contain" || busy;
  try {
    const s = settings();
    $("settings-summary").textContent =
      `${s.width} × ${s.height} · ${s.format === "jpeg" ? "JPG" : s.format.toUpperCase()} · ${s.fit === "contain" ? "Fit" : "Fill"} — change settings`;
    $("filename-example").textContent = outputName(
      settings(),
      0,
      `image/${input("format").value}`,
    );
  } catch {
    $("settings-summary").textContent =
      "Fix output settings before preparing images";
    $("filename-example").textContent = "Check your settings";
  }
}
function applySettings(s: Settings) {
  for (const [key, value] of Object.entries(s)) {
    const el = input(key);
    if (key === "upscale") el.checked = Boolean(value);
    else el.value = String(value);
  }
  input("preset").value = "custom";
  labels();
}
function lock(value: boolean) {
  busy = value;
  document
    .querySelectorAll<HTMLButtonElement | HTMLInputElement | HTMLSelectElement>(
      "#settings-form input,#settings-form select,#settings-form button,#file-input,#demo,#clear,#process,#download,.file-actions button",
    )
    .forEach((e) => (e.disabled = value));
  $("cancel").hidden = !value;
  $("progress").hidden = !value;
  labels();
  if (!value) render();
}
function clearResults() {
  if (zipUrl) {
    URL.revokeObjectURL(zipUrl);
    zipUrl = undefined;
  }
  previewToken++;
  $("preview-panel").hidden = true;
  for (const item of items) {
    if (item.url) URL.revokeObjectURL(item.url);
    delete item.url;
    delete item.result;
    delete item.name;
    delete item.note;
  }
  render();
}
function invalidate() {
  if (busy) return;
  clearResults();
  labels();
  render();
  if (items.length)
    status("Settings changed. Prepare images again to apply them.");
}
function render() {
  const grid = $("file-grid");
  grid.replaceChildren();
  let ready = 0,
    total = 0;
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "file-card";
    const img = document.createElement("img");
    img.src = item.thumb;
    img.alt = `Original photo: ${item.file.name}`;
    img.width = 240;
    img.height = 160;
    const info = document.createElement("div");
    info.className = "file-info";
    const name = document.createElement("strong");
    name.textContent = item.name || item.file.name;
    const detail = document.createElement("p");
    detail.textContent = item.result
      ? `Original shown · ${bytes(item.file.size)} → ${bytes(item.result.size)}`
      : `${item.width} × ${item.height} · ${bytes(item.file.size)}`;
    const actions = document.createElement("div");
    actions.className = "file-actions";
    const remove = document.createElement("button");
    remove.className = "text-button";
    remove.type = "button";
    remove.textContent = "Remove";
    remove.disabled = busy;
    remove.setAttribute("aria-label", `Remove ${item.file.name}`);
    remove.onclick = () => {
      URL.revokeObjectURL(item.thumb);
      if (item.url) URL.revokeObjectURL(item.url);
      items = items.filter((i) => i.id !== item.id);
      clearResults();
      render();
      status("Photo removed. Prepare the remaining batch again.");
      input("file-input").focus();
    };
    actions.append(remove);
    if (item.result && item.url && item.name) {
      ready++;
      total += item.result.size;
      const preview = document.createElement("button");
      preview.className = "text-button";
      preview.textContent = "Check crops";
      preview.type = "button";
      preview.disabled = busy;
      preview.onclick = () => void previewItem(item);
      const download = document.createElement("a");
      download.textContent = "Save image";
      download.href = item.url;
      download.download = item.name;
      actions.append(preview, download);
    }
    info.append(name, detail);
    if (item.note) {
      const note = document.createElement("p");
      note.textContent = item.note;
      info.append(note);
    }
    info.append(actions);
    card.append(img, info);
    grid.append(card);
  }
  $("file-count").textContent = `${items.length} / ${LIMITS.count}`;
  $("batch-summary").textContent = items.length
    ? `${items.length} photo${items.length === 1 ? "" : "s"} · ${bytes(items.reduce((n, i) => n + i.file.size, 0))} input`
    : "No photos selected";
  $("export-summary").textContent = ready
    ? `${ready} ready · ${bytes(total)} before ZIP`
    : "Prepare your photos, then review and download.";
  $<HTMLButtonElement>("process").disabled = busy || !items.length;
  $<HTMLButtonElement>("clear").disabled = busy || !items.length;
  $<HTMLButtonElement>("download").disabled = busy || !ready;
}
function toBlob(
  canvas: HTMLCanvasElement,
  mime: string,
  quality = 0.85,
): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(
              new Error(
                "Browser could not encode this image. Try smaller dimensions.",
              ),
            ),
      mime,
      quality,
    ),
  );
}
async function thumbnail(bitmap: ImageBitmap) {
  const canvas = document.createElement("canvas");
  const scale = Math.min(240 / bitmap.width, 180 / bitmap.height, 1);
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  try {
    return URL.createObjectURL(await toBlob(canvas, "image/png"));
  } finally {
    canvas.width = canvas.height = 0;
  }
}
async function addFiles(files: File[]) {
  if (busy) return;
  if (!("createImageBitmap" in window)) {
    status(
      "This browser does not support the image decoder. Try a current Chrome, Firefox, Edge or Safari.",
      true,
    );
    return;
  }
  $("file-errors").replaceChildren();
  cancelled = false;
  lock(true);
  let accepted = 0;
  try {
    for (const file of files) {
      if (cancelled) break;
      try {
        if (items.length >= LIMITS.count)
          throw new Error(
            "Batch is full (20 photos). Download or clear it before adding more.",
          );
        if (file.size > LIMITS.file)
          throw new Error("File exceeds 20 MB. Export a smaller file.");
        if (
          file.size + items.reduce((n, i) => n + i.file.size, 0) >
          LIMITS.total
        )
          throw new Error("Batch exceeds 100 MB. Start a separate batch.");
        const info = inspectImage(new Uint8Array(await file.arrayBuffer()));
        const bitmap = await createImageBitmap(
          new Blob([file], { type: info.mime }),
          { imageOrientation: "from-image" },
        );
        try {
          if (bitmap.width * bitmap.height > LIMITS.inputPixels)
            throw new Error("Decoded image exceeds 24 megapixels.");
          const thumb = await thumbnail(bitmap);
          if (cancelled) {
            URL.revokeObjectURL(thumb);
            break;
          }
          if (accepted === 0) clearResults();
          items.push({
            id: nextId++,
            file,
            width: bitmap.width,
            height: bitmap.height,
            thumb,
          });
          accepted++;
        } finally {
          bitmap.close();
        }
        status(`Reading photos… ${accepted} added`);
      } catch (error) {
        showError(file.name, error);
      }
    }
  } finally {
    lock(false);
    input("file-input").value = "";
    status(
      cancelled
        ? "Adding photos cancelled. Accepted photos are still available."
        : `${accepted} photo${accepted === 1 ? "" : "s"} added. Review settings and choose Prepare images.`,
    );
  }
}
async function processBatch() {
  if (busy || !items.length) return;
  let s: Settings;
  try {
    s = settings();
  } catch (error) {
    status((error as Error).message, true);
    $<HTMLFormElement>("settings-form").reportValidity();
    return;
  }
  clearResults();
  $("file-errors").replaceChildren();
  cancelled = false;
  lock(true);
  let total = 0,
    success = 0;
  try {
    for (let index = 0; index < items.length; index++) {
      if (cancelled) break;
      const item = items[index];
      let bitmap: ImageBitmap | undefined;
      const canvas = document.createElement("canvas");
      try {
        status(`Preparing ${index + 1} of ${items.length}…`);
        bitmap = await createImageBitmap(item.file, {
          imageOrientation: "from-image",
        });
        canvas.width = s.width;
        canvas.height = s.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas is unavailable.");
        ctx.fillStyle = s.background;
        ctx.fillRect(0, 0, s.width, s.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        const g = geometry(bitmap.width, bitmap.height, s);
        ctx.drawImage(bitmap, g.dx, g.dy, g.dw, g.dh);
        const blob = await toBlob(canvas, `image/${s.format}`, s.quality / 100);
        if (cancelled) break;
        if (total + blob.size > LIMITS.outputBytes)
          throw new Error(
            "Output batch exceeds 100 MB. Reduce dimensions or export JPG/WebP.",
          );
        const name = outputName(s, index, blob.type);
        item.result = blob;
        item.name = name;
        item.url = URL.createObjectURL(blob);
        total += blob.size;
        success++;
        item.note = `${s.width} × ${s.height}${g.scale > 1 ? " · enlarged" : ""}${blob.type !== `image/${s.format}` ? " · browser used PNG fallback" : ""}${s.fit === "cover" && !s.upscale && g.scale === 1 && (bitmap.width < s.width || bitmap.height < s.height) ? " · padding added (enlarging is off)" : ""}`;
      } catch (error) {
        showError(item.file.name, error);
      } finally {
        bitmap?.close();
        canvas.width = canvas.height = 0;
      }
      $<HTMLProgressElement>("progress").value =
        ((index + 1) / items.length) * 100;
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  } finally {
    lock(false);
    status(
      `${cancelled ? "Cancelled. " : ""}${success} of ${items.length} prepared. ${success ? "Check crops or download your successful exports." : "Review the errors and try again."}`,
      success === 0,
    );
  }
}
async function previewItem(item: Item) {
  if (!item.result || previewBusy) return;
  previewBusy = true;
  const token = ++previewToken;
  try {
    const bitmap = await createImageBitmap(item.result);
    try {
      if (token !== previewToken) return;
      for (const id of ["crop-square", "crop-landscape", "crop-portrait"]) {
        const canvas = $<HTMLCanvasElement>(id);
        const ctx = canvas.getContext("2d")!;
        const g = geometry(bitmap.width, bitmap.height, {
          width: canvas.width,
          height: canvas.height,
          fit: "cover",
          padding: 0,
          upscale: true,
          anchor: "center",
        });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bitmap, g.dx, g.dy, g.dw, g.dh);
        canvas.setAttribute(
          "aria-label",
          `${id.replace("crop-", "")} center crop of ${item.name}`,
        );
      }
      $("preview-name").textContent = item.name || "";
      $("preview-panel").hidden = false;
      $("preview-panel").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } finally {
      bitmap.close();
    }
  } catch {
    status(
      "Could not display this preview. Download the image to inspect it.",
      true,
    );
  } finally {
    previewBusy = false;
  }
}
function requestZipDownload(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = "dama-product-photos.zip";
  document.body.append(link);
  link.click();
  link.remove();
  status(
    "ZIP download requested. Check your downloads; keep your original photos separately.",
  );
}
async function downloadZip() {
  if (busy) return;
  if (zipUrl) {
    requestZipDownload(zipUrl);
    return;
  }
  lock(true);
  $("cancel").hidden = true;
  status("Building your ZIP on this device…");
  try {
    const chunks: BlobPart[] = [];
    let zipError: Error | undefined;
    const archive = new Zip((error, data) => {
      if (error) zipError = error;
      else chunks.push(new Uint8Array(data).buffer);
    });
    for (const item of items) {
      if (!item.result || !item.name) continue;
      const entry = new ZipPassThrough(item.name);
      archive.add(entry);
      entry.push(new Uint8Array(await item.result.arrayBuffer()), true);
      if (zipError) throw zipError;
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    archive.end();
    if (zipError) throw zipError;
    zipUrl = URL.createObjectURL(new Blob(chunks, { type: "application/zip" }));
    requestZipDownload(zipUrl);
  } catch {
    status(
      "ZIP could not be created. Save individual images or try a smaller batch.",
      true,
    );
  } finally {
    lock(false);
  }
}
$("settings-form").addEventListener("submit", (e) => {
  e.preventDefault();
  void processBatch();
});
$("settings-form").addEventListener("input", (e) => {
  if (["width", "height"].includes((e.target as HTMLElement).id))
    input("preset").value = "custom";
  invalidate();
});
$("preset").addEventListener("change", () => {
  const presets: Record<string, number[]> = {
    square: [2000, 2000],
    landscape: [2400, 1800],
    portrait: [1800, 2400],
  };
  const preset = presets[input("preset").value];
  if (preset) {
    input("width").value = String(preset[0]);
    input("height").value = String(preset[1]);
    invalidate();
  }
});
$("file-input").addEventListener(
  "change",
  () => void addFiles(Array.from(input("file-input").files || [])),
);
const drop = $("drop-zone");
for (const event of ["dragenter", "dragover"])
  drop.addEventListener(event, (e) => {
    e.preventDefault();
    if (!busy) drop.classList.add("dragging");
  });
for (const event of ["dragleave", "drop"])
  drop.addEventListener(event, (e) => {
    e.preventDefault();
    drop.classList.remove("dragging");
  });
drop.addEventListener(
  "drop",
  (e) => void addFiles(Array.from((e as DragEvent).dataTransfer?.files || [])),
);
$("process").onclick = () => void processBatch();
$("download").onclick = () => void downloadZip();
$("cancel").onclick = () => {
  cancelled = true;
  status("Cancelling after the current image…");
};
$("clear").onclick = () => {
  if (busy) return;
  clearResults();
  items.forEach((i) => URL.revokeObjectURL(i.thumb));
  items = [];
  $("file-errors").replaceChildren();
  render();
  status("Batch cleared. Your settings have been kept.");
};
$("close-preview").onclick = () => {
  previewToken++;
  $("preview-panel").hidden = true;
};
$("save-settings").onclick = () => {
  try {
    const s = settings();
    localStorage.setItem(STORAGE, JSON.stringify({ version: 1, settings: s }));
    $("saved-status").textContent =
      "Saved in this browser, including your filename prefix. Photos are not saved.";
  } catch (error) {
    $("saved-status").textContent = `Not saved: ${(error as Error).message}`;
  }
};
$("forget-settings").onclick = () => {
  try {
    localStorage.removeItem(STORAGE);
    $("saved-status").textContent =
      "Saved settings removed. Current controls are unchanged.";
  } catch {
    $("saved-status").textContent =
      "Browser storage is blocked. Clear site data in browser settings if needed.";
  }
};
$("reset-settings").onclick = () => {
  applySettings(DEFAULTS);
  invalidate();
  $("saved-status").textContent =
    "Controls reset. Saved settings are unchanged until you save or forget them.";
};
$("demo").onclick = async () => {
  if (busy) return;
  lock(true);
  $("cancel").hidden = true;
  const files: File[] = [];
  try {
    for (const [index, [width, height]] of [
      [1200, 800],
      [800, 1200],
      [1000, 1000],
    ].entries()) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = ["#e1edff", "#f5e6d3", "#ddf2ed"][index];
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "#135ceb";
      ctx.lineWidth = 8;
      ctx.strokeRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8);
      ctx.fillStyle = "#17252b";
      ctx.textAlign = "center";
      ctx.font = `bold ${Math.round(width * 0.09)}px sans-serif`;
      ctx.fillText("SAMPLE " + (index + 1), width / 2, height / 2);
      ctx.font = `${Math.round(width * 0.035)}px sans-serif`;
      ctx.fillText(
        `${width} × ${height} · framing test`,
        width / 2,
        height * 0.6,
      );
      files.push(
        new File(
          [await toBlob(canvas, "image/png")],
          `sample-${index + 1}.png`,
          { type: "image/png" },
        ),
      );
      canvas.width = canvas.height = 0;
    }
  } catch {
    status(
      "Could not create sample images. Choose a small image from your device instead.",
      true,
    );
  } finally {
    lock(false);
  }
  if (files.length) await addFiles(files);
};
try {
  const raw = localStorage.getItem(STORAGE);
  if (raw) {
    const stored = JSON.parse(raw);
    if (stored.version === 1) {
      applySettings(validateSettings(stored.settings));
      $("saved-status").textContent =
        "Your saved settings are loaded. Photos were not stored.";
    }
  }
} catch {
  $("saved-status").textContent =
    "Saved settings unavailable. You can use all tools without browser storage.";
}
labels();
render();
window.addEventListener("pagehide", (event) => {
  if (event.persisted) return;
  if (zipUrl) URL.revokeObjectURL(zipUrl);
  previewToken++;
  items.forEach((i) => {
    URL.revokeObjectURL(i.thumb);
    if (i.url) URL.revokeObjectURL(i.url);
  });
});
